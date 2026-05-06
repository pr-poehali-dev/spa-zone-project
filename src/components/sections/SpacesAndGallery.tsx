import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { SPACES, GALLERY_ITEMS } from "@/data/indexData";

function GalleryCarousel({ items, onOpen }: { items: typeof GALLERY_ITEMS; onOpen: (item: typeof GALLERY_ITEMS[0]) => void }) {
  const pairs = Math.ceil(items.length / 2);
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setPage((p) => (p + 1) % pairs); setFade(true); }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, [pairs]);

  const goTo = (p: number) => {
    setFade(false);
    setTimeout(() => { setPage(p); setFade(true); }, 400);
  };

  const prev = () => goTo((page - 1 + pairs) % pairs);
  const next = () => goTo((page + 1) % pairs);

  const pair = items.slice(page * 2, page * 2 + 2);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="grid grid-cols-2 gap-3"
        style={{ opacity: fade ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        {pair.map((item, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{ aspectRatio: "4/3", borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer" }}
            onClick={() => onOpen(item)}
          >
            <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="gallery-overlay">
              <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a26e", marginBottom: 4 }}>{item.cat}</span>
              <span className="font-display" style={{ fontSize: 20, color: "#f0e8da" }}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="ChevronLeft" size={15} style={{ color: "#c9a26e" }} />
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: pairs }).map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === page ? 18 : 6, height: 6, borderRadius: 99, background: i === page ? "#c9a26e" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={next} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(16,12,9,0.6)", border: "1px solid rgba(212,168,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="ChevronRight" size={15} style={{ color: "#c9a26e" }} />
        </button>
      </div>
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
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1600);
    return () => clearInterval(t);
  }, [hovered, images.length]);

  return (
    <a
      href="#contacts"
      style={{ display: "block", position: "relative", overflow: "hidden", borderRadius: 4, cursor: "pointer", aspectRatio: "4/3" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIdx(0); }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={space.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.2) 50%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span className="glass-tag" style={{ fontSize: 9 }}>{space.tag}</span>
        </div>
        <h3 className="font-display" style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#f0e8da", fontWeight: 400, lineHeight: 1.2 }}>{space.title}</h3>
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(10,8,6,0.55)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 12, padding: 24,
      }}>
        <p style={{ color: "#f0e8da", fontSize: 13, lineHeight: 1.7, textAlign: "center", maxWidth: 220 }}>{space.desc}</p>
        <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a26e", borderBottom: "1px solid rgba(201,162,110,0.4)", paddingBottom: 2 }}>Записаться</span>
      </div>
    </a>
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
      <FadeSection id="spaces" className="pt-10 pb-24" style={{ background: "#100c09" }}>
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
            <GalleryCarousel items={GALLERY_ITEMS.slice(2)} onOpen={onLightboxOpen} />
          </div>

          {/* Space cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
            {SPACES.map((space) => (
              <SpaceCard key={space.title} space={space} />
            ))}
          </div>
        </div>
      </FadeSection>
    </>
  );
}