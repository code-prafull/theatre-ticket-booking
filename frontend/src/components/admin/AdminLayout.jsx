// File Path: components/admin/AdminLayout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ children }) => {
  return (
    // Immersive Widescreen Admin Console: Desktop par locked workspace layout, smooth backdrop filters ke sath
    <div className="flex min-h-screen bg-[#09090B] text-white font-sans antialiased overflow-hidden select-none">
      
      {/* GLOBAL PERSISTENT ADMIN SIDEBAR MODULE */}
      <Sidebar />

      {/* RIGHT CONTENT DISPLAY WINDOW ENGINE */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* GLOBAL HEADER CONTROLLER PANEL */}
        <Topbar />

        {/* CORE ANALYTICS VIEWPORTS INTERACTION SLOT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 xl:p-10 bg-[#0C0C0E] scrollbar-none">
          
          {/* Subtle upper light mesh ring layout reflection for premium dashboard visual appearance */}
          <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[#5B50E6]/5 rounded-full blur-[120px] pointer-events-none z-0" />
          
          <div className="relative z-10 w-full max-w-[1600px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
        
      </div>
      
    </div>
  );
};

export default AdminLayout;