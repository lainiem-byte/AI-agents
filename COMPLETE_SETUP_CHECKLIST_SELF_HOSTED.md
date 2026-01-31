# LNL Automation System - Complete Setup Checklist (Self-Hosted n8n)

## Overview
This is your master checklist for setting up the complete LNL automation system with self-hosted n8n on Hostinger VPS.

---

## 📋 PHASE 1: ACCOUNTS & CREDENTIALS (Do Before Migration)

### ✅ Accounts to Create:

- [ ] **Notion Account** (free tier works)
  - Sign up at: notion.so
  - Will store client vault data

- [ ] **Google Account** (for Sheets)
  - Gmail or Google Workspace
  - Will host Master Brain spreadsheet

- [ ] **Email Account with SMTP**
  - **Option A (Easiest):** Use Gmail
  - **Option B:** Use your domain email (lainie@lnlgroup.com)
  - **Option C (Professional):** SendGrid/Postmark/Mailgun

---

### 🔑 Credentials to Gather:

#### 1. Notion Integration Token

**How to Get:**
1. Go to: [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Name: "LNL Concierge"
4. Associated workspace: Your workspace
5. Type: Internal integration
6. Click "Submit"
7. **Copy the Integration Token** (starts with `secret_`)

**Save this!** You'll paste it into n8n later.

---

#### 2. Gmail App Password (If Using Gmail)

**How to Get:**
1. Go to: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. You may need to enable 2-Step Verification first
3. Select app: Mail
4. Select device: Other (Custom name) → "n8n LNL"
5. Click "Generate"
6. **Copy the 16-character password**

**SMTP Settings for Gmail:**
- Host: `smtp.gmail.com`
- Port: `587`
- User: your-email@gmail.com
- Password: [16-character app password]

---

#### 3. Custom Domain Email (If Using Hostinger Email)

**Get from Hostinger:**
1. Log into Hostinger dashboard
2. Go to Email section
3. Find SMTP settings:
   - SMTP Host: (usually `smtp.hostinger.com`)
   - Port: `587` or `465`
   - Username: your-email@lnlgroup.com
   - Password: your email password

---

### 📊 Database IDs to Copy:

**After you create them (Phase 2):**

- [ ] **Notion Database ID**
  - Will be: `2ed2b4104a59804eb681fc0fe732d51e` (or similar)
  - Get from Notion database URL

- [ ] **Google Sheet ID** (Master Brain)
  - Get from Google Sheets URL
  - Format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

---

## 📋 PHASE 2: BUILD DATABASES (Do Before Migration)

### Step 1: Create Notion Database

**Follow Guide:** `NOTION_DATABASE_SETUP_GUIDE.md`

**Tasks:**
- [ ] Create "LNL Client Vault" page in Notion
- [ ] Add database with 19 properties
- [ ] Create all select options (Markets, Industries, Statuses)
- [ ] Share database with "LNL Concierge" integration
- [ ] Copy Database ID from URL
- [ ] Create test client record to verify

**Time:** ~30 minutes

---

### Step 2: Create Google Sheets Master Brain

**Follow Guide:** `MASTER_BRAIN_STRUCTURE.md`

**Tasks:**
- [ ] Import `LNL_Master_Brain_Template.xlsx` to Google Sheets
- [ ] Verify all 9 tabs imported correctly
- [ ] Check formulas are working (Daily Dashboard tab)
- [ ] Copy Sheet ID from URL
- [ ] Add test data to verify structure

**Time:** ~15 minutes

---

## 📋 PHASE 3: VPS MIGRATION (Week 2)

### Step 1: Migrate Websites to Hostinger VPS

**Your existing sites:**
- [ ] lnlgroups.com
- [ ] lnlautomations.com
- [ ] lnlcreatives.com

**Tasks:**
- [ ] Export sites from Replit
- [ ] Upload to Hostinger VPS
- [ ] Configure web server (Nginx/Apache)
- [ ] Test sites work
- [ ] Update DNS to point to VPS
- [ ] Verify SSL certificates

**Time:** Variable (3-8 hours depending on complexity)

---

### Step 2: Configure VPS Environment

**Tasks:**
- [ ] SSH into VPS
- [ ] Update system (`apt update && apt upgrade`)
- [ ] Install Node.js 18.x LTS
- [ ] Install PM2 process manager
- [ ] Install Nginx
- [ ] Configure firewall (UFW)
- [ ] Set up automatic backups

**Time:** ~1 hour

---

## 📋 PHASE 4: INSTALL N8N (After Migration)

**Follow Guide:** `HOSTINGER_N8N_INSTALLATION_GUIDE.md`

### Step 1: Install n8n on VPS

**Tasks:**
- [ ] Install Node.js (if not already done)
- [ ] Install n8n globally: `npm install -g n8n`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Create n8n configuration file (`~/.n8n/.env`)
- [ ] Set username and password for n8n
- [ ] Start n8n with PM2

**Time:** ~30 minutes

---

### Step 2: Configure Domain & SSL

**DNS Setup:**
- [ ] Create A record: `n8n.lnlgroup.com` → VPS IP
- [ ] Wait for DNS propagation (5-60 minutes)

**Nginx Setup:**
- [ ] Install Nginx (if not already done)
- [ ] Create n8n reverse proxy config
- [ ] Enable site configuration
- [ ] Test Nginx config
- [ ] Restart Nginx

**SSL Certificate:**
- [ ] Install Certbot
- [ ] Run: `certbot --nginx -d n8n.lnlgroup.com`
- [ ] Verify auto-renewal works

**Time:** ~30 minutes

---

### Step 3: Verify n8n Access

**Tasks:**
- [ ] Open browser: `https://n8n.lnlgroup.com`
- [ ] Login with credentials you set
- [ ] See n8n dashboard
- [ ] Go to Settings → verify Webhook URL shows correctly

**Time:** 5 minutes

---

## 📋 PHASE 5: IMPORT N8N WORKFLOWS

### Step 1: Import Concierge Agent

**Follow Guide:** `CONCIERGE_SETUP_GUIDE.md` (if you have it)

**Tasks:**
- [ ] In n8n, click "Import from File"
- [ ] Upload: `n8n-concierge-agent-workflow-UPDATED.json`
- [ ] Workflow appears in n8n

**Time:** 2 minutes

---

### Step 2: Import Personal Assistant

**Follow Guide:** `PERSONAL_ASSISTANT_SETUP_GUIDE.md`

**Tasks:**
- [ ] In n8n, click "Import from File"
- [ ] Upload: `n8n-personal-assistant-workflow.json`
- [ ] Workflow appears in n8n

**Time:** 2 minutes

---

## 📋 PHASE 6: CONFIGURE N8N CREDENTIALS

### Step 1: Add Notion Credential

**In n8n:**
- [ ] Click user icon → Credentials
- [ ] Add Credential → Notion API
- [ ] Name: "LNL Concierge Notion"
- [ ] Paste Integration Token (from Phase 1)
- [ ] Save

---

### Step 2: Add Google Sheets Credential

**In n8n:**
- [ ] Click user icon → Credentials
- [ ] Add Credential → Google Sheets OAuth2 API
- [ ] Name: "LNL Master Brain Sheets"
- [ ] Click "Sign in with Google"
- [ ] Authorize access
- [ ] Save

---

### Step 3: Add SMTP Credential

**In n8n:**
- [ ] Click user icon → Credentials
- [ ] Add Credential → SMTP
- [ ] Name: "LNL Email Sender"
- [ ] Fill in SMTP settings (from Phase 1):
  - Host: smtp.gmail.com (or your host)
  - Port: 587
  - User: your-email@gmail.com
  - Password: [app password]
  - From Email: your-email@gmail.com
  - From Name: LNL Group
- [ ] Save

---

## 📋 PHASE 7: UPDATE WORKFLOW CONFIGURATIONS

### Step 1: Update Concierge Agent

**In each Notion node:**
- [ ] Select Credential: "LNL Concierge Notion"
- [ ] Verify Database ID: `2ed2b4104a59804eb681fc0fe732d51e`

**In each Google Sheets node:**
- [ ] Select Credential: "LNL Master Brain Sheets"
- [ ] Update Sheet ID: [your Master Brain ID]

**In each Email node:**
- [ ] Select Credential: "LNL Email Sender"
- [ ] Verify "To" email is correct

**Time:** ~15 minutes

---

### Step 2: Update Personal Assistant

**In each Google Sheets node:**
- [ ] Select Credential: "LNL Master Brain Sheets"
- [ ] Update Sheet ID: [your Master Brain ID]

**In each Email node:**
- [ ] Select Credential: "LNL Email Sender"
- [ ] Update recipient email

**Time:** ~10 minutes

---

## 📋 PHASE 8: ADD NEW WEBHOOKS

### Step 1: Add Vault Status Webhook

**Follow Guide:** `N8N_VAULT_STATUS_WEBHOOK_SETUP.md`

**Tasks:**
- [ ] Open Concierge Agent workflow
- [ ] Add Webhook node (GET)
- [ ] Path: `lnl-vault-status`
- [ ] Add Code node to extract vault_key
- [ ] Add Notion node to query database
- [ ] Add Code node to format response
- [ ] Connect to webhook response
- [ ] Activate workflow
- [ ] Copy Production URL

**Time:** ~10 minutes

---

### Step 2: Add Asset Upload Webhook

**Follow Guide:** `N8N_ASSET_UPLOAD_WEBHOOK_SETUP.md`

**Tasks:**
- [ ] Open Concierge Agent workflow
- [ ] Add Webhook node (POST)
- [ ] Path: `lnl-asset-upload`
- [ ] Add Code node to extract upload data
- [ ] Add Notion node to update status
- [ ] Add Email node for confirmation
- [ ] Connect to webhook response
- [ ] Activate workflow
- [ ] Copy Production URL

**Time:** ~15 minutes

---

## 📋 PHASE 9: COLLECT WEBHOOK URLS

### Get All 3 Webhook URLs:

- [ ] **Webhook 1:** Vault Login
  - From: "Webhook: Vault Login Attempt" node
  - Format: `https://n8n.lnlgroup.com/webhook/lnl-vault-login`

- [ ] **Webhook 2:** Vault Status
  - From: New webhook node you created
  - Format: `https://n8n.lnlgroup.com/webhook/lnl-vault-status`

- [ ] **Webhook 3:** Asset Upload
  - From: New webhook node you created
  - Format: `https://n8n.lnlgroup.com/webhook/lnl-asset-upload`

**Save these URLs!** You'll need them for vault integration.

---

## 📋 PHASE 10: TEST N8N WORKFLOWS

### Test Concierge Agent:

**Test Webhook 1 (Login):**
```bash
curl -X POST https://n8n.lnlgroup.com/webhook/lnl-vault-login \
  -H "Content-Type: application/json" \
  -d '{"vault_key": "LNL-RAL-TEST1"}'
```
- [ ] Returns client data or error

**Test Webhook 2 (Status):**
```bash
curl https://n8n.lnlgroup.com/webhook/lnl-vault-status?vault_key=LNL-RAL-TEST1
```
- [ ] Returns status JSON

**Test Webhook 3 (Upload):**
```bash
curl -X POST https://n8n.lnlgroup.com/webhook/lnl-asset-upload \
  -H "Content-Type: application/json" \
  -d '{"vault_key": "LNL-RAL-TEST1", "files": ["test.png"]}'
```
- [ ] Returns success message
- [ ] Notion status updated
- [ ] Email received

---

### Test Personal Assistant:

**Test Daily Brief (Manual Trigger):**
- [ ] Open Personal Assistant workflow
- [ ] Find "Daily Brief" schedule node
- [ ] Click "Execute Workflow"
- [ ] Check email inbox for Daily Brief

**Test VIP Escalation:**
- [ ] Add test lead to Master Brain with score > 8.5
- [ ] Wait 15 minutes OR manually trigger
- [ ] Check email for VIP alert

**Time for all tests:** ~30 minutes

---

## 📋 PHASE 11: BUILD VAULT ON VPS (After Migration & n8n Setup)

**I'll provide VPS-specific instructions when you're ready!**

**Tasks:**
- [ ] Build vault login page
- [ ] Build vault dashboard with backend
- [ ] Configure environment variables (webhook URLs)
- [ ] Deploy to vault.lnlgroup.com
- [ ] Test complete flow

**Time:** ~2-3 hours

---

## ✅ COMPLETE SETUP CHECKLIST SUMMARY

### Week 1 (Before Migration):
- [x] Create accounts (Notion, Google)
- [x] Gather credentials (API tokens, SMTP)
- [x] Build Notion database
- [x] Import Google Sheets template

### Week 2 (Migration):
- [ ] Migrate websites to Hostinger VPS
- [ ] Configure VPS environment
- [ ] Install n8n on VPS
- [ ] Configure domain & SSL for n8n

### Week 3 (n8n Setup):
- [ ] Import workflows to n8n
- [ ] Configure credentials
- [ ] Add 2 new webhooks
- [ ] Test all workflows
- [ ] Get webhook URLs

### Week 4 (Vault Integration):
- [ ] Build vault on VPS
- [ ] Connect to n8n
- [ ] End-to-end testing
- [ ] Launch to first client

---

## 🎯 QUICK REFERENCE: WHAT YOU NEED

### Right Now (Phase 1):
✅ Notion Integration Token
✅ Gmail App Password (or SMTP credentials)
✅ Google account

### After Creating Databases (Phase 2):
✅ Notion Database ID
✅ Google Sheet ID

### After Installing n8n (Phase 4):
✅ n8n subdomain configured (n8n.lnlgroup.com)
✅ n8n accessible via HTTPS

### After Adding Webhooks (Phase 8):
✅ 3 webhook URLs from n8n
✅ Saved for vault integration

---

## 📞 SUPPORT RESOURCES

**If you get stuck:**
- Notion API Docs: https://developers.notion.com
- n8n Documentation: https://docs.n8n.io
- Google Sheets API: https://developers.google.com/sheets
- Hostinger Support: support.hostinger.com

**When you're ready for vault integration, just say:**
> "I've completed Phase 9 and I'm ready to build the vault on VPS"

And I'll provide complete VPS-specific vault deployment code and instructions! 🚀

---

Your LNL Mechanical Heart setup guide is complete! 🏛️⚙️
