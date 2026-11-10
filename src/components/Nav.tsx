import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Give the header a background once the page is scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-accent"
        >
          vafa<span className="text-accent">.</span>dev
        </Link>

        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to} className="hidden md:block">
              <Link
                to={link.to}
                activeOptions={{ exact: true }}
                className="relative font-mono text-[13px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                activeProps={{ className: "text-accent after:w-full" }}
                inactiveProps={{
                  className: "text-muted after:w-0 hover:text-foreground",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <ul className="border-t border-border bg-background/95 px-6 py-3 backdrop-blur-md md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                activeOptions={{ exact: true }}
                className="block py-3 font-mono text-sm"
                activeProps={{ className: "text-accent" }}
                inactiveProps={{
                  className: "text-muted hover:text-foreground",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
