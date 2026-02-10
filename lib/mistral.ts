const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type MistralChatOptions = {
  systemPrompt: string;
  userMessage: string;
  model?: string;
};

export async function callMistralChat({
  systemPrompt,
  userMessage,
  model = "mistral-small-latest",
}: MistralChatOptions): Promise<string> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is not set");
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage },
  ];

  const res = await fetch(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 256,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mistral API error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content =
    data.choices?.[0]?.message?.content ?? "No response from Mistral.";
  return content;
}

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type MistralChatWithHistoryOptions = {
  systemPrompt: string;
  history: HistoryMessage[];
  model?: string;
};

export async function callMistralChatWithHistory({
  systemPrompt,
  history,
  model = "mistral-small-latest",
}: MistralChatWithHistoryOptions): Promise<string> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is not set");
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...history.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const res = await fetch(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 256,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mistral API error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content =
    data.choices?.[0]?.message?.content ?? "No response from Mistral.";
  return content;
}

