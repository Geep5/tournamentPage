import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Trophy,
  Calendar,
  Users,
  ExternalLink,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  MapPin,
  HelpCircle,
  Handshake,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// ---------------------------------------------------------------------------
// MK1 branding constants
// ---------------------------------------------------------------------------
const MK_RED = "#C8102E";
const MK_GOLD = "#F5A623";

const MK_BOX_ART = "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/library_600x900_2x.jpg";
const MK_HERO_IMG = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/header.jpg?t=1750176505";

// Steam screenshots — diverse gameplay/character art
const MK_SS = [
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_7eb14734a264570367c607698371e492415f48a4.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_29b0a9e87d5a4981d7403994b661c43117a87d84.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_18eadd6859ed15531d25cd67fe1d2402e9bf75b3.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_02b8c4f08fbf4d1a5affb9e6e64716d63df16760.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_2509da69bd12d209bd0ef9eed13f25cfa551f8e5.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_fc0fd6c946a9f182bf8f0059bf4260ff07b0fec7.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_535045ba6877519d2d95a3c89716a72c174eab7e.1920x1080.jpg?t=1750176505",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1971870/ss_1b8e7526d3f50e06c1283ee651dc7f868ef0474a.1920x1080.jpg?t=1750176505",
] as const;

// ---------------------------------------------------------------------------
// Mock data — Tournaments
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
  featured?: boolean;
}

const tournaments: Tournament[] = [
  { id: 1, name: "Mortal Kombat 1 Pro Kompetition \u2014 NA Finals", date: "Mar 22, 2026", format: "Double Elimination", participants: 128, maxParticipants: 256, prize: "$10,000", status: "live", organizer: "WBG", organizerAvatar: "W", region: "North America", img: MK_SS[0], featured: true },
  { id: 2, name: "Khaos Reigns Invitational", date: "Mar 29, 2026", format: "Invitational", participants: 16, maxParticipants: 16, prize: "$5,000", status: "upcoming", organizer: "NetherRealm", organizerAvatar: "N", region: "Global", img: MK_SS[1], featured: true },
  { id: 3, name: "MK1 Weekly Kombat #38", date: "Mar 18, 2026", format: "Double Elimination", participants: 64, maxParticipants: 128, prize: "$500", status: "upcoming", organizer: "FGC Hub", organizerAvatar: "F", region: "NA East", img: MK_SS[2] },
  { id: 4, name: "EU Mortal Monday \u2014 Week 14", date: "Mar 17, 2026", format: "Swiss", participants: 48, maxParticipants: 64, prize: "$300", status: "upcoming", organizer: "EUFC", organizerAvatar: "E", region: "Europe", img: MK_SS[3] },
  { id: 5, name: "Kameo Clash Showdown", date: "Mar 10, 2026", format: "Double Elimination", participants: 96, maxParticipants: 96, prize: "$2,000", status: "completed", organizer: "NRS Community", organizerAvatar: "N", region: "Global", img: MK_SS[4] },
  { id: 6, name: "Tower of Time Championship", date: "Mar 5, 2026", format: "Single Elimination", participants: 32, maxParticipants: 32, prize: "$1,500", status: "completed", organizer: "WBG", organizerAvatar: "W", region: "North America", img: MK_SS[5], featured: true },
  { id: 7, name: "Fatality Friday #22", date: "Feb 28, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$200", status: "completed", organizer: "FGC Hub", organizerAvatar: "F", region: "Global", img: MK_SS[6] },
  { id: 8, name: "MK1 Pro Kompetition \u2014 LATAM Qualifier", date: "Apr 5, 2026", format: "Double Elimination", participants: 12, maxParticipants: 128, prize: "$4,000", status: "upcoming", organizer: "WBG", organizerAvatar: "W", region: "LATAM", img: MK_SS[7], featured: true },
];

const activityFeed = [
  { user: "SonicFox", action: "registered for", target: "MK1 Pro Kompetition — NA Finals", time: "1h ago" },
  { user: "NinjaKilla", action: "contributed $100 to", target: "Khaos Reigns Invitational", time: "2h ago", amount: "$100" },
  { user: "KomboKing", action: "won", target: "Kameo Clash Showdown", time: "4h ago", amount: "$1,000" },
  { user: "DragonSlayer", action: "registered for", target: "EU Mortal Monday — Week 14", time: "5h ago" },
  { user: "FlawlessV", action: "contributed $50 to", target: "MK1 Pro Kompetition — NA Finals", time: "6h ago", amount: "$50" },
  { user: "Sub_Zero_Main", action: "registered for", target: "MK1 Weekly Kombat #38", time: "8h ago" },
  { user: "FatalityQueen", action: "won", target: "Tower of Time Championship", time: "1d ago", amount: "$750" },
  { user: "LiuKangFan", action: "contributed $25 to", target: "MK1 Pro Kompetition — LATAM Qualifier", time: "1d ago", amount: "$25" },
];

// ---------------------------------------------------------------------------
// Mock data — Partnership
// ---------------------------------------------------------------------------

const partnerBenefits = [
  { icon: Trophy, title: "Prize Pool Support", desc: "Access to community-funded prize pools for your events." },
  { icon: Users, title: "Player Reach", desc: "Tap into the Matcherino MK1 community for registrations." },
  { icon: Zap, title: "Platform Tools", desc: "Brackets, seeding, and streaming integrations included." },
  { icon: Star, title: "Featured Placement", desc: "Approved partners get featured on the MK1 program page." },
];

const faqItems = [
  { q: "How do I register for a tournament?", a: "Click on any tournament card, then hit 'Register'. You'll need a Matcherino account — it's free to create." },
  { q: "Are tournaments free to enter?", a: "Most community tournaments are free. Some premium events may have an entry fee, which goes directly into the prize pool." },
  { q: "How are prizes distributed?", a: "Prize pools are distributed to top finishers after the tournament concludes. Payouts are handled through Matcherino's platform." },
  { q: "Can I organize my own MK1 tournament?", a: "Yes! Head to the Partnership tab to apply as a tournament organizer. Approved partners get access to platform tools and featured placement." },
  { q: "What platforms are supported?", a: "MK1 tournaments on Matcherino can be run on PlayStation 5, Xbox Series X|S, and PC (Steam). Check each tournament for platform details." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Tournament["status"] }) {
  if (status === "live")
    return (
      <Badge className="bg-red-500 text-white border-none text-[10px] font-bold animate-pulse gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE
      </Badge>
    );
  if (status === "upcoming")
    return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20 text-[10px] font-bold">Upcoming</Badge>;
  return <Badge className="bg-white/10 text-white/50 border-none text-[10px]">Completed</Badge>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MortalKombatPage() {
  const [activeTab, setActiveTab] = useState<"events" | "partnership" | "faq">("events");
  const [eventsFilter, setEventsFilter] = useState<"all" | "featured" | "live" | "upcoming" | "completed">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const featuredTournaments = tournaments.filter((t) => t.featured);

  // Auto-advance featured carousel
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % featuredTournaments.length);
    }, 5000);
  }, [featuredTournaments.length]);

  useEffect(() => {
    resetAutoAdvance();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetAutoAdvance]);

  const goToSlide = (idx: number) => {
    setCarouselIdx(idx);
    resetAutoAdvance();
  };

  const navItems = [
    { id: "events" as const, label: "Events" },
    { id: "partnership" as const, label: "Partnership" },
    { id: "faq" as const, label: "FAQ" },
  ];

  const filteredTournaments =
    eventsFilter === "all"
      ? tournaments
      : eventsFilter === "featured"
        ? tournaments.filter((t) => t.featured)
        : tournaments.filter((t) => t.status === eventsFilter);

  // --- Right sidebar content ---
  const rightSidebarContent = (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Recent Activity</h3>
      {activityFeed.map((item, i) => (
        <div key={i} className="flex gap-2.5 group">
          <Avatar className="w-7 h-7 shrink-0 mt-0.5">
            <AvatarFallback className="text-[10px] font-bold bg-white/10 text-white/60">
              {item.user.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white/70 leading-relaxed">
              <span className="font-semibold text-white/90">{item.user}</span>{" "}
              {item.action}{" "}
              <span className="text-red-400 font-medium">{item.target}</span>
              {item.amount && <span className="text-green-400 font-bold ml-1">{item.amount}</span>}
            </p>
            <span className="text-[10px] text-white/30">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen bg-background flex flex-col font-sans selection:bg-red-500/30 overflow-hidden" data-agent-context={`
PAGE: Mortal Kombat 1 White-Label Program
PATH: /p/mortalkombat
TAB: ${activeTab}

This is the Mortal Kombat 1 community hub — a white-label program page.
The header is program-branded. Users are "inside" the MK1 program.
Clicking the Matcherino helmet exits back to the main Events page.

Current tab: ${activeTab}
- Events: Shows all MK1 tournaments (live, upcoming, past) — some are featured
- Partnership: Apply to become an MK1 tournament organizer partner
- FAQ: Common questions about tournaments, prizes, and the platform
Right sidebar: Activity feed (recent contributions, registrations, wins)
`}>
      {/* —— White-Label Header (MK branded) —— */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center h-14 px-4 gap-4">
          {/* Escape hatch */}
          <Link href="/events" className="shrink-0">
            <img src={helmetLogo} alt="Back to Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer hover:opacity-80 transition-opacity" title="Back to Matcherino" />
          </Link>

          {/* Program branding */}
          <div className="flex items-center gap-2.5 shrink-0 border-l border-white/10 pl-4">
            <img
              src={MK_BOX_ART}
              alt="Mortal Kombat 1"
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="font-bold text-white text-sm tracking-tight hidden sm:inline uppercase" style={{ letterSpacing: "0.05em" }}>Mortal Kombat 1</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === item.id
                    ? "text-white border-red-500 font-semibold"
                    : "text-muted-foreground hover:text-white border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <div className="flex md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            <Button size="sm" variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> Discord
            </Button>
            <Button size="sm" className="text-white text-xs gap-1.5" style={{ backgroundColor: MK_RED }}>
              <Heart className="w-3.5 h-3.5" /> Follow
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0D0D0D] px-4 py-3 space-y-1">
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
              <Button size="sm" className="text-white text-xs gap-1.5 flex-1" style={{ backgroundColor: MK_RED }}>
                <Heart className="w-3.5 h-3.5" /> Follow
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* —— Main Layout (flex with right sidebar) —— */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">
        {/* Center Content */}
        <main className="flex-1 overflow-y-auto h-full bg-[#0A0A0A]/80 scroll-smooth pb-12 lg:pb-0">
          {/* Hero Banner */}
          <div className="relative w-full h-[160px] md:h-[220px] overflow-hidden shrink-0">
            <img
              src={MK_HERO_IMG}
              alt="Mortal Kombat 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-4">
              <div className="max-w-5xl mx-auto flex items-end gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-red-500/40 overflow-hidden shadow-2xl shrink-0 bg-black">
                  <img src={MK_BOX_ART} alt="Mortal Kombat 1" className="w-full h-full object-cover" />
                </div>
                <div className="pb-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase" style={{ letterSpacing: "0.03em" }}>Mortal Kombat 1</h1>
                    <Badge className="text-[10px] font-bold border-none" style={{ backgroundColor: `${MK_RED}33`, color: MK_RED }}>
                      {tournaments.filter((t) => t.status === "live").length} Live
                    </Badge>
                    <Badge className="text-[10px] font-bold border-none" style={{ backgroundColor: `${MK_GOLD}22`, color: MK_GOLD }}>
                      {tournaments.length} Events
                    </Badge>
                  </div>
                  <p className="text-[11px] text-white/50 mt-0.5">NetherRealm Studios &middot; Community Program by Matcherino</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">

            {/* =========================================================== */}
            {/* EVENTS TAB                                                   */}
            {/* =========================================================== */}
            {activeTab === "events" && (
              <>
                {/* Featured Carousel */}
                <div className="relative rounded-2xl overflow-hidden border border-red-500/20 bg-black">
                  {/* Slides */}
                  <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
                    {featuredTournaments.map((t, i) => (
                      <Link
                        key={t.id}
                        href={`/p/mortalkombat/t/${t.id}`}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          i === carouselIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                        }`}
                      >
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <StatusBadge status={t.status} />
                            <Badge className='text-[10px] font-bold border-none gap-0.5' style={{ backgroundColor: `${MK_GOLD}33`, color: MK_GOLD }}>
                              <Star className='w-2.5 h-2.5' /> Featured
                            </Badge>
                          </div>
                          <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight">{t.name}</h2>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-white/60">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {t.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {t.region}</span>
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {t.participants}/{t.maxParticipants}</span>
                            <span className="flex items-center gap-1"><Gamepad2 className="w-3.5 h-3.5" /> {t.format}</span>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-xs font-bold">{t.prize}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={() => goToSlide((carouselIdx - 1 + featuredTournaments.length) % featuredTournaments.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
                    aria-label="Previous featured tournament"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => goToSlide((carouselIdx + 1) % featuredTournaments.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
                    aria-label="Next featured tournament"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex items-center gap-1.5 z-10">
                    {featuredTournaments.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === carouselIdx ? 'bg-red-500 w-5' : 'bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Go to featured tournament ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Filter bar — includes "Featured" */}
                <div className="flex items-center gap-2 flex-wrap">
                  {(["all", "featured", "live", "upcoming", "completed"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setEventsFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        eventsFilter === f
                          ? f === "live" ? "bg-red-500/20 text-red-400"
                            : f === "featured" ? "text-yellow-400 bg-yellow-500/10"
                            : "bg-white/10 text-white"
                          : "text-muted-foreground hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {f === "all" ? "All Events" : f === "featured" ? "Featured" : f.charAt(0).toUpperCase() + f.slice(1)}
                      <span className="ml-1 text-[10px] opacity-60">
                        ({f === "all"
                          ? tournaments.length
                          : f === "featured"
                            ? tournaments.filter((t) => t.featured).length
                            : tournaments.filter((t) => t.status === f).length})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tournament grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTournaments.map((t) => (
                    <Link key={t.id} href={`/p/mortalkombat/t/${t.id}`}>
                      <div
                        className={`group rounded-2xl bg-card overflow-hidden hover:border-white/10 transition-all cursor-pointer border ${
                          t.featured ? "border-red-500/30 ring-1 ring-red-500/10" : "border-white/5"
                        }`}
                      >
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-2 left-2 flex items-center gap-1.5">
                            <StatusBadge status={t.status} />
                            {t.featured && (
                              <Badge className="text-[10px] font-bold border-none gap-0.5" style={{ backgroundColor: `${MK_GOLD}22`, color: MK_GOLD }}>
                                <Star className="w-2.5 h-2.5" /> Featured
                              </Badge>
                            )}
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[10px] font-bold backdrop-blur-sm">
                              {t.prize}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <h3 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition-colors">{t.name}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.date}</span>
                            <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" /> {t.format}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.region}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-[9px] font-bold bg-white/10 text-white/60">{t.organizerAvatar}</AvatarFallback>
                              </Avatar>
                              <span className="text-[11px] text-muted-foreground">{t.organizer}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Users className="w-3 h-3" />
                              <span>
                                {t.participants}/{t.maxParticipants}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <div className="rounded-xl p-6 text-center space-y-3 border border-red-500/10" style={{ background: `linear-gradient(135deg, ${MK_RED}08, transparent)` }}>
                  <Trophy className="w-8 h-8 mx-auto" style={{ color: MK_GOLD }} />
                  <h3 className="text-lg font-bold text-white">Run a Mortal Kombat 1 Tournament</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Create brackets, manage registrations, and grow the MK1 competitive scene on Matcherino.
                  </p>
                  <Button className="text-white font-semibold" style={{ backgroundColor: MK_RED }}>
                    Get Started <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </>
            )}

            {/* =========================================================== */}
            {/* PARTNERSHIP TAB                                              */}
            {/* =========================================================== */}
            {activeTab === "partnership" && (
              <div className="space-y-8">
                {/* Hero card */}
                <div className="rounded-xl border border-red-500/10 p-6 md:p-8 text-center space-y-4" style={{ background: `linear-gradient(135deg, ${MK_RED}0A, transparent)` }}>
                  <Handshake className="w-10 h-10 mx-auto" style={{ color: MK_GOLD }} />
                  <h2 className="text-xl font-bold text-white">Become an MK1 Tournament Partner</h2>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    Join the official Mortal Kombat 1 community program on Matcherino. Run tournaments,
                    grow your community, and earn featured placement.
                  </p>
                </div>

                {/* Benefits grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerBenefits.map((b, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-card p-5 flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${MK_RED}1A`, color: MK_RED }}>
                        <b.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{b.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply CTA */}
                <div className="rounded-xl border border-white/5 bg-card p-6 text-center space-y-3">
                  <h3 className="text-lg font-bold text-white">Ready to Apply?</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Reach out to the Matcherino team to get started as an MK1 tournament partner.
                  </p>
                  <Button className="text-white font-semibold" style={{ backgroundColor: MK_RED }}>
                    Apply for Partnership <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* =========================================================== */}
            {/* FAQ TAB                                                      */}
            {/* =========================================================== */}
            {activeTab === "faq" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {faqItems.map((item, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-4 py-3.5 flex items-center justify-between text-left group"
                      >
                        <span className="text-sm font-medium text-white group-hover:text-red-400 transition-colors pr-4">{item.q}</span>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/5 bg-card p-6 text-center space-y-3">
                  <HelpCircle className="w-8 h-8 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-bold text-white">Still have questions?</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Join the community Discord or reach out to the Matcherino support team.
                  </p>
                  <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Join Discord
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar — Desktop (hidden on mobile) */}
        <aside className="hidden lg:block w-[320px] shrink-0 border-l border-white/5 bg-[#0D0D0D] overflow-y-auto p-5">
          {rightSidebarContent}
        </aside>

        {/* Mobile sidebar */}
        <MobileSidebarBar rightSidebar={rightSidebarContent} />
      </div>
    </div>
  );
}
