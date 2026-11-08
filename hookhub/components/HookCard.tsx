import type { Hook } from "@/types/hook";

export function HookCard({ hook }: { hook: Hook }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        {hook.name}
      </h2>
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
          {hook.category}
        </span>
        {hook.event && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {hook.event}
          </span>
        )}
      </div>
      <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>
      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${hook.name} on GitHub (opens in a new tab)`}
        className="mt-auto self-start rounded text-sm font-medium text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-300"
      >
        View on GitHub →
      </a>
    </article>
  );
}
