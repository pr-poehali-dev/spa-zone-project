import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PHOTOS = [
  "https://cdn.poehali.dev/files/79e8a835-813d-4f7e-b485-ccd3874a657c.jpg",
  "https://cdn.poehali.dev/files/f81b1334-d80f-410d-84c3-6694857abbcd.jpg",
];

const STEPS = [
  {
    num: "I",
    title: "Знакомство с пар-мастером — формирование запроса",
    short: "Мастер знакомится с каждой, слышит настроение группы и выстраивает день под вас.",
    desc: "С этого момента вы просто наслаждаетесь — он ведёт, вы отдыхаете. Никакого потока, никаких чужих людей рядом. Только ваша группа и внимание мастера, которое направлено на каждую.",
  },
  {
    num: "II",
    title: "Мыльно-веничный массаж или скрабирование в хаммаме",
    short: "Горячий пар + ароматная мыльная пена или скраб. Кожа невероятно мягкая, тело расслаблено.",
    desc: "Удовольствие для тех, кто делает впервые — и восторг для тех, кто уже знает. Мастер работает с каждой отдельно. Горячий пар раскрывает кожу, пена или скраб делают её такой, что хочется просто погладить себя по руке.",
  },
  {
    num: "III",
    title: "Классическое парение вениками — каждой гостье",
    short: "15 минут, одна зона — спина или живот, без переворота. Можжевеловый или берёзовый веник.",
    desc: "Глубокое мягкое прогревание под звуки природы. Это уже не баня — это медитация. Тело расслабляется так, как не расслаблялось давно. После — тишина, которую не хочется нарушать.",
  },
  {
    num: "IV",
    title: "Ритуал «Колыбель» в бассейне",
    short: "Вы ложитесь на воду — подруги держат. Тело невесомо, вы в полной безопасности.",
    desc: "Опыт, который невозможно объяснить — только почувствовать вместе. В этот момент исчезает всё лишнее: тревога, усталость, контроль. Остаётся только тепло воды и руки тех, кому вы доверяете.",
  },
  {
    num: "V",
    title: "Тёплый чан с хвоей и цитрусами + 5 массажей по 30 минут",
    short: "Живой аромат хвои и цитруса под открытым небом. Персональный массаж — спина или ноги на выбор.",
    desc: "Чан под открытым небом — живой огонь, вода 40°C, запах хвои и цитруса. Можно провести здесь весь оставшийся вечер. И каждая получает свои 30 минут наедине с мастером — спина или ноги, без спешки.",
  },
];

export default function ProgramZhenskaya() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const prevPhoto = useCallback(() => setPhotoIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const nextPhoto = useCallback(() => setPhotoIdx(i => (i + 1) % PHOTOS.length), []);

  useEffect(() => {
    const t = setInterval(nextPhoto, 4000);
    return () => clearInterval(t);
  }, [nextPhoto]);

  return (
    <div style={{ background: "#f5f0e8", minHeight: "100vh", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#f5f0e8", borderBottom: "1px solid rgba(139,90,60,0.15)", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#8b5a3c", textDecoration: "none", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          <Icon name="ArrowLeft" size={14} />
          Назад
        </Link>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 15, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5c3520" }}>
            ПРОСТРАНСТВО ПАРА
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8b5a3c", marginTop: 2 }}>
            пространство осознанного отдыха · Владивосток
          </div>
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ height: 1, background: "linear-gradient(to right, transparent, #c9a26e, transparent)" }} />

      {/* Carousel */}
      <div style={{ width: "100%", height: 520, overflow: "hidden", position: "relative" }}>
        {PHOTOS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Женская гармония"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 20%",
              opacity: i === photoIdx ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(245,240,232,0) 55%, rgba(245,240,232,1) 100%)" }} />

        {/* Arrows */}
        <button onClick={prevPhoto} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(245,240,232,0.2)", backdropFilter: "blur(6px)", border: "1px solid rgba(139,90,60,0.2)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5c3520" }}>
          <Icon name="ChevronLeft" size={18} />
        </button>
        <button onClick={nextPhoto} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(245,240,232,0.2)", backdropFilter: "blur(6px)", border: "1px solid rgba(139,90,60,0.2)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5c3520" }}>
          <Icon name="ChevronRight" size={18} />
        </button>

        {/* Dots */}
        <div style={{ position: "absolute", bottom: 72, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
          {PHOTOS.map((_, i) => (
            <button key={i} onClick={() => setPhotoIdx(i)} style={{ width: i === photoIdx ? 20 : 6, height: 6, borderRadius: 50, background: i === photoIdx ? "#c9a26e" : "rgba(139,90,60,0.35)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 40px 0", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8b5a3c", marginBottom: 16, fontStyle: "italic" }}>
          ЖЕНСКАЯ ПРОГРАММА ПАРЕНИЯ
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 7vw, 82px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.0, margin: "0 0 16px" }}>
          ЖЕНСКАЯ ГАРМОНИЯ
        </h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "#8b5a3c", marginBottom: 8 }}>
          День с подружками — без телефонов, без суеты
        </div>
        <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 13, color: "#a07050", letterSpacing: "0.1em", marginBottom: 28 }}>
          Программа рассчитана на 5 человек · 4+ часа
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 40 }}>
          {["✦", "✦", "✦"].map((s, i) => <span key={i} style={{ color: "#c9a26e", fontSize: 12 }}>{s}</span>)}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Quote */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 16px" }}>
          Пение птиц, тёплый чан, свежий воздух и пять часов настоящего отдыха.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3d1f0d", lineHeight: 1.8, margin: 0 }}>
          Зарядиться женской энергией — значит просто позволить себе быть.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Steps with lightbox */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 40px 80px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", textAlign: "center", marginBottom: 36 }}>
          КАК ПРОХОДИТ ВАШ ДЕНЬ
        </h3>

        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr auto",
              gap: "0 16px",
              padding: "22px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid rgba(139,90,60,0.12)" : "none",
              alignItems: "start",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "rgba(139,90,60,0.5)", paddingTop: 2 }}>
              {step.num}
            </div>
            <div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 15, fontWeight: 600, color: "#3d1f0d", marginBottom: 5 }}>
                {step.title}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#7a5540", lineHeight: 1.65 }}>
                {step.short}
              </div>
            </div>
            <button
              onClick={() => setOpenIdx(i)}
              style={{
                marginTop: 4,
                flexShrink: 0,
                background: "none",
                border: "1px solid rgba(139,90,60,0.35)",
                borderRadius: 50,
                padding: "5px 14px",
                fontSize: 11,
                color: "#8b5a3c",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Golos Text', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "rgba(139,90,60,0.06)", borderTop: "1px solid rgba(139,90,60,0.15)", padding: "48px 40px", textAlign: "center" }}>
        <p style={{ color: "#5c3520", fontSize: 14, marginBottom: 24, letterSpacing: "0.05em" }}>
          Записаться или узнать подробности
        </p>
        <Link
          to="/#contacts"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #c9a26e, #d4874a)",
            color: "#fff8f0",
            padding: "14px 42px",
            borderRadius: 50,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(201,162,110,0.35)",
          }}
        >
          Забронировать
        </Link>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          onClick={() => setOpenIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,12,6,0.72)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#f5f0e8",
              borderRadius: 18,
              padding: "48px 44px",
              maxWidth: 560,
              width: "100%",
              position: "relative",
              boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
            }}
          >
            <button
              onClick={() => setOpenIdx(null)}
              style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", color: "#8b5a3c", padding: 4 }}
            >
              <Icon name="X" size={18} />
            </button>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", color: "rgba(139,90,60,0.4)", marginBottom: 8 }}>
              {STEPS[openIdx].num}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#3d1f0d", marginBottom: 20, lineHeight: 1.3 }}>
              {STEPS[openIdx].title}
            </h2>
            <div style={{ height: 1, background: "linear-gradient(to right, #c9a26e, transparent)", marginBottom: 24 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: 0 }}>
              {STEPS[openIdx].desc}
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "space-between" }}>
              <button
                onClick={() => setOpenIdx((p) => (p! > 0 ? p! - 1 : STEPS.length - 1))}
                style={{ background: "none", border: "1px solid rgba(139,90,60,0.3)", borderRadius: 50, padding: "8px 20px", color: "#8b5a3c", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Golos Text', sans-serif" }}
              >
                ← Назад
              </button>
              <button
                onClick={() => setOpenIdx((p) => (p! < STEPS.length - 1 ? p! + 1 : 0))}
                style={{ background: "linear-gradient(135deg,#c9a26e,#d4874a)", border: "none", borderRadius: 50, padding: "8px 20px", color: "#fff8f0", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Golos Text', sans-serif" }}
              >
                Далее →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}