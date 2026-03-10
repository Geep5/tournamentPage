# Marco -- Matcherino AI Assistant

Marco is an embedded AI assistant that helps users operate the Matcherino tournament platform. It can navigate pages, click buttons, fill forms, answer questions, and execute multi-step admin workflows -- all through natural language.

This document is the production integration guide. It covers everything the Matcherino engineering team needs to embed Marco on the real platform.

---

## Architecture Overview

```
User types message
       |
       v
+------------------+     +------------------+     +------------------+
| Chat UI          | --> | Agent Loop       | --> | Claude API       |
| (React component)|     | (call -> execute |     | (tool-calling    |
|                  | <-- |  -> feed results | <-- |  with context)   |
+------------------+     |  -> repeat)      |     +------------------+
                          +------------------+
                                 |
                          +------+------+
                          |             |
                    DOM Tools      API Tools
                   (Layer 1)      (Layer 2)
                   demo only      production
```

### Three Layers

| Layer | What | When |
|-------|------|------|
| **1. DOM Tools** | `click_element`, `fill_input`, `select_option`, `check_checkbox`, `navigate`, `go_back` | Current demo. Marco interacts with the page DOM directly. |
| **2. API Tools** | `update_tournament`, `report_match`, `seed_bracket`, `payout`, etc. | Production. Marco calls Matcherino API endpoints directly. Stable, fast, no DOM dependency. |
| **3. Workflows** | Multi-step choreography composed from Layer 2 primitives | Future. "Run my tournament" becomes a planned sequence of API calls with user confirmation at destructive steps. |

**The tool-calling pattern is the same across all layers.** Claude returns `tool_use` blocks, the executor runs them, results are fed back. You swap DOM executors for API executors -- nothing else changes.

### Agentic Loop

Marco does not stop after one tool call. It runs a loop:

1. Call Claude with user message + page context + interactive elements
2. Claude returns tool calls (e.g., "click Enter Admin Mode")
3. Marco executes the tools on the page
4. If Claude's `stop_reason` is `tool_use`, Marco waits for the DOM to settle, re-scans the page, and calls Claude again with tool results + fresh page state
5. Repeat until Claude says `end_turn` or the safety cap (6 iterations) is reached

This is what allows "change the tournament name to test123" to work end-to-end: enter admin mode -> navigate to General tab -> fill the name input -> click Save -- all from one user message.

---

## Site Glossary

Marco needs to know **where things live** across the Matcherino platform so it can navigate to the right page when a user asks about something. This is the glossary system.

### Three Layers of Context

| Layer | What | Where it lives |
|-------|------|-----------------|
| **1. Glossary** | Static navigation map: which pages exist, what info/actions live on each | `client/src/lib/marco-glossary.ts` -- injected into the system prompt every LLM call |
| **2. General user context** | Session/account data: name, email, balance, linked accounts, tax status | `data-agent-context` block on every page (top section, identical across pages) |
| **3. Page-specific context** | What's on *this* page right now: tabs, sections, actions, current state | `data-agent-context` block on every page (bottom section, unique per page) |

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│ SYSTEM PROMPT (static, every call)                      │
│                                                         │
│  Personality + Rules + Matcherino Knowledge              │
│  + Site Glossary (from marco-glossary.ts)                │
│    "To change payout settings → /profile"                │
│    "To create a tournament → /create"                    │
│    "To manage bracket → tournament detail, Admin Mode"   │
└─────────────────────────────────────────────────────────┘
                           +
┌─────────────────────────────────────────────────────────┐
│ USER MESSAGE (dynamic, each call)                       │
│                                                         │
│  Current page path + "YOU ARE ON: ..."                   │
│  + General user context (from data-agent-context)        │
│  + Page-specific context (from data-agent-context)       │
│  + Interactive elements list (from DOM scan)             │
│  + The user's message                                    │
└─────────────────────────────────────────────────────────┘
```

The glossary is what lets Marco answer "how do I cash out?" with "navigate to `/profile` -- that's where Payment Settings and the Cash Out button are" -- even when the user is on a completely different page.

### The Glossary Module

**Key file:** `client/src/lib/marco-glossary.ts`

Each glossary entry has:

| Field | Purpose |
|-------|---------|
| `path` | URL path (e.g. `/profile`, `/p/starcraft`) |
| `label` | Human name (e.g. "User Profile") |
| `description` | One-liner for tool hints |
| `keywords` | Lowercase terms for offline intent matching |
| `contents` | What info/actions live on this page (injected into system prompt) |
| `navigable` | Whether Marco can navigate here directly (false for dynamic routes like `/p/mortalkombat/t/:id`) |

The module exports helpers consumed by the rest of the codebase:

| Export | Consumer | Purpose |
|--------|----------|---------|
| `buildGlossaryPrompt()` | `marco-agent.ts` SYSTEM_PROMPT | Generates the full glossary block for Claude |
| `getNavigateToolPaths()` | `marco-agent.ts` navigate tool | Lists available paths in the tool description |
| `getPageLabel(pathname)` | `marco-agent.ts` buildContextBlock | Resolves path to human label for "YOU ARE ON" |
| `matchOfflineRoute(target)` | `marco-chat-bubble.tsx` mockResponse | Keyword-based route matching for offline mode |

### Adding a New Page to the Glossary

When a new page is added to Matcherino:

1. Add an entry to the `GLOSSARY` array in `marco-glossary.ts`
2. Fill in `contents` with everything a user might ask about that lives on that page
3. Add `data-agent-context` to the page component (see Page Context section below)
4. That's it -- the system prompt, navigate tool, path labels, and offline routing all update automatically

---

## What Marco Needs to Run

### 1. The Chat UI Component

A floating chat bubble (React component) that:
- Renders outside the router so it never unmounts during SPA navigation
- Persists open/close state in `sessionStorage` (`marco-chat-open`)
- Persists conversation in `sessionStorage` (`marco-messages`, `marco-next-id`, `marco-greeted`)
- Ignores programmatic clicks in its outside-click handler (`e.isTrusted` check)
- Renders Marco's responses as Markdown (using `react-markdown`)

**Key file:** `client/src/components/marco-chat-bubble.tsx`

### 2. The Agent Module

Handles DOM scanning, LLM calls, tool definitions, and action execution.

**Key file:** `client/src/lib/marco-agent.ts`

### 3. The API Proxy

Marco's frontend calls `/api/marco` which proxies to the Anthropic Messages API. This keeps the API key server-side.

**Demo (Vercel):** `api/marco.ts` -- a serverless function that forwards requests.

**Production:** Replace with your own backend endpoint. The proxy must:
- Accept POST with the full Claude Messages API body
- Forward to `https://api.anthropic.com/v1/messages` with headers:
  - `x-api-key: <ANTHROPIC_API_KEY>`
  - `anthropic-version: 2023-06-01`
  - `Content-Type: application/json`
- Return the response as-is

### 4. The `ANTHROPIC_API_KEY` Environment Variable

Set server-side. Never expose to the client.

---

## Page Context: `data-agent-context`

Every page must include a hidden div with structured text that tells Marco what it's looking at. This is the most important integration point.

```html
<div data-agent-context hidden>
{`--- USER CONTEXT (injected by Matcherino at render time) ---
USER: Grant Matcherino (#1004) [from session]
EMAIL: grant@matcherino.com [from session]
ACCOUNT TYPE: Organizer (Tier 2) [from session]
TAX INTERVIEW: Completed [from API]
BALANCE: $28.33 [from API]
LINKED ACCOUNTS: Twitch (connected), Discord (not connected) [from API]

PAGE: Tournament Detail
TOURNAMENT: Road to Brawl Cup SESA
GAME: Brawl Stars
...`}
</div>
```

### How the Context is Read

The agent reads this on every LLM call:

```typescript
function readPageContext(): string | null {
  const el = document.querySelector('[data-agent-context]');
  return el?.textContent?.trim() || null;
}
```

It is called **fresh before every Claude call** (not cached), because the page changes after navigation and admin mode toggling.

### What to Include

#### Shared User Context (every page)

Injected from the auth session and user API at render time. Every page gets the same block:

| Field | Source | Example |
|-------|--------|---------|
| USER | Session | `Grant Matcherino (#1004)` |
| EMAIL | Session | `grant@matcherino.com` |
| ACCOUNT TYPE | Session | `Organizer (Tier 2)` |
| TAX INTERVIEW | API | `Completed` or `Not Started` |
| BALANCE | API | `$28.33` |
| LINKED ACCOUNTS | API | `Twitch (connected), Discord (not connected)` |

#### Page-Specific Context

Each page adds its own metadata. Here's what each page type needs:

**Tournament Detail Page**
```
PAGE: Tournament Detail
TOURNAMENT: Road to Brawl Cup SESA
GAME: Brawl Stars
ORGANIZER: Quantum Studios
STATUS: Active -- Registration Open
FORMAT: Single Elimination (Best of 3)
PARTICIPANTS: 207 teams registered
PRIZE POOL: $4,250
USER ROLE ON THIS TOURNAMENT: Admin (Organizer) [from page data]
REGISTRATION STATUS: Not Registered [from page data]
CAN EDIT: Yes [from page data]
CAN MANAGE BRACKET: Yes [from page data]
CAN PAYOUT: Yes (tax interview completed) [from page data + API]

TABS: Overview, Bracket, Teams, Contributions, Streams
ACTIONS AVAILABLE: Register, Share, Follow Organizer, Admin Mode (if organizer)
```

**Events Browser**
```
PAGE: Events Browser
REGISTERED EVENTS: 4 active [from API]
FAVORITED GAMES: Brawl Stars, Starcraft II [from API]

SECTIONS: Featured carousel, Browse by Game, Recommended, Live Feed
```

**User Profile**
```
PAGE: User Profile
VIEWING OWN PROFILE: Yes [from session]
ORGANIZER PROGRAM: Tier 2 [from API]
PENDING PAYOUTS: None [from API]

SECTIONS: Account Info, Linked Accounts, Payment, Tax, Tournament History
```

**Create Tournament**
```
PAGE: Tournament Creation
CAN CREATE TOURNAMENTS: Yes (Organizer Tier 2) [from session]
MAX PARTICIPANTS ALLOWED: 512 (Tier 2 limit) [from API]
DRAFTS: 2 unsaved drafts [from API]

REQUIRED FIELDS: Tournament Name, Game, Start Date, Format
OPTIONAL FIELDS: Entry Fee, Max Participants, Description, Rules, Banner
```

**Partnership Program**
```
PAGE: Partnership Program
PARTNERSHIP STATUS: Not Applied [from API]
ELIGIBLE TO APPLY: Yes [from API]
CURRENT ORGANIZER TIER: Tier 2 [from session]
```

**White-Label Program Page (StarCraft II, Mortal Kombat 1, etc.)**
```
PAGE: StarCraft II White-Label Program
PATH: /p/starcraft
TAB: Events

This is the StarCraft II community hub -- a white-label program page.
The header is program-branded. Users are "inside" the StarCraft program.
Clicking the Matcherino helmet exits back to the main Events page.

Current tab: Events
- Events: Shows all StarCraft II tournaments (live, upcoming, past)
- Partnership: Apply to become a StarCraft II tournament organizer partner
- FAQ: Common questions about tournaments, prizes, and the platform
Right sidebar: Activity feed (recent contributions, registrations, wins)
```

**White-Label Tournament Detail (e.g. MK1 Tournament)**
```
PAGE: MK1 Tournament Detail
PATH: /p/mortalkombat/t/1
TOURNAMENT: MK1 Pro Kompetition -- NA Finals
GAME: Mortal Kombat 1
ORGANIZER: WBG
STATUS: Live
FORMAT: Double Elimination
PARTICIPANTS: 128 / 256
PRIZE POOL: $10,000
REGION: North America

TABS AVAILABLE:
- Overview, Rules, Contributions, Participants, Bracket, Stream

ACTIONS ON THIS PAGE:
- Join Tournament button: Register for this tournament
- Contribute to Prize Pool: Buy contributor pins
- Admin Mode toggle (for organizers)
```

### Rules for Page Context

1. **Be explicit about what the user can do.** If they're an admin, say so. If they can't payout because their tax interview isn't done, say that.
2. **Include current state.** Tournament status, registration status, bracket state.
3. **List available actions.** What buttons exist, what tabs are available.
4. **Use `[from session]` / `[from API]` / `[from page data]` annotations** during development to track data sources. Remove in production if desired.
5. **Keep it flat text.** No JSON, no HTML. Claude processes plain text fastest.

---

## Interactive Elements: `aria-label`

Marco's DOM scanner finds clickable elements (buttons, links, tabs, inputs, selects) and builds a numbered list for Claude. **If an element has no visible text and no `aria-label`, Marco cannot see it.**

### The Problem

Icon-only buttons are invisible to Marco:

```html
<!-- Marco CANNOT see this -->
<button><Heart className="h-5 w-5" /></button>

<!-- Marco CAN see this -->
<button aria-label="My tournaments"><Heart className="h-5 w-5" /></button>
```

### The Rule

**Every interactive element must have either visible text OR an `aria-label`.** This is also a WCAG accessibility requirement.

### What the Scanner Captures

For regular elements:
```
[0] button: "Register Now"
[1] link: "Overview" (href=/)
[2] tab: "Bracket"
```

For form elements (inputs, selects, textareas):
```
[3] input (label="Tournament Name", value="Road to Brawl Cup", placeholder="")
[4] select (label="Format", value="Single Elimination", placeholder="")
[5] input (label="", value="", placeholder="Search...")
```

### How Labels Are Resolved (priority order)

1. `data-agent-label` attribute on the element
2. Associated `<label>` element (by `for` attribute or parent)
3. Closest `.space-y-2` parent's first `<label>` child text
4. `placeholder` attribute
5. `aria-label` attribute

### `data-agent-label` for Form Fields

When standard HTML label association isn't clean (common in styled component libraries), use `data-agent-label`:

```html
<div class="space-y-2">
  <label>Tournament Name</label>
  <input type="text" data-agent-label="Tournament Name" value="Road to Brawl Cup" />
</div>
```

This gives Marco a reliable handle regardless of how the label is associated in the DOM.

---

## Tools Reference

### Current Tools (Layer 1 -- DOM)

| Tool | Purpose | Parameters |
|------|---------|------------|
| `click_element` | Click a button, link, tab, or card | `element_index`, `narration` |
| `fill_input` | Type into a text input, textarea, or contentEditable | `element_index`, `value`, `narration` |
| `select_option` | Pick an option from a `<select>` dropdown | `element_index`, `value`, `narration` |
| `check_checkbox` | Check or uncheck a checkbox | `element_index`, `checked`, `narration` |
| `navigate` | Go to a different page path | `path`, `narration` |
| `go_back` | Browser history back | `narration` |

### Production Tools (Layer 2 -- API)

These replace DOM tools when the Matcherino API is available. Same tool-calling pattern, different executor:

| Tool | Purpose | Parameters |
|------|---------|------------|
| `update_tournament` | Change tournament settings | `tournament_id`, `fields` |
| `report_match` | Record a match result | `match_id`, `winner`, `score` |
| `seed_bracket` | Set bracket seedings | `tournament_id`, `seeds` |
| `start_tournament` | Begin the event | `tournament_id` |
| `advance_round` | Move bracket to next round | `tournament_id`, `round` |
| `send_notification` | Message participants | `tournament_id`, `message`, `audience` |
| `open_registration` | Open signups | `tournament_id` |
| `close_registration` | Close signups | `tournament_id` |
| `payout` | Distribute prizes | `tournament_id`, `distribution` |

To add an API tool:
1. Add the tool schema to the `TOOLS` array in `marco-agent.ts`
2. Add the response parser in the `callMarco()` switch statement
3. Add the executor in `executeAction()`

---

## System Prompt

The system prompt defines Marco's personality, rules, and domain knowledge. Key sections:

- **Personality:** Friendly, direct, efficient. Narrates actions.
- **Critical Rules:** Check current path before navigating, use fill_input for forms (not click), confirm destructive actions.
- **Admin Operations:** Enter admin mode -> navigate to correct tab -> fill input -> click Save. Do NOT stop after entering admin mode.
- **Matcherino Knowledge:** Tournament structure, bracket formats, payout rules, common support issues.
- **Site Glossary:** Auto-generated from `marco-glossary.ts` -- maps every page to what info/actions live there. This is how Marco knows which page to navigate to.

The full prompt is in `marco-agent.ts` as `SYSTEM_PROMPT`. The glossary section is dynamically built from `marco-glossary.ts`. Update the glossary module when:
- New pages are added to the platform
- Page content/structure changes (new tabs, new actions)
- New admin workflows are available
- Common support patterns change
- New tools are added (document their purpose in the prompt)

---

## Chat UI Features

- **Markdown rendering:** Marco's responses render bold, lists, links, code blocks, and headings
- **Action narration:** Tool executions show as cyan status pills above the message
- **Typing indicator:** Animated spinner while Claude is thinking
- **Session persistence:** Conversation survives page refreshes via `sessionStorage`
- **Open state persistence:** Chat stays open across navigation if user was in a conversation
- **Outside-click close:** Only real user clicks (not Marco's programmatic clicks) close the chat
- **Escape to close:** Pressing Escape closes the chat panel

---

## Production Checklist

### Backend
- [ ] Create `/api/marco` endpoint that proxies to Anthropic Messages API
- [ ] Set `ANTHROPIC_API_KEY` as a server-side environment variable
- [ ] Add rate limiting to prevent abuse (per-user, per-minute)
- [ ] Add request logging for debugging Marco interactions
- [ ] Consider streaming responses for better UX (SSE)

### Frontend -- Every Page
- [ ] Add `<div data-agent-context hidden>` with user context + page metadata
- [ ] Add `aria-label` to every icon-only button, link, and tab
- [ ] Add `data-agent-label` to form inputs that lack standard `<label>` association
- [ ] Place `<MarcoChatBubble />` outside the router in `App.tsx` (renders on all pages)
- [ ] Mark Marco's own UI with `data-marco-ui` attribute (scanner skips these elements)

### Per-Page Context Checklist

For every new page added to Matcherino:

1. **What page is this?** `PAGE: Tournament Detail`
2. **What's the user's role here?** Admin, participant, viewer
3. **What can they do?** Available actions, buttons, tabs
4. **What's the current state?** Status, registration, bracket phase
5. **What are common gotchas?** Fields that are easy to miss, confusing workflows

### Testing Marco on a New Page

1. Open the page and open Marco
2. Ask "what page am I on?" -- Marco should know from context
3. Ask "what can I do here?" -- Marco should list available actions
4. Try clicking something: "click the Register button"
5. Try filling a form: "change the tournament name to Test"
6. Try a multi-step workflow: "enter admin mode and change the start date"
7. Verify no icon-only buttons are invisible: check Marco's element list in the console

---

## File Reference

| File | Purpose |
|------|---------|
| `client/src/lib/marco-glossary.ts` | Site glossary: single source of truth for all page routes, labels, and content maps |
| `client/src/lib/marco-agent.ts` | Agent core: scanner, tools, LLM calls, action executor |
| `client/src/components/marco-chat-bubble.tsx` | Chat UI: messages, input, agentic loop, session persistence |
| `api/marco.ts` | Vercel serverless proxy (demo only -- replace in production) |
| `MARCO.md` | This document |

---

## Model

Marco uses `claude-sonnet-4-20250514` via the Anthropic Messages API with tool calling. The model is specified in `marco-agent.ts` in the `callMarco()` function. To change models, update the `model` field in the request body.

---

## sessionStorage Keys

| Key | Purpose |
|-----|---------|
| `marco-messages` | Conversation message history (JSON) |
| `marco-next-id` | Next message ID counter |
| `marco-greeted` | Whether Marco has shown its greeting this session |
| `marco-chat-open` | Whether the chat panel is currently open (`"true"` / `"false"`) |
