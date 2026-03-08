import { motion } from "motion/react";
import { CheckCircle2, Clock } from "lucide-react";

const WIDGET_PRAYERS = [
  { name: "Fajr", rahim: true, ahmed: true },
  { name: "Dhuhr", rahim: true, ahmed: true },
  { name: "Asr", rahim: true, ahmed: false },
  { name: "Maghrib", rahim: false, ahmed: false },
  { name: "Isha", rahim: false, ahmed: false },
];

function MediumWidget() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="rounded-3xl p-4 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #0a2a1e 0%, #0E7C61 60%, #0a5c47 100%)",
        width: "100%",
        boxShadow: "0 12px 40px rgba(14,124,97,0.4)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Decorative stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            background: "white",
            left: `${5 + (i * 53) % 85}%`,
            top: `${5 + (i * 27) % 55}%`,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 28, height: 28, background: "rgba(212,175,55,0.3)" }}
          >
            <span style={{ fontSize: 14 }}>☪️</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "white", letterSpacing: 0.5 }}>
            Mutanafison
          </span>
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Today</span>
      </div>

      {/* Streak row */}
      <div className="flex gap-2 mb-3 relative z-10">
        <div
          className="flex-1 flex items-center gap-1.5 rounded-2xl px-3 py-2"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <span style={{ fontSize: 16 }}>👨‍💼</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Rahim</span>
          <span style={{ fontSize: 13 }}>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f97316" }}>7</span>
        </div>
        <div
          className="flex-1 flex items-center gap-1.5 rounded-2xl px-3 py-2"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <span style={{ fontSize: 16 }}>👨‍🎓</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Ahmed</span>
          <span style={{ fontSize: 13 }}>🔥</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f97316" }}>5</span>
        </div>
      </div>

      {/* Prayer grid */}
      <div className="relative z-10">
        <div className="flex mb-1.5">
          <div className="flex-1" />
          <div className="w-8 text-center">
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>R</span>
          </div>
          <div className="w-8 text-center">
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>A</span>
          </div>
        </div>

        {WIDGET_PRAYERS.map(({ name, rahim, ahmed }) => (
          <div key={name} className="flex items-center mb-1.5">
            <div className="flex-1">
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                {name}
              </span>
            </div>
            <div className="w-8 flex justify-center">
              {rahim ? (
                <CheckCircle2 size={16} color="#22C55E" strokeWidth={2.5} />
              ) : (
                <Clock size={14} color="rgba(255,255,255,0.3)" />
              )}
            </div>
            <div className="w-8 flex justify-center">
              {ahmed ? (
                <CheckCircle2 size={16} color="#D4AF37" strokeWidth={2.5} />
              ) : (
                <Clock size={14} color="rgba(255,255,255,0.3)" />
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SmallWidget() {
  const myCount = WIDGET_PRAYERS.filter((p) => p.rahim).length;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
      className="rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #D4AF37, #c9a730)",
        aspectRatio: "1",
        boxShadow: "0 8px 24px rgba(212,175,55,0.4)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: 16 }}>☪️</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>Today</span>
      </div>
      <div className="text-center">
        <p style={{ fontSize: 36, fontWeight: 800, color: "white", lineHeight: 1 }}>{myCount}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>of 5 prayers</p>
        {/* Progress circles */}
        <div className="flex justify-center gap-1 mt-2">
          {WIDGET_PRAYERS.map(({ name, rahim }) => (
            <div
              key={name}
              className="rounded-full"
              style={{
                width: 8, height: 8,
                background: rahim ? "white" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span style={{ fontSize: 14 }}>🔥</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>7 day streak</span>
      </div>
    </motion.div>
  );
}

function LockScreenWidget() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
      className="rounded-2xl px-4 py-3 flex items-center gap-3 relative overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl"
        style={{ width: 36, height: 36, background: "rgba(14,124,97,0.6)", flexShrink: 0 }}
      >
        <span style={{ fontSize: 18 }}>☪️</span>
      </div>
      <div className="flex-1">
        <p style={{ fontSize: 12, fontWeight: 600, color: "white" }}>Mutanafison · 3/5 Prayers</p>
        <div className="flex gap-1 mt-1.5">
          {WIDGET_PRAYERS.map(({ name, rahim }) => (
            <div
              key={name}
              className="flex-1 rounded-full"
              style={{ height: 4, background: rahim ? "#22C55E" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <span style={{ fontSize: 14 }}>🔥</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#f97316" }}>7</span>
      </div>
    </motion.div>
  );
}

export function WidgetScreen() {
  return (
    <div className="flex flex-col" style={{ background: "#F7F8F7", minHeight: "100%" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-5">
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Widgets</h1>
        <p style={{ fontSize: 13, color: "#94a3b8" }}>Add to your iPhone home screen</p>
      </div>

      {/* Phone mockup bg */}
      <div className="px-5 mb-5">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
            minHeight: 200,
          }}
        >
          {/* Fake wallpaper elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-16 h-16 rounded-full" style={{ background: "rgba(14,124,97,0.6)" }} />
            <div className="absolute bottom-4 right-8 w-20 h-20 rounded-full" style={{ background: "rgba(212,175,55,0.4)" }} />
          </div>

          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
            HOME SCREEN PREVIEW
          </p>

          <LockScreenWidget />

          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <MediumWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Widget options */}
      <div className="px-5 mb-4">
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
          Available Widgets
        </h2>

        {/* Medium widget preview */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Prayer Tracker</p>
              <p style={{ fontSize: 12, color: "#94a3b8" }}>Medium · 2×1</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl px-4 py-2"
              style={{ background: "#0E7C61", color: "white", fontSize: 13, fontWeight: 600 }}
            >
              Add
            </motion.button>
          </div>
          <MediumWidget />
        </div>

        {/* Small widget */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Streak Counter</p>
              <p style={{ fontSize: 12, color: "#94a3b8" }}>Small · 1×1</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl px-4 py-2"
              style={{ background: "#0E7C61", color: "white", fontSize: 13, fontWeight: 600 }}
            >
              Add
            </motion.button>
          </div>
          <div style={{ maxWidth: 140 }}>
            <SmallWidget />
          </div>
        </div>
      </div>

      {/* How to add */}
      <div className="px-5 mb-6">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
            How to Add Widgets
          </h3>
          {[
            { step: "1", text: "Long press your iPhone home screen" },
            { step: "2", text: "Tap the + button in the top left" },
            { step: "3", text: "Search for Mutanafison" },
            { step: "4", text: "Choose widget size and tap Add" },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-center gap-3 mb-3 last:mb-0">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 28, height: 28, background: "rgba(14,124,97,0.1)" }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0E7C61" }}>{step}</span>
              </div>
              <span style={{ fontSize: 13, color: "#64748b" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
