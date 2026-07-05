import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const seedPath = path.join(root, "data", "story-title-bot", "seeds.json");
const draftsDir = path.join(root, "data", "story-title-bot", "drafts");
const buildScriptPath = path.join(root, "scripts", "build-seo-pages.mjs");

const args = new Set(process.argv.slice(2));
const limit = Number(process.argv.find((arg) => arg.startsWith("--limit="))?.split("=")[1] || 10);
const noNetwork = args.has("--no-network");
const stdoutOnly = args.has("--stdout");

const now = new Date();
const dateId = now.toISOString().slice(0, 10);

const config = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const buildSource = fs.readFileSync(buildScriptPath, "utf8");
const existingSlugs = new Set([...buildSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
const existingTitles = new Set([...buildSource.matchAll(/title:\s*"([^"]+)"/g)].map((match) => normalizeTitle(match[1])));

const genericTerms = new Set([
  "full",
  "audio",
  "truyen",
  "truyện",
  "wattpad",
  "youtube",
  "review",
  "tóm tắt",
  "ngôn tình",
  "mới nhất"
]);

function stripVietnamese(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function slugify(title) {
  return stripVietnamese(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 92)
    .replace(/-+$/g, "");
}

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .normalize("NFC")
    .replace(/[“”"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseLoose(value) {
  const keepLower = new Set(["và", "của", "là", "với", "ở", "cho", "the", "of", "and"]);
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && keepLower.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function cleanCandidate(raw) {
  let text = raw
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\[[^\]]*(full|audio|truyện|review|tập|chap)[^\]]*\]/gi, " ")
    .replace(/\([^\)]*(full|audio|truyện|review|tập|chap)[^\)]*\)/gi, " ")
    .replace(/#\S+/g, " ")
    .replace(/\b(full|audio|audiobook|truyện audio|truyen audio|review truyện|tóm tắt truyện|truyenfull|wattpad|youtube)\b/gi, " ")
    .replace(/\b(tập|tap|chap|chapter|chương)\s*\d+.*/gi, " ")
    .replace(/\b(phần|phan)\s*\d+.*/gi, " ");

  const chunks = text
    .split(/\s*(?:\|\||\||｜|–|—)\s*|:\s/)
    .map((chunk) => chunk.trim())
    .map((chunk) => chunk.replace(/\b(truyện\s*)?(audio|full|nấu ăn|vả mặt audio|chuchu audio|chu chu audio|review|wattpad)\b/gi, " ").trim())
    .filter(Boolean);
  if (chunks.length) {
    chunks.sort((a, b) => scoreTitleShape(b) - scoreTitleShape(a));
    text = chunks[0];
  }

  text = text
    .replace(/^[\s:|｜–—-]+|[\s:|｜–—-]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  if (/^[a-z\s]+$/i.test(text) && !/[À-ỹ]/.test(text)) return titleCaseLoose(text);
  if (text === text.toUpperCase() && /[A-ZÀ-Ỹ]/.test(text)) return titleCaseLoose(text);
  return text
    .split(/\s+/)
    .map((word) => {
      if (/^[A-ZÀ-Ỹ0-9]+$/.test(word) && word.length <= 3) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function scoreTitleShape(title) {
  const words = title.split(/\s+/).filter(Boolean);
  let score = 0;
  score += Math.min(words.length, 14) * 2;
  if (/[À-ỹ]/.test(title)) score += 8;
  if (/[,!?:]/.test(title)) score += 2;
  if (words.length >= 4 && words.length <= 16) score += 10;
  if (words.some((word) => genericTerms.has(word.toLowerCase()))) score -= 10;
  return score;
}

function inferMotifs(title, context) {
  const haystack = normalizeTitle(`${title} ${context}`);
  const en = [];
  const vi = [];
  const add = (enText, viText) => {
    if (!en.includes(enText)) en.push(enText);
    if (!vi.includes(viText)) vi.push(viText);
  };

  if (/trọng sinh|rebirth|sống lại/.test(haystack)) add("rebirth", "trọng sinh");
  if (/xuyên sách|xuyên không|transmigration/.test(haystack)) add("transmigration", "xuyên sách");
  if (/trà xanh|green tea/.test(haystack)) add("green tea rival", "trà xanh");
  if (/tổng tài|ceo|hào môn|billionaire|rich/.test(haystack)) add("rich-family romance", "hào môn");
  if (/hủy hôn|cưới|hôn ước|kết hôn|marriage|engagement/.test(haystack)) add("marriage drama", "cưới gả");
  if (/báo thù|trả thù|revenge/.test(haystack)) add("revenge", "báo thù");
  if (/học|trường|thanh xuân|campus|school/.test(haystack)) add("school romance", "vườn trường");
  if (/hậu cung|cung|hoàng|cổ trang|palace/.test(haystack)) add("palace drama", "cổ trang");
  if (/showbiz|streamer|livestream|idol|giải trí/.test(haystack)) add("entertainment circle", "showbiz");
  if (/gia đình|mẹ|cha|con|family/.test(haystack)) add("family drama", "gia đình");
  if (/khóc|ngược|đau|tear|angst/.test(haystack)) add("emotional angst", "ngược tâm");
  if (/hài|cười|comedy|cá mặn/.test(haystack)) add("comedy", "hài hước");

  if (!en.length) {
    en.push("Vietnamese web fiction", "romance drama");
    vi.push("truyện mạng Việt", "romance drama");
  }

  return {
    enMotif: joinMotifs(en),
    viMotif: joinMotifs(vi)
  };
}

function joinMotifs(items) {
  const unique = [...new Set(items)].slice(0, 4);
  if (unique.length <= 1) return unique[0] || "story audio";
  return `${unique.slice(0, -1).join(", ")} và ${unique.at(-1)}`;
}

async function fetchText(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 WattAudioStoryTitleBot/1.0"
      }
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function collectGoogleSuggest(query) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=vi&q=${encodeURIComponent(query)}`;
  const text = await fetchText(url);
  const payload = JSON.parse(text);
  return (payload[1] || []).map((suggestion) => ({
    source: "google-suggest",
    query,
    text: String(suggestion)
  }));
}

async function collectYouTube(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  const titles = new Set();
  for (const match of html.matchAll(/"title":\{"runs":\[\{"text":"([^"]{8,160})"\}\]/g)) {
    titles.add(match[1]);
  }
  for (const match of html.matchAll(/"simpleText":"([^"]{8,160})"/g)) {
    if (/truyện|audio|full|wattpad/i.test(match[1])) titles.add(match[1]);
  }
  return [...titles].slice(0, 30).map((text) => ({
    source: "youtube-search",
    query,
    text
  }));
}

function makeCandidate(item) {
  const title = cleanCandidate(item.text);
  if (!title) return null;
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length < 4 || words.length > 18) return null;
  if (title.length < 18 || title.length > 120) return null;
  const normalized = normalizeTitle(title);
  if (existingTitles.has(normalized)) return null;
  if (config.blockedTitlePatterns.some((pattern) => normalized === normalizeTitle(pattern))) return null;
  if ((config.blockedContentPatterns || []).some((pattern) => normalized.includes(normalizeTitle(pattern)))) return null;
  const slug = slugify(title);
  if (!slug || existingSlugs.has(slug)) return null;

  const context = `${item.text} ${item.query}`;
  const motifs = inferMotifs(title, context);
  let score = scoreTitleShape(title);
  if (item.source === "youtube-search") score += 12;
  if (/full|audio|truyện|wattpad|youtube/i.test(context)) score += 8;
  if (/mới|hot|2026|hay/i.test(context)) score += 4;
  if (/phim|nhạc|karaoke|minecraft|roblox|game/i.test(context)) score -= 30;

  return {
    title,
    slug,
    score,
    enMotif: motifs.enMotif,
    viMotif: motifs.viMotif,
    evidence: [item],
    status: "draft"
  };
}

function mergeCandidates(items) {
  const bySlug = new Map();
  for (const item of items) {
    const candidate = makeCandidate(item);
    if (!candidate) continue;
    const prev = bySlug.get(candidate.slug);
    if (prev) {
      prev.score += Math.round(candidate.score / 3);
      prev.evidence.push(...candidate.evidence);
    } else {
      bySlug.set(candidate.slug, candidate);
    }
  }
  return [...bySlug.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function draftMarkdown(draft) {
  return `# Watt Audio Story-title Bot Drafts

Run: ${draft.generatedAt}

${draft.candidates.map((candidate, index) => `## ${index + 1}. ${candidate.title}

- Score: ${candidate.score}
- Slug: \`${candidate.slug}\`
- enMotif: ${candidate.enMotif}
- viMotif: ${candidate.viMotif}
- Evidence:
${candidate.evidence.slice(0, 4).map((item) => `  - ${item.source}: "${item.text}" via \`${item.query}\``).join("\n")}

Approve command:

\`\`\`bash
node scripts/approve-story-title-draft.mjs ${candidate.slug} --build
\`\`\`
`).join("\n")}
`;
}

async function main() {
  const rawItems = [];
  const suggestQueries = config.queries.flatMap((query) =>
    config.suggestTemplates.map((template) => template.replace("{query}", query))
  );

  if (!noNetwork) {
    for (const query of suggestQueries) {
      try {
        rawItems.push(...await collectGoogleSuggest(query));
      } catch (error) {
        rawItems.push({ source: "error", query, text: `google-suggest failed: ${error.message}` });
      }
    }
    for (const query of config.youtubeQueries) {
      try {
        rawItems.push(...await collectYouTube(query));
      } catch (error) {
        rawItems.push({ source: "error", query, text: `youtube-search failed: ${error.message}` });
      }
    }
  }

  const candidates = mergeCandidates(rawItems.filter((item) => item.source !== "error"));
  const draft = {
    generatedAt: now.toISOString(),
    date: dateId,
    mode: noNetwork ? "no-network" : "network",
    sourceCount: rawItems.length,
    candidates
  };

  if (stdoutOnly) {
    console.log(JSON.stringify(draft, null, 2));
    return;
  }

  fs.mkdirSync(draftsDir, { recursive: true });
  const jsonPath = path.join(draftsDir, `${dateId}.json`);
  const mdPath = path.join(draftsDir, `${dateId}.md`);
  fs.writeFileSync(jsonPath, `${JSON.stringify(draft, null, 2)}\n`);
  fs.writeFileSync(mdPath, draftMarkdown(draft));

  console.log(`Story-title bot generated ${candidates.length} drafts.`);
  console.log(jsonPath);
  console.log(mdPath);
  if (candidates[0]) {
    console.log(`Top candidate: ${candidates[0].title} (${candidates[0].score})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
