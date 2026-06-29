// File Path: components/shared/Loader.jsx
const Loader = () => {
  return (
    // Immersive backdrop container centering elements perfectly on both desktop & mobile screens
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white lg:bg-[#0D0D11] select-none pointer-events-none">
      
      <div className="flex flex-col items-center justify-center gap-4">
        
        {/* Modern Clean Mechanical Spinner Object */}
        <div className="w-12 h-12 rounded-full border-[3.5px] border-gray-200 lg:border-white/10 border-t-[#5B50E6] lg:border-t-[#766bf7] animate-spin" />
        
        {/* Animated Pulse Subtitle Tracker */}
        <span className="text-xs font-extrabold tracking-[0.25em] text-[#5B50E6] lg:text-purple-400 uppercase animate-pulse mt-2">
          Loading Content
        </span>

      </div>

    </div>
  );
};

export default Loader;