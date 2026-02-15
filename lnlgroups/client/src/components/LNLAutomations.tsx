import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Cpu, 
  Workflow, 
  Bot, 
  Zap, 
  Database, 
  Code2, 
  Sparkles 
} from "lucide-react";
import BlueprintDemo from "@/components/BlueprintDemo";

const techStack = [
  { name: "n8n", description: "Workflow Automation" },
  { name: "Replicate", description: "AI Model Inference" },
  { name: "Make", description: "Integration Hub" },
  { name: "Lovable", description: "Full-Stack AI" },
  { name: "Abacus.ai", description: "Enterprise AI" },
  { name: "Replit", description: "Cloud Development" },
];

const services = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Autonomous Agents",
    description: "Intelligent agents that handle customer support, sales outreach, and internal triage 24/7."
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Process Orchestration",
    description: "End-to-end automation pipelines connecting your CRM, ERP, and AI models seamlessly."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Intelligence",
    description: "Turn raw data into actionable insights using predictive models and semantic search."
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Custom AI Tooling",
    description: "Bespoke internal tools powered by LLMs to accelerate your team's specific workflows."
  }
];

export default function LNLAutomations() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            LNL AUTOMATIONS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Buy Back Your Time with <span className="tech-gradient-text">Custom AI Architecture</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            In high-stakes industries like Law and Home Services, 'slow' is the most expensive word in your vocabulary. We replace manual bottlenecks with 24/7 intelligent systems.
          </p>
          <div className="mt-8 flex justify-center gap-8 text-sm font-bold text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">1</span> Extraction</span>
            <span className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">2</span> Architecture</span>
            <span className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">3</span> Deployment</span>
          </div>
        </div>

        {/* Tech Stack Marquee/Grid */}
        <div className="mb-20">
          <div className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Our Technology Stack
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/50 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300"
              >
                <div className="font-bold text-lg mb-1">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blueprint Demo Section */}
        <BlueprintDemo />

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={i} className="group p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action with Modal */}
        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 animate-pulse-slow">
                <Zap className="w-5 h-5 mr-2" />
                Request Automation Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Your Demo</DialogTitle>
                <DialogDescription>
                  See how LNL Automations can transform your workflow. Fill out the form below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Alice Smith" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="alice@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interest">Interest</Label>
                  <Textarea id="interest" placeholder="I'm interested in automating..." />
                </div>
              </div>
              <Button type="submit" className="w-full">Submit Request</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}