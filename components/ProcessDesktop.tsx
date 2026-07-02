"use client";

interface ProcessItem {
  step: number;
  title: string;
  desc: string;
}

export default function ProcessDesktop({
  items,
  progress,
}: {
  items: ProcessItem[];
  progress: number;
}) {
  const activeDots = Math.min(items.length, Math.floor(progress * 10));

  return (
    <div className="relative hidden md:block">
      {/* Cards row */}
      <div className="flex justify-between gap-6 items-stretch">
        {items.map((item) => {
          const isActive = activeDots >= item.step;
          return (
            <div key={item.step} className="flex flex-1 flex-col items-center">
              <ProcessCard item={item} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="relative mt-8">
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-[#0066FF]/20 via-[#0066FF]/40 to-[#0066FF]/20" />
        <div className="relative flex justify-between gap-6">
          {items.map((item) => {
            const isActive = activeDots >= item.step;
            return (
              <div key={item.step} className="flex flex-1 justify-center">
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-[#0066FF] shadow-[0_0_12px_rgba(0,102,255,0.6)] scale-125"
                      : "bg-[#3A3A3D]"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProcessCard({
  item,
  isActive,
}: {
  item: ProcessItem;
  isActive: boolean;
}) {
  return (
    <div
      className={`process-card w-full min-h-[280px] h-full flex flex-col items-center justify-center text-center p-8 ${
        isActive ? "active-card" : ""
      }`}
    >
      <span className="step-badge">{item.step}</span>
      <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-2 max-w-[25ch] text-sm leading-relaxed text-gray-400">
        {item.desc}
      </p>
    </div>
  );
}
