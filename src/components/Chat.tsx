"use client";
import { useEffect, useRef, useState } from "react";
import { AssistantRuntimeProvider, useLocalRuntime, ThreadPrimitive, ComposerPrimitive, MessagePrimitive, useAuiState, type ChatModelAdapter } from "@assistant-ui/react";
import { ArrowUp, X, MessageCircle, FileText, Play, ExternalLink } from "lucide-react";
import type { answerChat } from "@/lib/chat";
type Answer = ReturnType<typeof answerChat>;
function Message() {
  const message = useAuiState(s => s.message);
  const data = message.metadata.custom?.answer as Answer | undefined;
  return <MessagePrimitive.Root className={`message ${message.role}`}><small>{message.role === "user" ? "YOU" : "ADVENTURE GUIDE · MOCK"}</small><MessagePrimitive.Parts />{data?.media.map(m => <div className="media-item" key={m.id}>{m.kind === "pdf" ? <FileText size={22}/> : <Play size={22}/>}<div><strong>{m.title}</strong><small>{m.demo ? "Demo material" : "Website video"}</small><a href={m.url} target="_blank" rel="noreferrer">{m.kind === "pdf" ? "Open / download PDF" : "Watch video"} <ExternalLink size={13}/></a></div></div>)}{data?.sources.map(s => <a className="source-link" key={s.url} href={s.url} target="_blank" rel="noreferrer">Source: Sea View Skydiving <ExternalLink size={12}/></a>)}<MessagePrimitive.Error /></MessagePrimitive.Root>;
}
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const panel = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const adapter: ChatModelAdapter = { async run({ messages, abortSignal }) {
    setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, signal: abortSignal, body: JSON.stringify({ messages: messages.filter(m => m.role === "user" || m.role === "assistant").map(m => ({ role: m.role, text: m.content.filter(p => p.type === "text").map(p => p.text).join("\n") })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to reach the guide.");
      return { content: [{ type: "text", text: data.text }], metadata: { custom: { answer: data } } };
    } catch (e) { if (!abortSignal.aborted) setError(e instanceof Error ? e.message : "Connection failed. Please retry."); throw e; }
  } };
  const runtime = useLocalRuntime(adapter);
  useEffect(() => { if (open) panel.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus(); }, [open]);
  const close = () => { setOpen(false); toggle.current?.focus(); };
  return <AssistantRuntimeProvider runtime={runtime}><button ref={toggle} className="chat-toggle" aria-expanded={open} aria-controls="adventure-guide" onClick={() => setOpen(!open)}><MessageCircle size={21}/> Ask your adventure guide</button><section hidden={!open} ref={panel} id="adventure-guide" className="chat-panel" aria-label="Adventure guide" onKeyDown={e => { if(e.key === "Escape") close(); }}><header><div><strong>Your adventure guide</strong><small>Mock mode · no live AI connected</small></div><button className="icon" aria-label="Close chat" onClick={close}><X/></button></header><ThreadPrimitive.Root className="thread"><ThreadPrimitive.Viewport className="transcript"><ThreadPrimitive.Empty><h3>A little curiosity.<br/>A big adventure.</h3><p>Explore packages or ask for a brochure and video.</p><div className="suggestions">{["What is included in the package?", "Send me the brochure and a video."].map(q => <ThreadPrimitive.Suggestion key={q} prompt={q} send>{q}</ThreadPrimitive.Suggestion>)}</div></ThreadPrimitive.Empty><ThreadPrimitive.Messages components={{ UserMessage: Message, AssistantMessage: Message }}/><ThreadPrimitive.If running><p role="status" className="loading">Finding your answer…</p></ThreadPrimitive.If></ThreadPrimitive.Viewport>{error && <p role="alert" className="error">{error} Please send your message again.</p>}<ComposerPrimitive.Root className="composer"><ComposerPrimitive.Input placeholder="Ask about your jump…" aria-label="Message your adventure guide" maxLength={3000}/><ComposerPrimitive.Send className="icon send" aria-label="Send message"><ArrowUp/></ComposerPrimitive.Send></ComposerPrimitive.Root></ThreadPrimitive.Root><a className="knowledge-link" href="/knowledge">View sources & backend activity <ExternalLink size={12}/></a></section></AssistantRuntimeProvider>;
}
