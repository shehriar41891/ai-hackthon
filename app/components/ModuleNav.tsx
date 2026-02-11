"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Progress = { m1: boolean; m2: boolean; m3: boolean };

export function ModuleNav() {
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

  const modules = [
    { id: 1, label: "Module 1", unlocked: true },
    { id: 2, label: "Module 2", unlocked: progress !== null && progress.m1 },
    { id: 3, label: "Module 3", unlocked: progress !== null && progress.m1 },
  ];

  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      {modules.map((m) =>
        m.unlocked ? (
          <Link key={m.id} href={`/module/${m.id}`} className="unlocked">
            {m.label}
          </Link>
        ) : (
          <span key={m.id} className="nav-locked" aria-disabled="true">
            {m.label}
          </span>
        )
      )}
    </nav>
  );
}
