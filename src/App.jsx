import React, { useState, useEffect } from 'react';
import { Menu, X, Scale, FileText, ShieldCheck, Briefcase, ChevronRight, Phone, CheckCircle, Users, MapPin, Mail, Clock, Globe, ChevronDown, Calculator, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TELEGRAM VA GOOGLE SOZLAMALARI ---
const BOT_TOKEN = "8014966765:AAFsBpsRbdta0YymF2Vd9UjIZGGB9IKZ-zs";
const CHAT_ID = "-1003577717245";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwoUMJGg6enEuzs_HlBi98pXY57_f9FztRcT1oUh-_TimUVIkauBxVIdislmsG0UJ2AAQ/exec";

// --- TARJIMALAR LUG'ATI ---
const translations = {
  uz: {
    nav: { services: "Xizmatlar", adv: "Afzalliklar", process: "Jarayon", team: "Jamoa", btn: "Konsultatsiya" },
    hero: { badge: "B2B | B2G Yuridik Xizmatlar", title1: "Biznesingizni huquqiy xavflardan", title2: "himoya qiling", desc: "Korxonalarni ro'yxatdan o'tkazish, litsenziyalash va sud jarayonlarida to'liq huquqiy yordam. Barcha yuridik masalalarni professionallarga topshirib, xotirjam ishlang.", btn1: "Ariza qoldiring" },
    services: {
      title: "Biznesingiz uchun yechimlar", desc: "Vaqtingizni tejash va qonuniy xavfsizlikni ta'minlash uchun asosiy xizmatlarimiz",
      s1Title: "Biznesni ro'yxatdan o'tkazish", s1Desc: "Yangi korxonalarni (MChJ, AJ) ochish va ta'sis hujjatlarini qonuniy rasmiylashtirish.",
      s2Title: "Litsenziyalash", s2Desc: "Faoliyatingiz uchun zarur bo'lgan litsenziya va ruxsatnomalarni byurokratiyasiz olish.",
      s3Title: "Sud ishlarida himoya", s3Desc: "Xo'jalik va iqtisodiy nizolarda sudda kompaniyangiz manfaatlarini to'liq himoya qilish.",
      s4Title: "Yuridik konsultatsiya", s4Desc: "Shartnomalar ekspertizasi va biznes jarayonlarida doimiy professional huquqiy maslahat.",
      s5Title: "Buxgalteriya xizmatlari", s5Desc: "Korxonangizning buxgalteriya hisobini to'liq yuritish, soliq hisobotlarini tayyorlash va topshirish.",
      s6Title: "HR va Kadrlar ishi", s6Desc: "Xodimlarni ishga qabul qilish, mehnat shartnomalarini tuzish va kadrlar hujjatlarini qonuniy yuritish."
    },
    adv: {
      title: "Nima uchun yuridik ishlarni bizga ishonishadi?", desc: "Biz shunchaki maslahat bermaymiz, balki kompaniyangiz duch kelishi mumkin bo'lgan xavflarning oldini olamiz va amaliy yechimlar taqdim etamiz.",
      a1Title: "B2B | B2G Sektorida chuqur tajriba", a1Desc: "Biz asosan yuridik shaxslar bilan ishlaymiz va korporativ huquqni ich-ichidan bilamiz.",
      a2Title: "100% Maxfiylik kafolati", a2Desc: "Kompaniyangiz sirlari va moliyaviy ma'lumotlari qat'iy sir saqlanishiga kafolat beramiz.",
      a3Title: "Tezkorlik va byurokratiyasizlik", a3Desc: "Siz biznes bilan shug'ullanasiz, barcha hujjatbozlik va davlat idoralari bilan ishlashni o'zimiz hal qilamiz."
    },
    process: {
      title: "Biz qanday ishlaymiz?", desc: "Muammongizni qonuniy hal qilish uchun 4 ta oddiy qadam",
      p1Title: "Ariza qoldirish", p1Desc: "Sayt orqali ariza qoldirasiz yoki bizga qo'ng'iroq qilasiz.",
      p2Title: "Bepul tahlil", p2Desc: "Yuristimiz holatingizni bepul o'rganib chiqadi va yechim taklif qiladi.",
      p3Title: "Shartnoma", p3Desc: "Rasmiy shartnoma tuzamiz va barcha mas'uliyatni o'z zimmamizga olamiz.",
      p4Title: "Natija", p4Desc: "Sizning muammongiz qonuniy, tez va xavfsiz hal etiladi."
    },
    team: {
      title: "Bizning Mutaxassislar", desc: "Sizning manfaatlaringizni ko'p yillik tajribaga ega professionallar himoya qiladi",
      t1Name: "Po'lat Xudayberdiyevich", t1Role: "Katta huquqshunos ", t1Desc: "Biznesni ro'yxatdan o'tkazish va litsenziyalash bo'yicha 10+ yillik tajriba. Yuzlab korxonalarga yuridik maslahat bergan.",
      t2Name: "Muhammad Rabbimov", t2Role: "Yurist yordamchisi", t2Desc: "Iqtisodiy nizolar va sud jarayonlarida yuzlab muvaffaqiyatli keyslar muallifi. Ishonchli himoya kafolati.",
      t3Title: "Kuchli Jamoa", t3Role: "Sizning biznesingiz uchun", t3Desc: "Bizning jamoamiz turli sohalarga ixtisoslashgan 15 dan ortiq malakali huquqshunoslardan iborat.", t3Badge: "Barcha mutaxassislarimiz"
    },
    partners: { title: "Bizning hamkorlar", desc: "Bizga ishonch bildirgan xalqaro va mahalliy yetakchi kompaniyalar" },
    faq: {
      title: "Ko'p beriladigan savollar", desc: "Mijozlarimiz tomonidan eng ko'p beriladigan savollarga javoblar",
      items: [
        { q: "Biznesni ro'yxatdan o'tkazish qancha vaqt oladi?", a: "Odatda barcha hujjatlar to'liq bo'lganda 3-5 ish kuni ichida davlat ro'yxatidan o'tkazish jarayonlari yakunlanadi." },
        { q: "Xizmatlar narxi qanday belgilanadi?", a: "Narxlar muammoning murakkabligi va xizmat turiga qarab individual belgilanadi. Dastlabki bepul tahlildan so'ng sizga aniq tijorat taklifi beriladi." },
        { q: "Kompaniya sirlari maxfiyligiga kafolat berasizmi?", a: "Ha, albatta. Biz har bir mijoz bilan ishlashni boshlashdan oldin rasmiy Maxfiylik kelishuvi (NDA) imzolaymiz va ma'lumotlar tarqalmasligini qonunan kafolatlaymiz." },
        { q: "Sud jarayonlarida ham ishtirok etasizmi?", a: "Ha, bizning tajribali advokatlarimiz iqtisodiy va xo'jalik sudlarining barcha instansiyalarida kompaniyangiz manfaatlarini ishonchli himoya qiladi." }
      ]
    },
    contact: { title: "Huquqiy maslahat kerakmi?", desc: "Ma'lumotlaringizni qoldiring. Bizning yetakchi yuristlarimiz siz bilan bog'lanib, vaziyatingizni tahlil qilib berishadi. Maxfiylik 100% kafolatlanadi.", fast: "Tezkor aloqa", email: "Elektron manzil", formTitle: "Ariza qoldirish", formName: "Ism yoki Kompaniya nomi", formPhone: "Telefon raqam", formBtn: "Arizani yuborish", sending: "Yuborilmoqda...", success: "✅ Muvaffaqiyatli yuborildi!", error: "❌ Xatolik yuz berdi" },
    footer: { desc: "Biznesingizning ishonchli huquqiy himoyachisi. Biz bilan muammolar tez va qonuniy hal qilinadi.", address: "Toshkent shahri, Yakkasaroy tumani, Cho'pon ota ko'chasi 16-uy. ", hours: "Du-Ju: 09:00 - 18:00", rights: "Barcha huquqlar himoyalangan." }
  },
  ru: {
    nav: { services: "Услуги", adv: "Преимущества", process: "Процесс", team: "Команда", btn: "Консультация" },
    hero: { badge: "Юридические услуги B2B | B2G", title1: "Защитите свой бизнес от", title2: "правовых рисков", desc: "Регистрация предприятий, лицензирование и полная юридическая поддержка в судебных процессах. Доверьте все юридические вопросы профессионалам и работайте спокойно.", btn1: "Бесплатный анализ" },
    services: {
      title: "Решения для вашего бизнеса", desc: "Основные услуги для экономии вашего времени и обеспечения юридической безопасности",
      s1Title: "Регистрация бизнеса", s1Desc: "Открытие новых предприятий (ООО, АО) и законное оформление учредительных документов.",
      s2Title: "Лицензирование", s2Desc: "Получение необходимых лицензий и разрешений для вашей деятельности без бюрократии.",
      s3Title: "Защита в суде", s3Desc: "Полная защита интересов вашей компании в суде по хозяйственным и экономическим спорам.",
      s4Title: "Юридическая консультация", s4Desc: "Экспертиза договоров и постоянные профессиональные юридические консультации в бизнес-процессах.",
      s5Title: "Бухгалтерские услуги", s5Desc: "Полное ведение бухгалтерского учета вашей компании, подготовка и сдача налоговой отчетности.",
      s6Title: "HR и Кадровое дело", s6Desc: "Прием сотрудников на работу, оформление трудовых договоров и законное ведение кадровой документации."
    },
    adv: {
      title: "Почему юридические дела доверяют нам?", desc: "Мы не просто консультируем, мы предотвращаем риски, с которыми может столкнуться ваша компания, и предлагаем практические решения.",
      a1Title: "Глубокий опыт в B2B | B2G секторе", a1Desc: "Мы работаем в основном с юридическими лицами и знаем корпоративное право изнутри.",
      a2Title: "100% Гарантия конфиденциальности", a2Desc: "Мы гарантируем строгую конфиденциальность секретов вашей компании и финансовой информации.",
      a3Title: "Оперативность и без бюрократии", a3Desc: "Вы занимаетесь бизнесом, а всю работу с документами и государственными органами мы берем на себя."
    },
    process: {
      title: "Как мы работаем?", desc: "4 простых шага для законного решения вашей проблемы",
      p1Title: "Оставить заявку", p1Desc: "Вы оставляете заявку на сайте или звоните нам.",
      p2Title: "Бесплатный анализ", p2Desc: "Наш юрист бесплатно изучит вашу ситуацию и предложит решение.",
      p3Title: "Договор", p3Desc: "Мы заключаем официальный договор и берем на себя всю ответственность.",
      p4Title: "Результат", p4Desc: "Ваша проблема будет решена законно, быстро и безопасно."
    },
    team: {
      title: "Наши специалисты", desc: "Ваши интересы защищают профессионалы с многолетним опытом",
      t1Name: "Пулат Худайбердиевич", t1Role: "Старший юрист", t1Desc: "Более 10 лет опыта в регистрации бизнеса и лицензировании. Проконсультировал сотни предприятий.",
      t2Name: "Мухаммад Раббимов", t2Role: "Ассистент юриста", t2Desc: "Автор сотен успешных кейсов в экономических спорах и судебных процессах. Гарантия надежной защиты.",
      t3Title: "Сильная команда", t3Role: "Для вашего бизнеса", t3Desc: "Наша команда состоит из более чем 15 квалифицированных юристов, специализирующихся в различных областях.", t3Badge: "Все специалисты"
    },
    partners: { title: "Наши партнеры", desc: "Ведущие международные и местные компании, доверяющие нам" },
    faq: {
      title: "Часто задаваемые вопросы", desc: "Ответы на самые популярные вопросы наших клиентов",
      items: [
        { q: "Сколько времени занимает регистрация бизнеса?", a: "Обычно, при наличии всех документов, процесс государственной регистрации завершается в течение 3-5 рабочих дней." },
        { q: "Как формируется стоимость услуг?", a: "Цены определяются индивидуально в зависимости от сложности проблемы и вида услуги. После бесплатного анализа мы предоставим вам точное коммерческое предложение." },
        { q: "Вы гарантируете конфиденциальность секретов компании?", a: "Да, конечно. Перед началом работы мы подписываем с каждым клиентом официальное соглашение о неразглашении (NDA) и юридически гарантируем сохранность данных." },
        { q: "Участвуете ли вы в судебных процессах?", a: "Да, наши опытные адвокаты надежно защитят интересы вашей компании во всех инстанциях экономических и хозяйственных судов." }
      ]
    },
    contact: { title: "Нужна юридическая консультация?", desc: "Оставьте свои данные. Наши ведущие юристы свяжутся с вами и проанализируют вашу ситуацию. 100% конфиденциальность гарантирована.", fast: "Быстрая связь", email: "Электронная почта", formTitle: "Оставить заявку", formName: "Имя или название компании", formPhone: "Номер телефона", formBtn: "Отправить заявку", sending: "Отправка...", success: "✅ Успешно отправлено!", error: "❌ Произошла ошибка" },
    footer: { desc: "Надежный правовой защитник вашего бизнеса. С нами проблемы решаются быстро и законно.", address: "г. Ташкент, Яккасарайский район, улица Чупан-ота, дом 16.", hours: "Пн-Пт: 09:00 - 18:00", rights: "Все права защищены." }
  }
};

// --- ANIMATSIYA SOZLAMALARI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('uz');
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle');

  const t = translations[lang];

  useEffect(() => {
    const trackVisit = async () => {
      try {
        if (!sessionStorage.getItem('visited')) {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'visit' })
          });
          sessionStorage.setItem('visited', 'true');
        }
      } catch (error) {
        console.error("Statistika xatosi:", error);
      }
    };
    trackVisit();
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'uz' ? 'ru' : 'uz');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const message = `Yangi ariza (Green&Legal) 🌿\n\n👤 Ism: ${formData.name}\n📞 Telefon: ${formData.phone}`;

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });

      if (telegramResponse.ok) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'lead', name: formData.name, phone: formData.phone })
        });
        setStatus('success');
        setFormData({ name: '', phone: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getButtonText = () => {
    if (status === 'loading') return t.contact.sending;
    if (status === 'success') return t.contact.success;
    if (status === 'error') return t.contact.error;
    return t.contact.formBtn;
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 scroll-smooth overflow-hidden">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <img src="/logo.jpg" alt="Green & Legal Logo" width="40" height="40" fetchpriority="high" className="h-10 w-10 object-contain mix-blend-multiply" />
              <span className="font-bold text-2xl tracking-tight text-stone-900">
                Green<span className="text-[#73976A]">&Legal</span>
              </span>
            </a>

            <nav className="hidden md:flex space-x-6 items-center" aria-label="Asosiy navigatsiya">
              <a href="#services" className="text-sm font-medium text-stone-600 hover:text-[#73976A] transition">{t.nav.services}</a>
              <a href="#advantages" className="text-sm font-medium text-stone-600 hover:text-[#73976A] transition">{t.nav.adv}</a>
              <a href="#process" className="text-sm font-medium text-stone-600 hover:text-[#73976A] transition">{t.nav.process}</a>
              <a href="#team" className="text-sm font-medium text-stone-600 hover:text-[#73976A] transition">{t.nav.team}</a>

              <button aria-label="Tilni almashtirish" onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 transition font-semibold text-sm mx-2">
                <Globe className="h-4 w-4" aria-hidden="true" /> {lang === 'uz' ? 'RU' : 'UZ'}
              </button>

              <a href="#contact" className="px-5 py-2.5 bg-[#73976A] text-white text-sm font-semibold rounded-lg hover:bg-[#5e7a56] transition shadow-sm">
                {t.nav.btn}
              </a>
            </nav>

            <div className="md:hidden flex items-center gap-3">
              <button aria-label="Tilni almashtirish" onClick={toggleLanguage} className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-stone-100 text-stone-700 text-sm font-bold">
                {lang === 'uz' ? 'RU' : 'UZ'}
              </button>
              <button aria-label="Menyuni ochish yoki yopish" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-stone-900 focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200">
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md">{t.nav.services}</a>
              <a href="#advantages" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md">{t.nav.adv}</a>
              <a href="#process" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md">{t.nav.process}</a>
              <a href="#team" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-md">{t.nav.team}</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block mt-4 text-center px-4 py-3 bg-[#73976A] text-white font-semibold rounded-lg shadow-sm">
                {t.nav.btn}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ASOSIY QISM MAIN ICHIGA OLINDI - SEO */}
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[#4a6344] text-sm font-semibold mb-6 border border-[#73976A]/20">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> {t.hero.badge}
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight mb-6">
                {t.hero.title1} <span className="text-[#5b7b52]">{t.hero.title2}</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-stone-600 mb-10 max-w-2xl">
                {t.hero.desc}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="inline-flex justify-center items-center px-6 py-3.5 bg-[#73976A] text-white font-semibold rounded-lg hover:bg-[#5e7a56] transition shadow-lg shadow-[#73976A]/20">
                  {t.hero.btn1} <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
                <a href="tel:+998911620063" className="inline-flex justify-center items-center px-6 py-3.5 bg-white text-stone-800 font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 transition">
                  <Phone className="mr-2 h-5 w-5 text-stone-600" aria-hidden="true" /> +998 91 162 00 63
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{t.services.title}</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t.services.desc}</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
              {[
                { icon: Briefcase, title: t.services.s1Title, desc: t.services.s1Desc },
                { icon: FileText, title: t.services.s2Title, desc: t.services.s2Desc },
                { icon: Scale, title: t.services.s3Title, desc: t.services.s3Desc },
                { icon: ShieldCheck, title: t.services.s4Title, desc: t.services.s4Desc },
                { icon: Calculator, title: t.services.s5Title, desc: t.services.s5Desc },
                { icon: UserCheck, title: t.services.s6Title, desc: t.services.s6Desc }
              ].map((service, index) => (
                <motion.div key={index} variants={fadeInUp} className="p-8 rounded-2xl bg-white border border-stone-200 hover:shadow-xl hover:-translate-y-2 hover:border-[#73976A]/50 transition duration-300 group">
                  <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#73976A] transition">
                    <service.icon className="h-7 w-7 text-[#73976A] group-hover:text-white transition" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ADVANTAGES SECTION */}
        <section id="advantages" className="py-20 bg-[#73976A] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h2 className="text-3xl font-bold mb-6">{t.adv.title}</h2>
                <p className="text-stone-100 text-lg mb-8">{t.adv.desc}</p>

                <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {[
                    { title: t.adv.a1Title, desc: t.adv.a1Desc },
                    { title: t.adv.a2Title, desc: t.adv.a2Desc },
                    { title: t.adv.a3Title, desc: t.adv.a3Desc }
                  ].map((adv, index) => (
                    <motion.div key={index} variants={fadeInUp} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-stone-200 flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        {/* h4 dan h3 ga o'zgartirildi SEO uchun */}
                        <h3 className="text-xl font-semibold mb-1">{adv.title}</h3>
                        <p className="text-stone-100 text-sm">{adv.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div className="relative" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <div className="absolute inset-0 bg-[#5e7a56] rounded-2xl transform translate-x-4 translate-y-4 opacity-40"></div>
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80" alt="Biznes uchrashuv" loading="lazy" decoding="async" className="rounded-2xl relative z-10 w-full h-auto object-cover shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{t.process.title}</h2>
              <p className="text-lg text-stone-600">{t.process.desc}</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10 transform -translate-y-1/2"></div>

              {[
                { step: 1, title: t.process.p1Title, desc: t.process.p1Desc },
                { step: 2, title: t.process.p2Title, desc: t.process.p2Desc },
                { step: 3, title: t.process.p3Title, desc: t.process.p3Desc },
                { step: 4, title: t.process.p4Title, desc: t.process.p4Desc }
              ].map((process, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center relative bg-white px-4">
                  <div className="w-16 h-16 mx-auto bg-[#73976A] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg ring-4 ring-white">{process.step}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{process.title}</h3>
                  <p className="text-stone-600 text-sm">{process.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{t.team.title}</h2>
              <p className="text-lg text-stone-600">{t.team.desc}</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition flex flex-col">
                <img src="/team1.png" alt="Yurist" loading="lazy" decoding="async" className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] object-cover object-center bg-stone-100" />
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-stone-900">{t.team.t1Name}</h3>
                  <p className="text-[#5b7b52] font-semibold mb-3">{t.team.t1Role}</p>
                  <p className="text-stone-600 text-sm">{t.team.t1Desc}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition flex flex-col">
                <img src="/team-2.png" alt="Yurist" loading="lazy" decoding="async" className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] object-cover object-center bg-stone-100" />
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-stone-900">{t.team.t2Name}</h3>
                  <p className="text-[#5b7b52] font-semibold mb-3">{t.team.t2Role}</p>
                  <p className="text-stone-600 text-sm">{t.team.t2Desc}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition flex flex-col md:hidden lg:flex">
                <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-stone-100 flex flex-col items-center justify-center text-stone-500">
                  <Users className="h-16 w-16 mb-2" aria-hidden="true" />
                  <span className="font-medium">{t.team.t3Badge}</span>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-stone-900">{t.team.t3Title}</h3>
                  <p className="text-[#5b7b52] font-semibold mb-3">{t.team.t3Role}</p>
                  <p className="text-stone-600 text-sm">{t.team.t3Desc}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PARTNERS (HAMKORLAR) SECTION */}
        <section id="partners" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{t.partners.title}</h2>
              <p className="text-lg text-stone-600">{t.partners.desc}</p>
            </motion.div>

            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {[...Array(12)].map((_, index) => (
                <motion.div key={index} variants={fadeInUp} className="w-full h-40 bg-stone-100 rounded-lg flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer border border-stone-200 hover:border-[#73976A]/30 hover:bg-white">
                  <img src={`/partners/logo${index + 1}.png`} alt={`Partner ${index + 1}`} loading="lazy" decoding="async" width="200" height="40" className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <span style={{display: 'none'}} className="text-stone-500 font-bold text-lg">LOGO {index + 1}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{t.faq.title}</h2>
              <p className="text-lg text-stone-600">{t.faq.desc}</p>
            </motion.div>

            <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {t.faq.items.map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => toggleFaq(index)} className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-stone-50 transition-colors">
                    <span className="font-semibold text-stone-900 text-lg pr-4">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#73976A] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div id={`faq-answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="px-6 pb-5 text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="py-24 bg-white relative border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row">

                <div className="lg:w-1/2 p-10 lg:p-16 text-white flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.contact.title}</h2>
                  <p className="text-stone-300 text-lg mb-8">{t.contact.desc}</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[#73976A]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-400 items-center">{t.contact.fast}</p>
                        <p className="font-semibold text-lg">+998 91 162 00 63</p>
                        <p className="font-semibold text-lg">+998 95 676 01 63</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[#73976A]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-400">{t.contact.email}</p>
                        <p className="font-semibold text-lg">info@greenlegal.uz</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 bg-stone-50 p-10 lg:p-16">
                  <form className="space-y-5" onSubmit={sendToTelegram}>
                    <h3 className="text-2xl font-bold text-stone-900 mb-6">{t.contact.formTitle}</h3>
                    <div>
                      <label htmlFor="formName" className="block text-sm font-medium text-stone-700 mb-2">{t.contact.formName}</label>
                      <input id="formName" type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#73976A] focus:border-[#73976A] outline-none transition bg-white text-stone-900" placeholder="MChJ Ideal Biznes" />
                    </div>
                    <div>
                      <label htmlFor="formPhone" className="block text-sm font-medium text-stone-700 mb-2">{t.contact.formPhone}</label>
                      <input id="formPhone" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#73976A] focus:border-[#73976A] outline-none transition bg-white text-stone-900" placeholder="+998" />
                    </div>
                    <button type="submit" disabled={status === 'loading'} className={`w-full py-4 text-white font-bold rounded-lg transition shadow-lg mt-4 flex justify-center items-center ${ status === 'success' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-[#73976A] hover:bg-[#5e7a56]' }`}>
                      {getButtonText()}
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER & MAP */}
      <footer className="bg-stone-950 pt-16 border-t border-stone-800 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-1.5 rounded-lg">
                   <img src="/logo.jpg" alt="Green & Legal Logo" width="32" height="32" loading="lazy" decoding="async" className="h-8 w-8 object-contain" />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Green<span className="text-[#73976A]">&Legal</span>
                </span>
              </div>
              <p className="text-stone-400 mb-8 max-w-md">{t.footer.desc}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#73976A] mt-1 flex-shrink-0" aria-hidden="true" />
                  <p>{t.footer.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#73976A] flex-shrink-0" aria-hidden="true" />
                  <p>{t.footer.hours}</p>
                </div>
              </div>
            </div>

            <div className="h-64 lg:h-auto rounded-xl overflow-hidden shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.737489217121!2d69.22463708632729!3d41.271051297352585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b76a3584e745d11%3A0xcfddd6323aa4d27c!2sGreen%26Legal!5e0!3m2!1sen!2s!4v1771841167977!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0, minHeight: "250px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location"></iframe>
            </div>

          </div>
          <div className="border-t border-stone-800 py-8 text-center text-sm text-stone-500">
            <p>© {new Date().getFullYear()} Green&Legal. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
