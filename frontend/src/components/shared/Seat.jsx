// File Path: components/shared/Seat.jsx
const Seat = ({
  seat,
  selected,
  booked,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={booked}
      onClick={onClick}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold tracking-tighter transition-all duration-150 select-none
        ${
          booked
            ? "bg-gray-200 lg:bg-white/5 text-gray-400 lg:text-gray-600 cursor-not-allowed opacity-40 cross-through"
            : selected
            ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/30 transform scale-95"
            : "bg-[#F3F3F5] lg:bg-white/5 border border-gray-200 lg:border-white/10 text-black lg:text-gray-300 hover:border-[#5B50E6] lg:hover:border-purple-500 hover:text-[#5B50E6] lg:hover:text-purple-400 active:scale-90"
        }
      `}
      title={booked ? `Seat ${seat} (Booked)` : `Seat ${seat}`}
    >
      {/* Seat designation layout string label (e.g. A1, E12) */}
      {seat}
    </button>
  );
};

export default Seat;