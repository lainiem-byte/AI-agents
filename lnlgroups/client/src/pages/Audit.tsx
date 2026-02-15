import { useEffect } from "react";
import { Link } from "wouter";
import logoIcon from "@/assets/logo-icon.png";

export default function Audit() {
  useEffect(() => {
    // Hide the global bubble chat on the audit page
    const bubble = document.querySelector("typebot-bubble") as HTMLElement;
    if (bubble) bubble.style.display = "none";

    return () => {
      if (bubble) bubble.style.display = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">
      {/* Header matching main site */}
      <header className="bg-[#1A1A1D]/95 backdrop-blur-xl border-b border-[#C9A86C]/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoIcon} alt="LNL Group" className="h-10 md:h-12 w-auto" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">LNL Group</span>
          </Link>
        </div>
      </header>

      {/* Typebot iframe embed */}
      <main style={{ height: "calc(100vh - 80px)" }}>
        <iframe
          src="https://typebot.io/faq-8xjnugp"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            backgroundColor: "#0D0D0F",
          }}
          allow="microphone"
        />
      </main>
    </div>
  );
}
