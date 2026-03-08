import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Link2, AtSign, QrCode, ChevronRight, Copy, Check } from "lucide-react";

export function AddFriendScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"link" | "username" | "qr">("link");
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  const inviteLink = "mutanafison.app/join/rahim-xyz";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#F7F8F7" }}>
      {/* Header */}
      <div className="px-6 pt-4 pb-5" style={{ background: "white", borderBottom: "1px solid #f1f5f9" }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-4 rounded-full p-2 -ml-2"
          style={{ color: "#0E7C61" }}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Add a Friend</h2>
        <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>
          "Good deeds are better together."
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mx-6 mt-5">
        <div
          className="flex rounded-2xl p-1 gap-1"
          style={{ background: "white", border: "1px solid #e2e8f0" }}
        >
          {([
            { key: "link", icon: Link2, label: "Invite Link" },
            { key: "username", icon: AtSign, label: "Username" },
            { key: "qr", icon: QrCode, label: "QR Code" },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all"
              style={{
                background: activeTab === key ? "#0E7C61" : "transparent",
                color: activeTab === key ? "white" : "#94a3b8",
                fontSize: 12,
                fontWeight: activeTab === key ? 600 : 400,
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-6 mt-5"
      >
        {activeTab === "link" && (
          <div
            className="rounded-3xl p-5"
            style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className="flex items-center justify-center rounded-3xl"
                style={{ width: 80, height: 80, background: "linear-gradient(135deg, rgba(14,124,97,0.1), rgba(14,124,97,0.05))" }}
              >
                <Link2 size={36} color="#0E7C61" />
              </div>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 4, textAlign: "center" }}>
              Share your invite link
            </h3>
            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
              Anyone with this link can join your competition
            </p>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}
            >
              <span style={{ flex: 1, fontSize: 13, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {inviteLink}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="flex items-center justify-center rounded-xl px-3 py-2"
                style={{ background: "#0E7C61", color: "white", minWidth: 70, fontSize: 12, fontWeight: 600 }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full mt-4 rounded-2xl py-4 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #0E7C61, #0a5c47)", color: "white", fontSize: 15, fontWeight: 600 }}
            >
              Share via Messages
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}

        {activeTab === "username" && (
          <div
            className="rounded-3xl p-5"
            style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className="flex items-center justify-center rounded-3xl"
                style={{ width: 80, height: 80, background: "linear-gradient(135deg, rgba(14,124,97,0.1), rgba(14,124,97,0.05))" }}
              >
                <AtSign size={36} color="#0E7C61" />
              </div>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 4, textAlign: "center" }}>
              Search by username
            </h3>
            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
              Enter your friend's Mutanafison username
            </p>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-4"
              style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}
            >
              <AtSign size={18} color="#94a3b8" />
              <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                style={{ fontSize: 15, color: "#0f172a" }}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full mt-4 rounded-2xl py-4"
              style={{
                background: username ? "linear-gradient(135deg, #0E7C61, #0a5c47)" : "#e2e8f0",
                color: username ? "white" : "#94a3b8",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Send Request
            </motion.button>
          </div>
        )}

        {activeTab === "qr" && (
          <div
            className="rounded-3xl p-5"
            style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 4, textAlign: "center" }}>
              Your QR Code
            </h3>
            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
              Let your friend scan this code
            </p>
            <div className="flex justify-center mb-4">
              <div
                className="rounded-3xl p-5 flex items-center justify-center"
                style={{ background: "#f8fafc", border: "2px solid #e2e8f0", width: 200, height: 200 }}
              >
                {/* QR code grid simulation */}
                <svg width="150" height="150" viewBox="0 0 150 150">
                  {/* QR pattern */}
                  <rect width="150" height="150" fill="white"/>
                  {/* Corner squares */}
                  <rect x="5" y="5" width="45" height="45" rx="6" fill="#0E7C61"/>
                  <rect x="10" y="10" width="35" height="35" rx="4" fill="white"/>
                  <rect x="17" y="17" width="21" height="21" rx="2" fill="#0E7C61"/>
                  <rect x="100" y="5" width="45" height="45" rx="6" fill="#0E7C61"/>
                  <rect x="105" y="10" width="35" height="35" rx="4" fill="white"/>
                  <rect x="112" y="17" width="21" height="21" rx="2" fill="#0E7C61"/>
                  <rect x="5" y="100" width="45" height="45" rx="6" fill="#0E7C61"/>
                  <rect x="10" y="105" width="35" height="35" rx="4" fill="white"/>
                  <rect x="17" y="112" width="21" height="21" rx="2" fill="#0E7C61"/>
                  {/* Data modules */}
                  {[60, 68, 76, 84, 92].map((x) =>
                    [5, 13, 21, 29, 37, 60, 68, 76, 100, 108, 116, 124, 132, 140].map((y) =>
                      Math.random() > 0.5 ? (
                        <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="#0E7C61"/>
                      ) : null
                    )
                  )}
                  {/* Center logo */}
                  <rect x="60" y="60" width="30" height="30" rx="6" fill="#0E7C61"/>
                  <text x="75" y="78" textAnchor="middle" fontSize="14" fill="white">☪</text>
                </svg>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 16 }}>
              @rahim.mutanafison
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-2xl py-4"
              style={{ background: "linear-gradient(135deg, #0E7C61, #0a5c47)", color: "white", fontSize: 15, fontWeight: 600 }}
            >
              Save QR Code
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Skip to dashboard */}
      <div className="px-6 mt-auto pb-8 pt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-2"
          style={{ background: "white", border: "1.5px solid #e2e8f0", color: "#64748b", fontSize: 15 }}
        >
          Skip for now
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
