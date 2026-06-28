import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold text-red-500"
      >
        🎬 MovieBook
      </Link>

      <div className="flex gap-6">

        <Link to="/">Home</Link>

        <Link to="/my-bookings">
          My Bookings
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;