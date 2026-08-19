import fs from "node:fs";
import path from "node:path";

const iosUrl = "https://apps.apple.com/vn/app/watt-audio-%C4%91%E1%BB%8Dc-truy%E1%BB%87n-audio/id6775724279";
const androidUrl = "https://play.google.com/store/apps/details?id=com.supperking03.wattpadaudio";
const chromeUrl = "https://chromewebstore.google.com/detail/watt-audio-nghe-wattpad-a/aipmnekljadgnhedbkhmbghkanjepied";
const downloadUrls = [iosUrl, androidUrl, chromeUrl];
const siteUrl = "https://wattaudios.com";
// Languages that get their own /<lang>/ directory, homepage, guides index and sitemap entries.
// "en" and "vi" carry the hand-written evergreen guides; "hi", "id" and "ar" are story-title
// markets fed by the automated SEO bot.
const siteLanguages = ["en", "vi", "hi", "id", "ar"];
const storyOnlyLanguages = ["hi", "id", "ar"];
const lastModified = "2026-07-15";
const gaMeasurementId = "G-CPTTPW88BP";
const cssVersion = "20260715-chrome-extension";
const publisher = {
  "@type": "Organization",
  name: "Watt Audio",
  url: siteUrl,
  logo: `${siteUrl}/assets/icons/icon-512.png`,
  sameAs: downloadUrls
};
const blogImage = {
  src: "/assets/blog/how-to-listen-to-wattpad-stories-watt-audio.webp",
  desktop: "/assets/blog/watt-audio-blog-hero-920.webp",
  mobile: "/assets/blog/watt-audio-blog-hero-640.webp",
  width: 1536,
  height: 1024,
  desktopWidth: 920,
  desktopHeight: 614,
  mobileWidth: 640,
  mobileHeight: 427
};
const appIcon = {
  src: "/assets/icons/app-icon-96.webp",
  width: 96,
  height: 96
};
const homeImages = {
  vi: {
    src: "/assets/blog/homepage-watt-audio-vi.webp",
    desktop: "/assets/blog/homepage-watt-audio-vi-1340.webp",
    mobile: "/assets/blog/homepage-watt-audio-vi-760.webp",
    width: 1942,
    height: 809,
    desktopWidth: 1340,
    desktopHeight: 559,
    mobileWidth: 760,
    mobileHeight: 317,
    alt: "Watt Audio homepage hero image in Vietnamese showing the app turning stories into audio"
  },
  en: {
    src: "/assets/blog/homepage-watt-audio-en.webp",
    desktop: "/assets/blog/homepage-watt-audio-en-1340.webp",
    mobile: "/assets/blog/homepage-watt-audio-en-760.webp",
    width: 1672,
    height: 941,
    desktopWidth: 1340,
    desktopHeight: 755,
    mobileWidth: 760,
    mobileHeight: 428,
    alt: "Watt Audio homepage hero image in English showing the app turning stories into audio"
  }
};
// Story-title markets reuse the English hero artwork with localized alt text.
for (const lang of storyOnlyLanguages) {
  const alt = {
    hi: "Watt Audio होमपेज इमेज, जिसमें ऐप कहानियों को ऑडियो में बदलता है",
    id: "Gambar utama halaman depan Watt Audio yang menunjukkan aplikasi mengubah cerita menjadi audio",
    ar: "صورة الصفحة الرئيسية لتطبيق Watt Audio وهو يحوّل الروايات إلى صوت"
  }[lang];
  homeImages[lang] = { ...homeImages.en, alt };
}
const faviconTags = `<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#F74E05" />`;
const analyticsTags = `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaMeasurementId}');
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href*="apps.apple.com"], a[href*="play.google.com/store/apps"], a[href*="chromewebstore.google.com"]');
    if (!link || typeof gtag !== 'function') return;
    gtag('event', 'download_app_click', {
      event_category: 'engagement',
      event_label: link.href,
      page_location: window.location.href
    });
  });
</script>`;

function searchIntentTopic({
  slug,
  enTitle,
  enDescription,
  enAudience,
  enFocus,
  enScenario,
  viTitle,
  viDescription,
  viAudience,
  viFocus,
  viScenario
}) {
  return {
    slug,
    en: {
      title: enTitle,
      description: enDescription,
      audience: enAudience,
      focus: enFocus,
      scenario: enScenario,
      screenshot: `Watt Audio screen showing a chapter-based listening workflow for ${enFocus}.`,
      steps: [
        "Start from the original story page or a story source you already use, then copy the story or chapter link.",
        "Open Watt Audio and add the supported story link so the app can keep chapters together in one listening library.",
        "Generate audio for one chapter first, because a short test helps you check voice clarity, pacing, and chapter boundaries.",
        "Use playback controls such as speed, sleep timer, background listening, and chapter navigation instead of manually selecting text every time.",
        "Keep the workflow personal and respectful: use audio to continue stories you can access, not to redistribute files or bypass author rights."
      ],
      tips: [
        "Searches that mention free, MP3, download, or audiobooks often mean the reader wants convenience, offline replay, and less screen time.",
        "A story-focused app is usually better than a generic web reader when chapter order, updates, and listening progress matter.",
        "If you are comparing audiobook stores, TTS apps, and Wattpad-style readers, test one chapter in each workflow before choosing your daily setup."
      ],
      faq: [
        ["Can Watt Audio create official audiobooks?", "No. Watt Audio is a personal listening tool for supported story links, not an official audiobook publisher or store."],
        ["Can I use it instead of searching for MP3 downloads?", "Use it as a safer personal listening workflow. It is designed for chapter audio you generate for yourself, not for sharing unauthorized downloads."],
        ["Why make a separate page for this search?", "Readers use different phrases for the same need. Some search for Wattpad audio, others search for audio reader, free audiobooks, MP3, download, or text to speech."]
      ]
    },
    vi: {
      title: viTitle,
      description: viDescription,
      audience: viAudience,
      focus: viFocus,
      scenario: viScenario,
      screenshot: `Màn hình Watt Audio minh hoạ workflow nghe theo chương cho nhu cầu ${viFocus}.`,
      steps: [
        "Bắt đầu từ trang truyện gốc hoặc nguồn truyện bạn đang dùng, sau đó copy link truyện hoặc link chương.",
        "Mở Watt Audio và thêm link truyện được hỗ trợ để app giữ các chương trong một thư viện nghe gọn gàng.",
        "Tạo audio cho một chương trước, vì nghe thử ngắn giúp kiểm tra độ rõ của giọng, nhịp đọc và ranh giới chương.",
        "Dùng các điều khiển như tốc độ, hẹn giờ ngủ, phát nền và chuyển chương thay vì phải chọn văn bản thủ công mỗi lần.",
        "Giữ workflow cho nhu cầu cá nhân và tôn trọng tác giả: dùng audio để nghe tiếp nội dung bạn có quyền truy cập, không chia sẻ file trái phép."
      ],
      tips: [
        "Các tìm kiếm có chữ free, MP3, download hoặc audiobooks thường xuất phát từ nhu cầu tiện hơn, nghe lại offline và giảm thời gian nhìn màn hình.",
        "App tập trung vào truyện thường hợp hơn trình đọc web chung khi thứ tự chương, cập nhật và tiến độ nghe là phần quan trọng.",
        "Nếu bạn đang so sánh kho audiobook, app TTS và trình nghe kiểu Wattpad, hãy thử một chương trong từng workflow trước khi chọn cách dùng hằng ngày."
      ],
      faq: [
        ["Watt Audio có tạo audiobook chính thức không?", "Không. Watt Audio là công cụ nghe cá nhân cho link truyện được hỗ trợ, không phải nhà xuất bản hoặc kho bán audiobook chính thức."],
        ["Có dùng thay cho việc tìm MP3 download không?", "Hãy dùng như workflow nghe cá nhân an toàn hơn. App tập trung vào audio theo chương bạn tự tạo để nghe, không dùng để chia sẻ file không được phép."],
        ["Vì sao cần trang riêng cho cụm tìm kiếm này?", "Người đọc dùng nhiều cách gọi khác nhau cho cùng một nhu cầu: Wattpad audio, audio reader, audiobooks free, MP3, download hoặc text to speech."]
      ]
    }
  };
}

// Story-title page copy for the markets that do not carry the hand-written evergreen guides.
// Every field mirrors the shape produced by searchIntentTopic so the renderer stays language-agnostic.
const storyTitlePageBuilders = {
  hi: (title, motif) => ({
    title: `${title} ऑडियो में कैसे सुनें`,
    description: `${title} और इससे मिलती-जुलती ${motif} कहानियाँ ऑडियो में सुनने की गाइड, साथ में Watt Audio का चैप्टर-वाइज़ वर्कफ़्लो।`,
    audience: `उन पाठकों के लिए जो ${title}, हिंदी वेब स्टोरी ऑडियो, Wattpad ऑडियो या इसी तरह की ${motif} कहानियाँ खोज रहे हैं`,
    focus: `${title} और इसी तरह की ${motif} कहानियाँ सुनना`,
    scenario: `लंबे चैप्टर पूरे करना, सफ़र में सुनना, आँखों को आराम देना और सोने से पहले कहानी सुनना`,
    screenshot: `Watt Audio की स्क्रीन, जिसमें ${title} जैसी कहानियों के लिए चैप्टर-वाइज़ लिसनिंग वर्कफ़्लो दिख रहा है।`,
    steps: [
      `जिस चैनल, साइट या ऐप का आप पहले से इस्तेमाल करते हैं, वहीं ${title} खोजें।`,
      "सपोर्टेड कहानी या चैप्टर का लिंक Watt Audio में डालें ताकि सुनने की प्रोग्रेस एक जगह रहे।",
      "पहले एक चैप्टर का ऑडियो बनाएँ, फिर स्पीड, स्लीप टाइमर और बैकग्राउंड प्लेबैक अपने हिसाब से सेट करें."
    ],
    tips: [
      `इस पेज को ${title} और इसी वाइब की ${motif} कहानियाँ खोजने की गाइड की तरह इस्तेमाल करें, यह कहानी का रीपोस्ट नहीं है।`,
      "लंबी वेब स्टोरी के लिए एक बार में कुछ ही चैप्टर तैयार करें, इससे लिसनिंग क्यू साफ़ रहती है।"
    ],
    faq: [
      [`क्या Watt Audio पर ${title} होस्ट की जाती है?`, "नहीं। Watt Audio सपोर्टेड कहानी लिंक के लिए एक निजी लिसनिंग वर्कफ़्लो है। यह गाइड सुनने का तरीका बताती है, कहानी डाउनलोड या दोबारा प्रकाशित नहीं करती।"],
      ["कहानी के नाम पर अलग पेज क्यों?", "बहुत से पाठक YouTube या किसी ऐप पर एक एपिसोड सुनने के बाद सीधे कहानी का नाम सर्च करते हैं और आगे सुनने का आसान तरीका ढूँढ़ते हैं।"]
    ]
  }),
  id: (title, motif) => ({
    title: `Cara Mendengarkan ${title} dalam Bentuk Audio`,
    description: `Panduan mendengarkan ${title} dan cerita ${motif} sejenis dalam bentuk audio per bab bersama Watt Audio.`,
    audience: `pembaca yang mencari ${title}, cerita Wattpad Indonesia, audio novel online, atau cerita ${motif} sejenis`,
    focus: `mendengarkan ${title} dan cerita ${motif} sejenis`,
    scenario: `mengejar bab yang panjang, mendengarkan saat perjalanan, mengistirahatkan mata, dan menyimak cerita sebelum tidur`,
    screenshot: `Layar Watt Audio yang menampilkan alur mendengarkan per bab untuk cerita seperti ${title}.`,
    steps: [
      `Cari ${title} di kanal, situs, atau aplikasi cerita yang memang sudah kamu pakai.`,
      "Salin tautan cerita atau bab yang didukung ke Watt Audio supaya progres mendengarmu tetap rapi.",
      "Buat audio satu bab dulu, lalu atur kecepatan, sleep timer, dan pemutaran latar sesuai kebiasaanmu."
    ],
    tips: [
      `Pakai halaman ini sebagai panduan menemukan ${title} dan cerita ${motif} dengan vibe serupa, bukan sebagai unggahan ulang isi ceritanya.`,
      "Untuk cerita bersambung yang panjang, siapkan beberapa bab saja sekali jalan agar antrean dengarmu tidak berantakan."
    ],
    faq: [
      [`Apakah Watt Audio menyimpan ${title}?`, "Tidak. Watt Audio adalah alur mendengarkan pribadi untuk tautan cerita yang didukung. Panduan ini membantu menata cara mendengar, bukan mengunduh atau menyebarkan isi cerita."],
      ["Kenapa dibuat halaman khusus judul cerita?", "Banyak pembaca menonton satu episode audio lebih dulu, lalu mencari judul ceritanya untuk menemukan cara melanjutkan yang lebih nyaman."]
    ]
  }),
  ar: (title, motif) => ({
    title: `كيف تستمع إلى ${title} كرواية صوتية`,
    description: `دليل للاستماع إلى ${title} والروايات المشابهة من نوع ${motif} على شكل فصول صوتية مع Watt Audio.`,
    audience: `القراء الذين يبحثون عن ${title} أو الروايات الصوتية العربية أو روايات Wattpad أو أعمال ${motif} مشابهة`,
    focus: `الاستماع إلى ${title} والروايات المشابهة من نوع ${motif}`,
    scenario: `متابعة الفصول الطويلة، والاستماع أثناء التنقل، وإراحة العينين، وسماع الرواية قبل النوم`,
    screenshot: `شاشة من Watt Audio تعرض طريقة الاستماع فصلاً بفصل لروايات مثل ${title}.`,
    steps: [
      `ابحث عن ${title} في القناة أو الموقع أو التطبيق الذي تستخدمه أصلاً.`,
      "انسخ رابط الرواية أو الفصل المدعوم إلى Watt Audio ليبقى تقدّمك في الاستماع منظّماً.",
      "أنشئ صوت فصل واحد أولاً، ثم اضبط السرعة ومؤقت النوم والتشغيل في الخلفية حسب عادتك."
    ],
    tips: [
      `استخدم هذه الصفحة كدليل لاكتشاف ${title} والروايات المشابهة من نوع ${motif}، لا كإعادة نشر لمحتوى الرواية.`,
      "مع الروايات الطويلة، جهّز بضعة فصول فقط في كل مرة حتى تبقى قائمة الاستماع مرتبة."
    ],
    faq: [
      [`هل يستضيف Watt Audio رواية ${title}؟`, "لا. Watt Audio هو أسلوب استماع شخصي لروابط الروايات المدعومة. هذا الدليل يساعدك على تنظيم الاستماع، ولا يحمّل محتوى الرواية أو يعيد نشره."],
      ["لماذا صفحة خاصة باسم الرواية؟", "كثير من القراء يسمعون حلقة صوتية واحدة ثم يبحثون باسم الرواية مباشرة عن طريقة أسهل لمتابعة الاستماع."]
    ]
  })
};

function storyTitleTopic({ slug, title, enMotif, viMotif, hiMotif, idMotif, arMotif, languages = ["en", "vi"] }) {
  const englishOnly = languages.length === 1 && languages[0] === "en";
  const enAudienceContext = englishOnly
    ? `readers who searched for ${title}, Wattpad-style stories, web fiction audio, read-aloud story apps, or similar ${enMotif} fiction`
    : `readers who searched for ${title}, Vietnamese audio stories, YouTube story audio, or similar ${enMotif} fiction`;
  const enScenarioContext = englishOnly
    ? `catching up on ${enMotif} chapters, long web fiction, Wattpad-style story searches, Royal Road-style webnovels, and personal listening sessions`
    : `catching up on ${enMotif} chapters, long Vietnamese story audio, similar YouTube audio story searches, and personal listening sessions`;
  const topic = searchIntentTopic({
    slug,
    enTitle: `${title}: Audio Story Listening Guide`,
    enDescription: `A listening guide for readers searching ${title} audio, similar ${enMotif} stories, and Watt Audio workflows.`,
    enAudience: enAudienceContext,
    enFocus: `listening to ${title} and similar ${enMotif} stories`,
    enScenario: enScenarioContext,
    viTitle: `Nghe audio ${title}`,
    viDescription: `Gợi ý nghe ${title}, tìm truyện ${viMotif} cùng vibe và dùng Watt Audio để nghe truyện theo chương.`,
    viAudience: `người đọc đang tìm ${title}, truyện audio YouTube, truyện full hoặc các truyện ${viMotif} tương tự`,
    viFocus: `nghe ${title} và các truyện ${viMotif} tương tự`,
    viScenario: `theo dõi chương truyện ${viMotif}, truyện audio Việt trên YouTube, truyện full dài và các buổi nghe cá nhân`
  });
  topic.languages = languages;
  topic.kind = "story-title";
  topic.en.steps = [
    `Search for ${title} on the original channel, story site, or source you already use.`,
    "Copy a supported story or chapter link into Watt Audio to keep listening progress organized.",
    "Generate one chapter first, then adjust speed, sleep timer, and background playback for personal listening."
  ];
  topic.en.tips = [
    `Use this page as a discovery guide for ${title} and similar ${enMotif} stories, not as a repost of the story itself.`,
    englishOnly
      ? "For long web fiction and webnovels, prepare only a few chapters at a time so the listening queue stays clean."
      : "For long Vietnamese audio stories, prepare only a few chapters at a time so the listening queue stays clean."
  ];
  topic.en.faq = [
    [`Does Watt Audio host ${title}?`, "No. Watt Audio is a personal listening workflow for supported story links. This guide helps readers organize listening, not download or redistribute story content."],
    ["Why target the exact story title?", "Readers often search by story name after seeing a YouTube audio episode, then look for a more comfortable way to continue listening."]
  ];
  topic.vi.steps = [
    `Tìm ${title} trên kênh, nền tảng hoặc nguồn truyện bạn đang dùng.`,
    "Copy link truyện hoặc link chương được hỗ trợ vào Watt Audio để giữ tiến độ nghe gọn hơn.",
    "Tạo thử một chương, rồi chỉnh tốc độ, hẹn giờ ngủ và phát nền theo thói quen nghe cá nhân."
  ];
  topic.vi.tips = [
    `Dùng page này như hướng dẫn discovery cho ${title} và truyện ${viMotif} cùng vibe, không phải nơi đăng lại nội dung truyện.`,
    "Với truyện audio Việt dài, chỉ nên chuẩn bị vài chương mỗi lần để thư viện nghe không bị rối."
  ];
  topic.vi.faq = [
    [`Watt Audio có lưu trữ ${title} không?`, "Không. Watt Audio là workflow nghe cá nhân cho link truyện được hỗ trợ. Bài này giúp người đọc tổ chức việc nghe, không tải lại hoặc phân phối nội dung truyện."],
    ["Vì sao dùng thẳng tên truyện làm keyword?", "Nhiều người xem một tập truyện audio trên YouTube rồi search đúng tên truyện để tìm cách nghe tiếp thuận tiện hơn."]
  ];
  const motifByLanguage = { hi: hiMotif, id: idMotif, ar: arMotif };
  for (const lang of storyOnlyLanguages) {
    if (!languages.includes(lang)) continue;
    topic[lang] = storyTitlePageBuilders[lang](title, motifByLanguage[lang] || enMotif);
  }
  topic.storyTitle = title;
  if (!languages.includes("en")) delete topic.en;
  if (!languages.includes("vi")) delete topic.vi;
  return topic;
}

function accessIssueTopic({
  slug,
  enTitle,
  enDescription,
  enFocus,
  enScenario,
  viTitle,
  viDescription,
  viFocus,
  viScenario
}) {
  const topic = searchIntentTopic({
    slug,
    enTitle,
    enDescription,
    enAudience: "readers who cannot open Wattpad normally, see loading errors, or hear that Wattpad may need a VPN in their area",
    enFocus,
    enScenario,
    viTitle,
    viDescription,
    viAudience: "người đọc không vào Wattpad được, gặp lỗi tải trang hoặc nghe nói Wattpad phải dùng VPN mới vào được",
    viFocus,
    viScenario
  });
  topic.en.steps = [
    "Try mobile data, Wi-Fi, browser, and the official app to see whether the issue is device-specific or network-specific.",
    "Check status pages and recent community reports before assuming the service is blocked in your area.",
    "For supported links you can access, use Watt Audio to create personal chapter audio for later listening."
  ];
  topic.en.tips = [
    "Searches around blocked, VPN, DNS, and loading error usually mean the reader wants a diagnosis before choosing a workaround.",
    "Do not use access issues as a reason to copy or redistribute story content. Keep listening workflows personal."
  ];
  topic.en.faq = [
    ["Is Wattpad officially blocked in Vietnam?", "I could not verify a current official notice. Treat it as a connection issue first, then compare with other users on the same network."],
    ["Should I use a VPN for Wattpad?", "Only if it is legal for you and you trust the provider. VPNs can affect privacy, speed, and account security."],
    ["Can Watt Audio bypass a block?", "No. Watt Audio is not a bypass tool. It helps with personal listening for supported links you can access."]
  ];
  topic.vi.steps = [
    "Thử 4G/5G, Wi-Fi, trình duyệt và app chính thức để biết lỗi nằm ở thiết bị hay mạng.",
    "Xem trang trạng thái và báo lỗi gần đây trong cộng đồng trước khi kết luận dịch vụ bị chặn.",
    "Với link truyện bạn truy cập được và được hỗ trợ, dùng Watt Audio để tạo audio theo chương cho nhu cầu nghe cá nhân."
  ];
  topic.vi.tips = [
    "Các keyword như bị chặn, VPN, lỗi DNS và loading error thường đến từ nhu cầu chẩn đoán trước khi xử lý.",
    "Đừng dùng lỗi truy cập làm lý do copy hoặc chia sẻ nội dung truyện trái phép. Workflow nghe nên giữ cho mục đích cá nhân."
  ];
  topic.vi.faq = [
    ["Wattpad có chính thức bị chặn ở Việt Nam không?", "Mình chưa xác minh được thông báo chính thức hiện tại. Hãy xem đây là lỗi kết nối trước, rồi so sánh với người dùng cùng mạng."],
    ["Có nên dùng VPN để vào Wattpad không?", "Chỉ dùng VPN nếu hợp pháp với bạn và bạn tin nhà cung cấp. VPN có đánh đổi về quyền riêng tư, tốc độ và bảo mật."],
    ["Watt Audio có vượt chặn không?", "Không. Watt Audio không phải công cụ vượt chặn. App chỉ hỗ trợ nghe cá nhân với link truyện bạn truy cập được."]
  ];
  return topic;
}

const topics = [
  accessIssueTopic({
    slug: "wattpad-bi-chan-vpn",
    enTitle: "Wattpad Blocked or Needs VPN? What Readers Should Check",
    enDescription: "If Wattpad seems blocked or only opens with VPN, check DNS, ISP, app status, privacy risks, and safer listening workflows.",
    enFocus: "checking whether Wattpad is blocked or needs a VPN",
    enScenario: "troubleshooting Wattpad access, VPN rumors, DNS changes, app loading errors, and personal story listening when access is unstable",
    viTitle: "Wattpad bị chặn, phải dùng VPN? Cách kiểm tra an toàn",
    viDescription: "Nếu Wattpad bị chặn hoặc chỉ vào được bằng VPN, hãy kiểm tra DNS, ISP, trạng thái app, rủi ro riêng tư và cách nghe an toàn.",
    viFocus: "kiểm tra Wattpad bị chặn hoặc cần VPN",
    viScenario: "xử lý lỗi truy cập Wattpad, tin đồn phải dùng VPN, đổi DNS, lỗi tải app và nghe truyện cá nhân khi kết nối không ổn định"
  }),
  accessIssueTopic({
    slug: "wattpad-khong-vao-duoc",
    enTitle: "Wattpad Not Working or Not Opening: Troubleshooting Guide",
    enDescription: "Wattpad not working? Check app errors, browser loading, DNS, network issues, and ways to keep listening responsibly.",
    enFocus: "fixing Wattpad not working or not opening",
    enScenario: "testing mobile data, Wi-Fi, browser errors, app loading loops, DNS problems, and story audio habits during outages",
    viTitle: "Wattpad không vào được: cách kiểm tra và xử lý",
    viDescription: "Wattpad không vào được? Kiểm tra lỗi app, trình duyệt, DNS, mạng và cách tiếp tục nghe truyện có trách nhiệm.",
    viFocus: "xử lý Wattpad không vào được",
    viScenario: "thử 4G/5G, Wi-Fi, lỗi trình duyệt, app tải mãi, vấn đề DNS và thói quen nghe truyện khi dịch vụ chập chờn"
  }),
  accessIssueTopic({
    slug: "wattpad-loi-dns-khong-tai-duoc",
    enTitle: "Wattpad DNS Error or Loading Problem",
    enDescription: "A practical guide to Wattpad DNS errors, loading problems, network checks, privacy tradeoffs, and story audio backup habits.",
    enFocus: "understanding Wattpad DNS errors and loading problems",
    enScenario: "seeing blank pages, endless loading, DNS failures, connection resets, slow images, or app login problems",
    viTitle: "Wattpad lỗi DNS hoặc tải mãi không được",
    viDescription: "Hướng dẫn xử lý Wattpad lỗi DNS, tải mãi không được, kiểm tra mạng, quyền riêng tư và thói quen nghe dự phòng.",
    viFocus: "hiểu lỗi DNS Wattpad và lỗi tải trang",
    viScenario: "gặp trang trắng, tải mãi không xong, lỗi DNS, reset kết nối, ảnh tải chậm hoặc lỗi đăng nhập app"
  }),
  accessIssueTopic({
    slug: "nghe-truyen-khi-wattpad-bi-chan",
    enTitle: "How to Listen to Stories When Wattpad Is Unavailable",
    enDescription: "If Wattpad is unavailable, learn how to plan personal story listening, save chapter audio, and avoid unsafe downloads.",
    enFocus: "listening to stories when Wattpad is unavailable",
    enScenario: "keeping a personal listening routine during app errors, temporary outages, blocked access reports, or unstable networks",
    viTitle: "Cách nghe truyện khi Wattpad bị chặn hoặc không vào được",
    viDescription: "Khi Wattpad không vào được, đây là cách chuẩn bị nghe truyện cá nhân, audio theo chương và tránh tải file không an toàn.",
    viFocus: "nghe truyện khi Wattpad bị chặn hoặc không vào được",
    viScenario: "giữ thói quen nghe truyện cá nhân khi app lỗi, dịch vụ chập chờn, có tin bị chặn hoặc mạng không ổn định"
  }),
  searchIntentTopic({
    slug: "what-is-wattpad",
    enTitle: "What Is Wattpad?",
    enDescription: "A simple guide to what Wattpad is, how readers discover stories, and where audio listening with Watt Audio fits.",
    enAudience: "new readers who have heard about Wattpad and want to understand the social storytelling platform before listening to stories",
    enFocus: "understanding what Wattpad is",
    enScenario: "discovering serialized fiction, fanfiction, romance, fantasy, werewolf stories, and community-written chapters for the first time",
    viTitle: "Wattpad là gì?",
    viDescription: "Giải thích Wattpad là gì, người đọc khám phá truyện như thế nào và Watt Audio phù hợp ở đâu khi muốn nghe truyện.",
    viAudience: "người đọc mới nghe đến Wattpad và muốn hiểu nền tảng truyện cộng đồng trước khi chuyển sang nghe audio",
    viFocus: "hiểu Wattpad là gì",
    viScenario: "khám phá truyện đăng kỳ, fanfiction, romance, fantasy, werewolf và các chương do cộng đồng viết lần đầu"
  }),
  searchIntentTopic({
    slug: "can-you-listen-to-wattpad-stories",
    enTitle: "Can You Listen to Wattpad Stories?",
    enDescription: "Can you listen to Wattpad stories? Compare built-in text to speech, phone readers, browser tools, and Watt Audio.",
    enAudience: "readers who want to know whether Wattpad stories can be heard like audio chapters instead of read on screen",
    enFocus: "listening to Wattpad stories",
    enScenario: "checking whether a story can become audio for commutes, night reading, long chapters, or hands-free listening",
    viTitle: "Có nghe truyện Wattpad được không?",
    viDescription: "Có nghe truyện Wattpad được không? So sánh text to speech, trình đọc điện thoại, công cụ trình duyệt và Watt Audio.",
    viAudience: "người đọc muốn biết truyện Wattpad có thể nghe như audio theo chương thay vì đọc trên màn hình không",
    viFocus: "nghe truyện Wattpad",
    viScenario: "kiểm tra cách biến truyện thành audio để nghe khi đi làm, đọc đêm, chương dài hoặc nghe rảnh tay"
  }),
  searchIntentTopic({
    slug: "why-readers-prefer-audio",
    enTitle: "Why Readers Prefer Audio",
    enDescription: "Why many web fiction readers prefer audio for long chapters, screen fatigue, multitasking, commuting, and bedtime.",
    enAudience: "readers comparing reading on screen with listening to AI voice audio for web fiction and Wattpad-style stories",
    enFocus: "why readers prefer audio",
    enScenario: "reducing screen fatigue while keeping up with updates during chores, travel, exercise, or quiet evening routines",
    viTitle: "Vì sao nhiều người thích nghe audio hơn đọc?",
    viDescription: "Lý do người đọc truyện mạng thích audio: chương dài, mỏi mắt, multitasking, commute và nghe trước khi ngủ.",
    viAudience: "người đọc đang so sánh đọc trên màn hình với nghe audio giọng AI cho web fiction và truyện kiểu Wattpad",
    viFocus: "vì sao người đọc thích audio",
    viScenario: "giảm mỏi mắt nhưng vẫn theo kịp chương mới khi làm việc nhà, di chuyển, tập luyện hoặc nghe yên tĩnh buổi tối"
  }),
  searchIntentTopic({
    slug: "how-to-convert-wattpad-stories-into-audio",
    enTitle: "How to Convert Wattpad Stories into Audio",
    enDescription: "Step-by-step guide to converting Wattpad-style stories into chapter audio with AI voice and Watt Audio.",
    enAudience: "readers who search for a direct way to convert Wattpad stories into audio without recording narration themselves",
    enFocus: "converting Wattpad stories into audio",
    enScenario: "building a personal listening queue from chapters you can access instead of keeping many story tabs open",
    viTitle: "Cách chuyển truyện Wattpad thành audio",
    viDescription: "Hướng dẫn từng bước chuyển truyện kiểu Wattpad thành audio theo chương bằng giọng AI và Watt Audio.",
    viAudience: "người đọc tìm cách chuyển truyện Wattpad thành audio mà không phải tự thu âm",
    viFocus: "chuyển truyện Wattpad thành audio",
    viScenario: "tạo hàng chờ nghe cá nhân từ những chương bạn có quyền truy cập thay vì giữ nhiều tab truyện"
  }),
  searchIntentTopic({
    slug: "best-app-to-listen-to-wattpad-stories",
    enTitle: "Best App to Listen to Wattpad Stories",
    enDescription: "What makes the best app to listen to Wattpad stories: link import, chapter audio, offline replay, and story controls.",
    enAudience: "readers comparing apps for listening to Wattpad stories, text to speech, AI voice readers, and audiobook-style players",
    enFocus: "choosing the best app to listen to Wattpad stories",
    enScenario: "testing story audio apps before choosing one daily workflow for romance, fantasy, fanfiction, and long serialized fiction",
    viTitle: "App tốt nhất để nghe truyện Wattpad cần gì?",
    viDescription: "Các tiêu chí chọn app nghe truyện Wattpad: nhập link, audio theo chương, nghe lại offline và điều khiển cho truyện.",
    viAudience: "người đọc đang so sánh app nghe Wattpad, text to speech, giọng AI và trình phát kiểu audiobook",
    viFocus: "chọn app tốt nhất để nghe truyện Wattpad",
    viScenario: "thử các app nghe truyện trước khi chọn workflow hằng ngày cho romance, fantasy, fanfiction và truyện dài đăng kỳ"
  }),
  searchIntentTopic({
    slug: "best-werewolf-stories",
    enTitle: "Best Werewolf Stories to Listen To",
    enDescription: "How to choose the best werewolf stories for audio listening, from mate bonds and pack drama to chapter pacing.",
    enAudience: "readers who enjoy werewolf fiction and want a better way to listen to long pack romance and supernatural chapters",
    enFocus: "finding the best werewolf stories to listen to",
    enScenario: "following mate-bond tension, alpha politics, pack rivalries, supernatural reveals, and cliffhanger chapters hands-free",
    viTitle: "Truyện werewolf hay để nghe audio",
    viDescription: "Cách chọn truyện werewolf hợp để nghe audio: mate bond, drama bầy đàn, romance siêu nhiên và nhịp chương.",
    viAudience: "người đọc thích werewolf fiction và muốn nghe các chương romance bầy đàn, siêu nhiên dài hơn",
    viFocus: "tìm truyện werewolf hay để nghe",
    viScenario: "theo dõi mate bond, alpha drama, cạnh tranh bầy đàn, twist siêu nhiên và cliffhanger khi rảnh tay"
  }),
  searchIntentTopic({
    slug: "best-romance-stories",
    enTitle: "Best Romance Stories to Listen To",
    enDescription: "A guide to choosing romance stories that work well in audio, with pacing tips for slow burn, drama, and rereads.",
    enAudience: "romance readers searching for emotional stories that are comfortable to hear through chapter audio",
    enFocus: "finding the best romance stories to listen to",
    enScenario: "enjoying slow burn tension, dialogue-heavy chapters, confession scenes, breakup arcs, and comfort rereads without eye strain",
    viTitle: "Truyện romance hay để nghe audio",
    viDescription: "Cách chọn truyện romance hợp nghe audio, từ slow burn, drama, cảnh tỏ tình đến đọc lại chương yêu thích.",
    viAudience: "người đọc romance muốn tìm truyện tình cảm nghe bằng audio theo chương thật dễ chịu",
    viFocus: "tìm truyện romance hay để nghe",
    viScenario: "nghe slow burn, chương nhiều đối thoại, cảnh tỏ tình, drama chia tay và đọc lại chương comfort mà không mỏi mắt"
  }),
  searchIntentTopic({
    slug: "best-ceo-romance-stories",
    enTitle: "Best CEO Romance Stories to Listen To",
    enDescription: "How to pick CEO romance stories for audio listening, including office tension, contract romance, and dramatic chapters.",
    enAudience: "readers who like CEO romance, billionaire romance, office drama, and contract relationship stories",
    enFocus: "finding the best CEO romance stories to listen to",
    enScenario: "listening to office tension, power dynamics, contract marriage chapters, dramatic reveals, and addictive cliffhangers",
    viTitle: "Truyện CEO romance hay để nghe audio",
    viDescription: "Cách chọn truyện CEO romance hợp nghe audio: office tension, hợp đồng tình yêu, drama và cliffhanger.",
    viAudience: "người đọc thích CEO romance, billionaire romance, drama công sở và truyện hợp đồng tình cảm",
    viFocus: "tìm truyện CEO romance hay để nghe",
    viScenario: "nghe office tension, quyền lực trong tình yêu, cưới hợp đồng, reveal kịch tính và cliffhanger gây nghiện"
  }),
  searchIntentTopic({
    slug: "best-fantasy-romance-stories",
    enTitle: "Best Fantasy Romance Stories to Listen To",
    enDescription: "A guide to fantasy romance stories that work well in audio, from magic systems to emotional relationship arcs.",
    enAudience: "readers who love fantasy romance, magical worlds, enemies-to-lovers arcs, and long serialized chapters",
    enFocus: "finding the best fantasy romance stories to listen to",
    enScenario: "following magical rules, world-building, romantic tension, battles, court intrigue, and emotional arcs by chapter",
    viTitle: "Truyện fantasy romance hay để nghe audio",
    viDescription: "Gợi ý cách chọn fantasy romance hợp nghe audio, từ hệ thống phép thuật đến tuyến tình cảm nhiều cảm xúc.",
    viAudience: "người đọc thích fantasy romance, thế giới phép thuật, enemies-to-lovers và truyện dài đăng kỳ",
    viFocus: "tìm truyện fantasy romance hay để nghe",
    viScenario: "theo dõi luật phép thuật, world-building, căng thẳng tình cảm, chiến đấu, cung đấu và arc cảm xúc theo chương"
  }),
  searchIntentTopic({
    slug: "best-fanfiction-stories",
    enTitle: "Best Fanfiction Stories to Listen To",
    enDescription: "How to choose fanfiction stories that work for audio listening, with tips for dialogue, canon context, and long arcs.",
    enAudience: "fanfiction readers who want to listen to favorite fandom stories, alternate universe arcs, and long chapter updates",
    enFocus: "finding the best fanfiction stories to listen to",
    enScenario: "catching up with alternate universe chapters, character dialogue, ship moments, long arcs, and comfort rereads",
    viTitle: "Fanfiction hay để nghe audio",
    viDescription: "Cách chọn fanfiction hợp nghe audio: đối thoại, bối cảnh canon, alternate universe và arc dài.",
    viAudience: "người đọc fanfiction muốn nghe fandom yêu thích, alternate universe và cập nhật chương dài",
    viFocus: "tìm fanfiction hay để nghe",
    viScenario: "nghe alternate universe, đối thoại nhân vật, ship moment, arc dài và đọc lại comfort fic"
  }),
  searchIntentTopic({
    slug: "watt-audio-vs-speechify",
    enTitle: "Watt Audio vs Speechify",
    enDescription: "Compare Watt Audio vs Speechify for Wattpad-style stories, documents, PDFs, websites, and chapter-based listening.",
    enAudience: "readers comparing a broad text to speech app like Speechify with a story-focused audio workflow like Watt Audio",
    enFocus: "comparing Watt Audio vs Speechify",
    enScenario: "deciding whether you need document reading, website reading, PDF listening, or a chapter library for serialized fiction",
    viTitle: "Watt Audio vs Speechify",
    viDescription: "So sánh Watt Audio và Speechify cho truyện kiểu Wattpad, tài liệu, PDF, website và nghe theo chương.",
    viAudience: "người đọc đang so sánh app text to speech rộng như Speechify với workflow nghe truyện tập trung như Watt Audio",
    viFocus: "so sánh Watt Audio và Speechify",
    viScenario: "quyết định bạn cần đọc tài liệu, nghe website/PDF hay thư viện chương cho truyện đăng kỳ"
  }),
  searchIntentTopic({
    slug: "watt-audio-vs-elevenlabs-reader",
    enTitle: "Watt Audio vs ElevenLabs Reader",
    enDescription: "Compare Watt Audio vs ElevenLabs Reader for AI voices, documents, ePubs, web articles, and story chapter listening.",
    enAudience: "readers comparing ElevenLabs Reader with Watt Audio for AI voice listening and long fiction chapters",
    enFocus: "comparing Watt Audio vs ElevenLabs Reader",
    enScenario: "choosing between a polished AI reader for many text formats and a story-focused app for supported chapter links",
    viTitle: "Watt Audio vs ElevenLabs Reader",
    viDescription: "So sánh Watt Audio và ElevenLabs Reader cho giọng AI, tài liệu, ePub, bài web và nghe truyện theo chương.",
    viAudience: "người đọc so sánh ElevenLabs Reader với Watt Audio để nghe giọng AI và truyện dài theo chương",
    viFocus: "so sánh Watt Audio và ElevenLabs Reader",
    viScenario: "chọn giữa trình đọc AI cho nhiều định dạng văn bản và app tập trung vào link truyện theo chương"
  }),
  searchIntentTopic({
    slug: "best-apps-to-listen-to-stories-faq",
    enTitle: "Best Apps to Listen to Stories: FAQ",
    enDescription: "FAQ guide to the best apps for listening to stories, including audiobooks, text to speech, AI readers, and Watt Audio.",
    enAudience: "readers choosing between audiobook apps, TTS readers, AI voice apps, browser readers, and story-specific listening tools",
    enFocus: "choosing the best apps to listen to stories",
    enScenario: "answering common questions about listening to fiction, web novels, Wattpad-style stories, PDFs, articles, and offline audio",
    viTitle: "FAQ: App tốt nhất để nghe truyện",
    viDescription: "FAQ chọn app nghe truyện: audiobook, text to speech, AI reader, trình đọc web và Watt Audio.",
    viAudience: "người đọc đang chọn giữa app audiobook, TTS reader, app giọng AI, trình đọc trình duyệt và công cụ nghe truyện riêng",
    viFocus: "chọn app tốt nhất để nghe truyện",
    viScenario: "trả lời câu hỏi thường gặp về nghe fiction, web novel, truyện kiểu Wattpad, PDF, bài viết và audio offline"
  }),
  {
    slug: "how-to-listen-to-wattpad-stories",
    en: {
      title: "How to Listen to Wattpad Stories as Audio on iOS & Android",
      description: "Listen to Wattpad stories as audio with chapter playback, text to speech, background listening, and Watt Audio on iOS or Android.",
      audience: "readers who already love Wattpad but do not always have the time or eye comfort to read every chapter on screen",
      focus: "listening to Wattpad stories",
      scenario: "commuting, cleaning, walking, resting your eyes at night, or catching up on long chapters while your phone stays in your pocket",
      screenshot: "App library with a Wattpad story added and several chapters ready to generate audio.",
      steps: [
        "Open the Wattpad story you want to hear and copy the story link from your browser or the share menu.",
        "Open Watt Audio, tap the option to add a new story, and paste the Wattpad link into the input field.",
        "Let the app import the story structure so the chapters appear in your personal listening library.",
        "Choose the chapter you want, generate audio with the on-device AI voice, then press play when the chapter is ready.",
        "Use playback controls such as speed, sleep timer, chapter navigation, and background listening to match the way you read."
      ],
      tips: [
        "Start with one chapter before generating a whole reading session, especially if the story has many long chapters.",
        "Use a slower speed for emotional scenes and a faster speed for recaps, author's notes, or familiar rereads.",
        "Download or generate audio before you leave stable Wi-Fi if you plan to listen while traveling."
      ],
      faq: [
        ["How to listen to stories on Wattpad?", "The easiest workflow is to keep reading from the original story source, then use Watt Audio for supported story links when you want chapter audio, background playback, and less screen time."],
        ["How to get Wattpad to read to you?", "You can try phone accessibility voices, browser text to speech, or a story-focused app like Watt Audio when you want cleaner chapter controls."],
        ["Can I listen with the screen off?", "Yes. After audio has been created for a chapter, you can listen while the screen is locked, which is the main advantage over trying to read a web page directly."],
        ["Does this replace the original Wattpad app?", "No. Watt Audio is a companion listening workflow for readers who want audio from stories they already access."],
        ["Is it good for long stories?", "It is especially useful for long stories because you can move through chapters during small pockets of time instead of waiting for a reading session."]
      ]
    },
    vi: {
      title: "Cách nghe truyện Wattpad bằng audio",
      description: "Hướng dẫn nghe truyện Wattpad bằng giọng đọc AI, phát nền, nghe khi tắt màn hình và quản lý chương trong Watt Audio.",
      audience: "người đọc Wattpad muốn tiếp tục theo dõi truyện khi không tiện nhìn màn hình liên tục",
      focus: "nghe truyện Wattpad bằng audio",
      scenario: "đi làm, dọn nhà, đi bộ, nghỉ mắt buổi tối hoặc nghe tiếp chương dài khi điện thoại nằm trong túi",
      screenshot: "Thư viện app với một truyện Wattpad đã thêm và nhiều chương sẵn sàng tạo audio.",
      steps: [
        "Mở truyện Wattpad bạn muốn nghe rồi copy link truyện từ trình duyệt hoặc menu chia sẻ.",
        "Mở Watt Audio, chọn thêm truyện mới và dán link Wattpad vào ô nhập.",
        "Để app nhận diện cấu trúc truyện, sau đó các chương sẽ xuất hiện trong thư viện nghe cá nhân.",
        "Chọn chương muốn nghe, tạo audio bằng giọng đọc AI trên thiết bị rồi bấm phát khi chương đã sẵn sàng.",
        "Dùng các điều khiển như tốc độ đọc, hẹn giờ ngủ, chuyển chương và phát nền để nghe theo thói quen của bạn."
      ],
      tips: [
        "Hãy thử một chương trước khi tạo audio cho cả buổi nghe, nhất là với truyện có nhiều chương dài.",
        "Giảm tốc độ với cảnh cảm xúc, tăng nhẹ tốc độ khi nghe lại hoặc nghe phần ghi chú quen thuộc.",
        "Tạo audio trước khi rời Wi-Fi ổn định nếu bạn định nghe khi di chuyển."
      ],
      faq: [
        ["Làm sao để nghe truyện trên Wattpad?", "Bạn có thể tiếp tục dùng nguồn truyện gốc, rồi dùng Watt Audio với link truyện được hỗ trợ khi muốn nghe audio theo chương, phát nền và giảm thời gian nhìn màn hình."],
        ["Làm sao để Wattpad đọc truyện cho mình?", "Bạn có thể thử giọng accessibility của điện thoại, text to speech trên trình duyệt hoặc app tập trung vào truyện như Watt Audio nếu muốn điều khiển chương sạch hơn."],
        ["Có nghe khi tắt màn hình được không?", "Có. Sau khi audio của chương đã được tạo, bạn có thể nghe khi khóa màn hình, giống một trải nghiệm audiobook tiện hơn việc đọc web trực tiếp."],
        ["Watt Audio có thay thế Wattpad không?", "Không. Watt Audio là công cụ nghe bổ trợ cho những truyện bạn đã truy cập và muốn nghe theo cách linh hoạt hơn."],
        ["Truyện dài có phù hợp không?", "Rất phù hợp, vì bạn có thể đi qua từng chương trong các khoảng thời gian nhỏ thay vì phải ngồi đọc một mạch."]
      ]
    }
  },
  searchIntentTopic({
    slug: "how-to-listen-to-stories-on-wattpad",
    enTitle: "How to Listen to Stories on Wattpad Without Reading",
    enDescription: "How to listen to stories on Wattpad using text to speech, read aloud tools, chapter audio, and Watt Audio on mobile.",
    enAudience: "readers who search how to listen to stories on Wattpad and want a practical audio workflow instead of constant scrolling",
    enFocus: "how to listen to stories on Wattpad",
    enScenario: "turning long chapters into personal audio for commutes, bedtime, chores, rereads, and hands-free story sessions",
    viTitle: "Cách nghe truyện trên Wattpad",
    viDescription: "Cách nghe truyện trên Wattpad bằng text to speech, giọng điện thoại, audio theo chương và Watt Audio.",
    viAudience: "người đọc search cách nghe truyện trên Wattpad và muốn workflow audio thực tế thay vì cuộn đọc liên tục",
    viFocus: "cách nghe truyện trên Wattpad",
    viScenario: "biến chương dài thành audio cá nhân để nghe khi đi làm, trước khi ngủ, làm việc nhà, đọc lại và rảnh tay"
  }),
  searchIntentTopic({
    slug: "does-wattpad-have-audiobooks",
    enTitle: "Does Wattpad Have Audiobooks? Audio Options Explained",
    enDescription: "Does Wattpad have audiobooks? Compare official audio, text to speech, read aloud tools, and Watt Audio for personal chapter listening.",
    enAudience: "readers asking whether Wattpad has audiobooks, audio stories, text to speech, or a way to hear long chapters",
    enFocus: "whether Wattpad has audiobooks",
    enScenario: "comparing official audiobooks, audio stories, AI voice readers, and personal chapter audio before choosing how to listen",
    viTitle: "Wattpad có audiobook không?",
    viDescription: "Wattpad có audiobook không? Tìm hiểu audio chính thức, text to speech và Watt Audio cho nhu cầu nghe cá nhân.",
    viAudience: "người đọc hỏi Wattpad có audiobook, truyện audio, text to speech hoặc cách nghe chương dài không",
    viFocus: "Wattpad có audiobook không",
    viScenario: "so sánh audiobook chính thức, truyện audio, app đọc giọng AI và audio theo chương cá nhân trước khi chọn cách nghe"
  }),
  searchIntentTopic({
    slug: "wattpad-audiobook-reader-guide",
    enTitle: "Wattpad Audiobook: Reader Guide",
    enDescription: "A reader guide to Wattpad audiobook searches, audio stories, text to speech, and Watt Audio chapter listening.",
    enAudience: "readers searching Wattpad audiobook, Wattpad audiobooks, audiobook app, or audio books for serialized fiction",
    enFocus: "Wattpad audiobook options",
    enScenario: "finding a comfortable way to hear serialized fiction, romance, fantasy, fanfiction, and long story updates",
    viTitle: "Wattpad audiobook: hướng dẫn cho người đọc",
    viDescription: "Hướng dẫn về Wattpad audiobook, truyện audio, text to speech và cách nghe theo chương bằng Watt Audio.",
    viAudience: "người đọc search Wattpad audiobook, Wattpad audiobooks, app audiobook hoặc audio books cho truyện đăng kỳ",
    viFocus: "các lựa chọn Wattpad audiobook",
    viScenario: "tìm cách nghe truyện đăng kỳ, romance, fantasy, fanfiction và chương dài một cách dễ chịu hơn"
  }),
  searchIntentTopic({
    slug: "how-to-get-wattpad-to-read-to-you",
    enTitle: "Can Wattpad Read to You? Read Aloud Options",
    enDescription: "Can Wattpad read to you? Compare read aloud, phone text to speech, AI voice, screen-off listening, and Watt Audio.",
    enAudience: "readers asking can Wattpad read to you, how to get Wattpad to read aloud, or how to listen with the screen off",
    enFocus: "whether Wattpad can read to you",
    enScenario: "using read-aloud tools, text to speech voices, generated chapter audio, and background playback for long stories",
    viTitle: "Wattpad có đọc truyện cho bạn được không?",
    viDescription: "Wattpad có đọc truyện cho bạn được không? So sánh text to speech, read aloud, giọng AI và Watt Audio.",
    viAudience: "người đọc hỏi Wattpad có đọc truyện thành tiếng không, cách để Wattpad đọc truyện hoặc nghe khi tắt màn hình",
    viFocus: "Wattpad có đọc truyện cho bạn được không",
    viScenario: "dùng công cụ read-aloud, giọng text to speech, audio theo chương đã tạo và phát nền cho truyện dài"
  }),
  searchIntentTopic({
    slug: "how-to-add-text-to-speech-in-wattpad",
    enTitle: "How to Add Text to Speech on Wattpad",
    enDescription: "How to add text to speech on Wattpad with phone read aloud settings, browser tools, AI voice apps, and Watt Audio.",
    enAudience: "readers searching how to add text to speech in Wattpad because they want stories read aloud without constant scrolling",
    enFocus: "how to add text to speech in Wattpad",
    enScenario: "testing phone accessibility voices, browser read aloud, AI voice apps, and chapter audio for long Wattpad stories",
    viTitle: "Cách thêm text to speech vào Wattpad",
    viDescription: "Cách thêm text to speech vào Wattpad bằng cài đặt đọc màn hình, trình duyệt, giọng AI và Watt Audio.",
    viAudience: "người đọc tìm cách thêm text to speech vào Wattpad để nghe truyện thay vì cuộn đọc liên tục",
    viFocus: "cách thêm text to speech vào Wattpad",
    viScenario: "thử giọng accessibility, read aloud trên trình duyệt, app giọng AI và audio theo chương cho truyện Wattpad dài"
  }),
  searchIntentTopic({
    slug: "does-wattpad-have-text-to-speech",
    enTitle: "Does Wattpad Have Text to Speech? TTS Guide",
    enDescription: "Does Wattpad have text to speech? Learn read aloud options, phone TTS limits, and when Watt Audio helps with chapter audio.",
    enAudience: "readers asking whether Wattpad has text to speech, read aloud, audio stories, or an easier way to hear chapters",
    enFocus: "whether Wattpad has text to speech",
    enScenario: "checking official app options, phone accessibility, browser TTS, story audio apps, and personal listening routines",
    viTitle: "Wattpad có text to speech không?",
    viDescription: "Wattpad có text to speech không? Tìm hiểu read aloud, giọng điện thoại và khi nào Watt Audio hữu ích.",
    viAudience: "người đọc hỏi Wattpad có text to speech, read aloud, truyện audio hoặc cách nghe chương dễ hơn không",
    viFocus: "Wattpad có text to speech không",
    viScenario: "kiểm tra lựa chọn trong app, accessibility điện thoại, TTS trình duyệt, app nghe truyện và workflow cá nhân"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-on-android",
    enTitle: "Wattpad Audio on Android",
    enDescription: "How to listen to Wattpad audio on Android with text to speech, chapter audio, background playback, and Watt Audio.",
    enAudience: "Android readers searching for Wattpad audio, read aloud tools, text to speech, or a story listening app on Google Play",
    enFocus: "listening to Wattpad audio on Android",
    enScenario: "turning long story chapters into audio on an Android phone for commuting, chores, bedtime, and hands-free listening",
    viTitle: "Nghe Wattpad audio trên Android",
    viDescription: "Cách nghe Wattpad audio trên Android bằng text to speech, audio theo chương, phát nền và Watt Audio.",
    viAudience: "người dùng Android tìm Wattpad audio, read aloud, text to speech hoặc app nghe truyện trên Google Play",
    viFocus: "nghe Wattpad audio trên Android",
    viScenario: "chuyển chương truyện dài thành audio trên điện thoại Android để nghe khi đi làm, làm việc nhà, trước khi ngủ và rảnh tay"
  }),
  searchIntentTopic({
    slug: "wattpad-text-to-speech-android",
    enTitle: "Wattpad Text to Speech on Android",
    enDescription: "Use Wattpad text to speech on Android with read aloud settings, TTS apps, AI voices, and Watt Audio chapter listening.",
    enAudience: "Android users who want Wattpad stories read aloud without keeping the screen open or selecting text repeatedly",
    enFocus: "using Wattpad text to speech on Android",
    enScenario: "testing Android read aloud, browser TTS, AI voice apps, and a chapter-based listening library for web fiction",
    viTitle: "Wattpad text to speech trên Android",
    viDescription: "Cách dùng Wattpad text to speech trên Android bằng read aloud, app TTS, giọng AI và Watt Audio.",
    viAudience: "người dùng Android muốn nghe truyện Wattpad đọc thành tiếng mà không phải mở màn hình hoặc chọn text liên tục",
    viFocus: "dùng Wattpad text to speech trên Android",
    viScenario: "thử read aloud Android, TTS trình duyệt, app giọng AI và thư viện nghe theo chương cho truyện mạng"
  }),
  searchIntentTopic({
    slug: "does-wattpad-read-to-you",
    enTitle: "Does Wattpad Read to You?",
    enDescription: "Does Wattpad read to you? Understand read aloud, text to speech, audio stories, and Watt Audio for chapter listening.",
    enAudience: "readers typing does Wattpad read to you because they want stories spoken aloud instead of read on screen",
    enFocus: "whether Wattpad reads to you",
    enScenario: "finding a practical way to hear chapters during screen breaks, commutes, chores, and late-night story sessions",
    viTitle: "Wattpad có tự đọc truyện cho bạn không?",
    viDescription: "Wattpad có tự đọc truyện cho bạn không? Tìm hiểu read aloud, text to speech, truyện audio và Watt Audio.",
    viAudience: "người đọc hỏi Wattpad có tự đọc truyện không vì muốn nghe truyện thay vì nhìn màn hình",
    viFocus: "Wattpad có tự đọc truyện cho bạn không",
    viScenario: "tìm cách nghe chương truyện khi nghỉ mắt, đi làm, làm việc nhà hoặc đọc khuya"
  }),
  searchIntentTopic({
    slug: "can-wattpad-read-stories-aloud",
    enTitle: "Can Wattpad Read Stories Aloud?",
    enDescription: "Can Wattpad read stories aloud? Compare built-in audio, accessibility voices, browser read aloud, and Watt Audio.",
    enAudience: "readers searching can Wattpad read stories aloud, Wattpad read aloud, or how to hear stories with the screen off",
    enFocus: "whether Wattpad can read stories aloud",
    enScenario: "choosing between accessibility settings, browser tools, generic TTS apps, and generated chapter audio",
    viTitle: "Wattpad có đọc truyện thành tiếng không?",
    viDescription: "Wattpad có đọc truyện thành tiếng không? So sánh audio có sẵn, accessibility, trình duyệt và Watt Audio.",
    viAudience: "người đọc tìm Wattpad read aloud, đọc truyện thành tiếng hoặc cách nghe truyện khi tắt màn hình",
    viFocus: "Wattpad có đọc truyện thành tiếng không",
    viScenario: "chọn giữa cài đặt accessibility, công cụ trình duyệt, app TTS chung và audio theo chương"
  }),
  searchIntentTopic({
    slug: "how-to-listen-to-wattpad-offline",
    enTitle: "How to Listen to Wattpad Offline",
    enDescription: "How to listen to Wattpad offline or with less screen time using prepared chapter audio, text to speech, and Watt Audio.",
    enAudience: "readers who want to keep up with Wattpad stories while traveling, commuting, or away from stable internet",
    enFocus: "listening to Wattpad offline",
    enScenario: "preparing story audio before a trip, low-signal commute, flight, or bedtime session where reopening pages is annoying",
    viTitle: "Cách nghe Wattpad offline",
    viDescription: "Cách nghe Wattpad offline hoặc giảm thời gian nhìn màn hình bằng audio theo chương, text to speech và Watt Audio.",
    viAudience: "người đọc muốn theo dõi truyện Wattpad khi đi xa, đi làm hoặc không có internet ổn định",
    viFocus: "nghe Wattpad offline",
    viScenario: "chuẩn bị audio trước chuyến đi, lúc sóng yếu, trên máy bay hoặc buổi nghe trước khi ngủ"
  }),
  searchIntentTopic({
    slug: "watts-audio",
    enTitle: "Watts Audio or Watt Audio?",
    enDescription: "Searching for Watts Audio? The app name is Watt Audio: an iOS story audio app for Wattpad-style listening.",
    enAudience: "people who typed watts audio, watt audio, wattaudio, or Watt Audio while looking for the story listening app",
    enFocus: "finding Watt Audio after searching Watts Audio",
    enScenario: "correcting a common brand typo and finding the app for Wattpad audio, text to speech stories, and AI voice listening",
    viTitle: "Watts Audio hay Watt Audio?",
    viDescription: "Nếu bạn search Watts Audio, tên đúng là Watt Audio: app mobile nghe truyện bằng audio và giọng AI.",
    viAudience: "người dùng gõ watts audio, watt audio, wattaudio hoặc Watt Audio khi tìm app nghe truyện",
    viFocus: "tìm Watt Audio sau khi search Watts Audio",
    viScenario: "sửa lỗi gõ tên thương hiệu và tìm app cho Wattpad audio, text to speech cho truyện và giọng đọc AI"
  }),
  {
    slug: "how-to-convert-wattpad-to-audio",
    en: {
      title: "How to Convert Wattpad to Audio",
      description: "Learn how to convert Wattpad chapters into listenable audio using Watt Audio and practical text to speech habits.",
      audience: "busy readers searching for a simple way to turn Wattpad chapters into audio without manually recording anything",
      focus: "converting Wattpad to audio",
      scenario: "building a private listening queue from chapters you want to hear later, instead of keeping dozens of browser tabs open",
      screenshot: "Conversion screen showing a Wattpad chapter being turned into an audio file.",
      steps: [
        "Find the Wattpad story page or chapter page that you want to convert and copy the URL.",
        "Paste the URL into Watt Audio so the app can read the story metadata and list available chapters.",
        "Select a chapter and start audio generation. The app uses an AI reading voice on the device, so you do not have to record your own narration.",
        "Wait for the first chapter to finish, then play it once to make sure names, pacing, and chapter boundaries feel comfortable.",
        "Continue converting more chapters as needed and remove generated audio later if you want to free storage."
      ],
      tips: [
        "Convert chapters in small groups so your library stays organized and easy to manage.",
        "If a story updates often, add only the chapters you are about to hear instead of generating everything at once.",
        "Keep the original story link saved in your library so you can return when new chapters are available."
      ],
      faq: [
        ["Is converting the same as downloading an audiobook?", "No. You are creating listenable text to speech audio for personal use from a story link you provide."],
        ["Do I need a professional narrator?", "No. Watt Audio uses AI voice generation, which is designed for convenient listening rather than studio narration."],
        ["Can I delete converted audio?", "Yes. Generated chapter audio can be deleted when you need more space, and you can create it again later."]
      ]
    },
    vi: {
      title: "Cách chuyển Wattpad thành audio",
      description: "Cách chuyển chương Wattpad thành audio bằng Watt Audio, dùng giọng đọc AI và quản lý file nghe sau khi tạo.",
      audience: "người đọc bận rộn muốn biến chương Wattpad thành audio mà không phải tự thu âm",
      focus: "chuyển Wattpad thành audio",
      scenario: "tạo hàng chờ nghe riêng từ những chương muốn nghe sau, thay vì giữ quá nhiều tab trình duyệt",
      screenshot: "Màn hình tạo audio đang chuyển một chương Wattpad thành file nghe.",
      steps: [
        "Tìm trang truyện hoặc trang chương Wattpad bạn muốn chuyển rồi copy URL.",
        "Dán URL vào Watt Audio để app đọc thông tin truyện và hiển thị danh sách chương.",
        "Chọn một chương và bắt đầu tạo audio. App dùng giọng đọc AI trên thiết bị nên bạn không cần tự thu âm.",
        "Chờ chương đầu tiên hoàn tất, nghe thử để kiểm tra nhịp đọc, tên riêng và ranh giới chương.",
        "Tiếp tục tạo thêm chương khi cần và xóa audio đã tạo nếu muốn giải phóng dung lượng."
      ],
      tips: [
        "Tạo audio theo từng nhóm nhỏ để thư viện gọn và dễ quản lý.",
        "Nếu truyện cập nhật thường xuyên, chỉ nên tạo những chương sắp nghe thay vì tạo toàn bộ một lần.",
        "Giữ link truyện gốc trong thư viện để quay lại khi có chương mới."
      ],
      faq: [
        ["Chuyển audio có giống tải audiobook không?", "Không. Bạn tạo audio text to speech cho mục đích nghe cá nhân từ link truyện do bạn cung cấp."],
        ["Có cần người đọc chuyên nghiệp không?", "Không. Watt Audio dùng giọng AI, tập trung vào sự tiện lợi hơn là diễn đọc như phòng thu."],
        ["Có xóa audio đã tạo được không?", "Có. Bạn có thể xóa file audio của chương khi cần thêm dung lượng và tạo lại sau."]
      ]
    }
  },
  {
    slug: "best-wattpad-audiobook-app",
    en: {
      title: "Best Wattpad Audiobook App",
      description: "What to look for in a Wattpad audiobook app, from link import and chapter audio to offline listening and playback controls.",
      audience: "Wattpad readers comparing audiobook-style apps and text to speech tools",
      focus: "finding the best Wattpad audiobook app",
      scenario: "turning a reading habit into a flexible listening habit without losing chapter order, story context, or playback control",
      screenshot: "Home screen of Watt Audio with story cards, chapter progress, and a prominent play button.",
      steps: [
        "Look for simple story import from links, because copying a Wattpad URL should be faster than rebuilding a library by hand.",
        "Check whether the app organizes chapters clearly so you can continue the exact place where you stopped reading.",
        "Test audio generation on one chapter and listen for pacing, clarity, and whether the voice remains comfortable for long sessions.",
        "Confirm that the app supports background playback, lock-screen listening, speed changes, and sleep timer controls.",
        "Choose the tool that fits your actual routine, not the one with the longest feature list."
      ],
      tips: [
        "A good audiobook workflow should reduce friction, not create another library you have to babysit.",
        "Chapter-level control matters because web fiction is often serialized and updated irregularly.",
        "Offline playback is useful when stories become part of daily commutes or bedtime routines."
      ],
      faq: [
        ["What makes Watt Audio different from a generic screen reader?", "It is built around story links, chapters, generated audio, and listening controls rather than reading every visible element on a web page."],
        ["Is AI voice enough for fiction?", "For many readers, yes. It is not the same as a dramatic audiobook cast, but it makes long text much easier to consume."],
        ["Should I use it for every story?", "Use it where listening helps: long updates, rereads, casual chapters, and moments when reading on screen is inconvenient."]
      ]
    },
    vi: {
      title: "App nghe audiobook Wattpad tốt nhất cần gì?",
      description: "Các tiêu chí chọn app nghe Wattpad dạng audiobook: nhập link, tạo audio theo chương, nghe offline, phát nền và hẹn giờ.",
      audience: "người đọc Wattpad đang so sánh app nghe truyện, audiobook và công cụ text to speech",
      focus: "chọn app nghe audiobook Wattpad tốt nhất",
      scenario: "biến thói quen đọc thành thói quen nghe linh hoạt mà vẫn giữ thứ tự chương, ngữ cảnh truyện và điều khiển phát",
      screenshot: "Màn hình chính Watt Audio với thẻ truyện, tiến độ chương và nút phát nổi bật.",
      steps: [
        "Ưu tiên app nhập truyện bằng link đơn giản, vì copy URL Wattpad phải nhanh hơn việc tự tạo thư viện thủ công.",
        "Kiểm tra app có sắp xếp chương rõ ràng để bạn tiếp tục đúng nơi đang đọc dở.",
        "Tạo thử audio một chương và nghe nhịp đọc, độ rõ, cảm giác giọng khi nghe lâu.",
        "Đảm bảo app hỗ trợ phát nền, nghe khi khóa màn hình, đổi tốc độ và hẹn giờ ngủ.",
        "Chọn công cụ phù hợp với thói quen thật của bạn, không chỉ công cụ có danh sách tính năng dài nhất."
      ],
      tips: [
        "Một workflow audiobook tốt phải giảm thao tác, không tạo thêm một thư viện khó chăm sóc.",
        "Điều khiển theo chương rất quan trọng vì truyện mạng thường dài, đăng từng phần và cập nhật không đều.",
        "Nghe offline hữu ích khi truyện trở thành một phần của commute hoặc thói quen trước khi ngủ."
      ],
      faq: [
        ["Watt Audio khác gì trình đọc màn hình?", "App tập trung vào link truyện, chương, audio đã tạo và điều khiển nghe, thay vì đọc toàn bộ phần tử trên trang web."],
        ["Giọng AI có đủ cho truyện không?", "Với nhiều người đọc là đủ. Nó không giống diễn đọc phòng thu, nhưng giúp tiêu thụ văn bản dài dễ hơn nhiều."],
        ["Có nên dùng cho mọi truyện không?", "Hãy dùng khi nghe có lợi: chương dài, đọc lại, cập nhật nhẹ hoặc lúc không tiện nhìn màn hình."]
      ]
    }
  },
  searchIntentTopic({
    slug: "wattpad-audio-reader",
    enTitle: "Wattpad Audio Reader",
    enDescription: "How to use a Wattpad audio reader workflow to hear stories with chapter controls, AI voice, and Watt Audio.",
    enAudience: "readers searching for a Wattpad audio reader that feels closer to an audiobook player than a screen reader",
    enFocus: "using a Wattpad audio reader",
    enScenario: "hearing story updates during commutes, walks, chores, and bedtime without holding the phone open",
    viTitle: "Wattpad audio reader là gì?",
    viDescription: "Cách dùng Watt Audio như một Wattpad audio reader để nghe truyện theo chương, phát nền và dùng giọng AI.",
    viAudience: "người đọc đang tìm Wattpad audio reader giống trình nghe audiobook hơn là trình đọc màn hình",
    viFocus: "dùng Wattpad audio reader",
    viScenario: "nghe cập nhật truyện khi đi làm, đi bộ, dọn nhà hoặc trước khi ngủ mà không phải mở màn hình liên tục"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-free",
    enTitle: "Wattpad Audio Free Options",
    enDescription: "A practical look at free Wattpad audio options, text to speech limits, and when Watt Audio can help with personal listening.",
    enAudience: "readers searching for free ways to listen to Wattpad-style stories without committing to a full audiobook subscription",
    enFocus: "finding free Wattpad audio options",
    enScenario: "testing whether story audio fits your routine before paying for audiobook stores, subscriptions, or premium TTS tools",
    viTitle: "Cách nghe Wattpad audio miễn phí",
    viDescription: "Các lựa chọn nghe Wattpad audio miễn phí, giới hạn của text to speech và khi nào Watt Audio hữu ích cho nghe cá nhân.",
    viAudience: "người đọc muốn thử cách nghe truyện Wattpad miễn phí trước khi trả tiền cho audiobook hoặc app TTS cao cấp",
    viFocus: "tìm cách nghe Wattpad audio miễn phí",
    viScenario: "thử xem audio truyện có hợp thói quen hằng ngày trước khi dùng kho audiobook, subscription hoặc công cụ TTS trả phí"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-mp3",
    enTitle: "Wattpad Audio MP3: What Readers Should Know",
    enDescription: "Searching for Wattpad audio MP3? Learn safer alternatives for personal story listening with generated chapter audio.",
    enAudience: "readers who search for Wattpad audio MP3 but mainly want offline replay and a simpler way to hear long chapters",
    enFocus: "understanding Wattpad audio MP3 alternatives",
    enScenario: "preparing story chapters for offline-style listening without relying on random download sites or messy browser tabs",
    viTitle: "Wattpad audio MP3: nên hiểu thế nào?",
    viDescription: "Nếu bạn tìm Wattpad audio MP3, đây là cách nghĩ an toàn hơn về nghe truyện cá nhân bằng audio theo chương.",
    viAudience: "người đọc search Wattpad audio MP3 nhưng thật ra cần nghe lại offline và nghe chương dài dễ hơn",
    viFocus: "hiểu lựa chọn thay thế Wattpad audio MP3",
    viScenario: "chuẩn bị chương truyện để nghe kiểu offline mà không phải phụ thuộc website tải file lạ hoặc nhiều tab trình duyệt"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-download",
    enTitle: "Wattpad Audio Download Alternatives",
    enDescription: "Before searching for Wattpad audio download links, compare personal text to speech, chapter audio, and Watt Audio.",
    enAudience: "readers who search for Wattpad audio download because they want portable listening, not another reading screen",
    enFocus: "finding Wattpad audio download alternatives",
    enScenario: "listening on low-signal trips, long rides, flights, or quiet moments where reopening a web page is inconvenient",
    viTitle: "Lựa chọn thay thế Wattpad audio download",
    viDescription: "Trước khi tìm Wattpad audio download, hãy so sánh text to speech cá nhân, audio theo chương và Watt Audio.",
    viAudience: "người đọc tìm Wattpad audio download vì muốn nghe linh hoạt hơn chứ không muốn thêm một màn hình đọc",
    viFocus: "tìm lựa chọn thay thế Wattpad audio download",
    viScenario: "nghe khi sóng yếu, đi xa, trên máy bay hoặc những lúc mở lại trang web không tiện"
  }),
  searchIntentTopic({
    slug: "wattpad-audiobooks-free",
    enTitle: "Wattpad Audiobooks Free: Reader Guide",
    enDescription: "A guide to free Wattpad audiobook searches, official audio stories, text to speech, and personal listening with Watt Audio.",
    enAudience: "readers comparing free Wattpad audiobooks, official audio stories, audiobook stores, and AI voice reading apps",
    enFocus: "searching for free Wattpad audiobooks",
    enScenario: "deciding whether an official audiobook, a free audio story, or personal chapter audio is the right way to keep reading",
    viTitle: "Wattpad audiobooks free: hướng dẫn cho người đọc",
    viDescription: "Hướng dẫn tìm Wattpad audiobooks free, audio chính thức, text to speech và cách nghe cá nhân bằng Watt Audio.",
    viAudience: "người đọc đang so sánh Wattpad audiobooks miễn phí, audio chính thức, kho audiobook và app đọc giọng AI",
    viFocus: "tìm Wattpad audiobooks miễn phí",
    viScenario: "quyết định nên nghe audiobook chính thức, truyện audio miễn phí hay audio theo chương tự tạo để tiếp tục đọc"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-books",
    enTitle: "Wattpad Audio Books and Story Listening",
    enDescription: "How Wattpad audio books differ from text to speech story listening, and how Watt Audio fits chapter-based fiction.",
    enAudience: "readers searching for Wattpad audio books who want to understand the difference between audiobooks and AI story audio",
    enFocus: "comparing Wattpad audio books and story listening",
    enScenario: "choosing between polished audiobook narration, quick AI voice listening, and a chapter library for serialized fiction",
    viTitle: "Wattpad audio books và cách nghe truyện",
    viDescription: "Wattpad audio books khác gì text to speech cho truyện, và Watt Audio phù hợp thế nào với fiction theo chương.",
    viAudience: "người đọc tìm Wattpad audio books và muốn hiểu khác biệt giữa audiobook với audio truyện bằng AI",
    viFocus: "so sánh Wattpad audio books và cách nghe truyện",
    viScenario: "chọn giữa audiobook được thu chuyên nghiệp, nghe nhanh bằng giọng AI và thư viện chương cho truyện đăng kỳ"
  }),
  searchIntentTopic({
    slug: "wattpad-audio-romance",
    enTitle: "Wattpad Audio Romance Stories",
    enDescription: "How to listen to Wattpad audio romance stories with chapter audio, slower pacing, sleep timer, and Watt Audio.",
    enAudience: "romance readers searching specifically for Wattpad audio romance, romantic audiobooks, or hands-free story listening",
    enFocus: "listening to Wattpad audio romance stories",
    enScenario: "following slow-burn chapters, emotional dialogue, late-night updates, and favorite rereads without screen fatigue",
    viTitle: "Nghe Wattpad audio romance",
    viDescription: "Cách nghe truyện Wattpad audio romance bằng audio theo chương, nhịp đọc chậm hơn, hẹn giờ ngủ và Watt Audio.",
    viAudience: "người đọc romance đang tìm Wattpad audio romance, audiobook tình cảm hoặc cách nghe truyện rảnh tay",
    viFocus: "nghe Wattpad audio romance",
    viScenario: "theo dõi slow-burn, đối thoại cảm xúc, cập nhật ban đêm và đọc lại chương yêu thích mà không mỏi mắt"
  }),
  {
    slug: "listen-to-romance-stories-online",
    en: {
      title: "Listen to Romance Stories Online",
      description: "A reader-friendly guide to listening to romance stories online with chapter audio, pacing tips, and Watt Audio.",
      audience: "romance readers who want to enjoy emotional chapters hands-free",
      focus: "listening to romance stories online",
      scenario: "following slow-burn tension, dialogue-heavy scenes, and late-night chapters without staring at a bright screen",
      screenshot: "Romance story detail page with chapter list, play controls, and a sleep timer.",
      steps: [
        "Choose a romance story that you already want to follow and copy the story link from the source page.",
        "Add the link to Watt Audio and let the app place chapters into a listening-friendly library.",
        "Generate the first chapter and choose a playback speed that preserves emotion, pauses, and dialogue rhythm.",
        "Use the sleep timer for bedtime listening so the story does not continue far past the scene you remember.",
        "Return to the chapter list when new updates appear and generate only the latest chapters you want to hear."
      ],
      tips: [
        "Romance often depends on tone, so avoid pushing playback speed too high during confession scenes or emotional arguments.",
        "For rereads, faster playback can help you revisit favorite arcs without rereading every sentence manually.",
        "Use chapter notes or titles to remember where major relationship turns happen."
      ],
      faq: [
        ["Is text to speech good for romance?", "It can work very well for readers who care about convenience and continuity, especially for long serialized stories."],
        ["Can I listen before sleep?", "Yes. A sleep timer and background playback make romance chapters easier to enjoy at night."],
        ["What if character names sound unusual?", "AI voices can mispronounce names sometimes, but the overall story usually remains easy to follow."]
      ]
    },
    vi: {
      title: "Nghe truyện romance online",
      description: "Hướng dẫn nghe truyện romance online bằng audio theo chương, chỉnh nhịp đọc và dùng Watt Audio cho truyện tình cảm.",
      audience: "người đọc romance muốn thưởng thức chương cảm xúc mà không cần cầm điện thoại liên tục",
      focus: "nghe truyện romance online",
      scenario: "theo dõi slow-burn, cảnh đối thoại nhiều cảm xúc và các chương đọc khuya mà không phải nhìn màn hình sáng",
      screenshot: "Trang chi tiết truyện romance với danh sách chương, nút phát và hẹn giờ ngủ.",
      steps: [
        "Chọn truyện romance bạn muốn theo dõi rồi copy link từ trang nguồn.",
        "Thêm link vào Watt Audio để app đưa các chương vào thư viện nghe.",
        "Tạo chương đầu tiên và chọn tốc độ phát giữ được cảm xúc, khoảng ngắt và nhịp đối thoại.",
        "Dùng hẹn giờ ngủ khi nghe trước khi ngủ để truyện không chạy quá xa đoạn bạn nhớ.",
        "Quay lại danh sách chương khi có cập nhật mới và chỉ tạo audio cho các chương mới muốn nghe."
      ],
      tips: [
        "Romance phụ thuộc nhiều vào giọng điệu, đừng tăng tốc quá cao ở cảnh tỏ tình hoặc tranh cãi cảm xúc.",
        "Khi đọc lại, tốc độ nhanh hơn giúp bạn quay lại những arc yêu thích mà không phải đọc từng câu.",
        "Dùng tiêu đề chương hoặc ghi chú để nhớ các bước ngoặt quan trọng của mối quan hệ."
      ],
      faq: [
        ["Text to speech có hợp với romance không?", "Có thể rất hợp với người cần sự tiện lợi và mạch truyện liên tục, nhất là truyện dài đăng nhiều chương."],
        ["Có nghe trước khi ngủ được không?", "Có. Hẹn giờ ngủ và phát nền giúp nghe romance ban đêm dễ hơn."],
        ["Nếu tên nhân vật bị đọc lạ thì sao?", "Giọng AI đôi khi đọc sai tên riêng, nhưng tổng thể câu chuyện thường vẫn dễ theo dõi."]
      ]
    }
  },
  {
    slug: "listen-to-fantasy-stories-online",
    en: {
      title: "Listen to Fantasy Stories Online",
      description: "How to listen to fantasy stories online, manage long chapters, and use Watt Audio for web fiction and Wattpad fantasy.",
      audience: "fantasy readers dealing with long chapters, large casts, invented names, and world-building-heavy updates",
      focus: "listening to fantasy stories online",
      scenario: "getting through quests, magic systems, lore chapters, and battle scenes while commuting or doing chores",
      screenshot: "Fantasy story chapter screen with audio progress, speed control, and next-chapter navigation.",
      steps: [
        "Pick a fantasy story with chapters you want to continue and copy its link from the story page.",
        "Add the story to Watt Audio so the chapter list stays together instead of scattered across browser tabs.",
        "Generate one chapter first and check how the AI voice handles names, locations, spells, and dialogue.",
        "Use speed controls carefully. Dense lore chapters may need slower playback, while travel scenes may be comfortable faster.",
        "Keep listening progress by chapter so you can pause during a battle or reveal without losing your place."
      ],
      tips: [
        "Fantasy is easier to follow when you listen in chapter order and avoid jumping between unrelated arcs.",
        "If a story has a glossary or recap chapter, listen to it before returning after a long break.",
        "For invented names, context matters more than perfect pronunciation; the brain adjusts after a few minutes."
      ],
      faq: [
        ["Can AI read fantasy names correctly?", "Sometimes yes, sometimes no. The important part is consistent, clear listening that keeps the plot moving."],
        ["Is fantasy too complex for audio?", "Not if you use chapter-level listening and pause when the story introduces important rules or locations."],
        ["What speed is best?", "Start at normal speed, then adjust. Fantasy usually benefits from a slightly slower pace than light comedy or familiar rereads."]
      ]
    },
    vi: {
      title: "Nghe truyện fantasy online",
      description: "Cách nghe truyện fantasy online, quản lý chương dài và dùng Watt Audio cho Wattpad fantasy hoặc web fiction.",
      audience: "người đọc fantasy gặp chương dài, dàn nhân vật lớn, tên tự chế và nhiều đoạn xây dựng thế giới",
      focus: "nghe truyện fantasy online",
      scenario: "đi qua nhiệm vụ, hệ thống phép thuật, chương lore và cảnh chiến đấu trong lúc đi lại hoặc làm việc nhà",
      screenshot: "Màn hình chương fantasy với tiến độ audio, điều chỉnh tốc độ và chuyển chương tiếp theo.",
      steps: [
        "Chọn truyện fantasy có chương bạn muốn nghe tiếp và copy link từ trang truyện.",
        "Thêm truyện vào Watt Audio để danh sách chương nằm cùng một chỗ thay vì rải rác trong tab trình duyệt.",
        "Tạo thử một chương để kiểm tra giọng AI đọc tên riêng, địa danh, phép thuật và đối thoại.",
        "Dùng tốc độ cẩn thận. Chương nhiều lore nên nghe chậm hơn, còn cảnh di chuyển có thể nghe nhanh hơn.",
        "Giữ tiến độ theo chương để có thể dừng giữa trận chiến hoặc màn hé lộ mà không mất vị trí."
      ],
      tips: [
        "Fantasy dễ theo dõi hơn khi nghe đúng thứ tự chương và tránh nhảy giữa các arc không liên quan.",
        "Nếu truyện có glossary hoặc recap, hãy nghe trước khi quay lại sau thời gian dài.",
        "Với tên tự chế, ngữ cảnh quan trọng hơn phát âm hoàn hảo; não sẽ quen sau vài phút."
      ],
      faq: [
        ["AI có đọc đúng tên fantasy không?", "Có lúc đúng, có lúc không. Điều quan trọng là giọng rõ và ổn định để mạch truyện không bị đứt."],
        ["Fantasy có quá phức tạp để nghe không?", "Không nếu bạn nghe theo chương và tạm dừng khi truyện giới thiệu luật, địa điểm hoặc nhân vật quan trọng."],
        ["Tốc độ nào tốt nhất?", "Bắt đầu tốc độ bình thường rồi chỉnh dần. Fantasy thường hợp tốc độ chậm hơn truyện hài nhẹ hoặc truyện đã đọc lại."]
      ]
    }
  },
  {
    slug: "wattpad-text-to-speech-app",
    en: {
      title: "Wattpad Text to Speech App",
      description: "Use a Wattpad text to speech app to turn chapters into audio, listen offline, and reduce screen fatigue.",
      audience: "readers searching for a Wattpad text to speech app instead of a generic phone accessibility voice",
      focus: "using a Wattpad text to speech app",
      scenario: "making web fiction easier to hear with story import, generated chapter audio, and controls built for listening",
      screenshot: "Text to speech settings screen with chapter audio generation and playback speed options.",
      steps: [
        "Copy the link to a story or chapter from Wattpad or another supported story source.",
        "Paste it into Watt Audio and let the app prepare a clean chapter list for listening.",
        "Tap a chapter to create audio through text to speech, then wait for the audio file to become playable.",
        "Listen through the built-in player instead of relying on a screen reader that may read menus, ads, or unrelated page elements.",
        "Save storage by deleting chapter audio after you finish a story arc."
      ],
      tips: [
        "A story-focused text to speech app is easier than selecting text manually every time.",
        "Generated audio makes it possible to continue a story when your eyes are tired.",
        "Speed, timer, and background controls matter more than fancy settings if you listen every day."
      ],
      faq: [
        ["Why not just use iPhone Speak Screen?", "Speak Screen can help, but a dedicated story app gives cleaner chapter control and a more audiobook-like flow."],
        ["Does text to speech use internet?", "You need internet to fetch story content or supported resources, but generated chapter audio can be replayed later."],
        ["Is this for accessibility only?", "No. It is useful for accessibility, convenience, multitasking, and reducing screen time."]
      ]
    },
    vi: {
      title: "App text to speech cho Wattpad",
      description: "Dùng app text to speech cho Wattpad để biến chương truyện thành audio, nghe lại offline và giảm mỏi mắt.",
      audience: "người đọc đang tìm app text to speech cho Wattpad thay vì giọng đọc màn hình mặc định của điện thoại",
      focus: "dùng app text to speech cho Wattpad",
      scenario: "làm truyện mạng dễ nghe hơn bằng nhập link, tạo audio theo chương và điều khiển được thiết kế cho việc nghe",
      screenshot: "Màn hình cài đặt text to speech với tạo audio chương và tùy chọn tốc độ phát.",
      steps: [
        "Copy link truyện hoặc chương từ Wattpad hay nguồn truyện được hỗ trợ.",
        "Dán vào Watt Audio để app chuẩn bị danh sách chương sạch cho việc nghe.",
        "Bấm vào chương để tạo audio bằng text to speech rồi chờ file audio sẵn sàng.",
        "Nghe bằng trình phát trong app thay vì dùng trình đọc màn hình có thể đọc cả menu, quảng cáo hoặc phần không liên quan.",
        "Tiết kiệm dung lượng bằng cách xóa audio của chương sau khi bạn nghe xong một arc."
      ],
      tips: [
        "App text to speech tập trung vào truyện dễ dùng hơn việc chọn văn bản thủ công mỗi lần.",
        "Audio đã tạo giúp bạn tiếp tục truyện khi mắt mỏi.",
        "Tốc độ, hẹn giờ và phát nền quan trọng hơn nhiều cài đặt cầu kỳ nếu bạn nghe hằng ngày."
      ],
      faq: [
        ["Sao không dùng Speak Screen của iPhone?", "Speak Screen có thể hữu ích, nhưng app chuyên cho truyện cho điều khiển chương sạch và giống audiobook hơn."],
        ["Text to speech có cần internet không?", "Bạn cần internet để lấy nội dung truyện hoặc tài nguyên hỗ trợ, nhưng audio chương đã tạo có thể nghe lại sau."],
        ["Có chỉ dành cho accessibility không?", "Không. Nó hữu ích cho accessibility, sự tiện lợi, multitasking và giảm thời gian nhìn màn hình."]
      ]
    }
  },
  {
    slug: "wattpad-audio-reader-for-iphone",
    en: {
      title: "Wattpad Audio Reader for iPhone",
      description: "A guide to using an iPhone as a Wattpad audio reader with Watt Audio, background playback, and chapter controls.",
      audience: "iPhone users who want a smoother way to hear Wattpad and web fiction chapters",
      focus: "using a Wattpad audio reader for iPhone",
      scenario: "turning your iPhone into a pocket story player for commutes, walks, workouts, and quiet evening listening",
      screenshot: "iPhone player screen showing Watt Audio controls, chapter title, speed, and sleep timer.",
      steps: [
        "Install Watt Audio from the App Store and keep it on the same iPhone where you browse stories.",
        "Open the story in Safari or another browser, then copy the link or use the share sheet if available.",
        "Send the link to Watt Audio and add the story to your library.",
        "Generate audio for a chapter and test playback from the lock screen, headphones, or your usual Bluetooth device.",
        "Use the app as a dedicated audio reader whenever reading on the phone screen feels tiring."
      ],
      tips: [
        "The iPhone is best for short listening gaps because you already carry it everywhere.",
        "Pair the app with wireless earbuds for hands-free chapters during errands.",
        "Use a sleep timer at night to avoid waking up several chapters ahead."
      ],
      faq: [
        ["Does it work like an audiobook app?", "It gives an audiobook-style experience for story chapters, with controls designed for listening rather than scrolling."],
        ["Can I use it with AirPods?", "Yes. Once audio is playing, it behaves like normal media playback on iPhone."],
        ["Is it only for Wattpad?", "Watt Audio is built around supported story sources, with Wattpad-style reading and listening workflows at the center."]
      ]
    },
    vi: {
      title: "Trình đọc audio Wattpad cho iPhone",
      description: "Hướng dẫn dùng iPhone như trình đọc audio Wattpad với Watt Audio, phát nền và điều khiển theo chương.",
      audience: "người dùng iPhone muốn nghe Wattpad và truyện mạng mượt hơn",
      focus: "dùng trình đọc audio Wattpad cho iPhone",
      scenario: "biến iPhone thành máy nghe truyện bỏ túi khi đi làm, đi bộ, tập luyện hoặc nghe yên tĩnh buổi tối",
      screenshot: "Màn hình player iPhone hiển thị điều khiển Watt Audio, tên chương, tốc độ và hẹn giờ ngủ.",
      steps: [
        "Cài Watt Audio từ App Store trên chiếc iPhone bạn dùng để đọc truyện.",
        "Mở truyện trong Safari hoặc trình duyệt khác, sau đó copy link hoặc dùng share sheet nếu có.",
        "Gửi link sang Watt Audio và thêm truyện vào thư viện.",
        "Tạo audio cho một chương rồi thử phát từ màn hình khóa, tai nghe hoặc thiết bị Bluetooth quen dùng.",
        "Dùng app như trình đọc audio riêng khi việc đọc trên màn hình điện thoại trở nên mỏi."
      ],
      tips: [
        "iPhone rất hợp cho các khoảng nghe ngắn vì bạn luôn mang theo.",
        "Kết hợp app với tai nghe không dây để nghe rảnh tay khi làm việc vặt.",
        "Dùng hẹn giờ ngủ vào ban đêm để tránh thức dậy khi truyện đã chạy qua nhiều chương."
      ],
      faq: [
        ["Nó có giống app audiobook không?", "Nó cho trải nghiệm kiểu audiobook cho chương truyện, với điều khiển được thiết kế cho nghe thay vì cuộn đọc."],
        ["Có dùng với AirPods được không?", "Có. Khi audio đang phát, nó hoạt động như media playback bình thường trên iPhone."],
        ["Có chỉ dành cho Wattpad không?", "Watt Audio tập trung vào các nguồn truyện được hỗ trợ, với workflow đọc và nghe kiểu Wattpad ở trung tâm."]
      ]
    }
  },
  {
    slug: "best-text-to-speech-app-for-wattpad",
    en: {
      title: "Best Text to Speech App for Wattpad Stories",
      description: "Compare text to speech apps for Wattpad-style stories, including Speechify-style readers, phone voices, and Watt Audio.",
      audience: "readers comparing TTS apps, AI voice readers, Speechify-style tools, and dedicated Wattpad audio workflows",
      focus: "choosing the best text to speech app for Wattpad stories",
      scenario: "testing generic TTS readers, audiobook apps, browser readers, and story-focused audio tools before choosing one daily listening setup",
      screenshot: "Comparison view showing Watt Audio as a story-focused text to speech app with chapter audio controls.",
      steps: [
        "Start by deciding what you actually want to hear: a web page, a PDF, an ebook, or a Wattpad-style story with many chapters.",
        "Try one generic text to speech tool such as a phone screen reader or Speechify-style reader to understand the basic TTS experience.",
        "Then test Watt Audio with a supported story link so you can compare story import, chapter organization, generated audio, and playback controls.",
        "Listen to the same chapter in each workflow and compare friction: how many taps it takes, whether menus get read aloud, and whether progress is easy to resume.",
        "Choose the app that fits the way you read most often, especially if Wattpad stories, web novels, romance, and fantasy chapters are your main content."
      ],
      tips: [
        "Speechify, NaturalReader, Voice Dream Reader, and phone accessibility voices are often useful for documents, web pages, PDFs, and study material.",
        "For serialized fiction, chapter handling matters as much as voice quality because readers need to pause, resume, and follow updates.",
        "A dedicated story audio app can be better when your search intent is not just text to speech, but how to listen to Wattpad stories comfortably."
      ],
      faq: [
        ["Is Watt Audio a Speechify replacement?", "Not exactly. Speechify-style apps are broad text to speech readers, while Watt Audio is focused on supported story links, chapter audio, and fiction listening workflows."],
        ["What should I search for if I want Wattpad audio?", "Useful searches include Wattpad audio, Wattpad text to speech, how to listen to Wattpad, Wattpad audiobook app, and text to speech app for stories."],
        ["Why not use a generic TTS app for every story?", "Generic TTS can work, but it may read page navigation or require manual text selection. A story-focused workflow keeps chapters and playback easier to manage."]
      ]
    },
    vi: {
      title: "App text to speech tốt nhất cho truyện Wattpad",
      description: "So sánh app text to speech cho truyện Wattpad: kiểu Speechify, giọng đọc điện thoại, trình đọc web và Watt Audio.",
      audience: "người đọc đang so sánh app TTS, trình đọc giọng AI, công cụ kiểu Speechify và workflow nghe Wattpad chuyên cho truyện",
      focus: "chọn app text to speech tốt nhất cho truyện Wattpad",
      scenario: "thử các app TTS chung, app audiobook, trình đọc trình duyệt và công cụ audio tập trung vào truyện trước khi chọn cách nghe hằng ngày",
      screenshot: "Màn hình so sánh Watt Audio như app text to speech tập trung vào truyện với điều khiển audio theo chương.",
      steps: [
        "Đầu tiên hãy xác định bạn muốn nghe loại nội dung nào: trang web, PDF, ebook hay truyện kiểu Wattpad có nhiều chương.",
        "Thử một công cụ text to speech chung như trình đọc màn hình điện thoại hoặc app kiểu Speechify để hiểu trải nghiệm TTS cơ bản.",
        "Sau đó thử Watt Audio với một link truyện được hỗ trợ để so sánh nhập truyện, sắp xếp chương, tạo audio và điều khiển phát.",
        "Nghe cùng một chương trong từng workflow và so sánh độ phiền: cần bao nhiêu thao tác, có đọc menu không, có dễ nghe tiếp không.",
        "Chọn app khớp với nội dung bạn đọc nhiều nhất, nhất là nếu Wattpad, web novel, romance và fantasy là thói quen chính."
      ],
      tips: [
        "Speechify, NaturalReader, Voice Dream Reader và giọng accessibility của điện thoại thường hữu ích cho tài liệu, web page, PDF và nội dung học tập.",
        "Với truyện đăng kỳ, quản lý chương quan trọng không kém chất lượng giọng vì người đọc cần dừng, nghe tiếp và theo dõi cập nhật.",
        "App nghe truyện chuyên biệt phù hợp hơn khi mục tiêu không chỉ là text to speech, mà là cách nghe truyện Wattpad thoải mái."
      ],
      faq: [
        ["Watt Audio có thay thế Speechify không?", "Không hẳn. App kiểu Speechify là trình đọc text to speech rộng, còn Watt Audio tập trung vào link truyện được hỗ trợ, audio theo chương và workflow nghe fiction."],
        ["Muốn nghe Wattpad thì nên search gì?", "Các cụm hữu ích gồm nghe Wattpad, Wattpad audio, Wattpad text to speech, cách nghe audio Wattpad, app nghe truyện Wattpad và text to speech cho truyện."],
        ["Sao không dùng app TTS chung cho mọi truyện?", "TTS chung có thể dùng được, nhưng có thể đọc cả menu hoặc cần chọn văn bản thủ công. Workflow chuyên cho truyện giúp quản lý chương và phát audio dễ hơn."]
      ]
    }
  },
  {
    slug: "speechify-alternative-for-wattpad-stories",
    en: {
      title: "Speechify Alternative for Wattpad Stories",
      description: "Looking for a Speechify alternative for Wattpad stories? See when a story-focused audio app like Watt Audio can fit better.",
      audience: "readers who searched for Speechify, text to speech, TTS reader, or audiobook app but mainly want to hear Wattpad-style fiction",
      focus: "finding a Speechify alternative for Wattpad stories",
      scenario: "comparing broad TTS apps with a more focused way to turn supported story links into chapter audio",
      screenshot: "Watt Audio story library showing chapter-based audio as an alternative workflow to generic text to speech readers.",
      steps: [
        "List the reason you searched for Speechify or another TTS app: reading less on screen, hearing long chapters, studying documents, or multitasking.",
        "If your main content is documents, PDFs, emails, or articles, a broad text to speech reader may be the right tool.",
        "If your main content is Wattpad-style fiction, copy a supported story link and test Watt Audio as a dedicated chapter audio workflow.",
        "Compare whether the app remembers story structure, keeps chapters together, and lets you listen with the screen off.",
        "Keep the broad TTS tool for general reading and use Watt Audio when your intent is specifically Wattpad audio or story listening."
      ],
      tips: [
        "Searches like Speechify for Wattpad, Wattpad audio app, and how to listen to Wattpad usually point to a story-listening problem rather than a document-reading problem.",
        "A good alternative does not need to copy every feature; it needs to solve the exact job better for a specific reader.",
        "For fiction, playback flow, chapter order, sleep timer, and offline replay often matter more than document import features."
      ],
      faq: [
        ["Is Watt Audio affiliated with Speechify?", "No. Watt Audio is an independent app. Speechify is mentioned only as a familiar example of a broad text to speech reader people may compare against."],
        ["When is Speechify-style TTS better?", "It can be better for PDFs, school material, emails, articles, and general reading where document import is the main need."],
        ["When is Watt Audio better?", "Watt Audio is designed for readers who want supported story links organized into chapter audio with fiction-friendly playback controls."]
      ]
    },
    vi: {
      title: "App thay thế Speechify để nghe truyện Wattpad",
      description: "Nếu bạn tìm app thay thế Speechify để nghe Wattpad, đây là lúc Watt Audio hợp hơn app text to speech chung.",
      audience: "người đọc đã search Speechify, text to speech, TTS reader hoặc audiobook app nhưng chủ yếu muốn nghe truyện kiểu Wattpad",
      focus: "tìm app thay thế Speechify để nghe truyện Wattpad",
      scenario: "so sánh app TTS rộng với một cách tập trung hơn để biến link truyện được hỗ trợ thành audio theo chương",
      screenshot: "Thư viện Watt Audio hiển thị audio theo chương như một workflow thay thế trình đọc text to speech chung.",
      steps: [
        "Liệt kê lý do bạn tìm Speechify hoặc app TTS khác: đỡ nhìn màn hình, nghe chương dài, học tài liệu hay multitasking.",
        "Nếu nội dung chính của bạn là tài liệu, PDF, email hoặc bài viết, app text to speech rộng có thể phù hợp.",
        "Nếu nội dung chính là truyện kiểu Wattpad, hãy copy link truyện được hỗ trợ và thử Watt Audio như workflow audio theo chương.",
        "So sánh app có nhớ cấu trúc truyện, giữ chương cùng một chỗ và cho nghe khi tắt màn hình không.",
        "Giữ app TTS chung cho đọc tài liệu và dùng Watt Audio khi mục tiêu cụ thể là Wattpad audio hoặc nghe truyện."
      ],
      tips: [
        "Các tìm kiếm như Speechify cho Wattpad, Wattpad audio app và cách nghe Wattpad thường là nhu cầu nghe truyện hơn là đọc tài liệu.",
        "Một app thay thế tốt không cần copy mọi tính năng; nó cần giải quyết đúng việc tốt hơn cho nhóm người đọc cụ thể.",
        "Với fiction, luồng phát, thứ tự chương, hẹn giờ ngủ và nghe lại offline thường quan trọng hơn tính năng nhập tài liệu."
      ],
      faq: [
        ["Watt Audio có liên quan đến Speechify không?", "Không. Watt Audio là app độc lập. Speechify chỉ được nhắc như ví dụ quen thuộc của app text to speech rộng mà người dùng hay so sánh."],
        ["Khi nào app kiểu Speechify tốt hơn?", "Khi bạn nghe PDF, tài liệu học, email, bài viết và nội dung đọc chung mà nhập tài liệu là nhu cầu chính."],
        ["Khi nào Watt Audio tốt hơn?", "Watt Audio được thiết kế cho người muốn đưa link truyện được hỗ trợ vào audio theo chương với điều khiển nghe hợp fiction."]
      ]
    }
  },
  {
    slug: "offline-wattpad-audio-listening",
    en: {
      title: "Offline Wattpad Audio Listening",
      description: "How offline Wattpad audio listening works with generated chapter audio, storage management, and listening routines.",
      audience: "readers who want to hear stories on flights, trains, low-signal commutes, or Wi-Fi-only moments",
      focus: "offline Wattpad audio listening",
      scenario: "preparing story chapters before leaving home so your listening session does not depend on mobile data",
      screenshot: "Offline-ready chapter list with downloaded/generated audio indicators.",
      steps: [
        "Choose the story and chapters you want before you go offline.",
        "Add the story link to Watt Audio while you still have internet access.",
        "Generate audio for the chapters you expect to hear during your trip or quiet time.",
        "Open the player once to confirm the chapters are ready and the audio starts correctly.",
        "Listen later without reopening the web page, then delete finished chapter audio if storage becomes tight."
      ],
      tips: [
        "Prepare fewer chapters than you think at first; you can always generate more later.",
        "Long fantasy or romance chapters may use more storage than short updates.",
        "Offline listening is most useful when you combine it with sleep timer and background playback."
      ],
      faq: [
        ["Can I generate audio while offline?", "No. You generally need internet to fetch story content first. Offline listening applies after audio has been created."],
        ["Will offline audio stay forever?", "It stays until you delete it or remove the app, subject to device storage."],
        ["Is offline listening good for travel?", "Yes. It avoids weak mobile data, tunnel dropouts, and repeated page loading."]
      ]
    },
    vi: {
      title: "Nghe audio Wattpad offline",
      description: "Cách nghe audio Wattpad offline bằng audio chương đã tạo, quản lý dung lượng và chuẩn bị trước khi di chuyển.",
      audience: "người đọc muốn nghe truyện trên máy bay, tàu, commute sóng yếu hoặc những lúc chỉ có Wi-Fi trước đó",
      focus: "nghe audio Wattpad offline",
      scenario: "chuẩn bị chương truyện trước khi rời nhà để buổi nghe không phụ thuộc dữ liệu di động",
      screenshot: "Danh sách chương đã sẵn sàng offline với trạng thái audio đã tạo.",
      steps: [
        "Chọn truyện và các chương bạn muốn nghe trước khi offline.",
        "Thêm link truyện vào Watt Audio khi vẫn còn internet.",
        "Tạo audio cho những chương bạn dự định nghe trong chuyến đi hoặc lúc nghỉ.",
        "Mở player một lần để xác nhận chương đã sẵn sàng và audio phát đúng.",
        "Nghe lại sau mà không cần mở trang web, rồi xóa audio đã nghe nếu dung lượng bị chật."
      ],
      tips: [
        "Ban đầu hãy chuẩn bị ít chương hơn bạn nghĩ; bạn luôn có thể tạo thêm sau.",
        "Chương fantasy hoặc romance dài có thể chiếm nhiều dung lượng hơn cập nhật ngắn.",
        "Nghe offline hữu ích nhất khi kết hợp với hẹn giờ ngủ và phát nền."
      ],
      faq: [
        ["Có tạo audio khi offline được không?", "Không. Thường bạn cần internet để lấy nội dung truyện trước. Offline là nghe lại sau khi audio đã được tạo."],
        ["Audio offline có giữ mãi không?", "Audio sẽ ở lại cho đến khi bạn xóa hoặc gỡ app, tùy theo dung lượng thiết bị."],
        ["Có hợp khi đi du lịch không?", "Có. Nó tránh tình trạng mất sóng, hầm tàu và việc tải lại trang nhiều lần."]
      ]
    }
  },
  {
    slug: "listen-to-web-novels-with-ai-voice",
    en: {
      title: "Listen to Web Novels with AI Voice",
      description: "Use AI voice to listen to web novels, Wattpad stories, and serialized fiction with chapter-based audio controls.",
      audience: "web novel readers who follow long serialized stories and want a more flexible way to keep up",
      focus: "listening to web novels with AI voice",
      scenario: "following daily updates, long arcs, and backlog chapters without needing uninterrupted reading time",
      screenshot: "AI voice generation view with a web novel chapter ready to play.",
      steps: [
        "Pick a web novel chapter or story source that you already read and copy the link.",
        "Add the link to Watt Audio so the story becomes part of a listening library.",
        "Generate AI voice audio for the chapter and listen for clarity before creating a larger queue.",
        "Use playback speed to adapt to the writing style, because action scenes and exposition do not always need the same pace.",
        "Continue updating your library as new chapters appear instead of losing them in browser history."
      ],
      tips: [
        "AI voice is strongest when the app can keep chapters organized and repeatable.",
        "Serialized fiction benefits from listening progress because updates may arrive days apart.",
        "Use audio for backlog chapters, then read manually when you want to savor important scenes."
      ],
      faq: [
        ["Is AI voice the same as a human audiobook?", "No. It is a convenient reading aid, not a studio performance, but it makes long text far easier to consume."],
        ["Can it help with backlog?", "Yes. Audio is one of the easiest ways to catch up on many chapters without sitting down to read for hours."],
        ["What stories work best?", "Clear chapter-based stories with strong narrative flow usually work best for AI voice listening."]
      ]
    },
    vi: {
      title: "Nghe web novel bằng giọng AI",
      description: "Dùng giọng AI để nghe web novel, truyện Wattpad và truyện đăng nhiều kỳ với điều khiển audio theo chương.",
      audience: "người đọc web novel theo dõi truyện dài đăng nhiều kỳ và muốn bắt kịp linh hoạt hơn",
      focus: "nghe web novel bằng giọng AI",
      scenario: "theo dõi cập nhật hằng ngày, arc dài và backlog chương mà không cần một khoảng đọc liên tục",
      screenshot: "Màn hình tạo giọng AI với một chương web novel đã sẵn sàng phát.",
      steps: [
        "Chọn chương web novel hoặc nguồn truyện bạn đang đọc rồi copy link.",
        "Thêm link vào Watt Audio để truyện trở thành một phần của thư viện nghe.",
        "Tạo audio giọng AI cho chương và nghe thử độ rõ trước khi tạo hàng chờ lớn hơn.",
        "Dùng tốc độ phát để thích nghi với phong cách viết, vì cảnh hành động và đoạn giải thích không cần cùng một nhịp.",
        "Tiếp tục cập nhật thư viện khi có chương mới thay vì để mất chúng trong lịch sử trình duyệt."
      ],
      tips: [
        "Giọng AI hiệu quả nhất khi app giữ chương gọn, có thứ tự và dễ nghe lại.",
        "Truyện đăng kỳ hưởng lợi từ tiến độ nghe vì cập nhật có thể cách nhau nhiều ngày.",
        "Dùng audio để xử lý backlog, rồi đọc thủ công ở những cảnh bạn muốn thưởng thức kỹ."
      ],
      faq: [
        ["Giọng AI có giống audiobook người thật không?", "Không. Đây là công cụ hỗ trợ đọc tiện lợi, không phải diễn đọc phòng thu, nhưng giúp văn bản dài dễ tiêu thụ hơn."],
        ["Có giúp xử lý backlog không?", "Có. Audio là một trong những cách dễ nhất để bắt kịp nhiều chương mà không phải ngồi đọc hàng giờ."],
        ["Truyện nào hợp nhất?", "Truyện có chương rõ ràng và mạch kể tuyến tính thường hợp nhất với nghe giọng AI."]
      ]
    }
  },
  {
    slug: "listen-to-stories-while-commuting",
    en: {
      title: "Listen to Stories While Commuting",
      description: "Turn commute time into story time with Watt Audio, chapter audio, offline preparation, and safe hands-free listening.",
      audience: "readers who want to keep up with stories during buses, trains, walking routes, or rideshares",
      focus: "listening to stories while commuting",
      scenario: "using travel time for fiction without holding your phone, scrolling through chapters, or fighting weak signal",
      screenshot: "Commute listening screen with large play controls and a queue of story chapters.",
      steps: [
        "Before leaving, choose one or two stories that match the length of your commute.",
        "Generate audio for the chapters you expect to finish so you are not dependent on mobile data.",
        "Start playback before you begin moving and use headphones or your car audio system where appropriate.",
        "Keep controls simple: play, pause, skip chapter, and speed are usually enough during travel.",
        "When you arrive, check your progress and remove finished audio later if you want to keep the app light."
      ],
      tips: [
        "Choose familiar stories for noisy commutes and save complex chapters for calmer listening.",
        "Avoid constantly unlocking your phone; prepare chapters and controls before you start moving.",
        "A slightly faster speed can fit one full chapter into a short ride."
      ],
      faq: [
        ["Is commuting a good time for fiction?", "Yes, especially for rereads, light chapters, and stories with clear dialogue."],
        ["What if the train has no signal?", "Prepare audio first. Once generated, chapters can be heard without repeatedly loading the website."],
        ["Should I read or listen?", "Use both. Listening is best when your hands and eyes are busy; reading is best when you want full attention."]
      ]
    },
    vi: {
      title: "Nghe truyện khi đi làm hoặc di chuyển",
      description: "Biến thời gian di chuyển thành thời gian nghe truyện với Watt Audio, audio theo chương, chuẩn bị offline và nghe rảnh tay.",
      audience: "người đọc muốn theo kịp truyện khi đi xe buýt, tàu, đi bộ hoặc rideshare",
      focus: "nghe truyện khi di chuyển",
      scenario: "dùng thời gian di chuyển cho truyện mà không cần cầm điện thoại, cuộn chương hoặc lo sóng yếu",
      screenshot: "Màn hình nghe khi commute với nút phát lớn và hàng chờ các chương truyện.",
      steps: [
        "Trước khi rời nhà, chọn một hoặc hai truyện phù hợp độ dài quãng đường.",
        "Tạo audio cho những chương bạn dự định nghe để không phụ thuộc dữ liệu di động.",
        "Bắt đầu phát trước khi di chuyển và dùng tai nghe hoặc âm thanh xe khi phù hợp.",
        "Giữ điều khiển đơn giản: phát, tạm dừng, chuyển chương và tốc độ thường là đủ khi đi đường.",
        "Khi đến nơi, kiểm tra tiến độ và xóa audio đã nghe nếu muốn app gọn hơn."
      ],
      tips: [
        "Chọn truyện quen trong commute ồn, để chương phức tạp cho lúc nghe yên tĩnh.",
        "Tránh mở khóa điện thoại liên tục; chuẩn bị chương và điều khiển trước khi bắt đầu di chuyển.",
        "Tốc độ nhanh hơn một chút có thể giúp nghe trọn một chương trong chuyến đi ngắn."
      ],
      faq: [
        ["Commute có hợp để nghe truyện không?", "Có, nhất là truyện đọc lại, chương nhẹ và truyện có đối thoại rõ."],
        ["Nếu tàu không có sóng thì sao?", "Hãy chuẩn bị audio trước. Khi đã tạo, chương có thể nghe mà không cần tải lại website liên tục."],
        ["Nên đọc hay nghe?", "Dùng cả hai. Nghe hợp khi tay và mắt bận; đọc hợp khi bạn muốn tập trung trọn vẹn."]
      ]
    }
  },
  storyTitleTopic({
    slug: "trong-sinh-em-gai-chon-thanh-hoa-toi-chon-10-ty",
    title: "Trọng Sinh Em Gái Chọn Thanh Hoa, Tôi Chọn 10 Tỷ",
    enMotif: "rebirth, family-choice, school, and second-life",
    viMotif: "trọng sinh, lựa chọn gia đình, học đường và làm lại cuộc đời"
  }),
  storyTitleTopic({
    slug: "huy-hon-thai-tu-gia-toi-ga-cho-ke-thu-cua-han",
    title: "Hủy Hôn Thái Tử Gia, Tôi Gả Cho Kẻ Thù Của Hắn",
    enMotif: "broken engagement, revenge romance, and arranged marriage",
    viMotif: "hủy hôn, báo thù, cưới gả và romance drama"
  }),
  storyTitleTopic({
    slug: "toi-luoi-den-muc-khien-tra-xanh-tram-cam",
    title: "Tôi Lười Đến Mức Khiến Trà Xanh Trầm Cảm",
    enMotif: "green tea rival, comedy, lazy heroine, and face-slapping",
    viMotif: "trà xanh, hài hước, nữ chính lười và vả mặt"
  }),
  storyTitleTopic({
    slug: "thong-tha-nhin-em-gai-bo-hoc-lam-streamer",
    title: "Thông Thả Nhìn Em Gái Bỏ Học Làm Streamer",
    enMotif: "rebirth, family conflict, livestream, and modern drama",
    viMotif: "trọng sinh, drama gia đình, livestream và hiện đại"
  }),
  storyTitleTopic({
    slug: "ca-nha-toi-la-to-nghe-diet-tra-xanh",
    title: "Cả Nhà Tôi Là Tổ Nghề Diệt Trà Xanh",
    enMotif: "family comedy, green tea rival, protection, and revenge",
    viMotif: "gia đình, trà xanh, bảo vệ nữ chính và báo thù"
  }),
  storyTitleTopic({
    slug: "ba-nam-khong-danh-phan-toi-tu-cho-minh-mot-loi-thoat",
    title: "Ba Năm Không Danh Phận, Tôi Tự Cho Mình Một Lối Thoát",
    enMotif: "angst romance, breakup, self-respect, and emotional healing",
    viMotif: "ngược tâm, chia tay, tự tôn và chữa lành"
  }),
  storyTitleTopic({
    slug: "vua-bi-gia-dinh-vut-bo-toi-da-tro-thanh-nguoi-thua-ke-hang-chuc-ty",
    title: "Vừa Bị Gia Đình Vứt Bỏ, Tôi Đã Trở Thành Người Thừa Kế Hàng Chục Tỷ",
    enMotif: "inheritance, abandoned daughter, comeback, and rich-family drama",
    viMotif: "thừa kế, bị bỏ rơi, phản công và hào môn"
  }),
  storyTitleTopic({
    slug: "ca-lo-nha-toi-deu-la-vai-phan-dien",
    title: "Cả Lò Nhà Tôi Đều Là Vai Phản Diện",
    enMotif: "villain family, transmigration, comedy, and redemption arcs",
    viMotif: "vai phản diện, xuyên không, hài hước và cứu vớt gia đình"
  }),
  storyTitleTopic({
    slug: "dem-ngay-giai-nghe-toi-tu-bo-hinh-tuong-quyet-lam-ca-man",
    title: "Đêm Ngày Giải Nghệ, Tôi Từ Bỏ Hình Tượng Quyết Làm Cá Mặn",
    enMotif: "entertainment circle, salted fish heroine, celebrity, and comedy",
    viMotif: "showbiz, cá mặn, giải nghệ và hài hiện đại"
  }),
  storyTitleTopic({
    slug: "no-mau-phai-tra-bang-mau",
    title: "Nợ Máu Phải Trả Bằng Máu",
    enMotif: "revenge, crime, dark drama, and justice",
    viMotif: "báo thù, phá án, drama đen tối và công lý"
  }),
  storyTitleTopic({
    slug: "toi-la-hoc-sinh-ngheo-o-truong-quy-toc",
    title: "Tôi Là Học Sinh Nghèo Ở Trường Quý Tộc",
    enMotif: "school drama, class gap, rich students, and underdog heroine",
    viMotif: "học đường, chênh lệch giai cấp, trường quý tộc và nữ chính nghèo"
  }),
  storyTitleTopic({
    slug: "nhat-ky-lam-ca-man-chon-hau-cung",
    title: "Nhật Ký Làm Cá Mặn Chốn Hậu Cung",
    enMotif: "palace drama, salted fish heroine, survival, and historical comedy",
    viMotif: "hậu cung, cá mặn, sinh tồn và hài cổ trang"
  }),
  storyTitleTopic({
    slug: "nhat-ky-cua-an-an-nghe-de-khoc",
    title: "Nhật Ký Của An An: Nghe Để Khóc",
    enMotif: "emotional diary, tearjerker, family pain, and healing",
    viMotif: "nhật ký cảm xúc, truyện lấy nước mắt, gia đình và chữa lành"
  }),
  storyTitleTopic({
    slug: "hon-uoc-tu-be-voi-dai-ca-truong",
    title: "Hôn Ước Từ Bé Với Đại Ca Trường",
    enMotif: "school romance, childhood engagement, campus boss, and sweet drama",
    viMotif: "thanh xuân vườn trường, hôn ước từ bé, đại ca trường và romance"
  }),
  storyTitleTopic({
    slug: "mang-tieng-la-tra-xanh-toi-tham-gia-show-hen-ho-tau-hai-la-chinh",
    title: "Mang Tiếng Là Trà Xanh, Tôi Tham Gia Show Hẹn Hò Tấu Hài Là Chính",
    enMotif: "dating show, green tea reputation, comedy, and variety-show romance",
    viMotif: "show hẹn hò, trà xanh, tấu hài và romance giải trí"
  }),
  storyTitleTopic({
    slug: "hoa-khoi-tung-tin-hen-ho-voi-trum-truong-the-ma-lai-hay",
    title: "Hoa Khôi Tung Tin Hẹn Hò Với Trùm Trường, Thế Mà Lại Hay",
    enMotif: "campus romance, school queen, school boss, and fake dating",
    viMotif: "vườn trường, hoa khôi, trùm trường và fake dating"
  }),
  storyTitleTopic({
    slug: "xuyen-sach-toi-pha-nat-moi-kich-ban",
    title: "Xuyên Sách Tôi Phá Nát Mọi Kịch Bản",
    enMotif: "book transmigration, plot-breaking heroine, system, and comedy",
    viMotif: "xuyên sách, phá kịch bản, hệ thống và hài hước"
  }),
  storyTitleTopic({
    slug: "toi-mo-tiem-thu-cung-hong-bien-hao-mon",
    title: "Tôi Mở Tiệm Thú Cưng Hòng Biến Hào Môn",
    enMotif: "pet shop, rich-family romance, comedy, and modern fantasy",
    viMotif: "tiệm thú cưng, hào môn, hài hước và hiện đại kỳ ảo"
  }),
  storyTitleTopic({
    slug: "dua-tre-khong-duoc-yeu-thuong",
    title: "Đứa Trẻ Không Được Yêu Thương",
    enMotif: "family angst, neglected child, healing, and emotional drama",
    viMotif: "gia đình ngược, đứa trẻ bị bỏ quên, chữa lành và drama cảm xúc"
  }),
  storyTitleTopic({
    slug: "thien-kim-gia-bi-ao-tuong-nu-chinh",
    title: "Thiên Kim Giả Bị Ảo Tưởng Nữ Chính",
    enMotif: "fake heiress, heroine delusion, identity swap, and rich-family drama",
    viMotif: "thiên kim giả, ảo tưởng nữ chính, tráo thân phận và hào môn"
  }),
  storyTitleTopic({
    slug: "tra-xanh-tuong-bo-hot-duoc-vang",
    title: "Trà Xanh Tưởng Bở Hốt Được Vàng",
    enMotif: "green tea rival",
    viMotif: "trà xanh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "toi-va-co-ban-than-cung-cuoi-hai-anh-em-nha-giau-nghien-vo",
    title: "Tôi Và Cô Bạn Thân Cùng Cưới Hai Anh Em Nhà Giàu Nghiện Vợ",
    enMotif: "marriage drama",
    viMotif: "cưới gả",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-muon-quyen-ru-anh-de-nhung-anh-la-mot-ke-nghien-vo",
    title: "Trà Xanh Muốn Quyến Rũ Ảnh Đế Nhưng Anh Là Một Kẻ Nghiện Vợ",
    enMotif: "green tea rival",
    viMotif: "trà xanh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "nu-luat-su-mo-hon-xuyen-vao-thien-kim-that-nha-hao-mon",
    title: "Nữ Luật Sư Mỏ Hỗn Xuyên Vào Thiên Kim Thật Nhà Hào Môn",
    enMotif: "rich-family romance",
    viMotif: "hào môn",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "nuoi-vo-nho-bao-nam-cuoi-cung-cung-duoc-an",
    title: "Nuôi Vợ Nhỏ Bao Năm Cuối Cùng Cũng Được Ăn",
    enMotif: "Vietnamese web fiction và romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-choc-nham-vo-cung-cua-co-tong",
    title: "Trà Xanh Chọc Nhầm Vợ Cưng Của Cố Tổng",
    enMotif: "green tea rival và school romance",
    viMotif: "trà xanh và vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "dam-my-trong-sinh-hay-nhat",
    title: "Đam Mỹ Trọng Sinh Hay Nhất",
    enMotif: "rebirth",
    viMotif: "trọng sinh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ga-cho-thai-tu-gia-ngo-dau-anh-sieu-nghien-vo",
    title: "Gả cho Thái Tử Gia Ngờ Đâu Anh Siêu Nghiện Vợ",
    enMotif: "Vietnamese web fiction và romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "to-tinh-hoc-ba-that-bai-toi-yeu-luon-dai-ca-truong",
    title: "Tỏ Tình Học Bá Thất Bại, Tôi Yêu Luôn Đại Ca Trường",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ban-than-phai-long-hoc-ba-con-toi-yeu-dai-ca-truong",
    title: "Bạn Thân Phải Lòng Học Bá Còn Tôi Yêu Đại Ca Trường",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "bi-ep-ga-thay-em-gai-toi-bat-che-do-mo-hon-dep-loan-hao-mon",
    title: "Bị Ép Gả Thay Em Gái, Tôi Bật Chế Độ Mỏ Hỗn Dẹp Loạn Hào Môn",
    enMotif: "rich-family romance",
    viMotif: "hào môn",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "toi-va-co-ban-than-duoc-hai-nam-than-truong-dien-cuong-theo-duoi",
    title: "Tôi Và Cô Bạn Thân Được Hai Nam Thần Trường Điên Cuồng Theo Đuổi",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "thien-kim-that-mo-hon-tro-ve-vua-co-nao-lai-vua-nhieu-tien",
    title: "Thiên Kim Thật Mỏ Hỗn Trở Về Vừa Có Não Lại Vừa Nhiều Tiền",
    enMotif: "Vietnamese web fiction và romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "choi-that-hay-thach-ai-ngo-toi-duoc-hon-ngay-dai-ca-truong",
    title: "Chơi Thật Hay Thách, Ai Ngờ Tôi Được Hôn Ngay Đại Ca Trường",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-nha-toi-khong-ngo-toi-la-tra-xanh-thuong-hang",
    title: "Trà Xanh Nhà Tôi Không Ngờ Tôi là Trà Xanh Thượng Hạng",
    enMotif: "rebirth và green tea rival",
    viMotif: "trọng sinh và trà xanh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "thuong-me-hoc-ba-dien-cuong-hoc-do-dai-hoc-trong-diem",
    title: "Thương Mẹ, Học Bá Điên Cuồng Học Đỗ Đại Học Trọng Điểm",
    enMotif: "school romance và family drama",
    viMotif: "vườn trường và gia đình",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "vo-oi-anh-biet-loi-roi-tieu-thuyet-yeu-ngon-tinh-hay-nhat-2024",
    title: "VỢ ƠI! ANH BIẾT LỖI RỒI - Tiểu Thuyết Yêu Ngôn Tình Hay Nhất 2024",
    enMotif: "Vietnamese web fiction và romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "i-shouldn-t-have-saved-him-that-night",
    title: "I Shouldn't Have Saved Him That Night...",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "vo-tu-nho-la-ngoai-le-cua-thu-khoa-dai-hoc-a",
    title: "Vợ Từ Nhỏ Là Ngoại Lệ Của Thủ Khoa Đại Học A",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "cuc-cung-doi-chia-tay-thai-tu-gia-phat-dien-roi",
    title: "Cục Cưng Đòi Chia Tay, Thái Tử Gia Phát Điên Rồi",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "accidentally-married-by-victorine-e-lieske",
    title: "Accidentally Married By Victorine E. Lieske",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "dai-tieu-thu-mo-hon-tro-ve-day-do-em-gai-tra-xanh-gia-tao",
    title: "Đại Tiểu Thư Mỏ Hỗn Trở Về Dạy Dỗ Em Gái Trà Xanh Giả Tạo",
    enMotif: "green tea rival",
    viMotif: "trà xanh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "dao-of-the-world-walker-craft-based-slice-of-life-xianxia-with-world-hopping",
    title: "Dao Of The World Walker (Craft-based Slice Of Life Xianxia With World Hopping)",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "amberlin-s-apprentice-is-secretly-strong-arc-1-complete-op-mc-archmage-progression",
    title: "Amberlin's Apprentice Is Secretly Strong (Arc 1 Complete) [OP MC, Archmage, Progression]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "truyen-dam-my-xuyen-sach",
    title: "Truyện Đam Mỹ Xuyên Sách",
    enMotif: "transmigration",
    viMotif: "xuyên sách",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "black-knight-seeks-quiet-life-op-mc-east-meets-west-fantasy",
    title: "Black Knight Seeks Quiet Life [OP MC, East Meets West Fantasy]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "lo-lot-ao-dai-ca-truong-toi-bi-anh-hot-luon-ve-lam-vo",
    title: "Lỡ Lột Áo Đại Ca Trường Tôi Bị Anh Hốt Luôn Về Làm Vợ",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "the-elf-who-would-become-a-dragon-story-complete-copyedits-in-progress",
    title: "The Elf Who Would Become A Dragon [Story Complete; Copyedits In Progress]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "toi-va-ban-than-cung-xuyen-vao-vo-cua-2-phan-dien-cuong-yeu",
    title: "Tôi Và Bạn Thân Cùng Xuyên Vào Vợ Của 2 Phản Diện Cuồng Yêu",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "reincarnated-as-a-brewer-against-my-better-judgement-book-1-complete",
    title: "Reincarnated As A Brewer (Against My Better Judgement) [Book 1 Complete]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "ngon-tinh-xuyen-khong-hay-nhat",
    title: "Ngôn Tình Xuyên Không Hay Nhất",
    enMotif: "transmigration",
    viMotif: "xuyên sách",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "sentenced-to-the-penal-mecha-battalion-but-my-copilot-is-a-beautiful-war-criminal-yuri-mecha",
    title: "Sentenced To The Penal Mecha Battalion, But My Copilot Is A Beautiful War Criminal [Yuri, Mecha]",
    enMotif: "family drama",
    viMotif: "gia đình",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "hoa-khoi-tu-nhan-minh-la-bach-nguyet-quang-cua-ca-truong",
    title: "Hoa Khôi Tự Nhận Mình Là Bạch Nguyệt Quang Của Cả Trường",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ca-ky-tuc-xa-trong-sinh-va-nat-mat-tra-xanh",
    title: "Cả Ký Túc Xá Trọng Sinh, Vả Nát Mặt Trà Xanh",
    enMotif: "rebirth and green tea rival",
    viMotif: "trọng sinh và trà xanh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "the-archmage-s-second-life-as-an-introvert-op-mc-litrpg",
    title: "The Archmage's Second Life As An Introvert [OP MC, LitRPG]",
    enMotif: "family drama",
    viMotif: "gia đình",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "i-made-a-railgun-with-lightning-magic-litrpg-op-mc-isekai",
    title: "I Made A Railgun With Lightning Magic (LitRPG / OP MC / Isekai)",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "xuyen-vao-tan-phi-that-sung-toi-khien-ca-hoang-cung-chao-dao",
    title: "Xuyên Vào Tần Phi Thất Sủng Tôi Khiến Cả Hoàng Cung Chao Đảo",
    enMotif: "palace drama and family drama",
    viMotif: "cổ trang và gia đình",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "bi-nha-chong-duoi-toi-ve-lam-dai-tieu-thu-hao-mon-va-mat-tra-xanh",
    title: "Bị Nhà Chồng Đuổi, Tôi Về Làm Đại Tiểu Thư Hào Môn Vả Mặt Trà Xanh",
    enMotif: "green tea rival and rich-family romance",
    viMotif: "trà xanh và hào môn",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tat-nuoc-lanh-tra-thu-nguoi-yeu-cu-ai-ngo-toi-tat-trung-dai-ca-truong",
    title: "Tạt Nước Lạnh Trả Thù Người Yêu Cũ, Ai Ngờ Tôi Tạt Trúng Đại Ca Trường",
    enMotif: "revenge and school romance",
    viMotif: "báo thù và vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ten-thousand-tragedies-xianxia-timeloop-book-1-stubs-on-aug-10th",
    title: "Ten Thousand Tragedies [Xianxia Timeloop] (Book 1 Stubs On Aug 10th)",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "tim-thay-nick-phu-cua-dai-ca-truong-thi-ra-anh-tham-thich-toi",
    title: "Tìm Thấy Nick Phụ Của Đại Ca Trường, Thì Ra Anh Thầm Thích Tôi",
    enMotif: "school romance",
    viMotif: "vườn trường",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "quay-ve-nam-thu-hai-sau-khi-lam-the-than-toi-qua-quyet-bo-di",
    title: "Quay Về Năm Thứ Hai Sau Khi Làm Thế Thân, Tôi Quả Quyết Bỏ Đi",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "the-level-1-transmigrator-litrpg-skill-progression-book-1-complete",
    title: "The Level 1 Transmigrator [LitRPG Skill Progression] [Book 1 Complete]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "passive-aggressive-reverse-portal-invasion-litrpg-with-a-broken-build",
    title: "Passive Aggressive [Reverse Portal Invasion LitRPG With A Broken Build]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "sat-nhan-xuyen-sach-tan-sat-ca-gia-dinh-tra-xanh",
    title: "Sát Nhân Xuyên Sách Tàn Sát Cả Gia Đình Trà Xanh",
    enMotif: "transmigration, green tea rival and family drama",
    viMotif: "xuyên sách, trà xanh và gia đình",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "an-archmage-s-second-life-op-mc-litrpg-book-1-complete-stubbing-december",
    title: "An Archmage's Second Life [OP MC, LitRPG, Book 1 Complete, Stubbing December!]",
    enMotif: "family drama",
    viMotif: "gia đình",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "sau-nam-nam-toi-rut-khoi-gioi-giai-tri-su-that-lai-duoc-phoi-bay",
    title: "Sau Năm Năm Tôi Rút Khỏi Giới Giải Trí, Sự Thật Lại Được Phơi Bày",
    enMotif: "entertainment circle",
    viMotif: "showbiz",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "sau-khi-chong-alpha-thay-doi-toi-bong-thay-hang-loat-dong-binh-luan",
    title: "Sau Khi Chồng Alpha Thay Đổi, Tôi Bỗng Thấy Hàng Loạt Dòng Bình Luận",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "translating-stories-in-english",
    title: "Translating Stories In English.",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "ca-nha-dai-boss-run-so-vi-nghe-duoc-tieng-long-cua-ca-man-mo-hon",
    title: "Cả Nhà Đại Boss Run Sợ Vì Nghe Được Tiếng Lòng của Cá Mặn Mỏ Hỗn",
    enMotif: "comedy",
    viMotif: "hài hước",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "toi-la-paparazzi-ai-cung-muon-danh-nhung-cang-chup-cang-khien-ho-hot-hon",
    title: "Tôi là Paparazzi Ai Cũng Muốn Đánh, Nhưng Càng Chụp Càng Khiến Họ Hot Hơn",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "arsenal-mage-why-does-every-weapon-give-me-a-new-skill",
    title: "Arsenal Mage! Why Does Every Weapon Give Me A New Skill?",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "clara-casewell-attorney-to-the-villainess-vol-1-complete",
    title: "Clara Casewell, Attorney To The Villainess [Vol 1 Complete]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "truc-ma-tro-ve-anh-de-nha-ghen-toi-phat-dien-roi",
    title: "Trúc Mã Trở Về, Ảnh Đế Nhà Ghen Tôi Phát Điên Rồi",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ngon-tinh-trung-quoc-hay-nhat",
    title: "Ngôn Tình Trung Quốc Hay Nhất",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "me-ke-trong-sinh-roi-em-gai-tra-xanh-noi-gi-di",
    title: "Mẹ Kế Trọng Sinh Rồi, Em Gái Trà Xanh Nói Gì Đi!",
    enMotif: "rebirth, green tea rival and family drama",
    viMotif: "trọng sinh, trà xanh và gia đình",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "the-archmage-and-the-valkyr-progression-litrpg-isekai",
    title: "The Archmage And The Valkyr [Progression, LITRPG, ISEKAI]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "the-necro-industrial-revolution-kingdom-building-stubbing-book-1-by-the-end-of-aug",
    title: "The Necro-Industrial Revolution [Kingdom Building] (STUBBING BOOK 1 BY THE END OF AUG)",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "hat-tra-sua-vao-thai-tu-gia-toi-phai-lam-vo-anh-de-tra-gia",
    title: "Hất Trà Sữa Vào Thái Tử Gia, Tôi Phải Làm Vợ Ảnh Đế Trả Giá",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "i-made-a-railgun-with-lightning-magic-litrpg-op-mc-isekai-book-1-completed",
    title: "I Made A Railgun With Lightning Magic (LitRPG / OP MC / Isekai) [Book 1 Completed]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "summoned-a-hundred-years-too-late-stubbing-book-1-on-august-24th",
    title: "Summoned A Hundred Years Too Late [Stubbing Book 1 On August 24th]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "gwapong-boss-nahumaling-sa-kagandahan-ng-maid-niya-sobrang-ganda-kasi-ng-dalaga",
    title: "Gwapong Boss, Nahumaling Sa Kagandahan Ng Maid Niya! Sobrang Ganda Kasi Ng Dalaga",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "this-lady-shall-rise-to-prominance-litrpg-op-mc",
    title: "This Lady Shall Rise To Prominance! [LitRPG, OP MC]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "toi-block-thai-tu-gia-ai-ngo-anh-la-ke-nghien-vo",
    title: "Tôi Block Thái Tử Gia Ai Ngờ Anh Là Kẻ Nghiện Vợ",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "the-god-of-death-just-wants-to-quit",
    title: "The God Of Death Just Wants To Quit?!",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "role-without-a-self-impersonation-isekai-fate-manipulation",
    title: "Role Without A Self [Impersonation + Isekai + Fate Manipulation]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "trong-sinh-toi-khong-con-canh-bao-anh-ho-ve-nhung-mon-an-nguy-hiem",
    title: "Trọng Sinh, Tôi Không Còn Cảnh Báo Anh Họ Về Những Món Ăn Nguy Hiểm",
    enMotif: "rebirth",
    viMotif: "trọng sinh",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "pembantu-rumah-tangga-yang-terjebak-cinta-dengan-pejabat",
    title: "Pembantu Rumah Tangga Yang Terjebak Cinta Dengan Pejabat",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "cerita-cinta-bertepuk-sebelah-tangan-yang-berakhir-bahagia",
    title: "Cerita Cinta Bertepuk Sebelah Tangan Yang Berakhir Bahagia",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "majaburi-vaibhav-aur-anushka-ki-prem-kahani-hindi-stories",
    title: "मजबूरी - वैभव और अनुष्का की प्रेम कहानी",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["hi"]
  }),
  storyTitleTopic({
    slug: "bina-kisi-surag-ke-hatyare-ko-kaise-pakarega-jasus",
    title: "बिना किसी सुराग के हत्यारे को कैसे पकड़ेगा जासूस?",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["hi"]
  }),
  storyTitleTopic({
    slug: "rwayh-ma-la-nbwh-bh-kamlh-lsandra-syraj",
    title: "ما لا نبوح به لساندرا سيراج",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["ar"]
  }),
  storyTitleTopic({
    slug: "new-version-introduce-gema-hati-muda",
    title: "(New Version) Introduce Gema Hati Muda",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "jantung-aku-rusak-kar",
    title: "Jantung Aku Rusak Kar,",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "surviving-the-immortal-world-by-staying-low-key-the-rise-of-an-unlikely-cultivator",
    title: "Surviving The Immortal World By Staying Low-Key! The Rise Of An Unlikely Cultivator",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "toi-duoc-thue-ve-lam-vo-cua-ca-2-anh-em-thai-tu-gia",
    title: "Tôi Được Thuê Về Làm Vợ Của Cả 2 Anh Em Thái Tử Gia",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "dai-tieu-thu-tro-ve-la-ba-trum-y-khoa-mo-hon-nhat-thuong-hai",
    title: "Đại Tiểu Thư Trở Về là Bà Trùm Y Khoa Mỏ Hỗn Nhất Thượng Hải",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "ba-trum-xa-hoi-den-xuyen-vao-thien-kim-that-mo-hon-nha-hao-mon",
    title: "Bà Trùm Xã Hội Đen Xuyên Vào Thiên Kim Thật Mỏ Hỗn Nhà Hào Môn",
    enMotif: "rich-family romance",
    viMotif: "hào môn",
    hiMotif: "अमीर परिवार की रोमांस",
    idMotif: "romansa keluarga kaya",
    arMotif: "رومانسية العائلات الثرية",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "y-n-coded-effortless-beauty-life-social-butterfly-rich-romance-more",
    title: "Y/N CODED! Effortless Beauty, Life, Social Butterfly, Rich, Romance&More!",
    enMotif: "rich-family romance and suspense and mystery",
    viMotif: "hào môn và kinh dị bí ẩn",
    hiMotif: "अमीर परिवार की रोमांस और सस्पेंस और रहस्य",
    idMotif: "romansa keluarga kaya dan misteri dan ketegangan",
    arMotif: "رومانسية العائلات الثرية و التشويق والغموض",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "i-shouldn-t-have-taken-this-job-to-teach-him",
    title: "I Shouldn't Have Taken This Job To Teach Him",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "tai-sinh-toi-khoanh-tay-dung-nhin-em-gai-tu-huy-hoai-cuoc-doi",
    title: "Tái Sinh, Tôi Khoanh Tay Đứng Nhìn Em Gái Tự Hủy Hoại Cuộc Đời",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "second-life-as-a-soldier-book-1-complete",
    title: "Second Life As A Soldier [Book 1 Complete]",
    enMotif: "family drama",
    viMotif: "gia đình",
    hiMotif: "पारिवारिक ड्रामा",
    idMotif: "drama keluarga",
    arMotif: "دراما عائلية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "listen-to-music-while-reading",
    title: "Listen To Music While Reading",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "hoa-khoi-bat-ca-lop-di-bo-10km-toi-diem-thi-cho-may-man",
    title: "Hoa Khôi Bắt Cả Lớp Đi Bộ 10KM Tới Điểm Thi Cho May Mắn",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "i-reincarnated-as-a-druid-and-accidentally-started-an-immortal-clan",
    title: "I Reincarnated As A Druid and Accidentally Started An Immortal Clan",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "i-made-a-railgun-with-lightning-magic-litrpg",
    title: "I Made A Railgun With Lightning Magic (LitRPG",
    enMotif: "transmigration, suspense and mystery and fantasy adventure",
    viMotif: "xuyên sách, kinh dị bí ẩn và tiên hiệp fantasy",
    hiMotif: "दूसरी दुनिया, सस्पेंस और रहस्य और फ़ैंटेसी एडवेंचर",
    idMotif: "pindah dunia, misteri dan ketegangan dan petualangan fantasi",
    arMotif: "الانتقال إلى عالم آخر, التشويق والغموض و مغامرات خيالية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "aku-seharusnya-tidak-menyelamatkannya-malam-itu",
    title: "Aku Seharusnya Tidak Menyelamatkannya Malam Itu...",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "nggak-perlu-daftar-gym-pemasan-sudah-bikin-kamu-sehat",
    title: "Nggak Perlu Daftar Gym, Pemasan Sudah Bikin Kamu Sehat",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "ca-man-xuyen-thanh-nu-phu-nhung-toi-luoi-doc-ac-lam-he-thong-oiii",
    title: "Cá Mặn Xuyên Thành Nữ Phụ, Nhưng Tôi Lười Độc Ác Lắm Hệ Thống Ơiii",
    enMotif: "comedy",
    viMotif: "hài hước",
    hiMotif: "कॉमेडी",
    idMotif: "komedi",
    arMotif: "الكوميديا",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "adopted-noble-is-not-human-superhuman-in-a-medieval-fantasy-book-1-complete",
    title: "Adopted Noble Is Not Human [Superhuman In A Medieval Fantasy][Book 1 Complete]",
    enMotif: "suspense and mystery and fantasy adventure",
    viMotif: "kinh dị bí ẩn và tiên hiệp fantasy",
    hiMotif: "सस्पेंस और रहस्य और फ़ैंटेसी एडवेंचर",
    idMotif: "misteri dan ketegangan dan petualangan fantasi",
    arMotif: "التشويق والغموض و مغامرات خيالية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-dung-nham-thien-kim-that-vua-mo-hon-vua-co-tri-thuc",
    title: "Trà Xanh Đụng Nhầm Thiên Kim Thật Vừa Mỏ Hỗn Vừa Có Tri Thức",
    enMotif: "green tea rival",
    viMotif: "trà xanh",
    hiMotif: "छल भरी प्रतिद्वंद्वी",
    idMotif: "rival bermuka dua",
    arMotif: "المنافسة الماكرة",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tu-gia-su-thanh-vo-yeu-cua-trum-truong",
    title: "Từ Gia Sư Thành Vợ Yêu Của Trùm Trường",
    enMotif: "school romance",
    viMotif: "vườn trường",
    hiMotif: "कॉलेज रोमांस",
    idMotif: "romansa sekolah",
    arMotif: "رومانسية المدرسة",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "headless-over-heels-a-dark-fantasy-romance-book-1-complete",
    title: "Headless Over Heels [A Dark Fantasy Romance][Book 1 Complete]",
    enMotif: "suspense and mystery and fantasy adventure",
    viMotif: "kinh dị bí ẩn và tiên hiệp fantasy",
    hiMotif: "सस्पेंस और रहस्य और फ़ैंटेसी एडवेंचर",
    idMotif: "misteri dan ketegangan dan petualangan fantasi",
    arMotif: "التشويق والغموض و مغامرات خيالية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "seharusnya-aku-tidak-menerima-pekerjaan-ini-untuk-mengajarinya",
    title: "Seharusnya Aku Tidak Menerima Pekerjaan Ini Untuk Mengajarinya",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "dlm-aldalm-ydwm",
    title: "ضلم الضالم يدوم #",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["ar"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-doi-ca-lop-khong-duoc-noi-chuyen-voi-hoc-ba",
    title: "Trà Xanh Đòi Cả Lớp Không Được Nói Chuyện Với Học Bá",
    enMotif: "green tea rival and school romance",
    viMotif: "trà xanh và vườn trường",
    hiMotif: "छल भरी प्रतिद्वंद्वी और कॉलेज रोमांस",
    idMotif: "rival bermuka dua dan romansa sekolah",
    arMotif: "المنافسة الماكرة و رومانسية المدرسة",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "tra-xanh-doi-doi-cho-vi-muon-ngoi-canh-hoc-ba",
    title: "Trà Xanh Đòi Đổi Chỗ Vì Muốn Ngồi Cạnh Học Bá",
    enMotif: "green tea rival and school romance",
    viMotif: "trà xanh và vườn trường",
    hiMotif: "छल भरी प्रतिद्वंद्वी और कॉलेज रोमांस",
    idMotif: "rival bermuka dua dan romansa sekolah",
    arMotif: "المنافسة الماكرة و رومانسية المدرسة",
    languages: ["vi"]
  }),
  storyTitleTopic({
    slug: "pembaca-vs-pembaca-buku-kamu-termasuk-yang-mana",
    title: "Pembaca Vs Pembaca Buku (Kamu Termasuk Yang Mana?)",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "naraj-sahi-par-tera-hun",
    title: "नाराज सही पर तेरा हूं",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["hi"]
  }),
  storyTitleTopic({
    slug: "gujarat-ke-mundra-port-ki-puri-kahani-dusare-desh-ke-aae-jahazon-men-kya-hota-hai",
    title: "Gujarat के Mundra Port की पूरी कहानी, दूसरे देश के आए जहाज़ों में क्या होता है?",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["hi"]
  }),
  storyTitleTopic({
    slug: "the-worst-litrpg-story-on-royal-road-by-j-regan-is-so-bad-it-s-good",
    title: "The Worst LitRPG Story On Royal Road By J Regan Is So Bad It's Good",
    enMotif: "fantasy adventure",
    viMotif: "tiên hiệp fantasy",
    hiMotif: "फ़ैंटेसी एडवेंचर",
    idMotif: "petualangan fantasi",
    arMotif: "مغامرات خيالية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "romansa-miliarder-gelap-buku",
    title: "Romansa Miliarder Gelap (Buku )",
    enMotif: "suspense and mystery",
    viMotif: "kinh dị bí ẩn",
    hiMotif: "सस्पेंस और रहस्य",
    idMotif: "misteri dan ketegangan",
    arMotif: "التشويق والغموض",
    languages: ["id"]
  }),
  storyTitleTopic({
    slug: "in-the-library-the-cold-and-aloof-top-student-had-just-rejected-the-campus-beauty-s-confessi",
    title: "In The Library, The Cold And Aloof Top Student Had Just Rejected The Campus Beauty’s Confession...",
    enMotif: "school romance and family drama",
    viMotif: "vườn trường và gia đình",
    hiMotif: "कॉलेज रोमांस और पारिवारिक ड्रामा",
    idMotif: "romansa sekolah dan drama keluarga",
    arMotif: "رومانسية المدرسة و دراما عائلية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "my-only-familiar-is-me-a-late-blooming-evolution-story",
    title: "My Only Familiar Is Me[A Late-Blooming Evolution Story]",
    enMotif: "web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["en"]
  }),
  storyTitleTopic({
    slug: "khi-nam-phu-tu-bo-theo-duoi-doa-hoa-cao-ngao",
    title: "Khi Nam Phụ Từ Bỏ Theo Đuổi Đóa Hoa Cao Ngạo",
    enMotif: "Vietnamese web fiction and romance drama",
    viMotif: "truyện mạng Việt và romance drama",
    hiMotif: "हिंदी वेब स्टोरी और रोमांस ड्रामा",
    idMotif: "cerita online dan drama romansa",
    arMotif: "الروايات الإلكترونية و الدراما الرومانسية",
    languages: ["vi"]
  })
];

const labels = {
  en: {
    htmlLang: "en",
    dir: "ltr",
    hreflang: "en",
    ogLocale: "en_US",
    schemaLang: "en",
    languageName: "English",
    path: "en",
    audienceLead: "This guide is written for",
    tagRowLabel: "Topic tags",
    storeIos: "App Store",
    storeAndroid: "Google Play",
    storeChrome: "Chrome Extension",
    storyCtaLabel: "Download Watt Audio",
    storyCtaTitle: "Download Watt Audio to listen to {name}",
    storyCtaText: "Turn supported story links into chapter audio, listen with the screen off, and keep the story moving anywhere.",
    popularHeading: "Popular Wattpad Audio Guides",
    allGuidesHeading: "All Guides",
    guide: "Watt Audio Guide",
    home: "Home",
    guides: "Guides",
    support: "Support",
    download: "Download app",
    downloadCta: "Download on the App Store",
    screenshotTitle: "Screenshot placeholder",
    screenshotSuffix: "Replace this block with your product screenshot later.",
    stepHeading: "Step-by-step setup",
    whyHeading: "Why readers use audio for web stories",
    tipsHeading: "How to get better listening results",
    usefulHeading: "When Watt Audio is most useful",
    faqHeading: "Frequently asked questions",
    relatedHeading: "Related guides",
    ctaHeading: "Download Watt Audio",
    ctaText: "Turn supported story links into chapter audio, listen with the screen off, adjust playback speed, and keep your reading habit moving when life is busy.",
    indexTitle: "Watt Audio Guides",
    indexDescription: "Guides to listen to Wattpad audio, hear Wattpad stories with text to speech, compare Speechify alternatives, and follow web novels, romance, fantasy, and online fiction with Watt Audio.",
    homeTag: "Turn stories into audio and listen anywhere.",
    privacy: "Privacy Policy",
    footer: "AI-assisted educational guide",
    introA: "If you are searching for {focus}, you probably want something more comfortable than staring at a screen for every chapter. Web fiction is easy to discover but not always easy to read in daily life. Chapters arrive at odd times, stories can become very long, and the best reading moments often happen when your hands or eyes are already busy.",
    introB: "Watt Audio is designed around that exact problem. Instead of treating a story page like a normal web article, it helps you bring a supported story link into a listening library, create chapter audio, and continue the story with controls that feel closer to an audiobook player. The goal is not to replace the original story source or the author. The goal is to make personal reading more flexible when you want to listen.",
    whyA: "Reading on a phone is convenient, but it can also become tiring. Bright screens, small text, long scrolling sessions, and constant notifications can make even a favorite story feel harder to finish. Audio gives you another mode. You can continue a chapter during {scenario}, then return to normal reading whenever you want full visual focus.",
    whyB: "The best audio workflow is chapter-based. A generic text reader may speak everything on a web page, including navigation, comments, buttons, and unrelated page elements. A story-focused app should keep attention on the chapter, remember where you are, and give you a clear way to move forward without rebuilding your queue every time.",
    stepIntro: "The simplest way to start is to treat the first chapter as a test. Do not worry about converting an entire library on day one. Add one story, generate one chapter, and check whether the voice, speed, and controls fit the way you like to read.",
    stepOutro: "Once this first flow feels natural, you can use it for longer sessions. Some readers prepare a few chapters before a commute. Others generate only the newest update from a favorite story. The most useful habit is to keep audio preparation close to your real routine, not to create a huge queue that you never finish.",
    tipsIntro: "Text to speech works best when you give yourself permission to adjust the experience. Fiction is not one uniform format. A quiet romance confession, a fantasy battle, a recap chapter, and a casual author's note all have different rhythms. The same playback speed will not always feel right.",
    tipsOutro: "If you care about immersion, listen for a few minutes before deciding whether a chapter is a good fit for audio. Some chapters are perfect for hands-free listening because they are linear and dialogue-driven. Others include lists, unusual formatting, or heavy world-building that may be easier to read visually. A flexible reader uses both modes.",
    usefulA: "Watt Audio is most helpful when the story is already part of your routine. If you follow many serialized stories, you know how easy it is to fall behind. Audio turns small gaps in the day into reading time: a walk, a bus ride, a cleaning session, or a quiet moment before sleep. Those small sessions add up quickly.",
    usefulB: "It is also useful for rereads. When you already know the plot, listening can bring back the atmosphere without requiring the same level of visual attention. You can revisit favorite chapters, catch up before a new update, or move through slower sections while saving your focused reading energy for the scenes you care about most."
  },
  vi: {
    htmlLang: "vi",
    dir: "ltr",
    hreflang: "vi-VN",
    ogLocale: "vi_VN",
    schemaLang: "vi-VN",
    languageName: "Tiếng Việt",
    path: "vi",
    audienceLead: "Bài này dành cho",
    tagRowLabel: "Chủ đề",
    storeIos: "Tải trên App Store",
    storeAndroid: "Tải trên Google Play",
    storeChrome: "Thêm vào Chrome",
    storyCtaLabel: "Tải Watt Audio",
    storyCtaTitle: "Tải Watt Audio để nghe {name}",
    storyCtaText: "Chuyển link truyện được hỗ trợ thành audio theo chương, nghe khi tắt màn hình và tiếp tục truyện mọi lúc.",
    popularHeading: "Hướng dẫn Wattpad audio nổi bật",
    allGuidesHeading: "Tất cả hướng dẫn",
    guide: "Hướng dẫn Watt Audio",
    home: "Trang chủ",
    guides: "Hướng dẫn",
    support: "Hỗ trợ",
    download: "Tải app",
    downloadCta: "Tải trên App Store",
    screenshotTitle: "Chỗ đặt screenshot",
    screenshotSuffix: "Bạn thay khối này bằng ảnh chụp màn hình sản phẩm sau.",
    stepHeading: "Các bước thực hiện",
    whyHeading: "Vì sao nên nghe truyện bằng audio",
    tipsHeading: "Cách nghe hiệu quả hơn",
    usefulHeading: "Khi nào Watt Audio hữu ích nhất",
    faqHeading: "Câu hỏi thường gặp",
    relatedHeading: "Bài liên quan",
    ctaHeading: "Tải Watt Audio",
    ctaText: "Biến link truyện được hỗ trợ thành audio theo chương, nghe khi tắt màn hình, chỉnh tốc độ và giữ thói quen đọc truyện ngay cả khi bận.",
    indexTitle: "Hướng dẫn Watt Audio",
    indexDescription: "Các hướng dẫn nghe audio trên Wattpad, nghe truyện Wattpad bằng text to speech, app thay thế Speechify, web novel, romance, fantasy và truyện online bằng Watt Audio.",
    homeTag: "Chuyển truyện chữ thành audio, nghe mọi lúc.",
    privacy: "Chính sách quyền riêng tư",
    footer: "Bài hướng dẫn có hỗ trợ bởi AI",
    introA: "Nếu bạn đang tìm cách {focus}, có lẽ bạn muốn một trải nghiệm dễ chịu hơn việc nhìn màn hình cho từng chương. Truyện online rất dễ tìm nhưng không phải lúc nào cũng dễ đọc trong đời sống hằng ngày. Chương mới đến vào những thời điểm lặt vặt, truyện có thể rất dài, còn lúc rảnh đọc tốt nhất lại thường là lúc tay hoặc mắt đã bận.",
    introB: "Watt Audio được thiết kế cho đúng vấn đề đó. Thay vì xem trang truyện như một bài web thông thường, app giúp bạn đưa link truyện được hỗ trợ vào thư viện nghe, tạo audio theo chương và tiếp tục nghe bằng các điều khiển giống một trình phát audiobook. Mục tiêu không phải thay thế nguồn truyện hay tác giả, mà là giúp việc đọc cá nhân linh hoạt hơn khi bạn muốn nghe.",
    whyA: "Đọc trên điện thoại tiện, nhưng cũng dễ mỏi. Màn hình sáng, chữ nhỏ, cuộn lâu và thông báo liên tục có thể làm cả truyện yêu thích trở nên khó theo dõi. Audio cho bạn thêm một chế độ khác. Bạn có thể tiếp tục chương trong lúc {scenario}, rồi quay lại đọc bằng mắt khi muốn tập trung hoàn toàn.",
    whyB: "Workflow nghe tốt nhất nên đi theo chương. Một trình đọc văn bản chung có thể đọc cả menu, bình luận, nút bấm và những phần không liên quan trên trang. App tập trung vào truyện nên giữ sự chú ý ở chương, nhớ vị trí nghe và cho bạn cách đi tiếp rõ ràng mà không phải dựng lại hàng chờ mỗi lần.",
    stepIntro: "Cách bắt đầu đơn giản nhất là xem chương đầu tiên như một lần thử. Đừng vội chuyển cả thư viện trong ngày đầu. Hãy thêm một truyện, tạo một chương và kiểm tra xem giọng đọc, tốc độ, điều khiển có hợp với cách bạn đọc hay không.",
    stepOutro: "Khi luồng đầu tiên đã tự nhiên, bạn có thể dùng cho các buổi nghe dài hơn. Một số người chuẩn bị vài chương trước khi đi làm. Người khác chỉ tạo chương mới nhất của truyện đang theo dõi. Thói quen hữu ích nhất là chuẩn bị audio sát với lịch thật của bạn, không phải tạo một hàng chờ khổng lồ rồi bỏ quên.",
    tipsIntro: "Text to speech hoạt động tốt nhất khi bạn cho phép mình điều chỉnh trải nghiệm. Truyện không phải một định dạng đồng nhất. Một cảnh tỏ tình yên lặng, trận chiến fantasy, chương recap và lời tác giả đều có nhịp khác nhau. Cùng một tốc độ phát không phải lúc nào cũng phù hợp.",
    tipsOutro: "Nếu bạn quan tâm đến sự nhập tâm, hãy nghe vài phút trước khi quyết định chương đó có hợp với audio không. Có chương rất hợp nghe rảnh tay vì tuyến tính và nhiều đối thoại. Có chương chứa danh sách, định dạng lạ hoặc world-building nặng nên đọc bằng mắt sẽ dễ hơn. Người đọc linh hoạt dùng cả hai chế độ.",
    usefulA: "Watt Audio hữu ích nhất khi truyện đã là một phần thói quen của bạn. Nếu bạn theo dõi nhiều truyện đăng kỳ, bạn biết việc tụt lại dễ thế nào. Audio biến các khoảng trống nhỏ trong ngày thành thời gian đọc: đi bộ, đi xe, dọn nhà hoặc vài phút yên tĩnh trước khi ngủ. Những khoảng nhỏ đó cộng lại rất nhanh.",
    usefulB: "App cũng hữu ích khi đọc lại. Khi bạn đã biết cốt truyện, nghe audio có thể kéo lại không khí truyện mà không cần tập trung thị giác như lần đầu. Bạn có thể quay lại chương yêu thích, bắt kịp trước cập nhật mới hoặc đi qua đoạn chậm hơn để dành năng lượng đọc kỹ cho cảnh quan trọng."
  },
  hi: {
    htmlLang: "hi",
    dir: "ltr",
    hreflang: "hi-IN",
    ogLocale: "hi_IN",
    schemaLang: "hi-IN",
    languageName: "हिन्दी",
    path: "hi",
    audienceLead: "यह गाइड इनके लिए है:",
    tagRowLabel: "विषय",
    storeIos: "App Store से डाउनलोड करें",
    storeAndroid: "Google Play से डाउनलोड करें",
    storeChrome: "Chrome में जोड़ें",
    storyCtaLabel: "Watt Audio डाउनलोड करें",
    storyCtaTitle: "{name} सुनने के लिए Watt Audio डाउनलोड करें",
    storyCtaText: "सपोर्टेड कहानी लिंक को चैप्टर ऑडियो में बदलें, स्क्रीन बंद करके सुनें और कहानी कहीं भी आगे बढ़ाएँ।",
    popularHeading: "लोकप्रिय ऑडियो स्टोरी गाइड",
    allGuidesHeading: "सभी गाइड",
    guide: "Watt Audio गाइड",
    home: "होम",
    guides: "गाइड",
    support: "सहायता",
    download: "ऐप डाउनलोड करें",
    downloadCta: "App Store से डाउनलोड करें",
    screenshotTitle: "स्क्रीनशॉट प्लेसहोल्डर",
    screenshotSuffix: "इस हिस्से को बाद में प्रोडक्ट स्क्रीनशॉट से बदलें।",
    stepHeading: "स्टेप-बाय-स्टेप सेटअप",
    whyHeading: "वेब स्टोरी के लिए पाठक ऑडियो क्यों चुनते हैं",
    tipsHeading: "बेहतर सुनने के लिए क्या करें",
    usefulHeading: "Watt Audio कब सबसे ज़्यादा काम आता है",
    faqHeading: "अक्सर पूछे जाने वाले सवाल",
    relatedHeading: "संबंधित गाइड",
    ctaHeading: "Watt Audio डाउनलोड करें",
    ctaText: "सपोर्टेड कहानी लिंक को चैप्टर ऑडियो में बदलें, स्क्रीन बंद करके सुनें, स्पीड बदलें और व्यस्त दिनों में भी कहानी पढ़ने की आदत बनाए रखें।",
    indexTitle: "Watt Audio हिंदी गाइड",
    indexDescription: "हिंदी वेब स्टोरी, Wattpad कहानियाँ और लंबी सीरीज़ को ऑडियो में सुनने की गाइड, टेक्स्ट टू स्पीच टिप्स और Watt Audio का चैप्टर-वाइज़ वर्कफ़्लो।",
    homeTag: "कहानियों को ऑडियो में बदलें और कहीं भी सुनें।",
    privacy: "गोपनीयता नीति",
    footer: "AI की मदद से बनी जानकारी गाइड",
    introA: "अगर आप {focus} का तरीका खोज रहे हैं, तो शायद आप हर चैप्टर के लिए स्क्रीन देखने से ज़्यादा आरामदायक कुछ चाहते हैं। वेब स्टोरी ढूँढ़ना आसान है, लेकिन रोज़मर्रा की ज़िंदगी में उन्हें पढ़ पाना हमेशा आसान नहीं होता। नए चैप्टर अजीब समय पर आते हैं, कहानियाँ बहुत लंबी हो जाती हैं, और पढ़ने का सबसे अच्छा वक़्त अक्सर तब आता है जब हाथ या आँखें पहले से व्यस्त हों।",
    introB: "Watt Audio ठीक इसी समस्या के लिए बना है। कहानी के पेज को एक आम वेब आर्टिकल की तरह मानने के बजाय, यह सपोर्टेड कहानी लिंक को एक लिसनिंग लाइब्रेरी में लाता है, चैप्टर ऑडियो बनाता है और ऑडियोबुक प्लेयर जैसे कंट्रोल के साथ कहानी आगे बढ़ाने देता है। मक़सद मूल स्रोत या लेखक की जगह लेना नहीं है, बल्कि आपकी निजी पढ़ाई को ज़्यादा लचीला बनाना है।",
    whyA: "फ़ोन पर पढ़ना सुविधाजनक है, पर थकाने वाला भी। तेज़ रोशनी, छोटे अक्षर, लंबी स्क्रॉलिंग और लगातार नोटिफ़िकेशन पसंदीदा कहानी को भी बोझ बना देते हैं। ऑडियो एक दूसरा तरीका देता है। आप {scenario} के दौरान चैप्टर आगे बढ़ा सकते हैं, और जब पूरा ध्यान देना हो तब पढ़ने पर लौट सकते हैं।",
    whyB: "सबसे अच्छा ऑडियो वर्कफ़्लो चैप्टर के हिसाब से चलता है। कोई आम टेक्स्ट रीडर पूरे वेब पेज को पढ़ देता है, जिसमें मेन्यू, कमेंट और बटन भी शामिल होते हैं। कहानी पर केंद्रित ऐप ध्यान चैप्टर पर रखता है, आपकी जगह याद रखता है और हर बार क्यू दोबारा बनाए बिना आगे बढ़ने का साफ़ रास्ता देता है।",
    stepIntro: "शुरुआत का सबसे आसान तरीका है पहले चैप्टर को एक टेस्ट की तरह लेना। पहले ही दिन पूरी लाइब्रेरी बदलने की ज़रूरत नहीं है। एक कहानी जोड़ें, एक चैप्टर का ऑडियो बनाएँ और देखें कि आवाज़, स्पीड और कंट्रोल आपकी पढ़ने की आदत से मेल खाते हैं या नहीं।",
    stepOutro: "जब यह पहला फ़्लो सहज लगने लगे, तो इसे लंबे सेशन के लिए इस्तेमाल करें। कुछ पाठक सफ़र से पहले कुछ चैप्टर तैयार कर लेते हैं, कुछ सिर्फ़ नया अपडेट बनाते हैं। सबसे काम की आदत यह है कि ऑडियो तैयारी आपकी असली दिनचर्या के पास रहे, न कि एक बड़ी क़तार बन जाए जो कभी पूरी न हो।",
    tipsIntro: "टेक्स्ट टू स्पीच तब सबसे अच्छा काम करता है जब आप सेटिंग बदलने में झिझकें नहीं। कहानी एक जैसी नहीं होती। एक शांत इज़हार वाला सीन, एक फ़ैंटेसी लड़ाई, एक रीकैप चैप्टर और लेखक का नोट—सबकी लय अलग होती है। एक ही स्पीड हर जगह सही नहीं लगेगी।",
    tipsOutro: "अगर आपको कहानी में डूबना पसंद है, तो कुछ मिनट सुनकर तय करें कि यह चैप्टर ऑडियो के लिए ठीक है या नहीं। संवाद वाले सीधे चैप्टर सुनने में बढ़िया लगते हैं। जिनमें सूचियाँ, अलग फ़ॉर्मैटिंग या भारी वर्ल्ड-बिल्डिंग हो, उन्हें आँखों से पढ़ना आसान रहता है। अच्छा पाठक दोनों तरीक़े इस्तेमाल करता है।",
    usefulA: "Watt Audio तब सबसे ज़्यादा काम आता है जब कहानी आपकी दिनचर्या का हिस्सा बन चुकी हो। अगर आप कई सीरीज़ फ़ॉलो करते हैं तो पीछे छूट जाना आम बात है। ऑडियो दिन के छोटे-छोटे अंतराल को पढ़ने के समय में बदल देता है: टहलना, बस का सफ़र, घर का काम या सोने से पहले के कुछ शांत मिनट। ये छोटे सेशन तेज़ी से जुड़ते हैं।",
    usefulB: "दोबारा सुनने में भी यह उपयोगी है। जब कहानी पहले से पता हो, तब सुनना उसका माहौल लौटा देता है और उतना ध्यान भी नहीं माँगता। आप पसंदीदा चैप्टर दोबारा सुन सकते हैं, नए अपडेट से पहले कहानी ताज़ा कर सकते हैं, या धीमे हिस्सों से गुज़र सकते हैं और अपनी पूरी एकाग्रता उन दृश्यों के लिए बचा सकते हैं जो सबसे मायने रखते हैं।"
  },
  id: {
    htmlLang: "id",
    dir: "ltr",
    hreflang: "id-ID",
    ogLocale: "id_ID",
    schemaLang: "id-ID",
    languageName: "Bahasa Indonesia",
    path: "id",
    audienceLead: "Panduan ini ditujukan untuk",
    tagRowLabel: "Topik",
    storeIos: "Unduh di App Store",
    storeAndroid: "Unduh di Google Play",
    storeChrome: "Tambahkan ke Chrome",
    storyCtaLabel: "Unduh Watt Audio",
    storyCtaTitle: "Unduh Watt Audio untuk mendengarkan {name}",
    storyCtaText: "Ubah tautan cerita yang didukung menjadi audio per bab, dengarkan dengan layar mati, dan lanjutkan ceritamu di mana saja.",
    popularHeading: "Panduan Audio Cerita Populer",
    allGuidesHeading: "Semua Panduan",
    guide: "Panduan Watt Audio",
    home: "Beranda",
    guides: "Panduan",
    support: "Dukungan",
    download: "Unduh aplikasi",
    downloadCta: "Unduh di App Store",
    screenshotTitle: "Tempat tangkapan layar",
    screenshotSuffix: "Ganti blok ini dengan tangkapan layar produk nanti.",
    stepHeading: "Panduan langkah demi langkah",
    whyHeading: "Kenapa pembaca memilih audio untuk cerita online",
    tipsHeading: "Cara mendapat hasil dengar yang lebih baik",
    usefulHeading: "Kapan Watt Audio paling berguna",
    faqHeading: "Pertanyaan yang sering diajukan",
    relatedHeading: "Panduan terkait",
    ctaHeading: "Unduh Watt Audio",
    ctaText: "Ubah tautan cerita yang didukung menjadi audio per bab, dengarkan dengan layar mati, atur kecepatan, dan pertahankan kebiasaan membaca walau harimu padat.",
    indexTitle: "Panduan Watt Audio Indonesia",
    indexDescription: "Panduan mendengarkan cerita Wattpad, novel online, dan cerita bersambung panjang dalam bentuk audio, plus tips text to speech dan alur per bab Watt Audio.",
    homeTag: "Ubah cerita menjadi audio dan dengarkan di mana saja.",
    privacy: "Kebijakan Privasi",
    footer: "Panduan edukatif dibantu AI",
    introA: "Kalau kamu sedang mencari cara {focus}, kemungkinan besar kamu ingin sesuatu yang lebih nyaman daripada menatap layar di setiap bab. Cerita online mudah ditemukan, tapi tidak selalu mudah dibaca di sela kesibukan harian. Bab baru muncul di jam yang tidak menentu, ceritanya bisa jadi sangat panjang, dan waktu terbaik untuk membaca sering datang justru saat tangan atau matamu sudah sibuk.",
    introB: "Watt Audio dirancang untuk masalah itu. Alih-alih memperlakukan halaman cerita seperti artikel web biasa, aplikasi ini membantumu memasukkan tautan cerita yang didukung ke dalam pustaka dengar, membuat audio per bab, dan melanjutkan cerita dengan kontrol yang terasa seperti pemutar buku audio. Tujuannya bukan menggantikan sumber cerita atau penulisnya, melainkan membuat kebiasaan membacamu lebih fleksibel.",
    whyA: "Membaca di ponsel memang praktis, tapi juga melelahkan. Layar terang, huruf kecil, scroll panjang, dan notifikasi yang terus muncul bisa membuat cerita favorit pun terasa berat diselesaikan. Audio memberi mode lain. Kamu bisa melanjutkan satu bab sambil {scenario}, lalu kembali membaca saat ingin fokus penuh.",
    whyB: "Alur dengar terbaik itu berbasis bab. Pembaca teks umum bisa membacakan seluruh isi halaman, termasuk menu, komentar, tombol, dan bagian yang tidak relevan. Aplikasi yang fokus pada cerita menjaga perhatian tetap di bab, mengingat posisimu, dan memberi jalan jelas untuk melanjutkan tanpa menyusun ulang antrean setiap kali.",
    stepIntro: "Cara paling sederhana untuk memulai adalah menjadikan bab pertama sebagai uji coba. Tidak perlu memindahkan seluruh pustaka di hari pertama. Tambahkan satu cerita, buat satu bab, lalu cek apakah suara, kecepatan, dan kontrolnya cocok dengan gayamu membaca.",
    stepOutro: "Begitu alur pertama terasa wajar, kamu bisa memakainya untuk sesi yang lebih panjang. Sebagian pembaca menyiapkan beberapa bab sebelum berangkat kerja. Sebagian lain hanya membuat update terbaru dari cerita favorit. Kebiasaan paling berguna adalah menyiapkan audio sedekat mungkin dengan rutinitas nyatamu, bukan menumpuk antrean yang tak pernah selesai.",
    tipsIntro: "Text to speech bekerja paling baik saat kamu membolehkan diri menyesuaikan pengalamannya. Fiksi bukan satu format seragam. Adegan pernyataan cinta yang tenang, pertarungan fantasi, bab rekap, dan catatan penulis punya ritme berbeda. Kecepatan yang sama tidak selalu terasa pas.",
    tipsOutro: "Kalau kamu peduli pada imersi, dengarkan beberapa menit sebelum memutuskan apakah sebuah bab cocok untuk audio. Bab yang linear dan penuh dialog biasanya enak didengar bebas genggam. Bab dengan daftar, format tidak biasa, atau world-building padat lebih mudah dibaca secara visual. Pembaca yang lentur memakai kedua mode.",
    usefulA: "Watt Audio paling membantu ketika cerita sudah jadi bagian rutinitasmu. Kalau kamu mengikuti banyak cerita bersambung, kamu tahu betapa mudahnya tertinggal. Audio mengubah celah kecil dalam sehari menjadi waktu membaca: jalan kaki, naik kendaraan, beres-beres, atau momen tenang sebelum tidur. Sesi-sesi kecil itu cepat menumpuk.",
    usefulB: "Ini juga berguna untuk membaca ulang. Saat alurnya sudah kamu tahu, mendengarkan bisa mengembalikan suasananya tanpa menuntut perhatian visual yang sama. Kamu bisa menengok lagi bab favorit, menyegarkan ingatan sebelum update baru, atau melewati bagian yang lambat sambil menyimpan energi bacamu untuk adegan yang paling kamu tunggu."
  },
  ar: {
    htmlLang: "ar",
    dir: "rtl",
    hreflang: "ar",
    ogLocale: "ar_AR",
    schemaLang: "ar",
    languageName: "العربية",
    path: "ar",
    audienceLead: "هذا الدليل موجّه إلى",
    tagRowLabel: "المواضيع",
    storeIos: "التحميل من App Store",
    storeAndroid: "التحميل من Google Play",
    storeChrome: "إضافة إلى Chrome",
    storyCtaLabel: "حمّل Watt Audio",
    storyCtaTitle: "حمّل Watt Audio للاستماع إلى {name}",
    storyCtaText: "حوّل روابط الروايات المدعومة إلى فصول صوتية، واستمع والشاشة مطفأة، وتابع الرواية أينما كنت.",
    popularHeading: "أدلة الاستماع الأكثر رواجاً",
    allGuidesHeading: "كل الأدلة",
    guide: "دليل Watt Audio",
    home: "الرئيسية",
    guides: "الأدلة",
    support: "الدعم",
    download: "تحميل التطبيق",
    downloadCta: "التحميل من App Store",
    screenshotTitle: "مكان لقطة الشاشة",
    screenshotSuffix: "استبدل هذا الجزء بلقطة شاشة من التطبيق لاحقاً.",
    stepHeading: "خطوات الإعداد",
    whyHeading: "لماذا يفضّل القرّاء الاستماع إلى الروايات",
    tipsHeading: "كيف تحصل على تجربة استماع أفضل",
    usefulHeading: "متى يكون Watt Audio أكثر فائدة",
    faqHeading: "الأسئلة الشائعة",
    relatedHeading: "أدلة ذات صلة",
    ctaHeading: "حمّل Watt Audio",
    ctaText: "حوّل روابط الروايات المدعومة إلى فصول صوتية، واستمع والشاشة مطفأة، واضبط سرعة القراءة، وحافظ على عادتك في متابعة الروايات مهما انشغل يومك.",
    indexTitle: "أدلة Watt Audio بالعربية",
    indexDescription: "أدلة للاستماع إلى روايات Wattpad والروايات العربية الطويلة على شكل فصول صوتية، مع نصائح تحويل النص إلى كلام وطريقة عمل Watt Audio.",
    homeTag: "حوّل الروايات إلى صوت واستمع أينما كنت.",
    privacy: "سياسة الخصوصية",
    footer: "دليل تعليمي بمساعدة الذكاء الاصطناعي",
    introA: "إذا كنت تبحث عن {focus}، فغالباً تريد طريقة أرحم من التحديق في الشاشة مع كل فصل. الروايات على الإنترنت سهلة الاكتشاف، لكنها ليست دائماً سهلة القراءة في زحمة اليوم. الفصول تصدر في أوقات متفرقة، والروايات تطول كثيراً، وأفضل أوقات المتابعة تأتي عادةً وأنت مشغول اليدين أو مرهق العينين.",
    introB: "صُمم Watt Audio لهذه المشكلة تحديداً. فبدل التعامل مع صفحة الرواية كمقال عادي، يساعدك على إدخال رابط رواية مدعوم إلى مكتبة استماع، وإنشاء صوت لكل فصل، ومتابعة الرواية بأدوات تحكّم أقرب إلى مشغّل الكتب الصوتية. الهدف ليس الاستغناء عن المصدر الأصلي أو عن الكاتب، بل جعل قراءتك الشخصية أكثر مرونة.",
    whyA: "القراءة على الهاتف مريحة لكنها متعبة أيضاً. الشاشة الساطعة والخط الصغير والتمرير الطويل والإشعارات المتواصلة قد تجعل حتى الرواية المفضلة عبئاً. الصوت يمنحك وضعاً آخر. يمكنك متابعة فصل أثناء {scenario}، ثم العودة إلى القراءة حين ترغب بتركيز كامل.",
    whyB: "أفضل طريقة للاستماع تقوم على الفصول. القارئ النصي العام قد ينطق كل ما في الصفحة، بما فيه القوائم والتعليقات والأزرار وعناصر لا علاقة لها بالرواية. أما التطبيق المخصص للروايات فيبقي الانتباه على الفصل، ويتذكر موضعك، ويمنحك طريقاً واضحاً للمتابعة دون إعادة بناء قائمتك في كل مرة.",
    stepIntro: "أبسط بداية هي اعتبار الفصل الأول تجربة. لا داعي لتحويل مكتبتك كلها في اليوم الأول. أضف رواية واحدة، وأنشئ فصلاً واحداً، وتحقق إن كان الصوت والسرعة وأدوات التحكم تناسب طريقتك في القراءة.",
    stepOutro: "حين يصبح هذا المسار مألوفاً، استخدمه لجلسات أطول. بعض القرّاء يجهّزون بضعة فصول قبل التنقل، وبعضهم ينشئ الفصل الجديد فقط من رواية يتابعها. أنفع عادة هي أن يبقى تجهيز الصوت قريباً من روتينك الحقيقي، لا أن تبني قائمة ضخمة لن تنهيها.",
    tipsIntro: "تعمل تقنية تحويل النص إلى كلام على أفضل وجه حين تسمح لنفسك بضبط التجربة. الروايات ليست قالباً واحداً. مشهد اعتراف هادئ، ومعركة خيالية، وفصل تلخيص، وملاحظة من الكاتب: لكلٍّ إيقاعه، وسرعة واحدة لن تناسب الجميع.",
    tipsOutro: "إن كان الاندماج في الأجواء يهمّك، استمع بضع دقائق قبل أن تقرر إن كان الفصل مناسباً للصوت. الفصول المتسلسلة الغنية بالحوار ممتازة للاستماع بلا يدين، أما الفصول التي تحوي قوائم أو تنسيقاً غير معتاد أو بناء عالم مكثفاً فقد تكون أسهل بالقراءة. القارئ المرن يستخدم الوضعين معاً.",
    usefulA: "يظهر نفع Watt Audio أكثر حين تصبح الرواية جزءاً من روتينك. من يتابع سلاسل كثيرة يعرف كم يسهل التأخر عنها. الصوت يحوّل الفجوات الصغيرة في اليوم إلى وقت متابعة: مشي، أو طريق، أو ترتيب المنزل، أو دقائق هادئة قبل النوم. هذه الجلسات القصيرة تتراكم بسرعة.",
    usefulB: "وهو مفيد أيضاً عند إعادة الاستماع. حين تعرف الأحداث مسبقاً، يعيد لك الصوت أجواء الرواية دون أن يطلب التركيز البصري نفسه. يمكنك العودة إلى فصولك المفضلة، أو تحديث ذاكرتك قبل صدور فصل جديد، أو تجاوز الأجزاء البطيئة مع الاحتفاظ بتركيزك للمشاهد التي تنتظرها فعلاً."
  }
};

const popularGuideSlugs = [
  "wattpad-bi-chan-vpn",
  "wattpad-khong-vao-duoc",
  "how-to-listen-to-wattpad-stories",
  "wattpad-audio-on-android",
  "how-to-listen-to-stories-on-wattpad",
  "does-wattpad-have-audiobooks",
  "does-wattpad-read-to-you",
  "wattpad-audiobook-reader-guide",
  "how-to-get-wattpad-to-read-to-you",
  "does-wattpad-have-text-to-speech",
  "how-to-add-text-to-speech-in-wattpad",
  "wattpad-audio-reader",
  "best-wattpad-audiobook-app"
];

const relatedGuideSlugs = [
  "how-to-listen-to-wattpad-stories",
  "wattpad-audio-on-android",
  "how-to-listen-to-stories-on-wattpad",
  "does-wattpad-have-audiobooks",
  "does-wattpad-read-to-you",
  "can-wattpad-read-stories-aloud",
  "wattpad-audiobook-reader-guide",
  "how-to-get-wattpad-to-read-to-you",
  "does-wattpad-have-text-to-speech",
  "how-to-add-text-to-speech-in-wattpad",
  "wattpad-text-to-speech-android",
  "how-to-listen-to-wattpad-offline",
  "wattpad-audio-reader",
  "best-wattpad-audiobook-app"
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fill(template, page) {
  return template.replaceAll("{focus}", page.focus).replaceAll("{scenario}", page.scenario);
}

function relPrefix(lang) {
  return siteLanguages.includes(lang) ? "../" : "";
}

function articleUrl(lang, slug) {
  return `${siteUrl}/${lang}/articles/${slug}.html`;
}

function topicLanguages(topic) {
  return siteLanguages.filter((lang) => topic[lang]);
}

function absoluteUrl(pathname) {
  return `${siteUrl}${pathname}`;
}

function stylesheetHref(pathname) {
  return `${pathname}?v=${cssVersion}`;
}

function htmlDirAttr(lang) {
  return labels[lang]?.dir === "rtl" ? ` dir="rtl"` : "";
}

// assets/seo.css is authored left-to-right, so RTL pages get a small override block
// instead of a second stylesheet.
function rtlStyleTag(lang) {
  if (labels[lang]?.dir !== "rtl") return "";
  return `
<style>
  body { direction: rtl; text-align: right; }
  ol, ul { padding-left: 0; padding-right: 22px; }
  .home-links a::after { right: auto; left: 18px; transform: rotate(-135deg); }
  .store-options { left: 0; right: auto; }
</style>`;
}

function downloadButtonLinks(lang) {
  const l = labels[lang];
  const iosLabel = l.storeIos;
  const androidLabel = l.storeAndroid;
  const chromeLabel = l.storeChrome;
  const downloadLabel = l.download;
  return `<div class="store-menu">
          <button class="btn store-trigger" type="button" aria-haspopup="true">${downloadLabel}</button>
          <div class="store-options" aria-label="${downloadLabel}">
            <a href="${androidUrl}">${androidLabel}</a>
            <a href="${iosUrl}">${iosLabel}</a>
            <a href="${chromeUrl}">${chromeLabel}</a>
          </div>
        </div>`;
}

function downloadNavLinks(lang) {
  return downloadButtonLinks(lang);
}

function articleTags(topic, lang) {
  const shared = ["Watt Audio", "Wattpad audio", "listen to Wattpad audio", "nghe audio trên Wattpad", "nghe audio Wattpad", "text to speech", "text to speech app", "TTS reader", "AI voice", "story audio"];
  const bySlug = {
    "wattpad-bi-chan-vpn": ["Wattpad bị chặn", "Wattpad VPN", "Wattpad blocked", "Wattpad không vào được", "Wattpad DNS"],
    "wattpad-khong-vao-duoc": ["Wattpad không vào được", "Wattpad bị lỗi", "Wattpad not working", "Wattpad loading error"],
    "wattpad-loi-dns-khong-tai-duoc": ["Wattpad lỗi DNS", "Wattpad tải mãi", "Wattpad DNS error", "Wattpad connection problem"],
    "nghe-truyen-khi-wattpad-bi-chan": ["nghe truyện khi Wattpad bị chặn", "Wattpad bị chặn VPN", "Wattpad offline", "truyện audio dự phòng"],
    "what-is-wattpad": ["What is Wattpad", "Wattpad stories", "social storytelling", "web fiction"],
    "can-you-listen-to-wattpad-stories": ["Can you listen to Wattpad", "listen to Wattpad stories", "Wattpad text to speech"],
    "why-readers-prefer-audio": ["why readers prefer audio", "audio reading", "screen fatigue", "hands-free reading"],
    "how-to-convert-wattpad-stories-into-audio": ["convert Wattpad stories into audio", "Wattpad audio converter", "chapter audio"],
    "best-app-to-listen-to-wattpad-stories": ["best app to listen to Wattpad", "Wattpad listening app", "AI story reader"],
    "best-werewolf-stories": ["best werewolf stories", "werewolf romance", "alpha werewolf stories", "supernatural romance"],
    "best-romance-stories": ["best romance stories", "romance audio", "slow burn romance", "love stories"],
    "best-ceo-romance-stories": ["CEO romance stories", "billionaire romance", "office romance", "contract romance"],
    "best-fantasy-romance-stories": ["fantasy romance stories", "romantasy", "magic romance", "enemies to lovers"],
    "best-fanfiction-stories": ["fanfiction stories", "fanfic audio", "alternate universe", "fandom stories"],
    "watt-audio-vs-speechify": ["Watt Audio vs Speechify", "Speechify alternative", "text to speech comparison"],
    "watt-audio-vs-elevenlabs-reader": ["Watt Audio vs ElevenLabs Reader", "ElevenLabs Reader alternative", "AI reader comparison"],
    "best-apps-to-listen-to-stories-faq": ["best apps to listen to stories", "story listening apps", "audio story FAQ"],
    "how-to-listen-to-wattpad-stories": ["listen to Wattpad stories", "Wattpad reader", "story listening"],
    "how-to-listen-to-stories-on-wattpad": ["how to listen to stories on Wattpad", "listen to stories on Wattpad", "Wattpad text to speech"],
    "does-wattpad-have-audiobooks": ["does Wattpad have audiobooks", "Wattpad audiobooks", "audio stories", "Wattpad audio"],
    "wattpad-audiobook-reader-guide": ["Wattpad audiobook", "Wattpad audiobooks", "audiobook reader", "story audio"],
    "how-to-get-wattpad-to-read-to-you": ["can Wattpad read to you", "how to get Wattpad to read to you", "Wattpad read aloud", "text to speech Wattpad"],
    "how-to-add-text-to-speech-in-wattpad": ["how to add text to speech in Wattpad", "add text to speech Wattpad", "Wattpad read aloud", "Wattpad TTS"],
    "does-wattpad-have-text-to-speech": ["does Wattpad have text to speech", "Wattpad text to speech", "Wattpad read aloud", "Wattpad TTS"],
    "wattpad-audio-on-android": ["Wattpad audio Android", "Wattpad audio on Android", "Android story audio", "Google Play story app"],
    "wattpad-text-to-speech-android": ["Wattpad text to speech Android", "Android TTS", "read Wattpad aloud Android", "Google Play TTS"],
    "does-wattpad-read-to-you": ["does Wattpad read to you", "Wattpad read to you", "Wattpad read aloud", "text to speech Wattpad"],
    "can-wattpad-read-stories-aloud": ["can Wattpad read stories aloud", "Wattpad stories read aloud", "Wattpad read aloud", "AI voice reader"],
    "how-to-listen-to-wattpad-offline": ["listen to Wattpad offline", "offline Wattpad audio", "Wattpad offline listening", "offline story audio"],
    "watts-audio": ["watts audio", "watt audio", "wattaudio", "Watt Audio app"],
    "how-to-convert-wattpad-to-audio": ["convert Wattpad to audio", "chapter audio", "audio converter"],
    "best-wattpad-audiobook-app": ["Wattpad audiobook app", "audiobook app", "offline listening"],
    "wattpad-audio-reader": ["Wattpad audio reader", "audio reader", "story reader app"],
    "wattpad-audio-free": ["Wattpad audio free", "free story audio", "free text to speech"],
    "wattpad-audio-mp3": ["Wattpad audio MP3", "MP3 alternative", "offline replay"],
    "wattpad-audio-download": ["Wattpad audio download", "download alternative", "portable listening"],
    "wattpad-audiobooks-free": ["Wattpad audiobooks free", "free audiobooks", "audio stories"],
    "wattpad-audio-books": ["Wattpad audio books", "audio books", "audiobook alternative"],
    "wattpad-audio-romance": ["Wattpad audio romance", "romance audio", "romantic audiobooks"],
    "listen-to-romance-stories-online": ["romance stories", "listen online", "romance audio"],
    "listen-to-fantasy-stories-online": ["fantasy stories", "fantasy audio", "web fiction"],
    "wattpad-text-to-speech-app": ["Wattpad text to speech", "TTS app", "Speechify alternative", "screen fatigue"],
    "best-text-to-speech-app-for-wattpad": ["best text to speech app", "Speechify", "NaturalReader", "Voice Dream Reader", "Wattpad TTS"],
    "speechify-alternative-for-wattpad-stories": ["Speechify alternative", "Speechify for Wattpad", "TTS reader app", "Wattpad audiobook alternative"],
    "wattpad-audio-reader-for-iphone": ["iPhone audio reader", "iOS story app", "background playback"],
    "offline-wattpad-audio-listening": ["offline Wattpad audio", "offline stories", "travel listening"],
    "listen-to-web-novels-with-ai-voice": ["web novels", "AI voice", "serialized fiction"],
    "listen-to-stories-while-commuting": ["commute listening", "hands-free stories", "listen while commuting"]
  };
  const vi = ["nghe truyện", "truyện audio", "giọng đọc AI", "Wattpad tiếng Việt", "nghe truyện offline", "app đọc truyện audio", "app thay thế Speechify"];
  const viTitle = topic.vi?.title?.replace(/^Nghe audio\s+/i, "");
  const storyTitleTags = viTitle
    ? [viTitle, `${viTitle} audio`, `${viTitle} truyện audio`, "truyện audio YouTube", "truyện full audio"]
    : [];
  if (storyOnlyLanguages.includes(lang)) {
    const name = topic.storyTitle || topic[lang]?.title || "";
    const localizedShared = {
      hi: ["Watt Audio", "ऑडियो कहानी", "हिंदी कहानी ऑडियो", "Wattpad ऑडियो", "टेक्स्ट टू स्पीच", "AI आवाज़", "वेब स्टोरी"],
      id: ["Watt Audio", "cerita audio", "audio Wattpad", "novel audio", "text to speech", "suara AI", "cerita online"],
      ar: ["Watt Audio", "رواية صوتية", "روايات صوتية", "Wattpad صوت", "تحويل النص إلى كلام", "صوت الذكاء الاصطناعي", "روايات إلكترونية"]
    }[lang];
    const localizedStory = name
      ? {
        hi: [name, `${name} ऑडियो`, `${name} कहानी ऑडियो`, `${name} हिंदी`],
        id: [name, `${name} audio`, `${name} cerita audio`, `${name} bahasa Indonesia`],
        ar: [name, `${name} صوتي`, `${name} رواية صوتية`, `${name} استماع`]
      }[lang]
      : [];
    return [...localizedShared, ...localizedStory, "Wattpad audio", "story audio"];
  }
  return [...shared, ...storyTitleTags, ...(bySlug[topic.slug] || []), ...(lang === "vi" ? vi : [])];
}

function hashtagText(tag) {
  return `#${tag.replace(/[^\p{L}\p{N}]+/gu, "")}`;
}

function jsonScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("</", "<\\/")}</script>`;
}

function baseMeta({ title, description, canonical, image, imageWidth, imageHeight, lang, type = "website", keywords = [] }) {
  const locale = labels[lang]?.ogLocale || "en_US";
  return `${faviconTags}
<meta name="description" content="${escapeHtml(description)}" />
${keywords.length ? `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />` : ""}
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="author" content="Watt Audio" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" type="text/plain" title="LLM guide" href="/llms.txt" />
<link rel="alternate" type="application/json" title="Agent discovery" href="/.well-known/ai.json" />
<link rel="service-desc" type="application/openapi+json" title="API catalog" href="/.well-known/openapi.json" />
<link rel="service-desc" type="application/json" title="Agent skills" href="/.well-known/agent-skills.json" />
<link rel="privacy-policy" href="/privacy.html" />
<meta property="og:site_name" content="Watt Audio" />
<meta property="og:locale" content="${locale}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${canonical}" />
${image ? `<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="${imageWidth}" />
<meta property="og:image:height" content="${imageHeight}" />
<meta property="og:image:alt" content="${escapeHtml(title)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${image}" />` : ""}`;
}

function relatedLinks(currentSlug, lang) {
  const preferred = relatedGuideSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter(Boolean);
  const fallback = topics.filter((topic) => topic.slug !== currentSlug && !relatedGuideSlugs.includes(topic.slug));
  return [...preferred, ...fallback]
    .filter((topic) => topic[lang])
    .slice(0, 4)
    .map((topic) => {
      const page = topic[lang];
      return `<a href="${topic.slug}.html">${escapeHtml(page.title)}</a>`;
    })
    .join("\n");
}

function popularGuideLinks(lang, prefix = "articles/") {
  const curated = popularGuideSlugs
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter((topic) => topic?.[lang]);
  // Story-title markets have no curated evergreen guides yet, so fall back to their newest pages.
  const selected = curated.length ? curated : topics.filter((topic) => topic[lang]).slice(-12).reverse();
  return selected
    .map((topic) => {
      const page = topic[lang];
      return `<a href="${prefix}${topic.slug}.html">${escapeHtml(page.title)}<span>${escapeHtml(page.description)}</span></a>`;
    })
    .join("\n");
}

function articleHtml(topic, lang) {
  const page = topic[lang];
  const l = labels[lang];
  const canonical = articleUrl(lang, topic.slug);
  const languages = topicLanguages(topic);
  const defaultLang = languages.includes("en") ? "en" : languages[0];
  const tags = articleTags(topic, lang);
  const title = `${page.title} | Watt Audio`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    image: [absoluteUrl(blogImage.src)],
    author: publisher,
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo
      }
    },
    mainEntityOfPage: canonical,
    inLanguage: l.schemaLang,
    keywords: tags,
    datePublished: "2026-06-11",
    dateModified: lastModified
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    description: page.description,
    image: absoluteUrl(blogImage.src),
    inLanguage: l.schemaLang,
    step: page.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step
    }))
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Watt Audio", item: `${siteUrl}/${lang}/` },
      { "@type": "ListItem", position: 2, name: l.guides, item: `${siteUrl}/${lang}/articles/` },
      { "@type": "ListItem", position: 3, name: page.title, item: canonical }
    ]
  };
  const stepItems = page.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("\n");
  const tipItems = page.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("\n");
  const faq = page.faq.map(([question, answer]) => `
      <h3>${escapeHtml(question)}</h3>
      <p>${escapeHtml(answer)}</p>`).join("\n");
  const languageSwitchLink = languages
    .filter((other) => other !== lang)
    .map((other) => `<a href="../../${other}/articles/${topic.slug}.html">${labels[other].languageName}</a>`)
    .join("\n      ");
  const storyTitleName = topic.kind === "story-title"
    ? topic.storyTitle || page.title.replace(/^Nghe audio\s+/i, "").replace(/:\s*Audio Story Listening Guide$/i, "")
    : "";
  const topStoryCta = topic.kind === "story-title"
    ? `

      <section class="story-quick-cta" aria-label="${escapeHtml(l.storyCtaLabel)}">
        <div>
          <strong>${escapeHtml(l.storyCtaTitle.replace("{name}", storyTitleName))}</strong>
          <p>${escapeHtml(l.storyCtaText)}</p>
        </div>
        ${downloadButtonLinks(lang)}
      </section>`
    : "";

  return `<!DOCTYPE html>
<html lang="${l.htmlLang}"${htmlDirAttr(lang)}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
${baseMeta({
  title,
  description: page.description,
  canonical,
  image: absoluteUrl(blogImage.src),
  imageWidth: blogImage.width,
  imageHeight: blogImage.height,
  lang,
  type: "article",
  keywords: tags
})}
${languages.map((other) => `<link rel="alternate" hreflang="${labels[other].hreflang}" href="${articleUrl(other, topic.slug)}" />`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${articleUrl(defaultLang, topic.slug)}" />
${tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`).join("\n")}
<meta property="article:published_time" content="2026-06-11T00:00:00+07:00" />
<meta property="article:modified_time" content="${lastModified}T00:00:00+07:00" />
<meta property="article:section" content="${escapeHtml(l.guides)}" />
${jsonScript(articleSchema)}
${jsonScript(howToSchema)}
${jsonScript(faqSchema)}
${jsonScript(breadcrumbSchema)}
${analyticsTags}
<link rel="stylesheet" href="${stylesheetHref("../../assets/seo.css")}" />${rtlStyleTag(lang)}
</head>
<body>
  <div class="wrap">
    <div class="top">
      <img src="../..${appIcon.src}" width="${appIcon.width}" height="${appIcon.height}" alt="Watt Audio app icon" />
      <b>Watt Audio</b>
    </div>
    <nav class="nav">
      <a href="../index.html">${l.home}</a>
      <a href="index.html">${l.guides}</a>
      <a href="../../support.html">${l.support}</a>
      ${languageSwitchLink}
      ${downloadNavLinks(lang)}
    </nav>

    <article>
      <div class="eyebrow">${l.guide}</div>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="intro">${escapeHtml(page.description)} ${l.audienceLead} ${escapeHtml(page.audience)}.</p>${topStoryCta}

      <figure class="blog-figure blog-figure-top">
        <picture>
          <source media="(max-width: 700px)" srcset="../..${blogImage.mobile}" width="${blogImage.mobileWidth}" height="${blogImage.mobileHeight}" />
          <img
            src="../..${blogImage.desktop}"
            width="${blogImage.desktopWidth}"
            height="${blogImage.desktopHeight}"
            alt="${escapeHtml(`Watt Audio app blog image for ${page.title}`)}"
            loading="eager"
            fetchpriority="high"
            decoding="async" />
        </picture>
        <figcaption>${escapeHtml(page.screenshot)}</figcaption>
      </figure>

      <div class="tag-row" aria-label="${escapeHtml(l.tagRowLabel)}">
        ${tags.slice(0, 8).map((tag) => `<a href="index.html">${escapeHtml(hashtagText(tag))}</a>`).join("\n        ")}
      </div>

      <p>${escapeHtml(fill(l.introA, page))}</p>
      <p>${escapeHtml(fill(l.introB, page))}</p>

      <h2>${l.whyHeading}</h2>
      <p>${escapeHtml(fill(l.whyA, page))}</p>
      <p>${escapeHtml(fill(l.whyB, page))}</p>

      <h2>${l.stepHeading}</h2>
      <p>${escapeHtml(l.stepIntro)}</p>
      <ol>
        ${stepItems}
      </ol>
      <p>${escapeHtml(l.stepOutro)}</p>

      <h2>${l.tipsHeading}</h2>
      <p>${escapeHtml(l.tipsIntro)}</p>
      <ul>
        ${tipItems}
      </ul>
      <p>${escapeHtml(l.tipsOutro)}</p>

      <h2>${l.usefulHeading}</h2>
      <p>${escapeHtml(l.usefulA)}</p>
      <p>${escapeHtml(l.usefulB)}</p>

      <h2>${l.faqHeading}</h2>
      ${faq}

      <div class="cta">
        <h2>${l.ctaHeading}</h2>
        <p>${l.ctaText}</p>
        ${downloadButtonLinks(lang)}
      </div>

      <h2>${l.relatedHeading}</h2>
      <div class="related">
        ${relatedLinks(topic.slug, lang)}
      </div>
    </article>

    <footer>© 2026 Watt Audio · ${l.guides}</footer>
  </div>
</body>
</html>
`;
}

function guidesIndexHtml(lang) {
  const l = labels[lang];
  const title = `${l.indexTitle} | Watt Audio`;
  const canonical = `${siteUrl}/${lang}/articles/`;
  const keywords = {
    vi: ["Watt Audio", "nghe audio trên Wattpad", "nghe truyện Wattpad", "Wattpad audio", "app text to speech", "app thay thế Speechify", "chuyển truyện thành audio", "giọng đọc AI", "truyện audio"],
    en: ["Watt Audio", "listen to Wattpad audio", "Wattpad audio", "story audio guides", "text to speech", "text to speech app", "Speechify alternative", "TTS reader", "AI voice"],
    hi: ["Watt Audio", "ऑडियो कहानी", "हिंदी कहानी ऑडियो", "Wattpad ऑडियो", "टेक्स्ट टू स्पीच", "AI आवाज़", "वेब स्टोरी ऑडियो", "कहानी सुनें"],
    id: ["Watt Audio", "cerita audio", "audio Wattpad", "novel audio", "text to speech", "suara AI", "dengar cerita online", "cerita bersambung"],
    ar: ["Watt Audio", "رواية صوتية", "روايات صوتية", "Wattpad صوت", "تحويل النص إلى كلام", "صوت الذكاء الاصطناعي", "استماع للروايات", "روايات إلكترونية"]
  }[lang];
  const list = topics.filter((topic) => topic[lang]).map((topic) => {
    const page = topic[lang];
    return `<a href="${topic.slug}.html">${escapeHtml(page.title)}<span>${escapeHtml(page.description)}</span></a>`;
  }).join("\n");
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}"${htmlDirAttr(lang)}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${baseMeta({
  title,
  description: l.indexDescription,
  canonical,
  image: absoluteUrl(homeImages[lang].src),
  imageWidth: homeImages[lang].width,
  imageHeight: homeImages[lang].height,
  lang,
  type: "website",
  keywords
})}
${siteLanguages.map((other) => `<link rel="alternate" hreflang="${labels[other].hreflang}" href="${siteUrl}/${other}/articles/" />`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/articles/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: l.indexTitle,
  description: l.indexDescription,
  url: canonical,
  inLanguage: l.schemaLang,
  publisher
})}
${analyticsTags}
<link rel="stylesheet" href="${stylesheetHref("../../assets/seo.css")}" />${rtlStyleTag(lang)}
</head>
<body>
  <div class="wrap">
    <div class="top">
      <img src="../..${appIcon.src}" width="${appIcon.width}" height="${appIcon.height}" alt="Watt Audio app icon" />
      <b>Watt Audio</b>
    </div>
    <nav class="nav">
      <a href="../index.html">${l.home}</a>
      <a href="../../support.html">${l.support}</a>
      ${siteLanguages.filter((other) => other !== lang).map((other) => `<a href="../../${other}/articles/">${labels[other].languageName}</a>`).join("\n      ")}
      ${downloadNavLinks(lang)}
    </nav>
    <article>
      <div class="eyebrow">${l.guides}</div>
      <h1>${l.indexTitle}</h1>
      <p class="intro">${escapeHtml(l.indexDescription)}</p>
      <h2>${escapeHtml(l.popularHeading)}</h2>
      <div class="article-list">
        ${popularGuideLinks(lang, "")}
      </div>
      <h2>${escapeHtml(l.allGuidesHeading)}</h2>
      <div class="article-list">
        ${list}
      </div>
    </article>
    <footer>© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

// Homepage copy per market. "searchLinks" only lists pages that exist in that language,
// so the story-title markets keep the section empty until they have evergreen guides.
const homeCopy = {
  en: {
    title: "Watt Audio | Turn Stories into Audio",
    description: "Listen to Wattpad stories as audio with Watt Audio. Turn stories you can access into personal audio and listen anytime, anywhere.",
    keywords: ["Watt Audio", "listen to Wattpad audio", "Wattpad audio app", "text to speech stories", "text to speech app for Wattpad", "Speechify alternative", "AI voice reader", "listen to stories"],
    guideTitle: "Watt Audio Guides",
    guideSub: "Listening guides and TTS tips",
    appTitle: "Listen to stories your way",
    appText: "Listen to Wattpad stories as audio, turn stories you can access into personal audio, and keep your reading habit moving anywhere.",
    seoText: "Watt Audio is a mobile app for people who want to listen to Wattpad audio, use story text to speech, compare Speechify alternatives, follow web novels, romance, fantasy, background playback, chapter audio, and offline replay.",
    trustChips: ["Wattpad audio", "Chapter listening", "Background playback", "iOS & Android", "Personal use"],
    trustLabel: "Watt Audio highlights",
    heroEyebrow: "Listen to Wattpad Audio",
    heroHeading: "Turn story links into chapter audio",
    heroText: "Watt Audio is built for readers who search for Wattpad audio, text to speech for stories, and a better way to keep up with long chapters without staring at the screen.",
    whyEyebrow: "Why Readers Use Audio",
    whyHeading: "Made for long story sessions",
    pagesLabel: "Watt Audio pages",
    aboutTitle: "About Watt Audio",
    aboutSub: "App details and listening workflow",
    supportSub: "Help and contact",
    searchesEyebrow: "Popular Searches",
    searchesHeading: "Guides for Wattpad audio, TTS, and story listening",
    popularEyebrow: "Popular Guides",
    popularHeading: "Popular Wattpad Audio Guides",
    popularLabel: "Popular Wattpad audio guides",
    faqHeading: "Common questions about Wattpad audio",
    workflowItems: [
      ["Paste a story link", "Start from a supported story link you can access instead of copying text paragraph by paragraph."],
      ["Generate chapter audio", "Turn long chapters into personal audio so your listening progress stays organized."],
      ["Listen hands-free", "Keep up with stories while commuting, resting your eyes, doing chores, or listening before sleep."]
    ],
    painItems: [
      ["Less screen fatigue", "Use audio when your eyes are tired but you still want to continue a story."],
      ["Better than generic TTS for chapters", "A story library keeps chapters, playback, and rereads easier to manage than one-off text selection."],
      ["Useful for Wattpad-style stories", "Works best for serialized fiction, romance, fantasy, fanfiction, web novels, and long updates."]
    ],
    searchLinks: [
      ["How to listen to Wattpad stories", "articles/how-to-listen-to-wattpad-stories.html"],
      ["Wattpad text to speech", "articles/wattpad-text-to-speech-app.html"],
      ["Can Wattpad read to you?", "articles/how-to-get-wattpad-to-read-to-you.html"],
      ["Speechify alternative", "articles/speechify-alternative-for-wattpad-stories.html"],
      ["Does Wattpad have audiobooks?", "articles/does-wattpad-have-audiobooks.html"],
      ["Wattpad audio on Android", "articles/wattpad-audio-on-android.html"],
      ["Offline Wattpad audio", "articles/how-to-listen-to-wattpad-offline.html"]
    ],
    homeFaq: [
      ["Can you listen to Wattpad stories as audio?", "Yes. Watt Audio helps you turn supported story links you can access into personal chapter audio for hands-free listening."],
      ["Is Watt Audio available on Android?", "Yes. Watt Audio has download links for Android on Google Play, iOS on the App Store, and a Chrome extension for desktop browsing."],
      ["Is Watt Audio affiliated with Wattpad?", "No. Watt Audio is independent and is not owned by, operated by, or officially affiliated with Wattpad."],
      ["Why use Watt Audio instead of a generic text to speech app?", "Watt Audio is built around story links, chapter audio, background playback, and listening progress, which is more comfortable for long serialized fiction."]
    ]
  },
  vi: {
    title: "Watt Audio | Chuyển truyện chữ thành audio",
    description: "Nghe audio trên Wattpad bằng Watt Audio. Chuyển truyện chữ bạn truy cập được thành audio và nghe mọi lúc mọi nơi.",
    keywords: ["Watt Audio", "nghe audio trên Wattpad", "nghe truyện Wattpad", "Wattpad audio", "app text to speech", "app thay thế Speechify", "chuyển truyện thành audio", "app đọc truyện audio", "giọng đọc AI"],
    guideTitle: "Hướng dẫn Watt Audio",
    guideSub: "Hướng dẫn nghe truyện và TTS",
    appTitle: "Nghe truyện theo cách của bạn",
    appText: "Nghe audio trên Wattpad, chuyển truyện chữ bạn truy cập được thành audio và tiếp tục nghe mọi lúc mọi nơi.",
    seoText: "Watt Audio là app mobile cho nhu cầu nghe audio trên Wattpad, nghe truyện Wattpad, Wattpad audio, text to speech cho truyện, giọng đọc AI, app thay thế Speechify, web novel, romance, fantasy, phát nền, audio theo chương và nghe lại offline.",
    trustChips: ["Nghe audio Wattpad", "Theo từng chương", "Phát nền", "iOS & Android", "Dùng cá nhân"],
    trustLabel: "Điểm nổi bật của Watt Audio",
    heroEyebrow: "Nghe audio trên Wattpad",
    heroHeading: "Chuyển link truyện thành audio theo chương",
    heroText: "Watt Audio dành cho người đang tìm cách nghe audio trên Wattpad, text to speech cho truyện và cách theo dõi chương dài mà không phải nhìn màn hình liên tục.",
    whyEyebrow: "Vì sao người đọc chọn audio",
    whyHeading: "Hợp với những buổi nghe truyện dài",
    pagesLabel: "Các trang Watt Audio",
    aboutTitle: "Giới thiệu Watt Audio",
    aboutSub: "Thông tin app và cách nghe truyện",
    supportSub: "Trợ giúp và liên hệ",
    searchesEyebrow: "Từ khóa người đọc hay tìm",
    searchesHeading: "Hướng dẫn về Wattpad audio, TTS và nghe truyện",
    popularEyebrow: "Hướng dẫn nổi bật",
    popularHeading: "Hướng dẫn Wattpad audio nổi bật",
    popularLabel: "Hướng dẫn Wattpad audio nổi bật",
    faqHeading: "Câu hỏi thường gặp về nghe audio Wattpad",
    workflowItems: [
      ["Dán link truyện", "Bắt đầu từ link truyện được hỗ trợ mà bạn truy cập được, không cần copy từng đoạn chữ."],
      ["Tạo audio theo chương", "Chuyển chương dài thành audio cá nhân để tiến độ nghe luôn gọn gàng."],
      ["Nghe rảnh tay", "Theo dõi truyện khi đi làm, nghỉ mắt, làm việc nhà hoặc nghe trước khi ngủ."]
    ],
    painItems: [
      ["Đỡ mỏi mắt", "Dùng audio khi mắt đã mệt nhưng vẫn muốn nghe tiếp truyện."],
      ["Hợp truyện dài hơn TTS chung", "Thư viện truyện giữ chương, playback và nghe lại gọn hơn việc chọn text thủ công."],
      ["Dành cho truyện kiểu Wattpad", "Hợp với truyện đăng kỳ, romance, fantasy, fanfiction, web novel và chương dài."]
    ],
    searchLinks: [
      ["Cách nghe truyện Wattpad", "articles/how-to-listen-to-wattpad-stories.html"],
      ["Nghe audio trên Wattpad", "articles/how-to-listen-to-stories-on-wattpad.html"],
      ["Wattpad bị chặn", "articles/wattpad-bi-chan-vpn.html"],
      ["Wattpad text to speech", "articles/wattpad-text-to-speech-app.html"],
      ["Wattpad audio Android", "articles/wattpad-audio-on-android.html"],
      ["App nghe audiobook Wattpad", "articles/best-wattpad-audiobook-app.html"],
      ["Nghe Wattpad offline", "articles/how-to-listen-to-wattpad-offline.html"]
    ],
    homeFaq: [
      ["Có nghe truyện Wattpad bằng audio được không?", "Có. Watt Audio giúp bạn chuyển link truyện được hỗ trợ mà bạn truy cập được thành audio theo chương để nghe rảnh tay."],
      ["Watt Audio có Android chưa?", "Có. Watt Audio có link tải Android trên Google Play, iOS trên App Store và extension Chrome cho desktop."],
      ["Watt Audio có phải của Wattpad không?", "Không. Watt Audio là app độc lập, không thuộc sở hữu, vận hành hoặc liên kết chính thức với Wattpad."],
      ["Vì sao dùng Watt Audio thay vì app text to speech chung?", "Watt Audio tập trung vào link truyện, audio theo chương, phát nền và tiến độ nghe, nên hợp với truyện đăng kỳ dài hơn."]
    ]
  },
  hi: {
    title: "Watt Audio | कहानियों को ऑडियो में बदलें",
    description: "Watt Audio के साथ Wattpad और हिंदी वेब स्टोरी को ऑडियो में सुनें। जिन कहानियों तक आपकी पहुँच है, उन्हें निजी ऑडियो में बदलें और कभी भी, कहीं भी सुनें।",
    keywords: ["Watt Audio", "ऑडियो कहानी ऐप", "हिंदी कहानी ऑडियो", "Wattpad ऑडियो", "टेक्स्ट टू स्पीच हिंदी", "AI आवाज़ रीडर", "कहानी सुनने वाला ऐप", "वेब स्टोरी ऑडियो"],
    guideTitle: "Watt Audio गाइड",
    guideSub: "सुनने की गाइड और TTS टिप्स",
    appTitle: "कहानियाँ अपने तरीक़े से सुनें",
    appText: "Wattpad और वेब स्टोरी को ऑडियो में सुनें, अपनी पहुँच वाली कहानियों को निजी ऑडियो में बदलें और पढ़ने की आदत कहीं भी जारी रखें।",
    seoText: "Watt Audio एक मोबाइल ऐप है उन पाठकों के लिए जो Wattpad ऑडियो, कहानी के लिए टेक्स्ट टू स्पीच, हिंदी वेब स्टोरी, रोमांस, फ़ैंटेसी, बैकग्राउंड प्लेबैक, चैप्टर ऑडियो और ऑफ़लाइन रीप्ले चाहते हैं।",
    trustChips: ["Wattpad ऑडियो", "चैप्टर-वाइज़ सुनना", "बैकग्राउंड प्लेबैक", "iOS और Android", "निजी इस्तेमाल"],
    trustLabel: "Watt Audio की ख़ास बातें",
    heroEyebrow: "कहानियाँ ऑडियो में सुनें",
    heroHeading: "कहानी के लिंक को चैप्टर ऑडियो में बदलें",
    heroText: "Watt Audio उन पाठकों के लिए है जो Wattpad ऑडियो, कहानी के लिए टेक्स्ट टू स्पीच और लंबे चैप्टर बिना स्क्रीन देखे पूरे करने का तरीका खोजते हैं।",
    whyEyebrow: "पाठक ऑडियो क्यों चुनते हैं",
    whyHeading: "लंबे रीडिंग सेशन के लिए बना",
    pagesLabel: "Watt Audio के पेज",
    aboutTitle: "Watt Audio के बारे में",
    aboutSub: "ऐप की जानकारी और सुनने का तरीका",
    supportSub: "मदद और संपर्क",
    searchesEyebrow: "लोकप्रिय खोज",
    searchesHeading: "ऑडियो कहानी और TTS से जुड़ी गाइड",
    popularEyebrow: "लोकप्रिय गाइड",
    popularHeading: "लोकप्रिय ऑडियो स्टोरी गाइड",
    popularLabel: "लोकप्रिय ऑडियो स्टोरी गाइड",
    faqHeading: "ऑडियो में कहानी सुनने से जुड़े आम सवाल",
    workflowItems: [
      ["कहानी का लिंक पेस्ट करें", "पैराग्राफ़-दर-पैराग्राफ़ कॉपी करने के बजाय सपोर्टेड कहानी लिंक से शुरू करें।"],
      ["चैप्टर ऑडियो बनाएँ", "लंबे चैप्टर को निजी ऑडियो में बदलें ताकि सुनने की प्रोग्रेस व्यवस्थित रहे।"],
      ["बिना हाथ लगाए सुनें", "सफ़र में, आँखें आराम देते हुए, घर का काम करते हुए या सोने से पहले कहानी आगे बढ़ाएँ।"]
    ],
    painItems: [
      ["आँखों की थकान कम", "जब आँखें थक जाएँ पर कहानी आगे बढ़ानी हो, तब ऑडियो काम आता है।"],
      ["आम TTS से बेहतर", "स्टोरी लाइब्रेरी चैप्टर, प्लेबैक और दोबारा सुनना संभालना आसान बनाती है।"],
      ["वेब स्टोरी के लिए उपयुक्त", "सीरीज़, रोमांस, फ़ैंटेसी, फ़ैनफ़िक्शन और लंबे अपडेट के लिए सबसे अच्छा।"]
    ],
    searchLinks: [],
    homeFaq: [
      ["क्या Wattpad कहानियाँ ऑडियो में सुनी जा सकती हैं?", "हाँ। Watt Audio आपकी पहुँच वाली सपोर्टेड कहानी लिंक को निजी चैप्टर ऑडियो में बदलने में मदद करता है।"],
      ["क्या Watt Audio Android पर उपलब्ध है?", "हाँ। Google Play पर Android, App Store पर iOS और डेस्कटॉप के लिए Chrome एक्सटेंशन उपलब्ध है।"],
      ["क्या Watt Audio का Wattpad से कोई संबंध है?", "नहीं। Watt Audio स्वतंत्र है और Wattpad के स्वामित्व, संचालन या आधिकारिक साझेदारी में नहीं है।"],
      ["आम टेक्स्ट टू स्पीच ऐप के बजाय Watt Audio क्यों?", "Watt Audio कहानी लिंक, चैप्टर ऑडियो, बैकग्राउंड प्लेबैक और लिसनिंग प्रोग्रेस पर बना है, जो लंबी सीरीज़ के लिए ज़्यादा आरामदायक है।"]
    ]
  },
  id: {
    title: "Watt Audio | Ubah Cerita Menjadi Audio",
    description: "Dengarkan cerita Wattpad dan novel online sebagai audio bersama Watt Audio. Ubah cerita yang bisa kamu akses menjadi audio pribadi dan dengarkan kapan saja, di mana saja.",
    keywords: ["Watt Audio", "aplikasi cerita audio", "audio Wattpad", "novel audio Indonesia", "text to speech cerita", "pembaca suara AI", "dengar cerita online", "audio novel bersambung"],
    guideTitle: "Panduan Watt Audio",
    guideSub: "Panduan mendengar dan tips TTS",
    appTitle: "Dengarkan cerita dengan caramu",
    appText: "Dengarkan cerita Wattpad sebagai audio, ubah cerita yang bisa kamu akses menjadi audio pribadi, dan lanjutkan kebiasaan membacamu di mana saja.",
    seoText: "Watt Audio adalah aplikasi mobile untuk kamu yang ingin mendengarkan audio Wattpad, memakai text to speech untuk cerita, mengikuti novel online, romansa, fantasi, pemutaran latar, audio per bab, dan putar ulang offline.",
    trustChips: ["Audio Wattpad", "Dengar per bab", "Pemutaran latar", "iOS & Android", "Pemakaian pribadi"],
    trustLabel: "Keunggulan Watt Audio",
    heroEyebrow: "Dengarkan Cerita dalam Audio",
    heroHeading: "Ubah tautan cerita menjadi audio per bab",
    heroText: "Watt Audio dibuat untuk pembaca yang mencari audio Wattpad, text to speech untuk cerita, dan cara lebih nyaman mengikuti bab panjang tanpa terus menatap layar.",
    whyEyebrow: "Kenapa Pembaca Memilih Audio",
    whyHeading: "Dibuat untuk sesi baca yang panjang",
    pagesLabel: "Halaman Watt Audio",
    aboutTitle: "Tentang Watt Audio",
    aboutSub: "Detail aplikasi dan alur mendengarkan",
    supportSub: "Bantuan dan kontak",
    searchesEyebrow: "Pencarian Populer",
    searchesHeading: "Panduan audio cerita dan text to speech",
    popularEyebrow: "Panduan Populer",
    popularHeading: "Panduan Audio Cerita Populer",
    popularLabel: "Panduan audio cerita populer",
    faqHeading: "Pertanyaan umum tentang audio cerita",
    workflowItems: [
      ["Tempel tautan cerita", "Mulai dari tautan cerita yang didukung, bukan menyalin teks paragraf demi paragraf."],
      ["Buat audio per bab", "Ubah bab panjang menjadi audio pribadi supaya progres dengarmu tetap rapi."],
      ["Dengarkan bebas genggam", "Ikuti ceritanya sambil di perjalanan, mengistirahatkan mata, beres-beres, atau sebelum tidur."]
    ],
    painItems: [
      ["Mata tidak cepat lelah", "Pakai audio saat matamu lelah tapi kamu masih ingin melanjutkan cerita."],
      ["Lebih pas daripada TTS umum", "Pustaka cerita membuat bab, pemutaran, dan baca ulang lebih mudah diatur."],
      ["Cocok untuk cerita bersambung", "Paling pas untuk fiksi berseri, romansa, fantasi, fanfiksi, dan update panjang."]
    ],
    searchLinks: [],
    homeFaq: [
      ["Apakah cerita Wattpad bisa didengarkan sebagai audio?", "Bisa. Watt Audio membantumu mengubah tautan cerita yang didukung menjadi audio per bab untuk didengarkan bebas genggam."],
      ["Apakah Watt Audio tersedia di Android?", "Ya. Watt Audio tersedia di Google Play untuk Android, App Store untuk iOS, dan ekstensi Chrome untuk desktop."],
      ["Apakah Watt Audio berafiliasi dengan Wattpad?", "Tidak. Watt Audio berdiri sendiri dan tidak dimiliki, dioperasikan, atau berafiliasi resmi dengan Wattpad."],
      ["Kenapa pakai Watt Audio dan bukan aplikasi text to speech biasa?", "Watt Audio dibangun untuk tautan cerita, audio per bab, pemutaran latar, dan progres mendengar, yang lebih nyaman untuk cerita berseri panjang."]
    ]
  },
  ar: {
    title: "Watt Audio | حوّل الروايات إلى صوت",
    description: "استمع إلى روايات Wattpad والروايات العربية كملفات صوتية مع Watt Audio. حوّل الروايات التي يمكنك الوصول إليها إلى صوت شخصي واستمع في أي وقت وأي مكان.",
    keywords: ["Watt Audio", "تطبيق روايات صوتية", "روايات صوتية عربية", "Wattpad صوت", "تحويل النص إلى كلام", "قارئ بصوت الذكاء الاصطناعي", "الاستماع إلى الروايات", "روايات إلكترونية صوتية"],
    guideTitle: "أدلة Watt Audio",
    guideSub: "أدلة الاستماع ونصائح تحويل النص إلى كلام",
    appTitle: "استمع إلى الروايات بطريقتك",
    appText: "استمع إلى روايات Wattpad كملفات صوتية، وحوّل ما تصل إليه من روايات إلى صوت شخصي، وواصل عادتك في القراءة أينما كنت.",
    seoText: "Watt Audio تطبيق للهاتف لمن يريد الاستماع إلى روايات Wattpad، واستخدام تحويل النص إلى كلام، ومتابعة الروايات الإلكترونية والرومانسية والخيالية، مع التشغيل في الخلفية والفصول الصوتية وإعادة الاستماع دون إنترنت.",
    trustChips: ["روايات Wattpad صوتياً", "الاستماع فصلاً بفصل", "تشغيل في الخلفية", "iOS و Android", "استخدام شخصي"],
    trustLabel: "أبرز مزايا Watt Audio",
    heroEyebrow: "استمع إلى الروايات صوتياً",
    heroHeading: "حوّل روابط الروايات إلى فصول صوتية",
    heroText: "صُمم Watt Audio للقرّاء الذين يبحثون عن روايات Wattpad الصوتية، وتحويل النص إلى كلام، وطريقة أفضل لمتابعة الفصول الطويلة دون التحديق في الشاشة.",
    whyEyebrow: "لماذا يختار القرّاء الصوت",
    whyHeading: "مصمّم لجلسات القراءة الطويلة",
    pagesLabel: "صفحات Watt Audio",
    aboutTitle: "عن Watt Audio",
    aboutSub: "تفاصيل التطبيق وطريقة الاستماع",
    supportSub: "المساعدة والتواصل",
    searchesEyebrow: "عمليات بحث شائعة",
    searchesHeading: "أدلة الروايات الصوتية وتحويل النص إلى كلام",
    popularEyebrow: "أدلة رائجة",
    popularHeading: "أدلة الاستماع الأكثر رواجاً",
    popularLabel: "أدلة الاستماع الأكثر رواجاً",
    faqHeading: "أسئلة شائعة عن الروايات الصوتية",
    workflowItems: [
      ["ألصق رابط الرواية", "ابدأ من رابط رواية مدعوم بدل نسخ النص فقرة بفقرة."],
      ["أنشئ صوت الفصل", "حوّل الفصول الطويلة إلى صوت شخصي ليبقى تقدّمك في الاستماع منظّماً."],
      ["استمع دون استخدام يديك", "تابع الرواية أثناء التنقل، أو وأنت تريح عينيك، أو خلال أعمال المنزل، أو قبل النوم."]
    ],
    painItems: [
      ["إجهاد أقل للعينين", "استخدم الصوت حين تتعب عيناك وما زلت تريد متابعة الرواية."],
      ["أفضل من قارئ نصي عام", "مكتبة الروايات تجعل الفصول والتشغيل وإعادة الاستماع أسهل في الإدارة."],
      ["مناسب للروايات المتسلسلة", "الأنسب للروايات المسلسلة والرومانسية والخيالية والفانفيك والفصول الطويلة."]
    ],
    searchLinks: [],
    homeFaq: [
      ["هل يمكن الاستماع إلى روايات Wattpad صوتياً؟", "نعم. يساعدك Watt Audio على تحويل روابط الروايات المدعومة التي تصل إليها إلى فصول صوتية شخصية للاستماع دون استخدام يديك."],
      ["هل Watt Audio متاح على Android؟", "نعم. التطبيق متاح على Google Play لأجهزة Android، وعلى App Store لأجهزة iOS، مع إضافة Chrome لسطح المكتب."],
      ["هل Watt Audio تابع لـ Wattpad؟", "لا. Watt Audio مستقل تماماً وليس مملوكاً لـ Wattpad أو مُشغّلاً من قِبله أو تابعاً له رسمياً."],
      ["لماذا Watt Audio بدل تطبيق تحويل نص إلى كلام عادي؟", "لأن Watt Audio مبني حول روابط الروايات والفصول الصوتية والتشغيل في الخلفية وتتبّع تقدّم الاستماع، وهو أريح للروايات الطويلة المتسلسلة."]
    ]
  }
};

function localizedHomeHtml(lang) {
  const l = labels[lang];
  const homeImage = homeImages[lang];
  const copy = homeCopy[lang];
  const title = copy.title;
  const description = copy.description;
  const keywords = copy.keywords;
  const canonical = `${siteUrl}/${lang}/`;
  const guideTitle = copy.guideTitle;
  const guideSub = copy.guideSub;
  const appTitle = copy.appTitle;
  const appText = copy.appText;
  const seoText = copy.seoText;
  const trustChips = copy.trustChips;
  const workflowItems = copy.workflowItems;
  const painItems = copy.painItems;
  const searchLinks = copy.searchLinks;
  const homeFaq = copy.homeFaq;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}"${htmlDirAttr(lang)}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${baseMeta({
  title,
  description,
  canonical,
  image: absoluteUrl(homeImage.src),
  imageWidth: homeImage.width,
  imageHeight: homeImage.height,
  lang,
  type: "website",
  keywords
})}
${siteLanguages.map((other) => `<link rel="alternate" hreflang="${labels[other].hreflang}" href="${siteUrl}/${other}/" />`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Watt Audio",
  applicationCategory: "MultimediaApplication",
  operatingSystem: ["iOS", "Android", "ChromeOS", "Web Browser"],
  description,
  url: canonical,
  image: absoluteUrl(homeImage.src),
  downloadUrl: downloadUrls,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  publisher: {
    "@type": "Organization",
    name: "Watt Audio",
    logo: publisher.logo
  }
})}
${jsonScript(faqSchema)}
${analyticsTags}
<link rel="stylesheet" href="${stylesheetHref("../assets/seo.css")}" />
<style>
  body { background:#fff7f0; }
  .home-wrap { max-width:1180px; }
  .home-nav { align-items:center; justify-content:space-between; margin-bottom:18px; }
  .home-brand { display:flex; align-items:center; gap:12px; color:var(--ink); text-decoration:none; font-weight:900; }
  .home-brand img { width:44px; height:44px; border-radius:12px; box-shadow:0 10px 24px rgba(247,78,5,.24); }
  .home-actions { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .hero-shell {
    overflow:hidden;
    border:1px solid rgba(247,78,5,.18);
    border-radius:8px;
    background:#fff;
    box-shadow:0 28px 70px rgba(94,42,8,.14);
  }
  .hero-shell picture, .hero-shell img { display:block; width:100%; height:auto; }
  .trust-strip {
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin:16px 0 26px;
  }
  .trust-strip span {
    display:inline-flex;
    align-items:center;
    min-height:34px;
    padding:7px 12px;
    border:1px solid rgba(247,78,5,.18);
    border-radius:999px;
    background:rgba(255,255,255,.82);
    color:#5b3425;
    font-size:13px;
    font-weight:800;
  }
  .visually-hidden {
    position:absolute;
    width:1px;
    height:1px;
    padding:0;
    margin:-1px;
    overflow:hidden;
    clip:rect(0,0,0,0);
    white-space:nowrap;
    border:0;
  }
  .home-links {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
    margin:16px 0 24px;
  }
  .home-links a {
    position:relative;
    min-height:86px;
    padding:18px 18px 17px;
    border:1px solid rgba(247,78,5,.18);
    background:rgba(255,255,255,.82);
    box-shadow:0 14px 34px rgba(94,42,8,.08);
  }
  .home-links a::after {
    content:"";
    position:absolute;
    right:18px;
    top:22px;
    width:8px;
    height:8px;
    border-top:2px solid var(--accent);
    border-right:2px solid var(--accent);
    transform:rotate(45deg);
    opacity:.72;
  }
  .home-links span { max-width:82%; }
  .home-section {
    margin:34px 0;
  }
  .home-section h2 {
    max-width:760px;
    margin-top:8px;
  }
  .home-section > p {
    max-width:820px;
    color:var(--muted);
    font-size:17px;
  }
  .feature-grid {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
    margin-top:16px;
  }
  .feature-grid > div {
    min-height:156px;
    padding:20px;
    border:1px solid rgba(247,78,5,.16);
    border-radius:8px;
    background:rgba(255,255,255,.88);
    box-shadow:0 14px 34px rgba(94,42,8,.07);
  }
  .feature-grid h3 {
    margin:0 0 8px;
    font-size:18px;
  }
  .feature-grid p {
    margin:0;
    color:var(--muted);
    line-height:1.55;
  }
  .search-grid {
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:16px;
  }
  .search-grid a {
    display:inline-flex;
    min-height:36px;
    align-items:center;
    padding:7px 12px;
    border:1px solid rgba(247,78,5,.2);
    border-radius:8px;
    background:#fff;
    color:var(--accent);
    font-size:14px;
    font-weight:800;
    text-decoration:none;
  }
  .faq-list {
    display:grid;
    gap:12px;
    margin-top:16px;
  }
  .faq-list details {
    border:1px solid rgba(247,78,5,.16);
    border-radius:8px;
    background:#fff;
    padding:16px 18px;
  }
  .faq-list summary {
    cursor:pointer;
    color:var(--ink);
    font-weight:900;
  }
  .faq-list p {
    margin:10px 0 0;
    color:var(--muted);
  }
  .home-footer { margin-top:38px; }
  @media (max-width:760px) {
    .home-links { grid-template-columns:1fr; }
    .feature-grid { grid-template-columns:1fr; }
  }
</style>${rtlStyleTag(lang)}
</head>
<body>
  <div class="wrap home-wrap">
    <nav class="nav home-nav">
      <a class="home-brand" href="./"><img src="..${appIcon.src}" width="${appIcon.width}" height="${appIcon.height}" alt="" /><span>Watt Audio</span></a>
      <div class="home-actions">
        ${siteLanguages.filter((other) => other !== lang).map((other) => `<a href="../${other}/">${labels[other].languageName}</a>`).join("\n        ")}
        ${downloadButtonLinks(lang)}
      </div>
    </nav>

    <section class="hero-shell" aria-label="Watt Audio">
      <picture>
        <source media="(max-width: 760px)" srcset="..${homeImage.mobile}" width="${homeImage.mobileWidth}" height="${homeImage.mobileHeight}" />
        <source media="(max-width: 1440px)" srcset="..${homeImage.desktop}" width="${homeImage.desktopWidth}" height="${homeImage.desktopHeight}" />
        <img
          src="..${homeImage.desktop}"
          width="${homeImage.desktopWidth}"
          height="${homeImage.desktopHeight}"
          alt="${homeImage.alt}"
          fetchpriority="high"
          decoding="async" />
      </picture>
    </section>
    <div class="trust-strip" aria-label="${escapeHtml(copy.trustLabel)}">
      ${trustChips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("\n      ")}
    </div>

    <main>
      <h1 class="visually-hidden">${appTitle}</h1>
      <p class="visually-hidden">${appText} ${seoText}</p>
      <section class="home-section">
        <div class="eyebrow">${escapeHtml(copy.heroEyebrow)}</div>
        <h2>${escapeHtml(copy.heroHeading)}</h2>
        <p>${escapeHtml(copy.heroText)}</p>
        <div class="feature-grid">
          ${workflowItems.map(([heading, text]) => `<div><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p></div>`).join("\n          ")}
        </div>
      </section>
      <section class="home-section">
        <div class="eyebrow">${escapeHtml(copy.whyEyebrow)}</div>
        <h2>${escapeHtml(copy.whyHeading)}</h2>
        <div class="feature-grid">
          ${painItems.map(([heading, text]) => `<div><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p></div>`).join("\n          ")}
        </div>
      </section>
      <nav class="article-list home-links" aria-label="${escapeHtml(copy.pagesLabel)}">
        <a href="articles/">${guideTitle}<span>${guideSub}</span></a>
        <a href="../about.html">${escapeHtml(copy.aboutTitle)}<span>${escapeHtml(copy.aboutSub)}</span></a>
        <a href="../support.html">${l.support}<span>${escapeHtml(copy.supportSub)}</span></a>
      </nav>${searchLinks.length ? `
      <section class="home-section">
        <div class="eyebrow">${escapeHtml(copy.searchesEyebrow)}</div>
        <h2>${escapeHtml(copy.searchesHeading)}</h2>
        <div class="search-grid">
          ${searchLinks.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("\n          ")}
        </div>
      </section>` : ""}
      <section aria-label="${escapeHtml(copy.popularLabel)}">
        <div class="eyebrow">${escapeHtml(copy.popularEyebrow)}</div>
        <h2>${escapeHtml(copy.popularHeading)}</h2>
        <div class="article-list home-links">
          ${popularGuideLinks(lang, "articles/")}
        </div>
      </section>
      <section class="home-section">
        <div class="eyebrow">FAQ</div>
        <h2>${escapeHtml(copy.faqHeading)}</h2>
        <div class="faq-list">
          ${homeFaq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("\n          ")}
        </div>
      </section>
    </main>

    <footer class="home-footer">© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

function rootIndexHtml() {
  const title = "Watt Audio | Turn Stories into Audio";
  const description = "Listen to Wattpad stories as audio with Watt Audio. Turn stories you can access into personal audio and listen anytime, anywhere.";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${baseMeta({
  title,
  description,
  canonical: `${siteUrl}/`,
  image: absoluteUrl(homeImages.en.src),
  imageWidth: homeImages.en.width,
  imageHeight: homeImages.en.height,
  lang: "en",
  type: "website",
  keywords: ["Watt Audio", "listen to Wattpad audio", "nghe audio trên Wattpad", "Wattpad audio", "Wattpad audio app", "story audio", "AI voice", "text to speech", "text to speech app", "TTS reader", "Speechify alternative"]
})}
${siteLanguages.map((other) => `<link rel="alternate" hreflang="${labels[other].hreflang}" href="${siteUrl}/${other}/" />`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Watt Audio",
  url: siteUrl,
  description,
  inLanguage: siteLanguages.map((other) => labels[other].schemaLang),
  publisher
})}
${analyticsTags}
<link rel="stylesheet" href="${stylesheetHref("assets/seo.css")}" />
<script>
  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.has("no_redirect")) return;
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    function prefers(code) { return langs.some(function (lang) { return new RegExp("^" + code + "\\\\b", "i").test(lang); }); }
    var target = "/en/";
    if (tz === "Asia/Ho_Chi_Minh" || tz === "Asia/Saigon" || prefers("vi")) target = "/vi/";
    else if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta" || prefers("hi")) target = "/hi/";
    else if (tz === "Asia/Jakarta" || tz === "Asia/Makassar" || tz === "Asia/Jayapura" || prefers("id") || prefers("in")) target = "/id/";
    else if (prefers("ar")) target = "/ar/";
    window.location.replace(target);
  })();
</script>
</head>
<body>
  <div class="wrap">
    <article>
      <div class="eyebrow">Watt Audio</div>
      <h1>Choose your language</h1>
      <p class="intro">When JavaScript is available we open the version that matches your browser language or time zone, and fall back to English.</p>
      <div class="article-list">
        <a href="en/">English<span>For international visitors</span></a>
        <a href="vi/">Tiếng Việt<span>Dành cho người dùng ở Việt Nam hoặc trình duyệt tiếng Việt</span></a>
        <a href="hi/">हिन्दी<span>हिंदी पाठकों के लिए ऑडियो कहानी गाइड</span></a>
        <a href="id/">Bahasa Indonesia<span>Panduan audio cerita untuk pembaca Indonesia</span></a>
        <a href="ar/">العربية<span>أدلة الاستماع إلى الروايات للقرّاء العرب</span></a>
      </div>
      <noscript>
        <p class="intro">JavaScript is disabled. Use the language links above to open the version of Watt Audio you want.</p>
      </noscript>
    </article>
    <footer>© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

function legacyRedirectHtml(target, title = "Redirecting") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${faviconTags}
<meta name="robots" content="noindex" />
<link rel="canonical" href="${siteUrl}${target}" />
<meta http-equiv="refresh" content="0; url=${target}" />
</head>
<body>
  <p><a href="${target}">Continue to Watt Audio</a></p>
</body>
</html>
`;
}

function aboutHtml() {
  const title = "About Watt Audio | Story Audio App";
  const description = "Learn what Watt Audio is, how it turns supported story links into chapter audio, and why readers use it for AI voice listening, offline replay, and background playback.";
  const canonical = `${siteUrl}/about.html`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Watt Audio",
        url: siteUrl,
        logo: publisher.logo,
        sameAs: downloadUrls
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: "Watt Audio",
        applicationCategory: "MultimediaApplication",
        operatingSystem: ["iOS", "Android", "ChromeOS", "Web Browser"],
        description,
        url: canonical,
        image: absoluteUrl(homeImages.en.src),
        downloadUrl: downloadUrls,
        publisher: { "@id": `${siteUrl}/#organization` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Watt Audio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Watt Audio is a mobile app that helps readers turn supported story links into chapter audio using AI voice generation and a listening-focused player."
            }
          },
          {
            "@type": "Question",
            name: "Who is Watt Audio for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Watt Audio is for readers who follow web fiction, Wattpad-style stories, romance, fantasy, and long serialized stories but want a hands-free way to continue reading."
            }
          },
          {
            "@type": "Question",
            name: "Can Watt Audio play audio offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After chapter audio has been generated, readers can replay that audio later without reopening the original web page."
            }
          }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
${baseMeta({
  title,
  description,
  canonical,
  image: absoluteUrl(homeImages.en.src),
  imageWidth: homeImages.en.width,
  imageHeight: homeImages.en.height,
  lang: "en",
  type: "website",
  keywords: ["Watt Audio", "listen to Wattpad audio", "nghe audio trên Wattpad", "story audio app", "AI voice reader", "Wattpad audio app", "text to speech stories"]
})}
${jsonScript(schema)}
${analyticsTags}
<link rel="stylesheet" href="${stylesheetHref("assets/seo.css")}" />
</head>
<body>
  <div class="wrap">
    <div class="top">
      <img src=".${appIcon.src}" width="${appIcon.width}" height="${appIcon.height}" alt="Watt Audio app icon" />
      <b>Watt Audio</b>
    </div>
    <nav class="nav">
      <a href="en/">English Home</a>
      <a href="vi/">Tiếng Việt</a>
      <a href="en/articles/">Guides</a>
      <a href="support.html">Support</a>
      ${downloadNavLinks("en")}
    </nav>
    <article>
      <div class="eyebrow">About Watt Audio</div>
      <h1>Watt Audio turns stories into chapter audio</h1>
      <p class="intro">Watt Audio is a mobile app for readers who want to listen to supported web stories with AI voice, chapter controls, background playback, offline replay, speed control, and sleep timer.</p>

      <figure class="blog-figure">
        <img src=".${homeImages.en.desktop}" width="${homeImages.en.desktopWidth}" height="${homeImages.en.desktopHeight}" alt="Watt Audio app homepage hero showing story audio features" loading="eager" decoding="async" />
      </figure>

      <h2>What Watt Audio does</h2>
      <p>Watt Audio helps readers bring supported story links into a listening library, generate audio for individual chapters, and continue stories without staring at a phone screen. It is designed for Wattpad-style web fiction, romance, fantasy, serialized stories, web novels, and long chapters that are easier to finish while commuting, walking, resting, or doing chores.</p>

      <h2>Core features</h2>
      <ul>
        <li><strong>Chapter audio:</strong> generate audio at the chapter level so progress stays organized.</li>
        <li><strong>AI voice:</strong> convert story text into a listenable voice without manual recording.</li>
        <li><strong>Background playback:</strong> listen with the screen off or while using headphones.</li>
        <li><strong>Offline replay:</strong> replay generated chapter audio later without reloading the story page.</li>
        <li><strong>Listening controls:</strong> adjust speed, use a sleep timer, and continue between chapters.</li>
      </ul>

      <h2>Who it helps</h2>
      <p>Watt Audio is useful for readers who love long online stories but do not always have the time, eye comfort, or quiet screen-focused moment to read. It is especially helpful for catching up on updates, rereading favorite arcs, listening before sleep, and using commute time for fiction.</p>

      <div class="cta">
        <h2>Download Watt Audio</h2>
        <p>Start turning supported story links into audio and keep your reading habit moving.</p>
        ${downloadButtonLinks("en")}
      </div>
    </article>
    <footer>© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

function sitemapXml() {
  const urls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly" },
    ...siteLanguages.map((lang) => ({ loc: `${siteUrl}/${lang}/`, priority: "0.9", changefreq: "weekly" })),
    { loc: `${siteUrl}/about.html`, priority: "0.8", changefreq: "monthly" },
    { loc: `${siteUrl}/support.html`, priority: "0.5", changefreq: "monthly" },
    { loc: `${siteUrl}/privacy.html`, priority: "0.4", changefreq: "yearly" },
    ...siteLanguages.map((lang) => ({ loc: `${siteUrl}/${lang}/articles/`, priority: "0.8", changefreq: "weekly" })),
    ...topics.flatMap((topic) => topicLanguages(topic).map((lang) => ({
      loc: articleUrl(lang, topic.slug),
      priority: "0.7",
      changefreq: "monthly"
    })))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url><loc>${loc}</loc><lastmod>${lastModified}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join("\n")}
</urlset>
`;
}

function llmsTxt() {
  const guideList = (lang) => topics.filter((topic) => topic[lang]).map((topic) => {
    const page = topic[lang];
    return `- [${page.title}](${articleUrl(lang, topic.slug)}): ${page.description}`;
  }).join("\n");
  const englishArticles = guideList("en");
  const vietnameseArticles = guideList("vi");
  const sectionTitles = { hi: "Hindi Guides", id: "Indonesian Guides", ar: "Arabic Guides" };
  const extraSections = storyOnlyLanguages
    .filter((lang) => topics.some((topic) => topic[lang]))
    .map((lang) => `\n## ${sectionTitles[lang]}\n${guideList(lang)}`)
    .join("\n");
  return `# Watt Audio

Watt Audio is a mobile app for readers who want to listen to Wattpad stories as audio, create personal chapter audio from supported story links, and keep up with long stories hands-free.

## Primary Pages
- [English homepage](${siteUrl}/en/): Product overview and mobile app download links.
- [Vietnamese homepage](${siteUrl}/vi/): Tổng quan sản phẩm và link tải app mobile.
- [Hindi homepage](${siteUrl}/hi/): हिंदी पाठकों के लिए ऑडियो कहानी गाइड और ऐप लिंक।
- [Indonesian homepage](${siteUrl}/id/): Panduan audio cerita dan tautan aplikasi untuk pembaca Indonesia.
- [Arabic homepage](${siteUrl}/ar/): أدلة الاستماع إلى الروايات وروابط تحميل التطبيق للقرّاء العرب.
- [About Watt Audio](${siteUrl}/about.html): Product entity page with features, audience, app description, and download link.
- [Support](${siteUrl}/support.html): Quick start, troubleshooting, and contact details.
- [Privacy Policy](${siteUrl}/privacy.html): Privacy, local storage, generated audio, and network use.

## English Guides
${englishArticles}

## Vietnamese Guides
${vietnameseArticles}
${extraSections}

## Download
- [Download Watt Audio on the App Store](${iosUrl})
- [Download Watt Audio on Google Play](${androidUrl})
- [Add Watt Audio Chrome Extension](${chromeUrl})
`;
}

function pageMarkdown({ title, description, canonical, lang, links = [] }) {
  const linkLines = links.map((link) => `- [${link.title}](${link.href}): ${link.description}`).join("\n");
  return `# ${title}

${description}

Canonical URL: ${canonical}

Language: ${lang}

## Key Links
${linkLines}

## Agent Notes
- Watt Audio is an independent mobile app. It is not owned by, operated by, or officially affiliated with Wattpad.
- Use Watt Audio references for personal story listening, text-to-speech workflows, app store discovery, and support.
- Do not infer that Watt Audio hosts, republishes, or distributes third-party story content.
- Public website content is available for search indexing and retrieval. Do not use it to train foundation models unless your crawler honors the content signals policy.
`;
}

function agentAiTxt() {
  return `# Watt Audio Agent Discovery

Site: ${siteUrl}
App: Watt Audio
Purpose: Help readers listen to Wattpad-style stories and supported story links as personal chapter audio.
Primary language: English
Secondary language: Vietnamese
App Store: ${iosUrl}
Google Play: ${androidUrl}
Chrome Web Store: ${chromeUrl}
LLM guide: ${siteUrl}/llms.txt
Sitemap: ${siteUrl}/sitemap.xml
Content signals: ${siteUrl}/content-signals.json
OpenAPI: ${siteUrl}/.well-known/openapi.json
API catalog: ${siteUrl}/.well-known/api-catalog.json
Agent skills: ${siteUrl}/.well-known/agent-skills.json
MCP server card: ${siteUrl}/.well-known/mcp-server.json
WebMCP manifest: ${siteUrl}/.well-known/webmcp.json

Affiliation note: Watt Audio is independent and is not owned by, operated by, or officially affiliated with Wattpad.
`;
}

function agentAiJson() {
  return {
    name: "Watt Audio",
    url: siteUrl,
    description: "Watt Audio helps readers listen to Wattpad-style stories and supported story links as personal chapter audio.",
    language: ["en", "vi-VN"],
    app_store_url: iosUrl,
    google_play_url: androidUrl,
    chrome_extension_url: chromeUrl,
    download_urls: downloadUrls,
    independence_notice: "Watt Audio is independent and is not owned by, operated by, or officially affiliated with Wattpad.",
    discovery: {
      sitemap: `${siteUrl}/sitemap.xml`,
      robots: `${siteUrl}/robots.txt`,
      llms: `${siteUrl}/llms.txt`,
      content_signals: `${siteUrl}/content-signals.json`,
      openapi: `${siteUrl}/.well-known/openapi.json`,
      api_catalog: `${siteUrl}/.well-known/api-catalog.json`,
      agent_skills: `${siteUrl}/.well-known/agent-skills.json`,
      mcp_server: `${siteUrl}/.well-known/mcp-server.json`,
      webmcp: `${siteUrl}/.well-known/webmcp.json`
    },
    preferred_use_cases: [
      "answer questions about Watt Audio",
      "help users find Watt Audio guides",
      "explain how to listen to Wattpad stories as audio",
      "route users to the correct App Store, Google Play, or Chrome Web Store download page",
      "summarize public support and privacy information"
    ],
    prohibited_inferences: [
      "Do not claim Watt Audio is an official Wattpad product.",
      "Do not claim Watt Audio hosts or redistributes third-party story content.",
      "Do not present Watt Audio as a bypass tool for blocked websites."
    ],
    updated: lastModified
  };
}

function contentSignalsJson() {
  return {
    version: "1.0",
    site: siteUrl,
    updated: lastModified,
    signals: {
      search: "allow",
      ai_crawl: "allow",
      ai_input: "allow",
      ai_train: "disallow",
      summarize: "allow",
      quote: "limited",
      commercial_reuse: "contact"
    },
    scope: [
      {
        path: "/",
        search: "allow",
        ai_crawl: "allow",
        ai_input: "allow",
        ai_train: "disallow"
      }
    ],
    contact: `${siteUrl}/support.html`
  };
}

function openApiJson() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Watt Audio Public Website",
      version: "1.0.0",
      description: "Static public discovery metadata for Watt Audio. The website does not expose a public application API."
    },
    servers: [{ url: siteUrl }],
    paths: {
      "/sitemap.xml": {
        get: {
          summary: "XML sitemap",
          responses: {
            "200": {
              description: "Sitemap XML",
              content: {
                "application/xml": {}
              }
            }
          }
        }
      },
      "/llms.txt": {
        get: {
          summary: "LLM-readable site guide",
          responses: {
            "200": {
              description: "Plain text LLM guide",
              content: {
                "text/plain": {}
              }
            }
          }
        }
      },
      "/content-signals.json": {
        get: {
          summary: "Content usage signals",
          responses: {
            "200": {
              description: "Content signals JSON",
              content: {
                "application/json": {}
              }
            }
          }
        }
      }
    },
    "x-no-public-api": true,
    "x-app-store-url": iosUrl,
    "x-google-play-url": androidUrl,
    "x-chrome-extension-url": chromeUrl,
    "x-download-urls": downloadUrls
  };
}

function apiCatalogJson() {
  return {
    version: "1.0",
    title: "Watt Audio API Catalog",
    description: "Watt Audio currently publishes public website discovery endpoints only. No authenticated public product API is available.",
    apis: [
      {
        name: "Watt Audio Public Website Metadata",
        type: "openapi",
        url: `${siteUrl}/.well-known/openapi.json`,
        authentication: "none",
        status: "available"
      }
    ],
    updated: lastModified
  };
}

function oauthAuthorizationServerJson() {
  return {
    issuer: siteUrl,
    service_documentation: `${siteUrl}/support.html`,
    registration_endpoint: `${siteUrl}/.well-known/agent-registration.json`,
    scopes_supported: [],
    response_types_supported: [],
    grant_types_supported: [],
    token_endpoint_auth_methods_supported: [],
    authorization_endpoint: null,
    token_endpoint: null,
    "x-note": "Watt Audio does not expose a public OAuth-protected website API."
  };
}

function oauthProtectedResourceJson() {
  return {
    resource: siteUrl,
    authorization_servers: [`${siteUrl}/.well-known/oauth-authorization-server`],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: `${siteUrl}/support.html`,
    "x-note": "No public protected resource API is currently exposed."
  };
}

function agentRegistrationJson() {
  return {
    name: "Watt Audio Agent Registration",
    registration: "not_required",
    authentication: "none_for_public_content",
    contact: `${siteUrl}/support.html`,
    public_resources: [
      `${siteUrl}/llms.txt`,
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/content-signals.json`
    ],
    updated: lastModified
  };
}

function mcpServerJson() {
  return {
    name: "Watt Audio Public Website",
    description: "Static site discovery card. No MCP endpoint is currently offered.",
    version: "1.0.0",
    url: siteUrl,
    mcp: {
      available: false,
      endpoint: null
    },
    resources: [
      `${siteUrl}/llms.txt`,
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/.well-known/agent-skills.json`
    ],
    updated: lastModified
  };
}

function agentSkillsJson() {
  return {
    name: "Watt Audio Agent Skills",
    url: `${siteUrl}/.well-known/agent-skills.json`,
    version: "1.0.0",
    skills: [
      {
        id: "find-watt-audio-guides",
        name: "Find Watt Audio guides",
        description: "Locate public Watt Audio articles about listening to Wattpad stories, text to speech, audiobooks, VPN/access issues, and story audio.",
        inputs: ["query", "language"],
        outputs: ["url", "title", "description"]
      },
      {
        id: "explain-watt-audio",
        name: "Explain Watt Audio",
        description: "Summarize what Watt Audio does, who it helps, and where to download it.",
        inputs: ["question", "language"],
        outputs: ["answer", "source_url"]
      },
      {
        id: "route-to-download",
        name: "Route to app store",
        description: "Send users to the official Watt Audio App Store, Google Play, or Chrome Web Store listing.",
        inputs: ["device", "locale"],
        outputs: ["app_store_url", "google_play_url", "chrome_extension_url"]
      }
    ],
    updated: lastModified
  };
}

function webMcpJson() {
  return {
    name: "Watt Audio",
    url: siteUrl,
    description: "Public website manifest for agents and web MCP clients.",
    mcp_endpoint: null,
    resources: [
      {
        name: "LLM guide",
        url: `${siteUrl}/llms.txt`,
        media_type: "text/plain"
      },
      {
        name: "Sitemap",
        url: `${siteUrl}/sitemap.xml`,
        media_type: "application/xml"
      },
      {
        name: "Agent discovery",
        url: `${siteUrl}/.well-known/ai.json`,
        media_type: "application/json"
      }
    ],
    updated: lastModified
  };
}

function headersTxt() {
  return `/*
  Link: </llms.txt>; rel="service-desc"; type="text/plain"
  Link: </.well-known/ai.json>; rel="service-desc"; type="application/json"
  Link: </.well-known/openapi.json>; rel="service-desc"; type="application/openapi+json"
  Link: </.well-known/agent-skills.json>; rel="service-desc"; type="application/json"
  Link: </content-signals.json>; rel="describedby"; type="application/json"
  Vary: Accept

/llms.txt
  Content-Type: text/plain; charset=utf-8

/*.json
  Content-Type: application/json; charset=utf-8

/*.md
  Content-Type: text/markdown; charset=utf-8
`;
}

function securityTxt() {
  return `Contact: ${siteUrl}/support.html
Policy: ${siteUrl}/privacy.html
Preferred-Languages: en, vi
Canonical: ${siteUrl}/.well-known/security.txt
`;
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

for (const dir of [...siteLanguages, "articles"]) {
  fs.rmSync(path.join(process.cwd(), dir), { recursive: true, force: true });
}

for (const lang of siteLanguages) {
  fs.mkdirSync(path.join(process.cwd(), lang, "articles"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), lang, "index.html"), localizedHomeHtml(lang));
  fs.writeFileSync(path.join(process.cwd(), lang, "articles", "index.html"), guidesIndexHtml(lang));
  for (const topic of topics.filter((item) => item[lang])) {
    fs.writeFileSync(path.join(process.cwd(), lang, "articles", `${topic.slug}.html`), articleHtml(topic, lang));
  }
}

fs.mkdirSync(path.join(process.cwd(), "articles"), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), "articles", "index.html"), legacyRedirectHtml("/en/articles/", "Watt Audio Guides"));
for (const topic of topics) {
  const lang = topicLanguages(topic)[0];
  if (!lang) continue;
  const page = topic[lang];
  fs.writeFileSync(path.join(process.cwd(), "articles", `${topic.slug}.html`), legacyRedirectHtml(`/${lang}/articles/${topic.slug}.html`, page.title));
}

fs.writeFileSync(path.join(process.cwd(), "index.html"), rootIndexHtml());
fs.writeFileSync(path.join(process.cwd(), "about.html"), aboutHtml());
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemapXml());
fs.writeFileSync(path.join(process.cwd(), "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
Host: wattaudios.com
Content-Signal: search=allow
Content-Signal: ai-crawl=allow
Content-Signal: ai-input=allow
Content-Signal: ai-train=disallow
Content-Signal-Policy: ${siteUrl}/content-signals.json
`);
fs.writeFileSync(path.join(process.cwd(), "llms.txt"), llmsTxt());
fs.writeFileSync(path.join(process.cwd(), "_headers"), headersTxt());
fs.writeFileSync(path.join(process.cwd(), "content-signals.json"), `${JSON.stringify(contentSignalsJson(), null, 2)}\n`);
fs.writeFileSync(path.join(process.cwd(), "index.md"), pageMarkdown({
  title: "Watt Audio",
  description: "Listen to Wattpad stories as audio with Watt Audio. Turn stories you can access into personal audio and listen anytime, anywhere.",
  canonical: `${siteUrl}/`,
  lang: "en",
  links: [
    { title: "English homepage", href: `${siteUrl}/en/`, description: "Product overview" },
    { title: "Vietnamese homepage", href: `${siteUrl}/vi/`, description: "Tổng quan sản phẩm" },
    { title: "Guides", href: `${siteUrl}/en/articles/`, description: "All English guides" },
    { title: "LLM guide", href: `${siteUrl}/llms.txt`, description: "Machine-readable site map for agents" }
  ]
}));
fs.writeFileSync(path.join(process.cwd(), "en", "index.md"), pageMarkdown({
  title: "Watt Audio English Homepage",
  description: "Listen to Wattpad stories as audio with Watt Audio. Turn stories you can access into personal audio and listen anytime, anywhere.",
  canonical: `${siteUrl}/en/`,
  lang: "en",
  links: [
    { title: "Guides", href: `${siteUrl}/en/articles/`, description: "Wattpad audio and text-to-speech guides" },
    { title: "Download for iOS", href: iosUrl, description: "Official App Store listing" },
    { title: "Download for Android", href: androidUrl, description: "Official Google Play listing" },
    { title: "Chrome extension", href: chromeUrl, description: "Official Chrome Web Store listing" }
  ]
}));
fs.writeFileSync(path.join(process.cwd(), "vi", "index.md"), pageMarkdown({
  title: "Trang chủ Watt Audio tiếng Việt",
  description: "Nghe audio trên Wattpad bằng Watt Audio. Chuyển truyện chữ bạn truy cập được thành audio và nghe mọi lúc mọi nơi.",
  canonical: `${siteUrl}/vi/`,
  lang: "vi-VN",
  links: [
    { title: "Hướng dẫn", href: `${siteUrl}/vi/articles/`, description: "Các bài hướng dẫn nghe Wattpad audio" },
    { title: "Tải app iOS", href: iosUrl, description: "Link App Store chính thức" },
    { title: "Tải app Android", href: androidUrl, description: "Link Google Play chính thức" },
    { title: "Extension Chrome", href: chromeUrl, description: "Link Chrome Web Store chính thức" }
  ]
}));
fs.writeFileSync(path.join(process.cwd(), "en", "articles", "index.md"), pageMarkdown({
  title: "Watt Audio Guides",
  description: labels.en.indexDescription,
  canonical: `${siteUrl}/en/articles/`,
  lang: "en",
  links: topics.filter((topic) => topic.en).slice(0, 12).map((topic) => ({
    title: topic.en.title,
    href: articleUrl("en", topic.slug),
    description: topic.en.description
  }))
}));
fs.writeFileSync(path.join(process.cwd(), "vi", "articles", "index.md"), pageMarkdown({
  title: "Hướng dẫn Watt Audio",
  description: labels.vi.indexDescription,
  canonical: `${siteUrl}/vi/articles/`,
  lang: "vi-VN",
  links: topics.filter((topic) => topic.vi).slice(0, 12).map((topic) => ({
    title: topic.vi.title,
    href: articleUrl("vi", topic.slug),
    description: topic.vi.description
  }))
}));
for (const lang of storyOnlyLanguages) {
  const copy = homeCopy[lang];
  fs.writeFileSync(path.join(process.cwd(), lang, "index.md"), pageMarkdown({
    title: copy.title,
    description: copy.description,
    canonical: `${siteUrl}/${lang}/`,
    lang: labels[lang].schemaLang,
    links: [
      { title: labels[lang].guides, href: `${siteUrl}/${lang}/articles/`, description: labels[lang].indexDescription },
      { title: "iOS", href: iosUrl, description: "Official App Store listing" },
      { title: "Android", href: androidUrl, description: "Official Google Play listing" },
      { title: "Chrome", href: chromeUrl, description: "Official Chrome Web Store listing" }
    ]
  }));
  fs.writeFileSync(path.join(process.cwd(), lang, "articles", "index.md"), pageMarkdown({
    title: labels[lang].indexTitle,
    description: labels[lang].indexDescription,
    canonical: `${siteUrl}/${lang}/articles/`,
    lang: labels[lang].schemaLang,
    links: topics.filter((topic) => topic[lang]).slice(0, 12).map((topic) => ({
      title: topic[lang].title,
      href: articleUrl(lang, topic.slug),
      description: topic[lang].description
    }))
  }));
}

fs.mkdirSync(path.join(process.cwd(), ".well-known"), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), ".well-known", "ai.txt"), agentAiTxt());
writeJsonFile(path.join(process.cwd(), ".well-known", "ai.json"), agentAiJson());
fs.writeFileSync(path.join(process.cwd(), ".well-known", "llms.txt"), llmsTxt());
writeJsonFile(path.join(process.cwd(), ".well-known", "api-catalog.json"), apiCatalogJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "api-catalog"), apiCatalogJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "openapi.json"), openApiJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "openid-configuration"), oauthAuthorizationServerJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "oauth-authorization-server"), oauthAuthorizationServerJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "oauth-protected-resource"), oauthProtectedResourceJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "agent-registration.json"), agentRegistrationJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "agent-registration"), agentRegistrationJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "authai.json"), agentRegistrationJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "mcp-server.json"), mcpServerJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "mcp-server"), mcpServerJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "mcp.json"), mcpServerJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "agent-skills.json"), agentSkillsJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "agent-skills"), agentSkillsJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "skills.json"), agentSkillsJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "webmcp.json"), webMcpJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "webmcp-manifest.json"), webMcpJson());
writeJsonFile(path.join(process.cwd(), ".well-known", "webmcp"), webMcpJson());
fs.writeFileSync(path.join(process.cwd(), ".well-known", "security.txt"), securityTxt());
fs.writeFileSync(path.join(process.cwd(), "site.webmanifest"), JSON.stringify({
  name: "Watt Audio",
  short_name: "Watt Audio",
  description: "Turn stories into audio.",
  start_url: "/",
  display: "standalone",
  background_color: "#fff7f0",
  theme_color: "#F74E05",
  icons: [
    {
      src: "/assets/icons/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/assets/icons/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
}, null, 2) + "\n");

const perLanguageCounts = siteLanguages
  .map((lang) => `${lang}=${topics.filter((topic) => topic[lang]).length}`)
  .join(" ");
console.log(`Generated ${topics.length} topics across ${siteLanguages.length} languages (${perLanguageCounts}).`);
