Done. Here's the summary:

---

**Built and shipped: `workflows/lnl-audit-intake-vault-router.json`**

This single n8n workflow handles both **at7** (Pre-Audit Report templates) and **y0p** (industry vault routing).

**Flow:**

Webhook (POST /webhook/audit-intake)  
  \-\> Route & Prepare Data (code node: industry \-\> DB ID \+ division-specific template)  
  \-\> Respond to Webhook (immediate 200 response)  
  \-\> Create Vault Page (Notion: 19 properties in industry-specific DB)  
  \-\> Populate Pre-Audit Template (28 blocks)  
  \-\> Send Audit Confirmation (branded email to lead)  
  \-\> Notify LNL Team (detailed diagnostic email with Notion page link)  
  \-\> Log to Audit Sheet (Google Sheets AUDIT\_LOG tab)

**Routing logic:**

| Industry | Notion Vault DB | Division | Template Track |
| ----- | ----- | ----- | ----- |
| Med Spa | `3f5c3ac3...` | Creative | Visual Friction, Conversion Gaps, Cinematic Potential |
| Real Estate | `81c5f71a...` | Creative | Same Creative track |
| Law | `3952b532...` | Automations | Manual Bottlenecks, Tech Overlap, Speed-to-Lead |
| Home Services | `ef81056d...` | Automations | Same Automations track |

**Before importing to n8n, update these placeholders:**

* `YOUR_NOTION_CREDENTIAL_ID` (2 nodes)  
* `YOUR_SMTP_CREDENTIAL_ID` (2 nodes)  
* `YOUR_GOOGLE_SHEET_ID` \+ `YOUR_GOOGLE_SHEETS_CREDENTIAL_ID` (1 node)  
* Also add `AUDIT_LOG` tab to your Google Sheet with columns: Timestamp, Business Name, Contact Name, Email, Industry, Market, Division, Service Interest, Asset Score, Notion Page ID, Status

**Prerequisite:** The 4 Notion vault databases must have all 20 properties from PRD Section 2.4 configured. The workflow creates pages with all properties dynamically.

