import { requestSchema, answerChat, answerChatWithGemini } from "@/lib/chat";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 150000) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  try {
    const raw = await request.text();
    if (raw.length > 150000) {
      return Response.json({ error: "Request is too large." }, { status: 413 });
    }

    const parsed = requestSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.messages.at(-1)?.role !== "user") {
      return Response.json(
        { error: "Send a user message of up to 3,000 characters." },
        { status: 400 }
      );
    }

    if (parsed.data.simulateFailure) {
      return Response.json(
        { error: "Simulated backend failure. Please retry with failure simulation disabled." },
        { status: 503 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      try {
        const liveResult = await answerChatWithGemini(parsed.data, apiKey);
        return Response.json(liveResult, {
          headers: { "Cache-Control": "no-store" },
        });
      } catch (err) {
        console.error("Gemini call failed; gracefully falling back to deterministic mock:", err);
      }
    }

    return Response.json(answerChat(parsed.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }
}
