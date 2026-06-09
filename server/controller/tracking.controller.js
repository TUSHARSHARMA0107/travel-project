import Booking
from "../model/booking.model.js";


// UPDATE TRIP STATUS
export const updateTripStatus =
  async (req, res) => {

    try {

      const {
        bookingId,
      } = req.params;

      const {
        status,
      } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      // ONLY DRIVER
      if (
        booking.driver?.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",
        });
      }

      booking.bookingStatus =
        status;

      await booking.save();

      res.status(200).json({

        success: true,

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to update trip status",
      });
    }
  };


// UPDATE DRIVER LOCATION
export const updateDriverLocation =
  async (req, res) => {

    try {

      const {
        bookingId,
      } = req.params;

      const {
        lat,
        lng,
      } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      booking.currentLocation = {

        lat,
        lng,

        updatedAt:
          new Date(),
      };

      await booking.save();

      res.status(200).json({

        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to update location",
      });
    }
  };


// GET TRACKING DATA
export const getTrackingData =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.bookingId
        )
        .populate("driver");

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      res.status(200).json({

        success: true,

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch tracking",
      });
    }
  };


// DRIVER CANCEL BOOKING
export const driverCancelBooking =
  async (req, res) => {

    try {

      const {
        bookingId,
      } = req.params;

      const {
        reason,
      } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      // DRIVER SECURITY
      if (
        booking.driver?.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",
        });
      }

      booking.bookingStatus =
        "CANCELLED";

      booking.cancelledBy =
        "DRIVER";

      booking.cancelReason =
        reason;

      booking.driver = null;

      await booking.save();

      res.status(200).json({

        success: true,

        message:
          "Booking cancelled by driver",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to cancel booking",
      });
    }
  };