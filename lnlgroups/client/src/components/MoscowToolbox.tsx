import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Lightbulb, Users, Store, GraduationCap, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import moscowOutreach from "@/data/moscow_outreach.json";

const targetIcons: Record<string, React.ReactNode> = {
  "The Local Icon (e.g., BookPeople or Moscow Food Co-op)": <Store className="w-5 h-5" />,
  "Farmers Market Vendors / Artisans": <Users className="w-5 h-5" />,
  "University District / New Main St Businesses": <GraduationCap className="w-5 h-5" />
};

const targetLabels: Record<string, string> = {
  "The Local Icon (e.g., BookPeople or Moscow Food Co-op)": "Iconic Business",
  "Farmers Market Vendors / Artisans": "Artisan / Vendor",
  "University District / New Main St Businesses": "University District"
};

const lainieTips: Record<string, string> = {
  "Relational Spotlight": "Moscow icons like BookPeople and the Food Co-op are community anchors. They've seen countless cold pitches. Lead with mutual benefit and genuine appreciation for their role in the Palouse. They'll remember the respect.",
  "The Saturday Pulse": "The Farmers Market isn't just commerce—it's Moscow's weekly gathering. Approach with curiosity about their craft, not your services. The 'Saturday in Moscow' angle shows you understand their rhythm.",
  "The Growth Architect": "New businesses on Main Street are hopeful but cautious. Don't sell automation—sell community integration. Show them the 'Map' of how established Moscow brands built trust over time."
};

export default function MoscowToolbox() {
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");

  const scripts = moscowOutreach.moscow_engagement;
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
      <div className="relative overflow-hidden rounded-3xl border border-[#008080]/20 bg-gradient-to-br from-[#1a1625] via-background to-[#1a1a2e]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#008080]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <Mountain className="w-6 h-6 text-[#008080]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#008080]/80">Palouse Hills Aesthetic</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">
            Moscow Community Outreach Toolbox
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Relational scripts designed for Moscow's neighborly business culture. Select a target, personalize, and copy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {scripts.map((script, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-300 border ${
                  selectedIndex === index
                    ? "bg-[#008080]/20 border-[#008080]/50 shadow-lg shadow-[#008080]/10"
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
                placeholder="e.g., BookPeople"
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-[#008080]/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Contact Name (optional)</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g., Sarah"
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
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-4">
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
                        : "bg-[#008080] hover:bg-[#008080]/80"
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
                
                <div className="bg-secondary/30 rounded-xl p-5 border border-white/5">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {getPersonalizedScript(currentScript.script)}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#008080]/10 to-purple-900/10 rounded-2xl border border-[#008080]/20 p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#008080]/20 text-[#008080] shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1 flex items-center gap-2">
                      Lainie's Tip
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lainieTips[currentScript.type]}
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
