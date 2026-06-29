// File Path: pages/admin/Theatres.jsx
import { useEffect, useState } from "react";
import API from "../../services/axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/shared/Modal";
import Loader from "../../components/shared/Loader";
import toast from "react-hot-toast";

const Theatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // FIXED CONFIGURATION: Added backend schema required fields
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    totalScreens: "",
  });

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const { data } = await API.get("/theatres");
      setTheatres(data.data || []);
    } catch (err) {
      console.log("Error catching theatre network assets lists:", err);
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Sending all required fields to satisfy backend Mongoose validators
      await API.post("/theatres", {
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        totalScreens: Number(form.totalScreens),
      });
      
      toast.success("Theatre Complex Registered Successfully!");
      setIsModalOpen(false);
      setForm({ name: "", address: "", city: "", state: "", totalScreens: "" });
      fetchTheatres();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failure registering operational complex");
    }
  };

  const deleteTheatre = async (id) => {
    if (!window.confirm("Are you sure you want to completely clear this operational theatre?")) return;
    try {
      await API.delete(`/theatres/${id}`);
      toast.success("Theatre Network Removed");
      fetchTheatres();
    } catch (err) {
      console.log(err);
      toast.error("Deletion cycle failure execution error.");
    }
  };

  if (loading) return <Loader />;

  const inputClass = "w-full bg-[#121216] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5B50E6] focus:ring-1 focus:ring-[#5B50E6]/30 transition-all";

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-6 text-left select-none">
        
        {/* Header Action section */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Operational Theatres Complex
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Audit regional broadcast hubs, monitor available hall screens capacity parameters, and hook new locations.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95"
          >
            + Register Complex Hub
          </button>
        </div>

        {/* DATA DISPLAY GRID TABLE */}
        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#16161C] shadow-2xl scrollbar-none">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 sm:p-5">Theatre Complex Venue</th>
                <th className="p-4 sm:p-5">Street Address</th>
                <th className="p-4 sm:p-5">City / Region</th>
                <th className="p-4 sm:p-5">Hall Capacity Screens</th>
                <th className="p-4 sm:p-5 text-right">Console Infrastructure Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300 font-medium">
              {theatres.length > 0 ? (
                theatres.map((theatre) => (
                  <tr key={theatre._id} className="hover:bg-white/[0.02] transition-colors">
                    
                    <td className="p-4 sm:p-5 font-bold text-white max-w-[180px] truncate">
                      🏢 {theatre.name}
                    </td>

                    <td className="p-4 sm:p-5 text-gray-400 max-w-[200px] truncate">
                      {theatre.address || "N/A"}
                    </td>

                    <td className="p-4 sm:p-5 text-gray-300">
                      {theatre.city}{theatre.state ? `, ${theatre.state}` : ""}
                    </td>

                    <td className="p-4 sm:p-5 font-mono text-[#5B50E6] lg:text-purple-400 font-bold text-sm">
                      {theatre.totalScreens || "4"} Active Screens
                    </td>

                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => deleteTheatre(theatre._id)}
                        className="text-xs font-bold text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
                      >
                        Decommission
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-16 text-sm text-gray-500">
                    No active cinema arenas complexes registered inside administrative databases.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL CONFIGURATION GATEWAY BOX */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-5 text-left p-1.5">
            
            <div className="w-full border-b border-white/5 pb-3">
              <h3 className="text-base font-extrabold text-white tracking-tight">Register New Theatre Arena</h3>
              <p className="text-xs text-gray-400 mt-0.5">Inject functional regional coordinates and satisfy backend validator endpoints securely.</p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              
              {/* Complex Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Theatre Brand Complex Name</label>
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                  placeholder="e.g. PVR: South City Mall"
                  className={inputClass}
                  required
                />
              </div>

              {/* Address Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Street Address</label>
                <input 
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={changeHandler}
                  placeholder="e.g. 375 Prince Anwar Shah Road"
                  className={inputClass}
                  required
                />
              </div>

              {/* City and State Dual Row Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">City</label>
                  <input 
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={changeHandler}
                    placeholder="e.g. Kolkata"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">State</label>
                  <input 
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={changeHandler}
                    placeholder="e.g. West Bengal"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Screens Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-0.5">Available Screens Capacity</label>
                <input 
                  type="number"
                  name="totalScreens"
                  value={form.totalScreens}
                  onChange={changeHandler}
                  placeholder="e.g. 4"
                  min="1"
                  className={inputClass}
                  required
                />
              </div>

            </div>

            {/* Modal actions panel footer */}
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
                Provision Complex Hub
              </button>
            </div>

          </form>
        </Modal>

      </div>
    </AdminLayout>
  );
};

export default Theatres;