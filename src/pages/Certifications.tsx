import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Certifications() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const title = language === "de" ? "Alle Zertifikate" : language === "ar" ? "جميع الشهادات" : "All Certifications";
  const backLabel = language === "de" ? "Zurück" : language === "ar" ? "رجوع" : "Back";
  const verifyLabel = language === "de" ? "Zertifikat verifizieren" : language === "ar" ? "التحقق من الشهادة" : "Verify Certificate";

  const base = import.meta.env.BASE_URL;

  const certs = [
    {
      title: "Google IT Support Professional Certificate",
      issuer: language === "de" ? "Google (via Coursera)" : language === "ar" ? "Google (عبر Coursera)" : "Google (via Coursera)",
      date: language === "de" ? "Nov. 2025 – Apr. 2026" : language === "ar" ? "نوفمبر 2025 – أبريل 2026" : "Nov 2025 – Apr 2026",
      skills: ["IT Support", "System Administration", "Networking", "IT Security"],
      verify: "https://coursera.org/verify/professional-cert/RUJ79AOXC8KT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      featured: true,
    },
    {
      title: "CS50x: Introduction to Computer Science",
      issuer: language === "de" ? "Harvard University" : language === "ar" ? "جامعة هارفارد" : "Harvard University",
      date: language === "de" ? "Feb. 2026 – Apr. 2026" : language === "ar" ? "فبراير 2026 – أبريل 2026" : "Feb 2026 – Apr 2026",
      skills: ["C Programming", "Python", "SQL", "Data Structures", "Algorithms"],
      verify: "https://cs50.harvard.edu/certificates/9e5b3fa6-aeb5-48df-9a76-3c56df45076a",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Harvard_University_logo.svg",
      featured: true,
    },
    {
      title: "Google AI Essentials",
      issuer: language === "de" ? "Google (via Coursera)" : language === "ar" ? "Google (عبر Coursera)" : "Google (via Coursera)",
      date: language === "de" ? "10. Mai 2026" : language === "ar" ? "10 مايو 2026" : "May 10, 2026",
      skills: ["AI Foundations", "Prompt Engineering", "AI Ethics", "AI Productivity", "AI Trends"],
      verify: "https://www.coursera.org/verify/specialization/KFXVQ8YXI4QO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      featured: true,
    },
    {
      title: "HTML, CSS, and Javascript for Web Developers",
      issuer: language === "de" ? "Johns Hopkins University (Coursera)" : language === "ar" ? "جامعة جونز هوبكنز (Coursera)" : "Johns Hopkins University (via Coursera)",
      date: language === "de" ? "Mai 2026" : language === "ar" ? "مايو 2026" : "May 2026",
      skills: ["HTML", "CSS", "JavaScript", "Web Development", "Responsive Design"],
      verify: "https://www.coursera.org/account/accomplishments/verify/U2M1U2S6ZX9E",
      logo: `${base}images/johns-hopkins.png`,
      featured: false,
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: language === "de" ? "4. Mai 2026" : language === "ar" ? "4 مايو 2026" : "May 4, 2026",
      skills: ["Flexbox", "CSS Grid", "Responsive Design", "HTML & CSS", "Web Accessibility"],
      verify: "https://freecodecamp.org/certification/qurashi512/responsive-web-design-v9",
      logo: "https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg",
      featured: false,
    },
    {
      title: "B1 English for Developers (Beta)",
      issuer: "freeCodeCamp",
      date: language === "de" ? "4. Mai 2026" : language === "ar" ? "4 مايو 2026" : "May 4, 2026",
      skills: ["Technical Reading", "Listening Comprehension", "Technical Communication", "Grammar for Developers", "IT Vocabulary"],
      verify: "https://freecodecamp.org/certification/qurashi512/b1-english-for-developers",
      logo: "https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg",
      featured: false,
    },
    {
      title: language === "de" ? "1 Million Prompters" : language === "ar" ? "مليون خبير لأوامر الذكاء الاصطناعي" : "1 Million Prompters",
      issuer: language === "de" ? "Dubai Future Foundation" : language === "ar" ? "مؤسسة دبي للمستقبل" : "Dubai Future Foundation",
      date: language === "de" ? "Mai 2026" : language === "ar" ? "مايو 2026" : "May 2026",
      skills: [
        language === "ar" ? "هندسة الأوامر" : "Prompt Engineering",
        language === "ar" ? "الذكاء الاصطناعي" : "Artificial Intelligence",
        language === "ar" ? "الذكاء التوليدي" : "Generative AI",
        language === "ar" ? "نماذج اللغة الكبيرة" : "Large Language Models",
      ],
      verify: "https://omp.dub.ai/certificate/0u9cErvpmdCB",
      logo: `${base}images/dubai-future-foundation.jpg`,
      featured: false,
    },
    {
      title: "Python Essentials 2",
      issuer: language === "ar" ? "Cisco Networking Academy & OpenEDG" : "Cisco Networking Academy & OpenEDG Python Institute",
      date: language === "de" ? "19. Mai 2026" : language === "ar" ? "19 مايو 2026" : "May 19, 2026",
      skills: ["Python 3", "OOP", "Algorithmic Thinking", "Debugging", "IoT"],
      verify: "https://www.credly.com/badges/134986e3-73e6-45ba-943f-07c3b4e93ab2/public_url",
      logo: `${base}images/cisco-networking-academy.png`,
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0E1A] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => { sessionStorage.setItem("scrollTarget", "certifications"); navigate("/"); }}
          className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F1F5F9] text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </button>

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-['Sora'] text-4xl md:text-5xl font-bold text-[#F1F5F9] mb-3">{title}</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full mx-auto mb-4" />
          <p className="text-[#94A3B8] text-sm">
            {language === "de" ? `${certs.length} Zertifikate · Verifiziert & aktuell` : language === "ar" ? `${certs.length} شهادات · موثقة ومحدثة` : `${certs.length} Certificates · Verified & Current`}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <div key={i} className={`relative p-6 rounded-2xl bg-[#1E293B]/60 border transition-all duration-300 flex flex-col
              hover:shadow-xl hover:-translate-y-1
              ${c.featured ? "border-[#6366F1]/40 hover:border-[#6366F1]/70 hover:shadow-indigo-500/15" : "border-[#334155]/40 hover:border-[#334155]/70"}`}>
              {c.featured && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-[10px] font-bold uppercase tracking-wider">
                  Top
                </div>
              )}

              {/* Logo */}
              <div className="h-10 flex items-center mb-5">
                {c.logo ? (
                  <img src={c.logo} alt={c.issuer} className="max-h-8 max-w-[120px] object-contain" loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#06B6D4] flex items-center justify-center text-white text-xs font-bold">
                    {c.issuer.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <h3 className="font-['Sora'] text-sm font-semibold text-[#F1F5F9] mb-1 leading-snug flex-1">{c.title}</h3>
              <p className="text-[#94A3B8] text-xs mb-1">{c.issuer}</p>
              <p className="text-[#6366F1] text-xs font-medium mb-4">{c.date}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-[#0A0E1A] border border-[#334155]/60 text-[#94A3B8] text-[10px]">{s}</span>
                ))}
              </div>

              <a href={c.verify} target="_blank" rel="noopener noreferrer"
                className="mt-auto flex items-center gap-1.5 text-[#6366F1] hover:text-[#818CF8] text-xs font-medium transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> {verifyLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
