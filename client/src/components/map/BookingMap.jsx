import React, {
  useMemo,
  useRef,
  useCallback,
} from "react";

import {
  Map,
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl/maplibre";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

const BookingMap = ({
  pickup,
  drop,
 routeData,
  onMapClick,
  setPickup,
  setDrop,
  liveDriverLocation,

  activeField,

  interactive = true,
  height = "600px",
  showControls = true,
  draggable = true,
}) => {

  const mapRef =
    useRef(null);

  // SMART FAST CAMERA
  const moveCameraToRoute =
    useCallback((
      newPickup,
      newDrop
    ) => {

      if (
        !newPickup ||
        !newDrop ||
        !mapRef.current
      ) {
        return;
      }

      const map =
        mapRef.current.getMap();

      // DISTANCE CHECK
      const lngDiff =
        Math.abs(
          newPickup.lng -
          newDrop.lng
        );

      const latDiff =
        Math.abs(
          newPickup.lat -
          newDrop.lat
        );

      let maxZoom = 12;

      // VERY FAR
      if (
        lngDiff > 15 ||
        latDiff > 15
      ) {

        maxZoom = 4.8;
      }

      // FAR
      else if (
        lngDiff > 8 ||
        latDiff > 8
      ) {

        maxZoom = 6;
      }

      // MEDIUM
      else if (
        lngDiff > 3 ||
        latDiff > 3
      ) {

        maxZoom = 8;
      }

      map.fitBounds(
        [
          [
            newPickup.lng,
            newPickup.lat,
          ],

          [
            newDrop.lng,
            newDrop.lat,
          ],
        ],
        {
          padding: {
            top: 80,
            bottom: 80,
            left: 80,
            right: 80,
          },

          duration: 0,

          maxZoom,
        }
      );

    }, []);

  // MEMOIZED ROUTE
  const routeGeoJSON =
    useMemo(() => {

      return routeData
        ? {
            type: "Feature",

            geometry:
              routeData.geometry,
          }
        : null;

    }, [routeData]);

  // MAP CLICK
  const handleMapClick =
    useCallback((event) => {

      if (!onMapClick) return;

      onMapClick(
        event,
        moveCameraToRoute
      );

    }, [
      onMapClick,
      moveCameraToRoute,
    ]);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-slate-200"
      style={{
        height,
      }}
    >

      <Map
        ref={mapRef}

        initialViewState={{
          longitude: 78.9629,
          latitude: 20.5937,

          zoom: 5,
        }}

        mapStyle={MAP_STYLE}

        interactive={interactive}

        antialias={false}

        style={{
          width: "100%",
          height: "100%",
        }}

        onClick={handleMapClick}
      >

        {/* CONTROLS */}
        {showControls && (
          <NavigationControl position="top-right" />
        )}

        {/* ROUTE */}
        {routeGeoJSON?.geometry
          ?.coordinates?.length > 0 && (

          <Source
            id="route"
            type="geojson"
            data={routeGeoJSON}
          >

            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color":
                  "#2563eb",

                "line-width": 4,

                "line-opacity":
                  0.9,
              }}
            />

          </Source>
        )}

        {/* LIVE DRIVER */}
        {liveDriverLocation && (

          <Marker
            longitude={
              liveDriverLocation.lng
            }

            latitude={
              liveDriverLocation.lat
            }

            anchor="bottom"
          >

            <div className="text-3xl">
              🚚
            </div>

          </Marker>
        )}

        {/* PICKUP */}
        {pickup && (

          <Marker
            longitude={pickup.lng}

            latitude={pickup.lat}

            draggable={draggable}

            anchor="bottom"

            onDragEnd={async (e) => {

              const lng =
                e.lngLat.lng;

              const lat =
                e.lngLat.lat;

              // INSTANT UPDATE
              setPickup?.({
                ...pickup,

                lng,
                lat,

                address:
                  `Lat: ${lat.toFixed(5)},
                   Lng: ${lng.toFixed(5)}`,
              });

              // BACKGROUND ADDRESS UPDATE
              try {

                const response =
                  await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                  );

                const data =
                  await response.json();

                setPickup?.({
                  ...pickup,

                  lng,
                  lat,

                  address:
                    data.display_name ||
                    "Unknown Location",
                });

              } catch (error) {

                console.log(error);
              }
            }}
          >

            <div className="text-3xl">
              📍
            </div>

          </Marker>
        )}

        {/* DROP */}
        {drop && (

          <Marker
            longitude={drop.lng}

            latitude={drop.lat}

            draggable={draggable}

            anchor="bottom"

            onDragEnd={async (e) => {

              const lng =
                e.lngLat.lng;

              const lat =
                e.lngLat.lat;

              // INSTANT UPDATE
              setDrop?.({
                ...drop,

                lng,
                lat,

                address:
                  `Lat: ${lat.toFixed(5)},
                   Lng: ${lng.toFixed(5)}`,
              });

              // BACKGROUND ADDRESS UPDATE
              try {

                const response =
                  await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                  );

                const data =
                  await response.json();

                setDrop?.({
                  ...drop,

                  lng,
                  lat,

                  address:
                    data.display_name ||
                    "Unknown Location",
                });

              } catch (error) {

                console.log(error);
              }
            }}
          >

            <div className="text-3xl">
              🚚
            </div>

          </Marker>
        )}

      </Map>

    </div>
  );
};

export default React.memo(
  BookingMap
);