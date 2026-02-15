import { motion } from "framer-motion";
import { ArrowRight, Palette, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import architectureBg from "@assets/stock_images/modern_architecture__69f67dc4.webp";

export default function HubHero() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-20 overflow-hidden" style={{ backgroundColor: '#1A1A1D' }}>
      {/* Video/Image Background - Mobile gets static image for performance */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0D0D0F' }}>
        {isMobile ? (
          <img 
            src={architectureBg}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster={architectureBg}
          >
            <source src="https://videos.pexels.com/video-files/3648257/3648257-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        )}
        {/* Semi-transparent dark overlay (70% opacity) for text legibility */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/80 via-black/20 to-[#1A1A1D]" />
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#008080]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#2E5BFF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-16 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium mb-8 border border-white/10">
            <Sparkles className="w-4 h-4" />
            THE LNL GROUP
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="text-white">Growth Architecture:</span><br />
            <span 
              className="bg-gradient-to-r from-[#B8860B] via-[#FFD700] via-[#C9A86C] to-[#B8860B] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
              style={{ 
                WebkitBackgroundClip: 'text',
                textShadow: '0 0 40px rgba(201, 168, 108, 0.3)'
              }}
            >
              Where Logic Meets Luxury
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            We align your brand's prestige with your business's precision. From Raleigh to Moscow, we engineer the digital infrastructure that justifies your premium price point and automates your scale.
          </p>
          
          <Button 
            size="lg" 
            className="rounded-full px-10 h-14 text-lg font-semibold bg-lnl-gold hover:bg-lnl-gold/90 text-black"
            data-testid="button-growth-audit"
            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply for a Growth Audit <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <Link href="/creatives" className="block h-full" onClick={() => window.scrollTo(0, 0)}>
              <div className="glass-card rounded-3xl p-10 h-full cursor-pointer group transition-all duration-500 hover:border-[#008080]/50 relative overflow-hidden flex flex-col" style={{ borderColor: 'rgba(0, 128, 128, 0.2)' }} data-testid="card-creative-authority">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008080] to-[#008080]/50" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#008080]/20 flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(0, 128, 128, 0.2)' }}>
                    <Palette className="w-7 h-7 text-[#008080]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider">LNL Creative</p>
                    <h2 className="text-3xl font-extrabold text-white">Creative Authority</h2>
                  </div>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light flex-grow">
                  Visual Authority for the Category-of-One. If your brand doesn't look like the price you want to charge, you are leaving money on the table.
                </p>
                
                <div className="flex items-center gap-2 text-[#008080] font-semibold group-hover:gap-4 transition-all mt-auto">
                  Explore Brand Services <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full"
          >
            <Link href="/automations" className="block h-full" onClick={() => window.scrollTo(0, 0)}>
              <div className="glass-card rounded-3xl p-10 h-full cursor-pointer group transition-all duration-500 hover:border-[#2E5BFF]/50 relative overflow-hidden flex flex-col" style={{ borderColor: 'rgba(46, 91, 255, 0.2)' }} data-testid="card-workflow-intelligence">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E5BFF] to-[#2E5BFF]/50" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#2E5BFF]/20 flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(46, 91, 255, 0.2)' }}>
                    <Cpu className="w-7 h-7 text-[#2E5BFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2E5BFF] uppercase tracking-wider">LNL Automations</p>
                    <h2 className="text-3xl font-extrabold text-white">Workflow Intelligence</h2>
                  </div>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light flex-grow">
                  Scale Without the Headcount. Custom AI Agents & Workflows designed for the modern small business owner.
                </p>
                
                <div className="flex items-center gap-2 text-[#2E5BFF] font-semibold group-hover:gap-4 transition-all mt-auto">
                  Explore Automation Services <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}