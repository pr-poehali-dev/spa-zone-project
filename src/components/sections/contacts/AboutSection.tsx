import Icon from "@/components/ui/icon";
import { MASSAGE_IMAGE_EXPORT as MASSAGE_IMAGE } from "@/data/indexData";
import { FadeSection } from "./shared";

export default function AboutSection() {
  return (
    <FadeSection id="about" className="py-12 md:py-24" style={{ background: "#0F0D0B" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative">
            <img
              src={MASSAGE_IMAGE}
              alt="О нас"
              style={{ width: "100%", height: "clamp(260px, 50vw, 460px)", objectFit: "cover", borderRadius: 12 }}
            />
          </div>
          <div>
            <div className="section-tag">Кто мы</div>
            <h2 className="font-display font-light mt-2 leading-tight" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#f0e8da" }}>
              Место, где<br />
              <span className="italic" style={{ color: "#c9a26e" }}>тело</span>
              <br />отдыхает по-настоящему
            </h2>
            <div className="gold-divider" />
            <p style={{ color: "#9c8264", lineHeight: 1.85, marginBottom: 14, fontSize: 15 }}>
              Мы создавали «Пространство Пара» с одной мыслью: дать людям место, где не нужно ничего делать — только чувствовать. Тепло воды, аромат пара, вес хорошего массажа. Без суеты, без экранов, без спешки.
            </p>
            <p style={{ color: "#9c8264", lineHeight: 1.85, marginBottom: 24, fontSize: 15 }}>
              За три года через наши двери прошло больше восьми тысяч гостей — и каждый уходил с чем-то своим. Кто-то с лёгкостью в теле, кто-то с тишиной внутри. Именно это мы считаем настоящим результатом.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "Users", text: "Команда мастеров" },
                { icon: "MapPin", text: "г. Артём, Глобус 2" },
                { icon: "Star", text: "4.9 на Яндекс.Картах" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: "1px solid rgba(212,168,85,0.1)" }}
                >
                  <Icon name={item.icon} size={14} style={{ color: "#c9a26e", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#f0e8da" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}
