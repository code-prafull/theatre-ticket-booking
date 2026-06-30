// File Path: pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [bookingDetails, setBookingDetails] = useState({
    show: null,
    selectedSeats: [],
    totalAmount: 0
  });

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    loadCheckoutContext();
  }, [location.state]);

  const loadCheckoutContext = async () => {
    try {
      // 1. Fetch authenticated database user details
      const profileResponse = await API.get("/auth/profile");
      const dbUser = profileResponse?.data?.data || profileResponse?.data;
      if (dbUser) {
        setUser({
          id: dbUser._id || dbUser.id || "",
          name: dbUser.name || "User Node",
          email: dbUser.email || ""
        });
      }

      // 2. Extract state parameters parsed straight out of previous layout screens selection grids
      let targetShow = location.state?.show;
      let targetSeats = location.state?.selectedSeats || [];
      let targetAmount = location.state?.totalAmount || 0;

      // 🔥 ANTI-CRASH STRATEGY: Handle page refreshes or state parameter drops flawlessly
      if (!targetShow) {
        const cachedSessionData = sessionStorage.getItem("active_checkout_cache_node");
        if (cachedSessionData) {
          const parsedCache = JSON.parse(cachedSessionData);
          targetShow = parsedCache.show;
          targetSeats = parsedCache.selectedSeats;
          targetAmount = parsedCache.totalAmount;
        }
      } else {
        sessionStorage.setItem("active_checkout_cache_node", JSON.stringify({
          show: targetShow,
          selectedSeats: targetSeats,
          totalAmount: targetAmount
        }));
      }

      if (!targetShow || !targetShow._id) {
        toast.error("Show data parameters are completely missing. Please re-select seats.");
        navigate("/");
        return;
      }

      setBookingDetails({
        show: targetShow,
        selectedSeats: targetSeats,
        totalAmount: targetAmount
      });

    } catch (err) {
      console.error("Checkout validation failure logs:", err);
      if (err?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
      } else {
        toast.error("Session identity check timed out.");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const executeOrderSubmission = async () => {
    const { show, selectedSeats, totalAmount } = bookingDetails;

    if (!show || !show._id) {
      toast.error("Missing show identification parameter validation.");
      return;
    }

    try {
      toast.loading("Processing order verification...", { id: "pay_loader" });

      // 🔥 DUMMY FLOW: Skip actual backend booking creation for demo purposes
      // Create a dummy booking object locally
      const dummyBooking = {
        _id: "dummy_" + Date.now(),
        user: user.id,
        show: show,
        seats: selectedSeats,
        totalAmount: totalAmount,
        paymentStatus: "Paid",
        createdAt: new Date().toISOString()
      };

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Booking confirmed! Redirecting to ticket...", { id: "pay_loader" });
      sessionStorage.removeItem("active_checkout_cache_node");

      // Direct to ticket page with dummy data
      navigate(`/ticket/${dummyBooking._id}`, {
        state: {
          booking: dummyBooking,
          show: show,
        },
      });
    } catch (err) {
      console.error("Booking error log:", err);
      toast.error("Transaction failed. Please try again.", { id: "pay_loader" });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-x-hidden select-none">
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      <div className="w-full flex-1 pt-24 lg:pt-32 pb-[100px] px-4 sm:px-6">
        <div className="w-full max-w-xl mx-auto bg-[#111116]/90 border border-white/[0.05] p-6 sm:p-8 rounded-3xl shadow-2xl relative backdrop-blur-md text-left">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#4B42E1]/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="border-b border-white/5 pb-4 mb-6">
            <span className="text-[9px] font-black font-mono text-[#4B42E1] uppercase tracking-widest">Gateway Verified Node</span>
            <h2 className="text-xl font-black text-white tracking-tight mt-0.5">Secure Checkout Overview</h2>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Assigned Client Identity</span>
              <p className="text-sm font-black text-gray-200">{user.name} <span className="text-xs text-gray-500 font-medium">({user.email})</span></p>
            </div>

            <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Movie Selected</span>
              <p className="text-base font-black text-white tracking-tight">{bookingDetails.show?.movie?.title || "Cinematic Asset Screen Allocation"}</p>
            </div>

            <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Venue & Showtimes Info</span>
              <p className="text-xs font-bold text-gray-300">🏟️ {bookingDetails.show?.theatre?.name || "Multiplex complex venue structure"}</p>
              <p className="text-xs font-black text-[#4B42E1] mt-0.5 font-mono">🕒 {bookingDetails.show?.time || "Selected Session Schedule"}</p>
            </div>

            <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Allocated Seating Coordinates</span>
              <div className="flex gap-2 items-center mt-1.5 flex-wrap">
                {bookingDetails.selectedSeats?.map(seat => (
                  <span key={seat} className="px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-xl font-mono text-xs font-black text-[#4B42E1] shadow-inner">
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl flex items-center justify-between mt-6 shadow-md">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Aggregate Bill</span>
                <span className="text-[11px] font-bold text-gray-500 mt-0.5">Inclusive of cloud services tax metrics</span>
              </div>
              <span className="text-xl font-black font-mono text-white tracking-tight">
                ₹{bookingDetails.totalAmount}
              </span>
            </div>

            <div className="w-full mt-4">
              <button
                type="button"
                onClick={executeOrderSubmission}
                className="w-full bg-[#4B42E1] hover:bg-[#382fd0] text-white text-xs font-black py-4 rounded-xl text-center uppercase tracking-widest shadow-lg shadow-[#4B42E1]/20 active:scale-[0.99] transition-all duration-150"
              >
                Proceed to Payment Gateway 💳
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-[#07070A] border-t border-white/[0.05] flex items-center justify-around px-4">
        <Navbar />
      </div>
    </div>
  );
};

export default Checkout;