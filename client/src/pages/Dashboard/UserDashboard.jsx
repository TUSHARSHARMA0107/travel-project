import { Link } from "react-router-dom";

const UserDashboard = () => {

  return (

    <div className="min-h-screen bg-slate-100">

      {/* HERO */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg">
          Manage your truck bookings
          and deliveries
        </p>

      </div>

      {/* CARDS */}

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* CREATE BOOKING */}

          <Link
            to="/create-booking"
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              Create Booking
            </h2>

            <p className="text-gray-500 mt-2">
              Create a new truck booking
            </p>

          </Link>

          {/* MY BOOKINGS */}

          <Link
            to="/my-bookings"
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              My Bookings
            </h2>

            <p className="text-gray-500 mt-2">
              View all your bookings
            </p>

          </Link>

          {/* TRACK */}

          <Link
            to="/track/:bookingId"
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              Track Truck
            </h2>

            <p className="text-gray-500 mt-2">
              Track active deliveries
            </p>

          </Link>

          {/* UPDATES */}

          <Link
            to="/messages"
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              Ride Updates
            </h2>

            <p className="text-gray-500 mt-2">
              View ride activities
            </p>

          </Link>

          {/* PROFILE */}

          <Link
            to="/profile"
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <h2 className="text-2xl font-bold">
              Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Manage account settings
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;