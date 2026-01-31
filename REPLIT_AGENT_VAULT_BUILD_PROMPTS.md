# Complete Replit Agent Prompts for LNL Vault System

## Overview
Your vault system needs TWO connected components built in Replit to match your "Logic + Luxury" architecture.

---

## 🎯 PHASE 1: THE VAULT LOGIN (vault.lnlgroup.com)

### Replit Agent Prompt 1.1: Login Terminal Interface

```
Build a high-end, minimalist vault login page at `/vault` for LNL Group:

AESTHETIC:
- Background: Dark mode (#050505) with subtle gradient
- Typography: White serif for "THE LNL GROUP" header
- Accent color: Gold (#d4af37) for all interactive elements
- Card: Glassmorphism effect with 1px charcoal border (#2a2a2a)
- Theme: "Luxury security terminal" not standard login form

STRUCTURE:
1. Header section:
   - Logo: "THE LNL GROUP" in bold serif
   - Tagline: "LOGIC + LUXURY" in smaller caps
   
2. Login form:
   - Label: "ACCESS KEY" in uppercase, 12px, gold
   - Input: Monospace font, auto-formats as user types: LNL-XXX-XXXXX
   - Button: "INITIALIZE VAULT" (gold background, black text)
   
3. Auto-formatting logic:
   - As user types, format to: LNL-[3 chars]-[5 chars]
   - All uppercase automatically
   - Validate format before submit

4. Error states:
   - Invalid format: "Invalid key format. Expected: LNL-XXX-XXXXX"
   - Authentication failed: "Invalid or expired vault key"
   - Display errors in red (#cc3300) with left border

5. Footer:
   - Small text: "Secured by The Mechanical Heart"
   - Link to lnlgroup.com

FUNCTIONALITY:
On submit, send POST to n8n webhook (I'll provide URL):
- Body: { "vault_key": "[entered key]" }
- On success: Trigger initialization animation, then redirect to /vault-dashboard
- On failure: Show error message inline

Make it feel like a high-security terminal, not a typical web form.
```

---

### Replit Agent Prompt 1.2: The Initialization Animation

```
Create the "System Loading" initialization sequence for the vault login:

TRIGGER: When n8n returns successful authentication

ANIMATION SEQUENCE (3 seconds total):
Display a dark overlay (#050505 with 95% opacity) over the entire screen.
Show a vertical "System Log" in center, using:
- Font: Monospace (Courier New or similar)
- Color: Steel blue (#4a9eff)
- Size: 14px
- Animation: Type-writer effect, 0.5s per line

TEXT SEQUENCE:
Line 1: "> AUTHENTICATION SUCCESSFUL"
Line 2: "> INITIALIZING MECHANICAL HEART..."
Line 3: "> SYNCING [MARKET] LOGIC FUNNEL..." (replace [MARKET] with client's market from n8n response)
Line 4: "> MAPPING AESTHETIC GAPS..."
Line 5: "> GENERATING VAULT 2.0 INTERFACE..."
Line 6: "> WELCOME, ARCHITECT."

TRANSITION:
After line 6 displays for 0.5s:
1. Fade out the overlay (0.5s)
2. Slide in /vault-dashboard from right using ease-in-out (0.5s)

TECHNICAL:
- Use CSS animations, not JavaScript setInterval for performance
- Each line should appear with a subtle fade-in
- Add a blinking cursor after each line while typing
- Store client data from n8n response in sessionStorage for dashboard access
```

---

## 🏛️ PHASE 2: THE VAULT DASHBOARD (/vault-dashboard)

### Replit Agent Prompt 2.1: Dashboard Architecture

```
Build the main vault dashboard at `/vault-dashboard` for authenticated clients:

OVERALL LAYOUT:
- Full-screen interface (no scroll initially)
- Grid layout: 3 main modules
- Dark theme (#050505 background)
- Glassmorphism cards throughout

HEADER SECTION:
1. Welcome banner:
   - "Welcome back to the Vault, [Client Name]"
   - Subtitle: "Current System Status: [Status] | Market: [Market]"
   - Right side: Logout button (subtle, top-right corner)

2. System Status Banner (conditionally shown):
   - ONLY display if pillar_1_status === "Not Started" or "Assets Requested"
   - Text: "⚠️ LOGIC STALL: Pillar 1 Extraction required to proceed with Digital Facelift"
   - Color: Red/orange alert (#cc3300)
   - Button: "Upload Now" → scrolls to Asset Extraction module
   - Make this prominent but elegant

MAIN MODULES (3-column grid on desktop, stack on mobile):

Module 1: PROJECT TIMELINE
- Title: "📋 Project Timeline"
- Display as vertical progress tracker
- Steps:
  1. ✅ Contract Signed - [date]
  2. ✅ Vault Access Granted - [date]
  3. Status dynamic: Pillar 1 Assets - [Pending/Complete]
  4. ○ Digital Facelift v1.0 - Pending
  5. ○ Mechanical Heart Setup - Pending
- Use gold checkmarks for complete, gray circles for pending

Module 2: ASSET EXTRACTION
- Title: "📁 Pillar 1: Asset Extraction"
- Description: "Upload your brand assets here:"
- Checklist (not interactive, just display):
  • Logo files (PNG, SVG, AI)
  • Brand colors / style guide
  • Headshots / team photos
  • Existing marketing materials
  • Website screenshots (if redesigning)
- File upload area:
  - Drag & drop zone
  - "Click to browse" option
  - Show upload progress
  - List uploaded files with checkmarks
- Button: "Submit Assets" (gold, prominent)

Module 3: LOGIC STATS
- Title: "📊 System Intelligence"
- Display these metrics from n8n/Google Sheets:
  - Audit Score: [X.X/10]
  - Aesthetic Score: [X.X/10]  
  - Labor Leakage: [X hours/week]
  - Time Reclaimed This Month: [X hours] (if available)
- Display as large numbers with small labels
- Use gold (#d4af37) for numbers

NAVIGATION:
- Minimal top nav bar:
  - "THE LNL GROUP" logo (left, links to dashboard home)
  - Navigation: Dashboard | Assets | Timeline | Support
  - User icon with dropdown (right): Settings | Logout

FUNCTIONALITY:
- Fetch client data from sessionStorage (populated by login)
- If sessionStorage empty, redirect to /vault
- File upload should POST to n8n webhook for processing
- Real-time status updates (poll n8n every 30s for status changes)

MOBILE RESPONSIVE:
- Stack modules vertically on mobile
- Ensure touch-friendly buttons (min 44px height)
- Make file upload work on mobile browsers
```

---

### Replit Agent Prompt 2.2: Live Data Integration

```
Add live data fetching to the /vault-dashboard:

DATA SOURCE:
Create an API route at `/api/vault-status` that:
1. Accepts client_id or vault_key in query params
2. Calls n8n webhook to get latest client data
3. Returns JSON with:
   - project_status
   - pillar_1_status
   - audit_score
   - aesthetic_score
   - labor_leakage
   - uploaded_files (array)
   - last_updated (timestamp)

DASHBOARD INTEGRATION:
On dashboard load:
1. Get vault_key from sessionStorage
2. Call `/api/vault-status?vault_key=[key]`
3. Populate all modules with returned data
4. Show loading state while fetching (subtle spinner)

POLLING:
- Set up automatic refresh every 30 seconds
- Update dashboard without full page reload
- Show subtle notification when data updates: "Dashboard refreshed"

ERROR HANDLING:
- If API call fails: Show "Unable to sync with Mechanical Heart" message
- If session expired: Redirect to /vault with message
- Retry failed requests up to 3 times before showing error
```

---

### Replit Agent Prompt 2.3: File Upload System

```
Build the Asset Extraction file upload functionality:

UPLOAD INTERFACE:
In the "Asset Extraction" module:
1. Drag & drop zone:
   - Large dashed border area
   - Text: "Drag files here or click to browse"
   - Icon: Upload icon (gold)
   - Hover state: Border becomes solid gold

2. File selection:
   - Allow multiple files
   - Accept: .png, .jpg, .svg, .ai, .pdf, .psd, .zip
   - Max size: 50MB per file
   - Show file preview thumbnails for images

3. Upload progress:
   - Progress bar for each file (gold)
   - Show percentage
   - Cancel button per file

4. Uploaded files list:
   - File name with icon
   - File size
   - Upload date/time
   - Delete button (trash icon)

BACKEND LOGIC:
Create POST endpoint: `/api/upload-assets`
1. Accept multipart/form-data
2. Store files temporarily on Replit storage OR
3. Upload directly to Google Drive (if using Drive for storage) OR
4. Convert to base64 and send to n8n webhook
5. Return: { success: true, files: [uploaded file names] }

N8N INTEGRATION:
After successful upload:
1. Send notification to n8n webhook
2. Include: client_id, vault_key, file_names[], upload_timestamp
3. n8n should update pillar_1_status to "Assets Received"
4. Dashboard should auto-refresh to show updated status

SECURITY:
- Validate file types server-side
- Scan for malicious files (if possible)
- Only allow uploads from authenticated sessions
- Rate limit: Max 20 files per upload, max 3 uploads per hour
```

---

## 🔗 PHASE 3: REPLIT-TO-N8N CONNECTION

### Configuration Needed in Replit:

```javascript
// Add these environment variables in Replit Secrets:

N8N_VAULT_LOGIN_WEBHOOK = "https://your-n8n.app.n8n.cloud/webhook/lnl-vault-login"
N8N_VAULT_STATUS_WEBHOOK = "https://your-n8n.app.n8n.cloud/webhook/lnl-vault-status"
N8N_ASSET_UPLOAD_WEBHOOK = "https://your-n8n.app.n8n.cloud/webhook/lnl-asset-upload"
```

### Example API Route (Node.js/Express):

```javascript
// In your Replit server file
app.post('/api/vault-login', async (req, res) => {
  const { vault_key } = req.body;
  
  try {
    const response = await fetch(process.env.N8N_VAULT_LOGIN_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vault_key })
    });
    
    const data = await response.json();
    
    if (data.auth === true) {
      res.json({
        success: true,
        client_name: data.client_name,
        market: data.market,
        client_data: data
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid key' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
```

---

## 📋 IMPLEMENTATION CHECKLIST

### For Your Replit Agent:

**Phase 1: Login**
- [ ] Build `/vault` login page with "Security Terminal" aesthetic
- [ ] Add auto-formatting for vault keys (LNL-XXX-XXXXX)
- [ ] Integrate with n8n webhook for authentication
- [ ] Create 3-second initialization animation
- [ ] Store client data in sessionStorage

**Phase 2: Dashboard**
- [ ] Build `/vault-dashboard` with 3-module layout
- [ ] Add System Status banner (conditional display)
- [ ] Create Project Timeline with progress tracker
- [ ] Build Asset Extraction file upload interface
- [ ] Display Logic Stats from n8n/Google Sheets
- [ ] Add navigation header with logout

**Phase 3: Backend**
- [ ] Create `/api/vault-status` endpoint
- [ ] Create `/api/upload-assets` endpoint
- [ ] Set up polling (30s refresh)
- [ ] Configure n8n webhook URLs in environment variables
- [ ] Add error handling and session validation

**Phase 4: Testing**
- [ ] Test login with valid key → Animation → Dashboard
- [ ] Test login with invalid key → Error message
- [ ] Test file upload → n8n notification → Status update
- [ ] Test "LOGIC STALL" banner appears when no assets
- [ ] Test mobile responsiveness
- [ ] Test data polling and auto-refresh

---

## 🎯 FINAL INTEGRATION FLOW

```
1. Client receives email with vault key: LNL-RAL-8K4T2
         ↓
2. Client visits vault.lnlgroup.com (or lnlgroups.com/vault)
         ↓
3. Enters key → Replit validates with n8n webhook
         ↓
4. n8n returns: { auth: true, client_data: {...} }
         ↓
5. Replit shows 3-second initialization animation
         ↓
6. Dashboard loads with client data
         ↓
7. If no assets uploaded: "LOGIC STALL" banner shows
         ↓
8. Client uploads files → Replit sends to n8n
         ↓
9. n8n updates Notion: pillar_1_status = "Assets Received"
         ↓
10. Dashboard polls and refreshes: Banner disappears
         ↓
11. Client sees updated timeline: "Pillar 1: Complete ✅"
```

---

## 💡 KEY ARCHITECTURAL NOTES

1. **Two-Stage System:**
   - Stage 1: Static vault-login.html (can be on Vercel) OR Replit route
   - Stage 2: Dynamic dashboard (must be on Replit with backend)

2. **Data Flow:**
   - Login → n8n validates → Returns client data → Store in session
   - Dashboard → Polls n8n every 30s → Updates display

3. **Notion Integration:**
   - n8n is the bridge between Replit and Notion
   - Replit never calls Notion API directly
   - All client data flows through n8n webhooks

4. **File Storage Options:**
   - Option A: Upload to Google Drive → n8n gets notification
   - Option B: Send base64 to n8n → n8n uploads to Notion
   - Option C: Store in Replit → n8n fetches when needed

---

## 🚀 SIMPLIFIED PROMPT FOR YOUR REPLIT AGENT

**If you want to give your Replit agent ONE master prompt, use this:**

```
Build a complete vault system for LNL Group with two routes:

1. /vault - Login page:
   - Dark luxury terminal aesthetic (#050505 background, gold #d4af37 accents)
   - Input for vault key (auto-format to LNL-XXX-XXXXX)
   - On submit: Call n8n webhook to validate
   - If valid: Show 3-second "System Loading" animation with text sequence
   - Then redirect to /vault-dashboard

2. /vault-dashboard - Client workspace:
   - Three modules: Project Timeline, Asset Extraction (file upload), Logic Stats
   - Fetch live data from n8n every 30 seconds
   - Show "LOGIC STALL" warning banner if pillar_1_status is pending
   - File upload sends notification to n8n webhook
   - Mobile responsive, glassmorphism cards

Technical requirements:
- Store n8n webhook URLs in environment variables
- Use sessionStorage for client data between login and dashboard
- Create API routes: /api/vault-login, /api/vault-status, /api/upload-assets
- All API routes proxy to n8n webhooks
- Error handling for failed auth and expired sessions
```

---

This is your complete blueprint. Your Replit agent now has everything it needs to build the vault system that connects to your n8n Concierge Agent and Notion database.
