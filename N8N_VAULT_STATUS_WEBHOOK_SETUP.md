# Adding Vault Status Webhook to n8n Concierge Agent

## Purpose
This webhook allows the vault dashboard to fetch live client data every 30 seconds.

---

## 🔧 How to Add to Your n8n Workflow

### Step 1: Open Your Concierge Agent Workflow
1. Open n8n
2. Go to Workflows
3. Open "LNL Concierge Agent - Production Ready"

### Step 2: Add New Webhook Node

1. **Click** the "+" button on the canvas
2. **Search** for "Webhook"
3. **Select** "Webhook" node
4. **Configure:**
   - HTTP Method: GET
   - Path: `lnl-vault-status`
   - Response Mode: "Respond to Webhook"

### Step 3: Add Query Validation

After the webhook, add a **Code** node to extract the vault key:

**Node Name:** "Extract Vault Key from Query"

**JavaScript Code:**
```javascript
// Get vault_key from query parameters
const vaultKey = $input.item.json.query.vault_key;

if (!vaultKey) {
  return {
    error: true,
    message: "vault_key parameter required"
  };
}

return {
  vault_key: vaultKey
};
```

### Step 4: Query Notion for Client Data

Add a **Notion** node after the Code node:

**Node Name:** "Get Client Data from Notion"

**Configuration:**
- Operation: Get database page
- Database ID: `2ed2b4104a59804eb681fc0fe732d51e` (your Notion database)
- Filter:
  - Property: Vault Key
  - Condition: Equals
  - Value: `={{ $json.vault_key }}`

### Step 5: Format Response

Add another **Code** node to format the data:

**Node Name:** "Format Dashboard Data"

**JavaScript Code:**
```javascript
// Get the Notion page data
const page = $input.item.json;

if (!page || !page.properties) {
  return {
    error: true,
    message: "Client not found"
  };
}

const props = page.properties;

// Extract all needed data
return {
  success: true,
  client_name: props['Client Name']?.title[0]?.plain_text || '',
  business_name: props['Business Name']?.rich_text[0]?.plain_text || '',
  market: props['Market']?.select?.name || '',
  industry: props['Industry']?.select?.name || '',
  project_status: props['Project Status']?.select?.name || '',
  pillar_1_status: props['Pillar 1 Status']?.select?.name || '',
  contract_date: props['Contract Date']?.date?.start || '',
  key_issued_date: props['Key Issued Date']?.date?.start || '',
  last_login: props['Last Login']?.date?.start || '',
  total_logins: props['Total Logins']?.number || 0,
  notion_url: page.url,
  
  // Add any additional fields from Master Brain if needed
  audit_score: 8.5, // TODO: Get from Google Sheets
  aesthetic_score: 7.2, // TODO: Get from Google Sheets
  labor_leakage: 12, // TODO: Get from Google Sheets
  
  last_updated: new Date().toISOString()
};
```

### Step 6: Connect to Webhook Response

1. Connect the "Format Dashboard Data" node back to the **"Webhook" node**
2. This sends the data back as the webhook response

### Step 7: Get Your Webhook URL

1. **Activate** the workflow
2. **Click** the "Webhook" node you created
3. **Copy** the "Production URL":
   ```
   https://your-n8n.app.n8n.cloud/webhook/lnl-vault-status
   ```

---

## 📊 Optional: Connect to Google Sheets Master Brain

If you want to include audit scores, add these steps before "Format Dashboard Data":

### Add Google Sheets Lookup

**Node Name:** "Get Audit Data from Master Brain"

**Configuration:**
- Operation: Lookup Row
- Document ID: [Your Master Brain Sheet ID]
- Sheet: "Lead Pipeline"
- Lookup Column: "Vault Key"
- Lookup Value: `={{ $json.vault_key }}`

Then in "Format Dashboard Data", use:
```javascript
const sheetData = $input.all()[1].json; // Get Google Sheets data

return {
  // ... existing fields ...
  audit_score: sheetData['Audit Score'] || 0,
  aesthetic_score: sheetData['Aesthetic Score'] || 0,
  labor_leakage: sheetData['Labor Leakage Score'] || 0
};
```

---

## ✅ Testing the Webhook

### Test with a Browser:
```
https://your-n8n.app.n8n.cloud/webhook/lnl-vault-status?vault_key=LNL-RAL-TEST1
```

**Expected Response:**
```json
{
  "success": true,
  "client_name": "Test Client",
  "market": "Raleigh",
  "project_status": "Processing",
  "pillar_1_status": "Assets Received",
  "audit_score": 8.5,
  ...
}
```

---

## 🔐 Security Note

This webhook is relatively safe because:
- It only returns data for valid vault keys
- Vault keys are already "semi-secret" (sent via email)
- No sensitive write operations

**Optional Enhancement:** Add rate limiting in n8n to prevent abuse.

---

## 📝 Final Workflow Structure

```
Webhook: lnl-vault-status (GET)
    ↓
Extract Vault Key from Query (Code)
    ↓
Get Client Data from Notion
    ↓
[Optional] Get Audit Data from Google Sheets
    ↓
Format Dashboard Data (Code)
    ↓
Return to Webhook Response
```

---

This webhook is now ready to be called by your Replit dashboard every 30 seconds!
