# LNL Personal Assistant Agent - Complete Setup Guide

## Overview
The Personal Assistant Agent is your executive interface - it filters noise, protects your time, and manages the Master Brain. This guide will help you deploy the complete system.

---

## 📋 WHAT YOU'RE BUILDING

### Agent Capabilities

| Feature | Trigger | Action |
|---------|---------|--------|
| **Daily Initialization Brief** | Every weekday at 7:30 AM | Comprehensive dashboard summary email |
| **VIP Lead Escalation** | Every 15 minutes | Alert when audit score > 8.5 |
| **Pre-Call Intelligence** | 30 minutes before scheduled calls | Detailed briefing with psychic opening, logic hammer, etc. |
| **Sheet Hygiene** | Every night at 2:00 AM | Archives old leads, logs cleanup |
| **Weekly Scorecard** | Every Sunday at 6:00 PM | KPI summary and week-ahead focus |
| **Asset Verification Nudge** | Every 2 hours | Alerts when Concierge detects LOGIC STALL |

---

## 🚀 STEP 1: CREATE THE MASTER BRAIN (GOOGLE SHEETS)

### Option A: Import the Template

1. **Download** the `LNL_Master_Brain_Template.xlsx` file included in this package
2. **Go to** [Google Sheets](https://sheets.google.com)
3. **Click** File → Import → Upload
4. **Select** `LNL_Master_Brain_Template.xlsx`
5. **Import location:** "Create new spreadsheet"
6. **Rename** the sheet to "LNL Master Brain"

### Option B: Build Manually

Follow the detailed structure in `MASTER_BRAIN_STRUCTURE.md` to create:

**9 Tabs:**
1. Lead Pipeline
2. Pre-Call Intelligence
3. Daily Dashboard
4. VIP Escalations
5. Sheet Hygiene Log
6. Archived Leads
7. Weekly Scorecard Data
8. Legacy Slots
9. Concierge Agent Status

### After Import/Creation

1. **Set up data validation** (dropdowns) for:
   - Status columns → NEW, AUDIT_SENT, CALL_SCHEDULED, etc.
   - Market columns → Raleigh, Columbus, Moscow
   - Industry columns → Med Spa, Realtor, Law, HVAC

2. **Add conditional formatting:**
   - Status = "NEW" → Light blue
   - Status = "CONTRACT_SIGNED" → Green
   - Audit Score > 8.5 → Bold + Gold text
   - Status = "IDLE" → Red

3. **Insert formulas** in Daily Dashboard tab:
   ```
   =COUNTIFS('Lead Pipeline'!B:B,">="&TODAY()-1,'Lead Pipeline'!B:B,"<"&TODAY())
   ```

4. **Get your Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                        ^^^^^^^^^^^^^^^^
                                        Copy this
   ```

---

## 🔧 STEP 2: IMPORT N8N WORKFLOW

1. **Open n8n**
2. **Click** "Workflows" → "Import from File"
3. **Select** `n8n-personal-assistant-workflow.json`
4. **Click** "Import"

---

## 🔑 STEP 3: CONFIGURE CREDENTIALS

The workflow requires 2 credentials:

### 1. Google Sheets OAuth2

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **"Google Sheets OAuth2 API"**
3. Click **"Connect my account"**
4. **Sign in** with your Google account
5. **Grant permissions** to access Google Sheets
6. **Name it:** "Google Sheets - Master Brain"
7. **Save**

### 2. SMTP (Email)

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **"SMTP"**
3. Enter your email settings:
   - **Host:** (e.g., smtp.gmail.com, smtp.office365.com)
   - **Port:** 587 (for TLS) or 465 (for SSL)
   - **User:** your-email@lnlgroup.com
   - **Password:** Your email password or app-specific password
4. **Name it:** "LNL Email"
5. **Save**

**For Gmail:** You'll need to create an [App Password](https://support.google.com/accounts/answer/185833)

---

## 📝 STEP 4: UPDATE WORKFLOW PLACEHOLDERS

Open the imported workflow and update these values:

### In ALL Google Sheets Nodes:

Replace:
```
"documentId": "YOUR_GOOGLE_SHEET_ID"
```

With your actual Sheet ID:
```
"documentId": "1a2b3c4d5e6f7g8h9i0j"
```

### In ALL Email Send Nodes:

Replace:
```
"toEmail": "YOUR_EMAIL_HERE"
```

With your actual email:
```
"toEmail": "lainie@lnlgroup.com"
```

### Quick Find-Replace Method:

1. Click **"Workflows"** → **"..." menu** → **"Export"**
2. Open the exported JSON in a text editor
3. **Find and replace:**
   - `YOUR_GOOGLE_SHEET_ID` → Your actual Sheet ID
   - `YOUR_EMAIL_HERE` → Your actual email
   - `YOUR_GOOGLE_SHEETS_CREDENTIAL_ID` → Leave as-is (n8n auto-assigns)
   - `YOUR_SMTP_CREDENTIAL_ID` → Leave as-is (n8n auto-assigns)
4. **Re-import** the updated workflow

---

## ⚙️ STEP 5: ASSIGN CREDENTIALS TO NODES

After importing, you need to link credentials to each node:

### Google Sheets Nodes (14 total):
- Read Daily Dashboard
- Read Lead Pipeline
- Read Pipeline for VIP Check
- Log VIP Escalation to Sheet
- Read Pre-Call Intelligence
- Mark Brief as Sent
- Read Pipeline for Hygiene
- Move Leads to Archived Tab
- Log Hygiene Action
- Read Weekly Scorecard Data
- Read Pipeline for Scorecard
- Read Concierge Status

**For each one:**
1. Click the node
2. Under **"Credentials"**, select "Google Sheets - Master Brain"
3. Click **"Save"**

### Email Send Nodes (6 total):
- Send Daily Brief Email
- Send VIP Alert Email
- Send Pre-Call Brief Email
- Send Weekly Scorecard Email
- Send Asset Verification Nudge

**For each one:**
1. Click the node
2. Under **"Credentials"**, select "LNL Email"
3. Click **"Save"**

---

## 🧪 STEP 6: TEST EACH AUTOMATION

### Test 1: Daily Brief (7:30 AM Weekdays)

**Manual Trigger:**
1. Click the **"Schedule: Daily 7:30 AM Brief"** node
2. Click **"Execute Node"**
3. Check your email for the Daily Brief

**Expected Output:**
- Email with metrics, calls schedule, VIP leads, new leads
- Subject: "🧠 Daily Brief: [Date]"

**Troubleshooting:**
- ❌ No email? Check SMTP credentials
- ❌ Empty data? Check Google Sheets connection and Daily Dashboard formulas
- ❌ Error "Sheet not found"? Verify Sheet ID is correct

---

### Test 2: VIP Lead Escalation (Every 15 min)

**Setup Test Data:**
1. In your Google Sheet **"Lead Pipeline"** tab
2. Add a test lead with:
   - **Audit Score:** 9.5
   - **Status:** AUDIT_SENT
   - Fill in Business Name, Email, etc.

**Manual Trigger:**
1. Click **"Schedule: VIP Escalation Check"** node
2. Click **"Execute Node"**
3. Check your email for VIP Alert
4. Check **"VIP Escalations"** tab in your sheet

**Expected Output:**
- Email: "🚨 VIP LEAD ALERT: [Business] - 9.5/10"
- New row in VIP Escalations tab

---

### Test 3: Pre-Call Intelligence (30 min before calls)

**Setup Test Data:**
1. In your Google Sheet **"Pre-Call Intelligence"** tab
2. Add a test call:
   - **Call Date/Time:** 35 minutes from now
   - **Brief Sent:** FALSE
   - Fill in all other required fields

**Manual Trigger:**
1. Click **"Schedule: Pre-Call Check"** node
2. Click **"Execute Node"**
3. Check your email for Pre-Call Brief

**Expected Output:**
- Email: "📞 PRE-CALL BRIEF: [Business] in 30 minutes"
- Psychic Opening, Logic Hammer, Architectural Path included
- **Brief Sent** marked TRUE in sheet

---

### Test 4: Sheet Hygiene (2:00 AM Daily)

**Setup Test Data:**
1. In your Google Sheet **"Lead Pipeline"** tab
2. Add a test lead with:
   - **Status:** EXIT_SENT
   - **Last Contact Date:** 3 days ago

**Manual Trigger:**
1. Click **"Schedule: Sheet Hygiene"** node
2. Click **"Execute Node"**
3. Check **"Archived Leads"** tab
4. Check **"Sheet Hygiene Log"** tab

**Expected Output:**
- Lead moved to Archived Leads tab
- New row in Sheet Hygiene Log with count and details

---

### Test 5: Weekly Scorecard (Sunday 6 PM)

**Manual Trigger:**
1. Click **"Schedule: Weekly Scorecard"** node
2. Click **"Execute Node"**
3. Check your email

**Expected Output:**
- Email: "📊 Weekly Scorecard: Week Ending [Date]"
- Metrics grid with New Leads, Contracts, Pipeline Value, etc.

---

### Test 6: Asset Verification (Every 2 hours)

**Setup Test Data:**
1. In your Google Sheet **"Concierge Agent Status"** tab
2. Add a test client with:
   - **LOGIC STALL:** TRUE

**Manual Trigger:**
1. Click **"Schedule: Concierge Status Check"** node
2. Click **"Execute Node"**
3. Check your email

**Expected Output:**
- Email: "⚠️ Asset Verification Alert: [Client Name]"
- Details about stalled client build

---

## 📅 STEP 7: ACTIVATE ALL SCHEDULES

Once all tests pass:

1. **Activate the workflow:**
   - Toggle the switch at the top to **"Active"**

2. **Verify schedules are running:**
   - Daily Brief: Weekdays at 7:30 AM
   - VIP Check: Every 15 minutes
   - Pre-Call Check: Every 10 minutes
   - Sheet Hygiene: Daily at 2:00 AM
   - Weekly Scorecard: Sundays at 6:00 PM
   - Concierge Check: Every 2 hours

3. **Monitor first 24 hours:**
   - Check that you receive the morning brief
   - Verify VIP escalations trigger correctly
   - Confirm pre-call briefs send on time

---

## 🔗 STEP 8: INTEGRATE WITH CONCIERGE AGENT

The Personal Assistant reads from the **"Concierge Agent Status"** tab, which is updated by the Concierge Agent workflow.

### Ensure Both Agents Share the Same Master Brain:

1. **Concierge Agent** writes to:
   - Concierge Agent Status tab (vault keys, project status, LOGIC STALL flags)

2. **Personal Assistant** reads from:
   - Concierge Agent Status tab (detects LOGIC STALL, sends nudges)

### Integration Test:

1. Run the Concierge Agent to create a client with LOGIC STALL = TRUE
2. Wait for Personal Assistant's 2-hour check
3. Verify you receive the Asset Verification Nudge email

---

## 📊 STEP 9: POPULATE INITIAL DATA

To get the most out of the Personal Assistant, add your existing data:

### Lead Pipeline Tab:
- Import or manually add all current leads
- Set proper Status for each
- Add Audit Scores if available

### Pre-Call Intelligence Tab:
- Add upcoming calls with briefing details
- Use the template structure provided in MASTER_BRAIN_STRUCTURE.md

### Legacy Slots Tab:
- Set current capacity for each market
- Update monthly as slots fill

---

## 🎛️ CUSTOMIZATION OPTIONS

### Change Email Send Times:

**Daily Brief (default: 7:30 AM weekdays):**
1. Click **"Schedule: Daily 7:30 AM Brief"** node
2. Change cron expression: `30 7 * * 1-5`
   - Format: `minute hour * * day-of-week`
   - Example: `0 8 * * 1-5` = 8:00 AM weekdays

**Weekly Scorecard (default: Sunday 6 PM):**
1. Click **"Schedule: Weekly Scorecard"** node
2. Change cron expression: `0 18 * * 0`
   - Example: `0 17 * * 0` = Sunday 5:00 PM

### Adjust VIP Threshold:

**Default: 8.5**

1. Click **"Detect VIP Leads (>8.5)"** node
2. Find line: `const vipThreshold = 8.5;`
3. Change to desired threshold (e.g., `9.0`)

### Change Pre-Call Brief Timing:

**Default: 30-40 minutes before call**

1. Click **"Detect Calls in Next 30-40 Min"** node
2. Find lines:
   ```javascript
   const in30Min = new Date(now.getTime() + 30*60*1000);
   const in40Min = new Date(now.getTime() + 40*60*1000);
   ```
3. Adjust timing window as needed

### Change Archiving Rules:

**Default: EXIT_SENT >48hrs, IDLE >7 days**

1. Click **"Identify Leads to Archive"** node
2. Modify conditions:
   ```javascript
   const twoDaysAgo = new Date(Date.now() - 48*60*60*1000);
   const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000);
   ```

---

## 🚨 TROUBLESHOOTING

### Problem: No Emails Received

**Check:**
1. SMTP credentials are correct
2. Email address in nodes matches yours
3. Check spam folder
4. Verify workflow is **Active**

**Solution:**
- Test SMTP connection in Credentials
- Re-save email nodes with correct address

---

### Problem: "Sheet Not Found" Error

**Check:**
1. Sheet ID is correct in all nodes
2. Google Sheets credential has access to the sheet
3. Sheet has correct tab names

**Solution:**
- Share Google Sheet with the service account email
- Verify Sheet ID from URL
- Check tab names match exactly (case-sensitive)

---

### Problem: Formulas Not Calculating

**Check:**
1. Daily Dashboard formulas are correct
2. Column headers match exactly
3. Data exists in Lead Pipeline tab

**Solution:**
- Re-enter formulas from MASTER_BRAIN_STRUCTURE.md
- Verify column names (no extra spaces)

---

### Problem: VIP Alerts Not Triggering

**Check:**
1. Lead Pipeline has leads with score > 8.5
2. Status is not CONTRACT_SIGNED or EXIT_SENT
3. Schedule is active (every 15 min)

**Solution:**
- Add test lead with Audit Score = 9.5
- Manually execute VIP Check node
- Check execution logs in n8n

---

### Problem: Pre-Call Briefs Not Sending

**Check:**
1. Pre-Call Intelligence tab has upcoming calls
2. Call Date/Time is within 30-40 min window
3. Brief Sent = FALSE

**Solution:**
- Add test call 35 minutes in future
- Set Brief Sent to FALSE
- Manually execute Pre-Call Check node

---

## 📈 BEST PRACTICES

### Keep Master Brain Clean
- Archive leads regularly (automated nightly)
- Review IDLE leads weekly
- Update Call Scheduled Date when calls are booked

### Update Pre-Call Intelligence
- Add briefing details immediately after lead qualifies
- Include Psychic Opening, Logic Hammer, and Scarcity Close
- Review and update Key Objections

### Monitor Daily Dashboard
- Check formulas monthly to ensure accuracy
- Update Legacy Slots as capacity changes
- Review System Alerts each morning

### Track Metrics
- Use Weekly Scorecard to identify trends
- Compare conversion rates month-over-month
- Adjust VIP threshold based on close rates

---

## 🔐 SECURITY & PRIVACY

### Google Sheets Permissions
- Only share Master Brain with necessary team members
- Use "Editor" permissions only for authorized personnel
- Enable version history for audit trail

### Email Security
- Use app-specific passwords for Gmail
- Enable 2FA on email account
- Review n8n logs periodically

### Data Retention
- Archived Leads remain in sheet indefinitely
- Hygiene Log tracks all automated actions
- VIP Escalations create audit trail

---

## 🎯 SUCCESS METRICS

### Week 1:
- ✅ Receive daily briefs every morning
- ✅ VIP escalations trigger for high-score leads
- ✅ Pre-call briefs arrive 30 min before calls
- ✅ Sheet hygiene runs successfully

### Week 2:
- ✅ All schedules running smoothly
- ✅ Pre-call briefs improve call prep efficiency
- ✅ VIP escalations reduce response time
- ✅ Weekly scorecard provides actionable insights

### Month 1:
- ✅ Master Brain is primary source of truth
- ✅ Lead pipeline is clean and organized
- ✅ Conversion rates improve from faster VIP response
- ✅ Time saved on manual lead tracking and reporting

---

## 📞 NEED HELP?

If you encounter issues not covered in this guide:

1. **Check n8n execution logs** for error details
2. **Review Google Sheets permissions** and formulas
3. **Test each automation individually** to isolate the problem
4. **Verify all credentials** are correctly configured

---

## 🎉 YOU'RE DONE!

Your Personal Assistant Agent is now:
- 📧 Sending daily executive briefs
- 🏆 Escalating VIP leads instantly
- 📞 Preparing you for calls automatically
- 🧹 Keeping your pipeline clean
- 📊 Reporting weekly metrics
- ⚠️ Alerting on stalled builds

The Mechanical Heart is fully operational. Welcome to automated growth architecture.

---

**Next Step:** Build the Website Concierge Agent if you haven't already, and connect it to the same Master Brain for complete automation.
