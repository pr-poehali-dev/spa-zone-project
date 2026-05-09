import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import PolicyModal from "@/components/PolicyModal";
import { REVIEWS, BLOG_POSTS, MASSAGE_IMAGE_EXPORT as MASSAGE_IMAGE } from "@/data/indexData";

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

function FadeSection({ children, className = "", id = "", style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

function YandexLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: 0.75 }}>
      <circle cx="50" cy="50" r="50" fill="#FC3F1D"/>
      <path d="M56.5 22H43.7V78H56.5V55.3H61.3C70.8 55.3 76.5 50 76.5 38.4C76.5 27.3 70.8 22 61.3 22H56.5ZM56.5 33.4H60.3C65.1 33.4 67.5 36 67.5 38.9C67.5 42.4 65.4 44.1 60.5 44.1H56.5V33.4ZM23.5 78H36.3V22H30.6L22 44.4V78H23.5Z" fill="white"/>
    </svg>
  );
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div
      className="p-7"
      style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.1)", borderRadius: 14, backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold" style={{ background: "linear-gradient(135deg,#D4A855,#B8943A)", color: "#100c09", fontSize: 15 }}>
            {r.name[0]}
          </div>
          <div>
            <div style={{ fontSize: 14, color: "#f0e8da", fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "#9c8264" }}>{r.role}</div>
          </div>
        </div>
        <YandexLogo />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: r.stars }).map((_, i) => (
          <Icon key={i} name="Star" size={14} style={{ color: "#FFD700" }} />
        ))}
      </div>
      <p className="font-display italic" style={{ fontSize: 17, color: "rgba(237,232,223,0.88)", lineHeight: 1.75 }}>
        «{r.text}»
      </p>
    </div>
  );
}

function ReviewsCarousel() {
  const total = REVIEWS.length;
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = (next: number, dir: 1 | -1 = 1) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setPage((next + total) % total);
      setAnimating(false);
    }, 380);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((page + 1) % total, 1), 4500);
    return () => clearInterval(t);
  }, [page, animating]);

  const pairs = Math.ceil(total / 2);
  const pairIndex = page % pairs;
  const left = REVIEWS[pairIndex * 2];
  const right = REVIEWS[pairIndex * 2 + 1] ?? REVIEWS[0];

  return (
    <div>
      <div
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          opacity: animating ? 0 : 1,
          transform: animating ? `translateX(${direction * 24}px)` : "translateX(0)",
          transition: "opacity 0.38s ease, transform 0.38s ease",
        }}
        className="max-md:grid-cols-1"
      >
        <ReviewCard r={left} />
        {right && <ReviewCard r={right} />}
      </div>

      <div className="flex items-center justify-center gap-4 mt-7">
        <button
          onClick={() => goTo(page - 1, -1)}
          style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <Icon name="ChevronLeft" size={16} style={{ color: "#c9a26e" }} />
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {Array.from({ length: pairs }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i * 2, i >= pairIndex ? 1 : -1)}
              style={{ width: i === pairIndex ? 20 : 7, height: 7, borderRadius: 99, background: i === pairIndex ? "#c9a26e" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(page + 1, 1)}
          style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <Icon name="ChevronRight" size={16} style={{ color: "#c9a26e" }} />
        </button>
      </div>
    </div>
  );
}

export default function ContactsSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [policyModal, setPolicyModal] = useState<"privacy" | "consent" | null>(null);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [flippedBlog, setFlippedBlog] = useState<Record<string, boolean>>({});

  return (
    <>
      {/* ── ABOUT ── */}
      <FadeSection id="about" className="py-12 md:py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative">
              <img
                src={MASSAGE_IMAGE}
                alt="О нас"
                style={{ width: "100%", height: "clamp(260px, 50vw, 460px)", objectFit: "cover", borderRadius: 12 }}
              />

            </div>
            <div>
              <div className="section-tag">Кто мы</div>
              <h2 className="font-display font-light mt-2 leading-tight" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#f0e8da" }}>
                Место, где<br />
                <span className="italic" style={{ color: "#c9a26e" }}>тело</span>
                <br />отдыхает по-настоящему
              </h2>
              <div className="gold-divider" />
              <p style={{ color: "#9c8264", lineHeight: 1.85, marginBottom: 14, fontSize: 15 }}>
                Мы создавали «Пространство Пара» с одной мыслью: дать людям место, где не нужно ничего делать — только чувствовать. Тепло воды, аромат пара, вес хорошего массажа. Без суеты, без экранов, без спешки.
              </p>
              <p style={{ color: "#9c8264", lineHeight: 1.85, marginBottom: 24, fontSize: 15 }}>
                За три года через наши двери прошло больше восьми тысяч гостей — и каждый уходил с чем-то своим. Кто-то с лёгкостью в теле, кто-то с тишиной внутри. Именно это мы считаем настоящим результатом.
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
                    <Icon name={item.icon} size={14} style={{ color: "#c9a26e", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#f0e8da" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── REVIEWS ── */}
      <FadeSection id="reviews" className="py-24" style={{ background: "#100c09" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Говорят гости</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Отзывы</h2>
            <div className="gold-divider" />
            <p className="mt-4 max-w-lg" style={{ color: "#9c8264", fontSize: 15, lineHeight: 1.85 }}>Слова тех, кто уже побывал здесь — и нашёл что-то важное для себя.</p>
          </div>
          {/* Яндекс-плашка общего рейтинга */}
          <a
            href="https://yandex.ru/maps/org/prostranstvo_para/184055735940/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 mb-8 w-fit"
            style={{ background: "rgba(26,20,16,0.8)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, padding: "14px 22px", textDecoration: "none", transition: "border-color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
          >
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="#FC3F1D"/>
              <path d="M56.5 22H43.7V78H56.5V55.3H61.3C70.8 55.3 76.5 50 76.5 38.4C76.5 27.3 70.8 22 61.3 22H56.5ZM56.5 33.4H60.3C65.1 33.4 67.5 36 67.5 38.9C67.5 42.4 65.4 44.1 60.5 44.1H56.5V33.4ZM23.5 78H36.3V22H30.6L22 44.4V78H23.5Z" fill="white"/>
            </svg>
            <div>
              <div style={{ fontSize: 11, color: "#9c8264", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Яндекс Карты</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={13} style={{ color: "#FFD700" }} />
                  ))}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f0e8da" }}>4.9</span>
                <span style={{ fontSize: 12, color: "#9c8264" }}>· 50+ отзывов</span>
              </div>
            </div>
          </a>

          <ReviewsCarousel />
        </div>
      </FadeSection>

      {/* ── BLOG ── */}
      <FadeSection id="blog" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="section-tag">Полезное</div>
              <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Блог</h2>
              <div className="gold-divider" />
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all hover:gap-3"
              style={{ color: "#c9a26e", fontWeight: 500 }}
            >
              Все статьи <Icon name="ArrowRight" size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.title}
                className="cursor-pointer"
                style={{ minHeight: "clamp(300px, auto, 340px)", perspective: 1000 }}
                onClick={() => setFlippedBlog(prev => ({ ...prev, [post.title]: !prev[post.title] }))}
              >
                <div
                  className="blog-flip-inner"
                  style={{
                    position: "relative", width: "100%", height: "100%",
                    transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
                    transform: flippedBlog[post.title] ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <article
                    style={{
                      position: "absolute", inset: 0, backfaceVisibility: "hidden",
                      background: "rgba(28,20,14,0.75)", border: "1px solid rgba(201,162,110,0.13)",
                      borderRadius: 14, overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "relative", height: "clamp(140px, 25vw, 190px)", overflow: "hidden" }}>
                      <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,12,9,0.7) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: 16, left: 16 }}>
                        <span className="glass-tag">{post.tag}</span>
                      </div>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <h3 className="font-display font-medium leading-tight" style={{ fontSize: 20, color: "#f0e8da", marginBottom: 12 }}>{post.title}</h3>
                      <div className="flex items-center gap-4" style={{ color: "#9c8264", fontSize: 12 }}>
                        <span className="flex items-center gap-1"><Icon name="Calendar" size={11} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Icon name="Clock" size={11} /> {post.read} чтения</span>
                      </div>
                    </div>
                  </article>

                  {/* Back */}
                  <article
                    style={{
                      position: "absolute", inset: 0, backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "linear-gradient(135deg, rgba(212,168,85,0.12), rgba(28,20,14,0.95))",
                      border: "1px solid rgba(201,162,110,0.35)",
                      borderRadius: 14, overflow: "hidden",
                      display: "flex", flexDirection: "column", justifyContent: "center",
                      padding: "32px 28px",
                    }}
                  >
                    <span className="glass-tag" style={{ alignSelf: "flex-start", marginBottom: 20 }}>{post.tag}</span>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#d4b896", lineHeight: 1.85, margin: 0 }}>
                      {post.back}
                    </p>
                    <div style={{ marginTop: 28, height: 1, background: "linear-gradient(to right, #c9a26e, transparent)" }} />
                    <div style={{ marginTop: 16, fontSize: 11, color: "#9c8264", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {post.read} чтения · {post.date}
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── HOW TO GET ── */}
      <FadeSection id="howtoget" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <div className="section-tag">Как добраться</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#f0e8da" }}>Мы на карте</h2>
            <div className="gold-divider" />
            <p className="mt-4" style={{ color: "#9c8264", fontSize: 15, lineHeight: 1.8 }}>
              г. Артём, мкр. Глобус 2, дом 1А
            </p>
          </div>

          {/* Карта */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(212,168,85,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)", marginBottom: 20 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=132.163000%2C43.360000&z=14&pt=132.163000%2C43.360000&text=%D0%90%D1%80%D1%82%D1%91%D0%BC%2C%20%D0%BC%D0%BA%D1%80.%20%D0%93%D0%BB%D0%BE%D0%B1%D1%83%D1%81%202%2C%20%D0%B4%D0%BE%D0%BC%201%D0%90"
              title="Пространство Пара на карте"
              width="100%"
              height="420"
              frameBorder="0"
              style={{ display: "block" }}
              allowFullScreen
            />
          </div>

          {/* Маршруты */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <a
              href="https://yandex.ru/maps/?rtext=Владивосток~43.360000,132.163000&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 transition-all"
              style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#b8862e,#e8c06a)" }}>
                <Icon name="Navigation" size={18} style={{ color: "#100c09" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#c9a26e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Из Владивостока</div>
                <div style={{ fontSize: 14, color: "#f0e8da" }}>Маршрут на Яндекс.Картах</div>
                <div style={{ fontSize: 12, color: "#9c8264", marginTop: 2 }}>~45 мин · трасса А-189</div>
              </div>
            </a>

            <a
              href="https://yandex.ru/maps/?rtext=Артём~43.360000,132.163000&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 transition-all"
              style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#b8862e,#e8c06a)" }}>
                <Icon name="MapPin" size={18} style={{ color: "#100c09" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#c9a26e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>По городу Артём</div>
                <div style={{ fontSize: 14, color: "#f0e8da" }}>Маршрут на Яндекс.Картах</div>
                <div style={{ fontSize: 12, color: "#9c8264", marginTop: 2 }}>~10 мин · мкр. Глобус 2</div>
              </div>
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── CONTACTS ── */}
      <FadeSection id="contacts" className="py-24" style={{ background: "#100c09" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Мы ждём вас</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Контакты</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Form */}
            <div>
              <h3 className="font-display font-light mb-4" style={{ fontSize: "clamp(22px, 4vw, 28px)", color: "#f0e8da" }}>Записаться на визит</h3>
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
                ].map(({ key, type, placeholder }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
                    required
                    className="w-full px-5 py-3.5 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(26,20,16,0.7)",
                      border: "1px solid rgba(212,168,85,0.15)",
                      borderRadius: 8,
                      color: "#f0e8da",
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
                    color: "#f0e8da",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.15)")}
                />
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={policyChecked}
                    onChange={(e) => setPolicyChecked(e.target.checked)}
                    style={{ marginTop: 3, accentColor: "#c9a26e", flexShrink: 0, width: 15, height: 15 }}
                  />
                  <span style={{ fontSize: 12, color: "rgba(240,232,218,0.55)", lineHeight: 1.6 }}>
                    Нажимая кнопку, я принимаю{" "}
                    <button type="button" onClick={() => setPolicyModal("privacy")} style={{ color: "#c9a26e", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>
                      политику конфиденциальности
                    </button>{" "}
                    и даю{" "}
                    <button type="button" onClick={() => setPolicyModal("consent")} style={{ color: "#c9a26e", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>
                      согласие на обработку персональных данных
                    </button>
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full btn-gold text-center"
                  disabled={formStatus === "loading" || !policyChecked}
                  style={{ opacity: policyChecked ? 1 : 0.5 }}
                >
                  {formStatus === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>
                {formStatus === "success" && (
                  <p className="text-sm text-center mt-3" style={{ color: "#c9a26e" }}>
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
              <h3 className="font-display font-light mb-6" style={{ fontSize: "clamp(22px, 4vw, 28px)", color: "#f0e8da" }}>Как нас найти</h3>
              <div className="space-y-0">
                {[
                  { icon: "MapPin", title: "Адрес", text: "г. Артём, мкр. Глобус 2, дом 1А", href: undefined },
                  { icon: "Phone", title: "Телефон", text: "+7 908 980-35-45", href: "tel:+79089803545" },
                  { icon: "Mail", title: "Email", text: "fitnslim.par@mail.ru\nОтвечаем с 10:00 до 22:00", href: undefined },
                  { icon: "Clock", title: "Время работы", text: "Пн–Вс: 10:00–22:00\nБез выходных", href: undefined },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 py-4"
                    style={{ borderBottom: "1px solid rgba(212,168,85,0.08)" }}
                  >
                    <Icon name={item.icon} size={16} style={{ color: "#c9a26e", marginTop: 2, flexShrink: 0 }} />
                    <div className="flex-1">
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a26e", fontWeight: 500, marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 14, color: "#f0e8da", lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.text}</div>
                      {item.href && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          <a href="tel:+79089803545" className="inline-flex items-center gap-2 btn-gold" style={{ fontSize: 13, padding: "8px 20px" }}>
                            <Icon name="Phone" size={13} />
                            Позвонить
                          </a>
                          <a href="https://wa.me/79089803545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ fontSize: 13, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(212,168,85,0.3)", color: "#c9a26e", textDecoration: "none" }}>
                            <Icon name="MessageCircle" size={13} />
                            WhatsApp
                          </a>
                          <a href="https://t.me/+79089803545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ fontSize: 13, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(212,168,85,0.3)", color: "#c9a26e", textDecoration: "none" }}>
                            <Icon name="Send" size={13} />
                            Telegram
                          </a>
                        </div>
                      )}
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
          <div className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/d09e264e-f834-4b1e-b7fe-6249ce129089.png"
              alt="Пространство Пара"
              style={{ height: 40, width: "auto" }}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <a
              href="tel:+79089803545"
              className="flex items-center gap-2"
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 15, letterSpacing: "0.03em", textDecoration: "none", background: "linear-gradient(90deg,#b8862e,#e8c06a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              <Icon name="Phone" size={14} style={{ color: "#c9a26e" }} />
              +7 908 980-35-45
            </a>
            <div style={{ fontSize: 12, color: "#9c8264" }}>© 2023–2026 Пространство Пара. Все права защищены.</div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://wa.me/79089803545"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: "1px solid rgba(212,168,85,0.2)", color: "#9c8264" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.6)"; (e.currentTarget as HTMLElement).style.color = "#c9a26e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.2)"; (e.currentTarget as HTMLElement).style.color = "#9c8264"; }}
            >
              <Icon name="MessageCircle" size={13} />
            </a>
            <a
              href="https://t.me/+79089803545"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: "1px solid rgba(212,168,85,0.2)", color: "#9c8264" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.6)"; (e.currentTarget as HTMLElement).style.color = "#c9a26e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.2)"; (e.currentTarget as HTMLElement).style.color = "#9c8264"; }}
            >
              <Icon name="Send" size={13} />
            </a>
          </div>
        </div>
      </footer>

      <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />
    </>
  );
}