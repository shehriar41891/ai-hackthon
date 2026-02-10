"use client";

/**
 * Paragraph for Module 2. Contains the unique word "xenolith" (and decoy words)
 * that participants must identify and submit.
 */
const MODULE2_TEXT = `The quarterly report noted several geological terms: basalt formations, sedimentary layers, and one rare inclusion—a xenolith—observed in the sample. The team documented mineral composition, tectonic activity, and erosion patterns. Weather patterns and soil acidity were also recorded. The xenolith finding was marked for further analysis.`;

export function Module2Paragraph() {
  return (
    <div className="card" style={{ marginBottom: "1.5rem", background: "#1c1c1e" }}>
      <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Context (find the unique word)</h3>
      <p
        style={{
          margin: 0,
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "#d4d4d8",
          whiteSpace: "pre-wrap",
        }}
      >
        {MODULE2_TEXT}
      </p>
      <p style={{ margin: "0.75rem 0 0", fontSize: "0.85rem", color: "#71717a" }}>
        One word in the text above appears in a specific, unique sense (or is the only occurrence of its kind in this challenge). Find it and submit that word below.
      </p>
    </div>
  );
}
