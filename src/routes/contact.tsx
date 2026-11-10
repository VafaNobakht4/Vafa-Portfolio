import { createFileRoute } from "@tanstack/react-router";

import { CopyEmailButton } from "../components/CopyEmailButton";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/SectionTitle";
import { profile } from "../data";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: `Contact — ${profile.name}` }] }),
  component: ContactPage,
});

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  { label: "GitHub", value: profile.githubHandle, href: profile.github },
  { label: "LinkedIn", value: profile.name, href: profile.linkedin },
];

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted";

function ContactPage() {
  // The form doesn't send anything itself — it opens the visitor's mail app
  // with the message already filled in.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    const subject = `Hello from ${name || "your portfolio"}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-4">
      <PageHeader eyebrow="get in touch" title="Say hello" dot>
        Whether you have a project in mind, a role to fill, or just want to talk
        shop — my inbox is always open.
      </PageHeader>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <ul className="space-y-px">
            {contactLinks.map((link) => (
              <li
                key={link.label}
                className="group border-b border-border py-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-1 inline-block break-all font-medium transition-colors group-hover:text-accent"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-xs leading-relaxed text-muted">
            Based in {profile.location} ({profile.utcOffset}).
            <br />
            Usually replies within a day.
          </p>
          <div className="mt-5">
            <CopyEmailButton />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-border bg-surface/50 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                required
                className={`${inputClass} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full border border-accent py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/10 sm:w-auto sm:px-8"
            >
              Send message →
            </button>
            <p className="mt-3 font-mono text-[11px] text-muted/70">
              This opens your mail app — no data is stored anywhere.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
