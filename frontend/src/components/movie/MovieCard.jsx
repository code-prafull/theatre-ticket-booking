// File Path: components/movie/MovieCard.jsx
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    // Figma Exact Mapping: Pura card hi interactive Link element hai (No separate buttons underneath)
    <Link 
      to={`/movies/${movie._id}`}
      className="block w-full max-w-[130px] sm:max-w-[150px] md:max-w-[170px] flex-shrink-0 group select-none text-left"
    >
      {/* Upper Poster Image Container wrapper */}
      <div className="w-full aspect-[2/3] relative rounded-2xl overflow-hidden mb-3 bg-gray-100">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Figma Exact Black Badge Tag for Rating - Floating over the image bottom-right corner */}
        <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
          <svg 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="#5B50E6" 
            className="text-[#5B50E6]"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span className="text-[10px] font-bold text-white tracking-tighter">
            {movie.rating ? Number(movie.rating).toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

      {/* Meta Content Details Panel beneath the poster image */}
      <div className="w-full px-0.5">
        <h3 className="text-sm font-bold text-black truncate leading-tight mb-1 group-hover:text-[#5B50E6] transition-colors">
          {movie.title}
        </h3>
        <p className="text-[11px] font-medium text-gray-400 truncate leading-none">
          {movie.genre}
        </p>
      </div>

    </Link>
  );
};

export default MovieCard;