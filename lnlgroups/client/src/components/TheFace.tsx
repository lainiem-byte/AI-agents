import { motion } from "framer-motion";
import { Gem, Home, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const industries = [
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Med Spas",
    description: "Luxury aesthetics demand luxury presence. We craft visual ecosystems that command premium pricing."
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: "Real Estate",
    description: "In a market where perception is everything, your brand should close before you even show up."
  }
];

export default function TheFace() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0F0F10' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#008080]/8 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008080]/10 text-[#008080] text-sm font-semibold mb-6 border border-[#008080]/20">
              <Sparkles className="w-4 h-4" />
              THE FACE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white font-serif-display" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Brand-Mining for<br />
              <span className="text-[#008080]">Premium Industries</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              We don't just create posts; we study the architecture of a brand. Through our Brand-Mining process, we extract the visual DNA that makes luxury clients take notice.
            </p>
            
            <Link href="/creatives">
              <Button className="rounded-full px-8 h-12 bg-[#008080] hover:bg-[#008080]/90 text-white font-semibold" style={{ boxShadow: '0 0 30px rgba(0, 128, 128, 0.3)' }}>
                Explore Creative Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="space-y-6">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 border-l-4 border-[#008080]"
                data-testid={`card-industry-${i}`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#008080]/10 flex items-center justify-center text-[#008080] shrink-0">
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>{industry.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light">{industry.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}