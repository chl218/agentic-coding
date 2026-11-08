export type HookCategory =
  | "Safety & Security"
  | "Code Quality"
  | "Testing"
  | "Git & Version Control"
  | "Notifications"
  | "Logging & Observability"
  | "Context & Session"
  | "Other";

export type HookEvent =
  | "PreToolUse"
  | "PostToolUse"
  | "UserPromptSubmit"
  | "Notification"
  | "Stop"
  | "SubagentStop"
  | "PreCompact"
  | "SessionStart"
  | "SessionEnd";

export interface Hook {
  /** Unique kebab-case slug, used as the React key. */
  id: string;
  name: string;
  category: HookCategory;
  /** Plain text, 1–2 sentences. */
  description: string;
  /** Must start with "https://github.com/". */
  repoUrl: string;
  event?: HookEvent;
}

export const GITHUB_URL_PREFIX = "https://github.com/";

export function isGithubUrl(url: string): boolean {
  return url.startsWith(GITHUB_URL_PREFIX);
}
