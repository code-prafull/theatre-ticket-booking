import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import AuthForm from "../components/auth/AuthForm";

import { registerUser } from "../services/authApi";

const Register = () => {

  const navigate = useNavigate();

  const handleRegister = async (data) => {

    try {

      await registerUser(data);

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Register Failed"
      );

    }

  };

  return (
    <AuthForm
      title="Register"
      buttonText="Register"
      onSubmit={handleRegister}
    />
  );
};

export default Register;