# Google Sheets Lead Tracker Template

## Setup Instructions

1. Create a new Google Sheet
2. Rename the first sheet to "Leads"
3. Add the following column headers in Row 1:

---

## Sheet: "Leads" - Column Headers

| Column | Header Name | Data Type | Notes |
|--------|-------------|-----------|-------|
| A | Business Name | Text | Company name |
| B | Industry | Text | med_spa, realtor, law_firm, hvac_home_services |
| C | City | Text | Business city |
| D | State | Text | State abbreviation |
| E | Address | Text | Full address |
| F | Phone | Text | Business phone |
| G | Email | Text | Owner/contact email |
| H | Website | URL | Business website |
| I | Owner Name | Text | Contact name |
| J | Google Rating | Number | 1-5 rating |
| K | Review Count | Number | Total reviews |
| L | Facebook | URL | Facebook page |
| M | Instagram | URL | Instagram profile |
| N | LinkedIn | URL | LinkedIn page |
| O | Lead Score | Number | LNL scoring (0-150) |
| P | Lead Tier | Text | hot, warm, cold |
| Q | Priority | Number | 1=hot, 2=warm, 3=cold |
| R | Product Recommendations | Text | Suggested LNL products |
| S | Scoring Breakdown | Text | Detailed scoring notes |
| T | Source | Text | google_maps, yelp, etc. |
| U | Scraped Date | Date | When lead was captured |
| V | Status | Text | new, contacted, qualified, etc. |
| W | Outreach Status | Text | pending, sent, replied, etc. |
| X | Last Contact | Date | Last outreach date |
| Y | Notes | Text | Manual notes |

---

## Recommended Formatting

### Conditional Formatting Rules

1. **Lead Tier = "hot"** → Row background: Light red (#f4cccc)
2. **Lead Tier = "warm"** → Row background: Light orange (#fce5cd)
3. **Lead Tier = "cold"** → Row background: Light blue (#cfe2f3)

### Data Validation

1. **Column B (Industry):** Dropdown list
   - med_spa
   - realtor
   - law_firm
   - hvac_home_services

2. **Column P (Lead Tier):** Dropdown list
   - hot
   - warm
   - cold

3. **Column V (Status):** Dropdown list
   - new
   - contacted
   - engaged
   - qualified
   - meeting_booked
   - proposal_sent
   - closed_won
   - closed_lost
   - nurture

4. **Column W (Outreach Status):** Dropdown list
   - pending
   - email_1_sent
   - email_2_sent
   - email_3_sent
   - replied
   - no_response
   - unsubscribed

---

## Additional Sheets (Optional)

### Sheet: "Dashboard"

Create a summary dashboard with these metrics:

```
=COUNTIF(Leads!P:P, "hot")      // Hot leads count
=COUNTIF(Leads!P:P, "warm")     // Warm leads count
=COUNTIF(Leads!P:P, "cold")     // Cold leads count
=COUNTIF(Leads!B:B, "med_spa")  // Med Spa count
=COUNTIF(Leads!B:B, "realtor")  // Realtor count
=AVERAGE(Leads!O:O)             // Average lead score
```

### Sheet: "Outreach Log"

Track all outreach activities:

| Column | Header |
|--------|--------|
| A | Date |
| B | Business Name |
| C | Email |
| D | Outreach Type |
| E | Template Used |
| F | Response |
| G | Notes |

---

## Google Sheets API Setup

1. Go to Google Cloud Console
2. Enable Google Sheets API
3. Create Service Account credentials
4. Download JSON key file
5. Share your Google Sheet with the service account email
6. Add credentials to n8n

### n8n Google Sheets Credential Setup

1. In n8n, go to **Credentials**
2. Add **Google Sheets API** credential
3. Choose **Service Account** authentication
4. Upload your JSON key file
5. Test connection

---

## Sheet ID Location

Your Google Sheet ID is in the URL:

```
https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
```

Copy this ID and add it to your environment variables:

```
GOOGLE_SHEET_ID=your_sheet_id_here
```
