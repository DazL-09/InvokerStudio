"use client";

import { useEffect } from "react";

export function useBackgroundPause() {
  useEffect(() => {
    const bg = document.querySelector<HTMLElement>(".gradient-bg");
    if (!bg) return;

    const handleVisibility = () => {
      bg.classList.toggle("paused", document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
}
