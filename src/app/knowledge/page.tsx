"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { source, media } from "@/lib/knowledge";
export default function Knowledge() {
  const [data, setData] = useState<{sources: typeof source[];media: typeof media} | null>(null);
  const [question, setQuestion] = useState("Send me the brochure and a video.");
  const [trace, setTrace] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  useEffect(() => { fetch("/api/knowledge").then(r => { if(!r.ok) throw new Error("Could not load knowledge"); return r.json(); }).then(setData).catch(e => setError(e.message)); }, []);
  async function test(e: React.FormEvent) { e.preventDefault(); setLoading(true); setTrace(null); setError(""); try { const r = await fetch("/api/chat", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",text:question}],simulateFailure:fail})}); const result=await r.json(); if(!r.ok) throw new Error(result.error); setTrace(result); } catch(e) {setError(e instanceof Error ? e.message : "Request failed");} finally {setLoading(false);} }
  return <main className="knowledge section"><a href="/" className="back"><ArrowLeft size={17}/> Back to the experience</a><p className="eyebrow">BACKEND KNOWLEDGE</p><h1>Behind the answers.</h1><p className="notice">Mock mode. Responses use deterministic rules. No model is connected and no source text has been sent to a model. This view exposes public content and your own test result only.</p>{error && <p className="error" role="alert">{error}</p>}{!data && !error && <p role="status">Loading knowledge…</p>}{data?.sources.map(s => <section className="knowledge-source" key={s.url}><h2>{s.title}</h2><a href={s.url} target="_blank" rel="noreferrer">{s.url}</a><p>Captured: {s.capturedAt}</p>{s.sections.map(c => <div key={c.id}><h3>{c.id}</h3><p>{c.text}</p></div>)}</section>)}<h2>Available material</h2>{data?.media.map(m => <p key={m.id}><a href={m.url} target="_blank" rel="noreferrer">{m.title}</a> · {m.kind.toUpperCase()} · {m.demo ? "Demo content" : "Public website media"}</p>)}<h2>Run a test question</h2><form onSubmit={test} className="trace-form"><label htmlFor="question">Question</label><textarea id="question" value={question} maxLength={3000} required onChange={e=>setQuestion(e.target.value)}/><label><input type="checkbox" checked={fail} onChange={e=>setFail(e.target.checked)}/> Simulate backend failure</label><button className="button lime" disabled={loading}>{loading ? "Running…" : "Inspect backend response"}</button></form>{trace !== null && <pre aria-label="Actual backend response">{JSON.stringify(trace,null,2)}</pre>}</main>;
}
