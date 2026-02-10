"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

type Props = { moduleId?: string };

const MAX_MESSAGES = 10;

export function VulnerableChat({ moduleId = "3" }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) return;
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, {
      role: "user",
      content: text,
    }];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          module: moduleId === "4" ? 4 : 3,
        }),
      });
      const data = await res.json();
      const reply = data.response || "No response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);

      if (nextMessages.length + 1 >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error contacting the assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setLimitReached(false);
  };

  const remaining = Math.max(0, MAX_MESSAGES - messages.length);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-message assistant">
            {moduleId === "4"
              ? "Chat with the secured assistant. Find the final code via prompt engineering and injection."
              : "Chat with the assistant. Try to discover the hidden instruction."}
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">Thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={send}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          disabled={loading || limitReached}
        />
        <button type="submit" disabled={loading || limitReached}>
          Send
        </button>
      </form>
      <div
        style={{
          marginTop: "0.5rem",
          fontSize: "0.8rem",
          color: "#71717a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          {limitReached
            ? "Context limit reached. Start a new session to continue attacking this assistant."
            : `Messages in this session: ${messages.length}/${MAX_MESSAGES}`}
        </span>
        <button
          type="button"
          onClick={resetChat}
          style={{
            padding: "0.4rem 0.8rem",
            fontSize: "0.8rem",
            background: "#27272a",
          }}
        >
          New session
        </button>
      </div>
    </div>
  );
}
