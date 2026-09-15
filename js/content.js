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
    file: "assets/Latest Resume.pdf",
    preview: "assets/resume-preview.jpg",
  },

  current: {
    // "owner/repo" — the feed pulls live commits from here.
    repo: "mussiebeyene/PutYouOn",
    title: "AI Cafe Finder",
    overview:
      "Find cafes based on your vibe, work setup, noise level, seating, outlets, WiFi, and what your friends recommend.",

    features: [
      "Preference matching",
      "Friend recs",
      "Map filters",
      "\"Best for studying / working / dates\" labels",
    ],

    stack: ["React", "Google Maps API", "Supabase", "OpenAI API"],

    sketches: [
      { src: "assets/current/sketch-1.svg", caption: "Sketch" },
      { src: "assets/current/sketch-2.svg", caption: "Sketch" },
    ],

    // The lock fills as these get marked done. Flip done to true as you go.
    milestones: [
      { label: "Scope and sketches", done: false },
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
        date: "2026-09-14",
        title: "Picking the stack",
        text: "Went back and forth between Firebase and Supabase and landed on Supabase, mostly because I want real SQL for the cafe and recommendation tables. Postgres row level security also means friend recs can stay private without me hand-rolling permissions.",
      },
      {
        date: "2026-09-13",
        title: "The noise problem",
        text: "The hard part isn't the map, it's the data. Nobody publishes whether a cafe is loud at 3pm on a Tuesday. Thinking the first version leans on friend submissions, then uses the AI pass to turn messy notes into the studying / working / dates labels.",
      },
      {
        date: "2026-09-12",
        title: "Why I'm building this",
        text: "I've spent too many afternoons walking into a cafe with my laptop only to find no outlets and one tiny table. If I can get this right for UCLA and Santa Monica first, it should generalize anywhere.",
      },
    ],

    // Full TikTok post URLs. Day labels come from the order.
    tiktoks: [
      {
        day: 1,
        url: "https://www.tiktok.com/@mooselocksin/photo/7685279464602832158",
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
