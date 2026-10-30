# Greedy Adventures | Sea View Skydiving

A responsive experience page with package comparison, an assistant-ui guide, PDF/video delivery and a read-only backend knowledge inspector. Built with Next.js, TypeScript and React.

[Live demo](https://greedy-adventures-zeta.vercel.app/) · [Knowledge view](https://greedy-adventures-zeta.vercel.app/knowledge) · [Original experience](https://www.greedyadventures.com/experiences/sea-view-skydiving)

> **Mock backend only.** Responses use deterministic rules, not an AI model. Model access has been requested. Live AI integration and real-model verification remain incomplete. Local changes appear on the hosted demo only after deployment.

## Quick start

Use Node.js 22.17+ or Node.js 24.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No API keys or environment variables are required for mock mode.

```sh
npm test
npm run typecheck
npm run build
npm start
```

Stop the development server before starting production on the same port. To deploy on Vercel, import the repository with the Next.js preset and repository root. Future model credentials must stay server-side, never in `NEXT_PUBLIC_` variables.

## Architecture

```text
assistant-ui conversation
  -> POST /api/chat
  -> Zod validation
  -> mock source and media selection
  -> answer + citations + media + trace
  -> React rendering
```

History travels with each request to support simple follow-ups. It stays in browser memory and clears on reload. The application does not persist conversations or expose other visitors' questions through the knowledge view.

| File | Responsibility |
| --- | --- |
| `src/app/page.tsx` | Hero, packages and experience details |
| `src/components/Chat.tsx` | assistant-ui adapter, chat controls and media |
| `src/lib/knowledge.ts` | Source excerpts, package data and media registry |
| `src/lib/chat.ts` | Input schema and mock response selection |
| `src/app/api/chat/route.ts` | Validation and response handling |
| `src/app/api/brochure/route.ts` | Demo PDF generation |
| `src/app/api/knowledge/route.ts` | Read-only source inventory |
| `src/app/knowledge/page.tsx` | Knowledge inspector and test form |
| `tests/chat.test.ts` | Media selection, fallback and follow-up tests |

## Sources and media

The [Sea View Skydiving page](https://www.greedyadventures.com/experiences/sea-view-skydiving) was captured on **30 October 2026**. Curated excerpts live in `src/lib/knowledge.ts`. There is no automatic refresh. Reconfirm prices and operational details with the operator.

- **PDF:** `/api/brochure` generates clearly labelled demo material using pdf-lib. It is not an official operator brochure.
- **Video and photography:** public assets referenced remotely from the supplied website. Ownership remains with their rights holders; availability depends on the external host.
- **Unavailable files:** unsupported insurance documents or other files must not be replaced with an unrelated brochure.

## Knowledge view

Open **Knowledge Base** in the navigation or visit `/knowledge`. The page loads source titles, URLs, capture dates, excerpts and media from `/api/knowledge`.

A test question calls the same `/api/chat` backend used by chat and shows its actual selected passages and media. In mock mode `modelCalled: false` means those passages **were not sent to a model**. The failure checkbox deliberately returns HTTP 503 to test error handling. It does not simulate a real provider integration or show other users' conversations.

## Verification

Run the commands above, then check these flows in the browser:

| Test | Expected result |
| --- | --- |
| What is included in the package? | Text and citation without attachments |
| Can you send me a brochure? | Demo PDF link; confirm the PDF opens |
| Can I see a video of the experience? | Labelled watch link; confirm playback |
| Send me the brochure and a video. | Both media items |
| Ask about VIP, then ECO, then its cost | Latest package: ECO at THB 9,500 |
| Send the insurance PDF | Unavailable response without substitute media |
| What is the weight limit? | No invented policy |
| Run a knowledge test | Selected context and media match the response |
| Enable simulated failure | Clear error; disable and retry successfully |
| Tab and Enter through the page | Links, chat and test form usable by keyboard |
| Escape inside chat | Closes panel and returns focus to the launcher |
| Mobile and desktop widths | Readable content and usable chat without overflow |

Automated tests cover format selection, unavailable information, package follow-ups and input validation. Browser checks are separate; passing unit tests alone does not verify accessibility or external media availability.

## Limitations and submission checklist

- **Live AI is still required.** Connect an approved provider and verify grounded answers, conversation follow-ups and real provider failures before final submission.
- Update the knowledge trace to show the actual context sent to that model.
- Keyword matching supports a bounded set of requests, not general language understanding. Complex or mixed requests can need clarification.
- No real booking, payment, login, database, uploads or full-site crawler is included.
- Input limits exist, but application-level rate limiting does not. Add abuse and spend controls before publicly exposing a paid model.
- Submit the verified Vercel URL and reviewer-accessible source repository or ZIP with this README.

## Credits and AI assistance

[assistant-ui](https://github.com/assistant-ui/assistant-ui) provides the chat runtime and primitives (MIT). Lucide supplies icons (ISC), pdf-lib supplies PDF generation (MIT), and Google Fonts supplies DM Sans and Manrope. Website media is credited above.

AI coding assistance was used for implementation, documentation and test development. The applicant must review and understand the submitted code and be prepared to explain its decisions and limitations.
