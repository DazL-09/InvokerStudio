"use client";

import { useBackgroundPause } from "@/lib/useBackgroundPause";

export default function AnimatedBackground() {
  useBackgroundPause();

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
