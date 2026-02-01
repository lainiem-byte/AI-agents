# Workflow Build Prompt Template

Build an n8n workflow following LNL Automations standards.

## CONTEXT
- Architecture: {reference architecture.md}
- Standards: {reference standards.md}
- Client/Project: {client_name or internal LNL project}

## USE CASE
**Business Problem**: {describe the manual task or bottleneck}
**Desired Outcome**: {what should happen automatically?}
**Current Manual Process**: {how is this done today? what's the Manual Tax?}

## WORKFLOW SPECIFICATION

### 1. Workflow Identity
- **Name**: {outcome}-{channel} (e.g., `lead-intake-typebot`, `deal-won-slack-notify`)
- **Owner**: {who owns this workflow?}
- **Trigger**: {what starts this workflow? Webhook, schedule, manual button?}

### 2. Three-Layer Design
Break this workflow into layers:

**Ingestion Layer** (Capture data 24/7)
- Trigger: {webhook from Typebot, form submission, CRM update, etc.}
- Input data: {what fields/payload do we receive?}

**Intelligence Layer** (Process & route)
- Logic: {scoring, conditional routing, data enrichment}
- Decision points: {if/else logic, switches, filters}
- External APIs: {any lookups? CRM, AI model, database?}

**Execution Layer** (Take action)
- Actions: {send email, update CRM, post to Slack, create task}
- Outputs: {what gets produced? Email sent, record updated, notification delivered}

### 3. Error Handling & Logging
- **Failure behavior**: {retry? alert? fallback action?}
- **Logging points**: {log at: received payload, external API call, final action}
- **Alerts**: {who gets notified if this breaks? How?}

### 4. Credentials & Secrets
List all required API keys and credentials:
- {credential_1} (e.g., HubSpot API key)
- {credential_2} (e.g., SendGrid API key)
- Store these as **n8n environment variables**, never hard-code.

## DELIVERABLES
Provide:
1. **n8n workflow JSON** or step-by-step node configuration
2. **Test payload examples** (typical input data)
3. **Expected outputs** (what success looks like)
4. **Documentation snippet** for the team (how to use, when it runs, who to contact)

Apply LNL standards:
- Clear node names (e.g., "Score Lead Quality", not "Function 3")
- Small, composable workflows (split into sub-workflows if > 15 nodes)
- Comments in function nodes explaining "why"
