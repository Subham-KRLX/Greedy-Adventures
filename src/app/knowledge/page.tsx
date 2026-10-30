"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { source, media } from "@/lib/knowledge";

export default function Knowledge() {
  const [data, setData] = useState<{
    sources: typeof source[];
    media: typeof media;
    liveAi?: boolean;
    model?: string | null;
    provider?: string;
  } | null>(null);
  const [question, setQuestion] = useState("Send me the brochure and a video.");
  const [trace, setTrace] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    fetch("/api/knowledge")
      .then((r) => {
        if (!r.ok) throw new Error("Could not load knowledge");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  async function test(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTrace(null);
    setError("");
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", text: question }],
          simulateFailure: fail,
        }),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error);
      setTrace(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="knowledge">
      <a href="/" className="back">
        <ArrowLeft size={16} /> Back to the experience
      </a>

      <header className="knowledge-header">
        <p className="eyebrow">BACKEND KNOWLEDGE</p>
        <h1>Behind the answers.</h1>
        <p className="notice">
          {data?.liveAi ? (
            <>
              <strong>Live AI Active (Google Gemini 2.5 Flash):</strong> Responses are dynamically generated and grounded on the public experience details below. If the API key is absent, the backend gracefully falls back to deterministic mock mode.
            </>
          ) : (
            <>
              <strong>Mock Mode:</strong> Responses use deterministic rules. No model is connected and no source text has been sent to a model. Provide <code>GEMINI_API_KEY</code> to enable live AI responses.
            </>
          )}
        </p>
      </header>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {!data && !error && <p role="status" className="loading">Loading knowledge…</p>}

      {data?.sources.map((s) => (
        <section className="knowledge-source" key={s.url}>
          <h2>{s.title}</h2>
          <a href={s.url} target="_blank" rel="noreferrer" className="source-url">
            {s.url}
          </a>
          <p className="captured">Captured: {s.capturedAt}</p>

          <div className="source-sections-list">
            {s.sections.map((c) => (
              <div key={c.id} className="knowledge-section-card">
                <h3>{c.id}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="knowledge-material">
        <h2>Available material</h2>
        <div className="material-list">
          {data?.media.map((m) => (
            <div key={m.id} className="knowledge-media-item">
              <a href={m.url} target="_blank" rel="noreferrer">
                {m.title}
              </a>
              <span className="dot">·</span>
              <span className="badge">{m.kind.toUpperCase()}</span>
              <span className="dot">·</span>
              <span className="desc">{m.demo ? "Demo content" : "Public website media"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="knowledge-tester">
        <h2>Run a test question</h2>
        <form onSubmit={test} className="trace-form">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            value={question}
            maxLength={3000}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={fail}
              onChange={(e) => setFail(e.target.checked)}
            />
            Simulate backend failure
          </label>
          <button className="button lime" disabled={loading}>
            {loading ? "Running…" : "Inspect backend response"}
          </button>
        </form>

        {trace !== null && (
          <pre aria-label="Actual backend response">{JSON.stringify(trace, null, 2)}</pre>
        )}
      </section>
    </main>
  );
}
