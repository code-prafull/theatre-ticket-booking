// File Path: components/admin/StatsCard.jsx
const StatsCard = ({
  title,
  value,
  color = "bg-[#5B50E6]", // Backward compatibility defaults mapping intact
}) => {
  
  // Custom Icon Selector fallback text system mapping matching generic admin tags dynamically
  const getCardIcon = (label) => {
    const lowercaseTitle = label?.toLowerCase() || "";
    if (lowercaseTitle.includes("movie")) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
        </svg>
      );
    }
    if (lowercaseTitle.includes("booking") || lowercaseTitle.includes("revenue") || lowercaseTitle.includes("sale")) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    }
    // Generic Dashboard Overview default tracker svg
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    );
  };

  return (
    // Premium Translucent Enterprise Monitoring block metric layout component
    <div className="w-full bg-[#16161C] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 text-left relative overflow-hidden select-none transition-all hover:border-white/10 shadow-xl group">
      
      {/* Dynamic top metric panel alignment wrapper */}
      <div className="w-full flex items-center justify-between gap-4 relative z-10">
        
        {/* Title Metric Meta label line */}
        <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block truncate">
          {title}
        </span>
        
        {/* Dynamic Glowing Accent Floating Icon wrapper element */}
        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-colors group-hover:text-white group-hover:bg-[#5B50E6]/10 group-hover:border-[#5B50E6]/20">
          {getCardIcon(title)}
        </div>

      </div>

      {/* CORE MEASURED BIG VALUE COUNTER FIELD */}
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
          {value}
        </h2>
      </div>

      {/* Subtle linear card track line giving premium SaaS panel accent look */}
      <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-gray-500/20 to-transparent group-hover:via-[#5B50E6]/50 transition-all duration-300" />
      
    </div>
  );
};

export default StatsCard;