import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, Zap, Rocket, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const phases = [
  {
    id: 1,
    name: "Capture",
    icon: Brain,
    logic: "Master Brain analyzes questionnaire inputs.",
    luxury: "Client receives an instant, high-prestige confirmation.",
    color: "#C9A86C"
  },
  {
    id: 2,
    name: "Audit",
    icon: Search,
    logic: "n8n agent scrapes website for Aesthetic Gaps.",
    luxury: "Client is categorized for a custom Digital Facelift.",
    color: "#008080"
  },
  {
    id: 3,
    name: "Engagement",
    icon: Zap,
    logic: "Automation triggers a precision SMS/Email invite.",
    luxury: "High-speed response (under 45 seconds).",
    color: "#2E5BFF"
  },
  {
    id: 4,
    name: "Activation",
    icon: Rocket,
    logic: "Payment triggers the initialization of the LNL Vault.",
    luxury: "Seamless, white-glove onboarding.",
    color: "#9333EA"
  }
];

export default function LNLPulse() {
  const [activePhase, setActivePhase] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(() => {
        setActivePhase((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            return 1;
          }
          return prev + 1;
        });
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isSimulating]);

  const currentPhase = phases.find(p => p.id === activePhase) || phases[0];
  const IconComponent = currentPhase.icon;

  return (
    <div className="relative py-16 px-6 rounded-3xl" style={{ backgroundColor: '#050505' }}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E5BFF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#008080" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C9A86C" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M0 200 L150 200 L180 150 L250 150 L280 200 L400 200" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" />
          <path d="M400 200 L520 200 L550 250 L620 250 L650 200 L800 200" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" />
          <path d="M100 100 L100 150 L180 150" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" />
          <path d="M700 300 L700 250 L620 250" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" />
          <circle cx="180" cy="150" r="3" fill="#2E5BFF" opacity="0.6" />
          <circle cx="620" cy="250" r="3" fill="#008080" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The LNL <span className="text-[#2E5BFF]">Pulse</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch the Mechanical Heart in action. Each node represents a critical phase in your automated revenue pipeline.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-0 mb-12">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <motion.button
                onClick={() => setActivePhase(phase.id)}
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`pulse-node-${phase.id}`}
              >
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${
                    activePhase === phase.id 
                      ? 'border-transparent' 
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                  style={activePhase === phase.id ? { 
                    backgroundColor: `${phase.color}20`,
                    borderColor: phase.color,
                    boxShadow: `0 0 30px ${phase.color}40, 0 0 60px ${phase.color}20`
                  } : {}}
                  animate={activePhase === phase.id ? {
                    boxShadow: [
                      `0 0 30px ${phase.color}40, 0 0 60px ${phase.color}20`,
                      `0 0 50px ${phase.color}60, 0 0 80px ${phase.color}30`,
                      `0 0 30px ${phase.color}40, 0 0 60px ${phase.color}20`
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <phase.icon 
                    className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${
                      activePhase === phase.id ? 'text-white' : 'text-gray-400'
                    }`}
                    style={activePhase === phase.id ? { color: phase.color } : {}}
                  />
                </motion.div>
                
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  activePhase === phase.id ? 'text-white' : 'text-gray-500'
                }`}>
                  {phase.name}
                </span>
              </motion.button>

              {index < phases.length - 1 && (
                <div className="hidden md:block w-16 lg:w-24 h-[2px] mx-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2E5BFF] to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-8 backdrop-blur-xl border border-white/10"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)',
                boxShadow: `0 0 40px ${currentPhase.color}10, inset 0 0 60px rgba(0,0,0,0.3)`
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentPhase.color}20` }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: currentPhase.color }} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Phase {currentPhase.id}</span>
                  <h4 className="text-2xl font-bold text-white">{currentPhase.name}</h4>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#2E5BFF]" />
                    The Logic
                  </div>
                  <p className="text-gray-300 leading-relaxed">{currentPhase.logic}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#C9A86C]" />
                    The Luxury
                  </div>
                  <p className="text-gray-300 leading-relaxed">{currentPhase.luxury}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={() => {
              if (isSimulating) {
                setIsSimulating(false);
              } else {
                setActivePhase(1);
                setIsSimulating(true);
              }
            }}
            className="rounded-full px-8 py-6 text-lg font-semibold bg-[#2E5BFF] hover:bg-[#2E5BFF]/90 text-white border-0"
            style={{ boxShadow: '0 0 30px rgba(46, 91, 255, 0.4)' }}
            data-testid="button-run-simulation"
          >
            {isSimulating ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Run Simulation
              </>
            )}
          </Button>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h4 className="text-2xl font-bold text-white mb-4">
            A System that Scales <span className="text-[#C9A86C]">Without You</span>.
          </h4>
          <p className="text-gray-400 leading-relaxed">
            This isn't a sequence of tasks; it's an <span className="text-white font-medium">Architectural Pipeline</span>. 
            We build these systems for our clients in Raleigh, Columbus, and Moscow to ensure that while they are focused 
            on their Zone of Genius, their Mechanical Heart is busy capturing revenue and building prestige.
          </p>
        </div>
      </div>
    </div>
  );
}
