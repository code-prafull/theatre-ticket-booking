// File Path: pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Real dynamic initialization matching login fields completely from DB
  const [user, setUser] = useState({
    name: "",
    email: "",
    college: "",
    degree: ""
  });

  useEffect(() => {
    fetchProfileFromDB();
  }, []);

  const fetchProfileFromDB = async () => {
    try {
      const response = await API.get("/auth/profile"); 
      const dbUser = response?.data?.data || response?.data;

      if (dbUser && (dbUser.name || dbUser.email)) {
        setUser({
          name: dbUser.name,
          email: dbUser.email,
          college: dbUser.college || "Shri Ram Group Jabalpur (SRIT)",
          degree: dbUser.degree || "Computer Science Engineering"
        });
      } else {
        throw new Error("Invalid schema structure formatted by database nodes");
      }
    } catch (err) {
      console.log("Database fetch tracking error logs:", err);
      if (err?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error(err?.response?.data?.message || "Failed to fetch live database logs profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const getUserInitials = (fullName) => {
    if (!fullName) return "??";
    const slices = fullName.trim().split(" ");
    if (slices.length >= 2) {
      return `${slices[0][0]}${slices[1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  if (loading) return <Loader />;

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-[#07070A] text-white font-sans antialiased overflow-hidden select-none">
      
      {/* NAVIGATION HEADER BAR */}
      <div className="fixed top-0 inset-x-0 z-50 w-full bg-[#07070A]/70 backdrop-blur-xl border-b border-white/[0.04] hidden lg:block">
        <Navbar />
      </div>

      {/* OPERATIONAL WORKSPACE CONTAINER */}
      <div className="w-full flex-1 overflow-y-auto h-full pt-4 lg:pt-24 pb-[90px] px-5 bg-white lg:bg-[#07070A] text-black lg:text-white scrollbar-none">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-left relative pt-4">
          
          <div className="absolute top-0 center w-[300px] h-[300px] bg-[#5B50E6]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="border-b border-gray-100 lg:border-white/5 pb-3">
            <span className="text-[10px] font-black text-[#4B42E1] lg:text-[#5B50E6] uppercase tracking-widest font-mono">Live Sync Cluster</span>
            <h1 className="text-xl font-black tracking-tight text-gray-800 lg:text-white mt-0.5">My Account Profile</h1>
          </div>

          {user.email ? (
            <>
              {/* Premium User Bio Dynamic Identity Card */}
              <div className="w-full bg-gray-50 lg:bg-[#111116] border border-gray-100 lg:border-white/5 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#4B42E1] flex items-center justify-center text-sm font-black text-white font-mono shadow-md shadow-[#4B42E1]/20 shrink-0">
                    {getUserInitials(user.name)}
                  </div>
                  
                  <div className="flex flex-col text-left">
                    <h3 className="text-base font-black text-gray-800 lg:text-white tracking-tight leading-tight">
                      {user.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-semibold mt-1">
                      {user.email}
                    </span>
                    <span className="text-[10px] text-gray-500 lg:text-gray-400 font-black mt-2.5 uppercase tracking-wide bg-gray-200/50 lg:bg-white/5 px-2 py-0.5 rounded w-fit select-none">
                      🎓 {user.degree}
                    </span>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white text-[10px] font-black uppercase rounded-xl transition-all shrink-0 active:scale-95 shadow-xs"
                >
                  Sign Out Account
                </button>
              </div>

              {/* Academic & University Affiliation logs metadata row */}
              <div className="w-full bg-gray-50/50 lg:bg-[#111116]/40 border border-gray-100 lg:border-white/[0.04] p-5 rounded-2xl flex flex-col gap-1.5">
                <span className="text-[9px] font-black text-[#4B42E1] lg:text-[#5B50E6] uppercase tracking-widest font-mono">Affiliated Institution Specs</span>
                <p className="text-xs font-black text-gray-700 lg:text-gray-200 mt-1">
                  {user.college}
                </p>
                <p className="text-[11px] font-bold text-gray-400">RGPV University Engineering Network Node</p>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-red-500/5 rounded-2xl border border-red-500/10 text-xs font-bold text-red-400">
              No live authenticated database records verified. Please login with true profile token.
            </div>
          )}

        </div>
      </div>

      {/* MOBILE BOTTOM HUD STRIP */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 z-50 h-[64px] bg-white border-t border-gray-100 flex items-center justify-around px-4">
        <Navbar />
      </div>
      
    </div>
  );
};

export default Profile;