import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import { useState } from "preact/hooks";

interface LandingPageProps {
  onOpenChat: () => void;
}

const customerLogos = [
  "Fiverr",
  "Fred Perry",
  "ElevenLabs",
  "Fulham FC",
  "Airtasker",
  "Acne Studios",
  "Foris",
  "Tomorrowland",
  "Chili Piper",
];

const productTabs = [
  {
    title: "Core",
    heading: "Simplify complex HR processes",
    description: "Automate tasks, centralize data, and scale with confidence.",
    bullets: [
      "Core HR system of record",
      "Smart workflows and approvals",
      "eSign and document management",
      "Time and attendance tracking",
      "Real-time people analytics",
    ],
    accent: "bg-[#ffd8df]",
  },
  {
    title: "Talent",
    heading: "Turn talent into your unfair advantage",
    description:
      "Drive performance, engagement, and growth at every stage of the employee journey.",
    bullets: [
      "Hiring and onboarding",
      "Performance review and calibration",
      "AI-powered company surveys",
      "Personalized learning programs",
      "Talent analytics",
    ],
    accent: "bg-[#ffe7bc]",
  },
  {
    title: "Payroll & Benefits",
    heading: "Run payroll without the pain",
    description: "Fast track payroll, ensure accuracy, and stay compliant.",
    bullets: [
      "Time tracking",
      "Benefits management",
      "Payroll integrations",
      "UK payroll",
      "US payroll",
    ],
    accent: "bg-[#d9f7df]",
  },
  {
    title: "Planning & Compensation",
    heading: "Craft a people strategy that drives business performance",
    description:
      "Plan headcount, reward talent, and unlock people-powered growth.",
    bullets: [
      "Compensation cycle workflows",
      "Customizable pay bands",
      "AI-powered pay insights",
      "Workforce scenario planning",
      "Actionable people analytics",
    ],
    accent: "bg-[#e8d7ff]",
  },
  {
    title: "Finance",
    heading: "Go from data to decision - faster",
    description:
      "Connect financial strategy to people strategy and quickly move from planning to action.",
    bullets: [
      "150+ metrics, 35+ dashboards",
      "Connected 3-statement models",
      "Headcount planning",
      "Vendor forecasting and BVAs",
      "What-if scenario planning",
    ],
    accent: "bg-[#d8f1ff]",
  },
];

const outcomes = [
  ["Return", "$2.55", "for every $1 spent."],
  ["Avoid", "$360K-$720K", "in overhead."],
  ["Save", "$15K-$30K", "on onboarding alone."],
];

const aiCards = [
  {
    title: "Productivity booster",
    description:
      "Bob helps you summarize reviews, draft feedback, and automate tasks instantly and in context.",
    color: "from-[#fdab75] to-[#ffd29c]",
  },
  {
    title: "Data analyzer",
    description:
      "Bob makes sense of messy HR data. Ask and get clear insights to act fast and smart.",
    color: "from-[#f2bcf0] to-[#fbccd0]",
  },
  {
    title: "Growth coach",
    description:
      "Bob suggests confident, clear feedback rooted in your data, values, and team culture.",
    color: "from-[#dabdfa] to-[#e5a9f7]",
  },
];

const departments = [
  ["HR", "Streamline the employee lifecycle with flexible workflows."],
  ["Finance", "Plan workforce costs with clarity and confidence."],
  ["Payroll", "Reduce payroll errors with HR-connected changes."],
  ["Business leaders", "Make faster, data-backed workforce decisions."],
  ["People managers", "Lead teams better with instant people data."],
  ["IT", "Accelerate onboarding with smart access provisioning."],
];

export function LandingPage({ onOpenChat }: LandingPageProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = productTabs[activeTabIndex];

  return (
    <main class="min-h-dvh overflow-hidden bg-[#fff8ef] text-[#3a3a37] dark:bg-zinc-950 dark:text-white">
      <section class="relative isolate overflow-hidden px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_4%,rgba(238,22,79,0.15),transparent_25%),radial-gradient(circle_at_86%_24%,rgba(255,122,89,0.22),transparent_28%),linear-gradient(180deg,#fff8ef_0%,#fffaf4_58%,#f7efe7_100%)] dark:bg-[radial-gradient(circle_at_16%_4%,rgba(238,22,79,0.2),transparent_25%),radial-gradient(circle_at_86%_24%,rgba(255,122,89,0.14),transparent_28%),linear-gradient(180deg,#09090b_0%,#18181b_58%,#111827_100%)]" />

        <header class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#ecd9d0] bg-white/75 px-5 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
          <div class="flex items-center gap-3">
            <div class="flex size-11 items-center justify-center rounded-full bg-[#60032a] text-lg font-black text-white shadow-lg shadow-[#ee164f]/20">
              hi
            </div>
            <span class="text-lg font-black tracking-tight text-[#60032a] dark:text-white">
              HiBob
            </span>
          </div>
          <nav class="hidden items-center gap-8 text-sm font-semibold text-[#5f5557] md:flex dark:text-zinc-300">
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
            class="hidden rounded-full bg-[#ee164f] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-[#ee164f]/20 transition hover:-translate-y-0.5 hover:bg-[#c70d3f] md:inline-flex"
          >
            Get a free demo
          </button>
        </header>

        <div class="mx-auto max-w-7xl px-2 pb-10 pt-16 text-center sm:pt-20">
          <p class="text-sm font-black uppercase tracking-[0.22em] text-[#60032a] dark:text-[#ff9bb7]">
            All-in-one HR, Payroll AND Finance
          </p>
          <h1 class="mx-auto mt-5 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.07em] text-[#3a3a37] sm:text-7xl lg:text-8xl dark:text-white">
            <span class="text-[#ee164f]">Loved</span> by people. Built for
            growth.
          </h1>
          <p class="mx-auto mt-6 max-w-3xl text-xl leading-8 text-[#5f5557] sm:text-2xl dark:text-zinc-300">
            The AI-powered platform that's easy to use and fast to scale.
          </p>

          <div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenChat}
              class="inline-flex min-w-56 items-center justify-center rounded-full bg-[#ee164f] px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-[#ee164f]/25 transition hover:-translate-y-0.5 hover:bg-[#c70d3f]"
            >
              Get a free demo
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              class="inline-flex min-w-56 items-center justify-center gap-2 rounded-full border-2 border-[#60032a] bg-white px-8 py-4 text-sm font-black uppercase tracking-wide text-[#60032a] transition hover:-translate-y-0.5 hover:bg-[#fff0f5] dark:bg-white/10 dark:text-white"
            >
              Watch a demo
              <Play size={17} fill="currentColor" strokeWidth={0} />
            </button>
          </div>

          <div class="mx-auto mt-12 max-w-5xl">
            <p class="text-center text-2xl text-[#60032a] dark:text-zinc-200">
              Join <strong>5,000+</strong> companies and{" "}
              <strong>1,230,343 people</strong> using HiBob right now.
            </p>
            <div class="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-black uppercase tracking-wider text-[#83143d]/80 dark:text-zinc-300">
              {customerLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>

          <div class="mx-auto mt-12 max-w-6xl rounded-[2.5rem] border border-white bg-white/70 p-4 shadow-2xl shadow-[#60032a]/10 dark:border-white/10 dark:bg-white/10">
            <div class="relative overflow-hidden rounded-[2rem] bg-[#60032a] p-5 text-left text-white">
              <div class="absolute -right-20 -top-20 size-64 rounded-full bg-[#ee164f]/50 blur-3xl" />
              <div class="absolute -bottom-24 left-20 size-64 rounded-full bg-[#ffb000]/40 blur-3xl" />
              <div class="relative grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div class="flex min-h-80 flex-col justify-between rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/15">
                  <div>
                    <p class="text-sm font-bold uppercase tracking-[0.18em] text-[#ffdce6]">
                      Homepage video
                    </p>
                    <h2 class="mt-5 text-4xl font-black tracking-tight">
                      See Bob in action
                    </h2>
                    <p class="mt-4 text-white/75">
                      A product tour styled after the HiBob hero video, built as
                      an in-page mockup for this demo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenChat}
                    class="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase text-[#60032a]"
                  >
                    <Play size={18} fill="currentColor" strokeWidth={0} />
                    Preview Bob
                  </button>
                </div>

                <div class="rounded-[1.5rem] bg-[#fff8ef] p-4 text-[#3a3a37] shadow-2xl">
                  <div class="rounded-2xl bg-white p-4 shadow-inner">
                    <div class="flex items-center justify-between border-b border-[#f1dfd6] pb-4">
                      <div class="flex items-center gap-2">
                        <span class="size-3 rounded-full bg-[#ee164f]" />
                        <span class="size-3 rounded-full bg-[#ffb000]" />
                        <span class="size-3 rounded-full bg-[#0a9977]" />
                      </div>
                      <span class="rounded-full bg-[#fff0f5] px-4 py-1 text-xs font-bold text-[#60032a]">
                        Bob AI Companion
                      </span>
                    </div>
                    <div class="grid gap-4 pt-5 md:grid-cols-3">
                      {["Core HR", "Talent", "Payroll"].map((label, index) => (
                        <div
                          key={label}
                          class="rounded-3xl bg-[#fff4e3] p-5 ring-1 ring-[#f2d9bf]"
                        >
                          <p class="text-sm font-bold text-[#83143d]">{label}</p>
                          <p class="mt-5 text-4xl font-black text-[#ee164f]">
                            {92 - index * 6}%
                          </p>
                          <p class="mt-2 text-sm text-[#5f5557]">
                            workflow health
                          </p>
                        </div>
                      ))}
                    </div>
                    <div class="mt-5 rounded-3xl bg-[#f8edf2] p-5">
                      <div class="mb-4 flex items-center justify-between">
                        <p class="font-black">People analytics</p>
                        <span class="rounded-full bg-[#d3f8d6] px-3 py-1 text-xs font-bold text-[#0a9977]">
                          Live
                        </span>
                      </div>
                      <div class="space-y-3">
                        {["Onboarding", "Retention", "Performance"].map(
                          (item, index) => (
                            <div key={item}>
                              <div class="mb-1 flex justify-between text-sm">
                                <span>{item}</span>
                                <span class="font-bold">{78 + index * 7}%</span>
                              </div>
                              <div class="h-3 rounded-full bg-white">
                                <div
                                  class="h-3 rounded-full bg-[#ee164f]"
                                  style={{ width: `${70 + index * 8}%` }}
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="platform"
        class="bg-white px-5 py-20 dark:bg-zinc-900 sm:px-8 lg:px-10"
      >
        <div class="mx-auto max-w-7xl">
          <h2 class="text-center text-5xl font-black tracking-[-0.04em] text-[#3a3a37] md:text-6xl dark:text-white">
            All-in-one HR, from hire to retire.
          </h2>

          <div class="mt-10 flex flex-wrap justify-center gap-3">
            {productTabs.map((tab, index) => (
              <button
                key={tab.title}
                type="button"
                onClick={() => {
                  setActiveTabIndex(index);
                }}
                class={`rounded-full px-5 py-3 text-sm font-black transition ${
                  activeTabIndex === index
                    ? "bg-[#60032a] text-white"
                    : "bg-[#f6eee8] text-[#60032a] hover:bg-[#f1dfd6]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div class="mt-10 overflow-hidden rounded-[2rem] bg-[#fff8ef] shadow-xl shadow-[#60032a]/10">
            <div class="grid gap-8 p-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
              <div class="flex flex-col justify-between">
                <div>
                  <div
                    class={`mb-6 inline-flex rounded-full ${activeTab.accent} px-4 py-2 text-sm font-black text-[#60032a]`}
                  >
                    {activeTab.title}
                  </div>
                  <h3 class="text-4xl font-black tracking-[-0.04em] text-[#3a3a37] md:text-5xl">
                    {activeTab.heading}
                  </h3>
                  <p class="mt-5 text-xl leading-8 text-[#5f5557]">
                    {activeTab.description}
                  </p>
                </div>

                <div class="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={onOpenChat}
                    class="rounded-full bg-[#ee164f] px-6 py-3 text-sm font-black uppercase tracking-wide text-white"
                  >
                    Get a free demo
                  </button>
                  <button
                    type="button"
                    onClick={onOpenChat}
                    class="inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm font-black text-[#60032a]"
                  >
                    Learn more
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              <div class="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div class="border-l-4 border-[#e6d0d8] pl-5">
                  {activeTab.bullets.map((bullet) => (
                    <p key={bullet} class="py-2 text-[#3a3a37]">
                      - {bullet}
                    </p>
                  ))}
                </div>
                <div class="rounded-[1.5rem] bg-white p-4 shadow-lg">
                  <div class="rounded-[1.25rem] bg-[#60032a] p-4 text-white">
                    <div class="flex items-center justify-between">
                      <span class="font-black">Bob workspace</span>
                      <Sparkles size={20} class="text-[#ffc8d7]" />
                    </div>
                    <div class="mt-6 space-y-3">
                      {activeTab.bullets.slice(0, 4).map((bullet, index) => (
                        <div
                          key={bullet}
                          class="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10"
                        >
                          <div class="flex items-center gap-3">
                            <span class="flex size-8 items-center justify-center rounded-full bg-[#ee164f] text-sm font-black">
                              {index + 1}
                            </span>
                            <span>{bullet}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#60032a] px-5 py-20 text-[#ffdbe5] dark:bg-[#240011] sm:px-8 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-center text-5xl font-black tracking-[-0.04em] text-white md:text-6xl">
            Real outcomes. Real fast.
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-center text-xl">
            Read why companies of all sizes love HiBob.
          </p>
          <div class="mt-12 grid gap-5 md:grid-cols-3">
            {outcomes.map(([label, value, copy]) => (
              <div
                key={label}
                class="rounded-[2rem] bg-white/10 p-8 text-center ring-1 ring-white/10"
              >
                <p class="text-lg">{label}</p>
                <p class="mt-3 text-5xl font-black text-white">{value}</p>
                <p class="mt-3 text-lg">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="solutions"
        class="bg-[#fff8ef] px-5 py-20 dark:bg-zinc-950 sm:px-8 lg:px-10"
      >
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-5xl font-black tracking-[-0.04em] text-[#3a3a37] md:text-6xl dark:text-white">
              Meet the Bob AI Companion.
            </h2>
            <p class="mt-5 text-xl leading-8 text-[#5f5557] dark:text-zinc-300">
              Your AI assistant securely connects to HR data to deliver sharper
              insights, clearer decisions, and faster outcomes.
            </p>
          </div>

          <div class="mt-12 grid gap-6 lg:grid-cols-3">
            {aiCards.map((card) => (
              <article
                key={card.title}
                class="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#60032a]/10 dark:bg-zinc-900"
              >
                <div class={`h-52 bg-gradient-to-br ${card.color} p-5`}>
                  <div class="h-full rounded-[1.25rem] bg-white/70 p-4">
                    <div class="h-3 w-28 rounded-full bg-[#60032a]/20" />
                    <div class="mt-6 grid gap-3">
                      <div class="h-10 rounded-2xl bg-white" />
                      <div class="h-10 rounded-2xl bg-white/80" />
                      <div class="h-10 w-2/3 rounded-2xl bg-white/60" />
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-black text-[#3a3a37] dark:text-white">
                    {card.title}
                  </h3>
                  <p class="mt-3 leading-7 text-[#5f5557] dark:text-zinc-300">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="bg-white px-5 py-20 dark:bg-zinc-900 sm:px-8 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-center text-4xl font-black tracking-[-0.03em] text-[#3a3a37] md:text-5xl dark:text-white">
            Tailored solutions by department.
          </h2>
          <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map(([title, description], index) => (
              <article
                key={title}
                class={`rounded-[1.5rem] p-6 ${
                  [
                    "bg-[#ffd8df]",
                    "bg-[#ffe7bc]",
                    "bg-[#d9f7df]",
                    "bg-[#e8d7ff]",
                    "bg-[#d8f1ff]",
                    "bg-[#f8edf2]",
                  ][index]
                }`}
              >
                <h3 class="text-2xl font-black text-[#60032a]">{title}</h3>
                <p class="mt-3 leading-7 text-[#3a3a37]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="px-5 py-20 sm:px-8 lg:px-10">
        <div class="mx-auto max-w-6xl rounded-[2.5rem] bg-[#2a0a18] bg-[radial-gradient(circle_at_80%_0%,rgba(238,22,79,0.5),transparent_30%)] px-6 py-16 text-center text-white shadow-2xl shadow-[#60032a]/20">
          <h2 class="mx-auto max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            See how HiBob helps you solve your unique business needs at scale.
          </h2>
          <p class="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            HiBob empowers managers and employees with tools for growth and
            productivity.
          </p>
          <div class="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenChat}
              class="rounded-full bg-[#ee164f] px-8 py-4 text-sm font-black uppercase tracking-wide text-white"
            >
              Get a free demo
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              class="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wide text-white"
            >
              Watch a demo
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
