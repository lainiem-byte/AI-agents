import { useEffect } from "react";
import { Link } from "wouter";
import logoIcon from "@/assets/logo-icon.png";
import AuditForm from "@/components/audit/AuditForm";

export default function Audit() {
  const searchString = window.location.search;
  const params = new URLSearchParams(searchString);
  const industry = params.get("industry") || undefined;

  useEffect(() => {
    const bubble = document.querySelector("typebot-bubble") as HTMLElement;
    if (bubble) bubble.style.display = "none";
    return () => {
      if (bubble) bubble.style.display = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">
      {/* Header */}
      <header className="bg-[#1A1A1D]/95 backdrop-blur-xl border-b border-[#C9A86C]/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoIcon} alt="LNL Group" className="h-10 md:h-12 w-auto" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              LNL Group
            </span>
          </Link>
        </div>
      </header>

      {/* Audit Form */}
      <main className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            <span className="text-[#D4AF37]">30-Minute</span> Efficiency Audit
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Answer a few strategic questions so our architects can prepare a
            custom growth roadmap before your call.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-10">
          <AuditForm initialIndustry={industry} />
        </div>
      </main>
    </div>
  );
}
