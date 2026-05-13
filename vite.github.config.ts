import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { copyFileSync } from "fs";
 
// GitHub Pages config — no PORT/BASE_PATH required
// Set VITE_BASE to your repo name, e.g. "/My-Portfolio/" for project pages
const base = process.env.VITE_BASE ?? "/";
 
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
 
    // ─────────────────────────────────────────────────────────────────────────
    // GitHub Pages SPA Routing Fix
    // ─────────────────────────────────────────────────────────────────────────
    // المشكلة: GitHub Pages يُعيد 404 لأي مسار غير index.html
    //          (مثال: /My-Portfolio/certifications)
    //
    // الحل: بعد كل build، ننسخ dist/index.html → dist/404.html
    //        عندما يطلب GitHub Pages صفحة غير موجودة، يُعيد 404.html
    //        الذي هو نفس index.html → React يحمّل → Wouter يتولى الـ routing
    //
    // النتيجة: كل route يعمل بشكل صحيح حتى عند الـ hard refresh أو
    //          فتح الرابط مباشرة
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: "gh-pages-spa-404",
      closeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist");
        try {
          copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
          console.log("✅ gh-pages-spa-404: dist/index.html → dist/404.html");
        } catch (err) {
          console.warn("⚠️  gh-pages-spa-404: Could not copy 404.html:", err);
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
