# LNL GROUP VPS SETUP - ISSUES LOG
## Project: Website Migration + Agent Integration
## Server: srv1244684.hstgr.cloud (72.62.170.65)
## Last Updated: 2026-01-31 23:58 PST

---

## ⚠️ RESUME POINT - READ THIS FIRST ⚠️

### LAST COMPLETED ACTION:
**Verified webhook URL is correct in /var/www/vault/index.html on VPS**
- Command used: `grep "fetch" /var/www/vault/index.html`
- Result confirmed: `const response = await fetch('https://n8n.srv1244684.hstgr.cloud/webhook/vault-auth', {`

### NEXT ACTION TO DO:
**Add vault service to docker-compose.yml and deploy**

```bash
# Step 1: Find docker-compose.yml
cat /docker/n8n/docker-compose.yml

# Step 2: Add this service block to the services section:
#   vault:
#     image: nginx:alpine
#     container_name: vault-static
#     restart: unless-stopped
#     volumes:
#       - /var/www/vault:/usr/share/nginx/html:ro
#     labels:
#       - "traefik.enable=true"
#       - "traefik.http.routers.vault.rule=Host(`vault.lnlcreatives.com`)"
#       - "traefik.http.routers.vault.entrypoints=web,websecure"
#       - "traefik.http.routers.vault.tls=true"
#       - "traefik.http.routers.vault.tls.certresolver=mytlschallenge"
#     networks:
#       - traefik-proxy

# Step 3: Deploy
cd /docker/n8n && docker compose up -d

# Step 4: Verify
docker ps | grep vault
curl -I https://vault.lnlcreatives.com
```

---

## ISSUE #001: Port Conflict - Traefik vs Nginx
**Status:** RESOLVED
**Severity:** Critical
**Date Identified:** 2026-01-31

**Problem:**
Kodee's initial instructions used Nginx for vault.lnlcreatives.com, but VPS has Docker-based n8n with Traefik already listening on ports 80/443. Installing Nginx would create port binding conflict.

**Evidence:**
- `netstat -tlnp | grep -E "80|443"` showed docker-proxy (Traefik) on both ports
- `which nginx` returned nothing - Nginx not installed
- Traefik container: n8n-traefik-1 (Up 6 days)

**Resolution:**
Kodee confirmed: Use Traefik approach (Option 1). Add vault as Docker service with Traefik labels instead of Nginx server blocks.

**Action Required:** Add vault service to docker-compose.yml with Traefik routing labels.

---

## ISSUE #002: Vault Service Not Yet Deployed
**Status:** IN PROGRESS (Partial Complete)
**Severity:** High
**Date Identified:** 2026-01-31

**Problem:**
vault.lnlcreatives.com is not serving the login page. The vault-login.html exists in project but needs to be deployed to VPS.

**COMPLETED STEPS:**
1. ✅ /var/www/vault directory created (`mkdir -p /var/www/vault`)
2. ✅ vault-login.html downloaded from GitHub to /var/www/vault/index.html
3. ✅ Webhook URL updated via sed from placeholder to: `https://n8n.srv1244684.hstgr.cloud/webhook/vault-auth`
4. ✅ Verified fetch URL is correct in file (grep confirmed)

**REMAINING STEPS:**
5. ⏳ Add vault service to docker-compose.yml
6. ⏳ Run `docker compose up -d` to deploy
7. ⏳ Test https://vault.lnlcreatives.com

**Blockers:**
- Need to find exact docker-compose.yml location and verify network name

**Acceptance Criteria:**
- https://vault.lnlcreatives.com loads login form
- SSL certificate valid (via Traefik/Let's Encrypt)
- Form submits to n8n webhook

---

## ISSUE #003: Docker-Compose Configuration Needed
**Status:** OPEN
**Severity:** High
**Date Identified:** 2026-01-31

**Problem:**
Need to add vault service to existing docker-compose.yml. Must use correct network name and Traefik labels.

**Known Configuration (from Kodee):**
```yaml
  vault:
    image: nginx:alpine
    container_name: vault-static
    restart: unless-stopped
    volumes:
      - /var/www/vault:/usr/share/nginx/html:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.vault.rule=Host(`vault.lnlcreatives.com`)"
      - "traefik.http.routers.vault.entrypoints=web,websecure"
      - "traefik.http.routers.vault.tls=true"
      - "traefik.http.routers.vault.tls.certresolver=mytlschallenge"
    networks:
      - traefik-proxy
```

**Unknowns to Verify:**
- [ ] Exact location of docker-compose.yml (/docker/n8n/ or /opt/n8n/?)
- [ ] Actual network name in existing compose (traefik-proxy assumed)
- [ ] Any other services that need to be preserved

**Next Action:** Cat the docker-compose.yml to verify structure before editing

---

## ISSUE #004: n8n Workflow Switch Node Errors
**Status:** OPEN
**Severity:** Medium
**Date Identified:** 2026-01-31 (earlier session)

**Problem:**
Cold Outreach and Concierge workflows have Switch node configuration issues preventing proper import/function.

**Affected Workflows:**
- n8n-cold-outreach-workflow.json
- n8n-concierge-agent-workflow.json

**Working Workflow:**
- n8n-lead-generation-workflow.json ✅ (imported successfully)

**Next Action:** Review Switch node configurations after vault setup complete

---

## ISSUE #005: Main Domain Routing Not Configured
**Status:** OPEN - PENDING
**Severity:** Medium
**Date Identified:** 2026-01-31

**Problem:**
The three main domains need routing to the website application:
- lnlgroups.com → /
- lnlcreatives.com → /creatives
- lnlautomations.com → /automations

**DNS Status:** All A records point to 72.62.170.65 ✅

**Blocker:** Need to determine if website app is deployed and running on VPS, and what port it uses (expected: 5000)

**Note:** This may need Traefik configuration similar to vault, OR the app might already be handled. Needs investigation.

---

## ISSUE #006: SSL Certificates for Main Domains
**Status:** OPEN - PENDING
**Severity:** Medium
**Date Identified:** 2026-01-31

**Problem:**
SSL certificates needed for:
- lnlgroups.com + www
- lnlcreatives.com + www
- lnlautomations.com + www

**Note:** vault.lnlcreatives.com will get SSL automatically via Traefik certresolver when vault service is deployed.

**Dependency:** Requires Issue #005 to be resolved first

---

## ISSUE #007: n8n Credentials Configuration
**Status:** OPEN - PENDING
**Severity:** Medium
**Date Identified:** 2026-01-31 (earlier session)

**Problem:**
Workflows need API credentials configured:
- [ ] Google Sheets API
- [ ] HubSpot API
- [ ] SMTP (for email sending)

**Skipped (user doesn't have):**
- Yelp API
- Hunter API
- Apollo API

**Dependency:** Workflows should be fully imported first

---

## REFERENCE INFORMATION

### Server Access
- SSH: `ssh root@72.62.170.65`
- n8n UI: https://n8n.srv1244684.hstgr.cloud
- n8n Login: lainiem@lnlcreatives.com

### Docker Containers Running
| Container | Image | Status | Ports |
|-----------|-------|--------|-------|
| n8n-n8n-1 | docker.n8n.io/n8nio/n8n:latest | Up | 5678 |
| n8n-n8n-worker-1 | n8nio/n8n | Up 6 days | 5678 |
| n8n-postgres | postgres:15 | Up 6 days | 5432 |
| redis | redis:6 | Up 6 days | 6379 |
| n8n-traefik-1 | traefik | Up 6 days | 80, 443 |

### Key File Locations
| File | Location |
|------|----------|
| vault-login.html (source) | /mnt/project/vault-login.html |
| vault-login.html (target) | /var/www/vault/index.html |
| docker-compose.yml | /docker/n8n/ or /opt/n8n/ (verify) |
| n8n workflows | /opt/n8n/workflows/ |

### Traefik Configuration
- Certresolver: `mytlschallenge`
- Entrypoints: `web`, `websecure`
- Network: `traefik-proxy` (verify)

### Vault Authentication Flow
1. User → https://vault.lnlcreatives.com (login form)
2. Form POST → https://n8n.srv1244684.hstgr.cloud/webhook/vault-auth
3. n8n validates Client ID + Access Key (format: LNL-XXX-XXXXX)
4. Valid → Redirect to Notion | Invalid → Error message

---

## CHANGE LOG
| Date | Issue | Action | By |
|------|-------|--------|-----|
| 2026-01-31 | #001 | Identified Traefik/Nginx conflict | Claude |
| 2026-01-31 | #001 | Resolved - use Traefik approach per Kodee | Claude |
| 2026-01-31 | #002 | Created - vault deployment needed | Claude |
| 2026-01-31 | #003 | Created - docker-compose config needed | Claude |
| 2026-01-31 23:48 | #002 | Created /var/www/vault directory | Claude |
| 2026-01-31 23:49 | #002 | Downloaded vault-login.html from GitHub | Claude |
| 2026-01-31 23:51 | #002 | Updated webhook URL via sed to n8n.srv1244684.hstgr.cloud | Claude |
| 2026-01-31 23:52 | #002 | Verified webhook URL correct via grep | Claude |

---

## NEXT STEPS (Session Checkpoint)
**Session End:** 2026-01-31 ~23:55 PST
**Terminal Status:** Was connected to VPS root@srv1244684 via Hostinger web terminal

**Resume Point for Next Session:**
1. ✅ Vault HTML file is ready at /var/www/vault/index.html with correct webhook URL
2. ⏳ Find docker-compose.yml location: `find /opt /docker -name "docker-compose.yml"`
3. ⏳ Cat the file to see current structure and verify network name
4. ⏳ Add vault service config (see Issue #003 for yaml snippet)
5. ⏳ Run `cd /docker/n8n && docker compose up -d` (or wherever compose file is)
6. ⏳ Test https://vault.lnlcreatives.com

**Quick Start Commands for Next Session:**
```bash
# 1. Find and view docker-compose.yml
find /opt /docker -name "docker-compose.yml" 2>/dev/null
cat /docker/n8n/docker-compose.yml  # adjust path as needed

# 2. Backup before editing
cp docker-compose.yml docker-compose.yml.bak

# 3. After adding vault service, deploy
docker compose up -d

# 4. Check vault container running
docker ps | grep vault

# 5. Test SSL certificate
curl -I https://vault.lnlcreatives.com
```
