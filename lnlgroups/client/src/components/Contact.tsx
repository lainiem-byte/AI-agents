import ContactForm from "@/components/ContactForm";

function getSiteDomain() {
  if (typeof window === "undefined") return "group";
  const h = window.location.hostname.toLowerCase();
  if (h.includes("lnlcreatives")) return "creatives";
  if (h.includes("lnlautomations")) return "automations";
  return "group";
}

const SITE_CONTACT = {
  creatives: {
    heading: "Book Your Brand Audit",
    subtext: "Ready to close the Brand Gap and stop leaving premium revenue on the table? Let's extract your brand's DNA.",
    email: "hello@lnlcreatives.com",
  },
  automations: {
    heading: "Book Your Automation Audit",
    subtext: "Ready to kill the Manual Tax and reclaim your team's hours? Let's map your automation opportunities.",
    email: "hello@lnlautomations.com",
  },
  group: {
    heading: "Book Your Revenue Leakage Audit",
    subtext: "Ready to build a resilient digital ecosystem? Initiate a strategic consultation with our team.",
    email: "hello@lnlgroups.com",
  },
};

export default function Contact() {
  const site = getSiteDomain();
  const copy = SITE_CONTACT[site];

  return (
    <section id="contact-section" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="glass-panel p-10 md:p-14 rounded-3xl max-w-5xl mx-auto overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6 tracking-tight">{copy.heading}</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                {copy.subtext}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">Direct Line</h4>
                  <p className="text-muted-foreground">{copy.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Headquarters</h4>
                  <p className="text-muted-foreground">3911 Cleveland Ave<br/>San Diego, CA 92103</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
