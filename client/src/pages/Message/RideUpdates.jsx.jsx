import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getBookingById,
} from "../../service/bookingService";

const RideUpdates = () => {

  const { bookingId } =
    useParams();

  const [activities,
    setActivities] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchUpdates();

  }, []);

  const fetchUpdates =
    async () => {

      try {

        const response =
          await getBookingById(
            bookingId
          );

        setActivities(
          response.booking
            ?.activities || []
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
    <div className="min-h-screen bg-slate-100 p-4 lg:p-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-5 mb-6">

          <h1 className="text-3xl font-bold">
            Ride Updates
          </h1>

          <p className="text-gray-500 mt-2">
            Live booking activity
          </p>

        </div>

        <div className="space-y-4">

          {activities.map(
            (activity, index) => (

              <div
                key={index}
                className="relative bg-white rounded-2xl shadow p-5"
              >

                <div className="absolute left-5 top-6 w-3 h-3 bg-blue-600 rounded-full" />

                <div className="ml-8">

                  <h2 className="font-bold text-lg">

                    {
                      activity.message
                    }

                  </h2>

                  <p className="text-gray-500 text-sm mt-1">

                    {
                      new Date(
                        activity.createdAt
                      ).toLocaleString()
                    }

                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default RideUpdates;