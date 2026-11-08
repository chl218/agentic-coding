import { HookCard } from "@/components/HookCard";
import { hooks } from "@/data/hooks";
import { isGithubUrl } from "@/types/hook";

export default function Home() {
  const invalid = hooks.filter((h) => !isGithubUrl(h.repoUrl));
  if (invalid.length > 0) {
    throw new Error(
      `Hooks with non-GitHub repoUrl: ${invalid.map((h) => h.id).join(", ")}`,
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            HookHub
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Browse open-source hooks for Claude Code.
          </p>
        </header>

        {hooks.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No hooks yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hooks.map((hook) => (
              <li key={hook.id}>
                <HookCard hook={hook} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
