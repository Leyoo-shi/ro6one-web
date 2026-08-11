# RO6ONE Robotics — website

The official site for **RO6ONE Robotics**, FIRST Robotics Competition team **#11919**, Trabzon,
Türkiye. Built with SvelteKit 2 (Svelte 5, runes), server-rendered, deployed as a Node container
behind a reverse proxy.

---

## Quick start

```bash
npm ci
```

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`.

---

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Development server with HMR                       |
| `npm run check`   | `svelte-kit sync` + `svelte-check` (types + a11y) |
| `npm run lint`    | Prettier check + ESLint                           |
| `npm run format`  | Rewrites files with Prettier                      |
| `npm run build`   | Production build into `build/` (adapter-node)     |
| `npm run preview` | Serves the production build locally               |

Before pushing:

```bash
npm run check && npm run lint && npm run build
```

---

## Production deployment (Docker)

The app is packaged as a small Node image and expects a reverse proxy (Nginx, Caddy, Traefik) in
front of it for TLS and the public domain.

```
Internet → 80/443 reverse proxy (TLS, ro6one.com) → 127.0.0.1:3000 → container:3000
```

### Deploy

```bash
docker compose up -d --build
```

### Status, logs, stop

```bash
docker compose ps
```

```bash
docker compose logs -f
```

```bash
docker compose down
```

### Update after a git pull

```bash
git pull && docker compose up -d --build
```

### Ports

| Where            | Port                                                    |
| ---------------- | ------------------------------------------------------- |
| Inside container | `3000` (`HOST=0.0.0.0`)                                 |
| On the host      | `127.0.0.1:3000` by default — override with `HOST_PORT` |

The host binding defaults to localhost on purpose: the container should not be reachable from the
internet directly. Set `HOST_BIND=0.0.0.0` only if you know you want that.

### Health check

The image has a `HEALTHCHECK` that requests `/healthz` with Node's built-in `fetch` (no curl, no
extra packages). The same route is useful for proxy or uptime probes.

---

## Environment variables

Nothing secret is required to run the site. See [`.env.example`](.env.example).

| Variable          | Default                 | Purpose                                                         |
| ----------------- | ----------------------- | --------------------------------------------------------------- |
| `HOST`            | `0.0.0.0`               | Interface adapter-node binds to (must stay `0.0.0.0` in Docker) |
| `PORT`            | `3000`                  | Port inside the container                                       |
| `ORIGIN`          | `https://ro6one.com`    | Public origin; must match what the proxy serves                 |
| `PROTOCOL_HEADER` | `x-forwarded-proto`     | Trust the proxy's scheme                                        |
| `HOST_HEADER`     | `x-forwarded-host`      | Trust the proxy's host                                          |
| `PUBLIC_SITE_URL` | falls back to `site.ts` | Canonical + Open Graph URLs                                     |
| `HOST_BIND`       | `127.0.0.1`             | Host interface Compose publishes on                             |
| `HOST_PORT`       | `3000`                  | Host port Compose publishes on                                  |

### Reverse proxy notes

Forward these headers so SvelteKit builds correct URLs and sees real client addresses:

```
proxy_set_header Host              $host;
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
```

The app sends `Vary: Accept-Language` when a visitor has not chosen a language yet, so a caching
proxy will not serve Turkish HTML to an English visitor.

---

## Languages (EN / TR)

Localization is built in — visitors never need Google Translate.

```
src/lib/i18n/
├── index.ts                 locale list, cookie name, Accept-Language parsing
├── context.svelte.ts        reactive locale holder, provided by the root layout
└── dictionaries/
    ├── en.ts                source of truth — its shape defines the Dictionary type
    └── tr.ts                typed against en.ts, so nothing can go missing
```

How it resolves, per request: **cookie choice → `Accept-Language` → English.** This happens in
`src/hooks.server.ts`, which also stamps `<html lang>`, so the first server-rendered paint is
already correct for search engines and screen readers.

Switching language in the header is instant: it updates reactive state and writes the
`ro6one_locale` cookie — no reload, no navigation, and the choice survives the next visit.

**Editing copy:** all visible strings live in the two dictionary files. In components they are read
as `i18n.t.<section>.<key>`.

**Adding a language:** copy `dictionaries/en.ts`, translate it, then add the code to `locales`,
`dictionaries` and `localeMeta` in `src/lib/i18n/index.ts`. TypeScript will list anything missing.
Write copy, don't translate word-for-word — the Turkish text intentionally differs in structure
from the English.

---

## Where to add real content

Content lives in data files, separate from the components that render it. Nothing is invented in
these files: they start empty on purpose, and the pages render honest "being prepared" states until
the team fills them in.

| File                             | Contains                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| `src/lib/content/site.ts`        | Team identity, season label, **contact email**, social links |
| `src/lib/content/members.ts`     | Team roster (`/team`) — names, roles, photos                 |
| `src/lib/content/projects.ts`    | Robots, prototypes, tools (`/robotics`)                      |
| `src/lib/content/partners.ts`    | Partners and the sponsorship document (`/partners`)          |
| `src/lib/content/departments.ts` | The list of disciplines (names/descriptions live in i18n)    |
| `src/lib/content/navigation.ts`  | Header, mobile menu and footer navigation                    |

Open items are marked `TODO(team)` / `TODO(design)` in those files. The most important one is
`site.contact.email` — until it is set, the contact form stays disabled and says so.

---

## Project structure

```
src/
├── app.html                 %ro6one.lang% is replaced per request
├── hooks.server.ts          locale resolution + Vary header
├── lib/
│   ├── actions/reveal.ts    scroll-reveal (skips anything already on screen)
│   ├── components/
│   │   ├── layout/          Header, MobileMenu, Footer, PageHeader
│   │   ├── sections/        Hero + the home page chapters
│   │   └── ui/              Section, ActionLink, EmptyState, Seo, LanguageSwitcher
│   ├── content/             data, no markup
│   ├── i18n/                dictionaries and locale runtime
│   └── styles/
│       ├── tokens.css       colour, type scale, spacing, motion — edit here first
│       └── app.css          reset, base type, layout primitives, reveal contract
└── routes/                  / about robotics impact team partners contact
                             + healthz, sitemap.xml, +error.svelte
```

### Design system

Every colour, size, easing and duration is a custom property in
[`src/lib/styles/tokens.css`](src/lib/styles/tokens.css). Component styles reference the tokens
rather than literal values, so the whole site can be retuned from that one file.

No webfont is loaded: the type stack is system UI, which gives complete Turkish glyph coverage at
zero network cost. To adopt a self-hosted family later, change `--font-sans` in that file.

### The hero

The hero background is a custom Canvas surface, not an image or a CSS gradient — see
[`docs/hero-v1.md`](docs/hero-v1.md) for how the lighting model works and how to tune it.

---

## Adapter

`@sveltejs/adapter-node`, output in `build/`, started with `node build`. SSR is required (the
request locale is resolved server-side), so the site is not prerendered and `npm run dev` must
never be used as the production server.
