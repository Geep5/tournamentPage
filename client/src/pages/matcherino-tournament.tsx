import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Search, Trophy, Users, Heart, ScrollText, MessageSquare,
  ChevronDown, ChevronRight, BookOpen, GitMerge, Wallet,
  CircleDollarSign, Crown, Maximize2, ZoomIn, ZoomOut, Eye,
  Crosshair, Shield, Menu, X, ExternalLink, Globe, Clock,
  MapPin, Gamepad2, Swords, CalendarDays
} from "lucide-react";

import bannerImage from "@assets/image_1771577591955.png";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// Matcherino brand yellow
const BRAND = "#FACC15";

type Tab = "overview" | "contributions" | "teams" | "bracket";

export default function MatcherinoTournamentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donorPage, setDonorPage] = useState(1);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "contributions", label: "Contributions" },
    { id: "teams", label: "Teams" },
    { id: "bracket", label: "Bracket" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col font-sans">

      {/* ===== TOP NAV ===== */}
      <header className="h-14 bg-[#16162a] border-b border-white/5 flex items-center px-4 md:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden p-1.5 rounded-lg hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/matcherino" className="flex items-center gap-2.5 group">
            <img src={helmetLogo} alt="Matcherino" className="w-7 h-7" />
            <span className="text-base font-bold tracking-tight hidden sm:block text-white/90">MATCHERINO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5 ml-3">
            {["Browse", "Create", "Dashboard"].map((item) => (
              <a key={item} href="#" className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input type="text" placeholder="Search events..." className="bg-white/5 border border-white/10 rounded-md h-8 pl-8 pr-3 text-xs text-white/80 focus:outline-none focus:border-yellow-500/50 w-44 placeholder:text-white/25" />
          </div>
          <a href="#" className="text-[13px] font-medium text-white/50 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">
            Log In
          </a>
          <a href="#" className="text-[13px] font-bold text-black bg-yellow-400 hover:bg-yellow-300 px-4 py-1.5 rounded-md transition-colors">
            Sign Up
          </a>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#16162a] border-b border-white/5 px-4 py-2 space-y-0.5">
          {["Browse", "Create", "Dashboard"].map(item => (
            <a key={item} href="#" className="block px-3 py-2.5 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* ===== BANNER ===== */}
      <div className="relative w-full">
        <div className="w-full h-48 md:h-64 overflow-hidden relative">
          <img src={bannerImage} alt="Tournament Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />
        </div>
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-0">
          <div className="max-w-4xl mx-auto pb-4 flex items-end gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                  Registering
                </span>
                <span className="text-xs text-white/40">Brawl Stars</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Road to Brawl Cup SESA
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-white/50">
                <span className="flex items-center gap-1.5">by <strong className="text-white/80 font-medium">Quantum Studios</strong></span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> 64 / 128 teams
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 pb-1">
              <button className="px-5 py-2 rounded-md font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors text-sm shadow-lg shadow-yellow-500/20">
                Join Tournament
              </button>
              <button className="p-2 rounded-md border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== INFO BAR ===== */}
      <div className="bg-[#16162a] border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center gap-6 px-4 md:px-0 py-3 overflow-x-auto text-sm [&::-webkit-scrollbar]:hidden">
          {[
            { icon: CalendarDays, label: "Thu, Feb 19, 2026", sub: "3:00 AM PST" },
            { icon: Swords, label: "3v3", sub: "Double Elim" },
            { icon: Wallet, label: "Free Entry", sub: "" },
            { icon: Globe, label: "South America", sub: "" },
            { icon: Gamepad2, label: "Mobile / Tablet", sub: "" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <item.icon className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-1.5">
                <span className="text-white/70 font-medium whitespace-nowrap">{item.label}</span>
                {item.sub && <span className="text-white/30 whitespace-nowrap">{item.sub}</span>}
              </div>
              {i < 4 && <div className="w-px h-4 bg-white/10 ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* ===== TAB BAR ===== */}
      <div className="bg-[#16162a]/80 backdrop-blur-sm sticky top-14 z-40 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center px-4 md:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {tab.label}
              {tab.id === "teams" && <span className="ml-1.5 text-xs text-white/30">(64)</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 md:px-0 py-8">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-10">

              {/* Prize Pool Hero */}
              <div className="bg-[#1f1f3a] rounded-xl border border-white/5 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-lg font-bold">Prize Pool</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">$4,250.00</div>
                    <div className="text-xs text-white/40">of $5,000 goal</div>
                  </div>
                </div>
                <Progress value={85} className="h-2 bg-white/5" indicatorClassName="bg-gradient-to-r from-yellow-500 to-yellow-400" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">85% Funded &middot; 42 contributors</span>
                  <button className="px-4 py-2 rounded-md font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors text-sm">
                    Contribute
                  </button>
                </div>
              </div>

              {/* About */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <ScrollText className="w-5 h-5 text-yellow-400/70" />
                  <h2 className="text-lg font-bold">About</h2>
                </div>
                <div className="relative">
                  <div className={`text-white/60 text-sm leading-relaxed space-y-3 overflow-hidden transition-[max-height] duration-500 ${aboutExpanded ? 'max-h-[2000px]' : 'max-h-[5rem]'}`}>
                    <p>Welcome to the MS Gaming Pro Series! This is a premier Brawl Stars tournament series featuring the best teams in North America competing for a massive prize pool. Teams will battle through a double-elimination bracket to prove their worth.</p>
                    <p>All matches will be streamed live on Twitch with professional casting and analysis. We're partnering with top content creators in the Brawl Stars community to bring you the best viewing experience possible.</p>
                    <p>This is the third stop in the 2026 Pro Circuit, with points counting towards the Global Finals seeding in December. Top 8 finishers earn circuit points, and the winner receives a direct invite to the Regional Qualifier.</p>
                  </div>
                  {!aboutExpanded && <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1a1a2e] to-transparent" />}
                  <button onClick={() => setAboutExpanded(!aboutExpanded)} className="mt-2 text-xs font-medium text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                    {aboutExpanded ? "Show less" : "Read more"} <ChevronDown className={`w-3 h-3 transition-transform ${aboutExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </section>

              {/* Rules */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-yellow-400/70" />
                  <h2 className="text-lg font-bold">Rules & Information</h2>
                </div>
                <div className="bg-[#1f1f3a] rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                  {[
                    { title: "Tournament Rules & Guidelines", items: [
                      "All players must be at least 13 years old to participate.",
                      "Players must play on their own accounts. Account sharing is strictly prohibited.",
                      "Matches are Best of 3 (BO3) Sets. Grand Finals will be Best of 5 (BO5).",
                      "Brawler bans: Each team bans one brawler per set in power match format."
                    ]},
                    { title: "Check-in Process", items: [
                      "Captain check-in begins 60 minutes before tournament start.",
                      "If captain does not check in, the team will be disqualified.",
                      "All matches must be played immediately once the bracket is live."
                    ]},
                    { title: "Payout Information", items: [
                      "Prize pool payouts are processed through Matcherino.",
                      "Winners must have a valid Matcherino account and complete tax forms.",
                      "Payouts initiated within 7 business days after tournament conclusion."
                    ]},
                  ].map((rule, idx) => (
                    <RuleAccordion key={idx} title={rule.title} items={rule.items} defaultOpen={idx === 0} />
                  ))}
                </div>
              </section>

              {/* Stretch Goals */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Trophy className="w-5 h-5 text-yellow-400/70" />
                    <h2 className="text-lg font-bold">Stretch Goals</h2>
                  </div>
                  <span className="text-xs text-white/30">0 / 4 Reached</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Prize Pool Goal", amount: "$5,000", progress: 85, active: true, desc: "Initial prize pool target. $750 to go!" },
                    { name: "Streamer Reward", amount: "$12,500", progress: 0, active: false, desc: "Extra $2,500 split among streaming players." },
                    { name: "Prize Pool Increase", amount: "$17,500", progress: 0, active: false, desc: "Increases prize pool to $15,000." },
                    { name: "Upgrade Streamer Reward", amount: "$20,000", progress: 0, active: false, desc: "Increases streamer reward to $5,000." },
                  ].map((goal, idx) => (
                    <div key={idx} className={`rounded-lg border p-4 transition-all ${
                      goal.active ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-[#1f1f3a] border-white/5 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${goal.active ? 'bg-yellow-400 animate-pulse' : 'bg-white/20'}`} />
                          <span className={`text-sm font-semibold ${goal.active ? 'text-yellow-400' : 'text-white/50'}`}>{goal.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${goal.active ? 'text-white' : 'text-white/40'}`}>{goal.amount}</span>
                      </div>
                      {goal.active && (
                        <>
                          <Progress value={goal.progress} className="h-1 bg-white/5 mb-2" indicatorClassName="bg-yellow-400" />
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-white/40">{goal.desc}</p>
                            <button className="px-3 py-1.5 rounded-md font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors text-xs">
                              Contribute
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Prize Distribution */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-yellow-400/70" />
                  <h2 className="text-lg font-bold">Prize Distribution</h2>
                </div>
                <div className="bg-[#1f1f3a] rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                  {[
                    { place: "1st Place", pct: "50%", amount: "$2,500", color: "text-yellow-400", bar: "bg-yellow-400" },
                    { place: "2nd Place", pct: "30%", amount: "$1,500", color: "text-gray-300", bar: "bg-gray-400" },
                    { place: "3rd Place", pct: "10%", amount: "$500", color: "text-orange-400", bar: "bg-orange-400" },
                    { place: "MVP Award", pct: "Flat", amount: "$500", color: "text-blue-400", bar: "bg-blue-400" },
                  ].map((p) => (
                    <div key={p.place} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 rounded-full ${p.bar}`} />
                        <div>
                          <span className="text-sm font-medium text-white/80">{p.place}</span>
                          <span className="text-xs text-white/30 ml-2">{p.pct}</span>
                        </div>
                      </div>
                      <span className={`text-lg font-bold ${p.color}`}>{p.amount}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Staff */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-yellow-400/70" />
                  <h2 className="text-lg font-bold">Staff</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Quantum Studios", role: "Owner", sub: "Tournament Creator", avatar: "quantum" },
                    { name: "MikeK", role: "Admin", sub: "Bracket Manager", avatar: "admin1" },
                    { name: "JessicaL", role: "Admin", sub: "Stream Coordinator", avatar: "admin2" },
                    { name: "RyanD", role: "Moderator", sub: "Match Referee", avatar: "mod1" },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center gap-3 p-3.5 rounded-lg bg-[#1f1f3a] border border-white/5 hover:border-white/10 transition-colors">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${s.avatar}`} />
                        <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white/90 truncate">{s.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            s.role === "Owner" ? "bg-purple-500/20 text-purple-400" :
                            s.role === "Admin" ? "bg-amber-500/20 text-amber-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>{s.role}</span>
                        </div>
                        <span className="text-xs text-white/30">{s.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* CONTRIBUTIONS TAB */}
          {activeTab === "contributions" && (
            <div className="space-y-8">
              {/* Top 3 */}
              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { name: "JackMaster", amount: "$850", rank: 1, avatar: "topdonor1" },
                  { name: "SquadLeader", amount: "$625", rank: 2, avatar: "topdonor2" },
                  { name: "VortexFan", amount: "$400", rank: 3, avatar: "topdonor3" },
                ].map((d) => (
                  <div key={d.rank} className={`flex items-center gap-3 px-4 py-3 rounded-lg border flex-1 min-w-[200px] ${
                    d.rank === 1 ? 'bg-yellow-500/5 border-yellow-500/20' :
                    d.rank === 2 ? 'bg-white/[0.02] border-white/10' :
                    'bg-orange-500/5 border-orange-500/10'
                  }`}>
                    <span className={`text-xs font-bold w-5 ${
                      d.rank === 1 ? 'text-yellow-400' : d.rank === 2 ? 'text-gray-400' : 'text-orange-400'
                    }`}>#{d.rank}</span>
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${d.avatar}`} />
                      <AvatarFallback>{d.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 truncate">{d.name}</p>
                    </div>
                    <span className={`text-sm font-bold ${
                      d.rank === 1 ? 'text-yellow-400' : d.rank === 2 ? 'text-gray-300' : 'text-orange-400'
                    }`}>{d.amount}</span>
                  </div>
                ))}
              </div>

              {/* Contribution table */}
              <div className="bg-[#1f1f3a] rounded-xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 items-center px-4 py-2.5 border-b border-white/5 text-xs font-medium text-white/30 uppercase tracking-wider">
                  <span className="w-5">#</span>
                  <span>User</span>
                  <span>Type</span>
                  <span className="text-right">Amount</span>
                </div>
                {(() => {
                  const donors = [
                    { name: "JackMaster", amount: 850, type: "Spike Pin", time: "2h ago", avatar: "topdonor1" },
                    { name: "SquadLeader", amount: 625, type: "Spike Pin", time: "5h ago", avatar: "topdonor2" },
                    { name: "VortexFan", amount: 400, type: "Mandy Pin", time: "8h ago", avatar: "topdonor3" },
                    { name: "NeonBlade", amount: 250, type: "Spike Pin", time: "12h ago", avatar: "donor4" },
                    { name: "CyberPunkz", amount: 200, type: "Mandy Pin", time: "1d ago", avatar: "donor5" },
                    { name: "StarGazer99", amount: 175, type: "Spike Pin", time: "1d ago", avatar: "donor6" },
                    { name: "PhoenixRise", amount: 150, type: "Mandy Pin", time: "2d ago", avatar: "donor7" },
                    { name: "DarkMatter", amount: 125, type: "Spike Pin", time: "2d ago", avatar: "donor8" },
                    { name: "BlazeRunner", amount: 100, type: "Mandy Pin", time: "3d ago", avatar: "donor9" },
                    { name: "PixelDust", amount: 100, type: "Spike Pin", time: "3d ago", avatar: "donor10" },
                    { name: "GhostRecon", amount: 75, type: "Mandy Pin", time: "4d ago", avatar: "donor11" },
                    { name: "TurboMax", amount: 75, type: "Spike Pin", time: "4d ago", avatar: "donor12" },
                    { name: "NightOwl", amount: 50, type: "Mandy Pin", time: "5d ago", avatar: "donor13" },
                    { name: "FrostByte", amount: 50, type: "Spike Pin", time: "5d ago", avatar: "donor14" },
                    { name: "AlphaWolf", amount: 25, type: "Mandy Pin", time: "6d ago", avatar: "donor15" },
                  ];
                  const visible = donors.slice(0, donorPage * 10);
                  const remaining = donors.length - visible.length;
                  return (
                    <>
                      {visible.map((d, idx) => (
                        <div key={d.avatar} className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 items-center px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          <span className="text-xs text-white/20 w-5 font-mono">{idx + 1}</span>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar className="h-7 w-7 border border-white/10 flex-shrink-0">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${d.avatar}`} />
                              <AvatarFallback className="text-[8px]">{d.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <span className="text-sm font-medium text-white/80 truncate block">{d.name}</span>
                              <span className="text-[10px] text-white/25">{d.time}</span>
                            </div>
                          </div>
                          <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">{d.type}</span>
                          <span className={`text-sm font-semibold text-right ${idx < 3 ? 'text-yellow-400' : 'text-white/70'}`}>
                            ${d.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {remaining > 0 && (
                        <button onClick={() => setDonorPage(p => p + 1)} className="w-full py-3 text-center text-xs font-medium text-yellow-400 hover:bg-white/[0.02] transition-colors">
                          Show More ({remaining} remaining)
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TEAMS TAB */}
          {activeTab === "teams" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/40">64 of 128 slots filled</span>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                  <input type="text" placeholder="Search teams..." className="bg-white/5 border border-white/10 rounded-md h-8 pl-8 pr-3 text-xs focus:outline-none focus:border-yellow-500/50 w-48 placeholder:text-white/25" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 18 }, (_, i) => i + 1).map((i) => {
                  const isExpanded = expandedTeam === i;
                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isExpanded ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-[#1f1f3a] border-white/5 hover:border-white/10'
                      }`}
                      onClick={() => setExpandedTeam(isExpanded ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-10 w-10 border ${isExpanded ? 'border-yellow-500/40' : 'border-white/10'}`}>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=team${i}`} />
                          <AvatarFallback className="text-xs bg-white/5">T{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isExpanded ? 'text-yellow-400' : 'text-white/80'}`}>
                            Team Alpha {i}
                          </p>
                          {/* Member avatar row (Matcherino style) */}
                          <div className="flex items-center gap-0.5 mt-1.5">
                            {[0, 1, 2].map((pIdx) => (
                              <Avatar key={pIdx} className="h-5 w-5 border border-[#1f1f3a] -ml-0.5 first:ml-0">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=player${i}${pIdx}`} />
                                <AvatarFallback className="text-[7px]">P</AvatarFallback>
                              </Avatar>
                            ))}
                            <span className="text-[10px] text-white/25 ml-1.5">3 players</span>
                          </div>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90 text-yellow-400' : 'text-white/20'}`} />
                      </div>
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                          {['PlayerOne', 'ProGamer', 'SniperXYZ'].map((player, pIdx) => (
                            <div key={pIdx} className="flex items-center justify-between py-1">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border border-white/10">
                                  <AvatarImage src={`https://i.pravatar.cc/150?u=player${i}${pIdx}`} />
                                  <AvatarFallback className="text-[8px]">{player[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-white/70">{player}</span>
                              </div>
                              {pIdx === 0 && <span className="text-[9px] font-bold text-yellow-400/70 bg-yellow-400/10 px-1.5 py-0.5 rounded">CPT</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* BRACKET TAB */}
          {activeTab === "bracket" && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/40">Single Elimination &middot; Best of 3</span>
                </div>
                <div className="flex items-center gap-1">
                  {[Crosshair, Eye, ZoomIn, ZoomOut, Maximize2].map((Icon, idx) => (
                    <button key={idx} className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Round Headers */}
              <div className="bg-[#1f1f3a] rounded-xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-3 border-b border-white/5">
                  {["Quarterfinals", "Semifinals", "Finals"].map((round, i) => (
                    <div key={round} className={`px-4 py-2.5 text-center ${i < 2 ? 'border-r border-white/5' : ''}`}>
                      <span className="text-xs font-semibold text-white/60">{round}</span>
                    </div>
                  ))}
                </div>

                {/* Bracket tree */}
                <div className="p-6 overflow-x-auto min-h-[320px] flex items-center">
                  <div className="flex gap-20 min-w-max mx-auto">
                    {/* QF */}
                    <div className="flex flex-col justify-around gap-10">
                      <MatchCard num={1} teamA="Hotel Moscow" teamB="Golden Rush" scoreA={2} scoreB={0} winA />
                      <MatchCard num={2} teamA="Russians Unite" teamB="M&Ms" scoreA={2} scoreB={0} winA />
                    </div>
                    {/* SF */}
                    <div className="flex flex-col justify-around gap-10">
                      <MatchCard num={3} teamA="Hotel Moscow" teamB="Tempest Release" scoreA={2} scoreB={1} winA />
                      <MatchCard num={4} teamA="Russians Unite" teamB="Goldman..." scoreA={2} scoreB={0} winA />
                    </div>
                    {/* Finals */}
                    <div className="flex flex-col justify-center">
                      <MatchCard num="F" teamA="Hotel Moscow" teamB="Russians Unite" scoreA={3} scoreB={1} winA isFinal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#16162a] border-t border-white/5 py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-white/20">
          <span>&copy; 2026 Matcherino, Inc.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/40 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== Sub-components =====

function RuleAccordion({ title, items, defaultOpen = false }: { title: string; items: string[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors">
        <span className="text-sm font-medium text-white/80">{title}</span>
        <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0">
          <ul className="list-disc pl-5 space-y-1.5 text-white/50 text-sm leading-relaxed">
            {items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function MatchCard({ num, teamA, teamB, scoreA, scoreB, winA, isFinal = false }: {
  num: number | string; teamA: string; teamB: string; scoreA: number; scoreB: number; winA: boolean; isFinal?: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
        isFinal ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white/40'
      }`}>{num}</div>
      <div className={`flex flex-col w-52 rounded-lg overflow-hidden border ${isFinal ? 'border-yellow-500/30' : 'border-white/5'}`}>
        <div className={`flex items-center justify-between px-3 py-2.5 ${winA ? 'bg-white/[0.06]' : 'bg-white/[0.02]'}`}>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 border border-white/10">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${teamA.toLowerCase().replace(/\s/g,'')}`} />
              <AvatarFallback className="text-[8px]">{teamA.slice(0,2)}</AvatarFallback>
            </Avatar>
            <span className={`text-sm ${winA ? 'font-medium text-white/90' : 'text-white/40'}`}>{teamA}</span>
            {isFinal && winA && <Trophy className="w-3 h-3 text-yellow-400" />}
          </div>
          <span className={`text-sm font-bold ${winA ? 'text-yellow-400' : 'text-white/20'}`}>{scoreA}</span>
        </div>
        <div className={`flex items-center justify-between px-3 py-2.5 border-t border-white/5 ${!winA ? 'bg-white/[0.06]' : 'bg-white/[0.02] opacity-50'}`}>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 border border-white/10">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${teamB.toLowerCase().replace(/\s/g,'')}`} />
              <AvatarFallback className="text-[8px]">{teamB.slice(0,2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white/50">{teamB}</span>
          </div>
          <span className={`text-sm font-bold ${!winA ? 'text-yellow-400' : 'text-white/20'}`}>{scoreB}</span>
        </div>
      </div>
    </div>
  );
}
