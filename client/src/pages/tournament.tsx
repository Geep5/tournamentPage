import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeaderActions } from "@/components/header-actions";
import { Search, Bell, Trophy, Calendar, Users, Map, Heart, ScrollText, Twitch, MessageSquare, ChevronRight, ChevronDown, ChevronLeft, Menu, BookOpen, Settings, Check, LayoutGrid, ClipboardList, Coins, GitMerge, Radio, Flag, Wallet, Zap, CircleDollarSign, X, Upload, Image, Store, MapPin, Copy, ExternalLink, Paperclip, Tv, Shield, Crown, Clock, ArrowUpDown, Maximize2, ZoomIn, ZoomOut, Eye, Crosshair, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import pageScreenshot from "@assets/screencapture-matcherino-t-megaming34-2026-02-19-17_16_11_1771550214308.png";

import bannerImage from "@assets/image_1771577591955.png";
import helmetLogo from "@assets/mhelmet_1771552283812.png";
import ramadanBanner from "@assets/image_1771560570095.png";
import pinsImage from "@assets/image_1771567154720.png";
import spikePinImage from "@assets/image_1771571389439.png";
import mandyPinImage from "@assets/image_1771571405228.png";
import winnerPinImage from "@assets/image_1771571494940.png";
import valentinesBanner from "@assets/image_1771574496559.png";
import orionBanner from "@assets/image_1771576047220.png";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [allTeamsExpanded, setAllTeamsExpanded] = useState(false);
  const [rightTab, setRightTab] = useState("prize-pool");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [cols, setCols] = useState(3);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [orgLiked, setOrgLiked] = useState(false);
  const [donorSort, setDonorSort] = useState<"amount" | "recent">("amount");
  const [donorPage, setDonorPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 768) setCols(3); // md
      else if (window.innerWidth >= 640) setCols(2); // sm
      else setCols(1);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);
  
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

  const adminNavGroups = [
    { label: "Configure", items: [
      { id: "admin-overview", label: "General", icon: LayoutGrid },
      { id: "admin-rules", label: "Rules", icon: ClipboardList },
      { id: "admin-contributions", label: "Crowdfunding", icon: Coins },
      { id: "admin-bracket", label: "Bracket", icon: GitMerge },
    ]},
    { label: "Tournament", items: [
      { id: "admin-teams", label: "Participants", icon: Users, badge: "62" },
      { id: "admin-prizepool", label: "Prize Pool", icon: Trophy },
      { id: "admin-stream", label: "Marketplace", icon: Store },
      { id: "admin-payouts", label: "Payouts", icon: Wallet },
    ]},
    { label: "Operations", items: [
      { id: "admin-sponsors", label: "Sponsors", icon: Heart },
      { id: "admin-streaming", label: "Stream", icon: Tv },
      { id: "admin-location", label: "Location", icon: MapPin },
      { id: "admin-venues", label: "Venues & Series", icon: Flag },
      { id: "admin-messaging", label: "Messaging", icon: MessageSquare },
    ]},
  ];

  const adminNavItems = adminNavGroups.flatMap(g => g.items);

  const currentNavItems = isAdminMode ? adminNavItems : navItems;


  const leftSidebarContent = (
      <div className="p-4 space-y-6 relative z-10">
        {/* Banner Image inside sidebar */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-black/20">
          <img src={bannerIndex === 1 ? valentinesBanner : bannerIndex === 2 ? orionBanner : bannerImage} alt="Tournament Banner" className="w-full h-auto object-cover aspect-video transition-all duration-500" />
        </div>
        
        {/* Title & Info */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-bold leading-tight text-white flex items-center justify-center gap-2 transition-colors duration-500">
            {bannerIndex === 1 ? (
              <>Valentines Day<br/>Mixer</>
            ) : bannerIndex === 2 ? (
              <>Orion<br/>Tournament</>
            ) : (
              <>Road to Brawl Cup<br/>SESA</>
            )}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-white/70">
            by <Avatar className="h-6 w-6"><AvatarImage src="https://i.pravatar.cc/150?u=quantum" /><AvatarFallback>QS</AvatarFallback></Avatar> <span className="font-bold text-white hover:text-white/80 transition-colors cursor-pointer">Quantum Studios</span>
            <button
              onClick={() => setOrgLiked(!orgLiked)}
              className={`h-6 w-6 flex items-center justify-center rounded-md transition-all duration-300 ${orgLiked ? 'text-red-500 scale-110' : 'text-muted-foreground hover:text-red-400 hover:bg-red-500/10'}`}
              title={orgLiked ? 'Following' : 'Follow Organizer'}
            >
              <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${orgLiked ? 'fill-current scale-125' : ''}`} />
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white cursor-pointer hover:bg-[#4752C4] transition-colors shadow-lg">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          <button
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setActiveTab(!isAdminMode ? "admin-overview" : "overview");
              document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-all mb-4 ${
              isAdminMode 
                ? "bg-red-500/20 text-red-400 border-l-4 border-red-500" 
                : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 opacity-70" />
              {isAdminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
            </div>
          </button>

          {isAdminMode ? (
            adminNavGroups.map((group, gi) => (
              <div key={gi} className={gi > 0 ? 'mt-4 pt-3 border-t border-white/5' : ''}>
                <div className="px-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{group.label}</span>
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-white/10 text-white border-l-4 border-primary'
                          : 'text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 opacity-70" />
                        {item.label}
                      </div>
                      {'badge' in item && item.badge && (
                        <Badge variant="secondary" className="bg-white/10 text-white/70 hover:bg-white/20 border-none px-1.5 py-0 text-[10px]">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id !== 'bracket') {
                      const sectionId = item.id === 'overview' ? 'about'
                                      : item.id === 'contributions' ? 'prize-pool'
                                      : item.id === 'teams' ? 'participants'
                                      : item.id;
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white/10 text-white border-l-4 border-primary'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
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
            })
          )}
        </div>
      </div>
  );

  const rightSidebarContent = (
    <>
      <div className={`flex items-center border-b border-white/5 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-500 ${bannerIndex === 1 ? 'bg-pink-950/50' : bannerIndex === 2 ? 'bg-cyan-950/50' : 'bg-background/50'}`}>
        <button 
          onClick={() => setRightTab("prize-pool")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "prize-pool" ? "border-yellow-500 text-yellow-500 bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
        >
          <CircleDollarSign className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setRightTab("activity")}
          className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${rightTab === "activity" ? "border-primary text-primary bg-white/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
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
        
        {/* Prize Pool Summary Card */}
        {rightTab === "prize-pool" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="flex items-center justify-between mb-2 relative z-10">
            <h3 className="font-display font-semibold text-lg text-yellow-500 flex items-center gap-2">
              <Trophy className="w-5 h-5" /> Prize Pool
            </h3>
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="text-3xl font-display font-bold text-white">$4,250.00</div>
              <div className="text-sm text-yellow-500/80 mt-1 flex justify-between">
                <span>85% Funded</span>
                <span>$5,000</span>
              </div>
            </div>
            <Progress value={85} className="h-2 bg-black/40" indicatorClassName="bg-gradient-to-r from-yellow-500 to-yellow-400" />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all bg-yellow-400 hover:bg-yellow-300 text-black">
                  Contribute to Prize Pool
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background border border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display text-center mb-2">Contribute to Road to Brawl Cup</DialogTitle>
                  <DialogDescription className="text-center text-muted-foreground">
                    Select the pins you want below and then click <strong className="text-foreground">CONTRIBUTE</strong> to complete your payment.
                    <br/><br/>
                    Pins will be sent to this Brawl Stars Player Tag within 2 weeks:
                    <br/>
                    <strong className="text-foreground font-mono mt-1 block text-lg">#JV0JL22Y</strong>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-6">
                  <div className="flex bg-card/50 border border-white/10 rounded-xl p-4 gap-4 hover:border-yellow-500/50 transition-colors cursor-pointer relative overflow-hidden">
                    <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                       <div className="absolute -top-2 -right-2 text-2xl">🔥</div>
                       <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=64&h=64&q=80" alt="Pin" className="w-12 h-12 rounded object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Spike Contributor's Pin</h4>
                      <div className="text-2xl font-bold text-yellow-500 my-1">$5.00</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500"/> $3.75 Prize Pool</div>
                        <div className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-400"/> $0.50 LOKI</div>
                        <div className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400"/> $0.75 Matcherino</div>
                      </div>
                    </div>
                    <Button className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-black">Select</Button>
                  </div>

                  <div className="flex bg-card/50 border border-white/10 rounded-xl p-4 gap-4 hover:border-yellow-500/50 transition-colors cursor-pointer relative overflow-hidden">
                    <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                       <div className="absolute -top-2 -right-2 text-2xl">✨</div>
                       <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&h=64&q=80" alt="Pin" className="w-12 h-12 rounded object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Mandy Contributor's Pin</h4>
                      <div className="text-2xl font-bold text-yellow-500 my-1">$2.50</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500"/> $1.87 Prize Pool</div>
                        <div className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-400"/> $0.25 LOKI</div>
                        <div className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400"/> $0.38 Matcherino</div>
                      </div>
                    </div>
                    <Button className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-black">Select</Button>
                  </div>
                </div>

                <div className="text-center mt-6 text-sm text-muted-foreground">
                  You can also make a direct contribution by clicking <a href="#" className="text-primary hover:underline">here</a>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
          {/* Contributor Pin */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-yellow-500/80 flex items-center justify-center bg-yellow-500/10">
                <Check className="w-3 h-3 text-yellow-500" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-white tracking-wide">Contributor Pin</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Contribute to this event to receive the in-game pins below! Contribute $2.50 to receive the Mandy Contributor Pin or $5.00 to receive the Contributor Pin, to receive both pins contribute $7.50.
                </p>
              </div>
            </div>
            <div className="ml-8 relative h-[140px] rounded-xl overflow-hidden border border-white/5 bg-black/20 flex items-center justify-center p-4">
               <img src={mandyPinImage} alt="Mandy Contributor Pin" className="h-full object-contain drop-shadow-2xl" />
               <img src={spikePinImage} alt="Spike Contributor Pin" className="h-full object-contain drop-shadow-2xl -ml-4" />
            </div>
          </div>

          {/* Winner Pin */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-yellow-500/80 flex items-center justify-center bg-yellow-500/10">
                <Check className="w-3 h-3 text-yellow-500" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-white tracking-wide">Winner Pin</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Place first in this event and earn the in-game pin below! Good luck!
                </p>
              </div>
            </div>
            <div className="ml-8 relative h-[140px] rounded-xl overflow-hidden border border-white/5 bg-black/20 flex items-center justify-center p-4">
               <img src={winnerPinImage} alt="Winner Pin" className="h-full object-contain drop-shadow-2xl" />
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
            <Button variant="link" className="h-auto p-0 text-xs text-primary hover:text-primary/80">View All (14)</Button>
          </div>
          <div className="space-y-3 pr-2 max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer">
                <img src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80`} alt="Stream" className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/20">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=s${i}`} />
                      <AvatarFallback>S{i}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-white drop-shadow-md">ProPlayer_{i}</span>
                  </div>
                  <div className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {Math.floor(1 + Math.random() * 4)}.{Math.floor(1 + Math.random() * 9)}k views
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
            <Zap className="w-4 h-4 text-yellow-500" />
            Recent Activity
          </div>
          <div className="space-y-4 border-l-2 border-white/5 pl-4 ml-2">
            {[
              { user: "AlexM", action: "contributed $50 to prize pool", time: "10m ago" },
              { user: "Team Vortex", action: "registered for tournament", time: "1h ago" },
              { user: "SarahJ", action: "completed sponsor quests", time: "2h ago" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary/50 ring-4 ring-background" />
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
    <div 
      className="h-screen bg-background flex flex-col font-sans selection:bg-primary/30 transition-colors duration-500 overflow-hidden"
      style={{
        '--primary': bannerIndex === 1 ? '330 81% 60%' : bannerIndex === 2 ? '190 90% 50%' : '48 96% 53%',
        '--ring': bannerIndex === 1 ? '330 81% 60%' : bannerIndex === 2 ? '190 90% 50%' : '48 96% 53%'
      } as React.CSSProperties}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#2b2d31]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#2b2d31] px-4 py-3 space-y-2">
            <Link href="/events" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <Link href="/partnership" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Partnership</Link>
            <Link href="/create" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Create</Link>
            <Link href="/profile" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            <div className="pt-2 border-t border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-full h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 relative h-[calc(100vh-4rem)] min-h-0 overflow-hidden">
        
        {/* Left Sidebar Nav */}
        <aside className={`w-[280px] flex-col flex-shrink-0 hidden md:flex border-r border-white/5 no-scrollbar h-full overflow-y-auto transition-all duration-500 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isAdminMode ? 'bg-[#312020]' : 'bg-[#2b2d31]'}`}>
          {isAdminMode && (
             <div 
               className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
               style={{
                 backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,200,0,0.6), rgba(255,200,0,0.6) 18px, transparent 18px, transparent 36px)',
               }}
             />
          )}
          {leftSidebarContent}
        </aside>

        {/* Center Content (Main) */}
        <main className={`flex-1 relative scroll-smooth pb-12 md:pb-0 transition-colors duration-500 overflow-y-auto h-full ${
          isAdminMode 
            ? 'bg-red-950/20' 
            : bannerIndex === 1 
              ? 'bg-pink-950/20' 
              : bannerIndex === 2
                ? 'bg-cyan-950/20'
                : 'bg-[#313338]/50'
        }`}>

          {activeTab === 'bracket' && !isAdminMode ? (
            /* Full Bracket View */
            <div className="flex flex-col h-full">
              {/* Bracket Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('overview');
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <GitMerge className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-white">Bracket</h2>
                  <span className="text-sm text-muted-foreground ml-2">Single Elimination</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="relative mr-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by User or Match"
                      className="bg-white/5 border border-white/10 rounded-lg h-8 pl-9 pr-3 text-xs focus:outline-none focus:border-primary/50 w-52 placeholder:text-muted-foreground"
                    />
                  </div>
                  <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Fit to Screen">
                    <Crosshair className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Toggle Labels">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Zoom In">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Zoom Out">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Round Headers */}
              <div className="grid grid-cols-3 border-b border-white/5 shrink-0">
                <div className="px-6 py-2.5 text-center border-r border-white/5">
                  <span className="text-sm font-semibold text-foreground">Quarterfinals</span>
                  <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                </div>
                <div className="px-6 py-2.5 text-center border-r border-white/5">
                  <span className="text-sm font-semibold text-foreground">Semifinals</span>
                  <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                </div>
                <div className="px-6 py-2.5 text-center">
                  <span className="text-sm font-semibold text-foreground">Finals</span>
                  <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                </div>
              </div>

              {/* Full Bracket Tree */}
              <div className="flex-1 overflow-auto flex items-center justify-center relative p-8">
                {/* Connector lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <line x1="232" y1="120" x2="280" y2="120" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="232" y1="220" x2="280" y2="220" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="280" y1="120" x2="280" y2="220" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="280" y1="170" x2="320" y2="170" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="232" y1="340" x2="280" y2="340" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="232" y1="440" x2="280" y2="440" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="280" y1="340" x2="280" y2="440" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="280" y1="390" x2="320" y2="390" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="540" y1="170" x2="580" y2="170" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="540" y1="390" x2="580" y2="390" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="580" y1="170" x2="580" y2="390" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  <line x1="580" y1="280" x2="620" y2="280" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                </svg>

                <div className="flex gap-24 min-w-max relative z-10">
                  {/* Quarterfinals */}
                  <div className="flex flex-col justify-around gap-16">
                    {/* Match 1 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center">1</div>
                      <div className="flex flex-col gap-px w-56 rounded-lg overflow-hidden border border-white/10">
                        <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=hotel" />
                              <AvatarFallback className="text-[8px]">HM</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Hotel Moscow</span>
                          </div>
                          <span className="text-sm font-bold text-green-400">2</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/30 px-3 py-2.5 opacity-60">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=golden" />
                              <AvatarFallback className="text-[8px]">GR</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Golden Rush</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">0</span>
                        </div>
                      </div>
                    </div>
                    {/* Match 2 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center">2</div>
                      <div className="flex flex-col gap-px w-56 rounded-lg overflow-hidden border border-white/10">
                        <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=russians" />
                              <AvatarFallback className="text-[8px]">RU</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Russians Unite</span>
                          </div>
                          <span className="text-sm font-bold text-green-400">2</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/30 px-3 py-2.5 opacity-60">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=mnms" />
                              <AvatarFallback className="text-[8px]">MM</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">M&Ms</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Semifinals */}
                  <div className="flex flex-col justify-around gap-16">
                    {/* Match 3 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center">3</div>
                      <div className="flex flex-col gap-px w-56 rounded-lg overflow-hidden border border-white/10">
                        <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=hotel" />
                              <AvatarFallback className="text-[8px]">HM</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Hotel Moscow</span>
                          </div>
                          <span className="text-sm font-bold text-green-400">2</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/30 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=tempest" />
                              <AvatarFallback className="text-[8px]">TR</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium opacity-60">Tempest Release</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">1</span>
                        </div>
                      </div>
                    </div>
                    {/* Match 4 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center">4</div>
                      <div className="flex flex-col gap-px w-56 rounded-lg overflow-hidden border border-white/10">
                        <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=russians" />
                              <AvatarFallback className="text-[8px]">RU</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Russians Unite</span>
                          </div>
                          <span className="text-sm font-bold text-green-400">2</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/30 px-3 py-2.5 opacity-60">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=goldman" />
                              <AvatarFallback className="text-[8px]">GS</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Goldman is the...</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Finals */}
                  <div className="flex flex-col justify-center">
                    {/* Match 5 - Grand Finals */}
                    <div className="relative">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-yellow-500 text-[10px] font-bold text-black flex items-center justify-center">F</div>
                      <div className="flex flex-col gap-px w-56 rounded-lg overflow-hidden border border-primary/30 ring-1 ring-primary/20">
                        <div className="flex items-center justify-between bg-primary/10 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-primary/30">
                              <AvatarImage src="https://i.pravatar.cc/150?u=hotel" />
                              <AvatarFallback className="text-[8px]">HM</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-semibold text-primary">Hotel Moscow</span>
                            <Trophy className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-bold text-primary">3</span>
                        </div>
                        <div className="flex items-center justify-between bg-black/30 px-3 py-2.5 opacity-60">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage src="https://i.pravatar.cc/150?u=russians" />
                              <AvatarFallback className="text-[8px]">RU</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Russians Unite</span>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <>
          {/* Header Info */}
          <div className="w-full max-w-5xl mx-auto px-4 md:px-10 pt-4 pb-0">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-2 md:mb-4">
              {/* Header Info */}
              <div className="flex-1 w-full">
                {/* Tournament Title */}
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight drop-shadow-md mb-6 flex items-center gap-3 uppercase transition-all duration-500">
                  <span className={bannerIndex === 1 ? "text-pink-500" : bannerIndex === 2 ? "text-cyan-500" : "text-yellow-500"}>
                    {bannerIndex === 1 ? "💖" : bannerIndex === 2 ? "🌌" : "⚔️"}
                  </span> 
                  {bannerIndex === 1 ? "Valentines Day Mixer" : bannerIndex === 2 ? "Orion Tournament" : "Road to Brawl Cup SESA"}
                </h1>
                
                {/* Feature Image */}
                <div 
                  className="w-full bg-black/20 rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden mb-6 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setBannerIndex((prev) => (prev + 1) % 3)}
                >
                  <img 
                    src={bannerIndex === 1 ? valentinesBanner : bannerIndex === 2 ? orionBanner : bannerImage} 
                    alt="Tournament Banner" 
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>

                {/* Quick Stats below image */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-2">
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 border-none w-fit mt-1">Registering</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Entry Fee</span>
                    <span className="font-semibold text-foreground mt-1">Free</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Game</span>
                    <span className="font-semibold flex items-center gap-2 mt-1">
                      <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=32&h=32&q=80" alt="Icon" className="w-4 h-4 rounded-sm object-cover" />
                      Brawl Stars
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Region</span>
                    <span className="font-semibold text-foreground mt-1">South America</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Date/Time</span>
                    <span className="font-semibold text-foreground mt-1 text-sm">Thu, Feb 19, 2026<br/>3:00AM PST</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Team Size</span>
                    <span className="font-semibold text-foreground mt-1">3v3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-10 max-w-5xl mx-auto space-y-12 pb-32 pt-0">
            
            {/* Show regular content when not in admin mode */}
            {!isAdminMode ? (
              <div className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column */}
                  <div className="flex-1 space-y-12">
                    {/* About Section */}
                    <section id="about" className="space-y-6 scroll-mt-24">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <ScrollText className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-display font-semibold">About</h2>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <span className="text-sm text-muted-foreground hidden sm:block">Registration closes in 4 days</span>
                      <Button size="lg" className="w-full sm:w-auto font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all bg-yellow-400 hover:bg-yellow-300 text-black">
                        Join Tournament
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className={`prose prose-invert max-w-none text-muted-foreground space-y-4 leading-relaxed overflow-hidden transition-[max-height] duration-500 ease-in-out ${aboutExpanded ? 'max-h-[2000px]' : 'max-h-[4.5rem]'}`}>
                      <p>
                        Welcome to the MS Gaming Pro Series! This is a premier Brawl Stars tournament series featuring the best teams in North America competing for a massive prize pool. Teams will battle through a double-elimination bracket to prove their worth.
                      </p>
                      <p>
                        All matches will be streamed live on Twitch with professional casting and analysis. We're partnering with top content creators in the Brawl Stars community to bring you the best viewing experience possible. Expect showmatches, giveaways, and community events throughout the tournament weekend.
                      </p>
                      <p>
                        This is the third stop in the 2026 Pro Circuit, with points counting towards the Global Finals seeding in December. Top 8 finishers earn circuit points, and the winner receives a direct invite to the Regional Qualifier. Whether you're a seasoned pro or an up-and-coming team, this is your chance to make a name on the big stage.
                      </p>
                    </div>
                    <button
                      onClick={() => setAboutExpanded(!aboutExpanded)}
                      className="relative w-full text-left group"
                    >
                      {!aboutExpanded && (
                        <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary group-hover:text-primary/80 transition-colors px-3 py-1 rounded-full bg-primary/10 group-hover:bg-primary/15">
                          {aboutExpanded ? 'Show less' : 'Read more'}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                    </button>
                  </div>
                </section>

                {/* Rules Section */}
                <section id="rules" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-display font-semibold">Rules & Information</h2>
                  </div>
                  <div className="bg-card border border-white/5 rounded-2xl p-2 md:p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-white/10">
                        <AccordionTrigger className="text-left px-4 hover:no-underline hover:bg-white/5 rounded-lg transition-colors">
                          <span className="font-semibold text-lg">Tournament Rules & Guidelines</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4 pb-6 text-muted-foreground space-y-4 leading-relaxed">
                          <h4 className="font-semibold text-foreground mt-4">1. General Rules</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>All players must be at least 13 years old to participate.</li>
                            <li>Players must play on their own accounts. Account sharing is strictly prohibited.</li>
                            <li>Respect all participants and tournament admins. Toxic behavior will not be tolerated.</li>
                          </ul>
                          <h4 className="font-semibold text-foreground mt-4">2. Match Format</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Matches are Best of 3 (BO3) Sets, and each Set is Best of 3 (BO3) Games.</li>
                            <li>Grand Finals will be Best of 5 (BO5) Sets.</li>
                            <li>Brawler bans: Each team bans one brawler per set in power match format.</li>
                          </ul>
                          <h4 className="font-semibold text-foreground mt-4">3. Disconnects & Pauses</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>If a player disconnects during the draft phase, the set will be restarted with the same picks/bans up to that point.</li>
                            <li>If a player disconnects during a match, the match will continue. Rematches are only granted if the server crashes for all players.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-white/10">
                        <AccordionTrigger className="text-left px-4 hover:no-underline hover:bg-white/5 rounded-lg transition-colors">
                          <span className="font-semibold text-lg">Check-in Process</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4 pb-6 text-muted-foreground space-y-4 leading-relaxed">
                          <p>
                            Captain check-in begins 60 minutes before the tournament start time. If the team captain does not check in before the bracket is generated, the team will be disqualified.
                          </p>
                          <p>
                            All matches must be played immediately once the bracket is live and your opponent is decided. You have 10 minutes to show up to your match before a forfeit is awarded to the opposing team.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-white/10 border-b-0">
                        <AccordionTrigger className="text-left px-4 hover:no-underline hover:bg-white/5 rounded-lg transition-colors">
                          <span className="font-semibold text-lg">Payout Information</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-4 pb-6 text-muted-foreground space-y-4 leading-relaxed">
                          <p>
                            Prize pool payouts are processed through Matcherino. Winners must have a valid Matcherino account and complete the necessary tax forms to receive their prize money.
                          </p>
                          <p>
                            Payouts will be initiated within 7 business days after the conclusion of the tournament and verification of match results.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </section>

            {/* Prize Pool Section */}
            <section id="prize-pool" className="space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold">Prize Pool</h2>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-display font-bold text-yellow-500">$4,250.00</div>
                  <div className="text-sm text-muted-foreground">Current Total</div>
                </div>
              </div>
              
              <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-lg font-semibold">Stretch Goals</h3>
                    <span className="text-sm font-medium text-primary">0/4 Reached</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="goal-1" className="border-b border-white/10 last:border-0">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-white/5">
                          <div className="flex flex-col w-full pr-4 gap-2">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                </div>
                                <span className="font-semibold text-sm text-left text-primary">Prize Pool Goal</span>
                              </div>
                              <div className="text-right flex-shrink-0 ml-4">
                                <div className="font-bold text-sm text-white">$5,000</div>
                                <div className="text-[10px] text-primary font-medium">($750 to go!)</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 pl-9">
                              <Progress value={85} className="h-1.5 flex-1 bg-white/10" indicatorClassName="bg-primary" />
                              <span className="text-[10px] font-medium text-muted-foreground w-8 text-right">85%</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground text-sm leading-relaxed pl-13">
                          Initial prize pool target to kick off the tournament and guarantee the base payout structure for all participating teams!
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="goal-2" className="border-b border-white/10 last:border-0">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-white/5">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-white/10 text-muted-foreground flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                              </div>
                              <span className="font-semibold text-sm text-left">Streamer Reward</span>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4 opacity-60">
                              <div className="font-bold text-sm text-white">$12,500</div>
                              <div className="text-[10px] text-muted-foreground">(locked)</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground text-sm leading-relaxed">
                          Your favorite players will be rewarded for sharing their POVs by streaming their games giving this event more fun angles. How it works: After reaching the $12,500 Goal, the extra $2,500 will be split among the players who streamed at least five of their series.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="goal-3" className="border-b border-white/10 last:border-0">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-white/5">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-white/10 text-muted-foreground flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                              </div>
                              <span className="font-semibold text-sm text-left">Prize Pool Increase</span>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4 opacity-60">
                              <div className="font-bold text-sm text-white">$17,500</div>
                              <div className="text-[10px] text-muted-foreground">(locked)</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground text-sm leading-relaxed">
                          Because, why not? Reaching this goal increases the Prize Pool to $15,000, money that goes straight to your favorite players!
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="goal-4" className="border-b border-white/10 last:border-0">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-white/5">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-white/10 text-muted-foreground flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                              </div>
                              <span className="font-semibold text-sm text-left">Upgrade Streamer Reward</span>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4 opacity-60">
                              <div className="font-bold text-sm text-white">$20,000</div>
                              <div className="text-[10px] text-muted-foreground">(locked)</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground text-sm leading-relaxed">
                          Reaching 20k increases the Streamer Reward to 5,000! Because there are never enough POVs!
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  <AccordionItem value="bucket-1" className="bg-card border border-white/5 border-l-4 border-l-yellow-500 rounded-xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-transparent w-full transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground text-lg">Bucket 1</h4>
                            <p className="text-sm text-muted-foreground font-normal">Splits 50% of total pool</p>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <div className="text-2xl font-bold text-yellow-500">$2,500</div>
                          <div className="text-xs text-yellow-500/80 uppercase tracking-wider font-normal">Payout</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0 border-t border-white/5">
                      <div className="p-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm pb-2 border-b border-white/5">
                            <span className="font-medium text-muted-foreground">Players (3)</span>
                          </div>
                          <div className="grid gap-2">
                            {[1, 2, 3].map((i) => (
                              <div key={`b1-${i}`} className="flex items-center justify-between p-2.5 rounded-lg bg-background/50 border border-white/5">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border border-white/10">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=winner${i}`} />
                                    <AvatarFallback>W{i}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-sm font-medium text-foreground">ProPlayer_{i}</div>
                                  </div>
                                </div>
                                <span className="font-semibold text-yellow-500">$833.33</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="bucket-2" className="bg-card border border-white/5 border-l-4 border-l-zinc-300 rounded-xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-zinc-300/10 to-transparent w-full transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-400/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-zinc-300" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground text-lg">Bucket 2</h4>
                            <p className="text-sm text-muted-foreground font-normal">Splits 30% of total pool</p>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <div className="text-2xl font-bold text-zinc-300">$1,500</div>
                          <div className="text-xs text-zinc-400/80 uppercase tracking-wider font-normal">Payout</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0 border-t border-white/5">
                      <div className="p-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm pb-2 border-b border-white/5">
                            <span className="font-medium text-muted-foreground">Players (3)</span>
                          </div>
                          <div className="grid gap-2">
                            {[4, 5, 6].map((i) => (
                              <div key={`b2-${i}`} className="flex items-center justify-between p-2.5 rounded-lg bg-background/50 border border-white/5">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border border-white/10">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=player${i}`} />
                                    <AvatarFallback>P{i}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-sm font-medium text-foreground">GamerDude_{i}</div>
                                  </div>
                                </div>
                                <span className="font-semibold text-zinc-300">$500.00</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="bucket-3" className="bg-card border border-white/5 border-l-4 border-l-orange-500 rounded-xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-transparent w-full transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground text-lg">Bucket 3</h4>
                            <p className="text-sm text-muted-foreground font-normal">Splits 10% of total pool</p>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <div className="text-2xl font-bold text-orange-500">$500</div>
                          <div className="text-xs text-orange-500/80 uppercase tracking-wider font-normal">Payout</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0 border-t border-white/5">
                      <div className="p-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm pb-2 border-b border-white/5">
                            <span className="font-medium text-muted-foreground">Players (3)</span>
                          </div>
                          <div className="grid gap-2">
                            {[7, 8, 9].map((i) => (
                              <div key={`b3-${i}`} className="flex items-center justify-between p-2.5 rounded-lg bg-background/50 border border-white/5">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border border-white/10">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=runner${i}`} />
                                    <AvatarFallback>R{i}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-sm font-medium text-foreground">NinjaStar_{i}</div>
                                  </div>
                                </div>
                                <span className="font-semibold text-orange-500">$166.66</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="bucket-4" className="bg-card border border-white/5 border-l-4 border-l-blue-500 rounded-xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-transparent w-full transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground text-lg">Bucket 4</h4>
                            <p className="text-sm text-muted-foreground font-normal">Flat amount split</p>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <div className="text-2xl font-bold text-blue-400">$500</div>
                          <div className="text-xs text-blue-400/80 uppercase tracking-wider font-normal">Payout</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0 border-t border-white/5">
                      <div className="p-4 pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm pb-2 border-b border-white/5">
                            <span className="font-medium text-muted-foreground">Players (1)</span>
                          </div>
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-background/50 border border-white/5">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 border border-white/10">
                                  <AvatarImage src={`https://i.pravatar.cc/150?u=mvp`} />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium text-foreground">ProPlayer_1</div>
                                </div>
                              </div>
                              <span className="font-semibold text-blue-400">$500.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Top Donors */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Top Donors
                  </h3>
                  <span className="text-sm text-muted-foreground">42 total contributors</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 1st */}
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-600/5 border border-yellow-500/30 flex flex-col items-center gap-3 text-center">
                    <div className="absolute top-2 right-2 text-yellow-500 font-bold text-xs bg-yellow-500/15 px-2 py-0.5 rounded-full">#1</div>
                    <Avatar className="h-14 w-14 border-2 border-yellow-500/60 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                      <AvatarImage src="https://i.pravatar.cc/150?u=topdonor1" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">JackMaster</p>
                      <p className="text-xl font-bold text-yellow-500 mt-1">$850.00</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">2h ago</p>
                    </div>
                  </div>
                  {/* 2nd */}
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-zinc-300/10 to-zinc-400/5 border border-zinc-400/20 flex flex-col items-center gap-3 text-center">
                    <div className="absolute top-2 right-2 text-zinc-300 font-bold text-xs bg-zinc-400/15 px-2 py-0.5 rounded-full">#2</div>
                    <Avatar className="h-14 w-14 border-2 border-zinc-400/50">
                      <AvatarImage src="https://i.pravatar.cc/150?u=topdonor2" />
                      <AvatarFallback>SQ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">SquadLeader</p>
                      <p className="text-xl font-bold text-zinc-300 mt-1">$625.00</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">5h ago</p>
                    </div>
                  </div>
                  {/* 3rd */}
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 flex flex-col items-center gap-3 text-center">
                    <div className="absolute top-2 right-2 text-orange-500 font-bold text-xs bg-orange-500/15 px-2 py-0.5 rounded-full">#3</div>
                    <Avatar className="h-14 w-14 border-2 border-orange-500/40">
                      <AvatarImage src="https://i.pravatar.cc/150?u=topdonor3" />
                      <AvatarFallback>VX</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">VortexFan</p>
                      <p className="text-xl font-bold text-orange-500 mt-1">$400.00</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">8h ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Donors */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    All Contributions
                  </h3>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setDonorSort("amount")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        donorSort === "amount"
                          ? "bg-white/10 text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <CircleDollarSign className="w-3 h-3" />
                      Amount
                    </button>
                    <button
                      onClick={() => setDonorSort("recent")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        donorSort === "recent"
                          ? "bg-white/10 text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      Recent
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/5 overflow-hidden">
                  {(() => {
                    const allDonors = ([
                      { name: "JackMaster", amount: 850, time: "2h ago", avatar: "topdonor1", count: 12, ts: 15 },
                      { name: "SquadLeader", amount: 625, time: "5h ago", avatar: "topdonor2", count: 8, ts: 14 },
                      { name: "VortexFan", amount: 400, time: "8h ago", avatar: "topdonor3", count: 5, ts: 13 },
                      { name: "NeonBlade", amount: 250, time: "12h ago", avatar: "donor4", count: 3, ts: 12 },
                      { name: "CyberPunkz", amount: 200, time: "1d ago", avatar: "donor5", count: 4, ts: 11 },
                      { name: "StarGazer99", amount: 175, time: "1d ago", avatar: "donor6", count: 2, ts: 10 },
                      { name: "PhoenixRise", amount: 150, time: "2d ago", avatar: "donor7", count: 3, ts: 9 },
                      { name: "DarkMatter", amount: 125, time: "2d ago", avatar: "donor8", count: 1, ts: 8 },
                      { name: "BlazeRunner", amount: 100, time: "3d ago", avatar: "donor9", count: 2, ts: 7 },
                      { name: "PixelDust", amount: 100, time: "3d ago", avatar: "donor10", count: 1, ts: 6 },
                      { name: "GhostRecon", amount: 75, time: "4d ago", avatar: "donor11", count: 1, ts: 5 },
                      { name: "TurboMax", amount: 75, time: "4d ago", avatar: "donor12", count: 2, ts: 4 },
                      { name: "NightOwl", amount: 50, time: "5d ago", avatar: "donor13", count: 1, ts: 3 },
                      { name: "FrostByte", amount: 50, time: "5d ago", avatar: "donor14", count: 1, ts: 2 },
                      { name: "AlphaWolf", amount: 25, time: "6d ago", avatar: "donor15", count: 1, ts: 1 },
                    ] as const)
                      .slice()
                      .sort((a, b) => donorSort === "amount" ? b.amount - a.amount : b.ts - a.ts);
                    const visible = allDonors.slice(0, donorPage * 10);
                    const remaining = allDonors.length - visible.length;
                    return (<>
                      {visible.map((donor, idx) => (
                        <div key={donor.avatar} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-5 text-right font-mono">{idx + 1}</span>
                            <Avatar className="h-8 w-8 border border-white/10">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${donor.avatar}`} />
                              <AvatarFallback>{donor.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">{donor.name}</p>
                              <p className="text-[10px] text-muted-foreground">{donor.time}</p>
                            </div>
                          </div>
                          <span className={`font-semibold text-sm ${ idx === 0 ? "text-yellow-500" : idx === 1 ? "text-zinc-300" : idx === 2 ? "text-orange-500" : "text-foreground" }`}>
                            ${donor.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {remaining > 0 && (
                        <button
                          onClick={() => setDonorPage((p) => p + 1)}
                          className="w-full py-3 text-center text-sm font-medium text-primary hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <ChevronDown className="w-4 h-4" />
                          Load More ({remaining} remaining)
                        </button>
                      )}
                    </>);
                  })()}
                </div>
              </div>
            </section>

            {/* Bracket Section */}
            <section id="bracket" className="space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <GitMerge className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold">Bracket</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-card border border-white/5 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Format</span>
                  <span className="font-semibold text-foreground">3v3 Format</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-white/5 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Structure</span>
                  <span className="font-semibold text-foreground">Single Elimination</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-white/5 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Entry Fee</span>
                  <span className="font-semibold text-foreground">Free to Play</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-white/5 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Platforms</span>
                  <span className="font-semibold text-foreground">Mobile, Tablet</span>
                </div>
              </div>

              {/* Bracket Viewer */}
              <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  {/* Search */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search by User or Match"
                        className="bg-white/5 border border-white/10 rounded-lg h-8 pl-9 pr-3 text-xs focus:outline-none focus:border-primary/50 w-52 placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  {/* View Controls */}
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Fullscreen">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Fit to Screen">
                      <Crosshair className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Toggle Labels">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Zoom In">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Zoom Out">
                      <ZoomOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Round Headers */}
                <div className="grid grid-cols-3 border-b border-white/5">
                  <div className="px-6 py-2.5 text-center border-r border-white/5">
                    <span className="text-sm font-semibold text-foreground">Quarterfinals</span>
                    <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                  </div>
                  <div className="px-6 py-2.5 text-center border-r border-white/5">
                    <span className="text-sm font-semibold text-foreground">Semifinals</span>
                    <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                  </div>
                  <div className="px-6 py-2.5 text-center">
                    <span className="text-sm font-semibold text-foreground">Finals</span>
                    <span className="text-xs text-muted-foreground ml-1.5">(Best of 3)</span>
                  </div>
                </div>

                {/* Bracket Tree */}
                <div className="p-6 overflow-x-auto overflow-y-hidden min-h-[340px] flex items-center relative">
                  {/* Connector lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <line x1="232" y1="60" x2="280" y2="60" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="232" y1="160" x2="280" y2="160" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="280" y1="60" x2="280" y2="160" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="280" y1="110" x2="320" y2="110" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="232" y1="240" x2="280" y2="240" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="232" y1="340" x2="280" y2="340" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="280" y1="240" x2="280" y2="340" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="280" y1="290" x2="320" y2="290" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="540" y1="110" x2="580" y2="110" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="540" y1="290" x2="580" y2="290" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="580" y1="110" x2="580" y2="290" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                    <line x1="580" y1="200" x2="620" y2="200" stroke="currentColor" strokeWidth="1" className="text-white/10" />
                  </svg>

                  <div className="flex gap-20 min-w-max relative z-10 mx-auto">
                    {/* Quarterfinals */}
                    <div className="flex flex-col justify-around h-full gap-10">
                      {/* Match 1 */}
                      <div className="relative">
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-indigo-500 text-[9px] font-bold text-white flex items-center justify-center">1</div>
                        <div className="flex flex-col gap-px w-52 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=hotel" />
                                <AvatarFallback className="text-[8px]">HM</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Hotel Moscow</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">2</span>
                          </div>
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2 opacity-60">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=golden" />
                                <AvatarFallback className="text-[8px]">GR</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Golden Rush</span>
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">0</span>
                          </div>
                        </div>
                      </div>
                      {/* Match 2 */}
                      <div className="relative">
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-indigo-500 text-[9px] font-bold text-white flex items-center justify-center">2</div>
                        <div className="flex flex-col gap-px w-52 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=russians" />
                                <AvatarFallback className="text-[8px]">RU</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Russians Unite</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">2</span>
                          </div>
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2 opacity-60">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=mnms" />
                                <AvatarFallback className="text-[8px]">MM</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">M&Ms</span>
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Semifinals */}
                    <div className="flex flex-col justify-around h-full gap-10">
                      {/* Match 3 */}
                      <div className="relative">
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-indigo-500 text-[9px] font-bold text-white flex items-center justify-center">3</div>
                        <div className="flex flex-col gap-px w-52 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=tempest" />
                                <AvatarFallback className="text-[8px]">TR</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Tempest Relea...</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">0</span>
                          </div>
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2">
                            <span className="text-sm text-muted-foreground italic">Winner of 1</span>
                          </div>
                        </div>
                      </div>
                      {/* Match 4 */}
                      <div className="relative">
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-indigo-500 text-[9px] font-bold text-white flex items-center justify-center">4</div>
                        <div className="flex flex-col gap-px w-52 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2">
                            <span className="text-sm text-muted-foreground italic">Winner of 2</span>
                          </div>
                          <div className="flex items-center justify-between bg-white/[0.08] px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5 border border-white/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=goldman" />
                                <AvatarFallback className="text-[8px]">GS</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Goldman is the...</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Finals */}
                    <div className="flex flex-col justify-center h-full">
                      {/* Match 5 */}
                      <div className="relative">
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-yellow-500 text-[9px] font-bold text-black flex items-center justify-center">5</div>
                        <div className="flex flex-col gap-px w-52 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2">
                            <span className="text-sm text-muted-foreground italic">Winner of 3</span>
                          </div>
                          <div className="flex items-center justify-between bg-black/30 px-3 py-2">
                            <span className="text-sm text-muted-foreground italic">Winner of 4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Participants Section - Re-imagined to take less space */}
            <section id="participants" className="space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold">Participants <span className="text-muted-foreground text-lg ml-2 font-normal">(64/128)</span></h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10"
                  onClick={() => {
                    setAllTeamsExpanded(!allTeamsExpanded);
                    setExpandedTeam(null);
                  }}
                >
                  {allTeamsExpanded ? 'Collapse All' : 'Expand All'}
                </Button>
              </div>
              
              {/* Grid layout instead of super long list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 24 }, (_, i) => i + 1).map((i) => {
                  const isExpanded = allTeamsExpanded || (expandedTeam !== null && Math.floor((i - 1) / cols) === Math.floor((expandedTeam - 1) / cols));
                  return (
                  <div 
                    key={i} 
                    className={`flex flex-col p-4 rounded-xl bg-card border transition-all duration-200 group cursor-pointer ${
                      isExpanded 
                        ? 'border-primary/50 shadow-[0_0_15px_rgba(250,204,21,0.1)]' 
                        : 'border-white/5 hover:border-white/10'
                    }`}
                    onClick={() => {
                      if (allTeamsExpanded) {
                        setAllTeamsExpanded(false);
                        setExpandedTeam(null);
                      } else {
                        setExpandedTeam(expandedTeam === i ? null : i);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                          <AvatarFallback>T{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`font-medium transition-colors ${isExpanded ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                            Team Alpha {i}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="w-3 h-3" /> 3 Members
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-4 h-4 transition-all transform ${
                          isExpanded 
                            ? 'rotate-90 text-primary opacity-100' 
                            : 'text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0'
                        }`} 
                      />
                    </div>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                        {['PlayerOne', 'ProGamer', 'SniperXYZ'].map((player, pIdx) => (
                          <div key={pIdx} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2">
                               <Avatar className="h-6 w-6 border border-white/10">
                                 <AvatarImage src={`https://i.pravatar.cc/150?u=player${i}${pIdx}`} />
                                 <AvatarFallback>{player[0]}</AvatarFallback>
                               </Avatar>
                               <span className="text-sm font-medium text-foreground/90">{player}</span>
                            </div>
                            {pIdx === 0 && (
                              <Badge variant="outline" className="text-[9px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20">
                                Captain
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )})}
              </div>
            </section>

                {/* Staff / Admins Section */}
                <section id="staff" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-display font-semibold">Staff</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Creator / Owner */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-purple-500/30 transition-colors group">
                      <Avatar className="h-12 w-12 border-2 border-purple-500/40 group-hover:border-purple-500/60 transition-colors">
                        <AvatarImage src="https://i.pravatar.cc/150?u=quantum" />
                        <AvatarFallback>QS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground truncate">Quantum Studios</p>
                          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/20 border-none text-[10px] px-1.5 py-0 flex-shrink-0">Owner</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Tournament Creator</p>
                      </div>
                    </div>

                    {/* Admin 1 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-amber-500/30 transition-colors group">
                      <Avatar className="h-12 w-12 border-2 border-amber-500/40 group-hover:border-amber-500/60 transition-colors">
                        <AvatarImage src="https://i.pravatar.cc/150?u=admin1" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground truncate">MikeK</p>
                          <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 border-none text-[10px] px-1.5 py-0 flex-shrink-0">Admin</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Bracket Manager</p>
                      </div>
                    </div>

                    {/* Admin 2 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-amber-500/30 transition-colors group">
                      <Avatar className="h-12 w-12 border-2 border-amber-500/40 group-hover:border-amber-500/60 transition-colors">
                        <AvatarImage src="https://i.pravatar.cc/150?u=admin2" />
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground truncate">JessicaL</p>
                          <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 border-none text-[10px] px-1.5 py-0 flex-shrink-0">Admin</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Stream Coordinator</p>
                      </div>
                    </div>

                    {/* Moderator 1 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-blue-500/30 transition-colors group">
                      <Avatar className="h-12 w-12 border-2 border-blue-500/40 group-hover:border-blue-500/60 transition-colors">
                        <AvatarImage src="https://i.pravatar.cc/150?u=mod1" />
                        <AvatarFallback>RD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground truncate">RyanD</p>
                          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 border-none text-[10px] px-1.5 py-0 flex-shrink-0">Moderator</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Match Referee</p>
                      </div>
                    </div>

                    {/* Moderator 2 */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-blue-500/30 transition-colors group">
                      <Avatar className="h-12 w-12 border-2 border-blue-500/40 group-hover:border-blue-500/60 transition-colors">
                        <AvatarImage src="https://i.pravatar.cc/150?u=mod2" />
                        <AvatarFallback>TN</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground truncate">TinaNguyen</p>
                          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 border-none text-[10px] px-1.5 py-0 flex-shrink-0">Moderator</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Community Manager</p>
                      </div>
                    </div>
                  </div>
                </section>
                  </div>
                </div>
              </div>
            ) : (
            <section id="admin" className="space-y-6 scroll-mt-24">
              {/* Admin Mode Banner */}
              <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-400">
                  <Settings className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
                  <span className="text-sm font-bold uppercase tracking-wider">Admin Mode</span>
                </div>
                <div className="h-4 w-px bg-amber-500/30" />
                <span className="text-xs text-amber-400/70">Changes are saved per-section. Use the sidebar to navigate.</span>
              </div>
                {/* Admin Content Area */}
                <div className="space-y-8">
                  {/* General Settings */}
                  <section id="admin-overview" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold border-b border-white/5 pb-2 flex-1">General Settings</h3>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Save</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Tournament Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tournament Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" defaultValue="Road to Brawl Cup" />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
                        {/* Rich Text Toolbar */}
                        <div className="border border-white/10 rounded-xl overflow-hidden">
                          <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border-b border-white/10 flex-wrap">
                            <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                              <option>Normal</option>
                              <option>Heading 1</option>
                              <option>Heading 2</option>
                              <option>Heading 3</option>
                            </select>
                            <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                              <option>Sans Serif</option>
                              <option>Serif</option>
                              <option>Monospace</option>
                            </select>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bold"><span className="text-xs font-bold">B</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Italic"><span className="text-xs italic">I</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Underline"><span className="text-xs underline">U</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Strikethrough"><span className="text-xs line-through">S</span></button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Quote"><span className="text-xs">\u201C\u201D</span></button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors bg-white/10 text-foreground" title="Align Center"><span className="text-xs">\u2261</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Align Left"><span className="text-xs">\u2261</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Align Right"><span className="text-xs">\u2261</span></button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Ordered List"><span className="text-xs">1.</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bullet List"><span className="text-xs">\u2022</span></button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Link"><span className="text-xs">\uD83D\uDD17</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Image"><span className="text-xs">\uD83D\uDDBC</span></button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Clear Formatting"><span className="text-xs">T\u2093</span></button>
                          </div>
                          <div
                            className="w-full bg-white/[0.02] p-4 text-sm focus:outline-none min-h-[160px] text-muted-foreground leading-relaxed"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            <p>SF6 Online Tournament 4:00 PM PST streamed at <a href="https://www.twitch.tv/dummypotato" className="text-primary hover:underline">https://www.twitch.tv/dummypotato</a></p>
                            <br />
                            <p>How to communicate with your opponents during tourneys! <a href="https://discord.gg/Dw2rKyt" className="text-primary hover:underline">https://discord.gg/Dw2rKyt</a></p>
                            <p>2/3 matches until top 8, then it will become 3/5. Will stream 2 matches per winners group, if you are not called on stream use the Discord to find your opponent.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Header Image */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Header Image</label>
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-20 rounded-lg border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                            <img src={bannerImage} alt="Header" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 gap-2">
                              <Upload className="w-4 h-4" /> Upload Image
                            </Button>
                            <span className="text-xs text-muted-foreground">Recommended: 1920x1080, max 5MB</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Hide Unpublished */}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Hide Unpublished</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Hide this tournament from public listings until published</p>
                        </div>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/10 hover:bg-white/20"
                          role="switch"
                          aria-checked="false"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white/60 transition-transform translate-x-1" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Hide Crowdfunding */}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Hide Crowdfunding</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Disable the crowdfunding / contribution section</p>
                        </div>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/10 hover:bg-white/20"
                          role="switch"
                          aria-checked="false"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white/60 transition-transform translate-x-1" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Game */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Game</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                            <option value="brawl-stars">Brawl Stars</option>
                            <option value="street-fighter-6">Street Fighter 6</option>
                            <option value="valorant">Valorant</option>
                            <option value="league-of-legends">League of Legends</option>
                            <option value="fortnite">Fortnite</option>
                            <option value="rocket-league">Rocket League</option>
                            <option value="apex-legends">Apex Legends</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Start Time */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Start Time</label>
                        <div className="relative">
                          <input
                            type="datetime-local"
                            className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark]"
                            defaultValue="2026-02-19T03:00"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Timezone */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timezone</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                            <option value="est">(EST GMT-5) Eastern Standard Time</option>
                            <option value="cst">(CST GMT-6) Central Standard Time</option>
                            <option value="mst">(MST GMT-7) Mountain Standard Time</option>
                            <option value="pst">(PST GMT-8) Pacific Standard Time</option>
                            <option value="utc">(UTC GMT+0) Coordinated Universal Time</option>
                            <option value="gmt">(GMT GMT+0) Greenwich Mean Time</option>
                            <option value="cet">(CET GMT+1) Central European Time</option>
                            <option value="jst">(JST GMT+9) Japan Standard Time</option>
                            <option value="brt">(BRT GMT-3) Brasilia Time</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Console / Platform */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Console</label>
                        <div className="relative">
                          <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                            <option value="pc">PC</option>
                            <option value="playstation">PlayStation</option>
                            <option value="xbox">Xbox</option>
                            <option value="nintendo-switch">Nintendo Switch</option>
                            <option value="mobile">Mobile</option>
                            <option value="cross-platform">Cross-Platform</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Participant Signups */}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Participant Signups</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Disable joining this tournament</p>
                        </div>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/10 hover:bg-white/20"
                          role="switch"
                          aria-checked="false"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white/60 transition-transform translate-x-1" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Team Signups */}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Team Signups</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Allow players to sign up as a Team</p>
                        </div>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-primary"
                          role="switch"
                          aria-checked="true"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Charity Contributions */}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Charity Contributions</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Associate Tournament with a Charity</p>
                        </div>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/10 hover:bg-white/20"
                          role="switch"
                          aria-checked="false"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white/60 transition-transform translate-x-1" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Prize Pool Label */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Prize Pool Label</span>
                        <input type="text" className="w-48 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50" defaultValue="Pot Bonus" />
                      </div>
                    </div>
                  </section>

                  {/* Rules Settings */}
                  <section id="admin-rules" className="space-y-4 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold border-b border-white/5 pb-2">Rules & Information</h3>

                    {/* Tournament Rules & Guidelines */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Tournament Rules & Guidelines</label>
                    <div className="border border-white/10 rounded-xl overflow-hidden">
                      <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border-b border-white/10 flex-wrap">
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                          <option>Normal</option>
                          <option>Heading 1</option>
                          <option>Heading 2</option>
                          <option>Heading 3</option>
                        </select>
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                          <option>Sans Serif</option>
                          <option>Serif</option>
                          <option>Monospace</option>
                        </select>
                        <div className="w-px h-5 bg-white/10 mx-1" />
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bold"><span className="text-xs font-bold">B</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Italic"><span className="text-xs italic">I</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Underline"><span className="text-xs underline">U</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Strikethrough"><span className="text-xs line-through">S</span></button>
                        <div className="w-px h-5 bg-white/10 mx-1" />
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Quote"><span className="text-xs">\u201C\u201D</span></button>
                        <div className="w-px h-5 bg-white/10 mx-1" />
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors bg-white/10 text-foreground" title="Align Center"><span className="text-xs">\u2261</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Align Left"><span className="text-xs">\u2261</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Align Right"><span className="text-xs">\u2261</span></button>
                        <div className="w-px h-5 bg-white/10 mx-1" />
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Ordered List"><span className="text-xs">1.</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bullet List"><span className="text-xs">\u2022</span></button>
                        <div className="w-px h-5 bg-white/10 mx-1" />
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Link"><span className="text-xs">\uD83D\uDD17</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Image"><span className="text-xs">\uD83D\uDDBC</span></button>
                        <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Clear Formatting"><span className="text-xs">T\u2093</span></button>
                      </div>
                      <div
                        className="w-full bg-white/[0.02] p-4 text-sm focus:outline-none min-h-[300px] text-muted-foreground leading-relaxed"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        <p>Join the discord! <a href="https://discord.gg/Dw2rKyt" className="text-primary hover:underline">https://discord.gg/Dw2rKyt</a></p>
                        <br />
                        <p className="font-bold text-foreground">RULES:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>COMPLETELY FREE TO ENTER!</li>
                          <li>Bracket is for PC, Xbox &amp; Playstation</li>
                          <li>YOU MUST JOIN THE BRACKET ON CHALLONGE! Join here: <a href="#" className="text-primary hover:underline">https://challonge.com/tournaments/signup/...</a></li>
                          <li>All matches will be FT2 (best of 3) until top 8 where they will be FT3 (best of 5)</li>
                          <li>Open to all players in NA. (Canada, US, Mexico, DR, PR, Jamaica)</li>
                          <li>NO WIFI</li>
                          <li>NO SHARING SYSTEMS/ACCOUNTS. If you are signed up, you must be playing it on your own account and system. If you are caught sharing an account or system with another player then both players will be immediately DQ'd</li>
                          <li>Players cannot take another player's spot once the bracket has started.</li>
                          <li>COMMUNICATION WILL BE THROUGH TOURNAMENT DISCORD. THIS INCLUDES WHICH MATCHES WILL BE PLAYED ON STREAM.</li>
                          <li>After each game, the loser may switch characters but the winner must keep their character. If the winner switches characters, they automatically forfeit that game.</li>
                          <li>In the event of a Double K.O. That match will be restarted with the same characters and stage.</li>
                          <li>Try to let me know before hand if you will be in another tournament. If you're holding up the brackets then you may be DQ'd to keep the experience enjoyable for other players.</li>
                          <li>If you are unsure of anything, ping me in the discord or on stream and I'll do my best to get back to you in a timely manner.</li>
                        </ul>
                        <br />
                        <p>This is an online tournament so there may be lag. Sometimes this might not be the fault of either player. I understand that you might be frustrated but I'll ask you to try the following:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Close the game and restart it.</li>
                          <li>Try a new lobby under a different host.</li>
                        </ul>
                      </div>
                      </div>
                    </div>

                    {/* Check-in Process */}
                    <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                      <label className="text-sm font-semibold text-foreground">Check-in Process</label>
                      <div className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border-b border-white/10 flex-wrap">
                          <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                            <option>Normal</option>
                            <option>Heading 1</option>
                            <option>Heading 2</option>
                            <option>Heading 3</option>
                          </select>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bold"><span className="text-xs font-bold">B</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Italic"><span className="text-xs italic">I</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Underline"><span className="text-xs underline">U</span></button>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Ordered List"><span className="text-xs">1.</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bullet List"><span className="text-xs">{"\u2022"}</span></button>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Link"><span className="text-xs">{"\uD83D\uDD17"}</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Clear Formatting"><span className="text-xs">T{"\u2093"}</span></button>
                        </div>
                        <div
                          className="w-full bg-white/[0.02] p-4 text-sm focus:outline-none min-h-[150px] text-muted-foreground leading-relaxed"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          <p>Captain check-in begins 60 minutes before the tournament start time. If the team captain does not check in before the bracket is generated, the team will be disqualified.</p>
                          <br />
                          <p>All matches must be played immediately once the bracket is live and your opponent is decided. You have 10 minutes to show up to your match before a forfeit is awarded to the opposing team.</p>
                        </div>
                      </div>
                    </div>

                    {/* Payout Information */}
                    <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                      <label className="text-sm font-semibold text-foreground">Payout Information</label>
                      <div className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border-b border-white/10 flex-wrap">
                          <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs h-7 cursor-pointer">
                            <option>Normal</option>
                            <option>Heading 1</option>
                            <option>Heading 2</option>
                            <option>Heading 3</option>
                          </select>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bold"><span className="text-xs font-bold">B</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Italic"><span className="text-xs italic">I</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Underline"><span className="text-xs underline">U</span></button>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Ordered List"><span className="text-xs">1.</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Bullet List"><span className="text-xs">{"\u2022"}</span></button>
                          <div className="w-px h-5 bg-white/10 mx-1" />
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Link"><span className="text-xs">{"\uD83D\uDD17"}</span></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Clear Formatting"><span className="text-xs">T{"\u2093"}</span></button>
                        </div>
                        <div
                          className="w-full bg-white/[0.02] p-4 text-sm focus:outline-none min-h-[150px] text-muted-foreground leading-relaxed"
                          contentEditable
                          suppressContentEditableWarning
                        >
                          <p>Prize pool payouts are processed through Matcherino. Winners must have a valid Matcherino account and complete the necessary tax forms to receive their prize money.</p>
                          <br />
                          <p>Payouts will be initiated within 7 business days after the conclusion of the tournament and verification of match results.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Stream Link */}
                  <section className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Stream Link</span>
                        <input type="text" className="w-64 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground" placeholder="URL e.g. https://" />
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Event Socials */}
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Socials</label>
                        <div className="flex items-center gap-3">
                          <button className="w-10 h-10 rounded-full bg-[#9146FF]/20 text-[#9146FF] flex items-center justify-center hover:bg-[#9146FF]/30 transition-colors" title="Twitch">
                            <Twitch className="w-5 h-5" />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors" title="X / Twitter">
                            <X className="w-5 h-5" />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors" title="YouTube">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                          </button>
                          <button className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition-colors" title="Facebook">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z"/></svg>
                          </button>
                          <button className="w-10 h-10 rounded-full bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center hover:bg-[#5865F2]/30 transition-colors" title="Discord">
                            <MessageSquare className="w-5 h-5" />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center hover:bg-pink-500/30 transition-colors" title="Instagram">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.44.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.47.36 1.27.41 2.44.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.41 2.44a4.07 4.07 0 01-.98 1.51 4.07 4.07 0 01-1.51.98c-.47.17-1.27.36-2.44.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.44-.41a4.07 4.07 0 01-1.51-.98 4.07 4.07 0 01-.98-1.51c-.17-.47-.36-1.27-.41-2.44C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.97.41-2.44.24-.61.52-1.05.98-1.51a4.07 4.07 0 011.51-.98c.47-.17 1.27-.36 2.44-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.83 5.83 0 00-2.11 1.38A5.83 5.83 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.47 1.38 2.11a5.83 5.83 0 002.11 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.83 5.83 0 002.11-1.38 5.83 5.83 0 001.38-2.11c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.83 5.83 0 00-1.38-2.11A5.83 5.83 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Custom Tournament URL */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Custom Tournament URL</label>
                        <div className="flex items-center gap-0">
                          <span className="text-sm text-muted-foreground bg-white/5 border border-white/10 border-r-0 rounded-l-lg h-10 flex items-center px-3">https://matcherino.com/t/</span>
                          <input type="text" className="flex-1 bg-white/5 border border-white/10 rounded-r-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" defaultValue="tournamentname" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Reset / Save */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Reset</Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold px-6">Save</Button>
                      </div>
                    </div>
                  </section>

                  {/* Actions */}
                  <section className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Actions</h3>
                    </div>

                    {/* Publish */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl overflow-hidden">
                      <div className="px-5 py-3 bg-indigo-500/10 border-b border-indigo-500/20">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary" />
                          <span className="text-sm text-foreground">I have read and agree to the <a href="#" className="text-primary hover:underline font-semibold">Matcherino Terms of Service</a>.</span>
                        </label>
                      </div>
                      <div className="px-5 py-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white font-semibold">Publish</Button>
                          <span className="text-sm text-red-400">- this action cannot be undone</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This event is not yet viewable by the public. Once published, users are able to join and contribute to your event. Before you publish, fill out information in each admin section. The more information you provide users, the more likely you will succeed with your crowdfunding campaign.
                        </p>
                      </div>
                    </div>

                    {/* Cancel */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl overflow-hidden">
                      <div className="px-5 py-4 space-y-3">
                        <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white font-semibold">Cancel</Button>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          You can cancel this tournament at any time. Matcherino will refund all users who have donated.
                        </p>
                      </div>
                    </div>

                    {/* Refund */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl overflow-hidden">
                      <div className="px-5 py-4 space-y-4">
                        <span className="text-sm font-semibold text-foreground">Refund</span>
                        <p className="text-sm font-semibold text-muted-foreground">
                          Completely refund all of a user's donations and entry fees.
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1 max-w-md">
                            <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer text-muted-foreground">
                              <option value="">Select Matcherino User...</option>
                              <option value="user1">ProPlayer_1</option>
                              <option value="user2">ProPlayer_2</option>
                              <option value="user3">GamerDude_4</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                          </div>
                          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-muted-foreground hover:text-foreground">Refund</Button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Bracket */}
                  <section id="admin-bracket" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <h3 className="text-lg font-bold">Bracket</h3>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold ml-4">Link Another Bracket Site</Button>
                    </div>

                    <div className="space-y-6">
                      {/* Bracket Size */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5 pt-4">
                        <span className="text-sm font-semibold text-foreground">Bracket Size</span>
                        <select className="w-48 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Uncapped</option>
                          <option>8</option>
                          <option>16</option>
                          <option>32</option>
                          <option>64</option>
                          <option>128</option>
                          <option>256</option>
                        </select>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Bracket Format */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Bracket Format</span>
                        <select className="w-48 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Single Elimination</option>
                          <option>Double Elimination</option>
                          <option>Round Robin</option>
                          <option>Swiss</option>
                        </select>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Match Format */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Match Format</span>
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded accent-primary" defaultChecked />
                            <span className="text-sm">By Bracket</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                            <span className="text-sm">By Round</span>
                          </label>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Best of / First to */}
                      <div className="flex items-center gap-4 py-1 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">Best of</span>
                        <select className="w-40 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Best of 3</option>
                          <option>Best of 5</option>
                          <option>Best of 7</option>
                        </select>
                        <span className="text-sm text-muted-foreground">or</span>
                        <span className="text-sm font-semibold text-foreground">First to</span>
                        <select className="w-40 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Select...</option>
                          <option>First to 2</option>
                          <option>First to 3</option>
                          <option>First to 5</option>
                        </select>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Toggle options */}
                      {[
                        { label: "Game by Game Match Reporting", on: false },
                        { label: "Match Readying", on: false },
                        { label: "Admin Only Score Reporting", on: false },
                        { label: "Consolation Match", on: false },
                        { label: "Automatic accept score on loss report", on: true },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-sm font-semibold text-foreground">{item.label}</span>
                            <button
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.on ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
                              role="switch"
                              aria-checked={item.on}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${item.on ? 'bg-white translate-x-6' : 'bg-white/60 translate-x-1'}`} />
                            </button>
                          </div>
                          <div className="border-t border-white/5 mt-4" />
                        </div>
                      ))}

                      {/* Time selectors */}
                      {[
                        "Match Time Limit",
                        "Admin notified of a match with no readied players.",
                        "Readied player is advanced vs Unreadied player",
                        "One player reported score automatically accepted",
                      ].map((label, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-sm font-semibold text-foreground">{label}</span>
                            <select className="w-48 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                              <option>Select a time</option>
                              <option>5 minutes</option>
                              <option>10 minutes</option>
                              <option>15 minutes</option>
                              <option>30 minutes</option>
                              <option>60 minutes</option>
                            </select>
                          </div>
                          <div className="border-t border-white/5 mt-4" />
                        </div>
                      ))}

                      {/* Registration */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Registration</span>
                        <select className="w-48 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Open</option>
                          <option>Invite Only</option>
                          <option>Closed</option>
                        </select>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Check In */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">Check In</span>
                          <span className="text-xs text-muted-foreground">(Leave Start Time empty to disable check in)</span>
                        </div>
                        <div className="relative">
                          <input
                            type="datetime-local"
                            className="w-48 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark]"
                            placeholder="Start Time..."
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Reset / Create */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Reset</Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold px-6">Create</Button>
                      </div>
                    </div>
                  </section>
                  
                  {/* Staff */}
                  <section className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <h3 className="text-lg font-bold">Staff</h3>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold ml-4">Add</Button>
                    </div>

                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <div className="grid grid-cols-2 px-5 py-3 border-b border-white/10 bg-white/5">
                        <span className="text-sm font-semibold text-primary">Name</span>
                        <span className="text-sm font-semibold text-primary text-center">Role</span>
                      </div>
                      <div className="grid grid-cols-2 px-5 py-4">
                        <span className="text-sm text-muted-foreground"></span>
                        <span className="text-sm text-muted-foreground text-center">Empty</span>
                      </div>
                    </div>
                  </section>

                  {/* Crowdfunding */}
                  <section id="admin-contributions" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Crowdfunding</h3>
                    </div>

                    {/* Main Goal */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-primary">Main Goal</h4>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Reset</Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold px-6">Save</Button>
                        </div>
                      </div>

                      {/* Prize Pool Goal */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5 pt-4">
                        <span className="text-sm font-semibold text-foreground">Prize Pool Goal</span>
                        <input type="text" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground" placeholder="Desired funding goal $" />
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Hide Users from Supporter List */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Hide Users from Supporter List</span>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <select className="w-56 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer text-muted-foreground">
                              <option value="">Select Matcherino User...</option>
                              <option value="user1">ProPlayer_1</option>
                              <option value="user2">ProPlayer_2</option>
                              <option value="user3">GamerDude_4</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Contribute Link */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Contribute Link</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Copy Link</Button>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.04]" />

                    {/* Stretch Goals */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-primary">Stretch Goals</h4>

                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl overflow-hidden">
                        <div className="px-5 py-3 bg-indigo-500/10 border-b border-indigo-500/20">
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Click to Add Stretch Goal</Button>
                        </div>
                        <div className="px-5 py-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Offer stretch goals to your fans that if met rewards them with bonus content/events. Describe what the reward will be.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Entry */}
                  <section className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Entry</h3>
                    </div>

                    {/* Fees */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-primary">Fees</h4>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold px-6">Save</Button>
                      </div>

                      <div className="flex items-center justify-between py-1 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">Entry Fee</span>
                          <span className="text-xs text-muted-foreground">goes to prize pool</span>
                        </div>
                        <input type="text" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground" placeholder="Please input an amount." />
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Organizer Share of Entry Fee */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Organizer Share of Entry Fee</span>
                        <input type="text" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground" placeholder="Please input an amount." />
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Password */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground">Password</h4>
                        <div className="flex items-center gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Join Password</label>
                            <input type="password" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verify Password</label>
                            <input type="password" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Player Limit */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">Player Limit</span>
                          <span className="text-xs text-muted-foreground">0 for no limit</span>
                        </div>
                        <input type="number" className="w-56 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-right focus:outline-none focus:border-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" defaultValue="0" />
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* SponsorQuest Registration */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">SponsorQuest™ Registration</span>
                        <button
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-white/10 hover:bg-white/20"
                          role="switch"
                          aria-checked="false"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white/60 transition-transform translate-x-1" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Custom Form */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-primary">Custom Form</h4>
                            <p className="text-sm text-muted-foreground">Create custom fields to collect information from players who join.</p>
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                        </div>

                        <div className="rounded-xl border border-white/10 overflow-hidden">
                          <div className="grid grid-cols-2 px-5 py-3 border-b border-white/10 bg-white/5">
                            <span className="text-sm font-semibold text-primary">Question</span>
                            <span className="text-sm font-semibold text-primary text-center">Type</span>
                          </div>
                          <div className="grid grid-cols-2 px-5 py-4">
                            <span className="text-sm text-muted-foreground"></span>
                            <span className="text-sm text-muted-foreground text-center">Empty</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">Show Form</Button>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Collected Form Data */}
                      <div className="flex items-center justify-between py-1">
                        <h4 className="text-lg font-semibold text-primary">Collected Form Data</h4>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Download</Button>
                      </div>
                    </div>
                  </section>

                  {/* Participants */}
                  <section id="admin-teams" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <h3 className="text-lg font-bold">Participants</h3>
                        <button className="text-muted-foreground hover:text-foreground transition-colors" title="Download">⬇</button>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold ml-4 gap-2">
                        <Upload className="w-4 h-4" /> Share
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Add participant with account */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Add a participant with an account</span>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <select className="w-56 appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 pr-8 text-sm focus:outline-none focus:border-primary/50 cursor-pointer text-muted-foreground">
                              <option value="">Select Matcherino User...</option>
                              <option value="user1">ProPlayer_1</option>
                              <option value="user2">ProPlayer_2</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                          </div>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                          <Button size="sm" variant="outline" className="bg-white/5 border-white/10">Paid</Button>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Add participant without account */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Add a participant without an account</span>
                        <div className="flex items-center gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                            <input type="email" className="w-40 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">User Name</label>
                            <input type="text" className="w-36 bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                          </div>
                          <div className="flex items-end gap-2 pb-0.5">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                            <Button size="sm" variant="outline" className="bg-white/5 border-white/10">Paid</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.04]" />

                      {/* Name table */}
                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/10 bg-white/5">
                          <span className="text-sm font-semibold text-primary">Name</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground italic">No items yet</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Prize Pool */}
                  <section id="admin-prizepool" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Prize Pool</h3>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Create payouts to have Matcherino automatically pay a portion of the prize pool to players, casters or anyone involved with this event. Matcherino will transfer money to users in payouts when you finalize this event.
                      </p>
                    </div>

                    {/* Tournament Payouts */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">Tournament Payouts</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                      </div>

                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-6 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                          <span className="text-sm font-semibold text-primary">#</span>
                          <span className="text-sm font-semibold text-primary">Title</span>
                          <span className="text-sm font-semibold text-primary">Amount</span>
                          <span className="text-sm font-semibold text-primary">Users</span>
                          <span className="text-sm font-semibold text-primary">Share</span>
                          <span className="text-sm font-semibold text-primary">Estimate <span className="font-normal text-muted-foreground">(Amount x Users)</span></span>
                        </div>
                        <div className="px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground italic">No items yet</span>
                        </div>
                      </div>
                    </div>

                    {/* Private Staff Payouts */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-foreground">Private Staff Payouts</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Uses the organizers wallet, not the prize pool, to fund any private payouts. These payouts are not displayed publicly.</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold ml-4">Add</Button>
                      </div>

                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-4 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                          <span className="text-sm font-semibold text-primary">#</span>
                          <span className="text-sm font-semibold text-primary">Title</span>
                          <span className="text-sm font-semibold text-primary">Users</span>
                          <span className="text-sm font-semibold text-primary">Amount</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground italic">No items yet</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Marketplace */}
                  <section id="admin-stream" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <h3 className="text-lg font-bold">Marketplace</h3>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white font-semibold ml-4">Add Item to Event</Button>
                    </div>

                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <div className="grid grid-cols-3 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                        <span className="text-sm font-semibold text-foreground">Title</span>
                        <span className="text-sm font-semibold text-foreground">Quantity</span>
                        <span className="text-sm font-semibold text-foreground">Created By</span>
                      </div>
                    </div>
                  </section>

                  <section id="admin-payouts" className="space-y-4 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold border-b border-white/5 pb-2">Payouts Management</h3>
                    <p className="text-sm text-muted-foreground mb-4">Assign players to prize buckets. Payouts are automatically split evenly among the assigned players.</p>
                    
                    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1st">
                      {/* 1st Place Bucket */}
                      <AccordionItem value="item-1st" className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden data-[state=open]:bg-white/10 transition-colors">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold">1st</div>
                              <span className="font-semibold text-lg">First Place (60%)</span>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <div className="font-bold text-yellow-500 text-lg">$3,000.00</div>
                              <div className="text-xs text-muted-foreground bg-black/20 px-2 py-0.5 rounded mt-1">3 players assigned</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="space-y-6 pt-4 border-t border-white/5 mt-2">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-foreground">Add Players to Bucket</label>
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search players by name or ID to add them to this payout..." className="w-full bg-background border border-white/10 rounded-lg h-11 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50" />
                                <Button size="sm" className="absolute right-1.5 top-1.5 h-8 bg-white/10 hover:bg-white/20 text-foreground border-none">Browse All</Button>
                              </div>
                            </div>

                            <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                              <div className="flex items-center justify-between text-sm pb-2 border-b border-white/5">
                                <span className="font-medium text-muted-foreground">Assigned Players (3)</span>
                                <span className="text-green-400 font-medium bg-green-500/10 px-2.5 py-1 rounded flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Even Split: $1,000.00 each
                               </span>
                              </div>
                              
                              <div className="grid gap-2 pt-2">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5 group hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=winner${i}`} />
                                        <AvatarFallback>W{i}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="text-sm font-medium text-foreground">ProPlayer_{i}</div>
                                        <div className="text-xs text-muted-foreground">#ABCD{i}234</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className="font-semibold text-yellow-500">$1,000.00</span>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all" title="Remove Player">
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* 2nd Place Bucket */}
                      <AccordionItem value="item-2nd" className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden data-[state=open]:bg-white/10 transition-colors">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-300/20 text-slate-300 flex items-center justify-center font-bold">2nd</div>
                              <span className="font-semibold text-lg">Second Place (30%)</span>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <div className="font-bold text-slate-300 text-lg">$1,500.00</div>
                              <div className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded mt-1">Needs players</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="space-y-6 pt-4 border-t border-white/5 mt-2">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-foreground">Add Players to Bucket</label>
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search players by name or ID to add them to this payout..." className="w-full bg-background border border-white/10 rounded-lg h-11 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50" />
                                <Button size="sm" className="absolute right-1.5 top-1.5 h-8 bg-white/10 hover:bg-white/20 text-foreground border-none">Browse All</Button>
                              </div>
                            </div>
                            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-black/20">
                              <p className="text-muted-foreground text-sm">No players assigned to this bucket yet.</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* 3rd Place Bucket */}
                      <AccordionItem value="item-3rd" className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden data-[state=open]:bg-white/10 transition-colors">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-orange-700/30 text-orange-400 flex items-center justify-center font-bold">3rd</div>
                              <span className="font-semibold text-lg">Third Place (10%)</span>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <div className="font-bold text-orange-400 text-lg">$500.00</div>
                              <div className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded mt-1">Needs players</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="space-y-6 pt-4 border-t border-white/5 mt-2">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-foreground">Add Players to Bucket</label>
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search players by name or ID to add them to this payout..." className="w-full bg-background border border-white/10 rounded-lg h-11 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50" />
                                <Button size="sm" className="absolute right-1.5 top-1.5 h-8 bg-white/10 hover:bg-white/20 text-foreground border-none">Browse All</Button>
                              </div>
                            </div>
                            <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-black/20">
                              <p className="text-muted-foreground text-sm">No players assigned to this bucket yet.</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </section>

                  {/* Sponsors */}
                  <section id="admin-sponsors" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <h3 className="text-lg font-bold">Sponsors</h3>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold ml-4">Save</Button>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-5 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our sponsors provide best-in-class prize pool support to bring tournaments to the next level. Viewers can contribute without spending anything themselves.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        SponsorQuests™ allow fans to perform actions on your tournament that will result in sponsor contribution to the prize pool. SponsorQuest™ Registration can be enabled to require players to complete some of these actions in order to play.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        SponsorOverlay scales your prize pool by the number of viewers in your stream. Set up your Tournament Stream Overlay, run a sponsor reel, and receive sponsor contributions in real-time!
                      </p>
                    </div>

                    {/* SponsorQuest Registration toggle */}
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm font-semibold text-foreground">SponsorQuest™ Registration</span>
                      <button
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-red-500"
                        role="switch"
                        aria-checked="true"
                      >
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>

                    <div className="border-t border-white/[0.04]" />

                    {/* Sponsor table */}
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <div className="grid grid-cols-6 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                        <span className="text-sm font-semibold text-primary">Title</span>
                        <span className="text-sm font-semibold text-primary">Sponsor</span>
                        <span className="text-sm font-semibold text-primary">Region</span>
                        <span className="text-sm font-semibold text-primary">Quests</span>
                        <span className="text-sm font-semibold text-primary">Overlay</span>
                        <span className="text-sm font-semibold text-primary">Actions</span>
                      </div>
                      <div className="grid grid-cols-6 px-5 py-4 gap-2 items-center border-b border-white/10 bg-white/[0.02]">
                        <span className="text-sm font-medium">PowerA - KatContii</span>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">A</div>
                          <span className="text-sm">PowerA</span>
                        </div>
                        <span className="text-sm">Globals</span>
                        <Check className="w-5 h-5 text-green-400" />
                        <span />
                        <Paperclip className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </section>

                  {/* Stream */}
                  <section id="admin-streaming" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Stream</h3>
                    </div>

                    {/* Manage Streams */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-primary">Manage Streams</h4>

                      {/* Tournament Streams */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">Tournament Streams</span>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Add</Button>
                        </div>
                        <div className="border-t border-white/[0.04]" />
                        <div className="rounded-xl bg-white/[0.02] border border-white/10 px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground">No stream list found</span>
                        </div>
                      </div>

                      {/* Player Streams */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">Player Streams</span>
                          <button
                            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-red-500"
                            role="switch"
                            aria-checked="true"
                          >
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                          </button>
                        </div>
                        <div className="border-t border-white/[0.04]" />
                        <div className="rounded-xl bg-white/[0.02] border border-white/10 px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground">No Stream List Found</span>
                        </div>
                      </div>
                    </div>

                    {/* Tournament Stream Overlay */}
                    <div className="space-y-6 pt-4">
                      <h4 className="text-lg font-semibold text-primary">Tournament Stream Overlay</h4>

                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-5 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The Tournament Stream Overlay can be plugged into your streaming software to display customizable tournament content in real-time. Display prize pools, incoming contributions, live brackets, sponsor tools, and more!
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Copy and paste the Overlay Browser Source Link into your streaming software of choice and click the Overlay Editor to get started.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          If using sponsor tools such as Overlay Assets, you must Start Overlay Tracking in order to start receiving sponsor contributions. Press Stop or end your stream to stop tracking.
                        </p>
                      </div>

                      {/* Overlay Editor */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Overlay Editor</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value="https://matcherino.com/tournaments/185395/clr/0/edit?minimalui=1"
                            className="w-[360px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-muted-foreground focus:outline-none"
                          />
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Copy">
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Open">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-primary/20" />

                      {/* Overlay Browser Source Link */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-sm font-semibold text-foreground">Overlay Browser Source Link</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value="https://matcherino.com/tournaments/185395/clr/0/?minimalui=1"
                            className="w-[360px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm text-muted-foreground focus:outline-none"
                          />
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Copy">
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Open">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-primary/20" />
                    </div>
                  </section>

                  {/* Location */}
                  <section id="admin-location" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 flex-1">
                        <MapPin className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Location</h3>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Button variant="ghost" className="text-foreground font-semibold hover:text-foreground">Reset</Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold">Save</Button>
                      </div>
                    </div>

                    <div className="space-y-0">
                      {/* Address 1 */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">Address 1</span>
                        <input type="text" placeholder="Address 1" className="w-[360px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* Address 2 */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">Address 2</span>
                        <input type="text" placeholder="Address 2" className="w-[360px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* City */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">City</span>
                        <input type="text" placeholder="City" className="w-[180px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* State */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">State</span>
                        <input type="text" placeholder="State" className="w-[180px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* Zip */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">Zip</span>
                        <input type="text" placeholder="Zip" className="w-[180px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* Country */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">Country</span>
                        <select className="w-[180px] appearance-none bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50 cursor-pointer">
                          <option>Select a country</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Japan</option>
                          <option>South Korea</option>
                          <option>Brazil</option>
                        </select>
                      </div>

                      {/* Email */}
                      <div className="flex items-center justify-between py-4 border-b border-primary/20">
                        <span className="text-sm font-semibold text-primary">Email</span>
                        <input type="email" placeholder="Email address" className="w-[180px] bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>
                    </div>
                  </section>

                  {/* Venues & Series */}
                  <section id="admin-venues" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold">Venues & Series</h3>
                    </div>

                    {/* Venues */}
                    <div className="space-y-3">
                      <span className="text-sm font-bold text-foreground">Venues</span>
                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-2 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                          <span className="text-sm font-semibold text-primary">Title</span>
                          <span className="text-sm font-semibold text-primary">Status</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground italic">No items yet</span>
                        </div>
                      </div>
                    </div>

                    {/* Series */}
                    <div className="space-y-3">
                      <span className="text-sm font-bold text-foreground">Series</span>
                      <div className="rounded-xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-2 px-5 py-3 border-b border-white/10 bg-white/[0.03] gap-2">
                          <span className="text-sm font-semibold text-primary">Title</span>
                          <span className="text-sm font-semibold text-primary">Status</span>
                        </div>
                        <div className="px-5 py-4 text-center">
                          <span className="text-sm text-muted-foreground italic">No items yet</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Messaging */}
                  <section id="admin-messaging" className="space-y-6 scroll-mt-24 bg-card/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <MessageSquare className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Messaging</h3>
                    </div>

                    <div className="space-y-4">
                      {/* To */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">To</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-primary/50" />
                      </div>

                      {/* Body */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Body</label>
                        <div className="border border-white/10 rounded-xl overflow-hidden">
                          {/* Toolbar */}
                          <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.02] flex-wrap">
                            <select className="bg-white/10 border border-white/10 rounded px-2 py-1 text-xs">
                              <option>Normal</option>
                              <option>Heading 1</option>
                              <option>Heading 2</option>
                              <option>Heading 3</option>
                            </select>
                            <select className="bg-white/10 border border-white/10 rounded px-2 py-1 text-xs">
                              <option>Sans Serif</option>
                              <option>Serif</option>
                              <option>Monospace</option>
                            </select>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs font-bold">B</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs italic">I</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs underline">U</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs line-through">S</button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">“”</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground bg-white/10 text-xs">≡</button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">1.</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">•</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">⇤</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">⇥</button>
                            <div className="w-px h-5 bg-white/10 mx-1" />
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">🔗</button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground text-xs">Tₓ</button>
                          </div>
                          {/* Editor area */}
                          <div
                            contentEditable
                            className="min-h-[140px] px-4 py-3 text-sm focus:outline-none text-muted-foreground"
                            data-placeholder="Body"
                            style={{ minHeight: '140px' }}
                          />
                        </div>
                      </div>

                      {/* Send */}
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-semibold px-6">Send</Button>
                      </div>
                    </div>
                  </section>
                </div>
            </section>
            )}
          </div>
          </>
          )}

          {/* Floating Save All - Admin Mode */}
          {isAdminMode && (
            <div className="sticky bottom-0 z-30 pointer-events-none">
              <div className="flex justify-end p-4 pointer-events-auto">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-black font-bold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40">
                  <Save className="w-4 h-4" />
                  Save All Changes
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar (Stats & Activity) */}
        <aside className={`w-[320px] border-l border-white/5 hidden xl:flex flex-col flex-shrink-0 h-full transition-colors duration-500 ${bannerIndex === 1 ? 'bg-pink-950/30' : bannerIndex === 2 ? 'bg-cyan-950/30' : 'bg-card/30'}`}>
          {rightSidebarContent}
        </aside>

      </div>
      <MobileSidebarBar leftSidebar={leftSidebarContent} rightSidebar={rightSidebarContent} />
    </div>
  );
}
