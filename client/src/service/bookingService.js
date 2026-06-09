import axios from "axios";

const API =
  "http://localhost:5000/api/booking";

// GET TOKEN
const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

// CREATE BOOKING
export const createBooking =
  async (data) => {
    const response =
      await axios.post(
        `${API}/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

// GET USER BOOKINGS
export const getBookings =
  async () => {

    const response =
      await axios.get(API, {

        headers: {
          Authorization:
            `Bearer ${getToken()}`,
        },

      });

    return response.data;
  };




  ///load booking service details

// GET SINGLE BOOKING
export const getBookingById =
  async (id) => {

    const response =
      await axios.get(
        `${API}/${id}`,
        {

          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },

        }
      );

    return response.data;
  };


// CANCEL BOOKING
export const cancelBooking =
  async (id) => {

    const response =
      await axios.put(
        `${API}/cancel/${id}`,
        {},
        {

          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },

        }
      );

    return response.data;
  };



  ///booking service
  // GET OPEN BOOKINGS
export const getOpenBookings =
  async () => {

    const response =
      await axios.get(
        `${API}/open/all`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// PLACE BID
export const placeBid =
  async (
    bookingId,
    data
  ) => {

    const response =
      await axios.post(
        `http://localhost:5000/api/bid/place/${bookingId}`,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// ACCEPT BID
export const acceptBid =
  async (
    bookingId,
    driverId
  ) => {

    const response =
      await axios.post(
        `http://localhost:5000/api/bid/accept`,
        {
          bookingId,
          driverId,
        },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

  // DRIVER RIDES
export const getDriverRides =
  async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/drivers/rides",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// SINGLE DRIVER RIDE
export const getDriverRideById =
  async (id) => {

    const response =
      await axios.get(
        `http://localhost:5000/api/drivers/rides/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// DRIVER EARNINGS
export const getDriverEarnings =
  async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/drivers/earnings",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  }





////tracking service 


  // UPDATE TRIP STATUS
export const updateTripStatus =
  async (
    bookingId,
    status
  ) => {

    const response =
      await axios.put(
        `http://localhost:5000/api/tracking/trip-status/${bookingId}`,
        {
          status,
        },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// UPDATE DRIVER LOCATION
export const updateDriverLocation =
  async (
    bookingId,
    location
  ) => {

    const response =
      await axios.put(
        `http://localhost:5000/api/tracking/driver-location/${bookingId}`,
        location,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// DRIVER CANCEL BOOKING
export const driverCancelBooking =
  async (
    bookingId,
    reason
  ) => {

    const response =
      await axios.put(
        `http://localhost:5000/api/tracking/driver-cancel/${bookingId}`,
        {
          reason,
        },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };


// GET TRACKING DATA
export const getTrackingData =
  async (bookingId) => {

    const response =
      await axios.get(
        `http://localhost:5000/api/tracking/tracking/${bookingId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



  ///driver reommnedytaion service 
  export const getRecommendedLoads =
  async () => {

    const response =
      await axios.get(
        "http://localhost:5000/api/drivers/recommendations",
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };

export const searchLoadBookings =
  async (data) => {

    const response =
      await axios.post(
        "http://localhost:5000/api/drivers/search-loads",
        data,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
  };