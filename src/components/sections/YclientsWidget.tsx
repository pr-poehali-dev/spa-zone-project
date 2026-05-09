import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function YclientsWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <section id="booking" style={{ background: "#100c09", padding: "100px 0" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 400,
              color: "#f0e8da",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}
          >
            Запишитесь онлайн
          </p>
          <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#b8862e,#e8c06a)" }} />
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: 16, color: "#9c8264", maxWidth: 420, lineHeight: 1.7 }}>
            Выберите удобное время — и мы подготовим всё для вашего отдыха
          </p>
          <button
            onClick={() => setOpen(true)}
            className="btn-gold"
            style={{ fontSize: 16, padding: "16px 48px", letterSpacing: "0.1em" }}
          >
            Записаться онлайн
          </button>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,7,5,0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            style={{
              background: "#100c09",
              border: "1px solid rgba(212,168,85,0.2)",
              borderRadius: 20,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              width: "min(960px, 95vw)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(212,168,85,0.1)" }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#f0e8da", letterSpacing: "0.05em" }}>
                Онлайн-запись
              </span>
              <button onClick={() => setOpen(false)} style={{ color: "#9c8264" }}>
                <Icon name="X" size={22} />
              </button>
            </div>
            <iframe
              src="https://n1119264.yclients.com/"
              title="Онлайн-запись Пространство Пара"
              width="100%"
              style={{ display: "block", flex: 1, minHeight: 600, border: "none" }}
              allow="payment"
            />
          </div>
        </div>
      )}
    </>
  );
}
