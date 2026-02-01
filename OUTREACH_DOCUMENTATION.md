# LNL Cold Outreach Agent - Complete Documentation

## Overview

This n8n workflow automates the LNL 4-Touch "Logic Gate" Cadence. It follows your Growth Architect philosophy: **We do not cold call—we initialize diagnostic gates.**

---

## The 4-Touch Logic Gate Cadence

| Attempt | Day | Name | Logic | Goal |
|---------|-----|------|-------|------|
| 01 | Day 1 | The Handshake | Identify the "Prestige Gap" or "Labor Leakage" | Get them to the Audit |
| 02 | Day 4 | The Nudge | Reference a city-specific insight | Provide a "Logic" proof |
| 03 | Day 8 | The Value Drop | Share a specific "Pillar" result or industry insight | Establish Authority |
| 04 | Day 14 | The Break-up | "Closing the Vault" for this month's intake | Create Scarcity |

### The Rule
**4 Attempts Total.** If no response after 14 days, the lead is marked `[SYSTEM_IDLE]`. We do not chase; we architect for those ready for the build.

---

## Tagging Architecture

### Creative Pillar (LNL Creative)
| Industry | Day 1 | Day 4 | Day 8 | Day 14 |
|----------|-------|-------|-------|--------|
| Med Spa | C_MED_01 | C_MED_02 | C_MED_03 | C_MED_EXIT |
| Realtor | C_REA_01 | C_REA_02 | C_REA_03 | C_REA_EXIT |

### Automations Pillar (LNL Automations)
| Industry | Day 1 | Day 4 | Day 8 | Day 14 |
|----------|-------|-------|-------|--------|
| Law Firm | A_LAW_01 | A_LAW_02 | A_LAW_03 | A_LAW_EXIT |
| HVAC | A_HVA_01 | A_HVA_02 | A_HVA_03 | A_HVA_EXIT |

### City-Specific Tags (Realtors)
- Raleigh: `C_REA_RAL_01` through `C_REA_RAL_EXIT`
- Columbus: `C_REA_COL_01` through `C_REA_COL_EXIT`
- Moscow: `C_REA_MOS_01` through `C_REA_MOS_EXIT`

---

## Complete Scripts by Industry

### 🎨 LNL CREATIVE: Med Spas

**Attempt 01: The Prestige Gap**
```
Subject: The Prestige Gap at [Business Name]

Hi [Name],

I've been tracking the patient experience at [Business Name]. Your clinical results are world-class, but your digital footprint is currently creating a Prestige Gap.

Your brand looks like a standard clinic, but your service is elite.

I'm the Chief Architect at LNL Creative. We specialize in 'Digital Facelifts' for Med Spas in [City].

Initializing the audit here: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: The Market Comparison**
```
Subject: [City] Aesthetic Market Update

[Name],

I was reviewing the [City] aesthetic market this morning. Several competitors are catching up visually, but they lack your clinical depth.

We should align your Face with your Heart before the quarter ends.

Did you have a moment to review the Audit?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: The Visual Proof**
```
Subject: Visual Proof: Before/After Architectural Facelift

[Name],

I was reviewing the patient journey for high-end clinics in [City]. Most are losing up to 30% of their digital traffic because their 'Digital Face' doesn't match their clinical excellence.

I've attached a quick screenshot of a 'Before/After' architectural facelift we just completed. It's not just about beauty; it's about establishing immediate authority.

Ready to see your diagnostic?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Closing Your Diagnostic File

[Name],

I haven't heard back, so I'm assuming your current brand architecture is meeting your 2026 goals.

I'm closing your diagnostic file to focus on our new builds in [City].

If your priorities shift and you're ready to bridge the prestige gap later this year, you can re-initialize the process at lnlgroup.com/audit.

Best of luck with the practice.

Best,
LNL Group
```

---

### 🎨 LNL CREATIVE: Realtors (Luxury Markets - Moscow)

**Attempt 01: High-Net-Worth Authority**
```
Subject: High-Net-Worth Authority in [City]

[Name],

In the [City] luxury market, your 'Digital Face' is your primary filter. High-net-worth clients expect an architectural standard.

Currently, your systems feel 'manual.'

We build high-end digital identities for Realtors who want to move from 'hustle' to 'authority.'

See the logic: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: Visual Authority**
```
Subject: Visual Authority in [City] Luxury

[Name],

In the [City] high-net-worth market, 'good' isn't enough. Your digital presence is competing with global standards of architecture and design.

If your 'Digital Face' looks like a standard agency template, it creates an immediate Prestige Gap.

We bridge that gap by building a visual identity that reflects the caliber of properties you represent.

Did the Audit provide any clarity?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: The Authority Insight**
```
Subject: The Authority Insight

[Name],

In luxury real estate, your digital presence is your 'pre-listing' presentation.

If a high-net-worth lead lands on your profile and sees 'Standard Agency' templates, you've lost the lead before the first call.

We specialize in building 'Architectural Authority' that does the selling for you.

Take 4 minutes to map your friction here: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Finalizing [City] Project Queue

[Name],

I'm finalizing the project queue for the [City] luxury market for the next month.

Since we haven't connected, I'm releasing your reserved slot back to the market.

Architecture requires precision and timing—perhaps our schedules will align in a future quarter.

Best,
LNL Group
```

---

### 🎨 LNL CREATIVE: Realtors (Growth Markets - Raleigh/Columbus)

**Attempt 01: The Prestige Gap**
```
Subject: The Prestige Gap in [City]

Hi [Name],

The [City] market is evolving rapidly with the recent tech influx. Your results are elite, but is your brand?

Most top-producers here have a Prestige Gap—they sell million-dollar homes but have thousand-dollar websites.

Let's align your Face with your Results.

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: The Digital First Showing**
```
Subject: Checking in on our logic

[Name],

In a market where buyers are moving in from out-of-state, your 'Digital Face' is your first showing.

If it feels manual or dated, you're losing trust before the first DM.

Ready to see the diagnostic?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: Brand as Filter**
```
Subject: Your Brand as a Filter

[Name],

In the luxury space, your brand should be a filter, not a net.

We build Architectural Authority that does the heavy lifting for you, so you only talk to 'Vault-ready' leads.

Here is the logic behind our latest facelift in [City].

See the path: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Closing Your File

[Name],

I'm finalizing our intake for the [City] market this quarter.

Since we haven't connected, I'm assuming your current infrastructure is sufficient for your 2026 goals.

I'm closing your file to focus on our active builds.

The Vault remains open if your priorities shift: lnlgroup.com/audit

Best,
LNL Group
```

---

### ⚙️ LNL AUTOMATIONS: Law Firms

**Attempt 01: Labor Leakage Audit**
```
Subject: Labor Leakage Audit for [Firm Name]

[Name],

I'm reviewing operational workflows for law firms in [City].

Most partners are currently suffering from Labor Leakage—paying for human hours to do what a Mechanical Heart should do automatically (intake, scheduling, document prep).

We install the systems that reclaim your billable hours.

Map your friction: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: Administrative Ceiling**
```
Subject: Administrative Ceiling at [Firm Name]

[Name],

I'm noticing a trend in the [City] legal market: Firms are scaling by adding more staff, which only adds more 'Manual Burden.'

True scale comes from reclaiming the 10–15 hours a week currently lost to intake, document assembly, and scheduling.

We install the systems that turn that 'Labor Leakage' back into billable equity.

Let's see where your firm is leaking: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: The Efficiency Proof**
```
Subject: Quick Logic Check for [Firm Name]

[Name],

Quick logic check for [Firm Name]: If your intake was 100% automated, how many billable hours would your partners reclaim this month?

We recently helped a firm in [City] eliminate 12 hours of manual document prep per week. That is pure equity back into the firm.

Ready to see where your labor is leaking?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Archiving Your Labor Leakage File

[Name],

I'm archiving your Labor Leakage file today.

My goal was to help you install a 'Mechanical Heart' to protect your time, but it seems now isn't the right window for a system overhaul.

Your audit link will remain active for 24 more hours if you decide to initialize: lnlgroup.com/audit

Best,
LNL Group
```

---

### ⚙️ LNL AUTOMATIONS: HVAC & Home Services

**Attempt 01: The Mechanical Heart**
```
Subject: The Mechanical Heart for [Business Name]

Hi [Name],

Scaling an HVAC business in [City] usually breaks at the 'Manual' level—relying on people to remember to follow up.

LNL Automations builds the 'Mechanical Heart' for home services.

We ensure every lead is captured, nurtured, and booked without you touching a keyboard.

Start the build: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: The Growth Ceiling**
```
Subject: Logic Check: The [City] Growth Ceiling

Hi [Name],

I was reviewing the home services volume in [City] this week. With the influx of new residents, most HVAC firms are hitting a ceiling—not because they lack technicians, but because their 'Manual Heart' can't keep up with the intake.

A lead that waits 10 minutes for a response in this market is a lead lost to a competitor.

Our Mechanical Heart ensures you own the lead before they even finish their search.

Have you had a chance to map your friction?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: The Lead-Leak Proof**
```
Subject: The Biggest Cost in HVAC

[Name],

The biggest cost in HVAC isn't labor—it's 'Lead Leakage.'

If a lead calls after 6 PM and doesn't get an immediate, automated response, they call your competitor.

A Mechanical Heart ensures you own the market 24/7 without hiring more office staff.

We build the systems that catch what humans miss.

See the logic: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Closing Operational Reviews for [City]

[Name],

I am closing out my operational reviews for home service providers in [City].

I'll be focusing my attention on the firms currently undergoing their 'Heart' installations.

If you decide you're ready to stop the manual hustle, you know where to find the Vault.

lnlgroup.com/audit

Best,
LNL Group
```

---

### 🧠 INDUSTRY AGNOSTIC: Master Brain Scripts

Use these for any high-level founder not in standard categories.

**Attempt 01: The Handshake**
```
Subject: Your Infrastructure vs. Your Ambition

[Name],

Most businesses are a collection of 'Manual Tasks' held together by the founder's willpower.

That isn't a company; it's a job.

I architect Mechanical Hearts and Digital Faces. I'm reaching out because I believe your brand has the potential to scale, but your current systems might be the ceiling.

Start the audit to see the logic: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 02: The Market Nudge**
```
Subject: Growth Patterns in [City]

[Name],

I've been analyzing the growth patterns of founders in [City] this week.

Those winning are moving away from 'hiring more people' and toward 'installing better logic.'

How much of your day is spent on tasks that don't require your permission to run?

lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 03: The Reclaimed Time Insight**
```
Subject: What Would You Do With 15 Extra Hours?

[Name],

What would you do with an extra 15 hours a week?

That is the average 'Time Equity' our clients reclaim once their Mechanical Heart is installed.

It's not magic; it's just better architecture.

You can map your specific leakage in 4 minutes here: lnlgroup.com/audit

Best,
LNL Group
```

**Attempt 04: The Exit**
```
Subject: Moving Your File to Inactive

[Name],

I'm moving your file to 'Inactive' status.

As an architect, I only work with founders ready to move from 'Manual' to 'Mechanical.'

I wish you the best in your current build.

The Vault will remain open to you at vault.lnlgroup.com should you choose to initialize in the future.

Best,
LNL Group
```

---

## Workflow Logic Flow

```
Daily Trigger (9 AM)
        ↓
Get All Leads from Sheet
        ↓
┌───────────────────────────────────┐
│  LOGIC GATE 1: Check Timing       │
│  - Skip if Audit = Completed      │
│  - Skip if Status = Idle          │
│  - Check days since last touch    │
│  - Day 1 → Attempt 1              │
│  - Day 4 → Attempt 2              │
│  - Day 8 → Attempt 3              │
│  - Day 14 → Attempt 4             │
└───────────────┬───────────────────┘
                ↓
┌───────────────────────────────────┐
│  LOGIC GATE 2: Route by Industry  │
│  - Med Spa → Creative Scripts     │
│  - Realtor → Creative Scripts     │
│  - Law Firm → Automation Scripts  │
│  - HVAC → Automation Scripts      │
│  - Other → Agnostic Scripts       │
└───────────────┬───────────────────┘
                ↓
┌───────────────────────────────────┐
│  Generate Personalized Email      │
│  - Pull correct attempt script    │
│  - Merge [Name], [City], etc.     │
│  - Set correct tag                │
└───────────────┬───────────────────┘
                ↓
        Send Email
                ↓
┌───────────────────────────────────┐
│  Update Systems                   │
│  - Google Sheet: Tag + Date       │
│  - HubSpot: Status + Attempt      │
│  - Outreach Log: Activity record  │
└───────────────┬───────────────────┘
                ↓
┌───────────────────────────────────┐
│  LOGIC GATE 3: Check If Exit      │
│  If Attempt = 4:                  │
│  - Mark as SYSTEM_IDLE            │
│  - Move to quarterly nurture      │
└───────────────────────────────────┘
```

---

## Google Sheets: Outreach Log Tab

Add this new tab to track all outreach activity:

| Column | Header |
|--------|--------|
| A | Date |
| B | Business Name |
| C | Email |
| D | Industry |
| E | Pillar |
| F | Attempt |
| G | Tag |
| H | Subject |
| I | Status |

---

## HubSpot: Additional Custom Properties

Add these to your contact properties:

| Property | Internal Name | Type |
|----------|---------------|------|
| Current Tag | `current_tag` | Single-line text |
| Last Outreach Date | `last_outreach_date` | Date |
| Outreach Attempt | `outreach_attempt` | Number |
| Pillar Focus | `pillar_focus` | Dropdown (Creative/Automations) |

---

## Environment Variables for Outreach

Add these to your n8n environment:

```
# Email Sending
SENDER_EMAIL=architect@lnlgroup.com
REPLY_TO_EMAIL=vault@lnlgroup.com

# Already configured
GOOGLE_SHEET_ID=your_sheet_id
HUBSPOT_API_KEY=your_hubspot_key
```

---

## The "No Response" Rule

After 4 attempts (14 days), the lead is marked `[SYSTEM_IDLE]`.

**Architect's Logic:** A lead that ignores 4 high-value, diagnostic touches is a "Low-Logic" lead. They are not ready for a Growth Architecture build. We move them to a "Quarterly System Update" list and stop active outreach to preserve your brand's prestige.

---

## Testing Checklist

- [ ] Google Sheet has all required columns
- [ ] Outreach Log tab created
- [ ] HubSpot custom properties added
- [ ] Email sending credentials configured
- [ ] Test with Manual Trigger
- [ ] Verify correct script selection by industry
- [ ] Verify timing logic (Day 1, 4, 8, 14)
- [ ] Verify tag updates after each send
- [ ] Verify SYSTEM_IDLE marking after Attempt 4
