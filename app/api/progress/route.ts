import { NextRequest, NextResponse } from "next/server";
import { parseProgressCookie, serializeProgress, progressCookieOptions } from "@/lib/progress";
import { DEFAULT_PROGRESS } from "@/lib/answers";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get("ecosona_progress")?.value;
  const progress = parseProgressCookie(cookieValue);

  const res = NextResponse.json(progress);

  if (cookieValue && cookieValue.split("|").length !== 3) {
    res.cookies.set("ecosona_progress", serializeProgress(DEFAULT_PROGRESS), progressCookieOptions());
  }

  return res;
}
