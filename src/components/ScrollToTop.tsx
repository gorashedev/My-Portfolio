import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      // Scroll back to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to the first section ("about")
      const firstSection = document.getElementById("about");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      data-testid="btn-scroll-nav"
      aria-label={scrolled ? "Scroll to top" : "Scroll to next section"}
      className="fixed bottom-8 right-5 md:right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center
        bg-gradient-to-br from-[#6C63FF] to-[#8B5CF6] text-white
        shadow-lg shadow-[#6C63FF]/40
        hover:shadow-[#6C63FF]/60 hover:scale-110
        active:scale-95
        transition-all duration-300"
    >
      <span
        key={scrolled ? "up" : "down"}
        className="animate-fade-in"
      >
        {scrolled
          ? <ChevronUp className="w-5 h-5" />
          : <ChevronDown className="w-5 h-5 animate-bounce" />
        }
      </span>
    </button>
  );
}
