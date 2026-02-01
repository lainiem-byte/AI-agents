# LNL Group Standards

## Core Philosophy: The L&L Method

All LNL work is built on the L&L Method's two pillars:
- **Asset Extraction (Building Authority)** – Mining brand DNA to create Authority Assets.
- **Systems Mining (Building Architecture)** – Building 24/7 automated engines that eliminate Manual Tax.

Every deliverable must either build authority OR eliminate manual work (ideally both).

## General Working Principles

- Default to simple, robust solutions over clever complexity.
- Always preserve a clear audit trail (what changed, why, and where).
- Prefer reusable components and templates over one-off implementations.
- Document decisions briefly as you go (1–3 lines in `decisions.md` or commit messages).
- Structured client engagement is non-negotiable: formal agreements, clear scope, documented expectations.

## Client Engagement Standards

### Foundational Rules
- Every client relationship begins with a **formal engagement letter** or agreement.
- Scope must be clearly defined to prevent assumptions and scope creep.
- Professional liability risk is highest when clients assume broader services than contracted.
- Strategic follow-up and value delivery are the engines of growth—clarity + expectations + immediate value = brand advocates.

### Client Lifecycle Phases
1. **Discovery & Qualification** – Intake forms, initial audit, lead scoring.
2. **Formal Engagement** – Agreement signing, scope definition, onboarding.
3. **Execution & Delivery** – Workflow builds, asset creation, iterative delivery.
4. **Strategic Offboarding** – Formal disengagement letters when necessary, re-engagement sequences for lapsed clients.
5. **Long-term Nurture** – Cart abandon sequences, 90-day follow-ups, reactivation campaigns.

## LNL Automations – Build Standards

- Every workflow must have a **clear business outcome and owner**.
- Name workflows by outcome and channel (e.g., `lead-intake-typebot`, `deal-hand-off-crm-to-slack`).
- Each workflow must define:
  - **Inputs** (what data triggers it)
  - **Outputs** (what result it produces)
  - **Failure behavior** (alerts, retries, fallbacks)
- Use **environment variables / credentials features** for API keys, never hard-code secrets.
- Add **basic logging at key steps** (received payload, external API responses, errors).
- Build workflows in **three layers** whenever possible:
  - **Ingestion Layer** – Capture data 24/7 (Typebot, webhooks, forms)
  - **Intelligence Layer** – Score, route, enrich (AI, CRM lookup, conditional logic)
  - **Execution Layer** – Take action instantly (send email, update CRM, notify team)

## Shadow Operator – Systems & Offers

- Always start from a **clear "offer stack"** for the creator (core offer, upsells, back-end).
- Systems should support **predictable weekly content, audience growth, and lead capture**.
- Keep creator-facing assets **simple to use** (one source of truth for scripts, hooks, CTAs).
- Track key metrics: follower growth, lead volume, qualified calls/bookings, revenue per creator.

## LNL Creatives – Brand Mining & Content

- Brand mining must produce: **voice profile, visual cues, content pillars, and "no-go" zones**.
- **Google Pomelli** is the default engine for generating and managing "brand mined" content packages.
- **Notion** is the vault for storing brand mines, content pillars, and approved content assets.
- Social media packages should be built around **recurring series, not random one-offs**.
- Each content package includes: **hooks, body, CTA, and notes for visuals/editing**.
- Optimize for **clarity and personality over trends**; trends are optional seasoning, not the base.

## Code & Automation Style

- Use **clear, descriptive names** for variables, nodes, and workflows.
- Favor **small, composable functions/workflows** over giant "god flows."
- Write **prompts as first-class assets** (saved, versioned, and re-usable), not inline throwaways.
- When in doubt, add a **short comment explaining "why,"** not "what."

## Client Experience

- Always keep a **simple status view**: what's live, what's in progress, what's blocked.
- Prefer **asynchronous updates** with clear Looms or written summaries.
- All client decisions should be captured somewhere persistent (CRM notes, docs, or `decisions.md`).

## Risk Management & Professional Standards

- Formal engagement letters are the **primary defense** against scope creep and liability claims.
- Most professional liability claims arise from **client assumptions**, not poor work.
- Disengagement should also begin with a **formal letter** when necessary, ensuring shared understanding and preventing lingering expectations.

## Quality & Audit Standards

- Deliverables must pass an **internal audit** before client handoff.
- Key audit criteria: Does it match scope? Does it align with brand DNA? Does it eliminate Manual Tax?
- Track first-try success rate, context-switch frequency, and bug introduction rate to measure process health.
