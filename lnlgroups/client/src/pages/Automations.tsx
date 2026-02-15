import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Workflow, Brain, Zap, ArrowRight, Check, Sparkles, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import LNLPulse from "@/components/LNLPulse";
import techBg from "@assets/stock_images/digital_technology_a_805d8588.webp";

const demos = [
  {
    id: "lead-concierge",
    title: "Lead Concierge Bot",
    industry: "Real Estate",
    description: "24/7 lead qualification with intelligent calendar booking for a Triangle real estate team.",
    stats: ["+340% Response Rate", "2.3s Avg Reply"],
    type: "AI Agent",
    typeColor: "#2E5BFF",
    icon: Bot,
    gradient: "from-[#2E5BFF]/20 to-purple-500/20",
    videoUrl: "" // Placeholder for video URL
  },
  {
    id: "content-pipeline",
    title: "Content Pipeline",
    industry: "Hospitality",
    description: "Automated social content generation using Flux.1 for a boutique hotel group.",
    stats: ["40 Posts/Week", "Zero Manual Effort"],
    type: "Workflow",
    typeColor: "#34D399",
    icon: Workflow,
    gradient: "from-emerald-500/20 to-teal-500/20",
    videoUrl: "" // Placeholder for video URL
  },
  {
    id: "crm-sync",
    title: "Smart CRM Sync",
    industry: "Professional Services",
    description: "Multi-platform data unification connecting HubSpot, Calendly, and Slack.",
    stats: ["5 Apps Connected", "Real-time Sync"],
    type: "Integration",
    typeColor: "#FB923C",
    icon: Brain,
    gradient: "from-orange-500/20 to-red-500/20",
    videoUrl: "" // Placeholder for video URL
  }
];

const services = [
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI Lead Concierge",
    description: "24/7 qualifying and booking. Your AI assistant never sleeps, ensuring every lead gets instant attention and intelligent qualification.",
    features: ["Instant Response", "Smart Qualification", "Calendar Integration", "CRM Sync"]
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "Workflow Architecture",
    description: "Connecting apps to eliminate manual data entry. We build the bridges between your tools so data flows automatically.",
    features: ["App Integrations", "Data Mapping", "Error Handling", "Real-time Sync"]
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "The Intelligence Suite",
    description: "Custom-trained AI agents for internal knowledge. Your company's expertise, packaged into an AI that works for you.",
    features: ["Custom Training", "Knowledge Base", "Team Access", "Continuous Learning"]
  }
];

const pricingTiers = [
  {
    name: "Concierge",
    price: "$1,500",
    period: "/month",
    description: "AI Lead Qualification & Booking",
    features: [
      "24/7 AI Lead Response",
      "Calendar Booking Integration",
      "Basic CRM Sync",
      "Email Notifications",
      "Monthly Performance Report"
    ],
    cta: "Start with Concierge",
    featured: false
  },
  {
    name: "Engine",
    price: "$3,500",
    period: "/month",
    description: "Full Workflow Automation Suite",
    features: [
      "Everything in Concierge",
      "Multi-App Workflow Automation",
      "Custom Data Pipelines",
      "Advanced Analytics Dashboard",
      "Priority Support",
      "Bi-Weekly Strategy Calls"
    ],
    cta: "Power Your Engine",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Complete AI Infrastructure",
    features: [
      "Everything in Engine",
      "Custom AI Agent Training",
      "Internal Knowledge Base AI",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "White-Glove Onboarding"
    ],
    cta: "Contact for Enterprise",
    featured: false
  }
];

export default function Automations() {
  const [selectedDemo, setSelectedDemo] = useState<typeof demos[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1A1A1D' }}>
      <Navbar />
      
      <main className="pt-20">
        <section className="py-32 relative overflow-hidden min-h-screen flex items-center">
          {/* Video/Image Background - Mobile gets static image for performance */}
          <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0D0D0F' }}>
            {isMobile ? (
              <img 
                src={techBg}
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
                poster={techBg}
              >
                <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              </video>
            )}
            {/* Semi-transparent dark overlay (45% opacity) for text legibility */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/70 via-transparent to-[#1A1A1D]" />
          </div>
          
          <div className="absolute inset-0 pointer-events-none z-[1]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2E5BFF]/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2E5BFF]/10 rounded-full blur-[120px]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E5BFF]/10 text-[#2E5BFF] text-sm font-semibold mb-8 border border-[#2E5BFF]/30" style={{ boxShadow: '0 0 30px rgba(46, 91, 255, 0.3)' }}>
                <Zap className="w-4 h-4" />
                LNL AUTOMATIONS
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                The Mechanical Heart: <span 
                  className="bg-gradient-to-r from-[#1E3A8A] via-[#60A5FA] via-[#2E5BFF] to-[#1E3A8A] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
                  style={{ WebkitBackgroundClip: 'text' }}
                >Systems Architected for Scale</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                Scaling shouldn't mean working more hours—it should mean better logic. We install custom AI ecosystems and Lead-to-Client Logic that eliminate labor leakage and reclaim your "Zone of Genius."
              </p>
              
              <Button 
                size="lg" 
                className="rounded-full px-10 h-14 text-lg font-semibold bg-[#2E5BFF] hover:bg-[#2E5BFF]/90 text-white border-0"
                style={{ boxShadow: '0 0 40px rgba(46, 91, 255, 0.5), 0 4px 20px rgba(46, 91, 255, 0.3)' }}
                data-testid="button-map-system-logic"
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Map Your System Logic <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-24 relative" style={{ backgroundColor: '#121213' }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Core Services</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Three pillars of automation excellence, tailored for your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#2E5BFF]/50 transition-all duration-300"
                  style={{ boxShadow: '0 0 0 rgba(46, 91, 255, 0)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(46, 91, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(46, 91, 255, 0)'}
                  data-testid={`card-service-${i}`}
                >
                  <div className="w-16 h-16 rounded-xl bg-[#2E5BFF]/10 flex items-center justify-center text-[#2E5BFF] mb-6 group-hover:scale-110 transition-transform" style={{ boxShadow: '0 0 20px rgba(46, 91, 255, 0.2)' }}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#2E5BFF]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The LNL Pulse - Interactive Workflow Demo */}
        <section className="py-24 relative" style={{ backgroundColor: '#0A0A0B' }}>
          <div className="container mx-auto px-6">
            <LNLPulse />
          </div>
        </section>

        <section className="py-24 relative" style={{ backgroundColor: '#1A1A1D' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2E5BFF]/10 rounded-full blur-[200px]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Pricing</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Transparent pricing for serious business owners ready to scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative p-8 rounded-2xl border ${tier.featured ? 'border-[#2E5BFF] bg-[#2E5BFF]/5' : 'border-white/10 bg-white/5'} backdrop-blur-sm`}
                  style={tier.featured ? { boxShadow: '0 0 60px rgba(46, 91, 255, 0.2)' } : {}}
                  data-testid={`card-pricing-${tier.name.toLowerCase()}`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2E5BFF] rounded-full text-xs font-bold uppercase tracking-wider" style={{ boxShadow: '0 0 20px rgba(46, 91, 255, 0.5)' }}>
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-white">{tier.price}</span>
                      <span className="text-gray-400">{tier.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="w-5 h-5 text-[#2E5BFF] shrink-0 mt-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full rounded-full h-12 font-semibold ${tier.featured ? 'bg-[#2E5BFF] hover:bg-[#2E5BFF]/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                    style={tier.featured ? { boxShadow: '0 0 30px rgba(46, 91, 255, 0.4)' } : {}}
                    data-testid={`button-pricing-${tier.name.toLowerCase()}`}
                  >
                    {tier.cta}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio / Demo Showcase */}
        <section id="automation-demos" className="py-24" style={{ backgroundColor: '#121213' }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Live Automation Demos</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                See our AI agents and workflows in action. Each demo represents real solutions deployed for clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {demos.map((demo, i) => {
                const IconComponent = demo.icon;
                return (
                  <motion.div
                    key={demo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#2E5BFF]/50 transition-all duration-300 cursor-pointer"
                    data-testid={`demo-card-${demo.id}`}
                    onClick={() => setSelectedDemo(demo)}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${demo.gradient} flex items-center justify-center relative`}>
                      <IconComponent className="w-16 h-16 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" style={{ color: demo.typeColor }} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ color: demo.typeColor, backgroundColor: `${demo.typeColor}15` }}>{demo.type}</span>
                        <span className="text-xs text-gray-300">{demo.industry}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{demo.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-300">
                        <span>{demo.stats[0]}</span>
                        <span>•</span>
                        <span>{demo.stats[1]}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Demo Video Modal */}
        <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
          <DialogContent className="max-w-4xl bg-[#1A1A1B] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {selectedDemo && (
                  <>
                    <span style={{ color: selectedDemo.typeColor }}>{selectedDemo.type}:</span>
                    {selectedDemo.title}
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedDemo?.videoUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={selectedDemo.videoUrl}
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
              {selectedDemo && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-300 mb-4">{selectedDemo.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-400">Results:</span>
                    <span className="text-white font-semibold">{selectedDemo.stats[0]}</span>
                    <span className="text-white font-semibold">{selectedDemo.stats[1]}</span>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <section className="py-24" style={{ backgroundColor: '#1A1A1D' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="w-12 h-12 text-[#2E5BFF] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px rgba(46, 91, 255, 0.5))' }} />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate?</h2>
              <p className="text-gray-400 text-xl mb-10 leading-relaxed">
                Join forward-thinking business owners who've reclaimed their time with intelligent automation.
              </p>
              <Button 
                size="lg" 
                className="rounded-full px-12 h-16 text-xl font-semibold bg-[#2E5BFF] hover:bg-[#2E5BFF]/90 text-white"
                style={{ boxShadow: '0 0 50px rgba(46, 91, 255, 0.5), 0 4px 30px rgba(46, 91, 255, 0.3)' }}
                data-testid="button-workflow-audit-cta"
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request Your Workflow Audit <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      
      <footer className="py-16 border-t border-white/10" style={{ backgroundColor: '#1A1A1D' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mb-6">
            <p className="font-medium">Serving: Raleigh, NC | Columbus, OH | Moscow, ID</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-[#2E5BFF] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#2E5BFF] transition-colors">Terms</Link>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600 pt-6 border-t border-white/5">
            <p>© 2026 The LNL Group. All AI solutions built by LNL Group adhere to strict Data Sovereignty protocols.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}