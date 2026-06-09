import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  Link
} from "react-router-dom";

import {

  getBookingById,
  cancelBooking,

} from "../../service/bookingService";
import { acceptBid } from "../../service/bookingService";

const BookingDetails = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();




///

  const [booking, setBooking] =
    useState(null);

  useEffect(() => {

    fetchBooking();

  }, []);

  const fetchBooking =
    async () => {

      try {

        const response =
          await getBookingById(
            id
          );

        setBooking(
          response.booking
        );

      } catch (error) {

        console.log(error);
      }
    };

    const handleAcceptBid =
  async (driverId) => {

    try {

      await acceptBid(
        booking._id,
        driverId
      );

      alert(
        "Driver selected successfully"
      );

      fetchBooking();

    } catch (error) {

      console.log(error);
    }
  };


  const handleCancel =
    async () => {

      try {

        await cancelBooking(id);

        alert(
          "Booking Cancelled"
        );

        navigate(
          "/my-bookings"
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!booking) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5">

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Booking Details
          </h1>

          {
  booking.bookingStatus ===
    "DRIVER_SELECTED" &&

  booking.driver && (

    <div className="bg-white border rounded-3xl shadow-lg p-5 mb-6">

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

        <div>

          <h2 className="text-2xl font-bold">
            Driver Details
          </h2>

          <p className="mt-3">
            Name:
            {" "}
            {booking.driver?.name}
          </p>

          <p>
            Phone:
            {" "}
            {booking.driver?.phone}
          </p>

        </div>

        <div>

          <h2 className="text-xl font-bold">
            Vehicle
          </h2>

          <p className="mt-3">
            {
              booking.driver?.vehicleName
            }
          </p>

          <p>
            {
              booking.driver?.vehicleNumber
            }
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <a
          href={`tel:${booking.driver?.phone}`}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Call Driver
        </a>

        <Link
          to={`/track/${booking._id}`}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Track Truck
        </Link>
        <Link
  to={`/updates/${booking._id}`}
  className="bg-purple-600 text-white px-5 py-3 rounded-xl"
>
  Ride Updates
</Link>

      </div>

    </div>
  )
}

        </div>

        {/* LOCATIONS */}
        <div className="mb-6">

          <h2 className="text-xl font-bold mb-3">
            Route
          </h2>

          <p>
            <strong>
              Pickup:
            </strong>{" "}
            {
              booking.pickup
                ?.address
            }
          </p>

          <p className="mt-2">
            <strong>
              Drop:
            </strong>{" "}
            {
              booking.drop
                ?.address
            }
          </p>

        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">

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
<p>
  Vehicle:
  {" "}
  {
    booking.driver?. vehicleType ||
    "Not Added"
  }
</p>

<p>
  Number:
  {" "}
  {
    booking.driver?.vehicleNumber ||
    "Not Added"
  }
</p>
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

        {/* NOTES */}
        <div className="mb-6">

          <h2 className="text-xl font-bold mb-2">
            Notes
          </h2>

          <p className="text-gray-600">
            {booking.notes}
          </p>

        </div>
        <div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Driver Bids
  </h2>

  <div className="space-y-4">

    {booking.bids?.map(
      (bid) => (

        <div
          key={bid._id}
          className="bg-slate-100 rounded-xl p-5"
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold text-lg">
                ₹{bid.amount}
              </h3>

              <p className="text-gray-600">
                {
                  bid.message
                }
              </p>

              <p className="text-sm text-gray-500 mt-1">
                ETA:
                {" "}
                {
                  bid.estimatedTime
                }
              </p>

            </div>

            {booking.bookingStatus !==
              "DRIVER_SELECTED" && (

              <button
                onClick={() =>
                  handleAcceptBid(
                    bid.driver
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
              >
                Accept Bid
              </button>
            )}
          </div>

        </div>
      )
    )}

  </div>

</div>

        {/* CANCEL BUTTON */}
        {booking.bookingStatus !==
          "CANCELLED" && (

          <button
            onClick={
              handleCancel
            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
          >
            Cancel Booking
          </button>

          
        )}
      </div>
    </div>
  );
};

export default BookingDetails;