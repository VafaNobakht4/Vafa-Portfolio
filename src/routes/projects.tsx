import { createFileRoute } from "@tanstack/react-router";

import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/SectionTitle";
import { profile, projects } from "../data";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: `Projects — ${profile.name}` }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-4">
      <PageHeader eyebrow="things i've built" title="Projects">
        A selection of work I've designed and shipped — mostly with React,
        Next.js, TypeScript and friends.
      </PageHeader>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center font-mono text-xs text-muted">
          more experiments live on{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>
        </p>
      </Reveal>
    </div>
  );
}
