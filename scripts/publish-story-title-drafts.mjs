import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const buildScriptPath = path.join(root, "scripts", "build-seo-pages.mjs");
const draftsDir = path.join(root, "data", "story-title-bot", "drafts");

const cliArgs = process.argv.slice(2);
const minScore = Number(cliArgs.find((arg) => arg.startsWith("--min-score="))?.split("=")[1] || 85);
const maxPublish = Number(cliArgs.find((arg) => arg.startsWith("--max="))?.split("=")[1] || 1);
const maxPerLanguage = Number(cliArgs.find((arg) => arg.startsWith("--max-per-language="))?.split("=")[1] || maxPublish);
const supportedLanguages = ["en", "vi", "hi", "id", "ar"];
const publishLanguages = new Set(
  (cliArgs.find((arg) => arg.startsWith("--languages="))?.split("=")[1] || "vi")
    .split(",")
    .map((lang) => lang.trim())
    .filter(Boolean)
);

function candidateLanguage(candidate) {
  return supportedLanguages.includes(candidate.language) ? candidate.language : "vi";
}
const shouldBuild = cliArgs.includes("--build");
const dryRun = cliArgs.includes("--dry-run");
const draftArg = cliArgs.find((arg) => arg.startsWith("--draft="))?.split("=")[1];

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

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .normalize("NFC")
    .replace(/[“”"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function topicBlock(candidate) {
  const language = candidateLanguage(candidate);
  return `  storyTitleTopic({
    slug: ${quote(candidate.slug)},
    title: ${quote(candidate.title)},
    enMotif: ${quote(candidate.enMotif)},
    viMotif: ${quote(candidate.viMotif)},
    hiMotif: ${quote(candidate.hiMotif || candidate.enMotif)},
    idMotif: ${quote(candidate.idMotif || candidate.enMotif)},
    arMotif: ${quote(candidate.arMotif || candidate.enMotif)},
    languages: [${quote(language)}]
  })`;
}

const draftPath = draftArg ? path.resolve(root, draftArg) : latestDraftPath();
const draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));
let source = fs.readFileSync(buildScriptPath, "utf8");

const marker = "\n];\n\nconst labels =";
if (!source.includes(marker)) {
  throw new Error("Could not find topics array insertion marker.");
}

const existingSlugs = new Set([...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
const existingTitles = new Set([...source.matchAll(/title:\s*"([^"]+)"/g)].map((match) => normalizeTitle(match[1])));

const publishable = draft.candidates
  .filter((candidate) => candidate.score >= minScore)
  .filter((candidate) => publishLanguages.has(candidateLanguage(candidate)))
  .filter((candidate) => !existingSlugs.has(candidate.slug))
  .filter((candidate) => !existingTitles.has(normalizeTitle(candidate.title)))
  .sort((a, b) => b.score - a.score);

const selected = [];
const languageCounts = new Map();
for (const candidate of publishable) {
  const language = candidateLanguage(candidate);
  const count = languageCounts.get(language) || 0;
  if (count >= maxPerLanguage) continue;
  selected.push(candidate);
  languageCounts.set(language, count + 1);
  if (selected.length >= maxPublish) break;
}

if (!selected.length) {
  console.log(`No publishable drafts. minScore=${minScore}, max=${maxPublish}, maxPerLanguage=${maxPerLanguage}, languages=${[...publishLanguages].join(",")}, draft=${draftPath}`);
  process.exit(0);
}

const blocks = selected.map(topicBlock);

console.log(`Publishable drafts: ${selected.length}`);
for (const candidate of selected) {
  console.log(`- [${candidateLanguage(candidate)}] ${candidate.title} (${candidate.score}) -> ${candidate.slug}`);
}

if (dryRun) {
  console.log("\nDry run: would insert:\n");
  console.log(blocks.join(",\n"));
  process.exit(0);
}

source = source.replace(marker, `,\n${blocks.join(",\n")}${marker}`);
fs.writeFileSync(buildScriptPath, source);

if (shouldBuild) {
  const result = spawnSync(process.execPath, ["scripts/build-seo-pages.mjs"], {
    cwd: root,
    stdio: "inherit"
  });
  process.exit(result.status ?? 1);
}
