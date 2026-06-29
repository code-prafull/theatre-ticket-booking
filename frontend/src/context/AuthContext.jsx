// File Path: context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapSession = async () => {
      const savedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (savedToken) {
        try {
          const normalizedToken = savedToken.replace(/^"|"$/g, "");
          API.defaults.headers.common.Authorization = `Bearer ${normalizedToken}`;
          const { data } = await API.get("/auth/profile");
          setUser(data?.data || data);
          setToken(normalizedToken);
        } catch (err) {
          console.error("Hydration token verify failed:", err);
          if (err?.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    bootstrapSession();
  }, []);

  const login = (userToken, userData) => {
    localStorage.setItem("token", userToken);
    sessionStorage.setItem("token", userToken);
    API.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete API.defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);