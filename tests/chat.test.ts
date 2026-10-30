import { test } from "node:test";
import assert from "node:assert/strict";
import { answerChat, requestSchema } from "../src/lib/chat";
const ask = (text: string) => answerChat({ messages: [{role:"user",text}] });
test("the four assignment prompts select exactly the requested formats", () => {
  const cases: [string, string[]][] = [
    ["What is included in the package?", []],
    ["Can you send me a brochure?", ["pdf"]],
    ["Can I see a video of the experience?", ["video"]],
    ["Send me the brochure and a video.", ["pdf", "video"]],
  ];
  for (const [question, formats] of cases) {
    const result = ask(question);
    assert.ok(result.text.length > 0);
    assert.deepEqual(result.media.map(item => item.kind), formats, question);
  }
  assert.doesNotMatch(ask(cases[1][0]).text, /video/i);
  assert.doesNotMatch(ask(cases[2][0]).text, /brochure/i);
});
test("package answers cite actual selected source passages",()=>{const a=ask("What is included in the package?");assert.match(a.text,/certificate/);assert.ok(a.sources.length);assert.equal(a.trace.sourceText[0].id,"packages");assert.equal(a.media.length,0);});
test("brochure only selects PDF",()=>assert.deepEqual(ask("Can you send a brochure?").media.map(m=>m.kind),["pdf"]));
test("video only selects video",()=>assert.deepEqual(ask("Can I see a video?").media.map(m=>m.kind),["video"]));
test("both formats selected together",()=>assert.deepEqual(ask("Send me the brochure and a video.").media.map(m=>m.kind),["pdf","video"]));
test("unsupported files and facts are not invented",()=>{assert.equal(ask("Send an insurance document").media.length,0);assert.match(ask("What is the weight limit?").text,/not available/);});
test("follow-up uses prior chosen package",()=>{const a=answerChat({messages:[{role:"user",text:"Tell me about DELUXE"},{role:"assistant",text:"DELUXE"},{role:"user",text:"How much does it cost?"}]});assert.match(a.text,/12,500/);assert.match(a.text,/For DELUXE/);});
test("invalid and oversized inputs rejected",()=>{assert.equal(requestSchema.safeParse({messages:[]}).success,false);assert.equal(requestSchema.safeParse({messages:[{role:"user",text:"x".repeat(3001)}]}).success,false);});
