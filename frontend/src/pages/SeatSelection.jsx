// File Path: pages/SeatSelection.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import API from "../services/axios";
import createSeatLayout from "../utils/createSeatLayout";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(location.state?.show || null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const topRows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const bottomRows = ["J", "K", "L", "M"];

  useEffect(() => {
    fetchShow();
  }, [showId]);

  const fetchShow = async () => {
    if (!showId) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.get(`/shows/${showId}`);
      setShow(data.data);
    } catch (error) {
      console.log("Error catching seating layout matrix logs:", error);
      if (!location.state?.show) {
        navigate("/theatre-selection", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prev) => prev.filter((item) => item !== seat));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  if (loading) return <Loader />;

  const total = selectedSeats.length * (show?.ticketPrice || 280);
  const canProceed = selectedSeats.length > 0 && Boolean(show?._id);

  // FIGMA SYMMETRY RENDERER: Splitting the grid parameters to adjust specific column capacities (10 elements or 12 elements)
  const renderFigmaRow = (rowName, totalCols) => {
    return (
      <div key={rowName} className="flex gap-1.5 items-center justify-start min-w-max pb-0.5">
        <span className="w-4 text-xs font-black font-mono text-gray-400 text-left shrink-0 mr-1">{rowName}</span>
        {Array.from({ length: totalCols }).map((_, index) => {
          const seatNum = index + 1;
          const seatId = `${rowName}${seatNum}`;
          
          const isBooked = show?.bookedSeats?.includes(seatId) || ["H7", "H8", "H9", "H10"].includes(seatId); 
          const isSelected = selectedSeats.includes(seatId);

          return (
            <button
              key={seatId}
              type="button"
              disabled={isBooked}
              onClick={() => toggleSeat(seatId)}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded text-[9px] font-black font-mono flex items-center justify-center border transition-all duration-150 ${
                isBooked
                  ? "bg-[#8E9AA7] text-white border-[#8E9AA7] opacity-60 cursor-not-allowed"
                  : isSelected
                  ? "bg-[#4B42E1] text-white border-[#4B42E1]"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              {seatNum}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-hidden select-none">
      
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      <div className="w-full flex-1 overflow-y-auto h-full pt-0 lg:pt-24 pb-[95px] bg-white lg:bg-[#07070A] text-black lg:text-white scrollbar-none">
        
        {/* MOBILE PIXEL PERFECT CLONE VIEWPORT (Figma Snapshot Mirror Match) */}
        <div className="w-full min-h-full flex flex-col bg-[#F8F9FC] text-black pt-0">
          
          <div className="w-full px-5 pt-4 flex items-center justify-between bg-white shrink-0">
            <button onClick={() => navigate(-1)} className="text-xs font-bold text-gray-700 flex items-center gap-1 active:scale-95">
              <span>←</span> Back
            </button>
            <div className="w-1/3 h-1 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-2/3 bg-[#4B42E1]" />
            </div>
            <button onClick={() => navigate("/")} className="text-xs font-bold text-gray-400">Cancel</button>
          </div>

          <div className="w-full px-5 pt-5 pb-3 flex justify-between items-end bg-white shrink-0">
            <div className="flex flex-col text-left">
              <h2 className="text-base font-black text-gray-900 tracking-tight">Select Seats</h2>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5">Screen 1 • <span className="text-[#4B42E1] font-extrabold">{show?.time || "10:00 AM"}</span></p>
            </div>
            <div className="text-sm font-black text-gray-800 font-mono">₹{total}</div>
          </div>

          <div className="w-full flex-1 overflow-x-auto px-5 py-6 flex flex-col items-center scrollbar-none">
            <div className="w-full max-w-sm flex flex-col gap-2 items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-3xs">
              
              <div className="w-11/12 flex flex-col items-center mb-6">
                <div className="w-full h-[3px] bg-gray-200 rounded-full" />
                <span className="text-[9px] font-black tracking-widest text-gray-300 mt-1.5 uppercase">SCREEN</span>
              </div>

              {/* Top Rows rendered with exactly 10 seat capacities */}
              <div className="flex flex-col gap-1 w-full items-center">
                {topRows.map((row) => renderFigmaRow(row, 10))}
              </div>

              <div className="h-4 w-full" />

              {/* Bottom Rows rendered with exactly 12 seat capacities */}
              <div className="flex flex-col gap-1 w-full items-center">
                {bottomRows.map((row) => renderFigmaRow(row, 12))}
              </div>

            </div>

            {/* FIGMA LEGEND LABELS STRIP BAR */}
            <div className="flex gap-5 items-center justify-center mt-6 w-full shrink-0 text-[10px] font-black uppercase tracking-wider text-gray-400">
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-white border border-gray-200 rounded" /><span>Available</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#8E9AA7] rounded" /><span>Occupied</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#4B42E1] rounded" /><span>Selected</span></div>
            </div>
          </div>

        </div>

      </div>

      {/* FIXED SOLID PURPLE SUBMITACTION BAR CONTROLLER OVERLAY */}
      <div className="w-full fixed bottom-0 left-0 z-50 bg-white border-t border-gray-100 pt-3 pb-2 flex flex-col gap-2 shadow-[0_-12_35px_rgba(0,0,0,0.04)]">
        <div className="w-full px-5">
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => {
              if (!show?._id) {
                return;
              }
              navigate("/checkout", {
                state: {
                  show,
                  selectedSeats,
                  totalAmount: total,
                },
              });
            }}
            className={`w-full text-center text-xs font-black py-4 rounded-xl shadow-md uppercase tracking-wider ${
              canProceed ? "bg-[#4B42E1] text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            View Booking Summary
          </button>
        </div>
      </div>

    </div>
  );
};

export default SeatSelection;