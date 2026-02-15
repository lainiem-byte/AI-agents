import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Workflow, Brain, Zap, ArrowUpRight, Play, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";

const portfolioItems = [
  {
    id: "lead-concierge",
    title: "Lead Concierge Bot",
    category: "AI Agent",
    industry: "Real Estate",
    description: "24/7 lead qualification with intelligent calendar booking for a Triangle real estate team.",
    stats: ["+340% Response Rate", "2.3s Avg Reply"],
    icon: Bot,
    gradient: "from-[#2E5BFF]/20 to-purple-500/20",
    typeColor: "#2E5BFF",
    videoUrl: ""
  },
  {
    id: "content-pipeline",
    title: "Content Pipeline",
    category: "Workflow",
    industry: "Hospitality",
    description: "Automated social content generation using Flux.1 for a boutique hotel group.",
    stats: ["40 Posts/Week", "Zero Manual Effort"],
    icon: Workflow,
    gradient: "from-emerald-500/20 to-teal-500/20",
    typeColor: "#34D399",
    videoUrl: ""
  },
  {
    id: "crm-sync",
    title: "Smart CRM Sync",
    category: "Integration",
    industry: "Professional Services",
    description: "Multi-platform data unification connecting HubSpot, Calendly, and Slack.",
    stats: ["5 Apps Connected", "Real-time Sync"],
    icon: Brain,
    gradient: "from-orange-500/20 to-red-500/20",
    typeColor: "#FB923C",
    videoUrl: ""
  }
];

export default function AutomationsPortfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1A1A1D' }}>
      <Navbar />
      
      <main className="pt-20">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E5BFF]/10 text-[#2E5BFF] text-sm font-semibold mb-6 border border-[#2E5BFF]/30">
                <Zap className="w-4 h-4" />
                LNL AUTOMATIONS PORTFOLIO
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Automation <span className="text-[#2E5BFF]">Work</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                AI agents, workflows, and integrations that help businesses scale without headcount.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {portfolioItems.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#2E5BFF]/50 transition-all duration-300 cursor-pointer"
                    data-testid={`automation-portfolio-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                      <IconComponent className="w-16 h-16 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" style={{ color: item.typeColor }} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ color: item.typeColor, backgroundColor: `${item.typeColor}15` }}>{item.category}</span>
                        <span className="text-xs text-gray-300">{item.industry}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-300">
                        <span>{item.stats[0]}</span>
                        <span>•</span>
                        <span>{item.stats[1]}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-400">
                More automation projects coming soon. Contact us for a workflow audit.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl bg-[#1A1A1B] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedItem && (
                <>
                  <span style={{ color: selectedItem.typeColor }}>{selectedItem.category}:</span>
                  {selectedItem.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedItem?.videoUrl ? (
              <div className="aspect-video">
                <iframe
                  src={selectedItem.videoUrl}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex flex-col items-center justify-center">
                <Play className="w-20 h-20 text-white/30 mb-4" />
                <p className="text-gray-400 text-lg">Demo video coming soon</p>
                <p className="text-gray-500 text-sm mt-2">Contact us to see a live walkthrough of this automation</p>
              </div>
            )}
            {selectedItem && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-gray-400">Results:</span>
                  <span className="text-white font-semibold">{selectedItem.stats[0]}</span>
                  <span className="text-white font-semibold">{selectedItem.stats[1]}</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <footer className="py-16 border-t border-white/10" style={{ backgroundColor: '#1A1A1D' }}>
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2026 The LNL Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
