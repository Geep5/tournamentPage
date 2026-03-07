import { Button } from "@/components/ui/button";
import { HeaderActions } from "@/components/header-actions";
import { Search, Menu, X, CheckCircle2, Globe, Users, Ticket, Sparkles, Calendar, Trophy, ChevronLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import helmetLogo from "@assets/mhelmet_1771552283812.png";
import partnerBadge from "@assets/partner-badge.png";

// --- Partnership Programs ---

interface PartnerProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  logoType: "asset" | "emoji";
  accentColor: string;
  coverImg?: string;
  externalUrl?: string;
  benefits: { title: string; description: string }[];
  formFields: { label: string; placeholder: string }[];
}

const programs: PartnerProgram[] = [
  {
    id: "matcherino",
    name: "Matcherino",
    tagline: "Platform Partnership",
    description: "Become an official Matcherino Partner and unlock contribution codes, sponsor access, custom event URLs, and a dedicated partner manager for all your events.",
    logo: "matcherino",
    logoType: "asset",
    accentColor: "primary",
    benefits: [
      { title: "Enhanced Support", description: "Be assigned a partner manager to support you and your events." },
      { title: "Contribution Codes", description: "Partner+ Organizers receive Contribution Codes to reward free community participation." },
      { title: "Sponsorship Access", description: "SponsorQuests and SponsorOverlay boost prize pools at no cost to your community." },
      { title: "Custom Event URL", description: "Set a custom website URL for your events." },
      { title: "Venues, Series and Communities", description: "Gain access to more event types like Series and Venues and establish a Community." },
    ],
    formFields: [
      { label: "Organization Name", placeholder: "Streamer name if no org" },
      { label: "Organization Twitter Profile", placeholder: "@yourorg" },
      { label: "Twitch Channel", placeholder: "twitch.tv/yourchannel" },
      { label: "Email Address", placeholder: "you@example.com" },
      { label: "Name of Matcherino Organizer referring you", placeholder: "If any" },
      { label: "What Discord username should we contact you at?", placeholder: "username#0000" },
      { label: "Other relevant social media links", placeholder: "YouTube, Instagram, etc." },
      { label: "Link to the tournament/organization Discord server (Non-expiring)", placeholder: "https://discord.gg/..." },
      { label: "What Country are you based in?", placeholder: "United States" },
      { label: "Primary Region/State/Province", placeholder: "California" },
    ],
  },
  {
    id: "brawlstars",
    name: "Brawl Stars",
    tagline: "Supercell Community Partner",
    description: "Partner with the Brawl Stars esports program on Matcherino. Run officially supported Brawl Stars tournaments with in-game item drops, verified brackets, and Supercell community resources.",
    logo: "⭐",
    logoType: "emoji",
    accentColor: "yellow-500",
    coverImg: "https://supercell.com/images/b524ca49e8549e5d3f5485452da7f26c/cropped.png",
    externalUrl: "https://event.supercell.com/brawlstars/",
    benefits: [
      { title: "In-Game Item Drops", description: "Reward participants with exclusive Brawl Stars in-game items and skins during your events." },
      { title: "Verified Tournament Status", description: "Your events show a verified Brawl Stars badge, attracting more competitors." },
      { title: "Supercell Promotion", description: "Get featured on Supercell's community channels and social media." },
      { title: "Priority Support", description: "Direct line to the Brawl Stars esports team for event coordination." },
    ],
    formFields: [
      { label: "Organization / Creator Name", placeholder: "Your org or creator name" },
      { label: "Supercell Creator Code (if any)", placeholder: "e.g. MYCODE" },
      { label: "Email Address", placeholder: "you@example.com" },
      { label: "Discord Username", placeholder: "username#0000" },
      { label: "Link to your community Discord server", placeholder: "https://discord.gg/..." },
      { label: "How many Brawl Stars events have you organized?", placeholder: "Approximate number" },
      { label: "Social media links (YouTube, Twitter, etc.)", placeholder: "Links to your channels" },
      { label: "What region do you primarily organize in?", placeholder: "e.g. North America, EMEA, SEA" },
    ],
  },
  {
    id: "bazaar",
    name: "The Bazaar",
    tagline: "Tempo Storm Community Partner",
    description: "Partner with The Bazaar esports program on Matcherino. Organize official Bazaar community tournaments with exclusive card-back drops, leaderboard integration, and Tempo Storm support.",
    logo: "🃏",
    logoType: "emoji",
    accentColor: "purple-500",
    coverImg: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1617400/3582d761ebef9a077a850170cf2d9431fae366e0/ss_3582d761ebef9a077a850170cf2d9431fae366e0.1920x1080.jpg?t=1772641473",
    externalUrl: "https://www.thebazaar.gg/",
    benefits: [
      { title: "Exclusive Card-Back Drops", description: "Distribute limited-edition card backs to tournament participants and winners." },
      { title: "Leaderboard Integration", description: "Your tournament results feed into the official Bazaar community leaderboard." },
      { title: "Tempo Storm Promotion", description: "Featured placement on Tempo Storm community hub and social channels." },
      { title: "Early Access Content", description: "Get access to new card sets and game modes before public release for tournament use." },
    ],
    formFields: [
      { label: "Organization / Creator Name", placeholder: "Your org or creator name" },
      { label: "Email Address", placeholder: "you@example.com" },
      { label: "Discord Username", placeholder: "username#0000" },
      { label: "Link to your community Discord server", placeholder: "https://discord.gg/..." },
      { label: "How many card game / Bazaar events have you organized?", placeholder: "Approximate number" },
      { label: "Social media links (YouTube, Twitter, Twitch, etc.)", placeholder: "Links to your channels" },
      { label: "What region do you primarily organize in?", placeholder: "e.g. North America, EMEA, SEA" },
      { label: "Why do you want to partner with The Bazaar program?", placeholder: "Tell us about your community" },
    ],
  },
  {
    id: "metalstorm",
    name: "Metalstorm",
    tagline: "Tencent / Level Infinite",
    description: "Run officially supported Metalstorm tournaments on Matcherino. Bring competitive aerial combat to your community with dogfight brackets, in-game rewards, and Level Infinite promotion.",
    logo: "✈️",
    logoType: "emoji",
    accentColor: "blue-500",
    coverImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2453200/library_hero.jpg",
    externalUrl: "https://store.steampowered.com/app/2453200/Metalstorm/",
    benefits: [
      { title: "In-Game Rewards", description: "Distribute exclusive skins and items to tournament participants." },
      { title: "Verified Events", description: "Your tournaments receive official Metalstorm verification and promotion." },
      { title: "Level Infinite Support", description: "Direct coordination with the publishing team for event logistics." },
      { title: "Community Growth", description: "Get featured across Metalstorm social channels and in-game news." },
    ],
    formFields: [],
  },
  {
    id: "ironsagavs",
    name: "Iron Saga VS",
    tagline: "Gameduchy Community Partner",
    description: "Partner with Iron Saga VS on Matcherino. Organize mech combat tournaments with exclusive pilot rewards, ranked integration, and publisher-backed prize support.",
    logo: "🤖",
    logoType: "emoji",
    accentColor: "red-500",
    coverImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2463800/library_hero.jpg",
    externalUrl: "https://store.steampowered.com/app/2463800/Iron_Saga_VS/",
    benefits: [
      { title: "Exclusive Pilot Rewards", description: "Distribute limited-edition pilots and mech skins to competitors." },
      { title: "Ranked Integration", description: "Tournament results feed into official Iron Saga VS rankings." },
      { title: "Publisher Promotion", description: "Featured on Gameduchy community channels and in-game events hub." },
      { title: "Prize Pool Support", description: "Access publisher-funded prize pool contributions for qualified events." },
    ],
    formFields: [],
  },
];

// --- Activity sidebar data ---

const activityItems = [
  { name: "Korean Starcraft League: Week 86", time: "2 hours ago" },
  { name: "Tekken 8 Masters Series #24", time: "5 hours ago" },
  { name: "Guilty Gear Strive Monthly #12", time: "8 hours ago" },
  { name: "FGC Weekly: King of Fighters XV", time: "12 hours ago" },
  { name: "Granblue Fantasy Versus Rising Open", time: "1 day ago" },
  { name: "Skullgirls Encore Community Cup", time: "1 day ago" },
  { name: "2XKO Beta Showdown", time: "2 days ago" },
  { name: "Fatal Fury Invitational #8", time: "2 days ago" },
  { name: "Ultimate Marvel vs Capcom 3 Revival", time: "3 days ago" },
  { name: "Tetris Championship Circuit: Week 14", time: "3 days ago" },
];

// --- Logo component ---

function ProgramLogo({ program, size = "md" }: { program: PartnerProgram; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };
  const textMap = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };

  if (program.logoType === "asset" && program.logo === "matcherino") {
    return <img src={partnerBadge} alt={program.name} className={`${sizeMap[size]} object-contain`} />;
  }
  return (
    <div className={`${sizeMap[size]} rounded-xl bg-white/10 flex items-center justify-center`}>
      <span className={textMap[size]}>{program.logo}</span>
    </div>
  );
}

// --- Main Component ---

export default function PartnershipPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const activeProgram = programs.find((p) => p.id === selectedProgram) ?? null;

  const rightSidebarContent = (
    <div className="p-5 space-y-4 flex-1">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Activity</h3>
        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">All Partnership (Latest)</span>
      </div>

      <div className="space-y-2">
        {activityItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors border border-white/5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-white/5">
              {i % 3 === 0 ? (
                <Trophy className="w-4 h-4 text-yellow-500" />
              ) : i % 3 === 1 ? (
                <Ticket className="w-4 h-4 text-blue-400" />
              ) : (
                <Calendar className="w-4 h-4 text-green-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-semibold text-white">{item.name}</span>{" "}
                <span className="text-muted-foreground">was approved for Tier {(i % 3) + 1} Coupons!</span>
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.time}</p>
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
PARTNERSHIP STATUS: Not Applied [from API]
ELIGIBLE TO APPLY: Yes (meets minimum requirements) [from API]
CURRENT ORGANIZER TIER: Tier 2 [from session]
TOTAL EVENTS ORGANIZED: 12 [from API]

PAGE: Partnership Program
PURPOSE: Learn about and apply for Matcherino's Partnership Program for content creators and tournament organizers.

PROGRAM OVERVIEW:
- Partnership Program offers benefits for content creators and tournament organizers
- Tiers: Partner and Partner+ (higher tier unlocks more features)
- Benefits include: custom coupons, priority support, revenue sharing, featured placement
- Partners get access to exclusive tools for growing their community

HOW TO APPLY:
- Open a ticket in the Matcherino Discord server
- Include: your channel/org name, audience size, games you cover, tournament history
- Applications reviewed by the partnerships team

ORGANIZER PROGRAM (related):
- Separate from Partnership -- focuses on tournament organizers specifically
- Has its own tier structure managed by Dwai
- Contact Dwai for organizer tier questions

ACTIONS ON THIS PAGE:
- "Apply Now" button: Opens Discord for partnership application
- "Learn More" sections: Expand to show tier-specific benefits
- FAQ section: Common questions about the program

MATCHERINO SUPPORT INFO:
- Partnership applications: open a ticket in the Matcherino Discord
- Organizer Program questions: contact Dwai
- General support: Matcherino Discord
- Payout questions: brian@matcherino.com`}
      </div>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#1B213A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center h-14 px-4 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/events">
              <img src={helmetLogo} alt="Matcherino" className="w-8 h-8 object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <a href="/events" className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors border-b-2 border-transparent">Events</a>
              <a href="/partnership" className="px-3 py-1.5 text-sm font-semibold text-white border-b-2 border-primary">Partnership</a>
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
      <div className="flex flex-1 relative min-h-0 overflow-hidden">

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto h-full bg-[#111827]/50 scroll-smooth pb-12 lg:pb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">

            {/* Page Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <img src={partnerBadge} alt="Matcherino Partner" className="w-5 h-5 object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-white">Partnership</h2>
            </div>

            {!activeProgram ? (
              /* ── Program Selection ── */
              <>
                <p className="text-sm text-muted-foreground -mt-4">
                  Become a partner to unlock tools, support, and rewards for your events.
                </p>

                {/* ── Matcherino Hero Card ── */}
                {(() => {
                  const m = programs.find((p) => p.id === 'matcherino')!;
                  return (
                    <button
                      onClick={() => setSelectedProgram(m.id)}
                      className="rounded-2xl border border-white/5 bg-[#1C2230] overflow-hidden text-left hover:border-primary/30 transition-all group cursor-pointer w-full"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 aspect-[16/9] md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8">
                          <img src={partnerBadge} alt="Matcherino" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg" />
                        </div>
                        <div className="flex-1 p-6 md:p-8 space-y-4 flex flex-col justify-center">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{m.name} Partnership</h3>
                            <p className="text-sm text-muted-foreground mt-1">{m.tagline}</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {m.benefits.slice(0, 3).map((b, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                {b.title}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary pt-1">
                            Learn more & apply
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })()}

                {/* ── Publisher Programs ── */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-white">Publisher Programs</h3>
                  <p className="text-sm text-muted-foreground -mt-1">Run officially supported events through our publisher partners.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {programs.filter((p) => p.externalUrl).map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => window.open(prog.externalUrl, '_blank', 'noopener')}
                        className="rounded-2xl border border-white/5 bg-[#1C2230] overflow-hidden text-left hover:border-white/15 hover:bg-[#1C2230]/80 transition-all group cursor-pointer"
                      >
                        {prog.coverImg && (
                          <div className="aspect-[16/7] overflow-hidden">
                            <img
                              src={prog.coverImg}
                              alt={prog.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-3">
                            <ProgramLogo program={prog} size="sm" />
                            <div>
                              <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{prog.name}</h3>
                              <p className="text-[11px] text-muted-foreground">{prog.tagline}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{prog.description}</p>
                          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                            Visit Organizer Program
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* ── Program Detail + Application ── */
              <>
                {/* Back button */}
                <button
                  onClick={() => { setSelectedProgram(null); setShowApplication(false); }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors -mt-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  All Programs
                </button>

                {/* Program Preview */}
                <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <ProgramLogo program={activeProgram} size="lg" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeProgram.name} Partnership</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{activeProgram.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{activeProgram.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProgram.benefits.map((b, i) => (
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

                {/* Requirements + Apply Gate */}
                {!showApplication ? (
                  <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-6 md:p-8 space-y-5">
                    <h3 className="text-lg font-bold text-white">Requirements</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <span>You must be an <span className="text-white font-medium">event organizer</span> or <span className="text-white font-medium">content creator</span> — this program is not for players or general attendees.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <span>You should have experience running tournaments or community events (online or in-person).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <span>An active community presence (Discord server, social following, or streaming channel) is expected.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <span>Applications are reviewed within <span className="text-white font-medium">3–5 business days</span>. You'll be contacted via Discord or email.</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <button
                        onClick={() => setShowApplication(true)}
                        className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-colors"
                      >
                        I'm an organizer — show me the application
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── Application Form ── */
                  <>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Apply to {activeProgram.name}</h3>
                      <p className="text-sm text-muted-foreground">Fill out and submit the application below for review.</p>
                    </div>

                    <div className="space-y-5">
                      {activeProgram.formFields.map((field, i) => (
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
          </div>
        </main>

        {/* Right Side Panel */}
        <aside className="w-[320px] flex-col flex-shrink-0 hidden lg:flex border-l border-white/5 h-full overflow-y-auto bg-[#161B22] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightSidebarContent}
        </aside>
      </div>
      <MobileSidebarBar rightSidebar={rightSidebarContent} />
    </div>
  );
}
