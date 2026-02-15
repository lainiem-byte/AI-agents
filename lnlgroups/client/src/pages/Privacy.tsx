import Navbar from "@/components/Navbar";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last Updated: January 8, 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              At <strong>LNL Group</strong>, we treat your data with the same precision and respect we apply to your business architecture. This Privacy Policy describes how LNL Group, LNL Creative, and LNL Automations (collectively, "LNL," "we," "us," or "our") collect, use, and protect your information.
            </p>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">We collect information necessary to architect your growth, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>Contact Data:</strong> Name, email, and phone number provided via our Discovery Questionnaire.</li>
                <li><strong>Business Intelligence:</strong> Data shared during the Brand-Mining process, including revenue ranges, market locations, and internal bottlenecks.</li>
                <li><strong>The LNL Vault Assets:</strong> Professional photography, video b-roll, and credentials provided for the Digital Facelift.</li>
                <li><strong>Technical Data:</strong> IP addresses and usage patterns collected via our AI Chatbots and website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">2. How We Use Your Logic</h2>
              <p className="text-gray-300 mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Perform Aesthetic Audits and Logic Mapping.</li>
                <li>Develop and maintain your Mechanical Heart (Automations).</li>
                <li>Train your proprietary Master Brain (AI Agents).</li>
                <li>Communicate updates and Weekly Scorecards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">3. Data Security & The Vault</h2>
              <p className="text-gray-300">
                We utilize high-level encryption and secure "Logic-Gates" to protect your assets. Access to The LNL Vault is restricted to essential personnel and authorized AI agents. We do not sell your data to third parties; we only use it to increase your business equity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-4">4. Third-Party Integrations</h2>
              <p className="text-gray-300">
                Our automations utilize trusted platforms (such as n8n, Replit, HubSpot, Hostinger, Abacus.AI, MAKE, and Typebot.) Your data is subject to the security protocols of these partners as part of your Custom Architecture.
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
