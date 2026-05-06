import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { SPACES, GALLERY_ITEMS } from "@/data/indexData";

function GalleryCarousel({ items, onOpen, wide }: { items: typeof GALLERY_ITEMS; onOpen: (item: typeof GALLERY_ITEMS[0]) => void; wide?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, [items.length]);

  const goTo = (i: number) => {
    setFade(false);
    setTimeout(() => { setIdx(i); setFade(true); }, 400);
  };

  const item = items[idx];

  return (
    <div
      style={{ aspectRatio: wide ? "16/6" : "4/3", borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer" }}
      onClick={() => onOpen(item)}
    >
      <img
        src={item.img}
        alt={item.title}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <div className="gallery-overlay" style={{ opacity: 1 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a26e", marginBottom: 4 }}>{item.cat}</span>
        <span className="font-display" style={{ fontSize: 20, color: "#f0e8da" }}>{item.title}</span>
      </div>
      {/* Dots */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 10 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            style={{ width: i === idx ? 16 : 5, height: 5, borderRadius: 99, background: i === idx ? "#c9a26e" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }}
          />
        ))}
      </div>
      {/* Nav arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); goTo((idx - 1 + items.length) % items.length); }}
        style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
      >
        <Icon name="ChevronLeft" size={14} style={{ color: "#c9a26e" }} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goTo((idx + 1) % items.length); }}
        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
      >
        <Icon name="ChevronRight" size={14} style={{ color: "#c9a26e" }} />
      </button>
    </div>
  );
}

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

function GalleryCard({ item, onOpen }: { item: { img: string; title: string; cat: string; imgs?: string[] }; onOpen: () => void }) {
  const images = item.imgs ?? [item.img];
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1400);
    return () => clearInterval(t);
  }, [hovered, images.length]);

  return (
    <div
      className="gallery-item"
      style={{ aspectRatio: "4/3", borderRadius: 10, overflow: "hidden", position: "relative" }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIdx(0); }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={item.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      ))}
      <div className="gallery-overlay">
        <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a26e", marginBottom: 4 }}>{item.cat}</span>
        <span className="font-display" style={{ fontSize: 20, color: "#f0e8da" }}>{item.title}</span>
      </div>
      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 10 }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: i === idx ? 14 : 5, height: 5, borderRadius: 99, background: i === idx ? "#c9a26e" : "rgba(255,255,255,0.4)", transition: "all 0.3s" }} />
          ))}
        </div>
      )}
    </div>
  );
}

function SpaceCard({ space }: { space: { icon: string; title: string; desc: string; tag: string; img: string; imgs?: string[]; autoFlip?: boolean } }) {
  const images = space.imgs ?? [space.img];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };

  useEffect(() => {
    if (!space.autoFlip) return;
    const interval = setInterval(() => setFlipped((f) => !f), 3000);
    return () => clearInterval(interval);
  }, [space.autoFlip]);

  if (space.autoFlip) {
    return (
      <div
        style={{ perspective: 900, height: 320, cursor: "pointer" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.75s cubic-bezier(0.5,0.1,0.2,1)",
          transform: flipped ? "rotateX(-90deg)" : "rotateX(0deg)",
          transformOrigin: "center bottom",
        }}>
          {/* Front */}
          <div className="card-dark" style={{
            position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden",
            backfaceVisibility: "hidden",
          }}>
            <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
              <img src={space.img} alt={space.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,12,9,0.72) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", top: 16, left: 16 }}>
                <span className="glass-tag">{space.tag}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,85,0.12)" }}>
                  <Icon name={space.icon} size={15} style={{ color: "#c9a26e" }} />
                </div>
                <h3 className="font-display font-medium" style={{ fontSize: 20, color: "#f0e8da" }}>{space.title}</h3>
              </div>
              <p style={{ fontSize: 11, color: "rgba(201,162,110,0.45)", fontStyle: "italic" }}>Наведи для описания</p>
            </div>
          </div>

          {/* Bottom */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden",
            background: "linear-gradient(160deg, rgba(212,168,85,0.09), rgba(18,13,9,0.98))",
            border: "1px solid rgba(201,162,110,0.3)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "28px 28px",
            backfaceVisibility: "hidden",
            transform: "rotateX(90deg) translateZ(320px)",
            transformOrigin: "center bottom",
          }}>
            <span className="glass-tag" style={{ alignSelf: "flex-start", marginBottom: 14 }}>{space.tag}</span>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,85,0.12)" }}>
                <Icon name={space.icon} size={15} style={{ color: "#c9a26e" }} />
              </div>
              <h3 className="font-display font-medium" style={{ fontSize: 20, color: "#f0e8da" }}>{space.title}</h3>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#d4b896", lineHeight: 1.8, margin: 0 }}>
              {space.desc}
            </p>
            <div style={{ marginTop: 18, height: 1, background: "linear-gradient(to right, #c9a26e, transparent)" }} />
            <p style={{ marginTop: 12, fontSize: 11, color: "#9c8264", letterSpacing: "0.12em", textTransform: "uppercase" }}>записаться →</p>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,12,9,0.72) 0%, transparent 60%)" }} />
        <div className="absolute top-4 left-4">
          <span className="glass-tag">{space.tag}</span>
        </div>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)" }}>
              <Icon name="ChevronLeft" size={14} style={{ color: "#c9a26e" }} />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)" }}>
              <Icon name="ChevronRight" size={14} style={{ color: "#c9a26e" }} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} className="rounded-full transition-all duration-300" style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? "#c9a26e" : "rgba(255,255,255,0.4)" }} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,85,0.12)" }}>
            <Icon name={space.icon} size={15} style={{ color: "#c9a26e" }} />
          </div>
          <h3 className="font-display font-medium" style={{ fontSize: 20, color: "#f0e8da" }}>{space.title}</h3>
        </div>
        <p style={{ color: "#9c8264", fontSize: 14, lineHeight: 1.7 }}>{space.desc}</p>
      </div>
    </div>
  );
}

interface SpacesAndGalleryProps {
  onLightboxOpen: (item: { img: string; title: string }) => void;
}

export default function SpacesAndGallery({ onLightboxOpen }: SpacesAndGalleryProps) {
  return (
    <>
      {/* ── STATS ── */}
      <FadeSection className="py-7 border-y" style={{ borderColor: "rgba(212,168,85,0.1)", background: "#0F0D0B" } as React.CSSProperties}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-5 text-center">
          {[
            { num: "500+", label: "Довольных клиентов" },
            { num: "10+", label: "Авторских программ" },
            { num: "3 года", label: "Безупречного сервиса" },
            { num: "Пар-мастер", label: "Профессиональное парение" },
            { num: "СПА", label: "Полный спектр услуг" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display font-light mb-0.5" style={{ fontSize: 22, color: "#c9a26e" }}>{s.num}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9c8264" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── SPACES / GALLERY ── */}
      <FadeSection id="spaces" className="py-24" style={{ background: "#100c09" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Наши пространства</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Галерея</h2>
            <div className="gold-divider" />
          </div>

          {/* Gallery: 2 fixed cards + wide carousel below */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {GALLERY_ITEMS.slice(0, 2).map((item, i) => (
              <GalleryCard key={i} item={item} onOpen={() => onLightboxOpen(item)} />
            ))}
          </div>
          <div className="mb-14">
            <GalleryCarousel items={GALLERY_ITEMS.slice(2)} onOpen={onLightboxOpen} wide />
          </div>

          {/* Space cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPACES.map((space) => (
              <SpaceCard key={space.title} space={space} />
            ))}
          </div>
        </div>
      </FadeSection>
    </>
  );
}