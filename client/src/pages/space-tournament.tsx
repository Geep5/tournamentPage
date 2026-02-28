import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Search, Trophy, Calendar, Users, Heart, ScrollText, MessageSquare,
  ChevronRight, ChevronDown, BookOpen, GitMerge, Flag, Wallet, Zap,
  CircleDollarSign, Crown, Clock, Maximize2, ZoomIn, ZoomOut, Eye,
  Crosshair, Shield, LayoutGrid, Radio, Coins, ClipboardList, Menu, X
} from "lucide-react";

import bannerImage from "@assets/image_1771577591955.png";
import helmetLogo from "@assets/mhelmet_1771552283812.png";

// -- Design tokens --
const orange = {
  50: "#FFF7ED", 100: "#FFEDD5", 200: "#FED7AA", 300: "#FDBA74",
  400: "#FB923C", 500: "#F97316", 600: "#EA580C", 700: "#C2410C",
};

export default function SpaceTournamentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "rules", label: "Rules", icon: ClipboardList },
    { id: "contributions", label: "Contributions", icon: Coins },
    { id: "teams", label: "Teams", icon: Users, badge: "207" },
    { id: "bracket", label: "Bracket", icon: GitMerge },
    { id: "stream", label: "Stream", icon: Radio },
    { id: "goals", label: "Goals", icon: Flag },
    { id: "payouts", label: "Payouts", icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1a1a2e] flex flex-col font-sans">

      {/* ===== HEADER ===== */}
      <header className="h-16 bg-white border-b border-gray-200/80 flex items-center px-6 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-6 flex-1">
          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Logo */}
          <Link href="/space" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
              <img src={helmetLogo} alt="Logo" className="w-5 h-5 brightness-[10]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">MATCHERINO</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {["Events", "Partnership", "Create"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-all">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-gray-100 border border-gray-200 rounded-xl h-9 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 placeholder:text-gray-400 w-48 transition-all" />
          </div>
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <Zap className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
          <Avatar className="h-8 w-8 border-2 border-orange-200 cursor-pointer hover:border-orange-400 transition-colors">
            <AvatarImage src="https://i.pravatar.cc/150?u=spaceuser" />
            <AvatarFallback className="bg-orange-100 text-orange-700 text-xs">GF</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-1 shadow-lg z-40">
          {["Events", "Partnership", "Create"].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-1 h-[calc(100vh-4rem)] min-h-0 overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-[280px] flex-col flex-shrink-0 hidden md:flex bg-white border-r border-gray-200/80 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="p-5 space-y-6">
            {/* Banner */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200/80">
              <img src={bannerImage} alt="Tournament Banner" className="w-full h-auto object-cover aspect-video" />
            </div>

            {/* Title */}
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold leading-tight text-gray-900">
                Road to Brawl Cup<br/>SESA
              </h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                by
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://i.pravatar.cc/150?u=quantum" />
                  <AvatarFallback>QS</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-gray-700 hover:text-orange-600 cursor-pointer transition-colors">Quantum Studios</span>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex justify-center">
                <div className="w-9 h-9 rounded-xl bg-[#5865F2] flex items-center justify-center text-white cursor-pointer hover:bg-[#4752C4] transition-colors shadow-md shadow-[#5865F2]/20">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      const sectionId = item.id === 'overview' ? 'about'
                        : item.id === 'contributions' ? 'prize-pool'
                        : item.id === 'teams' ? 'participants'
                        : item.id;
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 border-l-[3px] border-orange-500 shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-l-[3px] border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 overflow-y-auto h-full bg-[#F8F9FC] scroll-smooth">
          {/* Hero header info */}
          <div className="w-full max-w-5xl mx-auto px-4 md:px-10 pt-6 pb-0">
            <div className="flex-1 w-full">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 flex items-center gap-3 uppercase tracking-tight">
                <span className="text-orange-500">&#9876;</span>
                Road to Brawl Cup SESA
              </h1>

              {/* Feature Image */}
              <div className="w-full bg-white rounded-2xl flex items-center justify-center border border-gray-200/80 overflow-hidden mb-6 shadow-sm">
                <img src={bannerImage} alt="Tournament Banner" className="w-full h-auto object-cover aspect-video" />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {[
                  { label: "Status", value: "Registering", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
                  { label: "Entry Fee", value: "Free" },
                  { label: "Game", value: "Brawl Stars" },
                  { label: "Region", value: "South America" },
                  { label: "Date/Time", value: "Thu, Feb 19\n3:00AM PST" },
                  { label: "Team Size", value: "3v3" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-white border border-gray-200/80 flex flex-col gap-1.5 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{stat.label}</span>
                    {stat.color ? (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg w-fit ${stat.bg} ${stat.color}`}>{stat.value}</span>
                    ) : (
                      <span className="font-semibold text-gray-800 text-sm whitespace-pre-line">{stat.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 md:px-10 max-w-5xl mx-auto space-y-10 pb-32 pt-0">
            <div className="space-y-10">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-10">

                  {/* ===== ABOUT ===== */}
                  <section id="about" className="space-y-5 scroll-mt-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200/80 pb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500">
                          <ScrollText className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">About</h2>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <span className="text-sm text-gray-400 hidden sm:block">Registration closes in 4 days</span>
                        <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 transition-all text-sm">
                          Join Tournament
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className={`text-gray-500 space-y-4 leading-relaxed overflow-hidden transition-[max-height] duration-500 ${aboutExpanded ? 'max-h-[2000px]' : 'max-h-[4.5rem]'}`}>
                        <p>Welcome to the MS Gaming Pro Series! This is a premier Brawl Stars tournament series featuring the best teams in North America competing for a massive prize pool. Teams will battle through a double-elimination bracket to prove their worth.</p>
                        <p>All matches will be streamed live on Twitch with professional casting and analysis. We're partnering with top content creators in the Brawl Stars community to bring you the best viewing experience possible.</p>
                        <p>This is the third stop in the 2026 Pro Circuit, with points counting towards the Global Finals seeding in December. Top 8 finishers earn circuit points, and the winner receives a direct invite to the Regional Qualifier.</p>
                      </div>
                      <button onClick={() => setAboutExpanded(!aboutExpanded)} className="relative w-full text-left group">
                        {!aboutExpanded && <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-[#F8F9FC] to-transparent pointer-events-none" />}
                        <div className="flex items-center gap-2 pt-3">
                          <div className="h-px flex-1 bg-gray-200" />
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 group-hover:text-orange-600 px-4 py-1.5 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
                            {aboutExpanded ? 'Show less' : 'Read more'}
                          </span>
                          <div className="h-px flex-1 bg-gray-200" />
                        </div>
                      </button>
                    </div>
                  </section>

                  {/* ===== RULES ===== */}
                  <section id="rules" className="space-y-5 scroll-mt-24">
                    <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-500">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Rules & Information</h2>
                    </div>
                    <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
                      {[
                        { title: "Tournament Rules & Guidelines", content: [
                          "All players must be at least 13 years old to participate.",
                          "Players must play on their own accounts. Account sharing is strictly prohibited.",
                          "Matches are Best of 3 (BO3) Sets. Grand Finals will be Best of 5 (BO5) Sets.",
                          "Brawler bans: Each team bans one brawler per set in power match format."
                        ]},
                        { title: "Check-in Process", content: [
                          "Captain check-in begins 60 minutes before tournament start.",
                          "If captain does not check in before bracket generation, the team will be disqualified.",
                          "All matches must be played immediately once the bracket is live."
                        ]},
                        { title: "Payout Information", content: [
                          "Prize pool payouts are processed through Matcherino.",
                          "Winners must have a valid Matcherino account and complete tax forms.",
                          "Payouts initiated within 7 business days after tournament conclusion."
                        ]},
                      ].map((rule, idx) => (
                        <RuleAccordion key={idx} title={rule.title} items={rule.content} defaultOpen={idx === 0} isLast={idx === 2} />
                      ))}
                    </div>
                  </section>

                  {/* ===== PRIZE POOL ===== */}
                  <section id="prize-pool" className="space-y-5 scroll-mt-24">
                    <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Prize Pool</h2>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-orange-500">$4,250</div>
                        <div className="text-sm text-gray-400">Current Total</div>
                      </div>
                    </div>

                    {/* Progress card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-orange-700">85% Funded</span>
                        <span className="text-sm text-orange-500/80 font-medium">Goal: $5,000</span>
                      </div>
                      <div className="h-2.5 bg-orange-200/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <button className="mt-4 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 transition-all text-sm">
                        Contribute to Prize Pool
                      </button>
                    </div>

                    {/* Buckets */}
                    <div className="space-y-3">
                      {[
                        { name: "1st Place", pct: "50%", amount: "$2,500", color: "orange", icon: "gold" },
                        { name: "2nd Place", pct: "30%", amount: "$1,500", color: "gray", icon: "silver" },
                        { name: "3rd Place", pct: "10%", amount: "$500", color: "amber", icon: "bronze" },
                        { name: "MVP Award", pct: "Flat", amount: "$500", color: "blue", icon: "mvp" },
                      ].map((bucket) => (
                        <div key={bucket.name} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              bucket.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                              bucket.color === 'gray' ? 'bg-gray-100 text-gray-500' :
                              bucket.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                              'bg-blue-50 text-blue-500'
                            }`}>
                              <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{bucket.name}</h4>
                              <p className="text-xs text-gray-400">{bucket.pct} of total pool</p>
                            </div>
                          </div>
                          <div className={`text-xl font-bold ${
                            bucket.color === 'orange' ? 'text-orange-500' :
                            bucket.color === 'gray' ? 'text-gray-500' :
                            bucket.color === 'amber' ? 'text-amber-600' :
                            'text-blue-500'
                          }`}>{bucket.amount}</div>
                        </div>
                      ))}
                    </div>

                    {/* Top Donors */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-orange-500" /> Top Donors
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { name: "JackMaster", amount: "$850", rank: 1, color: "orange" },
                          { name: "SquadLeader", amount: "$625", rank: 2, color: "gray" },
                          { name: "VortexFan", amount: "$400", rank: 3, color: "amber" },
                        ].map((donor) => (
                          <div key={donor.rank} className={`relative p-5 rounded-2xl bg-white border shadow-sm text-center ${
                            donor.color === 'orange' ? 'border-orange-200' :
                            donor.color === 'gray' ? 'border-gray-200' :
                            'border-amber-200'
                          }`}>
                            <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-lg ${
                              donor.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                              donor.color === 'gray' ? 'bg-gray-100 text-gray-500' :
                              'bg-amber-50 text-amber-600'
                            }`}>#{donor.rank}</div>
                            <Avatar className={`h-14 w-14 mx-auto border-2 ${
                              donor.color === 'orange' ? 'border-orange-300' :
                              donor.color === 'gray' ? 'border-gray-300' :
                              'border-amber-300'
                            }`}>
                              <AvatarImage src={`https://i.pravatar.cc/150?u=topdonor${donor.rank}`} />
                              <AvatarFallback>{donor.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-gray-800 mt-3">{donor.name}</p>
                            <p className={`text-xl font-bold mt-1 ${
                              donor.color === 'orange' ? 'text-orange-500' :
                              donor.color === 'gray' ? 'text-gray-500' :
                              'text-amber-600'
                            }`}>{donor.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* ===== BRACKET ===== */}
                  <section id="bracket" className="space-y-5 scroll-mt-24">
                    <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
                        <GitMerge className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Bracket</h2>
                    </div>

                    {/* Bracket info cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Format", value: "3v3 Format" },
                        { label: "Structure", value: "Single Elimination" },
                        { label: "Entry Fee", value: "Free to Play" },
                        { label: "Platforms", value: "Mobile, Tablet" },
                      ].map((info) => (
                        <div key={info.label} className="p-4 rounded-2xl bg-white border border-gray-200/80 flex flex-col gap-1 shadow-sm">
                          <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{info.label}</span>
                          <span className="font-semibold text-gray-800 text-sm">{info.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bracket viewer */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
                      {/* Toolbar */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input type="text" placeholder="Search by User or Match" className="bg-white border border-gray-200 rounded-xl h-8 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 w-52 placeholder:text-gray-400 transition-all" />
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[Crosshair, Eye, ZoomIn, ZoomOut, Maximize2].map((Icon, idx) => (
                            <button key={idx} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                              <Icon className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Round Headers */}
                      <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/30">
                        {["Quarterfinals", "Semifinals", "Finals"].map((round, i) => (
                          <div key={round} className={`px-6 py-2.5 text-center ${i < 2 ? 'border-r border-gray-100' : ''}`}>
                            <span className="text-sm font-semibold text-gray-700">{round}</span>
                            <span className="text-xs text-gray-400 ml-1.5">(Best of 3)</span>
                          </div>
                        ))}
                      </div>

                      {/* Bracket tree */}
                      <div className="p-6 overflow-x-auto overflow-y-hidden min-h-[340px] flex items-center">
                        <div className="flex gap-20 min-w-max mx-auto">
                          {/* Quarterfinals */}
                          <div className="flex flex-col justify-around h-full gap-10">
                            <BracketMatch num={1} teamA="Hotel Moscow" teamB="Golden Rush" scoreA={2} scoreB={0} winnerIdx={0} />
                            <BracketMatch num={2} teamA="Russians Unite" teamB="M&Ms" scoreA={2} scoreB={0} winnerIdx={0} />
                          </div>
                          {/* Semifinals */}
                          <div className="flex flex-col justify-around h-full gap-10">
                            <BracketMatch num={3} teamA="Hotel Moscow" teamB="Tempest Release" scoreA={2} scoreB={1} winnerIdx={0} />
                            <BracketMatch num={4} teamA="Russians Unite" teamB="Goldman..." scoreA={2} scoreB={0} winnerIdx={0} />
                          </div>
                          {/* Finals */}
                          <div className="flex flex-col justify-center h-full">
                            <BracketMatch num="F" teamA="Hotel Moscow" teamB="Russians Unite" scoreA={3} scoreB={1} winnerIdx={0} isFinal />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ===== PARTICIPANTS ===== */}
                  <section id="participants" className="space-y-5 scroll-mt-24">
                    <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500">
                          <Users className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Participants <span className="text-gray-400 text-lg font-normal ml-2">(64/128)</span></h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => {
                        const isExpanded = expandedTeam === i;
                        return (
                          <div
                            key={i}
                            className={`flex flex-col p-4 rounded-2xl bg-white border transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md ${
                              isExpanded ? 'border-orange-300 shadow-md' : 'border-gray-200/80'
                            }`}
                            onClick={() => setExpandedTeam(isExpanded ? null : i)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className={`h-10 w-10 border-2 transition-colors ${isExpanded ? 'border-orange-300' : 'border-gray-200 group-hover:border-orange-200'}`}>
                                  <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                  <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">T{i}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className={`font-medium transition-colors ${isExpanded ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-600'}`}>
                                    Team Alpha {i}
                                  </p>
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Users className="w-3 h-3" /> 3 Members
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-all ${isExpanded ? 'rotate-90 text-orange-500' : 'text-gray-300 group-hover:text-gray-500'}`} />
                            </div>
                            {isExpanded && (
                              <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                                {['PlayerOne', 'ProGamer', 'SniperXYZ'].map((player, pIdx) => (
                                  <div key={pIdx} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6 border border-gray-200">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=player${i}${pIdx}`} />
                                        <AvatarFallback className="text-[9px]">{player[0]}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-gray-700">{player}</span>
                                    </div>
                                    {pIdx === 0 && (
                                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-500">Captain</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* ===== STAFF ===== */}
                  <section id="staff" className="space-y-5 scroll-mt-24">
                    <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4">
                      <div className="p-2.5 rounded-xl bg-purple-50 text-purple-500">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Staff</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { name: "Quantum Studios", role: "Owner", sub: "Tournament Creator", color: "purple", avatar: "quantum" },
                        { name: "MikeK", role: "Admin", sub: "Bracket Manager", color: "amber", avatar: "admin1" },
                        { name: "JessicaL", role: "Admin", sub: "Stream Coordinator", color: "amber", avatar: "admin2" },
                        { name: "RyanD", role: "Moderator", sub: "Match Referee", color: "blue", avatar: "mod1" },
                      ].map((staff) => (
                        <div key={staff.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200/80 hover:shadow-md transition-all shadow-sm group">
                          <Avatar className={`h-12 w-12 border-2 transition-colors ${
                            staff.color === 'purple' ? 'border-purple-200 group-hover:border-purple-400' :
                            staff.color === 'amber' ? 'border-amber-200 group-hover:border-amber-400' :
                            'border-blue-200 group-hover:border-blue-400'
                          }`}>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${staff.avatar}`} />
                            <AvatarFallback>{staff.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-800 truncate">{staff.name}</p>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                staff.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                                staff.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                'bg-blue-50 text-blue-500'
                              }`}>{staff.role}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{staff.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden xl:flex border-l border-gray-200/80 h-full overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-100 sticky top-0 z-10 bg-white">
            {[
              { id: "prize-pool", icon: CircleDollarSign },
              { id: "activity", icon: Zap },
              { id: "live", label: "LIVE" },
            ].map((tab) => (
              <button key={tab.id} className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${
                tab.id === "prize-pool"
                  ? "border-orange-500 text-orange-500 bg-orange-50/50"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}>
                {tab.label ? (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">{tab.label}</span>
                ) : (
                  tab.icon && <tab.icon className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* Prize Pool card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-orange-600">Prize Pool</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900">$4,250.00</div>
              <div className="flex justify-between text-sm text-gray-500 mt-1 mb-3">
                <span>85% Funded</span>
                <span>$5,000</span>
              </div>
              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: "85%" }} />
              </div>
              <button className="mt-4 w-full py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all text-sm">
                Contribute
              </button>
            </div>

            {/* Activity feed */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { user: "JackMaster", action: "contributed", detail: "$50.00", time: "2m ago", avatar: "topdonor1" },
                  { user: "Team Alpha 12", action: "registered", detail: "", time: "5m ago", avatar: "12" },
                  { user: "SquadLeader", action: "contributed", detail: "$25.00", time: "12m ago", avatar: "topdonor2" },
                  { user: "NeonBlade", action: "contributed", detail: "$15.00", time: "1h ago", avatar: "donor4" },
                  { user: "Team Alpha 8", action: "registered", detail: "", time: "2h ago", avatar: "8" },
                  { user: "VortexFan", action: "contributed", detail: "$100.00", time: "3h ago", avatar: "topdonor3" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-gray-50 transition-colors">
                    <Avatar className="h-8 w-8 border border-gray-200 flex-shrink-0">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${item.avatar}`} />
                      <AvatarFallback className="text-[9px]">{item.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium text-gray-800">{item.user}</span>
                        <span className="text-gray-500"> {item.action}</span>
                        {item.detail && <span className="font-semibold text-orange-500"> {item.detail}</span>}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ===== Sub-components =====

function RuleAccordion({ title, items, defaultOpen = false, isLast = false }: { title: string; items: string[]; defaultOpen?: boolean; isLast?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={!isLast ? "border-b border-gray-100" : ""}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm leading-relaxed">
            {items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function BracketMatch({ num, teamA, teamB, scoreA, scoreB, winnerIdx, isFinal = false }: {
  num: number | string; teamA: string; teamB: string; scoreA: number; scoreB: number; winnerIdx: number; isFinal?: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg text-[9px] font-bold flex items-center justify-center ${
        isFinal ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30' : 'bg-gray-200 text-gray-600'
      }`}>{num}</div>
      <div className={`flex flex-col gap-px w-52 rounded-xl overflow-hidden border ${isFinal ? 'border-orange-300 shadow-sm shadow-orange-100' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-between px-3 py-2.5 ${winnerIdx === 0 ? 'bg-orange-50/80' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 border border-gray-200">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${teamA.toLowerCase().replace(/\s/g, '')}`} />
              <AvatarFallback className="text-[8px]">{teamA.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className={`text-sm font-medium ${winnerIdx === 0 ? 'text-orange-700' : 'text-gray-600'}`}>{teamA}</span>
            {isFinal && winnerIdx === 0 && <Trophy className="w-3.5 h-3.5 text-orange-500" />}
          </div>
          <span className={`text-sm font-bold ${winnerIdx === 0 ? 'text-orange-600' : 'text-gray-400'}`}>{scoreA}</span>
        </div>
        <div className={`flex items-center justify-between px-3 py-2.5 ${winnerIdx === 1 ? 'bg-orange-50/80' : 'bg-gray-50/50'} ${winnerIdx !== 1 ? 'opacity-60' : ''}`}>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 border border-gray-200">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${teamB.toLowerCase().replace(/\s/g, '')}`} />
              <AvatarFallback className="text-[8px]">{teamB.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-600">{teamB}</span>
          </div>
          <span className={`text-sm font-bold ${winnerIdx === 1 ? 'text-orange-600' : 'text-gray-400'}`}>{scoreB}</span>
        </div>
      </div>
    </div>
  );
}
