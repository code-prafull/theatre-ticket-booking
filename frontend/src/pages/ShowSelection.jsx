// File Path: pages/ShowSelection.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";

const ShowSelection = () => {
  const { theatreId } = useParams(); // URL parameter identifier (Maps directly as movieId in this figma flow context)
  const navigate = useNavigate();
  const location = useLocation();

  const [shows, setShows] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom mock configuration calendar matching figma snippet arrays exactly
  const [selectedDate, setSelectedDate] = useState("10"); 
  const figmaDates = [
    { day: "Fri", num: "10" },
    { day: "Sat", num: "11" },
    { day: "Sun", num: "12" },
    { day: "Mon", num: "13" },
    { day: "Tue", num: "14" },
    { day: "Wed", num: "15" },
    { day: "Thu", num: "16" },
  ];

  useEffect(() => {
    fetchMasterShowcaseMatrix();
  }, [theatreId]);

  const fetchMasterShowcaseMatrix = async () => {
    try {
      // Parallel requests dispatching matching data entities mapping records
      const [showsRes, theatresRes, movieRes] = await Promise.allSettled([
        API.get("/shows"),
        API.get("/theatres"),
        API.get(`/movies/${theatreId}`) // Querying film data object parameters securely
      ]);

      if (showsRes.status === "fulfilled") setShows(showsRes.value.data?.data || []);
      if (theatresRes.status === "fulfilled") setTheatres(theatresRes.value.data?.data || []);
      if (movieRes.status === "fulfilled") setMovie(movieRes.value.data?.data || movieRes.value.data);

    } catch (err) {
      console.log("Error aggregating active show session filters tracker arrays:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    // FULL-SCREEN SHEET RESOULUTION: Constraint bounds locked to terminate dark color blocks under action footers completely
    <div className="h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-hidden select-none">
      
      {/* 1. GLOBAL FIXED NAVIGATION HEADER BAR (Desktop Only Layout mask) */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* CORE CANVAS WORKSPACE CONTAINER */}
      <div className="w-full flex-1 overflow-y-auto h-full pt-0 lg:pt-24 pb-[72px] lg:pb-12 bg-white lg:bg-[#07070A] text-black lg:text-white scrollbar-none">
        
        {/* ========================================================
            1. PREMIUM DESKTOP VIEWPORT LAYOUT (Admin Palette Match)
           ======================================================== */}
        <div className="hidden lg:flex w-full max-w-6xl mx-auto px-8 py-10 flex-col gap-8 text-white relative text-left">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#5B50E6]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-full border-b border-white/[0.05] pb-4">
            <span className="text-[10px] font-black text-[#5B50E6] uppercase tracking-widest">Workspace Screening Engine</span>
            <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">
              {movie?.title || "Select Cinema Theatre Arena"}
            </h1>
            <p className="text-xs text-gray-400 mt-1">🎭 {movie?.genre || "Action, Sci-Fi"} • Select active hubs and dates nodes inside records parameters.</p>
          </div>

          {/* Desktop Fallback Display Loop Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {theatres.map((t) => (
              <div 
                key={t._id}
                onClick={() => navigate(`/seat-selection/${shows[0]?._id || "6a40fb0cc4e2d6dd31562e7d"}`)}
                className="bg-[#111116] border border-white/[0.05] p-5 rounded-xl cursor-pointer hover:border-[#5B50E6]/50 transition-all flex items-center justify-between"
              >
                <div className="flex flex-col text-left">
                  <h4 className="text-sm font-black text-white">{t.name}</h4>
                  <span className="text-xs text-gray-400 mt-1">📍 {t.city || t.location}</span>
                </div>
                <span className="text-xs font-black text-[#5B50E6] font-mono">₹320 - ₹450</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            2. MOBILE EXCLUSIVE PIXEL CLONE STAGE (Figma Image Match)
           ======================================================== */}
        {/* Crisp light canvas palette tracking exact dimensions variables from visual snapshot attachment */}
        <div className="lg:hidden w-full min-h-full flex flex-col bg-[#F8F9FC] text-black pt-0">
          
          {/* FIGMA BANNER LAYER AREA */}
          <div className="w-full aspect-[16/7] relative overflow-hidden bg-gray-900 shrink-0">
            <img 
              src={movie?.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop"} 
              alt={movie?.title} 
              className="w-full h-full object-cover object-center blur-xs opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-black/40 pointer-events-none" />
            
            {/* Action headers buttons overlays tracking exact placement */}
            <div className="absolute top-5 left-5 text-white text-xs font-bold drop-shadow-md cursor-pointer flex items-center gap-1" onClick={() => navigate(-1)}>
              <span>←</span> Back
            </div>
            <div className="absolute top-5 right-5 text-white text-xs font-medium drop-shadow-md cursor-pointer" onClick={() => navigate("/")}>
              Cancel
            </div>

            {/* Movie Info String Stack floating exactly over color gradients */}
            <div className="absolute bottom-4 inset-x-5 flex flex-col items-start text-left text-white">
              <h2 className="text-base font-black tracking-tight drop-shadow-md w-full truncate">
                {movie?.title || "Meg 2: The Trench"}
              </h2>
              <span className="text-[10px] font-bold text-gray-300 drop-shadow-xs mt-0.5">
                {Array.isArray(movie?.genre) ? movie.genre.join(", ") : movie?.genre || "Action, Sci-fi, Horror"}
              </span>
            </div>
          </div>

          {/* FIGMA PROCESS SEGMENT INDICATOR DOT BAR STRIP */}
          <div className="w-full h-1 bg-gray-100 shrink-0 relative">
            <div className="absolute left-0 top-0 h-full w-[45%] bg-[#4B42E1]" />
          </div>

          {/* SELECT THEATRE CONTEXT FRAME BLOCK TITLE HEADER */}
          <div className="w-full px-5 pt-5 pb-2 text-left bg-white shrink-0">
            <h3 className="text-sm font-black text-gray-900 tracking-tight">
              Select Movie Theatre
            </h3>
          </div>

          {/* FIGMA HORIZONTAL COMPONENT CALENDAR DATE SLIDER LOOP ROW */}
          <div className="w-full bg-white px-5 pb-4 flex gap-3 overflow-x-auto scrollbar-none shrink-0 border-b border-gray-100/60 snap-x">
            {figmaDates.map((item, idx) => {
              const isSelected = selectedDate === item.num;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDate(item.num)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg shrink-0 min-w-[38px] snap-start cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-[#4B42E1] text-white shadow-sm shadow-[#4B42E1]/20" 
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-wide ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                    {item.day}
                  </span>
                  <span className={`text-xs font-black font-mono mt-1 ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {item.num}
                  </span>
                </div>
              );
            })}
          </div>

          {/* FIGMA VERTICAL LIST ROW CONTAINER DISPLAYING OPERATIONAL THEATRES */}
          <div className="w-full flex-1 px-5 py-4 flex flex-col gap-3.5 overflow-y-auto scrollbar-none">
            {theatres.length > 0 ? (
              theatres.map((theatre, index) => {
                // Static logo images asset index pointers allocation satisfying visual icons grids
                const logos = [
                  "https://cdn-icons-png.flaticon.com/128/3176/3176274.png",
                  "https://cdn-icons-png.flaticon.com/128/11416/11416353.png",
                  "https://cdn-icons-png.flaticon.com/128/10312/10312891.png"
                ];

                // LINK INTERCEPT ACTION LINKING FIXED: Clicking a theatre card redirects safely using matching dynamic session ID
                const activeShowId = shows.find(s => s.theatre?._id === theatre._id || s.theatre === theatre._id)?._id || "6a40fb0cc4e2d6dd31562e7d";

                return (
                  <div 
                    key={theatre._id}
                    onClick={() => navigate(`/seat-selection/${activeShowId}`, { state: { movie, theatre } })}
                    className="w-full flex items-center gap-4 border border-gray-100/80 bg-white p-3.5 rounded-2xl shadow-3xs cursor-pointer hover:bg-gray-50/60 active:scale-[0.99] transition-all"
                  >
                    {/* Left Abstract Logo placeholder match */}
                    <div className="w-11 h-11 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
                      <img 
                        src={logos[index % logos.length]} 
                        alt="Brand Representation icon" 
                        className="w-5 h-5 object-contain opacity-80"
                      />
                    </div>

                    {/* Middle Column labels stack up-down descriptions */}
                    <div className="flex-1 min-w-0 flex flex-col text-left">
                      <h4 className="text-xs font-black text-gray-800 truncate tracking-tight">
                        {theatre.name}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-400 truncate mt-0.5">
                        📍 {theatre.address || theatre.city || theatre.location || "Quezon City Region"}
                      </span>
                      <span className="text-[10px] font-extrabold font-mono text-gray-500 mt-1">
                        ₹{index % 2 === 0 ? "320 - ₹450" : "300 - ₹430"}
                      </span>
                    </div>

                    {/* Chevron Arrow element decoration line indicator endpoint */}
                    <span className="text-gray-300 text-xs font-mono font-bold pr-1">
                      ⟩
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-xs font-bold text-gray-400">
                No arenas registered mapping workspace coordinates selectors logs files yet.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MOBILE PERSISTENT BOTTOM HUD BAR NAVIGATION EXCLUSIVE STRIP */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-white border-t border-gray-100 flex items-center justify-around px-4">
        <Navbar />
      </div>

    </div>
  );
};

export default ShowSelection;