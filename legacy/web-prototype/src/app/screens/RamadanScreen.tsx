import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Star } from "lucide-react";

function CrescentIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M20 6C15 6 11 10 11 16C11 22 15 26 20 26C17 26 13.5 24 11.5 21C9.5 18 9 14 11 10C12.5 7 16 6 20 6Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

function QuranProgressBar({
  name,
  current,
  total,
  color,
  emoji,
  delay = 0,
}: {
  name: string;
  current: number;
  total: number;
  color: string;
  emoji: string;
  delay?: number;
}) {
  const pct = (current / total) * 100;

  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: "white",
        border: "1px solid #f1f5f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 44, height: 44, background: color, flexShrink: 0 }}
        >
          <span style={{ fontSize: 22 }}>{emoji}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-baseline">
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0E7C61" }}>
              {current} / {total} Hizb
            </span>
          </div>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            {Math.round(pct)}% of Quran complete
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 12, background: "#f1f5f9" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay }}
            className="h-full rounded-full relative overflow-hidden"
            style={{ background: color }}
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 1.2 }}
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
            />
          </motion.div>
        </div>

        {/* Hizb markers */}
        <div className="flex justify-between mt-1.5">
          {[0, 15, 30, 45, 60].map((mark) => (
            <div key={mark} className="flex flex-col items-center">
              <div className="w-px h-2" style={{ background: "#e2e8f0" }} />
              <span style={{ fontSize: 9, color: "#cbd5e1" }}>{mark}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Juz breakdown */}
      <div className="mt-4 flex gap-1 flex-wrap">
        {Array.from({ length: 30 }, (_, i) => {
          const hizb = (i + 1) * 2;
          const done = hizb <= current;
          const partial = !done && hizb - 1 < current;
          return (
            <div
              key={i}
              className="rounded flex items-center justify-center"
              style={{
                width: 22, height: 22,
                background: done
                  ? color
                  : partial
                  ? `${color}66`
                  : "#f1f5f9",
                fontSize: 8,
                color: done || partial ? "white" : "#cbd5e1",
                fontWeight: 600,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RamadanScreen() {
  const [ramadanDay] = useState(18);

  return (
    <div className="flex flex-col" style={{ background: "#F7F8F7", minHeight: "100%" }}>
      {/* Header banner */}
      <div
        className="px-5 pt-4 pb-0 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a2a1e, #0E7C61 50%, #D4AF37)",
          minHeight: 160,
        }}
      >
        {/* Stars decoration */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            className="absolute"
            style={{
              left: `${10 + (i * 37) % 80}%`,
              top: `${5 + (i * 17) % 70}%`,
              width: i % 3 === 0 ? 4 : 3,
              height: i % 3 === 0 ? 4 : 3,
              borderRadius: "50%",
              background: "white",
            }}
          />
        ))}

        <div className="relative z-10 flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CrescentIcon size={24} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, fontWeight: 600 }}>
                RAMADAN MODE
              </span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
              رمضان مبارك
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              Day {ramadanDay} of 30
            </p>
          </div>

          {/* Crescent moon illustration */}
          <div className="relative">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="rgba(212,175,55,0.15)" />
              <circle cx="40" cy="40" r="26" fill="rgba(212,175,55,0.2)" />
              <path
                d="M50 18C38 18 28 28 28 40C28 52 38 62 50 62C44 60 38 52 38 40C38 28 44 20 50 18Z"
                fill="#D4AF37"
                opacity="0.9"
              />
              <circle cx="54" cy="25" r="2.5" fill="white" opacity="0.7"/>
              <circle cx="60" cy="35" r="1.5" fill="white" opacity="0.5"/>
              <circle cx="48" cy="18" r="1.5" fill="white" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Day progress */}
        <div className="relative z-10 pb-5">
          <div className="flex gap-1.5">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: 6,
                  background:
                    i < ramadanDay
                      ? "#D4AF37"
                      : i === ramadanDay
                      ? "rgba(212,175,55,0.4)"
                      : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
            {30 - ramadanDay} days remaining
          </p>
        </div>
      </div>

      {/* Motivational message */}
      <div className="px-5 mt-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl px-5 py-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))",
            border: "1.5px solid rgba(212,175,55,0.25)",
          }}
        >
          <BookOpen size={22} color="#D4AF37" />
          <p style={{ fontSize: 13, color: "#64748b", flex: 1, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 600, color: "#0f172a" }}>
              "Race toward completing the Quran this Ramadan."
            </span>
            {" "}Every page brings you closer to Allah.
          </p>
        </motion.div>
      </div>

      {/* Quran Progress */}
      <div className="px-5 flex flex-col gap-4 mb-4">
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
          📖 Quran Progress
        </h2>
        <QuranProgressBar
          name="Rahim"
          current={22}
          total={60}
          color="linear-gradient(135deg, #0E7C61, #22C55E)"
          emoji="👨‍💼"
          delay={0.2}
        />
        <QuranProgressBar
          name="Ahmed"
          current={15}
          total={60}
          color="linear-gradient(135deg, #D4AF37, #f0ca5e)"
          emoji="👨‍🎓"
          delay={0.5}
        />
      </div>

      {/* Today's target */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
              Daily Quran Target
            </h3>
            <div
              className="rounded-full px-3 py-1"
              style={{ background: "rgba(14,124,97,0.1)", fontSize: 12, color: "#0E7C61", fontWeight: 600 }}
            >
              2 Hizb/day
            </div>
          </div>

          {[
            { name: "Rahim", done: 1.5, target: 2, emoji: "👨‍💼" },
            { name: "Ahmed", done: 1, target: 2, emoji: "👨‍🎓" },
          ].map(({ name, done, target, emoji }) => (
            <div key={name} className="flex items-center gap-3 mb-3 last:mb-0">
              <span style={{ fontSize: 20 }}>{emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>{name}</span>
                  <span style={{ fontSize: 12, color: "#0E7C61", fontWeight: 600 }}>
                    {done}/{target} Hizb
                  </span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 8, background: "#f1f5f9" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(done / target) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{
                      background: done >= target
                        ? "linear-gradient(135deg, #22C55E, #16a34a)"
                        : "linear-gradient(135deg, #0E7C61, #0a5c47)",
                    }}
                  />
                </div>
              </div>
              {done >= target && <Star size={16} color="#D4AF37" fill="#D4AF37" />}
            </div>
          ))}
        </div>
      </div>

      {/* Taraweeh tracker */}
      <div className="px-5 mb-6">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
            🌙 Taraweeh Tracker
          </h3>
          <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {[
              { name: "Rahim", nights: 16, emoji: "👨‍💼", color: "#0E7C61" },
              { name: "Ahmed", nights: 12, emoji: "👨‍🎓", color: "#D4AF37" },
            ].map(({ name, nights, emoji, color }) => (
              <div
                key={name}
                className="rounded-2xl p-3 text-center"
                style={{ background: `${color}15` }}
              >
                <span style={{ fontSize: 24 }}>{emoji}</span>
                <p style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1.2 }}>{nights}</p>
                <p style={{ fontSize: 10, color: "#94a3b8" }}>{name} · nights</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
