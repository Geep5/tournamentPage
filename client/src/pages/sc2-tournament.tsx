import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Search, Trophy, Users, Heart, ChevronRight, ChevronDown,
  ChevronLeft, Menu, LayoutGrid, ClipboardList, Coins, GitMerge, Radio,
  Zap, CircleDollarSign, X, Star,
  Crown, Check, Twitch, CheckCircle2, MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// ---------------------------------------------------------------------------
// SC2 branding
// ---------------------------------------------------------------------------
const SC2_CYAN = "#22d3ee";
const SC2_GOLD = "#facc15";
const SC2_BG = "#0D0D0D";

// Real SC2 tournament images from Matcherino CDN
const SC2_IMGS = [
  "https://cdn.matcherino.com/684148c1-caae-44a6-9ad6-332481b101a0/-/crop/581x327/0,4/-/resize/800x450/",
  "https://cdn.matcherino.com/09e34bd3-d6c3-428d-93d0-c0957deb41d0/-/crop/3000x1687/0,508/-/resize/800x450/",
  "https://cdn.matcherino.com/41541e69-049f-40de-8619-031f3ca69fb1/-/crop/552x310/191,0/-/resize/800x450/",
  "https://cdn.matcherino.com/73a4e53a-1900-4ec0-bac5-1b9a6a8c11af/-/resize/800x450/",
  "https://cdn.matcherino.com/af8bd6ca-b994-4531-8426-09764770bd11/-/resize/800x450/",
  "https://cdn.matcherino.com/a0e8d1ec-04e6-49ad-b32c-f258cba3fa73/-/resize/800x450/",
  "https://cdn.matcherino.com/00298fde-bca7-47b0-a0df-aca9ae736306/-/resize/800x450/",
  "https://cdn.matcherino.com/d0c8b053-2c6e-4317-9a37-a237cbf03a53/-/crop/1024x576/0,224/-/resize/800x450/",
] as const;

// ---------------------------------------------------------------------------
// Mock data — SC2 tournaments (for sidebar discovery)
// ---------------------------------------------------------------------------
interface SC2Tournament {
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
  partnered?: boolean;
  qualifier?: boolean;
}

const allTournaments: SC2Tournament[] = [
  { id: 1, name: "uThermal 2v2 Circuit 2026", date: "Jun 6, 2026", format: "Double Elimination", participants: 618, maxParticipants: 1024, prize: "$62,200", status: "upcoming", organizer: "LindaLee", organizerAvatar: "L", region: "Global", img: SC2_IMGS[0], partnered: true, qualifier: true },
  { id: 2, name: "Transcending Void — Rising Division #6", date: "Mar 22, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$1,200", status: "upcoming", organizer: "TVoid", organizerAvatar: "T", region: "NA / EU", img: SC2_IMGS[1], partnered: true, qualifier: true },
  { id: 3, name: "AcesQuadrive Asia Circuit #14", date: "Mar 29, 2026", format: "Double Elimination", participants: 48, maxParticipants: 64, prize: "$2,800", status: "upcoming", organizer: "ASQ", organizerAvatar: "A", region: "Asia", img: SC2_IMGS[2], partnered: true, qualifier: true },
  { id: 4, name: "Northern Lights AS #25", date: "Apr 5, 2026", format: "Swiss", participants: 36, maxParticipants: 64, prize: "$1,500", status: "upcoming", organizer: "NorthernSC", organizerAvatar: "N", region: "EU", img: SC2_IMGS[3], partnered: true, qualifier: true },
  { id: 5, name: "Korean Starcraft League: Week 88", date: "Mar 17, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$2,400", status: "upcoming", organizer: "KSL", organizerAvatar: "K", region: "Korea", img: SC2_IMGS[4], partnered: true },
  { id: 6, name: "StarCraft Evolution League #20", date: "Mar 15, 2026", format: "Double Elimination", participants: 48, maxParticipants: 64, prize: "$3,200", status: "live", organizer: "ESL", organizerAvatar: "E", region: "Global", img: SC2_IMGS[5], partnered: true },
  { id: 7, name: "Community Showdown III — EMEA", date: "Mar 8, 2026", format: "Single Elimination", participants: 64, maxParticipants: 64, prize: "$1,000", status: "completed", organizer: "ESL", organizerAvatar: "E", region: "EMEA", img: SC2_IMGS[6], partnered: true },
  { id: 8, name: "Bronze to GM Weekly #42", date: "Mar 5, 2026", format: "Swiss", participants: 96, maxParticipants: 128, prize: "$400", status: "completed", organizer: "B2GM", organizerAvatar: "B", region: "Global", img: SC2_IMGS[7], partnered: false },
  { id: 9, name: "Ladder Heroes Open #12", date: "Mar 12, 2026", format: "Single Elimination", participants: 32, maxParticipants: 64, prize: "$200", status: "upcoming", organizer: "LadderH", organizerAvatar: "L", region: "NA", img: SC2_IMGS[0], partnered: false },
  { id: 10, name: "Casual 2v2 Bash", date: "Mar 20, 2026", format: "Double Elimination", participants: 16, maxParticipants: 32, prize: "$150", status: "upcoming", organizer: "SC2Fun", organizerAvatar: "S", region: "Global", img: SC2_IMGS[1], partnered: false },
];

// Player headshot photos (real tournament/team photos)
const PLAYER_PHOTOS: Record<string, string> = {
  serral: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Serral_at_ESL_StarCraft_2_Masters_Dreamhack_Winter_2023_Atlanta.jpg/400px-Serral_at_ESL_StarCraft_2_Masters_Dreamhack_Winter_2023_Atlanta.jpg",
  clem: "https://cdn.prod.website-files.com/64bf6e8cda9043babe7ca004/6863bfbf4ac2be258cb2112d_Player%20-%20Clem.webp",
  maxpax: "", // MaxPax has never shown his face publicly
  astrea: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Astrea_at_ESL_SC2_Masters_2024_Spring_-_25.jpg/400px-Astrea_at_ESL_SC2_Masters_2024_Spring_-_25.jpg",
  byunprime: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/ByuN_at_ESL_SC2_Masters_2024_Spring_-_39.jpg/400px-ByuN_at_ESL_SC2_Masters_2024_Spring_-_39.jpg",
  marinelord: "https://live.staticflickr.com/7227/28269959071_27e500ab25_b.jpg",
  roguezerg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rogue_at_HomeStory_Cup_XVIII_11.jpg/400px-Rogue_at_HomeStory_Cup_XVIII_11.jpg",
  showtime: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tobias_%22ShoWTimE%22_Sieber.jpg/400px-Tobias_%22ShoWTimE%22_Sieber.jpg",
  gumiho: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/GuMiho_at_HomeStory_Cup_XV_-_02.jpg/400px-GuMiho_at_HomeStory_Cup_XV_-_02.jpg",
  reynor: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Reynor_at_HomeStory_Cup_XVIII_28.jpg/400px-Reynor_at_HomeStory_Cup_XVIII_28.jpg",
  hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/HerO_at_ESL_SC2_Masters_2024_Spring_-_29.jpg/400px-HerO_at_ESL_SC2_Masters_2024_Spring_-_29.jpg",
  dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dark_at_ESL_SC2_Masters_2024_Spring_-_17.jpg/400px-Dark_at_ESL_SC2_Masters_2024_Spring_-_17.jpg",
};

/** Resolve avatar key to real photo URL, fallback to pravatar */
function playerPhoto(key: string): string {
  return PLAYER_PHOTOS[key] || `https://i.pravatar.cc/150?u=${key}`;
}

// Mock donors
const donors = [
  { name: "Serral", amount: 500, avatar: "serral" },
  { name: "Clem", amount: 250, avatar: "clem" },
  { name: "MaxPax", amount: 200, avatar: "maxpax" },
  { name: "Astrea", amount: 150, avatar: "astrea" },
  { name: "ByunPrime", amount: 100, avatar: "byunprime" },
  { name: "MarineLord", amount: 75, avatar: "marinelord" },
  { name: "RogueZerg", amount: 50, avatar: "roguezerg" },
  { name: "ShoWTimE", amount: 50, avatar: "showtime" },
];

// Mock participants
const participants = [
  { name: "Serral", seed: 1, avatar: "serral", record: "6-0", race: "Zerg" },
  { name: "Clem", seed: 2, avatar: "clem", record: "5-1", race: "Terran" },
  { name: "MaxPax", seed: 3, avatar: "maxpax", record: "5-1", race: "Protoss" },
  { name: "Astrea", seed: 4, avatar: "astrea", record: "4-2", race: "Protoss" },
  { name: "ByunPrime", seed: 5, avatar: "byunprime", record: "4-2", race: "Terran" },
  { name: "MarineLord", seed: 6, avatar: "marinelord", record: "3-3", race: "Terran" },
  { name: "RogueZerg", seed: 7, avatar: "roguezerg", record: "3-3", race: "Zerg" },
  { name: "ShoWTimE", seed: 8, avatar: "showtime", record: "2-4", race: "Protoss" },
  { name: "GuMiho", seed: 9, avatar: "gumiho", record: "2-4", race: "Terran" },
  { name: "Reynor", seed: 10, avatar: "reynor", record: "2-4", race: "Zerg" },
  { name: "herO", seed: 11, avatar: "hero", record: "1-5", race: "Protoss" },
  { name: "Dark", seed: 12, avatar: "dark", record: "1-5", race: "Zerg" },
];

// Mock activity
const activityFeed = [
  { user: "Serral", action: "advanced to semifinals", time: "2m ago" },
  { user: "Clem", action: "won match vs MarineLord (2-0)", time: "8m ago" },
  { user: "MaxPax", action: "landed a 200/200 deathball push", time: "12m ago" },
  { user: "Astrea", action: "contributed $50", time: "15m ago", amount: "$50" },
  { user: "ByunPrime", action: "registered for tournament", time: "1h ago" },
  { user: "RogueZerg", action: "checked in", time: "1h ago" },
  { user: "ShoWTimE", action: "contributed $25", time: "2h ago", amount: "$25" },
  { user: "GuMiho", action: "registered for tournament", time: "3h ago" },
];

// Race color
function raceColor(race: string): string {
  if (race === "Zerg") return "text-purple-400";
  if (race === "Terran") return "text-blue-400";
  return "text-yellow-400"; // Protoss
}

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
    return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/20 text-[10px] font-bold">Upcoming</Badge>;
  return <Badge className="bg-white/10 text-white/50 border-none text-[10px]">Completed</Badge>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SC2TournamentPage() {
  const [, params] = useRoute("/p/starcraft/t/:id");
  const tournamentId = params?.id ? parseInt(params.id) : 1;

  const tournament = allTournaments.find((t) => t.id === tournamentId) ?? allTournaments[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgLiked, setOrgLiked] = useState(false);
  const [rightTab, setRightTab] = useState<"prize-pool" | "activity" | "live">("prize-pool");
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
      <div className="rounded-xl overflow-hidden shadow-lg border border-cyan-500/20">
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
          {tournament.partnered && (
            <Badge className="text-[10px] font-bold border-none gap-0.5 bg-cyan-500/20 text-cyan-400">
              <CheckCircle2 className="w-2.5 h-2.5" /> Partnered
            </Badge>
          )}
          {tournament.qualifier && (
            <Badge className="text-[10px] font-bold border-none gap-0.5 bg-yellow-500/20 text-yellow-400">
              <Star className="w-2.5 h-2.5" /> EWC Qualifier
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
                  ? "bg-white/10 text-white border-l-4 border-cyan-500"
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

      {/* Back to program link */}
      <Link href="/p/starcraft" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to SC2 Program
      </Link>
    </div>
  );

  // --- Right sidebar ---
  const rightSidebarContent = (
    <>
      <div className="flex items-center border-b border-white/5 backdrop-blur-sm sticky top-0 z-10 bg-[#0D0D0D]/80">
        <button
          onClick={() => setRightTab("prize-pool")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "prize-pool" ? "border-cyan-500 text-cyan-400 bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          aria-label="Prize pool"
        >
          <CircleDollarSign className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRightTab("activity")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "activity" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          aria-label="Activity feed"
        >
          <Zap className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRightTab("live")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "live" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
        >
          <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${rightTab === "live" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/70"}`}>LIVE</span>
        </button>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto flex-1 no-scrollbar">

        {/* Prize Pool Summary */}
        {rightTab === "prize-pool" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="font-sans font-semibold text-lg text-cyan-400 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> Prize Pool
              </h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div>
                <div className="text-3xl font-sans font-bold text-white">{tournament.prize}</div>
                <div className="text-sm text-cyan-500/80 mt-1 flex justify-between">
                  <span>65% Funded</span>
                  <span>$15,000</span>
                </div>
              </div>
              <Progress value={65} className="h-2 bg-black/40" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full font-bold shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all bg-cyan-500 hover:bg-cyan-400 text-black">
                    Contribute to Prize Pool
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background border border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-sans text-center mb-2">Contribute to {tournament.name}</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                      Support the tournament and help grow the prize pool for SC2 competitors.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    {[
                      { name: "Zealot Supporter", price: "$5.00", pool: "$3.75", org: "$0.50", platform: "$0.75", emoji: "⚔️" },
                      { name: "Carrier Backer", price: "$10.00", pool: "$7.50", org: "$1.00", platform: "$1.50", emoji: "🛸" },
                    ].map((tier) => (
                      <div key={tier.name} className="flex bg-card/50 border border-white/10 rounded-xl p-4 gap-4 hover:border-cyan-500/50 transition-colors cursor-pointer relative overflow-hidden">
                        <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                          {tier.emoji}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{tier.name}</h4>
                          <div className="text-2xl font-bold text-cyan-400 my-1">{tier.price}</div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500" /> {tier.pool} Prize Pool</div>
                            <div className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-400" /> {tier.org} Organizer</div>
                            <div className="flex items-center gap-1"><Heart className="w-3 h-3 text-cyan-400" /> {tier.platform} Matcherino</div>
                          </div>
                        </div>
                        <Button className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-black">Select</Button>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 text-sm text-muted-foreground">
                    You can also make a direct contribution by clicking <a href="#" className="text-primary hover:underline">here</a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
            {/* Top Contributors */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-cyan-500/80 flex items-center justify-center bg-cyan-500/10">
                  <Check className="w-3 h-3 text-cyan-400" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-lg text-white tracking-wide">Top Contributors</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    These players and fans have contributed the most to the prize pool.
                  </p>
                </div>
              </div>
              <div className="ml-8 space-y-2">
                {donors.slice(0, 5).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <span className="text-[10px] font-bold text-white/30 w-4 text-right">{i + 1}</span>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={playerPhoto(d.avatar)} />
                      <AvatarFallback className="text-[9px]">{d.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white flex-1">{d.name}</span>
                    <span className="text-sm font-bold text-cyan-400">${d.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Live Streams */}
        {rightTab === "live" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Twitch className="w-4 h-4 text-purple-400" />
              Live Streams
            </div>
            <Button variant="link" className="h-auto p-0 text-xs text-primary hover:text-primary/80">View All (4)</Button>
          </div>
          <div className="space-y-3 pr-2 max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            {[
              { name: "Serral", avatar: "serral", viewers: "8.2k" },
              { name: "Clem", avatar: "clem", viewers: "5.1k" },
              { name: "MaxPax", avatar: "maxpax", viewers: "3.4k" },
              { name: "ByunPrime", avatar: "byunprime", viewers: "1.2k" },
            ].map((s, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden cursor-pointer">
                <img src={SC2_IMGS[idx % SC2_IMGS.length]} alt="Stream" className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/20">
                      <AvatarImage src={playerPhoto(s.avatar)} />
                      <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-white drop-shadow-md">{s.name}</span>
                  </div>
                  <div className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {s.viewers} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Recent Activity */}
        {rightTab === "activity" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Zap className="w-4 h-4 text-cyan-400" />
            Recent Activity
          </div>
          <div className="space-y-4 border-l-2 border-white/5 pl-4 ml-2">
            {activityFeed.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-cyan-500/50 ring-4 ring-background" />
                <p className="text-sm"><span className="font-medium text-foreground">{item.user}</span> <span className="text-muted-foreground">{item.action}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
        )}

      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: SC2_BG }}>
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/p/starcraft" className="flex items-center gap-3 mr-4">
            <img src={helmetLogo} alt="Matcherino" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1 mr-4">
            <Link href="/p/starcraft" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors">StarCraft II</Link>
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
            <Link href="/p/starcraft" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>SC2 Program</Link>
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
        <main className="flex-1 relative scroll-smooth pb-12 md:pb-0 overflow-y-auto h-full bg-[#111111]/50">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-10 pt-4 pb-0">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-2 md:mb-4">
              <div className="flex-1 w-full">
                {/* Tournament Title */}
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-white leading-tight drop-shadow-md mb-6 flex items-center gap-3">
                  {tournament.name}
                </h1>

                {/* Feature Image */}
                <div className="w-full bg-black/20 rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden mb-6">
                  <img
                    src={tournament.img}
                    alt={tournament.name}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>

                {/* Quick Stats below image */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-2">
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                    <StatusBadge status={tournament.status} />
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Entry Fee</span>
                    <span className="font-semibold text-foreground mt-1">Free</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Game</span>
                    <span className="font-semibold text-foreground mt-1">StarCraft II</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Region</span>
                    <span className="font-semibold text-foreground mt-1">{tournament.region}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Date/Time</span>
                    <span className="font-semibold text-foreground mt-1 text-sm">{tournament.date}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Format</span>
                    <span className="font-semibold text-foreground mt-1">{tournament.format.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-10 max-w-5xl mx-auto space-y-12 pb-32 pt-0">

            {/* About */}
            <section id="about">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-cyan-400" /> About
              </h2>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 space-y-4">
                <p className={`text-sm text-white/70 leading-relaxed ${aboutExpanded ? "" : "line-clamp-3"}`}>
                  Welcome to the official StarCraft II tournament on Matcherino. This {tournament.format.toLowerCase()} event
                  features the best players from {tournament.region} competing for a prize pool of {tournament.prize}.
                  All matches are played on the latest SC2 patch with tournament-standard rulesets and maps.
                  Best-of-3 sets for all rounds, best-of-5 for grand finals. Double elimination bracket ensures
                  every player gets a fair chance. Top 8 will be streamed live with professional commentary.
                  Crowdfunding is open — contribute to help grow the prize pool and support the SC2 competitive scene.
                </p>
                <button onClick={() => setAboutExpanded(!aboutExpanded)} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  {aboutExpanded ? "Show less" : "Read more"} <ChevronDown className={`w-3 h-3 transition-transform ${aboutExpanded ? "rotate-180" : ""}`} />
                </button>
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
                    <li>All matches played on StarCraft II (latest patch)</li>
                    <li>Players must check in 15 minutes before their match</li>
                    <li>Best of 3 games per set, Best of 5 for Grand Finals</li>
                    <li>Current map pool: standard ladder maps for the season</li>
                    <li>All three races are allowed (Terran, Zerg, Protoss)</li>
                    <li>Race switching between maps is allowed unless specified otherwise</li>
                    <li>Disconnections: regame if under 60 seconds, otherwise admin discretion</li>
                  </ul>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <h4 className="text-white font-semibold">Code of Conduct</h4>
                  <ul className="list-disc list-inside space-y-1 text-white/60">
                    <li>No hate speech, harassment, or toxic behavior</li>
                    <li>Respect all participants and organizers</li>
                    <li>No map hacks, exploits, or unauthorized third-party tools</li>
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
                        <AvatarImage src={playerPhoto(p.avatar)} />
                        <AvatarFallback className="text-[9px]">{p.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className={raceColor(p.race)}>{p.race}</span>
                          <span className="text-white/20">•</span>
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
                                <AvatarImage src={playerPhoto(p.avatar)} />
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
                                <AvatarImage src={playerPhoto(p.avatar)} />
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
                    <div className="rounded-lg border border-cyan-500/30 overflow-hidden ring-1 ring-cyan-500/10">
                      {[participants[0], participants[2]].map((p, pi) => (
                        <div key={pi} className={`flex items-center justify-between px-3 py-2.5 ${pi === 0 ? "bg-cyan-500/[0.06]" : "bg-black/30"} ${pi === 0 ? "" : "border-t border-white/5"}`}>
                          <div className="flex items-center gap-2">
                            {pi === 0 && <Crown className="w-3.5 h-3.5 text-yellow-400" />}
                            <Avatar className="h-5 w-5 border border-white/10">
                              <AvatarImage src={playerPhoto(p.avatar)} />
                              <AvatarFallback className="text-[8px]">{p.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-white">{p.name}</span>
                          </div>
                          <span className={`text-xs font-bold ${pi === 0 ? "text-cyan-400" : "text-white/30"}`}>{pi === 0 ? "3" : "1"}</span>
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
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto">
                      <Radio className="w-8 h-8 text-cyan-400" />
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
            <button className="h-8 px-4 rounded-md text-black text-xs font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all bg-cyan-500 hover:bg-cyan-400">
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
