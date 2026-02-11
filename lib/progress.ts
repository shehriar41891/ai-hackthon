import { Progress } from "./answers";

const COOKIE_NAME = "ecosona_progress";
const SEP = "|";

const DEFAULT_PROGRESS: Progress = { m1: false, m2: false, m3: false };

export function parseProgressCookie(cookieValue: string | undefined): Progress {
  if (!cookieValue || typeof cookieValue !== "string" || cookieValue.trim() === "") {
    return { ...DEFAULT_PROGRESS };
  }
  const parts = cookieValue.split(SEP);
  if (parts.length !== 3) {
    return { ...DEFAULT_PROGRESS };
  }
  return {
    m1: parts[0] === "1",
    m2: parts[1] === "1",
    m3: parts[2] === "1",
  };
}

export function serializeProgress(p: Progress): string {
  return [p.m1, p.m2, p.m3].map((b) => (b ? "1" : "0")).join(SEP);
}

export function progressCookieOptions(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}
