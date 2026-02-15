import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact-section" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="glass-panel p-10 md:p-14 rounded-3xl max-w-5xl mx-auto overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6 tracking-tight">Let's architect your growth.</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Ready to build a resilient digital ecosystem? Initiate a strategic consultation with our team.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">Direct Line</h4>
                  <p className="text-muted-foreground">hello@lnlgroups.com</p>
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