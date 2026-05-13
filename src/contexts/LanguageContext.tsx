import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.github': 'GitHub',
    'nav.contact': 'Contact',
    'nav.certifications': 'Certifications',
    
    // Hero
    'hero.tag': 'Available for Ausbildung & Freelance | Cairo → Germany 🇩🇪',
    'hero.desc': 'I build real Android apps and web solutions. Passionate about clean code, continuous learning, and making things that actually work. Seeking Ausbildung or freelance opportunities in Germany.',
    'hero.btn.projects': 'View Projects',
    'hero.btn.contact': 'Get in Touch',
    'hero.btn.cv': 'Download CV',
    
    // Typewriter
    'hero.type.1': 'Junior Android Developer',
    'hero.type.2': 'Web Developer',
    'hero.type.3': 'IT Specialist',
    'hero.type.4': 'Problem Solver',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.send': 'Send Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',

    // Sections
    'certs.all': 'All Certifications',
    'certs.top': 'Top Certifications',
    'certs.viewAll': 'View All Certifications',
    'github.title': 'GitHub Activity',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Fähigkeiten',
    'nav.github': 'GitHub',
    'nav.contact': 'Kontakt',
    'nav.certifications': 'Zertifikate',
    
    'hero.tag': 'Verfügbar für Ausbildung & Freelance | Kairo → Deutschland 🇩🇪',
    'hero.desc': 'Ich entwickle echte Android-Apps und Weblösungen. Leidenschaftlich für sauberen Code, kontinuierliches Lernen und Dinge, die wirklich funktionieren. Auf der Suche nach Ausbildungs- oder Freelance-Möglichkeiten in Deutschland.',
    'hero.btn.projects': 'Projekte ansehen',
    'hero.btn.contact': 'Kontakt aufnehmen',
    'hero.btn.cv': 'Lebenslauf',
    
    'hero.type.1': 'Junior Android-Entwickler',
    'hero.type.2': 'Webentwickler',
    'hero.type.3': 'IT-Spezialist',
    'hero.type.4': 'Problemlöser',

    'contact.title': 'Kontakt aufnehmen',
    'contact.send': 'Nachricht senden',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.subject': 'Betreff',
    'contact.message': 'Nachricht',
    
    'certs.all': 'Alle Zertifikate',
    'certs.top': 'Top-Zertifikate',
    'certs.viewAll': 'Alle Zertifikate ansehen',
    'github.title': 'GitHub-Aktivität',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'عني',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.github': 'جيت هب',
    'nav.contact': 'تواصل معي',
    'nav.certifications': 'الشهادات',
    
    'hero.tag': 'متاح للتدريب المهني والعمل الحر | القاهرة → ألمانيا 🇩🇪',
    'hero.desc': 'أبني تطبيقات أندرويد حقيقية وحلول ويب متكاملة. شغوف بالكود النظيف، والتعلم المستمر، وبناء أشياء تعمل فعلاً. أبحث عن تدريب مهني (Ausbildung) أو عمل حر في ألمانيا.',
    'hero.btn.projects': 'عرض المشاريع',
    'hero.btn.contact': 'تواصل معي',
    'hero.btn.cv': 'تحميل السيرة الذاتية',
    
    'hero.type.1': 'مطور أندرويد مبتدئ',
    'hero.type.2': 'مطور ويب',
    'hero.type.3': 'متخصص تقنية معلومات',
    'hero.type.4': 'حلال مشكلات',

    'contact.title': 'تواصل معي',
    'contact.send': 'إرسال الرسالة',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    
    'certs.all': 'جميع الشهادات',
    'certs.top': 'أبرز الشهادات',
    'certs.viewAll': 'عرض جميع الشهادات',
    'github.title': 'نشاط GitHub',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.body.style.fontFamily = "'Sora', 'Inter', sans-serif"; // You can adjust Arabic font if needed
    } else {
      document.body.style.fontFamily = "";
    }
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
