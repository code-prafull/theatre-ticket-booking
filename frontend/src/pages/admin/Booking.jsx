// File Path: pages/admin/Booking.jsx
import { useEffect, useState } from "react";
import API from "../../services/axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Loader from "../../components/shared/Loader";
import toast from "react-hot-toast";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/admin/bookings");
      setBookings(data.data || []);
    } catch (err) {
      console.log("Error catching transaction records:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchBookings();
    toast.success("Records Synchronized");
  };

  if (loading) return <Loader />;

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-6 text-left select-none">
        
        {/* Dynamic Section Heading Bar */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              User Bookings Ledger
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Audit global cinema tickets allocations, verify transaction status codes, and cross-check seats parameters.
            </p>
          </div>
          
          <button
            type="button"
            onClick={handleRefresh}
            className="w-full sm:w-auto bg-[#5B50E6] hover:bg-[#493fd3] text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-95"
          >
            Refresh Records
          </button>
        </div>

        {/* COMPREHENSIVE RECORDS MATRIX DISPLAY MODULE */}
        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#16161C] shadow-2xl scrollbar-none">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 sm:p-5">Customer User</th>
                <th className="p-4 sm:p-5">Movie Feature</th>
                <th className="p-4 sm:p-5">Theatre Complex</th>
                <th className="p-4 sm:p-5">Allocated Seats</th>
                <th className="p-4 sm:p-5">Gross Amount</th>
                <th className="p-4 sm:p-5 text-right">Gateway Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300 font-medium">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-sm text-gray-500 font-medium">
                    No consumer transaction bookings currently tracked inside ledger metadata.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* User Profile */}
                    <td className="p-4 sm:p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">
                          {booking.user?.name || "Anonymous Guest"}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                          {booking.user?.email || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Movie Title */}
                    <td className="p-4 sm:p-5 font-bold text-gray-200 max-w-[150px] truncate">
                      {booking.movie?.title || booking.show?.movie?.title || "Unknown Title"}
                    </td>

                    {/* Theatre Arena */}
                    <td className="p-4 sm:p-5 text-gray-400 max-w-[180px] truncate">
                      📍 {booking.theatre?.name || booking.show?.theatre?.name || "Cinema Venue Hub"}
                    </td>

                    {/* Seats Matrix Array output */}
                    <td className="p-4 sm:p-5 font-mono text-[#5B50E6] lg:text-purple-400 font-bold max-w-[120px] truncate">
                      {Array.isArray(booking.seats) ? booking.seats.join(", ") : booking.seats || "-"}
                    </td>

                    {/* Pricing total charges */}
                    <td className="p-4 sm:p-5 font-extrabold text-white text-sm">
                      ₹{booking.totalAmount}
                    </td>

                    {/* Gateway Payment Status Badge alignment columns */}
                    <td className="p-4 sm:p-5 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                          booking.paymentStatus === "Paid"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {booking.paymentStatus || "Pending"}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Booking;