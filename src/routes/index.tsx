import { createFileRoute, Link } from "@tanstack/react-router";

import { CopyEmailButton } from "../components/CopyEmailButton";
import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";
import { Terminal } from "../components/Terminal";
import { Timeline } from "../components/Timeline";
import { Magnetic } from "../components/effects";
import { aboutFacts, now, profile, projects, skills } from "../data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-5xl px-6">
        <About />
        <RightNow />
        <Experience />
        <Projects />
        <Skills />
        <TerminalSection />
        <Contact />
      </div>
    </>
  );
}

function About() {
  return (
    <section id="about" className="mt-24 scroll-mt-24">
      <SectionTitle title="About" />
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <Reveal>
          <p className="leading-relaxed text-muted">
            Hello! I'm {profile.firstName}, a full-stack developer who's
            happiest on the frontend. I've spent {profile.years} years building
            responsive, user-friendly applications with React, Next.js,
            TypeScript and Tailwind CSS — and the Django APIs, databases and
            deployments behind them.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            I studied Computer Engineering at{" "}
            <span className="text-accent">BIHE University</span>. Today I build
            production websites for real businesses — from marketing sites to a
            white-label shop platform — with clean code, careful details and
            smooth animation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="space-y-3 font-mono text-sm">
            {aboutFacts.map((fact) => (
              <li
                key={fact.label}
                className="flex justify-between gap-4 border-b border-border pb-3"
              >
                <span className="text-muted">{fact.label}</span>
                <span className={fact.highlight ? "text-accent" : ""}>
                  {fact.value}
                </span>
              </li>
            ))}
            <li className="border-b border-border pb-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between transition-colors hover:text-accent"
              >
                <span className="text-muted">Resume PDF</span>
                <span>Download</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const rowClass =
  "grid gap-2 border-t border-border py-6 md:grid-cols-[160px_1fr] md:gap-10";
const labelClass =
  "pt-1 font-mono text-[11px] uppercase tracking-widest text-muted";

function RightNow() {
  return (
    <section id="now" className="mt-24 scroll-mt-24">
      <SectionTitle title="Right now" />

      <Reveal className={rowClass}>
        <p className={labelClass}>learning</p>
        <ul>
          {now.learning.map((item) => (
            <li
              key={item.text}
              className="flex items-center justify-between gap-6 py-1.5"
            >
              <span className="font-mono text-sm">{item.text}</span>
              <span
                className={`shrink-0 font-mono text-[10px] uppercase tracking-widest ${
                  item.status === "in progress" ? "text-accent" : "text-muted"
                }`}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={rowClass}>
        <p className={labelClass}>building</p>
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-medium text-foreground">
            {now.building.name}
          </span>{" "}
          — {now.building.text}{" "}
          <Link
            to="/projects"
            className="font-mono text-xs text-accent underline-offset-4 hover:underline"
          >
            see it in projects →
          </Link>
        </p>
      </Reveal>

      <Reveal className={rowClass}>
        <p className={labelClass}>next up</p>
        <ul className="space-y-1.5 text-sm text-muted">
          {now.nextUp.map((goal) => (
            <li key={goal} className="flex items-end gap-3">
              <span className="font-mono text-[10px] text-accent">→</span>
              {goal}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="border-t border-border py-6">
        <p className={labelClass}>daily drivers</p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm">
          {now.dailyDrivers.map((tool, i) => (
            <li key={tool} className="flex items-center gap-3">
              <span className="transition-colors hover:text-foreground">
                {tool}
              </span>
              {i < now.dailyDrivers.length - 1 && (
                <span className="text-muted/50">/</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mt-24 scroll-mt-24">
      <SectionTitle title="Experience" />
      <Timeline />
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mt-24 scroll-mt-24">
      <SectionTitle title="Projects" />
      <Reveal>
        <p className="-mt-4 mb-6 max-w-xl text-sm text-muted">
          A few things I've designed and built.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <Reveal className="mt-8 flex justify-center">
        <Link
          to="/projects"
          className="rounded-full px-6 py-2.5 font-mono text-sm text-accent ring-1 ring-accent/40 transition-colors hover:bg-accent/10"
        >
          View all projects →
        </Link>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mt-24 scroll-mt-24">
      <SectionTitle title="Skills" />
      <Reveal>
        <ul className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function TerminalSection() {
  return (
    <section id="terminal" className="mt-24 scroll-mt-24">
      <SectionTitle title="Into the terminal" />
      <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <Reveal>
          <Terminal />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-sm text-accent">
            {"// my daily workflow"}
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            This is roughly how I spend my days — inspecting, typing and
            shipping. The commands run themselves, but the same way of thinking
            is how I approach every real project: break the problem down,
            prototype fast, then refine until it feels effortless.
          </p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted/70">
            ps: hire --check returns available ✓ — every single time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mt-24 scroll-mt-24 pb-4">
      <SectionTitle title="Contact" />
      <Reveal className="flex flex-col items-center py-8 text-center">
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let's build something <span className="text-accent">together</span>.
        </h3>
        <p className="mt-4 max-w-md text-muted">
          I'm open to freelance work, full-time roles and interesting
          collaborations. My inbox is always open — drop me a line.
        </p>

        <div className="mt-8">
          <Magnetic>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-accent px-8 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
            >
              Say hello
            </Link>
          </Magnetic>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <CopyEmailButton />
        </div>
      </Reveal>
    </section>
  );
}
