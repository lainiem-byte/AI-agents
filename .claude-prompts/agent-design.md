# Agent Design Prompt Template

Design an AI agent following LNL best practices.

## CONTEXT
- Architecture: {reference architecture.md from .claude-context}
- Standards: {reference standards.md from .claude-context}
- Division: {LNL Automations | Shadow Operator | LNL Creatives}
- Similar agents: {reference any similar agent designs if available}

## AGENT SPECIFICATION
- **Agent Name**: {agent_name}
- **Primary Purpose**: {one-sentence mission statement}
- **Division Focus**: {which pillar does this support? Asset Extraction, Systems Mining, or both?}
- **Target Outcome**: {specific business outcome this agent delivers}

## REQUIREMENTS

### 1. Core Capabilities
What must this agent be able to do?
- {capability_1}
- {capability_2}
- {capability_3}

### 2. Data Sources & Tools
What data does the agent need access to?
- {data_source_1} (e.g., CRM, Google Drive, Notion)
- {tool_1} (e.g., n8n workflows, Typebot flows, Pomelli)
- {tool_2}

### 3. Three-Layer Architecture
Map this agent to the LNL standard layers:
- **Ingestion Layer**: {how does data enter? Typebot, webhook, form, etc.}
- **Intelligence Layer**: {how is data processed? AI scoring, routing logic, enrichment}
- **Execution Layer**: {what actions are taken? Email, CRM update, notification}

### 4. Guardrails & Edge Cases
What should this agent NOT do?
- {guardrail_1}
- {edge_case_1} and how to handle it

## DELIVERABLES
Provide:
1. **Agent architecture diagram** or description (Ingestion → Intelligence → Execution flow)
2. **n8n workflow outline** with key nodes and decision points
3. **Required credentials/API keys** list
4. **Test scenarios** (3 typical cases, 1 edge case)
5. **Success metrics** (how do we know it's working?)

Apply LNL standards:
- Clear naming conventions
- Logging at key steps
- Failure behavior defined
- Environment variables for secrets
