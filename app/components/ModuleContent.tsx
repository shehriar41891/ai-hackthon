"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VulnerableChat } from "./VulnerableChat";
import { Module1PromptBox } from "./Module1PromptBox";
import { Module2Paragraph } from "./Module2Paragraph";

type Progress = { m1: boolean; m2: boolean; m3: boolean; m4: boolean };

type Props = {
  moduleId: string;
  title: string;
  subtitle: string;
  description: string;
  inputLabel: string;
  hasChat: boolean;
};

export function ModuleContent({
  moduleId,
  title,
  subtitle,
  description,
  inputLabel,
  hasChat,
}: Props) {
  const [progress, setProgress] = useState<Progress | null>(null);
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
      .catch(() => setProgress({ m1: true, m2: false, m3: false, m4: false }));
  }, [message]);

  const num = Number(moduleId);
  const prevKey = num > 1 ? (`m${num - 1}` as keyof Progress) : null;
  const canAccess = !progress || num === 1 || (prevKey && progress[prevKey]);

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
      <p>{description}</p>

      {moduleId === "1" && <Module1PromptBox />}
      {moduleId === "2" && <Module2Paragraph />}
      {hasChat && <VulnerableChat moduleId={moduleId} />}

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
