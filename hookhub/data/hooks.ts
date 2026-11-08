import type { Hook } from "@/types/hook";

const KARANB192 = "https://github.com/karanb192/claude-code-hooks/tree/main/plugins";
const NORMFUL = "https://github.com/normful/claude-code-curated-hooks/blob/main";

// Hand-curated from the source repos (verified 2026-11-08).
export const hooks: Hook[] = [
  {
    id: "block-dangerous-commands",
    name: "Block Dangerous Commands",
    category: "Safety & Security",
    description:
      "Blocks dangerous shell commands like rm -rf ~, fork bombs, curl | sh and force pushes to main before they run, with three safety levels.",
    repoUrl: `${KARANB192}/block-dangerous-commands`,
    event: "PreToolUse",
  },
  {
    id: "protect-secrets",
    name: "Protect Secrets",
    category: "Safety & Security",
    description:
      "Denies tool calls that would read, modify or exfiltrate .env files, SSH keys, cloud credentials or keystores.",
    repoUrl: `${KARANB192}/protect-secrets`,
    event: "PreToolUse",
  },
  {
    id: "git-safety",
    name: "Git Safety",
    category: "Git & Version Control",
    description:
      "Branch-aware git guardrails: denies pushes to main/master, protected-branch deletion, and destructive gh CLI actions.",
    repoUrl: `${KARANB192}/git-safety`,
    event: "PreToolUse",
  },
  {
    id: "auto-stage",
    name: "Auto Stage",
    category: "Git & Version Control",
    description:
      "Runs git add on every file Claude edits or writes, so git status always shows exactly what Claude touched.",
    repoUrl: `${KARANB192}/auto-stage`,
    event: "PostToolUse",
  },
  {
    id: "protect-tests",
    name: "Protect Tests",
    category: "Testing",
    description:
      "Stops \"fake green\" test-gaming by blocking the agent from deleting, renaming away, or skipping tests, so it fixes the code instead.",
    repoUrl: `${KARANB192}/protect-tests`,
    event: "PreToolUse",
  },
  {
    id: "format-code",
    name: "Format Code",
    category: "Code Quality",
    description:
      "Auto-formats files as soon as Claude writes them: ruff for Python, prettier for JS/TS/JSON/Markdown/YAML/HTML.",
    repoUrl: `${KARANB192}/format-code`,
    event: "PostToolUse",
  },
  {
    id: "gofmt-then-goimports",
    name: "gofmt then goimports",
    category: "Code Quality",
    description:
      "A one-liner hook that runs gofmt and goimports on Go files after Claude edits them.",
    repoUrl: `${NORMFUL}/one-liners/gofmt-then-goimports.sh`,
    event: "PostToolUse",
  },
  {
    id: "notify-permission",
    name: "Notify Permission",
    category: "Notifications",
    description:
      "Posts a Slack card to your webhook when Claude Code needs you for a permission, idle or choice prompt.",
    repoUrl: `${KARANB192}/notify-permission`,
    event: "Notification",
  },
  {
    id: "macos-desktop-notification",
    name: "macOS Desktop Notification",
    category: "Notifications",
    description:
      "A Python hook, built on the cchooks library, that shows a macOS desktop notification when Claude Code sends a notification.",
    repoUrl: `${NORMFUL}/py-hooks/macos_desktop_notification.py`,
    event: "Notification",
  },
  {
    id: "session-logger",
    name: "Session Logger",
    category: "Logging & Observability",
    description:
      "Keeps a durable markdown log of every session (cwd, repo, files touched, secret-redacted bash commands), written async so it never blocks Claude.",
    repoUrl: `${KARANB192}/session-logger`,
  },
  {
    id: "context-hogs",
    name: "Context Hogs",
    category: "Context & Session",
    description:
      "A per-file context-cost leaderboard that attributes each tool result's tokens to the files it loaded.",
    repoUrl: `${KARANB192}/context-hogs`,
    event: "PostToolUse",
  },
  {
    id: "dead-end-registry",
    name: "Dead End Registry",
    category: "Context & Session",
    description:
      "Remembers approaches you tried and reverted, and warns before Claude retries them.",
    repoUrl: `${KARANB192}/dead-end-registry`,
    event: "UserPromptSubmit",
  },
];
