// File Path: pages/Login.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/axios";
import toast from "react-hot-toast";

// logo import
import logoo from "../assets/Logoo.png"; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Authenticating secure credentials...", { id: "login_loader" });

      const response = await API.post("/auth/login", formData);
      const responseData = response?.data;
      
      const activeToken = responseData?.token || responseData?.data?.token;
      const userData = responseData?.data || responseData?.user;

      if (activeToken && userData) {
        // 1. Context storage synchronized directly
        login(activeToken, userData);
        
        toast.success("Authorized! Secure token initialized.", { id: "login_loader" });
        
        // 2. Clear alerts completely to avoid state freeze and handle redirection immediately
        const userRole = String(userData?.role || "").trim().toLowerCase();

        if (userRole === "admin") {
          console.log("Routing directly to Admin Control Panel...");
          navigate("/admin", { replace: true });
        } else {
          console.log("Routing to User Interface Dashboard...");
          const nextPath = location.state?.from?.pathname || "/";
          navigate(nextPath, { replace: true });
        }
      } else {
        throw new Error("Target payload dropped by server.");
      }
    } catch (error) {
      console.error("Login Crash:", error);
      toast.error(error?.response?.data?.message || "Invalid account credentials configuration.", { id: "login_loader" });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1A1E] px-4 py-8">
      {/* Main Container Card */}
      <div className="w-full max-w-[440px] bg-[#F7F9FC] rounded-[16px] px-8 pt-12 pb-10 shadow-md flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-4 flex justify-center">
           <img src={logoo} alt="Creative Upaay Logo" className="h-10.5 w-auto" />
        </div>

        {/* Heading */}
        <h2 className="text-[22px] font-bold text-black text-center leading-tight mb-8">
          Creative Upaay <br /> Hiring Assignment
        </h2>

        {/* Tab Toggle Controls */}
        <div className="w-full flex bg-[#EAEFF5] p-1 rounded-lg mb-10">
          <button 
            type="button"
            className="flex-1 py-2.5 text-sm font-semibold rounded-md transition-all bg-white text-black shadow-sm"
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => navigate("/register")}
            className="flex-1 py-2.5 text-sm font-semibold rounded-md transition-all text-gray-500 hover:text-black"
          >
            Sign Up
          </button>
        </div>

        {/* Core Login Form */}
        <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-8">
          <div className="w-full relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email ID"
              className="w-full bg-transparent border-b border-gray-300 pb-2 pt-1 text-sm text-gray-800 focus:outline-none focus:border-[#584CE4] placeholder-gray-400 font-medium transition-colors"
            />
          </div>

          <div className="w-full relative">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full bg-transparent border-b border-gray-300 pb-2 pt-1 text-sm text-gray-800 focus:outline-none focus:border-[#584CE4] placeholder-gray-400 font-medium transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#584CE4] hover:bg-[#473bc4] text-white text-sm font-semibold py-3.5 rounded-lg transition-all shadow-md mt-6"
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;