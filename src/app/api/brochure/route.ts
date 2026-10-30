import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
export async function GET() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  page.drawRectangle({ x: 0, y: 620, width: 595, height: 222, color: rgb(0.04, 0.23, 0.25) });
  const lines = ["GREEDY ADVENTURES", "SEA VIEW SKYDIVING", "DEMO BROCHURE - NOT AN OFFICIAL OFFER", "Pattaya, Thailand | Operated by Dropzone Thailand", "ECO: THB 9,500 | DELUXE: THB 12,500 | VIP: THB 14,000", "All packages: tandem jump, briefing, instructor and certificate.", "DELUXE: video and photos. VIP: personal cameraman and edited film.", "13,000 ft exit | Around 60 seconds freefall | Allow 3 hours", "Prices captured 30 October 2026. Confirm current details with the team.", "Source: greedyadventures.com/experiences/sea-view-skydiving", "Sample created for a developer assignment. No booking is confirmed."];
  lines.forEach((line, i) => page.drawText(line, { x: 36, y: i < 3 ? 785 - i * 45 : 560 - (i - 3) * 42, font, size: i === 1 ? 26 : 11, color: i < 3 ? rgb(1,1,1) : rgb(0.1,0.2,0.2) }));
  return new Response(Buffer.from(await doc.save()), { headers: { "Content-Type": "application/pdf", "Content-Disposition": "inline; filename=sea-view-demo-brochure.pdf" } });
}
