import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type LocationId = "raleigh" | "columbus" | "moscow";

interface LocationContextType {
  activeLocation: LocationId;
  setActiveLocation: (location: LocationId) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const validLocations: LocationId[] = ["raleigh", "columbus", "moscow"];

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [activeLocation, setActiveLocationState] = useState<LocationId>("raleigh");

  useEffect(() => {
    const path = location.replace("/", "") as LocationId;
    if (validLocations.includes(path)) {
      setActiveLocationState(path);
    } else if (location === "/creatives") {
      setActiveLocationState("raleigh");
    }
  }, [location]);

  const setActiveLocation = (newLocation: LocationId) => {
    setActiveLocationState(newLocation);
    const currentPath = window.location.pathname;
    if (currentPath === "/creatives" || validLocations.includes(currentPath.replace("/", "") as LocationId)) {
      setLocation(`/${newLocation}`);
    }
  };

  return (
    <LocationContext.Provider value={{ activeLocation, setActiveLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useActiveLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useActiveLocation must be used within a LocationProvider");
  }
  return context;
}
