import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { heroWords, profile } from "../data";
import { ArrowDownIcon, ArrowRightIcon } from "./Icons";
import { Magnetic, ScrambleText } from "./effects";

// The hero lines appear one after another...
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ...each one fading in and sliding up a little.
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  // Fade and move the hero down slightly as the page scrolls.
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 380], [1, 0.25]);
  const y = useTransform(scrollY, [0, 380], [0, 60]);

  // Change the highlighted word every 2.6 seconds.
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % heroWords.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  const word = heroWords[wordIndex];

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity, y }}
        className="relative mx-auto w-full max-w-5xl px-6"
      >
        <motion.p variants={item} className="mb-3">
          <ScrambleText
            text="Hi, my name is"
            className="font-mono text-sm text-accent"
          />
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-4 flex flex-wrap gap-x-3 text-xl text-muted sm:text-3xl"
        >
          <span>
            I build{" "}
            <span className="relative inline-block text-accent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span>for the web.</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl leading-relaxed text-muted"
        >
          I'm a full-stack developer with{" "}
          <span className="text-accent">{profile.years} years</span> of
          experience, focused on the frontend. I build fast, responsive web apps
          with React, Next.js and TypeScript — plus the APIs and backends behind
          them when a project needs it.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-mono text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              View my work
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-border px-6 py-2.5 font-mono text-sm text-muted transition-colors hover:border-muted hover:text-foreground"
            >
              Get in touch
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bouncing "scroll" hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest">
            scroll
          </span>
          <ArrowDownIcon />
        </motion.div>
      </a>
    </section>
  );
}
