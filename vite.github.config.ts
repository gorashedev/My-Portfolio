import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { copyFileSync, cpSync } from "fs";

const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-assets-and-404",
      closeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist");

        // نسخ مجلد images
        try {
          cpSync(
            path.resolve(import.meta.dirname, "images"),
            `${outDir}/images`,
            { recursive: true }
          );
          console.log("✅ images copied");
        } catch (err) {
          console.warn("⚠️ Could not copy images:", err);
        }

        // نسخ مجلد cv
        try {
          cpSync(
            path.resolve(import.meta.dirname, "cv"),
            `${outDir}/cv`,
            { recursive: true }
          );
          console.log("✅ cv copied");
        } catch (err) {
          console.warn("⚠️ Could not copy cv:", err);
        }

        // نسخ مجلد fonts
        try {
          cpSync(
            path.resolve(import.meta.dirname, "fonts"),
            `${outDir}/fonts`,
            { recursive: true }
          );
          console.log("✅ fonts copied");
        } catch (err) {
          console.warn("⚠️ Could not copy fonts:", err);
        }

        // نسخ 404.html
        try {
          copyFileSync(outDir + "/index.html", outDir + "/404.html");
          console.log("✅ 404.html created");
        } catch (err) {
          console.warn("⚠️ Could not copy 404.html:", err);
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
