import Link from "next/link";
import { ModuleNav } from "./components/ModuleNav";
import { HomeModuleCards } from "./components/HomeModuleCards";

export default function HomePage() {
  return (
    <div className="container">
      <ModuleNav />

      <header className="home-hero">
        <h1 className="home-title">AI Hackathon</h1>
        <p className="home-tagline">
          Prompt engineering, injection challenges & build tracks
        </p>
        <p className="home-desc">
          Complete Module 1 to unlock the build challenges. Switch between
          Module 2 and 3 freely — no extra secret needed.
        </p>
        <Link href="/module/1" className="home-cta">
          Start with Module 1
        </Link>
      </header>

      <section className="home-section home-modules">
        <h2 className="home-section-title">Tracks</h2>
        <HomeModuleCards />
      </section>

      <section className="home-section home-tools">
        <h2 className="home-section-title">AI tools & APIs</h2>
        <p className="home-tools-intro">
          Use free or paid AI tools. You can use the{" "}
          <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer">Mistral API</a> key.
        </p>
      </section>

      <section className="home-section home-instructions">
        <h2 className="home-section-title">Instructions & guidelines</h2>
        <ul className="home-instructions-list">
          <li>Use <strong>free or paid AI tools</strong> for your build.</li>
          <li>Include an <strong>architecture design</strong> in your submission (e.g. diagram or doc showing components, data flow, and tools).</li>
          <li>You can use the <strong>Mistral API</strong> — get your key at{" "}
            <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer">console.mistral.ai</a>.
          </li>
          <li>For vector DB: use <strong>Quadrant</strong> or other vector databases.</li>
          <li>For tool calling / web: use free options such as <strong>Trivily</strong>, <strong>Firecrawl</strong>, <strong>DuckDuckGo</strong>, etc.</li>
          <li>If you face any issue getting an API key, <strong>please let us know</strong> and we’ll help.</li>
        </ul>
      </section>

      <section className="home-section home-submission">
        <h2 className="home-section-title">Submission steps</h2>
        <ol className="home-submission-steps">
          <li>Complete your project.</li>
          <li>Push your code to <strong>GitHub</strong>.</li>
          <li>Share the link of your <strong>public repo</strong> with us.</li>
        </ol>
      </section>

      <section className="home-section home-evaluation">
        <h2 className="home-section-title">Evaluation criteria</h2>
        <ul className="home-instructions-list">
          <li><strong>Code quality</strong> will be checked.</li>
          <li><strong>Failure scenarios</strong> — how your solution handles errors and edge cases.</li>
          <li><strong>Architecture diagram</strong> — clear design showing components, data flow, and integration points.</li>
          <li><strong>Design patterns</strong> — use of appropriate patterns and structure in your code.</li>
        </ul>
      </section>
    </div>
  );
}
