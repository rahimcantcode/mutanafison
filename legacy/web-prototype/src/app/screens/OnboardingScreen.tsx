import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Info } from "lucide-react";

// Crescent + Progress Circle Logo
function AppLogo({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Progress circle */}
      <circle cx="36" cy="36" r="32" stroke="#D4AF37" strokeWidth="3" strokeOpacity="0.25" fill="none"/>
      <circle
        cx="36" cy="36" r="32"
        stroke="#D4AF37" strokeWidth="3"
        strokeDasharray="201"
        strokeDashoffset="50"
        strokeLinecap="round"
        fill="none"
        transform="rotate(-90 36 36)"
      />
      {/* Crescent moon */}
      <path
        d="M44 24C38 24 33 29 33 36C33 43 38 48 44 48C41 48 36.5 46 34 42.5C31.5 39 31 34.5 33 30C34.5 26.5 38.5 24 44 24Z"
        fill="#0E7C61"
      />
      <path
        d="M36 18C29 18 23 24 23 36C23 48 29 54 36 54C30 52 26 44 26 36C26 28 30 20 36 18Z"
        fill="#D4AF37"
        opacity="0.6"
      />
    </svg>
  );
}

// Friendly avatar illustration
function AvatarPair() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 200 }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(14,124,97,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Path between avatars */}
      <svg className="absolute" width="320" height="120" viewBox="0 0 320 120" fill="none">
        <path
          d="M60 80 Q160 20 260 80"
          stroke="#0E7C61"
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeOpacity="0.4"
        />
        {/* Stars/sparks along path */}
        {[0.25, 0.5, 0.75].map((t, i) => {
          const x = 60 + t * 200;
          const y = 80 - Math.sin(t * Math.PI) * 60;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#D4AF37" opacity="0.7"/>
              <circle cx={x} cy={y} r="8" fill="#D4AF37" opacity="0.2"/>
            </g>
          );
        })}
      </svg>

      {/* Avatar 1 - Rahim */}
      <div className="absolute" style={{ left: 30, top: 30 }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="flex flex-col items-center gap-2"
          >
            <div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: 72, height: 72,
                background: "linear-gradient(135deg, #0E7C61, #1a9e7d)",
                border: "3px solid white",
              }}
            >
              <span style={{ fontSize: 32 }}>👨‍💼</span>
            </div>
            <div
              className="rounded-full px-3 py-1 shadow-sm"
              style={{ background: "white" }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0E7C61" }}>Rahim 🔥</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Avatar 2 - Ahmed */}
      <div className="absolute" style={{ right: 30, top: 30 }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: 72, height: 72,
                background: "linear-gradient(135deg, #D4AF37, #f0ca5e)",
                border: "3px solid white",
              }}
            >
              <span style={{ fontSize: 32 }}>👨‍🎓</span>
            </div>
            <div
              className="rounded-full px-3 py-1 shadow-sm"
              style={{ background: "white" }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: "#D4AF37" }}>Ahmed 🔥</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center medal */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center rounded-full shadow-xl z-10"
        style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg, #D4AF37, #f5d06e)",
          border: "3px solid white",
        }}
      >
        <span style={{ fontSize: 28 }}>🏆</span>
      </motion.div>
    </div>
  );
}

export function OnboardingScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ background: "#F7F8F7" }}
    >
      {/* Top gradient header */}
      <div
        className="flex flex-col items-center pt-8 pb-6 px-6"
        style={{
          background: "linear-gradient(180deg, rgba(14,124,97,0.08) 0%, transparent 100%)",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <AppLogo size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-3"
        >
          <span
            className="tracking-widest uppercase"
            style={{ fontSize: 11, color: "#0E7C61", fontWeight: 700, letterSpacing: 3 }}
          >
            MUTANAFISON
          </span>
        </motion.div>
      </div>

      {/* Avatar illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mx-4"
      >
        <AvatarPair />
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-8 text-center mt-2"
      >
        <h1
          className="mb-3"
          style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}
        >
          Compete in{" "}
          <span style={{ color: "#0E7C61" }}>Good Deeds</span>
        </h1>
        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
          Stay consistent in prayer and Quran by competing with your friends — in the most beautiful way.
        </p>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex justify-center gap-2 mt-5 px-6 flex-wrap"
      >
        {["🕌 5 Daily Prayers", "📖 Quran Tracking", "🔥 Streaks", "👥 Friends"].map((f) => (
          <div
            key={f}
            className="rounded-full px-3 py-1.5"
            style={{ background: "white", border: "1px solid #e2e8f0", fontSize: 12, color: "#475569" }}
          >
            {f}
          </div>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="px-6 mt-auto pb-8 flex flex-col gap-3 pt-6"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/auth")}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #0E7C61, #0a5c47)",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Start Competing
          <ChevronRight size={18} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4"
          style={{
            background: "white",
            border: "1.5px solid #e2e8f0",
            color: "#475569",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <Info size={16} />
          Learn More
        </motion.button>

        <p className="text-center mt-1" style={{ fontSize: 11, color: "#94a3b8" }}>
          مُتَنَافِسُون — "Those who compete in good deeds"
        </p>
      </motion.div>
    </div>
  );
}
