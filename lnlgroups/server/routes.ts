import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import multer from "multer";
import { Client } from "@notionhq/client";
import nodemailer from "nodemailer";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { validateVaultAccess } from "./vaultClients";
import { ZodError } from "zod";

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

// Vault upload confirmation email to customer
async function sendVaultUploadEmail(
  customerEmail: string,
  clientName: string,
  checklistItem: string,
): Promise<boolean> {
  const smtpHost = process.env.OUTREACH_AGENT_EMAIL_SMTP_HOST;
  const smtpPort = parseInt(process.env.OUTREACH_AGENT_EMAIL_SMTP_PORT || "465", 10);
  const smtpUser = process.env.OUTREACH_AGENT_EMAIL_SMTP_USER;
  const smtpPass = process.env.OUTREACH_AGENT_EMAIL_SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[Vault Email] SMTP not configured — skipping notification");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"LNL Group" <${smtpUser}>`,
      to: customerEmail,
      subject: `Asset Received — ${checklistItem}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; color: #222;">
          <div style="background: #0D0D0F; padding: 24px 28px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #C9A86C; margin: 0; font-size: 20px;">LNL Vault</h2>
          </div>
          <div style="background: #1A1A1D; padding: 28px; border-radius: 0 0 12px 12px; color: #ccc;">
            <p style="margin-top: 0;">Hi <strong style="color: #fff;">${clientName}</strong>,</p>
            <p>We received your <strong style="color: #C9A86C;">${checklistItem}</strong> upload. Our architects will review it within <strong>48 hours</strong>.</p>
            <p>You can continue uploading remaining checklist items from your vault portal at any time.</p>
            <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 13px; color: #888;">This is an automated message from LNL Group. Do not reply directly — reach us at customercare@lnlgroups.com.</p>
          </div>
        </div>
      `,
    });

    console.log(`[Vault Email] Confirmation sent to ${customerEmail}`);
    return true;
  } catch (err) {
    console.error("[Vault Email] Send failed:", err);
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
      if (error instanceof ZodError) {
        console.error("[Leads] Validation error:", JSON.stringify(error.errors));
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
      } else {
        console.error("[Leads] Database/server error:", error);
        res.status(500).json({ error: "Failed to save lead. Please try again." });
      }
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
            vault_key: accessKey,
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
            email: data.email || data.client_email || null,
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

  // Vault file upload → saves to disk, updates existing Notion client page
  app.post("/api/vault/upload", vaultUpload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, error: "No file provided" });
      }

      const { vaultKey, industry, businessName, checklistItem, email } = req.body;

      if (!vaultKey || !industry || !checklistItem) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      // Master Notion data source ID (collection ID for SDK v5.x dataSources.query)
      const masterDbId = "2ed2b410-4a59-80e2-9ace-000b6ebf2697";

      const dateStr = new Date().toISOString().slice(0, 10);

      // Build public file URL
      const appUrl = (process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");
      const fileUrl = `${appUrl}/uploads/vault/${file.filename}`;

      console.log(`[Vault Upload] ${checklistItem} → ${file.filename} (${file.size} bytes) [key: ${vaultKey}]`);

      // Find existing client page by vault key, then update it
      let notionPageUrl: string | null = null;
      const notionKey = process.env.NOTION_API_KEY;

      if (notionKey) {
        try {
          const notion = new Client({ auth: notionKey });

          // Query master DB for the client's existing page using their vault key
          const queryRes = await notion.dataSources.query({
            data_source_id: masterDbId,
            filter: {
              property: "Vault Key",
              rich_text: { equals: vaultKey },
            },
            page_size: 1,
          });

          if (queryRes.results.length > 0) {
            const pageId = queryRes.results[0].id;
            notionPageUrl = (queryRes.results[0] as any).url || null;

            // Get existing Vault Files to append (not overwrite)
            const existingPage = queryRes.results[0] as any;
            const existingFiles = existingPage.properties?.["Vault Files"]?.files || [];

            // Add new file as external URL to Vault Files property
            const updatedFiles = [
              ...existingFiles.map((f: any) => {
                if (f.type === "external") return { name: f.name, type: "external" as const, external: { url: f.external.url } };
                return { name: f.name, type: "external" as const, external: { url: f.file?.url || "" } };
              }),
              { name: `${checklistItem} — ${file.originalname}`, type: "external" as const, external: { url: fileUrl } },
            ];

            await notion.pages.update({
              page_id: pageId,
              properties: {
                "Vault Files": { files: updatedFiles },
              },
            });

            // Append upload log as content block on the page
            await notion.blocks.children.append({
              block_id: pageId,
              children: [
                {
                  object: "block",
                  type: "paragraph",
                  paragraph: {
                    rich_text: [
                      { text: { content: `${checklistItem}` }, annotations: { bold: true } },
                      { text: { content: ` — ` } },
                      { text: { content: file.originalname, link: { url: fileUrl } } },
                      { text: { content: ` (${(file.size / 1024).toFixed(1)} KB) — ${dateStr}` } },
                    ],
                  },
                },
              ],
            });

            console.log(`[Vault Upload] Updated Notion page ${pageId} with ${file.originalname}`);
          } else {
            console.warn(`[Vault Upload] No Notion page found for vault key ${vaultKey} — file saved to disk only`);
          }
        } catch (notionErr) {
          console.error("[Vault Upload] Notion API error (file saved to disk):", notionErr);
        }
      } else {
        console.warn("[Vault Upload] NOTION_API_KEY not set — skipping Notion update");
      }

      // Send confirmation email to customer
      let emailSent = false;
      if (email) {
        emailSent = await sendVaultUploadEmail(email, businessName || "Client", checklistItem);
      }

      res.json({
        success: true,
        fileName: file.filename,
        fileSize: file.size,
        notionPageUrl,
        emailSent,
        message: notionPageUrl
          ? "File uploaded and synced to vault"
          : "File uploaded (Notion sync pending)",
      });
    } catch (error) {
      console.error("[Vault Upload] Error:", error);
      res.status(500).json({ success: false, error: "Upload failed" });
    }
  });

  return httpServer;
}
