import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-testid="btn-scroll-to-top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center
        bg-primary text-primary-foreground shadow-lg shadow-primary/30
        hover:shadow-primary/50 hover:scale-110 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
