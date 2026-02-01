# LNL HubSpot CRM Setup Guide

## Overview

This guide walks you through setting up HubSpot for the LNL Lead Generation system. Since you have a fresh HubSpot account, we'll configure everything from scratch.

---

## 1. Custom Properties to Create

### Contact Properties

Navigate to: **Settings → Properties → Contact Properties → Create Property**

| Property Name | Internal Name | Field Type | Description |
|--------------|---------------|------------|-------------|
| Lead Score | `lead_score` | Number | LNL scoring algorithm result (0-150) |
| Lead Tier | `lead_tier` | Dropdown | hot, warm, cold |
| Industry Vertical | `industry_vertical` | Dropdown | med_spa, realtor, law_firm, hvac_home_services |
| Product Recommendations | `product_recommendations` | Multi-line text | Suggested LNL products |
| Scoring Breakdown | `scoring_breakdown` | Multi-line text | Detailed scoring reasons |
| Google Rating | `google_rating` | Number | Business Google rating (1-5) |
| Review Count | `review_count` | Number | Total Google reviews |
| Social Facebook | `social_facebook` | Single-line text | Facebook URL |
| Social Instagram | `social_instagram` | Single-line text | Instagram URL |
| Social LinkedIn | `social_linkedin` | Single-line text | LinkedIn URL |
| Has Chatbot | `has_chatbot` | Checkbox | Website has chatbot |
| Has Booking System | `has_booking` | Checkbox | Website has booking |
| Has Email Capture | `has_email_capture` | Checkbox | Website has email signup |
| Is Luxury Target | `is_luxury_target` | Checkbox | Med Spa/Realtor luxury segment |
| Lead Source | `lead_source` | Dropdown | google_maps, yelp, website, referral |
| Scraped Date | `scraped_date` | Date | When lead was captured |
| Outreach Status | `outreach_status` | Dropdown | pending, contacted, engaged, no_response |

### Dropdown Options

**Lead Tier:**
- hot
- warm
- cold

**Industry Vertical:**
- med_spa
- realtor
- law_firm
- hvac_home_services

**Lead Source:**
- google_maps
- yelp
- website_typebot
- referral
- manual

**Outreach Status:**
- pending
- contacted
- engaged
- replied
- meeting_booked
- no_response
- unsubscribed

---

## 2. Deal Pipeline Setup

Navigate to: **Settings → Objects → Deals → Pipelines**

### Create Pipeline: "LNL Sales Pipeline"

| Stage Name | Internal Name | Probability | Description |
|------------|---------------|-------------|-------------|
| New Lead | `new_lead` | 10% | Just scraped/captured |
| Contacted | `contacted` | 20% | Initial outreach sent |
| Engaged | `engaged` | 30% | Opened/clicked/replied |
| Discovery Call | `discovery_call` | 40% | Meeting scheduled |
| Proposal Sent | `proposal_sent` | 60% | Offer delivered |
| Negotiation | `negotiation` | 80% | Discussing terms |
| Closed Won | `closed_won` | 100% | Client signed |
| Closed Lost | `closed_lost` | 0% | Not moving forward |
| Nurture | `nurture` | 5% | Long-term follow-up |

### Deal Properties to Add

| Property Name | Internal Name | Field Type |
|--------------|---------------|------------|
| Product Interest | `product_interest` | Multiple checkboxes |
| Estimated Deal Value | `estimated_value` | Number |
| Loss Reason | `loss_reason` | Dropdown |
| Win Source | `win_source` | Dropdown |

**Product Interest Options:**
- Lead-to-Client Logic (Conversion Engine)
- Master Brain (Custom AI Agents)
- Custom Architecture (Systems Integration)
- Auto-Pilot Content Factory

**Loss Reason Options:**
- Budget
- Timing
- Competitor
- No Response
- Not a Fit
- Other

---

## 3. Lists to Create

Navigate to: **Contacts → Lists → Create List**

### Active Lists (Auto-updating)

**1. Hot Leads - Ready for Outreach**
- Filter: Lead Tier = hot AND Outreach Status = pending

**2. Warm Leads - Nurture Sequence**
- Filter: Lead Tier = warm AND Outreach Status = pending

**3. Med Spa Leads**
- Filter: Industry Vertical = med_spa

**4. Realtor Leads**
- Filter: Industry Vertical = realtor

**5. Law Firm Leads**
- Filter: Industry Vertical = law_firm

**6. HVAC/Home Services Leads**
- Filter: Industry Vertical = hvac_home_services

**7. No Chatbot - Master Brain Opportunity**
- Filter: Has Chatbot = No

**8. No Booking - Conversion Engine Opportunity**
- Filter: Has Booking System = No

**9. Engaged Leads**
- Filter: Outreach Status = engaged OR replied

**10. Raleigh-Durham Leads**
- Filter: City contains "Raleigh" OR City contains "Durham"

**11. Columbus OH Leads**
- Filter: City = Columbus AND State = OH

**12. Moscow ID Leads**
- Filter: City = Moscow AND State = ID

---

## 4. Views to Create

Navigate to: **Contacts → All Contacts → Edit Columns**

### Recommended Contact View Columns

1. Name
2. Company
3. Email
4. Phone
5. Lead Score
6. Lead Tier
7. Industry Vertical
8. Product Recommendations
9. Outreach Status
10. City
11. State
12. Last Activity Date

### Recommended Deal View Columns

1. Deal Name
2. Company
3. Deal Stage
4. Product Interest
5. Amount
6. Close Date
7. Owner

---

## 5. Workflow Automations (Optional)

Navigate to: **Automation → Workflows → Create Workflow**

### Workflow 1: Hot Lead Alert

**Trigger:** Contact property "Lead Tier" = hot AND "Outreach Status" = pending

**Actions:**
1. Send internal email notification
2. Create task: "Follow up with hot lead"
3. Delay: 24 hours
4. If no activity → Send reminder

### Workflow 2: Lead Score Update Notification

**Trigger:** Contact property "Lead Score" is updated AND > 80

**Actions:**
1. Send Slack notification (if connected)
2. Update Lead Tier to "hot"
3. Create task: "Review high-scoring lead"

### Workflow 3: No Response Follow-up

**Trigger:** Contact property "Outreach Status" = contacted
**Enrollment criteria:** Last contacted > 3 days ago

**Actions:**
1. Send follow-up email (use sequence)
2. Update Outreach Status to "engaged" or "no_response"

---

## 6. API Configuration

### Get Your HubSpot API Key

1. Go to **Settings → Integrations → Private Apps**
2. Click **Create a private app**
3. Name it: "LNL Lead Generation"
4. Select scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`
   - `crm.schemas.contacts.read`
   - `crm.schemas.deals.read`
5. Click **Create app**
6. Copy the access token

### Add to n8n Environment Variables

```
HUBSPOT_API_KEY=your_access_token_here
```

---

## 7. Integration with n8n

### HubSpot Credentials in n8n

1. In n8n, go to **Credentials**
2. Click **Add Credential**
3. Search for "HubSpot"
4. Select "HubSpot API"
5. Enter your access token
6. Save

### Required Custom Property Internal Names

Make sure these exact internal names match in HubSpot:

```
lead_score
lead_tier
industry_vertical
product_recommendations
scoring_breakdown
google_rating
social_facebook
social_instagram
social_linkedin
outreach_status
```

---

## 8. Testing Checklist

- [ ] All custom properties created
- [ ] Pipeline stages configured
- [ ] Lists created and filtering correctly
- [ ] API key generated
- [ ] n8n credentials configured
- [ ] Test contact created successfully
- [ ] Test deal created successfully
- [ ] Custom properties updating correctly

---

## Quick Reference: Property Internal Names

Use these in n8n when updating HubSpot:

```javascript
// Contact properties
{
  "lead_score": 85,
  "lead_tier": "hot",
  "industry_vertical": "med_spa",
  "product_recommendations": "Lead-to-Client Logic, Master Brain",
  "scoring_breakdown": "+25: No chatbot | +20: No booking",
  "google_rating": 4.5,
  "social_facebook": "https://facebook.com/example",
  "social_instagram": "https://instagram.com/example",
  "outreach_status": "pending"
}
```

---

## Support

If you encounter issues:
1. Verify property internal names match exactly
2. Check API scopes include write permissions
3. Ensure dropdown values match exactly (case-sensitive)
4. Test with a single contact before bulk import
