import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    category: "Fintech",
    title: "Nova Banking App",
    description: "Redesigning the mobile banking experience for 2M+ users."
  },
  {
    category: "Healthcare",
    title: "MediSync Platform",
    description: "AI-powered patient data management system."
  },
  {
    category: "E-Commerce",
    title: "Luxe Retail",
    description: "Global omnichannel architecture for luxury fashion."
  }
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Work</h2>
             <p className="text-muted-foreground text-lg max-w-xl">We partner with industry leaders to build products that matter.</p>
          </div>
          <Button variant="outline" className="rounded-full">View All Projects</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-muted rounded-2xl mb-6 overflow-hidden relative">
                 {/* Placeholder for project image - utilizing simple gradients for abstract look */}
                 <div className={`absolute inset-0 bg-gradient-to-br ${i === 0 ? 'from-blue-500/20 to-purple-500/20' : i === 1 ? 'from-emerald-500/20 to-teal-500/20' : 'from-orange-500/20 to-red-500/20'} group-hover:scale-105 transition-transform duration-700`}></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-background/80 backdrop-blur-md rounded-full p-4">
                      <ArrowUpRight className="h-6 w-6 text-foreground" />
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{p.category}</p>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}