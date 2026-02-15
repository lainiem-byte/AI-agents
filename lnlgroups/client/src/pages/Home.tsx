import Navbar from "@/components/Navbar";
import HubHero from "@/components/HubHero";
import TheFace from "@/components/TheFace";
import TheBrain from "@/components/TheBrain";
import TheEcosystem from "@/components/TheEcosystem";
import Contact from "@/components/Contact";
import { ThemeProvider } from "next-themes";
import { Link } from "wouter";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main>
          <HubHero />
          <TheFace />
          <TheBrain />
          <TheEcosystem />
          <Contact />
        </main>
        
        <footer className="py-16 border-t border-white/10" style={{ backgroundColor: '#1A1A1D' }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <h4 className="text-lg font-bold text-white mb-4">The LNL Group</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-4">
                  Identity & Intelligence for the Modern Enterprise. Bridging visual authority with automated logic.
                </p>
                <p className="text-gray-500 text-xs">
                  3911 Cleveland Ave<br/>San Diego, CA 92103
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Services</h4>
                <div className="space-y-2">
                  <Link href="/creatives" className="block text-gray-400 text-sm hover:text-[#008080] transition-colors">LNL Creative</Link>
                  <Link href="/automations" className="block text-gray-400 text-sm hover:text-[#2E5BFF] transition-colors">LNL Automations</Link>
                  <Link href="/about" className="block text-gray-400 text-sm hover:text-lnl-gold transition-colors">About Lainie</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Local Service Areas</h4>
                <div className="space-y-2">
                  <Link href="/raleigh" className="block text-gray-400 text-sm hover:text-lnl-gold transition-colors">Raleigh, NC</Link>
                  <Link href="/columbus" className="block text-gray-400 text-sm hover:text-lnl-gold transition-colors">Columbus, OH</Link>
                  <Link href="/moscow" className="block text-gray-400 text-sm hover:text-lnl-gold transition-colors">Moscow, ID</Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 pt-8 border-t border-white/10">
              <p className="font-medium">Serving: Raleigh, NC | Columbus, OH | Moscow, ID</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
            <div className="text-center text-xs text-gray-600 pt-6">
              <p>© 2026 The LNL Group. All AI solutions built by LNL Group adhere to strict Data Sovereignty protocols.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}