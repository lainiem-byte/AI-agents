# LNL Lead Generation Agent - Complete Setup Guide

## Overview

This n8n workflow automatically scrapes, qualifies, and stores leads for LNL Creative and LNL Automations. It targets:

- **Industries:** Med Spas, Realtors, Law Firms, HVAC/Home Services
- **Locations:** Raleigh-Durham NC, Columbus OH, Moscow ID

### What This System Does

1. **Scrapes** business data from Google Maps and Yelp
2. **Enriches** contacts with emails via Hunter.io and Apollo.io
3. **Analyzes** websites for brand gaps and automation opportunities
4. **Scores** leads based on LNL's custom algorithm
5. **Stores** qualified leads in Google Sheets and HubSpot
6. **Alerts** you when hot leads are captured

---

## Quick Start

### 1. Get Your API Keys

| Service | Sign Up URL | What You Need |
|---------|-------------|---------------|
| Google Maps | [console.cloud.google.com](https://console.cloud.google.com/apis/credentials) | API Key with Places API enabled |
| Yelp | [yelp.com/developers](https://www.yelp.com/developers/v3/manage_app) | API Key |
| Hunter.io | [hunter.io/api_keys](https://hunter.io/api_keys) | API Key |
| Apollo.io | [app.apollo.io](https://app.apollo.io/#/settings/integrations/api) | API Key |
| HubSpot | Settings → Private Apps | Access Token |

### 2. Set Up HubSpot

Follow `HUBSPOT_SETUP_GUIDE.md` to:
- Create custom properties
- Configure deal pipeline
- Set up lists and views
- Generate API credentials

### 3. Set Up Google Sheets

Follow `GOOGLE_SHEETS_TEMPLATE.md` to:
- Create lead tracker spreadsheet
- Add column headers
- Configure Google Sheets API
- Get your Sheet ID

### 4. Configure n8n

1. Copy `env.template` to your n8n environment
2. Fill in all API keys
3. Import `n8n-lead-generation-workflow.json`
4. Set up credentials for each service
5. Test with Manual Trigger

---

## Workflow Architecture

```
┌─────────────────┐
│  Trigger        │ (Weekly Schedule or Manual)
└────────┬────────┘
         ↓
┌─────────────────┐
│  Configuration  │ Industries + Locations
└────────┬────────┘
         ↓
┌─────────────────┐
│  Search Queries │ Generate all keyword combinations
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌───────┐ ┌───────┐
│Google │ │ Yelp  │  Parallel scraping
│ Maps  │ │       │
└───┬───┘ └───┬───┘
    └────┬────┘
         ↓
┌─────────────────┐
│  Deduplicate    │ Merge + remove duplicates
└────────┬────────┘
         ↓
┌─────────────────┐
│  Filter         │ Must have website (disqualifier)
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌───────┐ ┌───────┐
│Hunter │ │Apollo │  Email + data enrichment
│  .io  │ │  .io  │
└───┬───┘ └───┬───┘
    └────┬────┘
         ↓
┌─────────────────┐
│  Website Scrape │ Analyze for brand gaps
└────────┬────────┘
         ↓
┌─────────────────┐
│  Lead Scoring   │ LNL custom algorithm
└────────┬────────┘
         ↓
┌─────────────────┐
│  Filter         │ Score >= 30
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌───────┐ ┌───────┐
│Google │ │HubSpot│  Dual storage
│Sheets │ │  CRM  │
└───┬───┘ └───┬───┘
    └────┬────┘
         ↓
┌─────────────────┐
│  Hot Lead Alert │ Email notification
└─────────────────┘
```

---

## Lead Scoring Algorithm

### Positive Signals (Add Points)

| Signal | Points | Reason |
|--------|--------|--------|
| Good website + No social | +30 | Major Brand Gap |
| Good website + Has social | +15 | Needs brand alignment review |
| No chatbot | +25 | Master Brain opportunity |
| No booking system | +20 | Conversion Engine opportunity |
| No email capture | +15 | Custom Architecture opportunity |
| Outdated website | +20 | Needs modernization |
| Has verified email | +10 | Contactable |
| Has phone number | +5 | Contactable |
| Good reviews (4.0+, 20+ reviews) | +15 | Established business |
| Low review count (<20) | +10 | Newer, needs marketing |

### Luxury Targeting (Med Spa & Realtors)

| Signal | Points |
|--------|--------|
| Luxury branding keywords | +20 |
| Professional photography | +10 |
| Video content | +10 |

### Industry Bonuses

| Industry | Bonus |
|----------|-------|
| Med Spa | +10 |
| Realtor | +10 |
| Law Firm | +5 |
| HVAC/Home Services | +0 |

### Lead Tiers

| Score Range | Tier | Priority |
|-------------|------|----------|
| 80+ | Hot | 1 |
| 50-79 | Warm | 2 |
| 30-49 | Cold | 3 |
| <30 | Disqualified | - |

---

## Product Recommendations Logic

The scoring algorithm automatically suggests LNL products:

| Website Attribute | Recommended Product |
|-------------------|---------------------|
| No chatbot | Master Brain (Custom AI Agents) |
| No booking system | Lead-to-Client Logic (Conversion Engine) |
| No email capture | Custom Architecture (Systems Integration) |
| Good website + weak social | Auto-Pilot Content Factory |

---

## File Structure

```
lnl-lead-gen-system/
├── n8n-lead-generation-workflow.json   # Main n8n workflow (import this)
├── HUBSPOT_SETUP_GUIDE.md              # HubSpot configuration
├── GOOGLE_SHEETS_TEMPLATE.md           # Lead tracker setup
├── env.template                        # Environment variables template
└── README.md                           # This file
```

---

## n8n Credentials Setup

### Google Maps API

1. Go to Credentials → Add Credential
2. Select "HTTP Header Auth" (or use environment variable)
3. No auth needed - key is passed in URL parameter

### Yelp Fusion API

1. Go to Credentials → Add Credential
2. Select "HTTP Header Auth"
3. Header Name: `Authorization`
4. Header Value: `Bearer YOUR_YELP_API_KEY`

### Hunter.io

1. No credential needed - key is passed in URL parameter

### Apollo.io

1. No credential needed - key is passed in request body

### HubSpot

1. Go to Credentials → Add Credential
2. Select "HubSpot API"
3. Enter your Private App access token

### Google Sheets

1. Go to Credentials → Add Credential
2. Select "Google Sheets API"
3. Choose "Service Account"
4. Upload JSON key file
5. Share your Sheet with the service account email

---

## Testing

### Manual Test Run

1. Open the workflow in n8n
2. Click "Manual Trigger" node
3. Click "Execute Node"
4. Watch each node execute
5. Check Google Sheets and HubSpot for results

### Test with Single Location

Modify "Set Search Parameters" node:
```javascript
locations: "Moscow ID"  // Small market for testing
industries: "med_spa"   // Single industry
```

### Verify Each Stage

1. **Search Queries Generated** - Check code node output
2. **Google Maps Results** - Verify businesses returned
3. **Yelp Results** - Verify businesses returned
4. **Deduplicated** - Confirm no duplicates
5. **Filtered** - Only businesses with websites
6. **Enriched** - Emails and social data added
7. **Scored** - Lead scores calculated
8. **Stored** - Data in Sheets and HubSpot

---

## Troubleshooting

### API Rate Limits

| Service | Rate Limit | Solution |
|---------|------------|----------|
| Google Maps | 1000/day (free) | Batch queries, use Wait node |
| Yelp | 5000/day | Should be sufficient |
| Hunter.io | 25/month (free) | Upgrade or use sparingly |
| Apollo.io | 200/month (free) | Upgrade or prioritize leads |

### Common Errors

**"ZERO_RESULTS" from Google Maps**
- Check search query formatting
- Verify location spelling
- Try broader keywords

**"401 Unauthorized" from Yelp**
- Verify API key is correct
- Check Authorization header format: `Bearer YOUR_KEY`

**"No email found" from Hunter.io**
- Normal for some businesses
- Falls back to generic email pattern

**HubSpot property errors**
- Verify internal names match exactly
- Check property exists before updating
- Ensure dropdown values match exactly

### Workflow Fails Silently

1. Enable error workflows in n8n settings
2. Check "Continue on Fail" is enabled on optional nodes
3. Add error handling node to catch failures

---

## Customization

### Add More Industries

Edit "Generate Search Queries" code node:

```javascript
const industryKeywords = {
  'med_spa': ['med spa', 'medical spa', ...],
  'realtor': ['real estate agent', ...],
  'law_firm': ['law firm', 'attorney', ...],
  'hvac_home_services': ['HVAC contractor', ...],
  // ADD NEW INDUSTRY:
  'dental': ['dentist', 'dental clinic', 'orthodontist']
};
```

### Add More Locations

Edit "Set Search Parameters" node:

```javascript
locations: "Raleigh Durham NC,Columbus OH,Moscow ID,YOUR_NEW_CITY STATE"
```

### Adjust Scoring Weights

Edit "Lead Scoring Algorithm" code node to change point values.

### Change Hot/Warm/Cold Thresholds

```javascript
if (score >= 80) {        // Adjust this
  leadTier = 'hot';
} else if (score >= 50) { // And this
  leadTier = 'warm';
}
```

---

## Next Steps

After Lead Generation is working:

1. **Lead Qualifier Agent** - Deeper qualification with AI
2. **Cold Outreach Agent** - Automated email sequences
3. **Website Concierge Agent** - Typebot integration

Let me know when you have your scripts and API keys ready!

---

## Support

Files included:
- `n8n-lead-generation-workflow.json` - Import into n8n
- `HUBSPOT_SETUP_GUIDE.md` - HubSpot configuration
- `GOOGLE_SHEETS_TEMPLATE.md` - Spreadsheet setup
- `env.template` - Environment variables

Questions? Review the workflow node-by-node in n8n editor.
