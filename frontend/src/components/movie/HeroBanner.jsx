// File Path: components/movie/HeroBanner.jsx
const HeroBanner = ({ adminImageUrl }) => {
  // Figma pure visual mapping poster theme fallback URL
  const defaultBanner = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop";
  const bannerSrc = adminImageUrl || defaultBanner;

  return (
    // Edge-to-edge direct layout wrapper container (No layout margins, no extra gaps)
    <div className="w-full h-[220px] sm:h-[280px] md:h-[340px] relative overflow-hidden bg-[#0A0A0C]">
      
      {/* Full-width stretched poster banner image controlled via Admin inputs */}
      <img 
        src={bannerSrc} 
        alt="Featured Movie Banner" 
        className="w-full h-full object-cover object-center"
      />

      {/* Subtle screen overlay shadow for smooth search box visualization */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

      {/* Figma Precise Floating Search Glass Icon Overlay */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          type="button"
          aria-label="Search"
          className="p-2 bg-black/10 hover:bg-black/30 backdrop-blur-sm rounded-full text-white transition-all active:scale-95"
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default HeroBanner;