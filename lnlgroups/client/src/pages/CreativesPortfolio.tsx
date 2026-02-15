import { motion } from "framer-motion";
import { Camera, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const portfolioItems = [
  {
    id: "placeholder-1",
    title: "Coming Soon",
    category: "Brand Identity",
    description: "Featured creative project showcasing local authority content marketing.",
    location: "Raleigh, NC",
    gradient: "from-[#008080]/20 to-emerald-500/20"
  },
  {
    id: "placeholder-2",
    title: "Coming Soon",
    category: "Content Pack",
    description: "Hyperlocal visual storytelling for category-of-one positioning.",
    location: "Columbus, OH",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "placeholder-3",
    title: "Coming Soon",
    category: "Photography",
    description: "Premium brand photography and visual identity development.",
    location: "Moscow, ID",
    gradient: "from-orange-500/20 to-amber-500/20"
  }
];

export default function CreativesPortfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-20">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008080]/10 text-[#008080] text-sm font-semibold mb-6 border border-[#008080]/20">
                <Camera className="w-4 h-4" />
                LNL CREATIVE PORTFOLIO
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                Creative <span className="text-[#008080]">Work</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Brand identity, content marketing, and visual storytelling for category-of-one businesses.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                  data-testid={`creative-portfolio-${item.id}`}
                >
                  <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient} rounded-2xl mb-6 overflow-hidden relative border border-white/10`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-[#008080]/30" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-background/80 backdrop-blur-md rounded-full p-4">
                        <ArrowUpRight className="h-6 w-6 text-foreground" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#008080]">{item.category}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{item.location}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#008080] transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-muted-foreground">
                More projects coming soon. Contact us to discuss your brand vision.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 The LNL Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
