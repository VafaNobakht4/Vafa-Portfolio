import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "../data";
import { Reveal } from "./Reveal";

// Experience list with a vertical line that "draws" itself while scrolling.
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-10">
      {/* Grey track + accent line that grows on top of it */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-border"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: lineProgress }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
      />

      {experience.map((job) => (
        <Reveal key={job.role} className="relative pb-10 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-8 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-background sm:-left-10"
          />
          <span className="font-mono text-xs tracking-wide text-muted">
            {job.period}
          </span>
          <h3 className="mt-1 font-semibold transition-colors hover:text-accent">
            {job.role} <span className="text-muted">@ {job.company}</span>
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {job.summary}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
