import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Store, Camera, TrendingUp, ChevronRight, ArrowRight, Check, Smartphone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import locationsData from "@/data/locations.json";
import { useActiveLocation } from "@/context/LocationContext";

// Import images
import glenwoodImage from "@assets/generated_images/glenwood_south_raleigh_modern_nightlife_street_scene.png";
import raleighRealtyImage from "@assets/generated_images/raleigh_glenwood_south_boutique_shops_and_outdoor_dining.png";
import columbusImage from "@assets/generated_images/columbus_oh_short_north_arts_district_vibrant_street_scene.png";
import germanVillageImage from "@assets/generated_images/german_village_columbus_ohio_historic_brick_lined_streets.png";
import moscowImage from "@assets/generated_images/moscow_idaho_downtown_main_street_with_palouse_hills_background.png";

const imageMap: Record<string, string> = {
  glenwood: glenwoodImage,
  raleighRealty: raleighRealtyImage,
  columbus: columbusImage,
  germanVillage: germanVillageImage,
  moscow: moscowImage
};

const seoData: Record<string, { title: string; description: string; keywords: string; schemaAddress: string }> = {
  raleigh: {
    title: "LNL Group | Raleigh NC AI Automations & Content",
    description: "LNL Group delivers AI-powered content automation and local authority marketing for Raleigh-Durham businesses. Glenwood South, North Hills, and Downtown Durham specialists.",
    keywords: "AI Automation Architect, Local Authority Content Raleigh, Raleigh Marketing, Glenwood South Content, Durham Social Media, Triangle Tech Marketing",
    schemaAddress: "Raleigh, NC 27601, USA"
  },
  columbus: {
    title: "LNL Group | Columbus OH AI Automations & Content",
    description: "LNL Group provides AI-driven content automation and institutional authority marketing for Columbus businesses. Short North, German Village, and The Peninsula experts.",
    keywords: "AI Automation Architect, Local Authority Content Columbus, Columbus Marketing, German Village Content, Short North Social Media, Ohio Marketing Agency",
    schemaAddress: "Columbus, OH 43215, USA"
  },
  moscow: {
    title: "LNL Group | Moscow ID AI Automations & Content",
    description: "LNL Group offers AI content automation and community-focused marketing for Moscow, Idaho businesses. Main Street, Palouse, and University District specialists.",
    keywords: "AI Automation Architect, Local Authority Content Moscow Idaho, Moscow ID Marketing, Palouse Content, University of Idaho Marketing",
    schemaAddress: "Moscow, ID 83843, USA"
  }
};

function useDynamicSEO(locationId: string, locationData: typeof locationsData.locations[0]) {
  useEffect(() => {
    const seo = seoData[locationId] || seoData.raleigh;
    
    document.title = seo.title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', seo.description);
    updateMeta('keywords', seo.keywords);
    updateMeta('og:title', seo.title, true);
    updateMeta('og:description', seo.description, true);
    updateMeta('og:type', 'website', true);
    updateMeta('twitter:title', seo.title);
    updateMeta('twitter:description', seo.description);

    const existingSchema = document.querySelector('script[data-location-schema]');
    if (existingSchema) existingSchema.remove();

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "LNL Group - " + locationData.city,
      "description": seo.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationData.city.split(',')[0].trim(),
        "addressRegion": locationData.city.includes('NC') ? 'NC' : locationData.city.includes('OH') ? 'OH' : 'ID',
        "addressCountry": "US"
      },
      "areaServed": locationData.neighborhoods.map(n => ({
        "@type": "Place",
        "name": n
      })),
      "serviceType": ["AI Automation", "Content Marketing", "Social Media Management", "Local Authority Marketing"],
      "priceRange": locationData.pricing.custom + " - " + locationData.pricing.growth,
      "knowsAbout": ["AI Automation Architecture", "n8n Workflows", "Flux.1 Image Generation", "Local SEO", "Content Strategy"]
    };

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.setAttribute('data-location-schema', 'true');
    schemaScript.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(schemaScript);

    return () => {
      const schema = document.querySelector('script[data-location-schema]');
      if (schema) schema.remove();
    };
  }, [locationId, locationData]);
}

interface LocationShowcaseProps {
  initialLocationId?: string;
}

export default function LocationShowcase({ initialLocationId = "raleigh" }: LocationShowcaseProps) {
  const { activeLocation, setActiveLocation } = useActiveLocation();
  const [showPricing, setShowPricing] = useState(false);
  
  const handleLocationChange = (locationId: "raleigh" | "columbus" | "moscow") => {
    setActiveLocation(locationId);
  };

  const currentLocation = locationsData.locations.find(l => l.id === activeLocation) || locationsData.locations[0];

  useDynamicSEO(activeLocation, currentLocation);

  const getCaseStudyImage = () => {
    const key = currentLocation.case_study.image_key;
    return key && imageMap[key] ? imageMap[key] : "";
  };

  return (
    <div className="w-full">
      {/* Location Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {locationsData.locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => handleLocationChange(loc.id as "raleigh" | "columbus" | "moscow")}
            className={`relative group px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
              activeLocation === loc.id 
                ? "text-white" 
                : "text-muted-foreground hover:text-foreground bg-secondary/30 hover:bg-secondary/50 border border-white/5"
            }`}
          >
            {activeLocation === loc.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#008080]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{loc.city}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          {/* Hero Content */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[#008080]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="text-2xl md:text-4xl font-display font-medium mb-4 tracking-tight relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#008080] to-[#008080]">
                {currentLocation.theme}
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed relative z-10 font-light">
              {currentLocation.copy}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6 relative z-10">
              {currentLocation.hashtags.map((tag, i) => (
                <span key={i} className="text-xs font-mono text-[#008080] bg-[#008080]/10 px-3 py-1 rounded-full border border-[#008080]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-20">
            {/* Neighborhoods */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-[#008080]/30 transition-colors"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#008080]" /> Priority Neighborhoods
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentLocation.neighborhoods.map((n, i) => (
                  <span key={i} className="bg-secondary/50 hover:bg-[#008080]/20 hover:text-[#008080] px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-default border border-transparent hover:border-[#008080]/30">
                    {n}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Landmarks */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-[#008080]/30 transition-colors"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#008080]" /> 2026 Landmarks & Geotags
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentLocation.landmarks.map((l, i) => (
                  <span key={i} className="bg-secondary/50 hover:bg-[#008080]/20 hover:text-[#008080] px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-default border border-transparent hover:border-[#008080]/30">
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Strategy Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#008080]/10 via-background to-background p-1 rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#008080]/20 to-transparent opacity-50 blur-xl" />
              <div className="relative bg-card/80 backdrop-blur-md p-8 rounded-[22px] border border-white/5 h-full">
                <div className="flex flex-col gap-6">
                   <div>
                     <h4 className="text-lg font-display text-white mb-3 flex items-center gap-2">
                       <TrendingUp className="w-5 h-5 text-[#008080]" />
                       Local Authority Strategy
                     </h4>
                     <p className="text-muted-foreground mb-6">
                       "Custom is the Map; Brand Growth is the Guide." Our packages include specific targeting for {currentLocation.city}'s 2026 demographics.
                     </p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button 
                       onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
                       className="bg-secondary/30 p-5 rounded-xl border border-white/5 hover:border-[#008080]/50 hover:bg-secondary/50 transition-all duration-300 text-left cursor-pointer group"
                       data-testid="button-custom-pack"
                     >
                       <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2 group-hover:text-[#008080] transition-colors">
                         <MapPin className="w-3 h-3 text-[#008080]" /> Custom Content Pack (The Map)
                       </div>
                       <p className="text-sm text-foreground leading-relaxed">{currentLocation.value_add_custom}</p>
                       <div className="mt-3 text-xs font-semibold text-[#008080]">{currentLocation.pricing.custom}</div>
                     </button>
                     
                     <button 
                       onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
                       className="bg-[#008080]/10 p-5 rounded-xl border border-[#008080]/20 hover:border-[#008080]/50 hover:bg-[#008080]/20 transition-all duration-300 text-left cursor-pointer group"
                       data-testid="button-growth-tier"
                     >
                       <div className="text-xs font-bold uppercase tracking-widest text-[#008080] mb-2 flex items-center gap-2">
                         <TrendingUp className="w-3 h-3" /> Brand Growth Tier (The Guide)
                       </div>
                       <p className="text-sm text-foreground leading-relaxed">{currentLocation.value_add_growth}</p>
                       <div className="mt-3 text-xs font-semibold text-[#008080]">{currentLocation.pricing.growth}</div>
                     </button>
                   </div>
                   
                   <Button 
                     variant="outline" 
                     className="border-[#008080]/30 hover:bg-[#008080]/10 text-[#008080] w-fit"
                     onClick={() => setShowPricing(!showPricing)}
                     data-testid="button-view-strategy"
                   >
                     {showPricing ? 'Hide' : 'View Full'} Strategy Details 
                     <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showPricing ? 'rotate-180' : ''}`} />
                   </Button>
                   
                   <AnimatePresence>
                     {showPricing && (
                       <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         transition={{ duration: 0.3 }}
                         className="overflow-hidden"
                       >
                         <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="rounded-2xl border border-border bg-card/50 p-6 hover:border-[#008080]/50 transition-all duration-300 relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008080] to-[#008080]/50"></div>
                             
                             <h3 className="text-xl font-bold mb-2">Custom Content Pack</h3>
                             <div className="text-3xl font-bold mb-3">{currentLocation.pricing.custom}<span className="text-sm text-muted-foreground font-medium">/mo</span></div>
                             <p className="text-sm text-muted-foreground mb-6">Establish your Digital Footprint with Authentic visual Storytelling.</p>
                             
                             <div className="space-y-3 mb-6">
                               <div className="font-semibold text-[#008080] flex items-center gap-2 text-sm">
                                 <Smartphone className="w-4 h-4" /> Digital Localization
                               </div>
                               <ul className="space-y-2">
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                   <span>{currentLocation.value_add_custom}</span>
                                 </li>
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                   <span>Content Calendar & Scheduling</span>
                                 </li>
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                   <span>Monthly Analytics Report</span>
                                 </li>
                               </ul>
                             </div>
                             
                             <Button 
                               className="w-full rounded-full" 
                               variant="outline" 
                               data-testid="button-get-started-custom"
                               onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                             >
                               Get Started
                             </Button>
                           </div>

                           <div className="rounded-2xl border-2 border-[#008080] bg-card/50 p-6 relative overflow-hidden">
                             <div className="absolute top-3 right-3 bg-[#008080] text-white text-xs font-bold px-2 py-1 rounded-full">
                               RECOMMENDED
                             </div>
                             
                             <h3 className="text-xl font-bold mb-2">Brand Growth Tier</h3>
                             <div className="text-3xl font-bold mb-3">{currentLocation.pricing.growth}<span className="text-sm text-muted-foreground font-medium">/mo</span></div>
                             <p className="text-sm text-muted-foreground mb-6">Complete market authority with physical presence and targeting.</p>
                             
                             <div className="space-y-3 mb-6">
                               <div className="font-semibold text-[#008080] flex items-center gap-2 text-sm">
                                 <Camera className="w-4 h-4" /> Physical Presence
                               </div>
                               <ul className="space-y-2">
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                                   <span>{currentLocation.value_add_growth}</span>
                                 </li>
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                                   <span><strong>Geo-Targeted Ad Infrastructure</strong></span>
                                 </li>
                                 <li className="flex items-start gap-2 text-sm">
                                   <Check className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                                   <span>Comprehensive Performance Analytics</span>
                                 </li>
                               </ul>
                             </div>
                             
                             <Button 
                               className="w-full rounded-full bg-[#008080] hover:bg-[#008080]/90 text-white" 
                               data-testid="button-expand-footprint"
                               onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                             >
                               Expand Your Footprint
                             </Button>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Showcase */}
          <div className="bg-card/30 rounded-3xl border border-white/5 overflow-hidden max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto min-h-[400px] overflow-hidden group">
                <img 
                  src={getCaseStudyImage()} 
                  alt={`LNL Creative Local Authority Marketing ${currentLocation.city} - ${currentLocation.case_study.title} Case Study`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80"></div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 text-white bg-[#008080]/90 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-[#008080]/50 shadow-lg">
                    <MapPin className="w-3 h-3" />
                    {activeLocation === 'raleigh' && 'Glenwood South Geotag'}
                    {activeLocation === 'columbus' && 'German Village Geotag'}
                    {activeLocation === 'moscow' && 'Main Street Geotag'}
                  </div>
                  <div className="text-3xl font-display mb-2">{currentLocation.case_study.location}</div>
                  <p className="text-white/80 text-sm line-clamp-2">{currentLocation.case_study.challenge}</p>
                </div>
              </div>
              
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-card/50 backdrop-blur-sm">
                <h3 className="text-3xl font-display mb-8 text-white">{currentLocation.case_study.title}</h3>
                
                <div className="space-y-8">
                  <div className="pl-6 border-l-2 border-white/10">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">The Challenge</h4>
                    <p className="text-muted-foreground leading-relaxed">{currentLocation.case_study.challenge}</p>
                  </div>
                  
                  <div className="pl-6 border-l-2 border-[#008080]">
                    <h4 className="text-xs font-bold text-[#008080] uppercase tracking-wide mb-2">The Solution</h4>
                    <p className="text-foreground font-medium leading-relaxed">{currentLocation.case_study.solution}</p>
                  </div>
                </div>

                {activeLocation === 'raleigh' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 pt-8 border-t border-white/5"
                  >
                    <div className="flex items-center gap-3 text-white font-medium mb-3">
                      <div className="p-2 rounded-full bg-[#008080]/20 text-[#008080]">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span>Monthly On-Site Shoots</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 pl-12">
                      Our Raleigh Brand Growth package includes dedicated photography sessions in Glenwood South and North Hills every month.
                    </p>
                    <Button className="w-full sm:w-auto group bg-[#008080] hover:bg-[#008080]/90 text-white border-0">
                      Explore Raleigh Packages 
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}