import { motion } from "motion/react";
import { Bell, X } from "lucide-react";

interface ReminderPopupProps {
  prayerName: string;
  friendName: string;
  onSend: () => void;
  onIgnore: () => void;
}

export function ReminderPopup({ prayerName, friendName, onSend, onIgnore }: ReminderPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-end"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onIgnore}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl p-6"
        style={{ background: "white" }}
      >
        {/* Handle */}
        <div className="flex justify-center mb-5">
          <div className="w-10 h-1 rounded-full" style={{ background: "#e2e8f0" }} />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center justify-center rounded-3xl"
            style={{
              width: 72, height: 72,
              background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
              border: "2px solid rgba(212,175,55,0.3)",
            }}
          >
            <Bell size={32} color="#D4AF37" />
          </div>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", textAlign: "center", marginBottom: 8 }}>
          Send a Gentle Reminder
        </h3>
        <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 6, lineHeight: 1.5 }}>
          <span style={{ fontWeight: 600, color: "#0f172a" }}>{friendName}</span> hasn't prayed{" "}
          <span style={{ fontWeight: 600, color: "#0E7C61" }}>{prayerName}</span> yet.
        </p>
        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 24, lineHeight: 1.5 }}>
          A kind reminder can make all the difference. 💚
        </p>

        {/* Message preview */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p style={{ fontSize: 13, color: "#475569", fontStyle: "italic", lineHeight: 1.5 }}>
            "Hey {friendName}! 🌙 Time for {prayerName} prayer. Let's keep our streak going together. 🤲"
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onIgnore}
            className="flex-1 rounded-2xl py-4 flex items-center justify-center gap-2"
            style={{ background: "white", border: "1.5px solid #e2e8f0", color: "#94a3b8", fontSize: 15 }}
          >
            <X size={16} />
            Ignore
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onSend}
            className="flex-2 rounded-2xl py-4 flex items-center justify-center gap-2"
            style={{
              flex: 2,
              background: "linear-gradient(135deg, #0E7C61, #0a5c47)",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            <Bell size={16} />
            Send Reminder
          </motion.button>
        </div>

        <div className="flex justify-center mt-4 pb-2">
          <div className="w-32 h-1 rounded-full" style={{ background: "#1a1a1a", opacity: 0.15 }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
