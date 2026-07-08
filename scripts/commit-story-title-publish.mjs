import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const shouldPush = args.includes("--push");
const messageIndex = args.indexOf("--message");
const slugsIndex = args.indexOf("--slugs");
const commitMessage = messageIndex >= 0 ? args[messageIndex + 1] : "seo: publish story audio guide draft";
const slugs = slugsIndex >= 0 ? args.slice(slugsIndex + 1).filter(Boolean) : [];

const commonPaths = [
  "scripts/build-seo-pages.mjs",
  "sitemap.xml",
  "llms.txt",
  ".well-known/llms.txt",
  "vi/articles/index.html",
  "articles/index.html",
  "data/story-title-bot/drafts/*.json",
  "data/story-title-bot/drafts/*.md"
];

function runGit(gitArgs, options = {}) {
  const result = spawnSync("git", ["-C", root, ...gitArgs], {
    cwd: "/",
    env: { ...process.env, PWD: "/" },
    encoding: "utf8",
    ...options
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result.status ?? 1;
}

let status = runGit(["add", ...commonPaths]);
if (status !== 0) process.exit(status);

for (const slug of slugs) {
  status = runGit(["add", `vi/articles/${slug}.html`, `articles/${slug}.html`]);
  if (status !== 0) process.exit(status);
}

status = runGit(["diff", "--cached", "--quiet"]);
if (status === 0) {
  console.log("No staged changes after publish.");
  process.exit(0);
}
if (status !== 1) process.exit(status);

status = runGit(["commit", "-m", commitMessage]);
if (status !== 0) process.exit(status);

if (shouldPush) {
  status = runGit(["push"]);
  if (status !== 0) process.exit(status);
}
