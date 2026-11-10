import { useState } from "react";
import { profile } from "../data";
import { CheckIcon, CopyIcon } from "./Icons";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by the browser — nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
    >
      {copied ? (
        <>
          <CheckIcon className="text-accent" />
          <span className="text-accent">copied!</span>
        </>
      ) : (
        <>
          <CopyIcon />
          copy email
        </>
      )}
    </button>
  );
}
