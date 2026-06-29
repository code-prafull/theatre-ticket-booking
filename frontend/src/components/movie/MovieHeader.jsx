// File Path: components/movie/MovieHeader.jsx
import { useNavigate } from "react-router-dom";

const MovieHeader = ({ movie }) => {
  const navigate = useNavigate();

  // Cast schema mapping condition (agar backend se array of objects na ho, to clean dynamic structural view ke liye dynamic splits handle kiye)
  const castList = Array.isArray(movie.cast) 
    ? movie.cast 
    : typeof movie.cast === "string" 
      ? movie.cast.split(",").map(c => ({ name: c.trim(), role: "Actor", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" }))
      : [];

  return (
    <div className="w-full flex flex-col select-none text-left bg-white">
      
      {/* 1. TOP CINEMATIC BANNER SECTIONS WITH FLOAT CONTROLS */}
      <div className="w-full h-[200px] relative bg-gray-900 overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover object-center"
        />
        {/* Figma Exact Gradient Overlay Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Figma Header Floating Navigation actions buttons */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-white font-semibold text-sm flex items-center gap-1 drop-shadow-md hover:opacity-80 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-white font-semibold text-sm drop-shadow-md hover:opacity-80 transition-opacity"
          >
            Close
          </button>
        </div>

        {/* Figma Floating Interactive Heart/Favorite Toggle Badge Icon on top right corner */}
        <div className="absolute bottom-4 right-4 z-20">
          <button 
            type="button"
            className="p-1.5 rounded-full hover:scale-105 transition-transform text-white"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. CORE INFO CONTENT BOX PANEL DETAILS */}
      <div className="w-full px-5 py-5 flex flex-col">
        
        {/* Title, Certificate & Rating Alignment */}
        <div className="w-full flex items-start justify-between gap-3 mb-1">
          <h1 className="text-xl font-extrabold text-black tracking-tight leading-tight max-w-[70%]">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-2 mt-1 shrink-0">
            {/* PG Tag Block standard representation */}
            <span className="text-[10px] font-bold text-[#5B50E6] border border-[#5B50E6]/30 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
              {movie.language || "PG-13"}
            </span>
            {/* Figma Rating badge alignment indicators */}
            <div className="flex items-center gap-0.5 text-black font-extrabold text-xs">
              <span className="text-black text-sm">★</span>
              <span>{movie.rating ? Number(movie.rating).toFixed(1) : "5.0"}</span>
            </div>
          </div>
        </div>

        {/* Genre Line Content description */}
        <p className="text-xs font-semibold text-gray-400 mb-4 tracking-normal">
          {movie.genre}
        </p>

        {/* Dynamic Plot Info Description Text */}
        <p className="text-xs text-gray-500 leading-relaxed tracking-wide mb-6">
          {movie.description || "A research team encounters multiple threats while exploring the deep layers of the ocean environment."}
        </p>

        {/* 3. FORMAT AVAILABLE OPTION TAGS */}
        <div className="w-full flex flex-col mb-5">
          <span className="text-xs font-extrabold text-black uppercase tracking-wider mb-2.5">
            Format Available
          </span>
          <div className="flex gap-2">
            <span className="text-xs font-bold text-[#5B50E6] border border-[#5B50E6] px-3 py-1 rounded-lg">
              2D
            </span>
            <span className="text-xs font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-lg">
              3D
            </span>
          </div>
        </div>

        {/* 4. RELEASE DATE INFO DISPLAY BLOCK */}
        <div className="w-full flex flex-col mb-6">
          <span className="text-xs font-extrabold text-black uppercase tracking-wider mb-1">
            Release Date
          </span>
          <span className="text-xs font-medium text-gray-500">
            {movie.duration ? `${movie.duration} mins` : "10 June 2026"}
          </span>
        </div>

        {/* 5. HORIZONTAL CAST AVATARS PANEL BLOCKS SLIDER */}
        <div className="w-full flex flex-col">
          <span className="text-xs font-extrabold text-black uppercase tracking-wider mb-3">
            Cast
          </span>
          
          <div className="w-full flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {castList.length > 0 ? (
              castList.map((actor, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-transparent shrink-0 max-w-[140px] pr-2">
                  <img 
                    src={actor.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"} 
                    alt={actor.name} 
                    className="w-10 h-10 object-cover rounded-xl bg-gray-100 border border-gray-100"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-[11px] font-extrabold text-black truncate leading-tight">
                      {actor.name}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400 truncate">
                      {actor.role || "Cast Info"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-400 font-medium">Cast information currently unavailable.</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default MovieHeader;