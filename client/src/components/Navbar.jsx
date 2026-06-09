// components/Navbar.tsx

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } =
    useAuth();

  return (

    <nav className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* COMPANY */}

        <div className="flex items-center gap-8">

          <h1 className="text-2xl font-bold text-blue-600">
            TruckBook
          </h1>

          <Link
            to="/about"
            className="hover:text-blue-600"
          >
            About Us
          </Link>
              <Link
  to="/messages"
  className="
  relative
  hover:text-blue-600
  "
>

  Messages

  {unreadCount > 0 && (

    <span
      className="
      absolute
      -top-2
      -right-5
      bg-red-500
      text-white
      text-xs
      px-2
      rounded-full
      "
    >

      {unreadCount}

    </span>

  )}

</Link>



          <Link
            to="/help"
            className="hover:text-blue-600"
          >
            Help
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-600"
          >
            Contact
          </Link>

        </div>

        {/* USER */}

        <div className="flex items-center gap-4">

          <span className="font-medium">
            {user?.name}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
