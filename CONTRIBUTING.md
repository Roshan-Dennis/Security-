# Contributing

Thanks for your interest in improving CyberSec Academy.

## Getting set up

```bash
npm install
npm run dev
npm test        # run before every commit
```

## Content changes

Topics live in `src/data/topics/domain1.ts` … `domain5.ts` and conform to the `Topic` interface in `src/types.ts`.

A good topic:

- explains the concept in plain language before using any jargon;
- has a `diagram` whose edges reference real node ids and tell a story left to right;
- includes a real-world example that explains *why it matters commercially*, not just what it is;
- describes the attack at a conceptual level, always paired with mitigations;
- cites primary sources — NIST, MITRE, OWASP, CISA, IETF, vendor docs — not blog summaries;
- has quiz questions where the distractors are plausible and the explanation says why they are wrong.

Run `npm run icons` if you introduce a new lucide icon name, then `npm test`.

## Code changes

- TypeScript strict mode; no `any`.
- Keep components presentational and drive everything from the typed content model.
- Respect `prefers-reduced-motion` in anything animated.
- Icon-only controls need an `aria-label`.

## Commit messages

Conventional style, imperative mood:

```
feat(content): add DNS security topic to domain 3
fix(diagram): correct bezier routing for back edges
docs(readme): document BASE_PATH for project sites
```
