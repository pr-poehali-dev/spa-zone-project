import { useState } from "react";
import AboutSection from "./contacts/AboutSection";
import ReviewsSection from "./contacts/ReviewsSection";
import BlogSection from "./contacts/BlogSection";
import HowToGetAndContactsSection from "./contacts/HowToGetAndContactsSection";

export default function ContactsSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [policyModal, setPolicyModal] = useState<"privacy" | "consent" | null>(null);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [flippedBlog, setFlippedBlog] = useState<Record<string, boolean>>({});

  return (
    <>
      <AboutSection />
      <ReviewsSection />
      <BlogSection flippedBlog={flippedBlog} setFlippedBlog={setFlippedBlog} />
      <HowToGetAndContactsSection
        formData={formData}
        setFormData={setFormData}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        policyModal={policyModal}
        setPolicyModal={setPolicyModal}
        policyChecked={policyChecked}
        setPolicyChecked={setPolicyChecked}
      />
    </>
  );
}
