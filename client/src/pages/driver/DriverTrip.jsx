import {
  useEffect,
  useState,
} from "react";

import socket from "../../socket/socket";

const DriverTrip = () => {

  const [tracking,
    setTracking] =
      useState(false);

  const [tripStatus,
    setTripStatus] =
      useState("DRIVER_SELECTED");

  // START LIVE TRACKING
  const startTrip = () => {

    setTracking(true);

    setTripStatus(
      "IN_TRANSIT"
    );

    socket.emit(
      "tripStatusUpdate",
      {
        status:
          "IN_TRANSIT",
      }
    );
  };

  // COMPLETE DELIVERY
  const completeTrip =
    () => {

      setTracking(false);

      setTripStatus(
        "COMPLETED"
      );

      socket.emit(
        "tripStatusUpdate",
        {
          status:
            "COMPLETED",
        }
      );
    };

  // LIVE LOCATION STREAM
  useEffect(() => {

    let watchId;

    if (tracking) {

      watchId =
        navigator.geolocation.watchPosition(

          (position) => {

            const location = {

              lat:
                position.coords
                  .latitude,

              lng:
                position.coords
                  .longitude,
            };

            socket.emit(
              "driverLocationUpdate",
              location
            );
          },

          (error) => {

            console.log(error);
          },

          {
            enableHighAccuracy: true,
          }
        );
    }

    return () => {

      if (watchId) {

        navigator.geolocation.clearWatch(
          watchId
        );
      }
    };

  }, [tracking]);

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <h1 className="text-3xl font-bold mb-6">
        Driver Trip
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Trip Status:
          {" "}
          {tripStatus}
        </h2>

        <div className="flex gap-4">

          <button
            onClick={startTrip}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Start Trip
          </button>

          <button
            onClick={completeTrip}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            Complete Delivery
          </button>

        </div>

      </div>
    </div>
  );
};

export default DriverTrip;