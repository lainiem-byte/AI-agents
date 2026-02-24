import { Switch, Route, Redirect } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LocationProvider } from "@/context/LocationContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Creatives = lazy(() => import("@/pages/Creatives"));
const Automations = lazy(() => import("@/pages/Automations"));
const CreativesPortfolio = lazy(() => import("@/pages/CreativesPortfolio"));
const AutomationsPortfolio = lazy(() => import("@/pages/AutomationsPortfolio"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Audit = lazy(() => import("@/pages/Audit"));
const Vault = lazy(() => import("@/pages/Vault"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const NotFound = lazy(() => import("@/pages/not-found"));

function DomainRouter() {
  const hostname = window.location.hostname.toLowerCase();
  
  if (hostname.includes('lnlcreatives')) {
    return <Creatives />;
  }
  
  if (hostname.includes('lnlautomations')) {
    return <Automations />;
  }
  
  return <Home />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={DomainRouter} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/creatives">{() => <Creatives />}</Route>
      <Route path="/automations" component={Automations} />
      <Route path="/portfolio/creatives" component={CreativesPortfolio} />
      <Route path="/portfolio/automations" component={AutomationsPortfolio} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/raleigh">{() => <Creatives initialLocation="raleigh" />}</Route>
      <Route path="/columbus">{() => <Creatives initialLocation="columbus" />}</Route>
      <Route path="/moscow">{() => <Creatives initialLocation="moscow" />}</Route>
      <Route path="/audit" component={Audit} />
      <Route path="/vault" component={Vault} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LocationProvider>
          <Toaster />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Router />
          </Suspense>
          <CookieConsentBanner />
        </LocationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
