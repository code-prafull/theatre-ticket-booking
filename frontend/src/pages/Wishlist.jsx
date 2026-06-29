// File Path: pages/Wishlist.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWishlist, toggleWishlist } from "../services/wishlistApi";
import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";

const Wishlist = () => {
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const { data } = await fetchWishlist();
        const list = data?.data || data || [];
        setFavs(list);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, []);

  const handleRemove = (id, e) => {
    e.stopPropagation(); // Avoid triggering route changes on card layouts
    setFavs(favs.filter((item) => item._id !== id));
    toggleWishlist(id).catch(() => {});
  };

  if (loading) return <Loader />;

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-white text-white font-sans antialiased overflow-hidden select-none">
      
      {/* HEADER PANEL */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04]">
        <Navbar />
      </div>

      {/* WORKSPACE */}
      <div className="w-full flex-1 overflow-y-auto h-full pt-24 lg:pt-28 pb-[90px] px-4 sm:px-6 scrollbar-none">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-left relative">
          
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#5B50E6]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-black text-[#5B50E6] uppercase tracking-widest">Saved Catalog</span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">My Wishlist Matrix</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-2">
            {favs.length > 0 ? (
              favs.map((movie) => (
                <div 
                  key={movie._id} 
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  className="flex flex-col cursor-pointer group"
                >
                  <div className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#12121A] border border-white/[0.05] relative transition-all duration-300 group-hover:border-[#5B50E6]/40 group-hover:-translate-y-1.5">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    
                    {/* Top Right trash element button hook */}
                    <button 
                      onClick={(e) => handleRemove(movie._id, e)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center text-xs text-red-400 border border-white/5 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                    >
                      ✕
                    </button>

                    <div className="absolute top-2.5 left-2.5 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm border border-white/5 rounded text-[9px] font-black font-mono">
                      ★ {movie.rating}
                    </div>
                  </div>
                  <h4 className="text-xs font-black tracking-tight truncate mt-2.5 text-left text-gray-200 group-hover:text-[#5B50E6] transition-colors">{movie.title}</h4>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-xs font-bold text-gray-500">
                Your cinematic wishlist matrix metadata logs are empty.
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-[#07070A] border-t border-white/[0.05] flex items-center justify-around px-4">
        <Navbar />
      </div>

    </div>
  );
};

export default Wishlist;