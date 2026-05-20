import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const { setLanguage, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t py-10 transition-colors duration-300
      ${isDark
        ? "bg-[#0A0A0F] border-[#1E1E2E]/60"
        : "bg-[#FAFAFA] border-[#E2E2F0]/80"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white
              bg-gradient-to-br from-[#6C63FF] to-[#00D4FF]">GS</div>
            <span className={`font-['Sora'] font-semibold text-sm transition-colors duration-300
              ${isDark ? "text-[#F0F0F5]" : "text-[#1A1A2E]"}`}>Gorashe Suliman</span>
          </div>
          <p className={`text-xs transition-colors duration-300 ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>
            © 2026 · Built with React + Vite ⚡
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/qurashi512", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/qurashi512", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:gorashe.suliman@outlook.com", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer" aria-label={label}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200
                ${isDark
                  ? "text-[#8B8B9E] hover:text-[#F0F0F5] bg-white/5 hover:bg-white/10 border-[#1E1E2E]/60 hover:border-[#6C63FF]/50"
                  : "text-[#64748B] hover:text-[#1A1A2E] bg-black/5 hover:bg-black/10 border-[#E2E2F0]/80 hover:border-[#6C63FF]/50"
                }`}>
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className={`flex items-center gap-1 rounded-xl p-1 border
          ${isDark ? "bg-white/5 border-[#1E1E2E]/60" : "bg-black/5 border-[#E2E2F0]/80"}`}>
          {(["en", "de", "ar"] as const).map((lang) => (
            <button key={lang} onClick={() => setLanguage(lang)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                ${language === lang
                  ? "bg-primary text-white"
                  : isDark ? "text-[#8B8B9E] hover:text-[#F0F0F5]" : "text-[#64748B] hover:text-[#1A1A2E]"
                }`}>
              {lang === "en" ? "EN" : lang === "de" ? "DE" : "AR"}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
