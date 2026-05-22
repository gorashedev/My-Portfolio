import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // set initial state on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      data-testid="btn-scroll-nav"
      aria-label={scrolled ? "Scroll to top" : "Scroll to bottom"}
      className="fixed bottom-8 right-5 md:right-8 z-[9999] w-11 h-11 rounded-full
        flex items-center justify-center
        bg-gradient-to-br from-[#6C63FF] to-[#8B5CF6] text-white
        shadow-lg shadow-[#6C63FF]/40
        hover:shadow-[#6C63FF]/60 hover:scale-110
        active:scale-95
        transition-all duration-300"
    >
      {scrolled
        ? <ChevronUp  className="w-5 h-5" />
        : <ChevronDown className="w-5 h-5" />
      }
    </button>
  );
}
