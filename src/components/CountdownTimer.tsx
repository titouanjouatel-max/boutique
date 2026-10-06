"use client";

import { AnimatePresence, motion } from "framer-motion";
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

// Chiffre qui « tombe » à chaque changement de valeur.
function RollingDigit({ digit }: { digit: string }) {
  return (
    <span className="relative inline-flex h-[1em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
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
    <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
      {units.map((unit) => {
        const text = unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--";
        return (
          <div
            key={unit.label}
            className="flex flex-col items-center rounded-[10px] bg-paper px-1 py-4 sm:py-5"
          >
            <span className="display flex text-[clamp(2.2rem,5vw,3.6rem)] leading-none text-forest tabular-nums">
              {text.split("").map((digit, i) => (
                <RollingDigit key={i} digit={digit} />
              ))}
            </span>
            <span className="mt-2 text-xs font-medium uppercase tracking-wide text-slate">
              {unit.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
