export interface Project {
  id: string;
  number: string;
  title: string;
  roleType: 'Solo' | 'Team project' | 'Internship';
  yourRole?: string;
  tagline: string;
  description: string;
  bullets: string[];
  stack: string[];
  date: string;
  repoUrl?: string;
  liveUrl?: string;
  highlightMetric?: string;
  award?: string;
  featured: boolean;
  graphicId: string;
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
  category: 'Education' | 'Research' | 'Internship' | 'Leadership' | 'Project';
}

export interface SkillGroup {
  category: string;
  skills: { name: string; projectIds: string[] }[];
}

export const SITE_CONTENT = {
  meta: {
    name: "Tiya Garg",
    role: "AI/ML & Distributed Systems",
    institution: "ECE (AI) · IGDTUW, New Delhi",
    location: "New Delhi, India",
    headline: "Third-year ECE (AI) undergraduate building distributed systems, real-time backends, and AI pipelines.",
    target: "Summer 2027 SWE & AI/ML internships (startup-friendly)",
    email: "tiyagarg0706@gmail.com",
    linkedin: "https://linkedin.com/in/tiya-garg-a72b2931a",
    github: "https://github.com/Tiya-Garg",
    resume: "https://drive.google.com/file/d/1-Rw1Hzf3HRx0KZc81MScnAR5xbbV0ffL/view?usp=sharing",
    repoName: "Tiya-Garg/Portfolio"
  },

  hero: {
    kicker: "ECE × AI · IGDTUW, NEW DELHI",
    titleLine1: "TIYA",
    titleLine2: "GARG",
    badgeText: "LET'S BUILD · LET'S BUILD · ",
    pitch: "I build distributed systems, real-time backends and AI pipelines — from a Go scheduler that survives node failure to multi-agent market simulations.",
    statusPill: "Open to Summer 2027 SWE & AI/ML internships",
    ctaPrimary: "See the work",
    ctaSecondary: "Résumé ↗"
  },

  marqueeItems: [
    "DISTRIBUTED SYSTEMS ✦",
    "GO ✦",
    "MULTI-AGENT SIMULATION ✦",
    "NLP / GENAI ✦",
    "OPTIMIZATION ✦",
    "REAL-TIME BACKENDS ✦",
    "FAULT TOLERANCE ✦",
    "CONSTRAINED OPTIMIZATION ✦"
  ],

  projects: [
    {
      id: "distribuq",
      number: "01",
      title: "DistribuQ",
      roleType: "Solo",
      tagline: "Fault-tolerant distributed task scheduler over net/rpc with Raft-inspired leader election",
      description: "A resilient distributed task scheduling runtime in Go featuring active leader election, heartbeat liveness tracking, least-loaded worker dispatch, and automated orphaned-task reassignment.",
      bullets: [
        "Architected Raft-inspired leader election and failure recovery across dynamic worker node pools.",
        "Implemented least-loaded task dispatch algorithm and automatic orphaned-task reassignment via net/rpc.",
        "Engineered modular Transport interface allowing plug-and-play gRPC migration without touching core scheduler logic.",
        "Validated with 6 automated tests covering election, re-election, uniform dispatch, and failover."
      ],
      stack: ["Go", "net/rpc", "Concurrency", "Distributed Systems", "Testing"],
      date: "Jun 2026 → present",
      repoUrl: "https://github.com/Tiya-Garg/DistribuQ",
      featured: true,
      graphicId: "distribuq"
    },
    {
      id: "freqbridge",
      number: "02",
      title: "FreqBridge",
      roleType: "Team project",
      yourRole: "Integrated live weather feeds and debugged swing-equation ODE propagation, converter-capacity constraints, and agent-count edge cases in the clearing engine.",
      award: "Top 6% internationally (250 of 4,000+ teams) · FAR AWAY 2026 (Zuup)",
      tagline: "Decentralized multi-agent energy market for Japan's 50 Hz / 60 Hz split grid",
      description: "Decentralized microgrid market where independent autonomous agents execute double auctions over a fixed 1.2 GW HVDC converter link, dynamically driven by live Open-Meteo weather telemetries.",
      bullets: [
        "Interfaced real-time Open-Meteo meteorological API feeds to drive dynamic renewable supply/demand curves.",
        "Debugged swing-equation ODE propagation mechanics and numerical stability across asynchronous grid domains.",
        "Resolved converter-capacity constraint limits and agent-count clearing bottlenecks under extreme load.",
        "Tested recovery speed under sudden grid dip: multi-agent clearing stabilized in ≈12 s vs PID baseline ≈47 s (≈3.9× / ~74% faster from project testing)."
      ],
      stack: ["Python", "FastAPI", "WebSockets", "SQLite", "Open-Meteo", "ODE"],
      date: "Jul 2026",
      repoUrl: "https://github.com/TiyaGarg06/FreqBridge-",
      highlightMetric: "≈12 s recovery vs ≈47 s baseline (~74% faster)",
      featured: true,
      graphicId: "freqbridge"
    },
    {
      id: "eventguard",
      number: "03",
      title: "EventGuard",
      roleType: "Solo",
      tagline: "Real-time Bengaluru traffic incident command and multi-objective capacity allocation",
      description: "Incident command platform combining a live Leaflet.js map HUD with a mathematical knapsack engine allocating scarce police barricades and personnel across 15 high-burden traffic jurisdictions.",
      bullets: [
        "Built responsive Flask REST API and live Leaflet.js tactical command map-HUD.",
        "Formulated PuLP multi-objective knapsack optimization model balancing budget limits, resource scarcity, and spatial coverage constraints.",
        "Calibrated algorithm on a curated 4-month incident dataset across 15 high-congestion Bengaluru police zones.",
        "Designed real-time shockwave alert perimeter tracking congestion ripple effects."
      ],
      stack: ["Flask", "Leaflet.js", "PuLP", "Python", "Spatial Optimization"],
      date: "Jun 2026",
      repoUrl: "https://github.com/Tiya-Garg/EventGuard",
      featured: true,
      graphicId: "eventguard"
    },
    {
      id: "lipiverse",
      number: "04",
      title: "LipiVerse",
      roleType: "Internship",
      yourRole: "Generative AI Intern, IGDTUW",
      tagline: "Emotion-preserving multilingual poem translation across 3 Indian language pairs",
      description: "Structured prompt orchestration pipelines and transformer inference workflows preserving cultural nuance, emotional cadence, and meter across Indic language pairs.",
      bullets: [
        "Designed structured multi-stage prompt synthesis pipelines minimizing semantic drift in poetic translation.",
        "Evaluated translation fidelity across 3 Indian language pairs against baseline zero-shot prompting.",
        "Analyzed cross-lingual emotional alignment using qualitative sentiment scoring."
      ],
      stack: ["Transformers", "Prompt Engineering", "NLP Pipelines", "LLMs"],
      date: "Jun–Jul 2025",
      featured: true,
      graphicId: "lipiverse"
    },
    {
      id: "exvero",
      number: "05",
      title: "Ex-Vero",
      roleType: "Team project",
      yourRole: "[TIYA TO CONFIRM — her actual contribution]",
      award: "Top 1% — Top 15 of 1,631 teams · Code Cubicle 6.0 (Geekroom)",
      tagline: "Offline-first edge memory layer on Qdrant with trust-weighted conflict resolution",
      description: "On-device hybrid dense + BM25 search and local RAG with delta synchronization to a central hub that resolves factual conflicts via confidence-weighted consensus and explicit DISPUTED flags.",
      bullets: [
        "Hybrid dense + BM25 retrieval pipeline operating completely offline on edge devices.",
        "Delta synchronization protocol reconciling concurrent updates with confidence scoring.",
        "Explicit DISPUTED resolution states preventing hallucination cascades across peer nodes."
      ],
      stack: ["Python", "FastAPI", "Qdrant", "fastembed", "CLIP", "Ollama", "React", "Docker"],
      date: "2026",
      repoUrl: "https://github.com/KA-1205/Ex-Vero",
      featured: false,
      graphicId: "exvero"
    },
    {
      id: "panchnama",
      number: "06",
      title: "Panchnama",
      roleType: "Team project",
      yourRole: "[TIYA TO CONFIRM — her actual contribution]",
      award: "Top 1.1% — Top 10 of 879 teams · Pixels to Products (Cloudinary AI Hackathon 2026)",
      tagline: "Tamper-evident cryptographic evidence pipeline for NGO field captures",
      description: "Secure visual evidence verification protocol featuring Ed25519 capture signing, SHA-256 hash chains, and computer vision change detection (YOLOv8 + ChangeFormer).",
      bullets: [
        "Cryptographic Ed25519 hardware key signing at the point of capture.",
        "SHA-256 verifiable immutable audit ledger ensuring zero image alteration.",
        "Automated YOLOv8 and ChangeFormer metric analysis for authentic temporal change assessment."
      ],
      stack: ["Ed25519", "SHA-256", "YOLOv8", "ChangeFormer", "Python", "Cloudinary"],
      date: "2026",
      repoUrl: "https://github.com/HackIndiaXYZ/pixels-to-products-cloudinary-ai-hackathon-2026-chaarwizards",
      featured: false,
      graphicId: "panchnama"
    },
    {
      id: "secondshift",
      number: "07",
      title: "The Second Shift",
      roleType: "Team project",
      yourRole: "[TIYA TO CONFIRM — her actual contribution]",
      award: "Advanced to Round 2 · Google Build with Gemini",
      tagline: "AI career re-entry coach and dynamic skill gap matching for women returning to tech",
      description: "Empowering career re-entry through automated skill gap diagnostics, tailored learning roadmaps, and semantic job embedding similarity matching.",
      bullets: [
        "Integrated Gemini API for customized career diagnostic interviews and actionable roadmaps.",
        "Leveraged Sentence-Transformers for semantic vector alignment between candidate profiles and job roles.",
        "Built responsive interactive progress dashboard with React, Vite, and Tailwind."
      ],
      stack: ["Gemini API", "Sentence-Transformers", "React", "Vite", "TypeScript", "Tailwind"],
      date: "2026",
      repoUrl: "https://github.com/KA-1205/The-Second-Shift",
      liveUrl: "https://thesecondshift.vercel.app/",
      featured: false,
      graphicId: "secondshift"
    }
  ] as Project[],

  about: {
    heading: "Third-year ECE (AI) student who likes systems that don't fall over.",
    bioParagraph1: "GenAI and NLP on one side; real-time backends, market simulations and constrained optimization on the other. I learn fastest by building alongside talented engineers and shipping robust software before the clock runs out.",
    bioParagraph2: "Currently seeking Summer 2027 SWE and AI/ML internship opportunities at fast-moving startups where I can take ownership of core infrastructure and ship meaningful products.",
    polaroidCaption: "IGDTUW MUN · New Delhi",
    stats: [
      { label: "Hackathon Top-Tier Results", value: "3", suffix: "" },
      { label: "Code Cubicle 6.0", value: "Top 1%", suffix: "" },
      { label: "Pixels to Products", value: "Top 1.1%", suffix: "" },
      { label: "FAR AWAY 2026", value: "Top 6%", suffix: "" },
      { label: "CGPA (IGDTUW)", value: "7.76", suffix: "", note: "[TIYA TO CONFIRM display]" }
    ],
    milestones: [
      { date: "Aug 2024", title: "B.Tech in ECE (AI)", description: "Began studies at Indira Gandhi Delhi Technical University for Women (IGDTUW).", category: "Education" },
      { date: "Jan 2025", title: "Antenna Research", description: "Engineered 47 GHz V-band microstrip patch antenna with optimized slot geometry in Ansys HFSS.", category: "Research" },
      { date: "Jun 2025", title: "GenAI Intern", description: "Engineered emotion-preserving multilingual translation pipelines (LipiVerse) at IGDTUW.", category: "Internship" },
      { date: "Jul 2025", title: "Media Head", description: "Elected Media Head at BHAV Society, directing creative design and digital reach.", category: "Leadership" },
      { date: "Feb 2026", title: "Deputy Director General", description: "Served as DDG for IGDTUW Model United Nations 2026.", category: "Leadership" },
      { date: "Mid 2026", title: "Hackathon Tier Finishes", description: "Achieved Top 1% (Code Cubicle), Top 1.1% (Cloudinary AI), Top 6% (FAR AWAY 2026).", category: "Project" },
      { date: "Jun 2026+", title: "DistribuQ Core Architecture", description: "Building fault-tolerant distributed scheduler in Go with Raft-inspired consensus.", category: "Project" }
    ] as Milestone[],
    beyondCode: "Outside the terminal, I served as Deputy Director General at IGDTUW MUN 2026 and Media Head of BHAV Society. I am passionate about public speaking, diplomacy, long hikes, and high-altitude mountain adventures."
  },

  research: {
    badge: "CH 04 · RESEARCH",
    title: "Design and Analysis of a Slot-Modified Rectangular Patch Antenna",
    subtitle: "Jan 2025 · 47 GHz V-band High-Frequency Microstrip Antenna",
    abstract: "Engineered and numerically simulated a 47 GHz V-band microstrip patch antenna in Ansys HFSS. Systematically optimized slot geometry and ground plane parameters to achieve enhanced radiation efficiency, wide bandwidth, and sharp directional return loss characteristics for millimeter-wave communications.",
    note: "Illustrative visualisation, not direct HFSS simulation output.",
    sliderLabel: "Slot Length (mm):"
  },

  toolkit: {
    badge: "CH 05 · TOOLKIT",
    title: "The Patch Bay",
    subtitle: "Interactive skill matrix. Hover any jack or project to trace interconnecting signal cables.",
    groups: [
      {
        category: "Languages",
        skills: [
          { name: "Python", projectIds: ["freqbridge", "eventguard", "exvero", "panchnama"] },
          { name: "Go", projectIds: ["distribuq"] },
          { name: "C++", projectIds: [] },
          { name: "C", projectIds: [] },
          { name: "SQL", projectIds: ["freqbridge"] },
          { name: "JavaScript / TypeScript", projectIds: ["secondshift", "eventguard", "exvero"] }
        ]
      },
      {
        category: "Backend & Systems",
        skills: [
          { name: "FastAPI", projectIds: ["freqbridge", "exvero"] },
          { name: "Flask", projectIds: ["eventguard"] },
          { name: "net/rpc", projectIds: ["distribuq"] },
          { name: "WebSockets", projectIds: ["freqbridge"] },
          { name: "REST APIs", projectIds: ["eventguard", "freqbridge", "exvero"] },
          { name: "Distributed Scheduling", projectIds: ["distribuq"] }
        ]
      },
      {
        category: "ML / AI & Pipelines",
        skills: [
          { name: "Transformers", projectIds: ["lipiverse", "secondshift"] },
          { name: "Prompt Engineering", projectIds: ["lipiverse"] },
          { name: "Sentence-Transformers", projectIds: ["secondshift"] },
          { name: "Qdrant Vector DB", projectIds: ["exvero"] },
          { name: "scikit-learn", projectIds: ["freqbridge"] },
          { name: "LightGBM / CatBoost", projectIds: [] },
          { name: "Vertex AI / Gemini API", projectIds: ["secondshift"] }
        ]
      },
      {
        category: "Optimization & Geo",
        skills: [
          { name: "PuLP (Knapsack)", projectIds: ["eventguard"] },
          { name: "NetworkX", projectIds: ["eventguard"] },
          { name: "Leaflet.js", projectIds: ["eventguard"] },
          { name: "Numerical ODEs", projectIds: ["freqbridge"] }
        ]
      },
      {
        category: "Tools & DevOps",
        skills: [
          { name: "Git", projectIds: ["distribuq", "freqbridge", "eventguard", "exvero", "panchnama", "secondshift"] },
          { name: "Docker", projectIds: ["exvero"] },
          { name: "Google Cloud Platform", projectIds: ["secondshift"] },
          { name: "Ansys HFSS", projectIds: [] }
        ]
      }
    ] as SkillGroup[]
  },

  contact: {
    badge: "CH 06 · TRANSMISSION",
    heading: "Let's build something that holds under load.",
    subheading: "Whether you're building resilient backend infrastructure, autonomous agent simulations, or high-performance ML workflows — my inbox is open.",
    email: "tiyagarg0706@gmail.com",
    toastMessage: "Copied. Signal locked.",
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/tiya-garg-a72b2931a", handle: "tiya-garg-a72b2931a" },
      { name: "GitHub", url: "https://github.com/Tiya-Garg", handle: "@Tiya-Garg" },
      { name: "Résumé", url: "https://drive.google.com/file/d/1-Rw1Hzf3HRx0KZc81MScnAR5xbbV0ffL/view?usp=sharing", handle: "Google Drive ↗" }
    ],
    footer: "© 2026 Tiya Garg · Signal v2 · All systems nominal."
  },

  avatarQuotes: [
    "Ask me about leader election.",
    "That card is hiring-ready.",
    "Press S for sound.",
    "DistribuQ: 0 orphaned tasks.",
    "FreqBridge: 50Hz ⟷ 60Hz balanced.",
    "Signal locked at 47 GHz."
  ]
};

