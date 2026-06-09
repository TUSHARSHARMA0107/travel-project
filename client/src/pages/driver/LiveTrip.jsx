import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import socket from "../../socket/socket";

import BookingMap from "../../components/map/BookingMap";

import {

  getBookingById,

  updateTripStatus,

  driverCancelBooking,

  updateDriverLocation,

} from "../../service/bookingService";

const LiveTrip = () => {

  const { bookingId } =
    useParams();

  const navigate =
    useNavigate();

  const [booking,
    setBooking] =
      useState(null);

  const [driverLocation,
    setDriverLocation] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  // DEBUG
  console.log(
    "BOOKING ID:",
    bookingId
  );

  // FETCH BOOKING
  useEffect(() => {

    if (!bookingId) return;

    fetchBooking();

  }, [bookingId]);

  const fetchBooking =
    async () => {

      try {

        const response =
          await getBookingById(
            bookingId
          );

        setBooking(
          response.booking
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // LIVE LOCATION
  useEffect(() => {

    if (!bookingId) return;

    socket.emit(
      "join-booking",
      bookingId
    );

    const watchId =
      navigator.geolocation.watchPosition(

        async (
          position
        ) => {

          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          const locationData = {

            bookingId,
            lat,
            lng,
          };

          // LOCAL STATE
          setDriverLocation({
            lat,
            lng,
          });

          // SOCKET
          socket.emit(
            "driverLocation",
            locationData
          );

          // DATABASE
          await updateDriverLocation(
            bookingId,
            {
              lat,
              lng,
            }
          );

        },

        (error) => {

          console.log(error);
        },

        {
          enableHighAccuracy:
            true,

          maximumAge: 0,

          timeout: 5000,
        }
      );

    return () => {

      navigator.geolocation.clearWatch(
        watchId
      );
    };

  }, [bookingId]);

  // STATUS
  const handleStatus =
    async (status) => {

      try {

        await updateTripStatus(
          bookingId,
          status
        );

        setBooking((prev) => ({
          ...prev,

          bookingStatus:
            status,
        }));

        socket.emit(
          "tripStatus",
          {
            bookingId,
            status,
          }
        );

      } catch (error) {

        console.log(error);
      }
    };

  // CANCEL
  const handleCancel =
    async () => {

      const reason =
        prompt(
          "Cancellation reason"
        );

      if (!reason) return;

      try {

        await driverCancelBooking(
          bookingId,
          reason
        );

        socket.emit(
          "tripStatus",
          {
            bookingId,

            status:
              "CANCELLED",
          }
        );

        navigate(
          "/driver/rides"
        );

      } catch (error) {

        console.log(error);
      }
    };

  // LOADING
  if (
    loading ||
    !booking
  ) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">
          Loading Trip...
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 lg:p-5">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg p-5 mb-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex-1 min-w-0">

            <h1 className="text-3xl font-bold">
              Driver Live Trip
            </h1>

            <div className="mt-5">

              <div>

                <p className="text-sm text-gray-500">
                  Pickup
                </p>

                <h2 className="font-bold text-lg break-words">
                  {
                    booking.pickup
                      ?.address
                  }
                </h2>

              </div>

              <div className="mt-5">

                <p className="text-sm text-gray-500">
                  Drop
                </p>

                <h2 className="font-bold text-lg break-words">
                  {
                    booking.drop
                      ?.address
                  }
                </h2>

              </div>

            </div>

          </div>

          <div className="flex flex-col gap-4">

            <div className="bg-blue-100 text-blue-700 px-5 py-4 rounded-2xl font-bold text-center">
              {
                booking.bookingStatus
              }
            </div>

            <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

              Live GPS Active

            </div>

          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">

        <button
          onClick={() =>
            handleStatus(
              "DRIVER_ARRIVING"
            )
          }
          className="bg-blue-600 text-white py-4 rounded-2xl font-bold"
        >
          Arriving
        </button>

        <button
          onClick={() =>
            handleStatus(
              "PICKED_UP"
            )
          }
          className="bg-orange-600 text-white py-4 rounded-2xl font-bold"
        >
          Picked Up
        </button>

        <button
          onClick={() =>
            handleStatus(
              "IN_TRANSIT"
            )
          }
          className="bg-purple-600 text-white py-4 rounded-2xl font-bold"
        >
          In Transit
        </button>

        <button
          onClick={() =>
            handleStatus(
              "DELIVERED"
            )
          }
          className="bg-green-600 text-white py-4 rounded-2xl font-bold"
        >
          Delivered
        </button>

        <button
          onClick={
            handleCancel
          }
          className="bg-red-600 text-white py-4 rounded-2xl font-bold"
        >
          Cancel
        </button>

      </div>

      {/* MAP */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

        <BookingMap
          pickup={
            booking.pickup
          }

          drop={
            booking.drop
          }

          routeData={
            booking.route
          }

          liveDriverLocation={
            driverLocation
          }

          interactive={true}

          draggable={false}

          showControls={true}

          height={
            window.innerWidth <
            1024
              ? "75vh"
              : "85vh"
          }
        />

      </div>

    </div>
  );
};

export default LiveTrip;