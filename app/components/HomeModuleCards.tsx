"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Progress = { m1: boolean; m2: boolean; m3: boolean };

export function HomeModuleCards() {
  const [progress, setProgress] = useState<Progress | null>(null);

  const fetchProgress = () => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => setProgress({ m1: false, m2: false, m3: false }));
  };

  useEffect(() => {
    fetchProgress();
    window.addEventListener("ecosona-progress", fetchProgress);
    return () => window.removeEventListener("ecosona-progress", fetchProgress);
  }, []);

  const module2Unlocked = progress !== null && progress.m1;
  const module3Unlocked = progress !== null && progress.m1;

  return (
    <div className="module-cards">
      <div className="module-card">
        <span className="module-card-badge">1</span>
        <h3>Find the code</h3>
        <p>Prompt injection & engineering. Get the hidden code from MCS Gatekeeper to unlock the build tracks.</p>
        <Link href="/module/1" className="module-card-link">Open Module 1 →</Link>
      </div>
      <div className={`module-card ${!module2Unlocked ? "module-card-locked" : ""}`}>
        <span className="module-card-badge">2</span>
        <h3>GitHub Repo AI Agent</h3>
        <p>Ingest repos, vectorize, search, reports & conversational UI. Real-time on push, multi-project.</p>
        {module2Unlocked ? (
          <Link href="/module/2" className="module-card-link">Open Module 2 →</Link>
        ) : (
          <span className="module-card-locked-text">Complete Module 1 to unlock</span>
        )}
      </div>
      <div className={`module-card ${!module3Unlocked ? "module-card-locked" : ""}`}>
        <span className="module-card-badge">3</span>
        <h3>Adaptive Reasoning Agent</h3>
        <p>Chatbot that adapts reasoning depth to network; custom engine, tools, native RAG.</p>
        {module3Unlocked ? (
          <Link href="/module/3" className="module-card-link">Open Module 3 →</Link>
        ) : (
          <span className="module-card-locked-text">Complete Module 1 to unlock</span>
        )}
      </div>
    </div>
  );
}
