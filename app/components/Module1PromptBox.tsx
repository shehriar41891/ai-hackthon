"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 10;

export function Module1PromptBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) return;
    const prompt = input.trim();
    if (!prompt || loading) return;

    const nextMessages: Message[] = [...messages, {
      role: "user",
      content: prompt,
    }];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/simulate-m1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history: nextMessages }),
      });
      const data = await res.json();
      const reply = data.response ?? "No response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);

      // After adding assistant reply, enforce max 10-message context window
      if (nextMessages.length + 1 >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error calling the simulator." },
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
    <div className="chat-container" style={{ marginBottom: "1.5rem" }}>
      <p
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.9rem",
          color: "#a1a1aa",
        }}
      >
        Chat with MCS Gatekeeper about the challenge. Use this conversation to
        explore how the assistant behaves. You can send up to {MAX_MESSAGES}{" "}
        messages in one session.
      </p>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-message assistant">
            MCS Gatekeeper: Hello! How can I assist you with the hackathon
            today?
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "MCS Gatekeeper"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">Thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask MCS Gatekeeper anything related to the challenge…"
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
            ? "Context limit reached. Start a new session to continue experimenting."
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
