import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthForm from "../components/auth/AuthForm";
import { loginUser } from "../services/authApi";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);

      // Save Login Data
      localStorage.setItem("token", res.data.token);
      
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.data)
);

      localStorage.setItem(
        "role",
        res.data.data.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data)
      );

      toast.success("Login Success");

      // Admin Login
      if (res.data.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
    />
  );
};

export default Login;