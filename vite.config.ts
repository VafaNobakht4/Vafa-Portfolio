import { defineConfig } from "vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Lets Vercel preview sandboxes (*.vercel.run) open the dev server.
  server: { allowedHosts: [".vercel.run"] },
  // nitro() builds the production server — it detects Vercel automatically.
  plugins: [nitro(), tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
