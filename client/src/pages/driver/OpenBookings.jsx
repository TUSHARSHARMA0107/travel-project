import {
  useEffect,
  useState,
} from "react";

import {
  getOpenBookings,getRecommendedLoads,searchLoadBookings
} from "../../service/bookingService";

import BidModal from "../../components/driver/BidModal";

import BookingMap from "../../components/map/BookingMap";

const OpenBookings = () => {

  const [recommendedBookings, setRecommendedBookings] =
   useState([]);

const [searchResults, setSearchResults] =
 useState([]);

const [searchMode, setSearchMode] =
 useState(false);

const [loading, setLoading] =
 useState(true);

const [bookings, setBookings] =
  useState([]);

const [
  pickupSearch,
  setPickupSearch
] = useState("");

const [
  dropSearch,
  setDropSearch
] = useState("");

const [
  selectedBooking,
  setSelectedBooking
] = useState(null);

const [
  mapBooking,
  setMapBooking
] = useState(null);

  

 const displayBookings =searchMode? searchResults: bookings;

  const filteredBookings = displayBookings.filter((booking) => {
    const pickupMatch =
      !pickupSearch ||
      booking.pickup?.address?.toLowerCase().includes(pickupSearch.toLowerCase());

    const dropMatch =
      !dropSearch ||
      booking.drop?.address?.toLowerCase().includes(dropSearch.toLowerCase());

    return pickupMatch && dropMatch;
  });

  useEffect(() => {
    fetchBookings();
  }, []);

const fetchBookings =
  async () => {

    try {

      setLoading(true);

      const response =
        await getOpenBookings();

      setBookings(
        response.bookings || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const searchBookings = async () => {
    try {
      setLoading(true);
      const response = await searchLoadBookings({
        pickup: pickupSearch,
        drop: dropSearch,
      });
      setSearchResults(response.bookings || []);
      setSearchMode(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-5">

      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-6">


  <h2 className="text-2xl font-bold mb-4">
    Find Loads
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <input
      type="text"
      value={pickupSearch}
      onChange={(e) =>
        setPickupSearch(
          e.target.value
        )
      }
      placeholder="Pickup Location"
      className="border rounded-xl p-3"
    />

    <input
      type="text"
      value={dropSearch}
      onChange={(e) =>
        setDropSearch(
          e.target.value
        )
      }
      placeholder="Drop Location"
      className="border rounded-xl p-3"
    />

  </div>

  <div className="flex flex-wrap gap-3 mt-4">

    <button
      onClick={searchBookings}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
    >
      Search Loads
    </button>

    <button
  onClick={() => {
    setPickupSearch("");
    setDropSearch("");
    setSearchMode(false);
  }}
  className="bg-green-600 ..."
>
  Show All Loads
</button>

  </div>

</div>



</div>
<h1 className="text-3xl font-bold">

  {
    searchMode

      ? "Search Results"

      : "🔥 Recommended Loads Near You"
  }

</h1>

<p className="text-gray-500 mt-2">

  {
    searchMode

      ? "Showing route matches"

      : "Showing nearest loads based on your live location"
  }

</p>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          View available delivery requests and place your bids.
        </p>

{
filteredBookings.length === 0 && (

  <div className="bg-white rounded-3xl shadow-lg p-10 text-center mb-6">

    <h2 className="text-2xl font-bold">
      No Loads Found
    </h2>

    <p className="text-gray-500 mt-2">
      Try another route search.
    </p>

  </div>

)}


      {/* BOOKINGS */}
      <div className="grid gap-5 sm:gap-6">

        {filteredBookings.map(
          (booking) => (

            <div


              key={booking._id}
              className="bg-white rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden"
            >

              <div className="p-4 sm:p-5">

                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* ROUTE */}
                  <div className="flex-1">

                    <div className="flex items-start gap-3">

                      {/* ROUTE DOTS */}
                      <div className="flex flex-col items-center mt-1">

                        <div className="w-4 h-4 rounded-full bg-green-600" />

                        <div className="w-1 h-14 bg-gray-300 my-1" />

                        <div className="w-4 h-4 rounded-full bg-red-600" />

                      </div>

                      {/* ADDRESSES */}
                      <div className="flex-1 min-w-0">

                        {/* PICKUP */}
                      <div className="bg-green-50 rounded-xl lg:rounded-2xl p-3 sm:p-4">

  <p className="text-green-600 text-xs sm:text-sm">
    Pickup Distance
  </p>

  <h3 className="font-bold text-lg sm:text-xl mt-1">

    {
      booking.distanceFromDriver
        ?.toFixed(1)
    } km

  </h3>

</div>

                        {/* DROP */}
                        <div className="mt-5">

                          <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            Drop
                          </p>

                          <h2 className="text-sm sm:text-base lg:text-lg font-bold leading-snug wrap-break-word">
                            {
                              booking.drop
                                ?.address
                            }
                          </h2>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div>

                    <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap self-start">
                      {
                        booking.bookingStatus
                      }
                    </span>

                  </div>

                </div>

                {/* STATS */}

                <p className="text-xs text-gray-500">Pickup</p>

<h2 className="font-bold">
  {booking.pickup?.address}
</h2>
<div className="bg-green-50 rounded-xl p-3 mt-3">
  <p>Pickup Distance</p>
  <h3>
    {booking.distanceFromDriver?.toFixed(1)} km
  </h3>
</div>




                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">

                  {/* DISTANCE */}
                  <div className="bg-slate-50 rounded-xl lg:rounded-2xl p-3 sm:p-4">

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Distance
                    </p>

                    <h3 className="font-bold text-lg sm:text-xl mt-1">
                      {((booking.route?.distance ?? 0) / 1000).toFixed(1)} KM
                    </h3>

                  </div>

                  {/* BUDGET */}
                  <div className="bg-slate-50 rounded-xl lg:rounded-2xl p-3 sm:p-4">

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Budget
                    </p>

                    <h3 className="font-bold text-lg sm:text-xl mt-1">
                      ₹
                      {
                        booking.budget
                      }
                    </h3>

                  </div>

                  {/* VEHICLE */}
                  <div className="bg-slate-50 rounded-xl lg:rounded-2xl p-3 sm:p-4">

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Vehicle
                    </p>

                    <h3 className="font-bold text-lg sm:text-xl mt-1 wrap-break-word">
                      {
                        booking.vehicleType
                      }
                    </h3>

                  </div>

                  {/* LOAD */}
                  <div className="bg-slate-50 rounded-xl lg:rounded-2xl p-3 sm:p-4">

                    <p className="text-gray-500 text-xs sm:text-sm">
                      Load
                    </p>

                    <h3 className="font-bold text-lg sm:text-xl mt-1 wrap-break-word">
                      {
                        booking.load
                          ?.type
                      }
                    </h3>

                  </div>

                </div>

                {/* DESKTOP MAP */}
                <div className="hidden lg:block mt-8">

                  <div className="rounded-2xl overflow-hidden border border-slate-200">

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

                      interactive={false}

                      draggable={false}

                      showControls={false}

                      height="320px"
                    />

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  {/* MAP BUTTON */}
                  <button
                    onClick={() =>
                      setMapBooking(
                        booking
                      )
                    }
                    className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl lg:rounded-2xl px-4 py-3 sm:py-4 transition font-semibold"
                  >

                    <div className="flex items-center justify-center gap-3">

                      <span className="text-2xl">
                        🗺️
                      </span>

                      <span>
                        View Full Route
                      </span>

                    </div>

                  </button>

                  {/* BID BUTTON */}
                  <button
                    onClick={() =>
                      setSelectedBooking(
                        booking
                      )
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl lg:rounded-2xl px-4 py-3 sm:py-4 transition font-semibold"
                  >
                    Place Bid
                  </button>

                </div>

              </div>

            </div>
          )
        )}

      </div>

      {/* MAP MODAL */}
      {mapBooking && (

        <div className="fixed inset-0 z-50 bg-black/80 flex items-end lg:items-center justify-center p-0 lg:p-5">

          <div className="bg-white w-full h-[92vh] lg:h-auto lg:max-w-7xl lg:rounded-3xl overflow-hidden shadow-2xl flex flex-col">

            {/* HEADER */}
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b">

              <div className="min-w-0">

                <h2 className="text-xl sm:text-2xl font-bold">
                  Route Preview
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed wrap-break-word">
                  {
                    mapBooking.pickup
                      ?.address
                  }

                  {" → "}

                  {
                    mapBooking.drop
                      ?.address
                  }
                </p>

              </div>

              <button
                onClick={() =>
                  setMapBooking(
                    null
                  )
                }
                className="text-4xl leading-none shrink-0"
              >
                ×
              </button>

            </div>

            {/* MAP */}
            <div className="flex-1">

              <BookingMap
                pickup={
                  mapBooking.pickup
                }

                drop={
                  mapBooking.drop
                }

                routeData={
                  mapBooking.route
                }

                interactive={true}

                draggable={false}

                showControls={true}

                height={
                  window.innerWidth <
                  1024
                    ? "100%"
                    : "80vh"
                }
              />

            </div>

          </div>
        </div>
      )}

      {/* BID MODAL */}
      {selectedBooking && (

        <BidModal
          booking={
            selectedBooking
          }

          onClose={() =>
            setSelectedBooking(
              null
            )
          }
        />
      )}

    </div>
  );
};

export default OpenBookings;