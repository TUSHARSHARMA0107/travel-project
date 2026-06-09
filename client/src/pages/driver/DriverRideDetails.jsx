import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  getDriverRideById,
} from "../../service/bookingService";

const DriverRideDetails = () => {

  const { id } =
    useParams();

  const [ride, setRide] =
    useState(null);

  useEffect(() => {

    fetchRide();

  }, [id]);

  const fetchRide =
    async () => {

      try {

        const response =
          await getDriverRideById(
            id
          );

        console.log(
          "FULL RIDE RESPONSE",
          response.ride
        );

        setRide(
          response.ride
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!ride) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-5">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold">
            Ride Details
          </h1>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold w-fit">
            {ride.bookingStatus}
          </span>

        </div>

        {/* CUSTOMER */}
        {ride.customer && (

          <div className="border rounded-3xl p-5 mb-6 bg-slate-50">

            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

              <div>

                <h2 className="text-2xl font-bold mb-4">
                  Customer Details
                </h2>

                <p>
                  <strong>Name:</strong>{" "}
                  {ride.customer.name}
                </p>

                <p className="mt-2">
                  <strong>Phone:</strong>{" "}
                  {ride.customer.phone}
                </p>

              </div>

              <div>

                <h2 className="text-xl font-bold mb-4">
                  Delivery Notes
                </h2>

                <p>
                  {
                    ride.notes ||
                    "No instructions"
                  }
                </p>

              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <a
                href={`tel:${ride.customer.phone}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center px-5 py-3 rounded-xl"
              >
                Call Customer
              </a>

              <Link
                to={`/driver/live/${ride._id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-5 py-3 rounded-xl"
              >
                Start Live Trip
              </Link>

            </div>

          </div>

        )}

        {/* ROUTE */}
        <div className="mb-6">

          <h2 className="text-xl font-bold mb-3">
            Route
          </h2>

          <p>
            <strong>Pickup:</strong>{" "}
            {ride.pickup?.address}
          </p>

          <p className="mt-2">
            <strong>Drop:</strong>{" "}
            {ride.drop?.address}
          </p>

        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <div>

            <p className="text-gray-500 text-sm">
              Distance
            </p>

            <h3 className="font-bold">
              {(
                ride.route?.distance /
                1000
              ).toFixed(1)} KM
            </h3>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Earnings
            </p>

            <h3 className="font-bold text-green-600">
              ₹{ride.driverEarning}
            </h3>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Vehicle
            </p>

            <h3 className="font-bold">
              {ride.vehicleType}
            </h3>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Load
            </p>

            <h3 className="font-bold">
              {ride.load?.type}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DriverRideDetails;