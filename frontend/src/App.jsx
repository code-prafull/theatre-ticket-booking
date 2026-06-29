// File Path: src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Global Popup Notification Alerts Container Framework */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111116",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              fontSize: "12px",
              fontWeight: "bold",
            }
          }} 
        />

        {/* Centralised Security Routes Matrix Core */}
        <AppRoutes />
        
      </Router>
    </AuthProvider>
  );
}

export default App;