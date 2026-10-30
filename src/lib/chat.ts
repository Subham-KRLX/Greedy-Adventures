import { z } from "zod";
import { source, media } from "./knowledge";
export const requestSchema = z.object({ messages: z.array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().trim().min(1).max(3000) })).min(1).max(40), simulateFailure: z.boolean().optional() });
export type ChatRequest = z.infer<typeof requestSchema>;
export function answerChat(input: ChatRequest) {
  const users = input.messages.filter(m => m.role === "user");
  const question = users.at(-1)?.text ?? "";
  const q = question.toLowerCase();
  const previous = users.slice(0, -1).map(m => m.text).join(" ").toLowerCase();
  const previousPackage = users.slice(0, -1).reverse()
    .map(m => m.text.match(/\b(eco|deluxe|vip)\b/gi)?.at(-1)?.toUpperCase())
    .find(Boolean);
  const selected: (typeof media)[number][] = [];
  const unavailableFile = /\b(insurance|medical|refund|waiver|invoice|receipt)\b/.test(q);
  const wantsPdf = !unavailableFile && /\b(brochure|pdf|leaflet)\b/.test(q);
  const wantsVideo = !unavailableFile && /\b(video|film|clip|watch)\b/.test(q)
    && (/\b(send|show|watch|see|share|play)\b/.test(q) || !/\b(included|include|package|deluxe|vip)\b/.test(q));
  if (wantsPdf) selected.push(media[0]);
  if (wantsVideo || (!unavailableFile && /\bboth\b/.test(q) && /brochure|video/.test(previous))) {
    if (!selected.includes(media[0]) && /\bboth\b/.test(q)) selected.push(media[0]);
    selected.push(media[1]);
  }
  let ids: string[] = [];
  let text = "That information is not available in the captured experience page. Please confirm with Greedy Adventures before making plans.";
  if (selected.length) {
    text = selected.length === 2
      ? "Here are the brochure and experience video. The brochure is labelled demo material; the video is from the public experience page."
      : selected[0].kind === "pdf"
        ? "Here is the experience brochure. This PDF is demo material created for this prototype. Use the button below to open or download it."
        : "Here is the experience video from the public Sea View Skydiving page. Use the link below to watch it.";
  }
  else if (/\b(refund|cancellation|cancel|insurance|weight|age|medical|pregnant|discount|tomorrow|available|availability|booking|book|weather)\b/.test(q)) { /* Unpublished details must not be guessed. */ }
  else if (/price|cost|package|eco|deluxe|vip|included|includes|inclusion|how much/.test(q) || (/what about|that one|it cost/.test(q) && /eco|deluxe|vip|package/.test(previous))) {
    ids = ["packages", "included"];
    const chosen = q.match(/\b(eco|deluxe|vip)\b/gi)?.at(-1)?.toUpperCase()
      ?? (/\bit\b|that one/.test(q) ? previousPackage ?? "" : "");
    text = `${chosen ? `For ${chosen}: ` : "The packages are ECO (THB 9,500), DELUXE (THB 12,500) and VIP (THB 14,000) per person. "}All include a tandem jump, safety briefing, instructor support, aircraft ascent and a completion certificate. ${chosen === "ECO" ? "ECO is THB 9,500 per person, for the jump only." : chosen === "DELUXE" ? "DELUXE is THB 12,500 per person with video and photos." : chosen === "VIP" ? "VIP is THB 14,000 per person with a personal cameraman and edited film." : "DELUXE adds video and photos; VIP includes a personal cameraman and edited film."}`;
  } else if (/where|location|pickup|bangkok|address/.test(q)) { ids = ["location"]; text = source.sections[3].text; }
  else if (/high|altitude|long|duration|experience|freefall|instructor|first|beginner|training/.test(q)) { ids = ["experience"]; text = source.sections[2].text; }
  else if (/^(hi|hello|hey)[!.\s]*$/.test(q)) text = "Hello! I can help with the Sea View packages, jump details, brochure and video. What would you like to explore?";
  const context = source.sections.filter(s => ids.includes(s.id));
  return { mode: "mock" as const, text, media: selected, sources: context.length || selected.length ? [{ title: source.title, url: source.url }] : [], trace: { mode: "mock", modelCalled: false, sourceText: context, selectedMedia: selected, note: "Actual rule-based backend selection. No text was sent to a model. No conversations are stored." } };
}
