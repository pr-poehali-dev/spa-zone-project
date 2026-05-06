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
      <FadeSection id="programs" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Выберите своё</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Программы</h2>
            <div className="gold-divider" />
            <p className="mt-4 max-w-xl" style={{ color: "#9c8264", fontSize: 16, lineHeight: 1.85 }}>Каждая программа — это маршрут внутрь себя. Со своим запахом, теплом и состоянием, которое останется с вами ещё долго после.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    style={{ background: "linear-gradient(135deg,#D4A855,#F0C878)", color: "#100c09", borderRadius: 50, whiteSpace: "nowrap" }}
                  >
                    Популярное
                  </div>
                )}
                <div className="relative overflow-hidden" style={{ height: 180, background: prog.imgFit === "contain" ? "#100c09" : "transparent" }}>
                  <img src={prog.img} alt={prog.title} className={`w-full h-full transition-transform duration-500 hover:scale-105 ${prog.imgFit === "contain" ? "object-contain" : "object-cover"}`} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,12,9,0.85) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-3 left-4">
                    <span className="glass-tag">{prog.tag}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4 flex-1">
                    <h3 className="font-display font-light mb-1" style={{ fontSize: 22, color: "#f0e8da", lineHeight: 1.25 }}>{prog.title}</h3>
                    <p style={{ color: "#9c8264", fontSize: 12, marginTop: 4 }}>{prog.subtitle}</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-start gap-2" style={{ fontSize: 13, color: "rgba(240,232,218,0.75)" }}>
                        <Icon name="Check" size={12} style={{ color: "#c9a26e", flexShrink: 0, marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    {prog.modal ? (
                      <button
                        onClick={() => setProgramModal(prog.modal!)}
                        className={prog.popular ? "btn-gold text-center" : "btn-outline-gold text-center"}
                        style={{ fontSize: 11, padding: "11px 20px", cursor: "pointer" }}
                      >
                        Подробнее
                      </button>
                    ) : (
                      <Link
                        to={prog.href}
                        className={prog.popular ? "btn-gold text-center" : "btn-outline-gold text-center"}
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
