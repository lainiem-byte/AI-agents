import { BarChart3, Layers, Cloud, Lock, Zap, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Strategic Consulting",
    description: "Data-driven insights to guide your digital transformation journey."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "System Architecture",
    description: "Building scalable, resilient infrastructure for enterprise needs."
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Solutions",
    description: "Seamless migration and management of cloud-native environments."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Cybersecurity",
    description: "Advanced threat protection and security compliance auditing."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Product Design",
    description: "User-centric interface design that drives engagement and conversion."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Augmentation",
    description: "Top-tier engineering talent integrated directly into your workflows."
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 tracking-tight">Our Expertise</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Comprehensive solutions tailored for modern business challenges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Card key={i} className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <CardTitle className="text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {s.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}