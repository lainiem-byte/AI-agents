import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ShieldCheck, Upload, CheckCircle2, ExternalLink, Lock,
  Image, Video, BarChart3, FileText, Monitor, Users, Scale, Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

type VaultIndustry = "medspa" | "realtor" | "law" | "home-services";

interface VaultSession {
  clientName: string;
  industry: VaultIndustry;
  notionUrl: string;
  authenticatedAt: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const creativeChecklist: ChecklistItem[] = [
  {
    id: "brand-kit",
    label: "Brand Style Guide",
    description: "Logos, color hex codes, and font preferences for visual alignment audit.",
    icon: Image,
  },
  {
    id: "ad-assets",
    label: "Current Ad Assets",
    description: "Images or videos from running Meta/Google ads for scroll-stop audit.",
    icon: Video,
  },
  {
    id: "raw-content",
    label: "Raw Content Samples",
    description: "2\u20133 unedited videos or behind-the-scenes clips for cinematic mockup.",
    icon: Video,
  },
  {
    id: "analytics",
    label: "Platform Analytics",
    description: "Instagram/Facebook reach and engagement screenshots from the last 30 days.",
    icon: BarChart3,
  },
];

const automationsChecklist: ChecklistItem[] = [
  {
    id: "tech-stack",
    label: "Tech Stack Inventory",
    description: "List or screenshots of every software subscription (CRM, Booking, Billing).",
    icon: Monitor,
  },
  {
    id: "workflows",
    label: "Workflow Screenshots",
    description: "Screen grab of your current lead intake process or dispatch board.",
    icon: Users,
  },
  {
    id: "lead-data",
    label: "Sample Lead Data",
    description: "Export of last 10\u201320 leads (CSV/PDF) for speed-to-lead gap analysis.",
    icon: FileText,
  },
  {
    id: "contracts",
    label: "Standard Contracts / Invoices",
    description: "Blank sample of service agreement for document-automation review.",
    icon: Scale,
  },
];

const industryLabels: Record<VaultIndustry, string> = {
  medspa: "Med Spa",
  realtor: "Real Estate",
  law: "Law",
  "home-services": "Home Services",
};

const industryPillar: Record<VaultIndustry, "creative" | "automations"> = {
  medspa: "creative",
  realtor: "creative",
  law: "automations",
  "home-services": "automations",
};

function getChecklist(industry: VaultIndustry): ChecklistItem[] {
  return industryPillar[industry] === "creative" ? creativeChecklist : automationsChecklist;
}

export default function Vault() {
  const [session, setSession] = useState<VaultSession | null>(null);
  const [uploaded, setUploaded] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();

  useEffect(() => {
    const raw = sessionStorage.getItem("vault_session");
    if (!raw) {
      setLocation("/");
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      setLocation("/");
    }
  }, [setLocation]);

  useEffect(() => {
    const bubble = document.querySelector("typebot-bubble") as HTMLElement;
    if (bubble) bubble.style.display = "none";
    return () => {
      if (bubble) bubble.style.display = "";
    };
  }, []);

  if (!session) return null;

  const checklist = getChecklist(session.industry);
  const pillar = industryPillar[session.industry];
  const pillarLabel = pillar === "creative" ? "LNL Creative" : "LNL Automations";
  const pillarIcon = pillar === "creative" ? Image : Wrench;
  const PillarIcon = pillarIcon;

  const handleUploadClick = (itemId: string) => {
    // Placeholder — will be wired to real file upload (LNL-hub-c9g)
    setUploaded((prev) => new Set(prev).add(itemId));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vault_session");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">
      {/* Header */}
      <header className="bg-[#1A1A1D]/95 backdrop-blur-xl border-b border-[#C9A86C]/10 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoIcon} alt="LNL Group" className="h-10 md:h-12 w-auto" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              LNL Group
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#C9A86C]" />
              <span className="hidden sm:inline">Vault Active</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Exit Vault
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 border border-[#C9A86C]/20 mb-6">
            <PillarIcon className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-[#C9A86C] font-medium tracking-wide uppercase">
              {pillarLabel} &middot; {industryLabels[session.industry]}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome, <span className="text-[#D4AF37]">{session.clientName}</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Upload your assets below so our architects can prepare your custom audit.
            Each item helps us identify system leakage and creative opportunities.
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-4 mb-10">
          <h2 className="text-lg font-semibold tracking-wide text-gray-300 uppercase flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C9A86C]" />
            Your Audit Checklist
          </h2>

          {checklist.map((item) => {
            const isUploaded = uploaded.has(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-5 transition-all ${
                  isUploaded
                    ? "bg-[#C9A86C]/5 border-[#C9A86C]/30"
                    : "bg-[#1A1A1D] border-white/10 hover:border-[#C9A86C]/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isUploaded ? "bg-[#C9A86C]/20" : "bg-white/5"
                  }`}>
                    {isUploaded ? (
                      <CheckCircle2 className="w-5 h-5 text-[#C9A86C]" />
                    ) : (
                      <Icon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>

                  <Button
                    onClick={() => handleUploadClick(item.id)}
                    disabled={isUploaded}
                    variant={isUploaded ? "outline" : "default"}
                    className={`shrink-0 ${
                      isUploaded
                        ? "border-[#C9A86C]/30 text-[#C9A86C] hover:bg-transparent cursor-default"
                        : "bg-[#C9A86C] hover:bg-[#C9A86C]/90 text-black font-semibold"
                    }`}
                  >
                    {isUploaded ? (
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Uploaded
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Upload className="w-4 h-4" /> Upload
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notion Vault Link */}
        {session.notionUrl && (
          <div className="rounded-xl border border-white/10 bg-[#1A1A1D] p-5 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white mb-1">Your Notion Vault</h3>
                <p className="text-sm text-gray-400">
                  View your uploaded assets and audit progress in Notion.
                </p>
              </div>
              <a
                href={session.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Open Vault <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Vault Guard Notice */}
        <div className="rounded-xl border border-[#C9A86C]/10 bg-[#C9A86C]/5 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A86C] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#C9A86C] mb-1 uppercase tracking-wide">
                Vault Security Protocol
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                All documents uploaded to the LNL Vault are encrypted. These assets are
                used exclusively by our architects to identify system leakage and creative
                opportunities. Documents are purged 30 days after audit completion unless
                a service agreement is initiated.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
