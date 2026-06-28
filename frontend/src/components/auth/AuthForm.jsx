import { useState } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
}) => {
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {title}
        </h1>

        {title === "Register" && (
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">
          {buttonText}
        </Button>
      </form>

    </div>
  );
};

export default AuthForm;