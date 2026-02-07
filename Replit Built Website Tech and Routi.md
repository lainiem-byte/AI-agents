Replit Built Website Tech and Routing Structure

i have some question foir hostinger

Here are all the answers Hostinger needs:

Technical Stack
Runtime: Node.js v20
Framework: Express.js (backend) + React 18 (frontend)
Build Tool: Vite
ORM: Drizzle (for PostgreSQL)
Language: TypeScript
Run Commands
# Install dependencies
npm install
# Set up database tables
npm run db:push
# Build for production
npm run build
# Start production server
npm run start
The start command runs: NODE_ENV=production node dist/index.js

How Many Apps/ZIP Files?
ONE app, ONE ZIP file - This is a single unified codebase that serves all three domains.

Your GitHub repo already has everything: github.com/lanliem-byte/lnlgroups

Domain Routing Explanation
The app runs on one port (5000) and uses client-side routing to show different content based on the URL path:

Domain	Route	What Shows
lnlgroups.com	/	LNL Group homepage
lnlcreatives.com	/creatives	LNL Creatives content
lnlautomations.com	/automations	LNL Automations content
The app does NOT check the hostname. It uses URL paths (/, /creatives, /automations).

Nginx Configuration for Hostinger
# All three domains point to the same app
server {
    listen 80;
    server_name lnlgroups.com www.lnlgroups.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
server {
    listen 80;
    server_name lnlcreatives.com www.lnlcreatives.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000/creatives;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
server {
    listen 80;
    server_name lnlautomations.com www.lnlautomations.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000/automations;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
Environment Variables Needed
Create a .env file with:

DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=any-random-secure-string
N8N_WEBHOOK_URL=optional-for-form-submissions
Summary for Hostinger
1 app, 1 folder, 1 port
Clone from GitHub or upload 1 ZIP
Run with npm install && npm run db:push && npm run build && npm run start
Use pm2 to keep it running: pm2 start dist/index.js --name lnlgroups
Nginx routes all 3 domains to port 5000




There's only 1 ZIP file needed, not 3.

Your LNL website is one unified project that serves all three divisions (Group, Creatives, Automations) from the same codebase. It's not 3 separate websites.

To get the ZIP:

Go to your GitHub repo: github.com/lanliem-byte/lnlgroups
Click the green "Code" button
Click "Download ZIP"
That one ZIP contains everything for all three domains.

Tell Hostinger: "It's a single Node.js application that serves different content based on URL routes. One app, one port, three domains pointing to it."


0

