import { LayoutGrid, Zap, Monitor, Code, Palette, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <LayoutGrid className="w-8 h-8" />,
    title: "UI/UX Design",
    desc: "Interfaces that don't just work, they dominate. Grid systems broken with purpose."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Development",
    desc: "Clean code wrapped in raw aesthetics. Performance meets punk rock."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Branding",
    desc: "Identities that scream. Logos that leave a scar. Colors that vibrate."
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Digital Products",
    desc: "From SaaS to mobile apps, we build tools that people actually want to use."
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Art Direction",
    desc: "Curated visuals. Photography. Illustration. The soul of the machine."
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Strategy",
    desc: "We don't guess. We research, we attack, we conquer market share."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">OUR SERVICES</h2>
          <div className="h-2 w-32 bg-secondary"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="brutal-card group hover:bg-accent transition-colors duration-300"
            >
              <div className="bg-black text-white w-16 h-16 flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-lg font-medium opacity-80">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}