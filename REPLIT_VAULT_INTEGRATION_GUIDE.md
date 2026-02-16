# LNL Vault - Replit Website Integration Guide

## Overview
You have existing websites hosted on Replit (lnlgroups.com, lnlautomations.com, lnlcreatives.com), and you need to integrate the vault login system with these sites.

---

## 🏗️ CURRENT ARCHITECTURE

### Your Replit Websites:
- **lnlgroups.com** - Main site
- **lnlautomations.com** - Automations services
- **lnlcreatives.com** - Creative services

### New Vault System:
- **vault.lnlcreatives.com** - Client authentication portal
- **Notion** - Client workspace/vault
- **n8n** - Backend automation (Concierge Agent)

---

## 🔗 INTEGRATION OPTIONS

You have 3 main options for integrating the vault with your Replit sites:

### Option 1: Separate Subdomain (Recommended)
**Architecture:**
```
lnlgroups.com (Main site on Replit)
     ↓
vault.lnlcreatives.com (Separate Vercel/Netlify deployment)
     ↓
n8n webhook → Notion workspace
```

**Pros:**
- ✅ Cleanest separation of concerns
- ✅ Vault can be on faster CDN (Vercel)
- ✅ Easier to maintain/update separately
- ✅ No need to modify existing Replit code

**Cons:**
- ⚠️ Requires DNS configuration for subdomain

---

### Option 2: Route in Replit Website
**Architecture:**
```
lnlgroups.com (Replit)
     ↓
lnlgroups.com/vault (Route in Replit app)
     ↓
n8n webhook → Notion workspace
```

**Pros:**
- ✅ Single domain
- ✅ All code in one place (Replit)
- ✅ Can share navigation/styling

**Cons:**
- ⚠️ Need to add route to Replit backend
- ⚠️ Replit performance may be slower
- ⚠️ More complex deployment

---

### Option 3: Embedded iFrame
**Architecture:**
```
lnlgroups.com/vault (Replit page with iframe)
     ↓
<iframe src="vault.lnlcreatives.com">
     ↓
n8n webhook → Notion workspace
```

**Pros:**
- ✅ Vault login hosted separately (Vercel)
- ✅ Appears integrated in main site
- ✅ Easy to implement

**Cons:**
- ⚠️ iFrame limitations (styling, redirects)
- ⚠️ Not recommended for authentication

---

## 🎯 RECOMMENDED APPROACH

**Use Option 1 (Separate Subdomain) with Navigation Integration**

### Step 1: Deploy Vault to Subdomain
1. Deploy `vault-login.html` to Vercel/Netlify
2. Configure DNS: `vault.lnlcreatives.com` → Vercel
3. Update webhook URL in HTML

### Step 2: Add Navigation Links from Main Site
In your Replit websites, add links to the vault:

**In your main navigation:**
```html
<nav>
  <a href="https://lnlgroups.com">Home</a>
  <a href="https://lnlautomations.com">Automations</a>
  <a href="https://lnlcreatives.com">Creative</a>
  <a href="https://vault.lnlcreatives.com" class="vault-link">Client Vault</a>
</nav>
```

**Add a prominent button on homepage:**
```html
<div class="client-access-section">
  <h2>Existing Clients</h2>
  <p>Access your Growth Architecture workspace</p>
  <a href="https://vault.lnlcreatives.com" class="vault-button">
    🏛️ Enter Your Vault
  </a>
</div>
```

### Step 3: Add Styling for Vault Links
```css
.vault-link {
  background: linear-gradient(135deg, #d4af37, #c9a532);
  color: #1a1a1a;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.vault-link:hover {
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
  transform: translateY(-2px);
}

.vault-button {
  display: inline-block;
  background: #d4af37;
  color: #1a1a1a;
  padding: 18px 40px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.vault-button:hover {
  background: #c9a532;
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
}
```

---

## 📱 IF YOU NEED DIRECT REPLIT INTEGRATION

If you want the vault **inside** your Replit app (Option 2), here's how:

### For Node.js/Express Replit App:

**1. Add Route in Replit:**

```javascript
// In your main server file (index.js, app.js, etc.)
const express = require('express');
const app = express();

// Serve static vault page
app.get('/vault', (req, res) => {
  res.sendFile(__dirname + '/public/vault-login.html');
});

// Or if you need to render with template engine:
app.get('/vault', (req, res) => {
  res.render('vault-login', {
    siteTitle: 'LNL Vault',
    n8nWebhook: process.env.N8N_WEBHOOK_URL
  });
});
```

**2. Add vault-login.html to your Replit project:**
- Create `/public/vault-login.html`
- Paste the vault login code
- Update webhook URL (or use environment variable)

**3. Update Navigation:**
```html
<!-- In your site's navigation -->
<a href="/vault">Client Vault</a>
```

---

### For Python/Flask Replit App:

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/vault')
def vault():
    return render_template('vault-login.html')
```

---

### For Static HTML Replit Site:

**1. Add vault-login.html to your project:**
- Create `vault.html` in root directory
- Paste vault login code

**2. Link from main site:**
```html
<a href="/vault.html">Client Vault</a>
```

---

## 🔐 WEBHOOK CONFIGURATION IN REPLIT

If hosting vault in Replit, you have two options for webhook URL:

### Option 1: Hardcode in HTML (Simple)
```javascript
// In vault-login.html
const response = await fetch('https://your-n8n.app.n8n.cloud/webhook/lnl-vault-login', {
```

### Option 2: Environment Variable (Better)
```javascript
// In vault-login.html (if using template engine)
const response = await fetch('{{ n8n_webhook_url }}', {
```

**Set in Replit:**
1. Click "Secrets" (🔒) in left sidebar
2. Add key: `N8N_WEBHOOK_URL`
3. Add value: `https://your-n8n.app.n8n.cloud/webhook/lnl-vault-login`

---

## 🎨 SHARED STYLING WITH MAIN SITE

If you want the vault to match your main site design:

### Extract Shared Styles:
```css
/* Create /public/css/lnl-styles.css */
:root {
  --lnl-gold: #d4af37;
  --lnl-dark: #1a1a1a;
  --lnl-gray: #2a2a2a;
}

/* Your main site styles... */
```

### Import in Vault Page:
```html
<!-- In vault-login.html -->
<head>
  <link rel="stylesheet" href="/css/lnl-styles.css">
  <style>
    /* Vault-specific overrides */
  </style>
</head>
```

---

## 📧 EMAIL INTEGRATION

When Concierge sends welcome emails with vault keys, include link to your site:

**Update email template in n8n Concierge workflow:**

```html
<p>Your next step: Initialize your extraction at the secure vault portal.</p>

<a href="https://vault.lnlcreatives.com" class="cta-button">
  ENTER THE VAULT →
</a>

<!-- OR if vault is on main site: -->
<a href="https://lnlgroups.com/vault" class="cta-button">
  ENTER THE VAULT →
</a>
```

---

## 🔄 COMPLETE FLOW

Here's how everything connects:

```
1. Client signs contract
         ↓
2. Concierge Agent (n8n) creates Notion page + generates key
         ↓
3. Email sent: "Your vault key is LNL-RAL-8K4T2"
         ↓
4. Client clicks link in email
         ↓
5. Goes to lnlgroups.com (your Replit site)
         ↓
6. Clicks "Client Vault" button
         ↓
7. Redirected to vault.lnlcreatives.com (OR /vault if in Replit)
         ↓
8. Enters vault key
         ↓
9. JavaScript calls n8n webhook
         ↓
10. n8n validates in Notion → Returns client data
         ↓
11. Vault login shows success
         ↓
12. Redirects to client's Notion workspace
```

---

## 🧪 TESTING CHECKLIST

### Test Navigation Flow:
- [ ] Main site loads correctly
- [ ] "Client Vault" link is visible
- [ ] Click vault link → Goes to vault login page
- [ ] Vault page loads with proper styling
- [ ] Can return to main site (back button or navigation)

### Test Authentication:
- [ ] Enter test vault key
- [ ] Form submits without errors
- [ ] n8n webhook receives request
- [ ] Valid key → Success message + redirect
- [ ] Invalid key → Error message displayed

### Test Cross-Origin (if vault is separate domain):
- [ ] No CORS errors in browser console
- [ ] Redirect works after authentication
- [ ] Can navigate back to main site

---

## 🚨 COMMON ISSUES

### Issue 1: CORS Errors (Separate Domains)

**Problem:** Vault on `vault.lnlcreatives.com` can't call n8n webhook

**Solution:** n8n webhooks allow all origins by default, but verify:
- Check browser console for CORS errors
- Ensure n8n webhook is set to accept requests from any origin
- OR add CORS headers in n8n webhook response

---

### Issue 2: Replit Goes to Sleep

**Problem:** Replit free tier shuts down after inactivity

**Solutions:**
1. **Upgrade to Replit Hacker** ($7/mo) for always-on
2. **Use UptimeRobot** (free) to ping your site every 5 minutes
3. **Deploy vault separately** to Vercel (always-on, free)

---

### Issue 3: Webhook URL in Multiple Places

**Problem:** Need to update webhook URL everywhere when it changes

**Solution:** Use environment variables:
```javascript
// In Replit
const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

// Pass to template
res.render('vault-login', { webhookUrl: WEBHOOK_URL });
```

---

## 📁 FILE STRUCTURE IN REPLIT

### If Adding Vault to Existing Site:

```
your-replit-project/
├── index.html (or index.js)
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── vault-login.html ← ADD THIS
├── views/ (if using template engine)
│   └── vault-login.ejs ← OR THIS
└── README.md
```

---

## ✅ DEPLOYMENT CHECKLIST

### Replit Site Integration:
- [ ] Vault login file added to Replit project
- [ ] Navigation links updated with vault URL
- [ ] Styling matches main site (or intentionally different)
- [ ] Webhook URL configured (hardcoded or env variable)
- [ ] Tested on Replit preview
- [ ] Deployed to production domain

### Separate Vault Deployment:
- [ ] vault-login.html deployed to Vercel/Netlify
- [ ] DNS configured for vault.lnlcreatives.com
- [ ] Webhook URL updated in HTML
- [ ] Main site has links to vault subdomain
- [ ] HTTPS working
- [ ] Full end-to-end test passed

---

## 🎯 RECOMMENDATION

**For production, I recommend:**

1. **Keep vault separate** (vault.lnlcreatives.com on Vercel)
   - Faster, more reliable
   - Easier to maintain
   - Professional appearance

2. **Add prominent links** from Replit sites
   - Navigation bar link
   - Homepage CTA button
   - Footer link

3. **Match design language**
   - Use same gold accent (#d4af37)
   - Similar fonts and spacing
   - Consistent button styles

This gives you the best of both worlds: performant vault + integrated experience.

---

## 🔧 NEED HELP WITH REPLIT CODE?

If you want me to:
1. **Write the exact route code** for your Replit backend
2. **Create navigation templates** that match your site
3. **Build environment variable setup** for webhook URL
4. **Design matching CSS** for the vault

**Just share:**
- Your Replit tech stack (Node.js/Python/Flask/Static HTML?)
- Current navigation structure (or screenshot)
- Whether you want vault in Replit or separate

I'll create the exact integration code you need! 🚀
