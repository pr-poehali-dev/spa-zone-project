import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import SpacesAndGallery from "@/components/sections/SpacesAndGallery";
import ProgramsSection from "@/components/sections/ProgramsSection";
import ContactsSection from "@/components/sections/ContactsSection";
import PromoSection from "@/components/sections/PromoSection";
import YclientsWidget from "@/components/sections/YclientsWidget";
import { NAV_ITEMS, HERO_IMAGES } from "@/data/indexData";

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="reveal">{children}</div>;
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setParallaxY(y * 0.35);
      const sections = NAV_ITEMS.map((i) => i.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && y >= el.offsetTop - 130) { setActiveNav(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#100c09", color: "#f0e8da", fontFamily: "'Golos Text', sans-serif" }}>
      <HeroSection
        activeNav={activeNav}
        scrolled={scrolled}
        parallaxY={parallaxY}
        heroIndex={heroIndex}
      />

      <RevealSection>
        <SpacesAndGallery onLightboxOpen={setLightbox} />
      </RevealSection>

      <RevealSection>
        <ProgramsSection />
      </RevealSection>

      <RevealSection>
        <PromoSection />
      </RevealSection>

      <RevealSection>
        <YclientsWidget />
      </RevealSection>

      <RevealSection>
        <ContactsSection />
      </RevealSection>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(16,12,9,0.95)", backdropFilter: "blur(8px)", animation: "fadeIn 0.3s ease" }}
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-3 right-3 sm:top-6 sm:right-6 transition-colors" style={{ color: "rgba(237,232,223,0.5)" }} onClick={() => setLightbox(null)}>
            <Icon name="X" size={28} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} style={{ width: "100%", borderRadius: 12 }} />
            <p className="text-center font-display mt-4" style={{ fontSize: "clamp(16px, 4vw, 22px)", color: "#c9a26e" }}>{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}