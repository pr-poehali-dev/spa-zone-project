import { useEffect, useRef, useState } from "react";

const PROMOS = [
  {
    title: "Парение вениками — глубокое очищение",
    desc: "Мастер-пар накрывает тело с головой берёзовыми и дубовыми вениками. Тело прогревается насквозь — уходит усталость, напряжение и всё лишнее.",
    img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6a8ce8e5-e554-417f-8c31-372838c80305.jpg",
  },
  {
    title: "Активное Долголетие",
    desc: "Комплекс процедур для восстановления суставов, улучшения кровообращения и общего тонуса. Тело становится легче, гибче — и начинает работать как в молодости.",
    img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/46a552c8-ec96-4754-a452-65c01c69ac7c.jpg",
  },
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

export default function PromoSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`py-12 md:py-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "#0a0806" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-tag">Специально для вас</div>
          <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#f0e8da" }}>
            Акции и предложения
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {PROMOS.map((promo, i) => (
            <div
              key={i}
              className="flex overflow-hidden"
              style={{ borderRadius: 6, background: "rgba(22,17,12,0.9)", border: "1px solid rgba(201,162,110,0.12)", minHeight: "clamp(200px, 30vw, 280px)" }}
            >
              {/* Текст */}
              <div className="flex flex-col justify-between p-8 flex-1">
                <div>
                  <h3 className="font-display font-light mb-3" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#f0e8da", lineHeight: 1.25 }}>
                    {promo.title}
                  </h3>
                  <p style={{ color: "#9c8264", fontSize: 14, lineHeight: 1.75 }}>{promo.desc}</p>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <a
                    href="#contacts"
                    className="btn-gold"
                    style={{ fontSize: 12, padding: "12px 24px", textAlign: "center" }}
                  >
                    Записаться
                  </a>
                  <a
                    href="#programs"
                    className="btn-outline-gold"
                    style={{ fontSize: 12, padding: "11px 24px", textAlign: "center" }}
                  >
                    Подробнее
                  </a>
                </div>
              </div>

              {/* Фото */}
              <div style={{ minWidth: 200, maxWidth: "30%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <img
                  src={promo.img}
                  alt={promo.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}