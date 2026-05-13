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
export const isAwaitingAgentResponse = signal(false);
export const connectionError = signal<string>();
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

const OPTIMISTIC_MESSAGE_ID = "optimistic";
const AGENT_RESPONSE_IDLE_MS = 750;
let agentResponseIdleTimeout: ReturnType<typeof setTimeout> | undefined;

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

const toAgentMessage = (message: Message, text = message.text || "") =>
  ({
    id: message.id,
    type: "agent-message",
    text,
    createdAt: message.createdAt || new Date(),
    isAgent: () => true,
  }) as AgentMessage;

const upsertAgentMessage = (msgs: Message[], message: AgentMessage) => {
  const existingIndex = msgs.findIndex(
    (m) => m.type === "agent-message" && m.id === message.id,
  );

  if (existingIndex >= 0) {
    const copy = msgs.concat();
    const text = mergeText(
      (copy[existingIndex] as AgentMessage).text,
      message.text,
    );
    copy.splice(existingIndex, 1, toAgentMessage(message, text));

    return copy;
  }

  const last = msgs.at(-1);

  if (last?.type !== "agent-message") {
    return [...msgs, message];
  }

  return [
    ...msgs.slice(0, -1),
    toAgentMessage(message, mergeText(last.text, message.text)),
  ];
};

const findOptimisticMessage = (msgs: Message[]) =>
  msgs.find(
    (m): m is UserMessage =>
      m.type === "user-message" && m.id === OPTIMISTIC_MESSAGE_ID,
  );

const replaceOptimisticMessage = (msgs: Message[], message: UserMessage) => {
  const optimistic = findOptimisticMessage(msgs);

  if (!optimistic) {
    return msgs;
  }

  const copy = msgs.concat();
  copy.splice(msgs.indexOf(optimistic), 1, message);

  return copy;
};

const finalizeOptimisticMessage = (msgs: Message[]) => {
  const optimistic = findOptimisticMessage(msgs);

  if (!optimistic) {
    return msgs;
  }

  const copy = msgs.concat();
  copy.splice(msgs.indexOf(optimistic), 1, {
    ...optimistic,
    id: `local-${optimistic.createdAt.getTime()}`,
    isAgent: () => false,
  } as UserMessage);

  return copy;
};

const hasUserMessage = (msgs: Message[], message: UserMessage) =>
  msgs.some(
    (m) =>
      m.type === "user-message" &&
      m.id !== OPTIMISTIC_MESSAGE_ID &&
      m.text === message.text,
  );

const markAgentResponseChunkReceived = () => {
  isAgentTyping.value = false;

  if (agentResponseIdleTimeout) {
    clearTimeout(agentResponseIdleTimeout);
  }

  agentResponseIdleTimeout = setTimeout(() => {
    isAwaitingAgentResponse.value = false;
    agentResponseIdleTimeout = undefined;
  }, AGENT_RESPONSE_IDLE_MS);
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
      Workforce.get(WORKFORCE_ID, client.value)
        .then((w) => {
          workforce.value = w;
          connectionError.value = undefined;
        })
        .catch((error) => {
          console.error("Failed to load workforce", error);
          connectionError.value = "Unable to connect to the workforce.";
        });
    } else if (AGENT_ID) {
      Agent.get(AGENT_ID, client.value)
        .then((a) => {
          agent.value = a;
          connectionError.value = undefined;
        })
        .catch((error) => {
          console.error("Failed to load agent", error);
          connectionError.value = "Unable to connect to the agent.";
        });
    } else {
      connectionError.value =
        "Missing VITE_WORKFORCE_ID or VITE_AGENT_ID configuration.";
    }
  }
});

effect(() => {
  const t = task.value;

  if (t) {
    t.addEventListener("message", ({ detail }) => {
      const { message } = detail;
      const msgs = messages.value;
      const optimistic = findOptimisticMessage(msgs);

      if (
        optimistic &&
        message.type === "user-message" &&
        message.text === optimistic.text
      ) {
        messages.value = replaceOptimisticMessage(msgs, message);
        isAgentTyping.value = true;
        isAwaitingAgentResponse.value = true;

        return;
      }

      if (message.type === "user-message" && hasUserMessage(msgs, message)) {
        return;
      }

      const nextMessages = optimistic ? finalizeOptimisticMessage(msgs) : msgs;
      const shouldRenderAsAgent =
        message.type === "agent-message" ||
        isAwaitingAgentResponse.value ||
        optimistic ||
        nextMessages.at(-1)?.type === "agent-message";

      if (shouldRenderAsAgent) {
        messages.value = upsertAgentMessage(nextMessages, toAgentMessage(message));
        markAgentResponseChunkReceived();
      } else {
        messages.value = [...nextMessages, message];
      }
    });
  }

  return () => {
    t?.unsubscribe();
  };
});
