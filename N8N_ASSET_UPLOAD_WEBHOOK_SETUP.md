# Adding Asset Upload Webhook to n8n Concierge Agent

## Purpose
This webhook receives notifications when clients upload Pillar 1 assets to the vault, then updates their status in Notion.

---

## 🔧 How to Add to Your n8n Workflow

### Step 1: Add New Webhook Node

1. **Open** your Concierge Agent workflow in n8n
2. **Add** a new **Webhook** node
3. **Configure:**
   - HTTP Method: POST
   - Path: `lnl-asset-upload`
   - Response Mode: "Respond to Webhook"

### Step 2: Extract Upload Data

Add a **Code** node to parse the upload notification:

**Node Name:** "Extract Upload Info"

**JavaScript Code:**
```javascript
// Expected POST body from Replit:
// {
//   "vault_key": "LNL-RAL-8K4T2",
//   "client_id": "client_123",
//   "files": ["logo.png", "colors.pdf", "photo.jpg"],
//   "upload_timestamp": "2026-01-20T10:30:00Z"
// }

const data = $input.item.json.body || $input.item.json;

if (!data.vault_key && !data.client_id) {
  return {
    error: true,
    message: "vault_key or client_id required"
  };
}

return {
  vault_key: data.vault_key,
  client_id: data.client_id,
  files: data.files || [],
  file_count: (data.files || []).length,
  upload_timestamp: data.upload_timestamp || new Date().toISOString()
};
```

### Step 3: Find Client in Notion

Add a **Notion** node to find the client:

**Node Name:** "Find Client by Vault Key"

**Configuration:**
- Operation: Get All
- Database ID: `2ed2b4104a59804eb681fc0fe732d51e`
- Filter:
  - Property: Vault Key
  - Condition: Equals
  - Value: `={{ $json.vault_key }}`
- Limit: 1

### Step 4: Update Project Status

Add another **Notion** node to update the status:

**Node Name:** "Update Pillar 1 Status"

**Configuration:**
- Operation: Update
- Page ID: `={{ $json.id }}` (from previous node)
- Properties:
  - **Pillar 1 Status** → Select → "Assets Received"
  - **Project Status** → Select → "Processing"
  - **Asset Upload Date** → Date → `={{ $json.upload_timestamp }}`

### Step 5: Log to Google Sheets (Optional)

If you want to track uploads in your Master Brain:

**Node Name:** "Log Upload to Master Brain"

**Configuration:**
- Operation: Append
- Document ID: [Your Master Brain Sheet ID]
- Sheet: "Concierge Agent Status"
- Columns:
  - Vault Key: `={{ $json.vault_key }}`
  - Assets Uploaded: TRUE
  - Asset Upload Date: `={{ $json.upload_timestamp }}`
  - Files Count: `={{ $json.file_count }}`

### Step 6: Send Confirmation Email

Add an **Email** node to notify the client:

**Node Name:** "Send Asset Confirmation Email"

**Configuration:**
- To: `={{ $json.email }}` (from Find Client node)
- From: vault@lnlgroup.com
- Subject: "✅ Assets Received - Processing Initiated"
- Email Format: HTML
- HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Georgia', serif; background: #1a1a1a; color: #e8e8e8; }
    .container { max-width: 600px; margin: 20px auto; background: #2a2a2a; border: 1px solid #d4af37; }
    .header { background: #d4af37; padding: 30px; text-align: center; }
    .content { padding: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #1a1a1a;">✅ Assets Received</h1>
    </div>
    <div class="content">
      <p><strong>{{ $json.client_name }},</strong></p>
      
      <p>Your Pillar 1 assets have been successfully uploaded to The Vault.</p>
      
      <p><strong>Files Received:</strong> {{ $json.file_count }}</p>
      
      <p>The Mechanical Heart has begun processing your brand foundation. Your Digital Facelift initialization will begin within the next 72 hours.</p>
      
      <div style="background: #1a1a1a; padding: 20px; margin: 20px 0; border-left: 3px solid #d4af37;">
        <p style="margin: 0; color: #d4af37; font-weight: bold;">Next Steps:</p>
        <p style="margin: 10px 0 0 0;">
          1. Our team is analyzing your aesthetic gaps<br>
          2. You'll receive your Digital Facelift preview within 3-5 business days<br>
          3. Watch for updates in your Vault dashboard
        </p>
      </div>
      
      <p><a href="https://vault.lnlgroup.com" style="color: #d4af37;">→ Return to Your Vault</a></p>
      
      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        The LNL Concierge<br>
        Automated Infrastructure Notification
      </p>
    </div>
  </div>
</body>
</html>
```

### Step 7: Format Response

Add a final **Code** node to send response back to Replit:

**Node Name:** "Format Upload Response"

**JavaScript Code:**
```javascript
return {
  success: true,
  message: "Assets received and processed",
  files_uploaded: $json.file_count,
  new_status: {
    project_status: "Processing",
    pillar_1_status: "Assets Received"
  },
  timestamp: new Date().toISOString()
};
```

### Step 8: Connect to Webhook Response

Connect "Format Upload Response" back to the original **Webhook** node.

### Step 9: Get Your Webhook URL

1. **Activate** the workflow
2. **Click** the webhook node
3. **Copy** the Production URL:
   ```
   https://your-n8n.app.n8n.cloud/webhook/lnl-asset-upload
   ```

---

## 📊 Complete Workflow Structure

```
Webhook: lnl-asset-upload (POST)
    ↓
Extract Upload Info (Code)
    ↓
Find Client by Vault Key (Notion)
    ↓
Update Pillar 1 Status (Notion)
    ↓
[Optional] Log Upload to Master Brain (Google Sheets)
    ↓
Send Asset Confirmation Email
    ↓
Format Upload Response (Code)
    ↓
Return to Webhook Response
```

---

## ✅ Testing the Webhook

### Using curl:
```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/lnl-asset-upload \
  -H "Content-Type: application/json" \
  -d '{
    "vault_key": "LNL-RAL-TEST1",
    "files": ["logo.png", "colors.pdf"],
    "upload_timestamp": "2026-01-20T10:30:00Z"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Assets received and processed",
  "files_uploaded": 2,
  "new_status": {
    "project_status": "Processing",
    "pillar_1_status": "Assets Received"
  }
}
```

### What Should Happen:
1. ✅ Notion database updated: Pillar 1 Status = "Assets Received"
2. ✅ Notion database updated: Project Status = "Processing"
3. ✅ Client receives confirmation email
4. ✅ [Optional] Master Brain logged the upload
5. ✅ Webhook returns success response

---

## 🔐 Security Considerations

**Input Validation:**
- Webhook validates vault_key exists in Notion
- Only updates records that match the vault_key
- File list is logged but files themselves are NOT sent through n8n

**File Handling Options:**

**Option A: Replit Stores Files**
- Replit saves files to its storage
- Sends only metadata to n8n (file names, count)
- n8n updates status only

**Option B: Upload to Google Drive**
- Replit uploads files to Google Drive folder
- Gets Drive folder URL
- Sends URL + metadata to n8n
- n8n updates Notion with Drive link

**Option C: Send to Notion**
- Replit converts files to base64
- Sends to n8n
- n8n uploads to Notion page as attachments
- ⚠️ Not recommended (payload size limits)

**Recommended: Option B (Google Drive)**

---

## 🎯 Integration with Replit

In your Replit backend, the upload handler should:

```javascript
app.post('/api/upload-assets', upload.array('files'), async (req, res) => {
  // 1. Store files (to Replit storage or Google Drive)
  const fileNames = req.files.map(f => f.originalname);
  
  // 2. Get vault_key from session/request
  const vaultKey = req.session.vault_key;
  
  // 3. Notify n8n
  const response = await fetch(process.env.N8N_ASSET_UPLOAD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vault_key: vaultKey,
      files: fileNames,
      upload_timestamp: new Date().toISOString()
    })
  });
  
  const result = await response.json();
  res.json(result);
});
```

---

## 📋 Post-Upload Actions

After this webhook runs, the following happens automatically:

1. ✅ **Notion updated** - Client status changes
2. ✅ **Email sent** - Client notified
3. ✅ **Dashboard updates** - Next 30s poll shows new status
4. ✅ **"LOGIC STALL" banner disappears** - No longer blocking
5. ✅ **Timeline updates** - Pillar 1 shows as complete

The Mechanical Heart just moved the client forward without any human intervention! 🏛️⚙️
