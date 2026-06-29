// File Path: components/theatre/CinemaOption.jsx
import { Link } from "react-router-dom";

const CinemaOption = ({ theatre, movieId }) => {
  // Static timings fallback matching Figma representation if database doesn't pass dynamic lists
  const defaultShows = [
    { _id: theatre._id, showTime: "10:00 AM" },
    { _id: theatre._id, showTime: "01:15 PM" },
    { _id: theatre._id, showTime: "04:30 PM" },
    { _id: theatre._id, showTime: "07:45 PM" },
    { _id: theatre._id, showTime: "10:30 PM" }
  ];

  // Agar backend se array me directly strings milengi to unhe standard object structure me parse kar lenge
  const showTimes = Array.isArray(theatre.shows) && theatre.shows.length > 0
    ? theatre.shows.map((show) => typeof show === "string" ? { _id: theatre._id, showTime: show } : show)
    : defaultShows;

  return (
    // Responsive Row Container: 
    // Desktop: Flexible landscape view layout with white or dark mode adaptive metrics.
    // Mobile: Stacked list row elements mimicking Figma directly.
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-5 sm:p-6 bg-white lg:bg-[#1A1A22] border border-gray-100 lg:border-white/5 rounded-2xl gap-5 select-none text-left">
      
      {/* LEFT SIDE PANEL: Theatre Location Metadata Info */}
      <div className="flex flex-col shrink-0 max-w-sm">
        <div className="flex items-center gap-2">
          {/* Custom Theatre Icon Indicator SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B50E6" strokeWidth="2.5" className="shrink-0 lg:stroke-purple-400">
            <path d="M3 21h18M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
          </svg>
          <h2 className="text-base sm:text-lg font-extrabold text-black lg:text-white tracking-tight leading-snug">
            {theatre.name}
          </h2>
        </div>
        
        {/* Dynamic Location Details */}
        <p className="text-xs font-semibold text-gray-400 lg:text-gray-400 mt-1.5 pl-6 tracking-wide">
          📍 {theatre.location || "PVR South City Mall"}
        </p>

        {/* Dynamic Operational Screens Tag */}
        <p className="text-[11px] font-bold text-[#5B50E6] lg:text-purple-400/80 mt-1 pl-6 uppercase tracking-wider">
          Available Screens: {theatre.totalScreens || "4"}
        </p>
      </div>

      {/* RIGHT SIDE PANEL: Figma Exact Show Timings Grid Buttons Block Wrapper */}
      <div className="w-full md:w-auto flex-1 flex flex-wrap items-center justify-start md:justify-end gap-2.5 pt-3 md:pt-0 border-t border-gray-100 md:border-t-0 lg:border-white/5">
        
        {showTimes.map((show, index) => (
          // LINKING CORRECTION: Routing now safely maps to the show context ID needed for Seat Selection
          <Link
            key={index}
            to={`/shows/${show._id}`}
            className="px-4 py-2 bg-[#F3F3F5] lg:bg-white/5 hover:bg-[#5B50E6] lg:hover:bg-[#5B50E6] border border-transparent lg:border-white/10 rounded-xl text-center transition-all duration-200 text-black lg:text-gray-300 hover:text-white lg:hover:text-white shadow-sm active:scale-[0.96]"
          >
            <span className="text-xs font-extrabold tracking-tight">
              {show.showTime}
            </span>
          </Link>
        ))}

      </div>

    </div>
  );
};

export default CinemaOption