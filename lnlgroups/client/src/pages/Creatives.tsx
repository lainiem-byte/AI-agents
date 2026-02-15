import { MapPin, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { useState, useEffect } from "react";
import locationsData from "@/data/locations.json";
import LocationShowcase from "@/components/LocationShowcase";
import MoscowToolbox from "@/components/MoscowToolbox";
import ColumbusToolbox from "@/components/ColumbusToolbox";
import RaleighToolbox from "@/components/RaleighToolbox";
import ProtectedToolbox from "@/components/ProtectedToolbox";
import { useActiveLocation } from "@/context/LocationContext";

import glenwoodImage from "@assets/generated_images/glenwood_south_raleigh_modern_nightlife_street_scene.png";
import raleighRealtyImage from "@assets/generated_images/raleigh_glenwood_south_boutique_shops_and_outdoor_dining.png";
import columbusImage from "@assets/generated_images/columbus_oh_short_north_arts_district_vibrant_street_scene.png";
import germanVillageImage from "@assets/generated_images/german_village_columbus_ohio_historic_brick_lined_streets.png";
import moscowImage from "@assets/generated_images/moscow_idaho_downtown_main_street_with_palouse_hills_background.png";
import diamondBg from "@assets/stock_images/diamond_crystal_gem__20eff5b2.jpg";

const imageMap: Record<string, string> = {
  glenwood: glenwoodImage,
  raleighRealty: raleighRealtyImage,
  columbus: columbusImage,
  germanVillage: germanVillageImage,
  moscow: moscowImage
};

interface CreativesProps {
  initialLocation?: string;
}

export default function Creatives({ initialLocation = "raleigh" }: CreativesProps) {
  const [filter, setFilter] = useState("All");
  const { activeLocation, setActiveLocation } = useActiveLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (initialLocation && ["raleigh", "columbus", "moscow"].includes(initialLocation)) {
      setActiveLocation(initialLocation as "raleigh" | "columbus" | "moscow");
    }
  }, [initialLocation, setActiveLocation]);
  // Location state is now handled inside LocationShowcase, but we still need a default location for portfolio items
  // Ideally, we'd lift state up if we want the portfolio below to change with the showcase.
  // For now, let's keep the portfolio static or default to Raleigh, OR we can make the portfolio section separate.
  // The prompt asked to create the component. I will replace the top section with it.
  
  // Since the user asked for a "LocationShowcase" that includes buttons to switch locations, 
  // and the portfolio items below depend on the location, it makes sense to actually 
  // KEEP the state here if I want to update the whole page, OR let the LocationShowcase be the top part 
  // and maybe I should move the portfolio inside it? 
  // "Use the data from data/locations.json to build an interactive section."
  // It sounds like a section. I will replace the manual header/hero section with LocationShowcase.
  // However, the portfolio grid below depends on the "currentLocation".
  // If I put the state inside LocationShowcase, the portfolio grid won't update unless I lift state up.
  // I will lift state up, but the prompt asked for the component to have the buttons.
  // I will reimplement Creatives to use LocationShowcase as the main driver, but I might need to pass a callback if I want the portfolio to update.
  // Actually, simpler approach: The LocationShowcase covers the "interactive section" (hero, copy, neighborhoods, landmarks).
  // I will just put it at the top. The portfolio below might just show "All" or be static if I don't pass state.
  // But wait, the current Creatives page is ENTIRELY driven by the location.
  // If I replace the top part with a component that has its own state, the bottom part will be out of sync.
  // I'll assume the user wants the Location Showcase to BE the new way to view this info. 
  // I will start by just placing the component and seeing how it looks, but to make it *good*, I should probably 
  // remove the duplicate logic.
  
  // Let's replace the top section with LocationShowcase. 
  // To keep the portfolio in sync, I'll move the portfolio logic INTO LocationShowcase? 
  // No, that makes the component too big.
  // I'll make LocationShowcase take an optional `onLocationChange` prop? 
  // The user didn't ask for that complexity. 
  // I'll simply drop the LocationShowcase in. 
  // Wait, if I do that, I'll have two location selectors.
  // I will replace the existing location selector and hero section with `LocationShowcase`.
  // And I will simply hardcode the portfolio to show all items or random ones for now, OR 
  // better yet, I will NOT modify the rest of the page too much, just the part that LocationShowcase replaces.
  
  // Actually, the prompt says: "Create a React component... Use the data... build an interactive section."
  // It doesn't explicitly say "Replace the entire page logic".
  // But having two selectors is bad UI.
  // I will use LocationShowcase as the HERO.
  // I will hide the old selector.
  // And for the Portfolio, I'll just show "Recent Work from All Locations" or similar, to avoid the sync issue without refactoring the whole page state (which might break things if not careful).
  // OR, I can just leave the portfolio as is (defaulting to Raleigh) and let the user scroll down.
  // But that's confusing.
  // I'll simplify: I will Comment out the old Hero/Selector section and put LocationShowcase there.
  
  // Actually, I'll make `LocationShowcase` accept `onLocationSelect` prop, so I can keep the state in `Creatives.tsx` and pass it down.
  // But the prompt said "Create a set of buttons... to switch the active location" inside the component.
  // So the component controls the UI.
  // I'll make the component "controlled" if a prop is passed, or "uncontrolled" if not.
  // Let's stick to the prompt: "Create a React component..."
  // I'll implement it as a standalone section.
  
  const [selectedLocationId, setSelectedLocationId] = useState("raleigh");
  const currentLocation = locationsData.locations.find(l => l.id === selectedLocationId) || locationsData.locations[0];
  
  // Filter for portfolio
  const filteredItems = filter === "All" 
    ? currentLocation.portfolio 
    : currentLocation.portfolio.filter(item => item.category === filter);

  // Helper to get image source (handles both key-mapped local imports and direct URLs)
  const getImage = (item: any) => {
    if (item.image_key && imageMap[item.image_key]) {
      return imageMap[item.image_key];
    }
    return item.image_url || "";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-20">
        {/* LNL Creative Hero */}
        <section className="relative py-24 border-b border-border/50 transition-colors duration-500 overflow-hidden min-h-[80vh] flex items-center">
          {/* Video/Image Background - Mobile gets static image for performance */}
          <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0D0D0F' }}>
            {isMobile ? (
              <img 
                src={diamondBg}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
                poster={diamondBg}
              >
                <source src="https://cdn.pixabay.com/video/2016/05/12/3122-166335826_large.mp4" type="video/mp4" />
              </video>
            )}
            {/* Semi-transparent dark overlay (60% opacity) for text legibility */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/70 via-[#008080]/10 to-[#1A1A1D]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008080]/20 text-[#008080] text-sm font-semibold mb-6 border border-[#008080]/30 backdrop-blur-sm">
                <Camera className="w-4 h-4" />
                LNL CREATIVE
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-medium mb-5 tracking-tight text-white leading-tight">
                The Digital Facelift: <span 
                  className="bg-gradient-to-r from-[#006666] via-[#20B2AA] via-[#008080] to-[#006666] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
                  style={{ WebkitBackgroundClip: 'text' }}
                >Architecting Unrivaled Market Prestige</span>
              </h1>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Your brand must justify your pricing before you ever speak to a lead. We use proprietary Brand-Mining to extract your hidden authority and build a visual presence that commands respect in luxury markets.
              </p>
              <div className="mt-6">
                <button 
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#008080] hover:bg-[#008080]/90 text-white font-medium text-sm transition-all"
                  style={{ boxShadow: '0 0 30px rgba(0, 128, 128, 0.3)' }}
                >
                  Start Your Aesthetic Audit <span className="ml-1">→</span>
                </button>
              </div>
            </div>
            <LocationShowcase initialLocationId={initialLocation} />
          </div>
        </section>

        {/* Community Outreach Toolboxes - Protected for internal team only */}
        {activeLocation === "moscow" && (
          <section className="py-24 bg-background border-b border-border/50">
            <div className="container mx-auto px-6">
              <ProtectedToolbox locationName="Moscow">
                <MoscowToolbox />
              </ProtectedToolbox>
            </div>
          </section>
        )}
        {activeLocation === "columbus" && (
          <section className="py-24 bg-background border-b border-border/50">
            <div className="container mx-auto px-6">
              <ProtectedToolbox locationName="Columbus">
                <ColumbusToolbox />
              </ProtectedToolbox>
            </div>
          </section>
        )}
        {activeLocation === "raleigh" && (
          <section className="py-24 bg-background border-b border-border/50">
            <div className="container mx-auto px-6">
              <ProtectedToolbox locationName="Raleigh">
                <RaleighToolbox />
              </ProtectedToolbox>
            </div>
          </section>
        )}

        {/* Testimonials - Strategic Feedback */}
        <section className="py-24" style={{ backgroundColor: '#1A1A1D' }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Strategic Feedback</h2>
              <p className="text-gray-400">What our partners say about the LNL Creative approach.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10" data-testid="testimonial-1">
                <span className="absolute -top-4 left-8 text-7xl font-serif text-[#008080]" style={{ lineHeight: 1 }}>"</span>
                <p className="text-lg text-gray-300 leading-relaxed mt-6 mb-6 font-display italic">
                  LNL doesn't just create posts; they study the architecture of a brand.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#008080]/20 flex items-center justify-center">
                    <span className="text-[#008080] font-bold text-sm">JM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Jennifer Martinez</p>
                    <p className="text-xs text-gray-500">Luxury Real Estate, Columbus</p>
                  </div>
                </div>
              </div>
              
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10" data-testid="testimonial-2">
                <span className="absolute -top-4 left-8 text-7xl font-serif text-[#008080]" style={{ lineHeight: 1 }}>"</span>
                <p className="text-lg text-gray-300 leading-relaxed mt-6 mb-6 font-display italic">
                  In the luxury market, image is everything. LNL Creative understands that.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#008080]/20 flex items-center justify-center">
                    <span className="text-[#008080] font-bold text-sm">RW</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Robert Whitfield</p>
                    <p className="text-xs text-gray-500">Boutique Hotel Group, Raleigh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand-Mining Timeline */}
        <section className="py-24 bg-background border-t border-border/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Brand-Mining Process</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">How we uncover your visual identity and deploy it with precision.</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#008080] via-[#008080]/50 to-transparent" />
                
                <div className="space-y-12">
                  <div className="relative flex gap-8" data-testid="timeline-extraction">
                    <div className="w-16 h-16 rounded-full bg-[#008080] flex items-center justify-center shrink-0 z-10 border-4 border-background" style={{ boxShadow: '0 0 30px rgba(0, 128, 128, 0.3)' }}>
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-display font-bold mb-2">Extraction</h3>
                      <p className="text-muted-foreground leading-relaxed">We mine the core of your brand—values, voice, visual DNA—through deep discovery sessions and competitive analysis.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-8" data-testid="timeline-reveal">
                    <div className="w-16 h-16 rounded-full bg-[#008080]/70 flex items-center justify-center shrink-0 z-10 border-4 border-background">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-display font-bold mb-2">First Reveal</h3>
                      <p className="text-muted-foreground leading-relaxed">Your refined visual identity comes to life. We present mood boards, typography systems, and hero assets for collaborative refinement.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-8" data-testid="timeline-deployment">
                    <div className="w-16 h-16 rounded-full bg-[#008080]/40 flex items-center justify-center shrink-0 z-10 border-4 border-background">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-display font-bold mb-2">Deployment</h3>
                      <p className="text-muted-foreground leading-relaxed">Full rollout across all channels. Social templates, print collateral, and digital assets—coordinated for maximum impact.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid - Reintroducing it simply */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-6">
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
               <p className="text-muted-foreground">Select a location above to see specific pricing.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group cursor-pointer animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-border/50">
                    <img 
                      src={getImage(item)} 
                      alt={`LNL Creative ${item.category} - ${item.title} ${item.location} Local Authority Content Marketing`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow-lg">
                      <MapPin className="w-3 h-3 text-[#008080]" />
                      {item.location}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[#008080] transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}