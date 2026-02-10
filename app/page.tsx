import Link from "next/link";
import { ModuleNav } from "./components/ModuleNav";

export default function HomePage() {
  return (
    <div className="container">
      <ModuleNav />
      <div className="card">
        <h1>AI Ecosona Hackathon</h1>
        <h2>Progressive prompt engineering and prompt injection challenges</h2>
        <p>
          Each module is gated by solving the previous one. Find the secret
          code or phrase to unlock the next challenge.
        </p>
        <p>
          <Link href="/module/1">
            <strong>Start with Module 1</strong>
          </Link>
        </p>
      </div>
      <div className="card">
        <h2>Modules</h2>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>
            <strong>Module 1:</strong> Prompt injection & prompt engineering —
            use injection techniques to get the hidden code and move to the
            next round.
          </li>
          <li>
            <strong>Module 2:</strong> Extraction — find the unique word in
            context.
          </li>
          <li>
            <strong>Module 3:</strong> Prompt injection awareness — discover
            the hidden instruction.
          </li>
          <li>
            <strong>Module 4:</strong> Combined — code + injection to get the
            final code.
          </li>
        </ul>
      </div>
    </div>
  );
}
