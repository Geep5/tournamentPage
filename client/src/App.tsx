import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import TournamentPage from "@/pages/tournament";
import EventsPage from "@/pages/events";
import PartnershipPage from "@/pages/partnership";
import CreatePage from "@/pages/create";
import ProfilePage from "@/pages/profile";
import { DiscordSupportBubble } from "@/components/discord-support-bubble";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TournamentPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/partnership" component={PartnershipPage} />
      <Route path="/create" component={CreatePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <DiscordSupportBubble />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;