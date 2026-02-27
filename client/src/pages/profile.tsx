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
  Users,
  Swords,
  Package,
  Link2,
  Settings,
  Wallet,
  Calendar,
  MapPin,
  Gamepad2,
  ArrowDownToLine,
  ArrowUpFromLine,
  CreditCard,
  Banknote,
  Zap,
  Star,
  Eye,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// --- Mock Data ---

const socialLinks = [
  { name: "Twitch", icon: "twitch", url: "#" },
  { name: "X", icon: "x", url: "#" },
  { name: "YouTube", icon: "youtube", url: "#" },
  { name: "Facebook", icon: "facebook", url: "#" },
  { name: "Instagram", icon: "instagram", url: "#" },
];

const profileNav = [
  { label: "Events", icon: Calendar, id: "events" },
  { label: "Teams", icon: Users, id: "teams" },
  { label: "Match History", icon: Swords, id: "match-history" },
  { label: "Items", icon: Package, id: "items" },
  { label: "Connect Accounts", icon: Link2, id: "connect" },
  { label: "Settings", icon: Settings, id: "settings" },
  { label: "Wallet", icon: Wallet, id: "wallet" },
];

const userEvents = [
  {
    title: "Dani's SC2 Tournament!",
    image: "photo-1542751371-adc38448a05e",
    date: "Sun, Jul 17, 2025",
    location: "Online",
    game: "Starcraft II",
    entry: "Free",
    format: "Single Elim",
    participants: 15,
    prizePool: "$51.10",
    organizerAvatar: "https://i.pravatar.cc/150?u=org1",
  },
  {
    title: "Let's learn - Bracketing, Series, CLR!",
    image: "photo-1511512578047-dfb367046420",
    date: "Mon, Oct 5, 2025",
    location: "Online",
    game: "Other Games",
    entry: "Free",
    format: "None",
    participants: 4,
    prizePool: "$21.60",
    organizerAvatar: "https://i.pravatar.cc/150?u=org2",
  },
  {
    title: "test form 2:13",
    image: "photo-1493711662062-fa541adb3fc8",
    date: "Not yet Scheduled",
    location: "Online",
    game: "Other Games",
    entry: "Free",
    format: "None",
    participants: 1,
    prizePool: "$0.40",
    organizerAvatar: "https://i.pravatar.cc/150?u=org3",
  },
  {
    title: "test tournament form",
    image: "photo-1550745165-9bc0b252726f",
    date: "Not yet Scheduled",
    location: "Online",
    game: "Other Games",
    entry: "Free",
    format: "None",
    participants: 2,
    prizePool: "$0.00",
    organizerAvatar: "https://i.pravatar.cc/150?u=org4",
  },
];

const transactions = [
  { name: "The Bazaar - Community Cup 7", type: "Coupon", date: "02/16/26", amount: "$0.25", positive: true },
  { name: "testBrawl", type: "Purchase", date: "02/16/26", amount: "-$5.00", positive: false },
  { name: "testBrawl", type: "Purchase", date: "02/16/26", amount: "-$5.00", positive: false },
  { name: "Zytrix Clash Cup #1 (20$)", type: "Contribution", date: "12/19/25", amount: "-$10.00", positive: false },
  { name: "The Bazaar League", type: "Purchase", date: "12/11/25", amount: "-$1.00", positive: false },
  { name: "SC2 Masters Finals", type: "Winnings", date: "11/30/25", amount: "$150.00", positive: true },
];

const activityItems = [
  { user: "GamerX", action: "contributed $5.00 to Dani's SC2 Tournament", time: "2 minutes ago", avatar: "GX" },
  { user: "ProPlayer99", action: "joined your tournament bracket", time: "15 minutes ago", avatar: "PP" },
  { user: "SponsorCo", action: "contributed $500 to prize pool", time: "3 hours ago", avatar: "SC" },
  { user: "TeamAlpha", action: "registered for series event", time: "5 hours ago", avatar: "TA" },
  { user: "EventMaster", action: "followed your profile", time: "8 hours ago", avatar: "EM" },
  { user: "FGCWeekly", action: "mentioned you in a comment", time: "1 day ago", avatar: "FW" },
  { user: "TourneyBot", action: "awarded you Tier 2 Coupons", time: "2 days ago", avatar: "TB" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("events");
  const [sidebarTab, setSidebarTab] = useState<"wallet" | "activity">("wallet");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftSidebarContent = (
    <div className="p-4 space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar className="w-28 h-28 border-2 border-primary/50">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" />
            <AvatarFallback className="text-2xl">GM</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 border-2 border-[#2b2d31] flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
            <Pencil className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-[#2b2d31] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
          </div>
        </div>
      </div>

      {/* Name + Tag */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <h2 className="text-xl font-bold text-white">Grant Matcherino</h2>
        </div>
        <p className="text-sm text-white/70">#1004</p>
        <p className="text-sm text-white/60 mt-2">Co-Founder of Matcherino</p>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-2">
        {socialLinks.map((s) => (
          <a
            key={s.name}
            href={s.url}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            title={s.name}
          >
            <span className="text-xs text-muted-foreground font-bold">{s.name[0]}</span>
          </a>
        ))}
      </div>

      {/* Following / Followers */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <span><strong className="text-white">8</strong> <span className="text-muted-foreground">Following</span></span>
        <span><strong className="text-white">1</strong> <span className="text-muted-foreground">Followers</span></span>
      </div>

      {/* Navigation */}
      <div className="space-y-1">
        {profileNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-white/10 text-white border-l-4 border-primary'
                  : 'text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <item.icon className="w-5 h-5 opacity-70" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const rightSidebarContent = (
    <>
      {/* Tabs */}
      <div className="flex items-center border-b border-white/5 shrink-0">
        <button
          onClick={() => setSidebarTab("activity")}
          className={`flex-1 flex justify-center py-3 text-sm font-medium border-b-2 transition-all ${sidebarTab === "activity" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
        >
          <Zap className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSidebarTab("wallet")}
          className={`flex-1 flex justify-center py-3 text-sm font-medium border-b-2 transition-all ${sidebarTab === "wallet" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
        >
          <Wallet className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 space-y-5 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {sidebarTab === "wallet" ? (
          <>
            {/* Wallet */}
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Wallet</h3>
              <span className="text-xs text-muted-foreground">Balance</span>
            </div>

            <div className="rounded-xl border border-white/5 bg-card/50 p-5">
              <p className="text-3xl font-bold text-white">$28.33</p>
            </div>

            {/* Cash Out */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Cash Out</h4>
                <span className="text-xs text-muted-foreground">$1.00 minimum</span>
              </div>
              <input
                type="text"
                placeholder="Enter Amount to Withdraw"
                className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/60"
              />
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  PayPal
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white">
                  <Banknote className="w-4 h-4 text-muted-foreground" />
                  Bank
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">Problems Cashing Out?</a>
                <button className="text-muted-foreground hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors">
                  Complete Tax Interview Here
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Transactions</h4>
                <ArrowDownToLine className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="space-y-1">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{tx.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 border ${
                            tx.type === "Coupon" ? "border-amber-500/30 text-amber-400" :
                            tx.type === "Purchase" ? "border-blue-500/30 text-blue-400" :
                            tx.type === "Contribution" ? "border-purple-500/30 text-purple-400" :
                            "border-green-500/30 text-green-400"
                          }`}
                        >
                          {tx.type}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold shrink-0 ml-3 ${tx.positive ? "text-green-400" : "text-red-400"}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Activity */}
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Activity</h3>
              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">Profile (Latest)</span>
            </div>

            <div className="space-y-2">
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
          </>
        )}
      </div>
    </>
  );

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
            <Link href="/events">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/events" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Events</Link>
              <Link href="/partnership" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Partnership</Link>
              <Link href="/create" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Create</Link>
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

      {/* Main Layout */}
      <div className="flex flex-1 relative min-h-0 overflow-hidden">

        {/* Left Sidebar */}
        <aside className="w-[280px] flex-col flex-shrink-0 hidden md:flex border-r border-white/5 h-full overflow-y-auto bg-[#2b2d31] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {leftSidebarContent}
        </aside>

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto h-full bg-[#313338]/50 scroll-smooth pb-12 md:pb-0">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">

            {/* Events Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">Events</h3>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Select>
                  <SelectTrigger className="w-[120px] bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="Both" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="organizer">Organizer</SelectItem>
                    <SelectItem value="participant">Participant</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px] bg-[#2b2d31] border-white/10 text-sm">
                    <SelectValue placeholder="Participant Of" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2b2d31] border-white/10">
                    <SelectItem value="participant">Participant Of</SelectItem>
                    <SelectItem value="organizer">Organizer Of</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 min-w-[180px]">
                  <input
                    type="text"
                    placeholder="Event Name..."
                    className="w-full bg-[#2b2d31] border border-white/10 rounded-lg h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userEvents.map((evt, i) => (
                  <Link key={i} href="/">
                    <div className="rounded-xl overflow-hidden border border-white/5 hover:border-white/10 bg-[#2b2d31] transition-all cursor-pointer group">
                      <div className="relative h-[140px] overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/${evt.image}?auto=format&fit=crop&w=600&q=80`}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d31] via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <Avatar className="w-6 h-6 border border-white/20">
                            <AvatarImage src={evt.organizerAvatar} />
                            <AvatarFallback className="text-[10px]">O</AvatarFallback>
                          </Avatar>
                          <h4 className="text-sm font-bold text-white drop-shadow-lg line-clamp-1">{evt.title}</h4>
                        </div>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate">{evt.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            <span>{evt.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Gamepad2 className="w-3 h-3" />
                            <span>{evt.game}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            <span>{evt.participants} joined</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold">
                          <Trophy className="w-3.5 h-3.5 mr-1.5" />
                          {evt.prizePool}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect Accounts Section */}
            <div className="space-y-6" id="connect">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-white">Connect Accounts</h3>
              </div>

              {/* Stream Account URL Link */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-white">Stream Account URL Link</h4>
                  <button className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-colors">Add</button>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#2b2d31] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-white">Twitch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Link Social Accounts */}
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-white">Link Social Accounts</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    {[
                      { name: "Battlenet", connected: false },
                      { name: "Facebook", connected: false },
                      { name: "Google", connected: false },
                      { name: "YouTube", connected: false },
                      { name: "Twitch", connected: true },
                      { name: "X", connected: false },
                      { name: "Discord", connected: false },
                      { name: "Mixer", connected: false },
                      { name: "Wasd", connected: false },
                      { name: "Line", connected: false },
                      { name: "Wargaming", connected: false },
                    ].map((platform) => (
                      <div
                        key={platform.name}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${
                          platform.connected
                            ? "bg-[#9146FF] text-white"
                            : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
                        }`}
                        title={platform.name}
                      >
                        {platform.name.slice(0, 2)}
                      </div>
                    ))}
                  </div>
                  <button className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-colors shrink-0 ml-4">Connect</button>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="space-y-6" id="settings">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-white">Settings</h3>
              </div>

              {/* Charity Contribution Receipt Information */}
              <div className="space-y-3 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-white">Charity Contribution Receipt Information</h4>
                  <span className="text-xs text-muted-foreground">This information is only visible to you.</span>
                </div>
                <div className="space-y-1.5 max-w-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Full Legal Name</label>
                  <input
                    type="text"
                    defaultValue="Grant Farwell"
                    className="w-full bg-[#2b2d31] border border-white/10 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Notification Email */}
              <div className="space-y-3 pb-6 border-b border-white/5">
                <h4 className="text-base font-semibold text-primary">Notification Email</h4>
                <div className="max-w-lg">
                  <input
                    type="email"
                    defaultValue="grantgfarwell@gmail.com"
                    className="w-full bg-[#2b2d31] border border-white/10 rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Send email notifications */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Send email notifications</span>
                <button className="w-11 h-6 rounded-full bg-green-500 relative transition-colors">
                  <span className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform" />
                </button>
              </div>

              {/* Discord Rich Presence */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Discord Rich Presence Enabled by Default</span>
                <button className="w-11 h-6 rounded-full bg-green-500 relative transition-colors">
                  <span className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Wallet + Activity */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden xl:flex border-l border-white/5 h-full bg-[#2b2d31]">
          {rightSidebarContent}
        </aside>
      </div>
      <MobileSidebarBar leftSidebar={leftSidebarContent} rightSidebar={rightSidebarContent} />
    </div>
  );
}

