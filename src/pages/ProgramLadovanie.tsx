import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TAGS = ["✦ Годовщина свадьбы", "✦ 23 февраля", "✦ 8 марта", "✦ Просто потому что любим"];

const STEPS = [
  {
    num: "I",
    title: "Прогрев в парной с запросом — ароматерапия и звуки колокольчиков",
    short: "Пар-мастер задаёт атмосферу: ароматные пары эфирных масел, мягкий звон колокольчиков, бережное тепло.",
    desc: "Вы входите с намерением. Пар-мастер задаёт атмосферу: ароматные пары эфирных масел, мягкий звон колокольчиков, бережное тепло. Двое замолкают и начинают слышать друг друга по-другому. Это не просто прогрев — это настройка. На себя, на партнёра, на то, зачем вы здесь вместе.",
  },
  {
    num: "II",
    title: "Хаммам — парное солевое скрабирование",
    short: "Горячий пар открывает кожу. Пара выполняет скраб друг для друга — это доверие и близость.",
    desc: "Горячий пар открывает кожу, и пара выполняет скраб друг для друга. Прикосновение рук партнёра — это доверие и близость. Кожа шёлковая, связь — крепче. Многие говорят, что именно в этот момент что-то меняется — появляется нежность, которую в обычной жизни некогда заметить.",
  },
  {
    num: "III",
    title: "Можжевеловая комната — мануальная терапия в паре",
    short: "В атмосфере живого можжевелового аромата женщина работает с телом мужчины мягкими техниками.",
    desc: "В атмосфере живого можжевелового аромата женщина работает с телом мужчины мягкими техниками — интуитивно, безопасно, с открытием: мы умеем заботиться вот так. Без инструкций. Руки сами знают, куда идти — если дать им волю.",
  },
  {
    num: "IV",
    title: "Парение вениками и ритуал «Колыбель» в бассейне",
    short: "Классическое парение — и затем мягкое покачивание в воде бассейна рядом. Тело невесомо.",
    desc: "Классическое парение — и затем мягкое покачивание в воде бассейна рядом. Тело невесомо, тепло передаётся от кожи к коже, время останавливается. В воде не нужно ничего держать. Ни напряжение, ни слова, ни привычные роли. Только двое — и тишина вокруг.",
  },
  {
    num: "V",
    title: "Закрытая терраса с качелями — только для вас",
    short: "Свежий воздух, пение птиц, никакой спешки. Именно здесь случается самое важное.",
    desc: "Свежий воздух, пение птиц, никакой спешки. Именно здесь случается самое важное — тихий разговор или молчание вдвоём. Терраса закрыта только для вас. Качели, пледы, горячий чай. День заканчивается здесь — медленно, по-настоящему.",
  },
];

const LIGHTBOX_STYLES = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(20,12,6,0.72)",
    backdropFilter: "blur(6px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  box: {
    background: "#f5f0e8",
    borderRadius: 18,
    padding: "48px 44px",
    maxWidth: 560,
    width: "100%",
    position: "relative" as const,
    boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
  },
};

export default function ProgramLadovanie() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

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

      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 40px 0", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8b5a3c", marginBottom: 16, fontStyle: "italic" }}>
          СЕМЕЙНАЯ ЦЕРЕМОНИЯ ПАРЕНИЯ
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 8vw, 90px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.0, margin: "0 0 14px" }}>
          ЛАДОВАНИЕ
        </h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "#8b5a3c", marginBottom: 28 }}>
          Обряд гармонии для двоих
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 40 }}>
          {["✦", "✦", "✦"].map((s, i) => <span key={i} style={{ color: "#c9a26e", fontSize: 12 }}>{s}</span>)}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Quote */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 40px 36px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Есть ритуалы, которые не просто расслабляют — они соединяют.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Ладование — пар, прикосновение и тишина.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3d1f0d", lineHeight: 1.8, margin: 0 }}>
          И вы снова чувствуете, зачем вы вместе.
        </p>
      </div>

      {/* Tags */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px 40px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
        {TAGS.map((tag, i) => (
          <div key={i} style={{ border: "1px solid rgba(139,90,60,0.35)", borderRadius: 50, padding: "8px 20px", fontSize: 13, color: "#7a5540", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", background: "rgba(201,162,110,0.06)" }}>
            {tag}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Steps */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 40px 80px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", textAlign: "center", marginBottom: 36 }}>
          ТАИНСТВО ПРОГРАММЫ
        </h3>

        {STEPS.map((step, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: "0 16px", padding: "22px 0", borderBottom: i < STEPS.length - 1 ? "1px solid rgba(139,90,60,0.12)" : "none", alignItems: "start" }}>
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
            <button onClick={() => setOpenIdx(i)} style={{ marginTop: 4, flexShrink: 0, background: "none", border: "1px solid rgba(139,90,60,0.35)", borderRadius: 50, padding: "5px 14px", fontSize: 11, color: "#8b5a3c", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Golos Text', sans-serif", whiteSpace: "nowrap" }}>
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
        <Link to="/#contacts" style={{ display: "inline-block", background: "linear-gradient(135deg, #c9a26e, #d4874a)", color: "#fff8f0", padding: "14px 42px", borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 4px 24px rgba(201,162,110,0.35)" }}>
          Забронировать
        </Link>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div onClick={() => setOpenIdx(null)} style={LIGHTBOX_STYLES.overlay}>
          <div onClick={(e) => e.stopPropagation()} style={LIGHTBOX_STYLES.box}>
            <button onClick={() => setOpenIdx(null)} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", color: "#8b5a3c", padding: 4 }}>
              <Icon name="X" size={18} />
            </button>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", color: "rgba(139,90,60,0.4)", marginBottom: 8 }}>{STEPS[openIdx].num}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#3d1f0d", marginBottom: 20, lineHeight: 1.3 }}>{STEPS[openIdx].title}</h2>
            <div style={{ height: 1, background: "linear-gradient(to right, #c9a26e, transparent)", marginBottom: 24 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: 0 }}>{STEPS[openIdx].desc}</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "space-between" }}>
              <button onClick={() => setOpenIdx((p) => (p! > 0 ? p! - 1 : STEPS.length - 1))} style={{ background: "none", border: "1px solid rgba(139,90,60,0.3)", borderRadius: 50, padding: "8px 20px", color: "#8b5a3c", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Golos Text', sans-serif" }}>← Назад</button>
              <button onClick={() => setOpenIdx((p) => (p! < STEPS.length - 1 ? p! + 1 : 0))} style={{ background: "linear-gradient(135deg,#c9a26e,#d4874a)", border: "none", borderRadius: 50, padding: "8px 20px", color: "#fff8f0", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Golos Text', sans-serif" }}>Далее →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
