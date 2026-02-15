import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Creatives from "@/pages/Creatives";
import Automations from "@/pages/Automations";
import CreativesPortfolio from "@/pages/CreativesPortfolio";
import AutomationsPortfolio from "@/pages/AutomationsPortfolio";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Audit from "@/pages/Audit";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "next-themes";
import { LocationProvider } from "@/context/LocationContext";

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
          <Router />
        </LocationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
