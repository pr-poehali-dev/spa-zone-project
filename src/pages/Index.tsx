import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/b1f71b4a-b776-4b5e-9897-6d0804dffd53.jpg";
const MASSAGE_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/44677bce-753e-4be3-8f94-4980cd2cde7b.jpg";
const SAUNA_IMAGE = "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/6179931e-a6e4-4205-b02d-f9566560def4.jpg";

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
  { icon: "Wind", title: "Пространство пара", desc: "Турецкая баня с мраморным камнем и традиционным пенным массажем", tag: "Пар", img: MASSAGE_IMAGE },
  { icon: "Leaf", title: "Массажный зал", desc: "10 кабинетов для всех видов массажа — от тайского до стоун-терапии", tag: "Тело", img: MASSAGE_IMAGE },
  { icon: "Trees", title: "Можжевеловая комната", desc: "Ароматная комната с можжевеловыми досками и эфирными маслами — природное восстановление дыхания", tag: "Природа", img: SAUNA_IMAGE },
  { icon: "Heart", title: "Beauty-зона", desc: "Косметические процедуры, обёртывания и уходовые ритуалы для кожи", tag: "Красота", img: HERO_IMAGE },
];

const PROGRAMS = [
  { title: "День восстановления", duration: "6 часов", price: "от 4 900 ₽", features: ["Бассейн и сауны", "Ароматический массаж 60 мин", "Фито-чай и фрукты", "Халат и тапочки"], popular: false },
  { title: "Ритуал обновления", duration: "8 часов", price: "от 8 500 ₽", features: ["Все зоны без ограничений", "Пространство пара 90 мин", "Можжевеловая комната 60 мин", "Ужин в ресторане"], popular: true },
  { title: "Weekend Escape", duration: "2 дня", price: "от 18 900 ₽", features: ["Размещение в номере-люкс", "3 процедуры на выбор", "Завтрак и ужин", "Персональный консьерж"], popular: false },
];

const GALLERY_ITEMS = [
  { img: HERO_IMAGE, title: "Термальный бассейн", cat: "Бассейн" },
  { img: SAUNA_IMAGE, title: "Финская сауна", cat: "Сауны" },
  { img: MASSAGE_IMAGE, title: "Массажный ритуал", cat: "Массаж" },
  { img: HERO_IMAGE, title: "Зона релакса", cat: "Отдых" },
  { img: SAUNA_IMAGE, title: "Хамам", cat: "Сауны" },
  { img: SAUNA_IMAGE, title: "Можжевеловая комната", cat: "Природа" },
];

const GALLERY_CATS = ["Все", "Бассейн", "Сауны", "Массаж", "Отдых", "Природа"];

const REVIEWS = [
  { name: "Анна К.", stars: 5, text: "Была на программе «Ритуал обновления» — это просто космос. Пространство пара с пенным массажем, потом можжевеловая комната... выхожу как новорождённая. Персонал — высший класс.", role: "Постоянный гость" },
  { name: "Дмитрий В.", stars: 5, text: "Привожу сюда партнёров на бизнес-встречи в неформальной обстановке. Уровень сервиса соответствует самым высоким стандартам. Рекомендую всем.", role: "Предприниматель" },
  { name: "Мария Л.", stars: 5, text: "Брала корпоративный пакет для команды. Все в восторге! Отдельное спасибо за организацию и внимание к деталям. Обязательно вернёмся.", role: "HR-директор" },
  { name: "Сергей М.", stars: 5, text: "Можжевеловая комната — открытие года. После первой сессии дышать стало легче, хроническое напряжение ушло. Теперь хожу каждую неделю.", role: "Гость" },
];

const BLOG_POSTS = [
  { title: "Как пространство пара меняет кожу за один сеанс", date: "8 апреля 2026", read: "5 мин", tag: "Процедуры", img: MASSAGE_IMAGE },
  { title: "Можжевельник: что происходит с телом в ароматной комнате", date: "2 апреля 2026", read: "7 мин", tag: "Наука", img: SAUNA_IMAGE },
  { title: "Сезонные ритуалы: весеннее очищение тела", date: "25 марта 2026", read: "4 мин", tag: "Ритуалы", img: HERO_IMAGE },
];

function useInView(threshold = 0.12) {
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
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
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
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = galleryCat === "Все" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === galleryCat);

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#1C2B27] font-body overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#4A7C6F] flex items-center justify-center">
              <span className="text-white font-bold text-xs tracking-wider">ПП</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base text-[#1C2B27] tracking-[0.15em] uppercase font-medium">Пространство</span>
              <span className="font-display text-base text-[#4A7C6F] tracking-[0.15em] uppercase italic">Пара</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href}
                className={`nav-link-light ${activeNav === item.href.replace("#", "") ? "active" : ""}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contacts" className="hidden lg:block btn-primary">Записаться</a>
            <button className="lg:hidden text-[#1C2B27]" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8DFD0] px-6 py-5 flex flex-col gap-4 shadow-lg animate-fade-in">
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href} className="text-[#1C2B27] hover:text-[#4A7C6F] transition-colors text-sm tracking-wide py-1 border-b border-[#F7F3EE]" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contacts" className="mt-2 btn-primary text-center">Записаться</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <div id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Пространство Пара" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F3EE]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <div className="section-label mb-4 animate-fade-in">СПА-центр · г. Артём</div>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-6 text-[#1C2B27] animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              Простран-<br />ство<br /><span className="italic text-[#4A7C6F]">Пара</span>
            </h1>
            <div className="divider" />
            <p className="text-[#8B9E98] text-base font-light leading-relaxed mb-8 max-w-sm animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              Бассейн, финская сауна, хамам, можжевеловая комната и авторские ритуалы восстановления
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
              <a href="#contacts" className="btn-primary">Забронировать визит</a>
              <a href="#programs" className="btn-outline">Программы</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-[#4A7C6F]/10 bg-white/60 backdrop-blur-sm">
          <div className="marquee-track flex gap-10 whitespace-nowrap">
            {["Бассейн", "Сауна", "Хамам", "Массаж", "Пространство пара", "Можжевеловая комната", "Обёртывания", "Ароматерапия",
              "Бассейн", "Сауна", "Хамам", "Массаж", "Пространство пара", "Можжевеловая комната", "Обёртывания", "Ароматерапия"].map((t, i) => (
              <span key={i} className="text-[#8B9E98] text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-[#4A7C6F] inline-block" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <Section className="py-16 bg-white border-b border-[#E8DFD0]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { num: "12+", label: "Зон отдыха" },
            { num: "50+", label: "Видов процедур" },
            { num: "8 000+", label: "Довольных гостей" },
            { num: "3 года", label: "Безупречного сервиса" },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-5xl text-[#4A7C6F] font-light mb-2">{s.num}</div>
              <div className="text-[#8B9E98] text-xs tracking-[0.15em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SPACES */}
      <Section id="spaces" className="py-24 bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-label">Наши зоны</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-[#1C2B27]">Пространства</h2>
            <div className="divider" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPACES.map(space => (
              <div key={space.title} className="card-natural bg-white">
                <div className="relative h-52 overflow-hidden">
                  <img src={space.img} alt={space.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="tag-green">{space.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#EAF2EF] flex items-center justify-center">
                      <Icon name={space.icon} size={15} className="text-[#4A7C6F]" />
                    </div>
                    <h3 className="font-display text-xl text-[#1C2B27] font-medium">{space.title}</h3>
                  </div>
                  <p className="text-[#8B9E98] text-sm leading-relaxed">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section id="programs" className="py-24 bg-[#1C2B27]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="text-[#6B9E91] text-[11px] tracking-[0.25em] uppercase font-medium">Выберите своё</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-white">Программы</h2>
            <div className="w-10 h-px bg-[#4A7C6F] mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map(prog => (
              <div key={prog.title} className={`relative flex flex-col ${prog.popular ? "bg-[#4A7C6F]" : "bg-[#243830]"} p-7 transition-transform hover:-translate-y-1`}>
                {prog.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#C4956A] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">
                    Популярное
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-display text-2xl text-white font-light mb-2">{prog.title}</h3>
                  <span className="text-[#6B9E91] text-xs flex items-center gap-1">
                    <Icon name="Clock" size={11} className="text-[#6B9E91]" />{prog.duration}
                  </span>
                </div>
                <div className="text-3xl font-display text-white font-light mb-6">{prog.price}</div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {prog.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                      <Icon name="Check" size={13} className="text-[#6B9E91] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className={`text-center py-3 text-sm font-medium tracking-[0.1em] uppercase transition-all ${prog.popular ? "bg-white text-[#4A7C6F] hover:bg-[#F7F3EE]" : "border border-[#4A7C6F] text-white hover:bg-[#4A7C6F]"}`}>
                  Выбрать
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24 bg-[#F7F3EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="section-label">Наши пространства</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-[#1C2B27]">Галерея</h2>
            <div className="divider" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {GALLERY_CATS.map(cat => (
              <button key={cat} onClick={() => setGalleryCat(cat)}
                className={`px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-all ${galleryCat === cat ? "bg-[#4A7C6F] text-white" : "bg-white text-[#8B9E98] border border-[#E8DFD0] hover:border-[#4A7C6F] hover:text-[#4A7C6F]"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((item, i) => (
              <div key={i} className="gallery-item cursor-pointer" style={{ aspectRatio: '4/3' }} onClick={() => setLightbox(item)}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="gallery-overlay flex flex-col justify-end p-4">
                  <span className="text-[#6B9E91] text-[10px] tracking-[0.2em] uppercase mb-1">{item.cat}</span>
                  <span className="text-white font-display text-xl">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
            <Icon name="X" size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full" />
            <p className="text-center text-white/70 font-display text-lg mt-3">{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <Section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={MASSAGE_IMAGE} alt="О нас" className="w-full object-cover" style={{ height: '480px' }} />
              <div className="absolute -bottom-5 -right-5 bg-[#4A7C6F] p-6 hidden md:block">
                <div className="font-display text-4xl text-white font-light">8 000+</div>
                <div className="text-[#6B9E91] text-xs tracking-wide mt-1">Гостей за 3 года</div>
              </div>
            </div>
            <div>
              <div className="section-label">Кто мы</div>
              <h2 className="font-display text-5xl font-light mt-2 mb-4 text-[#1C2B27] leading-tight">
                Три года<br /><span className="italic text-[#4A7C6F]">философии</span><br />восстановления
              </h2>
              <div className="divider" />
              <p className="text-[#8B9E98] leading-relaxed mb-4 text-sm mt-4">
                Пространство Пара — это не просто спа-центр. Это место, где профессиональные ритуалы встречаются с персональным подходом. Каждый визит — уникальный опыт, созданный именно для вас.
              </p>
              <p className="text-[#8B9E98] leading-relaxed mb-8 text-sm">
                Наша команда из 35 специалистов прошла обучение в лучших велнес-академиях. Мы следим за трендами индустрии и регулярно обновляем программы.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Award", text: "Лучший СПА 2024" },
                  { icon: "Users", text: "35 мастеров" },
                  { icon: "MapPin", text: "г. Артём, мкр. Глобус 2" },
                  { icon: "Star", text: "4.9 на Яндекс.Картах" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 py-3 border-b border-[#E8DFD0]">
                    <Icon name={item.icon} size={15} className="text-[#4A7C6F] shrink-0" />
                    <span className="text-[#1C2B27] text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-24 bg-[#F7F3EE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-label">Говорят гости</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-[#1C2B27]">Отзывы</h2>
            <div className="divider" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-white p-7 border border-[#E8DFD0] transition-shadow hover:shadow-md">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={13} className="text-[#C4956A]" />
                  ))}
                </div>
                <p className="text-[#1C2B27]/80 leading-relaxed mb-5 font-display text-lg italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E8DFD0]">
                  <div className="w-9 h-9 bg-[#4A7C6F] flex items-center justify-center text-white font-medium text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-[#1C2B27] font-medium text-sm">{r.name}</div>
                    <div className="text-[#8B9E98] text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BLOG */}
      <Section id="blog" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="section-label">Полезное</div>
              <h2 className="font-display text-5xl font-light mt-2 text-[#1C2B27]">Блог</h2>
              <div className="divider" />
            </div>
            <a href="#" className="text-[#4A7C6F] text-xs tracking-[0.12em] uppercase flex items-center gap-2 hover:gap-3 transition-all font-medium">
              Все статьи <Icon name="ArrowRight" size={14} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BLOG_POSTS.map(post => (
              <article key={post.title} className="card-natural bg-white cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="tag-warm">{post.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-[#1C2B27] font-medium mb-3 leading-tight">{post.title}</h3>
                  <div className="flex items-center gap-4 text-[#8B9E98] text-xs">
                    <span className="flex items-center gap-1"><Icon name="Calendar" size={10} className="text-[#8B9E98]" />{post.date}</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={10} className="text-[#8B9E98]" />{post.read} чтения</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 bg-[#EAF2EF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-label">Мы ждём вас</div>
            <h2 className="font-display text-5xl md:text-6xl font-light mt-2 text-[#1C2B27]">Контакты</h2>
            <div className="divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl text-[#1C2B27] mb-6">Записаться на визит</h3>
              <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                <input
                  type="text" placeholder="Ваше имя" value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white border border-[#C8D8D4] px-5 py-3.5 text-[#1C2B27] placeholder-[#8B9E98] focus:border-[#4A7C6F] focus:outline-none transition-colors text-sm"
                />
                <input
                  type="tel" placeholder="Номер телефона" value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-white border border-[#C8D8D4] px-5 py-3.5 text-[#1C2B27] placeholder-[#8B9E98] focus:border-[#4A7C6F] focus:outline-none transition-colors text-sm"
                />
                <textarea
                  placeholder="Пожелания или вопросы" rows={4} value={formData.comment}
                  onChange={e => setFormData(p => ({ ...p, comment: e.target.value }))}
                  className="w-full bg-white border border-[#C8D8D4] px-5 py-3.5 text-[#1C2B27] placeholder-[#8B9E98] focus:border-[#4A7C6F] focus:outline-none transition-colors resize-none text-sm"
                />
                <button type="submit" className="w-full btn-primary text-center">
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl text-[#1C2B27] mb-6">Как нас найти</h3>
              {[
                { icon: "MapPin", title: "Адрес", text: "г. Артём, мкр. Глобус 2, дом 1А" },
                { icon: "Phone", title: "Телефон", text: "+7 908 980-35-45" },
                { icon: "Mail", title: "Email", text: "hello@auraspa.ru\nОтвечаем в течение часа" },
                { icon: "Clock", title: "Время работы", text: "Пн–Вс: 8:00–23:00\nБез выходных" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 py-4 border-b border-[#C8D8D4]">
                  <Icon name={item.icon} size={16} className="text-[#4A7C6F] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[#4A7C6F] text-[10px] tracking-[0.15em] uppercase font-medium mb-0.5">{item.title}</div>
                    <div className="text-[#1C2B27] text-sm leading-relaxed whitespace-pre-line">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#1C2B27] border-t border-[#243830]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#4A7C6F] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">ПП</span>
            </div>
            <span className="font-display text-base text-white tracking-[0.15em] uppercase">Пространство Пара</span>
          </div>
          <div className="text-[#8B9E98] text-xs">© 2026 Пространство Пара. Все права защищены.</div>
          <div className="flex gap-3">
            {["Instagram", "MessageCircle", "Send"].map(icon => (
              <a key={icon} href="#" className="w-8 h-8 border border-[#4A7C6F]/40 flex items-center justify-center text-[#8B9E98] hover:text-white hover:border-[#4A7C6F] transition-all">
                <Icon name={icon} size={13} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
