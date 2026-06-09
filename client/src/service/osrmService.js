import axios from "axios";

export const getRoute = async (
  pickup,
  drop
) => {
  try {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=full&geometries=geojson`
    );

    return response.data.routes[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};