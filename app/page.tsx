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
        <h2 className="home-section-title">Free AI tools & APIs</h2>
        <p className="home-tools-intro">
          Use any free AI tools you can — for example{" "}
          <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer">Mistral</a>.
        </p>
      </section>
    </div>
  );
}
