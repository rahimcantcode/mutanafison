import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_DATA = [true, true, true, true, true, true, false]; // Last 7 days (today = false = pending)
const MONTH_DATA = Array.from({ length: 30 }, (_, i) => i < 24); // 24 days completed

function FlameIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4C20 4 14 12 14 20C14 24 16 27 20 28C18 25 18 22 20 20C22 22 22 25 20 28C24 27 26 24 26 20C26 12 20 4 20 4Z"
        fill="url(#flame1)"
      />
      <path
        d="M20 20C20 20 17 24 17 28C17 31.3 18.3 33 20 34C21.7 33 23 31.3 23 28C23 24 20 20 20 20Z"
        fill="url(#flame2)"
      />
      <defs>
        <linearGradient id="flame1" x1="20" y1="4" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <linearGradient id="flame2" x1="20" y1="20" x2="20" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ef4444"/>
          <stop offset="100%" stopColor="#f97316"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function WeekTimeline() {
  const today = 5; // Saturday index

  return (
    <div className="flex items-end gap-2">
      {DAYS.map((day, i) => {
        const done = WEEK_DATA[i];
        const isToday = i === today;
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "backOut" }}
              style={{ originY: 1 }}
            >
              <div
                className="w-full rounded-full"
                style={{
                  height: done ? 48 : 20,
                  background: done
                    ? "linear-gradient(180deg, #22C55E, #16a34a)"
                    : isToday
                    ? "linear-gradient(180deg, #D4AF37, #c9a730)"
                    : "#e2e8f0",
                  transition: "all 0.3s",
                }}
              />
            </motion.div>
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 28, height: 28,
                background: done ? "#22C55E" : isToday ? "#D4AF37" : "#f1f5f9",
              }}
            >
              {done ? (
                <CheckCircle2 size={14} color="white" strokeWidth={2.5} />
              ) : (
                <Circle size={14} color={isToday ? "white" : "#94a3b8"} strokeWidth={2} />
              )}
            </div>
            <span style={{ fontSize: 10, color: isToday ? "#D4AF37" : "#94a3b8", fontWeight: isToday ? 700 : 400 }}>
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MonthCalendar() {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
      {MONTH_DATA.map((done, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.02, duration: 0.3 }}
          className="rounded-xl flex items-center justify-center"
          style={{
            aspectRatio: "1",
            background: done
              ? "linear-gradient(135deg, #0E7C61, #22C55E)"
              : i === 23
              ? "rgba(212,175,55,0.2)"
              : "rgba(203,213,225,0.3)",
            border: i === 23 ? "2px solid #D4AF37" : "none",
          }}
        >
          {done && <span style={{ fontSize: 10 }}>✓</span>}
          {!done && i === 23 && <span style={{ fontSize: 10 }}>•</span>}
        </motion.div>
      ))}
    </div>
  );
}

function ComparisonStreakBar({ name, streak, total, color }: {
  name: string; streak: number; total: number; color: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{ width: 40, height: 40, background: color, flexShrink: 0 }}
      >
        <span style={{ fontSize: 20 }}>{name === "Rahim" ? "👨‍💼" : "👨‍🎓"}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{name}</span>
          <div className="flex items-center gap-1">
            <span style={{ fontSize: 14 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>{streak}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>days</span>
          </div>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 10, background: "#f1f5f9" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(streak / total) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export function StreakScreen() {
  return (
    <div className="flex flex-col" style={{ background: "#F7F8F7", minHeight: "100%" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(249,115,22,0.06) 0%, transparent 100%)",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Streak</h1>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>Keep the fire going 🔥</p>
      </div>

      {/* Main streak card */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f97316, #D4AF37)",
            boxShadow: "0 8px 30px rgba(249,115,22,0.3)",
          }}
        >
          {/* Decorative */}
          <div
            className="absolute -top-10 -right-10 rounded-full opacity-15"
            style={{ width: 120, height: 120, background: "white" }}
          />
          <div
            className="absolute -bottom-6 -left-6 rounded-full opacity-10"
            style={{ width: 80, height: 80, background: "white" }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <FlameIcon size={64} />
            </motion.div>
            <div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                Current Streak
              </p>
              <p style={{ fontSize: 44, fontWeight: 800, color: "white", lineHeight: 1 }}>7</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                Day Prayer Streak
              </p>
            </div>
          </div>

          <div
            className="mt-4 pt-4 relative z-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div className="flex justify-between">
              {[
                { label: "Best Streak", value: "14 days" },
                { label: "This Month", value: "24/30" },
                { label: "Total", value: "89 days" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{value}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* This week */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
            This Week
          </p>
          <WeekTimeline />
        </div>
      </div>

      {/* Monthly calendar */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>March 2026</p>
            <div
              className="rounded-full px-3 py-1"
              style={{ background: "rgba(14,124,97,0.1)", fontSize: 12, color: "#0E7C61", fontWeight: 600 }}
            >
              24/30 days
            </div>
          </div>
          <MonthCalendar />
        </div>
      </div>

      {/* Friends comparison */}
      <div className="px-5 mb-6">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
            Streak Comparison
          </p>
          <div className="flex flex-col gap-4">
            <ComparisonStreakBar
              name="Rahim"
              streak={7}
              total={14}
              color="linear-gradient(135deg, #0E7C61, #22C55E)"
            />
            <ComparisonStreakBar
              name="Ahmed"
              streak={3}
              total={14}
              color="linear-gradient(135deg, #D4AF37, #f0ca5e)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
