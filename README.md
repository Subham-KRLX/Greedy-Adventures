# Greedy Adventures — Sea View Skydiving Prototype

Take-home prototype featuring a responsive experience page, an assistant-ui guide powered by Google Gemini (with deterministic mock fallback), dynamic PDF generation, and a backend knowledge inspector.

[Live Demo](https://greedy-adventures-zeta.vercel.app/) · [Knowledge View](https://greedy-adventures-zeta.vercel.app/knowledge) · [Original Experience](https://www.greedyadventures.com/experiences/sea-view-skydiving)

---

## 1. Setup & Quick Start

```sh
npm ci
npm run dev      # Opens http://localhost:3000
npm test         # Runs 11 automated unit tests
npm run build    # Production Next.js build
```

### Environment Variables (Optional)
To enable live AI generation via **Google Gemini 2.5 Flash**, add your free key to `.env.local` (or in Vercel Project Settings):
```env
GEMINI_API_KEY=your_key_here
```
*If omitted, the app runs out-of-the-box in deterministic mock mode with zero configuration.*

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

## 5. Verification Checklist

| Test Prompt | Expected Result | Status |
| :--- | :--- | :---: |
| *“What is included in the package?”* | Text-only answer listing inclusions. No attachments. | ✅ Verified |
| *“Can you send me a brochure?”* | Confirms brochure; attaches PDF card with open/download button. | ✅ Verified |
| *“Can I see a video of the experience?”* | Confirms video; attaches video card with watch link. | ✅ Verified |
| *“Send me the brochure and a video.”* | Attaches both PDF and video cards simultaneously. | ✅ Verified |
| *“Tell me about VIP, then ECO, then its cost”* | Contextual follow-up correctly resolves ECO (THB 9,500). | ✅ Verified |
| *“Send the insurance PDF”* | Refuses politely; never substitutes an unrelated file. | ✅ Verified |
| *“What is the weight limit?”* | Explains unlisted detail is not in public guide; refers to team. | ✅ Verified |
| *Backend Knowledge Test* | Raw trace shows `modelCalled: true` and active model. | ✅ Verified |
| *Simulate Backend Failure* | Returns HTTP 503 error; recovers on retry. | ✅ Verified |

*Run `npm test` to execute all 11 automated unit tests.*

---

## 6. Limitations & AI Assistance

- **Limitations:** Experiential prototype only; does not include payments, real booking checkout, or user accounts. Grounded knowledge is based on the 30 October 2026 snapshot. Gemini free-tier has a 15 RPM limit, supported by automatic mock fallback.
- **Credits:** Built with `@assistant-ui/react` (MIT), `pdf-lib` (MIT), and `lucide-react` (ISC). Typography from Google Fonts; media from Greedy Adventures.
- **AI Assistance:** Antigravity / Google DeepMind tools were used for implementation, testing, and documentation assistance. All code and architectural decisions have been verified and understood for technical interview defense.
