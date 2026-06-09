import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import socket from "../../socket/socket";

import BookingMap from "../../components/map/BookingMap";

import {
  getBookingById,
} from "../../service/bookingService";

const TrackBooking = () => {

  const { bookingId } =
    useParams();

  const [booking,
    setBooking] =
      useState(null);

  const [driverLocation,
    setDriverLocation] =
      useState(null);

  const [tripStatus,
    setTripStatus] =
      useState("");

  // FETCH
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

        setTripStatus(
          response.booking
            .bookingStatus
        );

        // DATABASE LOCATION
        if (
          response.booking
            .currentLocation
        ) {

          setDriverLocation({

            lat:
              response.booking
                .currentLocation
                .lat,

            lng:
              response.booking
                .currentLocation
                .lng,
                       
          });
          
        }

      } catch (error) {

        console.log(error);
      }
    };

  // SOCKET
  useEffect(() => {

    if (!bookingId) return;

    socket.emit(
      "join-booking",
      bookingId
    );

    // DRIVER LOCATION
    socket.on(
      "receiveDriverLocation",
      (data) => {

        setDriverLocation({

          lat: data.lat,

          lng: data.lng,

          updatedAt:
            new Date(),
        });
      }
    );

    // STATUS
    socket.on(
      "receiveTripStatus",
      (data) => {

        setTripStatus(
          data.status
        );
      }
    );

    return () => {

      socket.off(
        "receiveDriverLocation"
      );

      socket.off(
        "receiveTripStatus"
      );
    };

  }, [bookingId]);

  if (!booking) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">
          Loading Tracking...
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 lg:p-5">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg p-5 mb-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* ROUTE */}
          <div className="flex-1 min-w-0">

            <h1 className="text-2xl lg:text-4xl font-bold">
              Live Tracking
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

          {/* STATUS */}
          <div className="flex flex-col gap-4">

            <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-2xl font-bold text-center">
              {tripStatus}
            </div>

            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

              Live Truck Active

            </div>

          </div>

        </div>

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

export default TrackBooking;