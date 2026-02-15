import { motion } from "framer-motion";
import { Bot, Workflow, Brain, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const capabilities = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Agents",
    description: "24/7 intelligent assistants that qualify leads and book appointments."
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Workflow Systems",
    description: "Eliminate manual data entry by connecting your entire tech stack."
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Custom Intelligence",
    description: "AI trained on your business knowledge for internal operations."
  }
];

export default function TheBrain() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1A1A1D' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#2E5BFF]/8 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 group hover:border-[#2E5BFF]/30 transition-all duration-300"
                  data-testid={`card-capability-${i}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2E5BFF]/10 flex items-center justify-center text-[#2E5BFF] group-hover:scale-110 transition-transform" style={{ boxShadow: '0 0 20px rgba(46, 91, 255, 0.15)' }}>
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{cap.title}</h3>
                      <p className="text-gray-400 text-sm font-light">{cap.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5BFF]/10 text-[#2E5BFF] text-sm font-semibold mb-6 border border-[#2E5BFF]/20">
              <Zap className="w-4 h-4" />
              THE BRAIN
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
              AI Agents &<br />
              <span className="text-[#2E5BFF]" style={{ textShadow: '0 0 40px rgba(46, 91, 255, 0.3)' }}>Intelligent Systems</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              In high-stakes industries like Law and Home Services, 'slow' is the most expensive word in your vocabulary. We replace manual bottlenecks with 24/7 intelligent systems.
            </p>
            
            <Link href="/automations">
              <Button className="rounded-full px-8 h-12 bg-[#2E5BFF] hover:bg-[#2E5BFF]/90 text-white font-semibold" style={{ boxShadow: '0 0 30px rgba(46, 91, 255, 0.4)' }}>
                Explore Automation Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}