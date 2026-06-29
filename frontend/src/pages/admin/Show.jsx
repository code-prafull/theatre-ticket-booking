// File Path: pages/admin/Show.jsx
import { useEffect, useState } from "react";
import API from "../../services/axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/shared/Modal";
import Loader from "../../components/shared/Loader";
import toast from "react-hot-toast";

const Show = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal display control states tracking
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    movie: "",
    theatre: "",
    showDate: "",
    showTime: "",
    ticketPrice: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [showsRes, moviesRes, theatresRes] = await Promise.all([
        API.get("/shows"),
        API.get("/movies"),
        API.get("/theatres"),
      ]);
      setShows(showsRes.data.data || []);
      setMovies(moviesRes.data.data || []);
      setTheatres(theatresRes.data.data || []);
    } catch (err) {
      console.log("Error binding administrative show configurations:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await API.get("/shows");
      setShows(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Direct API calling structure to push new show allocation metrics
      await API.post("/shows", {
        ...form,
        ticketPrice: Number(form.ticketPrice),
      });
      toast.success("Show Created Successfully");
      setIsModalOpen(false);
      setForm({ movie: "", theatre: "", showDate: "", showTime: "", ticketPrice: "" });
      fetchShows();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add show schedule");
    }
  };

  const deleteShow = async (id) => {
    if (!window.confirm("Are you absolute sure you want to remove this show profile?")) return;
    try {
      await API.delete(`/shows/${id}`);
      toast.success("Show Deleted");
      fetchShows();
    } catch (err) {
      console.log(err);
      toast.error("Deletion lifecycle failure execution entry.");
    }
  };

  if (loading) return <Loader />;

  const inputClass = "w-full bg-[#121216] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5B50E6] transition-all";

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-6 text-left select-none">
        
        {/* Dynamic Section Heading Area */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Manage Show Timings
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Configure timeline matrices, assign prices, and bind feature screenings.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95"
          >
            + Add Show Timing
          </button>
        </div>

        {/* DATA METRICS LOGGING GRID MATRIX TABLE */}
        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#16161C] shadow-2xl scrollbar-none">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 sm:p-5">Movie Feature</th>
                <th className="p-4 sm:p-5">Theatre Arena</th>
                <th className="p-4 sm:p-5">Date</th>
                <th className="p-4 sm:p-5">Time Slot</th>
                <th className="p-4 sm:p-5">Ticket Price</th>
                <th className="p-4 sm:p-5 text-right">Control Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300 font-medium">
              {shows.length > 0 ? (
                shows.map((show) => (
                  <tr key={show._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-white max-w-[180px] truncate">
                      {show.movie?.title || "Unknown Feature Film"}
                    </td>
                    <td className="p-4 sm:p-5 text-gray-400 max-w-[180px] truncate">
                      📍 {show.theatre?.name || "Cinema Center Hub"}
                    </td>
                    <td className="p-4 sm:p-5">
                      {new Date(show.showDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[#5B50E6] lg:text-purple-400 font-bold">
                      {show.showTime}
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-white">
                      ₹{show.ticketPrice}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => deleteShow(show._id)}
                        className="text-xs font-bold text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-sm text-gray-500">
                    No cinematic showtimes scheduled currently inside dashboard registry records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL CONFIGURATION PORTAL FOR INJECTING FRESH TIMELINES */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-5 text-left p-2">
            
            <div className="w-full border-b border-white/5 pb-3">
              <h3 className="text-base font-extrabold text-white tracking-tight">Create Fresh Show Assignment</h3>
              <p className="text-xs text-gray-400 mt-0.5">Map active titles to theatre networks directly with standard timestamps pricing variables.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              
              {/* Select Movie Dropdown */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Select Active Movie</label>
                <select 
                  name="movie" 
                  value={form.movie} 
                  onChange={changeHandler} 
                  className={`${inputClass} text-white cursor-pointer`}
                  required
                >
                  <option className="bg-[#16161C] text-gray-500" value="">-- Choose Film --</option>
                  {movies.map(m => (
                    <option key={m._id} className="bg-[#16161C] text-white" value={m._id}>{m.title}</option>
                  ))}
                </select>
              </div>

              {/* Select Theatre Dropdown */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Select Arena Theatre</label>
                <select 
                  name="theatre" 
                  value={form.theatre} 
                  onChange={changeHandler} 
                  className={`${inputClass} text-white cursor-pointer`}
                  required
                >
                  <option className="bg-[#16161C] text-gray-500" value="">-- Choose Cinema Complex --</option>
                  {theatres.map(t => (
                    <option key={t._id} className="bg-[#16161C] text-white" value={t._id}>{t.name} (📍 {t.location})</option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Show Date</label>
                <input 
                  type="date" 
                  name="showDate" 
                  value={form.showDate} 
                  onChange={changeHandler} 
                  className={`${inputClass} cursor-pointer scheme-dark`} 
                  required 
                />
              </div>

              {/* Time Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Show Timestamp</label>
                <input 
                  type="text" 
                  name="showTime" 
                  value={form.showTime} 
                  onChange={changeHandler} 
                  placeholder="e.g. 10:30 AM or 07:45 PM" 
                  className={inputClass} 
                  required 
                />
              </div>

              {/* Price Input */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Ticket Flat Price Rate (₹)</label>
                <input 
                  type="number" 
                  name="ticketPrice" 
                  value={form.ticketPrice} 
                  onChange={changeHandler} 
                  placeholder="250" 
                  className={inputClass} 
                  required 
                />
              </div>

            </div>

            {/* Form footer interaction buttons alignment row */}
            <div className="w-full border-t border-white/5 pt-4 mt-2 flex justify-end gap-3 items-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-bold py-3 px-6 rounded-xl transition-all"
              >
                Cancel & Close
              </button>
              <button
                type="submit"
                className="bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
              >
                Publish Schedule
              </button>
            </div>

          </form>
        </Modal>

      </div>
    </AdminLayout>
  );
};

export default Show;