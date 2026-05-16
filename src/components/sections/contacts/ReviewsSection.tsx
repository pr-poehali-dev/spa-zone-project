import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { REVIEWS } from "@/data/indexData";
import { FadeSection } from "./shared";

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

export default function ReviewsSection() {
  return (
    <FadeSection id="reviews" className="py-24" style={{ background: "#100c09" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <div className="section-tag">Говорят гости</div>
          <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Отзывы</h2>
          <div className="gold-divider" />
          <p className="mt-4 max-w-lg" style={{ color: "#9c8264", fontSize: 15, lineHeight: 1.85 }}>Слова тех, кто уже побывал здесь — и нашёл что-то важное для себя.</p>
        </div>
        {/* Плашки рейтингов */}
        <div className="flex flex-wrap gap-4 mb-10">
          {/* Яндекс */}
          <a
            href="https://yandex.ru/maps/org/prostranstvo_para/184055735940/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4"
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

          {/* 2ГИС */}
          <a
            href="https://2gis.ru/artem/firm/70000001089071398/tab/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4"
            style={{ background: "rgba(26,20,16,0.8)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, padding: "14px 22px", textDecoration: "none", transition: "border-color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
          >
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="#19A55A"/>
              <text x="50" y="66" textAnchor="middle" fill="white" fontSize="44" fontWeight="bold" fontFamily="Arial">2</text>
            </svg>
            <div>
              <div style={{ fontSize: 11, color: "#9c8264", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>2ГИС</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={13} style={{ color: "#FFD700" }} />
                  ))}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f0e8da" }}>5.0</span>
                <span style={{ fontSize: 12, color: "#9c8264" }}>· читать отзывы</span>
              </div>
            </div>
          </a>
        </div>

        <ReviewsCarousel />
      </div>
    </FadeSection>
  );
}
