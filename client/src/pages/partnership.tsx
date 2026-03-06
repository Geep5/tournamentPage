import { Button } from "@/components/ui/button";
import { HeaderActions } from "@/components/header-actions";
import { Search, Menu, X, CheckCircle2, Globe, Users, Ticket, Sparkles, Calendar, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { MobileSidebarBar } from "@/components/mobile-sidebar-bar";
import helmetLogo from "@assets/mhelmet_1771552283812.png";
import partnerBadge from "@assets/partner-badge.png";

const benefits = [
  {
    title: "Enhanced Support",
    description: "Be assigned a partner manager to support you and your events.",
  },
  {
    title: "Contribution Codes",
    description: "Partner+ Organizers receive Contribution Codes to reward free community participation. Apply below and our team will review within 3-5 business days.",
  },
  {
    title: "Sponsorship Access",
    description: "SponsorQuests and SponsorOverlay boost prize pools at no cost to your community.",
  },
  {
    title: "Custom Event URL",
    description: "Set a custom website URL for your events.",
  },
  {
    title: "Venues, Series and Communities",
    description: "Gain access to more event types like Series and Venues and establish a Community.",
  },
];

const formFields = [
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
];

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

export default function PartnershipPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rightSidebarContent = (
    <div className="p-5 space-y-4 flex-1">
      {/* Activity Feed */}
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
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-10">

            {/* Page Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <img src={partnerBadge} alt="Matcherino Partner" className="w-5 h-5 object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-white">Partnership</h2>
            </div>

            {/* Partner Explainer */}
            <div className="rounded-2xl border border-white/5 bg-[#1C2230] p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-4">
                <img src={partnerBadge} alt="Matcherino Partner" className="w-16 h-16 object-contain shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white">Why Apply to be a Matcherino Partner?</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Get the most out of your events.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
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


            {/* Application Form */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Applications</h1>
              <h2 className="text-xl font-semibold text-white/80 mb-2">Partnered Organizer</h2>
              <p className="text-sm text-muted-foreground">Fill out and submit the application below for review.</p>
            </div>

            <div className="space-y-5">
              {formFields.map((field, i) => (
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
