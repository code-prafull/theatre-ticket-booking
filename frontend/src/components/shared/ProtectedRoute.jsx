// File Path: components/shared/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, token } = useAuth();
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const effectiveToken = token || localToken || sessionToken;
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (
    !effectiveToken ||
    effectiveToken === "undefined" ||
    effectiveToken === "null"
  ) {
    if (!sessionStorage.getItem("auth_alert_triggered")) {
      toast.error("Unauthenticated Access! Please login to your account first.");
      sessionStorage.setItem("auth_alert_triggered", "true");
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  sessionStorage.removeItem("auth_alert_triggered");
  return children;
};

export default ProtectedRoute;