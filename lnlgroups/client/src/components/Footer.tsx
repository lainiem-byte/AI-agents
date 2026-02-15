import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-6xl font-bold mb-8 text-primary">LET'S BUILD <br/> THE FUTURE.</h2>
            <p className="text-xl mb-8 max-w-md">Ready to disrupt your industry? Send us a signal. We respond within 24 hours.</p>
            
            <div className="flex gap-4 text-2xl font-bold">
            </div>
          </div>
          
          <div className="bg-white text-black p-8 border-2 border-primary shadow-[8px_8px_0px_0px_var(--color-primary)]">
            <form className="space-y-6">
              <div>
                <label className="block font-bold uppercase mb-2">Name</label>
                <Input className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-secondary bg-gray-50" placeholder="JOHN DOE" />
              </div>
              <div>
                <label className="block font-bold uppercase mb-2">Email</label>
                <Input className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-secondary bg-gray-50" placeholder="HELLO@EXAMPLE.COM" />
              </div>
              <div>
                <label className="block font-bold uppercase mb-2">Message</label>
                <Textarea className="border-2 border-black rounded-none min-h-[120px] text-lg focus-visible:ring-0 focus-visible:border-secondary bg-gray-50" placeholder="TELL US ABOUT YOUR PROJECT..." />
              </div>
              <Button className="w-full brutal-btn bg-black text-white hover:bg-black/90 hover:text-primary h-14 text-xl">
                SEND MESSAGE
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-sm font-mono opacity-60">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="font-medium">Serving: Raleigh, NC | Columbus, OH | Moscow, ID</p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
          <p className="text-center text-xs opacity-80">© 2026 The LNL Group. All AI solutions built by LNL Group adhere to strict Data Sovereignty protocols.</p>
        </div>
      </div>
    </footer>
  );
}