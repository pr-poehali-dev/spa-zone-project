import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { PROGRAMS } from "@/data/indexData";

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

type ProgramModal = typeof PROGRAMS[0]["modal"];

function ProgramModal({ modal, onClose }: { modal: NonNullable<ProgramModal>; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(13,10,7,0.82)", backdropFilter: "blur(8px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#f5f0e8", borderRadius: 20, maxWidth: 600, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#8b5a3c", fontSize: 22, lineHeight: 1, zIndex: 10 }}
        >
          ✕
        </button>
        <div style={{ padding: "48px 40px 40px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8b5a3c", marginBottom: 12, fontStyle: "italic", fontFamily: "'Golos Text', sans-serif" }}>
            {modal.label}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.1, margin: "0 0 6px" }}>
            {modal.heading}
          </h2>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: "#8b5a3c", marginBottom: 28 }}>
            {modal.subtitle}
          </div>
          <div style={{ height: 1, background: "rgba(139,90,60,0.2)", marginBottom: 24 }} />
          <div style={{ marginBottom: 28 }}>
            {modal.quote.map((q, i) => (
              <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#5c3520", lineHeight: 1.75, margin: "0 0 4px", fontWeight: i === modal.quote.length - 1 ? 600 : 400 }}>
                {q}
              </p>
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(139,90,60,0.2)", marginBottom: 24 }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", marginBottom: 20 }}>
            КАК ПРОХОДИТ ВАШ ВЕЧЕР
          </h3>
          {modal.steps.map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 12px", padding: "16px 0", borderBottom: i < modal.steps.length - 1 ? "1px solid rgba(139,90,60,0.12)" : "none" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "rgba(139,90,60,0.5)", paddingTop: 2 }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 14, fontWeight: 600, color: "#3d1f0d", marginBottom: 4 }}>
                  {step.title}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: "italic", color: "#7a5540", lineHeight: 1.65 }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <a
              href="#contacts"
              onClick={onClose}
              style={{ display: "inline-block", background: "linear-gradient(135deg, #c9a26e, #d4874a)", color: "#fff8f0", padding: "14px 42px", borderRadius: 50, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 4px 24px rgba(201,162,110,0.35)", fontFamily: "'Golos Text', sans-serif" }}
            >
              Забронировать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsSection() {
  const [programModal, setProgramModal] = useState<NonNullable<ProgramModal> | null>(null);

  return (
    <>
      <FadeSection id="programs" className="pt-10 pb-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Выберите своё</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Программы</h2>
            <div className="gold-divider" />
            <p className="mt-4 max-w-xl" style={{ color: "#9c8264", fontSize: 16, lineHeight: 1.85 }}>Каждая программа — это маршрут внутрь себя. Со своим запахом, теплом и состоянием, которое останется с вами ещё долго после.</p>
          </div>

          {/* Популярная программа — большая карточка */}
          {PROGRAMS.filter((p) => p.popular).map((prog) => (
            <div
              key={prog.title}
              className="relative overflow-hidden mb-1.5"
              style={{ borderRadius: 4, height: 420 }}
            >
              <img src={prog.img} alt={prog.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,8,6,0.88) 0%, rgba(10,8,6,0.4) 55%, rgba(10,8,6,0.1) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,0.7) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", top: 28, left: 36 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#D4A855,#F0C878)", borderRadius: 50, padding: "5px 16px", marginBottom: 18 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#100c09" }}>Хит</span>
                </div>
                <h3 className="font-display font-light" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#f0e8da", lineHeight: 1.1, maxWidth: 480, marginBottom: 8 }}>{prog.title}</h3>
                <p style={{ color: "#c9a26e", fontSize: 14, fontStyle: "italic", marginBottom: 22 }}>{prog.subtitle}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {prog.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(240,232,218,0.85)" }}>
                      <Icon name="Check" size={13} style={{ color: "#c9a26e", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: 12 }}>
                  {prog.modal && (
                    <button onClick={() => setProgramModal(prog.modal!)} className="btn-outline-gold" style={{ fontSize: 11, padding: "11px 24px", cursor: "pointer" }}>
                      Подробнее
                    </button>
                  )}
                  <a href="#contacts" className="btn-gold" style={{ fontSize: 11, padding: "11px 24px" }}>Записаться</a>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 24, right: 32 }}>
                <span className="glass-tag">{prog.tag}</span>
              </div>
            </div>
          ))}

          {/* Остальные программы — 3 в ряд */}
          <div className="grid md:grid-cols-3 gap-1.5">
            {PROGRAMS.filter((p) => !p.popular).map((prog) => (
              <div
                key={prog.title}
                className="relative overflow-hidden group"
                style={{ borderRadius: 4, aspectRatio: "3/4" }}
              >
                <img src={prog.img} alt={prog.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.3) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 22px" }}>
                  <span className="glass-tag" style={{ fontSize: 9, marginBottom: 10, display: "inline-block" }}>{prog.tag}</span>
                  <h3 className="font-display font-light" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "#f0e8da", lineHeight: 1.2, marginBottom: 6 }}>{prog.title}</h3>
                  <p style={{ color: "#9c8264", fontSize: 12, marginBottom: 16 }}>{prog.subtitle}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {prog.modal && (
                      <button onClick={() => setProgramModal(prog.modal!)} className="btn-outline-gold" style={{ fontSize: 10, padding: "10px 18px", cursor: "pointer", textAlign: "center" }}>
                        Подробнее
                      </button>
                    )}
                    {!prog.modal && (
                      <Link
                        to={prog.href}
                        className="btn-outline-gold text-center"
                        style={{ fontSize: 11, padding: "11px 20px" }}
                      >
                        Подробнее
                      </Link>
                    )}
                    <a
                      href="#contacts"
                      style={{ fontSize: 11, color: "#9c8264", textAlign: "center", padding: "8px", letterSpacing: "0.06em", textTransform: "uppercase" }}
                    >
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* gallery anchor for nav */}
      <div id="gallery" />

      {programModal && (
        <ProgramModal modal={programModal} onClose={() => setProgramModal(null)} />
      )}
    </>
  );
}