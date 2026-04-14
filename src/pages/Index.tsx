import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/7d473f99-afc1-46c3-bcf6-b47621f9bda1.jpg";
const MASSAGE_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/9518239d-06d6-4a11-b97a-10cbbb2eab29.jpg";
const SAUNA_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/e62b155f-b3a1-4913-acfe-8e500ed35eaa.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Пространства", href: "#spaces" },
  { label: "Программы", href: "#programs" },
  { label: "Галерея", href: "#gallery" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SPACES = [
  { icon: "Waves", title: "Бассейн", desc: "Термальный бассейн 34°C с подсветкой и гидромассажными форсунками", tag: "Вода", img: HERO_IMAGE },
  { icon: "Flame", title: "Финская сауна", desc: "Классическая сауна из кедра до 90°C с берёзовыми вениками и ароматами", tag: "Жар", img: SAUNA_IMAGE },
  { icon: "Wind", title: "Хамам", desc: "Турецкая баня с мраморным камнем и традиционным пенным массажем", tag: "Пар", img: MASSAGE_IMAGE },
  { icon: "Leaf", title: "Массажный зал", desc: "10 кабинетов для всех видов массажа — от тайского до стоун-терапии", tag: "Тело", img: MASSAGE_IMAGE },
  { icon: "Sparkles", title: "Зона флоатинга", desc: "Сенсорная депривация в солевом растворе для глубокого расслабления", tag: "Разум", img: SAUNA_IMAGE },
  { icon: "Heart", title: "Beauty-зона", desc: "Косметические процедуры, обёртывания и уходовые ритуалы для кожи", tag: "Красота", img: HERO_IMAGE },
];

const PROGRAMS = [
  { title: "День восстановления", duration: "6 часов", price: "от 4 900 ₽", features: ["Бассейн и сауны", "Ароматический массаж 60 мин", "Фито-чай и фрукты", "Халат и тапочки"], popular: false },
  { title: "Ритуал обновления", duration: "8 часов", price: "от 8 500 ₽", features: ["Все зоны без ограничений", "Хамам-ритуал 90 мин", "Флоатинг 60 мин", "Ужин в ресторане"], popular: true },
  { title: "Weekend Escape", duration: "2 дня", price: "от 18 900 ₽", features: ["Размещение в номере-люкс", "3 процедуры на выбор", "Завтрак и ужин", "Персональный консьерж"], popular: false },
];

const GALLERY_ITEMS = [
  { img: HERO_IMAGE, title: "Термальный бассейн", cat: "Бассейн" },
  { img: SAUNA_IMAGE, title: "Финская сауна", cat: "Сауны" },
  { img: MASSAGE_IMAGE, title: "Массажный ритуал", cat: "Массаж" },
  { img: HERO_IMAGE, title: "Зона релакса", cat: "Отдых" },
  { img: SAUNA_IMAGE, title: "Хамам", cat: "Сауны" },
  { img: MASSAGE_IMAGE, title: "Флоатинг", cat: "Разум" },
];

const GALLERY_CATS = ["Все", "Бассейн", "Сауны", "Массаж", "Отдых", "Разум"];

const REVIEWS = [
  { name: "Анна К.", stars: 5, text: "Была на программе «Ритуал обновления» — это просто космос. Хамам с пенным массажем, потом флоатинг... выхожу как новорождённая. Персонал — высший класс.", role: "Постоянный гость" },
  { name: "Дмитрий В.", stars: 5, text: "Привожу сюда партнёров на бизнес-встречи в неформальной обстановке. Уровень сервиса соответствует самым высоким стандартам. Рекомендую всем.", role: "Предприниматель" },
  { name: "Мария Л.", stars: 5, text: "Брала корпоративный пакет для команды. Все в восторге! Отдельное спасибо за организацию и внимание к деталям. Обязательно вернёмся.", role: "HR-директор" },
  { name: "Сергей М.", stars: 5, text: "Флоатинг-капсула — открытие года. После первой сессии сон нормализовался, хроническое напряжение в спине ушло. Теперь хожу каждую неделю.", role: "Гость" },
];

const BLOG_POSTS = [
  { title: "Как хамам меняет кожу за один сеанс", date: "8 апреля 2026", read: "5 мин", tag: "Процедуры", img: MASSAGE_IMAGE },
  { title: "Флоатинг: что происходит с мозгом в темноте", date: "2 апреля 2026", read: "7 мин", tag: "Наука", img: SAUNA_IMAGE },
  { title: "Сезонные ритуалы: весеннее очищение тела", date: "25 марта 2026", read: "4 мин", tag: "Ритуалы", img: HERO_IMAGE },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryCat, setGalleryCat] = useState("Все");
  const [lightbox, setLightbox] = useState<null | { img: string; title: string }>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map(i => i.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = galleryCat === "Все" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === galleryCat);

  return (
    <div className="min-h-screen bg-[#0D0B0A] text-[#EDE8DF] font-body overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0D0B0A]/95 backdrop-blur-lg border-b border-[#D4A855]/10 py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A855] to-[#B8943A] flex items-center justify-center">
              <span className="text-[#0D0B0A] font-bold text-xs">A</span>
            </div>
            <span className="font-display text-xl text-[#D4A855] tracking-widest uppercase">AURA</span>
            <span className="text-[#8B7355] text-xs tracking-[0.3em] uppercase mt-1">SPA</span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href}
                className={`nav-link text-sm tracking-wide transition-colors ${activeNav === item.href.replace("#", "") ? "text-[#D4A855] active" : "text-[#8B7355] hover:text-[#EDE8DF]"}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contacts" className="hidden lg:block px-5 py-2 bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] text-sm font-semibold rounded-full hover:scale-105 transition-transform">
              Записаться
            </a>
            <button className="lg:hidden text-[#D4A855]" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#0D0B0A]/98 border-t border-[#D4A855]/10 px-6 py-4 flex flex-col gap-4" style={{ animation: 'fadeIn 0.3s ease' }}>
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href} className="text-[#8B7355] hover:text-[#D4A855] transition-colors py-1" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contacts" className="mt-2 px-5 py-3 bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] text-sm font-semibold rounded-full text-center">
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <div id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="AURA SPA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0A]/70 via-[#0D0B0A]/40 to-[#0D0B0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A]/50 via-transparent to-[#0D0B0A]/30" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A855]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#4ECDC4]/5 blur-3xl" style={{ animation: 'float 6s ease-in-out infinite reverse' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A855]/30 bg-[#D4A855]/10 text-[#D4A855] text-xs tracking-[0.2em] uppercase mb-6 animate-fade-in">
            <Icon name="Sparkles" size={12} />
            Премиальный СПА-центр
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-4 animate-fade-up text-white" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            AURA <span className="italic text-[#D4A855]">SPA</span>
          </h1>
          <p className="text-[#8B7355] text-lg md:text-xl font-light tracking-wide mb-3 animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            Пространство вашего восстановления
          </p>
          <p className="text-[#EDE8DF]/70 text-base md:text-lg max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
            Бассейн, хамам, финская сауна, флоатинг и авторские ритуалы — <br className="hidden md:block" />всё в одном пространстве
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
            <a href="#contacts" className="px-8 py-4 bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,168,85,0.3)] text-sm tracking-wide">
              Забронировать визит
            </a>
            <a href="#programs" className="px-8 py-4 border border-[#D4A855]/40 text-[#D4A855] rounded-full hover:bg-[#D4A855]/10 transition-all text-sm tracking-wide">
              Посмотреть программы
            </a>
          </div>
        </div>

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[#D4A855]/60" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden py-4 border-t border-[#D4A855]/10 bg-[#0D0B0A]/60 backdrop-blur-sm">
          <div className="marquee-track flex gap-12 whitespace-nowrap">
            {["Бассейн", "Хамам", "Сауна", "Флоатинг", "Массаж", "Обёртывания", "Пилинг", "Ароматерапия",
              "Бассейн", "Хамам", "Сауна", "Флоатинг", "Массаж", "Обёртывания", "Пилинг", "Ароматерапия"].map((t, i) => (
              <span key={i} className="text-[#8B7355] text-xs tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#D4A855] inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <Section className="py-16 border-b border-[#D4A855]/10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "12+", label: "Зон отдыха" },
            { num: "50+", label: "Видов процедур" },
            { num: "8 000+", label: "Довольных гостей" },
            { num: "3 года", label: "Безупречного сервиса" },
          ].map((s) => (
            <div key={s.label} className="group">
              <div className="font-display text-5xl md:text-6xl text-[#D4A855] font-light mb-2 group-hover:scale-110 transition-transform">{s.num}</div>
              <div className="text-[#8B7355] text-sm tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SPACES */}
      <Section id="spaces" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4A855] text-xs tracking-[0.3em] uppercase">Наши зоны</span>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Пространства</h2>
            <div className="w-16 h-px bg-[#D4A855] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPACES.map((space) => (
              <div key={space.title} className="gallery-item rounded-2xl overflow-hidden hover-lift" style={{ background: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,168,85,0.15)' }}>
                <div className="relative h-48">
                  <img src={space.img} alt={space.title} className="w-full h-full object-cover" />
                  <div className="gallery-overlay" />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#D4A855]/20 border border-[#D4A855]/40 text-[#D4A855] text-xs rounded-full backdrop-blur-sm">
                    {space.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D4A855]/10 border border-[#D4A855]/20 flex items-center justify-center">
                      <Icon name={space.icon} size={16} className="text-[#D4A855]" />
                    </div>
                    <h3 className="font-display text-xl text-white font-medium">{space.title}</h3>
                  </div>
                  <p className="text-[#8B7355] text-sm leading-relaxed">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section id="programs" className="py-24 bg-[#0F0D0B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#4ECDC4] text-xs tracking-[0.3em] uppercase">Выберите своё</span>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Программы</h2>
            <div className="w-16 h-px bg-[#4ECDC4] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div key={prog.title} className={`relative rounded-2xl overflow-hidden transition-all hover-lift ${prog.popular ? "border border-[#D4A855]/50 shadow-[0_0_30px_rgba(212,168,85,0.2)]" : ""}`}
                style={!prog.popular ? { background: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,168,85,0.15)' } : {}}>
                {prog.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-[#D4A855] to-[#F0C878] text-center text-[#0D0B0A] text-xs font-bold tracking-wider uppercase">
                    Популярный выбор
                  </div>
                )}
                <div className={`p-7 ${prog.popular ? "pt-12 bg-[#1A1410]" : ""}`}>
                  <div className="mb-4">
                    <h3 className="font-display text-2xl text-white font-medium mb-1">{prog.title}</h3>
                    <span className="text-[#8B7355] text-sm flex items-center gap-1">
                      <Icon name="Clock" size={12} className="text-[#8B7355]" />{prog.duration}
                    </span>
                  </div>
                  <div className="mb-6">
                    <div className="text-3xl font-display text-[#D4A855]">{prog.price}</div>
                  </div>
                  <ul className="space-y-3 mb-7">
                    {prog.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-[#EDE8DF]/80">
                        <Icon name="Check" size={14} className="text-[#4ECDC4] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacts" className={`block text-center py-3 rounded-full text-sm font-semibold transition-all ${prog.popular ? "bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] hover:scale-105" : "border border-[#D4A855]/40 text-[#D4A855] hover:bg-[#D4A855]/10"}`}>
                    Выбрать программу
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4A855] text-xs tracking-[0.3em] uppercase">Наши пространства</span>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Галерея</h2>
            <div className="w-16 h-px bg-[#D4A855] mx-auto mt-4" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {GALLERY_CATS.map(cat => (
              <button key={cat} onClick={() => setGalleryCat(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${galleryCat === cat ? "bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] font-semibold" : "border border-[#D4A855]/25 text-[#8B7355] hover:border-[#D4A855]/60 hover:text-[#D4A855]"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <div key={i} className="gallery-item rounded-xl cursor-pointer overflow-hidden" style={{ aspectRatio: '4/3' }} onClick={() => setLightbox(item)}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="gallery-overlay flex flex-col justify-end p-4">
                  <span className="text-[#D4A855] text-xs tracking-wider uppercase mb-1">{item.cat}</span>
                  <span className="text-white font-display text-lg">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" style={{ animation: 'fadeIn 0.3s ease' }} onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
            <Icon name="X" size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full rounded-2xl" style={{ animation: 'scaleIn 0.4s ease' }} />
            <p className="text-center text-[#D4A855] font-display text-xl mt-4">{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <Section id="about" className="py-24 bg-[#0F0D0B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#4ECDC4] text-xs tracking-[0.3em] uppercase">Кто мы</span>
              <h2 className="font-display text-5xl font-light mt-2 mb-6 text-white leading-tight">
                Три года <br /><span className="italic text-[#D4A855]">философии</span> <br />восстановления
              </h2>
              <p className="text-[#8B7355] leading-relaxed mb-4">
                AURA SPA — это не просто спа-центр. Это пространство, где профессиональные ритуалы встречаются с персональным подходом. Каждый визит — уникальный опыт, созданный именно для вас.
              </p>
              <p className="text-[#8B7355] leading-relaxed mb-8">
                Наша команда из 35 специалистов прошла обучение в лучших SPA-академиях Европы и Азии. Мы следим за трендами велнес-индустрии и регулярно обновляем программы.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Лучший СПА года 2024" },
                  { icon: "Users", text: "35 сертифицированных мастеров" },
                  { icon: "MapPin", text: "Центр города, 2 000 м²" },
                  { icon: "Star", text: "4.9 на Яндекс.Картах" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(26,20,16,0.7)', border: '1px solid rgba(212,168,85,0.15)' }}>
                    <Icon name={item.icon} size={16} className="text-[#D4A855] mt-0.5 shrink-0" />
                    <span className="text-[#EDE8DF]/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={MASSAGE_IMAGE} alt="О нас" className="w-full rounded-2xl object-cover" style={{ height: '420px' }} />
              <div className="absolute -bottom-4 -left-4 rounded-2xl p-5" style={{ background: 'rgba(26,20,16,0.9)', border: '1px solid rgba(212,168,85,0.2)', backdropFilter: 'blur(12px)' }}>
                <div className="font-display text-3xl text-[#D4A855]">8 000+</div>
                <div className="text-[#8B7355] text-xs mt-1">Гостей за 3 года</div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A855] to-[#B8943A] flex items-center justify-center animate-float">
                <Icon name="Sparkles" size={20} className="text-[#0D0B0A]" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4A855] text-xs tracking-[0.3em] uppercase">Говорят гости</span>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Отзывы</h2>
            <div className="w-16 h-px bg-[#D4A855] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl p-7 hover-lift" style={{ background: 'rgba(26,20,16,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,168,85,0.15)' }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-[#D4A855]" />
                  ))}
                </div>
                <p className="text-[#EDE8DF]/80 leading-relaxed mb-5 italic font-display text-lg">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#D4A855]/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A855] to-[#B8943A] flex items-center justify-center text-[#0D0B0A] font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{r.name}</div>
                    <div className="text-[#8B7355] text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BLOG */}
      <Section id="blog" className="py-24 bg-[#0F0D0B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-[#4ECDC4] text-xs tracking-[0.3em] uppercase">Полезное</span>
              <h2 className="font-display text-5xl font-light mt-2 text-white">Блог</h2>
            </div>
            <a href="#" className="text-[#D4A855] text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Все статьи <Icon name="ArrowRight" size={16} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="gallery-item rounded-2xl overflow-hidden hover-lift cursor-pointer" style={{ background: 'rgba(26,20,16,0.7)', border: '1px solid rgba(212,168,85,0.15)' }}>
                <div className="h-52 relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                  <div className="gallery-overlay" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 text-[#4ECDC4] text-xs rounded-full backdrop-blur-sm">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white font-medium mb-3 leading-tight">{post.title}</h3>
                  <div className="flex items-center gap-4 text-[#8B7355] text-xs">
                    <span className="flex items-center gap-1"><Icon name="Calendar" size={11} className="text-[#8B7355]" />{post.date}</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={11} className="text-[#8B7355]" />{post.read} чтения</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4A855] text-xs tracking-[0.3em] uppercase">Мы ждём вас</span>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Контакты</h2>
            <div className="w-16 h-px bg-[#D4A855] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl text-white mb-6">Записаться на визит</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#1A1410] border border-[#D4A855]/20 rounded-xl px-5 py-3.5 text-[#EDE8DF] placeholder-[#8B7355] focus:border-[#D4A855]/60 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-[#1A1410] border border-[#D4A855]/20 rounded-xl px-5 py-3.5 text-[#EDE8DF] placeholder-[#8B7355] focus:border-[#D4A855]/60 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Пожелания или вопросы"
                  rows={4}
                  value={formData.comment}
                  onChange={e => setFormData(p => ({ ...p, comment: e.target.value }))}
                  className="w-full bg-[#1A1410] border border-[#D4A855]/20 rounded-xl px-5 py-3.5 text-[#EDE8DF] placeholder-[#8B7355] focus:border-[#D4A855]/60 focus:outline-none transition-colors resize-none"
                />
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#D4A855] to-[#B8943A] text-[#0D0B0A] font-semibold rounded-xl hover:scale-[1.02] transition-transform text-sm tracking-wide shadow-[0_0_30px_rgba(212,168,85,0.3)]">
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-2xl text-white mb-6">Как нас найти</h3>
              {[
                { icon: "MapPin", title: "Адрес", text: "ул. Тверская, 15, Москва\nМ. Тверская, 2 мин пешком" },
                { icon: "Phone", title: "Телефон", text: "+7 (495) 123-45-67\nЕжедневно 8:00–23:00" },
                { icon: "Mail", title: "Email", text: "hello@auraspa.ru\nОтвечаем в течение часа" },
                { icon: "Clock", title: "Время работы", text: "Пн–Вс: 8:00–23:00\nБез выходных" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 rounded-xl transition-colors" style={{ background: 'rgba(26,20,16,0.7)', border: '1px solid rgba(212,168,85,0.15)' }}>
                  <div className="w-10 h-10 rounded-xl bg-[#D4A855]/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#D4A855]" />
                  </div>
                  <div>
                    <div className="text-[#D4A855] text-xs tracking-wide uppercase mb-1">{item.title}</div>
                    <div className="text-[#EDE8DF]/80 text-sm leading-relaxed whitespace-pre-line">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-[#D4A855]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4A855] to-[#B8943A] flex items-center justify-center">
              <span className="text-[#0D0B0A] font-bold text-xs">A</span>
            </div>
            <span className="font-display text-lg text-[#D4A855] tracking-widest">AURA SPA</span>
          </div>
          <div className="text-[#8B7355] text-xs text-center">
            © 2026 AURA SPA. Все права защищены.
          </div>
          <div className="flex gap-4">
            {["Instagram", "MessageCircle", "Send"].map(icon => (
              <a key={icon} href="#" className="w-9 h-9 rounded-full border border-[#D4A855]/20 flex items-center justify-center text-[#8B7355] hover:text-[#D4A855] hover:border-[#D4A855]/50 transition-all">
                <Icon name={icon} size={15} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}