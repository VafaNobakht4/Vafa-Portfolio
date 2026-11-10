import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";

import { Cursor } from "../components/Cursor";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { profile } from "../data";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${profile.name} — ${profile.role}` },
      {
        name: "description",
        content: `${profile.name} is a full-stack developer focused on the frontend, building web apps with React, Next.js and TypeScript.`,
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {/* reducedMotion="user" turns off movement for people who ask for less motion */}
        <MotionConfig reducedMotion="user">
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionConfig>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found<span className="text-accent">.</span>
      </h1>
      <Link
        to="/"
        className="mt-8 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline"
      >
        ← back home
      </Link>
    </div>
  );
}
