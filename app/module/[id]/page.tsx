import { notFound } from "next/navigation";
import { ModuleNav } from "@/app/components/ModuleNav";
import { ModuleContent } from "@/app/components/ModuleContent";

const MODULES: Record<
  string,
  { title: string; subtitle: string; description: string; inputLabel: string; hasChat?: boolean }
> = {
  "1": {
    title: "Module 1: Find the code",
    subtitle: "Prompt injection & prompt engineering",
    description:
      "Chat with MCS Gatekeeper, the security assistant. It has a hidden secret code that it is explicitly told not to reveal. Use your prompt injection skills to make it leak the code anyway. Once you obtain the secret code, submit it below to unlock Module 2 and go to the next round.",
    inputLabel: "Secret code",
    hasChat: false,
  },
  "2": {
    title: "Module 2: Find the unique word",
    subtitle: "Extraction",
    description:
      "A paragraph or log contains one unique word (or phrase) that doesn't appear elsewhere in the challenge set. Craft a prompt that makes the model return only that word. Submit the unique word below to unlock Module 3.",
    inputLabel: "Unique word or phrase",
    hasChat: false,
  },
  "3": {
    title: "Module 3: Prompt injection awareness",
    subtitle: "Discover the hidden instruction",
    description:
      "Use the chatbot below. It has a fixed system prompt and accepts your input. Your goal is to discover a specific hidden instruction (e.g. a secret phrase the model will reveal under the right conditions). Craft user messages to make the model reveal it, then submit that phrase to unlock Module 4.",
    inputLabel: "Secret phrase the model revealed",
    hasChat: true,
  },
  "4": {
    title: "Module 4: Combined challenge",
    subtitle: "Code + injection",
    description:
      "The model has a secret code that is only revealed under a very specific prompt. The system prompt tries to resist revealing it. Use prompt engineering and injection concepts to get the model to output the final code. Submit it below to complete the track.",
    inputLabel: "Final code",
    hasChat: true,
  },
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const moduleInfo = MODULES[id];
  if (!moduleInfo) notFound();

  return (
    <div className="container">
      <ModuleNav />
      <ModuleContent
        moduleId={id}
        title={moduleInfo.title}
        subtitle={moduleInfo.subtitle}
        description={moduleInfo.description}
        inputLabel={moduleInfo.inputLabel}
        hasChat={moduleInfo.hasChat ?? false}
      />
    </div>
  );
}
