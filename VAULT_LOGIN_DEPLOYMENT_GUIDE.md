# LNL Vault Login - Deployment Guide

## Overview
This guide will help you deploy the vault login page (vault.lnlgroup.com) that authenticates clients and redirects them to their Notion workspace.

---

## 🌐 DEPLOYMENT OPTIONS

You have 3 main options for hosting the vault login page:

### Option 1: Vercel (Recommended - Easiest)
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Global CDN
- ⏱️ Setup time: 5 minutes

### Option 2: Netlify
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Easy drag-and-drop deployment
- ⏱️ Setup time: 5 minutes

### Option 3: Replit
- ✅ Free hosting (with limitations)
- ✅ Live code editing
- ✅ Good for testing
- ⚠️ May have downtime on free tier
- ⏱️ Setup time: 10 minutes

**Recommendation:** Use **Vercel** for production. It's the most reliable and easiest to set up.

---

## 🚀 DEPLOYMENT METHOD 1: VERCEL (RECOMMENDED)

### Step 1: Prepare Your File

1. **Download** `vault-login.html` (the file in this package)
2. **Update the webhook URL** inside the file:
   - Open `vault-login.html` in a text editor
   - Find line ~280: `const response = await fetch('https://YOUR-N8N-INSTANCE...'`
   - Replace with your actual n8n webhook URL (we'll get this after n8n setup)

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub, GitLab, or Email

### Step 3: Deploy via Vercel Dashboard

**Method A: Manual Upload (Fastest)**

1. Click **"Add New..."** → **"Project"**
2. Scroll down to **"Deploy from a template or existing repository"**
3. Instead, click **"Import from Git"** and then click **"Deploy without Git"**
4. OR simply drag your `vault-login.html` file to the upload area
5. Vercel will detect it's a static HTML file
6. Click **"Deploy"**

**Method B: GitHub (Better for Updates)**

1. Create a new GitHub repository
2. Upload `vault-login.html` (rename to `index.html`)
3. In Vercel, click **"Add New..."** → **"Project"**
4. Click **"Import"** next to your repository
5. Click **"Deploy"**

### Step 4: Configure Custom Domain

1. In Vercel project settings, go to **"Domains"**
2. Click **"Add"**
3. Enter your domain: `vault.lnlgroup.com`
4. Vercel will provide DNS records to add
5. Add these records in your domain registrar (GoDaddy, Namecheap, etc.):

**DNS Records to Add:**

```
Type: CNAME
Name: vault
Value: cname.vercel-dns.com
```

OR

```
Type: A
Name: vault
Value: 76.76.19.19
```

6. Wait for DNS propagation (5-60 minutes)
7. Verify at `https://vault.lnlgroup.com`

### Step 5: Update n8n Webhook URL

Once deployed:

1. **Get your n8n webhook URL:**
   - In n8n, open the Concierge Agent workflow
   - Click the **"Webhook: Vault Login Attempt"** node
   - Copy the **Production URL** (looks like: `https://your-n8n.app.n8n.cloud/webhook/lnl-vault-login`)

2. **Update vault-login.html:**
   - Re-open `vault-login.html`
   - Replace `https://YOUR-N8N-INSTANCE.app.n8n.cloud/webhook/lnl-vault-login`
   - With your actual webhook URL
   - Save and re-deploy to Vercel

---

## 🌍 DEPLOYMENT METHOD 2: NETLIFY

### Step 1: Prepare Your File

1. **Rename** `vault-login.html` to `index.html`
2. **Update webhook URL** (same as Vercel instructions above)

### Step 2: Deploy via Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **"Sign up"** (GitHub recommended)
3. Click **"Add new site"** → **"Deploy manually"**
4. **Drag and drop** your `index.html` file
5. Netlify will deploy and give you a URL like `random-name-123.netlify.app`

### Step 3: Configure Custom Domain

1. In Netlify site settings, go to **"Domain management"**
2. Click **"Add custom domain"**
3. Enter `vault.lnlgroup.com`
4. Netlify will provide DNS records
5. Add to your domain registrar:

```
Type: CNAME
Name: vault
Value: [your-site].netlify.app
```

6. Wait for DNS propagation
7. Netlify will automatically provision SSL certificate

---

## 💻 DEPLOYMENT METHOD 3: REPLIT (FOR TESTING)

### Step 1: Create Replit Account

1. Go to [replit.com](https://replit.com)
2. Sign up (free account works)

### Step 2: Create New Repl

1. Click **"+ Create Repl"**
2. Select template: **"HTML, CSS, JS"**
3. Name it: `lnl-vault-login`
4. Click **"Create Repl"**

### Step 3: Add Your Code

1. **Delete** the default `index.html` content
2. **Paste** your `vault-login.html` code into `index.html`
3. **Update webhook URL** with your n8n webhook
4. Click **"Run"** at the top

### Step 4: Get Your URL

1. Replit will show a preview
2. Click **"Open in new tab"** icon
3. Your URL will be: `https://lnl-vault-login.YOUR-USERNAME.repl.co`

### Step 5: Keep it Running (Optional)

**Free Limitation:** Replit free tier may shut down after inactivity.

**Solutions:**
- Upgrade to Replit Hacker plan ($7/mo) for always-on hosting
- Use a service like [UptimeRobot](https://uptimerobot.com) to ping it every 5 minutes
- OR use Vercel/Netlify instead (recommended)

---

## 🔧 CONFIGURATION CHECKLIST

Before your vault is live, verify:

### ✅ Pre-Deployment

- [ ] Downloaded `vault-login.html`
- [ ] Updated webhook URL in the file
- [ ] Tested locally (open file in browser)
- [ ] Form auto-formats key correctly (try typing: LNLRAL12345)

### ✅ Post-Deployment

- [ ] Site is accessible at `vault.lnlgroup.com` (or your chosen domain)
- [ ] HTTPS is working (green padlock in browser)
- [ ] Form submits without errors
- [ ] Test with valid vault key (from Notion database)
- [ ] Successful login redirects to Notion page
- [ ] Invalid key shows error message

---

## 🧪 TESTING THE VAULT LOGIN

### Test 1: Valid Key

1. **Create a test client** in Notion:
   - Client Name: Test Client
   - Vault Key: LNL-RAL-TEST1
   - Key Status: Active
   - Project Status: Contract Signed

2. **Go to** your vault login page
3. **Enter:** LNL-RAL-TEST1
4. **Click** "Initialize Vault"
5. **Expected:** Success message → Redirects to Notion page

### Test 2: Invalid Key

1. **Enter:** LNL-XXX-WRONG
2. **Click** "Initialize Vault"
3. **Expected:** Red error message "Invalid or expired vault key"

### Test 3: Malformed Key

1. **Enter:** INVALID
2. **Expected:** Red error message "Invalid key format"

### Test 4: Auto-Formatting

1. **Type:** lnlral12345 (lowercase, no dashes)
2. **Expected:** Auto-formats to LNL-RAL-12345

---

## 🔐 SECURITY CONSIDERATIONS

### HTTPS is Required

- ✅ Vercel: HTTPS automatic
- ✅ Netlify: HTTPS automatic
- ✅ Replit: HTTPS enabled by default
- ❌ Never use HTTP for production

### Webhook Protection

Your n8n webhook is public but protected by:
1. **Key validation** - Only valid keys in Notion database work
2. **Rate limiting** - n8n can limit requests per IP
3. **Status checking** - Only "Active" keys grant access

### Additional Security (Optional)

Add these to n8n webhook:
- IP whitelist (only allow from your vault domain)
- Request signature verification
- CAPTCHA integration (to prevent bots)

---

## 🎨 CUSTOMIZATION OPTIONS

### Change Colors

Open `vault-login.html` and modify CSS:

```css
/* Gold accent color */
--primary: #d4af37;  /* Change to your brand color */

/* Dark background */
--bg-dark: #1a1a1a;  /* Change to your background color */
```

### Update Logo/Branding

Find this section in HTML:

```html
<div class="logo">THE LNL GROUP</div>
<div class="tagline">Logic + Luxury</div>
```

Replace with your branding.

### Change Success Redirect Behavior

Find this JavaScript:

```javascript
setTimeout(() => {
  if (data.notion_url) {
    window.location.href = data.notion_url;
  }
}, 2000);
```

Change `2000` (milliseconds) to adjust delay before redirect.

---

## 🚨 TROUBLESHOOTING

### Problem: "Unable to connect to vault server"

**Causes:**
- n8n webhook URL is wrong
- n8n workflow is not active
- Network/CORS issue

**Solution:**
1. Verify webhook URL in `vault-login.html`
2. Check n8n workflow is activated
3. Test webhook directly with Postman/curl

---

### Problem: "Invalid or expired vault key" for valid key

**Causes:**
- Key doesn't exist in Notion database
- Key Status is not "Active"
- Notion integration not properly shared

**Solution:**
1. Check Notion database has the key
2. Verify Key Status = "Active"
3. Confirm database is shared with "LNL Concierge" integration

---

### Problem: Success but no redirect to Notion

**Causes:**
- n8n not returning `notion_url` in response
- Notion page URL not set in database

**Solution:**
1. Check n8n workflow returns `notion_url` in response
2. Verify Notion pages have URLs
3. Check browser console for JavaScript errors

---

### Problem: Custom domain not working

**Causes:**
- DNS records not added correctly
- DNS propagation delay
- SSL certificate not provisioned

**Solution:**
1. Verify DNS records with [DNS Checker](https://dnschecker.org)
2. Wait 24-48 hours for full propagation
3. Check SSL status in Vercel/Netlify dashboard

---

## 📊 MONITORING & ANALYTICS

### Add Google Analytics (Optional)

Add before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

### Monitor Login Attempts

Check in Notion database:
- **Last Login** column shows last access time
- **Total Logins** column tracks access count

Check in n8n:
- Go to **Executions** tab
- Filter by "Webhook: Vault Login Attempt"
- See all authentication attempts

---

## 🔄 UPDATING THE VAULT PAGE

### Via Vercel (Git-based)

1. Update `vault-login.html` in your GitHub repo
2. Commit and push changes
3. Vercel auto-deploys (usually < 1 minute)

### Via Netlify (Manual)

1. Update `index.html` locally
2. Go to Netlify dashboard
3. Drag and drop updated file to **"Deploys"** tab
4. New version live in seconds

### Via Replit

1. Edit `index.html` in Replit editor
2. Changes are live immediately (if Repl is running)

---

## ✅ DEPLOYMENT COMPLETE CHECKLIST

- [ ] Vault login page deployed to production URL
- [ ] Custom domain configured and working
- [ ] HTTPS enabled (green padlock)
- [ ] n8n webhook URL updated in HTML
- [ ] Tested with valid vault key → Success
- [ ] Tested with invalid key → Error message
- [ ] Redirects to Notion page after successful login
- [ ] Mobile responsive (test on phone)
- [ ] Analytics added (optional)
- [ ] DNS propagation complete (no downtime)

---

## 🎯 FINAL INTEGRATION TEST

**End-to-End Test:**

1. ✅ **Contract signed** (manual/test trigger)
2. ✅ **Concierge creates Notion page** with vault key
3. ✅ **Welcome email sent** with vault key
4. ✅ **Client visits** vault.lnlgroup.com
5. ✅ **Client enters key** from email
6. ✅ **Authentication succeeds** (n8n validates)
7. ✅ **Login tracked** in Notion (Last Login, Total Logins)
8. ✅ **Redirects to client's Notion page**
9. ✅ **Client sees** their personalized vault workspace

**If all steps work → Your vault is production-ready! 🎉**

---

## 📚 ADDITIONAL RESOURCES

### DNS Troubleshooting
- [DNS Checker](https://dnschecker.org) - Check DNS propagation
- [What's My DNS](https://www.whatsmydns.net) - Global DNS lookup

### Testing Tools
- [Webhook.site](https://webhook.site) - Test webhook responses
- [Postman](https://www.postman.com) - API testing
- [Browser DevTools](chrome://inspect) - Debug JavaScript

### Platform Docs
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Replit Docs](https://docs.replit.com)

---

## 🎉 YOU'RE LIVE!

Your LNL Vault login portal is now deployed and ready to authenticate clients!

**What Happens Now:**

1. **Clients receive** vault key via email (from Concierge Agent)
2. **Clients visit** vault.lnlgroup.com
3. **System validates** key against Notion database
4. **Grants access** to personalized Notion workspace
5. **Tracks activity** (logins, asset uploads, project status)

Welcome to automated client onboarding! 🏛️
