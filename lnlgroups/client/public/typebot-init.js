/**
 * Typebot LNL Client Concierge Chat Widget
 * Gated by cookie consent — only loads after user accepts.
 */

window.__lnlLoadTypebot = function() {
  if (window.__lnlTypebotLoaded) return;
  window.__lnlTypebotLoaded = true;

  import('https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js').then(function(mod) {
    var Typebot = mod.default || mod;
    Typebot.initBubble({
      typebot: 'faq-8xjnugp',
      previewMessage: {
        message: 'Hi! How can I help you today?',
        autoShowDelay: 5000
      },
      theme: {
        button: {
          backgroundColor: '#C9A86C',
          iconColor: '#FFFFFF'
        },
        previewMessage: {
          backgroundColor: '#1A1A1B',
          textColor: '#FFFFFF'
        },
        chatWindow: {
          backgroundColor: '#1A1A1B'
        }
      }
    });
  });
};

// Auto-fire only if user already consented in a previous session
(function() {
  try {
    var consent = localStorage.getItem("lnl-cookie-consent");
    if (consent === "accepted") {
      window.__lnlLoadTypebot();
    }
  } catch(e) { /* localStorage unavailable — do nothing */ }
})();
