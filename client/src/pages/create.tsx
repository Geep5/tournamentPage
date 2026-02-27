import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import {
  Search,
  Menu,
  Pencil,
  Trophy,
  BarChart3,
  MapPin,
  HeartHandshake,
  ShoppingBag,
  Users,
  Building2,
  Zap,
  FileText,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// --- Mock Data ---

const createOptions = [
  {
    title: "Create a Tournament",
    description: "Crowdfund a tournament with fan contributions, run a bracket, and distribute prizes.",
    icon: Trophy,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Create a Series",
    description: "Track your leaderboard across multiple events and assign points to placements.",
    icon: BarChart3,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Create a Venue",
    description: "Combine a group of events as a venue and enable ticketing options.",
    icon: MapPin,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    badge: "Verified",
  },
  {
    title: "Create a Charity Event",
    description: "Choose from our partner charities and support them through your choice of prize pool options.",
    icon: HeartHandshake,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
];

const bottomCards = [
  {
    title: "Create Merchandise",
    description: "Merchandise can be sold on your tournament's very own marketplace.",
    icon: ShoppingBag,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    img: "photo-1556306535-0f09a537f0a3",
  },
  {
    title: "Create a Team",
    description: "Team up with your friends and make it easier to join tournaments together. Keep track of your teams match history.",
    icon: Users,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    img: "photo-1542751371-adc38448a05e",
  },
  {
    title: "Create a Community",
    description: "Behind every organizer is a strong community. We can help you bring it all together. Coming Soon.",
    icon: Building2,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    img: "photo-1511512578047-dfb367046420",
  },
];

const managedEvents = [
  { name: "Tournament 185395", type: "Tournament", game: "Other Games", console: "", created: "02/22/26", status: "Created" },
  { name: "FunTournament", type: "Tournament", game: "Other Games", console: "", created: "02/19/26", status: "Created" },
  { name: "Matcherino Smash Open", type: "Tournament", game: "Super Smash Bros.", console: "Switch", created: "01/15/26", status: "Published" },
  { name: "Street Fighter 6 Monthly", type: "Tournament", game: "Street Fighter 6", console: "PS5", created: "01/10/26", status: "Published" },
];

const activityItems = [
  { user: "OrganizerPro", action: "created a new tournament", time: "2 minutes ago", avatar: "OP" },
  { user: "EventMaster", action: "published Tekken 8 Weekly", time: "15 minutes ago", avatar: "EM" },
  { user: "GamerX", action: "joined your tournament", time: "1 hour ago", avatar: "GX" },
  { user: "SponsorCo", action: "contributed $500 to prize pool", time: "3 hours ago", avatar: "SC" },
  { user: "TeamAlpha", action: "registered for series event", time: "5 hours ago", avatar: "TA" },
];

export default function CreatePage() {
  return (
    <div className="h-screen bg-background flex flex-col font-sans selection:bg-primary/30 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#2b2d31]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Link href="/">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/events" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Events</Link>
              <Link href="/partnership" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Partnership</Link>
              <Link href="/create" className="px-3 py-1.5 text-sm font-semibold text-white border-b-2 border-primary">Create</Link>
            </nav>
          </div>

          <div className="flex-1 flex justify-center mx-4">
            <div className="w-full max-w-xl hidden md:flex items-center relative group">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search tournaments, games, or organizers..."
                className="w-full bg-white/5 border border-white/10 rounded-full h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <HeaderActions />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">
        <main className="flex-1 min-w-0 overflow-y-auto h-full bg-[#313338]/50 scroll-smooth">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-10">

            {/* Page Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Pencil className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">Create</h2>
            </div>

            {/* Hero: Create an Event */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
                alt="Create an Event"
                className="w-full h-[240px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 mt-1">
                    <Pencil className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Create an Event</h2>
                    <p className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed">
                      First time organizers can create a tournament or charity event.
                      Unlock other create options, contribution codes, and SponsorQuests&trade;
                      by heading to the Partnership tab and filling out an application!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Options 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createOptions.map((opt) => (
                <button
                  key={opt.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#2b2d31] border border-white/5 hover:border-white/10 hover:bg-[#2f3136] transition-all text-left group"
                >
                  <div className={`p-3 rounded-xl ${opt.bgColor} ${opt.color} shrink-0 group-hover:scale-110 transition-transform`}>
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{opt.title}</h3>
                      {opt.badge && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-1.5 py-0">
                          {opt.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{opt.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Cards: Merchandise, Team, Community */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bottomCards.map((card) => (
                <button
                  key={card.title}
                  className="rounded-xl overflow-hidden border border-white/5 hover:border-white/10 bg-[#2b2d31] transition-all text-left group"
                >
                  <div className="relative h-[140px] overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${card.img}?auto=format&fit=crop&w=600&q=80`}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d31] via-transparent to-transparent" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{card.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Events Management Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Events</h2>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Select>
                  <SelectTrigger className="bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="All Games..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="tekken8">Tekken 8</SelectItem>
                    <SelectItem value="sf6">Street Fighter 6</SelectItem>
                    <SelectItem value="ssb">Super Smash Bros.</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="All Consoles..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="all">All Consoles</SelectItem>
                    <SelectItem value="pc">PC</SelectItem>
                    <SelectItem value="ps5">PS5</SelectItem>
                    <SelectItem value="switch">Switch</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="Any Status..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="all">Any Status</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="All Events..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="tournament">Tournaments</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                    <SelectItem value="charity">Charity Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Manage Events Table */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Manage Events</h3>
                <div className="rounded-xl border border-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#2b2d31] border-b border-white/5">
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Event Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground hidden md:table-cell">Game</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground hidden lg:table-cell">Console</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground hidden md:table-cell">Created</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managedEvents.map((ev, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-primary hover:underline cursor-pointer font-medium">{ev.name}</span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{ev.type}</td>
                          <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{ev.game}</td>
                          <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{ev.console || "—"}</td>
                          <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{ev.created}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`text-xs ${
                                ev.status === "Published"
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }`}
                            >
                              {ev.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-white">
                                <FileText className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-400">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Right Sidebar: Activity */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden xl:flex border-l border-white/5 h-full bg-[#2b2d31]">
          <div className="p-5 space-y-4 flex-1">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Activity</h3>
              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">Event Creation (Latest)</span>
            </div>

            <div className="space-y-3">
              {activityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors border border-white/5">
                  <Avatar className="h-8 w-8 shrink-0 border border-white/10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{item.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold text-white">{item.user}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground/60">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
