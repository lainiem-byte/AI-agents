import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { validateVaultAccess } from "./vaultClients";

async function forwardToWebhook(leadData: any): Promise<boolean> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[Webhook] No N8N_WEBHOOK_URL configured, skipping webhook forward");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: leadData.name,
        customer_email: leadData.email,
        business_name: leadData.businessName,
        source_path: leadData.interest || "website-contact",
        market: leadData.primaryMarket,
        tech_stack: Array.isArray(leadData.techStack) ? leadData.techStack.join(", ") : leadData.techStack,
        source: "LNL Group Website",
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("[Webhook] Lead successfully forwarded to n8n workflow");
      return true;
    } else {
      console.error("[Webhook] Failed to forward lead:", response.status);
      return false;
    }
  } catch (error) {
    console.error("[Webhook] Error forwarding lead:", error);
    return false;
  }
}

async function forwardAuditToWebhook(auditPayload: Record<string, any>): Promise<boolean> {
  const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[Audit Webhook] No webhook URL configured, skipping");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auditPayload),
    });

    if (response.ok) {
      console.log("[Audit Webhook] Audit data forwarded to n8n");
      return true;
    } else {
      console.error("[Audit Webhook] Forward failed:", response.status);
      return false;
    }
  } catch (error) {
    console.error("[Audit Webhook] Error:", error);
    return false;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      const webhookSent = await forwardToWebhook(validatedData);
      
      res.json({
        ...lead,
        webhookSent,
        message: "Lead submitted successfully"
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  app.post("/api/audit", async (req, res) => {
    try {
      const {
        name, email, businessName, primaryMarket, interest, techStack,
        industry, competitorReason, contentHours, assetScore,
        contentLibrary, leadNextStep, paidTraffic, cpl,
        industrySpecific, adLink, additionalNotes,
      } = req.body;

      // Build audit diagnostic data
      const auditData: Record<string, any> = {
        industry, competitorReason, contentHours, assetScore,
        contentLibrary, leadNextStep, paidTraffic, cpl,
        industrySpecific, adLink, additionalNotes,
      };

      // Store lead with source=audit and auditData JSON
      const leadPayload = {
        name,
        email,
        businessName,
        primaryMarket: primaryMarket || "raleigh",
        interest: interest || "30-Minute Efficiency Audit",
        techStack: Array.isArray(techStack) ? techStack : [],
        source: "audit",
        auditData: JSON.stringify(auditData),
      };

      const validatedData = insertLeadSchema.parse(leadPayload);
      const lead = await storage.createLead(validatedData);

      // Forward flat payload to n8n
      const webhookPayload = {
        customer_name: name,
        customer_email: email,
        business_name: businessName,
        market: primaryMarket,
        service_interest: interest,
        tech_stack: Array.isArray(techStack) ? techStack.join(", ") : "",
        source: "LNL Audit Page",
        industry,
        competitor_reason: competitorReason,
        content_hours: contentHours,
        asset_score: assetScore,
        content_library: contentLibrary,
        lead_next_step: leadNextStep,
        paid_traffic: paidTraffic,
        cpl: cpl || "",
        industry_specific: industrySpecific,
        ad_link: adLink || "",
        additional_notes: additionalNotes || "",
        timestamp: new Date().toISOString(),
      };

      const webhookSent = await forwardAuditToWebhook(webhookPayload);

      res.json({ ...lead, webhookSent, message: "Audit submitted successfully" });
    } catch (error) {
      console.error("[Audit] Submission error:", error);
      res.status(400).json({ error: "Invalid audit data" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve leads" });
    }
  });

  app.post("/api/vault/authenticate", async (req, res) => {
    try {
      const { clientId, accessKey } = req.body;

      if (!clientId || !accessKey) {
        return res.status(400).json({ success: false, error: "Missing credentials" });
      }

      const client = validateVaultAccess(clientId, accessKey);

      if (client) {
        res.json({
          success: true,
          clientName: client.name,
          industry: client.industry,
          notionUrl: client.notionUrl,
        });
      } else {
        res.status(401).json({
          success: false,
          error: "Invalid credentials. Please verify your Client ID and Access Key."
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Authentication failed" });
    }
  });

  return httpServer;
}
