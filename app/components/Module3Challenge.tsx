"use client";

export function Module3Challenge() {
  return (
    <div className="module-challenge">
      <section className="challenge-section challenge-intro">
        <h3>The Goal</h3>
        <p>
          Build a chatbot that adjusts <em>how</em> it reasons, not <em>what</em> it answers.
        </p>
      </section>

      <section className="challenge-section challenge-twist">
        <h3>The Twist</h3>
        <p>
          The agent senses network conditions and dynamically switches its reasoning depth:
        </p>
        <ul className="challenge-list inline-list">
          <li><strong>Slow connection</strong> → fast, efficient thinking</li>
          <li><strong>Strong connection</strong> → deeper analysis</li>
        </ul>
        <p className="challenge-note">Answer quality stays constant. Only the reasoning path changes.</p>
      </section>

      <section className="challenge-section">
        <h3>Custom Reasoning Engine</h3>
        <p>Design your own reasoning logic with multiple modes:</p>
        <div className="requirement-grid">
          <div className="requirement-card">Fast response (single-pass reasoning)</div>
          <div className="requirement-card">Standard reasoning (step-based logic)</div>
          <div className="requirement-card">Deep reasoning (multi-step analysis)</div>
          <div className="requirement-card highlight">Auto mode — selects strategy at runtime</div>
        </div>
        <p className="restriction">No reasoning-specialized models. No agent frameworks. Logic must be self-architected using standard models only.</p>
      </section>

      <section className="challenge-section">
        <h3>Tool-Oriented Agent</h3>
        <p>The agent must intelligently route between tools:</p>
        <ul className="challenge-list tag-list">
          <li>Web search (shallow vs deep retrieval)</li>
          <li>Document creation (PDF, Word, Excel)</li>
          <li>Live datetime awareness</li>
          <li>RAG tool</li>
        </ul>
      </section>

      <section className="challenge-section">
        <h3>Native RAG Pipeline</h3>
        <p>Build a raw retrieval system:</p>
        <ul className="challenge-list">
          <li>Accept user documents</li>
          <li>Parse, chunk, and vectorize content</li>
          <li>Answer using document context + tools + web data</li>
        </ul>
        <p className="restriction">No RAG libraries. Full pipeline is yours.</p>
      </section>

      <section className="challenge-section challenge-bonus">
        <h3>Bonus</h3>
        <ul className="challenge-list tag-list">
          <li>Voice input/output</li>
          <li>Token-level streaming responses</li>
          <li>Auth-based persistent sessions</li>
          <li>Clean, functional UI</li>
        </ul>
      </section>

      <p className="challenge-why">
        <strong>Why this challenge?</strong> Real-world AI doesn’t run on perfect networks. This tests whether your agent can stay smart under constraints — adapting its thinking without sacrificing outcomes.
      </p>
    </div>
  );
}
