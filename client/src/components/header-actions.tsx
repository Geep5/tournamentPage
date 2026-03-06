import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Heart, Bell, ChevronDown, X, Trophy, Star, Gift, CheckCircle2, Gamepad2, Clock, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockNotifications = [
  {
    id: 1,
    type: "accepted" as const,
    message: 'Your application has been accepted!',
    time: "Mon, Feb 16 at 7:26 PM",
    read: false,
  },
  {
    id: 2,
    type: "prize" as const,
    message: 'Congrats on your prize winnings from "TCL2025 : North Africa #5"!',
    time: "Tue, Jun 24 at 3:11 AM",
    read: false,
  },
  {
    id: 3,
    type: "accepted" as const,
    message: 'Your application has been accepted!',
    time: "Wed, Dec 03 at 11:47 AM",
    read: true,
  },
  {
    id: 4,
    type: "prize" as const,
    message: 'Congrats on your prize winnings from "TCL2025 : North Africa #4"!',
    time: "Mon, Jun 23 at 7:35 AM",
    read: true,
  },
  {
    id: 5,
    type: "prize" as const,
    message: 'Congrats on your prize winnings from "TCL2025 : North Africa #3"!',
    time: "Mon, Jun 23 at 7:34 AM",
    read: true,
  },
];

const mockMyTournaments = [
  {
    id: 1,
    title: "Road to Brawl Cup SESA",
    game: "Brawl Stars",
    image: "photo-1614680376593-902f74cf0d41",
    prizePool: "$4,250",
    role: "Participant",
    live: true,
  },
  {
    id: 2,
    title: "SC2 Masters Cup",
    game: "Starcraft II",
    image: "photo-1542751371-adc38448a05e",
    prizePool: "$5,000",
    role: "Organizer",
    live: false,
  },
];

const mockFavorites = [
  {
    id: 3,
    title: "Tekken World Tour",
    game: "Tekken 8",
    image: "photo-1511512578047-dfb367046420",
    prizePool: "$12,500",
    live: false,
  },
  {
    id: 4,
    title: "GG Strive Open",
    game: "Guilty Gear Strive",
    image: "photo-1493711662062-fa541adb3fc8",
    prizePool: "$3,200",
    live: true,
  },
];

const mockRecent = [
  {
    id: 5,
    title: "KOF Community Cup",
    game: "KOF XV",
    image: "photo-1550745165-9bc0b252726f",
    prizePool: "$1,800",
    live: false,
  },
  {
    id: 6,
    title: "Fatal Fury Wolves Invitational",
    game: "Fatal Fury",
    image: "photo-1542751371-adc38448a05e",
    prizePool: "$5,000",
    live: false,
  },
];

export function HeaderActions() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [location] = useLocation();
  const isProfile = location === "/profile";

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Heart — My Tournaments / Favorites / Recent */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
            <Heart className="h-5 w-5" />
            {(mockMyTournaments.length + mockFavorites.length) > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[360px] p-0 bg-[#1C2230] border-white/10 rounded-xl shadow-2xl"
        >
          <div className="max-h-[440px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* My Tournaments */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Swords className="w-3.5 h-3.5" />
                My Tournaments
                <span className="ml-auto text-[10px] font-normal normal-case">{mockMyTournaments.length}</span>
              </div>
            </div>
            {mockMyTournaments.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={`https://images.unsplash.com/${t.image}?auto=format&fit=crop&w=100&q=80`}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{t.title}</p>
                    {t.live && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{t.game} &middot; {t.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                    <Trophy className="w-3 h-3" />
                    {t.prizePool}
                  </div>
                </div>
              </div>
            ))}

            {/* Favorites */}
            <div className="px-4 pt-4 pb-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" />
                Favorites
                <span className="ml-auto text-[10px] font-normal normal-case">{mockFavorites.length}</span>
              </div>
            </div>
            {mockFavorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={`https://images.unsplash.com/${fav.image}?auto=format&fit=crop&w=100&q=80`}
                    alt={fav.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{fav.title}</p>
                    {fav.live && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{fav.game}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                    <Trophy className="w-3 h-3" />
                    {fav.prizePool}
                  </div>
                </div>
              </div>
            ))}

            {/* Recent */}
            <div className="px-4 pt-4 pb-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Recent
                <span className="ml-auto text-[10px] font-normal normal-case">{mockRecent.length}</span>
              </div>
            </div>
            {mockRecent.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={`https://images.unsplash.com/${r.image}?auto=format&fit=crop&w=100&q=80`}
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.game}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                    <Trophy className="w-3 h-3" />
                    {r.prizePool}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[380px] p-0 bg-[#1C2230] border-white/10 rounded-xl shadow-2xl"
        >
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>
          <div className="max-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`relative px-4 py-3 border-b border-white/5 last:border-0 transition-colors ${
                    notif.read ? "opacity-60" : ""
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 border ${
                      notif.type === "prize"
                        ? "bg-indigo-500/10 border-indigo-500/30"
                        : "bg-white/[0.03] border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          notif.type === "prize"
                            ? "bg-indigo-500/20"
                            : "bg-green-500/20"
                        }`}
                      >
                        {notif.type === "prize" ? (
                          <Gift className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white leading-snug">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                      <button
                        onClick={() => dismissNotification(notif.id)}
                        className="text-muted-foreground/40 hover:text-muted-foreground transition-colors shrink-0 ml-auto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {!notif.read && (
                      <div className="absolute top-3 left-1 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`flex items-center gap-2 px-2 ${isProfile ? "bg-primary hover:bg-primary/90 text-black font-semibold" : ""}`}>
            <Avatar className="h-7 w-7 border border-primary/50">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm font-medium">Matcherino</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-[#1C2230] border-white/10">
          <DropdownMenuLabel className="text-muted-foreground">Balance: <span className="text-white font-bold">$218.36</span></DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuItem asChild><Link href="/profile" className="w-full">Profile</Link></DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
