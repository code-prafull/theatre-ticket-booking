// File Path: components/movie/MovieGrid.jsx
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies = [] }) => {
  return (
    <div className="w-full flex flex-col py-4 bg-white select-none">
      
      {/* Figma Exact Heading Section Zone with View All link controls */}
      <div className="w-full flex justify-between items-center px-4 mb-4">
        <div className="flex items-center gap-6">
          {/* Active Navigation Tab state tracking display */}
          <button 
            type="button" 
            className="text-base font-extrabold text-[#5B50E6] relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#5B50E6]"
          >
            Now Showing
          </button>
          
          {/* Inactive Tab representation according to Figma screens */}
          <button 
            type="button" 
            className="text-base font-bold text-gray-400 hover:text-black pb-1 transition-colors"
          >
            Coming Soon
          </button>
        </div>

        {/* View All dynamic navigation action tag link */}
        <button 
          type="button" 
          className="text-xs font-bold text-[#5B50E6] hover:underline px-1"
        >
          View All
        </button>
      </div>

      {/* HORIZONTAL CARDS SLIDER SLOT: 
          Mobile view layout par smoothly touch-swipe scroll ho jayega.
          Desktop view controls blocks me explicit horizontal navigation content bar match layout handle karega.
      */}
      <div className="w-full flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="snap-start shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-6 text-sm text-gray-400 font-medium">
            No movies running current scheduled lists.
          </div>
        )}
      </div>

    </div>
  );
};

export default MovieGrid;