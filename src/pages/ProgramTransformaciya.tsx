import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const STEPS = [
  {
    num: "I",
    title: "✦ Стихия Огня — очищение и формирование запроса",
    short: "Пространство наполняется силой и намерением. По желанию — вибрационное очищение звуками шаманского бубна.",
    desc: "Пространство наполняется силой и намерением. По желанию — вибрационное очищение звуками шаманского бубна. Освобождение от негативных установок. Огонь — это начало. Место, где вы проговариваете запрос: что хотите отпустить, что принять, куда двигаться. Мастер слышит каждую.",
  },
  {
    num: "II",
    title: "✦ Стихия Земли — медово-солевой скраб с заговором",
    short: "Скрабирование с древнерусским заговором на исцеление Души и Тела. Тело наполняется теплом изнутри.",
    desc: "Скрабирование с древнерусским заговором на исцеление Души и Тела. Балансировка энергий в созвучии с энергией Земли — тело наполняется теплом изнутри. Мёд и соль — живые материалы. Они работают не только с кожей. Заговор произносится тихо, но слышен каждой клеткой.",
  },
  {
    num: "III",
    title: "✦ Стихия Воздуха — парение вениками в финской парной",
    short: "Классическое парение под звуки природы. Дыхание становится свободным, тело расправляется, мысли — чище.",
    desc: "Классическое парение под звуки природы. Мастер работает с каждой. Дыхание становится свободным, тело расправляется, мысли — чище. Воздух в парной пропитан берёзой и можжевельником. После этого этапа многие говорят, что почувствовали лёгкость — не в теле, а в голове.",
  },
  {
    num: "IV",
    title: "✦ Стихия Воды — ритуал «Колыбель» в бассейне",
    short: "Практика на доверие: вы ложитесь на воду — группа удерживает вас. Глубокий телесный опыт.",
    desc: "Практика на доверие: вы ложитесь на воду — группа удерживает вас. Глубокий телесный опыт, который невозможно объяснить — только прожить. Вода принимает тело, женщины рядом держат. В этот момент исчезает привычный контроль — и приходит что-то очень настоящее.",
  },
  {
    num: "V",
    title: "✦ Завершение — чай, угощения и метафорические карты",
    short: "Каждая получает своё послание — тонкое, точное. Момент тишины после путешествия через четыре стихии.",
    desc: "Каждая получает своё послание — тонкое, точное. Момент тишины и осмысления после путешествия через четыре стихии. Карты не гадают — они отражают. То, что уже есть внутри, просто становится видимым. Чай, сладости, тихий разговор или молчание — как захочется.",
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

export default function ProgramTransformaciya() {
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
          ОСОБЕННАЯ ЖЕНСКАЯ ПРОГРАММА
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 7vw, 82px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.0, margin: "0 0 16px" }}>
          ТРАНСФОРМАЦИЯ
        </h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "#8b5a3c", marginBottom: 28 }}>
          В энергиях психоэмоционального баланса
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
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Это не просто банный день. Это встреча с собой.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          В кругу женщин, в атмосфере любви и доверия —
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3d1f0d", lineHeight: 1.8, margin: 0 }}>
          отпустить лишнее и вспомнить себя настоящую.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Steps */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 40px 80px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", textAlign: "center", marginBottom: 36 }}>
          ЧЕТЫРЕ СТИХИИ — ЧЕТЫРЕ ЭТАПА
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
