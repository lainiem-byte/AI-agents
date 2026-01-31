# LNL Master Brain - Google Sheets Structure

## Overview
The Master Brain is your central nervous system - the single source of truth that powers all automation. It tracks leads, audits, calls, slots, and system status.

---

## 📊 SHEET TABS (Create these tabs in order)

### TAB 1: **Lead Pipeline**
This is your primary CRM view.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Lead ID** | Text | Unique identifier | LEAD-001 |
| **Timestamp** | Date | When lead entered | 2026-01-19 14:30 |
| **Full Name** | Text | Contact name | Sarah Johnson |
| **Business Name** | Text | Company name | Radiant Med Spa |
| **Email** | Email | Contact email | sarah@radiantmedspa.com |
| **Phone** | Phone | Contact number | (919) 555-1234 |
| **Market** | Dropdown | Raleigh / Columbus / Moscow | Raleigh |
| **Industry** | Dropdown | Med Spa / Realtor / Law / HVAC | Med Spa |
| **Lead Source** | Dropdown | Website / Referral / Cold Outreach / LinkedIn | Website |
| **Audit Score** | Number | 0.0 to 10.0 | 8.7 |
| **Aesthetic Score** | Number | 0.0 to 10.0 | 6.2 |
| **Labor Leakage Score** | Number | 0.0 to 10.0 | 9.1 |
| **Status** | Dropdown | NEW / AUDIT_SENT / CALL_SCHEDULED / PROPOSAL_SENT / CONTRACT_SIGNED / EXIT_SENT / IDLE | AUDIT_SENT |
| **Assigned Consultant** | Dropdown | Lainie / Team Member 2 | Lainie |
| **Last Contact Date** | Date | Last interaction | 2026-01-19 |
| **Next Action** | Text | What's next | Schedule call |
| **Next Action Date** | Date | When to follow up | 2026-01-22 |
| **Call Scheduled Date** | DateTime | Upcoming call time | 2026-01-22 10:00 AM |
| **Notion Page URL** | URL | Link to client vault | https://notion.so/... |
| **Vault Key** | Text | If contract signed | LNL-RAL-8K4T2 |
| **Pipeline Value** | Currency | Estimated deal size | $15,000 |
| **Notes** | Text | Internal notes | Very responsive, ready to move |

**Dropdown Options:**

**Status:**
- NEW
- AUDIT_SENT
- CALL_SCHEDULED
- PROPOSAL_SENT
- CONTRACT_SIGNED
- EXIT_SENT
- IDLE

**Market:**
- Raleigh
- Columbus
- Moscow

**Industry:**
- Med Spa
- Realtor
- Law
- HVAC
- Other

**Lead Source:**
- Website Form
- Referral
- Cold Outreach
- LinkedIn
- Facebook
- Instagram
- Networking Event

---

### TAB 2: **Pre-Call Intelligence**
This tab stores briefing data for upcoming calls.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Call ID** | Text | Unique ID | CALL-001 |
| **Lead ID** | Text | Links to Lead Pipeline | LEAD-001 |
| **Call Date/Time** | DateTime | When the call is | 2026-01-22 10:00 AM |
| **Business Name** | Text | Company | Radiant Med Spa |
| **Contact Name** | Text | Who you're calling | Sarah Johnson |
| **Market** | Text | Location | Raleigh |
| **Industry** | Text | Vertical | Med Spa |
| **Audit Score** | Number | Overall score | 8.7 |
| **Aesthetic Score** | Number | Website/brand score | 6.2 |
| **Labor Leakage Score** | Number | Operations score | 9.1 |
| **Psychic Opening** | Text | City-specific hook | "Raleigh's med spa market is exploding - but most practices are hemorrhaging leads through outdated booking systems..." |
| **Logic Hammer** | Text | Data proof point | "Your audit revealed 9.1/10 labor leakage - that's roughly $47K annually in manual work that could be automated." |
| **Architectural Path** | Text | 3-phase solution | "Phase 1: Digital Facelift (2 weeks) → Phase 2: Booking Automation (1 week) → Phase 3: Lead Nurture Sequences (ongoing)" |
| **Scarcity Close** | Text | Urgency mechanism | "We have 2 Legacy Slots remaining for Raleigh Q1 builds. After that, earliest availability is May." |
| **Key Objections** | Text | Anticipated pushback | "Cost, Timeline, Tech Overwhelm" |
| **Proof Assets** | Text | Case studies to reference | "Show Columbus realtor case - 312% ROI in 90 days" |
| **Brief Sent** | Checkbox | Has brief been delivered | ☑ |
| **Brief Sent Time** | DateTime | When sent | 2026-01-22 09:30 AM |

---

### TAB 3: **Daily Dashboard**
Auto-populated summary data for your morning briefing.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Date** | Date | Today's date | 2026-01-22 |
| **New Leads (24hrs)** | Number | Leads added yesterday | 3 |
| **High-Score Audits** | Number | Audits > 8.5 | 2 |
| **Calls Today** | Number | Scheduled calls | 4 |
| **Calls This Week** | Number | Week ahead | 12 |
| **Proposals Pending** | Number | Awaiting response | 5 |
| **Contracts This Month** | Number | MTD signed contracts | 7 |
| **Pipeline Value** | Currency | Total potential revenue | $187,000 |
| **Available Legacy Slots (Raleigh)** | Number | Capacity | 2 |
| **Available Legacy Slots (Columbus)** | Number | Capacity | 3 |
| **Available Legacy Slots (Moscow)** | Number | Capacity | 4 |
| **System Alerts** | Text | Critical items | "2 leads IDLE >7 days, 1 LOGIC STALL detected" |
| **Top Priority Action** | Text | Today's #1 focus | "Close Sarah Johnson (Radiant Med Spa) - warm lead ready to sign" |

---

### TAB 4: **VIP Escalations**
Tracks high-scoring leads requiring immediate attention.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Escalation ID** | Text | Unique ID | ESC-001 |
| **Timestamp** | DateTime | When escalated | 2026-01-22 08:15 AM |
| **Lead ID** | Text | Links to Lead Pipeline | LEAD-023 |
| **Business Name** | Text | Company | Elite Realty Group |
| **Contact Name** | Text | Decision maker | Michael Chen |
| **Audit Score** | Number | Overall score | 9.2 |
| **Market** | Text | Location | Columbus |
| **LinkedIn URL** | URL | Profile link | https://linkedin.com/in/michaelchen |
| **Escalation Reason** | Text | Why flagged | "Audit score 9.2 - Top 5% of all time" |
| **Alert Sent** | Checkbox | Lainie notified | ☑ |
| **Alert Sent Time** | DateTime | When alerted | 2026-01-22 08:15 AM |
| **Action Taken** | Text | What happened | "Called immediately, call scheduled for tomorrow 2 PM" |
| **Status** | Dropdown | OPEN / CONTACTED / CLOSED | CONTACTED |

**Dropdown Options for Status:**
- OPEN
- CONTACTED
- CLOSED

---

### TAB 5: **Sheet Hygiene Log**
Tracks automated cleanup operations.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Date** | DateTime | When cleanup ran | 2026-01-22 02:00 AM |
| **Action** | Text | What was done | "Archived EXIT_SENT leads >48hrs" |
| **Records Affected** | Number | How many rows | 7 |
| **Details** | Text | Specifics | "Moved 7 leads from Lead Pipeline to Archived tab" |
| **System Status** | Text | Health check | "HEALTHY - No anomalies detected" |

---

### TAB 6: **Archived Leads**
Where old leads go to rest.

| Column | Type | Purpose |
|--------|------|---------|
| **[Same columns as Lead Pipeline]** | | Archived records |
| **Archive Date** | Date | When archived |
| **Archive Reason** | Text | Why archived |

---

### TAB 7: **Weekly Scorecard Data**
Historical tracking for Sunday reports.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Week Ending** | Date | Sunday date | 2026-01-26 |
| **New Leads** | Number | Week total | 18 |
| **Calls Completed** | Number | Week total | 15 |
| **Proposals Sent** | Number | Week total | 8 |
| **Contracts Signed** | Number | Week total | 3 |
| **Revenue Closed** | Currency | Week total | $42,000 |
| **Pipeline Value** | Currency | Week snapshot | $187,000 |
| **Conversion Rate** | Percentage | Leads → Contracts | 16.7% |
| **Avg. Audit Score** | Number | Week average | 7.4 |
| **Top Market** | Text | Most active | Raleigh |

---

### TAB 8: **Legacy Slots**
Tracks available capacity by market.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Market** | Text | Location | Raleigh |
| **Month** | Text | Time period | January 2026 |
| **Total Slots** | Number | Starting capacity | 5 |
| **Slots Filled** | Number | Sold | 3 |
| **Slots Available** | Number | Remaining | 2 |
| **Next Available** | Date | Earliest opening | 2026-02-01 |
| **Waitlist Count** | Number | People waiting | 0 |

---

### TAB 9: **Concierge Agent Status**
Tracks vault clients and asset status.

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| **Client Name** | Text | Business name | Radiant Med Spa |
| **Vault Key** | Text | Access key | LNL-RAL-8K4T2 |
| **Contract Date** | Date | When signed | 2026-01-19 |
| **Key Issued Date** | DateTime | When sent | 2026-01-19 15:30 |
| **Project Status** | Dropdown | Current state | Processing |
| **Pillar 1 Status** | Dropdown | Asset status | Assets Received |
| **Last Login** | DateTime | Vault access | 2026-01-20 09:15 |
| **Total Logins** | Number | Access count | 4 |
| **Assets Uploaded** | Checkbox | Has files | ☑ |
| **Asset Upload Date** | DateTime | When received | 2026-01-20 08:00 |
| **LOGIC STALL** | Checkbox | 48hr flag | ☐ |
| **Notion Page URL** | URL | Vault link | https://notion.so/... |

**Dropdown Options:**

**Project Status:**
- Contract Signed
- Pillar 1 Pending
- Processing
- Active
- Paused
- Complete

**Pillar 1 Status:**
- Not Started
- Assets Requested
- Assets Received
- Extraction Complete

---

## 🎨 FORMATTING RECOMMENDATIONS

### Conditional Formatting Rules

**Lead Pipeline Tab:**
- Status = "NEW" → Light blue background
- Status = "CONTRACT_SIGNED" → Green background
- Audit Score > 8.5 → Bold + Gold text
- Status = "IDLE" → Red background
- Next Action Date is TODAY → Yellow highlight

**VIP Escalations Tab:**
- Status = "OPEN" → Red background (urgent)
- Audit Score > 9.0 → Gold background

**Concierge Agent Status Tab:**
- LOGIC STALL = TRUE → Red background
- Pillar 1 Status = "Extraction Complete" → Green background

### Data Validation

**Lead Pipeline:**
- Email column: Must be valid email format
- Phone column: Phone number format
- Audit Score: Number between 0-10
- Pipeline Value: Currency format

---

## 🔗 FORMULAS TO ADD

### Daily Dashboard Tab (Auto-Calculate)

```
// New Leads (24hrs)
=COUNTIFS('Lead Pipeline'!B:B,">="&TODAY()-1,'Lead Pipeline'!B:B,"<"&TODAY())

// High-Score Audits
=COUNTIF('Lead Pipeline'!J:J,">8.5")

// Calls Today
=COUNTIFS('Lead Pipeline'!R:R,">="&TODAY(),'Lead Pipeline'!R:R,"<"&TODAY()+1)

// Calls This Week
=COUNTIFS('Lead Pipeline'!R:R,">="&TODAY(),'Lead Pipeline'!R:R,"<"&TODAY()+7)

// Proposals Pending
=COUNTIF('Lead Pipeline'!M:M,"PROPOSAL_SENT")

// Pipeline Value
=SUMIF('Lead Pipeline'!M:M,"<>CONTRACT_SIGNED",'Lead Pipeline'!T:T)

// Available Legacy Slots (Raleigh)
=FILTER('Legacy Slots'!E:E,'Legacy Slots'!A:A="Raleigh",'Legacy Slots'!B:B=TEXT(TODAY(),"MMMM YYYY"))
```

### VIP Escalations Tab (Auto-Trigger)

**Note:** These will be triggered by n8n, but you can manually add:
```
// Auto-populate when Lead Pipeline audit score > 8.5
=IF('Lead Pipeline'!J:J>8.5, "ESCALATE", "")
```

---

## 📥 SETUP INSTRUCTIONS

1. **Create New Google Sheet** named "LNL Master Brain"
2. **Create 9 tabs** in this exact order:
   - Lead Pipeline
   - Pre-Call Intelligence
   - Daily Dashboard
   - VIP Escalations
   - Sheet Hygiene Log
   - Archived Leads
   - Weekly Scorecard Data
   - Legacy Slots
   - Concierge Agent Status

3. **Add column headers** from tables above to each tab

4. **Set up data validation** (dropdowns) for:
   - Status columns
   - Market columns
   - Industry columns

5. **Add conditional formatting** rules listed above

6. **Insert formulas** in Daily Dashboard tab

7. **Share with n8n service account** (when ready to connect)

8. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

---

## 🤖 HOW THE PERSONAL ASSISTANT USES THIS

### Daily 7:30 AM Brief
Reads: `Daily Dashboard` tab → Emails summary

### VIP Lead Escalation
Writes to: `VIP Escalations` tab when audit score > 8.5 → Sends alert

### Pre-Call Intelligence
Reads: `Pre-Call Intelligence` tab → Sends briefing 30 min before call time

### Sheet Hygiene (2:00 AM)
- Reads: `Lead Pipeline` tab
- Moves: EXIT_SENT leads >48hrs → `Archived Leads` tab
- Logs: Action to `Sheet Hygiene Log`

### Weekly Scorecard (Sunday 6 PM)
Reads: `Lead Pipeline` + `Weekly Scorecard Data` → Sends KPI report

### Asset Verification Nudge
Reads: `Concierge Agent Status` → Alerts when LOGIC STALL = TRUE

---

## 💡 PRO TIPS

1. **Keep Lead Pipeline clean** - Archive regularly
2. **Use consistent naming** - Markets, Industries (exact match for automation)
3. **Don't delete columns** - n8n references by column name
4. **Test formulas** - Make sure Daily Dashboard auto-calculates
5. **Backup weekly** - File → Make a copy

---

This Master Brain structure is designed to power all your LNL automation. Once set up, the Personal Assistant Agent will read from and write to these tabs automatically.
