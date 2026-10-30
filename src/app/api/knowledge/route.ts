import { source, media } from "@/lib/knowledge";
export function GET() { return Response.json({ mode: "mock", sources: [source], media }, { headers: { "Cache-Control": "no-store" } }); }
