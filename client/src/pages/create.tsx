import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Search,
  Menu,
  X,
  Pencil,
  Trophy,
  BarChart3,
  MapPin,
  ShoppingBag,
  Users,
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
    title: "Create Merchandise",
    description: "Merchandise can be sold on your tournament's very own marketplace.",
    icon: ShoppingBag,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Create a Team",
    description: "Team up with your friends and make it easier to join tournaments together. Keep track of your team's match history.",
    icon: Users,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rightSidebarContent = (
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
  );

  return (
    <div className="h-screen bg-background flex flex-col font-sans selection:bg-primary/30 overflow-hidden">
      <div data-agent-context hidden>
{`--- USER CONTEXT (injected by Matcherino at render time) ---
USER: Grant Matcherino (#1004) [from session]
EMAIL: grant@matcherino.com [from session]
ACCOUNT TYPE: Organizer (Tier 2) [from session]
TAX INTERVIEW: Completed [from API]
BALANCE: $28.33 [from API]
LINKED ACCOUNTS: Twitch (connected), Discord (not connected) [from API]
CAN CREATE TOURNAMENTS: Yes (Organizer Tier 2) [from session]
MAX PARTICIPANTS ALLOWED: 512 (Tier 2 limit) [from API]
PREVIOUS TOURNAMENTS CREATED: 12 [from API]
DRAFTS: 2 unsaved drafts [from API]

PAGE: Tournament Creation
PURPOSE: Create a new tournament event on Matcherino.

REQUIRED FIELDS:
- Tournament Name: Text input, must be unique
- Game: Dropdown selector, choose the game title
- Start Date: Date picker, must be in the future
- Format: Dropdown (Single Elimination, Double Elimination, Round Robin, Swiss)

OPTIONAL FIELDS:
- Entry Fee: Currency input, leave blank for free entry
- Max Participants: Number input, leave blank for unlimited
- Description: Rich text editor for tournament details
- Rules: Rich text editor for tournament rules
- Banner Image: Image upload for the tournament page header

ADVANCED SETTINGS (collapsed by default -- click to expand):
- Check-in Window: Set how long before match start players must check in
- Team Size: Number of players per team
- Region Lock: Restrict to specific regions
- Series Format: Best of 1, 3, or 5

GOTCHAS:
- Game must be selected before Format options populate
- Start Date must be in the future
- Advanced Settings is collapsed by default -- users often miss it

ACTIONS ON THIS PAGE:
- "Create Tournament" button: Publishes the tournament. This is DESTRUCTIVE -- confirm with user first.
- "Save Draft" button: Saves without publishing. Safe to click without confirmation.
- "Cancel" button: Returns to previous page. Unsaved changes will be lost.

NEXT STEPS AFTER CREATION:
- Configure bracket settings and seedings
- Open registration for participants
- Add marketplace items for crowdfunding
- Share the tournament link

MATCHERINO SUPPORT INFO:
- Tax interview required before any payouts: Profile icon > Retake Interview
- For tournament setup help, ask Marco
- Organizer Program tiers affect available features: contact Dwai for tier questions`}
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/events">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/events" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Events</Link>
              <Link href="/partnership" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Partnership</Link>
              <Link href="/create" className="px-3 py-1.5 text-sm font-semibold text-white border-b-2 border-primary">Create</Link>
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

      {/* Main Content */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">
        <main className="flex-1 min-w-0 overflow-y-auto h-full bg-[#111827]/50 scroll-smooth pb-12 xl:pb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-10">

            {/* Page Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Pencil className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">Create</h2>
            </div>

            {/* Create Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createOptions.map((opt) => (
                <button
                  key={opt.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#161B22] border border-white/5 hover:border-white/10 hover:bg-[#1C2230] transition-all text-left group"
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
                  <SelectTrigger className="bg-[#1C2230] border-white/10 text-sm">
                    <SelectValue placeholder="All Games..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C2230] border-white/10">
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="tekken8">Tekken 8</SelectItem>
                    <SelectItem value="sf6">Street Fighter 6</SelectItem>
                    <SelectItem value="ssb">Super Smash Bros.</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#1C2230] border-white/10 text-sm">
                    <SelectValue placeholder="All Consoles..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C2230] border-white/10">
                    <SelectItem value="all">All Consoles</SelectItem>
                    <SelectItem value="pc">PC</SelectItem>
                    <SelectItem value="ps5">PS5</SelectItem>
                    <SelectItem value="switch">Switch</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#1C2230] border-white/10 text-sm">
                    <SelectValue placeholder="Any Status..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C2230] border-white/10">
                    <SelectItem value="all">Any Status</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-[#1C2230] border-white/10 text-sm">
                    <SelectValue placeholder="All Events..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C2230] border-white/10">
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
                      <tr className="bg-[#1C2230] border-b border-white/5">
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
        <aside className="w-[320px] flex-col flex-shrink-0 hidden xl:flex border-l border-white/5 h-full overflow-y-auto bg-[#161B22] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightSidebarContent}
        </aside>
      </div>
      <MobileSidebarBar rightSidebar={rightSidebarContent} />
    </div>
  );
}
