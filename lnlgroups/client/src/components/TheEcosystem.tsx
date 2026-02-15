import { motion } from "framer-motion";
import { Layers, ArrowRight, Palette, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheEcosystem() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0F0F10' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#008080]/5 via-lnl-gold/5 to-[#2E5BFF]/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lnl-gold/10 text-lnl-gold text-sm font-semibold mb-6 border border-lnl-gold/20">
            <Layers className="w-4 h-4" />
            THE ECOSYSTEM
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
            Where Brand Meets<br />
            <span className="bg-gradient-to-r from-[#008080] via-lnl-gold to-[#2E5BFF] bg-clip-text text-transparent">Autonomous Scale</span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
            The LNL Bundle: When your visual authority drives leads, and your AI systems capture them—that's when true scale happens.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-12 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 128, 128, 0.05) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(46, 91, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008080] via-lnl-gold to-[#2E5BFF]" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#008080]/10 flex items-center justify-center mx-auto mb-4" style={{ boxShadow: '0 0 40px rgba(0, 128, 128, 0.2)' }}>
                  <Palette className="w-10 h-10 text-[#008080]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">LNL Creative</h3>
                <p className="text-gray-400 text-sm font-light">Drives attention and desire</p>
              </div>
              
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-lnl-gold/20 flex items-center justify-center mb-4" style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}>
                  <Sparkles className="w-8 h-8 text-lnl-gold" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-lnl-gold" />
                  <span className="text-lnl-gold font-bold uppercase tracking-wider text-sm">Synergy</span>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-lnl-gold" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#2E5BFF]/10 flex items-center justify-center mx-auto mb-4" style={{ boxShadow: '0 0 40px rgba(46, 91, 255, 0.2)' }}>
                  <Cpu className="w-10 h-10 text-[#2E5BFF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">LNL Automations</h3>
                <p className="text-gray-400 text-sm font-light">Captures and converts</p>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-2xl font-bold text-white mb-6">
                We don't just drive the lead; <span className="text-lnl-gold">we capture the data.</span>
              </p>
              <Button 
                size="lg" 
                className="rounded-full px-10 h-14 text-lg font-semibold bg-lnl-gold hover:bg-lnl-gold/90 text-black"
                data-testid="button-bundle-cta"
              >
                Explore the Full Bundle <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}