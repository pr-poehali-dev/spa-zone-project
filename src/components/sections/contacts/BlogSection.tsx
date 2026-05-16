import React from "react";
import Icon from "@/components/ui/icon";
import { BLOG_POSTS } from "@/data/indexData";
import { FadeSection } from "./shared";

interface BlogSectionProps {
  flippedBlog: Record<string, boolean>;
  setFlippedBlog: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export default function BlogSection({ flippedBlog, setFlippedBlog }: BlogSectionProps) {
  return (
    <FadeSection id="blog" className="py-24" style={{ background: "#0F0D0B" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="section-tag">Полезное</div>
            <h2 className="font-display font-light mt-2" style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#f0e8da" }}>Блог</h2>
            <div className="gold-divider" />
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all hover:gap-3"
            style={{ color: "#c9a26e", fontWeight: 500 }}
          >
            Все статьи <Icon name="ArrowRight" size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.title}
              className="cursor-pointer"
              style={{ minHeight: "clamp(300px, auto, 340px)", perspective: 1000 }}
              onClick={() => setFlippedBlog(prev => ({ ...prev, [post.title]: !prev[post.title] }))}
            >
              <div
                className="blog-flip-inner"
                style={{
                  position: "relative", width: "100%", height: "100%",
                  transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
                  transform: flippedBlog[post.title] ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <article
                  style={{
                    position: "absolute", inset: 0, backfaceVisibility: "hidden",
                    background: "rgba(28,20,14,0.75)", border: "1px solid rgba(201,162,110,0.13)",
                    borderRadius: 14, overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", height: "clamp(140px, 25vw, 190px)", overflow: "hidden" }}>
                    <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,12,9,0.7) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: 16, left: 16 }}>
                      <span className="glass-tag">{post.tag}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 className="font-display font-medium leading-tight" style={{ fontSize: 20, color: "#f0e8da", marginBottom: 12 }}>{post.title}</h3>
                    <div className="flex items-center gap-4" style={{ color: "#9c8264", fontSize: 12 }}>
                      <span className="flex items-center gap-1"><Icon name="Calendar" size={11} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={11} /> {post.read} чтения</span>
                    </div>
                  </div>
                </article>

                {/* Back */}
                <article
                  style={{
                    position: "absolute", inset: 0, backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(135deg, rgba(212,168,85,0.12), rgba(28,20,14,0.95))",
                    border: "1px solid rgba(201,162,110,0.35)",
                    borderRadius: 14, overflow: "hidden",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "32px 28px",
                  }}
                >
                  <span className="glass-tag" style={{ alignSelf: "flex-start", marginBottom: 20 }}>{post.tag}</span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: "#d4b896", lineHeight: 1.85, margin: 0 }}>
                    {post.back}
                  </p>
                  <div style={{ marginTop: 28, height: 1, background: "linear-gradient(to right, #c9a26e, transparent)" }} />
                  <div style={{ marginTop: 16, fontSize: 11, color: "#9c8264", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {post.read} чтения · {post.date}
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}