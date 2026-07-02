"use client";

import { useRef, useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessDesktop from "./ProcessDesktop";
import ProcessMobile from "./ProcessMobile";

const workProcess = [
  { step: 1, title: "Konsultasi & Analisis", desc: "Analisis kebutuhan bisnis dan perancangan struktur database." },
  { step: 2, title: "Desain & Wireframe", desc: "Perancangan alur pengguna dan tampilan antarmuka sebelum development." },
  { step: 3, title: "Development & Integrasi", desc: "Proses coding, integrasi fitur, dan pengujian internal berkala." },
  { step: 4, title: "Testing & Serah Terima", desc: "Quality assurance menyeluruh dan serah terima produk ke klien." },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const rect = section!.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const wh = window.innerHeight;
        const total = sectionHeight + wh;
        const scrolled = wh - sectionTop;
        setProgress(Math.max(0, Math.min(1, scrolled / total)));
        ticking = false;
      });
      ticking = true;
    };

    const main = document.getElementById("main-content");
    if (main) {
      main.addEventListener("scroll", handleScroll, { passive: true });
    }
    handleScroll();
    return () => {
      if (main) main.removeEventListener("scroll", handleScroll);
    };
  }, [isInView]);

  return (
    <section id="proses" ref={sectionRef} className="min-h-screen flex items-center snap-start">
      <div className="section-content mx-auto max-w-7xl w-full px-4">
        <SectionHeading>Timeline Rencana Kerja</SectionHeading>

        <ProcessDesktop items={workProcess} progress={progress} />
        <ProcessMobile items={workProcess} progress={progress} />
      </div>
    </section>
  );
}
