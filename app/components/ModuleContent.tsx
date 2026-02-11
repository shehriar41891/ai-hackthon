"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Module1PromptBox } from "./Module1PromptBox";
import { Module2Challenge } from "./Module2Challenge";
import { Module3Challenge } from "./Module3Challenge";

type Progress = { m1: boolean; m2: boolean; m3: boolean };

type Props = {
  moduleId: string;
  title: string;
  subtitle: string;
  description: string;
  inputLabel: string;
  hasChat: boolean;
  hint?: string;
};

export function ModuleContent({
  moduleId,
  title,
  subtitle,
  description,
  inputLabel,
  hasChat,
  hint,
}: Props) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlockedNext, setUnlockedNext] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => setProgress({ m1: false, m2: false, m3: false }));
  }, [message]);

  const num = Number(moduleId);
  const canAccess =
    num === 1 || (num >= 2 && progress !== null && progress.m1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: moduleId, answer: answer.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong",
        });
        return;
      }
      if (data.correct) {
        setMessage({ type: "success", text: "Correct! Module unlocked." });
        setUnlockedNext(data.nextModule ?? null);
        setComplete(data.complete ?? false);
        setAnswer("");
        window.dispatchEvent(new Event("ecosona-progress"));
      } else {
        setMessage({ type: "error", text: data.message || "Incorrect." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setLoading(false);
    }
  };

  if (progress && !canAccess) {
    return (
      <div className="card">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p className="blocked">
          Complete the previous module first to unlock this one.
        </p>
        <p>
          <Link href={num > 1 ? `/module/${num - 1}` : "/"}>
            Go to Module {num > 1 ? num - 1 : "home"}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      {moduleId === "2" ? (
        <Module2Challenge />
      ) : moduleId === "3" ? (
        <Module3Challenge />
      ) : (
        <p>{description}</p>
      )}

      {hint && (
        <div style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => setHintOpen((o) => !o)}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.9rem",
              background: hintOpen ? "#30363d" : "#21262d",
              border: "1px solid #30363d",
              borderRadius: "6px",
              color: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            {hintOpen ? "Hide hint" : "Hint"}
          </button>
          {hintOpen && (
            <div
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem 1rem",
                background: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "6px",
                fontSize: "0.9rem",
                color: "#8b949e",
              }}
            >
              {hint}
            </div>
          )}
        </div>
      )}

      {moduleId === "1" && <Module1PromptBox />}

      {moduleId === "1" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="answer" style={{ display: "block", marginBottom: "0.5rem" }}>
            {inputLabel}
          </label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking…" : "Submit"}
          </button>
        </form>
      )}

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {unlockedNext && !complete && (
        <p style={{ marginTop: "1rem" }}>
          <Link href={`/module/${unlockedNext}`}>Go to Module {unlockedNext}</Link>
        </p>
      )}

      {complete && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Track complete!</strong> <Link href="/">Back to home</Link>
        </p>
      )}
    </div>
  );
}
