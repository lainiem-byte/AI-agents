# LNL Audit Landing Page -- User Guide

> **TL;DR:** The audit page is a 5-step diagnostic form at `/audit` that captures lead data, stores it in Postgres, and fires a webhook to n8n for automated follow-up. This guide covers how to use it, maintain it, add industries, update dropdowns, deploy changes, and troubleshoot.

---

## Table of Contents

1. [Page Overview](#page-overview)
2. [How the Form Works (End-User Flow)](#how-the-form-works)
3. [URL Parameters](#url-parameters)
4. [Data Flow: Form to Database to n8n](#data-flow)
5. [Adding a New Industry](#adding-a-new-industry)
6. [Updating Dropdown Options](#updating-dropdown-options)
7. [Environment Variables](#environment-variables)
8. [Deployment Playbook](#deployment-playbook)
9. [VPS Connection Details](#vps-connection-details)
10. [Database Operations](#database-operations)
11. [File Reference Map](#file-reference-map)

---

## Page Overview

| Detail | Value |
|---|---|
| **Route** | `/audit` |
| **Live URL** | `https://lnlgroups.com/audit` |
| **Purpose** | Capture qualified leads via a 5-step diagnostic form |
| **Division** | LNL Group (serves both Creatives and Automations pipelines) |
| **Pillar** | Asset Extraction (Authority) + Systems Mining (Architecture) |

The audit page replaces generic contact forms with a **guided diagnostic** that pre-qualifies leads and delivers rich data to the sales pipeline before anyone picks up the phone.

---

## How the Form Works

The form has **5 steps** with per-step validation. Users cannot advance until the current step passes validation.

| Step | Title | Fields Collected |
|---|---|---|
| **1** | Identity | Industry, Full Name, Email, Business Name |
| **2** | Visual Authority | Competitor Reason (textarea), Content Hours (dropdown), Asset Score (1-10 radio) |
| **3** | Creative & Conversion | Content Library (radio), Lead Next Step (dropdown), Paid Traffic (yes/no), CPL (conditional -- only shows if paid traffic = yes) |
| **4** | Industry & Routing | Industry-Specific Question (dynamic per industry), Service Interest (dropdown), Primary Market (dropdown) |
| **5** | Final Details | Tech Stack (multi-select), Ad Link (optional URL), Additional Notes (optional textarea) |

- **Progress bar** at the top shows gold fill for completed steps.
- **Back / Continue** navigation between steps.
- **Submit Audit** button on Step 5 posts to `/api/audit`.
- **Success modal** appears on successful submission with industry-specific messaging.

---

## URL Parameters

The audit page reads the `industry` query parameter to **pre-select the industry dropdown** on Step 1.

**Supported values:**

| URL | Pre-selected Industry |
|---|---|
| `/audit?industry=medspa` | Med Spa |
| `/audit?industry=realtor` | Real Estate |
| `/audit?industry=law` | Law |
| `/audit?industry=home-services` | Home Services |
| `/audit` (no param) | No pre-selection -- user must choose |

**How it works:**
1. `Audit.tsx` reads `window.location.search` and extracts `?industry=...`
2. Passes the value as `initialIndustry` prop to `AuditForm`
3. `AuditForm` sets it as the `defaultValues.industry` in the form

**Use case:** Link directly from industry-specific ad campaigns, emails, or Typebot flows so leads skip the industry selection.

---

## Data Flow

```
User submits form
       |
       v
POST /api/audit  (client/src/components/audit/AuditForm.tsx)
       |
       v
Server route handler  (server/routes.ts)
       |
       +---> 1. Parse & validate via insertLeadSchema
       |         - Stores audit diagnostic fields as JSON string in `auditData` column
       |         - Sets source = "audit"
       |
       +---> 2. storage.createLead()  -->  Postgres `leads` table
       |
       +---> 3. forwardAuditToWebhook()  -->  n8n webhook (flat payload)
       |
       v
Response: { lead record, webhookSent: true/false, message }
```

### What gets stored in the database (`leads` table)

| Column | Source |
|---|---|
| `name` | Form field |
| `email` | Form field |
| `business_name` | Form field |
| `primary_market` | Form field (defaults to `"raleigh"` if empty) |
| `interest` | Form field (defaults to `"30-Minute Efficiency Audit"` if empty) |
| `tech_stack` | Array of selected tech stack values |
| `source` | Always `"audit"` for audit submissions |
| `audit_data` | JSON string containing all diagnostic fields (industry, competitorReason, contentHours, assetScore, contentLibrary, leadNextStep, paidTraffic, cpl, industrySpecific, adLink, additionalNotes) |
| `created_at` | Auto-generated timestamp |

### What gets sent to n8n (webhook payload)

The webhook sends a **flat** JSON object (no nested structures):

```json
{
  "customer_name": "...",
  "customer_email": "...",
  "business_name": "...",
  "market": "...",
  "service_interest": "...",
  "tech_stack": "comma, separated, string",
  "source": "LNL Audit Page",
  "industry": "...",
  "competitor_reason": "...",
  "content_hours": "...",
  "asset_score": "...",
  "content_library": "...",
  "lead_next_step": "...",
  "paid_traffic": "...",
  "cpl": "...",
  "industry_specific": "...",
  "ad_link": "...",
  "additional_notes": "...",
  "timestamp": "ISO 8601"
}
```

**Key difference:** `tech_stack` is an array in the DB but a comma-separated string in the webhook payload.

**Webhook fallback logic:** The server checks for `N8N_AUDIT_WEBHOOK_URL` first. If not set, it falls back to `N8N_WEBHOOK_URL`. If neither is set, the webhook is skipped (lead is still saved to DB).

---

## Adding a New Industry

Adding a new industry requires changes in **3 files**. Here is the exact checklist:

### Step 1: Add the industry to the dropdown

**File:** `lnlgroups/client/src/components/audit/AuditSteps.tsx`

Find the `Step1Identity` function and add a new `<SelectItem>` inside the industry `<SelectContent>`:

```tsx
<SelectContent>
  <SelectItem value="medspa">Med Spa</SelectItem>
  <SelectItem value="realtor">Real Estate</SelectItem>
  <SelectItem value="law">Law</SelectItem>
  <SelectItem value="home-services">Home Services</SelectItem>
  {/* ADD YOUR NEW INDUSTRY HERE */}
  <SelectItem value="your-slug">Your Industry Name</SelectItem>
</SelectContent>
```

**Important:** The `value` is the slug used in URL params and data storage. Keep it lowercase, hyphenated.

### Step 2: Add the industry-specific diagnostic question

**File:** `lnlgroups/client/src/components/audit/AuditSteps.tsx`

Find the `Step4IndustryRouting` function and the `industryQuestion` conditional chain. Add a new branch:

```tsx
const industryQuestion =
  industry === "medspa"
    ? "Do you have professional Before & After content..."
    : industry === "realtor"
    ? "Do you have a systemized way to turn a single property listing..."
    : industry === "law"
    ? "Do you have a systemized intake process..."
    : industry === "your-slug"
    ? "Your industry-specific diagnostic question here?"
    : "Do you have automated scheduling and follow-up for service calls?";
```

**Note:** The final fallback (`home-services` and any unrecognized values) uses the default question. If you want `home-services` to have its own unique question, give it an explicit branch before the default.

### Step 3: (Optional) Add industry-specific success messaging

**File:** `lnlgroups/client/src/components/audit/AuditSuccessModal.tsx`

If the success modal has industry-specific copy, update it to handle the new slug.

### After adding, test with:

```
/audit?industry=your-slug
```

---

## Updating Dropdown Options

All dropdown option arrays live in a **single file**:

**File:** `lnlgroups/client/src/lib/auditSchema.ts`

### Service Interest Options

```ts
export const serviceInterestOptions = [
  { label: "LNL Creative: Aesthetic Scaling", value: "Aesthetic Scaling" },
  { label: "LNL Creative: Cinematic Listing Stories", value: "Cinematic Listing Stories" },
  { label: "LNL Automations: Workflow Architecture", value: "Workflow Architecture" },
  { label: "LNL Automations: Lead Capture Systems", value: "Lead Capture Systems" },
  { label: "Full Ecosystem Buildout", value: "Full Ecosystem Buildout" },
  { label: "30-Minute Efficiency Audit", value: "30-Minute Efficiency Audit" },
];
```

Add, remove, or reorder entries. `label` is what the user sees; `value` is what gets stored and sent to n8n.

### Tech Stack Options

```ts
export const techStackOptions = [
  { label: "Clio", value: "clio", group: "CRM" },
  // ...
];
```

Each entry needs `label`, `value`, and `group`. **Valid groups** (these are used for the grouped multi-select UI):
- `CRM`
- `Marketing`
- `Scheduling`
- `LNL Favorites`
- `Other`

To add a new group, also update the group list in `AuditSteps.tsx` Step 5 (`Step5FinalHook`) where the `CommandGroup` components are mapped:

```tsx
{["CRM", "Marketing", "Scheduling", "LNL Favorites", "Other"].map(
```

### Market Options

```ts
export const marketOptions = [
  { label: "Raleigh / Durham, NC", value: "raleigh" },
  { label: "Columbus, OH", value: "columbus" },
  { label: "Moscow, ID", value: "moscow" },
];
```

### Content Hours Options

```ts
export const contentHoursOptions = [
  { label: "0-2 hours", value: "0-2" },
  // ...
];
```

### Lead Next Step Options

```ts
export const leadNextStepOptions = [
  { label: "DM", value: "dm" },
  { label: "Link in Bio", value: "link-in-bio" },
  { label: "Phone Call", value: "phone" },
  { label: "Website Form", value: "website-form" },
  { label: "Other", value: "other" },
];
```

**No server changes needed** for dropdown updates -- these are purely client-side arrays. The server accepts whatever string values the form sends.

---

## Environment Variables

Set these on the VPS where the app runs (`/root/lnlgroups`).

| Variable | Required | Purpose |
|---|---|---|
| `N8N_AUDIT_WEBHOOK_URL` | Recommended | Dedicated webhook URL for audit form submissions. Points to your n8n audit workflow. |
| `N8N_WEBHOOK_URL` | Fallback | General webhook URL. Used for audit if `N8N_AUDIT_WEBHOOK_URL` is not set. Also used by the contact form. |
| `DATABASE_URL` | Yes | Postgres connection string for the `leads` table. |

### Setting `N8N_AUDIT_WEBHOOK_URL` on the VPS

```bash
# SSH into VPS
ssh root@72.62.170.65

# Option A: Add to .env file in the project directory
cd /root/lnlgroups
echo 'N8N_AUDIT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/audit-id' >> .env

# Option B: Set in PM2 ecosystem config
# Edit ecosystem.config.js and add to env section:
#   N8N_AUDIT_WEBHOOK_URL: "https://your-n8n-instance.com/webhook/audit-id"

# Restart the app to pick up the new variable
pm2 restart lnlgroups
```

**Webhook fallback chain:**
1. Server checks `N8N_AUDIT_WEBHOOK_URL` first
2. Falls back to `N8N_WEBHOOK_URL`
3. If neither is set, webhook is skipped (data still saved to DB -- no data loss)

---

## Deployment Playbook

**Source repo:** `lainiem-byte/AI-agents` on GitHub (the `lnlgroups` directory within it)

### Full deployment sequence:

```bash
# 1. Push your changes to the repo
git add .
git commit -m "feat: your change description"
git push origin main

# 2. SSH into the Hostinger VPS
ssh root@72.62.170.65

# 3. Navigate to project directory
cd /root/lnlgroups

# 4. Pull latest code
git pull origin main

# 5. Install any new dependencies (if package.json changed)
npm install

# 6. Build the production bundle
npm run build

# 7. Restart the process via PM2
pm2 restart lnlgroups

# 8. Verify it's running
pm2 status
pm2 logs lnlgroups --lines 20
```

### Quick deploy (no dependency changes):

```bash
ssh root@72.62.170.65
cd /root/lnlgroups && git pull && npm run build && pm2 restart lnlgroups
```

### If you changed the database schema:

```bash
# After git pull, before build:
npm run db:push
```

---

## VPS Connection Details

| Detail | Value |
|---|---|
| **Host** | `72.62.170.65` |
| **User** | `root` |
| **Provider** | Hostinger |
| **Project path** | `/root/lnlgroups` |
| **Process manager** | PM2 |
| **Process name** | `lnlgroups` |

### Useful VPS commands:

```bash
# Check app status
pm2 status

# View live logs
pm2 logs lnlgroups

# Restart the app
pm2 restart lnlgroups

# Check which port the app is running on
pm2 describe lnlgroups
```

---

## Database Operations

The app uses **Drizzle ORM** with PostgreSQL. The schema lives in `lnlgroups/shared/schema.ts`.

### The `leads` table schema:

```
id            SERIAL PRIMARY KEY
name          TEXT NOT NULL
email         TEXT NOT NULL
business_name TEXT NOT NULL
primary_market TEXT NOT NULL
interest      TEXT NOT NULL
tech_stack    TEXT[] NOT NULL
source        TEXT NOT NULL DEFAULT 'contact'
audit_data    TEXT (nullable -- JSON string for audit submissions)
created_at    TIMESTAMP NOT NULL DEFAULT now()
```

### Push schema changes to the database:

```bash
ssh root@72.62.170.65
cd /root/lnlgroups
npm run db:push
```

This runs `drizzle-kit push`, which compares your Drizzle schema definition against the live database and applies any differences. **No migration files needed** -- Drizzle Kit handles it directly.

### When to run `db:push`:

- You added a new column to the `leads` table in `shared/schema.ts`
- You changed a column type or constraint
- You added a new table

### Querying leads directly (if needed):

Connect to the Postgres database using the `DATABASE_URL` from the `.env` file, then:

```sql
-- All audit submissions
SELECT * FROM leads WHERE source = 'audit' ORDER BY created_at DESC;

-- Audit submissions with parsed diagnostic data
SELECT name, email, business_name, audit_data::json FROM leads WHERE source = 'audit';
```

---

## File Reference Map

| File | Purpose |
|---|---|
| `client/src/pages/Audit.tsx` | Page component; reads URL params, renders header + form |
| `client/src/components/audit/AuditForm.tsx` | Multi-step form logic, validation, submission to `/api/audit` |
| `client/src/components/audit/AuditSteps.tsx` | Step 1-5 UI components, industry dropdown, industry-specific questions |
| `client/src/components/audit/AuditSuccessModal.tsx` | Post-submission success modal |
| `client/src/lib/auditSchema.ts` | Zod validation schema + all dropdown option arrays |
| `server/routes.ts` | `/api/audit` POST handler, DB storage, webhook forwarding |
| `shared/schema.ts` | Drizzle ORM schema for the `leads` table |

All paths above are relative to `lnlgroups/` within the repo.

---

## Quick-Reference: Common Tasks

| Task | What to Edit | Deploy? |
|---|---|---|
| Add a new industry | `AuditSteps.tsx` (dropdown + question) | Yes |
| Change service interest options | `auditSchema.ts` (`serviceInterestOptions`) | Yes |
| Add a market | `auditSchema.ts` (`marketOptions`) | Yes |
| Add a tech stack tool | `auditSchema.ts` (`techStackOptions`) + possibly `AuditSteps.tsx` if adding a new group | Yes |
| Change the n8n webhook URL | `.env` on VPS | Restart PM2 only |
| Add a column to the leads table | `shared/schema.ts` + `server/routes.ts` | Yes + `db:push` |
| Fix a typo in form copy | `AuditSteps.tsx` | Yes |
