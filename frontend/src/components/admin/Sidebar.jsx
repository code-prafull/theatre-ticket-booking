// File Path: components/admin/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Navigation routes array config reflecting your page tree structure exactly
  const adminLinks = [
    {
      name: "Overview Dashboard",
      path: "/admin",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      name: "Manage Movies",
      path: "/admin/movies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      ),
    },
    {
      name: "Theatres Network",
      path: "/admin/theatres",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 21h18M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        </svg>
      ),
    },
    {
      name: "Show Timings",
      path: "/admin/shows",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      name: "All Bookings",
      path: "/admin/bookings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. DESKTOP PERMANENT VERICAL SIDEBAR FRAME */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#111115] border-r border-white/5 shrink-0 p-5 justify-between">
        <div className="w-full flex flex-col">
          
          {/* Brand Identity / Header logo zone */}
          <div className="w-full px-3 py-4 border-b border-white/5 mb-6 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5B50E6] flex items-center justify-center text-sm font-black shadow-md shadow-[#5B50E6]/20">
              M
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black tracking-tight text-white leading-none">Matrix Cinema</span>
              <span className="text-[10px] font-extrabold text-[#5B50E6] uppercase tracking-widest mt-1">Admin Panel</span>
            </div>
          </div>

          {/* Links Router Stack */}
          <nav className="w-full flex flex-col gap-1.5">
            {adminLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-150 text-left
                  ${
                    isActive
                      ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span className="shrink-0">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Back to Client Web Storefront link */}
        <div className="w-full border-t border-white/5 pt-4">
          <NavLink
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-500 hover:text-white transition-colors text-left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Exit Dashboard</span>
          </NavLink>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM HUD NAVIGATION PASS BAR (Responsive Fallback Grid) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-[#111115]/95 backdrop-blur-md border-t border-white/5 z-50 flex items-center justify-around px-2">
        {adminLinks.map((link, idx) => {
          // Flexible tracking logic matching native subpaths smoothly on mobile tabs
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={idx}
              to={link.path}
              end={link.path === "/admin"}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? "text-[#5B50E6]" : "text-gray-400"
              }`}
            >
              <span className="scale-105">{link.icon}</span>
              <span className="text-[9px] font-bold tracking-tight mt-1 hidden sm:block">
                {link.name.split(" ")[0]}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;