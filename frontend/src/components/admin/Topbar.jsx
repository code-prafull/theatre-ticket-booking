import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Movie Ticket Booking
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <h2 className="font-semibold">
            {user?.name || "Admin"}
          </h2>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Topbar;