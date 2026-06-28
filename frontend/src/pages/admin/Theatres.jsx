import { useEffect, useState } from "react";
import API from "../../services/axios";

const Movies = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {

    try {

      const { data } =
        await API.get("/movies");

      setMovies(data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const deleteMovie = async (id) => {

    if (!window.confirm("Delete Movie?"))
      return;

    try {

      await API.delete(`/movies/${id}`);

      fetchMovies();

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <div className="min-h-screen p-10">

      <div className="flex justify-between mb-8">

        <h1 className="text-4xl font-bold">
          Movies
        </h1>

        <button
          className="bg-red-600 text-white px-5 py-3 rounded-lg"
        >
          Add Movie
        </button>

      </div>

      <table className="w-full border">

        <thead className="bg-black text-white">

          <tr>

            <th className="p-3">Poster</th>

            <th>Title</th>

            <th>Genre</th>

            <th>Language</th>

            <th>Rating</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {movies.map((movie) => (

            <tr
              key={movie._id}
              className="text-center border-b"
            >

              <td className="p-2">

                <img
                  src={movie.poster}
                  className="w-20 h-28 object-cover mx-auto rounded"
                />

              </td>

              <td>{movie.title}</td>

              <td>{movie.genre}</td>

              <td>{movie.language}</td>

              <td>{movie.rating}</td>

              <td>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteMovie(movie._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Movies;