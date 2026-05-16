import { type Dispatch, type SetStateAction } from "react";
import Icon from "@/components/ui/icon";
import PolicyModal from "@/components/PolicyModal";
import { FadeSection } from "./shared";

interface HowToGetAndContactsSectionProps {
  formData: { name: string; phone: string; comment: string };
  setFormData: Dispatch<SetStateAction<{ name: string; phone: string; comment: string }>>;
  formStatus: "idle" | "loading" | "success" | "error";
  setFormStatus: Dispatch<SetStateAction<"idle" | "loading" | "success" | "error">>;
  policyModal: "privacy" | "consent" | null;
  setPolicyModal: Dispatch<SetStateAction<"privacy" | "consent" | null>>;
  policyChecked: boolean;
  setPolicyChecked: Dispatch<SetStateAction<boolean>>;
}

export default function HowToGetAndContactsSection({
  formData, setFormData, formStatus, setFormStatus,
  policyModal, setPolicyModal, policyChecked, setPolicyChecked,
}: HowToGetAndContactsSectionProps) {
  return (
    <>
      {/* ── HOW TO GET ── */}
      <FadeSection id="howtoget" className="py-24" style={{ background: "#0F0D0B" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <div className="section-tag">Как добраться</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#f0e8da" }}>Мы на карте</h2>
            <div className="gold-divider" />
            <p className="mt-4" style={{ color: "#9c8264", fontSize: 15, lineHeight: 1.8 }}>
              г. Артём, мкр. Глобус 2, дом 1А
            </p>
          </div>

          {/* Карта */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(212,168,85,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)", marginBottom: 20 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=132.163000%2C43.360000&z=14&pt=132.163000%2C43.360000&text=%D0%90%D1%80%D1%82%D1%91%D0%BC%2C%20%D0%BC%D0%BA%D1%80.%20%D0%93%D0%BB%D0%BE%D0%B1%D1%83%D1%81%202%2C%20%D0%B4%D0%BE%D0%BC%201%D0%90"
              title="Пространство Пара на карте"
              width="100%"
              height="420"
              frameBorder="0"
              style={{ display: "block" }}
              allowFullScreen
            />
          </div>

          {/* Маршруты */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <a
              href="https://yandex.ru/maps/?rtext=Владивосток~43.360000,132.163000&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 transition-all"
              style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#b8862e,#e8c06a)" }}>
                <Icon name="Navigation" size={18} style={{ color: "#100c09" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#c9a26e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Из Владивостока</div>
                <div style={{ fontSize: 14, color: "#f0e8da" }}>Маршрут на Яндекс.Картах</div>
                <div style={{ fontSize: 12, color: "#9c8264", marginTop: 2 }}>~45 мин · трасса А-189</div>
              </div>
            </a>

            <a
              href="https://yandex.ru/maps/?rtext=Артём~43.360000,132.163000&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 transition-all"
              style={{ background: "rgba(26,20,16,0.7)", border: "1px solid rgba(212,168,85,0.15)", borderRadius: 12, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,85,0.15)")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#b8862e,#e8c06a)" }}>
                <Icon name="MapPin" size={18} style={{ color: "#100c09" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#c9a26e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>По городу Артём</div>
                <div style={{ fontSize: 14, color: "#f0e8da" }}>Маршрут на Яндекс.Картах</div>
                <div style={{ fontSize: 12, color: "#9c8264", marginTop: 2 }}>~10 мин · мкр. Глобус 2</div>
              </div>
            </a>
          </div>
        </div>
      </FadeSection>

      {/* ── CONTACTS ── */}
      <FadeSection id="contacts" className="py-24" style={{ background: "#100c09" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-tag">Мы ждём вас</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Контакты</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Form */}
            <div>
              <h3 className="font-display font-light mb-4" style={{ fontSize: "clamp(22px, 4vw, 28px)", color: "#f0e8da" }}>Записаться на визит</h3>
              <p className="text-sm mb-6" style={{ color: "#B8A98A", lineHeight: 1.6 }}>
                Оставьте ваши контактные данные, наш администратор свяжется с вами и ответит на ваши вопросы с 10:00 до 22:00
              </p>
              <form className="space-y-3" onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus("loading");
                try {
                  const res = await fetch("https://functions.poehali.dev/ce5987a8-a696-47ec-be09-3afce56f755b", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });
                  if (res.ok) {
                    setFormStatus("success");
                    setFormData({ name: "", phone: "", comment: "" });
                  } else {
                    setFormStatus("error");
                  }
                } catch {
                  setFormStatus("error");
                }
              }}>
                {[
                  { key: "name", type: "text", placeholder: "Ваше имя" },
                  { key: "phone", type: "tel", placeholder: "Номер телефона" },
                ].map(({ key, type, placeholder }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
                    required
                    className="w-full px-5 py-3.5 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(26,20,16,0.7)",
                      border: "1px solid rgba(212,168,85,0.15)",
                      borderRadius: 8,
                      color: "#f0e8da",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.15)")}
                  />
                ))}
                <textarea
                  placeholder="Пожелания или вопросы"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
                  className="w-full px-5 py-3.5 text-sm outline-none transition-all resize-none"
                  style={{
                    background: "rgba(26,20,16,0.7)",
                    border: "1px solid rgba(212,168,85,0.15)",
                    borderRadius: 8,
                    color: "#f0e8da",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,85,0.15)")}
                />
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={policyChecked}
                    onChange={(e) => setPolicyChecked(e.target.checked)}
                    style={{ marginTop: 3, accentColor: "#c9a26e", flexShrink: 0, width: 15, height: 15 }}
                  />
                  <span style={{ fontSize: 12, color: "rgba(240,232,218,0.55)", lineHeight: 1.6 }}>
                    Нажимая кнопку, я принимаю{" "}
                    <button type="button" onClick={() => setPolicyModal("privacy")} style={{ color: "#c9a26e", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>
                      политику конфиденциальности
                    </button>{" "}
                    и даю{" "}
                    <button type="button" onClick={() => setPolicyModal("consent")} style={{ color: "#c9a26e", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>
                      согласие на обработку персональных данных
                    </button>
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full btn-gold text-center"
                  disabled={formStatus === "loading" || !policyChecked}
                  style={{ opacity: policyChecked ? 1 : 0.5 }}
                >
                  {formStatus === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>
                {formStatus === "success" && (
                  <p className="text-sm text-center mt-3" style={{ color: "#c9a26e" }}>
                    Заявка отправлена! Мы свяжемся с вами с 10:00 до 22:00.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm text-center mt-3" style={{ color: "#e88" }}>
                    Не удалось отправить. Позвоните нам напрямую.
                  </p>
                )}
              </form>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-display font-light mb-6" style={{ fontSize: "clamp(22px, 4vw, 28px)", color: "#f0e8da" }}>Как нас найти</h3>
              <div className="space-y-0">
                {[
                  { icon: "MapPin", title: "Адрес", text: "г. Артём, мкр. Глобус 2, дом 1А", href: undefined },
                  { icon: "Phone", title: "Телефон", text: "+7 908 980-35-45", href: "tel:+79089803545" },
                  { icon: "Mail", title: "Email", text: "fitnslim.par@mail.ru\nОтвечаем с 10:00 до 22:00", href: undefined },
                  { icon: "Clock", title: "Время работы", text: "Пн–Вс: 10:00–22:00\nБез выходных", href: undefined },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 py-4"
                    style={{ borderBottom: "1px solid rgba(212,168,85,0.08)" }}
                  >
                    <Icon name={item.icon} size={16} style={{ color: "#c9a26e", marginTop: 2, flexShrink: 0 }} />
                    <div className="flex-1">
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a26e", fontWeight: 500, marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 14, color: "#f0e8da", lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.text}</div>
                      {item.href && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          <a href="tel:+79089803545" className="inline-flex items-center gap-2 btn-gold" style={{ fontSize: 13, padding: "8px 20px" }}>
                            <Icon name="Phone" size={13} />
                            Позвонить
                          </a>
                          <a href="https://wa.me/79089803545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ fontSize: 13, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(212,168,85,0.3)", color: "#c9a26e", textDecoration: "none" }}>
                            <Icon name="MessageCircle" size={13} />
                            WhatsApp
                          </a>
                          <a href="https://t.me/+79089803545" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ fontSize: 13, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(212,168,85,0.3)", color: "#c9a26e", textDecoration: "none" }}>
                            <Icon name="Send" size={13} />
                            Telegram
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── FOOTER ── */}
      <footer className="py-8" style={{ background: "#080706", borderTop: "1px solid rgba(212,168,85,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src="https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/d09e264e-f834-4b1e-b7fe-6249ce129089.png"
              alt="Пространство Пара"
              style={{ height: 40, width: "auto" }}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <a
              href="tel:+79089803545"
              className="flex items-center gap-2"
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 15, letterSpacing: "0.03em", textDecoration: "none", background: "linear-gradient(90deg,#b8862e,#e8c06a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              <Icon name="Phone" size={14} style={{ color: "#c9a26e" }} />
              +7 908 980-35-45
            </a>
            <div style={{ fontSize: 12, color: "#9c8264" }}>© 2023–2026 Пространство Пара. Все права защищены.</div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://wa.me/79089803545"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: "1px solid rgba(212,168,85,0.2)", color: "#9c8264" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.6)"; (e.currentTarget as HTMLElement).style.color = "#c9a26e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.2)"; (e.currentTarget as HTMLElement).style.color = "#9c8264"; }}
            >
              <Icon name="MessageCircle" size={13} />
            </a>
            <a
              href="https://t.me/+79089803545"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: "1px solid rgba(212,168,85,0.2)", color: "#9c8264" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.6)"; (e.currentTarget as HTMLElement).style.color = "#c9a26e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,85,0.2)"; (e.currentTarget as HTMLElement).style.color = "#9c8264"; }}
            >
              <Icon name="Send" size={13} />
            </a>
          </div>
        </div>
      </footer>

      <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />
    </>
  );
}