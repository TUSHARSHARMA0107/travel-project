import axios from "axios";

export const searchPlaces = async (query) => {
  if (!query) return [];

  try {
    const response = await axios.get(
      `https://photon.komoot.io/api/?q=${query}&limit=5`
    );

    return response.data.features;
  } catch (error) {
    console.error(error);
    return [];
  }
};