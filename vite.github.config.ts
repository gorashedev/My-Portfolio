import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { copyFileSync } from "fs";

const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  publicDir: path.resolve(import.meta.dirname, "images"),
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "gh-pages-spa-404",
      closeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist");
        try {
          copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
        } catch (err) {
          console.warn("Could not copy 404.html:", err);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
