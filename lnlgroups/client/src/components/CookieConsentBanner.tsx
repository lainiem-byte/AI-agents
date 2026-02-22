import { useState, useEffect } from "react";

const CONSENT_KEY = "lnl-cookie-consent";

declare global {
  interface Window {
    __lnlLoadTracking?: () => void;
    __lnlLoadTypebot?: () => void;
  }
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable — show banner anyway
      setVisible(true);
    }
  }, []);

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch {}
    window.__lnlLoadTracking?.();
    window.__lnlLoadTypebot?.();
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, "declined"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-lg rounded-xl border border-lnl-gold/20 bg-lnl-dark/90 backdrop-blur-xl shadow-2xl px-6 py-5">
        <p className="text-sm leading-relaxed text-lnl-pearl/90 mb-4">
          <span className="font-semibold text-lnl-gold">Architecting Your Experience.</span>{" "}
          We use cookies to optimize the logic of your journey and ensure your
          digital experience matches our standards.{" "}
          <a href="/privacy" className="underline underline-offset-2 text-lnl-gold/80 hover:text-lnl-gold transition-colors">
            Privacy&nbsp;Policy
          </a>
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="flex-1 rounded-lg bg-lnl-gold px-4 py-2.5 text-sm font-semibold text-lnl-dark transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Optimize &amp; Enter
          </button>
          <button
            onClick={decline}
            className="flex-1 rounded-lg border border-lnl-pearl/20 px-4 py-2.5 text-sm font-medium text-lnl-pearl/70 transition-all hover:border-lnl-pearl/40 hover:text-lnl-pearl active:scale-[0.98]"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
