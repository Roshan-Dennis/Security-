<div align="center">

# CyberSec Academy

### Master Cybersecurity with CompTIA Security+ (SY0-701)

**An interactive learning platform — animated diagrams, real-time 3D visualisations, attack walkthroughs, hands-on labs and exam-style practice.**

*Created by **Roshan Dennis** — Cybersecurity Research & Learning Platform*

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-4fdcff?style=flat-square)](https://pages.github.com/)
[![React](https://img.shields.io/badge/React-18-4fdcff?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r169-3ddc97?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ffb547?style=flat-square)](./LICENSE)

</div>

---

## Overview

Most Security+ material sits at one of two extremes: flashcards that teach you to recognise an answer without
understanding it, or thousand-page references nobody finishes. **CyberSec Academy** takes the middle path.

Every topic explains the concept in plain language, renders it as a diagram you can step through, shows how it fails in
the real world, walks through the attack an adversary would actually run, lists the tools practitioners use, links
straight to the primary sources, and finishes with exam-style questions that explain *why* each distractor is wrong.

It is a fully static front end — no backend, no accounts, no tracking. Progress is stored locally in the browser.

| | |
| --- | --- |
| **48** interactive topics | across all five SY0-701 domains |
| **140+** exam-style questions | every answer explained |
| **48** animated diagrams | hover to isolate, step through stage by stage |
| **8** Three.js scenes | globe, lock, firewall, malware, cloud, network, radar, shield |
| **8** lab scenarios | phishing triage, log analysis, alert triage |
| **65** glossary terms · **6** cheat sheets | plus Markdown exports |
| **190+** primary source links | NIST, MITRE, OWASP, CISA, IETF, Microsoft, AWS, Google |

---

## Features

### Learning experience
- **Seven-part topic structure** — simple explanation → interactive diagram → real-world example → attack scenario →
  security tools → deep-dive research → quiz + exam tip.
- **Data-driven diagram engine** — each topic declares nodes and edges; a custom SVG renderer lays them out, animates
  packets along bezier connectors, supports hover isolation and stage-by-stage stepping.
- **Real-time 3D scenes** built on Three.js, with capped pixel ratio, `IntersectionObserver` pausing when off-screen,
  and a static single-frame fallback for `prefers-reduced-motion`.
- **Cybersecurity Lab Simulator** — realistic artefacts (headers, authentication logs, EDR alerts) to triage as safe,
  suspicious or malicious, each with a full analyst breakdown and red-flag list.
- **Progress tracking** — completed topics, per-domain coverage rings, bookmarks and best quiz scores, persisted to
  `localStorage`.

### Platform
- Command-palette search (`⌘K` / `Ctrl+K` / `/`) across topics, domains, glossary and cheat sheets.
- Dark cybersecurity theme with a full light mode, glassmorphism surfaces and an ambient grid backdrop.
- Fully responsive, keyboard navigable, with skip-to-content and reduced-motion support.
- Markdown exports: study plan, glossary and the cheat-sheet bundle.

---

## Curriculum

| # | Domain | Weight | Topics |
| - | ------ | ------ | ------ |
| 1 | General Security Concepts | 12% | CIA triad · AAA · authentication factors & MFA · access control models · non-repudiation · encryption · hashing · PKI & certificates · zero trust · security controls · change management |
| 2 | Threats, Vulnerabilities & Mitigations | 22% | Threat actors · malware taxonomy · ransomware · social engineering · password attacks · network attacks · application attacks · vulnerability management (CVE/CVSS/KEV) · penetration testing · threat intelligence & IoCs · MITRE ATT&CK |
| 3 | Security Architecture | 18% | Network architecture · secure protocols & ports · cloud security · virtualisation & containers · IoT/ICS/OT · data protection · resilience & high availability · identity federation & SSO · secure development lifecycle |
| 4 | Security Operations | 28% | Incident response · SIEM & log analysis · SOC operations · firewalls · IDS/IPS/NDR · EDR/XDR · digital forensics · hardening & baselines · email security (SPF/DKIM/DMARC) · automation & SOAR |
| 5 | Security Program Management | 20% | Risk management · governance & policy · third-party risk · compliance & privacy · audits & assessments · security awareness · business continuity & disaster recovery |

---

## Tech stack

| Layer | Choice | Why |
| ----- | ------ | --- |
| Framework | **React 18** + **TypeScript** (strict) | Every topic conforms to one `Topic` interface, so the UI can never drift from the content |
| Build | **Vite 5** | Fast dev server, optimised static output, manual chunking for Three.js and Framer Motion |
| Styling | **Tailwind CSS 3** | Design tokens for the dark command-centre theme plus a complete light mode |
| 3D | **Three.js r169** | Hand-written scenes with explicit geometry/material disposal on unmount |
| Motion | **Framer Motion 11** | Scroll reveals, diagram choreography, layout transitions |
| Routing | **React Router 6** (`HashRouter`) | Deep links work on GitHub Pages with no server rewrite rules |
| Icons | **lucide-react** | Bundled via a generated explicit-import map so only used icons ship |

### Architecture notes
- **Content is data, not markup.** `src/data/topics/domain*.ts` contain typed `Topic` objects. Adding a topic requires
  no component changes.
- **The diagram engine is generic.** `src/components/Diagram.tsx` consumes a `DiagramSpec` (columns + edges) and handles
  layout, bezier routing, SMIL packet animation, hover isolation and stepping.
- **Icons are tree-shaken.** `npm run icons` scans the content for `icon:` references and regenerates
  `src/components/iconMap.ts` with explicit named imports.
- **Tested without a browser.** Two suites: an SSR render pass over every route and every topic, and a jsdom client
  mount that executes the real bundle and fails on any runtime or console error.

---

## Project structure

```
cybersec-academy/
├── .github/workflows/       # CI + GitHub Pages deployment
├── public/                  # static assets (.nojekyll for Pages)
├── scripts/
│   ├── gen-icons.mjs        # generates the tree-shakeable icon map
│   ├── smoke.tsx            # SSR smoke test — every route, every topic, data integrity
│   └── dom-smoke.mjs        # jsdom client mount — catches runtime errors
├── src/
│   ├── components/
│   │   ├── Brand.tsx        # logo + wordmark
│   │   ├── Diagram.tsx      # data-driven animated SVG diagram engine
│   │   ├── Layout.tsx       # nav, mobile menu, theme toggle, footer
│   │   ├── Quiz.tsx         # exam-style quiz with explanations
│   │   ├── Scene3D.tsx      # Three.js scene renderer (8 variants)
│   │   ├── SearchPalette.tsx# ⌘K command palette
│   │   ├── UI.tsx           # Section, Reveal, Stat, ProgressRing
│   │   └── iconMap.ts       # generated
│   ├── data/
│   │   ├── topics/domain1..5.ts
│   │   ├── domains.ts  glossary.ts  cheatsheets.ts  labs.ts  index.ts
│   ├── lib/
│   │   ├── store.tsx        # theme, progress, bookmarks, quiz scores
│   │   └── tone.ts          # semantic colour tokens
│   ├── pages/               # Home, Domains, TopicPage, Labs, Glossary,
│   │                        # CheatSheets, Progress, Resources, About, NotFound
│   ├── types.ts             # the content model
│   ├── App.tsx  main.tsx  index.css
├── tailwind.config.js  vite.config.ts  tsconfig.json  vercel.json
```

---

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/<your-username>/cybersec-academy.git
cd cybersec-academy
npm install
npm run dev          # http://localhost:5173
```

### Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type check, then produce an optimised static build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript strict check, no emit |
| `npm test` | Type check + SSR route/content tests + jsdom client mount test |
| `npm run icons` | Regenerate the icon map after adding new `icon:` values to content |

---

## Deployment

### Option A — GitHub Pages (automated, recommended)

1. Push this repository to GitHub with `main` as the default branch.
2. Go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` type checks, tests, builds with the correct
   `BASE_PATH`, and publishes.
4. The site appears at `https://<your-username>.github.io/<repo-name>/`.

The app uses `HashRouter`, so every deep link works on Pages without custom rewrite rules.

### Option B — Vercel

```bash
npm i -g vercel
vercel            # preview deployment
vercel --prod     # production
```

Vercel auto-detects Vite; `vercel.json` adds caching and security headers. Leave `BASE_PATH` unset — the site is served
from the domain root.

### Option C — any static host

```bash
npm run build     # outputs dist/
```

Upload `dist/` to Netlify, Cloudflare Pages, S3 + CloudFront, or any static web server.

> **Base path:** `vite.config.ts` reads `BASE_PATH` (default `/`). For a GitHub Pages *project* site set it to
> `/<repo-name>/` — the deploy workflow does this automatically. For a user site (`<username>.github.io`) or any custom
> domain, leave it as `/`.

---

## Adding or editing content

Every topic is a typed object. To add one:

1. Append a `Topic` to the relevant file in `src/data/topics/`.
2. Give it a unique `slug`, a `domain` (1–5), a `diagram` whose edge `from`/`to` match node `id`s, at least two tools,
   three research links and two quiz questions.
3. Run `npm run icons` if you referenced a new lucide icon name.
4. Run `npm test` — the suite validates slugs, diagram edge integrity, quiz answer indices, link protocols and that the
   page renders.

Nothing else needs to change: navigation, search, progress tracking, the domain pages and the exports all derive from
the data.

---

## Accessibility & performance

- Semantic landmarks, skip-to-content link, focus-visible rings, ARIA labels on all icon-only controls.
- Full keyboard navigation including the command palette (`↑` `↓` `↵` `esc`).
- `prefers-reduced-motion` disables CSS animation and renders 3D scenes as a single static frame.
- WebGL failures degrade gracefully — the surrounding UI is unaffected.
- Route-level code splitting; Three.js and Framer Motion are separate cacheable chunks.

---

## Credits & disclaimer

**Created by Roshan Dennis — Cybersecurity Research & Learning Platform.**

Content is written from primary sources including NIST Special Publications, MITRE ATT&CK, OWASP guidance, CISA
advisories, IETF RFCs and vendor documentation, with direct links throughout so every claim can be verified.

This is an independent educational project. It is **not affiliated with, endorsed by, or sponsored by CompTIA**.
CompTIA and Security+ are trademarks of CompTIA, Inc. Exam objectives change — always cross-check against the current
official objectives before sitting the exam. Offensive tooling referenced in the content is industry standard and must
only ever be used against systems you are explicitly authorised to test.

Licensed under the [MIT License](./LICENSE).
