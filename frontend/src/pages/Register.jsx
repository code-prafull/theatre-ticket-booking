// File Path: pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import toast from "react-hot-toast";

// logo import, make sure to add this import
import logoo from "../assets/Logoo.png"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "Shri Ram Group Jabalpur (SRIT)",
    degree: "Computer Science Engineering"
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Creating secure account node...", { id: "register_loader" });

      const response = await API.post("/auth/register", formData);
      
      if (response?.data?.success) {
        toast.success("Account created successfully! Please log in.", { id: "register_loader" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error?.response?.data?.message || "Registration failed.", { id: "register_loader" });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1A1E] px-4 py-8">
      {/* Main Container Card */}
      <div className="w-full max-w-[440px] bg-[#F7F9FC] rounded-[16px] px-8 pt-12 pb-10 shadow-md flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-4 flex justify-center">
           {/* Replace SVG with Image */}
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
            onClick={() => navigate("/login")}
            className="flex-1 py-2.5 text-sm font-semibold rounded-md transition-all text-gray-500 hover:text-black"
          >
            Login
          </button>
          <button 
            type="button"
            className="flex-1 py-2.5 text-sm font-semibold rounded-md transition-all bg-white text-black shadow-sm"
          >
            Sign Up
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit} className="w-full flex flex-col gap-8">
          <div className="w-full relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full bg-transparent border-b border-gray-300 pb-2 pt-1 text-sm text-gray-800 focus:outline-none focus:border-[#584CE4] placeholder-gray-400 font-medium transition-colors"
            />
          </div>

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

          {/* Dummy UI Match Input for Figma Design Sync */}
          <div className="w-full relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent border-b border-gray-300 pb-2 pt-1 text-sm text-gray-800 focus:outline-none focus:border-[#584CE4] placeholder-gray-400 font-medium transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#584CE4] hover:bg-[#473bc4] text-white text-sm font-semibold py-3.5 rounded-lg transition-all shadow-md mt-4"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;