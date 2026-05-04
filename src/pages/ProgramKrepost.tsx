import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const STEPS = [
  {
    num: "I",
    title: "Знакомство с пар-мастером — формирование запроса",
    short: "Мягкое бесконтактное парение, настройка на запрос каждого гостя.",
    desc: "Вы приходите — пар-мастер встречает. Слушает. Без суеты, без программы «как у всех». Мягкое бесконтактное парение задаёт тон всему дню: тело начинает открываться, голова — освобождаться. Каждый получает то, зачем пришёл.",
  },
  {
    num: "II",
    title: "Классическое парение вениками — каждому гостю",
    short: "1 заход по 15 минут на сенном матрасе. Можжевеловый веник, одна зона — спина или живот.",
    desc: "Один заход — 15 минут. Сенной матрас, можжевеловый веник, одна зона без переворота. Мастер работает глубоко, но мягко — прогревает, а не «парит ради пара». После этого захода тело само знает, что ему нужно дальше.",
  },
  {
    num: "III",
    title: "Хаммам — турецкая баня",
    short: "Горячий пар, мраморный камень, расслабление в облаках тепла.",
    desc: "Горячий пар, мраморный камень, пространство без слов. Хаммам — не просто баня, это состояние, в котором тело наконец перестаёт держать напряжение. Здесь не нужно ничего делать — достаточно быть.",
  },
  {
    num: "IV",
    title: "Бассейн и тёплый чан на улице",
    short: "Термальный бассейн + чан с хвоей и цитрусами под открытым небом.",
    desc: "Термальный бассейн — чтобы остыть и снова почувствовать тело. Потом — чан под открытым небом: живой огонь, аромат хвои и цитруса, вода 40°C. Время здесь идёт иначе. Это не отдых — это восстановление.",
  },
  {
    num: "V",
    title: "5 массажей по 30 минут — спина или ноги",
    short: "Каждый гость получает персональный массаж на выбор.",
    desc: "Каждый гость — 30 минут один на один с мастером. Спина или ноги — на выбор. Никакого потока, никакой спешки. Финальная точка, после которой выходить не хочется.",
  },
  {
    num: "VI",
    title: "Фирменный стол",
    short: "Уха по-приморски, мясная и сырная нарезка, чай, мёд, фрукты.",
    desc: "Уха по-приморски — настоящая, из свежей рыбы. Мясная и сырная нарезка. Чай, мёд, сушки, фруктовая вода. Стол накрыт так, как накрывают для своих — без лишнего, но с душой. Качели на террасе или просто тишина рядом с теми, кому доверяешь.",
  },
];

const MASTER_TEXT = `Пар-мастер — это не банщик в привычном понимании. Это человек, который умеет слышать тело раньше, чем оно скажет само.

Он не работает по шаблону. Перед каждым заходом — разговор: как вы сейчас, что болит, что тревожит, чего хотите. И только потом — пар. Мягкий или плотный, можжевеловый или берёзовый, с прогревом или с контрастом — всё подстраивается под вас.

Мужчины редко говорят о том, что устали. Пар-мастер это видит и без слов. Его задача — не удивить техникой, а дать телу то, чего оно давно ждало: настоящий отдых, без контроля и ожиданий.

Все 4 часа программы — он рядом. Не обслуживает. Ведёт.`;

export default function ProgramKrepost() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [masterOpen, setMasterOpen] = useState(false);

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
          МУЖСКАЯ ПРОГРАММА ПАРЕНИЯ
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 7vw, 82px)", fontWeight: 700, color: "#3d1f0d", lineHeight: 1.0, margin: "0 0 16px" }}>
          КРЕПОСТЬ ДУХА
        </h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: "#8b5a3c", marginBottom: 8 }}>
          Для мужчин · 4 часа
        </div>
        <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 13, color: "#a07050", letterSpacing: "0.1em", marginBottom: 28 }}>
          Программа рассчитана на 5 человек
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
          Не отдохнуть от жизни — восстановиться для неё.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#5c3520", lineHeight: 1.8, margin: "0 0 12px" }}>
          Пар, тишина, хорошая компания и стол с ухой.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3d1f0d", lineHeight: 1.8, margin: 0 }}>
          Четыре часа, после которых чувствуешь себя собой.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)" }} />
      </div>

      {/* Steps with lightbox */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 40px 60px" }}>
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

      {/* Master block */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ height: 1, background: "rgba(139,90,60,0.2)", marginBottom: 40 }} />
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5c3520", textAlign: "center", marginBottom: 32 }}>
          ПАР-МАСТЕР
        </h3>
        <div style={{ background: "rgba(139,90,60,0.05)", border: "1px solid rgba(139,90,60,0.15)", borderRadius: 14, padding: "32px 36px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: "0 0 20px" }}>
            Пар-мастер — это не банщик в привычном понимании. Это человек, который умеет слышать тело раньше, чем оно скажет само.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: "0 0 20px" }}>
            Он не работает по шаблону. Перед каждым заходом — разговор: как вы сейчас, что болит, что тревожит, чего хотите. И только потом — пар.
          </p>
          <div
            style={{
              overflow: "hidden",
              maxHeight: masterOpen ? 300 : 0,
              transition: "max-height 0.4s ease",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: "0 0 20px" }}>
              Мужчины редко говорят о том, что устали. Пар-мастер это видит и без слов. Его задача — не удивить техникой, а дать телу то, чего оно давно ждало: настоящий отдых без контроля и ожиданий.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#5c3520", lineHeight: 1.85, margin: 0 }}>
              Все 4 часа программы — он рядом. Не обслуживает. Ведёт.
            </p>
          </div>
          <button
            onClick={() => setMasterOpen(!masterOpen)}
            style={{
              marginTop: 20,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#8b5a3c",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Golos Text', sans-serif",
              padding: 0,
            }}
          >
            {masterOpen ? "Свернуть" : "Читать далее"}
            <Icon name={masterOpen ? "ChevronUp" : "ChevronDown"} size={13} />
          </button>
        </div>
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
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8b5a3c",
                padding: 4,
              }}
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
