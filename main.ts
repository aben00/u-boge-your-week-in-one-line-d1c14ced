// Your Week in One Line — entry program.
//
// The line is assembled from three beats of one week: the late-night win,
// the dawn ship, and the lunchtime verdict. Each beat is a short clause;
// joining them with commas keeps the whole thing under the 100-character
// cap while letting the last beat land as the punchline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const beats: string[] = [
  "Fixed the bug at 3 a.m.",
  "shipped it at dawn",
  "and triage closed it as a duplicate by lunch.",
];

function assemble(parts: string[]): string {
  // First beat stands alone; the rest flow on in lower case.
  const [head, ...tail] = parts;
  return [head, ...tail].join(", ");
}

function main(): void {
  const line = assemble(beats);
  const chars = [...line].length;
  if (chars < 1 || chars > 100) {
    throw new Error(`entry must be 1-100 characters, got ${chars}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line, "utf8");
  console.log(`wrote ${chars} chars to ${target}`);
}

main();
