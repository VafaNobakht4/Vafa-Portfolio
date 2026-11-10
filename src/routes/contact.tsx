import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CopyEmailButton } from "../components/CopyEmailButton";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/SectionTitle";
import { contactForm, profile } from "../data";

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

type Status = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  // Sends the message to my inbox through Web3Forms (see data.ts).
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    // Bots fill in every field, including this hidden one — ignore them.
    if (form.get("botcheck")) return;

    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    setStatus("sending");
    try {
      const response = await fetch(contactForm.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactForm.accessKey,
          subject: `New portfolio message from ${name}`,
          from_name: `${profile.name} — Portfolio`,
          name,
          email, // Web3Forms uses this as the reply-to address
          message,
        }),
      });
      // If the reply isn't JSON (e.g. a blocked request), treat it as a failure.
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message couldn't be sent.");
      }

      setStatus("sent");
      formElement.reset();
    } catch (error) {
      // fetch throws a TypeError when the mail service can't be reached at all.
      if (error instanceof TypeError) {
        setErrorText("Couldn't reach the mail service.");
      } else {
        setErrorText(error instanceof Error ? error.message : "");
      }
      setStatus("error");
    }
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
            {/* Hidden spam trap: real people never see or fill this */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 w-full rounded-full border border-accent py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {status === "sending" ? "Sending…" : "Send message →"}
            </button>

            {status === "sent" && (
              <p className="mt-3 font-mono text-xs text-accent">
                ✓ Thanks! Your message is in my inbox — I'll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 font-mono text-xs text-red-300">
                {errorText || "Couldn't send your message."} You can also email
                me directly at {profile.email}.
              </p>
            )}
            {(status === "idle" || status === "sending") && (
              <p className="mt-3 font-mono text-[11px] text-muted/70">
                Your message goes straight to my inbox.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
