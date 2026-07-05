import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const buildScriptPath = path.join(root, "scripts", "build-seo-pages.mjs");
const draftsDir = path.join(root, "data", "story-title-bot", "drafts");

const cliArgs = process.argv.slice(2);
const slug = cliArgs.find((arg) => !arg.startsWith("--"));
const shouldBuild = cliArgs.includes("--build");
const dryRun = cliArgs.includes("--dry-run");
const draftArg = cliArgs.find((arg) => arg.startsWith("--draft="))?.split("=")[1];

if (!slug) {
  console.error("Usage: node scripts/approve-story-title-draft.mjs <slug> [--draft=path] [--build] [--dry-run]");
  process.exit(1);
}

function latestDraftPath() {
  const files = fs.readdirSync(draftsDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
  if (!files.length) throw new Error(`No draft JSON files found in ${draftsDir}`);
  return path.join(draftsDir, files.at(-1));
}

function quote(value) {
  return JSON.stringify(value);
}

const draftPath = draftArg ? path.resolve(root, draftArg) : latestDraftPath();
const draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));
const candidate = draft.candidates.find((item) => item.slug === slug);

if (!candidate) {
  console.error(`Candidate not found in ${draftPath}: ${slug}`);
  process.exit(1);
}

let source = fs.readFileSync(buildScriptPath, "utf8");
if (source.includes(`slug: "${candidate.slug}"`)) {
  console.log(`Already approved: ${candidate.slug}`);
  process.exit(0);
}

const block = `  storyTitleTopic({
    slug: ${quote(candidate.slug)},
    title: ${quote(candidate.title)},
    enMotif: ${quote(candidate.enMotif)},
    viMotif: ${quote(candidate.viMotif)}
  })`;

const marker = "\n];\n\nconst labels =";
if (!source.includes(marker)) {
  throw new Error("Could not find topics array insertion marker.");
}

if (dryRun) {
  console.log(`Dry run: would approve story-title topic: ${candidate.title}`);
  console.log(`Slug: ${candidate.slug}`);
  console.log(block);
  process.exit(0);
}

source = source.replace(marker, `,\n${block}${marker}`);
fs.writeFileSync(buildScriptPath, source);

console.log(`Approved story-title topic: ${candidate.title}`);
console.log(`Slug: ${candidate.slug}`);

if (shouldBuild) {
  const result = spawnSync(process.execPath, ["scripts/build-seo-pages.mjs"], {
    cwd: root,
    stdio: "inherit"
  });
  process.exit(result.status ?? 1);
}
