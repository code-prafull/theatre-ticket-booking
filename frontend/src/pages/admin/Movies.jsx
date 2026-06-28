import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/shared/Modal";
import MovieForm from "../../components/admin/MovieForm";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../services/adminApi";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await getMovies();

      setMovies(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = () => {
    setSelectedMovie(null);

    setOpen(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);

    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this movie?"
      );

    if (!confirmDelete) return;

    try {
      await deleteMovie(id);

      toast.success("Movie Deleted");

      fetchMovies();

    } catch (err) {

      toast.error("Delete Failed");

    }
  };

  const handleSubmit = async (
    formData
  ) => {
    try {

      if (selectedMovie) {

        await updateMovie(
          selectedMovie._id,
          formData
        );

        toast.success(
          "Movie Updated"
        );

      } else {

        await createMovie(
          formData
        );

        toast.success(
          "Movie Added"
        );

      }

      setOpen(false);

      fetchMovies();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );

    }
  };

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Movies
        </h1>

        <button
          onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Movie
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4">
                Poster
              </th>

              <th className="p-4">
                Title
              </th>

              <th className="p-4">
                Language
              </th>

              <th className="p-4">
                Rating
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>
                        {movies.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  No Movies Found
                </td>

              </tr>

            ) : (

              movies.map((movie) => (

                <tr
                  key={movie._id}
                  className="border-b hover:bg-gray-50 text-center"
                >

                  <td className="p-3">

                    <img
                      src={
                        movie.poster ||
                        "https://placehold.co/80x120"
                      }
                      alt={movie.title}
                      className="w-16 h-20 object-cover rounded mx-auto"
                    />

                  </td>

                  <td className="font-semibold">
                    {movie.title}
                  </td>

                  <td>
                    {movie.language}
                  </td>

                  <td>
                    ⭐ {movie.rating}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        movie.status ===
                        "Now Showing"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {movie.status}
                    </span>

                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={() =>
                        handleEdit(movie)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(movie._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedMovie(null);
        }}
      >
        <h2 className="text-2xl font-bold mb-5">
          {selectedMovie ? "Update Movie" : "Add Movie"}
        </h2>

        <MovieForm
          movie={selectedMovie}
          onSubmit={handleSubmit}
          onCancel={() => {
            setOpen(false);
            setSelectedMovie(null);
          }}
        />
      </Modal>

    </AdminLayout>
  );
};

export default Movies;