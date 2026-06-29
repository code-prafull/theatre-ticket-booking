// File Path: pages/admin/Movies.jsx
import { useEffect, useState } from "react";
import API from "../../services/axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/shared/Modal";
import MovieForm from "../../components/admin/MovieForm";
import Loader from "../../components/shared/Loader";
import toast from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal toggle and editing operational tracker states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await API.get("/movies");
      setMovies(data.data || []);
    } catch (err) {
      console.log("Error catching film registries:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const formSubmitHandler = async (formData) => {
    try {
      if (selectedMovie) {
        // Edit Operation pipeline
        await API.put(`/movies/${selectedMovie._id}`, formData);
        toast.success("Movie Updated Successfully");
      } else {
        // Create Operation pipeline
        await API.post("/movies", formData);
        toast.success("Movie Added Successfully");
      }
      setIsModalOpen(false);
      fetchMovies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation submission failure");
    }
  };

  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this movie entity?")) return;
    try {
      await API.delete(`/movies/${id}`);
      toast.success("Movie Removed");
      fetchMovies();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete movie execution registry entry.");
    }
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-6 text-left select-none">
        
        {/* Dynamic Context Section Heading Bar */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Manage Movies Catalog
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Inject catalog listings, edit cinematic assets details, and control global visibility bounds.
            </p>
          </div>
          
          <button
            type="button"
            onClick={openAddModal}
            className="w-full sm:w-auto bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95"
          >
            + Add New Movie
          </button>
        </div>

        {/* HIGH-FIDELITY ASSETS LEDGER GRID TABLE */}
        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#16161C] shadow-2xl scrollbar-none">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 sm:p-5 w-24 text-center">Visual Poster</th>
                <th className="p-4 sm:p-5">Feature Title</th>
                <th className="p-4 sm:p-5">Genre</th>
                <th className="p-4 sm:p-5">Language</th>
                <th className="p-4 sm:p-5">Standard Rating</th>
                <th className="p-4 sm:p-5 text-right">Console Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300 font-medium">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <tr key={movie._id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Poster Element CDN Cell */}
                    <td className="p-4 text-center shrink-0">
                      <img
                        src={movie.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop"}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-lg bg-gray-900 border border-white/5 shadow-md mx-auto"
                      />
                    </td>

                    {/* Movie Title */}
                    <td className="p-4 sm:p-5 font-bold text-white max-w-[160px] truncate">
                      {movie.title}
                    </td>

                    {/* Genres Dynamic Array Fallback Rendering mapping layout lines safely */}
                    <td className="p-4 sm:p-5 text-gray-400 max-w-[150px] truncate">
                      {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "General"}
                    </td>

                    {/* Language */}
                    <td className="p-4 sm:p-5 text-gray-400">
                      {movie.language || "English"}
                    </td>

                    {/* Rating Benchmarks */}
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-1 font-bold text-white">
                        <span className="text-[#5B50E6] text-sm">★</span>
                        <span>{movie.rating ? Number(movie.rating).toFixed(1) : "5.0"}</span>
                      </div>
                    </td>

                    {/* Interaction Buttons Control row stack handles */}
                    <td className="p-4 sm:p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(movie)}
                          className="text-xs font-bold text-white bg-[#5B50E6]/10 hover:bg-[#5B50E6] border border-[#5B50E6]/20 px-3 py-1.5 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMovie(movie._id)}
                          className="text-xs font-bold text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-sm text-gray-500">
                    No cinematic movies entities currently registered inside repository files logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* HIGH-FIDELITY RESPONSIVE MODAL GATEWAY WRAPPING FORM */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MovieForm 
            movie={selectedMovie} 
            onSubmit={formSubmitHandler} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>

      </div>
    </AdminLayout>
  );
};

export default Movies;