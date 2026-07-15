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
  "read",
  "aloud",
  "audiobook",
  "webnovel",
  "web",
  "novel",
  "tóm tắt",
  "ngôn tình",
  "mới nhất"
]);

async function mapLimit(items, concurrency, mapper) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

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
    .replace(/\b(full audiobook|audiobook|audio book|read aloud|sleeping story|narrated by .*)\b/gi, " ")
    .replace(/\b(full|audio|audiobook|truyện audio|truyen audio|review truyện|tóm tắt truyện|truyenfull|wattpad|youtube)\b/gi, " ")
    .replace(/\b(tập|tap|chap|chapter|chương)\s*\d+.*/gi, " ")
    .replace(/\b(phần|phan)\s*\d+.*/gi, " ");

  const chunks = text
    .split(/\s*(?:\|\||\||｜|–|—|\s+-\s+)\s*|:\s/)
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
    en.push(/[À-ỹ]/.test(title) ? "Vietnamese web fiction" : "web fiction", "romance drama");
    vi.push("truyện mạng Việt", "romance drama");
  }

  return {
    enMotif: joinMotifs(en, "and"),
    viMotif: joinMotifs(vi, "và")
  };
}

function joinMotifs(items, conjunction = "and") {
  const unique = [...new Set(items)].slice(0, 4);
  if (unique.length <= 1) return unique[0] || "story audio";
  return `${unique.slice(0, -1).join(", ")} ${conjunction} ${unique.at(-1)}`;
}

async function fetchText(url, timeoutMs = 8000) {
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

async function collectGoogleSuggest(query, language = "vi") {
  const hl = language === "en" ? "en" : "vi";
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&q=${encodeURIComponent(query)}`;
  const text = await fetchText(url);
  const payload = JSON.parse(text);
  return (payload[1] || []).map((suggestion) => ({
    source: "google-suggest",
    language,
    query,
    text: String(suggestion)
  }));
}

async function collectDemandSuggest(query, language = "vi") {
  const items = await collectGoogleSuggest(query, language);
  return items.map((item) => ({ ...item, source: "google-demand-suggest" }));
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
    language: /[À-ỹ]|truyện|ngôn tình|truyen/i.test(`${query} ${text}`) ? "vi" : "en",
    query,
    text
  }));
}

async function collectRoyalRoad(source) {
  const html = await fetchText(source.url, 12000);
  const titles = new Set();
  for (const match of html.matchAll(/<h2[^>]*>\s*<a[^>]*>(.*?)<\/a>/gis)) {
    const title = match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;|&apos;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (title) titles.add(title);
  }
  return [...titles].slice(0, 40).map((text) => ({
    source: source.name || "royalroad",
    language: "en",
    query: source.url,
    text
  }));
}

function titleTokenOverlap(a, b) {
  const tokensA = new Set(stripVietnamese(normalizeTitle(a)).split(/[^a-z0-9]+/).filter((token) => token.length > 1));
  const tokensB = new Set(stripVietnamese(normalizeTitle(b)).split(/[^a-z0-9]+/).filter((token) => token.length > 1));
  if (!tokensA.size || !tokensB.size) return 0;
  let hits = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) hits += 1;
  }
  return hits / tokensA.size;
}

async function estimateAudioCompetition(candidate) {
  const exactQueries = candidate.language === "en"
    ? [
        `"${candidate.title}" audiobook`,
        `"${candidate.title}" "read aloud"`,
        `"${candidate.title}" audio`
      ]
    : [
        `"${candidate.title}" audio`,
        `"${candidate.title}" "truyện audio"`
      ];
  const matched = [];
  let errorCount = 0;
  let successCount = 0;
  for (const query of exactQueries) {
    try {
      const items = await collectYouTube(query);
      successCount += 1;
      for (const item of items) {
        const overlap = titleTokenOverlap(candidate.title, item.text);
        if (overlap >= 0.72 && /audio|audiobook|read aloud|tts|truyện|full|nghe|đọc|youtube/i.test(item.text)) {
          matched.push({ ...item, overlap });
        }
      }
    } catch (error) {
      errorCount += 1;
      candidate.evidence.push({ source: "competition-error", query, text: error.message });
    }
  }

  const uniqueMatches = new Map();
  for (const item of matched) {
    uniqueMatches.set(normalizeTitle(item.text), item);
  }
  const count = uniqueMatches.size;
  const level = successCount === 0 && errorCount > 0
    ? "unknown"
    : count >= 5
      ? "high"
      : count >= 2
        ? "medium"
        : count === 1
          ? "low"
          : "none";
  return {
    audioCompetitionScore: count,
    audioCompetitionLevel: level,
    evidence: [...uniqueMatches.values()].slice(0, 4)
  };
}

async function enrichCompetition(candidates) {
  const enriched = await mapLimit(candidates, 3, async (candidate) => {
    const competition = await estimateAudioCompetition(candidate);
    const penalty = competition.audioCompetitionLevel === "high"
      ? 36
      : competition.audioCompetitionLevel === "medium"
        ? 18
      : competition.audioCompetitionLevel === "low"
          ? 6
          : competition.audioCompetitionLevel === "unknown"
            ? 12
            : 0;
    const opportunityScore = Math.max(0, candidate.demandScore + candidate.audioSignalScore - penalty);
    return {
      ...candidate,
      audioCompetitionScore: competition.audioCompetitionScore,
      audioCompetitionLevel: competition.audioCompetitionLevel,
      opportunityScore,
      score: opportunityScore,
      evidence: [
        ...candidate.evidence,
        ...competition.evidence.map((item) => ({
          source: "youtube-audio-competition",
          query: item.query,
          text: item.text
        }))
      ]
    };
  });
  return enriched.sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, limit);
}

function makeCandidate(item) {
  const title = cleanCandidate(item.text);
  if (!title) return null;
  const context = `${item.text} ${item.query}`;
  const language = item.language || (/[À-ỹ]|truyện|ngôn tình|truyen/i.test(context) ? "vi" : "en");
  const normalized = normalizeTitle(title);
  if (language === "en" && /^google-/.test(item.source)) return null;
  if (language === "en" && /^(how|does|do|can|is|are|what|why|where|when|which)\b/i.test(title)) return null;
  if (language === "en" && /^(reading|watching|reacting to|trying|ranking|reviewing)\b/i.test(title)) return null;
  if (language === "en" && /\b(text to speech|tts|read aloud|audiobook|audio book|chrome extension|app for android|reading on free)\b/i.test(title)) return null;
  if (language === "vi" && /^google-/.test(item.source) && /^truyện\s+(đam mỹ|ngôn tình|trọng sinh|xuyên sách|tổng tài|wattpad|full|hot|hay)\b/i.test(title)) return null;
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length < 4 || words.length > 18) return null;
  if (title.length < 18 || title.length > 120) return null;
  if (existingTitles.has(normalized)) return null;
  if (config.blockedTitlePatterns.some((pattern) => normalized === normalizeTitle(pattern))) return null;
  if ((config.blockedContentPatterns || []).some((pattern) => normalized.includes(normalizeTitle(pattern)))) return null;
  const slug = slugify(title);
  if (!slug || existingSlugs.has(slug)) return null;

  const motifs = inferMotifs(title, context);
  let demandScore = scoreTitleShape(title);
  let audioSignalScore = 0;
  if (item.source === "google-demand-suggest") demandScore += 18;
  if (item.source === "google-suggest") demandScore += 8;
  if (item.source === "youtube-search") audioSignalScore += 8;
  if (/^royalroad/.test(item.source)) demandScore += 24;
  if (/royalroad|royal road|webnovel|web novel|wattpad|fanfiction|ao3|archive of our own|inkitt/i.test(context)) demandScore += 10;
  if (/wattpad|truyenfull|truyện full|truyện hot|ngôn tình|trà xanh|trọng sinh|xuyên sách|hào môn|tổng tài|vả mặt/i.test(context)) demandScore += 10;
  if (/full|audio|audiobook|read aloud|text to speech|tts|truyện|wattpad|youtube/i.test(context)) demandScore += 4;
  if (/mới|hot|2026|2025|hay|trending|best|popular/i.test(context)) demandScore += 4;
  if (language === "en" && /^[\x00-\x7F]+$/.test(title)) demandScore += 6;
  if (/phim|nhạc|karaoke|minecraft|roblox|game/i.test(context)) demandScore -= 30;
  const score = demandScore + audioSignalScore;

  return {
    title,
    slug,
    language,
    score,
    demandScore,
    audioSignalScore,
    audioCompetitionScore: 0,
    audioCompetitionLevel: "unknown",
    opportunityScore: score,
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
      prev.demandScore += Math.round(candidate.demandScore / 3);
      prev.audioSignalScore += Math.round(candidate.audioSignalScore / 3);
      prev.opportunityScore = prev.score;
      prev.evidence.push(...candidate.evidence);
      if (prev.language !== candidate.language) prev.language = prev.score >= candidate.score ? prev.language : candidate.language;
    } else {
      bySlug.set(candidate.slug, candidate);
    }
  }
  return [...bySlug.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(limit, 12));
}

function draftMarkdown(draft) {
  return `# Watt Audio Story-title Bot Drafts

Run: ${draft.generatedAt}

${draft.candidates.map((candidate, index) => `## ${index + 1}. ${candidate.title}

- Language: ${candidate.language || "vi"}
- Opportunity score: ${candidate.opportunityScore}
- Demand score: ${candidate.demandScore}
- Audio competition: ${candidate.audioCompetitionLevel} (${candidate.audioCompetitionScore} exact-ish YouTube matches)
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
  const demandQueries = (config.demandQueries || []).flatMap((query) =>
    config.suggestTemplates.map((template) => template.replace("{query}", query))
  );
  const suggestQueries = config.queries.flatMap((query) =>
    config.suggestTemplates.map((template) => template.replace("{query}", query))
  );
  const englishDemandQueries = (config.englishDemandQueries || []).flatMap((query) =>
    (config.englishSuggestTemplates || config.suggestTemplates).map((template) => template.replace("{query}", query))
  );
  const englishSuggestQueries = (config.englishQueries || []).flatMap((query) =>
    (config.englishSuggestTemplates || config.suggestTemplates).map((template) => template.replace("{query}", query))
  );

  if (!noNetwork) {
    const demandResults = await mapLimit(demandQueries, 8, async (query) => {
      try {
        return await collectDemandSuggest(query, "vi");
      } catch (error) {
        return [{ source: "error", query, text: `google-demand-suggest failed: ${error.message}` }];
      }
    });
    rawItems.push(...demandResults.flat());

    const suggestResults = await mapLimit(suggestQueries, 8, async (query) => {
      try {
        return await collectGoogleSuggest(query, "vi");
      } catch (error) {
        return [{ source: "error", query, text: `google-suggest failed: ${error.message}` }];
      }
    });
    rawItems.push(...suggestResults.flat());

    const youtubeResults = await mapLimit(config.youtubeQueries, 3, async (query) => {
      try {
        return await collectYouTube(query);
      } catch (error) {
        return [{ source: "error", query, text: `youtube-search failed: ${error.message}` }];
      }
    });
    rawItems.push(...youtubeResults.flat());

    const englishDemandResults = await mapLimit(englishDemandQueries, 8, async (query) => {
      try {
        return await collectDemandSuggest(query, "en");
      } catch (error) {
        return [{ source: "error", language: "en", query, text: `english google-demand-suggest failed: ${error.message}` }];
      }
    });
    rawItems.push(...englishDemandResults.flat());

    const englishSuggestResults = await mapLimit(englishSuggestQueries, 8, async (query) => {
      try {
        return await collectGoogleSuggest(query, "en");
      } catch (error) {
        return [{ source: "error", language: "en", query, text: `english google-suggest failed: ${error.message}` }];
      }
    });
    rawItems.push(...englishSuggestResults.flat());

    const englishYoutubeResults = await mapLimit(config.englishYoutubeQueries || [], 3, async (query) => {
      try {
        const items = await collectYouTube(query);
        return items.map((item) => ({ ...item, language: "en" }));
      } catch (error) {
        return [{ source: "error", language: "en", query, text: `english youtube-search failed: ${error.message}` }];
      }
    });
    rawItems.push(...englishYoutubeResults.flat());

    const englishStorySourceResults = await mapLimit(config.englishStorySources || [], 2, async (source) => {
      try {
        return await collectRoyalRoad(source);
      } catch (error) {
        return [{ source: "error", language: "en", query: source.url, text: `${source.name || "english-source"} failed: ${error.message}` }];
      }
    });
    rawItems.push(...englishStorySourceResults.flat());
  }

  const mergedCandidates = mergeCandidates(rawItems.filter((item) => item.source !== "error"));
  const candidates = noNetwork ? mergedCandidates.slice(0, limit) : await enrichCompetition(mergedCandidates);
  const draft = {
    generatedAt: now.toISOString(),
    date: dateId,
    mode: noNetwork ? "no-network" : "network",
    sourceCount: rawItems.length,
    scoring: "v3-bilingual-opportunity-demand-minus-audio-competition",
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
