import { useState } from "react";
import { motion } from "motion/react";
import { Settings, ChevronRight, Heart, Star, BookOpen, Moon, Bell, Shield, LogOut } from "lucide-react";

function StatCard({ emoji, value, label, color }: {
  emoji: string; value: string; label: string; color: string;
}) {
  return (
    <div
      className="flex-1 rounded-3xl p-4 flex flex-col items-center gap-1"
      style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div
        className="flex items-center justify-center rounded-2xl mb-1"
        style={{ width: 40, height: 40, background: `${color}18` }}
      >
        <span style={{ fontSize: 20 }}>{emoji}</span>
      </div>
      <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{value}</span>
      <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

function SettingsRow({ icon: Icon, label, value, color = "#94a3b8", danger = false }: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value?: string;
  color?: string;
  danger?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-3 py-3.5 px-1"
      style={{ borderBottom: "1px solid #f8fafc" }}
    >
      <div
        className="flex items-center justify-center rounded-xl"
        style={{ width: 36, height: 36, background: danger ? "rgba(239,68,68,0.1)" : "rgba(14,124,97,0.08)", flexShrink: 0 }}
      >
        <Icon size={16} color={danger ? "#ef4444" : color} />
      </div>
      <span style={{ flex: 1, fontSize: 14, color: danger ? "#ef4444" : "#0f172a", textAlign: "left" }}>
        {label}
      </span>
      {value && <span style={{ fontSize: 13, color: "#94a3b8" }}>{value}</span>}
      <ChevronRight size={16} color="#cbd5e1" />
    </motion.button>
  );
}

export function ProfileScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);

  const achievements = [
    { emoji: "🏆", label: "First Week", earned: true },
    { emoji: "🔥", label: "7-Day Streak", earned: true },
    { emoji: "📖", label: "Quran Reader", earned: true },
    { emoji: "⭐", label: "10-Day Streak", earned: false },
    { emoji: "🌙", label: "Ramadan Mode", earned: false },
    { emoji: "👑", label: "30-Day Streak", earned: false },
  ];

  return (
    <div className="flex flex-col" style={{ background: "#F7F8F7", minHeight: "100%" }}>
      {/* Profile header */}
      <div
        className="relative overflow-hidden pb-6"
        style={{
          background: "linear-gradient(135deg, #0a2a1e, #0E7C61)",
        }}
      >
        {/* Decorative */}
        <div
          className="absolute -top-12 -right-12 rounded-full opacity-10"
          style={{ width: 150, height: 150, background: "#D4AF37" }}
        />

        <div className="flex justify-end px-5 pt-4 mb-4 relative z-10">
          <button
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.15)" }}
          >
            <Settings size={18} color="white" />
          </button>
        </div>

        <div className="flex flex-col items-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 90, height: 90,
                background: "linear-gradient(135deg, #D4AF37, #f0ca5e)",
                border: "4px solid rgba(255,255,255,0.3)",
              }}
            >
              <span style={{ fontSize: 44 }}>👨‍💼</span>
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full"
              style={{ width: 28, height: 28, background: "#0E7C61", border: "3px solid white" }}
            >
              <Star size={12} color="#D4AF37" fill="#D4AF37" />
            </div>
          </motion.div>

          <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", marginTop: 14, marginBottom: 2 }}>
            Rahim Al-Hassan
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>@rahim.mutanafison</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="text-center">
              <p style={{ fontSize: 20, fontWeight: 800, color: "white" }}>7</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Day Streak 🔥</p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="text-center">
              <p style={{ fontSize: 20, fontWeight: 800, color: "white" }}>89</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Total Days</p>
            </div>
            <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="text-center">
              <p style={{ fontSize: 20, fontWeight: 800, color: "white" }}>1</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Friend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mt-4 mb-4">
        <div className="flex gap-3">
          <StatCard emoji="🕌" value="128" label="Prayers This Month" color="#0E7C61" />
          <StatCard emoji="📖" value="22" label="Hizb Read" color="#D4AF37" />
          <StatCard emoji="🌙" value="16" label="Taraweeh Nights" color="#8b5cf6" />
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
            Achievements
          </h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {achievements.map(({ emoji, label, earned }) => (
              <motion.div
                key={label}
                whileTap={earned ? { scale: 1.1 } : {}}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="flex items-center justify-center rounded-2xl"
                  style={{
                    width: 52, height: 52,
                    background: earned
                      ? "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))"
                      : "#f8fafc",
                    border: earned ? "2px solid rgba(212,175,55,0.4)" : "2px solid #e2e8f0",
                    opacity: earned ? 1 : 0.4,
                    filter: earned ? "none" : "grayscale(1)",
                  }}
                >
                  <span style={{ fontSize: 26 }}>{emoji}</span>
                </div>
                <span style={{ fontSize: 10, color: earned ? "#475569" : "#94a3b8", textAlign: "center", lineHeight: 1.3 }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mb-4">
        <div
          className="rounded-3xl p-5"
          style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
            Settings
          </h3>
          <SettingsRow icon={Bell} label="Notifications" value={notificationsOn ? "On" : "Off"} color="#0E7C61" />
          <SettingsRow icon={Moon} label="Ramadan Mode" value="Active" color="#6366f1" />
          <SettingsRow icon={BookOpen} label="Daily Quran Goal" value="2 Hizb" color="#D4AF37" />
          <SettingsRow icon={Shield} label="Privacy" color="#64748b" />
          <SettingsRow icon={LogOut} label="Sign Out" danger />
        </div>
      </div>

      {/* Support the project */}
      <div className="px-5 mb-6">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))",
            border: "1.5px solid rgba(212,175,55,0.3)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: 52, height: 52, background: "rgba(212,175,55,0.15)" }}
          >
            <Heart size={24} color="#D4AF37" fill="rgba(212,175,55,0.3)" />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Support the Project</p>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2, lineHeight: 1.4 }}>
              Help us keep Mutanafison free and growing for all
            </p>
          </div>
          <ChevronRight size={18} color="#D4AF37" />
        </motion.div>
      </div>

      {/* Version */}
      <div className="flex justify-center pb-6">
        <p style={{ fontSize: 11, color: "#cbd5e1" }}>Mutanafison v1.0.0 · مُتَنَافِسُون</p>
      </div>
    </div>
  );
}
