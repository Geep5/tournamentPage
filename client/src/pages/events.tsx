import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import {
  Search,
  Star,
  ThumbsUp,
  Users,
  Trophy,
  Calendar,
  Menu,
  X,
  ChevronRight,
  CircleDollarSign,
  Wifi,
  Gamepad2,
  Swords,
  Ticket,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// --- Mock Data ---


const featuredEvents = [
  { name: "Tekken 8 World Tour \u2014 Grand Finals", date: "Sat, Mar 15, 2026", game: "Tekken 8", format: "Double Elimination", participants: 256, prize: "$25,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg" },
  { name: "Street Fighter 6 Open Qualifier", date: "Mon, Feb 16, 2026", game: "Street Fighter 6", format: "Single Elim", participants: 75, prize: "$303.48", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/header.jpg" },
  { name: "2v2 Circuit 2026 \u2014 Season Opener", date: "Sat, Jan 6, 2026", game: "Starcraft II", format: "Double Elim", participants: 590, prize: "$62,200", img: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" },
  { name: "Guilty Gear Strive: Celestial Clash", date: "Fri, Mar 20, 2026", game: "Guilty Gear Strive", format: "Double Elim", participants: 128, prize: "$8,500", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1384160/header.jpg" },
  { name: "Fatal Fury: Wolves Invitational", date: "Sun, Apr 5, 2026", game: "Fatal Fury", format: "Single Elim", participants: 64, prize: "$5,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2725020/header.jpg" },
  { name: "2XKO Pro Series \u2014 Launch Event", date: "Sat, Apr 12, 2026", game: "2XKO", format: "Double Elim", participants: 512, prize: "$15,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2147950/header.jpg" },
  { name: "KOF XV: Global Championship 2026", date: "Sat, May 3, 2026", game: "King of Fighters XV", format: "Double Elim", participants: 96, prize: "$7,200", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1498570/header.jpg" },
];

const recommendedEvents = [
  { name: "Guilty Gear Strive: Celestial Open", date: "Mar 8, 2026", game: "Guilty Gear Strive", format: "Single Elim", participants: 128, maxParticipants: 128, entry: "Free", location: "Online", prize: "$3,200", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1384160/header.jpg" },
  { name: "Korean Starcraft League: Week 87", date: "Mar 10, 2026", game: "Starcraft II", format: "Round Robin", participants: 32, maxParticipants: 32, entry: "Free", location: "Online", prize: "$2,400", img: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" },
  { name: "Fatal Fury: City of Wolves Invitational", date: "Mar 12, 2026", game: "Fatal Fury", format: "Double Elim", participants: 48, maxParticipants: 64, entry: "Free", location: "Online", prize: "$5,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2725020/header.jpg" },
  { name: "2XKO Launch Tournament", date: "Mar 14, 2026", game: "2XKO", format: "Single Elim", participants: 410, maxParticipants: 512, entry: "$5", location: "Online", prize: "$10,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2147950/header.jpg" },
  { name: "Skullgirls Encore: Revival Series", date: "Mar 16, 2026", game: "Skullgirls Encore", format: "Double Elim", participants: 48, maxParticipants: 48, entry: "Free", location: "Online", prize: "$1,500", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/245170/header.jpg" },
  { name: "KOF XV: Global Championship", date: "Mar 20, 2026", game: "King of Fighters XV", format: "Double Elim", participants: 72, maxParticipants: 96, entry: "$10", location: "Online", prize: "$4,800", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1498570/header.jpg" },
  { name: "Granblue Rising: Spring Clash", date: "Mar 22, 2026", game: "GBVSR", format: "Single Elim", participants: 64, maxParticipants: 64, entry: "Free", location: "Online", prize: "$2,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2157560/header.jpg" },
  { name: "UMvC3 Legends Revival", date: "Mar 24, 2026", game: "UMvC3", format: "Double Elim", participants: 28, maxParticipants: 32, entry: "Free", location: "Online", prize: "$1,800", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/357190/header.jpg" },
  { name: "Tetris Effect: Connected Cup", date: "Mar 26, 2026", game: "Tetris Effect", format: "Round Robin", participants: 200, maxParticipants: 256, entry: "Free", location: "Online", prize: "$6,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1003590/header.jpg" },
  { name: "Tekken 8: Iron Fist Open", date: "Mar 28, 2026", game: "Tekken 8", format: "Double Elim", participants: 512, maxParticipants: 512, entry: "$15", location: "Online", prize: "$15,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg" },
  { name: "Street Fighter 6: World Warrior", date: "Apr 2, 2026", game: "Street Fighter 6", format: "Double Elim", participants: 180, maxParticipants: 256, entry: "$10", location: "Online", prize: "$8,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/header.jpg" },
  { name: "Guilty Gear Strive: Midnight Carnival", date: "Apr 5, 2026", game: "Guilty Gear Strive", format: "Single Elim", participants: 64, maxParticipants: 64, entry: "Free", location: "Online", prize: "$2,500", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1384160/header.jpg" },
  { name: "Fatal Fury: Wolves Unleashed", date: "Apr 8, 2026", game: "Fatal Fury", format: "Double Elim", participants: 90, maxParticipants: 128, entry: "Free", location: "Online", prize: "$7,500", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2725020/header.jpg" },
  { name: "2XKO Pro Circuit: Week 3", date: "Apr 10, 2026", game: "2XKO", format: "Round Robin", participants: 32, maxParticipants: 32, entry: "Free", location: "Online", prize: "$3,600", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2147950/header.jpg" },
  { name: "Skullgirls: Parasite Weave Open", date: "Apr 12, 2026", game: "Skullgirls Encore", format: "Double Elim", participants: 36, maxParticipants: 48, entry: "Free", location: "Online", prize: "$1,200", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/245170/header.jpg" },
  { name: "KOF XV: Rising Stars", date: "Apr 15, 2026", game: "King of Fighters XV", format: "Single Elim", participants: 64, maxParticipants: 64, entry: "Free", location: "Online", prize: "$3,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1498570/header.jpg" },
  { name: "GBVSR: Skybound Showdown", date: "Apr 18, 2026", game: "GBVSR", format: "Double Elim", participants: 60, maxParticipants: 96, entry: "$5", location: "Online", prize: "$4,200", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2157560/header.jpg" },
  { name: "UMvC3: Infinite Reborn", date: "Apr 20, 2026", game: "UMvC3", format: "Double Elim", participants: 48, maxParticipants: 48, entry: "Free", location: "Online", prize: "$2,200", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/357190/header.jpg" },
  { name: "Tekken 8: King of Iron Fist", date: "Apr 22, 2026", game: "Tekken 8", format: "Double Elim", participants: 800, maxParticipants: 1024, entry: "$20", location: "Online", prize: "$50,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg" },
];

const browseGames = [
  { name: "Tekken 8", tournaments: 142, likes: 3800, participants: 18400, crowdfunded: "$284,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900_2x.jpg" },
  { name: "Starcraft II", tournaments: 98, likes: 2100, participants: 9200, crowdfunded: "$196,000", img: "https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg" },
  { name: "Guilty Gear Strive", tournaments: 76, likes: 1900, participants: 7600, crowdfunded: "$128,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1384160/library_600x900_2x.jpg" },
  { name: "Fatal Fury", tournaments: 34, likes: 890, participants: 3200, crowdfunded: "$45,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2725020/library_600x900_2x.jpg" },
  { name: "2XKO", tournaments: 28, likes: 2400, participants: 14000, crowdfunded: "$92,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2147950/library_600x900_2x.jpg" },
  { name: "Granblue Fantasy Versus Rising", tournaments: 52, likes: 1200, participants: 4800, crowdfunded: "$78,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2157560/library_600x900_2x.jpg" },
  { name: "Ultimate Marvel vs Capcom 3", tournaments: 44, likes: 1600, participants: 5400, crowdfunded: "$110,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/357190/library_600x900_2x.jpg" },
  { name: "King of Fighters XV", tournaments: 61, likes: 1400, participants: 6100, crowdfunded: "$98,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1498570/library_600x900_2x.jpg" },
  { name: "Tetris Effect", tournaments: 38, likes: 3200, participants: 22000, crowdfunded: "$64,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1003590/library_600x900_2x.jpg" },
  { name: "Skullgirls 2nd Encore", tournaments: 29, likes: 780, participants: 2800, crowdfunded: "$32,000", img: "https://cdn.cloudflare.steamstatic.com/steam/apps/245170/library_600x900_2x.jpg" },
];

const activityItems = [
  { user: "xBladeRunner", avatar: "blade1", amount: "$25.00", color: "text-green-400", event: "Tekken 8 World Tour Finals", time: "2 min ago" },
  { user: "StarLord_SC", avatar: "star2", amount: "$10.00", color: "text-blue-400", event: "Korean Starcraft League: Week 86", time: "5 min ago" },
  { user: "GuiltyGearFan", avatar: "gg3", amount: "$50.00", color: "text-yellow-400", event: "Guilty Gear Strive Showdown", time: "8 min ago" },
  { user: "FGC_Veteran", avatar: "fgc4", amount: "$5.00", color: "text-green-400", event: "Fatal Fury City of Wolves Open", time: "12 min ago" },
  { user: "ComboBreaker", avatar: "combo5", amount: "$100.00", color: "text-purple-400", event: "2XKO Beta Bash", time: "15 min ago" },
  { user: "PixelPerfect", avatar: "pixel6", amount: "$15.00", color: "text-blue-400", event: "Granblue Fantasy Rising Cup", time: "20 min ago" },
  { user: "TetrisGod99", avatar: "tet7", amount: "$30.00", color: "text-yellow-400", event: "Tetris Championship Series", time: "28 min ago" },
  { user: "RisingStar_", avatar: "rise8", amount: "$20.00", color: "text-green-400", event: "King of Fighters XV Regionals", time: "35 min ago" },
  { user: "SkullHeart", avatar: "skull9", amount: "$8.00", color: "text-pink-400", event: "Skullgirls Encore Revival", time: "42 min ago" },
  { user: "MvC_Legend", avatar: "mvc10", amount: "$75.00", color: "text-purple-400", event: "Ultimate Marvel vs Capcom 3 Throwback", time: "1 hr ago" },
];

// --- Component ---

export default function EventsPage() {
  const [browseSearch, setBrowseSearch] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recommendedCount, setRecommendedCount] = useState(5);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoAdvance = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIsTransitioning((t) => {
        if (t) return t;
        setCarouselIdx((prev) => (prev + 1) % featuredEvents.length);
        setTimeout(() => setIsTransitioning(false), 700);
        return true;
      });
    }, 6000);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCarouselIdx(idx);
    setTimeout(() => setIsTransitioning(false), 700);
    resetAutoAdvance();
  }, [isTransitioning, resetAutoAdvance]);

  useEffect(() => {
    resetAutoAdvance();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetAutoAdvance]);
  const rightSidebarContent = (
    <div className="p-5 space-y-4 flex-1">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Activity</h3>
        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">All Events (Latest)</span>
      </div>

      <div className="space-y-2">
        {activityItems.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors border border-white/5"
          >
            <Avatar className="h-8 w-8 flex-shrink-0 border border-white/10">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${item.avatar}`} />
              <AvatarFallback>{item.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${item.color}`}>{item.amount}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                <span className="text-white/70 font-medium">{item.user}</span>{" "}
                contributed to{" "}
                <span className="text-white/70 font-medium">{item.event}</span>
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
      <div data-agent-context hidden>
{`--- USER CONTEXT (injected by Matcherino at render time) ---
USER: Grant Matcherino (#1004) [from session]
EMAIL: grant@matcherino.com [from session]
ACCOUNT TYPE: Organizer (Tier 2) [from session]
TAX INTERVIEW: Completed [from API]
BALANCE: $28.33 [from API]
LINKED ACCOUNTS: Twitch (connected), Discord (not connected) [from API]
REGISTERED EVENTS: 4 active [from API]
FAVORITED GAMES: Brawl Stars, Starcraft II [from API]
RECENT SEARCHES: "brawl stars tournament", "SC2 weekly" [from API]

PAGE: Events Browser
PURPOSE: Browse, search, and discover tournaments on Matcherino.

SECTIONS ON THIS PAGE:
- Featured Events carousel: Highlighted upcoming tournaments with large banner cards
- Browse by Game: Grid of game tiles showing tournament count, participant count, and crowdfunded totals per game
- Recommended Events: Scrollable list of upcoming tournaments with details (date, format, participants, entry fee, prize pool)
- Live Activity Feed: Real-time ticker of recent contributions across all events

GAMES AVAILABLE: Tekken 8, Starcraft II, Guilty Gear Strive, Fatal Fury, 2XKO, Granblue Fantasy Versus Rising, Ultimate Marvel vs Capcom 3, King of Fighters XV, Tetris Effect, Skullgirls 2nd Encore, Street Fighter 6

USER GOALS ON THIS PAGE:
- Find a tournament for a specific game → Use search bar or Browse by Game section
- Find upcoming tournaments → Check Featured Events or Recommended Events
- See what is popular → Browse by Game shows tournament count and participant numbers
- Access favorited events → Use the star/favorites in the header
- Register for a tournament → Click on a tournament card to go to its detail page, then register

NAVIGATION:
- Clicking a tournament card navigates to the Tournament Detail page (/t/slug)
- Header has: Events, Partnership, Create links
- "Create" link goes to /create to set up a new tournament
- Profile accessible via header avatar

MATCHERINO SUPPORT INFO:
- For Brawl Stars issues (PINs, Supercell ID, disputes): redirect to Brawl Stars Discord https://discord.gg/AYna5z4RtF
- Tax interview required before any payouts: Profile icon > Retake Interview
- PayPal cashouts process automatically. Bank wire: email brian@matcherino.com
- Partnership applications: open a ticket in the Matcherino Discord
- Account linking issues: contact support — we can unlink Discord accounts on backend
- "No Session Token" error: try a different login method, contact support if locked out`}
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/events">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <a href="/events" className="px-3 py-1.5 text-sm font-semibold text-white border-b-2 border-primary">Events</a>
              <a href="/partnership" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Partnership</a>
              <a href="/create" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Create</a>
            </nav>
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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

      {/* Main Layout */}
      <div className="flex flex-1 relative h-[calc(100vh-4rem)] min-h-0 overflow-hidden">
        {/* Center Content */}
        <main className="flex-1 overflow-y-auto h-full bg-[#111827]/50 scroll-smooth pb-12 lg:pb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">

            {/* Featured Events */}
            <section id="section-featured" className="space-y-3 scroll-mt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Featured Events</h2>
              </div>

              <div className="relative" style={{ perspective: '1200px' }}>
                <div className="relative h-[380px] w-full flex items-center justify-center overflow-visible">
                  {featuredEvents.map((ev, i) => {
                    const total = featuredEvents.length;
                    const diff = ((i - carouselIdx) % total + total) % total;
                    const offset = diff > total / 2 ? diff - total : diff;
                    const isCenter = offset === 0;
                    const isLeft = offset === -1 || (offset === total - 1 && total > 2);
                    const isRight = offset === 1 || (offset === -(total - 1) && total > 2);
                    const isVisible = isCenter || isLeft || isRight;

                    let x = '0%';
                    let rotateY = 0;
                    let scale = 0.7;
                    let zIndex = 0;
                    let cardOpacity = 0;

                    if (isCenter) {
                      x = '0%'; rotateY = 0; scale = 1; zIndex = 30; cardOpacity = 1;
                    } else if (isLeft) {
                      x = '-60%'; rotateY = 40; scale = 0.55; zIndex = 20; cardOpacity = 0.5;
                    } else if (isRight) {
                      x = '60%'; rotateY = -40; scale = 0.55; zIndex = 20; cardOpacity = 0.5;
                    }

                    const handleClick = (e: React.MouseEvent) => {
                      if (isLeft) { e.preventDefault(); goToSlide((carouselIdx - 1 + total) % total); }
                      if (isRight) { e.preventDefault(); goToSlide((carouselIdx + 1) % total); }
                    };

                    return (
                      <motion.div
                        key={i}
                        animate={{
                          x,
                          rotateY,
                          scale,
                          opacity: isVisible ? cardOpacity : 0,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 22,
                          mass: 1,
                        }}
                        onClick={handleClick}
                        className={`absolute w-[75%] md:w-[50%] max-w-[520px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1C2230] ${!isCenter && isVisible ? 'cursor-pointer' : ''}`}
                        style={{
                          zIndex,
                          transformStyle: 'preserve-3d',
                          pointerEvents: isVisible ? 'auto' : 'none',
                        }}
                      >
                        {isCenter ? (
                          <Link href="/" className="block">
                            <div className="aspect-video overflow-hidden">
                              <img src={ev.img} alt={ev.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="px-3 py-2 md:px-4 md:py-3">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-xs md:text-base font-bold text-white truncate">{ev.name}</h3>
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] md:text-[11px] px-1.5 md:px-2 py-0 font-bold shrink-0">{ev.prize}</Badge>
                              </div>
                              <div className="hidden md:flex items-center gap-x-2 mt-1 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                                <span className="text-white/20">|</span>
                                <span>{ev.game}</span>
                                <span className="text-white/20">|</span>
                                <span>{ev.format}</span>
                                <span className="text-white/20">|</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.participants}</span>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <>
                            <div className="aspect-video overflow-hidden">
                              <img src={ev.img} alt={ev.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="px-3 py-2 md:px-4 md:py-3">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-xs md:text-base font-bold text-white truncate">{ev.name}</h3>
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px] md:text-[11px] px-1.5 md:px-2 py-0 font-bold shrink-0">{ev.prize}</Badge>
                              </div>
                              <div className="hidden md:flex items-center gap-x-2 mt-1 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                                <span className="text-white/20">|</span>
                                <span>{ev.game}</span>
                                <span className="text-white/20">|</span>
                                <span>{ev.format}</span>
                                <span className="text-white/20">|</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.participants}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}

                </div>

                {/* Arrows — outside the 3D carousel container so preserve-3d cards can't steal pointer events */}
                <button
                  aria-label="Carousel previous"
                  onClick={() => goToSlide((carouselIdx - 1 + featuredEvents.length) % featuredEvents.length)}
                  className="absolute left-4 top-[35%] -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white/70 hover:text-white flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  aria-label="Carousel next"
                  onClick={() => goToSlide((carouselIdx + 1) % featuredEvents.length)}
                  className="absolute right-4 top-[35%] -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white/70 hover:text-white flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-1">
                {featuredEvents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === carouselIdx
                        ? 'w-6 h-2 bg-primary'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* Recommended Events */}
            <section id="section-recommended" className="space-y-4 scroll-mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Recommended Events</h2>
                </div>
                {recommendedCount < recommendedEvents.length && (
                  <button
                    onClick={() => setRecommendedCount((c) => Math.min(c + 5, recommendedEvents.length))}
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                  >
                    Show More <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {recommendedEvents.slice(0, recommendedCount).map((ev, i) => (
                  <Link
                    href="/"
                    key={i}
                    className="rounded-xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={ev.img}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <h4 className="text-sm font-semibold text-white truncate">{ev.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">{ev.game}</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[10px] px-1.5 py-0 font-bold">
                          {ev.prize}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1 truncate"><Calendar className="w-3 h-3 shrink-0" />{ev.date}</span>
                        <span className="flex items-center gap-1 truncate"><Wifi className="w-3 h-3 shrink-0" />{ev.location}</span>
                        <span className="flex items-center gap-1 truncate"><Gamepad2 className="w-3 h-3 shrink-0" />{ev.game}</span>
                        <span className="flex items-center gap-1 truncate"><Ticket className="w-3 h-3 shrink-0" />{ev.entry}</span>
                        <span className="flex items-center gap-1 truncate"><Swords className="w-3 h-3 shrink-0" />{ev.format}</span>
                        <span className="flex items-center gap-1 truncate"><Users className="w-3 h-3 shrink-0" />{ev.participants} / {ev.maxParticipants}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Browse Events */}
            <section id="section-browse" className="space-y-4 scroll-mt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <Search className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Browse Events</h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={browseSearch}
                    onChange={(e) => setBrowseSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] bg-white/5 border-white/10">
                    <SelectValue placeholder="All Games..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games...</SelectItem>
                    <SelectItem value="fighting">Fighting</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="puzzle">Puzzle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {browseGames
                  .filter((g) => g.name.toLowerCase().includes(browseSearch.toLowerCase()))
                  .map((game, i) => (
                    <Link
                      href="/"
                      key={i}
                      className="rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer group relative block"
                    >

                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={game.img}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <h4 className="text-sm font-semibold text-white truncate">{game.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" /> {game.tournaments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" /> {game.participants.toLocaleString()}
                            </span>
                          </div>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-none text-[10px] px-1.5 py-0 font-bold">
                            {game.crowdfunded}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
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
