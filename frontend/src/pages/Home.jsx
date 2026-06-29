// File Path: pages/Home.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import { fetchWishlist, toggleWishlist } from "../services/wishlistApi";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";

const Home = () => {
  const navigate = useNavigate();
  const desktopScrollRef = useRef(null);
  
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Now Showing");
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetchHomeMasterContent();
  }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const { data } = await fetchWishlist();
        const list = data?.data || data || [];
        setWishlistIds(list.map((m) => m._id));
      } catch {
        // ignore if not logged in
      }
    };
    loadWishlist();
  }, []);

  useEffect(() => {
    const actualMoviesArray = Array.isArray(movies) ? movies : [];
    let items = actualMoviesArray.filter((movie) =>
      movie?.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (!search) {
      items = items.filter((movie) => movie?.status === activeTab);
    }

    setFilteredMovies(items);
  }, [search, movies, activeTab]);

  const fetchHomeMasterContent = async () => {
    try {
      const [moviesRes, theatresRes] = await Promise.allSettled([
        API.get("/movies"),
        API.get("/theatres"),
      ]);

      const cleanMovies = moviesRes.status === "fulfilled" ? (moviesRes.value.data?.data || []) : [];
      const cleanTheatres = theatresRes.status === "fulfilled" ? (theatresRes.value.data?.data || []) : [];

      setMovies(cleanMovies);
      setFilteredMovies(cleanMovies.filter(m => m.status === "Now Showing"));
      setTheatres(cleanTheatres);
    } catch (err) {
      console.log("Error binding marketplace assets modules:", err);
    } finally {
      setLoading(false);
    }
  };

  const scrollDesktopTrack = (direction) => {
    if (desktopScrollRef.current) {
      const { scrollLeft, clientWidth } = desktopScrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.6 : scrollLeft + clientWidth * 0.6;
      desktopScrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) return <Loader />;

  // Dynamic values extracted safely for the premium banner display
  const featuredMovie = movies[0] || {
    title: "Cinematic Experience",
    genre: ["Action", "Sci-Fi"],
    rating: 4.8,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1400&auto=format&fit=crop"
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased pb-[72px] lg:pb-0 overflow-x-hidden select-none">
      
      {/* 1. FIXED PREMIUM GLOW NAVIGATION HEADER BAR */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* MAIN CONTAINER PLATFORM */}
      <div className="w-full flex-1 overflow-y-auto">
        
        {/* ========================================================
            1. ULTRAMODERN DESKTOP VIEWPORT (Aesthetic Refined)
           ======================================================== */}
        <div className="hidden lg:flex w-full max-w-[1400px] mx-auto px-8 xl:px-16 pt-28 pb-16 flex-col gap-12 relative">
          
          {/* Cyberpunk Ambient Light Vectors */}
          <div className="absolute top-[-100px] right-10 w-[600px] h-[600px] bg-gradient-to-tr from-[#5B50E6]/15 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-20 left-[-200px] w-[500px] h-[500px] bg-[#5B50E6]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* HIGH-FIDELITY CINEMATIC HERO BANNER DESIGN REVISED */}
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/[0.06] relative z-10 group bg-[#111116]">
            <img 
              src={featuredMovie.poster} 
              alt={featuredMovie.title} 
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            {/* Dark Linear Mask Grid */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070A] via-[#07070A]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent" />
            
            {/* Banner Meta Content Info Stack Grid overlay */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-start px-16 max-w-2xl gap-4 text-left">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[#5B50E6]/20 border border-[#5B50E6]/40 text-xs font-black text-[#5B50E6] uppercase tracking-widest">
                  Featured Title
                </span>
                <span className="text-sm font-bold font-mono text-amber-400 flex items-center gap-1">
                  ★ {Number(featuredMovie.rating || 4.5).toFixed(1)}
                </span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-none drop-shadow-md">
                {featuredMovie.title}
              </h1>
              <p className="text-sm text-gray-300 font-medium tracking-wide">
                🎭 {Array.isArray(featuredMovie.genre) ? featuredMovie.genre.join(", ") : featuredMovie.genre}
              </p>
              <button 
                onClick={() => navigate(`/movies/${featuredMovie._id}`)}
                className="bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-black px-8 py-3.5 rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-[#5B50E6]/20 mt-2"
              >
                View Feature Profile
              </button>
            </div>
          </div>

          {/* HIGH-FIDELITY GLASSMORPHIC SEARCH CONSOLE DESIGN REVISED */}
          <div className="w-full bg-gradient-to-r from-[#111116]/80 to-[#161622]/60 border border-white/[0.06] p-6 rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-left shrink-0">
              <span className="text-[10px] font-black text-[#5B50E6] uppercase tracking-widest">Discovery Core</span>
              <h2 className="text-base font-black tracking-tight text-white mt-0.5">Search inside active cloud registries</h2>
            </div>
            
            {/* High-Fi Responsive Integrated Search Input Field Box */}
            <div className="w-full md:max-w-xl relative flex items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type film title name here to filter listings catalog instantly..."
                className="w-full bg-[#07070A]/80 border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-4 text-xs font-bold text-white placeholder-gray-500 focus:outline-none focus:border-[#5B50E6] focus:ring-1 focus:ring-[#5B50E6]/30 transition-all shadow-inner"
              />
              <span className="absolute left-4 text-gray-500">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 text-xs font-black text-gray-500 hover:text-gray-300">✕</button>
              )}
            </div>
          </div>

          {/* SIDE-SCROLLING METRIC TRACKSLIDER CARDS */}
          <div className="w-full flex flex-col gap-6 relative z-10">
            <div className="w-full flex items-center justify-between border-b border-white/[0.05] pb-4">
              <div className="text-left flex flex-col">
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  Featured Screenings 
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B50E6]" />
                </h3>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
                  {["Now Showing", "Coming Soon"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => { setActiveTab(tab); setSearch(""); }}
                      className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                        activeTab === tab ? "bg-[#5B50E6] text-white shadow-lg shadow-[#5B50E6]/30" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button onClick={() => scrollDesktopTrack("left")} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center hover:bg-[#5B50E6] transition-all text-gray-400 hover:text-white font-bold">⟨</button>
                  <button onClick={() => scrollDesktopTrack("right")} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center hover:bg-[#5B50E6] transition-all text-gray-400 hover:text-white font-bold">⟩</button>
                </div>
              </div>
            </div>

            <div ref={desktopScrollRef} className="w-full flex gap-6 overflow-x-auto py-4 px-2 scroll-smooth scrollbar-none snap-x">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => {
                  const isWishlisted = wishlistIds.includes(movie._id);
                  return (
                    <div
                      key={movie._id}
                      onClick={() => navigate(`/movies/${movie._id}`)}
                      className="w-[220px] shrink-0 flex flex-col snap-start cursor-pointer group"
                    >
                      <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#12121A] relative border border-white/[0.05] transition-all duration-300 group-hover:border-[#5B50E6]/50 group-hover:shadow-[0_0_30px_rgba(91,80,230,0.25)] group-hover:-translate-y-2">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                          <span className="text-[9px] font-black tracking-widest text-[#5B50E6] uppercase">
                            Runtime
                          </span>
                          <p className="text-xs font-bold text-white mt-0.5">
                            {movie.duration || "120"} Minutes
                          </p>
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                const { data } = await toggleWishlist(movie._id);
                                const list = data?.data || data;
                                if (Array.isArray(list)) {
                                  setWishlistIds(list.map((id) => id.toString()));
                                } else {
                                  setWishlistIds((prev) =>
                                    prev.includes(movie._id)
                                      ? prev.filter((id) => id !== movie._id)
                                      : [...prev, movie._id]
                                  );
                                }
                              } catch {
                                // ignore, backend toast karega
                              }
                            }}
                            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#5B50E6] transition-colors"
                          >
                            <span className={`text-xs ${isWishlisted ? "text-red-400" : "text-white"}`}>♥</span>
                          </button>
                          <div className="px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/[0.05] flex items-center gap-1 text-[10px] font-black text-white">
                            <span className="text-amber-400 text-xs">★</span>
                            <span>{Number(movie.rating || 4.5).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-sm font-black text-gray-200 mt-3 tracking-tight group-hover:text-[#5B50E6] transition-colors truncate text-left w-full">
                        {movie.title}
                      </h4>
                      <span className="text-xs font-bold text-gray-500 mt-0.5 truncate text-left w-full">
                        {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "General"}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center py-16 text-sm text-gray-500 font-bold">No active movies matched inside this track filter segment.</div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================
            2. MOBILE EXCLUSIVE PIXEL CLONE STAGE (Figma Image Match)
           ======================================================== */}
        <div className="lg:hidden w-full flex flex-col bg-white text-left pt-0 text-black">
          
          <div className="w-full aspect-[16/11] relative overflow-hidden bg-gray-900">
            <img 
              src={movies[0]?.poster || featuredMovie.poster} 
              alt="Featured Hero Snapshot" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>

          <div className="w-full px-5 pt-4">
            <div className="w-full relative flex items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies instantly..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white transition-all shadow-2xs"
              />
              <span className="absolute left-3.5 text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full px-5 pt-4 flex items-center justify-between border-b border-gray-100/60">
            <div className="flex gap-6 items-center">
              {["Now Showing", "Coming Soon"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => { setActiveTab(tab); setSearch(""); }}
                  className={`pb-3 text-xs sm:text-sm font-extrabold tracking-tight transition-all relative ${
                    activeTab === tab ? "text-[#5B50E6]" : "text-gray-400 font-bold"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#5B50E6] rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <span
              className="text-[11px] font-extrabold text-purple-600/80 tracking-tight cursor-pointer pb-3"
              onClick={() => navigate("/wishlist")}
            >
              View All
            </span>
          </div>

          <div className="w-full flex gap-4 overflow-x-auto px-5 pt-4 pb-5 scrollbar-none snap-x">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => {
                const isWishlisted = wishlistIds.includes(movie._id);
                return (
                  <div
                    key={movie._id}
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className="w-[125px] sm:w-[140px] shrink-0 flex flex-col snap-start cursor-pointer group"
                  >
                    <div className="w-full aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden relative shadow-sm border border-gray-100">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            const { data } = await toggleWishlist(movie._id);
                            const list = data?.data || data;
                            if (Array.isArray(list)) {
                              setWishlistIds(list.map((id) => id.toString()));
                            } else {
                              setWishlistIds((prev) =>
                                prev.includes(movie._id)
                                  ? prev.filter((id) => id !== movie._id)
                                  : [...prev, movie._id]
                              );
                            }
                          } catch {
                            // ignore
                          }
                        }}
                        className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10"
                      >
                        <span className={`text-[10px] ${isWishlisted ? "text-red-400" : "text-white"}`}>♥</span>
                      </button>
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm flex items-center gap-0.5 text-[9px] font-black text-white">
                        <span className="text-amber-400 text-[8px]">★</span>
                        <span>{Number(movie.rating || 4.5).toFixed(1)}</span>
                      </div>
                    </div>
                    <h4 className="text-xs font-extrabold text-gray-800 mt-2 tracking-tight truncate text-left w-full">
                      {movie.title}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 mt-0.5 truncate text-left w-full">
                      {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "General"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-6 text-xs text-gray-400 font-bold">No movies tracked in query.</div>
            )}
          </div>

          <div className="w-full px-5 pt-2 pb-6 flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-gray-800 tracking-tight">Movie Theatres</h3>
              <span
                className="text-[11px] font-extrabold text-purple-600/80 tracking-tight cursor-pointer"
                onClick={() =>
                  navigate("/theatre-selection", {
                    state: { movie: featuredMovie },
                  })
                }
              >
                View All
              </span>
            </div>
            <div className="w-full flex flex-col gap-3.5">
              {theatres.slice(0, 3).map((theatre) => (
                <div
                  key={theatre._id}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    navigate("/theatre-selection", {
                      state: { movie: featuredMovie, theatre },
                    })
                  }
                  className="w-full flex items-center gap-4 border border-gray-100 p-3 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B50E6" strokeWidth="2.5">
                      <path d="M3 21h18M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col text-left">
                    <h4 className="text-xs sm:text-sm font-black text-gray-800 truncate tracking-tight">{theatre.name}</h4>
                    <span className="text-[10px] font-bold text-gray-400 truncate mt-0.5">📍 {theatre.city || theatre.location}</span>
                    <span className="text-[10px] font-extrabold font-mono text-gray-500 mt-1">₹300 - ₹450</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MOBILE BOTTOM HUD NAVIGATION OVERLAY */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-white border-t border-gray-100 flex items-center justify-around px-4">
        <Navbar />
      </div>

    </div>
  );
};

export default Home;