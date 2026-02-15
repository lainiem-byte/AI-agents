import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Sparkles, Building, GraduationCap, Rocket, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import raleighOutreach from "@/data/raleigh_outreach.json";

const targetIcons: Record<string, React.ReactNode> = {
  "Glenwood South Lifestyle / Hospitality": <Sparkles className="w-5 h-5" />,
  "North Hills Tech / Modern Professional": <Building className="w-5 h-5" />,
  "Durham Innovation / American Tobacco Campus": <GraduationCap className="w-5 h-5" />
};

const targetLabels: Record<string, string> = {
  "Glenwood South Lifestyle / Hospitality": "Glenwood South",
  "North Hills Tech / Modern Professional": "North Hills Tech",
  "Durham Innovation / American Tobacco Campus": "Durham Innovation"
};

const growthNotes: Record<string, string> = {
  "The Vibrant Pulse": "Digital Localization in action: The 'Local Authority series' and 'shoot day' language signals hyper-local expertise. High-ticket hospitality clients in Glenwood South want partners who understand their specific block, not generic 'Raleigh' pitches. This script anchors LNL as the neighborhood's digital cartographer.",
  "Scalable Authority": "The 'Digital Blueprint' and 'Triangle Vision' framing uses Digital Localization to position LNL at the intersection of three high-growth markets. North Hills decision-makers pay premium rates for partners who see the macro trajectory while executing at the micro level.",
  "The Heritage Architect": "Durham's American Tobacco Campus represents the Triangle's highest-ticket innovation market. By citing Flux.1 and n8n, you signal technical fluency. The 'architect your 2025 presence' close leverages Digital Localization to position LNL as the bridge between Durham's heritage and its AI-powered future."
};

export default function RaleighToolbox() {
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");

  const scripts = raleighOutreach.raleigh_engagement;
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
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#008080]/40 bg-[#1A1A1D]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#008080]/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#008080]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-6 h-6 text-[#008080]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#008080]">High-Growth Dashboard</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            Raleigh Innovation Toolbox
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Digital Localization scripts for the Triangle's high-ticket market. Secure elite clients in Glenwood South, North Hills, and Durham.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {scripts.map((script, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                  selectedIndex === index
                    ? "bg-[#008080]/10 border-[#008080] shadow-lg shadow-[#008080]/20"
                    : "bg-[#111] border-white/10 hover:bg-[#1a1a1a] hover:border-[#008080]/30"
                }`}
              >
                <div className={`mb-2 ${selectedIndex === index ? "text-[#008080]" : "text-muted-foreground"}`}>
                  {targetIcons[script.target]}
                </div>
                <div className={`font-bold text-sm ${selectedIndex === index ? "text-white" : "text-muted-foreground"}`}>
                  {targetLabels[script.target]}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">{script.type}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs font-bold text-[#008080]/80 mb-2 block uppercase tracking-wide">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Transfer Food Hall"
                className="w-full px-4 py-3 rounded-xl bg-[#111] border-2 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-[#008080] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#008080]/80 mb-2 block uppercase tracking-wide">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g., Jordan"
                className="w-full px-4 py-3 rounded-xl bg-[#111] border-2 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-[#008080] focus:outline-none transition-colors"
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
              <div className="bg-[#242428] rounded-2xl border-2 border-[#008080]/30 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#008080]">{currentScript.type}</span>
                    <h4 className="text-lg font-bold text-white mt-1">{targetLabels[currentScript.target]}</h4>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(selectedIndex)}
                    className={`rounded-xl font-bold transition-all ${
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
                
                <div className="bg-[#080808] rounded-xl p-5 border border-[#008080]/10">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {getPersonalizedScript(currentScript.script)}
                  </p>
                </div>
              </div>

              <div className="bg-[#242428] rounded-2xl border-2 border-[#008080]/20 p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#008080]/15 text-[#008080] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#008080] mb-1 flex items-center gap-2 uppercase tracking-wide text-sm">
                      Growth Note
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {growthNotes[currentScript.type]}
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
