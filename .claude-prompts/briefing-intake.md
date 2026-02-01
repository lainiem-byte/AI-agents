# Client Briefing Intake Prompt Template

Transform raw client notes into a normalized LNL project specification.

## CONTEXT
- Architecture: {reference architecture.md}
- Standards: {reference standards.md}
- Division: {LNL Automations | Shadow Operator | LNL Creatives}

## RAW CLIENT INPUT
{paste client notes, emails, call transcripts, or messy requirements here}

## EXTRACTION REQUIREMENTS

### 1. Client Profile
- **Client Name**: {extract or ask}
- **Industry**: {extract or infer}
- **Current Pain Points**: {list the "Manual Tax" or "Brand Gap" issues}
- **Desired Outcomes**: {what does success look like for them?}

### 2. L&L Method Mapping
Which pillar(s) does this project address?
- **Asset Extraction (Building Authority)?** {Yes/No + brief explanation}
  - If yes: What Authority Assets are needed? (brand voice, visuals, content, messaging)
- **Systems Mining (Building Architecture)?** {Yes/No + brief explanation}
  - If yes: What Manual Tax is being eliminated? (hours saved, response time, consistency)

### 3. Project Scope Definition
Break the project into clear deliverables:
- **Phase 1 (Discovery)**: {intake form, audit, lead scoring framework, brand mining}
- **Phase 2 (Build)**: {workflows, agents, content packages, integrations}
- **Phase 3 (Launch)**: {testing, handoff, training}
- **Phase 4 (Nurture)**: {ongoing support, optimization, reporting}

### 4. Technical Requirements
- **Systems to integrate**: {CRM, email, Typebot, n8n, Notion, Pomelli, etc.}
- **Data sources**: {where is client data coming from? Forms, CRM, spreadsheets?}
- **Outputs**: {what gets produced? Emails, content, reports, dashboards?}

### 5. Risk & Boundary Setting
- **Scope boundaries**: {what is explicitly OUT of scope?}
- **Client assumptions to clarify**: {what might they assume we're doing that we're not?}
- **Engagement letter requirements**: {formal agreement needed? Terms? Timeline?}

## DELIVERABLES
Provide:
1. **Normalized Project Brief** (1-2 page summary in LNL format)
2. **Proposed engagement letter outline** (scope, deliverables, timeline, pricing structure)
3. **Technical architecture sketch** (systems, integrations, data flow)
4. **Success metrics** (how will we measure this project's impact?)

Apply LNL standards:
- Structured client engagement from the outset
- Clear scope to prevent assumptions
- Map everything to L&L Method pillars for clarity
