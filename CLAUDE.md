# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

Early-stage repo (single "first commit"; root `README.md` is just a title). Two untracked top-level directories:

- `hookhub/`: a freshly scaffolded `create-next-app` project (Next.js 16.4.5, React 19.3, Tailwind v4, TypeScript). `app/page.tsx` is still the default template. There is no application logic, test setup, or API layer yet.
- `memory/`: not code. `memory/frontend/CLAUDE.md` holds a persona/prompt for frontend work (expert web dev persona; wants `<CODE_REVIEW>` then `<PLANNING>` tags before writing code, `<SECURITY_REVIEW>` tags for security-relevant changes, small incremental changes with a test after each, asks for clarification on ambiguity, and considers operational concerns). `memory/spec/` is empty. Treat these as user-authored notes; follow the frontend one when working on `hookhub/` UI code.

## Commands (run from `hookhub/`)

```bash
npm run dev     # next dev (Turbopack)
npm run build   # next build
npm run start   # next start (after build)
npm run lint    # eslint (flat config, eslint.config.mjs, eslint-config-next)
```

No test runner is configured. Dependencies are installed (`node_modules/` present); use `npm`, since `package-lock.json` is the lockfile.

## Next.js notes

- `hookhub/AGENTS.md` warns that this Next.js version has breaking changes from what you may know. Read the relevant guide under `hookhub/node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices. Its content is auto-generated and re-added by `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`), so do not bother removing it.
- `hookhub/next.config.ts` enables non-default features: `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback: true`. `cacheComponents` changes caching and rendering semantics (dynamic data access vs. prerendered shell), so check the docs before adding data fetching.
- Tailwind v4 is wired through a Turbopack rule in `next.config.ts` (`*.css` → `@tailwindcss/turbopack` loader), not through PostCSS. Styles are in `app/globals.css`.
- App Router only (`hookhub/app/`).
