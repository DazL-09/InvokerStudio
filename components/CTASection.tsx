"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { socialLinks, waUrl } from "@/lib/constants";
import Button from "@/components/ui/Button";

const sections = [
  { id: "layanan", label: "Layanan" },
  { id: "proses", label: "Proses" },
  { id: "clients", label: "Klien" },
  { id: "cta", label: "Kontak" },
];

export default function CTASection() {
  const ref = useScrollReveal<HTMLDivElement>(0.2);
  const footerRef = useScrollReveal<HTMLElement>(0.1);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta" className="min-h-screen flex flex-col snap-start">
      <div className="section-content flex-1 flex items-center justify-center px-4">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-chrome mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold">
            Siap Mulai Project Anda?
          </h2>
          <p className="mb-10 text-gray-400">
            Diskusikan kebutuhan Anda bersama tim Invoker Studio. Dari konsultasi hingga rilis, kami
            siap membantu mewujudkan solusi digital Anda.
          </p>
          <Button
            variant="accent"
            size="lg"
            href={waUrl("Halo%20Invoker%20Studio%2C%20saya%20tertarik%20untuk%20memulai%20project.")}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Chat sekarang via WhatsApp untuk memulai project"
          >
            Chat Sekarang via WhatsApp
          </Button>
        </div>
      </div>

      <footer ref={footerRef} className="reveal border-t border-[#2A2A2E] px-4 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm text-gray-500">
              &copy; 2026 Invoker Studio. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-gray-500 transition-colors hover:text-gray-300"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-gray-300"
              aria-label="Instagram Invoker Studio"
            >
              Instagram
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-accent-hover"
              aria-label="WhatsApp Invoker Studio"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
