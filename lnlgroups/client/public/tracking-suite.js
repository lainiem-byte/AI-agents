/**
 * LNL Tracking Suite
 * Loaded as a static asset so Vite cannot strip it during build.
 * Contains: RB2B, LinkedIn Insight Tag, LNL Radar (?ref= webhook).
 * Gated by cookie consent — scripts only fire after user accepts.
 */

function __lnlInitRB2B() {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/961Y0HDQ2ZNG/961Y0HDQ2ZNG.js.gz";
  var first = document.getElementsByTagName("script")[0];
  first.parentNode.insertBefore(s, first);
}

function __lnlInitLinkedIn() {
  if (window._linkedin_partner_id) return;
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

  var img = document.createElement("img");
  img.height = 1; img.width = 1;
  img.style.display = "none";
  img.alt = "";
  img.src = "https://px.ads.linkedin.com/collect/?pid=8835564&fmt=gif";
  document.body.appendChild(img);
}

function __lnlInitRadar() {
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
}

// Exposed globally so the React consent banner can trigger after accept
window.__lnlLoadTracking = function() {
  __lnlInitRB2B();
  __lnlInitLinkedIn();
  __lnlInitRadar();
};

// Auto-fire only if user already consented in a previous session
(function() {
  try {
    var consent = localStorage.getItem("lnl-cookie-consent");
    if (consent === "accepted") {
      window.__lnlLoadTracking();
    }
  } catch(e) { /* localStorage unavailable — do nothing */ }
})();
