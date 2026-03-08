import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Phone, Zap, Copy, Check } from "lucide-react";

const DEMO_CREDENTIALS = [
  { label: "Demo User", email: "demo@mutanafison.app", password: "Demo1234!" },
  { label: "Admin Tester", email: "admin@mutanafison.app", password: "Admin5678#" },
];

export function AuthScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = () => {
    navigate("/add-friend");
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setMode("login");
    setShowDemo(false);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#F7F8F7" }}>
      {/* Header */}
      <div
        className="px-6 pt-4 pb-6"
        style={{ background: "linear-gradient(180deg, rgba(14,124,97,0.06) 0%, transparent 100%)" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-6 rounded-full p-2 -ml-2"
          style={{ color: "#0E7C61" }}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Logo mini */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 44, height: 44, background: "linear-gradient(135deg, #0E7C61, #0a5c47)" }}
          >
            <span style={{ fontSize: 22 }}>☪️</span>
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>
              {mode === "signup" ? "Join the community" : "Continue your journey"}
            </p>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="mx-6 mb-6">
        <div
          className="flex rounded-2xl p-1"
          style={{ background: "white", border: "1px solid #e2e8f0" }}
        >
          {(["signup", "login"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 rounded-xl py-2.5 transition-all"
              style={{
                background: mode === m ? "#0E7C61" : "transparent",
                color: mode === m ? "white" : "#94a3b8",
                fontSize: 14,
                fontWeight: mode === m ? 600 : 400,
              }}
            >
              {m === "signup" ? "Sign Up" : "Log In"}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 flex flex-col gap-4"
      >
        {/* Email / Phone */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, display: "block" }}>
            Email or Phone Number
          </label>
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-4"
            style={{ background: "white", border: "1.5px solid #e2e8f0" }}
          >
            <Mail size={18} color="#94a3b8" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: 15, color: "#0f172a" }}
            />
            <Phone size={16} color="#cbd5e1" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, display: "block" }}>
            Password
          </label>
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-4"
            style={{ background: "white", border: "1.5px solid #e2e8f0" }}
          >
            <Lock size={18} color="#94a3b8" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: 15, color: "#0f172a" }}
            />
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
            </button>
          </div>
        </div>

        {mode === "login" && (
          <button className="text-right" style={{ fontSize: 13, color: "#0E7C61", fontWeight: 500 }}>
            Forgot password?
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
          <span style={{ fontSize: 12, color: "#94a3b8" }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          {[
            { label: "Google", emoji: "🌐" },
            { label: "Apple", emoji: "🍎" },
          ].map(({ label, emoji }) => (
            <button
              key={label}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5"
              style={{ background: "white", border: "1.5px solid #e2e8f0", fontSize: 14, color: "#475569" }}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Submit button */}
      <div className="px-6 mt-auto pb-8 pt-6">
        {/* Demo Credentials Toggle */}
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 mb-3"
          style={{
            background: "rgba(212,175,55,0.10)",
            border: "1.5px dashed #D4AF37",
            color: "#b8940e",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Zap size={15} />
          {showDemo ? "Hide Demo Credentials" : "🔑 Use Demo Credentials"}
        </button>

        {/* Demo Credentials Panel */}
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl mb-3 overflow-hidden"
            style={{ border: "1.5px solid #D4AF37", background: "#fffdf0" }}
          >
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{ background: "rgba(212,175,55,0.15)", borderBottom: "1px solid #f0e080" }}
            >
              <Zap size={13} color="#b8940e" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#b8940e", letterSpacing: 0.5 }}>
                DEMO CREDENTIALS — For testing only
              </span>
            </div>
            {DEMO_CREDENTIALS.map((cred, i) => (
              <div
                key={cred.email}
                style={{
                  borderBottom: i < DEMO_CREDENTIALS.length - 1 ? "1px solid #f0e6a0" : "none",
                }}
              >
                <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#7a6200" }}>{cred.label}</span>
                  <button
                    onClick={() => fillDemo(cred)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg"
                    style={{ background: "#0E7C61", color: "white", fontSize: 11, fontWeight: 600 }}
                  >
                    <Zap size={10} />
                    Auto-fill
                  </button>
                </div>
                {/* Email row */}
                <div className="px-4 py-1.5 flex items-center justify-between">
                  <div>
                    <span style={{ fontSize: 10, color: "#94a3b8", display: "block" }}>Email</span>
                    <span style={{ fontSize: 12, color: "#334155", fontFamily: "monospace" }}>{cred.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cred.email, `email-${i}`)}
                    style={{ color: copiedField === `email-${i}` ? "#0E7C61" : "#94a3b8" }}
                  >
                    {copiedField === `email-${i}` ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                {/* Password row */}
                <div className="px-4 py-1.5 pb-3 flex items-center justify-between">
                  <div>
                    <span style={{ fontSize: 10, color: "#94a3b8", display: "block" }}>Password</span>
                    <span style={{ fontSize: 12, color: "#334155", fontFamily: "monospace" }}>{cred.password}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cred.password, `pass-${i}`)}
                    style={{ color: copiedField === `pass-${i}` ? "#0E7C61" : "#94a3b8" }}
                  >
                    {copiedField === `pass-${i}` ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full rounded-2xl py-4 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #0E7C61, #0a5c47)",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {mode === "signup" ? "Create Account" : "Log In"}
        </motion.button>

        <p className="text-center mt-4" style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#0E7C61" }}>Terms</span> and{" "}
          <span style={{ color: "#0E7C61" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}