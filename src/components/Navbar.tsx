import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
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

  return (
    <nav
      className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 mx-4 md:mx-8 rounded-2xl
        ${scrolled
          ? "bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#334155]/60 shadow-lg shadow-black/20"
          : "bg-[#0A0E1A]/40 backdrop-blur-md border border-[#334155]/30"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white
              bg-gradient-to-br from-[#6366F1] to-[#06B6D4] shadow-lg shadow-indigo-500/30">
              GS
            </div>
            <span className="hidden sm:block font-['Sora'] font-semibold text-[#F1F5F9] text-sm">
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
              className="px-3 py-1.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg hover:bg-white/5
                transition-all duration-200 font-medium"
            >
              {t(item.key)}
            </a>
          ))}
          <Link href="/certifications">
            <span className="px-3 py-1.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg hover:bg-white/5
              transition-all duration-200 font-medium cursor-pointer">
              {t("nav.certifications")}
            </span>
          </Link>
        </div>

        {/* Language switcher + hamburger */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-[#334155]/40">
            {(["en", "de", "ar"] as const).map((lang) => (
              <button
                key={lang}
                data-testid={`btn-lang-${lang}`}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                  ${language === lang
                    ? "bg-primary text-white shadow-sm shadow-primary/40"
                    : "text-[#94A3B8] hover:text-[#F1F5F9]"
                  }`}
              >
                {lang === "en" ? "🇬🇧 EN" : lang === "de" ? "🇩🇪 DE" : "🇸🇦 AR"}
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9]"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="btn-hamburger"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#334155]/40 px-4 py-4 flex flex-col gap-1 bg-[#0A0E1A]/95 rounded-b-2xl">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.id}`}
              onClick={(e) => handleSectionClick(e, item.id)}
              className="px-3 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg hover:bg-white/5
                transition-all duration-200"
            >
              {t(item.key)}
            </a>
          ))}
          <Link href="/certifications" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg hover:bg-white/5
              transition-all duration-200 cursor-pointer">
              {t("nav.certifications")}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}
