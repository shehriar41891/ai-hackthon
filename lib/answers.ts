/**
 * Server-side answer configuration.
 * In production, use env vars or hashes; here we use plain strings for the hackathon.
 */

export const MODULE_ANSWERS: Record<string, string> = {
  module1: process.env.MODULE1_ANSWER ?? "ECOSONA-7X9K",
  module2: process.env.MODULE2_ANSWER ?? "xenolith",
  module3: process.env.MODULE3_ANSWER ?? "UNLOCK-READY",
  module4: process.env.MODULE4_ANSWER ?? "ECOSONA-FINAL-42",
};

export function checkAnswer(moduleId: string, userAnswer: string): boolean {
  const key = `module${moduleId}`;
  const expected = MODULE_ANSWERS[key];
  if (!expected) return false;
  return userAnswer.trim().toLowerCase() === expected.trim().toLowerCase();
}

export type Progress = { m1: boolean; m2: boolean; m3: boolean; m4: boolean };

export const DEFAULT_PROGRESS: Progress = {
  m1: false,
  m2: false,
  m3: false,
  m4: false,
};

export function getNextModule(current: string): keyof Progress | "done" {
  switch (current) {
    case "1":
      return "m2";
    case "2":
      return "m3";
    case "3":
      return "m4";
    case "4":
      return "done";
    default:
      return "m1";
  }
}
