/* Replace the values in this file with your real details. */

const content = {
  name: "Mussie Beyene",
  role: "ሙሴ በየነ",
  avatar: "assets/avatar.jpg",

  social: {
    github: "https://github.com/mussiebeyene",
    linkedin: "https://https://www.linkedin.com/in/mussie-beyene-155014306/",
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
