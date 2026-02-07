# LNL Master Brain - Google Sheets Reference

## Live Sheet

**Sheet ID:** `1yMIDGuFLh8UYyXplE6_Z0pVHbE8dusP5-eQkaLjh7jQ`

**URL:** https://docs.google.com/spreadsheets/d/1yMIDGuFLh8UYyXplE6_Z0pVHbE8dusP5-eQkaLjh7jQ/edit

---

## Tab Structure (9 Tabs)

| Tab # | Name |
|-------|------|
| 1 | Lead Pipeline |
| 2 | Pre-Call Intelligence |
| 3 | Daily Dashboard |
| 4 | VIP Escalations |
| 5 | Sheet Hygiene Log |
| 6 | Archived Leads |
| 7 | Weekly Scorecard Data |
| 8 | Legacy Slots |
| 9 | Concierge Agent Status |

For full column specs, dropdowns, formulas, and formatting rules see:
**[`MASTER_BRAIN_STRUCTURE.md`](./MASTER_BRAIN_STRUCTURE.md)**

---

## n8n Credential Setup

1. In n8n, go to **Credentials** → **Add New**
2. Search for **Google Sheets OAuth2 API**
3. Follow the OAuth2 flow to authorize your Google account
4. Test the connection

> **Important:** Use **OAuth2** (recommended), not Service Account.

---

## Environment Variable

```
GOOGLE_SHEET_ID=1yMIDGuFLh8UYyXplE6_Z0pVHbE8dusP5-eQkaLjh7jQ
```

---

## How Agents Use This Sheet

| Agent / Workflow | Reads | Writes |
|------------------|-------|--------|
| Daily 7:30 AM Brief | Daily Dashboard | — |
| VIP Lead Escalation | Lead Pipeline | VIP Escalations |
| Pre-Call Intelligence | Pre-Call Intelligence | — |
| Sheet Hygiene (2 AM) | Lead Pipeline | Archived Leads, Sheet Hygiene Log |
| Weekly Scorecard (Sun 6 PM) | Lead Pipeline, Weekly Scorecard Data | — |
| Asset Verification Nudge | Concierge Agent Status | — |
