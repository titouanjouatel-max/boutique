"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ deadlineIso }: { deadlineIso: string }) {
  const target = new Date(deadlineIso).getTime();
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(target));
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target]);

  const units = [
    { label: "Jours", value: timeLeft?.days },
    { label: "Heures", value: timeLeft?.hours },
    { label: "Min", value: timeLeft?.minutes },
    { label: "Sec", value: timeLeft?.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex w-16 flex-col items-center rounded-xl border border-white/15 bg-white/5 py-3 sm:w-20"
        >
          <span className="font-display text-2xl font-semibold text-paper sm:text-3xl tabular-nums">
            {unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-paper/60">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
