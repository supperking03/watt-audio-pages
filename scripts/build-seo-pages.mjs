import fs from "node:fs";
import path from "node:path";

const appUrl = "https://apps.apple.com/vn/app/watt-audio-%C4%91%E1%BB%8Dc-truy%E1%BB%87n-audio/id6775724279";
const siteUrl = "https://wattaudios.com";
const lastModified = "2026-06-12";
const publisher = {
  "@type": "Organization",
  name: "Watt Audio",
  url: siteUrl,
  logo: `${siteUrl}/assets/icons/icon-512.png`,
  sameAs: [appUrl]
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
const faviconTags = `<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#F74E05" />`;

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

const topics = [
  {
    slug: "how-to-listen-to-wattpad-stories",
    en: {
      title: "How to Listen to Wattpad Stories",
      description: "A practical guide to listening to Wattpad stories with text to speech, offline playback, chapter controls, and Watt Audio.",
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
        ["Có nghe khi tắt màn hình được không?", "Có. Sau khi audio của chương đã được tạo, bạn có thể nghe khi khóa màn hình, giống một trải nghiệm audiobook tiện hơn việc đọc web trực tiếp."],
        ["Watt Audio có thay thế Wattpad không?", "Không. Watt Audio là công cụ nghe bổ trợ cho những truyện bạn đã truy cập và muốn nghe theo cách linh hoạt hơn."],
        ["Truyện dài có phù hợp không?", "Rất phù hợp, vì bạn có thể đi qua từng chương trong các khoảng thời gian nhỏ thay vì phải ngồi đọc một mạch."]
      ]
    }
  },
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
  }
];

const labels = {
  en: {
    htmlLang: "en",
    path: "en",
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
    indexDescription: "Guides for listening to Wattpad stories, Wattpad audio, text to speech apps, Speechify alternatives, web novels, romance, fantasy, and online fiction with Watt Audio.",
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
    path: "vi",
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
    indexDescription: "Các hướng dẫn nghe truyện Wattpad, Wattpad audio, app text to speech, app thay thế Speechify, web novel, romance, fantasy và truyện online bằng Watt Audio.",
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
  }
};

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
  return lang === "en" || lang === "vi" ? "../" : "";
}

function articleUrl(lang, slug) {
  return `${siteUrl}/${lang}/articles/${slug}.html`;
}

function absoluteUrl(pathname) {
  return `${siteUrl}${pathname}`;
}

function articleTags(topic, lang) {
  const shared = ["Watt Audio", "Wattpad audio", "text to speech", "text to speech app", "TTS reader", "AI voice", "story audio"];
  const bySlug = {
    "how-to-listen-to-wattpad-stories": ["listen to Wattpad stories", "Wattpad reader", "story listening"],
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
  return [...shared, ...(bySlug[topic.slug] || []), ...(lang === "vi" ? vi : [])];
}

function hashtagText(tag) {
  return `#${tag.replace(/[^A-Za-z0-9À-ỹ]+/g, "")}`;
}

function jsonScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("</", "<\\/")}</script>`;
}

function baseMeta({ title, description, canonical, image, imageWidth, imageHeight, lang, type = "website", keywords = [] }) {
  const locale = lang === "vi" ? "vi_VN" : "en_US";
  return `${faviconTags}
<meta name="description" content="${escapeHtml(description)}" />
${keywords.length ? `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />` : ""}
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="author" content="Watt Audio" />
<link rel="canonical" href="${canonical}" />
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
  return topics
    .filter((topic) => topic.slug !== currentSlug)
    .slice(0, 4)
    .map((topic) => {
      const page = topic[lang];
      return `<a href="${topic.slug}.html">${escapeHtml(page.title)}</a>`;
    })
    .join("\n");
}

function articleHtml(topic, lang) {
  const page = topic[lang];
  const l = labels[lang];
  const canonical = articleUrl(lang, topic.slug);
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
    inLanguage: lang === "vi" ? "vi-VN" : "en",
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
    inLanguage: lang === "vi" ? "vi-VN" : "en",
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

  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
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
<link rel="alternate" hreflang="en" href="${articleUrl("en", topic.slug)}" />
<link rel="alternate" hreflang="vi-VN" href="${articleUrl("vi", topic.slug)}" />
<link rel="alternate" hreflang="x-default" href="${articleUrl("en", topic.slug)}" />
${tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`).join("\n")}
<meta property="article:published_time" content="2026-06-11T00:00:00+07:00" />
<meta property="article:modified_time" content="${lastModified}T00:00:00+07:00" />
<meta property="article:section" content="${escapeHtml(l.guides)}" />
${jsonScript(articleSchema)}
${jsonScript(howToSchema)}
${jsonScript(faqSchema)}
${jsonScript(breadcrumbSchema)}
<link rel="stylesheet" href="../../assets/seo.css" />
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
      <a href="${lang === "en" ? "../../vi/articles/" + topic.slug + ".html" : "../../en/articles/" + topic.slug + ".html"}">${lang === "en" ? "Tiếng Việt" : "English"}</a>
      <a href="${appUrl}">${l.download}</a>
    </nav>

    <article>
      <div class="eyebrow">${l.guide}</div>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="intro">${escapeHtml(page.description)} ${lang === "en" ? "This guide is written for" : "Bài này dành cho"} ${escapeHtml(page.audience)}.</p>

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

      <div class="tag-row" aria-label="${lang === "en" ? "Topic tags" : "Chủ đề"}">
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
        <a class="btn" href="${appUrl}">${l.downloadCta}</a>
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
  const keywords = lang === "vi"
    ? ["Watt Audio", "nghe truyện Wattpad", "Wattpad audio", "app text to speech", "app thay thế Speechify", "chuyển truyện thành audio", "giọng đọc AI", "truyện audio"]
    : ["Watt Audio", "Wattpad audio", "story audio guides", "text to speech", "text to speech app", "Speechify alternative", "TTS reader", "AI voice"];
  const list = topics.map((topic) => {
    const page = topic[lang];
    return `<a href="${topic.slug}.html">${escapeHtml(page.title)}<span>${escapeHtml(page.description)}</span></a>`;
  }).join("\n");
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
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
<link rel="alternate" hreflang="en" href="${siteUrl}/en/articles/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/articles/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/articles/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: l.indexTitle,
  description: l.indexDescription,
  url: canonical,
  inLanguage: lang === "vi" ? "vi-VN" : "en",
  publisher
})}
<link rel="stylesheet" href="../../assets/seo.css" />
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
      <a href="${lang === "en" ? "../../vi/articles/" : "../../en/articles/"}">${lang === "en" ? "Tiếng Việt" : "English"}</a>
      <a href="${appUrl}">${l.download}</a>
    </nav>
    <article>
      <div class="eyebrow">${l.guides}</div>
      <h1>${l.indexTitle}</h1>
      <p class="intro">${escapeHtml(l.indexDescription)}</p>
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

function localizedHomeHtml(lang) {
  const l = labels[lang];
  const homeImage = homeImages[lang];
  const title = lang === "en"
    ? "Watt Audio | Turn Stories into Audio"
    : "Watt Audio | Chuyển truyện chữ thành audio";
  const description = lang === "en"
    ? "Watt Audio helps you turn supported story links into chapter audio with AI voice, background playback, offline replay, speed control, and sleep timer."
    : "Watt Audio giúp chuyển link truyện được hỗ trợ thành audio theo chương bằng giọng đọc AI, nghe nền, nghe lại offline, chỉnh tốc độ và hẹn giờ ngủ.";
  const keywords = lang === "en"
    ? ["Watt Audio", "Wattpad audio app", "text to speech stories", "text to speech app for Wattpad", "Speechify alternative", "AI voice reader", "listen to stories"]
    : ["Watt Audio", "nghe truyện Wattpad", "Wattpad audio", "app text to speech", "app thay thế Speechify", "chuyển truyện thành audio", "app đọc truyện audio", "giọng đọc AI"];
  const canonical = `${siteUrl}/${lang}/`;
  const guideTitle = lang === "en" ? "Watt Audio Guides" : "Hướng dẫn Watt Audio";
  const guideSub = lang === "en" ? "Listening guides and TTS tips" : "Hướng dẫn nghe truyện và TTS";
  const appTitle = lang === "en" ? "Listen to stories your way" : "Nghe truyện theo cách của bạn";
  const appText = lang === "en"
    ? "Create chapter audio from supported story links, listen with the screen off, and keep your reading habit moving anywhere."
    : "Tạo audio theo chương từ link truyện được hỗ trợ, nghe khi tắt màn hình và tiếp tục thói quen đọc ở bất cứ đâu.";
  const seoText = lang === "en"
    ? "Watt Audio is an iOS app for Wattpad audio, story text to speech, AI voice listening, Speechify alternative searches, web novels, romance, fantasy, background playback, chapter audio, and offline replay."
    : "Watt Audio là app iOS cho nhu cầu nghe truyện Wattpad, Wattpad audio, text to speech cho truyện, giọng đọc AI, app thay thế Speechify, web novel, romance, fantasy, phát nền, audio theo chương và nghe lại offline.";
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
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
<link rel="alternate" hreflang="en" href="${siteUrl}/en/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Watt Audio",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "iOS",
  description,
  url: canonical,
  image: absoluteUrl(homeImage.src),
  downloadUrl: appUrl,
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
<link rel="stylesheet" href="../assets/seo.css" />
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
  .home-footer { margin-top:38px; }
  @media (max-width:760px) {
    .home-links { grid-template-columns:1fr; }
  }
</style>
</head>
<body>
  <div class="wrap home-wrap">
    <nav class="nav home-nav">
      <a class="home-brand" href="./"><img src="..${appIcon.src}" width="${appIcon.width}" height="${appIcon.height}" alt="" /><span>Watt Audio</span></a>
      <div class="home-actions">
        <a href="${lang === "en" ? "../vi/" : "../en/"}">${lang === "en" ? "Tiếng Việt" : "English"}</a>
        <a class="btn" href="${appUrl}">${l.download}</a>
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

    <main>
      <h1 class="visually-hidden">${appTitle}</h1>
      <p class="visually-hidden">${appText} ${seoText}</p>
      <nav class="article-list home-links" aria-label="${lang === "en" ? "Watt Audio pages" : "Các trang Watt Audio"}">
        <a href="articles/">${guideTitle}<span>${guideSub}</span></a>
        <a href="../about.html">${lang === "en" ? "About Watt Audio" : "Giới thiệu Watt Audio"}<span>${lang === "en" ? "App details and listening workflow" : "Thông tin app và cách nghe truyện"}</span></a>
        <a href="../support.html">${l.support}<span>${lang === "en" ? "Help and contact" : "Trợ giúp và liên hệ"}</span></a>
      </nav>
    </main>

    <footer class="home-footer">© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

function rootIndexHtml() {
  const title = "Watt Audio | Turn Stories into Audio";
  const description = "Watt Audio turns supported story links into chapter audio with AI voice, background playback, offline replay, speed control, and sleep timer.";
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
  keywords: ["Watt Audio", "Wattpad audio", "Wattpad audio app", "story audio", "AI voice", "text to speech", "text to speech app", "TTS reader", "Speechify alternative"]
})}
<link rel="alternate" hreflang="en" href="${siteUrl}/en/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
${jsonScript({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Watt Audio",
  url: siteUrl,
  description,
  inLanguage: ["en", "vi-VN"],
  publisher
})}
<link rel="stylesheet" href="assets/seo.css" />
<script>
  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.has("no_redirect")) return;
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    var isVietnam = tz === "Asia/Ho_Chi_Minh" || tz === "Asia/Saigon" || langs.some(function (lang) { return /^vi\\b/i.test(lang); });
    window.location.replace(isVietnam ? "/vi/" : "/en/");
  })();
</script>
</head>
<body>
  <div class="wrap">
    <article>
      <div class="eyebrow">Watt Audio</div>
      <h1>Choose your language</h1>
      <p class="intro">We will automatically show Vietnamese for Vietnam/vi browsers and English for other visitors when JavaScript is available.</p>
      <div class="article-list">
        <a href="vi/">Tiếng Việt<span>Dành cho người dùng ở Việt Nam hoặc trình duyệt tiếng Việt</span></a>
        <a href="en/">English<span>For international visitors</span></a>
      </div>
      <noscript>
        <p class="intro">JavaScript is disabled. Use the language links above to open the Vietnamese or English version of Watt Audio.</p>
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
        sameAs: [appUrl]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: "Watt Audio",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "iOS",
        description,
        url: canonical,
        image: absoluteUrl(homeImages.en.src),
        downloadUrl: appUrl,
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
              text: "Watt Audio is an iOS app that helps readers turn supported story links into chapter audio using AI voice generation and a listening-focused player."
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
  keywords: ["Watt Audio", "story audio app", "AI voice reader", "Wattpad audio app", "text to speech stories"]
})}
${jsonScript(schema)}
<link rel="stylesheet" href="assets/seo.css" />
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
      <a href="${appUrl}">Download app</a>
    </nav>
    <article>
      <div class="eyebrow">About Watt Audio</div>
      <h1>Watt Audio turns stories into chapter audio</h1>
      <p class="intro">Watt Audio is an iOS app for readers who want to listen to supported web stories with AI voice, chapter controls, background playback, offline replay, speed control, and sleep timer.</p>

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
        <a class="btn" href="${appUrl}">Download on the App Store</a>
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
    { loc: `${siteUrl}/en/`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/vi/`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/about.html`, priority: "0.8", changefreq: "monthly" },
    { loc: `${siteUrl}/support.html`, priority: "0.5", changefreq: "monthly" },
    { loc: `${siteUrl}/privacy.html`, priority: "0.4", changefreq: "yearly" },
    { loc: `${siteUrl}/en/articles/`, priority: "0.8", changefreq: "weekly" },
    { loc: `${siteUrl}/vi/articles/`, priority: "0.8", changefreq: "weekly" },
    ...topics.flatMap((topic) => [
      { loc: articleUrl("en", topic.slug), priority: "0.7", changefreq: "monthly" },
      { loc: articleUrl("vi", topic.slug), priority: "0.7", changefreq: "monthly" }
    ])
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url><loc>${loc}</loc><lastmod>${lastModified}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join("\n")}
</urlset>
`;
}

function llmsTxt() {
  const englishArticles = topics.map((topic) => {
    const page = topic.en;
    return `- [${page.title}](${articleUrl("en", topic.slug)}): ${page.description}`;
  }).join("\n");
  const vietnameseArticles = topics.map((topic) => {
    const page = topic.vi;
    return `- [${page.title}](${articleUrl("vi", topic.slug)}): ${page.description}`;
  }).join("\n");
  return `# Watt Audio

Watt Audio is an iOS app that turns supported story links into chapter audio using AI voice generation, background playback, speed control, sleep timer, and offline replay for generated audio.

## Primary Pages
- [English homepage](${siteUrl}/en/): Product overview and App Store download link.
- [Vietnamese homepage](${siteUrl}/vi/): Tổng quan sản phẩm và link tải App Store.
- [About Watt Audio](${siteUrl}/about.html): Product entity page with features, audience, app description, and download link.
- [Support](${siteUrl}/support.html): Quick start, troubleshooting, and contact details.
- [Privacy Policy](${siteUrl}/privacy.html): Privacy, local storage, generated audio, and network use.

## English Guides
${englishArticles}

## Vietnamese Guides
${vietnameseArticles}

## App Store
- [Download Watt Audio](${appUrl})
`;
}

for (const dir of ["en", "vi", "articles"]) {
  fs.rmSync(path.join(process.cwd(), dir), { recursive: true, force: true });
}

for (const lang of ["en", "vi"]) {
  fs.mkdirSync(path.join(process.cwd(), lang, "articles"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), lang, "index.html"), localizedHomeHtml(lang));
  fs.writeFileSync(path.join(process.cwd(), lang, "articles", "index.html"), guidesIndexHtml(lang));
  for (const topic of topics) {
    fs.writeFileSync(path.join(process.cwd(), lang, "articles", `${topic.slug}.html`), articleHtml(topic, lang));
  }
}

fs.mkdirSync(path.join(process.cwd(), "articles"), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), "articles", "index.html"), legacyRedirectHtml("/en/articles/", "Watt Audio Guides"));
for (const topic of topics) {
  fs.writeFileSync(path.join(process.cwd(), "articles", `${topic.slug}.html`), legacyRedirectHtml(`/en/articles/${topic.slug}.html`, topic.en.title));
}

fs.writeFileSync(path.join(process.cwd(), "index.html"), rootIndexHtml());
fs.writeFileSync(path.join(process.cwd(), "about.html"), aboutHtml());
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemapXml());
fs.writeFileSync(path.join(process.cwd(), "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);
fs.writeFileSync(path.join(process.cwd(), "llms.txt"), llmsTxt());
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

console.log(`Generated ${topics.length} topics in English and Vietnamese.`);
