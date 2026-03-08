import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import {
  Search,
  Trophy,
  Calendar,
  Users,
  Menu,
  X,
  CircleDollarSign,
  ExternalLink,
  Gamepad2,
  Clock,
  ChevronRight,
  Heart,
  Share2,
  Star,
  Tv,
  Shield,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const HERO = {
  title: "StarCraft II",
  subtitle: "Official Matcherino Program",
  description:
    "The premier competitive RTS. Join community tournaments, contribute to prize pools, and compete against players worldwide.",
  banner:
    "https://bnetcmsus-a.akamaihd.net/cms/blog_header/ci/CIGT65ON47WE1507159084046.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg",
};

const STATS = {
  totalCrowdfunded: "$196,420",
  tournaments: 98,
  participants: 9200,
  organizers: 34,
};

interface Tournament {
  id: number;
  name: string;
  date: string;
  format: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  status: "live" | "upcoming" | "completed";
  organizer: string;
  organizerAvatar: string;
  region: string;
}

const tournaments: Tournament[] = [
  {
    id: 1,
    name: "StarCraft Evolution League #20",
    date: "Mar 15, 2026",
    format: "Double Elimination",
    participants: 48,
    maxParticipants: 64,
    prize: "$3,200",
    status: "live",
    organizer: "ESL",
    organizerAvatar: "E",
    region: "Global",
  },
  {
    id: 2,
    name: "Korean Starcraft League: Week 88",
    date: "Mar 17, 2026",
    format: "Round Robin",
    participants: 24,
    maxParticipants: 32,
    prize: "$2,400",
    status: "upcoming",
    organizer: "KSL",
    organizerAvatar: "K",
    region: "Korea",
  },
  {
    id: 3,
    name: "2v2 Circuit 2026 \u2014 Season Opener",
    date: "Mar 22, 2026",
    format: "Double Elimination",
    participants: 128,
    maxParticipants: 256,
    prize: "$5,000",
    status: "upcoming",
    organizer: "TeamLiquid",
    organizerAvatar: "T",
    region: "NA / EU",
  },
  {
    id: 4,
    name: "Community Showdown III \u2014 EMEA",
    date: "Mar 8, 2026",
    format: "Single Elimination",
    participants: 64,
    maxParticipants: 64,
    prize: "$1,000",
    status: "completed",
    organizer: "ESL",
    organizerAvatar: "E",
    region: "EMEA",
  },
  {
    id: 5,
    name: "Bronze to GM Weekly #42",
    date: "Mar 5, 2026",
    format: "Swiss",
    participants: 96,
    maxParticipants: 128,
    prize: "$400",
    status: "completed",
    organizer: "B2GM",
    organizerAvatar: "B",
    region: "Global",
  },
  {
    id: 6,
    name: "StarCraft Evolution League #19",
    date: "Feb 28, 2026",
    format: "Double Elimination",
    participants: 64,
    maxParticipants: 64,
    prize: "$3,200",
    status: "completed",
    organizer: "ESL",
    organizerAvatar: "E",
    region: "Global",
  },
];

const activityFeed = [
  { user: "AcresDeCruz", action: "contributed $50 to", target: "StarCraft Evolution League #19", time: "2h ago", amount: "$50" },
  { user: "ByunPrime", action: "registered for", target: "Korean Starcraft League: Week 88", time: "4h ago" },
  { user: "RogueZerg", action: "won", target: "Community Showdown III \u2014 EMEA", time: "6h ago", amount: "$500" },
  { user: "MarineLord", action: "contributed $25 to", target: "2v2 Circuit 2026", time: "8h ago", amount: "$25" },
  { user: "ShoWTimE", action: "registered for", target: "StarCraft Evolution League #20", time: "12h ago" },
  { user: "Serral", action: "contributed $100 to", target: "StarCraft Evolution League #20", time: "1d ago", amount: "$100" },
  { user: "Clem", action: "won", target: "Bronze to GM Weekly #42", time: "1d ago", amount: "$200" },
  { user: "MaxPax", action: "registered for", target: "2v2 Circuit 2026", time: "2d ago" },
];

const topContributors = [
  { name: "Serral", amount: "$2,450", avatar: "S" },
  { name: "AcresDeCruz", amount: "$1,800", avatar: "A" },
  { name: "MarineLord", amount: "$1,200", avatar: "M" },
  { name: "RogueZerg", amount: "$950", avatar: "R" },
  { name: "ByunPrime", amount: "$720", avatar: "B" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Tournament["status"] }) {
  if (status === "live") {
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] uppercase tracking-wider font-bold animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1" />
        Live
      </Badge>
    );
  }
  if (status === "upcoming") {
    return (
      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] uppercase tracking-wider font-bold">
        Upcoming
      </Badge>
    );
  }
  return (
    <Badge className="bg-white/10 text-white/50 border-white/10 text-[10px] uppercase tracking-wider font-bold">
      Completed
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StarcraftPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const live = tournaments.filter((t) => t.status === "live");
  const upcoming = tournaments.filter((t) => t.status === "upcoming");
  const completed = tournaments.filter((t) => t.status === "completed");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground" data-agent-context={`
PAGE: StarCraft II Program (White-Label)
PATH: /p/starcraft

This is the StarCraft II community hub on Matcherino.
It shows active/upcoming/past tournaments, a live activity feed, top contributors, and program stats.

ACTIONS ON THIS PAGE:
- "Join" buttons: Register for a tournament
- "Contribute" button: Contribute to a tournament prize pool
- Activity feed: Real-time feed of contributions, registrations, and results
- Discord link: Opens StarCraft community Discord

MATCHERINO SUPPORT INFO:
- For StarCraft tournament issues, disputes, or prize pool questions: open a Discord ticket
- PIN delivery: Handled per-tournament by organizers
- Tax interview required before any payouts: Profile icon > Retake Interview
`}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/events">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/events" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Events</Link>
              <Link href="/partnership" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Partnership</Link>
              <Link href="/create" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Create</Link>
            </nav>
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex-1 flex justify-center mx-2 md:mx-4">
            <div className="w-full max-w-xl flex items-center relative group">
              <Search className="absolute left-2 md:left-3 h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-full h-8 md:h-10 pl-8 md:pl-10 pr-2 md:pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <HeaderActions />
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#1B213A] px-4 py-3 space-y-2">
            <Link href="/events" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <Link href="/partnership" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Partnership</Link>
            <Link href="/create" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Create</Link>
            <Link href="/profile" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden">
        <img
          src={HERO.banner}
          alt="StarCraft II Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-6">
          <div className="max-w-5xl mx-auto flex items-end gap-5">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl shrink-0 bg-black">
              <img src={HERO.logo} alt="StarCraft II" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{HERO.title}</h1>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] uppercase tracking-wider font-bold">
                  <Shield className="w-3 h-3 mr-1" />
                  Official
                </Badge>
              </div>
              <p className="text-sm text-white/60 max-w-xl hidden md:block">{HERO.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Follow
                </Button>
                <Button size="sm" variant="outline" className="text-white/70 border-white/20 hover:bg-white/10 text-xs gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
                <Button size="sm" variant="outline" className="text-white/70 border-white/20 hover:bg-white/10 text-xs gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-white/5 bg-card/50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-cyan-400">{STATS.totalCrowdfunded}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Crowdfunded</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{STATS.tournaments}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{STATS.participants.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{STATS.organizers}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Organizers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#111827]/50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">

          {/* Tournaments Section */}
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-cyan-400" />
                Tournaments
              </h2>
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="live" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                  Live ({live.length})
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  Upcoming ({upcoming.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">
                  Past ({completed.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {[
              { value: "live", items: live },
              { value: "upcoming", items: upcoming },
              { value: "completed", items: completed },
            ].map(({ value, items }) => (
              <TabsContent key={value} value={value} className="space-y-3 mt-0">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    No {value} tournaments right now.
                  </div>
                ) : (
                  items.map((t) => (
                    <div
                      key={t.id}
                      className="group rounded-xl border border-white/5 bg-card hover:border-white/10 transition-all p-4 cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        {/* Left: Info */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <StatusBadge status={t.status} />
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {t.region}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {t.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {t.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Gamepad2 className="w-3 h-3" /> {t.format}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" /> {t.participants}/{t.maxParticipants}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pt-0.5">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-[8px] bg-white/10">{t.organizerAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-[11px] text-muted-foreground">by {t.organizer}</span>
                          </div>
                        </div>

                        {/* Right: Prize + Actions */}
                        <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
                          <div className="flex items-center gap-1.5">
                            <CircleDollarSign className="w-4 h-4 text-yellow-400" />
                            <span className="text-lg font-bold text-yellow-400">{t.prize}</span>
                          </div>
                          <div className="flex gap-2">
                            {t.status !== "completed" && (
                              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-7 px-3">
                                {t.status === "live" ? "Watch" : "Join"}
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs h-7 px-3">
                              Details <ChevronRight className="w-3 h-3 ml-0.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Bottom Grid: Activity + Top Contributors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 rounded-xl border border-white/5 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {activityFeed.map((item, i) => (
                  <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                    <Avatar className="w-7 h-7 mt-0.5 shrink-0">
                      <AvatarFallback className="text-[10px] bg-cyan-500/20 text-cyan-400">
                        {item.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/80 leading-relaxed">
                        <span className="font-semibold text-white">{item.user}</span>{" "}
                        {item.action}{" "}
                        <span className="text-cyan-400 font-medium">{item.target}</span>
                      </p>
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                    {item.amount && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[10px] font-bold shrink-0">
                        {item.amount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-semibold text-white">Top Contributors</h3>
              </div>
              <div className="divide-y divide-white/5">
                {topContributors.map((c, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-bold text-muted-foreground w-4 text-right">
                      {i + 1}
                    </span>
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className={`text-[10px] ${i === 0 ? "bg-yellow-500/20 text-yellow-400" : i === 1 ? "bg-gray-400/20 text-gray-300" : i === 2 ? "bg-orange-500/20 text-orange-400" : "bg-white/10 text-white/60"}`}>
                        {c.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white font-medium flex-1 truncate">{c.name}</span>
                    <span className="text-sm font-bold text-yellow-400">{c.amount}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-white/5">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-white">
                  View All Contributors
                </Button>
              </div>
            </div>
          </div>

          {/* Organizer CTA */}
          <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-1">Want to run a StarCraft II tournament?</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Create your own community tournament. Set up brackets, manage prize pools, and grow the scene.
            </p>
            <Link href="/create">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2">
                <Trophy className="w-4 h-4" /> Create Tournament
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
