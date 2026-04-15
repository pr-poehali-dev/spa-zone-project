import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/000b3239-ae8e-4c05-9c8f-1203a2f22d2c.jpg";
const POOL_IMAGE =
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/398dec83-3f2a-46f8-ad83-4668bb037d5a.jpg";
const SAUNA_IMAGE =
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b26557f3-6845-4507-9ead-5707dc258983.jpg";
const MASSAGE_IMAGE =
  "https://cdn.poehali.dev/files/546728b2-54c4-4bd3-8489-0759f916742c.jpg";

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

const MARQUEE_ITEMS = [
  "Бассейн", "Финская сауна", "Хаммам", "Массаж", "Пространство пара",
  "Можжевеловая комната", "Обёртывания", "Ароматерапия", "Стоун-терапия", "Beauty-ритуалы",
];

const SPACES = [
  { icon: "Waves", title: "Бассейн", desc: "Термальный бассейн — температура воды под ваш запрос от 36°C и выше. Полное расслабление в тёплой воде.", tag: "Вода", img: POOL_IMAGE },
  { icon: "Flame", title: "Финская сауна", desc: "Классическая финская сауна до 90°C с берёзовыми вениками и натуральными ароматами. После — чан на свежем воздухе на нашей террасе.", tag: "Жар", img: SAUNA_IMAGE },
  { icon: "Wind", title: "Пространство пара", desc: "Турецкая баня с мраморным камнем и традиционным пенным массажем в облаках горячего пара.", tag: "Пар", img: HERO_IMAGE },
  { icon: "Leaf", title: "Массажный зал", desc: "2 кабинета для массажа, обёртываний, спа головы и косметолога.", tag: "Тело", img: MASSAGE_IMAGE, imgs: ["https://cdn.poehali.dev/files/546728b2-54c4-4bd3-8489-0759f916742c.jpg", "https://cdn.poehali.dev/files/1f142cc2-f16d-4c72-a8a2-52ecb84d4849.jpg", "https://cdn.poehali.dev/files/1174c867-0a1f-4ab0-8dc4-f00abe9b028c.jpg"] },
  { icon: "Trees", title: "🌿 Арома-комната", desc: "Можжевеловая комната — приглушённый свет и звуки природы только для вас. Лёжа на сенном матрасе, вдыхая ароматы трав и хвои, вы почувствуете, как тело само отпускает всё лишнее. Стены из можжевеловых спилов наполняют воздух живой смолой — природным антисептиком, который очищает дыхание и успокаивает нервную систему. Над головой — звёздное небо, вокруг — тишина, которую не нужно заслуживать.", tag: "Можжевеловая комната", img: SAUNA_IMAGE, imgs: ["https://cdn.poehali.dev/files/ca1bd218-a636-47d0-9274-451e54c2cd18.jpg", "https://cdn.poehali.dev/files/2eced06b-a37e-48f8-a7b3-3443680ee5e1.jpg"] },
  { icon: "Sparkles", title: "СПА — Косметика, которая работает глубже, чем вы думаете", desc: "Используем космецевтику Комфорт Зон и Талассо Бретань — морские водоросли и минералы Атлантики насыщают кожу йодом, магнием и цинком. В сочетании с теплом хаммама активные вещества проникают в 3–4 раза глубже. Результат уже после первой процедуры: кожа мягкая, упругая — как после моря.", tag: "Красота", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/21f81724-a20a-4ce9-a0d4-d093b4801c05.jpg", imgs: ["https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/21f81724-a20a-4ce9-a0d4-d093b4801c05.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6284b1da-37e5-49a7-884b-955656d70c38.jpg", "https://cdn.poehali.dev/files/7b99a33b-4d26-4682-9186-109c55f0f264.jpg"] },
];

const PROGRAMS = [
  {
    title: "Перезагрузка",
    subtitle: "Идеально для первого визита",
    duration: "6 часов",
    price: "от 4 900 ₽",
    features: ["Бассейн и все сауны", "Ароматический массаж 60 мин", "Фито-чай и фрукты", "Халат и тапочки"],
    popular: false,
    img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/8a2a46a9-6510-4c09-a1dc-dc0a22cc987b.jpg",
  },
  {
    title: "Ритуал обновления",
    subtitle: "Самый популярный выбор",
    duration: "8 часов",
    price: "от 8 500 ₽",
    features: ["Все зоны без ограничений", "Пространство пара 90 мин", "Можжевеловая комната 60 мин", "Ужин в ресторане"],
    popular: true,
    img: "https://cdn.poehali.dev/files/66df40a0-2180-4282-87dd-1d0b6417d29c.jpg",
  },
  {
    title: "Weekend Escape",
    subtitle: "Полное погружение на 2 дня",
    duration: "2 дня",
    price: "от 18 900 ₽",
    features: ["Размещение в номере-люкс", "3 процедуры на выбор", "Завтрак и ужин", "Персональный консьерж"],
    popular: false,
    img: POOL_IMAGE,
  },
];

const GALLERY_CATS = ["Все", "Бассейн", "Сауны", "Массаж", "Отдых", "Природа"];

const GALLERY_ITEMS = [
  { img: POOL_IMAGE, title: "Термальный бассейн", cat: "Бассейн" },
  { img: SAUNA_IMAGE, title: "Финская сауна", cat: "Сауны" },
  { img: MASSAGE_IMAGE, title: "Массажный зал", cat: "Массаж" },
  { img: "https://cdn.poehali.dev/files/1f142cc2-f16d-4c72-a8a2-52ecb84d4849.jpg", title: "Атмосфера покоя", cat: "Массаж" },
  { img: "https://cdn.poehali.dev/files/1174c867-0a1f-4ab0-8dc4-f00abe9b028c.jpg", title: "Свечи и уют", cat: "Массаж" },
  { img: HERO_IMAGE, title: "Хаммам", cat: "Сауны" },
  { img: SAUNA_IMAGE, title: "Хаммам", cat: "Сауны" },
  { img: SAUNA_IMAGE, title: "Можжевеловая комната", cat: "Природа" },
];

const REVIEWS = [
  {
    name: "Анна К.",
    stars: 5,
    text: "Была на программе «Ритуал обновления» — это просто космос. Пространство пара с пенным массажем, потом можжевеловая комната... выхожу как новорождённая. Персонал — высший класс.",
    role: "Постоянный гость",
  },
  {
    name: "Дмитрий В.",
    stars: 5,
    text: "Привожу сюда партнёров на деловые встречи в неформальной обстановке. Уровень сервиса соответствует самым высоким стандартам. Рекомендую.",
    role: "Предприниматель",
  },
  {
    name: "Мария Л.",
    stars: 5,
    text: "Брала корпоративный пакет для команды. Все в восторге! Отдельное спасибо за организацию и внимание к деталям. Обязательно вернёмся.",
    role: "HR-директор",
  },
  {
    name: "Сергей М.",
    stars: 5,
    text: "Можжевеловая комната — открытие года. После первой сессии дышать стало заметно легче, хроническое напряжение ушло. Теперь хожу каждую неделю.",
    role: "Постоянный гость",
  },
];

const BLOG_POSTS = [
  { title: "Как пространство пара меняет кожу за один сеанс", date: "8 апреля 2026", read: "5 мин", tag: "Процедуры", img: MASSAGE_IMAGE },
  { title: "Можжевельник: что происходит с телом в ароматной комнате", date: "2 апреля 2026", read: "7 мин", tag: "Наука", img: SAUNA_IMAGE },
  { title: "Сезонные ритуалы: весеннее очищение тела и духа", date: "25 марта 2026", read: "4 мин", tag: "Ритуалы", img: HERO_IMAGE },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SpaceCard({ space }: { space: { icon: string; title: string; desc: string; tag: string; img: string; imgs?: string[] } }) {
  const images = space.imgs ?? [space.img];
  const [idx, setIdx] = useState(0);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };
  return (
    <div className="card-dark hover-lift">
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={space.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,10,0.7) 0%, transparent 60%)" }} />
        <div className="absolute top-4 left-4">
          <span className="glass-tag">{space.tag}</span>
        </div>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(13,11,10,0.6)", border: "1px solid rgba(212,168,85,0.3)" }}>
              <Icon name="ChevronLeft" size={14} style={{ color: "#D4A855" }} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(13,11,10,0.6)", border: "1px solid rgba(212,168,85,0.3)" }}>
              <Icon name="ChevronRight" size={14} style={{ color: "#D4A855" }} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} className="rounded-full transition-all duration-300" style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? "#D4A855" : "rgba(255,255,255,0.4)" }} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,85,0.12)" }}>
            <Icon name={space.icon} size={15} style={{ color: "#D4A855" }} />
          </div>
          <h3 className="font-display font-medium" style={{ fontSize: 20, color: "#EDE8DF" }}>{space.title}</h3>
        </div>
        <p style={{ color: "#8B7355", fontSize: 14, lineHeight: 1.7 }}>{space.desc}</p>
      </div>
    </div>
  );
}

function FadeSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryCat, setGalleryCat] = useState("Все");
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setParallaxY(y * 0.35);
      const sections = NAV_ITEMS.map((i) => i.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && y >= el.offsetTop - 130) { setActiveNav(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = galleryCat === "Все" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.cat === galleryCat);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0D0B0A", color: "#EDE8DF", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(13,11,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,168,85,0.1)" : "none",
          padding: scrolled ? "12px 0" : "22px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4A855, #B8943A)" }}>
              <span style={{ color: "#0D0B0A", fontWeight: 700, fontSize: 11, letterSpacing: "0.05em" }}>ПП</span>
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A855" }}>
                Пространство
              </span>
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B7355" }}>
                Пара
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeNav === item.href.replace("#", "") ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contacts" className="hidden lg:inline-block btn-gold">Записаться</a>
            <button
              className="lg:hidden"
              style={{ color: "#EDE8DF" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 py-5 flex flex-col gap-3"
            style={{ background: "rgba(13,11,10,0.98)", borderTop: "1px solid rgba(212,168,85,0.1)" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-2 text-sm tracking-wide border-b"
                style={{ color: "#8B7355", borderColor: "rgba(212,168,85,0.08)" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contacts" className="mt-2 btn-gold text-center">Записаться</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div id="hero" className="relative h-screen min-h-[620px] flex items-center overflow-hidden">
        {/* Parallax bg */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Пространство Пара"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${parallaxY}px)`, willChange: "transform", scale: "1.15" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,11,10,0.85) 0%, rgba(13,11,10,0.5) 55%, rgba(13,11,10,0.2) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(13,11,10,0.7) 100%)" }} />
        </div>

        {/* Floating blobs */}
        <div className="absolute" style={{ top: "25%", left: "25%", width: 380, height: 380, borderRadius: "50%", background: "rgba(212,168,85,0.04)", filter: "blur(80px)", animation: "float 5s ease-in-out infinite" }} />
        <div className="absolute" style={{ bottom: "30%", right: "20%", width: 260, height: 260, borderRadius: "50%", background: "rgba(78,205,196,0.04)", filter: "blur(80px)", animation: "float 7s ease-in-out infinite reverse" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                padding: "6px 18px",
                border: "1px solid rgba(212,168,85,0.3)",
                borderRadius: 50,
                background: "rgba(212,168,85,0.08)",
                animation: "fadeIn 0.6s ease forwards",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4A855", display: "inline-block" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A855" }}>
                СПА-центр · г. Артём
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-light leading-none mb-6"
              style={{ fontSize: "clamp(56px, 8vw, 96px)", animation: "fadeUp 0.8s 0.2s ease forwards", opacity: 0 }}
            >
              Простран-<br />ство{" "}
              <span className="italic" style={{ color: "#D4A855" }}>Пара</span>
            </h1>

            {/* Sub */}
            <p
              style={{ color: "#8B7355", fontSize: 17, fontWeight: 300, maxWidth: 420, lineHeight: 1.7, marginBottom: 10, animation: "fadeUp 0.8s 0.35s ease forwards", opacity: 0 }}
            >
              Бассейн · Сауна · Хаммам · Массаж · Ароматерапия
            </p>
            <p
              style={{ color: "rgba(237,232,223,0.65)", fontSize: 15, fontWeight: 300, maxWidth: 380, lineHeight: 1.75, marginBottom: 36, animation: "fadeUp 0.8s 0.45s ease forwards", opacity: 0 }}
            >
              Премиальное пространство для восстановления тела и духа в сердце Приморья
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3"
              style={{ animation: "fadeUp 0.8s 0.6s ease forwards", opacity: 0 }}
            >
              <a href="#contacts" className="btn-gold">Забронировать визит</a>
              <a href="#contacts" className="btn-outline-gold">Жду звонка</a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
          style={{ background: "rgba(13,11,10,0.55)", backdropFilter: "blur(6px)", borderTop: "1px solid rgba(212,168,85,0.08)" }}
        >
          <div className="marquee-track gap-10 flex">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap"
                style={{ color: "#8B7355", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#D4A855", display: "inline-block", opacity: 0.7 }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-14 right-10 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0.5 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4A855", writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #D4A855, transparent)" }} />
        </div>
      </div>

      {/* ── STATS ── */}
      <FadeSection className="py-14 border-y" style={{ borderColor: "rgba(212,168,85,0.1)", background: "#0F0D0B" } as React.CSSProperties}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "12+", label: "Зон отдыха" },
            { num: "50+", label: "Видов процедур" },
            { num: "8 000+", label: "Довольных гостей" },
            { num: "3 года", label: "Безупречного сервиса" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display font-light mb-1" style={{ fontSize: 48, color: "#D4A855" }}>{s.num}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B7355" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── SPACES ── */}
      <FadeSection id="spaces" className="py-24" style={{ background: "#0D0B0A" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Наши зоны</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Пространства</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPACES.map((space) => (
              <SpaceCard key={space.title} space={space} />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── PROGRAMS ── */}
      <FadeSection id="programs" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Выберите своё</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Программы</h2>
            <div className="gold-divider" />
            <p className="mt-4 max-w-xl" style={{ color: "#8B7355", fontSize: 16, lineHeight: 1.8 }}>Каждая программа — это путешествие со своей историей, запахом и состоянием, которое ты унесёшь с собой.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                className="relative flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{
                  background: prog.popular ? "rgba(212,168,85,0.06)" : "rgba(26,20,16,0.6)",
                  border: prog.popular ? "1px solid rgba(212,168,85,0.5)" : "1px solid rgba(212,168,85,0.12)",
                  borderRadius: 16,
                  boxShadow: prog.popular ? "0 0 40px rgba(212,168,85,0.12)" : "none",
                }}
              >
                {prog.popular && (
                  <div
                    className="absolute top-4 right-4 z-10 px-4 py-1 text-xs font-semibold tracking-wide"
                    style={{ background: "linear-gradient(135deg,#D4A855,#F0C878)", color: "#0D0B0A", borderRadius: 50, whiteSpace: "nowrap" }}
                  >
                    Популярное
                  </div>
                )}
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,10,0.85) 0%, transparent 60%)" }} />
                </div>
                <div className="p-7 flex flex-col flex-1">
                <div className="mb-5">
                  <h3 className="font-display font-light mb-1" style={{ fontSize: 26, color: "#EDE8DF" }}>{prog.title}</h3>
                  <p style={{ color: "#8B7355", fontSize: 13 }}>{prog.subtitle}</p>
                </div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-display font-light" style={{ fontSize: 36, color: "#D4A855" }}>{prog.price}</span>
                  <span style={{ color: "#8B7355", fontSize: 13 }}>/ {prog.duration}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5" style={{ fontSize: 14, color: "rgba(237,232,223,0.8)" }}>
                      <Icon name="Check" size={13} style={{ color: "#4ECDC4", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacts"
                  className={prog.popular ? "btn-gold text-center" : "btn-outline-gold text-center"}
                >
                  Выбрать программу
                </a>
              </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── GALLERY ── */}
      <FadeSection id="gallery" className="py-24" style={{ background: "#0D0B0A" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="section-tag">Наши пространства</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Галерея</h2>
            <div className="gold-divider" />
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {GALLERY_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCat(cat)}
                className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  borderRadius: 50,
                  border: galleryCat === cat ? "1px solid rgba(212,168,85,0.5)" : "1px solid rgba(212,168,85,0.15)",
                  background: galleryCat === cat ? "rgba(212,168,85,0.15)" : "transparent",
                  color: galleryCat === cat ? "#D4A855" : "#8B7355",
                  fontFamily: "'Golos Text', sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((item, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{ aspectRatio: "4/3", borderRadius: 10, overflow: "hidden" }}
                onClick={() => setLightbox(item)}
              >
                <img src={item.img} alt={item.title} />
                <div className="gallery-overlay">
                  <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A855", marginBottom: 4 }}>{item.cat}</span>
                  <span className="font-display" style={{ fontSize: 20, color: "#EDE8DF" }}>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(13,11,10,0.93)", backdropFilter: "blur(8px)", animation: "fadeIn 0.3s ease" }}
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 transition-colors" style={{ color: "rgba(237,232,223,0.5)" }} onClick={() => setLightbox(null)}>
            <Icon name="X" size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} style={{ width: "100%", borderRadius: 12 }} />
            <p className="text-center font-display mt-4" style={{ fontSize: 22, color: "#D4A855" }}>{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      <FadeSection id="about" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={MASSAGE_IMAGE}
                alt="О нас"
                style={{ width: "100%", height: 460, objectFit: "cover", borderRadius: 12 }}
              />
              <div
                className="absolute -bottom-5 -right-5 p-6 hidden md:block"
                style={{ background: "linear-gradient(135deg,#D4A855,#B8943A)", borderRadius: 12 }}
              >
                <div className="font-display font-light" style={{ fontSize: 42, color: "#0D0B0A" }}>8 000+</div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(13,11,10,0.65)", marginTop: 4 }}>
                  Гостей за 3 года
                </div>
              </div>
            </div>
            <div>
              <div className="section-tag">Кто мы</div>
              <h2 className="font-display font-light mt-2 leading-tight" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#EDE8DF" }}>
                Три года<br />
                <span className="italic" style={{ color: "#D4A855" }}>философии</span>
                <br />восстановления
              </h2>
              <div className="gold-divider" />
              <p style={{ color: "#8B7355", lineHeight: 1.8, marginBottom: 14, fontSize: 15 }}>
                Пространство Пара — это не просто спа-центр. Это место, где профессиональные ритуалы встречаются с персональным подходом. Каждый визит — уникальный опыт, созданный именно для вас.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Users", text: "Команда мастеров" },
                  { icon: "MapPin", text: "г. Артём, Глобус 2" },
                  { icon: "Star", text: "4.9 на Яндекс.Картах" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 py-3"
                    style={{ borderBottom: "1px solid rgba(212,168,85,0.1)" }}
                  >
                    <Icon name={item.icon} size={14} style={{ color: "#D4A855", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#EDE8DF" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── REVIEWS ── */}
      <FadeSection id="reviews" className="py-24" style={{ background: "#0D0B0A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Говорят гости</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Отзывы</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="p-7 transition-all hover:-translate-y-1"
                style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.1)", borderRadius: 14, backdropFilter: "blur(12px)" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={13} style={{ color: "#D4A855" }} />
                  ))}
                </div>
                <p className="font-display italic mb-5" style={{ fontSize: 18, color: "rgba(237,232,223,0.85)", lineHeight: 1.7 }}>
                  "{r.text}"
                </p>
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(212,168,85,0.1)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
                    style={{ background: "linear-gradient(135deg,#D4A855,#B8943A)", color: "#0D0B0A" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: "#EDE8DF", fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#8B7355" }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── BLOG ── */}
      <FadeSection id="blog" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="section-tag">Полезное</div>
              <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Блог</h2>
              <div className="gold-divider" />
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all hover:gap-3"
              style={{ color: "#D4A855", fontWeight: 500 }}
            >
              Все статьи <Icon name="ArrowRight" size={14} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
                className="card-dark hover-lift cursor-pointer"
              >
                <div className="relative overflow-hidden" style={{ height: 190 }}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="glass-tag">{post.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-medium mb-3 leading-tight" style={{ fontSize: 20, color: "#EDE8DF" }}>{post.title}</h3>
                  <div className="flex items-center gap-4" style={{ color: "#8B7355", fontSize: 12 }}>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={11} /> {post.read} чтения
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── CONTACTS ── */}
      <FadeSection id="contacts" className="py-24" style={{ background: "#0D0B0A" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Мы ждём вас</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#EDE8DF" }}>Контакты</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h3 className="font-display font-light mb-4" style={{ fontSize: 28, color: "#EDE8DF" }}>Записаться на визит</h3>
              <p className="text-sm mb-6" style={{ color: "#B8A98A", lineHeight: 1.6 }}>
                Оставьте ваши контактные данные, наш администратор свяжется с вами и ответит на ваши вопросы с 10:00 до 22:00
              </p>
              <form className="space-y-3" onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus("loading");
                try {
                  const res = await fetch("https://functions.poehali.dev/ce5987a8-a696-47ec-be09-3afce56f755b", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });
                  if (res.ok) {
                    setFormStatus("success");
                    setFormData({ name: "", phone: "", comment: "" });
                  } else {
                    setFormStatus("error");
                  }
                } catch {
                  setFormStatus("error");
                }
              }}>
                {[
                  { key: "name", type: "text", placeholder: "Ваше имя" },
                  { key: "phone", type: "tel", placeholder: "Номер телефона" },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full px-5 py-3.5 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(26,20,16,0.7)",
                      border: "1px solid rgba(212,168,85,0.15)",
                      borderRadius: 8,
                      color: "#EDE8DF",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.15)")}
                  />
                ))}
                <textarea
                  placeholder="Пожелания или вопросы"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
                  className="w-full px-5 py-3.5 text-sm outline-none transition-all resize-none"
                  style={{
                    background: "rgba(26,20,16,0.7)",
                    border: "1px solid rgba(212,168,85,0.15)",
                    borderRadius: 8,
                    color: "#EDE8DF",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.15)")}
                />
                <button
                  type="submit"
                  className="w-full btn-gold text-center"
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>
                {formStatus === "success" && (
                  <p className="text-sm text-center mt-3" style={{ color: "#D4A855" }}>
                    Заявка отправлена! Мы свяжемся с вами с 10:00 до 22:00.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm text-center mt-3" style={{ color: "#e88" }}>
                    Не удалось отправить. Позвоните нам напрямую.
                  </p>
                )}
              </form>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-display font-light mb-6" style={{ fontSize: 28, color: "#EDE8DF" }}>Как нас найти</h3>
              <div className="space-y-0">
                {[
                  { icon: "MapPin", title: "Адрес", text: "г. Артём, мкр. Глобус 2, дом 1А" },
                  { icon: "Phone", title: "Телефон", text: "+7 908 980-35-45" },
                  { icon: "Mail", title: "Email", text: "fitnslim.par@mail.ru\nОтвечаем с 10:00 до 22:00" },
                  { icon: "Clock", title: "Время работы", text: "Пн–Вс: 10:00–22:00\nБез выходных" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 py-4"
                    style={{ borderBottom: "1px solid rgba(212,168,85,0.08)" }}
                  >
                    <Icon name={item.icon} size={16} style={{ color: "#D4A855", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A855", fontWeight: 500, marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 14, color: "#EDE8DF", lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── FOOTER ── */}
      <footer className="py-8" style={{ background: "#080706", borderTop: "1px solid rgba(212,168,85,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#D4A855,#B8943A)" }}>
              <span style={{ color: "#0D0B0A", fontWeight: 700, fontSize: 9 }}>ПП</span>
            </div>
            <span className="font-display" style={{ fontSize: 15, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A855" }}>
              Пространство Пара
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#8B7355" }}>© 2026 Пространство Пара. Все права защищены.</div>
          <div className="flex gap-3">
            {["Instagram", "MessageCircle", "Send"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: "1px solid rgba(212,168,85,0.2)", color: "#8B7355" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.6)";
                  (e.currentTarget as HTMLElement).style.color = "#D4A855";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "#8B7355";
                }}
              >
                <Icon name={icon} size={13} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}