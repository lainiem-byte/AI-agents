/**
 * LNL Tracking Suite
 * Loaded as a static asset so Vite cannot strip it during build.
 * Contains: RB2B, LinkedIn Insight Tag, LNL Radar (?ref= webhook).
 */

// --- 1. RB2B: Visitor Identity Resolution ---
(function(key) {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
  var first = document.getElementsByTagName("script")[0];
  first.parentNode.insertBefore(s, first);
})("961Y0HDQ2ZNG");

// --- 2. LinkedIn Insight Tag: Company-Level Tracking ---
(function() {
  window._linkedin_partner_id = "8835564";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

  if (!window.lintrk) {
    window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
  }
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);

  // noscript pixel fallback
  var img = document.createElement("img");
  img.height = 1; img.width = 1;
  img.style.display = "none";
  img.alt = "";
  img.src = "https://px.ads.linkedin.com/collect/?pid=8835564&fmt=gif";
  document.body.appendChild(img);
})();

// --- 3. LNL Radar: Custom Outreach Tracking (?ref= → n8n webhook) ---
window.addEventListener("DOMContentLoaded", function() {
  var urlParams = new URLSearchParams(window.location.search);
  var leadRef = urlParams.get("ref");
  if (leadRef) {
    console.log("LNL Radar: Initializing ping for " + leadRef);
    fetch("https://n8n.srv1244684.hstgr.cloud/webhook/lnl-radar-ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "RADAR_PING",
        lead_identity: leadRef,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    }).catch(function(err) { console.error("Radar Logic Leak:", err); });
  }
});
