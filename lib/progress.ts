import { Progress } from "./answers";

const COOKIE_NAME = "ecosona_progress";
const SEP = "|";

export function parseProgressCookie(cookieValue: string | undefined): Progress {
  if (!cookieValue) {
    return { m1: true, m2: false, m3: false, m4: false };
  }
  const parts = cookieValue.split(SEP);
  return {
    m1: parts[0] === "1",
    m2: parts[1] === "1",
    m3: parts[2] === "1",
    m4: parts[3] === "1",
  };
}

export function serializeProgress(p: Progress): string {
  return [p.m1, p.m2, p.m3, p.m4].map((b) => (b ? "1" : "0")).join(SEP);
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
