"use client";

export function Module2Challenge() {
  return (
    <div className="module-challenge">
      <section className="challenge-section challenge-intro">
        <h3>Challenge</h3>
        <p>
          Build an AI agent that can ingest a GitHub repo (public or private), understand
          everything inside it — code, issues, branches, commit history, and more — and let
          users query it intelligently.
        </p>
      </section>

      <div className="challenge-pipeline">
        <span className="pipeline-label">Pipeline</span>
        <div className="pipeline-flow">
          <span>Repo context</span>
          <span className="arrow">→</span>
          <span>vectorized</span>
          <span className="arrow">→</span>
          <span>searchable</span>
          <span className="arrow">→</span>
          <span>report generation</span>
          <span className="arrow">→</span>
          <span>conversational</span>
        </div>
      </div>

      <section className="challenge-section">
        <h3>Requirements</h3>
        <ul className="challenge-list">
          <li>
            <strong>Real time</strong> — Auto-detect every push on the repo and keep context fresh.
          </li>
          <li>
            <strong>Multiple projects</strong> — Support more than one repo or workspace.
          </li>
          <li>
            <strong>Persistent sessions</strong> — Users can return and continue where they left off.
          </li>
          <li>
            <strong>Usable UI</strong> — Clear, functional interface for querying and exploring.
          </li>
        </ul>
      </section>
    </div>
  );
}
