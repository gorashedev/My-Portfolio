import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "wouter";


const SB_URL = "https://nijmaixshspqogidtdai.supabase.co/rest/v1";
const SB_KEY = "sb_publishable_9U-mT8VLJQ0E5XoMIfIrTA_JmiERNXn";
const SB_HEADERS = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json" };

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  message: string;
  created_at: string;
}

export default function TestimonialsPage() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`${SB_URL}/testimonials?order=created_at.desc`, { headers: SB_HEADERS })
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`${SB_URL}/testimonials`, {
        method: "POST",
        headers: SB_HEADERS,
        body: JSON.stringify({ name: form.name.trim(), role: form.role.trim() || null, message: form.message.trim() }),
      });
      if (res.ok || res.status === 201) {
        setStatus("success");
        setForm({ name: "", role: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const t = {
    back:        language === "ar" ? "رجوع" : language === "de" ? "Zurück" : "Back",
    title:       language === "ar" ? "آراء الآخرين" : language === "de" ? "Referenzen" : "Testimonials",
    subtitle:    language === "ar" ? "ماذا يقول الآخرون عني" : language === "de" ? "Was andere über mich sagen" : "What others say about me",
    writeTitle:  language === "ar" ? "اترك رأيك" : language === "de" ? "Referenz hinterlassen" : "Leave a Review",
    writeDesc:   language === "ar" ? "رأيك يُظهر بعد مراجعته. شكراً لوقتك!" : language === "de" ? "Ihre Referenz wird nach Überprüfung angezeigt." : "Your review appears after approval. Thank you!",
    name:        language === "ar" ? "الاسم *" : language === "de" ? "Name *" : "Name *",
    role:        language === "ar" ? "المسمى الوظيفي (اختياري)" : language === "de" ? "Position (optional)" : "Role / Position (optional)",
    message:     language === "ar" ? "رأيك *" : language === "de" ? "Ihre Referenz *" : "Your review *",
    send:        language === "ar" ? "إرسال" : language === "de" ? "Absenden" : "Submit",
    sending:     language === "ar" ? "جارٍ الإرسال..." : language === "de" ? "Wird gesendet..." : "Submitting...",
    success:     language === "ar" ? "✅ شكراً! سيظهر رأيك بعد المراجعة." : language === "de" ? "✅ Danke! Ihre Referenz wird nach Prüfung angezeigt." : "✅ Thank you! Your review will appear after approval.",
    error:       language === "ar" ? "حدث خطأ. حاول مجدداً." : language === "de" ? "Fehler. Bitte erneut versuchen." : "Something went wrong. Please try again.",
    noReviews:   language === "ar" ? "لا توجد آراء بعد. كن أول من يكتب!" : language === "de" ? "Noch keine Referenzen." : "No reviews yet. Be the first!",
    count:       (n: number) => language === "ar" ? `${n} آراء` : language === "de" ? `${n} Referenzen` : `${n} Reviews`,
  };

  return (
    <main className={`min-h-screen pt-28 pb-20 transition-colors duration-300 ${isDark ? "bg-[#0A0A0F]" : "bg-[#FAFAFA]"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <button
          onClick={() => { sessionStorage.setItem("scrollTarget", "testimonials"); navigate("/"); }}
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors
            ${isDark ? "text-[#8B8B9E] hover:text-[#F0F0F5]" : "text-[#64748B] hover:text-[#1A1A2E]"}`}
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className={`font-['Sora'] text-4xl md:text-5xl font-bold mb-3 ${isDark ? "text-[#F0F0F5]" : "text-[#1A1A2E]"}`}>{t.title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full mx-auto mb-4" />
          <p className={`text-sm ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>{!loading && t.count(items.length)} · {t.subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className={`text-center py-16 ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>{t.noReviews}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {items.map((item) => (
              <div key={item.id} className={`p-6 rounded-2xl border relative
                hover:border-[#6C63FF]/30 hover:shadow-xl hover:shadow-[#6C63FF]/10 transition-all duration-300 flex flex-col
                ${isDark ? "bg-[#12121A]/80 border-[#1E1E2E]/60" : "bg-white border-[#E2E2F0]/80 shadow-sm"}`}>
                <Quote className={`w-8 h-8 mb-4 ${isDark ? "text-[#6C63FF]/20" : "text-[#6C63FF]/15"}`} />
                <p className={`text-sm leading-relaxed italic flex-1 ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>&ldquo;{item.message}&rdquo;</p>
                <div className={`flex items-center gap-3 mt-5 pt-4 border-t ${isDark ? "border-[#1E1E2E]/60" : "border-[#E2E2F0]/80"}`}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className={`font-['Sora'] text-sm font-semibold ${isDark ? "text-[#F0F0F5]" : "text-[#1A1A2E]"}`}>{item.name}</p>
                    {item.role && <p className={`text-xs ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write Review Form */}
        <div id="write" className="max-w-xl mx-auto">
          <div className={`p-8 rounded-2xl border ${isDark ? "bg-[#12121A]/80 border-[#1E1E2E]/60" : "bg-white border-[#E2E2F0]/80 shadow-sm"}`}>
            <h2 className={`font-['Sora'] text-xl font-bold mb-1 ${isDark ? "text-[#F0F0F5]" : "text-[#1A1A2E]"}`}>{t.writeTitle}</h2>
            <p className={`text-xs mb-6 ${isDark ? "text-[#8B8B9E]" : "text-[#64748B]"}`}>{t.writeDesc}</p>

            {status === "success" ? (
              <div className="text-center py-8 text-[#6C63FF] font-medium">{t.success}</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6C63FF] uppercase tracking-wider mb-1.5">{t.name}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm
                        focus:outline-none focus:border-[#6C63FF]/60 transition-colors
                        ${isDark
                          ? "bg-[#0A0A0F] border-[#1E1E2E]/60 text-[#F0F0F5] placeholder:text-[#2E2E3E]"
                          : "bg-[#F4F4F8] border-[#E2E2F0]/80 text-[#1A1A2E] placeholder:text-[#A0A0B0]"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6C63FF] uppercase tracking-wider mb-1.5">{t.role}</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm
                        focus:outline-none focus:border-[#6C63FF]/60 transition-colors
                        ${isDark
                          ? "bg-[#0A0A0F] border-[#1E1E2E]/60 text-[#F0F0F5] placeholder:text-[#2E2E3E]"
                          : "bg-[#F4F4F8] border-[#E2E2F0]/80 text-[#1A1A2E] placeholder:text-[#A0A0B0]"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6C63FF] uppercase tracking-wider mb-1.5">{t.message}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm
                      focus:outline-none focus:border-[#6C63FF]/60 transition-colors resize-none
                      ${isDark
                        ? "bg-[#0A0A0F] border-[#1E1E2E]/60 text-[#F0F0F5] placeholder:text-[#2E2E3E]"
                        : "bg-[#F4F4F8] border-[#E2E2F0]/80 text-[#1A1A2E] placeholder:text-[#A0A0B0]"}`}
                  />
                </div>
                {status === "error" && <p className="text-red-500 text-xs">{t.error}</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white font-semibold text-sm
                    hover:shadow-lg hover:shadow-[#6C63FF]/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "sending" ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
