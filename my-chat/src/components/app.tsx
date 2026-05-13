import { For, Show } from "@preact/signals/utils";
import type {
  AgentMessage as AgentMessageType,
  UserMessage as UserMessageType,
} from "@relevanceai/sdk";
import { MessageCircle, X } from "lucide-react";
import { useState } from "preact/hooks";
import { AgentMessage } from "@/components/agent-message";
import { AgentTyping } from "@/components/agent-typing";
import { EmptyState } from "@/components/empty-state";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LandingPage } from "@/components/landing-page";
import { UserMessage } from "@/components/user-message";
import { agent, isAgentTyping, messages, workforce } from "@/signals";

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const isChatReady = Boolean(agent.value || workforce.value);

  return (
    <div class="min-h-dvh overflow-hidden bg-[#fff8ef] text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <LandingPage
        onOpenChat={() => {
          setIsChatOpen(true);
        }}
      />

      {isChatOpen ? (
        <section
          class="fixed inset-x-3 bottom-24 z-50 flex h-[min(42rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-zinc-950/20 sm:inset-x-auto sm:right-6 sm:w-[27rem] dark:border-zinc-800 dark:bg-zinc-900"
          aria-label="Chat popup"
        >
          <div class="relative">
            <Header />
            <button
              type="button"
              onClick={() => {
                setIsChatOpen(false);
              }}
              class="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>
          {isChatReady ? (
            <>
              <main class="min-h-0 flex-1 overflow-y-auto bg-zinc-50 p-4 transition-colors dark:bg-zinc-950">
                <div class="mx-auto flex max-w-3xl flex-col gap-y-4">
                  <For each={messages} fallback={<EmptyState />}>
                    {(m) =>
                      m.type === "agent-message" ? (
                        <AgentMessage message={m as AgentMessageType} />
                      ) : (
                        <UserMessage message={m as UserMessageType} />
                      )
                    }
                  </For>
                  <Show when={isAgentTyping}>
                    <AgentTyping />
                  </Show>
                </div>
              </main>
              <Footer />
            </>
          ) : (
            <main class="flex min-h-0 flex-1 items-center justify-center bg-zinc-50 p-6 text-center text-sm font-medium text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
              Connecting assistant...
            </main>
          )}
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsChatOpen((open) => !open);
        }}
        class="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-[#ee164f] px-5 py-4 font-semibold text-white shadow-2xl shadow-[#60032a]/30 transition hover:-translate-y-0.5 hover:bg-[#c70d3f] focus:outline-none focus:ring-4 focus:ring-[#ff9bb7] dark:bg-[#ee164f] dark:hover:bg-[#ff3d6d]"
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        {isChatOpen ? <X size={22} /> : <MessageCircle size={22} />}
        <span class="hidden sm:inline">{isChatOpen ? "Close" : "Chat"}</span>
      </button>
    </div>
  );
}
