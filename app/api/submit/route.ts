import { NextRequest, NextResponse } from "next/server";
import { checkAnswer, getNextModule } from "@/lib/answers";
import {
  parseProgressCookie,
  serializeProgress,
  progressCookieOptions,
} from "@/lib/progress";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { module: moduleId, answer } = body as { module: string; answer: string };

  if (!moduleId || answer === undefined) {
    return NextResponse.json(
      { error: "Missing module or answer" },
      { status: 400 }
    );
  }

  const validModules = ["1"];
  if (!validModules.includes(moduleId)) {
    return NextResponse.json({ error: "Invalid module" }, { status: 400 });
  }

  const cookieValue = request.cookies.get("ecosona_progress")?.value;
  const progress = parseProgressCookie(cookieValue);

  const currentKey = `m${moduleId}` as keyof typeof progress;
  if (moduleId !== "1") {
    return NextResponse.json(
      { error: "Only Module 1 requires a secret to unlock." },
      { status: 400 }
    );
  }

  const correct = checkAnswer(moduleId, answer);
  if (!correct) {
    return NextResponse.json({ correct: false, message: "Incorrect." });
  }

  const next = getNextModule(moduleId);
  const newProgress = { ...progress, [currentKey]: true };
  const serialized = serializeProgress(newProgress);

  const res = NextResponse.json({
    correct: true,
    nextModule: 2,
    complete: false,
  });
  res.cookies.set("ecosona_progress", serialized, progressCookieOptions());
  return res;
}
