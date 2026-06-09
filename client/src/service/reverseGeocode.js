import axios from "axios";

export const reverseGeocode =
  async (lat, lng) => {
    try {
      const response =
        await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };