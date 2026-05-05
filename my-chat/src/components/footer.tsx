import type { UserMessage } from "@relevanceai/sdk";
import { SendHorizonal } from "lucide-react";
import type { SubmitEventHandler } from "preact";
import { useCallback, useRef } from "preact/hooks";
import {
  agent,
  isAgentTyping,
  isAwaitingAgentResponse,
  messages,
  task,
  workforce,
} from "@/signals";

const QUICK_ACTIONS = ["Call Me Now", "Book a Demo"] as const;

export function Footer() {
  const input = useRef<HTMLInputElement>();

  const sendMessage = useCallback(async (message: string) => {
    if (isAwaitingAgentResponse.value) {
      return;
    }

    messages.value = [
      ...messages.value,
      {
        id: "optimistic",
        type: "user-message",
        text: message,
        createdAt: new Date(),
        isAgent: () => false,
      } as UserMessage,
    ];
    isAgentTyping.value = true;
    isAwaitingAgentResponse.value = true;

    if (!workforce.value && !agent.value) {
      isAgentTyping.value = false;
      isAwaitingAgentResponse.value = false;
      return;
    }

    const t = workforce.value
      ? await workforce.value.sendMessage(message, task.value)
      : await agent.value!.sendMessage(message, task.value);
    if (task.value !== t) {
      task.value = t;
    }

    if (input.current) {
      input.current.value = "";
      input.current.focus();
    }
  }, []);

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const data = new FormData(form);
      const message = data.get("message") as string | null;
      if (!message?.trim()) {
        return;
      }

      await sendMessage(message);
    },
    [sendMessage],
  );

  return (
    <footer class="p-4 border-t border-zinc-500/25 sticky bottom-0 bg-white dark:bg-zinc-900 transition-colors">
      <div class="max-w-3xl mx-auto flex flex-wrap gap-2 mb-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            class="rounded-full border border-indigo-500/30 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 active:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-indigo-400/30 dark:bg-indigo-950 dark:text-indigo-200 dark:hover:bg-indigo-900 dark:active:bg-indigo-800"
            disabled={isAwaitingAgentResponse.value}
            onClick={() => {
              void sendMessage(action);
            }}
          >
            {action}
          </button>
        ))}
      </div>
      <form class="max-w-3xl mx-auto flex items-center gap-x-2" onSubmit={handleSubmit}>
        <input
          ref={input}
          type="text"
          placeholder="Write something..."
          class="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-full outline-indigo-500 outline-offset-3 text-zinc-800 dark:text-white dark:placeholder-zinc-400 transition-colors"
          name="message"
        />
        <button
          type="submit"
          class="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full p-3 cursor-pointer hover:bg-indigo-600 dark:hover:bg-indigo-700 active:bg-indigo-700 dark:active:bg-indigo-800 outline-indigo-500 outline-offset-3 transition-colors"
          aria-label="Send message"
        >
          <SendHorizonal size={24} strokeWidth={1.5} />
        </button>
      </form>
    </footer>
  );
}
