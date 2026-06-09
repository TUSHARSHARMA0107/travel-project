import {
  useEffect,
  useState,
} from "react";

import {

  getDriverRides,

  driverCancelBooking,

} from "../../service/bookingService";

import {
  Link,
} from "react-router-dom";

const MyRides = () => {

  const [rides, setRides] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchRides();

  }, []);

  const fetchRides =
    async () => {

      try {

        const response =
          await getDriverRides();

        setRides(
          response.rides
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // DRIVER CANCEL RIDE
  const handleCancelRide =
    async (bookingId) => {

      const reason =
        prompt(
          "Enter cancellation reason"
        );

      if (!reason) return;

      try {

        await driverCancelBooking(
          bookingId,
          reason
        );

        // UPDATE UI
        setRides((prev) =>
          prev.map((ride) =>

            ride._id ===
            bookingId

              ? {

                  ...ride,

                  bookingStatus:
                    "CANCELLED",

                  cancelledBy:
                    "DRIVER",

                  cancelReason:
                    reason,
                }

              : ride
          )
        );

        alert(
          "Ride cancelled successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to cancel ride"
        );
      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">
          Loading Rides...
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 lg:p-5">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl lg:text-4xl font-bold">
          My Rides
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your accepted deliveries
        </p>

      </div>

      {/* EMPTY */}
      {rides.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-bold">
            No rides found
          </h2>

          <p className="text-gray-500 mt-2">
            Your accepted rides will appear here
          </p>

        </div>

      ) : (

        <div className="grid gap-5">

          {rides.map(
            (ride) => (

              <div
                key={ride._id}
                className="bg-white rounded-3xl shadow-lg p-5 lg:p-6"
              >

                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

                  {/* ROUTE */}
                  <div className="flex-1">

                    <h2 className="text-lg lg:text-xl font-bold break-words">
                      {
                        ride.pickup
                          ?.address
                      }
                    </h2>

                    <p className="text-gray-400 my-2 text-xl">
                      ↓
                    </p>

                    <h2 className="text-lg lg:text-xl font-bold break-words">
                      {
                        ride.drop
                          ?.address
                      }
                    </h2>

                  </div>

                  {/* STATUS */}
                  <div className="flex flex-col items-start lg:items-end gap-3">

                    <span className={`px-5 py-3 rounded-2xl font-bold text-white

                      ${
                        ride.bookingStatus ===
                        "CANCELLED"

                          ? "bg-red-600"

                          : ride.bookingStatus ===
                            "COMPLETED"

                          ? "bg-green-600"

                          : "bg-blue-600"
                      }
                    `}>

                      {
                        ride.bookingStatus
                      }

                    </span>

                    {/* CANCEL INFO */}
                    {
                      ride.bookingStatus ===
                        "CANCELLED" && (

                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 max-w-sm w-full">

                          <h3 className="font-bold text-red-700">
                            Ride Cancelled
                          </h3>

                          <p className="text-red-600 mt-2">
                            Cancelled By:
                            {" "}
                            {
                              ride.cancelledBy
                            }
                          </p>

                          <p className="text-red-600 mt-1 break-words">
                            Reason:
                            {" "}
                            {
                              ride.cancelReason
                            }
                          </p>

                        </div>
                      )
                    }

                  </div>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                  {/* DISTANCE */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Distance
                    </p>

                    <h3 className="font-bold text-xl mt-1">
                      {(
                        ride.route
                          ?.distance /
                        1000
                      ).toFixed(1)}{" "}
                      KM
                    </h3>

                  </div>

                  {/* EARNINGS */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Earnings
                    </p>

                    <h3 className="font-bold text-xl text-green-600 mt-1">
                      ₹
                      {
                        ride.driverEarning
                      }
                    </h3>

                  </div>

                  {/* VEHICLE */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Vehicle
                    </p>

                    <h3 className="font-bold text-xl mt-1 break-words">
                      {
                        ride.vehicleType
                      }
                    </h3>

                  </div>

                  {/* LOAD */}
                  <div className="bg-slate-50 rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Load
                    </p>

                    <h3 className="font-bold text-xl mt-1 break-words">
                      {
                        ride.load
                          ?.type
                      }
                    </h3>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  {/* VIEW */}
                  <Link
                    to={`/driver/rides/${ride._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-5 py-4 rounded-2xl font-bold transition"
                  >
                    View Ride
                  </Link>

                  {/* LIVE TRIP */}
                  {
                    ride.bookingStatus !==
                      "CANCELLED" &&

                    ride.bookingStatus !==
                      "COMPLETED" && (

                      <Link
                        to={`/driver/live/${ride._id}`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center px-5 py-4 rounded-2xl font-bold transition"
                      >
                        Live Trip
                      </Link>
                    )
                  }

                  {/* CANCEL */}
                  {
                    ride.bookingStatus !==
                      "CANCELLED" &&

                    ride.bookingStatus !==
                      "COMPLETED" && (

                      <button
                        onClick={() =>
                          handleCancelRide(
                            ride._id
                          )
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-4 rounded-2xl font-bold transition"
                      >
                        Cancel Ride
                      </button>
                    )
                  }

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default MyRides;