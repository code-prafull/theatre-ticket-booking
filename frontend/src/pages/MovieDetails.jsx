// File Path: pages/MovieDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchMovieMasterDetails();
  }, [id]);

  const fetchMovieMasterDetails = async () => {
    try {
      // Simultaneously calling movie profiling and active regional theatre network logs
      const [movieRes, theatresRes] = await Promise.allSettled([
        API.get(`/movies/${id}`),
        API.get("/theatres")
      ]);

      if (movieRes.status === "fulfilled") {
        setMovie(movieRes.value.data?.data || movieRes.value.data);
      }
      if (theatresRes.status === "fulfilled") {
        setTheatres(theatresRes.value.data?.data || []);
      }
    } catch (err) {
      console.log("Error catching film profile configurations specs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <div className="text-center py-20 text-white">Movie Profile Not Found.</div>;

  const genreText = Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "Action, Sci-Fi, Horror";
  const goToTheatreSelection = (theatre = null) => {
    sessionStorage.setItem("active_movie_buffer", JSON.stringify(movie));
    navigate("/theatre-selection", {
      state: {
        movie,
        theatre,
      },
    });
  };

  return (
    // Responsive Viewports System Wrapper (Slate Dark theme on Desktop, Pristine Crisp White Canvas on Mobile)
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased pb-[72px] lg:pb-0 select-none">
      
      {/* GLOBAL FIXED NAVIGATION HEADER BAR (Desktop Only Layout context mask) */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* CORE FRAME LAYOUT */}
      <div className="w-full flex-1 overflow-y-auto">
        
        {/* ========================================================
            1. PREMIUM CINEMATIC DESKTOP VIEWPORT
           ======================================================== */}
        <div className="hidden lg:flex w-full max-w-6xl mx-auto px-8 pt-28 pb-16 gap-10 items-start relative text-left">
          
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#5B50E6]/10 rounded-full blur-[130px] pointer-events-none" />

          {/* Left Poster */}
          <div className="w-[320px] aspect-[2/3] shrink-0 bg-[#12121A] rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl relative group">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          {/* Right Meta Detail Column Grid */}
          <div className="flex-1 flex flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-black border border-[#5B50E6] text-[#5B50E6] tracking-wider uppercase">
                  {movie.rating >= 7 ? "Blockbuster" : "Trending"}
                </span>
                <span className="text-xs font-bold text-gray-400 font-mono">PG-13</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight mt-1">{movie.title}</h1>
              <p className="text-sm font-bold text-gray-400 mt-0.5">🎭 {genreText} • {movie.duration || "116"} Mins</p>
            </div>

            <div className="flex items-center gap-6 bg-[#0E0E14] border border-white/[0.05] p-4 rounded-xl shadow-xl w-fit">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">User Score Rating</span>
                <div className="flex items-center gap-1.5 mt-1 font-black text-white text-lg">
                  <span className="text-amber-400 text-xl">★</span>
                  <span>{Number(movie.rating || 5.1).toFixed(1)}</span>
                  <span className="text-xs text-gray-500 font-medium">/ 10</span>
                </div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Format Playback</span>
                <span className="text-xs font-extrabold text-[#5B50E6] mt-1.5 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/[0.05]">
                  2D / 3D IMAX
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Plot Synopsis</h3>
              <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-3xl">
                {movie.description || "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation that triggers critical cinematic containment protocols."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToTheatreSelection()}
              className="w-fit bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-black tracking-wider uppercase px-10 py-4 rounded-xl shadow-xl transition-all active:scale-95 mt-2"
            >
              Book Dynamic Screenings Timings
            </button>
          </div>

        </div>

        {/* ========================================================
            2. MOBILE EXCLUSIVE PIXEL CLONE STAGE (Modified Figma Layout)
           ======================================================== */}
        <div className="lg:hidden w-full flex flex-col bg-white text-left text-black pt-0 pb-6">
          
          {/* A. Top Giant Landscape Hero Backdrop Poster Card */}
          <div className="w-full aspect-[16/10] relative overflow-hidden bg-gray-900">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
            
            <div className="absolute top-5 left-5 text-white text-xs font-extrabold drop-shadow-md cursor-pointer bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10" onClick={() => navigate(-1)}>
              Close
            </div>
            
            <div 
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "#EF4444" : "none"} stroke={isLiked ? "#EF4444" : "currentColor"} strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
          </div>

          {/* B. Metadata Header Identity Fields */}
          <div className="w-full px-5 pt-4 flex flex-col gap-1.5">
            <div className="w-full flex justify-between items-start gap-4">
              <h2 className="text-base sm:text-lg font-black text-gray-800 tracking-tight leading-snug">
                {movie.title}
              </h2>
              <div className="flex items-center gap-1 font-extrabold text-xs text-gray-700 shrink-0 mt-0.5">
                <span className="text-amber-500 text-sm">★</span>
                <span>{Number(movie.rating || 5.1).toFixed(1)}</span>
              </div>
            </div>

            <div className="w-full flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-bold text-gray-400 truncate flex-1">
                {genreText}
              </span>
              <span className="px-1.5 py-0.5 border border-blue-400 text-blue-500 rounded text-[9px] font-extrabold font-mono shrink-0">
                PG-13
              </span>
            </div>
          </div>

          {/* C. Descriptive Story Synopsis Line */}
          <div className="w-full px-5 pt-4">
            <p className="text-xs font-semibold text-gray-400 leading-relaxed tracking-normal">
              {movie.description || "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation."}
            </p>
          </div>

          {/* D. Format Available Grid Capsules */}
          <div className="w-full px-5 pt-5 flex flex-col gap-2">
            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">
              Format Available
            </h4>
            <div className="flex gap-2.5 items-center mt-0.5">
              {["2D", "3D"].map((format) => (
                <span 
                  key={format}
                  className="px-3.5 py-1.5 bg-gray-50 border border-gray-100/80 rounded-lg text-[10px] font-black text-gray-700 shadow-3xs"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          {/* E. FIXED SWAP COMPONENT: THEATRES MATRIX VERTICAL GRID LIST (Replacing Cast) */}
          {/* Ab yahan saare theatre ke names, place / city aur dynamic pricing fields upar-niche render honge */}
          <div className="w-full px-5 pt-5 flex flex-col gap-3">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">
                Select Theatre Arena
              </h4>
              <span className="text-[10px] font-bold text-gray-400">Available Venues</span>
            </div>
            
            <div className="w-full flex flex-col gap-3 mt-0.5">
              {theatres.length > 0 ? (
                theatres.map((theatre) => (
                  <div 
                    key={theatre._id} 
                    onClick={() => goToTheatreSelection(theatre)}
                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-100 p-3.5 rounded-xl cursor-pointer hover:bg-gray-100/70 transition-all active:scale-[0.99]"
                  >
                    {/* Left Meta Group: Name and Location Place stack up-down */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-[#5B50E6] shrink-0 border border-purple-100">
                        🏢
                      </div>
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-xs font-black text-gray-800 truncate tracking-tight w-full">
                          {theatre.name}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 truncate mt-0.5 w-full">
                          📍 {theatre.address || theatre.city || theatre.location || "Cinema Hub Arena"}
                        </span>
                      </div>
                    </div>

                    {/* Right Meta Group: Flat Price Rate Money */}
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-xs font-black font-mono text-[#5B50E6]">
                        ₹350
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
                        Avg Ticket
                      </span>
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs font-bold text-gray-400">
                  No operational theatres mapping this feature film.
                </div>
              )}
            </div>
          </div>

          {/* F. Release Timeline Data */}
          <div className="w-full px-5 pt-5 flex flex-col gap-1.5">
            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">
              Release Date
            </h4>
            <p className="text-xs font-bold text-gray-400 tracking-wide mt-0.5">
              {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "10 June 2026"}
            </p>
          </div>

          {/* G. Direct Core Booking Interactor Button Overlay */}
          <div className="w-full px-5 pt-6">
            <button
              type="button"
              onClick={() => goToTheatreSelection()}
              className="px-8 py-4 bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-black rounded-xl uppercase tracking-widest shadow-lg shadow-[#5B50E6]/20 transition-all active:scale-[0.98]"
            >
              Book Tickets Now 🎟️
            </button>
          </div>

        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION STRIP BAR BUFFER */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-white border-t border-gray-100 flex items-center justify-around px-4">
        <Navbar />
      </div>

    </div>
  );
};

export default MovieDetails;