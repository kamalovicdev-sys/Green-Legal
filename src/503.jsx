import React, { useState } from 'react';
import { Settings, RefreshCw, Phone, Languages, ServerCrash } from 'lucide-react';
import { motion } from 'framer-motion';

// --- TARJIMALAR LUG'ATI (503 sahifa uchun) ---
const translations = {
  uz: {
    code: "503",
    title: "Xizmat vaqtincha mavjud emas",
    desc: "Kechirasiz, hozirda saytimizda texnik profilaktika ishlari olib borilmoqda yoki serverda vaqtincha nosozlik mavjud. Iltimos, birozdan so'ng qayta urinib ko'ring.",
    refreshBtn: "Sahifani yangilash",
    contactBtn: "Biz bilan bog'lanish",
    support: "Shoshilinch yuridik yordam kerakmi?",
  },
  ru: {
    code: "503",
    title: "Сервис временно недоступен",
    desc: "Извините, в настоящее время на сайте ведутся технические работы или сервер временно недоступен. Пожалуйста, повторите попытку через несколько минут.",
    refreshBtn: "Обновить страницу",
    contactBtn: "Связаться с нами",
    support: "Нужна срочная юридическая помощь?",
  },
  en: {
    code: "503",
    title: "Service Unavailable",
    desc: "Sorry, our site is currently undergoing scheduled maintenance or the server is temporarily overloaded. Please try again in a few minutes.",
    refreshBtn: "Refresh Page",
    contactBtn: "Contact Us",
    support: "Need urgent legal assistance?",
  }
};

// --- ANIMATSIYA SOZLAMALARI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const MaintenancePage = () => {
  const [lang, setLang] = useState('uz'); // Asosiy til
  const t = translations[lang];

  // Tilni almashtirish
  const toggleLanguage = () => {
    const nextLang = { uz: 'ru', ru: 'en', en: 'uz' };
    setLang(nextLang[lang]);
  };

  // Sahifani yangilash
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-hidden flex flex-col relative">

      {/* ORQA FON EFFEKTLARI */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#73976A] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#73976A] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      {/* HEADER / NAVBAR (Soddalashtirilgan) */}
      <header className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="Green&Legal Logo"
                className="h-10 w-10 object-contain mix-blend-multiply"
                onError={(e) => e.target.style.display = 'none'} // Logo yo'q bo'lsa xato bermasligi uchun
              />
              <span className="font-bold text-2xl tracking-tight text-stone-900">
                Green <span className="text-[#73976A]">& Legal</span>
              </span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 transition font-semibold text-sm uppercase"
            >
              <Languages className="h-4 w-4" />
              {lang === 'uz' ? 'RU' : lang === 'ru' ? 'EN' : 'UZ'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-stone-200 text-center"
        >
          {/* Ikonka qismi */}
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#73976A]/10 rounded-full animate-pulse"></div>
            <Settings className="w-12 h-12 text-[#73976A] animate-[spin_4s_linear_infinite]" />
            <ServerCrash className="w-6 h-6 text-stone-600 absolute bottom-4 right-4 bg-white rounded-full" />
          </div>

          {/* Sarlavha va matn */}
          <h1 className="text-6xl sm:text-7xl font-extrabold text-stone-200 mb-2 tracking-tighter">
            {t.code}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
            {t.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mb-10 leading-relaxed max-w-lg mx-auto">
            {t.desc}
          </p>

          {/* Tugmalar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={handleRefresh}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-[#73976A] text-white font-semibold rounded-xl hover:bg-[#5e7a56] transition shadow-lg shadow-[#73976A]/20"
            >
              <RefreshCw className="w-5 h-5" />
              {t.refreshBtn}
            </button>
            <a
              href="tel:+998956760163"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-stone-100 text-stone-800 font-semibold rounded-xl border border-stone-200 hover:bg-stone-200 hover:border-stone-300 transition"
            >
              <Phone className="w-5 h-5 text-[#73976A]" />
              {t.contactBtn}
            </a>
          </div>

          {/* Qo'shimcha yordam qismi */}
          <div className="pt-6 border-t border-stone-100">
            <p className="text-sm font-medium text-stone-500 mb-3">{t.support}</p>
            <div className="flex justify-center items-center gap-4 text-stone-900 font-bold">
              <a href="tel:+998956760163" className="hover:text-[#73976A] transition">+998 95 676 01 63</a>
              <span className="text-stone-300">|</span>
              <a href="tel:+998911620063" className="hover:text-[#73976A] transition">+998 91 162 00 63</a>
            </div>
          </div>

        </motion.div>
      </main>

    </div>
  );
};

export default MaintenancePage;