import { Link } from "react-router-dom";

const CinemaOption = ({ theatre, movieId }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            {theatre.name}
          </h2>

          <p className="text-gray-500 mt-1">
            📍 {theatre.location}
          </p>

          <p className="text-gray-500 mt-1">
            Screens : {theatre.totalScreens}
          </p>
        </div>

        <Link
          to={`/shows/${movieId}/${theatre._id}`}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Select
        </Link>

      </div>

    </div>
  );
};

export default CinemaOption;