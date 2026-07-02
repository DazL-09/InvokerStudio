"use client";

import { useEffect, useRef, useState } from "react";
import { waUrl } from "@/lib/constants";

const sections = [
  { id: "hero", label: "Beranda" },
  { id: "layanan", label: "Layanan" },
  { id: "proses", label: "Proses" },
  { id: "clients", label: "Klien" },
  { id: "cta", label: "Kontak" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeRef = useRef(activeSection);

  useEffect(() => { activeRef.current = activeSection; }, [activeSection]);

  // Sync is-active class to active section for entrance animation
  useEffect(() => {
    document.querySelectorAll("section[id]").forEach((el) => {
      el.classList.remove("is-active");
    });
    const activeEl = document.getElementById(activeSection);
    if (activeEl) activeEl.classList.add("is-active");
  }, [activeSection]);

  // Wheel interceptor: 1 scroll = 1 section
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    let isScrolling = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const idx = sections.findIndex((s) => s.id === activeRef.current);
      if (idx === -1) return;
      const next = Math.max(0, Math.min(sections.length - 1, idx + dir));
      if (next === idx) return;

      isScrolling = true;
      document.getElementById(sections[next].id)?.scrollIntoView({
        behavior: "smooth",
      });
      timeoutId = setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    main.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      main.removeEventListener("wheel", onWheel);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const onScroll = () => {
      const viewCenter = window.innerHeight / 2;
      let current = "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewCenter) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop: Sidebar dot navigation */}
      <nav
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 md:block"
        aria-label="Navigasi section"
      >
        <div className="flex flex-col items-end gap-5">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-3"
              aria-label={`Ke section ${label}`}
            >
              <span
                className={`side-label whitespace-nowrap text-sm transition-all duration-300 ${
                  activeSection === id
                    ? "text-[#F2F2F2] font-medium"
                    : "text-[#6E6E73]"
                }`}
              >
                {label}
              </span>
              <div
                className={`side-dot h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "side-dot-active bg-[#0066FF] shadow-[0_0_10px_rgba(0,102,255,0.5)] scale-125"
                    : "bg-[#3A3A3D] group-hover:bg-[#6E6E73]"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile: Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${
            mobileOpen ? "bg-[#0A0A0B]" : "bg-[rgba(10,10,11,0.75)] backdrop-blur-[16px]"
          }`}
        >
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2"
            aria-label="Ke atas"
          >
            <img
              src="/logo-is.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-chrome text-sm font-semibold">
              Invoker Studio
            </span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5"
            aria-label="Menu navigasi"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {mobileOpen && (
          <nav
            className="border-t border-[#2A2A2E] bg-[#0A0A0B] px-4 py-6"
            aria-label="Navigasi mobile"
          >
            <div className="flex flex-col gap-4">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-link text-left text-base ${
                    activeSection === id ? "active" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-2 px-5 py-2.5 text-center text-sm"
                aria-label="Chat via WhatsApp"
              >
                Chat via WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
