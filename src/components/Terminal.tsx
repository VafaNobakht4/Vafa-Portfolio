import { useEffect, useState } from "react";
import { terminalLines } from "../data";

type Line = (typeof terminalLines)[number];

// A fake terminal that types commands and prints their output, forever.
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let timer: number;
    let stopped = false;
    let lineIndex = 0;
    let charCount = 0;

    // Keep only the last 8 lines on screen.
    const addLine = (line: Line) =>
      setLines((prev) => [...prev, line].slice(-8));

    function step() {
      if (stopped) return;
      const line = terminalLines[lineIndex % terminalLines.length];

      if (line.kind === "cmd") {
        // Type the command one letter at a time.
        charCount++;
        setTyping(line.text.slice(0, charCount));
        if (charCount < line.text.length) {
          timer = window.setTimeout(step, 60);
          return;
        }
        addLine(line);
        setTyping("");
        lineIndex++;
        charCount = 0;
        timer = window.setTimeout(step, 550);
      } else {
        // Output appears all at once.
        addLine(line);
        lineIndex++;
        timer = window.setTimeout(step, 950);
      }
    }

    timer = window.setTimeout(step, 700);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        <span className="ml-3 font-mono text-[11px] text-muted">
          vafa@portfolio: ~
        </span>
      </div>

      <div className="min-h-[280px] space-y-1.5 p-4 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <p key={i} className={line.kind === "out" ? "text-muted" : ""}>
            {line.kind === "cmd" && <span className="mr-2 text-accent">$</span>}
            {line.text}
          </p>
        ))}
        <p>
          <span className="mr-2 text-accent">$</span>
          <span className="text-muted">{typing}</span>
          <span className="animate-pulse text-accent">▍</span>
        </p>
      </div>
    </div>
  );
}
