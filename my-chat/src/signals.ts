import { computed, effect, signal } from "@preact/signals";
import {
  Agent,
  type AgentMessage,
  type Client,
  type Task,
  type UserMessage,
  Workforce,
} from "@relevanceai/sdk";
import { AGENT_ID, WORKFORCE_ID } from "@/constant";

export const client = signal<Client>();
export const agent = signal<Agent>();
export const workforce = signal<Workforce>();
export const task = signal<Task>();
export const messages = signal<(AgentMessage | UserMessage)[]>([]);
export const isAgentTyping = signal(false);
export const isDarkMode = signal(
  localStorage.getItem("darkMode") === "true" ||
    (localStorage.getItem("darkMode") === "false"
      ? false
      : window.matchMedia("(prefers-color-scheme: dark)").matches),
);

export const agentName = computed(() => agent.value?.name ?? workforce.value?.name);
export const agentInitials = computed(() =>
  agentName.value
    ?.split(/\W+/)
    .slice(0, 2)
    .map((s) => s.toLocaleUpperCase().charAt(0))
    .join(""),
);
export const agentAvatar = computed(() => agent.value?.avatar);
export const agentDescription = computed(() => agent.value?.description);

type Message = AgentMessage | UserMessage;

const mergeText = (current: string, next: string) => {
  if (!current) {
    return next;
  }
  if (!next) {
    return current;
  }

  if (next === current || current.endsWith(next)) {
    return current;
  }
  if (next.startsWith(current)) {
    return next;
  }
  if (/\s$/.test(current) || /^\s|[.,!?;:)]/.test(next)) {
    return `${current}${next}`;
  }

  return `${current} ${next}`;
};

const upsertAgentMessage = (msgs: Message[], message: AgentMessage) => {
  const existingIndex = msgs.findIndex(
    (m) => m.type === "agent-message" && m.id === message.id,
  );

  if (existingIndex >= 0) {
    const copy = msgs.concat();
    message.text = mergeText(
      (copy[existingIndex] as AgentMessage).text,
      message.text,
    );
    copy.splice(existingIndex, 1, message);

    return copy;
  }

  const last = msgs.at(-1);

  if (last?.type !== "agent-message") {
    return [...msgs, message];
  }

  message.text = mergeText(last.text, message.text);
  return [...msgs.slice(0, -1), message];
};

// Persist dark mode preference
effect(() => {
  localStorage.setItem("darkMode", isDarkMode.value.toString());
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

effect(() => {
  if (client.value) {
    if (WORKFORCE_ID) {
      Workforce.get(WORKFORCE_ID, client.value).then((w) => {
        workforce.value = w;
      });
    } else if (AGENT_ID) {
      Agent.get(AGENT_ID, client.value).then((a) => {
        agent.value = a;
      });
    }
  }
});

effect(() => {
  const t = task.value;

  if (t) {
    t.addEventListener("message", ({ detail }) => {
      const { message } = detail;
      const msgs = messages.value;
      const optimistic = msgs.find(
        (m) => m.type === "user-message" && m.id === "optimistic",
      );

      if (optimistic && message.type === "user-message") {
        const i = msgs.indexOf(optimistic);
        const copy = msgs.concat();
        copy.splice(i, 1, message);

        messages.value = copy;
        isAgentTyping.value = true;
      } else {
        messages.value =
          message.type === "agent-message"
            ? upsertAgentMessage(msgs, message)
            : [...msgs, message];

        if (message.type === "agent-message") {
          isAgentTyping.value = false;
        }
      }
    });
  }

  return () => {
    t?.unsubscribe();
  };
});
