import { motion } from "framer-motion";
import { Camera, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    id: "creative",
    title: "LNL Creative & Aesthetics",
    icon: Camera,
    color: "#008080",
    questions: [
      {
        q: 'What exactly is "Brand-Mining"?',
        a: 'Brand-Mining is our proprietary process for uncovering the "hidden gems" in your business history, personality, and expertise. We don\'t just create content; we extract the unique assets you already have and polish them into high-performing marketing pillars.',
      },
      {
        q: 'What is a "Digital Facelift"?',
        a: "A Digital Facelift is a comprehensive overhaul of your online visual identity. We ensure that your website, social media, and digital touchpoints all reflect a \"Luxury\" standard that matches the quality of your actual services.",
      },
      {
        q: "What if I don't have any professional photos or videos?",
        a: "That is exactly what Pillar 1: Asset Extraction is for. We audit what you have and provide a roadmap for what we need to \"mine.\" We can work with raw footage, existing portfolios, or guide you through a strategic shoot to get the high-end assets required.",
      },
    ],
  },
  {
    id: "automations",
    title: "LNL Automations & Logic",
    icon: Zap,
    color: "#2E5BFF",
    questions: [
      {
        q: 'What do you mean by the "Mechanical Heart"?',
        a: 'The "Mechanical Heart" refers to the automated systems that keep your business running while you sleep. This includes lead capture, automated follow-ups, and CRM integrations that ensure no lead ever falls through the cracks.',
      },
      {
        q: "Which CRMs or tools do you work with?",
        a: 'We are "Custom Architects," meaning we are tool-agnostic. However, we specialize in high-performance integrations with platforms like GoHighLevel, HubSpot, Salesforce, and luxury-specific tools for Med Spas and Real Estate.',
      },
      {
        q: "Will AI replace my current staff?",
        a: 'No. Our "Logic" is designed to empower your staff. By automating the 80% of repetitive tasks (like scheduling and basic FAQs), your team can focus on the 20% of high-value human interaction that actually closes deals.',
      },
    ],
  },
  {
    id: "general",
    title: "The LNL Group",
    icon: Building2,
    color: "#C9A86C",
    questions: [
      {
        q: "Do you only work with Med Spas and Realtors?",
        a: "While we have deep roots in the Med Spa and Real Estate sectors, our L&L Method is industry-agnostic. We solve for Complexity. If your business requires high-end branding and a sophisticated lead-to-client lifecycle, our \"Custom Architecture\" will work for you.",
      },
      {
        q: "How do I know which tier (Concierge, Engine, Enterprise) I need?",
        a: "Concierge is for those who need a heavy focus on brand aesthetics and content. The Engine is for growing businesses that need robust lead-gen systems. Enterprise is for large-scale operations requiring custom AI builds and multi-market scaling.",
      },
      {
        q: "How long does it take to see results?",
        a: 'We aim for "Quick Wins" within the first 30 days by optimizing your current lead flow (Logic). The full "Digital Facelift" (Luxury) typically takes 6\u20138 weeks to fully implement across all platforms.',
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-lnl-gold/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 leading-tight">
              <span className="text-white">Frequently Asked</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lnl-violet via-lnl-cyan to-lnl-gold">
                Questions
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about how LNL Group builds premium
              brands and automated revenue systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <category.icon
                    className="w-5 h-5"
                    style={{ color: category.color }}
                  />
                </div>
                <h2 className="text-2xl font-display font-medium text-white">
                  {category.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`${category.id}-${qIndex}`}
                    className="border border-white/10 rounded-xl px-6 overflow-hidden bg-card/30 backdrop-blur-sm hover:border-white/20 transition-colors"
                  >
                    <AccordionTrigger className="text-base font-medium text-white hover:no-underline hover:text-lnl-gold py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-lnl-violet/10 via-background to-lnl-cyan/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-medium mb-6">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's talk about your specific needs. Our team is ready to design
              a Custom Architecture for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-lnl-violet hover:bg-lnl-violet/90 text-white px-8 py-6 text-lg rounded-full">
                  Schedule a Strategy Call
                </Button>
              </Link>
              <Link href="/audit">
                <Button
                  variant="outline"
                  className="border-lnl-gold/30 hover:bg-lnl-gold/10 text-lnl-gold px-8 py-6 text-lg rounded-full"
                >
                  Take the Free Audit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
