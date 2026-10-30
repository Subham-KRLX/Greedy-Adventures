import { source, media } from "@/lib/knowledge";

export function GET() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const liveAi = Boolean(apiKey);

  return Response.json(
    {
      mode: liveAi ? "gemini" : "mock",
      liveAi,
      model: liveAi ? "gemini-2.5-flash" : null,
      provider: liveAi ? "Google Gemini (Free Tier)" : "Deterministic Mock Engine",
      sources: [source],
      media,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
