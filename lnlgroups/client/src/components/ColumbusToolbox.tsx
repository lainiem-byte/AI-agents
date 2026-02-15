import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, TrendingUp, Building2, Landmark, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import columbusOutreach from "@/data/columbus_outreach.json";

const targetIcons: Record<string, React.ReactNode> = {
  "Short North Gallery / Tech Startup": <TrendingUp className="w-5 h-5" />,
  "German Village Real Estate / Boutique Law": <Landmark className="w-5 h-5" />,
  "The Peninsula / Downtown Developer": <Building2 className="w-5 h-5" />
};

const targetLabels: Record<string, string> = {
  "Short North Gallery / Tech Startup": "Short North Tech",
  "German Village Real Estate / Boutique Law": "German Village",
  "The Peninsula / Downtown Developer": "Downtown Developer"
};

const strategicROI: Record<string, string> = {
  "The Tech Surge": "This script positions LNL as a market intelligence partner, not a vendor. By citing the 200% surge, you demonstrate you're tracking institutional-grade data. The 'flagship' framing elevates the prospect's status while anchoring LNL as the architect behind the district's digital infrastructure.",
  "Institutional Authority": "The 'Digital Map' and 'Market Spotlight' language signals long-term institutional thinking. German Village decision-makers need to see LNL as a strategic asset—someone who understands that brand authority compounds over decades, not quarters.",
  "The Blueprint Strategy": "Developers respond to systems thinking. By referencing a 'Blueprint' and the Scioto Mile case study, you position LNL as an integration partner who speaks their language: phases, automation, and scalable execution. This is vendor-to-partner positioning."
};

export default function ColumbusToolbox() {
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");

  const scripts = columbusOutreach.columbus_engagement;
  const currentScript = scripts[selectedIndex];

  const getPersonalizedScript = (script: string) => {
    return script
      .replace("{{business_name}}", businessName || "[Business Name]")
      .replace("{{contact_name}}", contactName || "[Contact Name]");
  };

  const copyToClipboard = async (index: number) => {
    const script = getPersonalizedScript(scripts[index].script);
    await navigator.clipboard.writeText(script);
    setCopiedIndex(index);
    toast({
      title: "Script copied!",
      description: "Ready to paste into your outreach message.",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-[#008080]/30 bg-gradient-to-br from-[#1a1815] via-[#0f0f0f] to-[#1a1612]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#008080]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-900/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-[#008080]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#008080]/80">Investment-Grade Positioning</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
            Columbus Strategic Toolbox
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Institutional-grade scripts for Columbus's powerhouse districts. Position LNL as a strategic partner, not a vendor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {scripts.map((script, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border ${
                  selectedIndex === index
                    ? "bg-[#008080]/15 border-[#008080]/50 shadow-lg shadow-[#008080]/10"
                    : "bg-secondary/20 border-white/5 hover:bg-secondary/40 hover:border-white/10"
                }`}
              >
                <div className={`mb-2 ${selectedIndex === index ? "text-[#008080]" : "text-muted-foreground"}`}>
                  {targetIcons[script.target]}
                </div>
                <div className={`font-semibold text-sm ${selectedIndex === index ? "text-white" : "text-muted-foreground"}`}>
                  {targetLabels[script.target]}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">{script.type}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Business Name (optional)</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Arch City Development"
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-[#008080]/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Contact Name (optional)</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g., Michael"
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-[#008080]/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-[#008080]/20 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#008080]">{currentScript.type}</span>
                    <h4 className="text-lg font-semibold text-white mt-1">{targetLabels[currentScript.target]}</h4>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(selectedIndex)}
                    className={`rounded-xl transition-all ${
                      copiedIndex === selectedIndex
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-[#008080] hover:bg-[#008080]/80 text-black"
                    }`}
                  >
                    {copiedIndex === selectedIndex ? (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" /> Copy Script
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-[#1A1A1D] rounded-xl p-5 border border-[#008080]/10">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {getPersonalizedScript(currentScript.script)}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#008080]/10 to-amber-900/10 rounded-2xl border border-[#008080]/20 p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#008080]/20 text-[#008080] shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1 flex items-center gap-2">
                      Strategic ROI
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {strategicROI[currentScript.type]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
