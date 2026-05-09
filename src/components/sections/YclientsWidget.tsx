export default function YclientsWidget() {
  return (
    <section id="booking" style={{ background: "#100c09", padding: "80px 0 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 400,
              color: "#f0e8da",
              letterSpacing: "0.04em",
              marginBottom: 8,
            }}
          >
            Онлайн-запись
          </p>
          <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#b8862e,#e8c06a)", margin: "0 auto" }} />
        </div>

        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(212,168,85,0.15)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          <iframe
            src="https://n1119264.yclients.com/"
            title="Онлайн-запись Пространство Пара"
            width="100%"
            height="700"
            frameBorder="0"
            allow="payment"
            style={{ display: "block", minHeight: 700 }}
          />
        </div>
      </div>
    </section>
  );
}
