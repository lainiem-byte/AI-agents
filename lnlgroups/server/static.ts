import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";

interface SiteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  schema: object;
}

const SITE_META: Record<string, SiteMeta> = {
  "lnlcreatives": {
    title: "LNL Creatives | Cinematic Brand & Content Marketing",
    description: "LNL Creatives extracts your brand's DNA and turns it into stop-the-scroll content, cinematic storytelling, and premium positioning that justifies your prices.",
    ogTitle: "LNL Creatives | Cinematic Brand & Content Marketing",
    ogDescription: "Stop-the-scroll content, cinematic storytelling, and premium brand positioning for founders who want to close the Brand Gap.",
    ogUrl: "https://lnlcreatives.com",
    twitterTitle: "LNL Creatives",
    twitterDescription: "Cinematic brand assets and content systems for premium positioning.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "LNL Creatives",
      "url": "https://lnlcreatives.com",
      "description": "Cinematic brand and content marketing division of LNL Group. We mine your brand DNA into authority assets: pages, flows, scripts, and content systems.",
      "email": "hello@lnlcreatives.com",
      "parentOrganization": { "@type": "Organization", "name": "LNL Group", "url": "https://lnlgroups.com" },
      "serviceType": ["Brand Photography", "Content Marketing", "Social Media Strategy", "Brand Identity"],
      "areaServed": ["Raleigh-Durham NC", "Columbus OH", "Moscow ID"],
      "sameAs": ["https://lnlgroups.com"]
    }
  },
  "lnlautomations": {
    title: "LNL Automations | AI Workflow Automation for Growing Businesses",
    description: "LNL Automations builds AI-powered workflow systems that eliminate your Manual Tax — reclaiming hours, accelerating lead velocity, and giving founders operational freedom.",
    ogTitle: "LNL Automations | AI Workflow Automation",
    ogDescription: "Kill the Manual Tax. LNL Automations designs and deploys n8n AI agents, CRM automations, and invisible associate systems for founders who want operational freedom.",
    ogUrl: "https://lnlautomations.com",
    twitterTitle: "LNL Automations",
    twitterDescription: "AI workflow automation that reclaims your hours and accelerates lead response.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "LNL Automations",
      "url": "https://lnlautomations.com",
      "description": "AI automation and workflow systems division of LNL Group. We design anti-fragile systems to run repetitive ops 24/7 — eliminating the Manual Tax.",
      "email": "hello@lnlautomations.com",
      "parentOrganization": { "@type": "Organization", "name": "LNL Group", "url": "https://lnlgroups.com" },
      "serviceType": ["AI Automation", "n8n Workflow Design", "CRM Integration", "Lead Qualification Systems", "AI Agent Development"],
      "areaServed": "United States",
      "sameAs": ["https://lnlgroups.com"]
    }
  },
  "lnlgroups": {
    title: "LNL Group | Strategic Innovation Studio",
    description: "LNL Group is an infrastructure studio that closes the Brand Gap and kills the Manual Tax for founders who want premium positioning and operational freedom.",
    ogTitle: "LNL Group | Strategic Innovation Studio",
    ogDescription: "The L&L Method: combine brand asset extraction with systems mining so you look premium and operate with automation-driven freedom.",
    ogUrl: "https://lnlgroups.com",
    twitterTitle: "LNL Group",
    twitterDescription: "Premium brand positioning + AI automation systems for growth-focused founders.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LNL Group",
      "url": "https://lnlgroups.com",
      "description": "Infrastructure studio that eliminates the Brand Gap and Manual Tax for founders using the L&L Method — brand asset extraction + systems mining.",
      "email": "hello@lnlgroups.com",
      "subOrganization": [
        { "@type": "Organization", "name": "LNL Creatives", "url": "https://lnlcreatives.com" },
        { "@type": "Organization", "name": "LNL Automations", "url": "https://lnlautomations.com" }
      ],
      "sameAs": []
    }
  }
};

function getSiteMeta(host: string): SiteMeta {
  const h = (host || "").toLowerCase().split(":")[0];
  for (const key of Object.keys(SITE_META)) {
    if (h.includes(key)) return SITE_META[key];
  }
  return SITE_META["lnlgroups"];
}

function injectMeta(html: string, meta: SiteMeta): string {
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(meta.schema)}</script>`;
  const metaBlock = `<title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.ogTitle}" />
    <meta property="og:description" content="${meta.ogDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${meta.ogUrl}" />
    <meta property="og:image" content="${meta.ogUrl}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.twitterTitle}" />
    <meta name="twitter:description" content="${meta.twitterDescription}" />
    <meta name="twitter:image" content="${meta.ogUrl}/og-image.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    ${schemaTag}`;

  return html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/g, "")
    .replace(/<meta property="og:[^"]*"[^>]*>/g, "")
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, "")
    .replace(/<meta property="twitter:[^"]*"[^>]*>/g, "")
    .replace(/<meta name="twitter:site"[^>]*>/g, "")
    .replace(/<link rel="icon"[^>]*>/g, "")
    .replace("</head>", `  ${metaBlock}\n  </head>`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets but NOT index.html automatically — we inject domain meta ourselves
  app.use(express.static(distPath, { index: false }));

  // All HTML routes: inject domain-specific meta + schema for SEO
  app.use("*", (req: Request, res: Response) => {
    const indexPath = path.resolve(distPath, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");
    const host = req.headers.host || "";
    const meta = getSiteMeta(host);
    const injected = injectMeta(html, meta);
    res.setHeader("Content-Type", "text/html");
    res.send(injected);
  });
}
