// File Path: pages/TheatreSelection.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

const TheatreSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [shows, setShows] = useState([]);

  const movieFromState = location.state?.movie;
  const movieFromCache = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("active_movie_buffer");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);
  const movie = movieFromState || movieFromCache;

  useEffect(() => {
    const loadShows = async () => {
      if (!movie?._id) {
        toast.error("Movie context missing. Please select movie again.");
        navigate("/", { replace: true });
        return;
      }

      try {
        const { data } = await API.get("/shows");
        const allShows = data?.data || [];
        const movieShows = allShows.filter(
          (item) => item?.movie?._id === movie._id || item?.movie === movie._id
        );
        setShows(movieShows);
      } catch (error) {
        console.log("Error loading shows:", error);
        toast.error("Unable to load shows right now.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [movie?._id, navigate]);

  const handleProceed = () => {
    if (!selectedShowId) {
      toast.error("Please select a show time first.");
      return;
    }
    const selectedShow = shows.find((item) => item._id === selectedShowId);
    navigate(`/seat-selection/${selectedShowId}`, {
      state: {
        movie,
        show: selectedShow || null,
        theatre: selectedShow?.theatre || null,
      },
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-hidden select-none">
      
      {/* DESKTOP FIXED TOPBAR NAVIGATION HEADER */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* CORE FRAME LAYOUT SPACE */}
      <div className="w-full flex-1 overflow-y-auto h-full pt-0 lg:pt-24 pb-[80px] bg-white lg:bg-[#07070A] text-black lg:text-white scrollbar-none">
        
        {/* ========================================================
            1. PREMIUM CINEMATIC DESKTOP INTERFACE
           ======================================================== */}
        <div className="hidden lg:flex w-full max-w-4xl mx-auto px-8 py-10 flex-col gap-6 text-white text-left">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-black text-[#5B50E6] uppercase tracking-widest">Schedule Console</span>
            <h1 className="text-2xl font-black tracking-tight">{movie.title}</h1>
            <p className="text-xs text-gray-400 mt-1">Select show timing and continue booking</p>
          </div>

          {shows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shows.map((show) => (
                <button
                  key={show._id}
                  type="button"
                  onClick={() => setSelectedShowId(show._id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    selectedShowId === show._id
                      ? "border-[#5B50E6] bg-[#5B50E6]/10"
                      : "border-white/10 bg-[#111116]"
                  }`}
                >
                  <p className="text-sm font-black text-white">{show?.theatre?.name || "Theatre"}</p>
                  <p className="text-xs text-gray-400 mt-1">Time: {show?.time || "N/A"}</p>
                  <p className="text-xs text-gray-400 mt-1">Price: Rs {show?.ticketPrice || 0}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 text-sm text-gray-400">
              No shows available for this movie.
            </div>
          )}
        </div>

        {/* ========================================================
            2. MOBILE EXCLUSIVE PIXEL CLONE STAGE (Figma Image Match)
           ======================================================== */}
        <div className="lg:hidden w-full min-h-full flex flex-col bg-white text-black pt-0">
          
          {/* FIGMA BLUR HERO BANNER BACKDROP TOPBAR LAYER */}
          <div className="w-full aspect-[16/7] relative overflow-hidden bg-gray-900 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-black/60 z-10" />
            
            {/* Control buttons alignment matching your figma images */}
            <div className="absolute top-5 left-5 text-white text-xs font-bold z-20 cursor-pointer" onClick={() => navigate(-1)}>
              ← Back
            </div>
            <div className="absolute top-5 right-5 text-white text-xs font-medium z-20 cursor-pointer" onClick={() => navigate("/")}>
              Cancel
            </div>

            <div className="absolute bottom-4 inset-x-5 flex flex-col items-start text-left text-white z-20">
              <h2 className="text-base font-black tracking-tight drop-shadow-md w-full truncate">{movie.title}</h2>
              <span className="text-[10px] font-bold text-gray-300 drop-shadow-xs mt-0.5">
                Choose theatre and timing
              </span>
            </div>
          </div>

          {/* PROCESS INDICATOR STEP LINE */}
          <div className="w-full h-1 bg-gray-100 shrink-0 relative">
            <div className="absolute left-0 top-0 h-full w-[65%] bg-[#4B42E1]" />
          </div>

          {/* FORM TYPE AND SCHEDULE WRAPPERS */}
          <div className="w-full px-5 pt-5 flex flex-col text-left">
            <h3 className="text-sm font-black text-gray-900 tracking-tight">Choose Schedule</h3>
            
            <div className="w-full pt-4 pb-8 flex flex-col gap-2.5">
              {shows.length > 0 ? (
                shows.map((show) => (
                  <button
                    key={show._id}
                    type="button"
                    onClick={() => setSelectedShowId(show._id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedShowId === show._id
                        ? "bg-[#4B42E1] border-[#4B42E1] text-white"
                        : "bg-white border-gray-200 text-gray-700"
                    }`}
                  >
                    <p className="text-xs font-black">{show?.theatre?.name || "Theatre"}</p>
                    <p className="text-[11px] font-bold mt-1">Time: {show?.time || "N/A"}</p>
                    <p className="text-[11px] font-bold mt-1">Price: Rs {show?.ticketPrice || 0}</p>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs font-bold text-gray-400">
                  No shows available for this movie.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* SOLID PURPLE ACTION GET TICKETS TRIGGER FOOTER STRIP BUTTON OVERLAY */}
      <div className="w-full fixed bottom-0 left-0 z-50 bg-white border-t border-gray-100 pt-3 pb-2 flex flex-col gap-2 shadow-[0_-12px_35px_rgba(0,0,0,0.04)]">
        <div className="w-full px-5">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full bg-[#4B42E1] hover:bg-[#382fd0] text-white text-xs font-black py-4 rounded-xl text-center uppercase tracking-wider transition-all"
          >
            Get Tickets
          </button>
        </div>
        <div className="relative w-full h-[56px] shrink-0 bg-white hidden lg:block">
          <Navbar />
        </div>
      </div>

    </div>
  );
};

export default TheatreSelection;