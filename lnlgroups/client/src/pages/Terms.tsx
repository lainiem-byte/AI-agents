import Navbar from "@/components/Navbar";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last Updated: January 8, 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              By engaging with <strong>LNL Group</strong>, you agree to the following terms governing our Growth Architecture services.
            </p>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">1. Services Provided</h2>
              <p className="text-gray-300">
                LNL Group provides strategic consulting, creative asset extraction (LNL Creative), and automated system builds (LNL Automations). Each project is governed by the specific Service Tier (Concierge, Engine, or Enterprise) selected during activation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">2. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>Mined Assets:</strong> Any creative content produced specifically for the Client (e.g., social posts, website copy) belongs to the Client upon final payment.</li>
                <li><strong>The Framework:</strong> The underlying "Logic," custom n8n workflows, and proprietary AI prompting structures created by LNL remain the intellectual property of LNL Group. Clients are granted a non-transferable license to use these systems for their internal operations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">3. Client Responsibilities</h2>
              <p className="text-gray-300">
                To maintain Luxury standards, Clients must provide timely access to assets via The LNL Vault. Delays in asset delivery may result in a "Logic Stall," delaying the project timeline.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">4. Fees & Investments</h2>
              <p className="text-gray-300">
                Service Tiers are billed as recurring monthly investments. LNL Group requires 30 days' notice for the cancellation of any Engine or Enterprise tier services to allow for the safe decommissioning of automated systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">5. Disclaimer of Results</h2>
              <p className="text-gray-300">
                While our Mechanical Heart systems are designed to maximize efficiency and prestige, LNL Group does not guarantee specific revenue targets. Growth is a collaborative architecture between LNL logic and Client execution.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 The LNL Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
