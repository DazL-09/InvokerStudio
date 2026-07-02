"use client";

interface ProcessItem {
  step: number;
  title: string;
  desc: string;
}

export default function ProcessMobile({
  items,
  progress,
}: {
  items: ProcessItem[];
  progress: number;
}) {
  const activeDots = Math.min(items.length, Math.floor(progress * 10));

  return (
    <div className="relative block md:hidden">
      <div className="flex flex-col items-center gap-8">
        {items.map((item, i) => {
          const isActive = activeDots >= item.step;
          return (
            <div key={item.step} className="w-full flex flex-col items-center">
              <div
                className={`process-card w-full min-h-[200px] flex flex-col items-center justify-center text-center p-8 ${
                  isActive ? "active-card" : ""
                }`}
                style={{ transitionDelay: `${(item.step - 1) * 150}ms` }}
              >
                <span className="step-badge">{item.step}</span>
                <h3 className="mt-5 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {item.desc}
                </p>
              </div>

              {/* Connector between cards */}
              {i < items.length - 1 && (
                <div className="relative mt-8 flex w-full items-center justify-center">
                  <div className="h-px w-1/2 bg-gradient-to-r from-transparent to-[#0066FF]/30" />
                  <div
                    className={`mx-2 h-2 w-2 rounded-full transition-all duration-500 ${
                      activeDots > item.step
                        ? "bg-[#0066FF] shadow-[0_0_8px_rgba(0,102,255,0.4)]"
                        : "bg-[#3A3A3D]"
                    }`}
                  />
                  <div className="h-px w-1/2 bg-gradient-to-l from-transparent to-[#0066FF]/30" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
