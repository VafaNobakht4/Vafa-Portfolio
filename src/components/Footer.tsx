import { useEffect, useState } from "react";
import { profile } from "../data";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name} — built with TanStack
            Start
          </p>
          <div className="mt-2">
            <LocalTime />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Live clock in my time zone, e.g. "Mazandaran, IR — 14:05:09 IRST".
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: profile.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs text-muted">
      {time
        ? `${profile.shortLocation} — ${time} ${profile.timeZoneLabel}`
        : profile.shortLocation}
    </span>
  );
}
