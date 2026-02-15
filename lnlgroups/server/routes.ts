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
          redirectUrl: client.redirectUrl 
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
