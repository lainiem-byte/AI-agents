import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Database, 
  Workflow, 
  Image as ImageIcon, 
  Check,
  Cpu,
  ArrowRight,
  Code2,
  Terminal,
  Map
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for the steps
type WorkflowStep = {
  id: number;
  label: string;
  icon: React.ElementType;
  description: string;
  codeSnippet: string;
};

const steps: WorkflowStep[] = [
  {
    id: 1,
    label: "Scanning Demographics",
    icon: Database,
    description: "Analyzing local market data via vector DB",
    codeSnippet: `// Step 1: Query Vector Database
const demographics = await vectorDB.query({
  location: "Raleigh, NC",
  radius: "10mi",
  intent: "luxury_real_estate"
});
console.log("Found " + demographics.cluster_size + " target profiles");`
  },
  {
    id: 2,
    label: "Extracting Landmarks",
    icon: Map,
    description: "Identifying high-value visual anchors",
    codeSnippet: `// Step 2: Semantic Analysis
const landmarks = await visionAI.extract({
  source: demographics.visual_context,
  filter: ["iconic_buildings", "street_art", "parks"]
});
const priority = landmarks.sort((a,b) => b.relevance - a.relevance)[0];
// Selected: "The Dillon Building"`
  },
  {
    id: 3,
    label: "Optimizing Prompt",
    icon: Code2,
    description: "Engineering context-aware Flux.1 prompts",
    codeSnippet: `// Step 3: Prompt Engineering
const prompt = \`Architectural photography of \${priority.name} in Raleigh, 
golden hour lighting, cinematic composition, f/8 aperture, 
context: \${demographics.vibe_keywords.join(", ")}\`;
// Ready for inference`
  },
  {
    id: 4,
    label: "Generating Assets",
    icon: ImageIcon,
    description: "Executing Flux.1 [Schnell] Inference",
    codeSnippet: `// Step 4: Replicate API Call
const output = await replicate.run(
  "black-forest-labs/flux-schnell",
  { input: { prompt: prompt, num_inference_steps: 4 } }
);
return { url: output[0], metadata: { ... } };`
  }
];

type TargetMarket = {
  city: string;
  neighborhoods: string[];
  hashtags: string[];
};

const defaultMarkets: Record<string, TargetMarket> = {
  raleigh: {
    city: "Raleigh, NC",
    neighborhoods: ["Glenwood South", "North Hills", "Downtown Durham"],
    hashtags: ["#RaleighRising", "#TriangleTech", "#GlenwoodSouthLife"]
  },
  columbus: {
    city: "Columbus, OH",
    neighborhoods: ["Short North", "German Village", "Clintonville"],
    hashtags: ["#CbusSmallBiz", "#ShortNorthArts", "#GermanVillageCharm"]
  },
  moscow: {
    city: "Moscow, ID",
    neighborhoods: ["Main Street", "The Palouse", "University District"],
    hashtags: ["#MoscowIdaho", "#PalouseLife", "#ShopLocalMoscow"]
  }
};

interface BlueprintDemoProps {
  targetMarketId?: string;
}

export default function BlueprintDemo({ targetMarketId = "raleigh" }: BlueprintDemoProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const targetMarket = defaultMarkets[targetMarketId] || defaultMarkets.raleigh;
  
  // Reset demo
  const resetDemo = () => {
    setActiveStep(null);
    setIsSimulating(false);
    setCompleted(false);
  };

  // Simulation logic
  useEffect(() => {
    if (!isSimulating) return;

    let current = 0;
    const runStep = () => {
      if (current >= steps.length) {
        setCompleted(true);
        setIsSimulating(false);
        return;
      }

      setActiveStep(current + 1); // 1-based index
      
      // Delay for next step
      setTimeout(() => {
        current++;
        runStep();
      }, 1500);
    };

    runStep();

    return () => {
      // Cleanup handled implicitly by state check in timeout
    };
  }, [isSimulating]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-2 font-display">Technical Blueprint: Automated Asset Pipeline</h3>
        <p className="text-muted-foreground text-sm">Architecture: n8n Orchestration → Vector Retrieval → Replicate (Flux.1)</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className="text-xs font-mono bg-lnl-cyan/10 text-lnl-cyan px-3 py-1 rounded-full border border-lnl-cyan/20">
            Target Market: {targetMarket.city}
          </span>
          {targetMarket.hashtags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#1A1A1D] border border-lnl-cyan/20 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lnl-cyan/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lnl-cyan/20 bg-lnl-cyan/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-lnl-cyan" />
            <span className="font-mono text-sm font-bold text-lnl-cyan">lnl_pipeline_v2.0.js</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {isSimulating ? 'Processing' : completed ? 'Complete' : 'Ready'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Flow Visualization */}
          <div className="p-8 border-r border-lnl-cyan/10 relative min-h-[400px]">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
             
             <div className="space-y-6 relative z-10">
               {steps.map((step, index) => {
                 const isActive = activeStep === step.id;
                 const isDone = (activeStep || 0) > step.id || completed;
                 
                 return (
                   <div key={step.id} className="relative pl-12">
                     {/* Connector Line */}
                     {index !== steps.length - 1 && (
                       <div className={cn(
                         "absolute left-[19px] top-8 w-0.5 h-12 transition-colors duration-500",
                         isDone ? "bg-lnl-cyan" : "bg-muted"
                       )}></div>
                     )}
                     
                     {/* Step Indicator */}
                     <div className={cn(
                       "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-20",
                       isActive ? "border-lnl-cyan bg-lnl-cyan/20 text-lnl-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110" :
                       isDone ? "border-lnl-cyan bg-lnl-cyan text-black scale-100" :
                       "border-muted bg-background text-muted-foreground"
                     )}>
                       {isDone ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                     </div>
                     
                     {/* Text Content */}
                     <div className={cn(
                       "transition-all duration-300",
                       isActive ? "opacity-100 translate-x-2" : isDone ? "opacity-80" : "opacity-40"
                     )}>
                       <h4 className={cn("font-bold text-sm", isActive && "text-lnl-cyan")}>{step.label}</h4>
                       <p className="text-xs text-muted-foreground">{step.description}</p>
                     </div>
                   </div>
                 );
               })}
             </div>
             
             <div className="mt-12">
                {!isSimulating && !completed && (
                  <Button 
                    onClick={() => setIsSimulating(true)} 
                    className="w-full bg-lnl-cyan hover:bg-lnl-cyan/80 text-black font-bold"
                  >
                    <Cpu className="w-4 h-4 mr-2" /> Simulate AI Workflow
                  </Button>
                )}
                
                {completed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg mb-4 text-green-500 text-sm flex items-center gap-2">
                       <Check className="w-4 h-4" /> Assets Generated Successfully
                    </div>
                    <Button 
                      onClick={resetDemo} 
                      variant="outline" 
                      className="w-full border-lnl-cyan/30 hover:bg-lnl-cyan/10 text-lnl-cyan"
                    >
                      Run New Simulation
                    </Button>
                  </motion.div>
                )}
             </div>
          </div>

          {/* Code Terminal Display */}
          <div className="bg-[#050505] p-6 font-mono text-xs overflow-hidden flex flex-col">
             <div className="flex-1 overflow-y-auto pr-2 space-y-4">
               <AnimatePresence mode="popLayout">
                 {activeStep ? (
                   <motion.div
                     key={activeStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="text-lnl-cyan mb-2 font-bold">// Executing Block {activeStep}: {steps[activeStep-1].label}</div>
                     <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                       {steps[activeStep-1].codeSnippet}
                     </pre>
                     <div className="mt-4 flex gap-2">
                       <span className="animate-pulse w-2 h-4 bg-lnl-cyan inline-block"></span>
                     </div>
                   </motion.div>
                 ) : completed ? (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-green-500"
                   >
                     // PIPELINE EXECUTION COMPLETE
                     <br/>
                     // 4 Assets Generated
                     <br/>
                     // Stored in: s3://lnl-assets/raleigh/flux-gen-2025
                     <br/>
                     <span className="animate-pulse">_</span>
                   </motion.div>
                 ) : (
                   <div className="text-muted-foreground opacity-50 flex items-center justify-center h-full">
                     [Waiting for initialization...]
                   </div>
                 )}
               </AnimatePresence>
             </div>
             
             {/* Terminal Footer */}
             <div className="mt-6 pt-4 border-t border-white/5 text-xs text-muted-foreground flex justify-between">
               <span>Flux.1 [Schnell] Model</span>
               <span>{targetMarket.neighborhoods[0]} | Latency: 1.2s</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
