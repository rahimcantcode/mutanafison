import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Settings, CheckCircle2, Clock, Trophy } from "lucide-react";
import { ReminderPopup } from "../components/ReminderPopup";

const PRAYERS = [
  { id: "fajr", name: "Fajr", arabic: "الفجر", time: "5:15 AM" },
  { id: "dhuhr", name: "Dhuhr", arabic: "الظهر", time: "12:30 PM" },
  { id: "asr", name: "Asr", arabic: "العصر", time: "3:45 PM" },
  { id: "maghrib", name: "Maghrib", arabic: "المغرب", time: "6:15 PM" },
  { id: "isha", name: "Isha", arabic: "العشاء", time: "8:00 PM" },
];

interface PrayerState {
  mine: boolean;
  friend: boolean;
}

function PrayerCard({
  prayer,
  state,
  onToggle,
  onRemind,
}: {
  prayer: (typeof PRAYERS)[0];
  state: PrayerState;
  onToggle: () => void;
  onRemind: () => void;
}) {
  const [justCompleted, setJustCompleted] = useState(false);

  const handleTap = () => {
    if (!state.mine) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    onToggle();
  };

  return (
    <motion.div
      layout
      className="rounded-3xl px-4 py-4 flex items-center gap-3"
      style={{
        background: "white",
        border: state.mine && state.friend ? "1.5px solid rgba(34,197,94,0.2)" : "1.5px solid #f1f5f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Prayer tap button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleTap}
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: 52, height: 52, minWidth: 52,
          background: state.mine
            ? "linear-gradient(135deg, #22C55E, #16a34a)"
            : "linear-gradient(135deg, #f8fafc, #f1f5f9)",
          border: state.mine ? "none" : "2px dashed #cbd5e1",
          transition: "all 0.3s",
        }}
      >
        <AnimatePresence>
          {justCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: "rgba(34,197,94,0.3)" }}
            />
          )}
        </AnimatePresence>
        {state.mine ? (
          <motion.div
            initial={justCompleted ? { scale: 0, rotate: -20 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <CheckCircle2 size={24} color="white" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <span style={{ fontSize: 20 }}>🕌</span>
        )}
      </motion.button>

      {/* Prayer info */}
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{prayer.name}</span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>{prayer.arabic}</span>
        </div>
        <span style={{ fontSize: 11, color: "#cbd5e1" }}>{prayer.time}</span>
        <div className="flex items-center gap-2 mt-1.5">
          <StatusBadge done={state.mine} label="You" />
          <StatusBadge done={state.friend} label="Ahmed" isSmall />
        </div>
      </div>

      {/* Remind friend if not prayed */}
      {!state.friend && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onRemind}
          className="rounded-2xl px-3 py-2"
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.3)",
            fontSize: 11,
            color: "#D4AF37",
            fontWeight: 600,
          }}
        >
          Remind
        </motion.button>
      )}

      {/* Both done indicator */}
      {state.mine && state.friend && (
        <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: "rgba(34,197,94,0.08)" }}>
          <span style={{ fontSize: 16 }}>✨</span>
        </div>
      )}
    </motion.div>
  );
}

function StatusBadge({ done, label, isSmall }: { done: boolean; label: string; isSmall?: boolean }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full px-2 py-0.5"
      style={{
        background: done ? "rgba(34,197,94,0.1)" : "rgba(203,213,225,0.3)",
        fontSize: isSmall ? 10 : 11,
      }}
    >
      {done ? (
        <CheckCircle2 size={10} color="#22C55E" strokeWidth={2.5} />
      ) : (
        <Clock size={10} color="#94a3b8" />
      )}
      <span style={{ color: done ? "#16a34a" : "#94a3b8", fontWeight: 500 }}>
        {label}: {done ? "✓" : "⏳"}
      </span>
    </div>
  );
}

function DailyWinnerCard({ prayerStates }: { prayerStates: PrayerState[] }) {
  const myCount = prayerStates.filter((p) => p.mine).length;
  const friendCount = prayerStates.filter((p) => p.friend).length;
  const allDone = myCount === 5;

  return (
    <motion.div
      layout
      className="mx-0 rounded-3xl p-4 overflow-hidden relative"
      style={{
        background: allDone
          ? "linear-gradient(135deg, #D4AF37, #f0ca5e)"
          : "linear-gradient(135deg, #0E7C61, #0a5c47)",
        boxShadow: allDone ? "0 8px 30px rgba(212,175,55,0.35)" : "0 8px 30px rgba(14,124,97,0.25)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 rounded-full opacity-10"
        style={{ width: 100, height: 100, background: "white" }}
      />
      <div
        className="absolute -bottom-4 -left-4 rounded-full opacity-10"
        style={{ width: 70, height: 70, background: "white" }}
      />

      <div className="flex items-center gap-3 relative z-10">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)" }}
        >
          {allDone ? <Trophy size={24} color="white" /> : <span style={{ fontSize: 24 }}>📊</span>}
        </div>
        <div className="flex-1">
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: 2 }}>
            Today's Completion
          </p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3 }}>
            {allDone
              ? "Rahim completed all 5 prayers today 🏆"
              : `Rahim ${myCount}/5 · Ahmed ${friendCount}/5`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 relative z-10">
        <div className="flex justify-between mb-1.5">
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Rahim</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Ahmed</span>
        </div>
        <div className="flex gap-1.5">
          {PRAYERS.map((p, i) => (
            <div
              key={p.id}
              className="flex-1 rounded-full"
              style={{
                height: 5,
                background: prayerStates[i]?.mine ? "white" : "rgba(255,255,255,0.25)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <div className="flex gap-1.5 mt-1">
          {PRAYERS.map((p, i) => (
            <div
              key={p.id}
              className="flex-1 rounded-full"
              style={{
                height: 5,
                background: prayerStates[i]?.friend ? "rgba(212,175,55,0.8)" : "rgba(255,255,255,0.15)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardScreen() {
  const [prayerStates, setPrayerStates] = useState<PrayerState[]>([
    { mine: true, friend: true },
    { mine: true, friend: true },
    { mine: true, friend: false },
    { mine: false, friend: false },
    { mine: false, friend: false },
  ]);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderPrayer, setReminderPrayer] = useState("");

  const togglePrayer = (index: number) => {
    setPrayerStates((prev) =>
      prev.map((s, i) => (i === index ? { ...s, mine: !s.mine } : s))
    );
  };

  const handleRemind = (prayerName: string) => {
    setReminderPrayer(prayerName);
    setShowReminder(true);
  };

  const myStreak = 6;
  const friendStreak = 3;

  return (
    <div className="flex flex-col" style={{ background: "#F7F8F7", minHeight: "100%" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(14,124,97,0.06) 0%, transparent 100%)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Assalamu Alaykum 👋</h1>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>Sunday, March 8</p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center justify-center rounded-2xl"
              style={{ width: 40, height: 40, background: "white", border: "1px solid #f1f5f9" }}
            >
              <Bell size={18} color="#0E7C61" />
            </button>
            <button
              className="flex items-center justify-center rounded-2xl"
              style={{ width: 40, height: 40, background: "white", border: "1px solid #f1f5f9" }}
            >
              <Settings size={18} color="#94a3b8" />
            </button>
          </div>
        </div>

        {/* Avatars comparison card */}
        <div
          className="rounded-3xl p-4 flex items-center gap-3"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {/* My avatar */}
          <div className="flex-1 flex items-center gap-2.5">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: 48, height: 48, background: "linear-gradient(135deg, #0E7C61, #1a9e7d)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 24 }}>👨‍💼</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Rahim</p>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: 14 }}>🔥</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>{myStreak}</span>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>day streak</span>
              </div>
            </div>
          </div>

          {/* VS */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 36, height: 36, background: "linear-gradient(135deg, #0E7C61, #D4AF37)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>VS</span>
          </div>

          {/* Friend avatar */}
          <div className="flex-1 flex items-center gap-2.5 justify-end">
            <div className="text-right">
              <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Ahmed</p>
              <div className="flex items-center gap-1 justify-end">
                <span style={{ fontSize: 14 }}>🔥</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>{friendStreak}</span>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>day streak</span>
              </div>
            </div>
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: 48, height: 48, background: "linear-gradient(135deg, #D4AF37, #f0ca5e)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 24 }}>👨‍🎓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Winner Card */}
      <div className="px-5 mb-4">
        <DailyWinnerCard prayerStates={prayerStates} />
      </div>

      {/* Prayer Tracker */}
      <div className="px-5 flex flex-col gap-3 pb-6">
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: -4 }}>
          Today's Prayers
        </h2>
        {PRAYERS.map((prayer, index) => (
          <PrayerCard
            key={prayer.id}
            prayer={prayer}
            state={prayerStates[index]}
            onToggle={() => togglePrayer(index)}
            onRemind={() => handleRemind(prayer.name)}
          />
        ))}
      </div>

      {/* Reminder Popup */}
      <AnimatePresence>
        {showReminder && (
          <ReminderPopup
            prayerName={reminderPrayer}
            friendName="Ahmed"
            onSend={() => setShowReminder(false)}
            onIgnore={() => setShowReminder(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
