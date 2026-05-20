import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  const navItems = [
    { key: "nav.home",     id: "home" },
    { key: "nav.about",    id: "about" },
    { key: "nav.projects", id: "projects" },
    { key: "nav.skills",   id: "skills" },
    { key: "nav.github",   id: "github" },
    { key: "nav.contact",  id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 50);
    }
  };

  const isDark = theme === "dark";

  return (
    <nav
      className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 mx-4 md:mx-8 rounded-2xl
        ${scrolled
          ? isDark
            ? "bg-[#0A0A0F]/85 backdrop-blur-xl border border-[#1E1E2E]/80 shadow-lg shadow-black/30"
            : "bg-white/85 backdrop-blur-xl border border-[#E2E2F0]/80 shadow-lg shadow-black/10"
          : isDark
            ? "bg-[#0A0A0F]/50 backdrop-blur-md border border-[#1E1E2E]/50"
            : "bg-white/60 backdrop-blur-md border border-[#E2E2F0]/60"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white
              bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] shadow-lg shadow-[#6C63FF]/30">
              GS
            </div>
            <span className={`hidden sm:block font-['Sora'] font-semibold text-sm transition-colors duration-300
              ${isDark ? "text-[#F0F0F5]" : "text-[#1A1A2E]"}`}>
              Gorashe Suliman
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.id}`}
              data-testid={`link-${item.key}`}
              onClick={(e) => handleSectionClick(e, item.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium
                ${isDark
                  ? "text-[#8B8B9E] hover:text-[#F0F0F5] hover:bg-white/5"
                  : "text-[#64748B] hover:text-[#1A1A2E] hover:bg-black/5"
                }`}
            >
              {t(item.key)}
            </a>
          ))}
          <Link href="/certifications">
            <span className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium cursor-pointer
              ${isDark
                ? "text-[#8B8B9E] hover:text-[#F0F0F5] hover:bg-white/5"
                : "text-[#64748B] hover:text-[#1A1A2E] hover:bg-black/5"
              }`}>
              {t("nav.certifications")}
            </span>
          </Link>
        </div>

        {/* Right controls: lang switcher + theme toggle + hamburger */}
        <div className="flex items-center gap-2">

          {/* Language switcher */}
          <div className={`flex items-center gap-1 rounded-xl p-1 border
            ${isDark
              ? "bg-white/5 border-[#1E1E2E]/60"
              : "bg-black/5 border-[#E2E2F0]/80"
            }`}>
            {(["en", "de", "ar"] as const).map((lang) => (
              <button
                key={lang}
                data-testid={`btn-lang-${lang}`}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                  ${language === lang
                    ? "bg-primary text-white shadow-sm shadow-primary/40"
                    : isDark ? "text-[#8B8B9E] hover:text-[#F0F0F5]" : "text-[#64748B] hover:text-[#1A1A2E]"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <img
                    src={`https://flagcdn.com/w20/${lang === "en" ? "gb" : lang === "de" ? "de" : "sa"}.png`}
                    width={16}
                    height={12}
                    alt={lang}
                    className="rounded-sm object-cover"
                  />
                  {lang.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            data-testid="btn-theme-toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border
              ${isDark
                ? "bg-white/5 border-[#1E1E2E]/60 text-[#8B8B9E] hover:text-[#F0F0F5] hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/10"
                : "bg-black/5 border-[#E2E2F0]/80 text-[#64748B] hover:text-[#1A1A2E] hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/10"
              }`}
          >
            {isDark
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>

          {/* Hamburger */}
          <button
            className={`md:hidden p-2 transition-colors duration-200
              ${isDark ? "text-[#8B8B9E] hover:text-[#F0F0F5]" : "text-[#64748B] hover:text-[#1A1A2E]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="btn-hamburger"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-4 py-4 flex flex-col gap-1 rounded-b-2xl
          ${isDark
            ? "border-[#1E1E2E]/60 bg-[#0A0A0F]/95"
            : "border-[#E2E2F0]/80 bg-white/95"
          }`}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.id}`}
              onClick={(e) => handleSectionClick(e, item.id)}
              className={`px-3 py-2.5 text-sm rounded-lg transition-all duration-200
                ${isDark
                  ? "text-[#8B8B9E] hover:text-[#F0F0F5] hover:bg-white/5"
                  : "text-[#64748B] hover:text-[#1A1A2E] hover:bg-black/5"
                }`}
            >
              {t(item.key)}
            </a>
          ))}
          <Link href="/certifications" onClick={() => setMenuOpen(false)}>
            <span className={`block px-3 py-2.5 text-sm rounded-lg transition-all duration-200 cursor-pointer
              ${isDark
                ? "text-[#8B8B9E] hover:text-[#F0F0F5] hover:bg-white/5"
                : "text-[#64748B] hover:text-[#1A1A2E] hover:bg-black/5"
              }`}>
              {t("nav.certifications")}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}
