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
      name: "copy-images-and-404",
      closeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist");
        const imagesDir = path.resolve(import.meta.dirname, "images");
        
        // نسخ مجلد images للـ dist
        try {
          cpSync(imagesDir, `${outDir}/images`, { recursive: true });
          console.log("✅ images copied to dist/images");
        } catch (err) {
          console.warn("⚠️ Could not copy images:", err);
        }

        // نسخ 404.html
        try {
          copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
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
