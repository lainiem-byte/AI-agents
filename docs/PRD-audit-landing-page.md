# PRD: LNL Audit Landing Page & Supporting Systems

**Version:** 1.0
**Date:** 2026-02-15
**Owner:** LNL Group (Holding)
**Pillars:** Asset Extraction + Systems Mining
**Status:** Deployed (v1) -- Iterating

---

## Executive Summary

The Audit Landing Page is LNL's primary **lead qualification engine** -- a 5-step diagnostic form that captures high-intent prospects, routes them by industry vertical, forwards enriched data to n8n for automation, and stores everything in Neon Postgres + HubSpot CRM. It is supported by four Notion Industry Vaults, a general Contact Form, a client Vault access system, and a VPS deployment pipeline.

This PRD documents every field, API contract, webhook shape, database schema, and integration point so that **any new industry niche can be onboarded by cloning a pattern, not reinventing it**.

---

## Table of Contents

1. [Audit Landing Page (5-Step Form)](#1-audit-landing-page-5-step-form)
2. [Notion Industry Vaults](#2-notion-industry-vaults)
3. [Contact Form (General Lead Capture)](#3-contact-form-general-lead-capture)
4. [VPS Infrastructure](#4-vps-infrastructure)
5. [Repo Architecture](#5-repo-architecture)
6. [n8n Integration](#6-n8n-integration)
7. [HubSpot CRM](#7-hubspot-crm)
8. [Vault System (Client Asset Access)](#8-vault-system-client-asset-access)
9. [Onboarding a New Industry Niche](#9-onboarding-a-new-industry-niche)

---

## 1. Audit Landing Page (5-Step Form)

### 1.1 Overview

| Attribute | Value |
|-----------|-------|
| **Route** | `/audit` |
| **Component** | `client/src/pages/Audit.tsx` |
| **Form Component** | `client/src/components/audit/AuditForm.tsx` |
| **Step Components** | `client/src/components/audit/AuditSteps.tsx` |
| **Schema** | `client/src/lib/auditSchema.ts` (Zod) |
| **API Endpoint** | `POST /api/audit` |
| **Webhook** | `N8N_AUDIT_WEBHOOK_URL` (falls back to `N8N_WEBHOOK_URL`) |
| **Typebot Behavior** | Hidden on this page (bubble set to `display: none` on mount, restored on unmount) |

### 1.2 URL Parameters

| Param | Type | Effect |
|-------|------|--------|
| `industry` | `string` | Pre-selects the industry dropdown. Values: `medspa`, `realtor`, `law`, `home-services` |

**Example:** `/audit?industry=medspa` opens the form with "Med Spa" pre-selected.

### 1.3 Step-by-Step Field Specification

#### Step 1: Identity

| Field | Key | Type | Control | Validation | Required |
|-------|-----|------|---------|------------|----------|
| Industry | `industry` | `string` | Select dropdown | Must be selected | Yes |
| Full Name | `name` | `string` | Text input | min 2 chars | Yes |
| Email Address | `email` | `string` | Email input | Valid email (Zod `.email()`) | Yes |
| Business Name | `businessName` | `string` | Text input | min 2 chars | Yes |

**Industry Options:**

| Label | Value |
|-------|-------|
| Med Spa | `medspa` |
| Real Estate | `realtor` |
| Law | `law` |
| Home Services | `home-services` |

#### Step 2: Visual Authority

| Field | Key | Type | Control | Validation | Required |
|-------|-----|------|---------|------------|----------|
| #1 reason a competitor wins | `competitorReason` | `string` | Textarea | min 5 chars | Yes |
| Hours/week on content | `contentHours` | `string` | Select dropdown | Must be selected | Yes |
| Visual content score (1-10) | `assetScore` | `string` | Radio group (1-10 buttons) | Must be selected | Yes |

**Content Hours Options:**

| Label | Value |
|-------|-------|
| 0-2 hours | `0-2` |
| 3-5 hours | `3-5` |
| 6-10 hours | `6-10` |
| 11-20 hours | `11-20` |
| 20+ hours | `20+` |

#### Step 3: Creative & Conversion

| Field | Key | Type | Control | Validation | Required | Conditional |
|-------|-----|------|---------|------------|----------|-------------|
| Content library type | `contentLibrary` | `string` | Radio group (2x2 grid) | Must be selected | Yes | -- |
| Lead's next step to book | `leadNextStep` | `string` | Select dropdown | Must be selected | Yes | -- |
| Running paid traffic? | `paidTraffic` | `string` | Radio group (Yes/No) | Must be selected | Yes | -- |
| Current CPL | `cpl` | `string` | Text input | Optional | No | **Only shown when `paidTraffic === "yes"`** |

**Content Library Options:**

| Label | Value |
|-------|-------|
| Cinematic Library | `library` |
| Static Photos | `static` |
| Stock Imagery | `stock` |
| Mix of Everything | `mix` |

**Lead Next Step Options:**

| Label | Value |
|-------|-------|
| DM | `dm` |
| Link in Bio | `link-in-bio` |
| Phone Call | `phone` |
| Website Form | `website-form` |
| Other | `other` |

#### Step 4: Industry & Routing

| Field | Key | Type | Control | Validation | Required |
|-------|-----|------|---------|------------|----------|
| Industry-specific diagnostic | `industrySpecific` | `string` | Radio group (Yes/No/Partially) | Must be selected | Yes |
| Service Interest | `interest` | `string` | Select dropdown | Must be selected | Yes |
| Primary Market | `primaryMarket` | `string` | Select dropdown | Must be selected | Yes |

**Industry-Specific Conditional Question Logic:**

| `industry` Value | Question Displayed |
|------------------|--------------------|
| `medspa` | "Do you have professional Before & After content that complies with platform regulations while still looking high-end?" |
| `realtor` | "Do you have a systemized way to turn a single property listing into 10+ pieces of short-form content?" |
| `law` | "Do you have a systemized intake process that captures leads 24/7 without manual follow-up?" |
| `home-services` (default) | "Do you have automated scheduling and follow-up for service calls?" |

**Service Interest Options:**

| Label | Value |
|-------|-------|
| LNL Creative: Aesthetic Scaling | `Aesthetic Scaling` |
| LNL Creative: Cinematic Listing Stories | `Cinematic Listing Stories` |
| LNL Automations: Workflow Architecture | `Workflow Architecture` |
| LNL Automations: Lead Capture Systems | `Lead Capture Systems` |
| Full Ecosystem Buildout | `Full Ecosystem Buildout` |
| 30-Minute Efficiency Audit | `30-Minute Efficiency Audit` |

**Primary Market Options:**

| Label | Value |
|-------|-------|
| Raleigh / Durham, NC | `raleigh` |
| Columbus, OH | `columbus` |
| Moscow, ID | `moscow` |

#### Step 5: Final Details

| Field | Key | Type | Control | Validation | Required |
|-------|-----|------|---------|------------|----------|
| Current Tech Stack | `techStack` | `string[]` | Multi-select combobox (grouped, searchable) | min 1 item | Yes |
| Link to recent ad/post | `adLink` | `string` | URL input | Valid URL or empty string | No |
| Additional notes | `additionalNotes` | `string` | Textarea | Optional | No |

**Tech Stack Options (Grouped):**

| Group | Label | Value |
|-------|-------|-------|
| CRM | Clio | `clio` |
| CRM | MyCase | `mycase` |
| CRM | Jobber | `jobber` |
| CRM | Housecall Pro | `housecall-pro` |
| CRM | GoHighLevel | `gohighlevel` |
| Marketing | Mailchimp | `mailchimp` |
| Marketing | Constant Contact | `constant-contact` |
| Marketing | Podium | `podium` |
| Scheduling | Calendly | `calendly` |
| Scheduling | Acuity | `acuity` |
| Scheduling | Google Calendar | `google-calendar` |
| LNL Favorites | Make.com | `make` |
| LNL Favorites | Zapier | `zapier` |
| LNL Favorites | Airtable | `airtable` |
| Other | Other / None | `other` |

### 1.4 Per-Step Validation Map

Validation fires when the user clicks "Continue" (or "Submit" on step 5). Only the current step's fields are validated.

```typescript
export const stepFields: Record<number, (keyof AuditFormValues)[]> = {
  1: ["industry", "name", "email", "businessName"],
  2: ["competitorReason", "contentHours", "assetScore"],
  3: ["contentLibrary", "leadNextStep", "paidTraffic"],
  4: ["industrySpecific", "interest", "primaryMarket"],
  5: ["techStack"],
};
```

**Note:** `cpl`, `adLink`, and `additionalNotes` are never in step validation arrays because they are optional.

### 1.5 Navigation & UX

- **Progress Bar:** 5-segment gold bar at top. Filled segments = `bg-[#D4AF37]`, unfilled = `bg-white/10`.
- **Back Button:** Shown on steps 2-5. Decrements `currentStep`.
- **Continue Button:** Steps 1-4. Triggers `validateCurrentStep()` then increments.
- **Submit Button:** Step 5 only. Triggers `validateCurrentStep()` then `form.handleSubmit(onSubmit)()`.
- **Loading State:** "Processing..." with spinner icon while `isSubmitting === true`.
- **Error State:** Browser `alert()` on fetch failure: "Submission failed. Please try again or contact us directly."
- **On Success:** Form resets, `currentStep` resets to 1, success modal opens.

### 1.6 API Contract: `POST /api/audit`

**Request Body (JSON):**

```json
{
  "industry": "medspa",
  "name": "John Doe",
  "email": "john@company.com",
  "businessName": "Acme Med Spa",
  "competitorReason": "They have better online presence",
  "contentHours": "3-5",
  "assetScore": "4",
  "contentLibrary": "static",
  "leadNextStep": "website-form",
  "paidTraffic": "yes",
  "cpl": "$25",
  "industrySpecific": "no",
  "interest": "Aesthetic Scaling",
  "primaryMarket": "raleigh",
  "techStack": ["gohighlevel", "calendly"],
  "adLink": "https://instagram.com/p/example",
  "additionalNotes": "Looking to scale before Q3"
}
```

**Server Processing (routes.ts):**

1. Destructures all fields from `req.body`.
2. Builds `auditData` object with diagnostic fields (industry, competitorReason, contentHours, assetScore, contentLibrary, leadNextStep, paidTraffic, cpl, industrySpecific, adLink, additionalNotes).
3. Builds `leadPayload` for database storage:
   - Defaults `primaryMarket` to `"raleigh"` if missing.
   - Defaults `interest` to `"30-Minute Efficiency Audit"` if missing.
   - Sets `source` to `"audit"`.
   - Stringifies `auditData` into `auditData` text column.
4. Validates with `insertLeadSchema.parse()`.
5. Stores in Neon Postgres via `storage.createLead()`.
6. Forwards flat webhook payload to n8n.

**Response (200 OK):**

```json
{
  "id": 42,
  "name": "John Doe",
  "email": "john@company.com",
  "businessName": "Acme Med Spa",
  "primaryMarket": "raleigh",
  "interest": "Aesthetic Scaling",
  "techStack": ["gohighlevel", "calendly"],
  "source": "audit",
  "auditData": "{\"industry\":\"medspa\",\"competitorReason\":\"...\", ...}",
  "createdAt": "2026-02-15T12:00:00.000Z",
  "webhookSent": true,
  "message": "Audit submitted successfully"
}
```

**Error (400):**

```json
{ "error": "Invalid audit data" }
```

### 1.7 n8n Webhook Payload Shape (Audit)

The server sends a **flat** JSON object to the n8n webhook -- no nesting, no arrays (tech_stack is comma-joined).

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@company.com",
  "business_name": "Acme Med Spa",
  "market": "raleigh",
  "service_interest": "Aesthetic Scaling",
  "tech_stack": "gohighlevel, calendly",
  "source": "LNL Audit Page",
  "industry": "medspa",
  "competitor_reason": "They have better online presence",
  "content_hours": "3-5",
  "asset_score": "4",
  "content_library": "static",
  "lead_next_step": "website-form",
  "paid_traffic": "yes",
  "cpl": "$25",
  "industry_specific": "no",
  "ad_link": "https://instagram.com/p/example",
  "additional_notes": "Looking to scale before Q3",
  "timestamp": "2026-02-15T12:00:00.000Z"
}
```

**Key differences from Contact Form webhook:**
- `source` is `"LNL Audit Page"` (vs `"LNL Group Website"`).
- Includes 10 additional diagnostic fields (industry through additional_notes).
- Uses `N8N_AUDIT_WEBHOOK_URL` env var (with `N8N_WEBHOOK_URL` as fallback).

### 1.8 Success Modal

**Component:** `client/src/components/audit/AuditSuccessModal.tsx`

| Behavior | Detail |
|----------|--------|
| **Trigger** | `showSuccess` state set to `true` after successful API response |
| **Auto-Close** | 15-second timer via `setTimeout(handleClose, 15000)` |
| **Fade Animation** | 500ms opacity transition (`opacity-0` class applied, then `onClose` fires after 500ms) |
| **Manual Close** | "ACKNOWLEDGED" button calls `handleClose()` |
| **Industry Label** | Displays industry-specific text from `industryLabels` map |
| **Z-Index** | `z-[9999]` -- sits above everything |
| **Content** | 3-step "what happens next" list: Intake Analysis, Auditor Assignment, Priority Connection |

**Industry Label Map:**

```typescript
const industryLabels: Record<string, string> = {
  medspa: "Med Spa",
  realtor: "Real Estate",
  law: "Law",
  "home-services": "Home Services",
};
```

Fallback: `"your industry"` if no match.

---

## 2. Notion Industry Vaults

### 2.1 Overview

Four dedicated Notion databases, one per industry vertical. These store **audit results, brand mine data, and deliverable tracking** for each client engagement.

**Division Ownership:**
- Med Spa + Real Estate = **LNL Creatives** (Asset Extraction pillar)
- Law + Home Services = **LNL Automations** (Systems Mining pillar)

### 2.2 Database Registry

| Database Name | Notion Database ID | Division |
|---------------|--------------------|----------|
| LNL Vault -- Med Spa | `3f5c3ac39e9d44e1b89558c89eb299bb` | LNL Creative |
| LNL Vault -- Real Estate | `81c5f71a1492451bb9afa5a95b1bd39f` | LNL Creative |
| LNL Vault -- Law | `3952b5325c5345d1a972d33e2a54c74b` | LNL Automations |
| LNL Vault -- Home Services | `ef81056d84554e1f9cbdb46a949b6535` | LNL Automations |

**Master/Legacy Vault:** `2ed2b4104a59804eb681fc0fe732d51e` (view: `2ed2b4104a5980959954000c6b1f181c`)

### 2.3 Naming Convention

All vault page titles follow this pattern:

```
[Industry] - [Business Name] - Audit [YYYY-MM-DD]
```

**Examples:**
- `Med Spa - Raleigh Aesthetics - Audit 2026-02-15`
- `Real Estate - Triangle Homes Group - Audit 2026-02-15`
- `Law - Apex Legal Partners - Audit 2026-02-15`
- `Home Services - Premier HVAC Solutions - Audit 2026-02-15`

### 2.4 Property Spec (Per Vault Database)

When creating or extending a Notion vault database, use these properties as the baseline. All four vaults share this schema.

| Property | Type | Description |
|----------|------|-------------|
| Name (title) | Title | `[Industry] - [Business Name] - Audit [Date]` |
| Contact Name | Rich text | Full name from audit form |
| Email | Email | Contact email |
| Business Name | Rich text | Company name |
| Industry | Select | `Med Spa`, `Real Estate`, `Law`, `Home Services` |
| Market | Select | `Raleigh`, `Columbus`, `Moscow` |
| Audit Date | Date | Submission date |
| Service Interest | Select | Matches `serviceInterestOptions` values |
| Asset Score | Number | 1-10 visual content self-rating |
| Content Hours | Select | Weekly hours on content (from `contentHoursOptions`) |
| Content Library | Select | `library`, `static`, `stock`, `mix` |
| Lead Next Step | Select | `dm`, `link-in-bio`, `phone`, `website-form`, `other` |
| Paid Traffic | Checkbox | Yes/No |
| CPL | Rich text | Cost per lead (if paid traffic) |
| Industry Diagnostic | Select | `yes`, `no`, `partially` |
| Tech Stack | Multi-select | Tools from `techStackOptions` |
| Competitor Reason | Rich text | Free-text diagnostic |
| Ad Link | URL | Link to recent ad/post |
| Additional Notes | Rich text | Free-text |
| HubSpot Contact ID | Number | Cross-reference to CRM record |
| Status | Select | `New`, `In Review`, `Roadmap Sent`, `Engaged`, `Closed` |

### 2.5 Industry Routing Logic

When a new audit submission hits n8n, route to the correct database:

```javascript
// n8n decision node logic
const databaseMap = {
  "medspa":        "3f5c3ac39e9d44e1b89558c89eb299bb",
  "realtor":       "81c5f71a1492451bb9afa5a95b1bd39f",
  "law":           "3952b5325c5345d1a972d33e2a54c74b",
  "home-services": "ef81056d84554e1f9cbdb46a949b6535"
};

const targetDb = databaseMap[industry] || databaseMap["home-services"];
```

---

## 3. Contact Form (General Lead Capture)

### 3.1 Overview

| Attribute | Value |
|-----------|-------|
| **Component** | `client/src/components/ContactForm.tsx` |
| **Used On** | Home page (embedded in contact section) |
| **API Endpoint** | `POST /api/leads` |
| **Webhook** | `N8N_WEBHOOK_URL` |

### 3.2 Field Specification

| Field | Key | Type | Control | Validation | Required |
|-------|-----|------|---------|------------|----------|
| Full Name | `name` | `string` | Text input | min 2 chars | Yes |
| Email Address | `email` | `string` | Email input | Valid email | Yes |
| Business Name | `businessName` | `string` | Text input | min 2 chars | Yes |
| Primary Market | `primaryMarket` | `string` | Select dropdown | Must be selected | Yes |
| Service Interest | `interest` | `string` | Select dropdown | Must be selected | Yes |
| Current Tech Stack | `techStack` | `string[]` | Multi-select combobox (grouped) | min 1 item | Yes |

**Service Interest Options (Contact Form):**

Same options as the audit form `serviceInterestOptions`.

**Primary Market Options:** `raleigh`, `columbus`, `moscow` (same as audit).

**Tech Stack Options (Contact Form):**

Same items as audit form but groups differ slightly:
- CRM: Clio, MyCase, Jobber, Housecall Pro, GoHighLevel
- Marketing: Mailchimp, Constant Contact, Podium
- Scheduling: Calendly, Acuity, Google Calendar
- Automation: Make.com, Zapier, Airtable
- Other: Other / None

### 3.3 API Contract: `POST /api/leads`

**Request:**

```json
{
  "name": "Jane Smith",
  "email": "jane@realestate.com",
  "businessName": "Triangle Homes",
  "primaryMarket": "raleigh",
  "interest": "Cinematic Listing Stories",
  "techStack": ["gohighlevel", "calendly"]
}
```

**Response (200 OK):**

```json
{
  "id": 43,
  "name": "Jane Smith",
  "email": "jane@realestate.com",
  "businessName": "Triangle Homes",
  "primaryMarket": "raleigh",
  "interest": "Cinematic Listing Stories",
  "techStack": ["gohighlevel", "calendly"],
  "source": "contact",
  "auditData": null,
  "createdAt": "2026-02-15T12:30:00.000Z",
  "webhookSent": true,
  "message": "Lead submitted successfully"
}
```

### 3.4 n8n Webhook Payload Shape (Contact)

```json
{
  "customer_name": "Jane Smith",
  "customer_email": "jane@realestate.com",
  "business_name": "Triangle Homes",
  "source_path": "Cinematic Listing Stories",
  "market": "raleigh",
  "tech_stack": "gohighlevel, calendly",
  "source": "LNL Group Website",
  "timestamp": "2026-02-15T12:30:00.000Z"
}
```

### 3.5 Success Modal (Contact Form)

Same behavior as audit modal: 15-second auto-close, fade transition, "ACKNOWLEDGED" button. Different copy:
- Header: "ARCHITECTING YOUR GROWTH..."
- Body: "The LNL Automation Engine has prioritized your inquiry."
- Same 3-step "what happens next" list.

---

## 4. VPS Infrastructure

### 4.1 Hosting

| Component | Detail |
|-----------|--------|
| **Provider** | Hostinger VPS |
| **VPS ID** | 1244684 |
| **Panel** | `https://hpanel.hostinger.com/vps/1244684/overview` |
| **OS** | Ubuntu (Linux) |
| **Process Manager** | pm2 |
| **Reverse Proxy** | nginx |
| **Database** | Neon (Serverless Postgres) |
| **n8n Instance** | `https://n8n.srv1244684.hstgr.cloud/` |

### 4.2 Deploy Process

1. **SSH into VPS** and pull latest from the source-of-truth repo (`lainiem-byte/AI-agents`).
2. **Install dependencies:** `npm install` in the project root.
3. **Build:** `npm run build` (Vite frontend + esbuild server).
4. **Start/Restart:** `pm2 restart lnlgroups` (or `pm2 start` if first deploy).
5. **Verify:** Check `pm2 logs lnlgroups` and hit the public URL.

### 4.3 nginx Configuration

nginx reverse-proxies port 443 (HTTPS) to the Node.js Express server running on a local port (managed by pm2). SSL certificates are handled via Hostinger's built-in SSL or Let's Encrypt.

### 4.4 Environment Variables (Server)

| Variable | Purpose | Used By |
|----------|---------|---------|
| `DATABASE_URL` | Neon Postgres connection string | Drizzle ORM / storage.ts |
| `N8N_WEBHOOK_URL` | General lead webhook endpoint | `forwardToWebhook()` in routes.ts |
| `N8N_AUDIT_WEBHOOK_URL` | Audit-specific webhook endpoint (optional, falls back to `N8N_WEBHOOK_URL`) | `forwardAuditToWebhook()` in routes.ts |

### 4.5 Database Schema (Neon Postgres)

**Table: `leads`**

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | `serial` | Primary key, auto-increment | -- |
| `name` | `text` | NOT NULL | -- |
| `email` | `text` | NOT NULL | -- |
| `business_name` | `text` | NOT NULL | -- |
| `primary_market` | `text` | NOT NULL | -- |
| `interest` | `text` | NOT NULL | -- |
| `tech_stack` | `text[]` | NOT NULL | -- |
| `source` | `text` | NOT NULL | `'contact'` |
| `audit_data` | `text` | Nullable | `null` |
| `created_at` | `timestamp` | NOT NULL | `now()` |

**ORM:** Drizzle ORM with `drizzle-zod` for schema-to-validation bridging.

---

## 5. Repo Architecture

### 5.1 Source of Truth

| Repo | Role | Status |
|------|------|--------|
| **`lainiem-byte/AI-agents`** (GitHub) | **Active source of truth** for all deployed code | Active |
| `lnlgroups` (directory in LNL-hub) | Legacy/archived reference copy | Archived -- do not deploy from here |
| **`LNL-hub`** (this repo) | Standards, PRDs, context docs, HubSpot guides, CLAUDE.md | Active (docs + config) |

**Rule:** All production code changes go into `lainiem-byte/AI-agents`. The `lnlgroups/` directory in LNL-hub is a snapshot for context; it is NOT deployed.

### 5.2 Project Structure (lnlgroups)

```
lnlgroups/
  client/
    src/
      pages/
        Audit.tsx              # Audit landing page
        Home.tsx               # Main site (domain router)
        Creatives.tsx          # LNL Creatives page
        Automations.tsx        # LNL Automations page
        ...
      components/
        audit/
          AuditForm.tsx        # 5-step form controller
          AuditSteps.tsx       # Step 1-5 UI components
          AuditSuccessModal.tsx # Post-submit modal
        ContactForm.tsx        # General lead capture form
        VaultAccessModal.tsx   # Client vault authentication
        ...
      lib/
        auditSchema.ts         # Zod schema + options arrays
        ...
  server/
    routes.ts                  # Express API routes (/api/audit, /api/leads, /api/vault/authenticate)
    storage.ts                 # DatabaseStorage class (Drizzle ORM)
    vaultClients.ts            # Client vault credentials and validation
    db.ts                      # Drizzle DB connection
  shared/
    schema.ts                  # Drizzle table definitions + insert schemas
```

### 5.3 Routing (App.tsx)

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `DomainRouter` | Routes by hostname: `lnlcreatives` -> Creatives, `lnlautomations` -> Automations, else Home |
| `/audit` | `Audit` | Audit landing page |
| `/creatives` | `Creatives` | Direct route to creatives page |
| `/automations` | `Automations` | Direct route to automations page |
| `/raleigh` | `Creatives` (initialLocation="raleigh") | Market-specific landing |
| `/columbus` | `Creatives` (initialLocation="columbus") | Market-specific landing |
| `/moscow` | `Creatives` (initialLocation="moscow") | Market-specific landing |
| `/portfolio/creatives` | `CreativesPortfolio` | Portfolio gallery |
| `/portfolio/automations` | `AutomationsPortfolio` | Portfolio gallery |
| `/privacy` | `Privacy` | Legal |
| `/terms` | `Terms` | Legal |

---

## 6. n8n Integration

### 6.1 Instance

| Attribute | Value |
|-----------|-------|
| **URL** | `https://n8n.srv1244684.hstgr.cloud/` |
| **Hosting** | Self-hosted on Hostinger VPS (same VPS as the web app) |
| **Mode** | Queue mode |

### 6.2 Environment Variables

| Variable | Description | Used By |
|----------|-------------|---------|
| `N8N_WEBHOOK_URL` | General-purpose webhook for contact form leads | `forwardToWebhook()` |
| `N8N_AUDIT_WEBHOOK_URL` | Dedicated webhook for audit form submissions | `forwardAuditToWebhook()` (fallback: `N8N_WEBHOOK_URL`) |

### 6.3 Webhook Payload Shapes

**Contact Form -> n8n:**

```json
{
  "customer_name": "string",
  "customer_email": "string",
  "business_name": "string",
  "source_path": "string (interest value)",
  "market": "string",
  "tech_stack": "string (comma-separated)",
  "source": "LNL Group Website",
  "timestamp": "ISO 8601 string"
}
```

**Audit Form -> n8n:**

```json
{
  "customer_name": "string",
  "customer_email": "string",
  "business_name": "string",
  "market": "string",
  "service_interest": "string",
  "tech_stack": "string (comma-separated)",
  "source": "LNL Audit Page",
  "industry": "string (medspa|realtor|law|home-services)",
  "competitor_reason": "string",
  "content_hours": "string",
  "asset_score": "string (1-10)",
  "content_library": "string",
  "lead_next_step": "string",
  "paid_traffic": "string (yes|no)",
  "cpl": "string (or empty)",
  "industry_specific": "string (yes|no|partially)",
  "ad_link": "string (or empty)",
  "additional_notes": "string (or empty)",
  "timestamp": "ISO 8601 string"
}
```

### 6.4 Connected n8n Workflows

| Workflow | ID | Trigger | What It Does |
|----------|----|---------|--------------|
| Lead Gen Agent | `DE81QfyyeSOaA778` | Scheduled / manual | Scrapes leads, scores, creates HubSpot contact + deal |
| Inbound Lead Processor | `m475ggRUeYhCBTOr` | Webhook | Processes Typebot/website leads, syncs to HubSpot |
| Cold Outreach Agent | `lhytfLiKaudl5vKa` | Trigger-based | Sends outreach emails, updates HubSpot status |
| Booking-to-Pipeline | `5kKTxZAh3ZJaZHeP` | Calendar event | Syncs bookings to HubSpot pipeline |

### 6.5 Expected n8n Flow for Audit Submissions

```
Webhook Trigger (POST from /api/audit)
  -> Parse industry field
  -> Route to correct Notion vault database (see Section 2.5)
  -> Create Notion page with naming convention
  -> Create/update HubSpot contact (set industry_vertical, lead_source_detail="website")
  -> Create HubSpot deal in "New Lead" stage
  -> Send confirmation email (< 10 min SLA)
  -> Slack notification to team
```

---

## 7. HubSpot CRM

### 7.1 Access

| Attribute | Value |
|-----------|-------|
| **Account ID** | 244721155 |
| **Dashboard** | `https://app.hubspot.com/global-home/50796003` |
| **Private App** | "LNL Lead Generation" |
| **n8n Credential ID** | `o4uV5HH0UT13vGy0` |
| **MCP Connector** | Anthropic HubSpot MCP (Claude Code / Claude Desktop) |

### 7.2 Custom Contact Properties (17 total)

All under property group `lnl_custom`.

| Property | Internal Name | Type | Options/Notes |
|----------|---------------|------|---------------|
| LNL Lead Score | `lead_score` | Number | 0-150 from AI scoring |
| Lead Tier | `lead_tier` | Dropdown | `hot`, `warm`, `cold` |
| Industry Vertical | `industry_vertical` | Dropdown | `med_spa`, `realtor`, `law_firm`, `hvac_home_services`, `other` |
| Product Recommendations | `product_recommendations` | Multi-line text | AI-generated |
| Scoring Breakdown | `scoring_breakdown` | Multi-line text | AI rationale |
| Google Rating | `google_rating` | Number | 0-5 |
| Review Count | `review_count` | Number | Total reviews |
| Facebook URL | `social_facebook` | Single-line text | -- |
| Instagram URL | `social_instagram` | Single-line text | -- |
| LinkedIn URL | `hs_linkedin_url` | Single-line text | Built-in HubSpot property |
| Has Chatbot | `has_chatbot` | Checkbox | -- |
| Has Online Booking | `has_booking` | Checkbox | -- |
| Has Email Capture | `has_email_capture` | Checkbox | -- |
| Luxury Target | `is_luxury_target` | Checkbox | Premium positioning flag |
| Lead Source Detail | `lead_source_detail` | Dropdown | `google_maps`, `yelp`, `website`, `typebot`, `referral`, `cold_outreach`, `linkedin`, `facebook`, `instagram` |
| Outreach Status | `outreach_status` | Dropdown | `pending`, `contacted`, `engaged`, `replied`, `meeting_booked`, `no_response`, `unsubscribed` |
| Scraped Date | `scraped_date` | Date | -- |
| LNL Division | `lnl_division` | Dropdown | `automations`, `creatives`, `shadow_operator` |

### 7.3 Deal Pipeline: "LNL Sales Pipeline"

| Order | Stage | Stage ID | Probability |
|-------|-------|----------|-------------|
| 0 | New Lead | `appointmentscheduled` | 10% |
| 1 | Contacted | `qualifiedtobuy` | 20% |
| 2 | Engaged | `presentationscheduled` | 30% |
| 3 | Discovery Call | `decisionmakerboughtin` | 40% |
| 4 | Proposal Sent | `contractsent` | 60% |
| 5 | Negotiation | `1303206475` | 80% |
| 6 | Closed Won | `closedwon` | 100% |
| 7 | Closed Lost | `closedlost` | 0% |
| 8 | Nurture | `1303206476` | 5% |

### 7.4 Deal Custom Properties (4 total)

| Property | Internal Name | Type | Options |
|----------|---------------|------|---------|
| Product Interest | `product_interest` | Multiple checkboxes | `lead_to_client`, `master_brain`, `custom_architecture`, `content_factory`, `shadow_operator` |
| Estimated Value | `estimated_value` | Number | -- |
| Loss Reason | `loss_reason` | Dropdown | `budget`, `timing`, `competitor`, `no_response`, `not_a_fit`, `other` |
| Win Source | `win_source` | Dropdown | `cold_outreach`, `typebot`, `referral`, `social`, `networking` |

### 7.5 Audit-to-HubSpot Field Mapping

When an audit submission creates/updates a HubSpot contact:

| Audit Field | HubSpot Property | Transform |
|-------------|------------------|-----------|
| `industry` | `industry_vertical` | `medspa` -> `med_spa`, `realtor` -> `realtor`, `law` -> `law_firm`, `home-services` -> `hvac_home_services` |
| `name` | `firstname` + `lastname` | Split on first space |
| `email` | `email` | Direct |
| `businessName` | `company` | Direct |
| -- | `lead_source_detail` | Set to `website` |
| -- | `outreach_status` | Set to `pending` |
| `interest` | (deal) `product_interest` | Map service interest to product checkbox value |
| -- | `lnl_division` | Derived from industry: medspa/realtor -> `creatives`, law/home-services -> `automations` |

---

## 8. Vault System (Client Asset Access)

### 8.1 Current State

| Component | Detail |
|-----------|--------|
| **Modal** | `VaultAccessModal.tsx` |
| **API** | `POST /api/vault/authenticate` |
| **Logic** | `vaultClients.ts` |
| **Public URL** | `vault.lnlcreatives.com` |

### 8.2 Authentication Flow

1. User clicks "Access Vault" button on site.
2. `VaultAccessModal` opens -- collects `clientId` and `accessKey`.
3. Frontend sends `POST /api/vault/authenticate` with `{ clientId, accessKey }`.
4. Server builds lookup key: `${clientId.toUpperCase()}_${accessKey.toUpperCase()}` and also tries `accessKey.toUpperCase()` as a direct key.
5. Matches against `vaultClients` registry in `vaultClients.ts`.
6. On success: returns `{ success: true, clientName, redirectUrl }`.
   - If `redirectUrl` starts with `http`, opens in new tab.
   - Otherwise, navigates to internal route.
7. On failure: returns `{ success: false, error: "Invalid credentials..." }`.

### 8.3 Current Client Registry

| Key | Client Name | Redirect |
|-----|-------------|----------|
| `RALEIGH_MED` | Raleigh Medical | Google Drive folder (placeholder) |
| `COLUMBUS_RE` | Columbus Real Estate | Notion page (placeholder) |
| `DEMO` | Demo Client | `/portfolio/creatives` |

### 8.4 Planned: Post-Login Dashboard

**Current:** Vault auth redirects to an external URL (Google Drive, Notion, etc.).

**Planned:** After authentication, redirect to an internal dashboard (`/vault/dashboard`) showing:
- Client's Notion vault pages (via Notion API)
- Deliverable status tracking
- Brand mine assets and content calendar
- Direct links to approved materials

This is a future iteration. Current MVP is redirect-based.

---

## 9. Onboarding a New Industry Niche

This section is the **template checklist** for adding a new industry vertical. Clone these steps.

### Step 1: Define the Industry

- [ ] Choose a `value` slug (e.g., `dental`, `fitness`, `restaurant`).
- [ ] Choose a display `label` (e.g., `Dental`, `Fitness Studio`, `Restaurant`).
- [ ] Determine division ownership (Creatives vs Automations).

### Step 2: Update Frontend

- [ ] **`auditSchema.ts`** -- No changes needed (industry is a free string). But update the `SelectItem` list:
  - Add `<SelectItem value="[slug]">[Label]</SelectItem>` in `AuditSteps.tsx` Step 1.
- [ ] **`AuditSteps.tsx`** Step 4 -- Add industry-specific diagnostic question:
  ```typescript
  : industry === "[slug]"
  ? "[Your diagnostic question here]"
  ```
- [ ] **`AuditSuccessModal.tsx`** -- Add to `industryLabels`:
  ```typescript
  "[slug]": "[Label]",
  ```

### Step 3: Create Notion Vault Database

- [ ] Duplicate one of the four existing vault databases in Notion.
- [ ] Name it `LNL Vault -- [Industry Label]`.
- [ ] Copy the database ID.
- [ ] Add the database ID to `.claude-context/stack.md` under Industry Vault Databases.

### Step 4: Update n8n Routing

- [ ] In the audit-processing n8n workflow, add the new industry slug to the `databaseMap`:
  ```javascript
  "[slug]": "[new-notion-database-id]"
  ```

### Step 5: Update HubSpot

- [ ] Add the new industry value to the `industry_vertical` dropdown property.
  - Use the HubSpot API or MCP connector:
    ```
    PATCH /crm/v3/properties/contacts/industry_vertical
    ```
  - Add option: `{ "label": "[Label]", "value": "[hubspot_slug]" }`.
- [ ] Create a HubSpot active list: `[Industry] Leads` with filter `industry_vertical = [hubspot_slug]`.

### Step 6: Update URL Params

- [ ] If running industry-specific ad campaigns, use link: `/audit?industry=[slug]`.
- [ ] Update any Typebot flows that route to the audit page.

### Step 7: Verify End-to-End

- [ ] Submit a test audit with the new industry selected.
- [ ] Confirm Neon Postgres stores the lead with `source: "audit"` and correct `auditData`.
- [ ] Confirm n8n webhook fires and routes to the correct Notion vault.
- [ ] Confirm HubSpot contact is created with correct `industry_vertical`.
- [ ] Confirm success modal shows the correct industry label.

---

## Appendix A: Complete Zod Schema Reference

```typescript
// client/src/lib/auditSchema.ts

export const auditSchema = z.object({
  industry: z.string({ required_error: "Select your industry" }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  businessName: z.string().min(2, "Business name is required"),
  competitorReason: z.string().min(5, "Please describe the main reason"),
  contentHours: z.string({ required_error: "Select time spent" }),
  assetScore: z.string({ required_error: "Rate your visual content" }),
  contentLibrary: z.string({ required_error: "Select content type" }),
  leadNextStep: z.string({ required_error: "Select lead's next step" }),
  paidTraffic: z.string({ required_error: "Select yes or no" }),
  cpl: z.string().optional(),
  industrySpecific: z.string({ required_error: "Please answer this question" }),
  interest: z.string({ required_error: "Select a service interest" }),
  primaryMarket: z.string({ required_error: "Select your primary market" }),
  techStack: z.array(z.string()).min(1, "Select at least one tech stack item"),
  adLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  additionalNotes: z.string().optional(),
});
```

## Appendix B: Database Insert Schema

```typescript
// shared/schema.ts

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name").notNull(),
  primaryMarket: text("primary_market").notNull(),
  interest: text("interest").notNull(),
  techStack: text("tech_stack").array().notNull(),
  source: text("source").default("contact").notNull(),
  auditData: text("audit_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});
```

## Appendix C: Success Metrics Alignment

| Metric | How This System Impacts It |
|--------|----------------------------|
| **Time Reclaimed** | Automated lead intake eliminates manual data entry; n8n routes to Notion/HubSpot without human touch |
| **Lead Velocity** | 0-second webhook fire on submission; < 10 min confirmation email SLA |
| **Consistency** | Zod validation ensures clean data; standardized naming convention prevents vault chaos |
| **Operational Freedom** | Entire flow runs 24/7 without human intervention from form submit to CRM record |

---

*Last updated: 2026-02-15. Maintained in `LNL-hub/docs/PRD-audit-landing-page.md`.*
