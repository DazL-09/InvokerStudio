"use client";

import { useEffect, useRef, useState } from "react";
import { services, waUrl } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const icons = [
  {
    viewBox: "0 0 24 24",
    path: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h12v2H6V8zm0 4h8v2H6v-2z",
  },
  {
    viewBox: "0 0 24 24",
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    viewBox: "0 0 24 24",
    path: "M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h18v2H3v-2zm0 4h12v2H3v-2z",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="layanan"
      ref={sectionRef}
      className="min-h-screen flex items-center snap-start"
    >
      <div className="section-content mx-auto max-w-6xl w-full px-4 py-12">
        <SectionHeading>Layanan Kami</SectionHeading>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={`service-card relative flex flex-col rounded-2xl border p-8 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                svc.recommended
                  ? "border-[#0066FF] bg-[#121214] shadow-[0_0_30px_rgba(0,102,255,0.12)]"
                  : "border-[#2A2A2E] bg-[#121214]"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {svc.recommended && (
                <span className="service-rec-badge absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0066FF] px-4 py-1 text-xs font-semibold text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]">
                  Recommended
                </span>
              )}

              <div className="service-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,102,255,0.1)]">
                <svg
                  className="h-6 w-6 text-[#0066FF]"
                  viewBox={icons[i].viewBox}
                  fill="currentColor"
                >
                  <path d={icons[i].path} />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {svc.name}
              </h3>
              <p className="text-sm text-[#0066FF] font-semibold mb-6">
                {svc.priceRange}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {svc.featuresList.map((f, j) => (
                  <li
                    key={j}
                    className={`service-feature flex items-start gap-3 text-sm text-gray-300 ${
                      isVisible ? "revealed" : ""
                    }`}
                    style={{ transitionDelay: `${i * 200 + j * 80}ms` }}
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0066FF]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {svc.tech.map((t) => (
                  <span
                    key={t}
                    className={`service-chip rounded-full bg-[#1A1A1E] px-3 py-1 text-xs text-gray-400 border border-[#2A2A2E] transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }`}
                    style={{ transitionDelay: `${i * 200 + svc.featuresList.length * 80 + 100 + svc.tech.indexOf(t) * 60}ms` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Button
                variant={svc.recommended ? "accent" : "outline"}
                size="sm"
                href={waUrl(
                  `Halo%20Invoker%20Studio%2C%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(svc.name)}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={`Pilih paket ${svc.name}`}
                className="w-full justify-center"
              >
                Pilih Paket {svc.name.split(" ")[0]}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
