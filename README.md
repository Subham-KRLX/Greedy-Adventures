# Greedy Adventures — Sea View Skydiving Prototype

Take-home prototype featuring a responsive experience page, an assistant-ui guide powered by Google Gemini (with deterministic mock fallback), dynamic PDF generation, and a backend knowledge inspector.

> **Verification status:** Gemini integration is implemented, but production redeployment and a successful live-model response have not yet been verified. Mock mode is available. Do not interpret the presence of an API key or the "Live AI" header as proof that a model request succeeded; inspect the individual response mode and trace.

[Live Demo](https://greedy-adventures-zeta.vercel.app/) · [Knowledge View](https://greedy-adventures-zeta.vercel.app/knowledge) · [Original Experience](https://www.greedyadventures.com/experiences/sea-view-skydiving)

---

## 1. Setup & Quick Start

Use Node.js 22.17+ or Node.js 24 with npm.

```sh
npm ci
npm run dev      # Serves http://localhost:3000
npm test         # Runs 11 automated unit tests
npm run typecheck # Checks TypeScript without emitting files
npm run build    # Production Next.js build
npm start        # Serves the production build
```

### Environment Variables (Optional)
To enable live AI generation via **Google Gemini 2.5 Flash**, add a valid key to the gitignored `.env.local` file. On Vercel, save it as a Production Secret and redeploy. Keep the key server-side and never prefix it with `NEXT_PUBLIC_` or commit it to GitHub.
```env
GEMINI_API_KEY=your_key_here
```
*If omitted, the app runs out-of-the-box in deterministic mock mode with zero configuration.*

Stop the development server before running `npm start` on the same port. Model availability and any free quota depend on the provider account; confirm access before incurring costs.

---

## 2. Sources & Media

Public information was captured from the [Sea View Skydiving page](https://www.greedyadventures.com/experiences/sea-view-skydiving) on **30 October 2026** (`src/lib/knowledge.ts`).

- **PDF (`/api/brochure`):** Dynamically generated with `pdf-lib`, clearly labelled as *“Demo material - Not an official offer”*.
- **Video & Images:** Streams official dropzone footage and photos from Cloudflare R2 storage.
- **Experience Sections:** Faithfully models the public page with 5 alternating plan steps, 3-column details grid, and interactive Good to Know FAQ accordion with active scroll-spy navigation.
- **Unavailable Files:** Requests for unsupported documents (insurance, medical waivers, receipts) are refused without substitute files.

---

## 3. Agent Flow

```text
User Question (thread history)
  └─► POST /api/chat
        ├─► Zod Validation (3,000 char & 150KB limits)
        ├─► Media Intent Analyzer (detects PDF / Video / Both / None)
        └─► Provider Router:
              ├─► GEMINI_API_KEY present: Grounded Google Gemini 2.5 Flash
              └─► Absent / Network Error: Deterministic Rule Fallback
  └─► assistant-ui renders answer + source link + interactive media cards
```

- **Follow-up Memory:** History travels with each request to resolve context (e.g. asking about *VIP*, then *ECO*, then *"How much does it cost?"* remembers *ECO*).
- **Privacy:** Chats persist only in browser memory during the active session; nothing is saved to a database.

---

## 4. How to Open the Knowledge View

Access `/knowledge` via:
1. Direct URL: [`/knowledge`](https://greedy-adventures-zeta.vercel.app/knowledge)
2. Navbar: Click the **≡** menu icon → **Guides and Stories**
3. Chat: Click **“View sources & backend activity”** at the bottom of the chat panel
4. Footer: Click **Knowledge Base**

**Features:** Read-only view of public passages, media registry, and an interactive tester showing the raw backend JSON trace (`modelCalled`, `model`, `sourceText`, `selectedMedia`) with a simulated 503 error toggle.

---

## 5. Verification & Testing

Run the automated test suite covering all required prompts, follow-up memory, and fallback behavior:
```sh
npm test    # 11 unit tests in tests/chat.test.ts (<200ms)
```

### Repeatable Checks
- **Text Only**: *"What is included in the package?"* → Inclusions text, no attachments.
- **PDF Delivery**: *"Can you send me a brochure?"* → Attaches PDF card with open/download button.
- **Video Delivery**: *"Can I see a video of the experience?"* → Attaches video card with watch link.
- **Both Formats**: *"Send me the brochure and a video."* → Attaches both cards simultaneously.
- **Follow-up Memory**: *"Tell me about VIP"*, then *"What about ECO?"*, then *"How much does it cost?"* → Correctly resolves ECO (THB 9,500).
- **Missing Information**: *"What is the weight limit?"* or *"Send the insurance PDF"* → Refuses unlisted policies/files without hallucinating.
- **Backend Trace & Failure**: On [`/knowledge`](https://greedy-adventures-zeta.vercel.app/knowledge), inspect live model activity or toggle *"Simulate backend failure"* to test 503 error handling.

---

## 6. Limitations & AI Assistance

- **Limitations:** Experiential prototype only; does not include payments, real booking checkout, or user accounts. Grounded knowledge is based on the 30 October 2026 snapshot. Gemini free-tier has a 15 RPM limit, supported by automatic mock fallback.
- **Credits:** Built with `@assistant-ui/react` (MIT), `pdf-lib` (MIT), and `lucide-react` (ISC). Typography from Google Fonts; media from Greedy Adventures.
- **AI Assistance:** Antigravity / Google DeepMind tools were used for implementation, testing, and documentation assistance. All code and architectural decisions have been verified and understood for technical interview defense.
