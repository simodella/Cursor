import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

interface LandingPageProps {
  onOpenChat: () => void;
}

const highlights = [
  "Automate repetitive HR workflows",
  "Unify people data across every team",
  "Give employees instant answers",
];

const metrics = [
  ["42%", "less admin work"],
  ["3.8x", "faster employee support"],
  ["24/7", "people ops guidance"],
];

export function LandingPage({ onOpenChat }: LandingPageProps) {
  return (
    <main class="min-h-dvh overflow-hidden bg-[#fff7ef] text-slate-950 dark:bg-zinc-950 dark:text-white">
      <section class="relative isolate">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(255,122,89,0.28),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(99,102,241,0.22),transparent_30%),linear-gradient(135deg,#fff7ef_0%,#fff_46%,#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(255,122,89,0.16),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,#09090b_0%,#18181b_52%,#111827_100%)]" />

        <header class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div class="flex items-center gap-3">
            <div class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-orange-500/20 dark:bg-white dark:text-slate-950">
              po
            </div>
            <span class="text-lg font-bold tracking-tight">PeopleOS</span>
          </div>
          <nav class="hidden items-center gap-8 rounded-full border border-white/70 bg-white/70 px-6 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur md:flex dark:border-white/10 dark:bg-white/10 dark:text-zinc-300">
            <a href="#platform" class="hover:text-slate-950 dark:hover:text-white">
              Platform
            </a>
            <a href="#solutions" class="hover:text-slate-950 dark:hover:text-white">
              Solutions
            </a>
            <a href="#customers" class="hover:text-slate-950 dark:hover:text-white">
              Customers
            </a>
          </nav>
          <button
            type="button"
            onClick={onOpenChat}
            class="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 md:inline-flex dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200"
          >
            Talk to us
          </button>
        </header>

        <div class="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-16">
          <div>
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur dark:border-orange-400/20 dark:bg-white/10 dark:text-orange-200">
              <span class="size-2 rounded-full bg-orange-500" />
              Modern HR, payroll, and employee support
            </div>
            <h1 class="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              Put people work on autopilot.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
              A friendly HR platform-inspired landing page with an assistant ready
              to qualify leads, schedule demos, and answer questions from a popup
              chat.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenChat}
                class="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                Start a chat
                <MessageCircle size={20} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={onOpenChat}
                class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-4 text-base font-bold text-slate-950 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                Book a demo
                <ArrowRight size={20} strokeWidth={1.8} />
              </button>
            </div>

            <ul class="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3 dark:text-zinc-300">
              {highlights.map((highlight) => (
                <li key={highlight} class="flex items-center gap-2">
                  <CheckCircle2
                    size={18}
                    class="shrink-0 text-emerald-500"
                    strokeWidth={1.8}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div class="relative">
            <div class="absolute -left-8 top-10 hidden size-24 rounded-[2rem] bg-orange-300/70 blur-sm lg:block" />
            <div class="absolute -right-4 bottom-8 hidden size-28 rounded-full bg-indigo-300/70 blur-sm lg:block" />
            <div class="relative rounded-[2.5rem] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-white/10">
              <div class="rounded-[2rem] bg-slate-950 p-5 text-white">
                <div class="mb-8 flex items-center justify-between">
                  <div>
                    <p class="text-sm text-orange-200">People dashboard</p>
                    <h2 class="text-2xl font-bold">Employee engagement</h2>
                  </div>
                  <div class="rounded-full bg-emerald-400/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                    Live
                  </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-3">
                  {metrics.map(([value, label]) => (
                    <div
                      key={value}
                      class="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10"
                    >
                      <p class="text-3xl font-black">{value}</p>
                      <p class="mt-2 text-sm text-zinc-300">{label}</p>
                    </div>
                  ))}
                </div>

                <div class="mt-5 grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                  <div class="rounded-3xl bg-orange-400 p-5 text-slate-950">
                    <p class="text-sm font-semibold">Next best action</p>
                    <p class="mt-3 text-2xl font-black">Invite a candidate</p>
                  </div>
                  <div class="rounded-3xl bg-white p-5 text-slate-950">
                    <div class="mb-4 flex items-center justify-between">
                      <p class="font-bold">Team pulse</p>
                      <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                        +18%
                      </span>
                    </div>
                    <div class="space-y-3">
                      <div class="h-3 rounded-full bg-slate-100">
                        <div class="h-3 w-10/12 rounded-full bg-indigo-500" />
                      </div>
                      <div class="h-3 rounded-full bg-slate-100">
                        <div class="h-3 w-8/12 rounded-full bg-orange-400" />
                      </div>
                      <div class="h-3 rounded-full bg-slate-100">
                        <div class="h-3 w-9/12 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
