import { motion } from "framer-motion";
import { Brain, Building2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitImage from "@assets/My_Headshot_AI_background_1767937187821.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-lnl-violet/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 leading-tight">
              <span className="text-white">Most businesses are built on hustle.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lnl-violet via-lnl-cyan to-lnl-gold">
                We prefer Architecture.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Lainie Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lnl-violet/30 to-lnl-cyan/30 rounded-3xl blur-3xl animate-pulse" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-lnl-violet/30 shadow-2xl shadow-lnl-violet/20">
                <img
                  src={portraitImage}
                  alt="Lainie Mayfield - LNL Automations Custom AI Architecture Raleigh and LNL Creative Luxury Brand Identity Design Columbus"
                  className="w-full"
                />
                
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)',
                  }}
                />
                
                <div 
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(6, 182, 212, 0.3) 50%)',
                    backgroundSize: '4px 100%',
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-lnl-violet/40 via-transparent to-lnl-cyan/20 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lnl-violet via-lnl-cyan to-lnl-gold" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-lnl-violet/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-lnl-violet">FOUNDER // ARCHITECT</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-lnl-cyan/30">
                  <span className="text-xs font-mono text-lnl-cyan">SAN DIEGO, CA</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  In my time building across markets like <span className="text-lnl-gold">Raleigh</span>, <span className="text-lnl-gold">Columbus</span>, and <span className="text-lnl-gold">Moscow</span>, I've noticed a recurring friction point for elite service providers.
                </p>
                <p>
                  Many businesses have what I call a <span className="text-lnl-violet font-medium">"Prestige Gap."</span> They provide world-class results, but their Digital Face looks like a commodity. Others have a <span className="text-lnl-cyan font-medium">"Logic Leak"</span>—they have a beautiful brand, but their Mechanical Heart is broken, losing leads and wasting hours on manual labor that should be automated.
                </p>
                <p>
                  <span className="text-white font-medium">I founded LNL Group to solve for both.</span>
                </p>
                <p>
                  We don't just "do marketing" or "set up software." We bridge the gap between how you are perceived and how you function. Whether we are executing a Digital Facelift for a Med Spa or architecting a Lead-to-Client Logic flow for a Real Estate firm, our goal is the same:
                </p>
                <p className="text-xl text-white font-medium">
                  To give you back your time and justify your premium price point.
                </p>
                <p>
                  You've done the hard work of becoming an expert in your field. Now, let us build the infrastructure that proves it to the world.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-lg text-white font-display">Lainie Mayfield</p>
                <p className="text-sm text-lnl-gold">Chief Growth Architect, LNL Group</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Cities Philosophy */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-medium mb-4">Three Cities. One Philosophy.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each market demands a unique approach to authenticity and growth. We've mastered all three.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Raleigh */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-lnl-violet/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-lnl-violet/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-lnl-violet" />
              </div>
              <h3 className="text-xl font-display mb-3">Raleigh / Durham</h3>
              <p className="text-sm text-muted-foreground mb-4">
                High-growth tech markets demand <span className="text-white">aggressive visibility</span>. We position brands at the intersection of innovation and prestige.
              </p>
              <div className="text-xs text-lnl-violet font-mono">#RaleighRising #TriangleTech</div>
            </motion.div>

            {/* Columbus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-lnl-cyan/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-lnl-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-lnl-cyan" />
              </div>
              <h3 className="text-xl font-display mb-3">Columbus</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The Midwest's stealth powerhouse. We build <span className="text-white">institutional authority</span> through heritage storytelling and data-driven targeting.
              </p>
              <div className="text-xs text-lnl-cyan font-mono">#CbusSmallBiz #GermanVillageCharm</div>
            </motion.div>

            {/* Moscow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-lnl-gold/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-lnl-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-lnl-gold" />
              </div>
              <h3 className="text-xl font-display mb-3">Moscow, ID</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Intimate markets require <span className="text-white">deep community engagement</span>. We embed brands into the cultural fabric through relational storytelling.
              </p>
              <div className="text-xs text-lnl-gold font-mono">#MoscowIdaho #ShopLocalMoscow</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The LNL Difference */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-medium mb-4">The LNL Difference</h2>
              <p className="text-muted-foreground">
                We're not an agency. We're your growth infrastructure.
              </p>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-lnl-violet/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-lnl-violet font-bold">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">Custom is the Map</h3>
                  <p className="text-muted-foreground">
                    Every market has a unique demographic signature. We start with research—extracting landmarks, vibe keywords, and visual anchors specific to your audience.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-lnl-cyan/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-lnl-cyan font-bold">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">Growth is the Guide</h3>
                  <p className="text-muted-foreground">
                    Once we understand your map, we automate the journey. Our n8n + Flux.1 pipelines generate hyper-localized assets at scale, optimized for engagement and conversion.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-lnl-gold/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-lnl-gold font-bold">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">Presence Becomes Authority</h3>
                  <p className="text-muted-foreground">
                    Consistent, context-aware content builds trust. Whether it's Glenwood South's nightlife or German Village's historic charm, we make your brand feel native to the ecosystem.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-lnl-violet/10 via-background to-lnl-cyan/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-medium mb-6">
              Ready to Build Your Digital Architecture?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Whether you're scaling in Raleigh, establishing authority in Columbus, or becoming a pillar in Moscow—let's architect your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-lnl-violet hover:bg-lnl-violet/90 text-white px-8 py-6 text-lg rounded-full">
                Schedule a Strategy Call
              </Button>
              <Button variant="outline" className="border-lnl-cyan/30 hover:bg-lnl-cyan/10 text-lnl-cyan px-8 py-6 text-lg rounded-full">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
