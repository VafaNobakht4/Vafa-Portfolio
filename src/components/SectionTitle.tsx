import { Reveal } from "./Reveal";

// "About." followed by a thin line that fills the rest of the row.
export function SectionTitle({ title }: { title: string }) {
  return (
    <Reveal>
      <div className="mb-8 flex items-center gap-5">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <span>{title}</span>
          <span className="text-accent">.</span>
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
    </Reveal>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  dot?: boolean;
  children?: React.ReactNode;
};

// Top of the About / Projects / Contact pages.
export function PageHeader({ eyebrow, title, dot, children }: PageHeaderProps) {
  return (
    <Reveal>
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
        {dot && <span className="text-accent">.</span>}
      </h1>
      {children && <p className="mt-4 max-w-lg text-muted">{children}</p>}
    </Reveal>
  );
}
