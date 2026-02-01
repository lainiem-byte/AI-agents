# LNL Concierge Agent - Complete Setup Guide

## Overview

The Concierge Agent is the "System Warden" that bridges contract signing to the Mechanical Heart build. It manages:

1. **Vault Access Keys** - Generation, validation, revocation
2. **Client Authentication** - Login at vault.lnlgroup.com
3. **Asset Monitoring** - Checks for Pillar 1 uploads
4. **Logic Stall Detection** - Alerts when builds are blocked
5. **Status Updates** - Keeps Notion and clients in sync

---

## Architecture

```
┌─────────────────────────────────────┐
│  vault.lnlgroup.com                 │
│  (Login Frontend)                   │
└──────────────┬──────────────────────┘
               │ POST /vault-auth
               ↓
┌─────────────────────────────────────┐
│  n8n Concierge Agent                │
│  ├── Validate Key Format            │
│  ├── Search Notion Database         │
│  ├── Check Key Status               │
│  ├── Update Login Stats             │
│  └── Return Auth Response           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Notion (Client Vault Database)     │
│  └── Client pages with status       │
└─────────────────────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Google Sheets (VAULT_LOGS)         │
│  └── Login/activity tracking        │
└─────────────────────────────────────┘
```

---

## Part 1: Notion Setup

### Step 1: Create Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Configure:
   - Name: `LNL Concierge`
   - Associated workspace: Your workspace
   - Capabilities: Read, Update, Insert content
4. Click **"Submit"**
5. Copy the **Internal Integration Token** (starts with `secret_`)

### Step 2: Create Client Vault Database

1. Create a new page: **"LNL Client Vault"**
2. Add a **Full-page database** inside
3. Add these properties:

| Property Name | Type | Options/Notes |
|---------------|------|---------------|
| Client Name | Title | Primary field |
| Business Name | Text | |
| Market | Select | Raleigh, Columbus, Moscow |
| Industry | Select | Med Spa, Realtor, Law, HVAC |
| Pillar Focus | Select | Creative, Automations, Both |
| Vault Key | Text | LNL-XXX-XXXXX format |
| Key Status | Select | Active, Revoked, Expired |
| Key Issued Date | Date | |
| Last Login | Date | |
| Total Logins | Number | |
| Project Status | Select | Contract Signed, Pillar 1 Pending, Processing, Active, Paused, Complete |
| Pillar 1 Status | Select | Not Started, Assets Requested, Assets Received, Extraction Complete |
| Owner Name | Text | |
| Email | Email | |
| Phone | Phone | |
| Notes | Text | |

### Step 3: Share Database with Integration

1. Open your database
2. Click **"..."** (top right) → **"Connections"**
3. Search for **"LNL Concierge"**
4. Click to connect

### Step 4: Get Database ID

1. Open database in browser
2. Copy ID from URL:
```
https://notion.so/workspace/DATABASE_ID?v=...
                        ^^^^^^^^^^^
                        Copy this
```

---

## Part 2: Google Sheets Setup

### Add VAULT_LOGS Tab

Add a new tab to your existing Google Sheet called **"VAULT_LOGS"** with these columns:

| Column | Header |
|--------|--------|
| A | Timestamp |
| B | Key |
| C | Client |
| D | Market |
| E | IP Address |
| F | Status |
| G | Action |

**Status Values:**
- SUCCESS
- FAILED
- CREATED

**Action Values:**
- LOGIN
- KEY_GENERATED
- KEY_REVOKED

---

## Part 3: Vault Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

1. Create account at [vercel.com](https://vercel.com)
2. Create new project
3. Upload `vault-login.html` as `index.html`
4. Set custom domain: `vault.lnlgroup.com`

### Option B: Deploy to Replit

1. Create account at [replit.com](https://replit.com)
2. Create new HTML/CSS/JS Repl
3. Paste contents of `vault-login.html` into `index.html`
4. Click "Run"
5. Set custom domain in Replit settings

### Option C: Deploy to Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop `vault-login.html` (renamed to `index.html`)
3. Set custom domain: `vault.lnlgroup.com`

### Update Webhook URL

After deploying n8n, update `vault-login.html`:

```javascript
const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/vault-auth';
```

---

## Part 4: n8n Setup

### Environment Variables

Add these to your n8n environment:

```
NOTION_VAULT_DATABASE_ID=your_database_id
NOTION_API_KEY=secret_xxx
GOOGLE_SHEET_ID=your_sheet_id
SENDER_EMAIL=vault@lnlgroup.com
NOTIFICATION_EMAIL=lainie@lnlgroup.com
```

### Credentials to Configure

1. **Notion API**
   - Name: `Notion API`
   - API Key: Your integration token

2. **Google Sheets**
   - Already configured from Lead Gen setup

3. **Email (SMTP)**
   - Already configured from Outreach setup

### Import Workflow

1. Open n8n
2. Click **"Add Workflow"** → **"Import from File"**
3. Select `n8n-concierge-agent-workflow.json`
4. Update credentials on each node

---

## Part 5: Webhook URLs

After setup, your webhooks will be:

| Webhook | URL | Purpose |
|---------|-----|---------|
| Vault Auth | `https://your-n8n.com/webhook/vault-auth` | Login validation |
| Contract Signed | `https://your-n8n.com/webhook/contract-signed` | New client initialization |

### Contract Signed Webhook - Request Format

When you sign a new client, POST to the contract webhook:

```json
{
  "client_name": "John Smith",
  "business_name": "Smith Med Spa",
  "market": "Raleigh",
  "industry": "Med Spa",
  "email": "john@smithmedspa.com",
  "phone": "919-555-1234",
  "pillar_focus": "Both"
}
```

This will:
1. Generate unique access key (e.g., `LNL-RAL-8K4T2`)
2. Create Notion page
3. Send welcome email with key
4. Log to Google Sheets
5. Notify you

---

## Part 6: Access Key Format

Keys follow this structure:

```
LNL-[MARKET]-[RANDOM]
    ↓        ↓
    3 chars  5 chars

Examples:
- LNL-RAL-8K4T2 (Raleigh)
- LNL-COL-N7W3P (Columbus)
- LNL-MOS-4F9XY (Moscow)
```

**Market Codes:**
- RAL = Raleigh
- COL = Columbus
- MOS = Moscow
- GEN = General/Other

---

## Part 7: Alert Timeline

| Hours Since Key | Alert Level | Action |
|-----------------|-------------|--------|
| 0-24 | None | Awaiting assets |
| 24-48 | REMINDER | "Asset Reminder" email |
| 48+ | LOGIC_STALL | "Build Paused" email + status update |

---

## Part 8: Testing Checklist

### Test 1: Invalid Key (Should Reject)
1. Go to vault.lnlgroup.com
2. Enter: `LNL-XXX-AAAAA`
3. ✅ Should see "Access denied. Invalid key."

### Test 2: Invalid Format (Should Reject)
1. Go to vault.lnlgroup.com
2. Enter: `BADKEY123`
3. ✅ Should see "Invalid key format."

### Test 3: New Client Flow
1. POST to `/webhook/contract-signed`:
```json
{
  "client_name": "Test Client",
  "business_name": "Test Business",
  "market": "Raleigh",
  "industry": "Med Spa",
  "email": "test@example.com",
  "pillar_focus": "Creative"
}
```
2. ✅ Should receive welcome email with key
3. ✅ Should see new page in Notion
4. ✅ Should see log entry in VAULT_LOGS

### Test 4: Valid Login
1. Use key from Test 3
2. Enter at vault.lnlgroup.com
3. ✅ Should see initialization animation
4. ✅ Should redirect to Notion page
5. ✅ Notion "Last Login" should update
6. ✅ VAULT_LOGS should show SUCCESS

### Test 5: Logic Stall (Wait 48 hrs or manually trigger)
1. Create client but don't upload assets
2. Wait for scheduled check (or run manually)
3. ✅ Should receive LOGIC STALL email
4. ✅ Notion status should update

---

## Part 9: Manual Key Management

### Revoke a Key
1. Open client's Notion page
2. Change "Key Status" from `Active` to `Revoked`
3. Client will see "Access key has been revoked" on next login attempt

### Expire a Key
1. Change "Key Status" to `Expired`
2. Typically done 14 days after project handover

### Generate New Key for Existing Client
1. POST to contract-signed webhook with same client info
2. Or manually edit Notion page with new key

---

## Troubleshooting

### "CORS Error" on Login
- Ensure n8n webhook allows cross-origin requests
- Add your vault domain to n8n's allowed origins

### "Key Not Found" for Valid Key
- Check Notion database is shared with integration
- Verify database ID is correct
- Ensure "Vault Key" property name matches exactly

### Emails Not Sending
- Verify SMTP credentials
- Check spam folder
- Review n8n execution logs

### Notion Updates Failing
- Verify API token hasn't expired
- Check property names match exactly (case-sensitive)
- Ensure integration has write permissions

---

## Files Included

| File | Purpose |
|------|---------|
| `n8n-concierge-agent-workflow.json` | Import into n8n |
| `vault-login.html` | Deploy to hosting |
| `CONCIERGE_SETUP_GUIDE.md` | This file |
