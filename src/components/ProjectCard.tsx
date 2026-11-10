import type { Project } from "../data";
import { ArrowUpRightIcon, GithubOutlineIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { TiltCard } from "./effects";

export function ProjectCard({ project }: { project: Project }) {
  const { name, url, repo, description, tech } = project;
  const showLiveLink = url !== repo;

  return (
    <Reveal className="h-full">
      <TiltCard className="h-full">
        <div className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/60">
          <div className="flex items-start justify-between gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold leading-snug transition-colors group-hover:text-accent"
            >
              {name}
            </a>

            <div className="flex items-center gap-1 text-muted">
              {repo && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} source code on GitHub`}
                  className="p-1.5 transition-colors hover:text-foreground"
                >
                  <GithubOutlineIcon />
                </a>
              )}
              {showLiveLink && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${name}`}
                  className="p-1.5 transition-all hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <ArrowUpRightIcon />
                </a>
              )}
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-muted/70">
            {tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </Reveal>
  );
}
