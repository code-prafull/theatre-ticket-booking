// File Path: components/shared/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Figma Exact Active Blue Accent Color Match Tracker (#4B42E1)
  const isActive = (path) => location.pathname === path;

  return (
    // FIX: Screen flush frame container - Mobile par niche perfectly set aur desktop par background border configurations seamlessly mask karega
    <div className="w-full h-full bg-white lg:bg-[#0E0E14] border-t lg:border-t-0 lg:border-b border-gray-100/80 lg:border-white/[0.04] flex lg:justify-between items-center justify-around px-6 lg:px-16 py-1">
      
      {/* DESKTOP EXCLUSIVE BRAND RECOGNITION PANEL */}
      <div className="hidden lg:flex items-center gap-2.5">
        <div className="w-7 h-5 bg-[#4B42E1] rounded flex items-center justify-center text-[10px] font-black font-mono text-white">
          CU
        </div>
        <span className="text-sm font-black text-white tracking-tight">Creative Upaay Cinema Hub</span>
      </div>

      {/* CORE ROUTING NAV LINKS MESH GRID */}
      <div className="flex items-center lg:gap-8 justify-around lg:justify-end w-full lg:w-auto">
        
        {/* Tab 1: Home Dashboard Grid Channel */}
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center p-2 transition-all duration-150 active:scale-90 ${
            isActive("/") ? "text-[#4B42E1] lg:text-[#5B50E6]" : "text-gray-400 hover:text-gray-600 lg:hover:text-white"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>

        {/* Tab 2: User Bookings Tickets Ledger Channel */}
        <Link 
          to="/my-bookings" 
          className={`flex flex-col items-center justify-center p-2 transition-all duration-150 active:scale-90 ${
            isActive("/my-bookings") ? "text-[#4B42E1] lg:text-[#5B50E6]" : "text-gray-400 hover:text-gray-600 lg:hover:text-white"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </Link>

        {/* Tab 3: Heart Bookmarks Wishlist Channel */}
        <Link 
          to="/wishlist" 
          className={`flex flex-col items-center justify-center p-2 transition-all duration-150 active:scale-90 ${
            isActive("/wishlist") ? "text-[#4B42E1] lg:text-[#5B50E6]" : "text-gray-400 hover:text-gray-600 lg:hover:text-white"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>

        {/* Tab 4: Account Profile Metrics Channel */}
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center p-2 transition-all duration-150 active:scale-90 ${
            isActive("/profile") ? "text-[#4B42E1] lg:text-[#5B50E6]" : "text-gray-400 hover:text-gray-600 lg:hover:text-white"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>

      </div>

    </div>
  );
};

export default Navbar;