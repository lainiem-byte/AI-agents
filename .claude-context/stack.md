# LNL Group Tech Stack

## Core Automation & Workflow
- **n8n** – Self-hosted or cloud workflow automation platform
  - Primary orchestration engine for Systems Mining
  - Version: queue mode
  - Instance: https://n8n.srv1244684.hstgr.cloud/

## Conversational Interfaces
- **Typebot** – Lead capture and qualification flows
  - Used for Ingestion Layer in most workflows
  - Integrates with n8n via webhooks
  - Workspace: https://typebot.co/faq-8xjnugp
- **Voiceflow** – Voice and advanced chat experiences (when needed)

## Brand Mining & Content
- **Google Pomelli** – Brand-mined content generation engine
  - Primary tool for LNL Creatives
  - Powers Asset Extraction workflows
- **Notion** – Structured content vault and database
  - Source of truth for LNL Creatives brand mines, content pillars, and assets
  - Integrates with n8n for content publishing workflows
  - Vault: https://www.notion.so/2ed2b4104a59804eb681fc0fe732d51e?v=2ed2b4104a5980959954000c6b1f181c

## CRM & Sales
- **HubSpot** (primary CRM)
  - Source of truth for leads, contacts, and deals
  - Intelligence Layer hub for lead scoring and routing
  - Account ID: 244721155
  - Dashboard: https://app.hubspot.com/global-home/50796003
  - **API Access**:
    - Private App: "LNL Lead Generation" (token stored in n8n credentials)
    - Scopes: crm.objects.contacts.*, crm.objects.deals.*, crm.schemas.contacts.*, crm.schemas.deals.*
    - Anthropic HubSpot MCP connector (direct CRM queries from Claude Code / Claude Desktop)
  - **Custom Properties**: 17 contact + 4 deal properties under `lnl_custom` group (see HUBSPOT_SETUP_GUIDE.md)
  - **Pipeline**: "LNL Sales Pipeline" — 9 stages (New Lead → Closed Won/Lost + Nurture)


## Communication & Collaboration
- **Google Workspace** – Docs, Drive, Gmail
  - Long-form documentation and specs
  - Email automation via n8n + Gmail API
- **Slack** (if used) – Team notifications and alerts

## Hosting & Web
- **Hostinger** – Web hosting, landing pages, domain management
  - Client-facing sites and assets
  - VPS Site: https://hpanel.hostinger.com/vps/1244684/overview

## Development & Version Control
- **VS Code** – Primary code editor
- **GitHub** – Version control for workflows, prompts, and scripts (if applicable)
- **Docker** – Containerization for self-hosted services (if applicable)

## AI & Language Models
- **Claude AI** – Desktop and web versions for agent design, content generation, and automation logic
- **OpenAI API** (if used) – GPT models for specific workflows

---

## Key System URLs

### LNL Group Sites & Properties
- **LNL Group (main holding site)**: https://lnlgroup.com
- **LNL Automations**: https://lnlautomations.com
- **Shadow Operator**: https://sharedsuccessstudios.com
- **LNL Creatives**: https://lnlcreatives.com

### Internal LNL Systems
- **LNL-Hub (Google Drive)**: https://drive.google.com/drive/folders/16DtWdl3-B08n_mArwcyyGzBvwnbwUKLW
- **LNL Notion Vault**: https://vault.lnlcreatives.com
- **n8n Instance**: https://n8n.srv1244684.hstgr.cloud/
- **Typebot Workspace**: https://typebot.co/faq-8xjnugp


### CRM & Sales Tools
- **HubSpot Dashboard**: https://app.hubspot.com/global-home/50796003
- **CRM Pipeline View**: {direct link to pipeline if different}

### Client Resources (if applicable)
- **Client Portal**: https://vault.lnlcreatives.com
- **Knowledge Base / Help Center**: {if you have public docs}

---

## Key Integration Patterns

### n8n → HubSpot
- Webhook triggers from Typebot → n8n workflow → HubSpot contact/deal creation

### Typebot → n8n → Email
- Lead capture → n8n processes + scores → Personalized email sent

### Notion → Pomelli → Social Media
- Brand mine stored in Notion → Pomelli generates content → n8n posts to social channels

### CRM → n8n → Slack
- Deal won in HubSpot → n8n notification → Slack channel alert

---

## API Key Management
- All API keys and credentials stored as **n8n environment variables** or secure credential storage
- Never hard-code secrets in workflows or scripts
- Use principle of least privilege for all integrations

## Browser & Tools
- **Windows** – Primary OS
- **Chrome** – Primary browser with Claude AI extension
- **PowerShell / WSL Ubuntu** – Terminal access for CLI workflows
