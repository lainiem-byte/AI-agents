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

### 2026-02-16: Stay with Traefik for site routing (no nginx migration)
**Decision**: Keep Traefik as the reverse proxy for all LNL domains (lnlgroups.com, lnlcreatives.com, lnlautomations.com) and the vault subdomain. Do not migrate to nginx.

**Rationale**: Traefik is already configured and working. Changing to nginx introduces unnecessary risk and migration effort for zero benefit. All domains route through Traefik dynamic config at `/docker/n8n/dynamic/lnlgroup.yml`. Vault uses Docker label-based routing via `vault-static` nginx container behind Traefik.

**Alternatives considered**: Nginx reverse proxy was evaluated for simplicity, but the risk of breaking working infrastructure outweighed the marginal benefit.

**Impact**: All future routing changes go through Traefik dynamic config or Docker labels. No nginx installation on VPS.

---

### 2026-02-17: Never commit workflow JSON with hardcoded secrets

**Decision**: All n8n workflow JSON files saved to this repo must use `{{ $env.VAR_NAME }}` references instead of hardcoded API keys. A pre-commit hook scans for common key patterns and blocks the commit if found.

**Rationale**: Two Google API keys (Maps + Gemini) were exposed on GitHub via committed workflow exports. The `.claude/settings.local.json` file also leaked n8n JWT tokens, a Gemini key, and the VPS root SSH password because Claude Code's auto-generated permission entries recorded full commands including inline secrets.

**Alternatives considered**: Manual review (too error-prone), private repo only (doesn't fix the root cause), BFG repo cleaner (addresses history but not prevention).

**Impact**: All workflow JSON must be scrubbed before commit. `.claude/settings.local.json` is now gitignored and untracked. Keys in git history must be rotated.

---

### 2026-02-17: Google Sheets mappingMode must stay as defineBelow

**Decision**: The Lead Gen workflow's Google Sheets node must use `mappingMode: defineBelow` with explicit column expressions. Never switch to `autoMapInputData`.

**Rationale**: A previous Claude session switched to autoMapInputData as a "fix," which silently broke lead saving because JSON snake_case field names (`business_name`) don't match the sheet's Title Case headers (`Business Name`).

**Alternatives considered**: Renaming sheet columns to match JSON keys (fragile, breaks existing data and dashboards).

**Impact**: CLAUDE.md now includes explicit rules against changing Sheets mapping modes without user approval.

---

### 2026-02-22: n8n live API is source of truth — repo JSON files are snapshots only

**Decision**: All workflow fixes must go through the n8n REST API (GET → modify → PUT → verify). Repo JSON files are version-control snapshots, not the live source. One canonical JSON file per workflow — never create duplicates with suffixes like `-UPDATED`, `-LIVE2`, `-v2`.

**Rationale**: The same email bugs (garbled emoji subjects, empty email bodies) were "fixed" across three separate sessions (Feb 17, Feb 21, Feb 22) but kept reappearing. Root cause investigation revealed: previous sessions edited repo JSON files that were never synced to the live n8n Postgres database, and each session created new file copies instead of updating the original, so subsequent sessions picked the wrong file. The live n8n instance was never actually updated.

**Alternatives considered**: Bidirectional sync (complex, fragile), n8n git integration plugin (not available in current setup), repo-as-source with import scripts (adds deployment step that can drift).

**Impact**: CLAUDE.md updated with explicit rules. Future sessions must: (1) fix via API, (2) verify via API read-back, (3) export and overwrite the single canonical JSON. Duplicate JSON files to be consolidated under LNL-hub-lis.

---

## Future Decisions
Add new entries above this line as they're made.
