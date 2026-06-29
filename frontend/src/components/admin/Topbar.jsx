// File Path: components/admin/Topbar.jsx
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    // Enterprise Console Header Bar: Horizontal flexible structure matching admin grids layout lines
    <header className="w-full h-16 bg-[#111115] border-b border-white/5 flex items-center justify-between px-6 sm:px-8 shrink-0 select-none z-30 relative">
      
      {/* LEFT SIDE: Section Breadcrumb Identifier */}
      <div className="flex items-center gap-3">
        {/* Mobile menu decoration layout bar anchor (hidden on widescreen layout desktops) */}
        <div className="lg:hidden w-7 h-7 rounded-lg bg-[#5B50E6]/10 flex items-center justify-center text-[#5B50E6] text-xs font-black">
          M
        </div>
        <h1 className="text-sm sm:text-base font-black text-white tracking-tight">
          Control Dashboard Terminal
        </h1>
      </div>

      {/* RIGHT SIDE: Profile Metadata Controls System and Logging Pipelines */}
      <div className="flex items-center gap-5">
        
        {/* Profile Card Summary Block Section */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl max-w-[240px] sm:max-w-xs">
          
          {/* Simulated Avatar Sphere Element */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5B50E6] to-purple-500 flex items-center justify-center text-[11px] font-black text-white uppercase shrink-0">
            {user?.name?.substring(0, 1) || "A"}
          </div>

          {/* Micro text data labels columns layout */}
          <div className="hidden sm:flex flex-col text-left truncate">
            <h2 className="text-xs font-extrabold text-gray-200 truncate leading-tight">
              {user?.name || "Matrix Admin"}
            </h2>
            <p className="text-[10px] font-medium text-gray-500 truncate mt-0.5">
              {user?.email || "admin@matrixcinema.com"}
            </p>
          </div>

        </div>

        {/* LOGOUT SYSTEM INTERACTION CORE ACCENT BUTTON */}
        <button
          type="button"
          onClick={logout}
          className="text-xs font-extrabold tracking-wide text-gray-400 hover:text-red-400 bg-white/5 lg:bg-transparent hover:bg-red-500/10 border border-white/10 lg:border-transparent hover:border-red-500/20 px-3.5 py-2 lg:px-0 lg:py-0 rounded-xl lg:rounded-none transition-all duration-150 active:scale-95 shrink-0"
        >
          Sign Out
        </button>

      </div>

    </header>
  );
};

export default Topbar;