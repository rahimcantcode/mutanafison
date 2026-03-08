import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Flame, Moon, Layout, User } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Flame, label: "Streak", path: "/streak" },
  { icon: Moon, label: "Ramadan", path: "/ramadan" },
  { icon: Layout, label: "Widget", path: "/widget" },
  { icon: User, label: "Profile", path: "/profile" },
];

const NO_NAV_PATHS = ["/", "/auth", "/add-friend"];

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const showNav = !NO_NAV_PATHS.includes(location.pathname);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0a5c47 0%, #0E7C61 40%, #1a9e7d 70%, #D4AF37 100%)" }}
    >
      {/* iPhone 15 Pro Frame */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: 393,
          height: 852,
          borderRadius: 55,
          background: "#F7F8F7",
          border: "12px solid #1a1a1a",
          boxShadow: "0 0 0 2px #3a3a3a, 0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: 126,
            height: 37,
            background: "#1a1a1a",
            borderRadius: 20,
          }}
        />

        {/* Status bar */}
        <div className="flex justify-between items-center px-8 pt-5 pb-1 z-40 relative" style={{ paddingTop: 52 }}>
          <span className="text-xs font-semibold text-gray-800" style={{ fontSize: 15, fontWeight: 600 }}>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="#1a1a1a"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/>
              <rect x="9" y="0" width="3" height="12" rx="1" fill="#1a1a1a"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.4C10.2 2.4 12.2 3.3 13.6 4.8L15 3.4C13.2 1.3 10.7 0 8 0C5.3 0 2.8 1.3 1 3.4L2.4 4.8C3.8 3.3 5.8 2.4 8 2.4Z" fill="#1a1a1a"/>
              <path d="M8 5.2C9.4 5.2 10.7 5.8 11.6 6.8L13 5.4C11.7 4 9.9 3.2 8 3.2C6.1 3.2 4.3 4 3 5.4L4.4 6.8C5.3 5.8 6.6 5.2 8 5.2Z" fill="#1a1a1a"/>
              <circle cx="8" cy="10" r="2" fill="#1a1a1a"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="17" height="8" rx="2" fill="#1a1a1a"/>
              <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="#1a1a1a" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: showNav ? 80 : 0 }}>
          <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <Outlet />
          </div>
        </div>

        {/* Bottom Navigation */}
        {showNav && (
          <div
            className="absolute bottom-0 left-0 right-0 z-50"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingBottom: 20,
              paddingTop: 10,
            }}
          >
            <div className="flex justify-around items-center">
              {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all"
                    style={{
                      color: isActive ? "#0E7C61" : "#94a3b8",
                      background: isActive ? "rgba(14,124,97,0.08)" : "transparent",
                    }}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Home indicator */}
        {!showNav && (
          <div className="flex justify-center pb-3 pt-2">
            <div className="w-32 h-1 rounded-full bg-gray-800 opacity-30" />
          </div>
        )}
      </div>

      {/* Desktop hint */}
      <div className="absolute bottom-4 text-white text-opacity-60 text-sm" style={{ opacity: 0.6 }}>
        Mutanafison — Mobile UI Preview
      </div>
    </div>
  );
}
