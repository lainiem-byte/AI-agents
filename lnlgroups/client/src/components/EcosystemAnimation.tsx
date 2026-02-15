import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Bell, Zap } from "lucide-react";

export default function EcosystemAnimation() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-secondary/10 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          <div className="relative">
            <div className="w-[280px] h-[560px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl shadow-black/50 border border-gray-700">
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                
                <div className="w-full h-full bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lnl-violet to-lnl-cyan flex items-center justify-center">
                        <span className="text-white text-xs font-bold">LNL</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">lnl_creative</p>
                        <p className="text-[10px] text-gray-500">Raleigh, NC</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="w-full aspect-square bg-gradient-to-br from-lnl-violet/20 via-lnl-gold/10 to-lnl-cyan/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-lnl-gold to-lnl-violet flex items-center justify-center">
                          <span className="text-white text-2xl font-display font-bold">LNL</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">Local Authority Content</p>
                        <p className="text-xs text-gray-500 mt-1">Glenwood South Edition</p>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white">
                      1/5
                    </div>
                  </div>
                  
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 text-gray-800 hover:text-red-500 cursor-pointer transition-colors" />
                        <MessageCircle className="w-6 h-6 text-gray-800" />
                        <Send className="w-6 h-6 text-gray-800" />
                      </div>
                      <Bookmark className="w-6 h-6 text-gray-800" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-1">2,847 likes</p>
                    <p className="text-xs text-gray-800">
                      <span className="font-semibold">lnl_creative</span> Your brand should command attention. We build visual authority that converts.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase">2 hours ago</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                      className="absolute top-12 left-4 right-4 z-30"
                    >
                      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-2xl p-4 shadow-xl shadow-blue-900/30 border border-white/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Bell className="w-3 h-3 text-white/80" />
                              <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">LNL Automations</span>
                            </div>
                            <p className="text-sm font-semibold text-white leading-tight">
                              New Lead Qualified
                            </p>
                            <p className="text-xs text-white/70 mt-0.5">
                              LNL Automations Agent
                            </p>
                          </div>
                          <div className="text-[10px] text-white/60">now</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/20 blur-xl rounded-full" />
          </div>
          
          <div className="max-w-md text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lnl-cyan/10 text-lnl-cyan text-sm font-semibold mb-6 border border-lnl-cyan/20">
              <Zap className="w-4 h-4" />
              INTEGRATED CASE STUDY
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              The Face & The Brain
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Watch how LNL Creative's visual content seamlessly triggers LNL Automations' lead qualification pipeline.
            </p>
            <p className="text-xl font-semibold text-foreground border-l-4 border-lnl-gold pl-4">
              We don't just drive the lead; we capture the data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}