# LNL Group Architectural Decisions

This file logs major decisions about LNL infrastructure, systems, and standards.

## Format
Each decision entry should include:
- **Date**: When decision was made
- **Decision**: What was decided
- **Rationale**: Why this choice was made
- **Alternatives considered**: What else was evaluated
- **Impact**: What this affects

---

## Decision Log

### 2026-01-31: Adopted L&L Method as core framework
**Decision**: All LNL work will be organized around the L&L Method (Asset Extraction + Systems Mining).

**Rationale**: Provides a clear, client-facing framework that separates "building authority" from "eliminating manual work" and makes it easy to explain value.

**Alternatives considered**: Generic "automation services" positioning, or separate brand vs. automation offerings.

**Impact**: All divisions (Automations, Creatives, Shadow Operator) map to these two pillars. Makes positioning and sales clearer.

---

### 2026-01-31: Notion as LNL Creatives vault
**Decision**: Notion is the source of truth for brand mines, content pillars, and approved assets.

**Rationale**: Structured database format fits well with brand mining methodology. Easy to integrate with n8n for content publishing.

**Alternatives considered**: Airtable, Google Sheets, dedicated CMS.

**Impact**: All LNL Creatives workflows pull from and write to Notion. Pomelli generates content, Notion stores it.

---

### 2026-01-31: Pomelli as brand content engine
**Decision**: Google Pomelli is the default tool for generating "brand mined" content packages.

**Rationale**: Specialized for brand-consistent content generation at scale.

**Alternatives considered**: ChatGPT, Claude API, custom prompts.

**Impact**: Standard workflow: Brand mine in Notion → Pomelli generates → Content package delivered.

---

### 2026-01-31: Three-layer workflow architecture
**Decision**: All n8n workflows follow Ingestion → Intelligence → Execution pattern.

**Rationale**: Creates consistency, makes workflows easier to understand and debug, scales well.

**Alternatives considered**: Monolithic workflows, ad-hoc structure per project.

**Impact**: Every workflow template and agent design must map to these three layers. Simplifies training and handoffs.

---

### 2026-01-31: Structured client engagement required
**Decision**: Every client relationship must begin with a formal engagement letter or agreement.

**Rationale**: Primary defense against scope creep and professional liability. Most claims arise from client assumptions, not poor work.

**Alternatives considered**: Informal email confirmations, handshake agreements.

**Impact**: Sales process includes agreement signing step. No work starts without signed scope.

---

## Future Decisions
Add new entries above this line as they're made.
