"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Progress = { m1: boolean; m2: boolean; m3: boolean; m4: boolean };

export function ModuleNav() {
  const [progress, setProgress] = useState<Progress | null>(null);

  const fetchProgress = () => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => setProgress({ m1: true, m2: false, m3: false, m4: false }));
  };

  useEffect(() => {
    fetchProgress();
    window.addEventListener("ecosona-progress", fetchProgress);
    return () => window.removeEventListener("ecosona-progress", fetchProgress);
  }, []);

  if (!progress) return null;

  const modules = [
    { id: 1, label: "Module 1", unlocked: progress.m1 },
    { id: 2, label: "Module 2", unlocked: progress.m2 },
    { id: 3, label: "Module 3", unlocked: progress.m3 },
    { id: 4, label: "Module 4", unlocked: progress.m4 },
  ];

  return (
    <nav className="nav">
      <Link href="/">Home</Link>
      {modules.map((m) => (
        <Link
          key={m.id}
          href={`/module/${m.id}`}
          className={m.unlocked ? "unlocked" : "locked"}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );
}
