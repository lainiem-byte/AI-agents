# LNL HubSpot CRM Setup Guide

## Status: DEPLOYED (2026-02-14)

All custom properties, pipeline stages, and deal properties have been created via the HubSpot API.

---

## 1. Custom Contact Properties (17 total)

**Property Group:** `lnl_custom` (LNL Custom Properties)

| Property Name | Internal Name | Field Type | Description |
|--------------|---------------|------------|-------------|
| LNL Lead Score | `lead_score` | Number | AI-generated lead score (0-150) from n8n scoring engine |
| Lead Tier | `lead_tier` | Dropdown | hot, warm, cold |
| Industry Vertical | `industry_vertical` | Dropdown | med_spa, realtor, law_firm, hvac_home_services, other |
| Product Recommendations | `product_recommendations` | Multi-line text | AI-generated service recommendations |
| Scoring Breakdown | `scoring_breakdown` | Multi-line text | Detailed AI scoring rationale |
| Google Rating | `google_rating` | Number | Google Maps business rating (0-5) |
| Review Count | `review_count` | Number | Total Google/Yelp review count |
| Facebook URL | `social_facebook` | Single-line text | Business Facebook page URL |
| Instagram URL | `social_instagram` | Single-line text | Business Instagram profile URL |
| LinkedIn URL | `hs_linkedin_url` | Single-line text | **Built-in HubSpot property** |
| Has Chatbot | `has_chatbot` | Checkbox | Website has chatbot |
| Has Online Booking | `has_booking` | Checkbox | Website has booking capability |
| Has Email Capture | `has_email_capture` | Checkbox | Website has email signup |
| Luxury Target | `is_luxury_target` | Checkbox | Flagged as luxury/premium positioning target |
| Lead Source Detail | `lead_source_detail` | Dropdown | google_maps, yelp, website, typebot, referral, cold_outreach, linkedin, facebook, instagram |
| Outreach Status | `outreach_status` | Dropdown | pending, contacted, engaged, replied, meeting_booked, no_response, unsubscribed |
| Scraped Date | `scraped_date` | Date | When lead was scraped from Google Maps/Yelp |
| LNL Division | `lnl_division` | Dropdown | automations, creatives, shadow_operator |

---

## 2. Deal Pipeline: "LNL Sales Pipeline"

**Pipeline ID:** `default` (renamed from HubSpot default)

| Order | Stage Name | Stage ID | Probability |
|-------|-----------|----------|-------------|
| 0 | New Lead | `appointmentscheduled` | 10% |
| 1 | Contacted | `qualifiedtobuy` | 20% |
| 2 | Engaged | `presentationscheduled` | 30% |
| 3 | Discovery Call | `decisionmakerboughtin` | 40% |
| 4 | Proposal Sent | `contractsent` | 60% |
| 5 | Negotiation | `1303206475` | 80% |
| 6 | Closed Won | `closedwon` | 100% |
| 7 | Closed Lost | `closedlost` | 0% |
| 8 | Nurture | `1303206476` | 5% |

> **Note:** Stage IDs retain original HubSpot internal names since the default pipeline was modified in-place. Use the IDs above when referencing stages in n8n workflows.

---

## 3. Deal Custom Properties (4 total)

**Property Group:** `lnl_custom`

| Property Name | Internal Name | Field Type | Options |
|--------------|---------------|------------|---------|
| Product Interest | `product_interest` | Multiple checkboxes | lead_to_client, master_brain, custom_architecture, content_factory, shadow_operator |
| Estimated Value | `estimated_value` | Number | — |
| Loss Reason | `loss_reason` | Dropdown | budget, timing, competitor, no_response, not_a_fit, other |
| Win Source | `win_source` | Dropdown | cold_outreach, typebot, referral, social, networking |

---

## 4. API Access

### Private App: "LNL Lead Generation"

**Required Scopes:**
- `crm.objects.contacts.read` / `crm.objects.contacts.write`
- `crm.objects.deals.read` / `crm.objects.deals.write`
- `crm.schemas.contacts.read` / `crm.schemas.contacts.write`
- `crm.schemas.deals.read` / `crm.schemas.deals.write`

### MCP Connector
HubSpot is also connected via the **Anthropic HubSpot MCP connector** for direct CRM queries from Claude Code and Claude Desktop.

### n8n Integration
1. In n8n → **Credentials** → Add "HubSpot API" credential
2. Enter the Private App access token
3. Use HubSpot nodes with the property internal names listed above

---

## 5. Property Internal Names for n8n

```javascript
// Contact properties - use these exact names in n8n HubSpot nodes
{
  "lead_score": 85,
  "lead_tier": "hot",
  "industry_vertical": "med_spa",
  "product_recommendations": "Lead-to-Client Logic, Master Brain",
  "scoring_breakdown": "+25: No chatbot | +20: No booking | +15: High Google rating",
  "google_rating": 4.5,
  "review_count": 127,
  "social_facebook": "https://facebook.com/example",
  "social_instagram": "https://instagram.com/example",
  "has_chatbot": "false",
  "has_booking": "false",
  "has_email_capture": "true",
  "is_luxury_target": "true",
  "lead_source_detail": "google_maps",
  "outreach_status": "pending",
  "scraped_date": "2026-02-14",
  "lnl_division": "automations"
}

// Deal properties
{
  "product_interest": "lead_to_client;master_brain",
  "estimated_value": 5000,
  "loss_reason": "budget",
  "win_source": "cold_outreach"
}

// Deal stage IDs for pipeline updates
{
  "new_lead": "appointmentscheduled",
  "contacted": "qualifiedtobuy",
  "engaged": "presentationscheduled",
  "discovery_call": "decisionmakerboughtin",
  "proposal_sent": "contractsent",
  "negotiation": "1303206475",
  "closed_won": "closedwon",
  "closed_lost": "closedlost",
  "nurture": "1303206476"
}
```

---

## 6. Lists to Create (Manual in HubSpot UI)

These active lists auto-update based on property filters:

| List Name | Filter |
|-----------|--------|
| Hot Leads - Ready for Outreach | lead_tier = hot AND outreach_status = pending |
| Warm Leads - Nurture Sequence | lead_tier = warm AND outreach_status = pending |
| Med Spa Leads | industry_vertical = med_spa |
| Realtor Leads | industry_vertical = realtor |
| Law Firm Leads | industry_vertical = law_firm |
| HVAC/Home Services Leads | industry_vertical = hvac_home_services |
| No Chatbot - Master Brain Opportunity | has_chatbot = false |
| No Booking - Conversion Engine Opportunity | has_booking = false |
| Engaged Leads | outreach_status = engaged OR replied |

---

## 7. n8n Workflow Integration (Deployed 2026-02-14)

All 4 lead-handling workflows now sync to HubSpot. Credential: `hubspotAppToken` (ID: `o4uV5HH0UT13vGy0`).

| Workflow | ID | HubSpot Nodes | What Syncs |
|---|---|---|---|
| Lead Gen Agent | `DE81QfyyeSOaA778` | Create Contact → Create Deal → Update Custom Properties | Scraped leads: contact + deal + 13 custom props |
| Inbound Lead Processor | `m475ggRUeYhCBTOr` | Sync Contact → Update Lead Properties | Typebot leads: contact + 9 custom props |
| Cold Outreach Agent | `lhytfLiKaudl5vKa` | Sync Outreach + Mark Nurture | outreach_status (contacted/no_response) |
| Booking-to-Pipeline | `5kKTxZAh3ZJaZHeP` | Sync Booking | outreach_status=meeting_booked + call_scheduled_date |

All HubSpot nodes use `onError: continueRegularOutput` — CRM failures never block core pipeline operations.

---

## 8. Testing Checklist

- [x] All custom contact properties created (20 total)
- [x] All custom deal properties created (4/4)
- [x] Pipeline stages configured (9 stages)
- [x] Property group `lnl_custom` created
- [x] API key generated with required scopes
- [x] MCP connector verified
- [x] n8n HubSpot credentials configured (credential ID: o4uV5HH0UT13vGy0)
- [x] n8n workflows wired to HubSpot sync (4/4 workflows)
- [ ] End-to-end test: Typebot submission → Sheets + HubSpot contact
- [ ] End-to-end test: Lead Gen scrape → Sheets + HubSpot contact + deal
- [ ] End-to-end test: Cold Outreach email → HubSpot status update
- [ ] End-to-end test: Calendar booking → HubSpot meeting_booked
- [ ] Lists created in HubSpot UI
