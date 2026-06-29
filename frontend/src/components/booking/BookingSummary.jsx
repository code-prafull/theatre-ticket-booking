// File Path: components/booking/BookingSummary.jsx
const BookingSummary = ({
  movie,
  theatre,
  seats = [],
  total,
}) => {
  return (
    // Responsive Ticket Receipt Wrapper Shell (Adapts smoothly to both black and white modes)
    <div className="w-full bg-transparent text-left select-none font-sans">
      
      {/* Container Heading Label */}
      <h3 className="text-sm font-extrabold text-black lg:text-white uppercase tracking-wider mb-4 hidden lg:block">
        Order Metadata
      </h3>

      {/* Ticket Details Core Grid Block Layout */}
      <div className="w-full flex flex-col gap-4 bg-gray-50 lg:bg-white/5 border border-gray-100 lg:border-white/5 p-5 rounded-2xl">
        
        {/* Movie Info Field */}
        <div className="w-full flex flex-col border-b border-dashed border-gray-200 lg:border-white/5 pb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Selected Feature Movie
          </span>
          <span className="text-sm font-extrabold text-black lg:text-gray-200 mt-1 truncate">
            {movie || "Loading title..."}
          </span>
        </div>

        {/* Theatre Arena Field */}
        <div className="w-full flex flex-col border-b border-dashed border-gray-200 lg:border-white/5 pb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Cinema Venue Arena
          </span>
          <span className="text-xs font-bold text-gray-500 lg:text-gray-400 mt-1 truncate">
            {theatre || "Loading location network..."}
          </span>
        </div>

        {/* Seats Allocation Matrix Field */}
        <div className="w-full flex flex-col pb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Allocated Ticket Seats
          </span>
          <span className="text-xs font-extrabold text-[#5B50E6] lg:text-purple-400 mt-1 tracking-wide truncate">
            {seats.length > 0 ? seats.join(", ") : "No seats selected"}
          </span>
        </div>

      </div>

      {/* FINAL PRICING ROW PANEL: Clear split billing configuration details */}
      <div className="w-full flex items-center justify-between mt-5 px-1 bg-[#F5F5F7] lg:bg-white/5 border border-transparent lg:border-white/5 p-4 rounded-xl">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
            Total Chargeable Payable
          </span>
          <span className="text-[10px] font-medium text-gray-400 mt-1">
            Inclusive of core service taxes
          </span>
        </div>
        
        {/* Dynamic Total Bill */}
        <div className="text-right shrink-0">
          <span className="text-xl font-black text-black lg:text-white tracking-tight">
            ₹{total || 0}
          </span>
        </div>
      </div>

    </div>
  );
};

export default BookingSummary;