/**
 * Marco Glossary — single source of truth for Matcherino site navigation.
 *
 * Marco uses this glossary to decide which page to navigate to when a user
 * asks about something. Each entry maps a route to:
 *   - A human label (shown in "YOU ARE ON: ..." context)
 *   - A short description (used in the navigate tool hint)
 *   - Keywords that match user intent (offline fallback routing)
 *   - A detailed "what lives here" block (injected into the system prompt)
 *
 * Every consumer of route/page knowledge imports from here. Do NOT duplicate
 * route lists elsewhere.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GlossaryEntry {
  /** URL path (exact or pattern like "/p/mortalkombat/t/:id") */
  path: string;
  /** Human-readable page name */
  label: string;
  /** One-line description for tool hints */
  description: string;
  /** Keywords for offline intent matching (lowercase) */
  keywords: string[];
  /** What information and actions live on this page — used in system prompt */
  contents: string[];
  /** Whether this page is directly navigable via the navigate tool */
  navigable: boolean;
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

export const GLOSSARY: GlossaryEntry[] = [
  {
    path: "/",
    label: "Tournament Detail",
    description: "A specific tournament — overview, bracket, teams, contributions, streams, and admin controls",
    keywords: ["home", "tournament", "bracket", "match", "teams"],
    navigable: true,
    contents: [
      "Tournament overview: title, game, format, dates, prize pool, organizer",
      "Bracket tab: view/manage bracket seedings, report match results, advance rounds",
      "Teams tab: registered participants, team rosters",
      "Contributions tab: crowdfunding pins, prize pool progress",
      "Stream tab: embedded Twitch streams from registered streamers",
      "Goals tab: stretch goals for the prize pool",
      "Payouts tab: prize distribution breakdown",
      "Rules tab: tournament ruleset and guidelines",
      "Admin Mode (organizers only): edit tournament settings, manage bracket, control registration, trigger payouts",
      "Admin > General tab: change tournament name, description, dates, format",
      "Admin > Bracket tab: seed players, start tournament, advance rounds",
      "Admin > Registration: open/close registration",
      "Admin > Payouts: distribute prizes (requires completed tax interview)",
    ],
  },
  {
    path: "/events",
    label: "Events Browser",
    description: "Browse, search, and discover tournaments across all games",
    keywords: ["events", "browse", "search", "find", "tournaments", "discover"],
    navigable: true,
    contents: [
      "Featured Events carousel: highlighted upcoming tournaments",
      "Browse by Game: grid of game tiles with tournament/participant counts",
      "Recommended Events: upcoming tournaments with details (date, format, entry fee, prize pool)",
      "Live Activity Feed: real-time contributions across all events",
      "Search bar: find tournaments by name, game, or organizer",
      "Clicking a tournament card navigates to that tournament's detail page",
    ],
  },
  {
    path: "/create",
    label: "Create Tournament",
    description: "Create a new tournament event on Matcherino",
    keywords: ["create", "new", "tournament", "setup", "organize"],
    navigable: true,
    contents: [
      "Required fields: Tournament Name, Game, Start Date, Format",
      "Optional fields: Entry Fee, Max Participants, Description, Rules, Banner Image",
      "Advanced Settings (collapsed by default): Check-in Window, Team Size, Region Lock, Series Format",
      "Gotcha: Game must be selected before Format options populate",
      "Gotcha: Advanced Settings collapsed — users often miss it",
      "Drafts: unsaved tournament drafts accessible here",
    ],
  },
  {
    path: "/profile",
    label: "User Profile",
    description: "Account settings, linked accounts, cashout, tax information, and tournament history",
    keywords: ["profile", "account", "settings", "cashout", "payout", "tax", "linked", "discord", "supercell"],
    navigable: true,
    contents: [
      "Account Info: display name, email, avatar",
      "Linked Accounts: connect/disconnect Discord, Supercell ID, Twitch, and other game accounts",
      "Payment Settings: PayPal email for cashouts, bank wire details",
      "Tax Interview: W-8BEN (international) or W-9 (US) — required before any payouts",
      "Retake Interview button: redo tax form if needed",
      "Cash Out button: withdraw available balance via PayPal",
      "Tournament History: past tournaments participated in or organized",
      "Organizer Settings: organizer program tier status and features",
      "Common issue: tax submit button disabled = not all checkboxes checked",
      "Common issue: Discord 'already authorized' = contact support to unlink on backend",
      "Common issue: Supercell ID cannot be unlinked — restore deleted account instead",
    ],
  },
  {
    path: "/partnership",
    label: "Partnership Program",
    description: "Learn about and apply for Matcherino's Partnership Program for creators and organizers",
    keywords: ["partnership", "partner", "creator", "program", "apply"],
    navigable: true,
    contents: [
      "Program overview: benefits for content creators and tournament organizers",
      "Tiers: Partner and Partner+ with increasing features",
      "Benefits: custom coupons, priority support, revenue sharing, featured placement",
      "How to apply: open a ticket in Matcherino Discord",
      "Organizer Program (related but separate): managed by Dwai, has its own tier structure",
    ],
  },
  {
    path: "/p/starcraft",
    label: "StarCraft II Program",
    description: "StarCraft II white-label community hub — SC2 tournaments, partnership, and FAQ",
    keywords: ["starcraft", "sc2", "starcraft 2"],
    navigable: true,
    contents: [
      "White-label program page branded for StarCraft II",
      "Events tab: all SC2 tournaments (live, upcoming, past), season sponsors, SponsorQuests",
      "Partnership tab: apply to become a StarCraft II tournament organizer partner",
      "FAQ tab: common questions about SC2 tournaments, prizes, and the platform",
      "Activity feed sidebar: recent contributions, registrations, wins",
      "Matcherino helmet icon exits back to the main Events page",
    ],
  },
  {
    path: "/p/mortalkombat",
    label: "Mortal Kombat 1 Program",
    description: "Mortal Kombat 1 white-label community hub — MK1 tournaments, partnership, and FAQ",
    keywords: ["mortal kombat", "mk1", "mk", "mortalkombat"],
    navigable: true,
    contents: [
      "White-label program page branded for Mortal Kombat 1",
      "Events tab: all MK1 tournaments (live, upcoming, past) — some featured",
      "Partnership tab: apply to become an MK1 tournament organizer partner",
      "FAQ tab: common questions about MK1 tournaments, prizes, and the platform",
      "Activity feed sidebar: recent contributions, registrations, wins",
      "Matcherino helmet icon exits back to the main Events page",
    ],
  },
  {
    path: "/p/mortalkombat/t/:id",
    label: "MK1 Tournament Detail",
    description: "A specific Mortal Kombat 1 tournament within the MK1 white-label program",
    keywords: ["mk tournament", "mk1 tournament"],
    navigable: false, // dynamic route — Marco can't navigate here directly
    contents: [
      "Tournament detail page inside the MK1 white-label program",
      "Same structure as main Tournament Detail: overview, rules, contributions, teams, bracket, stream",
      "MK1-branded header with breadcrumb back to MK1 Program page",
      "Left sidebar: tournament card, navigation tabs",
      "Right sidebar: other MK1 tournaments, top contributors",
      "Admin Mode available for organizers",
    ],
  },
];

// ---------------------------------------------------------------------------
// Derived helpers — used by consumers instead of hardcoding routes
// ---------------------------------------------------------------------------

/** All navigable pages (for the navigate tool and offline routing). */
export const NAVIGABLE_PAGES = GLOSSARY.filter((e) => e.navigable);

/** Path list string for the navigate tool description. */
export function getNavigateToolPaths(): string {
  return NAVIGABLE_PAGES.map((e) => `${e.path} (${e.label})`).join(", ");
}

/** Path-to-label map for buildContextBlock "YOU ARE ON: ..." line. */
export function getPageLabel(pathname: string): string {
  // Try exact match first
  const exact = GLOSSARY.find((e) => e.path === pathname);
  if (exact) return exact.label;
  // Try prefix match for dynamic routes (e.g. /p/mortalkombat/t/3)
  const prefix = GLOSSARY
    .filter((e) => e.path.includes(":"))
    .find((e) => {
      const base = e.path.split(":")[0];
      return pathname.startsWith(base);
    });
  if (prefix) return prefix.label;
  // Try startsWith for nested paths
  const nested = GLOSSARY.find((e) => e.path !== "/" && pathname.startsWith(e.path));
  if (nested) return nested.label;
  return pathname;
}

/** Offline route lookup by keyword. Returns the matching entry or null. */
export function matchOfflineRoute(target: string): GlossaryEntry | null {
  const lower = target.toLowerCase();
  for (const entry of NAVIGABLE_PAGES) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) return entry;
    }
  }
  return null;
}

/**
 * Build the glossary block for the system prompt.
 * This is what tells Marco "to do X, go to page Y."
 */
export function buildGlossaryPrompt(): string {
  const lines = ["## Site Glossary — Where Things Live", ""];
  lines.push("Use this to decide which page to navigate to when a user asks about something.");
  lines.push("If the user asks about an action or info listed under a page, navigate there first.\n");

  for (const entry of GLOSSARY) {
    lines.push(`### ${entry.path} — ${entry.label}`);
    if (!entry.navigable) lines.push("(Dynamic route — not directly navigable via the navigate tool)");
    lines.push(entry.description);
    for (const item of entry.contents) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
