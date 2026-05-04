import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const STEPS = [
  {
    num: "I",
    title: "Встреча с пар-мастером — программа под двоих",
    desc: "Мастер слышит настроение каждого и выстраивает день так, чтобы оба чувствовали себя гостями, а не участниками потока.",
  },
  {
    num: "II",
    title: "Классическое парение на сенном матрасе — вдвоём",
    desc: "2 захода по 15 минут. Мастер работает для вас обоих: прогревает, ведёт, подстраивается под каждого. Совместное парение — особый опыт близости.",
  },
  {
    num: "III",
    title: "Контрастное проливание горячими травяными отварами",
    desc: "После каждого захода — контраст с отварами. Уходит усталость, исчезает напряжение — у обоих одновременно.",
  },
  {
    num: "IV",
    title: "Хаммам, бассейн, можжевеловая комната",
    desc: "Весь комплекс в вашем распоряжении. Никаких чужих людей рядом. Только вы двое, пар и тишина.",
  },
  {
    num: "V",
    title: "Терраса: свежий воздух, подвесная кровать, плед на двоих",
    desc: "Тела отдыхают, слова не нужны, а время как будто останавливается. Момент, который хочется повторять.",
  },
];

export default function ProgramPuteshestvie() {
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

      {/* Gold line */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, #c9a26e, transparent)" }} />

      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 40px 0", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8b5a3c", marginBottom: 16, fontStyle: "italic" }}>
          ПРОГРАММА ПАРЕНИЯ НА ДВОИХ
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.05, margin: "0 0 10px" }}>
          ПУТЕШЕСТВИЕ
        </h1>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, fontStyle: "italic", color: "#3d1f0d", margin: "0 0 12px" }}>
          ПО СОСТОЯНИЮ ТЕЛА
        </h2>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#8b5a3c", marginBottom: 28 }}>
          Для двоих
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 40 }}>
          {["✦", "✦", "✦"].map((s, i) => <span key={i} style={{ color: "#c9a26e", fontSize: 12 }}>{s}</span>)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Quote */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Иногда самое ценное — просто быть рядом, в тишине.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Без телефонов, без планов, без города за окном.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3d1f0d", lineHeight: 1.8, margin: 0 }}>
          Три часа в паре — и вы снова чувствуете друг друга.
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Steps */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 40px 80px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", textAlign: "center", marginBottom: 36 }}>
          КАК ПРОХОДИТ ВАШ ВЕЧЕР
        </h3>

        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: "0 24px",
              padding: "24px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid rgba(139,90,60,0.12)" : "none",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "rgba(139,90,60,0.5)", paddingTop: 2 }}>
              {step.num}
            </div>
            <div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 15, fontWeight: 600, color: "#3d1f0d", marginBottom: 6 }}>
                {step.title}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: "#7a5540", lineHeight: 1.75 }}>
                {step.desc}
              </div>
            </div>
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
    </div>
  );
}
