import fs from "node:fs";
import path from "node:path";

const appUrl = "https://apps.apple.com/vn/app/watt-audio-%C4%91%E1%BB%8Dc-truy%E1%BB%87n-audio/id6775724279";
const siteUrl = "https://wattaudios.com";
const blogImage = {
  src: "/assets/blog/how-to-listen-to-wattpad-stories-watt-audio.webp",
  width: 1536,
  height: 1024
};
const homeImages = {
  vi: {
    src: "/assets/blog/homepage-watt-audio-vi.webp",
    width: 1942,
    height: 809,
    alt: "Watt Audio homepage hero image in Vietnamese showing the app turning stories into audio"
  },
  en: {
    src: "/assets/blog/homepage-watt-audio-en.webp",
    width: 1672,
    height: 941,
    alt: "Watt Audio homepage hero image in English showing the app turning stories into audio"
  }
};

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
    indexDescription: "Guides for listening to Wattpad stories, web novels, romance, fantasy, and other online fiction with Watt Audio.",
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
    indexDescription: "Các hướng dẫn nghe truyện Wattpad, web novel, romance, fantasy và truyện online bằng Watt Audio.",
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
<title>${escapeHtml(page.title)} | Watt Audio</title>
<meta name="description" content="${escapeHtml(page.description)}" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" hreflang="en" href="${articleUrl("en", topic.slug)}" />
<link rel="alternate" hreflang="vi-VN" href="${articleUrl("vi", topic.slug)}" />
<link rel="alternate" hreflang="x-default" href="${articleUrl("en", topic.slug)}" />
<meta property="og:title" content="${escapeHtml(page.title)}" />
<meta property="og:description" content="${escapeHtml(page.description)}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${siteUrl}${blogImage.src}" />
<meta property="og:image:width" content="${blogImage.width}" />
<meta property="og:image:height" content="${blogImage.height}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${siteUrl}${blogImage.src}" />
<link rel="stylesheet" href="../../assets/seo.css" />
</head>
<body>
  <div class="wrap">
    <div class="top">
      <img src="../../icon.png" alt="Watt Audio app icon" />
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

      <p>${escapeHtml(fill(l.introA, page))}</p>
      <p>${escapeHtml(fill(l.introB, page))}</p>

      <h2>${l.whyHeading}</h2>
      <p>${escapeHtml(fill(l.whyA, page))}</p>
      <p>${escapeHtml(fill(l.whyB, page))}</p>

      <figure class="blog-figure">
        <img
          src="../../assets/blog/how-to-listen-to-wattpad-stories-watt-audio.webp"
          width="${blogImage.width}"
          height="${blogImage.height}"
          alt="${escapeHtml(`Watt Audio app blog image for ${page.title}`)}"
          loading="eager"
          decoding="async" />
        <figcaption>${escapeHtml(page.screenshot)}</figcaption>
      </figure>

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

    <footer>© 2026 Watt Audio · ${l.footer}</footer>
  </div>
</body>
</html>
`;
}

function guidesIndexHtml(lang) {
  const l = labels[lang];
  const list = topics.map((topic) => {
    const page = topic[lang];
    return `<a href="${topic.slug}.html">${escapeHtml(page.title)}<span>${escapeHtml(page.description)}</span></a>`;
  }).join("\n");
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${l.indexTitle}</title>
<meta name="description" content="${escapeHtml(l.indexDescription)}" />
<link rel="canonical" href="${siteUrl}/${lang}/articles/" />
<link rel="alternate" hreflang="en" href="${siteUrl}/en/articles/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/articles/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/articles/" />
<link rel="stylesheet" href="../../assets/seo.css" />
</head>
<body>
  <div class="wrap">
    <div class="top">
      <img src="../../icon.png" alt="Watt Audio app icon" />
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
  const guideTitle = lang === "en" ? "Watt Audio Guides" : "Hướng dẫn Watt Audio";
  const guideSub = lang === "en" ? "SEO articles and listening guides" : "Bài hướng dẫn nghe truyện và SEO";
  const appTitle = lang === "en" ? "Listen to stories your way" : "Nghe truyện theo cách của bạn";
  const appText = lang === "en"
    ? "Create chapter audio from supported story links, listen with the screen off, and keep your reading habit moving anywhere."
    : "Tạo audio theo chương từ link truyện được hỗ trợ, nghe khi tắt màn hình và tiếp tục thói quen đọc ở bất cứ đâu.";
  const features = lang === "en"
    ? [["Natural voices", "Realistic and expressive"], ["Offline ready", "Replay generated audio"], ["Made for stories", "Chapter-based listening"]]
    : [["Giọng đọc tự nhiên", "Dễ nghe và giàu cảm xúc"], ["Sẵn sàng offline", "Nghe lại audio đã tạo"], ["Dành cho truyện", "Nghe theo từng chương"]];
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Watt Audio</title>
<meta name="description" content="${escapeHtml(l.homeTag)}" />
<link rel="canonical" href="${siteUrl}/${lang}/" />
<link rel="alternate" hreflang="en" href="${siteUrl}/en/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
<meta property="og:image" content="${siteUrl}${homeImage.src}" />
<meta property="og:image:width" content="${homeImage.width}" />
<meta property="og:image:height" content="${homeImage.height}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${siteUrl}${homeImage.src}" />
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
  .hero-shell img { display:block; width:100%; height:auto; }
  .home-copy {
    display:grid;
    grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);
    gap:28px;
    align-items:start;
    margin:34px 0 24px;
  }
  .home-copy h1 { margin:0 0 12px; font-size:clamp(34px,5vw,58px); }
  .home-copy p { font-size:18px; color:#343842; margin:0; }
  .feature-strip {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
    margin:22px 0;
  }
  .feature {
    background:rgba(255,255,255,.72);
    border:1px solid rgba(247,78,5,.16);
    border-radius:8px;
    padding:16px;
  }
  .feature b { display:block; font-size:16px; }
  .feature span { display:block; color:var(--muted); font-size:14px; margin-top:2px; }
  .home-links { margin-top:0; }
  .home-footer { margin-top:38px; }
  @media (max-width:760px) {
    .home-copy { grid-template-columns:1fr; }
    .feature-strip { grid-template-columns:1fr; }
  }
</style>
</head>
<body>
  <div class="wrap home-wrap">
    <nav class="nav home-nav">
      <a class="home-brand" href="./"><img src="../icon.png" alt="Watt Audio" /><span>Watt Audio</span></a>
      <div class="home-actions">
        <a href="${lang === "en" ? "../vi/" : "../en/"}">${lang === "en" ? "Tiếng Việt" : "English"}</a>
        <a class="btn" href="${appUrl}">${l.download}</a>
      </div>
    </nav>

    <section class="hero-shell" aria-label="Watt Audio">
      <img
        src="..${homeImage.src}"
        width="${homeImage.width}"
        height="${homeImage.height}"
        alt="${homeImage.alt}"
        fetchpriority="high"
        decoding="async" />
    </section>

    <section class="home-copy">
      <div>
        <div class="eyebrow">Watt Audio</div>
        <h1>${appTitle}</h1>
        <p>${appText}</p>
        <div class="feature-strip">
          ${features.map(([title, text]) => `<div class="feature"><b>${title}</b><span>${text}</span></div>`).join("\n          ")}
        </div>
      </div>
      <div class="article-list home-links">
        <a href="articles/">${guideTitle}<span>${guideSub}</span></a>
        <a href="../privacy.html">${l.privacy}<span>Privacy Policy</span></a>
        <a href="../support.html">${l.support}<span>Support</span></a>
      </div>
    </section>

    <footer class="home-footer">© 2026 Watt Audio</footer>
  </div>
</body>
</html>
`;
}

function rootIndexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Watt Audio</title>
<meta name="description" content="Watt Audio turns supported story links into chapter audio." />
<link rel="canonical" href="${siteUrl}/" />
<link rel="alternate" hreflang="en" href="${siteUrl}/en/" />
<link rel="alternate" hreflang="vi-VN" href="${siteUrl}/vi/" />
<link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
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

function sitemapXml() {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/en/`,
    `${siteUrl}/vi/`,
    `${siteUrl}/support.html`,
    `${siteUrl}/privacy.html`,
    `${siteUrl}/en/articles/`,
    `${siteUrl}/vi/articles/`,
    ...topics.flatMap((topic) => [
      articleUrl("en", topic.slug),
      articleUrl("vi", topic.slug)
    ])
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
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
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemapXml());
fs.writeFileSync(path.join(process.cwd(), "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);

console.log(`Generated ${topics.length} topics in English and Vietnamese.`);
