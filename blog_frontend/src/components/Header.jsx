import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Tailwind classes for links/buttons
  const baseLinkClasses =
    "px-3 py-2 rounded-md text-gray-800 hover:bg-gray-300 transition";
  const activeLinkClasses =
    "bg-blue-600 text-white px-3 py-2 rounded-md transition";

  const logoutButtonClasses =
    "bg-red-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-700 transition";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 text-gray-900 px-8 py-4 flex justify-between items-center shadow-sm">
      <h2 className="m-0 text-xl font-semibold">Blog Editor</h2>

      <nav className="flex gap-4 items-center">
        <Link
          to="/"
          className={
            location.pathname === "/" ? activeLinkClasses : baseLinkClasses
          }
        >
          Home
        </Link>

        {user ? (
          <>
            <button
              onClick={() => navigate("/edit", { state: { blog: {} } })}
              className={
                location.pathname.startsWith("/edit")
                  ? activeLinkClasses
                  : baseLinkClasses
              }
            >
              Create New
            </button>
            <button onClick={handleLogout} className={logoutButtonClasses}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? activeLinkClasses
                  : baseLinkClasses
              }
            >
              Login
            </Link>
            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? activeLinkClasses
                  : baseLinkClasses
              }
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
