/*
 * AI Atlas — directory data.
 * Tools are real products; taglines and descriptions are editorial copy.
 * No external assets; this file ships with the site.
 */
window.ATLAS_DATA = {
  edition: { label: "Edition 01", updated: "September 2026" },
  categories: [
    { slug: "chatbots", name: "Chatbots & Assistants" },
    { slug: "writing", name: "Writing & Editing" },
    { slug: "image", name: "Image & Art" },
    { slug: "video", name: "Video & Animation" },
    { slug: "audio", name: "Audio & Music" },
    { slug: "code", name: "Coding & Dev" },
    { slug: "design", name: "Design & Prototyping" },
    { slug: "productivity", name: "Productivity & Meetings" },
    { slug: "research", name: "Research & Knowledge" },
    { slug: "automation", name: "Automation & Agents" }
  ],
  picks: [
    { id: "claude", note: "The one we hand people first when they ask where to start. Long-context reasoning and a careful writing voice make it a daily driver, not a demo." },
    { id: "cursor", note: "The clearest look at where coding is heading: multi-file edits you review the way you would review a colleague's pull request." },
    { id: "elevenlabs", note: "Voice that finally clears the uncanny valley — good enough for narration, dubbing, and full audiobooks." },
    { id: "notebooklm", note: "Point it at your own sources — PDFs, notes, links — and it stays honest about what is actually in them. The antidote to hallucinated research." }
  ],
  shelf: ["chatgpt", "gemini", "perplexity", "midjourney", "github-copilot", "notion", "canva", "zapier"],
  tools: [
    /* ── Chatbots & Assistants ────────────────────────────────────── */
    {
      id: "chatgpt", name: "ChatGPT", maker: "OpenAI", category: "chatbots", pricing: "freemium",
      url: "https://chatgpt.com", tags: ["assistant", "general", "writing"],
      tagline: "The default starting point for most people using AI.",
      desc: "OpenAI's assistant handles writing, analysis, images, and code in one place. The free tier is generous; paid plans add faster models and higher limits."
    },
    {
      id: "claude", name: "Claude", maker: "Anthropic", category: "chatbots", pricing: "freemium",
      url: "https://claude.ai", tags: ["assistant", "long-context", "writing"],
      tagline: "An assistant with a careful ear for long documents.",
      desc: "Claude works well on long inputs — paste in a contract or a codebase and ask real questions. Anthropic's safety work shows in how it handles sensitive requests."
    },
    {
      id: "gemini", name: "Gemini", maker: "Google", category: "chatbots", pricing: "freemium",
      url: "https://gemini.google.com", tags: ["assistant", "multimodal", "google"],
      tagline: "Google's assistant, wired into search and Docs.",
      desc: "Gemini answers across text, images, audio, and video, and plugs into Gmail, Docs, and other Google apps. The free tier is capable; paid plans raise limits."
    },
    {
      id: "microsoft-copilot", name: "Microsoft Copilot", maker: "Microsoft", category: "chatbots", pricing: "freemium",
      url: "https://copilot.microsoft.com", tags: ["assistant", "web", "office"],
      tagline: "An everyday assistant for the web and Windows.",
      desc: "Copilot blends chat, cited web answers, and image generation into one assistant, with free access through a Microsoft account. It also lives inside Windows, Edge, and Office."
    },
    {
      id: "deepseek", name: "DeepSeek", maker: "DeepSeek", category: "chatbots", pricing: "freemium",
      url: "https://chat.deepseek.com", tags: ["assistant", "reasoning", "open-weights"],
      tagline: "A low-cost assistant that shows its reasoning.",
      desc: "DeepSeek's models work through problems step by step and perform well at math and code, at prices that undercut most rivals. The company also releases open-weight versions you can run yourself."
    },
    {
      id: "grok", name: "Grok", maker: "xAI", category: "chatbots", pricing: "freemium",
      url: "https://grok.com", tags: ["assistant", "real-time", "x"],
      tagline: "An irreverent assistant with a live feed of X.",
      desc: "Grok answers questions while reading the room on X in real time, so it can pull in breaking posts and trends. Tone-wise, it leans into personality more than most assistants."
    },
    {
      id: "le-chat", name: "Le Chat", maker: "Mistral AI", category: "chatbots", pricing: "freemium",
      url: "https://chat.mistral.ai", tags: ["assistant", "europe", "fast"],
      tagline: "Mistral's fast, no-nonsense assistant for everyday tasks.",
      desc: "Le Chat runs on Mistral's models and focuses on speed — quick answers, clean formatting, and European data processing. Handy when you want a capable assistant outside the largest US platforms."
    },
    {
      id: "character-ai", name: "Character.AI", maker: "Character.AI", category: "chatbots", pricing: "freemium",
      url: "https://character.ai", tags: ["characters", "roleplay", "consumer"],
      tagline: "Conversations with characters, not assistants.",
      desc: "Character.AI gives you chat partners built around specific personalities, from fictional figures to study buddies. It is a consumer entertainment product more than a work tool."
    },
    {
      id: "poe", name: "Poe", maker: "Quora", category: "chatbots", pricing: "freemium",
      url: "https://poe.com", tags: ["aggregator", "multi-model", "bots"],
      tagline: "One login, many models, a world of bots.",
      desc: "Poe bundles assistants from OpenAI, Anthropic, Google, and others in a single app, so you can compare answers without juggling accounts. Users also publish their own bots to try."
    },
    {
      id: "huggingchat", name: "HuggingChat", maker: "Hugging Face", category: "chatbots", pricing: "free",
      url: "https://huggingface.co/chat", tags: ["open-models", "chat", "community"],
      tagline: "The open-model playground, free to poke at.",
      desc: "HuggingChat offers free access to leading open-weight models and community fine-tunes. It is the easiest way to see how open models feel without installing anything."
    },

    /* ── Writing & Editing ────────────────────────────────────────── */
    {
      id: "jasper", name: "Jasper", maker: "Jasper", category: "writing", pricing: "paid",
      url: "https://jasper.ai", tags: ["marketing", "brand-voice", "teams"],
      tagline: "The marketing copy platform built for whole teams.",
      desc: "Jasper generates campaign copy, blog drafts, and product descriptions, then keeps everything on-brand with saved voice profiles. It is built for marketing teams that need review workflows."
    },
    {
      id: "copy-ai", name: "Copy.ai", maker: "Copy.ai", category: "writing", pricing: "freemium",
      url: "https://copy.ai", tags: ["marketing", "workflows", "teams"],
      tagline: "Copy and content workflows for go-to-market teams.",
      desc: "Copy.ai automates the repetitive parts of B2B marketing — cold outreach, landing pages, product blurbs — inside guided workflows. Team plans add approvals and CRM connections."
    },
    {
      id: "grammarly", name: "Grammarly", maker: "Grammarly", category: "writing", pricing: "freemium",
      url: "https://grammarly.com", tags: ["editing", "grammar", "tone"],
      tagline: "The spellchecker that grew into an editor.",
      desc: "Grammarly fixes grammar and punctuation as you type, then suggests clearer phrasing and tone adjustments for whole sentences. It works across browsers, desktop apps, and mobile keyboards."
    },
    {
      id: "sudowrite", name: "Sudowrite", maker: "Sudowrite", category: "writing", pricing: "paid",
      url: "https://sudowrite.com", tags: ["fiction", "storytelling", "drafting"],
      tagline: "A drafting partner for novelists and storytellers.",
      desc: "Sudowrite helps fiction writers push through hard scenes with tools for description, character voice, and plot brainstorming. Everything is tuned to narrative craft rather than business copy."
    },
    {
      id: "lex", name: "Lex", maker: "Lex", category: "writing", pricing: "freemium",
      url: "https://lex.page", tags: ["drafting", "editor", "focus"],
      tagline: "A clean editor built around asking for help.",
      desc: "Lex is a writing app where the assistant is always one keystroke away — ask for a sharper paragraph, a better title, or a gut check. It suits writers who want help without switching tools."
    },
    {
      id: "quillbot", name: "QuillBot", maker: "QuillBot", category: "writing", pricing: "freemium",
      url: "https://quillbot.com", tags: ["paraphrasing", "summarizing", "grammar"],
      tagline: "Paraphrasing and summarizing in a couple of clicks.",
      desc: "QuillBot rewrites sentences in different tones, condenses long passages into summaries, and checks grammar. Students and non-native speakers use it most."
    },
    {
      id: "rytr", name: "Rytr", maker: "Rytr", category: "writing", pricing: "freemium",
      url: "https://rytr.me", tags: ["copywriting", "templates", "budget"],
      tagline: "Budget copywriting for quick first drafts.",
      desc: "Rytr produces short-form copy — emails, ad lines, product blurbs — from simple templates at a price that undercuts most rivals. It is good enough for drafts you will edit yourself."
    },
    {
      id: "writesonic", name: "Writesonic", maker: "Writesonic", category: "writing", pricing: "freemium",
      url: "https://writesonic.com", tags: ["seo", "articles", "marketing"],
      tagline: "SEO-aware articles, from keyword to draft.",
      desc: "Writesonic drafts long-form articles and product content with search keywords baked in from the start. It pairs an article writer with quick tools for ads and social posts."
    },
    {
      id: "deepl", name: "DeepL", maker: "DeepL", category: "writing", pricing: "freemium",
      url: "https://deepl.com", tags: ["translation", "writing", "languages"],
      tagline: "Translation that keeps a sentence's personality.",
      desc: "DeepL translates text and documents between dozens of languages with famously natural phrasing. The free tier handles everyday jobs; paid plans add glossaries and file formats."
    },
    {
      id: "hemingway", name: "Hemingway Editor", maker: "Hemingway App", category: "writing", pricing: "free",
      url: "https://hemingwayapp.com", tags: ["editing", "readability", "style"],
      tagline: "Tells you, in color, which sentence is too long.",
      desc: "Hemingway Editor grades your writing's readability and highlights long sentences and passive voice as you type. It remains the quickest way to tighten a draft."
    },

    /* ── Image & Art ──────────────────────────────────────────────── */
    {
      id: "midjourney", name: "Midjourney", maker: "Midjourney", category: "image", pricing: "paid",
      url: "https://midjourney.com", tags: ["art", "generative", "community"],
      tagline: "The stylist of image models — mood over literalism.",
      desc: "Midjourney turns text prompts into painterly, often striking images, and its community feed is half the point. Expect gorgeous defaults and a learning curve for precise control."
    },
    {
      id: "bing-image-creator", name: "Bing Image Creator", maker: "Microsoft", category: "image", pricing: "free",
      url: "https://bing.com/images/create", tags: ["generation", "dall-e", "free"],
      tagline: "Free image generation from Microsoft, powered by DALL-E.",
      desc: "Bing Image Creator turns text prompts into images for free with a Microsoft account, using OpenAI's image models. A daily fast-generation allowance keeps it practical for casual use."
    },
    {
      id: "stable-diffusion", name: "Stable Diffusion", maker: "Stability AI", category: "image", pricing: "free",
      url: "https://stability.ai", tags: ["open-source", "models", "self-hosted"],
      tagline: "The open image model you can run yourself.",
      desc: "Stable Diffusion's models generate and edit images on your own hardware, with no per-image price and filters you can adjust. The ecosystem of fine-tunes covers nearly every style."
    },
    {
      id: "firefly", name: "Adobe Firefly", maker: "Adobe", category: "image", pricing: "freemium",
      url: "https://adobe.com/products/firefly.html", tags: ["generation", "commercial-safe", "adobe"],
      tagline: "Adobe's generator, trained for commercial work.",
      desc: "Firefly generates images and effects from prompts inside Photoshop, Illustrator, and the web, trained on licensed and public-domain content. It suits designers who need commercially safe output."
    },
    {
      id: "leonardo", name: "Leonardo AI", maker: "Leonardo.Ai", category: "image", pricing: "freemium",
      url: "https://leonardo.ai", tags: ["game-art", "assets", "generation"],
      tagline: "Image generation tuned for game and product assets.",
      desc: "Leonardo generates art with fine control over style and composition, plus tools for turning sketches into finished assets. Game studios and indie creators lean on it for concept art."
    },
    {
      id: "ideogram", name: "Ideogram", maker: "Ideogram", category: "image", pricing: "freemium",
      url: "https://ideogram.ai", tags: ["typography", "generation", "logos"],
      tagline: "An image model that can actually spell.",
      desc: "Ideogram renders text inside images more reliably than most rivals, which makes it strong for posters, logos, and typographic experiments. Prompt with a headline and it usually lands."
    },
    {
      id: "krea", name: "Krea", maker: "Krea", category: "image", pricing: "freemium",
      url: "https://krea.ai", tags: ["realtime", "enhancement", "generation"],
      tagline: "Watch the image appear while you type.",
      desc: "Krea generates and upscales images in real time, so the picture updates as you adjust the prompt. It also offers enhancers that sharpen and restyle existing images."
    },
    {
      id: "recraft", name: "Recraft", maker: "Recraft", category: "image", pricing: "freemium",
      url: "https://recraft.ai", tags: ["vector", "brand", "illustration"],
      tagline: "Vector art and brand assets from prompts.",
      desc: "Recraft produces true vector illustrations, icons, and mockups you can edit like any design file. Style controls keep output consistent across a whole set."
    },
    {
      id: "playground", name: "Playground", maker: "Playground", category: "image", pricing: "freemium",
      url: "https://playground.com", tags: ["design", "canvas", "generation"],
      tagline: "A design canvas for mixing and matching models.",
      desc: "Playground combines several image models on one canvas with tools for extending, masking, and remixing. It suits people who would rather iterate visually than through prompt text alone."
    },
    {
      id: "photoroom", name: "Photoroom", maker: "Photoroom", category: "image", pricing: "freemium",
      url: "https://photoroom.com", tags: ["product-photos", "background", "mobile"],
      tagline: "Product photos that look studio-made.",
      desc: "Photoroom cuts out backgrounds, adds realistic shadows, and stages product shots from your phone. The free tier covers quick listings; brands use the batch tools."
    },
    {
      id: "magnific", name: "Magnific", maker: "Magnific", category: "image", pricing: "paid",
      url: "https://magnific.ai", tags: ["upscaling", "detail", "enhancement"],
      tagline: "Upscales images with detail, not blur.",
      desc: "Magnific enlarges images while inventing plausible texture, which keeps results sharp instead of smeared. It is popular for restoring old photos and prepping assets for print."
    },

    /* ── Video & Animation ────────────────────────────────────────── */
    {
      id: "runway", name: "Runway", maker: "Runway", category: "video", pricing: "freemium",
      url: "https://runwayml.com", tags: ["generation", "editing", "vfx"],
      tagline: "The video lab where new techniques keep landing.",
      desc: "Runway generates video clips from text or images and packs advanced editing tools — inpainting, motion brush, camera control. Filmmakers use it for storyboards and effects shots."
    },
    {
      id: "sora", name: "Sora", maker: "OpenAI", category: "video", pricing: "paid",
      url: "https://sora.com", tags: ["text-to-video", "generation", "openai"],
      tagline: "OpenAI's text-to-video model, now a full app.",
      desc: "Sora turns a written scene into surprisingly coherent video, with tools for extending clips and blending shots. Access comes with ChatGPT's paid plans."
    },
    {
      id: "veo", name: "Veo", maker: "Google", category: "video", pricing: "paid",
      url: "https://deepmind.google/technologies/veo", tags: ["text-to-video", "cinematic", "google"],
      tagline: "Google's cinematic take on text-to-video.",
      desc: "Veo produces high-fidelity clips with strong camera control and native sound generation. It is available through Google's AI plans and Gemini interfaces."
    },
    {
      id: "pika", name: "Pika", maker: "Pika", category: "video", pricing: "freemium",
      url: "https://pika.art", tags: ["generation", "effects", "social"],
      tagline: "Playful video effects for social clips.",
      desc: "Pika generates short videos and applies viral-style effects — inflate, melt, swap — from an image or a prompt. It is built for quick, shareable output rather than cinema."
    },
    {
      id: "luma", name: "Luma Dream Machine", maker: "Luma AI", category: "video", pricing: "freemium",
      url: "https://lumalabs.ai", tags: ["generation", "motion", "3d"],
      tagline: "Dreamy video generation with a 3D pedigree.",
      desc: "Luma's Dream Machine turns prompts and photos into fluid motion, drawing on the company's work in neural 3D capture. It is good at atmospheric shots and sweeping camera moves."
    },
    {
      id: "synthesia", name: "Synthesia", maker: "Synthesia", category: "video", pricing: "paid",
      url: "https://synthesia.io", tags: ["avatars", "training", "enterprise"],
      tagline: "Training videos with avatar presenters.",
      desc: "Synthesia scripts your video, then renders an avatar presenter speaking it in dozens of languages. Corporate teams use it to update training content without a camera crew."
    },
    {
      id: "heygen", name: "HeyGen", maker: "HeyGen", category: "video", pricing: "freemium",
      url: "https://heygen.com", tags: ["avatars", "translation", "marketing"],
      tagline: "Avatars that speak your script in any language.",
      desc: "HeyGen clones your likeness or uses stock avatars, then lip-syncs translations that keep your voice. Marketing teams ship multilingual videos from a single recording."
    },
    {
      id: "descript", name: "Descript", maker: "Descript", category: "video", pricing: "freemium",
      url: "https://descript.com", tags: ["editing", "transcription", "podcasts"],
      tagline: "Edit audio and video by editing the transcript.",
      desc: "Descript transcribes your recording, then lets you cut, rearrange, and fix audio by changing the text. Filler-word removal and studio sound are one click away."
    },
    {
      id: "kling", name: "Kling", maker: "Kuaishou", category: "video", pricing: "freemium",
      url: "https://klingai.com", tags: ["generation", "cinematic", "kuaishou"],
      tagline: "A video model with striking realism.",
      desc: "Kling generates detailed clips with strong physics and character consistency, and it keeps improving on a fast release cadence. It is one of the strongest generators to come out of China, available on web and API."
    },
    {
      id: "capcut", name: "CapCut", maker: "ByteDance", category: "video", pricing: "freemium",
      url: "https://capcut.com", tags: ["editing", "social", "mobile"],
      tagline: "The mobile editor behind a million social videos.",
      desc: "CapCut pairs an approachable timeline editor with tools for captions, cutouts, and background removal. Its templates drive a huge share of short-form video."
    },

    /* ── Audio & Music ────────────────────────────────────────────── */
    {
      id: "elevenlabs", name: "ElevenLabs", maker: "ElevenLabs", category: "audio", pricing: "freemium",
      url: "https://elevenlabs.io", tags: ["speech", "dubbing", "voices"],
      tagline: "Speech synthesis that sounds like a person.",
      desc: "ElevenLabs generates narration, dubs video into other languages, and clones voices from short samples. Its quality set a new bar for AI audio production."
    },
    {
      id: "suno", name: "Suno", maker: "Suno", category: "audio", pricing: "freemium",
      url: "https://suno.com", tags: ["music", "songs", "generation"],
      tagline: "Full songs from a text prompt.",
      desc: "Suno writes lyrics, sings them, and arranges a backing track in nearly any genre you name. Tracks render in seconds; paid plans come with more commercial usage terms."
    },
    {
      id: "udio", name: "Udio", maker: "Udio", category: "audio", pricing: "freemium",
      url: "https://udio.com", tags: ["music", "songs", "generation"],
      tagline: "A music generator with studio leanings.",
      desc: "Udio produces songs with notable production polish and lets you extend and remix your own generations. Musicians use it for demos and song ideas."
    },
    {
      id: "murf", name: "Murf", maker: "Murf AI", category: "audio", pricing: "freemium",
      url: "https://murf.ai", tags: ["voiceover", "studio", "narration"],
      tagline: "Voiceovers for training and product videos.",
      desc: "Murf offers a library of professional voices, timing controls, and sync-to-video tools for narration. Teams use it for e-learning and ads without booking a studio."
    },
    {
      id: "adobe-podcast", name: "Adobe Podcast", maker: "Adobe", category: "audio", pricing: "freemium",
      url: "https://podcast.adobe.com", tags: ["enhance", "podcast", "cleanup"],
      tagline: "Makes laptop audio sound like a studio.",
      desc: "Adobe Podcast's enhance tool removes echo and noise from recordings with a single upload, and its web editor handles quick cuts. Podcasters with imperfect rooms love it."
    },
    {
      id: "krisp", name: "Krisp", maker: "Krisp", category: "audio", pricing: "freemium",
      url: "https://krisp.ai", tags: ["noise-cancelling", "meetings", "calls"],
      tagline: "Silence the dog and the espresso machine.",
      desc: "Krisp filters background noise and echo from calls in real time, working across meeting apps. Paid plans also transcribe calls and summarize them."
    },
    {
      id: "playht", name: "Play.ht", maker: "PlayHT", category: "audio", pricing: "freemium",
      url: "https://play.ht", tags: ["tts", "api", "voice"],
      tagline: "Text-to-speech with an API-first mindset.",
      desc: "Play.ht turns text into natural narration across dozens of voices and languages, with an API for apps. Developers use it for audiobooks, voice agents, and accessibility features."
    },
    {
      id: "speechify", name: "Speechify", maker: "Speechify", category: "audio", pricing: "freemium",
      url: "https://speechify.com", tags: ["listening", "tts", "accessibility"],
      tagline: "Listen to anything on the internet.",
      desc: "Speechify reads documents, articles, and PDFs aloud in natural voices at up to five times normal speed. Students with reading difficulties are a core audience."
    },
    {
      id: "lalal", name: "LALAL.AI", maker: "LALAL.AI", category: "audio", pricing: "freemium",
      url: "https://lalal.ai", tags: ["stems", "separation", "cleanup"],
      tagline: "Split any song into stems.",
      desc: "LALAL.AI separates vocals, drums, bass, and instruments from finished tracks with high fidelity. Podcasters also use it to strip background music from recordings."
    },
    {
      id: "moises", name: "Moises", maker: "Moises", category: "audio", pricing: "freemium",
      url: "https://moises.ai", tags: ["practice", "stems", "musicians"],
      tagline: "A bandmate that transcribes and slows things down.",
      desc: "Moises splits songs into stems, detects chords, and changes keys or tempo for practice. Musicians use it to learn parts and rehearse anywhere."
    },

    /* ── Coding & Dev ─────────────────────────────────────────────── */
    {
      id: "github-copilot", name: "GitHub Copilot", maker: "GitHub", category: "code", pricing: "freemium",
      url: "https://github.com/features/copilot", tags: ["completion", "ide", "github"],
      tagline: "The completion engine that started the category.",
      desc: "GitHub Copilot suggests whole functions and tests inside your editor, chat included, and now spans multiple models. The free tier covers occasional use; teams add policy controls."
    },
    {
      id: "cursor", name: "Cursor", maker: "Anysphere", category: "code", pricing: "freemium",
      url: "https://cursor.com", tags: ["editor", "agent", "codebase"],
      tagline: "A code editor rebuilt around AI editing.",
      desc: "Cursor edits across files from a chat prompt and reviews its own changes before you commit them. Its codebase-wide context is what won over early adopters."
    },
    {
      id: "claude-code", name: "Claude Code", maker: "Anthropic", category: "code", pricing: "paid",
      url: "https://anthropic.com/claude-code", tags: ["terminal", "agent", "refactoring"],
      tagline: "An agent that works in your terminal.",
      desc: "Claude Code takes instructions in plain language, edits files, runs tests, and iterates until a task is done. It is terminal-native, so it fits existing scripts and workflows."
    },
    {
      id: "windsurf", name: "Windsurf", maker: "Windsurf", category: "code", pricing: "freemium",
      url: "https://windsurf.com", tags: ["editor", "agent", "flows"],
      tagline: "An editor where agent and human edit together.",
      desc: "Windsurf pairs an agent that plans multi-step changes with an editor that keeps you in the loop. Its flow tracking reduces how much you have to re-explain context."
    },
    {
      id: "replit", name: "Replit", maker: "Replit", category: "code", pricing: "freemium",
      url: "https://replit.com", tags: ["cloud-ide", "hosting", "collaboration"],
      tagline: "Build, host, and ship from the browser.",
      desc: "Replit's agent scaffolds full apps, handles databases, and deploys them without leaving the tab. It is great for prototypes and teaching; teams also use its cloud workspaces."
    },
    {
      id: "tabnine", name: "Tabnine", maker: "Tabnine", category: "code", pricing: "freemium",
      url: "https://tabnine.com", tags: ["completion", "privacy", "enterprise"],
      tagline: "Completion you can run inside your walls.",
      desc: "Tabnine focuses on privacy — it can run entirely on-premises or in your cloud — while suggesting code and tests. Enterprises with strict rules pick it for that reason."
    },
    {
      id: "amazon-q", name: "Amazon Q Developer", maker: "Amazon", category: "code", pricing: "freemium",
      url: "https://aws.amazon.com/q/developer", tags: ["aws", "completion", "migration"],
      tagline: "The AWS assistant in your terminal and console.",
      desc: "Amazon Q answers questions about your cloud setup, modernizes old Java, and suggests code in your IDE. The free tier is generous for individuals; deeper features tie into AWS plans."
    },
    {
      id: "cody", name: "Cody", maker: "Sourcegraph", category: "code", pricing: "freemium",
      url: "https://sourcegraph.com/cody", tags: ["code-search", "context", "enterprise"],
      tagline: "Code answers grounded in your whole repo.",
      desc: "Cody searches your codebase and cites the files behind its answers, so suggestions fit your conventions. It works in popular editors and talks to Sourcegraph's code graph."
    },
    {
      id: "v0", name: "v0", maker: "Vercel", category: "code", pricing: "freemium",
      url: "https://v0.dev", tags: ["ui", "react", "generation"],
      tagline: "Describe a UI, get React and Tailwind code.",
      desc: "v0 turns prompts and screenshots into working React components styled with Tailwind. Pieces you like can be copied straight into your app."
    },
    {
      id: "bolt", name: "Bolt.new", maker: "StackBlitz", category: "code", pricing: "freemium",
      url: "https://bolt.new", tags: ["fullstack", "browser", "generation"],
      tagline: "Full-stack apps assembled in a browser tab.",
      desc: "Bolt spins up a runnable web stack — front end, back end, database — while you describe the app. You can export the project or deploy from the platform."
    },
    {
      id: "lovable", name: "Lovable", maker: "Lovable", category: "code", pricing: "freemium",
      url: "https://lovable.dev", tags: ["fullstack", "supabase", "generation"],
      tagline: "Idea to full-stack app, chat included.",
      desc: "Lovable generates React apps wired to Supabase, with auth and storage provisioned automatically. It is aimed at founders who want to validate quickly."
    },
    {
      id: "warp", name: "Warp", maker: "Warp", category: "code", pricing: "freemium",
      url: "https://warp.dev", tags: ["terminal", "agent", "devops"],
      tagline: "A terminal that suggests the next command.",
      desc: "Warp modernizes the terminal with blocks, autocomplete, and an agent that explains errors. Teams share workflows and config across machines."
    },

    /* ── Design & Prototyping ─────────────────────────────────────── */
    {
      id: "figma", name: "Figma AI", maker: "Figma", category: "design", pricing: "freemium",
      url: "https://figma.com", tags: ["ui", "generation", "collaboration"],
      tagline: "Design's home base, now with AI features.",
      desc: "Figma AI adds smart renaming, content generation, and prompt-to-prototype features to the editor design teams already live in. The AI tools roll out across seats and plans."
    },
    {
      id: "framer", name: "Framer", maker: "Framer", category: "design", pricing: "freemium",
      url: "https://framer.com", tags: ["websites", "generation", "publish"],
      tagline: "From canvas to published site.",
      desc: "Framer generates layout ideas, drafts copy, and turns a design into a fast production website. Designers publish without waiting on a handoff."
    },
    {
      id: "webflow", name: "Webflow", maker: "Webflow", category: "design", pricing: "freemium",
      url: "https://webflow.com", tags: ["websites", "cms", "no-code"],
      tagline: "The professional no-code web builder.",
      desc: "Webflow pairs visual building with a CMS and hosting for production sites, and its AI features help draft layouts and content. Agencies and marketing teams are its core users."
    },
    {
      id: "canva", name: "Canva", maker: "Canva", category: "design", pricing: "freemium",
      url: "https://canva.com", tags: ["templates", "design", "magic-studio"],
      tagline: "Design for everyone, with a magic toolkit.",
      desc: "Canva's Magic Studio handles background removal, resizing, and copy generation inside templates anyone can edit. The free tier is remarkably capable."
    },
    {
      id: "uizard", name: "Uizard", maker: "Uizard", category: "design", pricing: "freemium",
      url: "https://uizard.io", tags: ["wireframes", "mockups", "prototyping"],
      tagline: "Wireframes to mockups in minutes.",
      desc: "Uizard turns sketches, screenshots, and text prompts into editable wireframes and mockups. It is useful for quick product validation before anyone opens a design tool."
    },
    {
      id: "visily", name: "Visily", maker: "Visily", category: "design", pricing: "freemium",
      url: "https://visily.ai", tags: ["wireframes", "teams", "screenshots"],
      tagline: "Design tooling for teams without designers.",
      desc: "Visily converts screenshots and sketches into editable screens, with templates for common app flows. Product managers and founders use it to communicate ideas."
    },
    {
      id: "spline", name: "Spline", maker: "Spline", category: "design", pricing: "freemium",
      url: "https://spline.design", tags: ["3d", "web", "interactive"],
      tagline: "3D scenes for the web, without a 3D degree.",
      desc: "Spline builds interactive 3D scenes in the browser and exports them for websites and apps. Its AI features help generate objects and materials from prompts."
    },
    {
      id: "motiff", name: "Motiff", maker: "Motiff", category: "design", pricing: "freemium",
      url: "https://motiff.com", tags: ["ui", "editor", "collaboration"],
      tagline: "A UI editor with AI on the side.",
      desc: "Motiff brings collaborative interface design with AI drafting, tidy layers, and reusable design-system pieces. It leans on AI for layout drafts and consistency checks."
    },

    /* ── Productivity & Meetings ──────────────────────────────────── */
    {
      id: "notion", name: "Notion", maker: "Notion", category: "productivity", pricing: "freemium",
      url: "https://notion.com", tags: ["docs", "wiki", "qa"],
      tagline: "The all-in-one workspace, with AI on tap.",
      desc: "Notion AI drafts, summarizes, and answers questions across your docs, wikis, and projects. It is the best value if your team already runs on Notion."
    },
    {
      id: "m365-copilot", name: "Microsoft 365 Copilot", maker: "Microsoft", category: "productivity", pricing: "paid",
      url: "https://microsoft.com/en-us/microsoft-365/copilot", tags: ["office", "documents", "meetings"],
      tagline: "AI woven through Word, Excel, and Teams.",
      desc: "Microsoft 365 Copilot drafts documents, builds spreadsheets, and recaps meetings inside the apps you already use. It requires an add-on to a Microsoft 365 subscription."
    },
    {
      id: "gamma", name: "Gamma", maker: "Gamma", category: "productivity", pricing: "freemium",
      url: "https://gamma.app", tags: ["presentations", "decks", "docs"],
      tagline: "Decks and docs that build themselves.",
      desc: "Gamma turns a prompt or an outline into a polished presentation with flexible blocks and templates. You can export to PowerPoint or present straight from the browser."
    },
    {
      id: "otter", name: "Otter.ai", maker: "Otter.ai", category: "productivity", pricing: "freemium",
      url: "https://otter.ai", tags: ["meetings", "transcription", "notes"],
      tagline: "Meeting notes that write themselves while you talk.",
      desc: "Otter joins your calls, transcribes in real time, and produces summaries with action items you can share. The free tier covers casual use; teams pay for shared folders and integrations."
    },
    {
      id: "fireflies", name: "Fireflies.ai", maker: "Fireflies.ai", category: "productivity", pricing: "freemium",
      url: "https://fireflies.ai", tags: ["meetings", "notes", "crm"],
      tagline: "A meeting assistant that files its own notes.",
      desc: "Fireflies records, transcribes, and summarizes meetings, then pushes action items into Slack, Notion, or your CRM. It remembers across meetings, too."
    },
    {
      id: "fathom", name: "Fathom", maker: "Fathom", category: "productivity", pricing: "freemium",
      url: "https://fathom.video", tags: ["meetings", "notes", "summaries"],
      tagline: "Free meeting recaps, no bot in the room.",
      desc: "Fathom records and summarizes calls while you stay present — no awkward bot attendee. The free tier covers individuals; teams pay for shared libraries."
    },
    {
      id: "granola", name: "Granola", maker: "Granola", category: "productivity", pricing: "freemium",
      url: "https://granola.ai", tags: ["notes", "meetings", "desktop"],
      tagline: "Notes that merge what was said with what you wrote.",
      desc: "Granola sits on your desktop, transcribes meetings quietly, and blends your scribbles with the transcript. It is Mac-first and privacy-minded."
    },
    {
      id: "motion", name: "Motion", maker: "Motion", category: "productivity", pricing: "paid",
      url: "https://usemotion.com", tags: ["calendar", "tasks", "scheduling"],
      tagline: "A calendar that schedules your to-do list.",
      desc: "Motion turns tasks and deadlines into time-blocked calendar events, reshuffling automatically when meetings land. It is built for people whose days keep moving."
    },
    {
      id: "reclaim", name: "Reclaim.ai", maker: "Reclaim", category: "productivity", pricing: "freemium",
      url: "https://reclaim.ai", tags: ["calendar", "habits", "focus"],
      tagline: "Defends time for the work that matters.",
      desc: "Reclaim automates calendars around your priorities — habits, focus blocks, buffer time — across personal and work accounts. Teams use it to surface meeting loads."
    },
    {
      id: "superhuman", name: "Superhuman", maker: "Superhuman", category: "productivity", pricing: "paid",
      url: "https://superhuman.com", tags: ["email", "speed", "triage"],
      tagline: "Email at the speed of thought.",
      desc: "Superhuman's keyboard-first design gets through inboxes fast, and its AI drafts replies and summarizes long threads. It is a premium tool with a devoted following."
    },
    {
      id: "shortwave", name: "Shortwave", maker: "Shortwave", category: "productivity", pricing: "freemium",
      url: "https://shortwave.com", tags: ["email", "assistant", "search"],
      tagline: "Gmail, with an assistant built in.",
      desc: "Shortwave layers AI search, drafting, and scheduling over Gmail so you can ask your inbox questions. Former Google Mail engineers built it."
    },
    {
      id: "raycast", name: "Raycast", maker: "Raycast", category: "productivity", pricing: "freemium",
      url: "https://raycast.com", tags: ["launcher", "macos", "extensions"],
      tagline: "A launcher that grew into an AI command center.",
      desc: "Raycast runs quick AI commands, snippets, and scripts from one keystroke on macOS — no window switching. The extension ecosystem covers everything else."
    },

    /* ── Research & Knowledge ─────────────────────────────────────── */
    {
      id: "perplexity", name: "Perplexity", maker: "Perplexity", category: "research", pricing: "freemium",
      url: "https://perplexity.ai", tags: ["search", "citations", "answers"],
      tagline: "Search with citations, answers instead of links.",
      desc: "Perplexity answers in prose and shows its sources inline, so claims are checkable. Focus modes narrow searches to papers, finance, or your own files."
    },
    {
      id: "notebooklm", name: "NotebookLM", maker: "Google", category: "research", pricing: "free",
      url: "https://notebooklm.google.com", tags: ["notebooks", "sources", "audio-overviews"],
      tagline: "Your sources, turned into a briefing.",
      desc: "NotebookLM grounds every answer in the documents you upload — PDFs, notes, web pages — and can generate study guides or a two-host audio overview. It is a reading companion at heart."
    },
    {
      id: "elicit", name: "Elicit", maker: "Elicit", category: "research", pricing: "freemium",
      url: "https://elicit.com", tags: ["papers", "literature-review", "extraction"],
      tagline: "Literature reviews without the spreadsheet grind.",
      desc: "Elicit scans papers, extracts findings into tables, and summarizes evidence across studies. Academic teams use it to scale up screening."
    },
    {
      id: "consensus", name: "Consensus", maker: "Consensus", category: "research", pricing: "freemium",
      url: "https://consensus.app", tags: ["papers", "evidence", "answers"],
      tagline: "What the studies actually say.",
      desc: "Consensus searches research papers and shows the weight of evidence for a yes-or-no question. Each answer links to the underlying studies."
    },
    {
      id: "scite", name: "Scite", maker: "Scite", category: "research", pricing: "freemium",
      url: "https://scite.ai", tags: ["citations", "papers", "analysis"],
      tagline: "Citation context, not just citation counts.",
      desc: "Scite classifies how papers are cited — supporting, contrasting, or just mentioning — so you can judge influence honestly. It includes a reference manager as well."
    },
    {
      id: "scispace", name: "SciSpace", maker: "SciSpace", category: "research", pricing: "freemium",
      url: "https://scispace.com", tags: ["papers", "reading", "chat"],
      tagline: "A reading room for research papers.",
      desc: "SciSpace explains dense passages, answers questions about PDFs, and formats references. It is good for students working through unfamiliar fields."
    },
    {
      id: "chatpdf", name: "ChatPDF", maker: "ChatPDF", category: "research", pricing: "freemium",
      url: "https://chatpdf.com", tags: ["pdf", "chat", "summaries"],
      tagline: "Ask questions of any PDF, get page-cited answers.",
      desc: "ChatPDF ingests documents and answers with references back to the exact page. Course readings and contracts are the common uses."
    },
    {
      id: "humata", name: "Humata", maker: "Humata", category: "research", pricing: "freemium",
      url: "https://humata.ai", tags: ["documents", "analysis", "qa"],
      tagline: "Interrogate long documents, get cited answers.",
      desc: "Humata summarizes technical papers and reports, extracts tables, and answers questions with citations. It is built for due-diligence style reading."
    },
    {
      id: "litmaps", name: "Litmaps", maker: "Litmaps", category: "research", pricing: "freemium",
      url: "https://litmaps.com", tags: ["maps", "citations", "discovery"],
      tagline: "Watch a research field grow as a map.",
      desc: "Litmaps visualizes citation networks so you can see which papers shaped a topic and what is new. You spot gaps by exploring the neighborhood around key works."
    },
    {
      id: "researchrabbit", name: "ResearchRabbit", maker: "ResearchRabbit", category: "research", pricing: "free",
      url: "https://researchrabbit.ai", tags: ["maps", "recommendations", "papers"],
      tagline: "Citation rabbit holes, finally organized.",
      desc: "ResearchRabbit recommends papers from your starting list and maps connections between authors and works. It is a free discovery tool for graduate students."
    },

    /* ── Automation & Agents ──────────────────────────────────────── */
    {
      id: "zapier", name: "Zapier", maker: "Zapier", category: "automation", pricing: "freemium",
      url: "https://zapier.com", tags: ["integrations", "workflows", "no-code"],
      tagline: "Connect the apps you already use.",
      desc: "Zapier wires thousands of tools together with triggers and actions, and its AI drafts workflows from plain descriptions. It is a long-time staple for no-code automation."
    },
    {
      id: "make", name: "Make", maker: "Make", category: "automation", pricing: "freemium",
      url: "https://make.com", tags: ["workflows", "visual", "integrations"],
      tagline: "Visual automation for ambitious workflows.",
      desc: "Make gives you a canvas to design complex flows with routers, filters, and error handling. It offers more depth than simple trigger-action tools, less code than scripts."
    },
    {
      id: "n8n", name: "n8n", maker: "n8n", category: "automation", pricing: "freemium",
      url: "https://n8n.io", tags: ["workflows", "self-hosted", "automation"],
      tagline: "Workflow automation you can host yourself.",
      desc: "n8n blends visual building with code steps and runs on your own servers, keeping data in-house. Developers appreciate the escape hatch."
    },
    {
      id: "lindy", name: "Lindy", maker: "Lindy", category: "automation", pricing: "freemium",
      url: "https://lindy.ai", tags: ["assistants", "email", "scheduling"],
      tagline: "Email and scheduling assistants that persist.",
      desc: "Lindy builds AI teammates for inbox triage, meeting scheduling, and follow-ups that remember context between runs. You start from templates and adjust."
    },
    {
      id: "relay", name: "Relay.app", maker: "Relay.app", category: "automation", pricing: "freemium",
      url: "https://relay.app", tags: ["workflows", "approvals", "teams"],
      tagline: "Workflows with humans in the loop.",
      desc: "Relay.app automates processes that need approvals and human checkpoints, with clear run histories. Teams use it for onboarding and content pipelines."
    },
    {
      id: "gumloop", name: "Gumloop", maker: "Gumloop", category: "automation", pricing: "freemium",
      url: "https://gumloop.com", tags: ["workflows", "scrapers", "data"],
      tagline: "Automation for scrapers and data flows.",
      desc: "Gumloop strings together web scrapers, AI steps, and spreadsheets for data-heavy workflows. It is popular with growth and research teams."
    },
    {
      id: "relevance-ai", name: "Relevance AI", maker: "Relevance AI", category: "automation", pricing: "freemium",
      url: "https://relevanceai.com", tags: ["agents", "teams", "tools"],
      tagline: "Build a team of AI agents for work.",
      desc: "Relevance AI assembles agents with tools and distinct roles — researcher, writer, analyst — that hand off tasks to each other. It is aimed at teams automating whole functions."
    },
    {
      id: "devin", name: "Devin", maker: "Cognition", category: "automation", pricing: "paid",
      url: "https://cognition.ai", tags: ["coding-agent", "autonomous", "software"],
      tagline: "An autonomous engineer you assign tickets.",
      desc: "Devin plans and executes coding tasks — writing, testing, and submitting pull requests — while you review. Pricing is aimed at teams automating routine engineering work."
    },
    {
      id: "autogpt", name: "AutoGPT", maker: "Significant Gravitas", category: "automation", pricing: "free",
      url: "https://agpt.co", tags: ["open-source", "agents", "experiments"],
      tagline: "The open-source spark of the agent movement.",
      desc: "AutoGPT chains model calls into goal-seeking loops and hosts an accessible builder for agent apps. It is a community project that launched a thousand experiments."
    },
    {
      id: "manus", name: "Manus", maker: "Manus", category: "automation", pricing: "paid",
      url: "https://manus.im", tags: ["agents", "tasks", "autonomous"],
      tagline: "A general agent that runs errands.",
      desc: "Manus browses, researches, and completes multi-step tasks — reports, bookings, analyses — in its own cloud environment. Access is gated through its platform."
    }
  ]
};
