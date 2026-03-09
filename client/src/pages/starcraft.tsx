import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Search,
  Trophy,
  Calendar,
  Users,
  CircleDollarSign,
  ExternalLink,
  Gamepad2,
  Clock,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  HelpCircle,
  Handshake,
  Menu,
  X,
  Zap,
  TrendingUp,
  Target,
  Timer,
} from "lucide-react";
import { useState, useEffect } from "react";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// ---------------------------------------------------------------------------
// Mock data — Events
// ---------------------------------------------------------------------------

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
  img: string;
}

const tournaments: Tournament[] = [
  { id: 1, name: "StarCraft Evolution League #20", date: "Mar 15, 2026", format: "Double Elimination", participants: 48, maxParticipants: 64, prize: "$3,200", status: "live", organizer: "ESL", organizerAvatar: "E", region: "Global", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
  { id: 2, name: "Korean Starcraft League: Week 88", date: "Mar 17, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$2,400", status: "upcoming", organizer: "KSL", organizerAvatar: "K", region: "Korea", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" },
  { id: 3, name: "2v2 Circuit 2026 \u2014 Season Opener", date: "Mar 22, 2026", format: "Double Elimination", participants: 128, maxParticipants: 256, prize: "$5,000", status: "upcoming", organizer: "TeamLiquid", organizerAvatar: "T", region: "NA / EU", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
  { id: 4, name: "Community Showdown III \u2014 EMEA", date: "Mar 8, 2026", format: "Single Elimination", participants: 64, maxParticipants: 64, prize: "$1,000", status: "completed", organizer: "ESL", organizerAvatar: "E", region: "EMEA", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" },
  { id: 5, name: "Bronze to GM Weekly #42", date: "Mar 5, 2026", format: "Swiss", participants: 96, maxParticipants: 128, prize: "$400", status: "completed", organizer: "B2GM", organizerAvatar: "B", region: "Global", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
  { id: 6, name: "StarCraft Evolution League #19", date: "Feb 28, 2026", format: "Double Elimination", participants: 64, maxParticipants: 64, prize: "$3,200", status: "completed", organizer: "ESL", organizerAvatar: "E", region: "Global", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" },
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

// ---------------------------------------------------------------------------
// Mock data \u2014 Season Sponsors & Quests
// ---------------------------------------------------------------------------

const SEASON_END = new Date("2026-07-01T00:00:00");
const currentSeason = { name: "Season 3", period: "Jan \u2013 Jun 2026", totalSponsored: "$14,200" };

const seasonSponsors = [
  { name: "HyperX", contributed: "$5,000", questsActive: 2, avatar: "H", color: "bg-red-500/20 text-red-400" },
  { name: "Razer", contributed: "$4,200", questsActive: 1, avatar: "R", color: "bg-green-500/20 text-green-400" },
  { name: "Monster Energy", contributed: "$3,000", questsActive: 2, avatar: "M", color: "bg-lime-500/20 text-lime-400" },
  { name: "Intel", contributed: "$2,000", questsActive: 1, avatar: "I", color: "bg-blue-500/20 text-blue-400" },
];

interface SponsorQuest {
  id: number;
  sponsor: string;
  title: string;
  description: string;
  reward: string;
  completions: number;
  maxCompletions: number | null;
  type: "watch" | "follow" | "share" | "visit";
}

const sponsorQuests: SponsorQuest[] = [
  { id: 1, sponsor: "HyperX", title: "Watch HyperX Spotlight", description: "Watch a 30-second HyperX feature.", reward: "$0.50 to prize pool", completions: 1842, maxCompletions: null, type: "watch" },
  { id: 2, sponsor: "HyperX", title: "Follow HyperX on X", description: "Follow @HyperX on X (Twitter).", reward: "$0.25 to prize pool", completions: 3210, maxCompletions: 5000, type: "follow" },
  { id: 3, sponsor: "Razer", title: "Visit Razer SC2 Gear", description: "Check out Razer's StarCraft II peripherals page.", reward: "$0.50 to prize pool", completions: 980, maxCompletions: null, type: "visit" },
  { id: 4, sponsor: "Monster Energy", title: "Share the StarCraft Energy", description: "Share a Monster x SC2 post on social media.", reward: "$0.25 to prize pool", completions: 2100, maxCompletions: null, type: "share" },
  { id: 5, sponsor: "Monster Energy", title: "Watch Monster Clutch Plays", description: "Watch a 15-second Monster Energy clutch plays reel.", reward: "$0.50 to prize pool", completions: 1456, maxCompletions: 3000, type: "watch" },
  { id: 6, sponsor: "Intel", title: "Visit Intel Gaming Hub", description: "Explore Intel's gaming processor lineup.", reward: "$0.50 to prize pool", completions: 720, maxCompletions: null, type: "visit" },
];

// ---------------------------------------------------------------------------
// Mock data \u2014 Partnership
// ---------------------------------------------------------------------------

const partnerBenefits = [
  { title: "Contribution Codes", description: "Receive codes to reward free community participation at your StarCraft II events." },
  { title: "Sponsorship Access", description: "SponsorQuests and SponsorOverlay boost prize pools at no cost to your community." },
  { title: "In-Game Item Drops", description: "Distribute exclusive StarCraft II in-game rewards to tournament participants." },
  { title: "Verified Tournament Status", description: "Your events display a verified StarCraft II badge, attracting more competitors." },
  { title: "Custom Event URL", description: "Set a custom matcherino.com URL for your StarCraft II events." },
  { title: "Priority Support", description: "Direct line to the StarCraft II esports coordinator for event logistics." },
];

const partnerFormFields = [
  { label: "Organization Name", placeholder: "Streamer name if no org" },
  { label: "Organization Twitter Profile", placeholder: "@yourorg" },
  { label: "Twitch / YouTube Channel", placeholder: "twitch.tv/yourchannel" },
  { label: "Email Address", placeholder: "you@example.com" },
  { label: "Discord Username", placeholder: "username" },
  { label: "Link to community Discord server", placeholder: "https://discord.gg/..." },
  { label: "How many StarCraft events have you organized?", placeholder: "Approximate number" },
  { label: "What region do you primarily organize in?", placeholder: "e.g. North America, Korea, EMEA" },
];

// ---------------------------------------------------------------------------
// Mock data \u2014 FAQ
// ---------------------------------------------------------------------------

const faqItems = [
  { q: "How do I register for a StarCraft II tournament?", a: "Find an upcoming tournament on the Events tab and click \"Join.\" You'll be prompted to sign in or create a Matcherino account, then you're registered." },
  { q: "How does crowdfunding work?", a: "Anyone can contribute to a tournament's prize pool using contribution codes or direct payment. Organizers set up goals and stretch goals \u2014 when the community hits them, extra rewards unlock." },
  { q: "What are Contribution Codes?", a: "Contribution Codes are free codes that add money to a tournament's prize pool at no cost to the user. They're funded by sponsors and distributed by organizers. Enter them on the tournament page." },
  { q: "How do I get my prize winnings?", a: "You must complete a tax interview on your Profile before receiving any payouts. PayPal cashouts process automatically. For bank wire, email brian@matcherino.com." },
  { q: "Can I run my own StarCraft II tournament?", a: "Yes! Click \"Create Tournament\" or visit the Partnership tab to apply as a verified organizer. Partner organizers get access to contribution codes, SponsorQuests, and more." },
  { q: "How do brackets work?", a: "Organizers configure the bracket format (Single Elim, Double Elim, Round Robin, Swiss). Once registration closes, the bracket is seeded and matches are scheduled. Results are reported by players or admins." },
  { q: "I have an issue with my tournament \u2014 who do I contact?", a: "Open a support ticket in the StarCraft II community Discord or the main Matcherino Discord. For urgent payout or account issues, email support@matcherino.com." },
  { q: "What regions are supported?", a: "StarCraft II tournaments on Matcherino run in all regions \u2014 NA, EU, Korea, SEA, and more. Check each tournament listing for region and timezone details." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function StatusBadge({ status }: { status: Tournament["status"] }) {
  if (status === "live")
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] uppercase tracking-wider font-bold animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1" /> Live
      </Badge>
    );
  if (status === "upcoming")
    return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] uppercase tracking-wider font-bold">Upcoming</Badge>;
  return <Badge className="bg-white/10 text-white/50 border-white/10 text-[10px] uppercase tracking-wider font-bold">Completed</Badge>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type TabId = "events" | "partnership" | "faq";

export default function StarcraftPage() {
  const [activeTab, setActiveTab] = useState<TabId>("events");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [eventsFilter, setEventsFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");

  const filteredTournaments = eventsFilter === "all" ? tournaments : tournaments.filter((t) => t.status === eventsFilter);
  const countdown = useCountdown(SEASON_END);

  const navItems: { id: TabId; label: string; icon: typeof Trophy }[] = [
    { id: "events", label: "Events", icon: Trophy },
    { id: "partnership", label: "Partnership", icon: Handshake },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  // ── Right sidebar (activity feed) — matches /events page pattern ──
  const rightSidebarContent = (
    <div className="p-5 space-y-4 flex-1">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Activity</h3>
        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">StarCraft II (Latest)</span>
      </div>
      <div className="space-y-2">
        {activityFeed.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors border border-white/5">
            <Avatar className="h-8 w-8 flex-shrink-0 border border-white/10">
              <AvatarFallback className="text-[10px] bg-cyan-500/20 text-cyan-400">{item.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              {item.amount && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-yellow-400">{item.amount}</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                <span className="text-white/70 font-medium">{item.user}</span>{" "}
                {item.action}{" "}
                <span className="text-white/70 font-medium">{item.target}</span>
              </p>
              <span className="text-[10px] text-muted-foreground/60 mt-1 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background flex flex-col font-sans selection:bg-primary/30 overflow-hidden" data-agent-context={`
PAGE: StarCraft II White-Label Program
PATH: /p/starcraft
TAB: ${activeTab}

This is the StarCraft II community hub \u2014 a white-label program page.
The header is program-branded. Users are "inside" the StarCraft program.
Clicking the Matcherino helmet exits back to the main Events page.

Current tab: ${activeTab}
- Events: Shows all StarCraft II tournaments (live, upcoming, past), season sponsors, SponsorQuests
- Partnership: Apply to become a StarCraft II tournament organizer partner
- FAQ: Common questions about tournaments, prizes, and the platform
Right sidebar: Activity feed (recent contributions, registrations, wins)
`}>
      {/* \u2500\u2500 White-Label Header \u2500\u2500 */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          {/* Escape hatch */}
          <Link href="/events" className="shrink-0">
            <img src={helmetLogo} alt="Back to Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer hover:opacity-80 transition-opacity" title="Back to Matcherino" />
          </Link>

          {/* Program branding */}
          <div className="flex items-center gap-2.5 shrink-0 border-l border-white/10 pl-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg"
              alt="StarCraft II"
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="font-semibold text-white text-sm tracking-tight hidden sm:inline">StarCraft II</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === item.id
                    ? "text-white border-primary font-semibold"
                    : "text-muted-foreground hover:text-white border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Season countdown (desktop) */}
          <div className="hidden lg:flex items-center gap-2 ml-auto mr-2 text-[11px] text-white/50">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white/70 font-medium">{currentSeason.name} ends in</span>
            <div className="flex items-center gap-1 font-mono">
              <span className="bg-white/10 rounded px-1.5 py-0.5 text-white font-bold">{countdown.days}<span className="text-white/40 font-normal ml-0.5">d</span></span>
              <span className="bg-white/10 rounded px-1.5 py-0.5 text-white font-bold">{String(countdown.hours).padStart(2, "0")}<span className="text-white/40 font-normal ml-0.5">h</span></span>
              <span className="bg-white/10 rounded px-1.5 py-0.5 text-white font-bold">{String(countdown.minutes).padStart(2, "0")}<span className="text-white/40 font-normal ml-0.5">m</span></span>
              <span className="bg-white/10 rounded px-1.5 py-0.5 text-white font-bold">{String(countdown.seconds).padStart(2, "0")}<span className="text-white/40 font-normal ml-0.5">s</span></span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Right actions (desktop, only when countdown isn't pushing them) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button size="sm" variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> Discord
            </Button>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs gap-1.5">
              <Heart className="w-3.5 h-3.5" /> Follow
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#1B213A] px-4 py-3 space-y-1">
            {/* Mobile countdown */}
            <div className="flex items-center gap-2 text-[11px] text-white/50 pb-2 mb-1 border-b border-white/5">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white/70 font-medium">{currentSeason.name} ends in</span>
              <span className="font-mono text-white font-bold">
                {countdown.days}d {String(countdown.hours).padStart(2, "0")}h {String(countdown.minutes).padStart(2, "0")}m
              </span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id ? "text-white bg-white/10" : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/5 mt-2">
              <Button size="sm" variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5 flex-1">
                <ExternalLink className="w-3.5 h-3.5" /> Discord
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs gap-1.5 flex-1">
                <Heart className="w-3.5 h-3.5" /> Follow
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* \u2500\u2500 Main Layout (flex with right sidebar, like /events) \u2500\u2500 */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">
        {/* Center Content */}
        <main className="flex-1 overflow-y-auto h-full bg-[#111827]/50 scroll-smooth pb-12 lg:pb-0">
          {/* Hero Banner */}
          <div className="relative w-full h-[160px] md:h-[200px] overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80"
              alt="StarCraft II"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-4">
              <div className="max-w-5xl mx-auto flex items-end gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-white/20 overflow-hidden shadow-2xl shrink-0 bg-black">
                  <img src="https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" alt="StarCraft II" className="w-full h-full object-cover" />
                </div>
                <div className="pb-0.5">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">StarCraft II</h1>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] font-bold">{currentSeason.name}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/50 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {currentSeason.period}</span>
                    <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {tournaments.filter(t => t.status !== 'completed').length} active events</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {seasonSponsors.length} sponsors</span>
                    <span className="flex items-center gap-1"><CircleDollarSign className="w-3 h-3" /> {currentSeason.totalSponsored} to prize pools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">

            {/* =========================================================== */}
            {/* EVENTS TAB                                                   */}
            {/* =========================================================== */}
            {activeTab === "events" && (
              <>
                {/* Filter bar */}
                <div className="flex items-center gap-2 flex-wrap">
                  {(["all", "live", "upcoming", "completed"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setEventsFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        eventsFilter === f
                          ? f === "live" ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white"
                          : "text-muted-foreground hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {f === "all" ? "All Events" : f.charAt(0).toUpperCase() + f.slice(1)}
                      <span className="ml-1 text-[10px] opacity-60">
                        ({f === "all" ? tournaments.length : tournaments.filter((t) => t.status === f).length})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tournament cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTournaments.map((t) => (
                    <div
                      key={t.id}
                      className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer"
                    >
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-2 left-2">
                          <StatusBadge status={t.status} />
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[10px] font-bold backdrop-blur-sm">
                            {t.prize}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">{t.name}</h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.date}</span>
                          <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" /> {t.format}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.region}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-[8px] bg-white/10">{t.organizerAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-[11px] text-muted-foreground">{t.organizer}</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Users className="w-3 h-3" /> {t.participants}/{t.maxParticipants}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Season Sponsors */}
                <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <h3 className="text-sm font-semibold text-white">Season Sponsors</h3>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{currentSeason.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/5">
                    {seasonSponsors.map((s, i) => (
                      <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors sm:border-l sm:first:border-l-0 border-white/5">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`text-[10px] font-bold ${s.color}`}>{s.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-white font-medium block truncate">{s.name}</span>
                          <span className="text-[10px] text-muted-foreground">{s.questsActive} active quest{s.questsActive !== 1 ? "s" : ""}</span>
                        </div>
                        <span className="text-sm font-bold text-green-400">{s.contributed}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Total to prize pools</span>
                    <span className="text-sm font-bold text-white">{currentSeason.totalSponsored}</span>
                  </div>
                </div>

                {/* SponsorQuests */}
                <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <h3 className="text-sm font-semibold text-white">SponsorQuests</h3>
                      <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-[10px]">
                        {sponsorQuests.length} active
                      </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Complete quests \u2192 money goes to prize pools</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                    {sponsorQuests.map((q) => (
                      <div key={q.id} className="p-4 bg-card hover:bg-white/[0.02] transition-colors flex gap-3 cursor-pointer group">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          q.type === "watch" ? "bg-purple-500/20 text-purple-400" :
                          q.type === "follow" ? "bg-blue-500/20 text-blue-400" :
                          q.type === "share" ? "bg-pink-500/20 text-pink-400" :
                          "bg-cyan-500/20 text-cyan-400"
                        }`}>
                          {q.type === "watch" ? <Target className="w-4 h-4" /> :
                           q.type === "follow" ? <Heart className="w-4 h-4" /> :
                           q.type === "share" ? <ExternalLink className="w-4 h-4" /> :
                           <Search className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors truncate block">{q.title}</span>
                          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{q.description}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] text-muted-foreground">{q.sponsor}</span>
                            <Badge className="bg-green-500/10 text-green-400 border-none text-[10px] font-bold">{q.reward}</Badge>
                            <span className="text-[10px] text-muted-foreground ml-auto">
                              {q.completions.toLocaleString()}{q.maxCompletions ? `/${q.maxCompletions.toLocaleString()}` : ""} done
                            </span>
                          </div>
                          {q.maxCompletions && (
                            <div className="w-full h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-green-500/60 rounded-full" style={{ width: `${Math.min((q.completions / q.maxCompletions) * 100, 100)}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Create CTA */}
                <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Want to run a StarCraft II tournament?</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Create your own community tournament with brackets, prize pools, and crowdfunding.
                  </p>
                  <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2" onClick={() => setActiveTab("partnership")}>
                    <Handshake className="w-4 h-4" /> Become a Partner
                  </Button>
                </div>
              </>
            )}

            {/* =========================================================== */}
            {/* PARTNERSHIP TAB                                              */}
            {/* =========================================================== */}
            {activeTab === "partnership" && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">StarCraft II Partnership</h2>
                </div>

                <p className="text-sm text-muted-foreground -mt-4">
                  Become an official StarCraft II tournament organizer on Matcherino. Unlock tools, support, and rewards.
                </p>

                {!showApplication ? (
                  <>
                    {/* Hero Card */}
                    <div className="rounded-2xl border border-white/5 bg-[#1C2230] overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80"
                            alt="StarCraft II"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6 md:p-8 space-y-4 flex flex-col justify-center">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">StarCraft II Organizer Program</h3>
                            <p className="text-sm text-muted-foreground mt-1">Official Matcherino Partnership</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Run officially supported StarCraft II tournaments with contribution codes, in-game rewards, verified badges, and dedicated support from the StarCraft esports team.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {partnerBenefits.slice(0, 3).map((b, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                {b.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-6 md:p-8 space-y-6">
                      <h3 className="text-lg font-bold text-white">Partner Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {partnerBenefits.map((b, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white leading-tight">{b.title}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-6 md:p-8 space-y-5">
                      <h3 className="text-lg font-bold text-white">Requirements</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                          <span>You must be an <span className="text-white font-medium">event organizer</span> or <span className="text-white font-medium">content creator</span> \u2014 not a player or attendee.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                          <span>Experience running StarCraft II tournaments or community events (online or LAN).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                          <span>An active community presence (Discord server, social following, or streaming channel).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                          <span>Applications reviewed within <span className="text-white font-medium">3\u20135 business days</span>. You'll be contacted via Discord or email.</span>
                        </li>
                      </ul>
                      <div className="pt-2">
                        <button
                          onClick={() => setShowApplication(true)}
                          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-colors"
                        >
                          I'm an organizer \u2014 show me the application
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowApplication(false)}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors -mt-4"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to overview
                    </button>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Apply to StarCraft II Partnership</h3>
                      <p className="text-sm text-muted-foreground">Fill out and submit the application below for review.</p>
                    </div>

                    <div className="space-y-5">
                      {partnerFormFields.map((field, i) => (
                        <div key={i} className="space-y-1.5">
                          <label className="text-sm font-medium text-white/80">{field.label}</label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                          />
                        </div>
                      ))}
                      <div className="pt-4">
                        <button className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-colors">
                          Submit Application
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* =========================================================== */}
            {/* FAQ TAB                                                      */}
            {/* =========================================================== */}
            {activeTab === "faq" && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                </div>

                <p className="text-sm text-muted-foreground -mt-4">
                  Everything you need to know about StarCraft II tournaments on Matcherino.
                </p>

                <div className="space-y-3">
                  {faqItems.map((item, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-sm font-medium text-white">{item.q}</span>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-90" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 border-t border-white/5 pt-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Support CTA */}
                <div className="rounded-xl border border-white/5 bg-card p-6 text-center">
                  <h3 className="text-base font-semibold text-white mb-1">Still have questions?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reach out to the StarCraft II community or Matcherino support team.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" /> StarCraft Discord
                    </Button>
                    <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" /> Matcherino Support
                    </Button>
                  </div>
                </div>
              </>
            )}

          </div>
        </main>

        {/* Right Sidebar \u2014 Activity Feed (matches /events layout) */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden lg:flex border-l border-white/5 h-full overflow-y-auto bg-[#161B22] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightSidebarContent}
        </aside>
        <MobileSidebarBar rightSidebar={rightSidebarContent} />
      </div>
    </div>
  );
}
