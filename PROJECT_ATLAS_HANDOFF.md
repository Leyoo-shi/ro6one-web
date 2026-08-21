# Project Atlas — Handoff / Project Memory

**Written for the next Claude Code session, not for a casual human reader.**
Read this file completely before touching anything. It is the memory of every previous
Project Atlas conversation.

Last updated: end of the "creative correction pass" (Hero rebuild + colour + people
experience + portrait rework + partial Turkish), 18 August 2026.

Throughout this file:

- **CURRENT** = what the repository actually contains right now (verified by inspection).
- **INTENT** = where the user wants it to go (not built yet).
- **RULE** = a hard constraint. Do not violate it.
- **KNOWN ISSUE** = a real defect or weakness already identified. Not yet fixed.

---

## 1. Read This First

Project Atlas is the ongoing design and implementation of the official website of
**Trabzonspor Ro6one Robotics** (FRC Team #11919, Trabzon, Türkiye), living in this
SvelteKit repository.

Four passes have happened so far:

1. **Architecture pass** — SvelteKit shell, EN/TR i18n, routes, Docker, SEO, tokens.
2. **Content pass** — real team facts, events, organization data, media slot architecture.
3. **Creative direction pass** — a chapter/motion/environment system. **This pass is NOT in
   the repository.** The user did not keep it (see §5 and §84-equivalent note below).
4. **"Project Atlas" content + creative correction passes** — the roster of 49 students and 2
   mentors, the
   portrait pipeline, birthday system, brand assets, then a Hero rebuild, colour system,
   drifting people scene and Team redesign. **This is the current working state, uncommitted.**

The single most important thing to understand: **the previous creative pass's work exists only
as uncommitted local changes.** `git status` is the truth, not GitHub HEAD.

---

## 2. Non-Negotiable Safety

**RULE: NEVER PUSH. NEVER DEPLOY. NEVER TAG.**

```
git push                    ← FORBIDDEN
git push --force            ← FORBIDDEN
git push --force-with-lease ← FORBIDDEN
git push --tags             ← FORBIDDEN
```

GitHub pushes are wired to production deployment for `ro6one.com`. All work stays **local**
for the user to review. The user pushes, not you. This rule only changes if the user
explicitly says so in a future conversation.

**RULE: do not commit unless explicitly asked.** Leave changes in the working tree.

**RULE: never run `npm audit fix --force`.** A previous attempt suggested downgrading
SvelteKit to an ancient incompatible version. A safe manual update was already done
(`@sveltejs/kit` 2.70.1→2.70.2, `nanoid` 3.3.16→3.3.18, `brace-expansion` 5.0.8→5.0.9).
One low-severity cookie advisory remains and is accepted.

**RULE: never destructively edit source photographs** in `images/`. Processing scripts write
derivatives to `static/media/` only.

### ⚠ COMMIT HAZARD — read before ever staging anything

`images/` is **untracked and NOT in `.gitignore`**. It currently holds **3.6 GB** (the
STEAMFest archive: 222 photos, 91 `.mov`, 12 `.mp4`, 2 HEIC). A blind `git add -A` would
stage 3.6 GB into the repository.

Before any commit involving assets, either add `images/` to `.gitignore` or stage paths
explicitly. `static/media/` (4.8 MB of derivatives) is the part that actually needs to ship.
Flag this to the user rather than deciding unilaterally.

---

## 3. Project Identity

| Field | Value |
|---|---|
| Project codename | Project Atlas |
| Repo | `ro6one-web` |
| GitHub | `https://github.com/Leyoo-shi/ro6one-web.git` (user `Leyoo-shi`) |
| Domain | `ro6one.com` |
| Official full name | **Trabzonspor Ro6one Robotics** |
| Short forms | Ro6one Robotics · RO6ONE |
| FRC team | **#11919** |
| Location | Trabzon, Türkiye |
| Home institution | **Trabzon Merkez Fen Lisesi** |
| Founded | **February 2026** |
| Season status | The upcoming official FRC season is the team's **first official competition season** |

### Facts that are true and may be published

- Formed February 2026 out of one student pool at Trabzon Merkez Fen Lisesi.
- Students were new to FRC and progressed quickly with mentor support.
- **Spor STEAM Fest'26** — 28 April 2026 (see §17).
- **Trabzon Off-Season** — July 2026, 21 teams (see §18).
- Trabzonspor–school cooperation protocol, signed ~March 2026 (see §21).
- Team operates a Nextcloud-based internal platform, own domain, own mail (see §22).
- Core phrases: **"STEAM for STEM"**, **"STEM for People"**.
- Hero line in use: **"Build what comes next."**
- Supporting idea: "We design, build and compete — but the work continues beyond a single season."

Copy sentences are **not** sacred. The ideas are. Improve wording when the design improves.

### RULE — never invent

Never fabricate: previous official FRC seasons · previous robots · robot names · awards ·
rankings · placements · competition records · sponsors · partners · attendance numbers ·
students reached · impressions · social reach · budgets · member biographies · member titles ·
quotes · press coverage · institutions · future plans · statistics of any kind.

If information is missing, **design around the absence**. A truthful empty area beats fake
content. This has been enforced across every pass and the site currently contains no
fabricated facts.

---

## 4. Technical Architecture

Read `package.json` for exact versions; as inspected now:

- SvelteKit `^2.63.0` (installed 2.70.2), Svelte `^5.56.1` (runes mode forced in `vite.config.ts`)
- TypeScript `^6.0.3` strict, Vite `^8.0.16`
- `@sveltejs/adapter-node` `^5.5.7`, output `build/`, started with `node build`
- **Zero runtime dependencies** (`dependencies: {}`). Everything is a devDependency.
- Custom CSS only. No Tailwind, no UI library, no animation library, no Three.js.

Scripts: `dev` · `build` · `preview` · `check` (`svelte-kit sync && svelte-check`) ·
`lint` (`prettier --check . && eslint .`) · `format`.

SSR is required (locale is resolved per request). Nothing is prerendered.

### Routes (verified)

```
src/routes/+layout.svelte        shell: header, footer, i18n context, view transitions
src/routes/+layout.server.ts     passes resolved locale to the client
src/routes/+page.svelte          homepage composition
src/routes/+page.server.ts       resolves "today" in Europe/Istanbul (+ dev ?date= override)
src/routes/+error.svelte         branded 404 / error page
src/routes/about/+page.svelte
src/routes/robotics/+page.svelte
src/routes/impact/+page.svelte
src/routes/team/+page.svelte
src/routes/partners/+page.svelte
src/routes/contact/+page.svelte
src/routes/healthz/+server.ts    plain-text 200, used by the Docker HEALTHCHECK
src/routes/sitemap.xml/+server.ts generated from the navigation config
```

---

## 5. Current Repository / Git State

Verified at handoff time:

- Branch **`main`**, HEAD **`e4aee90` "chore: update dependencies"**.
- **0 commits ahead, 0 behind `origin/main`.**
- The working tree contains the *entire* Project Atlas content + creative work as
  **uncommitted modifications and untracked files**.

**RULE: do not discard, revert, stash or commit these local changes.** They are the active
design pass awaiting the user's review.

Modified (21): `.prettierignore`, `src/app.html`, `Header.svelte`, `ContactCta.svelte`,
`Disciplines.svelte`, `Hero.svelte`, `Institutional.svelte`, `OffSeason.svelte`,
`Origin.svelte`, `Principles.svelte`, `SteamFest.svelte`, `SystemChapter.svelte`,
`MediaFrame.svelte`, `Monolith11919.svelte`, `content/media.ts`, `content/site.ts`,
`i18n/dictionaries/en.ts`, `i18n/dictionaries/tr.ts`, `styles/tokens.css`,
`routes/+page.svelte`, `routes/team/+page.svelte`.

Deleted (1): `static/favicon.svg` (old placeholder monogram, replaced by the real logo).

Untracked: `images/`, `scripts/`, `static/media/`, `static/favicon.png`,
`static/apple-touch-icon.png`, `src/lib/content/generated/`, `src/lib/content/roster.ts`,
`src/lib/content/signal.ts`, `src/routes/+page.server.ts`,
`src/lib/components/sections/{DailySignal,MemberStream,Roster}.svelte`,
`src/lib/components/ui/Portrait.svelte`.

### Important git-history lesson

Earlier in Project Atlas a creative pass was disliked. It had **not** been pushed. The user
deleted the local folder and re-cloned the last good GitHub checkpoint — which is why
**pass 3's chapter/motion system does not exist in this repo**.

Therefore: *GitHub HEAD = last approved checkpoint. Local working tree = current experiment.*
Never assume either is "the truth" without running `git status` and `git diff`.

---

## 6. Current Design State

### Homepage composition (verified in `src/routes/+page.svelte`)

```
<Hero />                  ← REBUILT this pass ("First Light"), new colour language
<DailySignal today={data.today} />   ← birthday OR daily record band
<MemberStream />          ← 01 · people, three drifting portrait columns (REBUILT)
<Origin />                ← 02 · February 2026 + compressed timeline
<SteamFest />             ← 03 · sport × STEM diptych
<OffSeason />             ← 04 · 21 teams, field of ticks
<Monolith11919 />         ← 05 · the team number as cast material
<Disciplines />           ← 06 · "the machine", six disciplines
<SystemChapter />         ← 07 · engineering the organization + org network
<Principles />            ← 08 · STEAM for STEM / STEM for People
<Institutional />         ← 09 · Trabzonspor + school
<ContactCta />            ← 10 · closing
```

Chapters 02–10 are rendered through `src/lib/components/ui/Section.svelte`, which takes
`index`, `label`, `tone` (`base|void|navy|burgundy`) and `rule`.

**CURRENT:** only the Hero, DailySignal and MemberStream carry the new saturated blue/claret
scene language. Chapters 02–10 still use the older graphite treatment.
**INTENT:** carry the colour, scene contrast, photography and motion language through the
whole page, letting each chapter keep a distinct emotional temperature. This is the single
biggest unfinished design task.

### What is genuinely good right now

- The Hero (see §10) — the strongest single moment.
- The people scene — real portraits in autonomous motion, no scroll capture.
- The Team roster — five domain panels, search, and a large member focus state.
- The portrait pipeline and the placeholder-replacement workflow.
- The birthday/daily system and its Istanbul date handling.
- Factual integrity: nothing on the site is invented.

---

## 7. Design Philosophy

The user's repeated, explicit direction:

- **Premium ≠ grey. Premium ≠ monochrome. Premium ≠ fade-up-20px.**
- The site must be **colourful, alive, surprising**, with **multiple visual peaks** — the Hero
  cannot be the only good part.
- Think in **scenes and transitions**, not stacked components.
- RO6ONE's identity is sacred; **individual layouts are not**. Major redesigns are welcome.
  Do not preserve something weak because it already exists.
- The people must feel human, not like database rows.

Anti-patterns to avoid: generic card grids · rounded-rect SaaS aesthetic · everything at
24px radius · tiny muted accents only · repetitive fade-ups · fake technical UI · fake
metrics/dashboards · random NASA coordinates · generic startup copy · scroll-jacking ·
hover-only interactions · huge media payloads · fake robot renders · stock student portraits ·
fake event photography.

Target visitor reaction: *"Wait — this is a high-school robotics team?"* → *"They built all of
this?"* → *"I want to keep scrolling."* → *"I understand who they are."* → *"I know how to
follow/contact/support them."* Spectacle **and** clarity; neither alone.

---

## 8. Lando Norris Reference

Primary visual reference: **https://landonorris.com/**
Secondary (case study): https://www.itsoffbrand.com/our-work/lando-norris

The last pass **actually rendered and studied the live site** with headless Chrome at scroll
positions 0 / 900 / 1800 / 2700 / 4600 / 6200 / 7800 / 9400 / 12600 (page height 13,577px).
The grammar extracted — reuse these principles, they are the reason the reference matters:

1. **Full-viewport scene contrast** — cream hero → dark-olive statement → cream ON/OFF TRACK →
   black helmets → lime-gradient → dark footer. Whole rooms change, not tinted boxes.
2. **Two type voices in one sentence** — condensed grotesque + a contrasty serif, with one
   accent colour picking out specific words ("REDEFINING **LIMITS** … *LEGACY*").
3. **One saturated accent used loud** (their lime) on buttons, years, labels, marks.
4. **Hand-drawn marks over precise type** — a circled word, a highlighter sweep, a signature.
5. **Cut-out objects bleeding in from opposite edges**, facing each other (helmet ← → face).
6. **Notch-cornered panels** with the label sitting in the notch (name + year).
7. **Staggered multi-column object fields** (Hall of Fame), not uniform grids.
8. **Curved section boundaries** and rounded dark panels.
9. Photographs of different sizes at different heights with small mono captions, placed in
   space rather than in a grid; mixed colour and black-and-white.
10. **The footer is a designed ending** — statement + cut-out image rising behind it + symmetric
    nav + partner row inside a rounded panel with a curved top edge.

**RULE: translate, never copy.** No lime, no helmets, no contour-line background, no
signature scribbles, no F1/McLaren aesthetic, no copied layout or component.

The translation principle: Lando's motion comes from *speed / racing / personality*. RO6ONE's
motion should come from **engineering, assembly, coordination, systems coming online, people
joining, mechanisms aligning, signal flow, building, events, impact**.

---

## 9. Colour / Typography / Motion Language

### Colour — CURRENT (verified in `src/lib/styles/tokens.css`)

Derived from the actual logo artwork (blue wildcat head on claret field):

```css
--ink: #08090c;  --ink-blue: #070d18;  --ink-claret: #120709;   /* three dark rooms */
--blue: #3f8fd8;  --blue-bright: #74baf4;  --blue-deep: #17365f;
--claret: #8d2440;  --claret-bright: #c94a63;  --claret-deep: #3d0f1c;
--surface-void/base/panel/navy/burgundy    /* older graphite surfaces, still used by 02–10 */
--pigment-burgundy / -navy (+ deep)        /* older, low-saturation pigments */
--edge-faint/edge/edge-strong              /* hairlines */
--edge-burgundy: rgb(201 74 99 / .4)  --edge-navy: rgb(116 186 244 / .36)
--text-primary #f4f4f2 / secondary .64 / muted .53 / faint .48  /* AA-tuned ramp */
--signal: var(--blue-bright)   --signal-warm: var(--claret-bright)
```

`--signal` and `--signal-warm` are aliases, so older components inherited the vivid colours
automatically. The text ramp was tuned for WCAG AA at small sizes; do not dim it further.

**INTENT:** more colour, used as *rooms, light, reflections, transitions, role states, event
identity* — not as tint. Different chapters may have different temperatures. Do not make a
rainbow; do not make a football kit.

### Typography — CURRENT

- `--font-sans` — system UI stack (full Turkish glyph coverage, zero download).
- `--font-display` — **`ui-serif, Georgia, 'Times New Roman', 'Nimbus Roman', serif`**, added
  this pass as the second voice. Used italic, in blue, for the turn of a sentence
  ("Build what / *comes next.*", "Fifty-one students, / *one build.*").
- `--font-mono` — labels, metadata, counts.
- Scale tokens: `--type-micro/small/body/body-lg/h3/h2/statement/h1/display/mega`, with a
  tracking ramp (`tight → statement → display → mega`).

**RULE:** no webfont has ever been added — it keeps Turkish coverage guaranteed and costs
nothing. If a future pass adds one, verify Turkish glyphs (ı İ ğ ş ç ö ü), licensing and
performance, and change `--font-sans` in one place.

### Motion — CURRENT

- `src/lib/actions/reveal.ts` — `use:reveal={{ delay, threshold, rootMargin }}`. Anything
  already on screen when it mounts is marked visible **without** transition (otherwise SSR
  content would fade out after hydration). Without JS, nothing is hidden.
- Tokens: `--ease-out`, `--ease-material`, `--ease-in-out`, `--motion-light` (620ms),
  `--duration-fast/base/reveal`.
- Route changes use the native View Transitions API (feature-detected, reduced-motion aware).
- **RULE:** every animation needs a sensible `prefers-reduced-motion` state that shows the
  *finished composition*, not an empty one.

**Note:** an earlier pass built a richer four-class motion vocabulary (mass / information /
structure / media). It is **not** in this repo. Do not assume `--ease-info`, `--travel-mass`
or `data-motion` exist — a missing easing token silently invalidated an `animation` shorthand
during this pass and made the Hero's fact strip invisible.

---

## 10. Hero

**CURRENT — `src/lib/components/sections/Hero.svelte`, concept "First Light".**

The logo is a wildcat head built from Black-Sea-wave curls. The Hero treats it as a physical
object in a dark room:

- **Room:** `--ink-blue` base, a blurred **blue key light** upper-left, a **claret floor light**
  lower-right, plus a fine grain layer. Both glows fade up on load.
- **Object:** `/media/brand/mark-256.png` (transparent) at `clamp(18rem, 37vw, 33rem)`,
  right-hand side, bleeding slightly off the edge; a one-time **light sweep** crosses it.
- **Statement:** `Build what` (grotesque) + `comes next.` (display serif italic, blue gradient).
- **Eyebrow:** blue dot · `site.legalName` · rule · `site.teamLabel`.
- **Floor:** an instrument strip — Formed / Home / Next — struck in one cell at a time under a
  rule that draws blue→claret, with a live blue dot on "Next", plus the scroll cue.
- **Entrance ≈2.6s:** glow 0–1.6s · object+sweep 0.25–1.75s · eyebrow 0.9s · headline lines
  1.05/1.2s · description 1.75s · rule 1.9s · strip cells 2.05s+ · scroll cue 2.35s. Nothing
  blocks interaction; there is no loader.
- **First scroll = the transition:** a `--dock` value (0→1 over 72% of hero height, rAF-throttled
  scroll listener) shrinks the mark and moves it toward the top-left, **docking where the header
  lockup sits**. The hero hands its logo to the navigation.
- **Mobile (≤900px):** object repositioned and smaller, statement full width, strip becomes a
  three-column row. Verified at 390×844 — it is a distinct composition, not a scaled desktop.
- **Reduced motion:** everything lands in final position; sweep and scroll rail removed.

**History of this file:** the previous Hero was a graphite Canvas material with a mouse-driven
light (`src/lib/components/ui/HeroLightCanvas.svelte`). It was replaced this pass.

**KNOWN ISSUE:** `HeroLightCanvas.svelte` is now **orphaned** — no file imports it. Decide
whether to delete it or repurpose the material system elsewhere. (Do not delete casually; it
is ~500 lines of working CPU lighting with Turkish comments by the original author.)

**KNOWN ISSUE:** the Hero's top-left quadrant still feels empty, and **#11919 plays no role**
in the Hero.

**INTENT:** the Hero is now one of the stronger pieces. Polish is welcome; **replacement
requires a genuinely better idea**, not novelty.

---

## 11. Homepage

### DailySignal — `src/lib/components/sections/DailySignal.svelte`

Sits immediately after the Hero, anchored `#today`.

- **Birthday state:** the whole band warms (claret + blue radial glows), portrait(s) with a glow
  behind, name(s) at statement scale, role, warm wish. Multiple birthdays all celebrate.
- **Normal state:** one line from a 12-entry factual deck (`src/lib/content/signal.ts`) selected
  deterministically by date, plus **the next birthday on the calendar** — so people stay present
  on the 364 non-birthday days. Never says "no birthdays today".

### MemberStream — `src/lib/components/sections/MemberStream.svelte` (chapter 01)

**CURRENT:** a claret room. Left: marker `01 · The people`, a cast claret `51` behind a
two-voice statement ("Fifty-one students, / *one build.*"), lede, CTA to `/team`.
Right: **three columns of portrait panels drifting autonomously** at 52s / 64s / 58s, middle
column reversed, outer columns set back (opacity .72, scale .94), masked top and bottom.
Hover or focus **pauses all three**. Panels show portrait + name + role (role in blue).
Every photographed member is dealt round-robin across columns. `aria-hidden` on the field
because `/team` is the accessible source of truth.

**Why it is built this way — do not regress:** the previous version **pinned the page and
dragged a 37-portrait track sideways**; you had to travel past every student to continue.
The user explicitly rejected this.

**RULE (homepage people):**
- The visitor must be able to continue vertically **immediately**.
- The section must be interesting **without** interaction.
- ~8–12 visible at once is fine; all 51 need not appear in one visit.
- Rotation/cycling is fine; **no permanently privileged subset** of students.
- Fairness is provided by the full Team page, **not** by equal homepage scroll length.
- Must not degrade into a plain CSS logo marquee — keep depth, speed variation, direction
  contrast, real hover, and typography interaction.

Mobile ≤640px: two columns (third hidden), no depth offset.

---

## 12. Team Experience

**CURRENT — `src/routes/team/+page.svelte`** (5 chapters) with
**`src/lib/components/sections/Roster.svelte`** as chapter 04:

- **Five domain panels** (Robotics · PR · Organization · Finance · Mentors) — large count,
  name, and a rule that lights **blue** when open (**claret** for Mentors, the one deliberate
  difference). `aria-pressed`, real buttons, click again to close.
- **Search** always available, with **Turkish-aware folding** (`toLocaleLowerCase('tr')` plus
  ı→i, ş→s, ğ→g, ü→u, ö→o, ç→c, â→a) so "ipek" finds "İpek". Typing overrides the group filter.
- **Tally** with `aria-live`, showing matches and `37/51 · portraits arrive as members send them`.
- **Focus state:** clicking a member makes their portrait **span two columns at full 4:5**
  (~2.5× the area), name at heading scale, role in blue, while every other card drops to 42%
  opacity (hovering a dimmed card restores it). **Escape closes.**
- **Hover:** lift, blue border, 40px shadow, image scale 1.03 + saturation bump, role turns blue.
- Grouped by `roleOrder` when unfiltered; flat list when filtered or searching.

**KNOWN ISSUE:** large dead vertical gaps on the Team page, most visible around chapters 02/03
(seen in rendered screenshots). Needs visual cleanup.

**INTENT:** groups should keep getting more spatial/meaningful; the focus state should stay
materially large (never a 1.05× scale). Search and keyboard access must survive any redesign.
Never invent biographies — portrait + name + role is enough for a beautiful focus view.

---

## 13. Member Roster

**CURRENT — `src/lib/content/roster.ts`.** Typed, **49 students + 2 mentors = 51 people**.

**RULE: the site says "forty-nine students", never "fifty-one students".** Mentors are counted
separately and are not students. `studentCount` (49) and `mentorCount` (2) exist for exactly
this; `rosterSize` (51) is only for portrait-coverage tallies.

```ts
type RoleId = 'organisation' | 'robotics' | 'pr' | 'finance' | 'mentor';
type Member  = { key: string; name: string; role: RoleId; birthday?: { month, day } };
const roleOrder = ['robotics', 'pr', 'organisation', 'finance', 'mentor'];  // mentors last, alongside not above
```

Exports: `roster`, `roleOrder`, `rosterSize`, `portraitCount`, `membersByRole`,
`portraitFor`, `istanbulDay`, `birthdaysOn`, `dailyIndex`, types `Member`/`RoleId`/`Portrait`/`CalendarDay`.

**Deliberately NOT stored** (do not add them back without a reason):
- **birth years** — the site never shows an age, so shipping 51 birth years to every visitor is
  data we do not need. Semra's unknown year becomes a non-problem by construction.
- **gender** — nothing in the design uses it (placeholders are built from initials).

Role display strings live in the dictionaries under `roles.*`:
EN `Robotics / PR / Organization / Finance / Mentor & lead coach` ·
TR `Robotik / PR / Organizasyon / Finans / Mentör / Baş Koç`.

### The canonical roster (factual source of truth)

Format: `name — role — birthday (month.day) — expected filename`.
"—" means the team has not supplied a date; it must stay **absent**, never `"?"`, never guessed.

| # | Name | Role | Birthday | File |
|---|---|---|---|---|
| 1 | Yiğit Pursalı | Organizasyon | 28.03 | yigitpursali.jpg |
| 2 | Züleyha Aydın | Organizasyon | 21.03 | zuleyhaaydin.jpg |
| 3 | Doğan Efe Aşçı | Organizasyon | 10.05 | doganefeasci.jpg |
| 4 | Taha Remzi Aydın | Organizasyon | 19.12 | taharemziaydin.jpg |
| 5 | Ilgaz Güven | Organizasyon | 25.12 | ilgazguven.jpg |
| 6 | Yağmur Havva Yenibaki | Organizasyon | 17.05 | yagmurhavvayenibaki.jpg |
| 7 | Alaaddin Bilgin Topal | Robotik | 21.01 | alaaddinbilgintopal.jpg |
| 8 | Azra Ezgi Turhan | PR | — | azraezgiturhan.jpg |
| 9 | Batuhan Verep | PR | — | batuhanverep.jpg |
| 10 | Betül Tellioğlu | Robotik | 24.05 | betultellioglu.jpg |
| 11 | Burak Yılmazlar | Finans | 20.02 | burakyilmazlar.jpg |
| 12 | Deniz Ali Şahin | PR | — | denizalisahin.jpg |
| 13 | Ela Ecren Akyüz | Robotik | 09.09 | elaecrenakyuz.jpg |
| 14 | Elif Eroğlu | PR | 24.02 | eliferoglu.jpg |
| 15 | Elif Rana Kundakçı | PR | 13.12 | elifranakundakci.jpg |
| 16 | Elif Senem Öztürk | PR | 27.06 | elifsenemozturk.jpg |
| 17 | Tuğba Ezgi Kara | Finans | 24.04 | tugbaezgikara.jpg |
| 18 | Fatih Köroğlu | Robotik | 13.04 | fatihkoroglu.jpg |
| 19 | Furkan Hacımahmutoğlu | Finans | 04.01 | furkanhacimahmutoglu.jpg |
| 20 | Gizem Albayrak | PR | 16.05 | gizemalbayrak.jpg |
| 21 | Hamza Nuri Asan | PR | 27.12 | hamzanuriasan.jpg |
| 22 | Hayat Karahan | PR | — | hayatkarahan.jpg |
| 23 | İpek Bilgin | PR | 02.08 | ipekbilgin.jpg |
| 24 | İpek Turgut | PR | 09.10 | ipekturgut.jpg |
| 25 | Kaan Tanyel | PR | 25.07 | kaantanyel.jpg |
| 26 | Kaan Yavuz Çelik | Robotik | 14.09 | kaanyavuzcelik.jpg |
| 27 | Kemal Öztürk | Robotik | — | kemalozturk.jpg |
| 28 | Kerem Kongur | Robotik | — | keremkongur.jpg |
| 29 | Koray Baki | Robotik | 27.04 | koraybaki.jpg |
| 30 | Mehmet Mesci | PR | — | mehmetmesci.jpg |
| 31 | Murathan Mollamehmetoğlu | Robotik | 22.03 | murathanmollamehmetoglu.jpg |
| 32 | Mustafa Eren Karpuz | Robotik | — | mustafaerenkarpuz.jpg |
| 33 | Nehir Gülay | PR | 22.06 | nehirgulay.jpg |
| 34 | Nesibe Zenginler | PR | 07.01 | nesibezenginler.jpg |
| 35 | Oktay Mete Aras | Finans | 15.03 | oktaymetearas.jpg |
| 36 | Ömer Faruk Özkul | Robotik | 08.06 | omerfarukozkul.jpg |
| 37 | Ömer Uzun | Robotik | 09.06 | omeruzun.jpg |
| 38 | Öykü Yılmaz | PR | 06.08 | oykuyilmaz.jpg |
| 39 | İrem Özem Taşkın | PR | 01.01 | iremozemtaskin.jpg |
| 40 | Ayşe Özge Özdener | PR | 27.10 | ayseozgeozdener.jpg |
| 41 | Sidelya Çam | PR | 09.05 | sidelyacam.jpg *(source alias: `sidelyaesmanurcam.jpg`)* |
| 42 | Yiğit Yağız Yazıcı | Robotik | 16.09 | yigityagizyazici.jpg |
| 43 | Zeynep Berre İsaoğlu | Finans | 25.01 | zeynepberreisaoglu.jpg |
| 44 | Zeynep Göksal | Robotik | 09.03 | zeynepgoksal.jpg |
| 45 | Zeynep Karabacak | PR | — | zeynepkarabacak.jpg |
| 46 | Zeynep Kösterelioğlu | PR | 01.12 | zeynepkosterelioglu.jpg |
| 47 | Zeynep Morkan | PR | 10.03 | zeynepmorkan.jpg |
| 48 | Yağız Efe Kalaycı | Robotik | 07.01 | yagizefekalayci.jpg |
| 49 | Semra Müşra Bektaş | **Mentör / Lead Coach** | **12.02** (year intentionally unknown, "19XX") | semramusrabektas.jpg |
| 50 | Ceyhun Temel | **Mentör / Lead Coach** | — | ceyhuntemel.jpg |
| 51 | Muhammet Salih Artun | PR | — | muhammetsalihartun.jpg |

Counts by role: **Robotics 14 · PR 23 · Organization 8 · Finance 4 · Mentors 2.**
(Yağız Efe Kalaycı moved Robotics→Organization and Furkan Hacımahmutoğlu Finance→Organization.)

### Per-member profile fields — edit content only

The member detail card is driven entirely by `roster.ts`; adding data needs **no component
change**. Per member:

| Field | Notes |
|---|---|
| `grade` | `10 \| 12 \| 12`. **Students only** — mentors must never be forced into a grade. |
| `mentorNote` | Mentors only. Semra = Bilişim Teknolojileri Öğretmeni; Ceyhun = Kocaeli Üniversitesi 2. sınıf öğrencisi. |
| `intro` | The member's own 1–2 sentences. **All 51 are currently empty** and render the placeholder "Tanıtım yakında." / "Introduction coming soon." |
| `tags` | Zero, one or many ids. All 51 currently `[]`. |

Any empty field is **omitted** from the card rather than rendered blank, so a member with
nothing filled in simply gets a shorter card.

### Tag system — `memberTags` in `roster.ts`

Three categories, kept apart so a joke never renders as a credential:

- **`skill`** — software · mechanical · electronics · cad · graphics · editor · camera ·
  videoEditor · accounting · **communications** · **sponsorship**. Rendered as blue outline
  chips. *Translated* in English.
- **`fun`** — genco · oldWolf · tense · excitable · restless · nightShift. Claret outline chips.
- **`special`** — host (`Sunucu-men`) · everythingGuy (`Her Şey Adam`). Solid claret chips.

**Fun and special labels stay Turkish in both dictionaries on purpose** — they are the team's
in-jokes and translating them flattens them. Labels live in the dictionaries under `team.tags.*`;
`roster.ts` only stores ids. Adding a tag = one id + two dictionary lines.

Naming decisions already made: "PRcı" → **İletişim** (the PR *group* already exists as a role,
so a tag repeating it would read as duplication); "Sponsorcu" → **Sponsorluk**.

**RULE:** never display ages or full birth dates publicly. Never guess Semra's year.
Never infer a role, seniority, age or identity **from a photograph**; the table above is the
only mapping.

---

## 14. Birthday System

**CURRENT — logic in `roster.ts`, date in `src/routes/+page.server.ts`, UI in `DailySignal.svelte`.**

- `istanbulDay()` uses `Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul' })` to get
  month/day. **The server resolves it once per request and hands it to the client**, so SSR and
  hydration can never disagree — the bug this feature would otherwise have for a few hours
  every night. **Preserve this.**
- Matching is **month + day only**. Unknown birthdays never participate.
- Multiple birthdays all celebrate, in roster order — never "first match".
- `dailyIndex(day, length) = (month*31 + day) % length` — deterministic fact selection, so SSR
  and client agree.
- **Dev-only preview:** `?date=MM-DD` on the homepage, guarded by `import { dev } from '$app/environment'`.
  Verified **inert in the production build**. Use it to *look* at states, not only test logic.

Verified test cases (all passing at the time of writing): ordinary day → signal mode ·
28 Mar one birthday · **7 Jan two birthdays (Yağız Efe Kalaycı + Nesibe Zenginler)** with the
plural wish · **12 Feb Semra**, year unknown, works and correctly shows her "portrait pending"
tile · 1 Jan · 31 Dec · 24 Feb (a member whose photo has not arrived) celebrates with a placeholder.

Tone: warm, young, human. Not childish, not corporate, no confetti GIFs. Current Turkish:
`"İyi ki doğdun. Atölye seninle daha iyi."` / plural `"İyi ki doğdunuz. Atölye ikinizle daha iyi."`

---

## 15. Member Portrait Pipeline

### The canonical crop rule (current, after the user rejected the first system)

> **Take the largest possible 4:5 rectangle that fits inside the original image, then slide it
> so the person is as centred as the source boundaries allow.**

- Source wider than 4:5 → full height, width = height × 0.8, slide horizontally.
- Source taller/narrower → full width, height = width × 1.25, slide vertically.
- **Preserve pixels. Preserve the person. Never upscale a tiny face. Never shrink the crop just
  to equalise apparent face size** — that was the rejected first approach.
- A capped `tighten` (≥ 0.72) escape hatch exists in `scripts/member_focus.json` for the few
  frames where the maximum rectangle genuinely fails.

**Why:** the archive is *personal snapshots* — ID photos, selfies, holidays, full-body shots.
Face height ranges from ~45% of the frame (Kaan Tanyel's ID photo) to ~4% (Hamza Nuri Asan on a
pier). Normalising them destroys resolution and composition.

### Manual corrections already applied (documented in `member_focus.json` with notes)

- **Betül Tellioğlu** — a framed Atatürk portrait fills the left of her source and dominated the
  full-width crop. `tighten: 0.72`, focus x 0.78 → she is the subject, only an edge of the frame
  remains. (**RULE: no Atatürk imagery as a dominant element anywhere on the site.**)
- **Doğan Efe Aşçı** — square source, face low and small; the maximum rectangle was nearly all sky.
- **Hamza Nuri Asan** — tiny figure on a pier; tightened so he is findable.
- **İpek Bilgin** — focus moved so her head is not against the top edge.
- **Kaan Tanyel** — source is only 295×354; his card is legitimately softer. Manifest flags
  `lowResolution: true`.
- **Sidelya Çam** — `alias: "sidelyaesmanurcam"` because her file uses her full name.
  **Do not rename the source file.**

### Review procedure — RULE

Never declare crops good because the script ran. Always:
source → crop → generated output → **contact sheet** → **look at every one** → correct →
regenerate → **check inside the actual component** (a crop can look fine alone and terrible
behind role text or in a focus layout — that is exactly how the stretched focus portrait was
caught this pass).

### Placeholders

14 members have no photograph. Each gets a generated graphite tile with their initials and
`PORTRE BEKLENIYOR / AWAITING PORTRAIT`, written **at the member's expected source path**
(`images/members/<key>.jpg`) and listed in `images/members/_generated-placeholders.txt` — the
only files the script will ever overwrite.

**Replacement workflow (tested end-to-end and working):** drop a real photo at
`images/members/<key>.jpg`, remove its line from `_generated-placeholders.txt` (or just re-run;
the log is rewritten), run `python3 scripts/process_media.py members`, and the manifest flips to
`placeholder: false` with real derivatives. **No source-code change is ever needed.**

**RULE: never use a stock photograph of a stranger for a named student.**

### Portrait rendering

`src/lib/components/ui/Portrait.svelte` reads `portraitFor(key)` and renders `<img>` with
srcset (320/640 slots), lazy loading (first few eager), `aspect-ratio: 4/5`, and one shared
grade (`saturate(.92) contrast(1.04) brightness(.97)`) so 37 different phones read as one
archive. Hover restores full colour. Placeholder tiles are desaturated further and carry a
`Portrait pending` label. Alt text is the member's name for real photos, empty for placeholders.

---

## 16. Asset Directory Map

### Sources (never destructively edited, currently untracked, ~3.8 GB total)

```
images/members/            51 × .jpg (37 real photographs + 14 generated placeholders)
                           + _generated-placeholders.txt  ← the list of generated files
images/steamfest/          327 files: 222 photos (.jpg/.jpeg), 91 .mov, 12 .mp4, 2 .heic
images/icons/ro6one-logo.jpg   874×849 — THE canonical supplied logo
images/trabzonspor/        official club media + SOURCE.txt (read it before adding any)
images/ministor/           the school principal's supplied portrait
images/ekip/               DOES NOT EXIST right now. If it appears, treat its contents as
                           intentionally supplied RO6ONE team photography (higher confidence
                           that these people are our team). Do not create this folder.
```

**RULE: rescan `images/members/` at the start of any member task and again before finishing.**
The user adds photographs between sessions. As of this handoff: **51 files, 37 real, 14
placeholders** — but treat those numbers as stale on sight.

### Generated (safe to delete and regenerate)

```
static/media/members/      102 × .webp   (each member at -320 and -640)   ~3.1 MB
static/media/events/       12 × .webp    (4 curated photos × 640/1280/1920) ~1.4 MB
static/media/brand/        mark-64/128/256.png (transparent) + og.png (1200×630)
static/favicon.png         48px, from the logo
static/apple-touch-icon.png 180px
src/lib/content/generated/member-media.json   srcset slots + placeholder/lowResolution flags
src/lib/content/generated/event-media.json    srcset slots + ratio + source filename
```

`src/lib/content/generated/` is excluded from Prettier (see `.prettierignore`) so `npm run lint`
never depends on when the pipeline last ran.

### Scripts

```
scripts/process_media.py     members + curated event derivatives, manifests, placeholders
scripts/member_focus.json    per-member focus [x,y] + optional tighten + alias + human notes
scripts/event_selection.json curated event photos → media slot ids, with crop + caption + note
scripts/process_brand.py     logo → transparent marks, favicon, apple-touch-icon, OG card
scripts/shoot.mjs            headless-Chrome screenshot tool (see §31)
```

Usage: `python3 scripts/process_media.py [members|events] [--force]` ·
`python3 scripts/process_brand.py`. Only Pillow is available (no ImageMagick, no ffmpeg, no
OpenCV/numpy) — **video cannot currently be transcoded and HEIC cannot be decoded.**

`EVENT_DIRS` in `process_media.py` already declares `images/offseason/` — dropping files there
plus editing `event_selection.json` is all that is needed to ingest Off-Season photography.

---

## 17. STEAMFest

Officially **"Spor STEAM Fest'26"** (verified on the school's MEB page). **28 April 2026.**
RO6ONE's first major project, run under Trabzonspor sponsorship.

Four schools took part: **Trabzon Merkez Fen Lisesi · Kanuni Anadolu Lisesi · Trabzon Sosyal
Bilimler Lisesi · Trabzon Tevfik Serdar Anadolu Lisesi.** Each formed a **boys' football team**
and a **girls' volleyball team** for friendly tournaments.

RO6ONE ran STEM/STEAM stands: previous TÜBİTAK projects · TEKNOFEST projects · event-specific
chemistry stands · biology stands · engineering stands · line-following and similar robots ·
mathematics stands · a team merchandise/giveaway stand. Larger chemistry and physics
demonstrations happened during intermissions.

Concept: **SPORT × STEM · FIELD × LAB · FUN × LEARNING · COMMUNITY × ENGINEERING.**
Not a science fair beside a tournament — a deliberate collision.

**CURRENT implementation** (`sections/SteamFest.svelte`, chapter 03): a two-column diptych with
a centre rule, "court" half standing on court geometry (a centre arc + sideline) and "lab" half
on graph paper, meeting at a merge statement; facts and school list below.

**Curated images so far (4 of 222 reviewed on contact sheets):**

| Slot | File | Why |
|---|---|---|
| `home.steamfest.court` | `IMG-20260428-WA0107.jpg` | two school teams lining up, city behind |
| `home.steamfest.lab` | `IMG-20260428-WA0100.jpg` | chemistry stand, hands on the flasks |
| `impact.steamfest.wide` | `IMG-20260428-WA0105.jpg` | volleyball in the sports hall, wide |
| `about.school` | `IMG-20260428-WA0064 (copy).jpg` | the school front with festival stands |

Rejected: near-duplicate banner/prop frames, motion-blurred indoor shots, accidental frames,
photographs of phone screens, and group shots where it cannot be verified who is RO6ONE and who
is a guest. **These four are not a permanent limit — reselect and expand when the design needs it.**

---

## 18. Trabzon Off-Season

**July 2026** (press reports 10–12 July), at **Hayri Gür Spor Salonu**, Trabzon. RO6ONE was the
**organizer team**, with Trabzon Merkez Fen Lisesi and Trabzonspor.

**Team-provided figure: 21 teams. Use 21.** Public FIRST listings may differ depending on how
competing entries / demo structures / participation are counted — understand the distinction
before ever changing this number.

Teams travelled from **İstanbul, Ankara, Bursa, Kocaeli and Trabzon**. Press reported it as the
**first FRC Off-Season held in the Black Sea region**, and Trabzonspor Vice Chairman
**Murat İskender** spoke at the opening. Awards were given in ~20 categories.

Significance to communicate: bringing an FRC Off-Season to Trabzon / the Eastern Black Sea;
demonstrating the FRC ecosystem can grow beyond the İstanbul–İzmir–Ankara concentration; local
visibility; reaching children, families and future members; institutional visibility; national
media attention including TRT.

**RULE:** do **not** claim RO6ONE has run events across Türkiye. The fair statement is that this
event *demonstrated the possibility* of regional expansion. Be precise with FIRST terminology —
verify before writing "official FIRST event", "official FMS", "official field infrastructure" or
any formal Fikret Yüksel Vakfı relationship. Never upgrade an association into an official claim.

**CURRENT implementation** (`sections/OffSeason.svelte`, chapter 04): `21` at display scale, a
field band with **one tick per team** rising in a stagger, the origin-cities rail, a proof block,
and three empty media apertures waiting for photography.

---

## 19. External Media Sources — DO NOT LOSE THESE

**Google Drive (Off-Season):**
`https://drive.google.com/drive/folders/1IROvJQl5kA2-hAWP8jOXu83EJa6AosA6`

**Google Photos (Off-Season):**
`https://photos.google.com/share/AF1QipOS5eQn-BHwh761TnMqMLkGwNzHXPDcaYkNdYOjROib9QHo8d2YDx3vOZQsCrCdSA?key=WUtZQlBObVVpLWVvemdVRXZBdTl2YU9jdjR1OE5B`

**STATUS: SOLVED (completion pass).** The Drive folder is titled **"12 Temmuz"** and holds
**exactly 50** `DSCF####.JPG` frames (Fujifilm, the professional camera operator's work).

**The method that worked — reuse it.** Open the folder in the in-app browser, then read the
rendered DOM rather than the HTML payload: every file row carries a `data-id` attribute, and the
same element's `aria-label`/`textContent` contains the filename, so filename→file-id pairs fall
straight out of

```js
document.querySelectorAll('[data-id]')   // → { id, label } for all 50
```

Thumbnails come from `https://drive.google.com/thumbnail?id=<ID>&sz=w1000` (≈190 KB each) and
full resolution from `https://drive.google.com/uc?export=download&id=<ID>` (≈5.4 MB each,
4608×3456). No auth, no API key, no Playwright.

**Do the cheap pass first:** pull all 50 thumbnails, build contact sheets, look at every one, and
only download full resolution for what survives. 50 thumbnails ≈ 9.5 MB; 50 originals ≈ 270 MB.

**What was taken:** 14 frames into `images/offseason/` (81 MB, untracked source archive, same
convention as `images/steamfest/`). Nine are live on the site — see `scripts/event_selection.json`
for the per-frame reasoning and the rejection list.

### ⚠ IDENTIFICATION — the mistake this project already made once

That pass identified RO6ONE members by **the Trabzonspor crest kit**, and used three Off-Season
frames — `DSCF6418`, `DSCF6419`, `DSCF6420` — to represent the team on the homepage
organization chapter, the Team page and the About page.

**The team confirmed those people are not RO6ONE members.** The crest kit is worn far beyond this
team, and being at the event proves nothing. All three were replaced from `images/steamfest/`.

**The only identification now accepted is evidence visible in the frame:**

- the **RO6ONE mark on a stand banner, prop or backdrop** the people are operating — the
  STEAMFest `KİMYA` / `BİYOLOJİ` banners carry it beside the Trabzon Fen Lisesi crest;
- **RO6ONE-issued event credentials** worn by the subjects;
- the team's **own branded props** — the `Ro6oneCAM` frame, the `STEAMFEST '26` frame, the
  Off-Season Instagram frame (`DSCF6427`, which carries `ts_ro6one_robotics` in shot).

Never clothing colour, age, proximity to the event, or "looks like a robotics student". If the
frame does not prove it, the photograph may be used **only as event context** and must never be
placed where the surrounding section reads it as "our team". Never identify anyone from a face.

Off-Season frames remain correct and in use for event context — arena, field, robots, crowd,
drivers. That was never the problem.

**Still outstanding:** the Google Photos share (§19 link) was not opened — the Drive set was
already more than the design needed. Press reports mention 10–12 July and the folder covers 12
July only, so a second day may exist somewhere.

---

## 20. Public Internet Media Rules

"No stock / no fake photos" **does not** mean "no internet images".

Allowed and encouraged: real, verified, publicly available RO6ONE-related imagery from
Trabzonspor official channels · Trabzon Merkez Fen Lisesi / MEB · FIRST / FRC sources · TRT ·
Anadolu Agency · established Turkish national media · credible Trabzon local media (e.g. 61saat,
Kuzey Ekspres, Taka, İlkhaber).

Before using any web image: **open the source**, understand who/what/when/context.

**RULE:** never present unrelated FRC or robotics imagery as RO6ONE · never AI-generate event
photography · never remove a press watermark to imply ownership · never caption unidentified
people as "our team".

### Source-context rule — VERY IMPORTANT

**Where an image was captured does not limit where it may be used.** An Off-Season photo showing
RO6ONE members preparing, working on laptops, building, filming or coordinating may be perfect
for Home / About / Team / Robotics / "Engineering the organization" / culture sections. Same for
STEAMFest. Ask *what does this photo show*, not *which folder is it in*.

The only hard limit: if you cannot confidently tell whether the visible people are RO6ONE
members, use the image only in an accurate event/community context.

### Verified public sources already used

- School MEB page confirming "Spor Steam Fest'26", 28 April 2026, four schools, Trabzonspor sponsorship.
- Press coverage of the Trabzonspor ↔ Trabzon Merkez Fen Lisesi cooperation protocol (~March 2026,
  reported 23–24 March), signed by Trabzonspor General Secretary **Sami Karaman** and school
  principal **Coşkun Çolak**.
- Press coverage of the Off-Season (Habertürk, Kuzey Ekspres, İlkhaber, Haber Anlık and others).

**Note:** the school's page names the team mentor publicly. The site deliberately does **not**
name individuals from press sources — that is the team's call to make.

---

## 21. Trabzonspor / School / Institutional Story

**RO6ONE is always the protagonist of ro6one.com.**

Trabzonspor is **not** "one sponsor among many": it is a foundational institutional relationship,
the club under whose identity the team competes, and part of the team's formation. It deserves
narrative treatment — never a logo tile in a sponsor wall.

**But:** the site must never feel like a Trabzonspor football microsite. A visitor should leave
remembering **RO6ONE**. Do not redraw or modify the club crest; prefer official assets if any are
ever needed.

The **protocol** (verified): an education and technology cooperation protocol between Trabzonspor
and Trabzon Merkez Fen Lisesi, signed around March 2026, to support FRC team students in science,
technology and engineering, provide material and in-kind contributions for national and
international competitions, and establish sustainable cooperation.

**Trabzon Merkez Fen Lisesi is home**, not an address and not a partner logo. The team came out of
this school. The interesting story is the collision of **sport + education + engineering + youth +
Trabzon + FRC**.

**CURRENT:** `sections/Institutional.svelte` (chapter 09) presents the relationship as a record
plate beside RO6ONE's own voice, in a burgundy-toned section. Colour draws on Trabzonspor's
identity through the logo palette, which is legitimate and desirable.

---

## 22. Ekip Ro6one / Operations

"**Ekip Ro6one**" is the team's internal communication and operations platform. It is
**Nextcloud-based**.

**RULE — accuracy:** never write "we developed Nextcloud". The truthful framing is that RO6ONE
**configures, operates, maintains and extends** a Nextcloud-based platform; team developers have
written several plugins/extensions; one developer handles configuration and logs largely without
outside help.

Used for team communication, meetings, direct messages, coordination, files, shared workspaces and
departmental coordination. The team also runs its **own mail system, own domain and its own website
infrastructure**.

**RULE — vendor neutrality:** the server is rented from **Keyubu**, which is **NOT a confirmed
public sponsor or partner**. **Never name Keyubu publicly**, never write "supported by Keyubu",
never place a Keyubu logo. Keep the public infrastructure story vendor-neutral unless the user
explicitly confirms a partnership.

**RULE:** never publish private Git/infrastructure plans, internal hostnames, IPs, credentials,
tokens, internal URLs, admin interfaces, private Nextcloud content or file names.

**RULE:** never fabricate live metrics, uptime, server statistics or dashboard UI. Abstract system
visualisations are fine; fake operational data is not.

The public idea — potentially one of the site's most distinctive concepts:
> **"We engineer the organization as deliberately as we engineer the robot."**

**CURRENT:** `sections/SystemChapter.svelte` (chapter 07) + `ui/OrgNetwork.svelte` — an interactive
network of domain nodes inside a dashed "flexible pool" boundary, with a detail panel. Every node is
a real `<button>`, so the diagram is keyboard-explorable.

---

## 23. Internal Team Structure

Background for understanding RO6ONE's maturity. Do **not** dump it as a bullet list publicly, and
do not publish stale headcounts without verification.

- **Disciplines:** CAD · Mechanical · Electrical · Software · PR · Media. People are flexible;
  roles indicate *primary ownership*, not silos. Present as a network, never a corporate hierarchy.
- **Media:** one professional camera operator whose job is continuous capture and building a shared
  archive; a director/producer who turns team activity into stories and guides YouTube / Reels /
  Shorts / posts; two more camera operators for content-specific and event scenes; two editors —
  one long-form/assembly, one dense cinematic short-form.
- **PR "Assign as needed"** — ~9 flexible members who move to wherever work is needed (robotics
  labour, content/acting, PR, events, physical preparation). **Describe respectfully**: they are
  deliberate flexible capacity, never "spare people" or "unskilled labour".
- **PR Leads** — ~3 people. Pattern: spot an opportunity → shape the idea → contact institutions/teams
  → rough plan → feasibility → present to the team → team decides → hand over to the best owner.
- **Creative & Prepare** — ~9 people: ideas for visibility and audience interaction at seminars,
  workshops, events and public appearances, plus preparing props, materials and branded pieces.
- **Finance** — an older structural note said 2 people; the **current roster lists 5 Finans Üyesi**.
  **The roster wins** for individual presentation.
- **Organization / Operations** — ~8 people, often holding other roles too: alignment, information
  flow, decisions, discipline, morale, resolving member problems.

---

## 24. Partners / Sponsorship Privacy

- The only confirmed public institutional relationship is **Trabzonspor**.
- **RULE: never fabricate a sponsor wall or placeholder sponsor logos.** `src/lib/content/partners.ts`
  intentionally holds an empty partner list plus institutional entries; `/partners` renders an honest
  empty state.
- Sponsorship work (researching companies/foundations/institutions, in-kind and financial support,
  meetings, agreements) is real, but **prospective sponsors must stay private** — including Keyubu.
- Architecture should allow future partners (tiers exist in the type) without a redesign, but empty
  categories must never be publicly displayed.

---

## 25. Localization / Turkish

**CURRENT architecture (works — do not regress):**

```
src/hooks.server.ts              cookie (ro6one_locale) → Accept-Language (q-weighted) → 'en'
                                 stamps %ro6one.lang% into <html lang>, appends Vary: Accept-Language
src/lib/i18n/index.ts            locales, cookie name/TTL, localeMeta, Accept-Language parser
src/lib/i18n/context.svelte.ts   per-render I18n instance via Svelte context (never module state,
                                 so concurrent SSR requests cannot share a visitor's language)
src/lib/i18n/dictionaries/en.ts  source of truth — its shape defines the `Dictionary` type
src/lib/i18n/dictionaries/tr.ts  typed against en.ts, so nothing can silently go missing
```

Language switching is instant and client-side (state + cookie), no reload, choice persists.
Top-level dictionary keys: `common nav media hero roles daily departments organization events home
about robotics impact team partners contact footer error seo`.

**RULE:** every new visible string goes into both dictionaries. Never hardcode copy in a component.

### Turkish quality — HIGH PRIORITY, UNFINISHED

The English copy is generally stronger than the Turkish; the Turkish often reads translated.
The user explicitly wants this fixed, and the earlier "don't touch Turkish" instruction is
**revoked**.

**Rewritten so far (this pass):** hero description + meta (`Merkez` → **`Yuva`**, which is what a
team calls its school) + `scroll: 'Aşağı kaydır'` · `home.people` · `daily` birthday + signal ·
`team.roster` UI.

Example of the intended standard:
> ❌ "Atölye, sen olduğun için bir yıl daha iyi üretiyor." (translated rhythm)
> ✅ **"İyi ki doğdun. Atölye seninle daha iyi."** (shorter, natural, same feeling)

**Still reads translated and needs the full pass:** About, Impact, Robotics, Partners, Contact and
the long-form event chapters (STEAMFest / Off-Season narrative paragraphs), plus
`organization.domains.*` descriptions.

**RULE for writing Turkish:** write from the **idea**, not the word order. Different sentence
length, structure and punctuation are expected. Research real Turkish usage (FIRST/FRC Türkiye
ecosystem, Fikret Yüksel Vakfı, Trabzonspor, MEB/school, actual Turkish robotics teams) before
fixing terminology — especially mentor / lead coach / Off-Season / FRC terms. Avoid ministry-brochure
Turkish and AI-startup Turkish. Use proper Turkish characters everywhere (ı İ ğ Ğ ş Ş ç Ç ö Ö ü Ü).

One judgement call already made: the hero keeps *"etrafındaki organizasyonu da biz kuruyoruz"*
rather than *düzeni*, because **Organizasyon is the team's own department name**.

---

## 26. Accessibility / Responsive / Performance

**Accessibility — currently in place, preserve it:** skip link · `<main id="main">` · one `<h1>`
per page · clean heading order · semantic landmarks · native `<dialog>` mobile menu with
Escape/focus containment · `aria-current` on active nav · `aria-pressed` on toggles/filters ·
`aria-live` on the roster tally · labelled search and form fields · visible `:focus-visible` ring ·
decorative canvases/fields `aria-hidden` · alt text from the roster mapping, never inferred from
faces · reduced-motion handling in every animated component · a text ramp tuned for WCAG AA
(a full contrast audit was run in an earlier pass; 219 text nodes passed).

**RULE:** meaningful text must never live only inside a canvas. Continuous motion must pause on
hover/focus and under reduced motion. Any pointer interaction needs a keyboard path.

**Responsive:** verified at 1440 and 390 this pass (earlier passes also covered 1280/1024/975/768/375).
No horizontal overflow. Mobile is reinterpreted, not scaled: hero object repositioned, strip becomes
a row, people field drops to two columns, team domains go 5→2 columns, focused member spans full width.

**Performance (measured after the latest build):** client JS **~79 KB brotli**, CSS **~19.5 KB brotli**,
`static/media` ~4.8 MB total (lazy-loaded). No runtime dependencies. Re-measure rather than trusting
these numbers. Do not load 51 full-resolution portraits above the fold; keep srcset + lazy loading;
prefer CSS/Canvas over WebGL unless the payoff is real.

---

## 27. SEO / Docker / Deployment

**SEO:** `ui/Seo.svelte` sets title, description, canonical (from `PUBLIC_SITE_URL` or `site.url`),
Open Graph, `og:locale`, Twitter card and `og:image` (`/media/brand/og.png`).
`sitemap.xml` is generated from the navigation config so a new route cannot be forgotten.
`static/robots.txt` points at the sitemap.

**Known SEO limitation:** locale is cookie/header based, so both languages share one URL and search
engines will index only the default. A `[[lang]]` URL strategy would fix it — documented, not built.

**Docker (working — do not redesign without reason):** multi-stage `Dockerfile` on a pinned
`node:24.18.0-bookworm-slim`, `npm ci` in a cached deps stage, build stage, `npm prune --omit=dev`,
runtime stage running as the non-root `node` user, `NODE_ENV=production`, `HOST=0.0.0.0`, `PORT=3000`,
`HEALTHCHECK` hitting `/healthz` with Node's built-in `fetch` (no curl in the image), `CMD ["node","build"]`.

`compose.yml`: `restart: unless-stopped`, `init: true`, `security_opt: no-new-privileges`,
`cap_drop: ALL`, log rotation, published to **`127.0.0.1:3000`** by default (TLS and public exposure
belong to a reverse proxy), `ORIGIN` / `PROTOCOL_HEADER` / `HOST_HEADER` / `PUBLIC_SITE_URL` pre-wired.

Deploy commands are in `README.md`. **Docker has never been built in these sessions** — the tool is
not installed in the environment. `node build` (what the container runs) has been smoke-tested
repeatedly and works.

---

## 28. What Has Already Been Tried

**Kept and working:** SvelteKit shell + i18n + SEO + Docker · content/data architecture · media slot
system with designed empty apertures · timeline drawn to scale · org network · 11919 monolith ·
roster + portrait pipeline + placeholders · birthday/daily system · brand asset pipeline ·
headless-Chrome screenshot tooling · the new Hero, people scene and Team roster.

**Rejected by the user — do not reintroduce:**
- **Pinned horizontal member traversal** on the homepage (had to scroll past 37 people to continue).
- **Face-scale-normalising portrait crops** (over-cropped, soft, ugly).
- A whole creative pass built on a chapter/spine/environment system — the user did not keep it; the
  repo was re-cloned from GitHub. Do not assume any of it exists.

**Abandoned/not pursued:** Three.js migration for the hero material (Canvas was lighter and better);
a press/media page (real coverage exists, but three link cards would be worse than nothing — build it
only if it deserves to exist); video (no ffmpeg in this environment).

**Bugs found and fixed in earlier passes (kept here as landmines to avoid):** an `$effect` that wrote
the state it read (infinite loop); module-scope `Symbol()` context keys breaking under HMR (use
`Symbol.for`); a reveal action that faded out SSR content after hydration; CSS specificity fights from
desktop-first media queries (build mobile-first); a missing easing token silently invalidating an
`animation` shorthand; and `scroll-behavior: smooth` making programmatic screenshot scrolling land in
the wrong place.

---

## 29. Known Problems

Updated at the end of the completion pass. ✅ = fixed then, ❗ = still open.

1. ✅ **Footer** rebuilt as a scene (§33).
2. ✅ **Chapters 02–10 graphite** — every chapter now has a room (§33).
3. ❗ **Turkish is still only partly rewritten** (§25). **This is now the only large piece of
   work left on the site.** Touched so far: `home.origin.title`, `footer.closing/closingTurn`,
   `impact.coverage.*` (written Turkish-first — the source material is Turkish) and the
   bilingual alt/caption text on every media slot. About / Robotics / Partners / Contact and
   the long event narratives are still untouched and still read translated. The page
   structures are now final, which is what the dedicated editorial pass was waiting on.
4. ✅ **Off-Season photography ingested** (§19). Nine slots filled, no empty apertures in 04.
5. ✅ **Team dead gaps** — caused by compounding section padding; fixed globally (§33).
6. ❗ **Hero top-left quadrant still feels empty.** #11919 now has a real role in the *footer*
   rather than the Hero, which may be enough — judge it on screen before touching the Hero.
7. ❗ **`ui/HeroLightCanvas.svelte` still orphaned.** Left deliberately: deleting it does not
   improve anything and it is ~500 lines of working CPU lighting.
8. ❗ **`content/members.ts` still an orphan candidate.** Verified zero importers; still not
   deleted, same reasoning.
9. ❗ **`images/` is untracked and un-ignored** — now **3.7 GB** (§2). Unchanged hazard.
10. ✅ **Inner pages** brought into the room system (§34).
11. ✅ **`DailySignal` / `Monolith11919` / `ContactCta`** resolved (§34).
12. ✅ **`about.protocol`** filled with the official club photograph of the signing (§35).
    ❗ **`team.group` is still an empty aperture** — no whole-team group shot exists. Still the
    photograph most worth asking the team for.
14. ❗ **Three member portraits are still placeholders**: Alaaddin Bilgin Topal, Elif Eroğlu and
    Hayat Karahan were announced but had not arrived on disk as of this pass — the files at
    `images/members/<key>.jpg` are still the generated 1000×1250 stand-ins and all three are
    still listed in `_generated-placeholders.txt`. Dropping the real photos in and running
    `python3 scripts/process_media.py members` is the whole job; no code change is needed.
15. ❗ **Every `intro` and every `tags` array is empty.** The card and the tag system are built
    and verified; only the per-person values are missing (§13).
13. ❗ **The Google Photos Off-Season share was never opened** (§19), and press reports cover
    10–12 July while the Drive folder is 12 July only. A second day may exist.

---

## 30. Next Priorities

Rewritten at the end of the completion pass. Items 2, 3, 5, 6 of the previous list are done.

1. **The dedicated Turkish editorial pass** (§25). Page structures are final; this is what the
   user has been holding it for. Write from the idea, not the word order. Do **not** literal-
   translate the new English copy — several strings (`impact.coverage.*`) were written in
   Turkish first and are the standard to match.
2. **Formal accessibility re-audit**, with the **paper rooms** as the priority: that ink ramp is
   new and has never had a contrast audit. Check the light-room header rule too (§34).
3. Ask the team for the two missing photographs (§29.12): the protocol signing, and one
   deliberately posed whole-team group shot.
4. Retry the Google Photos share / look for a second Off-Season day (§29.13).
5. Re-check the Hero's top-left quadrant now that the footer carries #11919.
6. Video still cannot be processed — no ffmpeg in this environment (§16).

**RULE: do not rebuild the Hero first.** It is currently one of the strongest pieces. Polish is fine;
replacement needs a genuinely better idea.

Homepage rhythm to aim for: **entry → human moment → build/engineering → event energy → systems →
institutional story → impact/media → resolution.** Not a literal order — the point is
energy → breath → reveal → movement → information → energy → resolution.

---

## 33. The Room System (added by the completion pass)

The reason chapters 02–10 read as one long charcoal corridor was **not** that they lacked colour
props. It was that `--surface-base/void/navy/burgundy` are all within ~2% of black, so a section
asking for "navy" got black, and that every chapter used the identical composition: ~250px of
dead space, a tiny mono marker, a white headline left, a grey paragraph right.

**Tokens** (`styles/tokens.css`) — real rooms you can tell apart:

```css
--room-paper / -warm / -deep     warm off-white daylight room
--room-arena / -deep             blue arena
--room-claret / -deep            claret hall
--room-steel / -lit              cold technical bay
--ink-text / -secondary / -muted / -faint   text ramp for light rooms
--ink-edge-faint / -edge / -edge-strong
```

**`ui/Section.svelte`** gained `tone="paper|arena|claret|steel"` (the four old near-black tones
still work), plus `flush` (no vertical padding) and `bleed` (content escapes the shell so a scene
can run to the viewport edge; the chapter marker stays gutter-aligned).

**The important trick:** `.section--paper` re-points `--text-primary/secondary/muted/faint`,
`--edge*`, `--signal` and `--room-bg` at the ink values. Any component written for the dark site
therefore inverts correctly inside a light room **without knowing the room changed** — `Principles`
was moved to paper by changing one attribute and every rule, label and link adapted. Use
`var(--room-bg)` instead of hardcoding a surface colour when something must sit on the room
(`TimelineTrack`'s dimension bracket does this).

**Spacing:** section padding is asymmetric (`--space-2xl` top, `--space-3xl` bottom) because the
marker carries its own space; and `styles/app.css` collapses the top padding when two sections
share a room (`.section--base + .section--base`, etc). **That collapse rule must live in global
CSS** — Svelte scopes styles per component and silently prunes a sibling combinator it cannot
statically prove, so writing it inside `Section.svelte` compiles to nothing. This was the fix for
the Team page's dead gaps.

**The colour journey now on the homepage:**

```
hero ink-blue → daily → 01 claret → 02 PAPER → 03 claret|blue split → 04 arena navy
→ 05 base → 06 steel → 07 claret → 08 PAPER → 09 claret → 10 base → footer claret
```

Two daylight rooms at 02 and 08 are what keep the page from being a dark corridor. Do not add a
third without removing one — the contrast is the whole effect.

**Scene moves used, so the next pass does not repeat them:** full-bleed photograph with the
number set into it (04), two colour fields meeting at a seam with photographs bleeding off
opposite outer edges (03), a mega numeral used as architecture (02, footer), the mark returning
oversized and cropped by a corner (footer).

---

## 35. Institutional Media & The Principal (added by the content/team pass)

**`about.protocol` is now the official Trabzonspor photograph of the signing**, used as a
full-width 21:9 band at the top of `/partners` chapter 01. Source, provenance and what the
article actually says are recorded in **`images/trabzonspor/SOURCE.txt` — read it before adding
any club media.**

**RULE — the crop is load-bearing.** The full frame is centred on an Atatürk portrait hanging
between the two signatories. The standing rule that it may never be a dominant element is why
the slot crops to a band below it, keeping both signatories, both flags and the table. Do not
"fix" that crop back to a fuller frame.

The article's three gallery images sit behind Cloudflare bot protection and were **not**
retrieved. Do not try to work around that — ask the team to supply them.

**The principal.** `about.principal` (`images/ministor/ministor.png`) carries Coşkun Çolak, named
in the Trabzonspor article as Trabzon Fen Lisesi's principal and visible on the left of the
signing photograph. He appears **once**, small (5.5rem), in the school block on `/partners`, as a
label plus one line. **Keep it that size.** The copy claims only what is checkable: he is the
principal, and he signed for the school.

### "Joining the team" was wrong and is gone

The Team page used to invite the public to apply. **The team is formed from inside Trabzon Merkez
Fen Lisesi, from its own students** — that CTA was untrue. It is now `team.join` → "Working with
us" / "Birlikte çalışmak", which points other teams, teachers and prospective supporters at
Contact. The contact-page channel description was corrected for the same reason. Do not
reintroduce open recruitment language.

---

## 34. Inner Pages & Press (added by the completion pass, part two)

**`layout/PageHeader.svelte` is now the room-aware opening for all five inner pages.** Props:
`tone` (same vocabulary as `Section`), `media` (a `MediaSlotId` rendered as an establishing
photograph bled to both viewport edges, replacing the hairline rule), and `figure` (a mega-scale
numeral or word set behind the statement at 5% opacity — decorative, `aria-hidden`, the `h1`
stays the only heading).

Rooms assigned, so the set reads as a family without repeating itself:

| Page | Room | Opening photograph | Figure |
|---|---|---|---|
| `/about` | paper | `about.school` | `2026` |
| `/robotics` | steel | `robotics.field` | `11919` |
| `/impact` | arena | `home.offseason.wide` | — |
| `/partners` | claret | *(none, deliberately)* | `01` |
| `/contact` | claret | *(none)* | — |

**RULE — why `/partners` has no event photography.** The Off-Season frames show a banner wall of
*event* sponsors (Fikret Yüksel Vakfı, Kılıç Grup, nova, Trabzon Gençlik ve Spor İl Müdürlüğü).
Putting any of them on a Partners page would imply they are RO6ONE partners. They are not. That
page stays typographic.

**Two systemic fixes came out of this work:**

1. **The header goes dark over light rooms.** It floats transparently until you scroll, which
   left light-on-light nav on any page opening in paper. `styles/app.css` re-points the ramp via
   `body:has(.page-header.room--paper) .header:not(.header--scrolled)`. Same principle as the
   rooms: invert the ramp, not each element.
2. **Empty media apertures are room-aware.** `MediaFrame`'s empty state hardcoded
   `--surface-void`, punching a black rectangle through the claret, steel and paper rooms. It now
   shades whatever room it stands in (`rgb(0 0 0 / 0.24)`).

### Press — `content/press.ts`

Ten verified outlets. **Read that file's header comment before touching anything press-related.**
The load-bearing fact: **none of these articles names RO6ONE or 11919** — they credit
"Trabzonspor and Trabzon Merkez Fen Lisesi". The site therefore says *the event* was covered,
never that the team was, and `impact.coverage.note` says so out loud.

The treatment is **not** article cards. `syndicated: true` marks outlets that ran the shared
agency wire (`"Robotlar spor salonunda yarıştı"`) rather than original reporting, and the section
is built on that distinction: original reporting set at heading scale, wire pickups set small and
packed. The point is that the identical story ran in Gaziantep, Mersin and Karabük — cities with
no connection to Trabzon. No reach, impression or audience figure appears, because none is known.

**Do not repeat the school page's "official FMS and field systems" claim.** It is on the MEB page,
but FIRST terminology is not something to inherit from a third party (§18).

---

## 31. Exact Current File Map

Verified by inspection at handoff time.

### Homepage scenes
| Purpose | Path |
|---|---|
| Homepage composition | `src/routes/+page.svelte` |
| Today's date (Istanbul) + dev `?date=` | `src/routes/+page.server.ts` |
| **Hero ("First Light")** | `src/lib/components/sections/Hero.svelte` |
| Birthday / daily record band | `src/lib/components/sections/DailySignal.svelte` |
| **People (drifting columns)** | `src/lib/components/sections/MemberStream.svelte` |
| 02 Origin + timeline | `src/lib/components/sections/Origin.svelte` |
| 03 STEAMFest | `src/lib/components/sections/SteamFest.svelte` |
| 04 Off-Season | `src/lib/components/sections/OffSeason.svelte` |
| 05 #11919 band | `src/lib/components/ui/Monolith11919.svelte` |
| 06 Disciplines / the machine | `src/lib/components/sections/Disciplines.svelte` |
| 07 Engineering the organization | `src/lib/components/sections/SystemChapter.svelte` |
| 08 Principles | `src/lib/components/sections/Principles.svelte` |
| 09 Trabzonspor / school | `src/lib/components/sections/Institutional.svelte` |
| 10 Contact CTA | `src/lib/components/sections/ContactCta.svelte` |

### UI primitives / layout
`ui/Section.svelte` (chapter wrapper: index/label/tone/rule) · `ui/Portrait.svelte` ·
`ui/MediaFrame.svelte` (image or designed empty aperture) · `ui/ActionLink.svelte` ·
`ui/EmptyState.svelte` · `ui/Seo.svelte` · `ui/LanguageSwitcher.svelte` · `ui/OrgNetwork.svelte` ·
`ui/TimelineTrack.svelte` · `ui/HeroLightCanvas.svelte` *(orphaned)* ·
`layout/Header.svelte` (logo lockup + nav + language + Contact) · `layout/Footer.svelte` *(old)* ·
`layout/MobileMenu.svelte` (native `<dialog>`) · `layout/PageHeader.svelte` (inner-page opening).

### Data / content
`content/roster.ts` (49 students + 2 mentors, portraits, birthdays, grades, tags) · `content/signal.ts` ·
`content/site.ts` (identity, emails, socials, mark, ogImage) · `content/media.ts` (14 media slots,
merges generated event manifest) · `content/events.ts` · `content/timeline.ts` ·
`content/organization.ts` · `content/departments.ts` · `content/navigation.ts` ·
`content/partners.ts` · `content/projects.ts` · `content/localized.ts` · `content/members.ts` *(old,
superseded)* · `content/generated/{member,event}-media.json` *(generated)*.

### Styles / i18n / infra
`styles/tokens.css` · `styles/app.css` · `actions/reveal.ts` · `i18n/{index,context.svelte}.ts` +
`i18n/dictionaries/{en,tr}.ts` · `src/hooks.server.ts` · `src/app.html` (`%ro6one.lang%`, favicon,
apple-touch-icon) · `Dockerfile` · `compose.yml` · `.dockerignore` · `.env.example` · `README.md` ·
`docs/hero-v1.md` (documents the *old* canvas hero material — now historical).

### Media slot ids (in `content/media.ts`)
`home.origin.workshop` · `home.steamfest.court` ✅ · `home.steamfest.lab` ✅ · `home.offseason.wide` ·
`home.offseason.detail` · `home.offseason.people` · `about.school` ✅ · `about.protocol` ·
`team.group` · `team.infrastructure` · `robotics.build` · `robotics.detail` ·
`impact.steamfest.wide` ✅ · `impact.offseason.stands` — ✅ = has a real image; the rest render designed
apertures and each carries a `need:` note describing the photograph wanted.

### Screenshot tool — `scripts/shoot.mjs`

```bash
node scripts/shoot.mjs <url> <outDir> [--w 1440] [--h 900] [--at 0,900,el:.selector]
                       [--wait 4000] [--motion] [--full] [--js "expr"] [--label name]
```

Drives `/usr/bin/google-chrome` headless over the DevTools Protocol using Node's built-in
`WebSocket` — **no Playwright/Puppeteer, nothing added to `package.json`**. `--at` accepts pixel
offsets **or** `el:.css-selector`. `--js` runs an expression before capture (used to click a domain
panel and a member to shoot the focus state). Animations are frozen by default; `--motion` keeps them
running for entrance capture. It forces `scroll-behavior: auto` because the site's smooth scrolling
made long jumps land in the wrong place.

Then **`Read` the PNG** — that is how a Claude session actually sees the page.

---

## 32. How To Continue In A New Claude Session

1. **Read this entire file first.**
2. `git status` and `git status -sb` — expect branch `main`, HEAD `e4aee90`, 0 ahead/0 behind, and a
   large set of **uncommitted** modifications and untracked files. **Do not revert, stash or commit them.**
3. `git diff --stat` and skim the diff to understand the active pass.
4. **Do not assume GitHub HEAD is the current work.** Local changes are the live design pass.
5. Read the actual source before changing anything — several architectures have existed across passes,
   and only the repo tells you which one is here.
6. Start the site: `npm run dev` (add `-- --port 5199` if you want a fixed port).
7. **For any visual task, render and look**: `node scripts/shoot.mjs http://localhost:5173/ <out> --at 0 --wait 4000 --motion`,
   then `Read` the PNG. Iterate: implement → render → screenshot → criticise → change → render again.
   Never judge a design from CSS alone.
8. **Rescan `images/members/`** at the start and again before finishing — photos arrive between sessions.
   Never trust "37 real / 14 placeholders" without checking.
9. Check whether `images/ekip/` exists now. If yes, treat it as intentionally supplied team photography.
   If no, do nothing.
10. Keep the Off-Season Drive and Google Photos URLs (§19) alive; retry ingestion.
11. Review `images/steamfest/` with contact sheets when the design needs more event imagery.
12. **Never push, deploy or tag.** Never `npm audit fix --force`.
13. Validate with the real scripts: `npm run check`, `npm run lint`, `npm run build`. All three passed
    at handoff time (`check`: 342 files, 0 errors, 0 warnings).
14. Take ownership: when the user gives a design task, implement it — do not wait to be told to start
    coding, and do not stop at a plan. Ask only when a factual ambiguity could create a false public claim.
15. Leave everything local for the user's review, and report honestly: what you changed, what you saw in
    the screenshots, what you changed *after* seeing it, and what is still weak.

### Quick answers to questions a fresh session will have

- **Can I push?** No. Never. §2.
- **What may I invent?** Nothing factual. §3.
- **Where are member photos?** `images/members/`, `<key>.jpg`, ASCII-folded lowercase name. §13/§15/§16.
- **How do placeholders work?** Generated at the member's own expected filename; replacing the file and
  re-running the script is the whole workflow. §15.
- **What crop rule?** Largest 4:5 that fits, slid to centre the person. Never zoom to equalise faces. §15.
- **How do birthdays work?** Month+day, resolved server-side in Europe/Istanbul, all matches celebrate,
  `?date=MM-DD` previews in dev only. §14.
- **Can I list Keyubu?** No. §22.
- **LinkedIn URL?** `https://www.linkedin.com/in/trabzonspor-ro6one-robotik-7095423bb/` — not a company slug.
- **Public emails?** `iletisim@ro6one.com` (general), `sponsorluk@ro6one.com` (sponsorship).
  Instagram `@ts_ro6one11919`, YouTube `@trabzonsporro6onerobotik`.
- **Can event photos be used outside their event section?** Yes — judge by what the photo shows. §20.
- **What should I work on next?** §30.
