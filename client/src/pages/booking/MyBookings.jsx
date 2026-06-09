import {
  useEffect,
  useState,
} from "react";

import {
  getBookings,
} from "../../service/bookingService";

import { Link } from "react-router-dom";

const MyBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings =
    async () => {

      try {

        const response =
          await getBookings();

        setBookings(
          response.bookings
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

      </div>

      {bookings.length === 0 ? (

        <div className="bg-white p-10 rounded-2xl text-center shadow">

          <h2 className="text-2xl font-bold mb-2">
            No Bookings Found
          </h2>

          <p className="text-gray-500">
            Create your first booking
          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          {bookings.map(
            (booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-5"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  {/* LOCATION */}
                  <div>

                    <h2 className="text-lg font-bold">
                      {
                        booking.pickup
                          ?.address
                      }
                    </h2>

                    <p className="text-gray-400 my-1">
                      ↓
                    </p>

                    <h2 className="text-lg font-bold">
                      {
                        booking.drop
                          ?.address
                      }
                    </h2>

                  </div>

                  {/* STATUS */}
                  <div>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                      {
                        booking.bookingStatus
                      }
                    </span>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

                  <div>

                    <p className="text-gray-500 text-sm">
                      Distance
                    </p>

                    <h3 className="font-bold">
                      {(
                        booking.route
                          .distance / 1000
                      ).toFixed(1)}{" "}
                      KM
                    </h3>

                  </div>

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
                      Vehicle
                    </p>

                    <h3 className="font-bold">
                      {
                        booking.vehicleType
                      }
                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-500 text-sm">
                      Load
                    </p>

                    <h3 className="font-bold">
                      {
                        booking.load.type
                      }
                    </h3>

                  </div>

                </div>

                {/* ACTION BUTTON */}
                <div className="mt-6">

                  <Link
                    to={`/booking/${booking._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export  default MyBookings;