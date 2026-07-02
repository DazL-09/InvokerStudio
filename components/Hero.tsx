"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { waUrl } from "@/lib/constants";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const hl = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    const logoAnim = logo?.animate(
      [{ opacity: 0, transform: "scale(0.9)" }, { opacity: 1, transform: "scale(1)" }],
      { duration: 800, fill: "forwards", easing: "ease-out" }
    );

    const fadeOptions: KeyframeAnimationOptions = {
      duration: 600,
      fill: "forwards",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    };

    hl?.animate([{ opacity: 0, transform: "translateY(30px)" }, { opacity: 1, transform: "translateY(0)" }], {
      ...fadeOptions,
      delay: 200,
    });
    sub?.animate([{ opacity: 0, transform: "translateY(30px)" }, { opacity: 1, transform: "translateY(0)" }], {
      ...fadeOptions,
      delay: 350,
    });
    cta?.animate([{ opacity: 0, transform: "translateY(30px)" }, { opacity: 1, transform: "translateY(0)" }], {
      ...fadeOptions,
      delay: 500,
    });

    let ticking = false;
    const onScroll = () => {
      if (!bg) return;
      if (ticking) return;
      requestAnimationFrame(() => {
        const heroRect = bg.parentElement?.getBoundingClientRect();
        if (!heroRect) return;
        const offset = heroRect.top;
        const heroHeight = heroRect.height;
        if (offset > heroHeight || offset < -heroHeight) {
          ticking = false;
          return;
        }
        const translateY = offset * 0.15;
        bg.style.transform = `translateY(${translateY}px)`;
        ticking = false;
      });
      ticking = true;
    };

    const main = document.getElementById("main-content");
    if (main) {
      main.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      logoAnim?.cancel();
      if (main) main.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center snap-start"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-[#0066FF] opacity-[0.08] blur-[80px] will-change-transform"
          style={{ animation: "float-1 12s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[15%] top-[15%] h-[200px] w-[200px] rounded-full bg-[#0066FF] opacity-[0.06] blur-[60px] will-change-transform"
          style={{ animation: "float-2 10s ease-in-out infinite" }}
        />
        <div
          className="absolute left-[40%] bottom-[20%] h-[250px] w-[250px] rounded-full bg-[#4A90FF] opacity-[0.05] blur-[70px] will-change-transform"
          style={{ animation: "float-3 14s ease-in-out infinite" }}
        />
      </div>

      <div className="section-content w-full flex flex-col items-center">
      <div ref={logoRef} className="mb-8 opacity-0">
        <div className="relative h-[120px] w-[120px]">
          <div className="logo-ring" />
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
            <img
            src="/logo-is.png"
            alt="Invoker Studio Logo"
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
          <div className="shine-sweep pointer-events-none absolute inset-0" />
        </div>
      </div>
      </div>

      <h1
        ref={headlineRef}
        className="text-chrome mb-6 max-w-[700px] text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight opacity-0"
      >
        Wujudkan Kehadiran Digital Anda —{" "}
          <span className="tagline-rotate">
          <span className="tagline-rotate-inner">
            <span className="tagline-gradient">Landing Page</span>
            <span className="tagline-gradient">Sistem CRUD</span>
            <span className="tagline-gradient">Pemberdayaan Bisnis</span>
          </span>
        </span>
      </h1>

      <p
        ref={subRef}
        className="mb-10 max-w-[600px] text-lg text-gray-400 opacity-0"
      >
        Invoker Studio membangun solusi digital custom: Core, Dynamic, dan E-Commerce Suite — sesuai kebutuhan bisnis Anda.
      </p>

      <div ref={ctaRef} className="flex flex-col gap-4 opacity-0 sm:flex-row">
        <Button variant="outline" onClick={() => scrollTo("layanan")} ariaLabel="Lihat layanan Invoker Studio">
          Lihat Layanan
        </Button>
        <Button variant="primary" className="btn-pulse" href={waUrl()} target="_blank" rel="noopener noreferrer" ariaLabel="Chat via WhatsApp dengan Invoker Studio">
          Chat via WhatsApp
        </Button>
      </div>
      </div>
    </section>
  );
}
