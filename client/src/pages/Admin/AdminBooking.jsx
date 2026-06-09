import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getAllBookings,
} from "../../service/adminService";

const AdminBookings = () => {

  const [bookings,
    setBookings] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [search,
    setSearch] =
      useState("");

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const response =
          await getAllBookings();

        setBookings(
          response.bookings
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const filteredBookings =
    bookings.filter(
      (booking) => {

        const pickup =
          booking.pickup?.address
            ?.toLowerCase() || "";

        const drop =
          booking.drop?.address
            ?.toLowerCase() || "";

        return (
          pickup.includes(
            search.toLowerCase()
          ) ||

          drop.includes(
            search.toLowerCase()
          )
        );
      }
    );

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          All Bookings
        </h1>

        <input
          type="text"
          placeholder="Search booking..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border rounded-xl p-3 bg-white"
        />

      </div>

      <div className="grid gap-5">

        {filteredBookings.map(
          (booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg p-6"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                <div>

                  <h2 className="font-bold text-xl">
                    {
                      booking.pickup
                        ?.address
                    }
                  </h2>

                  <p className="my-2 text-gray-400">
                    ↓
                  </p>

                  <h2 className="font-bold text-xl">
                    {
                      booking.drop
                        ?.address
                    }
                  </h2>

                </div>

                <div>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {
                      booking.bookingStatus
                    }
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

                <div>

                  <p className="text-gray-500 text-sm">
                    Budget
                  </p>

                  <h3 className="font-bold">
                    ₹
                    {
                      booking.budget
                    }
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Customer
                  </p>

                  <h3 className="font-bold">
                    {
                      booking.user
                        ?.name
                    }
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Driver
                  </p>

                  <h3 className="font-bold">
                    {
                      booking.driver
                        ?.name ||
                      "Not Assigned"
                    }
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Vehicle
                  </p>

                  <h3 className="font-bold">
                    {
                      booking.driver
                        ?.vehicleNumber ||
                      "-"
                    }
                  </h3>

                </div>

              </div>

              <div className="mt-6">

                <Link
                  to={`/admin/bookings/${booking._id}`}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                >
                  View Details
                </Link>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default AdminBookings;