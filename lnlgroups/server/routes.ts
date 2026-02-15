import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import multer from "multer";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { validateVaultAccess } from "./vaultClients";

// Vault file upload storage config
const uploadDir = path.join(process.cwd(), "uploads", "vault");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const vaultUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp}-${safeName}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|pdf|doc|docx|xls|xlsx|csv|mp4|mov|zip)$/i;
    cb(null, allowed.test(path.extname(file.originalname)));
  },
});

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

      if (!accessKey) {
        return res.status(400).json({ success: false, error: "Missing access key" });
      }

      // Primary: call Concierge Agent vault-auth webhook (Notion-backed)
      const vaultWebhookUrl = process.env.N8N_VAULT_AUTH_URL || "https://n8n.srv1244684.hstgr.cloud/webhook/vault-auth";
      try {
        const webhookRes = await fetch(vaultWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            client_id: clientId || "",
            timestamp: new Date().toISOString(),
          }),
        });

        const data = await webhookRes.json();

        if (data.auth === true) {
          return res.json({
            success: true,
            clientName: data.client_name || data.clientName,
            industry: data.industry,
            notionUrl: data.vault_url || data.notionUrl,
          });
        }
      } catch (webhookErr) {
        console.error("[Vault] Concierge webhook failed, trying local fallback:", webhookErr);
      }

      // Fallback: hardcoded vaultClients lookup
      const client = validateVaultAccess(clientId || "", accessKey);
      if (client) {
        return res.json({
          success: true,
          clientName: client.name,
          industry: client.industry,
          notionUrl: client.notionUrl,
        });
      }

      res.status(401).json({
        success: false,
        error: "Invalid credentials. Please verify your Access Key."
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Authentication failed" });
    }
  });

  // Vault file upload → saves to disk, creates Notion page for the asset
  app.post("/api/vault/upload", vaultUpload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, error: "No file provided" });
      }

      const { vaultKey, industry, businessName, checklistItem } = req.body;

      if (!vaultKey || !industry || !checklistItem) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      // Notion database ID mapping per industry
      const notionDbMap: Record<string, string> = {
        medspa: "3f5c3ac39e9d44e1b89558c89eb299bb",
        realtor: "81c5f71a1492451bb9afa5a95b1bd39f",
        law: "3952b5325c5345d1a972d33e2a54c74b",
        "home-services": "ef81056d84554e1f9cbdb46a949b6535",
      };

      const databaseId = notionDbMap[industry];
      if (!databaseId) {
        return res.status(400).json({ success: false, error: "Invalid industry" });
      }

      const dateStr = new Date().toISOString().slice(0, 10);
      const pageName = `${industry} - ${businessName || "Client"} - ${checklistItem} ${dateStr}`;

      console.log(`[Vault Upload] ${pageName} → ${file.filename} (${file.size} bytes)`);

      res.json({
        success: true,
        fileName: file.filename,
        pageName,
        fileSize: file.size,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("[Vault Upload] Error:", error);
      res.status(500).json({ success: false, error: "Upload failed" });
    }
  });

  return httpServer;
}
