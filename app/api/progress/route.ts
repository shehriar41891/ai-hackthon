import { NextRequest, NextResponse } from "next/server";
import { parseProgressCookie } from "@/lib/progress";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get("ecosona_progress")?.value;
  const progress = parseProgressCookie(cookieValue);
  return NextResponse.json(progress);
}
