import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const { setLanguage, language } = useLanguage();
  return (
    <footer className="bg-[#0A0E1A] border-t border-[#334155]/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white
              bg-gradient-to-br from-[#6366F1] to-[#06B6D4]">GS</div>
            <span className="font-['Sora'] font-semibold text-[#F1F5F9] text-sm">Gorashe Suliman</span>
          </div>
          <p className="text-[#94A3B8] text-xs">© 2026 · Built with React + Vite ⚡</p>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com/qurashi512" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9]
              bg-white/5 hover:bg-white/10 border border-[#334155]/40 transition-all duration-200 hover:border-[#6366F1]/50">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/qurashi512" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9]
              bg-white/5 hover:bg-white/10 border border-[#334155]/40 transition-all duration-200 hover:border-[#6366F1]/50">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:gorashe.suliman@outlook.com"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9]
              bg-white/5 hover:bg-white/10 border border-[#334155]/40 transition-all duration-200 hover:border-[#6366F1]/50">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-[#334155]/40">
          {(["en", "de", "ar"] as const).map((lang) => (
            <button key={lang} onClick={() => setLanguage(lang)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                ${language === lang ? "bg-primary text-white" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}>
              {lang === "en" ? "EN" : lang === "de" ? "DE" : "AR"}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
