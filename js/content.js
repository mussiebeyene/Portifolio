/* Replace the values in this file with your real details. */

const content = {
  name: "Mussie Beyene",
  role: "ሙሴ በየነ",
  avatar: "assets/avatar.jpg",

  social: {
    github: "https://github.com/mussiebeyene",
    linkedin: "https://www.linkedin.com/in/mussie-beyene-155014306/",
    email: "mussieyonatan3@gmail.com",
  },

  about: {
    overview:
      "My name is Mussie Beyene, I am an aspiring Machine Learning Engineer with a passion for building scalable and sentimental end to end projects. I study Math of Computation at UCLA with a expected graduation date of June 2028. ",
    hobbies:
      "Outside of work I love hanging out with my girlfriend as she's my emotional support animal🤣. I love spending time with my family. I love trying new coffee and matcha shops. Idc if I'm performative🤣💀. I love playing soccer!! HALA MADRID!! I love lifting, watching movies and I am really into filmmaking. I also love grinding DSA problems LC150, NC150 bring it on!!",
    media: [
      { type: "image", src: "assets/hobbies/01.jpg" },
      { type: "image", src: "assets/hobbies/02.jpg" },
      { type: "image", src: "assets/hobbies/03.jpg" },
      { type: "image", src: "assets/hobbies/04.jpg" },
      { type: "video", src: "assets/hobbies/05.mp4" },
    ],
  },

  resume: {
    file: "assets/Latest Resume (1) copy.pdf",
    preview: "assets/resume-preview.jpg",
  },

  current: {
    // "owner/repo" — the feed pulls live commits from here.
    repo: "mussiebeyene/PutYouOn",
    title: "PutYouOn☕️😛",
    overview:
      "A cafe finder that filters spots based on your vibe, work setup, noise level, seating, outlets, WiFi, and what your friends recommend. ",

    features: [
      "Preference matching",
      "Friend recs",
      "Map filters",
      "\"Best for studying / working / dates\" labels",
    ],

    stack: ["React", "Google Maps API", "Supabase", "OpenAI API"],

    sketches: [
      { src: "assets/current/IMG_0626.jpg", caption: "Sketch" },
      { src: "assets/current/899.jpg", caption: "Sketch" },
    ],

    // The lock fills as these get marked done. Flip done to true as you go.
    milestones: [
      { label: "Scope and sketches", done: true },
      { label: "Cafe data model", done: false },
      { label: "Maps + filters", done: false },
      { label: "Preference matching", done: false },
      { label: "Friend recs", done: false },
      { label: "AI labels", done: false },
      { label: "Ship v1", done: false },
    ],

    // Your own written updates. These merge with live commits in the feed.
    notes: [
      {
        date: "2026-09-14",
        text: "Scoping the cafe finder — settling on React with Supabase for data and the Google Maps API for the filterable map view.",
      },
    ],

    // Placeholder entries — rewrite these in your own voice.
    journal: [
      {
        date: "2026-09-16",
        title: "My day today",
        text: "It was actuallly a pretty productive day. I didn't finish everything I wanted to but still got a lot done. Overall a good day, plus I'm seeing my girlfriend today!!",
      },
      {
        date: "2026-09-15",
        title: "First day at CodePath",
        text: "I got insanely humbled by the amount of knowledge and practice I need to catch up to. It's going to be a long journey but hopefully its worth it. We stay strong and keep grinding! God bless!",
      },
      {
        date: "2026-09-14",
        title: "Picking the stack",
        text: "For my current project, I got the inspiration from @itsellagonzales on IG. The stacks to be used are a rough draft so far with some changes here and there. ",
      },
      {
        date: "2026-09-13",
        title: "My day today",
        text: "It wasnt much happening to be honest. Understood that sleep is a non negotiable when it comes to work and productivity.",
      },
      {
        date: "2026-09-12",
        title: "Why I'm building this",
        text: "I've spent too many afternoons walking into a cafe with my laptop only to find no outlets and one tiny table. So I definitly need this app to help me find the perfect spot to work from.",
      },
    ],

    // Full TikTok post URLs. Day labels come from the order.
    tiktoks: [
      {
        day: 5,
        url: "",
      },
      {
        day: 4,
        url: "https://www.tiktok.com/@mooselocksin/photo/7685673591832153374",
      },
      {
        day: 3,
        url: "https://www.tiktok.com/@mooselocksin/photo/7685279464602832158",
      },
      {
        day: 2,
        url: "https://www.tiktok.com/@mooselocksin/photo/7684886452911557918",
      },
      {
        day: 1,
        url: "https://www.tiktok.com/@mooselocksin/photo/7684538444009213197",
      },
    ],
  },

  projects: [
    {
      title: "Anniversary Project",
      summary:
        "A full-stack web application designed to preserve and explore me and my girlfriend's shared history through an interactive visual timeline and an AI-powered conversational assistant. The landing page features a clean, winding path that guides visitors through key milestone memories alongside an embedded music player playing curated favorite songs. Under the hood, the platform ingests and structures over 27,000+ iMessage records from raw SQLite database files into contextual 30-minute session blocks. Powered by a hybrid RAG backend combining ChromaDB vector embeddings and BM25 keyword search, the chatbot accurately answers fine-grained, date-sensitive queries about past messages, dates, and milestones.",
      video: "assets/projects/project-one.mp4",
      stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "OpenAI" , "RAG"],
      demo: "https://example.com",
      code: "https://github.com/mussiebeyene/Anniversary-Project",
    },
    {
      title: "Project Two",
      summary:
        "Still in the works type shi",
      image: "assets/projects/project-two.svg",
      stack: ["TBD"],
      demo: "https://example.com",
      code: "https://github.com/your-handle/project-two",
    },
  ],
};
