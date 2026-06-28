import { Link } from "react-router-dom";

const MovieHeader = ({ movie }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10">

      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[550px] object-cover rounded-2xl shadow-lg"
      />

      <div>

        <h1 className="text-5xl font-bold mb-4">
          {movie.title}
        </h1>

        <div className="flex gap-3 mb-5 flex-wrap">

          <span className="bg-red-600 text-white px-4 py-2 rounded-full">
            ⭐ {movie.rating}
          </span>

          <span className="bg-gray-200 px-4 py-2 rounded-full">
            {movie.genre}
          </span>

          <span className="bg-gray-200 px-4 py-2 rounded-full">
            {movie.language}
          </span>

        </div>

        <p className="mb-4">
          {movie.description}
        </p>

        <p className="mb-2">
          <strong>Director :</strong> {movie.director}
        </p>

        <p className="mb-2">
          <strong>Cast :</strong> {movie.cast}
        </p>

        <p className="mb-2">
          <strong>Duration :</strong> {movie.duration} mins
        </p>

        <Link
          to={`/theatres/${movie._id}`}
          className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Book Tickets
        </Link>

      </div>

    </div>
  );
};

export default MovieHeader;