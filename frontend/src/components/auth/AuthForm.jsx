// File Path: components/auth/AuthForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  isLogin
}) => {
  const navigate = useNavigate();
  
  // Logic & State Management - Ekdum safe aur untouched hai
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    // Figma Exact Dark Background Wrapper (No Extra White Background)
    <div className="min-h-screen w-full flex justify-center items-center bg-[#1A1A1A] p-0 sm:p-4 font-sans antialiased">
      
      {/* Main Card Shell:
        Desktop (md:) par 50/50 flex layout (Left side centered Logo/Title, Right side Form fields).
        Mobile par single layout jahan sab kuch vertical line me center ho jata hai.
      */}
      <div className="bg-white w-full sm:max-w-[412px] md:max-w-[800px] min-h-screen sm:min-h-[840px] md:min-h-[600px] sm:rounded-[32px] flex flex-col md:flex-row justify-between md:justify-center items-center p-8 relative overflow-hidden">
        
        {/* LEFT PANEL: Logo aur Title Heading (Centered vertically both on desktop and mobile) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center mt-6 md:mt-0 md:p-6 md:border-r md:border-gray-200">
          
          {/* Figma Couch SVG Logo */}
          <div className="flex items-center justify-center mb-5 shrink-0">
            <svg 
              width="86" 
              height="52" 
              viewBox="0 0 90 54" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 24V42H78V24H84C87.3 24 90 26.7 90 30V48C90 51.3 87.3 54 84 54H6C2.7 54 0 51.3 0 48V30C0 26.7 2.7 24 6 24H12Z" fill="#5B50E6"/>
              <path d="M15 6C15 2.7 17.7 0 21 0H42V30H15V6Z" fill="#1E1B4B"/>
              <path d="M48 0H69C72.3 0 75 2.7 75 6V30H48V0Z" fill="#5B50E6"/>
              <path d="M12 36H78V42H12V36Z" fill="#121026"/>
            </svg>
          </div>

          {/* Figma Core Title Text */}
          <h2 className="text-2xl font-bold text-black tracking-tight leading-tight max-w-[280px]">
            Creative Upaay<br />Hiring Assignment
          </h2>
        </div>

        {/* RIGHT PANEL: Tab Switcher capsule aur Inputs */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-8 md:mt-0 md:p-6">
          
          {/* Capsule Tab Controller Switcher */}
          <div className="w-full bg-[#EFEFEF] p-1 rounded-xl flex items-center mb-8">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={`flex-1 py-3 text-center font-bold text-sm transition-all rounded-lg ${
                isLogin 
                  ? "bg-white text-black shadow-sm" 
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className={`flex-1 py-3 text-center font-bold text-sm transition-all rounded-lg ${
                !isLogin 
                  ? "bg-white text-black shadow-sm" 
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Core Dynamic Form Layout Structure */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6.5">
            
            {title === "Register" && (
              <div className="w-full border-b border-gray-300 focus-within:border-[#5B50E6] transition-colors pb-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 bg-transparent text-base text-black placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            )}

            <div className="w-full border-b border-gray-300 focus-within:border-[#5B50E6] transition-colors pb-1">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 bg-transparent text-base text-black placeholder-gray-400 focus:outline-none"
                required
              />
            </div>

            <div className="w-full border-b border-gray-300 focus-within:border-[#5B50E6] transition-colors pb-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 bg-transparent text-base text-black placeholder-gray-400 focus:outline-none"
                required
              />
            </div>

            {title === "Register" && (
              <div className="w-full border-b border-gray-300 focus-within:border-[#5B50E6] transition-colors pb-1">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-2 bg-transparent text-base text-black placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {/* Indigo Action Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#5B50E6] hover:bg-[#493fd3] text-white font-semibold text-base py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.99]"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Screen Native Line Bar Indicator (Only for mobile view display) */}
        <div className="w-full absolute bottom-1 left-0 flex justify-center md:hidden pt-4 pb-1">
          <div className="w-32 h-1 bg-black rounded-full opacity-10"></div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;