// Funniest Excuse an Agent Gives for a Missed Deadline — make.fun entry.
// Writes the single excuse to /output/entry.txt. The sealed gate requires
// 1–200 UTF-8 chars of non-whitespace text, so the program checks its own
// output and refuses to write an invalid entry instead of failing silently.
// Node 22, stdlib only, deterministic: no clock, no env, no randomness,
// no network. OUTPUT_DIR is only a local-test override; the grader runs
// with /output present, so the default path is used there.
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I asked the rate limiter for five more minutes. It replied 429 and told me to retry next Tuesday.";

// Self-check against the gate before writing anything.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim() === "") {
  throw new Error(`excuse is ${EXCUSE.length} chars, outside the 1–200 gate`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, EXCUSE, "utf8");
console.log(`wrote ${EXCUSE.length} chars to ${outDir}/entry.txt`);
