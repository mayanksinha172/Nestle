# MedFactory — CLAUDE.md

## Project Overview

**MedFactory** is a medical affairs content pipeline demo app — a single-page React app that simulates an AI-powered workflow for generating, reviewing, and approving scientific content (webinar decks, blogs, protocols, etc.) for pharmaceutical teams.

**Live repo**: `https://github.com/mayanksinha172/Nestle.git`  
**Auto-deploys** to Vercel on every push to `main` via `vercel.json`.  
**Working directory has a trailing space**: `/Users/mayanksinha/Revelia/nestle /` — always quote paths.

---

## Tech Stack

- **React 18** — single class component (`MedFactory`) with module-level functional components
- **Vite 5** — build tool; `npm run dev` for dev server, `npm run build` for production
- **No TypeScript, no CSS modules, no external UI library** — all styles are inline React style objects
- **Font**: Plus Jakarta Sans (Google Fonts, loaded in `index.css`)
- **3 source files**: `src/MedFactory.jsx` (~5400 lines), `src/index.css`, `src/main.jsx`

---

## Architecture

### File Structure
```
src/
  MedFactory.jsx   — entire app (static data + helpers + components + class)
  index.css        — CSS variables, keyframe animations, base resets
  main.jsx         — mounts <MedFactory theme="dark" reviewerName="Munal" />
```

### Component Architecture
Everything lives in `MedFactory.jsx` in this order:

1. **Style helpers** (`S()`, `merge()`, `Box`) — top of file
2. **Static content** (`SRC`, `DECKS`, `BLOCKS`, `TOPIC_OPTIONS`, `LOG_SCRIPT`, etc.)
3. **Research data** (`RESEARCH_PAPERS`, `EXTRA_PAPERS`, `RESEARCH_DBS`, `CONTENT_TRACKS`, `ALL_ARTIFACTS`, `ARTIFACT_TARGETS`)
4. **Module-level components** (defined BEFORE the class — critical for React identity stability):
   - `SciPaperReader` — Google Docs-style paragraph commenting for scientific review
   - `ResizableSplit` — draggable divider between two panels
5. **Agent message constants** (`ORGANIZE_AGENT_MSGS`, `REVIEW_AGENT_MSGS`, `PAPER_FIGURES`, `LIGHT_TOKENS`)
6. **Evidence helpers** (`gradeLetterFromPaper()`, `evidenceSortFn()`) — module-level, before the class
7. **`class MedFactory extends React.Component`** — the entire app

### Why Module-Level Components
`SciPaperReader` and `ResizableSplit` MUST be defined at module level (not inside `render()` or IIFEs). If defined inside render, React creates a new function reference on every state change → full unmount/remount → animation replays, input focus lost, drag state reset.

### The `S()` Helper
Parses a CSS declaration string into a React style object. Handles custom properties (`--x`) verbatim, camel-cases everything else.
```js
S('display:flex;gap:10px;color:var(--ink)') 
// → { display: 'flex', gap: '10px', color: 'var(--ink)' }
```

### The `Box` Component
Div (or any tag) with CSS string + hover CSS string:
```jsx
<Box css="padding:10px;cursor:pointer" hover="background:var(--s2)" onClick={fn}>
  Label
</Box>
```

### `renderVals()` Method
Single method on the class that computes ALL derived view state from `this.state` and returns a `v` object. Every screen reads from `v`. Never call `this.state` directly in render — always use `v.*`.

### Screen Rendering Pattern
Each screen is rendered as a conditional IIFE inside `<main>`:
```jsx
{v.isOrganize && (() => {
  // local vars, derived state
  return <div>...</div>;
})()}
```

---

## CSS Design System

### CSS Variables (Light Theme — `index.css` + `LIGHT_TOKENS`)
```css
--bg:    #f7f9fd   /* page background */
--s1:    #ffffff   /* surface 1 (cards) */
--s2:    #eef2fb   /* surface 2 (inputs, lighter cards) */
--ink:   #0f1f4a   /* primary text */
--dim:   #2a4588   /* secondary text */
--faint: #5d78b0   /* muted text, labels */
--rule:  rgba(15,31,74,0.08)   /* light borders */
--rule2: rgba(15,31,74,0.16)   /* slightly stronger borders */
--acc:   #2c52cc   /* accent blue */
--acc2:  #4468e0   /* accent blue lighter (also in index.css) */
--ok:    #166534   /* green / success */
--warn:  #92400e   /* amber / warning */
--mono:  ui-monospace, SFMono-Regular, Menlo, monospace
```

`LIGHT_TOKENS` (line 662) is the JS mirror of these values — used by `applyTheme()` to set/remove CSS custom properties on the root element.

### Dark Sidebar / Agent Panels
The sidebar and dark navy panels override CSS variables inline:
```jsx
style={{
  background: '#0d1f4e',
  '--ink': '#e8eef8',
  '--dim': '#8aaad4',
  '--faint': '#4d6fa0',
  '--rule': 'rgba(232,238,248,0.1)',
  '--rule2': 'rgba(232,238,248,0.18)',
  '--s1': 'rgba(255,255,255,0.06)',
  '--s2': 'rgba(255,255,255,0.1)',
  '--bg': '#0d1f4e',
  '--acc': '#60a5fa',
  '--ok': '#4ade80',
  '--warn': '#fbbf24',
}}
```

### Design Rules
- **Border-radius**: cards 14px, pill tags 100px, buttons 12px, small chips 4–6px — consistent rounded style throughout
- **No external icon library** — inline SVGs only
- **Keyframe animations** defined in `index.css`: `spin`, `puls`, `rise`, `fill`, `slideInRight`, `fadeSlideIn`, `dotBounce`, `fadeUp`, `cardIn`, `batchIn`, `batchBanner`, `shimmer`
- **Font sizes**: body 12.5–14px, headings 22–38px, labels 9–10.5px uppercase tracked
- **Primary button**: `background:linear-gradient(135deg,#2c52cc,#4468e0)` with glow shadow
- **Cards**: white `#fff` bg, `1px solid var(--rule)` border, `box-shadow: 0 1px 4px rgba(15,31,74,0.06),0 4px 16px rgba(15,31,74,0.05)`, borderRadius 14px
- **Hardcoded dark hex colors** (`#0d1f4e`, `#1e3460`, `#4a6896`) are the old CSS variable values — still fine in components always on the light theme (like `SciPaperReader`)

---

## Screens & Routing

Navigation is controlled by `this.state.screen`. The `go(s)` method switches screens and resets local screen state as needed.

### Creator Role (`mayank@medfactory.com` / `Creator@2026`)
| Screen key | Description |
|---|---|
| `landing` | Login page |
| `dash` | Dashboard — modern hero header, floating stat cards, workspace card grid |
| `intake` | Brief definition (topic, audience, hero product) |
| `pipe` | Research screen — live agent feed + paper cards + evidence panels |
| `organize` | Organize Research — excerpt grouping by track/artifact with agent panel |
| `review` | MA Review — agent analysis + artifact readiness |
| `render` | Presentation rendering progress screen |
| `deliver` | Delivery screen — download, audit, approval chain |

### MA Reviewer Role (`priya@medfactory.com` / `MedReview@2026`)
Lands on `dash` with MA Inbox view. Can open `ma-review` screen.

### Scientific Reviewer Role (`arjun@medfactory.com` / `SciReview@2026`)
Lands on `sci-dash`. Can open `sci-review` screen with `SciPaperReader`.

**IMPORTANT**: Credentials are `static CREDENTIALS` on the class — never change them.

---

## Dashboard (`dash` screen)

The dashboard has three visual sections:

### Hero Header
Gradient background (`linear-gradient(135deg,#eef2fb 0%,#f7f9fd 60%,#f0f4ff 100%)`), decorative radial-gradient blobs, date displayed as an accent pill badge, 38px/800 greeting, CTA "Create a New Workspace" button with `+` SVG icon and box-shadow glow.

### Stat Cards
Three floating cards in a 3-column grid with:
- 3px colored top accent bar (dark/blue/green per metric)
- White card background, 14px border-radius, subtle box-shadow
- 40px/800 number in the metric color
- Colored delta badge (background tint + accent text)

### Workspace Cards
2-column grid of `Box` components (`cardIn` animation, staggered delay):
- `overflow:hidden` + 3px top accent `<div>` (no border-top)
- Stage progress bar (4px, 80px wide, colored fill)
- Circular arrow button `→` at bottom-right
- Hover lift: `translateY(-2px)` + stronger shadow + colored border

---

## ResizableSplit Component

Used on all screens with side-by-side panels. The divider is draggable.

```jsx
<ResizableSplit
  left={leftJSX}
  right={rightJSX}
  defaultLeftPct={46}   // initial left panel width %
  minPct={24}           // minimum left panel width %
  maxPct={75}           // maximum left panel width %
/>
```

Parent must have defined height (e.g. `flex:1;min-height:0` or `height:100%`).  
The component itself uses `height: '100%'; display: 'flex'` internally.

### Where it's used (current layout)
- **Screen 3 (pipe/research)**: `defaultLeftPct={70}` — agent feed left (70%) | paper list+detail right; inner split when paper selected
- **Screen 4 (organize)**: `<ResizableSplit right={organizeAgentPanel} defaultLeftPct={64}>` — **content left (64%), agent panel RIGHT**; inner split when paper selected
- **Screen 5 (ma-review)**: `<ResizableSplit left={rightPanel} right={leftPanel} defaultLeftPct={54}>` — **artifacts/evidence left (54%), agent panel RIGHT**

---

## Agent Panels

All agent panels follow the same pattern: status banner → thread header → messages → thinking dots → input area.

### Light-Theme Agent Panel (screens 3, 4, 5)
Uses CSS variables: `var(--s1)` background, `var(--acc)` accent, `var(--ink)` text, `var(--rule)` borders. Status banner: green on complete (`var(--ok)`), blue while running (`var(--acc)`).

### Dark Sidebar
Uses the dark token overrides listed above. Never mix themes.

### Thinking Dots Animation
```jsx
{[0,1,2].map((d) => (
  <div key={d} style={{
    width: 7, height: 7, borderRadius: '50%',
    background: 'var(--acc)',
    animation: 'dotBounce 1.3s ease-in-out infinite',
    animationDelay: `${d * 0.18}s`
  }} />
))}
```

### `setTimeout` Chain Pattern
Agent messages appear sequentially:
```js
const delays = [0, 2200, 4800, 7800, ...];
delays.forEach((delay, i) => {
  setTimeout(() => this.setState({ agentThinking: true }), delay);
  setTimeout(() => this.setState((_s) => ({
    agentMsgN: i + 1,
    agentThinking: i < delays.length - 1,
  })), delay + 1400);
});
```
Note: use `_s` (not `s`) in `setState` callbacks when the prev state arg is unused.

---

## Research Screen (Screen 3 — `pipe`)

### Tabs
- **Activity Log** — timestamped agent feed
- **Evidence Review** — paper cards with filter/sort bar, accept/reject buttons, quick accept presets
- **Sources** — Evidence Retrieved panel with expandable paper cards
- **Brand Intelligence** — signals and content recommendations

### Evidence Review — Filter & Sort Bar
Three-row control block above the paper grid:

**Row 1 — Track chips + Grid/List toggle**  
Track chips map from `CONTENT_TRACKS` + "All papers". Active chip: accent border + tint. Grid/List icon buttons toggle `v.evidenceView`.

**Row 2 — Grade · Artifact · Funding · Sort**  
- Grade pills (A/B/C) — multi-select via `gradeFilter[]`
- Artifact pills with live counts — single-select via `artifactFilter`
- Funding dropdown — All / Independent / Industry via `fundingFilter`
- Sort dropdown (opens absolute positioned list, z-10) — composite/relevance/year/title/citations/grade/funding/statRigor via `sortBy`
- Direction toggle `↓ High to low` / `↑ Low to high` via `sortDir`
- "Clear filters" link calls `clearEvidenceFilters()`

**Row 3 — Quick accept presets**  
Static label + four preset buttons: Grade A & B, Independent funding, Relevance ≥ 80, Strong journal credibility. Each calls `v.quickAccept(preset)` to bulk-set `acceptedPapers`.

### Filtered + Sorted Paper List
```js
const filteredPapers = RESEARCH_PAPERS
  .map((p, i) => ({ ...p, _idx: i }))
  .filter(/* trackFilter, gradeFilter, artifactFilter, fundingFilter */)
  .sort(evidenceSortFn(v.sortBy, v.sortDir));
```

### List View Mode
When `v.evidenceView === 'list'`: single-column compact rows — type pill, year, truncated title, relevance bar, score, Accept button.

### Paper Card State
Accepted papers tracked in `this.state.acceptedPapers` as `{ [idx]: true }`.  
Deleted papers tracked in `this.state.deletedPapers` as `{ [idx]: true }`.  
`flag: null` on all paper objects — all mock warning flags have been removed.

### Sources Tab
Shows compact DB stats bar + "Evidence Retrieved · 12" list. Each card expandable on click showing: study type pill, design/GRADE/sample/citations metadata grid + excerpt blockquote.

---

## Organize Screen (Screen 4)

### Layout
```
ResizableSplit (defaultLeftPct=64, minPct=40, maxPct=76):
  left (content):
    <column>
      header (title, stat pills, tabs, artifact filter)
      {sel
        ? <div flex:1><ResizableSplit left={trackList} right={detailPanel} defaultLeftPct=62 /></div>
        : <div flex:1>{trackList}</div>
      }
      sticky footer (readiness pills + CTA)
    </column>
  right: organizeAgentPanel
```
Note: agent panel is on the **right** side.

### Paper Detail Panel
Only renders when `v.organizeSelectedPaper` is set. Clicking ✕ sets it to null. Contains: type pill + relevance bar, title + journal, figures, evidence quality table, excerpt, artifact tags.

### Agent Auto-Run
When navigating to organize screen (`go('organize')`), `runOrganizeAgent()` fires after 600ms. It runs through `ORGANIZE_AGENT_MSGS` with staggered delays, toggling `organizeAgentThinking` between each message.

---

## Scientific Review Screen

### SciPaperReader Component (module-level)
Google Docs-style paragraph commenting:
- `hoveredPara` state (`React.useState(null)`) tracks which paragraph is hovered
- On hover: `+` circle button appears in left margin (40px left of text)
- On click (paragraph or `+` button): comment draft opens inline below paragraph
- `sciCommentDraft` is `{ key: 'paperIdx-sectionId-paraIdx', text: '' }` or `null`

Comments stored in `this.state.sciInlineComments` as `{ [paraKey]: [{ id, author, time, text, resolved }] }`.

### Paper text uses Georgia serif, 15.5px/1.9 line-height for readability

---

## State Management

All state in `this.state` (class component). Key fields:

```js
{
  screen: 'dash',              // current screen (starts at dash, not landing)
  loginEmail, loginPassword, loginError, loginPwShow,
  role: null,                  // 'creator' | 'ma' | 'sci'
  topic, heroProduct, audience,
  
  // research
  researchTab: 'log',          // 'log'|'evidence'|'sources'|'brand'
  acceptedPapers: {},          // { [idx]: true }
  deletedPapers: {},           // { [idx]: true }
  researchSrcExpanded: {},     // { [idx]: true } — sources tab expanded cards
  moreResearchActive: false,   // extra papers being loaded
  moreResearchN: 0,
  moreResearchDone: false,
  chatCollapsed: false,        // agent chat panel collapsed
  
  // evidence filter/sort
  trackFilter: 'All',          // track-based filter
  gradeFilter: [],             // [] = all; multi-select ['A','B',...]
  artifactFilter: 'All',       // 'All' | artifact name
  fundingFilter: 'All',        // 'All' | 'Independent' | 'Industry'
  sortBy: 'composite',         // composite|relevance|year|title|citations|grade|funding|statRigor
  sortDir: 'desc',             // 'asc' | 'desc'
  evidenceView: 'grid',        // 'grid' | 'list'
  sortDropdownOpen: false,
  
  // organize
  organizeView: 'track',       // 'track'|'artifact'|'figures'
  organizeExpanded: {},
  organizeExpandAll: false,
  organizeSelectedPaper: null,
  organizeAgentMsgN: 0,
  organizeAgentThinking: false,
  organizeAgentInput: '',
  
  // MA review
  reviewN: 0,
  medReviewTab: 'artifacts',
  medReviewPaper: null,
  sciSubmitted: false,
  
  // approval pipeline
  pptStatus: 'draft',          // draft|sent-to-ma|ma-rejected|ma-approved|sent-to-sci|sci-rejected|sci-approved
  maComments: {},
  sciComments: {},
  sciInlineComments: {},
  sciCommentDraft: null,
  
  // notifications
  notifications: [...],
  notifOpen: false,
}
```

---

## Data Constants

### `RESEARCH_PAPERS` (line 257)
12 paper objects. All have `flag: null` (warning badges removed). Fields: `db`, `type`, `title`, `journal`, `year`, `score`, `artifacts`, `track`, `designTier`, `appraisal`, `grade`, `citations`, `funding`, `statRigor`, `relevance`, `excerpt`, `excerptSrc`.

### `EXTRA_PAPERS` (line 273)
8 additional papers revealed when user clicks "show me more papers" in the evidence feed.

### `CONTENT_TRACKS` (line 286)
7 tracks with `id`, `label`, `color`, `paperTracks[]`. Used for evidence filter chips in the Evidence Review tab.

### `ALL_ARTIFACTS` (line 291)
`['Deck', 'Blog', 'Protocol', 'Blurb', 'Facts']`

### `ART_COLORS` (inline in organize screen)
`{ Deck: '#7eb8f7', Blog: '#fb923c', Protocol: '#4ade80', Blurb: '#f97b7b', Facts: '#a78bfa' }`

### `PAPER_FIGURES` (line ~620)
Keyed by paper `_idx`. Each entry is an array of `{ type, label, caption }`. Types: `'km'` (Kaplan-Meier), `'forest'` (forest plot), `'bar'` (bar chart), `'line'` (line chart).

### `ORGANIZE_AGENT_MSGS` (line ~582)
6 messages with `**bold**` markdown. Messages starting with `⚠` are rendered as "GAP DETECTED" in amber.

### `REVIEW_AGENT_MSGS` (line ~591)
Array of `{ text, artifact, color, sources[] }` for the MA review agent.

### `LIGHT_TOKENS` (line 662)
JS object of CSS variable name → value for the light theme. Applied via `applyTheme()`.

---

## Module-Level Evidence Helpers (line 668)

```js
// Maps paper grade text → letter A/B/C
function gradeLetterFromPaper(p) { ... }

// Returns a sort comparator for a given (sortBy, sortDir) pair
function evidenceSortFn(sortBy, sortDir) { ... }
```

These are defined AFTER `LIGHT_TOKENS` and BEFORE the class. They are used inside the Evidence Review IIFE and in `renderVals()` quickAccept logic.

---

## Git & Deployment

```bash
# Dev
cd "/Users/mayanksinha/Revelia/nestle "   # note trailing space in path
npm run dev

# Build
npm run build

# Push (auto-deploys to Vercel)
git add src/MedFactory.jsx src/index.css
git commit -m "message"
git push origin main
```

Remote: `https://github.com/mayanksinha172/Nestle.git`  
Vercel config: `vercel.json` — build command `npm run build`, output `dist`, SPA rewrites.

---

## Common Patterns & Pitfalls

### Adding a new screen
1. Add screen key to `go()` switch in the method
2. Add `isNewScreen: S_ === 'new-screen'` to `renderVals()`
3. Render as `{v.isNewScreen && (() => { ... })()}` inside `<main>`
4. Add to sidebar nav if creator-visible

### Adding agent messages to a panel
1. Define message array as module-level constant (before the class)
2. Add `msgN`, `thinking`, `input` to `this.state`
3. Add `runMyAgent()` method using the `setTimeout` chain pattern
4. Call `runMyAgent()` from `go()` with a small delay (600ms)
5. Expose values + setters in `renderVals()`

### Preventing JSX errors in IIFE screens
- Close all divs before `})()}` 
- When using `const leftPanel = (<div>` — don't add an extra `</div>` before `); /* end leftPanel */`
- `return (` in IIFEs must be closed with `)` not `);` inside the return

### `renderMD()` helper
Renders `**bold**` markdown inside agent message text. Only available inside the MA review screen IIFE — not global. For organize agent, use a manual `split(/(\*\*[^*]+\*\*)/g)` pattern.

### Theme toggling
The `toggleDir` action calls `applyTheme(bool)` which sets/removes CSS custom properties on the root element via `LIGHT_TOKENS`. Default starts as light; theme direction is stored in `this.state.dir`.

---

## What NOT to change

- `static CREDENTIALS` — the three login accounts are fixed for the demo
- `RESEARCH_PAPERS[*].flag` — all set to `null`, keep them that way (no warning badges)
- Module-level placement of `SciPaperReader` and `ResizableSplit` — must stay outside the class
- CSS variable names in `index.css` — referenced throughout ~5400 lines
- `gradeLetterFromPaper` and `evidenceSortFn` — must stay at module level (before the class), used in both `renderVals()` and the Evidence Review IIFE
