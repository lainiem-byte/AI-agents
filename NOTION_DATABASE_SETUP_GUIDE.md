# LNL Concierge Agent - Notion Database Setup Guide

## Overview
This guide will help you set up the Notion database that powers your Concierge Agent. The database tracks client vaults, access keys, project status, and asset uploads.

---

## 🏗️ STEP 1: CREATE THE NOTION INTEGRATION

1. **Go to** [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. **Click** "+ New integration"
3. **Fill in details:**
   - Name: `LNL Concierge`
   - Associated workspace: Select your workspace
   - Type: Internal integration
4. **Click** "Submit"
5. **Copy the "Internal Integration Token"** (starts with `secret_`)
   - ⚠️ **Save this!** You'll need it for n8n

---

## 🗂️ STEP 2: CREATE THE CLIENT VAULT DATABASE

### Create New Database Page

1. **Open Notion**
2. **Create a new page** called "LNL Client Vault"
3. **Inside that page**, add a **Database - Full page**
4. **Title it:** "Client Records"

### Add Database Properties

Click **"+ Add a property"** and create these columns in this exact order:

---

## 📋 DATABASE PROPERTIES (16 Total)

### 1. Client Name (Title)
- **Type:** Title
- **Purpose:** Primary identifier (e.g., "Radiant Med Spa")
- ⭐ This is created automatically as the first column

### 2. Business Name
- **Type:** Text
- **Purpose:** Official business name if different from client name

### 3. Market
- **Type:** Select
- **Options to create:**
  - 🔵 Raleigh
  - 🟢 Columbus
  - 🟣 Moscow

### 4. Industry
- **Type:** Select
- **Options to create:**
  - 💆 Med Spa
  - 🏠 Realtor
  - ⚖️ Law
  - 🔧 HVAC
  - 📦 Other

### 5. Pillar Focus
- **Type:** Select
- **Options to create:**
  - 🎨 Creative
  - 🤖 Automations
  - 🏛️ Both

### 6. Vault Key
- **Type:** Text
- **Purpose:** Stores the unique access key (e.g., LNL-RAL-8K4T2)

### 7. Key Status
- **Type:** Select
- **Options to create:**
  - 🟢 Active
  - 🔴 Revoked
  - ⚫ Expired

### 8. Key Issued Date
- **Type:** Date
- **Purpose:** When the vault key was generated

### 9. Last Login
- **Type:** Date
- **Include time:** ✅ Yes
- **Purpose:** Last time client accessed their vault

### 10. Total Logins
- **Type:** Number
- **Purpose:** Count of vault access attempts

### 11. Project Status
- **Type:** Select
- **Options to create:**
  - 📝 Contract Signed
  - ⏳ Pillar 1 Pending
  - ⚙️ Processing
  - ✅ Active
  - ⏸️ Paused
  - 🏁 Complete

### 12. Pillar 1 Status
- **Type:** Select
- **Options to create:**
  - ⬜ Not Started
  - 📨 Assets Requested
  - 📥 Assets Received
  - ✅ Extraction Complete

### 13. Asset Folder
- **Type:** URL
- **Purpose:** Link to client's asset upload section

### 14. Deliverables Folder
- **Type:** URL
- **Purpose:** Link to completed work section

### 15. Contract Date
- **Type:** Date
- **Purpose:** When contract was signed

### 16. Owner Name
- **Type:** Text
- **Purpose:** Primary contact person

### 17. Email
- **Type:** Email
- **Purpose:** Contact email

### 18. Phone
- **Type:** Phone
- **Purpose:** Contact phone number

### 19. Notes
- **Type:** Text
- **Purpose:** Internal notes and comments

---

## 🎨 STEP 3: CONFIGURE DATABASE VIEWS

### Default View Setup

1. **Click** the "..." menu at top right of database
2. **Layout:** Table
3. **Properties:** Show all 19 properties
4. **Sort by:** Key Issued Date (Descending) - Shows newest clients first

### Create Additional Views (Optional)

**View 1: Active Projects**
- Filter: Project Status = Active
- Sort: Last Login (Descending)

**View 2: Pending Assets**
- Filter: Pillar 1 Status = Not Started OR Assets Requested
- Sort: Key Issued Date (Ascending) - Oldest first

**View 3: LOGIC STALL**
- Filter: Project Status = Paused
- Highlight: These need immediate attention

---

## 🔗 STEP 4: SHARE DATABASE WITH INTEGRATION

This is **CRITICAL** - without this step, n8n cannot access your database.

1. **Click** the "..." menu at top right of the "LNL Client Vault" page
2. **Click** "Connections" (or "Add connections")
3. **Search for** "LNL Concierge" (your integration name)
4. **Click** to add it
5. **Verify** it appears in the connections list

---

## 🆔 STEP 5: GET YOUR DATABASE ID

You need this ID for the n8n workflow.

### Method 1: From URL (Easiest)

1. **Open** the database in Notion
2. **Look at the URL** in your browser:
   ```
   https://www.notion.so/YOUR_WORKSPACE/DATABASE_ID?v=VIEW_ID
                                        ^^^^^^^^^^^^^^^^
                                        This is your Database ID
   ```
3. **Copy** the Database ID (32 characters, mix of letters and numbers)

### Method 2: From Share Menu

1. **Click** "..." → "Copy link"
2. **Paste** the link somewhere
3. **Extract** the ID from the URL

**Example:**
```
URL: https://www.notion.so/2ed2b4104a59804eb681fc0fe732d51e?v=...
Database ID: 2ed2b4104a59804eb681fc0fe732d51e
```

---

## 📄 STEP 6: CREATE CLIENT PAGE TEMPLATE

When a new client is added to the database, their page should have this structure:

### Standard Client Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  🏛️ [CLIENT NAME] // [MARKET]                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  📊 SYSTEM STATUS                                       │
│  ▓▓▓▓▓▓▓▓░░░░░░░░ PILLAR 1: PROCESSING                │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  📁 PILLAR 1: ASSET EXTRACTION                         │
│  Upload your brand assets here:                        │
│  • Logo files (PNG, SVG, AI)                          │
│  • Brand colors / style guide                         │
│  • Headshots / team photos                            │
│  • Existing marketing materials                       │
│  • Website screenshots (if redesigning)               │
│                                                         │
│  [File upload area]                                    │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  📦 DELIVERABLES                                       │
│  Your completed work will appear here.                 │
│  Status: Awaiting Pillar 1 Completion                 │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  📋 PROJECT TIMELINE                                   │
│  ✅ Contract Signed - Jan 19, 2026                    │
│  ✅ Vault Access Granted - Jan 19, 2026               │
│  ⏳ Pillar 1 Assets - Awaiting Upload                 │
│  ○ Digital Facelift v1.0 - Pending                    │
│  ○ Mechanical Heart Setup - Pending                   │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  💬 ARCHITECT NOTES                                    │
│  Welcome to your LNL Vault. This is your private       │
│  workspace for your Growth Architecture build.         │
│  Upload your assets above to begin.                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### How to Create Template

1. **Create one sample client page** with the layout above
2. **Use it as reference** when creating new clients
3. **OR** let the n8n workflow auto-populate pages (recommended)

---

## 🎨 STEP 7: ADD VISUAL STYLING (OPTIONAL)

### Color-Code Status Properties

**Key Status:**
- 🟢 Active → Green
- 🔴 Revoked → Red
- ⚫ Expired → Gray

**Project Status:**
- 📝 Contract Signed → Blue
- ⏳ Pillar 1 Pending → Yellow
- ⚙️ Processing → Orange
- ✅ Active → Green
- ⏸️ Paused → Red
- 🏁 Complete → Gray

**Pillar 1 Status:**
- ⬜ Not Started → Gray
- 📨 Assets Requested → Yellow
- 📥 Assets Received → Blue
- ✅ Extraction Complete → Green

### Add Icons to Select Options

When creating select options, add emojis:
- Click the color/name of the option
- Add an emoji before the text
- Example: "🔵 Raleigh" instead of just "Raleigh"

---

## 🔍 STEP 8: TEST THE DATABASE

### Add a Test Client Manually

1. **Click** "+ New" in the database
2. **Fill in test data:**
   - **Client Name:** Test Med Spa
   - **Market:** Raleigh
   - **Industry:** Med Spa
   - **Vault Key:** LNL-RAL-TEST1
   - **Key Status:** Active
   - **Project Status:** Contract Signed
   - **Pillar 1 Status:** Not Started

3. **Open the client page**
4. **Add the template content** (sections for assets, deliverables, timeline)
5. **Verify everything looks correct**

### Test Data Entry

Make sure you can:
- ✅ Create new client records
- ✅ Update properties
- ✅ Add content to client pages
- ✅ Search and filter by status

---

## 🔗 STEP 9: CONNECT TO N8N

Now that your Notion database is set up, connect it to the Concierge Agent workflow:

### In n8n:

1. **Create Notion credential:**
   - Go to Credentials → Add Credential
   - Select "Notion API"
   - Paste your Integration Token (from Step 1)
   - Name it: "LNL Concierge Notion"
   - Save

2. **Update workflow database ID:**
   - Open the Concierge Agent workflow
   - Find all Notion nodes
   - Update `databaseId` to your Database ID (from Step 5)

3. **Test connection:**
   - Execute any Notion node
   - Verify it can read/write to your database

---

## 📊 DATABASE STRUCTURE REFERENCE

Here's a quick reference for all 19 properties:

| Property | Type | Example Value |
|----------|------|---------------|
| Client Name | Title | Radiant Med Spa |
| Business Name | Text | Radiant Med Spa LLC |
| Market | Select | 🔵 Raleigh |
| Industry | Select | 💆 Med Spa |
| Pillar Focus | Select | 🏛️ Both |
| Vault Key | Text | LNL-RAL-8K4T2 |
| Key Status | Select | 🟢 Active |
| Key Issued Date | Date | 2026-01-19 |
| Last Login | Date | 2026-01-20 09:15 AM |
| Total Logins | Number | 4 |
| Project Status | Select | ⚙️ Processing |
| Pillar 1 Status | Select | 📥 Assets Received |
| Asset Folder | URL | https://notion.so/... |
| Deliverables Folder | URL | https://notion.so/... |
| Contract Date | Date | 2026-01-19 |
| Owner Name | Text | Sarah Johnson |
| Email | Email | sarah@radiantmedspa.com |
| Phone | Phone | (919) 555-1234 |
| Notes | Text | Very responsive, excited to start |

---

## 🔄 HOW THE CONCIERGE AGENT USES NOTION

### What n8n Does Automatically:

**On Contract Signed:**
1. Creates new client record in database
2. Generates unique Vault Key (LNL-XXX-XXXXX)
3. Populates all properties
4. Creates client page with template content
5. Sets Project Status to "Contract Signed"
6. Sets Pillar 1 Status to "Not Started"

**On Vault Login:**
1. Validates Vault Key against database
2. Updates Last Login timestamp
3. Increments Total Logins count
4. Returns client data to vault frontend

**On Asset Upload Detection:**
1. Updates Pillar 1 Status to "Assets Received"
2. Updates Project Status to "Processing"
3. Sends confirmation email

**On LOGIC STALL (48hrs, no assets):**
1. Updates Project Status to "Paused"
2. Updates Pillar 1 Status to "Assets Requested"
3. Sends critical alert email

---

## 🚨 TROUBLESHOOTING

### Problem: n8n Can't Find Database

**Solution:**
1. Verify database is shared with "LNL Concierge" integration
2. Check that Database ID is correct (no extra characters)
3. Confirm Notion credential in n8n has correct token

---

### Problem: Can't Create New Records

**Solution:**
1. Check that all required properties exist in database
2. Verify property names match exactly (case-sensitive)
3. Ensure select options exist (e.g., "Raleigh" market)

---

### Problem: Client Pages Don't Auto-Populate

**Solution:**
1. Check that "Populate Client Page Template" node is active
2. Verify it has correct Notion credential
3. Test manually by executing that specific node

---

## ✅ VERIFICATION CHECKLIST

Before proceeding to n8n integration:

- ✅ Notion integration created and token saved
- ✅ "LNL Client Vault" page created
- ✅ Database created inside vault page
- ✅ All 19 properties added with correct types
- ✅ Select options created for Market, Industry, etc.
- ✅ Database shared with "LNL Concierge" integration
- ✅ Database ID copied from URL
- ✅ Test client record created successfully
- ✅ Client page template looks good

---

## 🎯 WHAT HAPPENS NEXT

Once this database is connected to the Concierge Agent workflow:

1. **Contract gets signed** → Client record auto-created
2. **Vault key sent via email** → Client receives access
3. **Client logs in** → Login tracked in Notion
4. **Assets uploaded** → Status updated automatically
5. **48hrs without assets** → LOGIC STALL flag set

Everything is tracked in this single Notion database, creating a beautiful, organized client vault system.

---

## 📚 ADDITIONAL RESOURCES

### Property Type Reference

- **Title:** Primary identifier, always visible
- **Text:** Single line of text
- **Select:** Single choice from dropdown
- **Multi-select:** Multiple choices from dropdown
- **Date:** Calendar date (optionally with time)
- **Number:** Numeric value
- **URL:** Web link
- **Email:** Email address
- **Phone:** Phone number
- **Checkbox:** True/false toggle

### Best Practices

1. **Consistent Naming:** Use exact same spellings in n8n and Notion
2. **Required Fields:** Client Name, Market, Vault Key are essential
3. **Regular Cleanup:** Archive completed projects quarterly
4. **Backup:** Duplicate database monthly for safety

---

## 🎉 YOU'RE READY!

Your Notion database is now configured to power the Concierge Agent. 

**Your Database ID:** `2ed2b4104a59804eb681fc0fe732d51e` (we already have this!)

Next step: Make sure this ID is in the n8n Concierge Agent workflow (we already did this in the UPDATED workflow file).

The vault is ready to receive clients! 🏛️
