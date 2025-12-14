import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FaHome,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold font-cursive">
          Instagram
        </Link>

        <div className="flex items-center gap-6 text-xl">
          <Link to="/" className="text-gray-700 hover:text-black">
            <FaHome />
          </Link>

          <Link to="/search" className="text-gray-700 hover:text-black">
            <FaSearch />
          </Link>

          <Link to="/create" className="text-gray-700 hover:text-black">
            <FaPlusSquare />
          </Link>

          <Link
            to={`/profile/${user?._id}`}
            className="text-gray-700 hover:text-black"
          >
            <FaUser />
          </Link>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 text-lg"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
