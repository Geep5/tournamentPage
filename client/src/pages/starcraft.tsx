import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Trophy,
  Calendar,
  Users,
  ExternalLink,
  Gamepad2,
  ChevronRight,
  Heart,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  HelpCircle,
  Handshake,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import helmetLogo from "@assets/mhelmet_1771552283812.png";
import astreaImg from "@assets/astrea_face.png";
import serralImg from "@assets/serral_face.jpg";
import clemImg from "@assets/clem_face.jpg";

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
  partnered: boolean;
  featured?: boolean;
}

const tournaments: Tournament[] = [
  { id: 1, name: "uThermal 2v2 Circuit 2026", date: "Jun 6, 2026", format: "Double Elimination", participants: 618, maxParticipants: 1024, prize: "$62,200", status: "upcoming", organizer: "LindaLee", organizerAvatar: "L", region: "Global", img: "https://cdn.matcherino.com/684148c1-caae-44a6-9ad6-332481b101a0/-/crop/581x327/0,4/-/resize/800x450/", partnered: true, featured: true },
  { id: 2, name: "Transcending Void — Rising Division #6", date: "Mar 22, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$1,200", status: "upcoming", organizer: "TVoid", organizerAvatar: "T", region: "NA / EU", img: "https://cdn.matcherino.com/09e34bd3-d6c3-428d-93d0-c0957deb41d0/-/crop/3000x1687/0,508/-/resize/800x450/", partnered: true, featured: true },
  { id: 3, name: "AcesQuadrive Asia Circuit #14", date: "Mar 29, 2026", format: "Double Elimination", participants: 48, maxParticipants: 64, prize: "$2,800", status: "upcoming", organizer: "ASQ", organizerAvatar: "A", region: "Asia", img: "https://cdn.matcherino.com/41541e69-049f-40de-8619-031f3ca69fb1/-/crop/552x310/191,0/-/resize/800x450/", partnered: true, featured: true },
  { id: 4, name: "Northern Lights AS #25", date: "Apr 5, 2026", format: "Swiss", participants: 36, maxParticipants: 64, prize: "$1,500", status: "upcoming", organizer: "NorthernSC", organizerAvatar: "N", region: "EU", img: "https://cdn.matcherino.com/73a4e53a-1900-4ec0-bac5-1b9a6a8c11af/-/resize/800x450/", partnered: true, featured: true },
  { id: 5, name: "Korean Starcraft League: Week 88", date: "Mar 17, 2026", format: "Round Robin", participants: 24, maxParticipants: 32, prize: "$2,400", status: "upcoming", organizer: "KSL", organizerAvatar: "K", region: "Korea", img: "https://cdn.matcherino.com/af8bd6ca-b994-4531-8426-09764770bd11/-/resize/800x450/", partnered: true },
  { id: 6, name: "StarCraft Evolution League #20", date: "Mar 15, 2026", format: "Double Elimination", participants: 48, maxParticipants: 64, prize: "$3,200", status: "live", organizer: "ESL", organizerAvatar: "E", region: "Global", img: "https://cdn.matcherino.com/a0e8d1ec-04e6-49ad-b32c-f258cba3fa73/-/resize/800x450/", partnered: true },
  { id: 7, name: "Community Showdown III — EMEA", date: "Mar 8, 2026", format: "Single Elimination", participants: 64, maxParticipants: 64, prize: "$1,000", status: "completed", organizer: "ESL", organizerAvatar: "E", region: "EMEA", img: "https://cdn.matcherino.com/00298fde-bca7-47b0-a0df-aca9ae736306/-/resize/800x450/", partnered: true },
  { id: 8, name: "Bronze to GM Weekly #42", date: "Mar 5, 2026", format: "Swiss", participants: 96, maxParticipants: 128, prize: "$400", status: "completed", organizer: "B2GM", organizerAvatar: "B", region: "Global", img: "https://cdn.matcherino.com/d0c8b053-2c6e-4317-9a37-a237cbf03a53/-/crop/1024x576/0,224/-/resize/800x450/", partnered: false },
  { id: 9, name: "Ladder Heroes Open #12", date: "Mar 12, 2026", format: "Single Elimination", participants: 32, maxParticipants: 64, prize: "$200", status: "upcoming", organizer: "LadderH", organizerAvatar: "L", region: "NA", img: "https://cdn.matcherino.com/684148c1-caae-44a6-9ad6-332481b101a0/-/crop/581x327/0,4/-/resize/800x450/", partnered: false },
  { id: 10, name: "Casual 2v2 Bash", date: "Mar 20, 2026", format: "Double Elimination", participants: 16, maxParticipants: 32, prize: "$150", status: "upcoming", organizer: "SC2Fun", organizerAvatar: "S", region: "Global", img: "https://cdn.matcherino.com/09e34bd3-d6c3-428d-93d0-c0957deb41d0/-/crop/3000x1687/0,508/-/resize/800x450/", partnered: false },
];

const featuredTournaments = tournaments.filter((t) => t.featured);

interface EwcQualifier {
  name: string;
  date: string;
  slots: number;
  link: string;
}

interface EwcRegion {
  region: string;
  org: string;
  prize: string;
  qualified: ({ tag: string; avatar: string; img?: string } | null)[];
  qualifiers: EwcQualifier[];
}

const ewcRegions: EwcRegion[] = [
  {
    region: "Americas", org: "MTCH", prize: "$10,000",
    qualified: [{ tag: "Astrea", avatar: "A", img: astreaImg }, null],
    qualifiers: [{ name: "MTCH Americas Qualifier", date: "May 18, 2026", slots: 2, link: "/t/mtch-americas-qualifier" }],
  },
  {
    region: "EMEA", org: "MTCH", prize: "$10,000",
    qualified: [null, null],
    qualifiers: [{ name: "MTCH EMEA Qualifier", date: "May 25, 2026", slots: 2, link: "/t/mtch-emea-qualifier" }],
  },
  {
    region: "KR", org: "GSL", prize: "$10,000",
    qualified: [{ tag: "Serral", avatar: "S", img: serralImg }, { tag: "Clem", avatar: "C", img: clemImg }],
    qualifiers: [{ name: "GSL KR Qualifier", date: "Jun 8, 2026", slots: 2, link: "/t/gsl-kr-qualifier" }],
  },
  {
    region: "China", org: "NTES", prize: "$10,000",
    qualified: [null],
    qualifiers: [{ name: "NTES China Qualifier", date: "May 4, 2026", slots: 1, link: "/t/ntes-china-qualifier" }],
  },
  {
    region: "Global", org: "MTCH", prize: "$10,000",
    qualified: [null, null, null, null, null],
    qualifiers: [
      { name: "Global Open #1", date: "Mar 16, 2026", slots: 1, link: "/t/global-open-1" },
      { name: "Global Open #2", date: "May 11, 2026", slots: 2, link: "/t/global-open-2" },
      { name: "Global Open #3", date: "Jun 15, 2026", slots: 1, link: "/t/global-open-3" },
      { name: "Global Open #4", date: "Jul 6, 2026", slots: 1, link: "/t/global-open-4" },
    ],
  },
];
const ewcTotalSlots = ewcRegions.reduce((s, r) => s + r.qualified.length, 0);
const ewcFilledSlots = ewcRegions.reduce((s, r) => s + r.qualified.filter(Boolean).length, 0);

const activityFeed = [
  { user: "AcresDeCruz", action: "contributed $50 to", target: "uThermal 2v2 Circuit 2026", time: "2h ago", amount: "$50" },
  { user: "ByunPrime", action: "registered for", target: "Korean Starcraft League: Week 88", time: "4h ago" },
  { user: "RogueZerg", action: "won", target: "Community Showdown III — EMEA", time: "6h ago", amount: "$500" },
  { user: "MarineLord", action: "contributed $25 to", target: "2v2 Circuit 2026", time: "8h ago", amount: "$25" },
  { user: "ShoWTimE", action: "registered for", target: "StarCraft Evolution League #20", time: "12h ago" },
  { user: "Serral", action: "contributed $100 to", target: "StarCraft Evolution League #20", time: "1d ago", amount: "$100" },
  { user: "Clem", action: "won", target: "Bronze to GM Weekly #42", time: "1d ago", amount: "$200" },
  { user: "MaxPax", action: "registered for", target: "2v2 Circuit 2026", time: "2d ago" },
];

// ---------------------------------------------------------------------------
// Mock data — Season
// ---------------------------------------------------------------------------

const currentSeason = {
  name: "Season 3",
  period: "Jan – Jun 2026",
  totalFunded: "$14,200",
  distributed: "$8,600",
  remaining: "$5,600",
};

// ---------------------------------------------------------------------------
// Mock data — Partnership Program & Applications
// ---------------------------------------------------------------------------

interface ProgramApplication {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "open" | "closing_soon" | "closed";
  fields: { label: string; placeholder: string }[];
}

// Applications visible to organizers already in the program
const programApplications: ProgramApplication[] = [
  {
    id: "app-contribution-codes",
    title: "Contribution Codes",
    description: "Request contribution codes for your upcoming events. Codes let fans fund the prize pool at zero cost.",
    deadline: "Rolling",
    status: "open",
    fields: [
      { label: "Tournament name & date", placeholder: "e.g. Weekly Cup #12 — Jul 5, 2026" },
      { label: "Estimated participants", placeholder: "e.g. 32, 64, 128" },
      { label: "How will you distribute codes?", placeholder: "Stream, Discord, social media, etc." },
    ],
  },
  {
    id: "app-in-game-items",
    title: "In-Game Item Drops",
    description: "Request portraits, skins, or banners for your tournament winners and contributors.",
    deadline: "Aug 1, 2026",
    status: "open",
    fields: [
      { label: "Tournament name & date", placeholder: "e.g. Fall League Finals — Oct 2026" },
      { label: "Expected number of winners", placeholder: "e.g. Top 8" },
      { label: "Expected contributor count", placeholder: "e.g. 200+" },
      { label: "Requested item type", placeholder: "Portraits, Banners, Skins, or any" },
    ],
  },
  {
    id: "app-prize-funding",
    title: "Prize Pool Funding",
    description: "Apply for direct prize pool funding for an upcoming event. Funding is allocated per-event based on track record.",
    deadline: "May 15, 2026",
    status: "open",
    fields: [
      { label: "Event name & date", placeholder: "e.g. Summer Showdown — Jul 12, 2026" },
      { label: "Events planned this season", placeholder: "e.g. 6 weekly cups + 1 season final" },
      { label: "Average participants per event", placeholder: "e.g. 48" },
      { label: "Requested funding per event", placeholder: "e.g. $500" },
      { label: "Links to past events", placeholder: "URLs to 2-3 previous tournaments" },
    ],
  },
  {
    id: "app-featured-listing",
    title: "Featured Event Listing",
    description: "Get your event featured at the top of the StarCraft II events page.",
    deadline: "Jun 1, 2026",
    status: "open",
    fields: [
      { label: "Event name & date", placeholder: "e.g. Summer Showdown — Jul 12, 2026" },
      { label: "Expected prize pool", placeholder: "e.g. $1,500" },
      { label: "Stream link", placeholder: "twitch.tv/... or youtube.com/..." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Mock data — FAQ
// ---------------------------------------------------------------------------

const playerFaqItems = [
  { q: "How do I register for a StarCraft II tournament?", a: "Find an upcoming tournament on the Events tab and click \"Join.\" You'll be prompted to sign in or create a Matcherino account, then you're registered." },
  { q: "How does crowdfunding work?", a: "Anyone can contribute to a tournament's prize pool using contribution codes or direct payment. When the community hits stretch goals, extra rewards unlock." },
  { q: "What are Contribution Codes?", a: "Contribution Codes are free codes that add money to a tournament's prize pool at no cost to you. They're funded by sponsors and distributed by organizers. Enter them on the tournament page to boost the prize pool." },
  { q: "How do I get my prize winnings?", a: "Complete a tax interview on your Profile before receiving payouts. PayPal cashouts process automatically. For bank wire, email brian@matcherino.com." },
  { q: "How do brackets work?", a: "Organizers configure the bracket format (Single Elim, Double Elim, Round Robin, Swiss). Once registration closes, the bracket is seeded and matches are scheduled. Results are reported by players or admins." },
  { q: "What regions are supported?", a: "StarCraft II tournaments on Matcherino run in all regions — NA, EU, Korea, SEA, and more. Check each tournament listing for region and timezone details." },
  { q: "I have an issue with my tournament — who do I contact?", a: "Open a support ticket in the StarCraft II community Discord or the main Matcherino Discord. For urgent payout or account issues, email support@matcherino.com." },
  { q: "Can I compete in multiple tournaments at once?", a: "Yes, as long as the schedules don't conflict. You can register for as many tournaments as you want — just make sure you can show up for your matches." },
];

const organizerFaqItems = [
  { q: "How do I create a StarCraft II tournament?", a: "Click \"Create Tournament\" on Matcherino, select StarCraft II as the game, configure your format, registration window, and prize pool. You can launch immediately or schedule it for later." },
  { q: "How do I become a Partnered organizer?", a: "Visit the Partnership tab and submit an application. Partners get access to contribution codes, verified badges, in-game item drops, and dedicated support. Applications are reviewed within 3–5 business days." },
  { q: "What are Contribution Codes and how do I distribute them?", a: "Contribution Codes are sponsor-funded codes that add money to your prize pool at no cost to participants. As a partner, you receive a batch of codes to share via stream, Discord, or social media." },
  { q: "How does the prize pool payout work?", a: "After your tournament concludes, finalize results in the bracket admin. Matcherino distributes winnings to players who have completed their tax interview. PayPal is automatic; bank wires are handled by support." },
  { q: "Can I run recurring weekly/monthly events?", a: "Yes. You can duplicate a previous tournament's settings to quickly spin up recurring events. Many organizers run weekly ladders and monthly showdowns this way." },
  { q: "What bracket formats are available?", a: "Single Elimination, Double Elimination, Round Robin, and Swiss. You can also run custom formats by manually managing results. Seeding can be random, manual, or based on ladder rank." },
  { q: "How do I handle disputes or no-shows?", a: "Tournament admins can report results, disqualify players, and adjust brackets directly from the admin panel. For complex disputes, reach out in the Matcherino Discord for support." },
  { q: "Is there a fee to run tournaments on Matcherino?", a: "Creating and running tournaments is free. Matcherino takes a small platform fee from crowdfunded contributions. Direct prize pool deposits from organizers are not subject to fees." },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
  const [activeApplication, setActiveApplication] = useState<string | null>(null);
  const [inProgram, setInProgram] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqRole, setFaqRole] = useState<"players" | "organizers">("players");
  const [partnerFilter, setPartnerFilter] = useState<"all" | "partnered" | "unpartnered">("all");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const filteredTournaments =
    partnerFilter === "all"
      ? tournaments
      : partnerFilter === "partnered"
        ? tournaments.filter((t) => t.partnered)
        : tournaments.filter((t) => !t.partnered);

  const navItems: { id: TabId; label: string; icon: typeof Trophy }[] = [
    { id: "events", label: "Events", icon: Trophy },
    { id: "partnership", label: "Partnership", icon: Handshake },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % featuredTournaments.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Scroll carousel on index change
  useEffect(() => {
    if (!carouselRef.current) return;
    const children = carouselRef.current.children;
    if (children[carouselIdx]) {
      (children[carouselIdx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [carouselIdx]);

  // ── Right sidebar (activity feed) ──
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
    <div className="h-screen bg-background flex flex-col font-sans selection:bg-primary/30 overflow-hidden">
      {/* ── White-Label Header ── */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <Link href="/events" className="shrink-0">
            <img src={helmetLogo} alt="Back to Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer hover:opacity-80 transition-opacity" title="Back to Matcherino" />
          </Link>

          <div className="flex items-center gap-2.5 shrink-0 border-l border-white/10 pl-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg"
              alt="StarCraft II"
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="font-semibold text-white text-sm tracking-tight hidden sm:inline">StarCraft II</span>
          </div>

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

          <div className="flex md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            <Button size="sm" variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> Discord
            </Button>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs gap-1.5">
              <Heart className="w-3.5 h-3.5" /> Follow
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#1B213A] px-4 py-3 space-y-1">
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

      {/* ── Main Layout ── */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto h-full bg-[#111827]/50 scroll-smooth pb-12 lg:pb-0">

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* HERO BANNER — StarCraft II branded, no sponsors                  */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden shrink-0">
            <img
              src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt76c5965b8529d567/675814f7449bc4dab9c01acf/masthead_overview_background_2600.webp?format=webp"
              alt="StarCraft II"
              className="w-full h-full object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-5">
              <div className="max-w-5xl mx-auto flex items-end gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-white/20 overflow-hidden shadow-2xl shrink-0 bg-black">
                  <img src="https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" alt="StarCraft II" className="w-full h-full object-cover" />
                </div>
                <div className="pb-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">StarCraft II</h1>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] font-bold">{currentSeason.name}</Badge>
                  </div>
                  <p className="text-[11px] text-white/50 mt-0.5">{currentSeason.period} · Community Program by Matcherino</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">

            {/* ═══════════ EVENTS TAB ═══════════ */}
            {activeTab === "events" && (
              <>
                {/* ── EWC 2026 Qualifier ── */}
                <div className="rounded-2xl overflow-hidden border border-[#C8AA6E]/30" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)" }}>
                  {/* Header */}
                  <div className="p-5 pb-4 flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <img
                        src="https://d3h9qea4qy4169.cloudfront.net/Esports_World_Cup_Wordmark_White_bbc22d9054.png"
                        alt="Esports World Cup"
                        className="h-5 mb-3 opacity-90"
                      />
                      <h2 className="text-lg font-bold text-white">StarCraft II — 2026 Qualification</h2>
                      <p className="text-xs text-[#999] mt-1">{ewcRegions.length} regions · {ewcTotalSlots} slots · Top finishers qualify for the EWC Finals in Riyadh</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-3xl font-black text-[#C8AA6E]">{ewcFilledSlots}<span className="text-white/30">/{ewcTotalSlots}</span></span>
                      <span className="text-[10px] text-[#999] block uppercase tracking-wider">Qualified</span>
                    </div>
                  </div>

                  {/* Region rows */}
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ewcRegions.map((r) => {
                        const filled = r.qualified.filter(Boolean).length;
                        const singleQualifier = r.qualifiers.length === 1;
                        const isExpanded = expandedRegion === r.region;

                        const cardContent = (
                          <>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-white">{r.region}</h4>
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] px-1.5 py-0 font-bold">{r.prize}</Badge>
                                </div>
                                <span className="text-[10px] text-[#777]">
                                  {r.org} · {filled}/{r.qualified.length} qualified
                                  {singleQualifier && " · " + r.qualifiers[0].date}
                                </span>
                              </div>
                              {!singleQualifier && (
                                <ChevronRight className={`w-3.5 h-3.5 text-white/30 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                              )}
                              {singleQualifier && (
                                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {r.qualified.map((player, i) => (
                                player ? (
                                  <div key={i} className="relative group/slot">
                                    <Avatar className="w-9 h-9 border-2 border-[#C8AA6E]/60">
                                      {player.img && <AvatarImage src={player.img} alt={player.tag} className="object-cover" />}
                                      <AvatarFallback className="text-xs font-bold bg-[#C8AA6E]/15 text-[#C8AA6E]">{player.avatar}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-[#C8AA6E] font-semibold whitespace-nowrap opacity-0 group-hover/slot:opacity-100 transition-opacity pointer-events-none">{player.tag}</span>
                                  </div>
                                ) : (
                                  <div key={i} className="w-9 h-9 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center bg-white/[0.02]">
                                    <span className="text-[10px] text-white/15">?</span>
                                  </div>
                                )
                              ))}
                            </div>

                            {/* Expanded qualifier list for multi-qualifier regions */}
                            {!singleQualifier && isExpanded && (
                              <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5">
                                {r.qualifiers.map((q) => (
                                  <Link key={q.link} href={q.link}>
                                    <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-white/[0.05] transition-colors cursor-pointer group/qual">
                                      <div>
                                        <span className="text-xs font-medium text-white group-hover/qual:text-[#C8AA6E] transition-colors">{q.name}</span>
                                        <span className="text-[10px] text-[#666] ml-2">{q.date}</span>
                                      </div>
                                      <span className="text-[10px] text-[#555]">{q.slots} slot{q.slots > 1 ? "s" : ""}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        );

                        return singleQualifier ? (
                          <Link key={r.region} href={r.qualifiers[0].link}>
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:border-[#C8AA6E]/20 hover:bg-white/[0.05] transition-colors cursor-pointer">
                              {cardContent}
                            </div>
                          </Link>
                        ) : (
                          <div
                            key={r.region}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:border-white/10 transition-colors cursor-pointer"
                            onClick={() => setExpandedRegion(isExpanded ? null : r.region)}
                          >
                            {cardContent}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-[#666] uppercase tracking-wider">Riyadh, Saudi Arabia · Jul 2026</span>
                    <a href="https://www.esportsworldcup.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#C8AA6E] hover:text-[#D4B97A] transition-colors">
                      esportsworldcup.com →
                    </a>
                  </div>
                </div>

                {/* ── Qualifier Path Carousel ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white">Featured Tournaments</h2>
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[10px]">Featured</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCarouselIdx((prev) => (prev - 1 + featuredTournaments.length) % featuredTournaments.length)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCarouselIdx((prev) => (prev + 1) % featuredTournaments.length)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl">
                    <div
                      ref={carouselRef}
                      className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                      {featuredTournaments.map((t) => (
                        <Link
                          key={t.id}
                          href={`/p/starcraft/t/${t.id}`}
                          className="snap-center shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] group rounded-2xl bg-card border border-yellow-500/10 overflow-hidden hover:border-yellow-500/30 transition-all cursor-pointer"
                        >
                          <div className="aspect-[16/9] overflow-hidden">
                            <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">{t.name}</h3>
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] px-1.5 py-0 font-bold shrink-0">{t.prize}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.date}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.region}</span>
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.participants}/{t.maxParticipants}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Carousel dots */}
                  <div className="flex items-center justify-center gap-1.5">
                    {featuredTournaments.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselIdx(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === carouselIdx ? "bg-yellow-400 w-4" : "bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* ── Community Events ── */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Community Events</h2>
                  </div>

                  {/* Partnered / Unpartnered filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {(["all", "partnered", "unpartnered"] as const).map((f) => {
                      const count =
                        f === "all"
                          ? tournaments.length
                          : f === "partnered"
                            ? tournaments.filter((t) => t.partnered).length
                            : tournaments.filter((t) => !t.partnered).length;
                      return (
                        <button
                          key={f}
                          onClick={() => setPartnerFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            partnerFilter === f
                              ? f === "partnered"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-white/10 text-white"
                              : "text-muted-foreground hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {f === "all" ? "All" : f === "partnered" ? "Partnered" : "Unpartnered"}
                          <span className="ml-1 text-[10px] opacity-60">({count})</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tournament cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTournaments.map((t) => (
                      <Link
                        key={t.id}
                        href={`/p/starcraft/t/${t.id}`}
                        className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer"
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <StatusBadge status={t.status} />
                            {t.partnered && (
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] font-bold">
                                <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" /> Partnered
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">{t.name}</h3>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] px-1.5 py-0 font-bold shrink-0">{t.prize}</Badge>
                          </div>
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
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ═══════════ PARTNERSHIP TAB ═══════════ */}
            {activeTab === "partnership" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Handshake className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">StarCraft II Partnership</h2>
                  </div>

                  {/* Admin toggle */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-medium ${!inProgram ? 'text-white' : 'text-muted-foreground'}`}>Public View</span>
                    <button
                      onClick={() => { setInProgram(!inProgram); setActiveApplication(null); }}
                      className={`relative w-10 h-5 rounded-full transition-colors ${inProgram ? 'bg-cyan-500' : 'bg-white/15'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${inProgram ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                    <span className={`font-medium ${inProgram ? 'text-white' : 'text-muted-foreground'}`}>In Program</span>
                  </div>
                </div>

                {/* ── PUBLIC VIEW (not in program) ── */}
                {!inProgram && !activeApplication && (
                  <>
                    <p className="text-sm text-muted-foreground -mt-4">
                      The StarCraft II Partnership Program supports community organizers running tournaments on Matcherino.
                    </p>

                    {/* What is the program */}
                    <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-5 space-y-4">
                      <h3 className="text-sm font-bold text-white">How the Program Works</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Anyone can create and run a StarCraft II tournament on Matcherino for free. Program partners get access to additional tools to grow their events:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                          <h4 className="text-sm font-semibold text-white">Contribution Codes</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">Sponsor-funded codes that let fans add money to your prize pool at zero cost.</p>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                          <h4 className="text-sm font-semibold text-white">In-Game Item Drops</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">Portraits, skins, and banners to reward your tournament winners and contributors.</p>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                          <h4 className="text-sm font-semibold text-white">Prize Pool Funding</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">Direct funding for events based on your track record and community reach.</p>
                        </div>
                      </div>
                    </div>

                    {/* Apply to join */}
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-3">
                      <h3 className="text-sm font-bold text-cyan-400">Apply to Join</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        If you're a community organizer running StarCraft II events, apply to join the program. Applications are reviewed within 3–5 business days.
                      </p>
                      <button
                        onClick={() => setActiveApplication("apply-join")}
                        className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>

                    {/* Bottom CTA */}
                    <div className="rounded-xl border border-white/5 bg-card p-6 text-center">
                      <h3 className="text-base font-semibold text-white mb-1">Questions about the program?</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                        Reach out in the StarCraft Discord or contact Matcherino support.
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" /> StarCraft Discord
                        </Button>
                        <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" /> Contact Support
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* ── IN PROGRAM VIEW ── */}
                {inProgram && !activeApplication && (
                  <>
                    <p className="text-sm text-muted-foreground -mt-4">
                      Apply programs to your upcoming tournaments.
                    </p>

                    {/* Application cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {programApplications.filter((a) => a.status !== "closed").map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setActiveApplication(app.id)}
                          className="text-left p-4 rounded-xl border border-white/5 bg-[#1C2230] hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <h5 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{app.title}</h5>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ml-2 ${app.status === "closing_soon" ? "bg-yellow-500/10 text-yellow-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                              {app.status === "closing_soon" ? "Closing soon" : "Open"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{app.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[11px] text-muted-foreground">Deadline: {app.deadline}</span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground group-hover:text-white transition-colors">
                              Apply <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="rounded-xl border border-white/5 bg-card p-6 text-center">
                      <h3 className="text-base font-semibold text-white mb-1">Need help with an application?</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                        Reach out in the StarCraft Discord or contact Matcherino support.
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" /> StarCraft Discord
                        </Button>
                        <Button variant="outline" className="text-white/60 border-white/10 hover:bg-white/10 text-xs gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" /> Contact Support
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* ── APPLICATION FORM (both views) ── */}
                {activeApplication && (() => {
                  // "apply-join" is the public program application
                  if (activeApplication === "apply-join") {
                    return (
                      <>
                        <button
                          onClick={() => setActiveApplication(null)}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors -mt-4"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>

                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                          <h3 className="text-xl font-bold text-white">Join the StarCraft II Partnership Program</h3>
                          <p className="text-sm text-muted-foreground mt-1">Tell us about your community and events.</p>
                        </div>

                        <div className="space-y-5">
                          {[
                            { label: "Organization / Streamer Name", placeholder: "Your org or channel name" },
                            { label: "Email Address", placeholder: "you@example.com" },
                            { label: "Tell us about your community", placeholder: "How many members, where do you organize (Discord, stream, etc.)" },
                            { label: "Past events (if any)", placeholder: "Links to previous tournaments or VODs" },
                            { label: "What are you looking for?", placeholder: "Contribution codes, in-game items, prize funding, etc." },
                          ].map((field, i) => (
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
                            <button className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-colors">
                              Submit Application
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }

                  // In-program application form
                  const app = programApplications.find((a) => a.id === activeApplication);
                  if (!app) return null;
                  return (
                    <>
                      <button
                        onClick={() => setActiveApplication(null)}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors -mt-4"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back to applications
                      </button>

                      <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-muted-foreground">Deadline: {app.deadline}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{app.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-white/80">Select Tournament</label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all">
                            <option value="">Choose a tournament...</option>
                            <option>uThermal 2v2 Circuit 2026</option>
                            <option>Transcending Void — Rising Division #6</option>
                            <option>AcesQuadrive Asia Circuit #14</option>
                            <option>Northern Lights AS #25</option>
                          </select>
                        </div>
                        {app.fields.map((field, i) => (
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
                  );
                })()}
              </>
            )}

            {/* ═══════════ FAQ TAB ═══════════ */}
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

                {/* Role toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
                  {(["players", "organizers"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => { setFaqRole(role); setOpenFaq(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        faqRole === role
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {role === "players" ? "For Players" : "For Organizers"}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {(faqRole === "players" ? playerFaqItems : organizerFaqItems).map((item, i) => (
                    <div key={`${faqRole}-${i}`} className="rounded-xl border border-white/5 bg-card overflow-hidden">
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
              </>
            )}

          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden lg:flex border-l border-white/5 h-full overflow-y-auto bg-[#161B22] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightSidebarContent}
        </aside>
        <MobileSidebarBar rightSidebar={rightSidebarContent} />
      </div>
    </div>
  );
}
