import { useEffect, useState } from "react";

import BookingMap from "../../components/map/BookingMap.jsx";
import SearchBox from "../../components/map/SearchBox.jsx";

import { getRoute } from "../../service/osrmService.js";

import { reverseGeocode } from "../../service/reverseGeocode.js";
import BookingForm from "../../components/map/BookingForm.jsx"

const CreateBooking = () => {
  const [pickup, setPickup] =
    useState(null);

  const [drop, setDrop] =
    useState(null);

  const [routeData, setRouteData] =
    useState(null);

  // ROUTE FETCH
  useEffect(() => {
    const fetchRoute = async () => {
      if (pickup && drop) {
        const route =
          await getRoute(
            pickup,
            drop
          );

        setRouteData(route);
      }
    };

    fetchRoute();
  }, [pickup, drop]);

  // MAP CLICK
  const handleMapClick = async (
    e
  ) => {
    const { lng, lat } =
      e.lngLat;

    const location =
      await reverseGeocode(
        lat,
        lng
      );

    const place = {
      lat,
      lng,
      name:
        location?.name ||
        location?.display_name,
      address:
        location?.display_name,
    };

    // FIRST CLICK = PICKUP
    if (!pickup) {
      setPickup(place);
    }

    // SECOND CLICK = DROP
    else if (!drop) {
      setDrop(place);
    }

    // RESET FLOW
    else {
      setPickup(place);
      setDrop(null);
      setRouteData(null);
    }
  };

  // CURRENT LOCATION
  const getCurrentLocation =
    () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          const location =
            await reverseGeocode(
              lat,
              lng
            );

          setPickup({
            lat,
            lng,
            name:
              location?.display_name,
            address:
              location?.display_name,
          });
        }
      );
    };

  return (
    <div className="p-5 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">
        Create Booking
      </h1>

      {/* SEARCH SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <SearchBox
  placeholder="Search Pickup"
  value={pickup}
  onSelect={setPickup}
/>

        <SearchBox
  placeholder="Search Drop"
  value={drop}
  onSelect={setDrop}
/>
      </div>

      {/* LOCATION BUTTON */}
      <button
        onClick={getCurrentLocation}
        className="mb-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Use Current Location
      </button>

      {/* DISTANCE CARD */}
      {routeData && (
        <div className="bg-white p-4 rounded-xl shadow mb-5 flex gap-10">
          <div>
            <p className="text-gray-500">
              Distance
            </p>

            <h2 className="text-2xl font-bold">
              {(
                routeData.distance /
                1000
              ).toFixed(1)}{" "}
              KM
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              ETA
            </p>

            <h2 className="text-2xl font-bold">
              {(
                routeData.duration /
                3600
              ).toFixed(1)}{" "}
              Hours
            </h2>
          </div>
        </div>
      )}

      {/* MAP */}
      <BookingMap
        pickup={pickup}
        drop={drop}
        routeData={routeData}
        onMapClick={
          handleMapClick
        }
        setPickup={setPickup}
        setDrop={setDrop}
      />
      {pickup && drop && routeData && (
  <BookingForm
    pickup={pickup}
    drop={drop}
    routeData={routeData}
  />
)}
    </div>
  );
};

export default CreateBooking;