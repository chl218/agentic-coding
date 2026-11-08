# HookHub: MVP Spec

**Status:** Draft, MVP
**App location:** `hookhub/` (Next.js 16.4.5, React 19, Tailwind v4, TypeScript)

## 1. Overview

Claude Code hooks are shared across many GitHub repositories, which makes them hard to find. HookHub puts open-source Claude hooks in one place so people can browse them.

The MVP only **displays** hooks. Each hook shows a name, a category, a description and a link to its GitHub repo, and the main page lays them out in a grid.

## 2. Background: what is a Claude hook?

A hook is a user-defined shell command that Claude Code runs automatically at a point in its lifecycle. Hooks are configured in `settings.json` (user, project or local scope). A hook can use a `matcher` to target specific tools. The matcher is case-sensitive and can be an exact name or a regex such as `Edit|Write`.

Lifecycle events:

| Event | When it fires | Typical use |
|---|---|---|
| `PreToolUse` | After Claude builds tool params, before the tool runs | Block dangerous commands, enforce policy (exit code 2 blocks) |
| `PostToolUse` | After a tool completes successfully | Auto-format, lint, run tests |
| `UserPromptSubmit` | When the user submits a prompt | Inject context, validate prompts |
| `Notification` | When Claude sends a notification | Desktop/Slack alerts |
| `Stop` / `SubagentStop` | When the main agent or a subagent finishes | Completion alerts, final checks |
| `PreCompact` | Before context compaction | Back up transcripts |
| `SessionStart` / `SessionEnd` | At session start and end | Load context, cleanup, logging |

Reference: <https://docs.claude.com/en/docs/claude-code/hooks>

Existing hook collections (sources for seed data):
- <https://github.com/karanb192/claude-code-hooks>
- <https://github.com/ithiria894/awesome-claude-code-hooks>
- <https://github.com/normful/claude-code-curated-hooks>
- <https://github.com/hesreallyhim/awesome-claude-code> (general list with a hooks section)

## 3. Goals and non-goals

### Goals (MVP)
- Show a curated list of hooks on the home page (`/`) in a responsive grid.
- Each card shows **name, category, description and GitHub link**.
- The page is fast and fully static, and it works in light and dark mode.

### Non-goals (deferred)
Search, filtering, sorting, pagination, hook submission, accounts/auth, ratings and comments, hook detail pages, live GitHub API sync, a database, and one-click installation.

## 4. Data model

```ts
// hookhub/types/hook.ts
export type HookCategory =
  | "Safety & Security"
  | "Code Quality"          // formatting, linting
  | "Testing"
  | "Git & Version Control"
  | "Notifications"
  | "Logging & Observability"
  | "Context & Session"
  | "Other";

export type HookEvent =
  | "PreToolUse" | "PostToolUse" | "UserPromptSubmit" | "Notification"
  | "Stop" | "SubagentStop" | "PreCompact" | "SessionStart" | "SessionEnd";

export interface Hook {
  id: string;            // unique kebab-case slug, used as React key
  name: string;          // display name
  category: HookCategory;
  description: string;   // 1–2 sentences, plain text
  repoUrl: string;       // must start with "https://github.com/"
  event?: HookEvent;     // optional; shown as a secondary tag if present
}
```

Rules:
- `id` is unique across the dataset.
- `repoUrl` is an `https://github.com/` URL. It can be a deep link to the file or folder that holds the hook.
- `description` is plain text, roughly 200 characters at most.

## 5. Data source

- A static, hand-curated typed array in `hookhub/data/hooks.ts` that exports `hooks: Hook[]`.
- Seed it with **8–12 real hooks** taken from the collections in §2, covering at least 4 categories. Check every entry against its repo before adding it. Do not make up hooks or URLs.
- There is no runtime fetching. The data is bundled at build time, so the page prerenders fully, which works well with `cacheComponents: true` in `next.config.ts`.

## 6. UI / UX

### Home page (`/`)
- **Header:** a "HookHub" title and a tagline, e.g. "Browse open-source hooks for Claude Code."
- **Grid** of `HookCard`s:
  - 1 column on mobile, 2 at `sm`, 3 at `lg`, 4 at `xl` (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`).
  - The order is the order of the data file.
- **Empty state:** if `hooks` is empty, show "No hooks yet."

### `HookCard`
- The name, as a heading.
- A category badge.
- The event tag, if `event` is set.
- The description, clamped to 3 lines (`line-clamp-3`).
- A "View on GitHub →" link with `target="_blank"` and `rel="noopener noreferrer"`.
- Cards in the same row have equal height, and the link sits at the bottom of the card.
- Keyboard focus is visible, link text is meaningful, and color contrast meets WCAG AA.

## 7. Technical notes

- App Router with Server Components only. The MVP ships no client components.
- **Next 16 has breaking changes.** Follow `hookhub/AGENTS.md` and read `hookhub/node_modules/next/dist/docs/` before using any Next API.
- Tailwind v4 is loaded through the Turbopack rule in `next.config.ts`, and styles live in `app/globals.css`.
- Proposed files:
  - `hookhub/types/hook.ts`: the types
  - `hookhub/data/hooks.ts`: the seed data
  - `hookhub/components/HookCard.tsx`: the card
  - `hookhub/app/page.tsx`: replace the template with the header and grid
  - `hookhub/app/layout.tsx`: update `metadata` (title "HookHub", description)

## 8. Security and operations

- Render all hook text as plain text, with no `dangerouslySetInnerHTML`.
- Only render `https://github.com/` links. Enforce this with a type-level convention and a simple check: filter out or fail the build on an invalid `repoUrl`.
- External links use `rel="noopener noreferrer"`.
- Deploy with a static `next build` (Vercel or any static host). There are no secrets and no backend.

## 9. Acceptance criteria

- [ ] `/` shows every hook in `data/hooks.ts` as a card.
- [ ] Each card shows the name, category, description and a working GitHub link.
- [ ] Links open the correct repo in a new tab.
- [ ] The grid shows 1, 2, 3 and 4 columns at the mobile, `sm`, `lg` and `xl` breakpoints.
- [ ] Light and dark mode are both readable.
- [ ] The empty state renders when the list is empty.
- [ ] `npm run lint` and `npm run build` pass in `hookhub/`.

## 10. Future work

- Search, and filtering by category or event.
- A submission flow: a PR template for `data/hooks.ts`, and later a form.
- GitHub metadata such as stars, last updated and license.
- Hook detail pages showing the `settings.json` snippet and install instructions.
- Moving data to a DB or CMS once the catalog grows.
