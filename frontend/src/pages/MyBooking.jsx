// File Path: pages/MyBooking.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchUserDashboardAndBookings();
  }, []);

  const fetchUserDashboardAndBookings = async () => {
    try {
      // Step 1: Sync User Profile metadata attributes from database cache cluster
      const profileResponse = await API.get("/auth/profile");
      const dbUser = profileResponse?.data?.data || profileResponse?.data;
      if (dbUser) {
        setUser({
          name: dbUser.name,
          email: dbUser.email
        });
      }

      // Step 2: Fetch active booking documents dynamically from MongoDB
      const bookingResponse = await API.get("/bookings/my-bookings");
      const fetchedBookings = bookingResponse?.data?.data || bookingResponse?.data || [];
      setBookings(fetchedBookings);

    } catch (err) {
      console.log("Error binding live profiles dashboard asset logs:", err);
      if (err?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error(err?.response?.data?.message || "Connecting with cloud database infrastructure timed out.");
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = (name) => {
    if (!name) return "??";
    const slices = name.trim().split(" ");
    if (slices.length >= 2) {
      return `${slices[0][0]}${slices[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-x-hidden select-none pb-[100px] lg:pb-0">
      
      {/* GLOBAL FIXED NAVIGATION BAR LAYER */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* VIEWPORT AREA CONSOLE CONTAINER BOX */}
      <div className="w-full flex-1 pt-24 lg:pt-28 px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-left relative">
          
          <div className="absolute top-[-100px] left-1/3 w-[500px] h-[500px] bg-[#5B50E6]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* DYNAMIC USER BIO IDENTITY METRICS CARD */}
          {user.email && (
            <div className="w-full bg-gradient-to-r from-[#111116] to-[#161622]/80 border border-white/[0.05] p-6 rounded-2xl shadow-xl flex items-center gap-5 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#5B50E6] flex items-center justify-center text-xl font-black shadow-lg text-white font-mono uppercase shrink-0">
                {getUserInitials(user.name)}
              </div>
              
              <div className="flex flex-col text-left">
                <h2 className="text-lg font-black tracking-tight text-white leading-tight">{user.name}</h2>
                <span className="text-xs text-gray-400 font-medium mt-1">{user.email}</span>
                <div className="flex items-center gap-4 mt-2.5">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-black text-[#5B50E6] uppercase tracking-wider">
                    Verified Client Account Node
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS LIST LOGS CONTAINER */}
          <div className="w-full flex flex-col gap-3.5 mt-2">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider pl-0.5 font-mono">
              Active Booking Ledger ({bookings.length})
            </h3>

            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div key={b._id} className="w-full bg-[#111116]/90 border border-white/[0.04] p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl backdrop-blur-md hover:border-white/10 transition-all">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[9px] font-black font-mono text-[#5B50E6] tracking-widest uppercase">
                      Ticket ID: {b._id}
                    </span>
                    <h4 className="text-base font-black text-white tracking-tight mt-1">
                      {b.show?.movie?.title || "Movie presentation allocation"}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      🏟️ {b.show?.theatre?.name || "Multiplex Complex Screen"} • <span className="font-mono text-[#5B50E6] font-extrabold">{b.show?.time || "Selected Session"}</span>
                    </p>
                    
                    <div className="flex gap-2 items-center mt-3.5 flex-wrap">
                      {b.seats?.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg font-mono text-[10px] font-black text-gray-300 shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 sm:text-right border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 w-full sm:w-auto">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider font-mono">Total Transaction Amount</span>
                    <span className="text-base font-black font-mono text-white mt-1">₹{b.totalAmount}</span>
                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mt-3 uppercase tracking-widest font-mono">
                      Pass Issued ✓
                    </span>

                  <button
                    type="button"
                    onClick={() => navigate(`/ticket/${b._id}`)}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#5B50E6] hover:bg-[#493fd3] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#5B50E6]/20 active:scale-[0.99]"
                  >
                    View Ticket (QR + PDF)
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-[#111116]/40 rounded-2xl border border-white/[0.03] text-xs font-bold text-gray-500">
                No active movie reservations parameters found in database documents.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION STRIP */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-[#07070A] border-t border-white/[0.05] flex items-center justify-around px-4">
        <Navbar />
      </div>

    </div>
  );
};

export default MyBooking;