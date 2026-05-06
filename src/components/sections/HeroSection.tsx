import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMAGES, NAV_ITEMS, MARQUEE_ITEMS } from "@/data/indexData";

interface HeroSectionProps {
  activeNav: string;
  scrolled: boolean;
  parallaxY: number;
  heroIndex: number;
}

export default function HeroSection({ activeNav, scrolled, parallaxY, heroIndex }: HeroSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { passive: true, once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(16,12,9,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,168,85,0.1)" : "none",
          padding: scrolled ? "12px 0" : "22px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/5d9efb83-2ddb-49ee-9ab2-aa83a7eb8a70.png"
              alt="Пространство Пара"
              style={{ height: 48, width: "auto", objectFit: "contain", background: "transparent", mixBlendMode: "luminosity" }}
            />
          </a>

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
            <a
              href="tel:+79089803545"
              className="hidden lg:inline-flex items-center gap-2"
              style={{ color: "#e8c08a", fontSize: 15, fontWeight: 600, letterSpacing: "0.03em", textDecoration: "none" }}
            >
              <Icon name="Phone" size={15} style={{ color: "#e8c08a" }} />
              +7 908 980-35-45
            </a>
            <a href="#contacts" className="hidden lg:inline-block btn-gold">Записаться</a>
            <button
              className="lg:hidden"
              style={{ color: "#f0e8da" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden px-6 py-5 flex flex-col gap-3"
            style={{ background: "rgba(16,12,9,0.98)", borderTop: "1px solid rgba(212,168,85,0.1)" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-2 text-sm tracking-wide border-b"
                style={{ color: "#9c8264", borderColor: "rgba(212,168,85,0.08)" }}
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
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Пространство Пара"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center 70%",
                transform: `translateY(${parallaxY}px)`,
                willChange: "transform",
                scale: "1.15",
                opacity: i === heroIndex ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
                zIndex: i === heroIndex ? 1 : 0,
              }}
            />
          ))}
          {/* Water ripple filter */}
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="water-ripple" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.008"
                  numOctaves="3"
                  seed="2"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.012 0.008;0.014 0.010;0.012 0.008"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="seed"
                    values="2;5;8;5;2"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="18"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                >
                  <animate
                    attributeName="scale"
                    values="18;26;18"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>

          {/* Animated water shimmer overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 3px,
                  rgba(255,200,100,0.018) 3px,
                  rgba(255,200,100,0.018) 4px
                )
              `,
              animation: "waterShimmer 6s ease-in-out infinite",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 8px,
                  rgba(180,230,255,0.012) 8px,
                  rgba(180,230,255,0.012) 9px
                )
              `,
              animation: "waterShimmer2 9s ease-in-out infinite",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Water glow blobs */}
          <div className="absolute" style={{ bottom: "15%", right: "25%", width: 500, height: 200, borderRadius: "50%", background: "rgba(100,180,255,0.07)", filter: "blur(60px)", animation: "waterGlow 5s ease-in-out infinite", zIndex: 2, pointerEvents: "none" }} />
          <div className="absolute" style={{ bottom: "10%", right: "35%", width: 300, height: 120, borderRadius: "50%", background: "rgba(212,135,74,0.09)", filter: "blur(50px)", animation: "waterGlow 7s ease-in-out infinite reverse", zIndex: 2, pointerEvents: "none" }} />
          <div className="absolute" style={{ bottom: "20%", right: "15%", width: 250, height: 100, borderRadius: "50%", background: "rgba(255,200,120,0.06)", filter: "blur(40px)", animation: "waterGlow 9s ease-in-out infinite", zIndex: 2, pointerEvents: "none" }} />

          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,11,10,0.85) 0%, rgba(13,11,10,0.5) 55%, rgba(13,11,10,0.2) 100%)", zIndex: 3 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(13,11,10,0.7) 100%)", zIndex: 3 }} />
        </div>

        <div className="absolute" style={{ top: "20%", left: "20%", width: 420, height: 420, borderRadius: "50%", background: "rgba(212,135,74,0.06)", filter: "blur(90px)", animation: "float 6s ease-in-out infinite" }} />
        <div className="absolute" style={{ bottom: "25%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "rgba(201,162,110,0.05)", filter: "blur(80px)", animation: "float 8s ease-in-out infinite reverse" }} />
        <div className="absolute" style={{ top: "55%", left: "55%", width: 200, height: 200, borderRadius: "50%", background: "rgba(139,58,26,0.04)", filter: "blur(60px)", animation: "float 10s ease-in-out infinite" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl" style={{ paddingLeft: 60 }}>
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                padding: "6px 18px",
                border: "1px solid rgba(201,162,110,0.3)",
                borderRadius: 50,
                background: "rgba(201,162,110,0.08)",
                animation: "fadeIn 0.6s ease forwards",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c9a26e", display: "inline-block" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a26e" }}>
                СПА-центр · г. Артём
              </span>
            </div>

            <h1
              className="font-display font-light leading-none mb-6"
              style={{ fontSize: "clamp(14px, 2vw, 24px)", animation: "fadeUp 0.8s 0.2s ease forwards", opacity: 0 }}
            >
              Пространство <span className="italic" style={{ color: "#c9a26e" }}>Пара</span>
            </h1>

            <p
              style={{ color: "#9c8264", fontSize: 17, fontWeight: 300, maxWidth: 420, lineHeight: 1.7, marginBottom: 14, animation: "fadeUp 0.8s 0.35s ease forwards", opacity: 0 }}
            >
              Бассейн · Сауна · Хаммам · Массаж · Ароматерапия
            </p>
            <p
              style={{ color: "rgba(240,232,218,0.7)", fontSize: 16, fontWeight: 300, maxWidth: 400, lineHeight: 1.85, marginBottom: 20, animation: "fadeUp 0.8s 0.45s ease forwards", opacity: 0 }}
            >
              Здесь тело вспоминает, как быть лёгким. Тепло, пар, тишина — и ничего лишнего.
            </p>
            <p
              style={{ color: "rgba(201,162,110,0.75)", fontSize: 14, fontWeight: 300, maxWidth: 400, lineHeight: 1.7, marginBottom: 36, animation: "fadeUp 0.8s 0.55s ease forwards", opacity: 0, letterSpacing: "0.04em" }}
            >
              Уютное пространство для компании до 8 человек
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
              style={{ animation: "fadeUp 0.8s 0.6s ease forwards", opacity: 0 }}
            >
              <a
                href="tel:+79089803545"
                className="inline-flex items-center gap-2"
                style={{ color: "#e8c08a", fontSize: 16, fontWeight: 600, letterSpacing: "0.03em", textDecoration: "none" }}
              >
                <Icon name="Phone" size={15} style={{ color: "#e8c08a" }} />
                +7 908 980-35-45
              </a>
              <a href="#contacts" className="btn-gold">Забронировать визит</a>
              <a href="#contacts" className="btn-outline-gold">Жду звонка</a>
            </div>

            <div
              className="flex flex-wrap gap-3 mt-6"
              style={{ animation: "fadeUp 0.8s 0.75s ease forwards", opacity: 0 }}
            >
              {/* Яндекс «Хорошее место» */}
              <a
                href="https://yandex.ru/maps/org/9801271735"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
                style={{
                  padding: "10px 20px 10px 14px",
                  background: "rgba(255,204,0,0.08)",
                  border: "1px solid rgba(255,204,0,0.25)",
                  borderRadius: 50,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,204,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,204,0,0.08)")}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#FFCC00" />
                  <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a1a">Я</text>
                </svg>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#FFCC00", textTransform: "uppercase", lineHeight: 1.2 }}>
                    Хорошее место
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} style={{ fontSize: 11, color: "#FFCC00", lineHeight: 1 }}>{s}</span>
                    ))}
                    <span style={{ fontSize: 10, color: "rgba(240,232,218,0.45)", marginLeft: 3 }}>5.0</span>
                  </div>
                </div>
              </a>

              {/* 2ГИС */}
              <a
                href="https://2gis.ru/firm/2RanymjLDD3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
                style={{
                  padding: "10px 20px 10px 14px",
                  background: "rgba(255,204,0,0.08)",
                  border: "1px solid rgba(255,204,0,0.25)",
                  borderRadius: 50,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,204,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,204,0,0.08)")}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#FFCC00" />
                  <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1a1a1a">2ГИС</text>
                </svg>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#FFCC00", textTransform: "uppercase", lineHeight: 1.2 }}>
                    Премия 2ГИС
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} style={{ fontSize: 11, color: "#FFCC00", lineHeight: 1 }}>{s}</span>
                    ))}
                    <span style={{ fontSize: 10, color: "rgba(240,232,218,0.45)", marginLeft: 3 }}>5.0</span>
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(240,232,218,0.5)", letterSpacing: "0.06em", marginTop: 1 }}>
                    2ГИС · Карты
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
          style={{ background: "rgba(16,12,9,0.55)", backdropFilter: "blur(6px)", borderTop: "1px solid rgba(212,168,85,0.08)" }}
        >
          <div className="marquee-track gap-10 flex">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap"
                style={{ color: "#7a6248", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#c9a26e", display: "inline-block", opacity: 0.7 }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-14 right-10 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0.5 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a26e", writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #D4A855, transparent)" }} />
        </div>
      </div>
    </>
  );
}