import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Globe, TrendingUp, ShieldCheck } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_modern_tech_corporate_network_geometric_glass_architecture.png";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="LNL Group Corporate Headquarters - AI Automation Architecture and Strategic Digital Infrastructure" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90 dark:bg-background/95 backdrop-blur-[2px] bg-gradient-to-r from-background via-background/95 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Legacy & Innovation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Identity & Intelligence for the <span className="tech-gradient-text">Modern Enterprise</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Bridging the gap between how your business looks and how it actually runs. Founded by Lainie Mayfield, The LNL Group provides the visual authority and automated logic required to scale without burnout.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90">
              Book Your 15-Minute Workflow Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> Global Reach
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Scalable Tech
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Enterprise Security
            </div>
          </div>
        </motion.div>

        {/* Abstract floating UI card element for "Tech Forward" feel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="glass-panel p-8 rounded-2xl relative z-20 max-w-md ml-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">Market Analysis</h3>
                <p className="text-xs text-muted-foreground">Real-time data processing</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                    0{i}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-muted-foreground/20 rounded mb-2"></div>
                    <div className="h-1.5 w-16 bg-muted-foreground/10 rounded"></div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Efficiency</span>
                 <span className="font-bold text-primary">+124%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[80px] z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-[60px] z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}