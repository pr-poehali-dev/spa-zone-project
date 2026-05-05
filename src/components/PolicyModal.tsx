import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface PolicyModalProps {
  type: "privacy" | "consent" | null;
  onClose: () => void;
}

const CONTENT = {
  privacy: {
    title: "Политика конфиденциальности",
    sections: [
      {
        heading: "1. Общие положения",
        text: "Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных физических лиц, которые используют сайт СПА-центра «Пространство пара» (далее — Оператор). Оператор принимает все необходимые меры для защиты персональных данных пользователей.",
      },
      {
        heading: "2. Состав персональных данных",
        text: "Оператор обрабатывает следующие персональные данные: имя и фамилия; номер телефона; сообщения и пожелания, оставленные в форме обратной связи.",
      },
      {
        heading: "3. Цели обработки",
        text: "Персональные данные обрабатываются в целях: связи с пользователем для подтверждения записи и ответа на вопросы; улучшения качества обслуживания; информирования о специальных предложениях (только с согласия пользователя).",
      },
      {
        heading: "4. Хранение данных",
        text: "Персональные данные хранятся в защищённой информационной системе Оператора. Срок хранения — не более 3 лет с момента последнего обращения. После истечения срока данные уничтожаются.",
      },
      {
        heading: "5. Передача третьим лицам",
        text: "Оператор не передаёт персональные данные третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством Российской Федерации.",
      },
      {
        heading: "6. Права пользователя",
        text: "Пользователь вправе в любой момент отозвать своё согласие на обработку персональных данных, направив запрос по контактным данным, указанным на сайте. После получения запроса Оператор прекратит обработку данных в течение 10 рабочих дней.",
      },
      {
        heading: "7. Контакты",
        text: "По вопросам обработки персональных данных обращайтесь по телефону или через форму обратной связи на сайте.",
      },
    ],
  },
  consent: {
    title: "Согласие на обработку персональных данных",
    sections: [
      {
        heading: "",
        text: "Настоящим я, субъект персональных данных, свободно, своей волей и в своём интересе даю согласие СПА-центру «Пространство пара» (далее — Оператор) на обработку моих персональных данных на условиях, изложенных ниже.",
      },
      {
        heading: "Состав персональных данных",
        text: "Имя, номер телефона, текст сообщения, оставленного в форме обратной связи.",
      },
      {
        heading: "Цели обработки",
        text: "Обработка обращений пользователей; запись на услуги СПА-центра; консультирование по услугам и программам; информирование об акциях и специальных предложениях.",
      },
      {
        heading: "Перечень действий",
        text: "Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), блокирование, удаление, уничтожение персональных данных.",
      },
      {
        heading: "Срок действия согласия",
        text: "Согласие действует с момента его предоставления и до момента отзыва. Отзыв осуществляется путём направления письменного заявления Оператору.",
      },
      {
        heading: "Основание",
        text: "Настоящее согласие предоставляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».",
      },
    ],
  },
};

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [type]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!type) return null;

  const content = CONTENT[type];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,8,6,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(160deg, #1a140e, #120d09)",
          border: "1px solid rgba(201,162,110,0.2)",
          borderRadius: 20,
          maxWidth: 640,
          width: "100%",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "28px 32px 20px",
          borderBottom: "1px solid rgba(201,162,110,0.12)",
          flexShrink: 0,
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontWeight: 400,
            color: "#f0e8da", margin: 0,
          }}>
            {content.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(201,162,110,0.08)",
              border: "1px solid rgba(201,162,110,0.2)",
              borderRadius: "50%",
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#c9a26e", flexShrink: 0,
            }}
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", padding: "24px 32px 32px" }}>
          {content.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              {section.heading && (
                <h3 style={{
                  fontFamily: "'Golos Text', sans-serif",
                  fontSize: 13, fontWeight: 600,
                  color: "#c9a26e", letterSpacing: "0.06em",
                  textTransform: "uppercase", marginBottom: 8,
                }}>
                  {section.heading}
                </h3>
              )}
              <p style={{
                fontFamily: "'Golos Text', sans-serif",
                fontSize: 14, color: "rgba(240,232,218,0.7)",
                lineHeight: 1.85, margin: 0,
              }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 32px 24px",
          borderTop: "1px solid rgba(201,162,110,0.12)",
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(135deg, #D4A855, #F0C878)",
              color: "#100c09", border: "none", borderRadius: 8,
              fontFamily: "'Golos Text', sans-serif",
              fontSize: 13, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
