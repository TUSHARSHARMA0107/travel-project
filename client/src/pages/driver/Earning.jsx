import {
  useEffect,
  useState,
} from "react";

import {

  getDriverEarnings,

} from "../../service/bookingService";

const Earnings = () => {

  const [earnings,
    setEarnings] =
      useState(null);

  useEffect(() => {

    fetchEarnings();

  }, []);

  const fetchEarnings =
    async () => {

      try {

        const response =
          await getDriverEarnings();

        setEarnings(
          response
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!earnings) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <h1 className="text-3xl font-bold mb-6">
        Earnings
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">
            Total Earnings
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            ₹
            {
              earnings.totalEarnings
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">
            Completed Trips
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              earnings.totalTrips
            }
          </h2>

        </div>

      </div>

      {/* HISTORY */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Earnings History
        </h2>

        <div className="space-y-4">

          {earnings.completedTrips.map(
            (trip) => (

              <div
                key={trip._id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">
                    {
                      trip.pickup
                        ?.address
                    }
                  </h3>

                  <p className="text-gray-500">
                    →
                    {" "}
                    {
                      trip.drop
                        ?.address
                    }
                  </p>

                </div>

                <h3 className="text-green-600 font-bold text-xl">
                  ₹
                  {
                    trip.driverEarning
                  }
                </h3>

              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
};

export default Earnings;