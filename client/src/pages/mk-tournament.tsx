import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import { Progress } from "@/components/ui/progress";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Search, Trophy, Calendar, Users, Heart, ChevronRight, ChevronDown,
  ChevronLeft, Menu, LayoutGrid, ClipboardList, Coins, GitMerge, Radio,
  Zap, CircleDollarSign, X, MapPin, Gamepad2, Star,
  Crown, Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// ---------------------------------------------------------------------------
// MK1 branding
// ---------------------------------------------------------------------------
const MK_RED = "#C8102E";
const MK_GOLD = "#F5A623";

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
// Mock data — other MK tournaments (for right sidebar)
// ---------------------------------------------------------------------------
interface MKTournament {
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

const allTournaments: MKTournament[] = [
  { id: 1, name: "MK1 Pro Kompetition \u2014 NA Finals", date: "Mar 22, 2026", format: "Double Elimination", participants: 128, maxParticipants: 256, prize: "$10,000", status: "live", organizer: "WBG", organizerAvatar: "W", region: "North America", img: MK_SS[0], featured: true },
  { id: 2, name: "Khaos Reigns Invitational", date: "Mar 29, 2026", format: "Invitational", participants: 16, maxParticipants: 16, prize: "$5,000", status: "upcoming", organizer: "NetherRealm", organizerAvatar: "N", region: "Global", img: MK_SS[1], featured: true },
  { id: 3, name: "MK1 Weekly Kombat #38", date: "Mar 18, 2026", format: "Double Elimination", participants: 64, maxParticipants: 128, prize: "$500", status: "upcoming", organizer: "FGC Hub", organizerAvatar: "F", region: "NA East", img: MK_SS[2] },
  { id: 4, name: "EU Mortal Monday \u2014 Week 14", date: "Mar 17, 2026", format: "Swiss", participants: 48, maxParticipants: 64, prize: "$300", status: "upcoming", organizer: "EUFC", organizerAvatar: "E", region: "Europe", img: MK_SS[3] },
  { id: 5, name: "Kameo Clash Showdown", date: "Mar 10, 2026", format: "Double Elimination", participants: 96, maxParticipants: 96, prize: "$2,000", status: "completed", organizer: "NRS Community", organizerAvatar: "N", region: "Global", img: MK_SS[4] },
  { id: 6, name: "Tower of Time Championship", date: "Mar 5, 2026", format: "Single Elimination", participants: 32, maxParticipants: 32, prize: "$1,500", status: "completed", organizer: "WBG", organizerAvatar: "W", region: "North America", img: MK_SS[5], featured: true },
  { id: 7, name: "Fatality Friday #22", date: "Feb 28, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$200", status: "completed", organizer: "FGC Hub", organizerAvatar: "F", region: "Global", img: MK_SS[6] },
  { id: 8, name: "MK1 Pro Kompetition \u2014 LATAM Qualifier", date: "Apr 5, 2026", format: "Double Elimination", participants: 12, maxParticipants: 128, prize: "$4,000", status: "upcoming", organizer: "WBG", organizerAvatar: "W", region: "LATAM", img: MK_SS[7], featured: true },
];

// Mock donor data
const donors = [
  { name: "SonicFox", amount: 500, avatar: "sonicfox" },
  { name: "NinjaKilla", amount: 250, avatar: "ninjakilla" },
  { name: "KomboKing", amount: 200, avatar: "komboking" },
  { name: "DragonSlayer", amount: 150, avatar: "dragonslayer" },
  { name: "FatalityQueen", amount: 100, avatar: "fatalityqueen" },
  { name: "SubZeroMain", amount: 75, avatar: "subzeromain" },
  { name: "LiuKangFan", amount: 50, avatar: "liukangfan" },
  { name: "RaidenTG", amount: 50, avatar: "raidenstg" },
];

// Mock participants
const participants = [
  { name: "SonicFox", seed: 1, avatar: "sonicfox", record: "6-0", character: "Scorpion" },
  { name: "NinjaKilla", seed: 2, avatar: "ninjakilla", record: "5-1", character: "Sub-Zero" },
  { name: "KomboKing", seed: 3, avatar: "komboking", record: "5-1", character: "Liu Kang" },
  { name: "DragonSlayer", seed: 4, avatar: "dragonslayer", record: "4-2", character: "Raiden" },
  { name: "FatalityQueen", seed: 5, avatar: "fatalityqueen", record: "4-2", character: "Kitana" },
  { name: "SubZeroMain", seed: 6, avatar: "subzeromain", record: "3-3", character: "Sub-Zero" },
  { name: "LiuKangFan", seed: 7, avatar: "liukangfan", record: "3-3", character: "Liu Kang" },
  { name: "RaidenTG", seed: 8, avatar: "raidenstg", record: "2-4", character: "Raiden" },
  { name: "MileenaMain", seed: 9, avatar: "mileenamain", record: "2-4", character: "Mileena" },
  { name: "JohnnyCageGod", seed: 10, avatar: "johnnycagegod", record: "2-4", character: "Johnny Cage" },
  { name: "SmokeRising", seed: 11, avatar: "smokerising", record: "1-5", character: "Smoke" },
  { name: "BarbieKenshi", seed: 12, avatar: "barbiekenshi", record: "1-5", character: "Kenshi" },
];

// Mock activity feed
const activityFeed = [
  { user: "SonicFox", action: "advanced to semifinals", time: "2m ago" },
  { user: "NinjaKilla", action: "won match vs SubZeroMain (2-0)", time: "8m ago" },
  { user: "KomboKing", action: "performed a 42% kombo", time: "12m ago" },
  { user: "DragonSlayer", action: "contributed $50", time: "15m ago", amount: "$50" },
  { user: "FatalityQueen", action: "registered for tournament", time: "1h ago" },
  { user: "MileenaMain", action: "checked in", time: "1h ago" },
  { user: "RaidenTG", action: "contributed $25", time: "2h ago", amount: "$25" },
  { user: "JohnnyCageGod", action: "registered for tournament", time: "3h ago" },
];

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
function StatusBadge({ status }: { status: string }) {
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
export default function MKTournamentPage() {
  const [, params] = useRoute("/p/mortalkombat/t/:id");
  const tournamentId = params?.id ? parseInt(params.id) : 1;

  const tournament = allTournaments.find((t) => t.id === tournamentId) ?? allTournaments[0];
  const otherTournaments = allTournaments.filter((t) => t.id !== tournament.id);

  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgLiked, setOrgLiked] = useState(false);
  const [rightTab, setRightTab] = useState<"tournaments" | "activity">("tournaments");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 768) setCols(3);
      else if (window.innerWidth >= 640) setCols(2);
      else setCols(1);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "rules", label: "Rules", icon: ClipboardList },
    { id: "contributions", label: "Contributions", icon: Coins },
    { id: "teams", label: "Participants", icon: Users, badge: String(tournament.participants) },
    { id: "bracket", label: "Bracket", icon: GitMerge },
    { id: "stream", label: "Stream", icon: Radio },
  ];

  // --- Left sidebar ---
  const leftSidebarContent = (
    <div className="p-4 space-y-6 relative z-10">
      <div className="rounded-xl overflow-hidden shadow-lg border border-red-500/20">
        <img src={tournament.img} alt={tournament.name} className="w-full h-auto object-cover aspect-video" />
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-lg font-bold leading-tight text-white">{tournament.name}</h2>
        <div className="flex items-center justify-center gap-2 text-sm text-white/70">
          by{" "}
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[9px] font-bold bg-white/10 text-white/60">{tournament.organizerAvatar}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-white hover:text-white/80 transition-colors cursor-pointer">{tournament.organizer}</span>
          <button
            onClick={() => setOrgLiked(!orgLiked)}
            className={`h-6 w-6 flex items-center justify-center rounded-md transition-all duration-300 ${orgLiked ? "text-red-500 scale-110" : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"}`}
            aria-label="Follow organizer"
          >
            <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${orgLiked ? "fill-current scale-125" : ""}`} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 text-xs text-white/50">
          <StatusBadge status={tournament.status} />
          {tournament.featured && (
            <Badge className="text-[10px] font-bold border-none gap-0.5" style={{ backgroundColor: `${MK_GOLD}33`, color: MK_GOLD }}>
              <Star className="w-2.5 h-2.5" /> Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                const sectionId =
                  item.id === "overview" ? "about"
                  : item.id === "contributions" ? "prize-pool"
                  : item.id === "teams" ? "participants"
                  : item.id;
                setTimeout(() => {
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-red-500"
                  : "text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 opacity-70" />
                {item.label}
              </div>
              {item.badge && (
                <Badge variant="secondary" className="bg-white/10 text-white/70 hover:bg-white/20 border-none px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Tournament Info</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/50">Format</span><span className="text-white font-medium">{tournament.format}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Region</span><span className="text-white font-medium">{tournament.region}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Date</span><span className="text-white font-medium">{tournament.date}</span></div>
          <div className="flex justify-between"><span className="text-white/50">Game</span><span className="text-white font-medium">Mortal Kombat 1</span></div>
        </div>
      </div>

      {/* Back to program link */}
      <Link href="/p/mortalkombat" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to MK1 Program
      </Link>
    </div>
  );

  // --- Right sidebar ---
  const rightSidebarContent = (
    <>
      <div className="flex items-center border-b border-white/5 backdrop-blur-sm sticky top-0 z-10 bg-[#0D0D0D]/80">
        <button
          onClick={() => setRightTab("tournaments")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "tournaments" ? `border-[${MK_RED}] text-red-400 bg-white/5` : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          style={rightTab === "tournaments" ? { borderColor: MK_RED } : undefined}
          aria-label="More MK1 tournaments"
        >
          <Trophy className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRightTab("activity")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "activity" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          aria-label="Activity feed"
        >
          <Zap className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar">
        {rightTab === "tournaments" && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">More MK1 Tournaments</h3>
            <div className="space-y-3">
              {otherTournaments.map((t) => (
                <Link key={t.id} href={`/p/mortalkombat/t/${t.id}`}>
                  <div className="group rounded-xl overflow-hidden border border-white/5 hover:border-red-500/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer">
                    <div className="aspect-[2/1] overflow-hidden relative">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                        <StatusBadge status={t.status} />
                        {t.featured && (
                          <Badge className="text-[9px] font-bold border-none gap-0.5" style={{ backgroundColor: `${MK_GOLD}33`, color: MK_GOLD }}>
                            <Star className="w-2 h-2" />
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-1.5 right-1.5">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[9px] font-bold backdrop-blur-sm">{t.prize}</Badge>
                      </div>
                    </div>
                    <div className="p-2.5 space-y-1">
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-red-400 transition-colors">{t.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" /> {t.date}</span>
                        <span className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5" /> {t.participants}/{t.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {rightTab === "activity" && (
          <>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Live Activity</h3>
            <div className="space-y-3">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex gap-2.5 group">
                  <Avatar className="w-7 h-7 flex-shrink-0 border border-white/10">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${item.user.toLowerCase()}`} />
                    <AvatarFallback className="text-[9px]">{item.user.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 leading-relaxed">
                      <span className="font-semibold text-white">{item.user}</span>{" "}
                      {item.action}
                      {item.amount && <span className="font-bold text-yellow-400"> {item.amount}</span>}
                    </p>
                    <span className="text-[10px] text-white/30">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#0D0D0D" }}>
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/p/mortalkombat" className="flex items-center gap-3 mr-4">
            <img src={helmetLogo} alt="Matcherino" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1 mr-4">
            <Link href="/p/mortalkombat" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors">MK1 Program</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="px-3 py-1.5 text-sm font-medium text-white truncate max-w-[200px]">{tournament.name}</span>
          </nav>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
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
          <div className="md:hidden border-t border-white/5 bg-[#0D0D0D] px-4 py-3 space-y-2">
            <Link href="/p/mortalkombat" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>MK1 Program</Link>
            <Link href="/events" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</Link>
          </div>
        )}
      </header>

      {/* Main layout */}
      <div className="flex flex-1 relative h-[calc(100vh-4rem)] min-h-0 overflow-hidden">

        {/* Left sidebar */}
        <aside className="w-[280px] flex-col flex-shrink-0 hidden md:flex border-r border-white/5 no-scrollbar h-full overflow-y-auto bg-[#0D0D0D] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {leftSidebarContent}
        </aside>

        {/* Center content */}
        <main className="flex-1 relative scroll-smooth pb-12 md:pb-0 overflow-y-auto h-full bg-[#111111]">
          {/* Hero banner */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img src={tournament.img} alt={tournament.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={tournament.status} />
                {tournament.featured && (
                  <Badge className="text-[10px] font-bold border-none gap-0.5" style={{ backgroundColor: `${MK_GOLD}33`, color: MK_GOLD }}>
                    <Star className="w-2.5 h-2.5" /> Featured
                  </Badge>
                )}
                <Badge className="bg-white/10 text-white/70 border-none text-[10px] backdrop-blur-sm">{tournament.region}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{tournament.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-white/60">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {tournament.date}</span>
                <span className="flex items-center gap-1"><Gamepad2 className="w-4 h-4" /> {tournament.format}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {tournament.participants}/{tournament.maxParticipants}</span>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="px-6 py-4 flex flex-wrap items-center gap-3 border-b border-white/5">
            <Button className="font-bold shadow-[0_0_15px_rgba(200,16,46,0.3)] hover:shadow-[0_0_25px_rgba(200,16,46,0.5)] transition-all" style={{ backgroundColor: MK_RED }}>
              Join Tournament
            </Button>
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              <CircleDollarSign className="w-4 h-4 mr-1.5" /> Contribute
            </Button>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-sm font-bold px-3 py-1">{tournament.prize}</Badge>
            </div>
          </div>

          {/* Content sections */}
          <div className="px-6 py-8 space-y-12">

            {/* About */}
            <section id="about">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-red-400" /> About
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 space-y-4">
                <p className={`text-sm text-white/70 leading-relaxed ${aboutExpanded ? "" : "line-clamp-3"}`}>
                  Welcome to the official Mortal Kombat 1 tournament series on Matcherino. This {tournament.format.toLowerCase()} tournament
                  features the best fighters from {tournament.region} competing for a prize pool of {tournament.prize}.
                  All matches are played on the latest MK1 patch with tournament-standard rulesets. Kameo fighters
                  are allowed. Best-of-3 sets for all rounds, best-of-5 for grand finals. Fatalities are encouraged
                  but not required. Double elimination bracket ensures every player gets a fair chance. Top 8 will
                  be streamed live with professional commentary.
                </p>
                <button onClick={() => setAboutExpanded(!aboutExpanded)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                  {aboutExpanded ? "Show less" : "Read more"} <ChevronDown className={`w-3 h-3 transition-transform ${aboutExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                    <div className="text-lg font-bold text-white">{tournament.prize}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Prize Pool</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <Users className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                    <div className="text-lg font-bold text-white">{tournament.participants}/{tournament.maxParticipants}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Players</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <Gamepad2 className="w-5 h-5 mx-auto mb-1 text-green-400" />
                    <div className="text-lg font-bold text-white">{tournament.format.split(" ")[0]}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Format</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <MapPin className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                    <div className="text-lg font-bold text-white">{tournament.region.split(" ")[0]}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Region</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prize pool */}
            <section id="prize-pool">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" /> Prize Pool
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">{tournament.prize}</div>
                    <div className="text-xs text-white/40 mt-1">Total prize pool</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Crowdfunded</div>
                    <div className="text-lg font-bold text-green-400">$1,475</div>
                  </div>
                </div>
                <Progress value={65} className="h-2 bg-white/5" />
                <div className="text-xs text-white/40 text-right">65% of stretch goal reached</div>

                {/* Payouts */}
                <div className="space-y-2 pt-3 border-t border-white/5">
                  {[
                    { place: "1st", pct: "50%", icon: Crown, color: "text-yellow-400" },
                    { place: "2nd", pct: "25%", icon: Shield, color: "text-gray-300" },
                    { place: "3rd", pct: "15%", icon: Shield, color: "text-amber-600" },
                    { place: "4th", pct: "10%", icon: Star, color: "text-white/40" },
                  ].map((p) => (
                    <div key={p.place} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-3">
                        <p.icon className={`w-4 h-4 ${p.color}`} />
                        <span className="text-sm font-medium text-white">{p.place} Place</span>
                      </div>
                      <span className="text-sm font-bold text-white/70">{p.pct}</span>
                    </div>
                  ))}
                </div>

                {/* Top donors */}
                <div className="pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Top Contributors</h4>
                  <div className="space-y-2">
                    {donors.slice(0, 5).map((d, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5">
                        <span className="text-[10px] font-bold text-white/30 w-4 text-right">{i + 1}</span>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${d.avatar}`} />
                          <AvatarFallback className="text-[9px]">{d.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white flex-1">{d.name}</span>
                        <span className="text-sm font-bold text-yellow-400">${d.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Rules */}
            <section id="rules">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-400" /> Rules
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 space-y-3 text-sm text-white/70 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">General Rules</h4>
                  <ul className="list-disc list-inside space-y-1 text-white/60">
                    <li>All matches played on Mortal Kombat 1 (latest patch)</li>
                    <li>Players must check in 30 minutes before their match</li>
                    <li>Best of 3 games per set, Best of 5 for Grand Finals</li>
                    <li>Random stage select for Game 1, loser picks for subsequent games</li>
                    <li>All Kameo fighters are legal</li>
                    <li>Both players must ready up within 60 seconds</li>
                    <li>Disconnections count as a loss for the disconnecting player</li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <h4 className="text-white font-semibold">Code of Conduct</h4>
                  <ul className="list-disc list-inside space-y-1 text-white/60">
                    <li>No hate speech, harassment, or toxic behavior</li>
                    <li>Respect all participants and organizers</li>
                    <li>No macros, turbo buttons, or unauthorized controllers</li>
                    <li>Match results must be reported within 10 minutes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Participants */}
            <section id="participants">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" /> Participants
                <Badge className="bg-white/10 text-white/70 border-none text-xs ml-1">{participants.length}</Badge>
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-white/5">
                  {participants.map((p) => (
                    <div key={p.seed} className="flex items-center gap-3 p-3 hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0">
                      <span className="text-xs font-bold text-white/20 w-5 text-right">#{p.seed}</span>
                      <Avatar className="w-8 h-8 border border-white/10">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${p.avatar}`} />
                        <AvatarFallback className="text-[9px]">{p.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{p.character}</span>
                          <span className="text-white/20">\u2022</span>
                          <span className={p.record.startsWith("6") || p.record.startsWith("5") ? "text-green-400" : p.record.startsWith("4") ? "text-blue-400" : "text-white/40"}>{p.record}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bracket */}
            <section id="bracket">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GitMerge className="w-5 h-5 text-purple-400" /> Bracket
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                {/* Round headers */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {["Quarterfinals", "Semifinals", "Finals"].map((round) => (
                    <div key={round} className="text-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40">{round}</span>
                    </div>
                  ))}
                </div>

                {/* Bracket matches */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {/* QF column */}
                  <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
                    {[[participants[0], participants[7]], [participants[1], participants[6]], [participants[2], participants[5]], [participants[3], participants[4]]].map((match, mi) => (
                      <div key={mi} className="rounded-lg border border-white/10 overflow-hidden">
                        {match.map((p, pi) => (
                          <div key={pi} className={`flex items-center justify-between px-3 py-2 ${pi === 0 ? "bg-white/[0.06]" : "bg-black/30"} ${pi === 0 ? "" : "border-t border-white/5"}`}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${p.avatar}`} />
                                <AvatarFallback className="text-[8px]">{p.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium text-white">{p.name}</span>
                            </div>
                            <span className={`text-xs font-bold ${pi === 0 ? "text-green-400" : "text-white/30"}`}>{pi === 0 ? "2" : "1"}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* SF column */}
                  <div className="flex flex-col justify-around gap-4 flex-1 min-w-[200px]">
                    {[[participants[0], participants[1]], [participants[2], participants[3]]].map((match, mi) => (
                      <div key={mi} className="rounded-lg border border-white/10 overflow-hidden">
                        {match.map((p, pi) => (
                          <div key={pi} className={`flex items-center justify-between px-3 py-2 ${pi === 0 ? "bg-white/[0.06]" : "bg-black/30"} ${pi === 0 ? "" : "border-t border-white/5"}`}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${p.avatar}`} />
                                <AvatarFallback className="text-[8px]">{p.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium text-white">{p.name}</span>
                            </div>
                            <span className={`text-xs font-bold ${pi === 0 ? "text-green-400" : "text-white/30"}`}>{pi === 0 ? "2" : "0"}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Finals column */}
                  <div className="flex flex-col justify-center flex-1 min-w-[200px]">
                    <div className="rounded-lg border border-yellow-500/30 overflow-hidden ring-1 ring-yellow-500/10">
                      {[participants[0], participants[2]].map((p, pi) => (
                        <div key={pi} className={`flex items-center justify-between px-3 py-2.5 ${pi === 0 ? "bg-yellow-500/[0.06]" : "bg-black/30"} ${pi === 0 ? "" : "border-t border-white/5"}`}>
                          <div className="flex items-center gap-2">
                            {pi === 0 && <Crown className="w-3.5 h-3.5 text-yellow-400" />}
                            <Avatar className="h-5 w-5 border border-white/10">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${p.avatar}`} />
                              <AvatarFallback className="text-[8px]">{p.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-white">{p.name}</span>
                          </div>
                          <span className={`text-xs font-bold ${pi === 0 ? "text-yellow-400" : "text-white/30"}`}>{pi === 0 ? "3" : "1"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stream */}
            <section id="stream">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-400" /> Stream
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                      <Radio className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="text-white/60 text-sm">
                      {tournament.status === "live" ? "Stream is live!" : "Stream will begin when the tournament starts"}
                    </div>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 text-xs">
                      Open in Twitch
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="w-[320px] border-l border-white/5 hidden xl:flex flex-col flex-shrink-0 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#0D0D0D]/80">
          {rightSidebarContent}
        </aside>
      </div>

      <MobileSidebarBar
        leftSidebar={leftSidebarContent}
        rightSidebar={rightSidebarContent}
        centerActions={
          <>
            <button className="h-8 px-4 rounded-md text-white text-xs font-bold shadow-[0_0_15px_rgba(200,16,46,0.3)] hover:shadow-[0_0_25px_rgba(200,16,46,0.5)] transition-all" style={{ backgroundColor: MK_RED }}>
              Join
            </button>
            <button className="h-8 px-4 rounded-md bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all">
              Contribute
            </button>
          </>
        }
      />
    </div>
  );
}
