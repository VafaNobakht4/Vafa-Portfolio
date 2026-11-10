// All the text on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Vafa Nobakht",
  firstName: "Vafa",
  role: "Full-Stack Developer",
  years: "4+",
  location: "Mazandaran, Iran",
  shortLocation: "Mazandaran, IR",
  timeZone: "Asia/Tehran",
  timeZoneLabel: "IRST",
  utcOffset: "UTC+3:30",
  email: "vafa.nobakht4@gmail.com",
  github: "https://github.com/VafaNobakht4",
  githubHandle: "@VafaNobakht4",
  linkedin: "https://www.linkedin.com/in/vafa-nobakht",
  resume: "/VafaNobakht-Resume.pdf",
  avatar: "/avatar.jpg",
};

// Words that rotate in the hero: "I build ___ for the web."
export const heroWords = [
  "interfaces",
  "experiences",
  "applications",
  "websites",
];

export const aboutFacts = [
  { label: "location", value: profile.location },
  { label: "role", value: profile.role },
  { label: "focus", value: "React · Next.js · TypeScript" },
  { label: "status", value: "open to work", highlight: true },
];

export const now = {
  learning: [
    { text: "Next.js Server Actions & caching", status: "in progress" },
    { text: "Django REST + PostgreSQL search", status: "in progress" },
    { text: "Testing with Playwright", status: "up next" },
  ],
  building: {
    name: "Parsa Shop",
    text: "a white-label online store platform, my newest full-stack build.",
  },
  nextUp: [
    "Launch more stores on the shop platform",
    "Contribute to open source",
    "Grow into a senior frontend role",
  ],
  dailyDrivers: ["React", "Next.js", "TypeScript", "Tailwind", "Django", "Git"],
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "Present",
    role: "Full-Stack Developer",
    company: "Freelance",
    summary:
      "Designing and shipping production websites for clients in Iran and Australia — from marketing sites to a white-label shop platform with a Next.js storefront and a Django REST backend.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Django", "Docker"],
  },
  {
    period: "3.5 years",
    role: "React / Next.js Developer",
    company: "Private Company",
    summary:
      "Built and maintained responsive, user-friendly web apps in an Agile / Scrum team. Integrated REST APIs, managed state with Redux and Zustand, and shipped multilingual UIs with i18next.",
    tags: ["React", "Next.js", "TypeScript", "Redux", "Ant Design", "i18next"],
  },
  {
    period: "2 months",
    role: "Frontend Intern",
    company: "Private Company",
    summary:
      "Started professionally with React and TypeScript — building UI components, consuming REST APIs and working with Git in a team.",
    tags: ["React", "TypeScript", "Git"],
  },
  {
    period: "3 months",
    role: "Flutter Intern",
    company: "Private Company",
    summary: "Built mobile UI screens with Flutter and Dart.",
    tags: ["Flutter", "Dart"],
  },
  {
    period: "2.5 years",
    role: "Mathematics Teacher",
    company: "Self-employed",
    summary:
      "Taught mathematics — where I learned to break hard problems into small, clear steps. It still shapes how I write and explain code.",
    tags: ["Problem solving", "Communication"],
  },
  {
    period: "2018 — 2023",
    role: "B.Sc. Computer Engineering",
    company: "BIHE University",
    summary:
      "Ranked 618th in the national university entrance exam (math). Built projects like Intern Finder (React + Django) along the way.",
    tags: ["Algorithms", "Java", "Django", "MySQL"],
  },
];

export type Project = {
  name: string;
  url: string;
  repo?: string;
  description: string;
  tech: string[];
};

// The first three are shown on the home page; all of them on /projects.
export const projects: Project[] = [
  {
    name: "Parsa Shop",
    url: "https://91-107-148-167.sslip.io:8443/",
    description:
      "A white-label online store platform: one codebase, deployed per client from a single config file. Persian (RTL) and English storefronts, phone OTP login, product search, cart and order invoices.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "Django REST",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    name: "Oakleigh Luxe Floors",
    url: "https://oakleigh-luxe-floors.vercel.app/",
    description:
      "Marketing site for a Melbourne flooring company. Smooth scroll animations and an enquiry form handled by a Server Action with validation, rate limiting and email delivery.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Framer Motion"],
  },
  {
    name: "Arsham Design",
    url: "https://arshamdesign.ir/",
    description:
      "A Persian (RTL) portfolio for an interior designer — showcasing kitchen cabinet, wardrobe and closet designs and renders, with light and dark themes.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
  },
  {
    name: "Eastern Melbourne Carpentry",
    url: "https://emcarpentry.com.au/",
    description:
      "Business website for a carpentry company in Melbourne, built on WordPress so the owner can edit services and content without code.",
    tech: ["WordPress", "Elementor Pro", "PHP", "Swiper"],
  },
  {
    name: "Shop Store",
    url: "https://shop-store-psi.vercel.app/",
    repo: "https://github.com/VafaNobakht4/Shop-store",
    description:
      "A simple store that lists products, shows product details, and has a shopping cart and search.",
    tech: ["Next.js", "TypeScript", "Zustand", "Material UI"],
  },
  {
    name: "Divar Clone",
    url: "https://github.com/VafaNobakht4/vafa-divar-frontend",
    repo: "https://github.com/VafaNobakht4/vafa-divar-frontend",
    description:
      "A classifieds marketplace inspired by Divar for buying and selling items, with a separate Django backend.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Radix UI", "Django"],
  },
  {
    name: "Intern Finder",
    url: "https://github.com/VafaNobakht4/Intern-finder-front",
    repo: "https://github.com/VafaNobakht4/Intern-finder-front",
    description:
      "A platform where students find internships and companies search for interns by salary and requirements.",
    tech: ["React", "Redux Toolkit", "Ant Design", "Formik", "Django"],
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Zustand",
  "Tailwind CSS",
  "shadcn/ui",
  "Material UI",
  "Ant Design",
  "Framer Motion",
  "i18next",
  "SWR",
  "REST API",
  "Stripe.js",
  "Django REST",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "WordPress",
  "Git",
  "Agile / Scrum",
];

// Lines the animated terminal "types" on the home page
export const terminalLines = [
  { kind: "cmd", text: "whoami" },
  {
    kind: "out",
    text: "vafa-nobakht — full-stack developer, frontend at heart",
  },
  { kind: "cmd", text: "focus --current" },
  { kind: "out", text: "React · Next.js · TypeScript · Tailwind" },
  { kind: "cmd", text: "ls ./projects" },
  {
    kind: "out",
    text: "parsa-shop/  oakleigh-floors/  arsham-design/  emc-carpentry/",
  },
  { kind: "cmd", text: "uptime" },
  {
    kind: "out",
    text: `${profile.years} years of building things — still curious`,
  },
  { kind: "cmd", text: "hire --check" },
  { kind: "out", text: "available ✓" },
] as const;
