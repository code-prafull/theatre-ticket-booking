import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl duration-300 overflow-hidden">

      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {movie.title}
        </h2>

        <p className="text-gray-500">
          {movie.genre}
        </p>

        <p className="text-gray-500">
          ⭐ {movie.rating}
        </p>

        <Link
          to={`/movies/${movie._id}`}
          className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default MovieCard;