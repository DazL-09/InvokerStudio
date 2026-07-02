"use client";

import { useEffect, useRef, useState } from "react";
import { clients } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ClientsSection() {
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
      id="clients"
      ref={sectionRef}
      className="min-h-screen flex items-center snap-start"
    >
      <div className="section-content mx-auto max-w-6xl w-full px-4 py-12">
        <SectionHeading>Our Client</SectionHeading>

        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {clients.map((client, i) => (
            <div
              key={client.name}
              className={`group relative flex flex-col rounded-2xl border border-[#2A2A2E] bg-[#121214] p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:border-[#0066FF] hover:shadow-[0_0_30px_rgba(0,102,255,0.08)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Quote icon */}
              <svg
                className="mb-4 h-8 w-8 text-[#0066FF] opacity-30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>

              {/* Review text */}
              <p className="mb-6 flex-1 text-base leading-relaxed text-gray-300 italic">
                &ldquo;{client.review}&rdquo;
              </p>

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: client.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="h-4 w-4 text-[#0066FF]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-4 h-px w-full bg-[#2A2A2E]" />

              {/* Client info */}
              <h3 className="text-sm font-semibold text-white">
                {client.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
