import {
  useEffect,
  useRef,
  useState,
} from "react";

import { searchPlaces } from "../../service/photonService";

const SearchBox = ({
  placeholder,
  value,
  onSelect,
}) => {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const containerRef =
    useRef(null);

  // Sync input with selected value
  useEffect(() => {
    if (value) {
      setQuery(
        value.address ||
          value.name ||
          ""
      );
    }
  }, [value]);

  // Search debounce
  useEffect(() => {
    const debounce =
      setTimeout(async () => {
        if (query.length > 2) {
          const data =
            await searchPlaces(
              query
            );

          setResults(data);
        } else {
          setResults([]);
        }
      }, 400);

    return () =>
      clearTimeout(debounce);
  }, [query]);

  // Close outside
  useEffect(() => {
    const handleOutside = (
      e
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          e.target
        )
      ) {
        setResults([]);

        // RESET INVALID TEXT
        if (value) {
          setQuery(
            value.address ||
              value.name
          );
        }
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, [value]);

  const handleSelect = (
    place
  ) => {
    const [lng, lat] =
      place.geometry.coordinates;

    const selectedPlace = {
      lat,
      lng,

      name:
        place.properties.name ||
        place.properties.city,

      address: [
        place.properties.name,
        place.properties.city,
        place.properties.state,
        place.properties.country,
      ]
        .filter(Boolean)
        .join(", "),
    };

    onSelect(selectedPlace);

    setQuery(
      selectedPlace.address
    );

    setResults([]);
  };

  return (
    <div
      className="relative w-full"
      ref={containerRef}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full p-3 border rounded-lg bg-white"
      />

      {results.length > 0 && (
        <div className="absolute z-50 bg-white border w-full rounded-lg mt-1 shadow-lg max-h-80 overflow-y-auto">
          {results.map(
            (place, index) => (
              <div
                key={index}
                onClick={() =>
                  handleSelect(
                    place
                  )
                }
                className="p-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <p className="font-medium">
                  {place.properties.name ||
                    place
                      .properties
                      .city}
                </p>

                <p className="text-sm text-gray-500">
                  {
                    place
                      .properties
                      .country
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;