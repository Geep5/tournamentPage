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
import StarcraftPage from "@/pages/starcraft";
import MortalKombatPage from "@/pages/mortalkombat";
import MKTournamentPage from "@/pages/mk-tournament";
import SC2TournamentPage from "@/pages/sc2-tournament";
import { MarcoChatBubble } from "@/components/marco-chat-bubble";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TournamentPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/partnership" component={PartnershipPage} />
      <Route path="/create" component={CreatePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/p/starcraft" component={StarcraftPage} />
      <Route path="/p/starcraft/t/:id" component={SC2TournamentPage} />
      <Route path="/p/mortalkombat" component={MortalKombatPage} />
      <Route path="/p/mortalkombat/t/:id" component={MKTournamentPage} />
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
        <MarcoChatBubble />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;