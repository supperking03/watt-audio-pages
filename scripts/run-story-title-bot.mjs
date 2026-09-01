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

const languagesArg = process.argv.find((arg) => arg.startsWith("--languages="))?.split("=")[1];

const config = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const markets = config.markets || {};
const activeLanguages = (languagesArg ? languagesArg.split(",").map((value) => value.trim()) : Object.keys(markets))
  .filter((lang) => markets[lang] && markets[lang].enabled !== false);
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
  "mới nhất",
  "कहानी",
  "ऑडियो",
  "हिंदी",
  "cerita",
  "novel",
  "lengkap",
  "رواية",
  "قصة",
  "صوتية",
  "كاملة"
]);

// Words that only describe the format, not the story, and should never survive into a title.
const formatNoiseByLanguage = {
  hi: /\b(ऑडियो|ऑडियो\s*बुक|कहानी\s*ऑडियो|पूरी\s*कहानी|भाग\s*\d+|एपिसोड\s*\d+|audio\s*story|hindi\s*kahani|full\s*story)\b/gi,
  id: /\b(audio|audiobook|cerita\s*audio|novel\s*audio|baca\s*cerita|part\s*\d+|bab\s*\d+|episode\s*\d+|full\s*cerita)\b/gi,
  ar: /(صوتية|صوتي|مسموعة|مسموع|كتاب\s*صوتي|رواية\s*صوتية|قصة\s*صوتية|الجزء\s*\d+|الحلقة\s*\d+|كاملة\s*صوتية)/g
};

// Upload titles usually put the story name first and the channel pitch after. Everything from
// the first promo marker onward is dropped so the slug stays close to the real title.
const promoCutByLanguage = {
  hi: /\s*(?:hindi\s+(?:moral\s+)?stor(?:y|ies)|moral\s+story|audio\s+story|\d+\s+stories|non[\s-]?stop|part\s*\d+|द्वारा\s*लिखित|कहानियां|कहानियाँ).*$/i,
  id: /\s*(?:karya\s+\S+|\/\/|pocketbook|bilyonaryo|full\s+story|story\s*-?\s*\d+).*$/i,
  ar: /\s*(?:من\s*أجمل|على\s*قنا[هة]|روعه|روعة|رواية\s*رومانسي|روايات\s|قصص\s|كامل[هة]\b).*$/,
  en: /\s*(?:full\s+story|part\s*\d+\s*$).*$/i
};

// Emoji and other pictographs are decoration on YouTube, never part of a story name.
const pictographs = /[\u{1F000}-\u{1FAFF}\u{2190}-\u{2BFF}\u{FE00}-\u{FE0F}\u{2600}-\u{27BF}\u{200D}]/gu;

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

// Devanagari and Arabic titles would slug down to an empty string with a plain a-z filter,
// so they are romanized first. The output only needs to be readable and stable, not scholarly.
const devanagariConsonants = {
  "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ng",
  "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "ny",
  "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
  "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
  "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
  "य": "y", "र": "r", "ल": "l", "व": "v", "ळ": "l",
  "श": "sh", "ष": "sh", "स": "s", "ह": "h",
  "क़": "q", "ख़": "kh", "ग़": "g", "ज़": "z", "ड़": "r", "ढ़": "rh", "फ़": "f"
};
const devanagariVowels = {
  "अ": "a", "आ": "aa", "इ": "i", "ई": "i", "उ": "u", "ऊ": "u",
  "ऋ": "ri", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au", "ऑ": "o"
};
const devanagariMatras = {
  "ा": "a", "ि": "i", "ी": "i", "ु": "u", "ू": "u", "ृ": "ri",
  "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ॉ": "o"
};
const devanagariDigits = { "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9" };
const arabicMap = {
  "ا": "a", "آ": "aa", "أ": "a", "إ": "i", "ٱ": "a", "ء": "", "ؤ": "w", "ئ": "y",
  "ب": "b", "ت": "t", "ة": "h", "ث": "th", "ج": "j", "ح": "h", "خ": "kh",
  "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "s",
  "ض": "d", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh", "ف": "f", "ق": "q",
  "ك": "k", "ل": "l", "م": "m", "ن": "n", "ه": "h", "و": "w", "ي": "y", "ى": "a", "ٰ": "a",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9"
};

function romanizeDevanagari(input) {
  const chars = [...input];
  let out = "";
  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    const next = chars[index + 1];
    // Nukta forms are two code points; fold them before the lookup.
    const pair = next === "़" ? `${char}़`.normalize("NFC") : "";
    const consonant = devanagariConsonants[pair] || devanagariConsonants[char];
    if (consonant) {
      if (pair) index += 1;
      const following = chars[index + 1];
      out += consonant;
      if (following === "्") {
        index += 1; // virama: no inherent vowel
      } else if (devanagariMatras[following]) {
        out += devanagariMatras[following];
        index += 1;
      } else if (following && !/[\s।॥.,!?:;"'()\[\]-]/.test(following)) {
        out += "a"; // inherent vowel, dropped word-finally the way Hindi does
      }
      continue;
    }
    if (devanagariVowels[char]) { out += devanagariVowels[char]; continue; }
    if (devanagariDigits[char]) { out += devanagariDigits[char]; continue; }
    if (char === "ं" || char === "ँ") { out += "n"; continue; }
    if (char === "ः") { out += "h"; continue; }
    if (char === "ऽ" || char === "़" || char === "्") continue;
    out += char;
  }
  return out;
}

function romanizeArabic(input) {
  return [...input]
    .map((char) => {
      if (char in arabicMap) return arabicMap[char];
      if (/[ً-ْٰـ]/.test(char)) return ""; // harakat, tatweel
      return char;
    })
    .join("");
}

function romanize(title) {
  let text = title;
  if (/[ऀ-ॿ]/.test(text)) text = romanizeDevanagari(text);
  if (/[؀-ۿ]/.test(text)) text = romanizeArabic(text);
  return text;
}

function slugify(title) {
  return stripVietnamese(romanize(title))
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

function cleanCandidate(raw, language = "vi") {
  const noise = formatNoiseByLanguage[language];
  const promoCut = promoCutByLanguage[language];
  let base = raw.replace(pictographs, " ");
  if (promoCut) base = base.replace(promoCut, " ");
  let text = (noise ? base.replace(noise, " ") : base)
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\[[^\]]*(full|audio|truyện|review|tập|chap)[^\]]*\]/gi, " ")
    .replace(/\([^\)]*(full|audio|truyện|review|tập|chap)[^\)]*\)/gi, " ")
    .replace(/#\S+/g, " ")
    .replace(/\b(full audiobook|audiobook|audio book|read aloud|sleeping story|narrated by .*)\b/gi, " ")
    .replace(/\b(full|audio|audiobook|truyện audio|truyen audio|review truyện|tóm tắt truyện|truyenfull|wattpad|youtube)\b/gi, " ")
    .replace(/\b(tập|tap|chap|chapter|chương)\s*\d+.*/gi, " ")
    .replace(/\b(phần|phan)\s*\d+.*/gi, " ")
    .replace(/[\(\[\{]\s*[\)\]\}]/g, " ");

  // Arabic and Hindi upload titles are often several promo phrases joined by slashes,
  // so the slash separates chunks in those markets too.
  const slashHeavy = (text.match(/\//g) || []).length >= 2;
  const chunkSeparator = language === "ar" || language === "hi" || slashHeavy
    ? /\s*(?:\|\||\||｜|–|—|\/\/|\/|।|॥|\s+-\s+)\s*|:\s/
    : /\s*(?:\|\||\||｜|–|—|\/\/|\s+-\s+)\s*|:\s/;
  const chunks = text
    .split(chunkSeparator)
    .map((chunk) => chunk.trim())
    .map((chunk) => chunk.replace(/\b(truyện\s*)?(audio|full|nấu ăn|vả mặt audio|chuchu audio|chu chu audio|review|wattpad)\b/gi, " ").trim())
    .filter(Boolean);
  if (chunks.length) {
    chunks.sort((a, b) => scoreTitleShape(b) - scoreTitleShape(a));
    text = chunks[0];
  }

  text = text
    .replace(/^[\s:|｜–—!؟?.,،؛*+~"'“”«»-]+|[\s:|｜–—*+~"'“”«»-]+$/g, "")
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
  // A native-script title is a strong signal that this is a real story name, not a generic phrase.
  if (/[À-ỹ]/.test(title) || /[ऀ-ॿ]/.test(title) || /[؀-ۿ]/.test(title)) score += 8;
  if (/[,!?:]/.test(title)) score += 2;
  if (words.length >= 4 && words.length <= 16) score += 10;
  if (words.some((word) => genericTerms.has(word.toLowerCase()))) score -= 10;
  return score;
}

// Motif themes shared across markets. Each entry maps one detection pattern to the label
// used in every language, so a candidate found in any market gets usable copy everywhere.
const motifThemes = [
  {
    match: /trọng sinh|rebirth|sống lại|पुनर्जन्म|punarjanm|reinkarnasi|terlahir kembali|تناسخ|عودة إلى الماضي/,
    labels: { en: "rebirth", vi: "trọng sinh", hi: "पुनर्जन्म", id: "terlahir kembali", ar: "العودة إلى الماضي" }
  },
  {
    match: /xuyên sách|xuyên không|transmigration|isekai|dunia lain|عالم آخر/,
    labels: { en: "transmigration", vi: "xuyên sách", hi: "दूसरी दुनिया", id: "pindah dunia", ar: "الانتقال إلى عالم آخر" }
  },
  {
    match: /trà xanh|green tea/,
    labels: { en: "green tea rival", vi: "trà xanh", hi: "छल भरी प्रतिद्वंद्वी", id: "rival bermuka dua", ar: "المنافسة الماكرة" }
  },
  {
    match: /tổng tài|ceo|hào môn|billionaire|rich|अरबपति|amir|kaya raya|konglomerat|ملياردير|رجل أعمال/,
    labels: { en: "rich-family romance", vi: "hào môn", hi: "अमीर परिवार की रोमांस", id: "romansa keluarga kaya", ar: "رومانسية العائلات الثرية" }
  },
  {
    match: /hủy hôn|cưới|hôn ước|kết hôn|marriage|engagement|शादी|विवाह|सगाई|pernikahan|menikah|tunangan|زواج|خطوبة/,
    labels: { en: "marriage drama", vi: "cưới gả", hi: "शादी का ड्रामा", id: "drama pernikahan", ar: "دراما الزواج" }
  },
  {
    match: /báo thù|trả thù|revenge|बदला|प्रतिशोध|balas dendam|انتقام/,
    labels: { en: "revenge", vi: "báo thù", hi: "बदला", id: "balas dendam", ar: "الانتقام" }
  },
  {
    match: /học|trường|thanh xuân|campus|school|कॉलेज|स्कूल|kampus|sekolah|مدرسة|جامعة/,
    labels: { en: "school romance", vi: "vườn trường", hi: "कॉलेज रोमांस", id: "romansa sekolah", ar: "رومانسية المدرسة" }
  },
  {
    match: /hậu cung|cung|hoàng|cổ trang|palace|राजा|रानी|महल|kerajaan|istana|قصر|ملكي/,
    labels: { en: "palace drama", vi: "cổ trang", hi: "राजमहल ड्रामा", id: "drama kerajaan", ar: "دراما القصور" }
  },
  {
    match: /showbiz|streamer|livestream|idol|giải trí|selebriti|artis|مشاهير/,
    labels: { en: "entertainment circle", vi: "showbiz", hi: "शोबिज़", id: "dunia hiburan", ar: "عالم الشهرة" }
  },
  {
    match: /gia đình|mẹ|cha|con|family|परिवार|माँ|पिता|keluarga|ibu|ayah|عائلة|أم|أب/,
    labels: { en: "family drama", vi: "gia đình", hi: "पारिवारिक ड्रामा", id: "drama keluarga", ar: "دراما عائلية" }
  },
  {
    match: /khóc|ngược|đau|tear|angst|दर्द|जुदाई|आँसू|luka|patah hati|sedih|ألم|فراق|حزن/,
    labels: { en: "emotional angst", vi: "ngược tâm", hi: "दर्द भरी कहानी", id: "kisah pilu", ar: "الحكايات الموجعة" }
  },
  {
    match: /hài|cười|comedy|cá mặn|कॉमेडी|मज़ेदार|komedi|lucu|كوميديا|طريف/,
    labels: { en: "comedy", vi: "hài hước", hi: "कॉमेडी", id: "komedi", ar: "الكوميديا" }
  },
  {
    match: /ma|kinh dị|horror|thriller|suspense|सस्पेंस|हॉरर|रहस्य|horor|misteri|رعب|غموض|إثارة/,
    labels: { en: "suspense and mystery", vi: "kinh dị bí ẩn", hi: "सस्पेंस और रहस्य", id: "misteri dan ketegangan", ar: "التشويق والغموض" }
  },
  {
    match: /tiên hiệp|tu tiên|fantasy|magic|litrpg|फ़ैंटेसी|जादू|fantasi|sihir|خيال|سحر/,
    labels: { en: "fantasy adventure", vi: "tiên hiệp fantasy", hi: "फ़ैंटेसी एडवेंचर", id: "petualangan fantasi", ar: "مغامرات خيالية" }
  }
];

const fallbackMotifs = {
  en: ["web fiction", "romance drama"],
  vi: ["truyện mạng Việt", "romance drama"],
  hi: ["हिंदी वेब स्टोरी", "रोमांस ड्रामा"],
  id: ["cerita online", "drama romansa"],
  ar: ["الروايات الإلكترونية", "الدراما الرومانسية"]
};

const motifConjunctions = { en: "and", vi: "và", hi: "और", id: "dan", ar: "و" };

function inferMotifs(title, context) {
  const haystack = normalizeTitle(`${title} ${context}`);
  const found = { en: [], vi: [], hi: [], id: [], ar: [] };

  for (const theme of motifThemes) {
    if (!theme.match.test(haystack)) continue;
    for (const lang of Object.keys(found)) {
      const label = theme.labels[lang];
      if (label && !found[lang].includes(label)) found[lang].push(label);
    }
  }

  if (!found.en.length) {
    const enFallback = /[À-ỹ]/.test(title) ? "Vietnamese web fiction" : fallbackMotifs.en[0];
    found.en.push(enFallback, fallbackMotifs.en[1]);
    for (const lang of ["vi", "hi", "id", "ar"]) found[lang].push(...fallbackMotifs[lang]);
  }

  return {
    enMotif: joinMotifs(found.en, motifConjunctions.en),
    viMotif: joinMotifs(found.vi, motifConjunctions.vi),
    hiMotif: joinMotifs(found.hi, motifConjunctions.hi),
    idMotif: joinMotifs(found.id, motifConjunctions.id),
    arMotif: joinMotifs(found.ar, motifConjunctions.ar)
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
  const market = markets[language] || {};
  const hl = market.hl || language;
  const gl = market.gl ? `&gl=${encodeURIComponent(market.gl)}` : "";
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${encodeURIComponent(hl)}${gl}&q=${encodeURIComponent(query)}`;
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

async function collectYouTube(query, language) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  const titles = new Set();
  for (const match of html.matchAll(/"title":\{"runs":\[\{"text":"([^"]{8,160})"\}\]/g)) {
    titles.add(match[1]);
  }
  for (const match of html.matchAll(/"simpleText":"([^"]{8,160})"/g)) {
    if (/truyện|audio|full|wattpad|कहानी|cerita|novel|رواية|قصة/i.test(match[1])) titles.add(match[1]);
  }
  return [...titles].slice(0, 30).map((text) => ({
    source: "youtube-search",
    // YouTube mixes locales in one result page, so the writing system of the title wins
    // over the market we searched from. Only fall back to the market when the script is neutral.
    language: detectScriptLanguage(text) || language || detectLanguage(text),
    query,
    text
  }));
}

// Detects the market from the writing system alone. Returns null for plain Latin text,
// which could belong to any of the Latin-script markets.
function detectScriptLanguage(text) {
  if (/[ऀ-ॿ]/.test(text)) return "hi";
  if (/[؀-ۿ]/.test(text)) return "ar";
  if (/[À-ỹ]/.test(text)) return "vi";
  return null;
}

// Script and keyword detection, used when a source does not tell us which market it came from.
function detectLanguage(text) {
  const script = detectScriptLanguage(text);
  if (script) return script;
  if (/truyện|ngôn tình|truyen/i.test(text)) return "vi";
  if (/\b(cerita|novel|bahasa indonesia|yang|dengan|kisah|bab)\b/i.test(text)) return "id";
  return "en";
}

// Search-page UI that YouTube renders with the same markup as video titles.
const interfaceNoise = /^(bộ lọc|tìm kiếm|kết quả|video 360|đăng ký|xem sau|phát tất cả|thêm|tất cả|search filters?|filters?|shorts|live|playlists?|subscribe|watch later|play all|sort by|latest|show more|खोज|फ़िल्टर|सदस्यता|प्लेलिस्ट|सभी|filter penelusuran|langganan|putar semua|semua|عوامل التصفية|نتائج البحث|اشترك|قائمة التشغيل|الكل)\b/i;

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
  const tokenize = (value) => new Set(
    stripVietnamese(normalizeTitle(value))
      .split(/[^\p{L}\p{N}]+/u)
      .filter((token) => token.length > 1)
  );
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);
  if (!tokensA.size || !tokensB.size) return 0;
  let hits = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) hits += 1;
  }
  return hits / tokensA.size;
}

async function estimateAudioCompetition(candidate) {
  const templates = markets[candidate.language]?.competitionQueries || [`"{title}" audio`];
  const exactQueries = templates.map((template) => template.replace("{title}", candidate.title));
  const matched = [];
  let errorCount = 0;
  let successCount = 0;
  for (const query of exactQueries) {
    try {
      const items = await collectYouTube(query, candidate.language);
      successCount += 1;
      for (const item of items) {
        const overlap = titleTokenOverlap(candidate.title, item.text);
        if (overlap >= 0.72 && /audio|audiobook|read aloud|tts|truyện|full|nghe|đọc|youtube|कहानी|ऑडियो|cerita|رواية|صوتي/i.test(item.text)) {
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
  // --limit is per market, so a five-language run still produces a deep draft for each one.
  const sorted = enriched.sort((a, b) => b.opportunityScore - a.opportunityScore);
  const counts = new Map();
  return sorted.filter((candidate) => {
    const count = counts.get(candidate.language) || 0;
    if (count >= limit) return false;
    counts.set(candidate.language, count + 1);
    return true;
  });
}

function makeCandidate(item) {
  const context = `${item.text} ${item.query}`;
  const language = item.language || detectLanguage(context);
  const title = cleanCandidate(item.text, language);
  if (!title) return null;
  const normalized = normalizeTitle(title);
  if (interfaceNoise.test(title)) return null;
  // "10 best ...", "Top 5 ..." style compilations are listicles, not a single story.
  if (/^(top\s*)?\d{1,3}\s+\S/.test(title)) return null;
  // Hindi and Arabic pages are written in their own script, so a Latin-script candidate
  // in those markets is almost always an English channel name or a generic phrase.
  if ((language === "hi" && !/[ऀ-ॿ]/.test(title)) || (language === "ar" && !/[؀-ۿ]/.test(title))) return null;
  if ((language === "en" || language === "id") && /[ऀ-ॿ؀-ۿ]/.test(title)) return null;
  if (language === "en" && /[À-ỹ]/.test(title)) return null;
  if (language === "en" && /^google-/.test(item.source)) return null;
  if (language === "en" && /^(how|does|do|can|is|are|what|why|where|when|which)\b/i.test(title)) return null;
  if (language === "en" && /^(reading|watching|reacting to|trying|ranking|reviewing)\b/i.test(title)) return null;
  if (language === "en" && /\b(text to speech|tts|read aloud|audiobook|audio book|app for android|reading on free)\b/i.test(title)) return null;
  if (language === "vi" && /^google-/.test(item.source) && /^truyện\s+(đam mỹ|ngôn tình|trọng sinh|xuyên sách|tổng tài|wattpad|full|hot|hay)\b/i.test(title)) return null;
  if (language === "hi" && /^(हिंदी|कहानी|ऑडियो|नई|बेस्ट|टॉप)\s/.test(title)) return null;
  if (language === "hi" && /\b(audio story|audiobook|text to speech|kahani sunao)\b/i.test(title)) return null;
  if (language === "id" && /^(cerita|novel|kumpulan|daftar|rekomendasi)\s+(wattpad|romantis|terbaik|indonesia|audio|online|gratis)\b/i.test(title)) return null;
  if (language === "id" && /\b(text to speech|audiobook|baca online|link novel)\b/i.test(title)) return null;
  if (language === "ar" && /^(روايات|قصص|أفضل|قائمة|تحميل)\s/.test(title)) return null;
  if (language === "ar" && /\b(text to speech|audiobook)\b/i.test(title)) return null;
  const words = title.split(/\s+/).filter(Boolean);
  // Devanagari and Arabic pack more meaning into fewer, shorter words than Latin scripts.
  const compactScript = language === "hi" || language === "ar";
  const minWords = compactScript ? 3 : 4;
  const minChars = compactScript ? 12 : 18;
  if (words.length < minWords || words.length > 18) return null;
  if (title.length < minChars || title.length > 120) return null;
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
  if (/pocket fm|kuku fm|pratilipi|कहानी|उपन्यास|karyakarsa|cerita|novel|رواية|قصة|واتباد/i.test(context)) demandScore += 10;
  if (/full|audio|audiobook|read aloud|text to speech|tts|truyện|wattpad|youtube|ऑडियो|صوتية/i.test(context)) demandScore += 4;
  if (/mới|hot|2026|2025|hay|trending|best|popular|नई|पूरी|terbaru|lengkap|جديدة|كاملة/i.test(context)) demandScore += 4;
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
    hiMotif: motifs.hiMotif,
    idMotif: motifs.idMotif,
    arMotif: motifs.arMotif,
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
  // Keep every market represented instead of letting the loudest one fill the whole draft.
  const perLanguageCap = Math.max(4, Math.ceil(Math.max(limit, 12) / Math.max(activeLanguages.length, 1)) + 2);
  const kept = [];
  const counts = new Map();
  for (const candidate of [...bySlug.values()].sort((a, b) => b.score - a.score)) {
    const count = counts.get(candidate.language) || 0;
    if (count >= perLanguageCap) continue;
    counts.set(candidate.language, count + 1);
    kept.push(candidate);
  }
  return kept.slice(0, Math.max(limit, 12) * Math.max(activeLanguages.length, 1));
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
- hiMotif: ${candidate.hiMotif}
- idMotif: ${candidate.idMotif}
- arMotif: ${candidate.arMotif}
- Evidence:
${candidate.evidence.slice(0, 4).map((item) => `  - ${item.source}: "${item.text}" via \`${item.query}\``).join("\n")}

Approve command:

\`\`\`bash
node scripts/approve-story-title-draft.mjs ${candidate.slug} --build
\`\`\`
`).join("\n")}
`;
}

async function collectMarket(lang) {
  const market = markets[lang];
  const items = [];
  const templates = market.suggestTemplates || ["{query}"];
  const expand = (queries) => (queries || []).flatMap((query) =>
    templates.map((template) => template.replace("{query}", query))
  );

  const demandResults = await mapLimit(expand(market.demandQueries), 8, async (query) => {
    try {
      return await collectDemandSuggest(query, lang);
    } catch (error) {
      return [{ source: "error", language: lang, query, text: `${lang} google-demand-suggest failed: ${error.message}` }];
    }
  });
  items.push(...demandResults.flat());

  const suggestResults = await mapLimit(expand(market.queries), 8, async (query) => {
    try {
      return await collectGoogleSuggest(query, lang);
    } catch (error) {
      return [{ source: "error", language: lang, query, text: `${lang} google-suggest failed: ${error.message}` }];
    }
  });
  items.push(...suggestResults.flat());

  const youtubeResults = await mapLimit(market.youtubeQueries || [], 3, async (query) => {
    try {
      return await collectYouTube(query, lang);
    } catch (error) {
      return [{ source: "error", language: lang, query, text: `${lang} youtube-search failed: ${error.message}` }];
    }
  });
  items.push(...youtubeResults.flat());

  const storySourceResults = await mapLimit(market.storySources || [], 2, async (source) => {
    try {
      const collected = await collectRoyalRoad(source);
      return collected.map((item) => ({ ...item, language: lang }));
    } catch (error) {
      return [{ source: "error", language: lang, query: source.url, text: `${source.name || `${lang}-source`} failed: ${error.message}` }];
    }
  });
  items.push(...storySourceResults.flat());

  return items;
}

async function main() {
  const rawItems = [];

  if (!noNetwork) {
    // Markets run in parallel; each one fans out its own suggest/YouTube/source queries.
    const perMarket = await mapLimit(activeLanguages, 3, (lang) => collectMarket(lang));
    for (const items of perMarket) rawItems.push(...items);
  }

  const mergedCandidates = mergeCandidates(rawItems.filter((item) => item.source !== "error"));
  const candidates = noNetwork ? mergedCandidates.slice(0, limit) : await enrichCompetition(mergedCandidates);
  const draft = {
    generatedAt: now.toISOString(),
    date: dateId,
    mode: noNetwork ? "no-network" : "network",
    languages: activeLanguages,
    sourceCount: rawItems.length,
    scoring: "v4-multi-market-opportunity-demand-minus-audio-competition",
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

  const byLanguage = activeLanguages
    .map((lang) => `${lang}=${candidates.filter((candidate) => candidate.language === lang).length}`)
    .join(" ");
  console.log(`Story-title bot generated ${candidates.length} drafts (${byLanguage}).`);
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
