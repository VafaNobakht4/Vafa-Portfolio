import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "../components/Reveal";
import { PageHeader, SectionTitle } from "../components/SectionTitle";
import { profile } from "../data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `About — ${profile.name}` }] }),
  component: AboutPage,
});

const learningNow = [
  {
    title: "Backend development",
    text: "Django REST, PostgreSQL and Redis — designing APIs, data models and authentication, not just consuming them from the frontend.",
  },
  {
    title: "UI/UX design",
    text: "User research, wireframes and prototypes in Figma, design systems and accessibility — designing great experiences before building them.",
  },
  {
    title: "CI/CD & DevOps",
    text: "Automated pipelines with GitHub Actions — linting, tests and builds on every push, Docker images, and safe, zero-downtime deploys to production.",
  },
  {
    title: "The whole software lifecycle",
    text: "Architecture, testing, code review and monitoring — growing from a frontend specialist into an engineer who can own a product end to end.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32">
      <PageHeader eyebrow="who am i" title="About me" />

      <Reveal>
        <div className="mt-12 flex flex-col items-start gap-8 sm:flex-row">
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width={240}
            height={240}
            className="rounded-full border border-border object-cover"
          />
          <div>
            <p className="max-w-xl leading-relaxed text-muted">
              Hi, I'm {profile.firstName} — a full-stack developer from Iran
              with {profile.years} years of experience. I love building clean,
              responsive interfaces with React and Next.js, and I'm comfortable
              going down the stack to Django, databases and deployment when a
              project needs it.
            </p>
            <div className="mt-5 flex flex-wrap gap-6 font-mono text-xs text-muted">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                GitHub →
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                LinkedIn →
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-accent"
              >
                Email →
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="mt-12 text-center">
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-accent px-8 py-3 font-mono text-accent transition-colors hover:bg-accent/10"
        >
          Download Resume PDF
        </a>
      </section>

      <section className="mt-24">
        <SectionTitle title="My journey" />
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-muted">
            I studied Computer Engineering at BIHE University and taught
            mathematics for a few years along the way — which taught me to break
            hard problems into small, clear steps. I started with HTML, CSS and
            JavaScript, then moved to React and TypeScript, and later to
            Next.js.
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            I spent 5 years as a React / Next.js developer on a product team.
            Now I build complete websites for businesses — from company sites
            and portfolios to <span className="text-accent">Parsa Shop</span>, a
            white-label platform that powers online stores.
          </p>
        </Reveal>
      </section>

      <section className="mt-24 pb-4">
        <SectionTitle title="What I'm learning now" />
        <div className="grid gap-6 md:grid-cols-2">
          {learningNow.map((item) => (
            <Reveal key={item.title}>
              <div className="h-full rounded-lg border border-border p-6 transition-colors hover:border-accent/40">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
