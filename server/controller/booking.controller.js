import Booking from "../model/booking.model.js";
import { addActivity} from "../utils/activityLogger.js";

// CREATE BOOKING
export const createBooking =
  async (req, res) => {
    try {

      const booking =
        await Booking.create({

          ...req.body,

          // Logged in user
          user: req.user.id,

        });
        await addActivity(

  booking,

  "Booking created",

  "BOOKING_CREATED"
);

      res.status(201).json({
        success: true,

        message:
          "Booking created successfully",

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Failed to create booking",
      });
    }
  };



// GET LOGGED IN USER BOOKINGS
export const getBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          user: req.user.id,

        })
          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        count: bookings.length,

        bookings,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch bookings",
      });
    }
  };



// GET SINGLE BOOKING
export const getBookingById =
  async (req, res) => {

    try {

     const booking =
  await Booking.findById(
    req.params.id
  )

  .populate({
    path: "driver",

    select:
      "name phone vehicleName vehicleNumber",
  })

  .populate({
    path: "user",

    select:
      "name phone email",
  });

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
          "Failed to fetch booking",
      });
    }
  };


// CANCEL BOOKING
export const cancelBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      // NOT FOUND
      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      // SECURITY CHECK
      if (
        booking.user.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized action",
        });
      }

      // UPDATE STATUS
      booking.bookingStatus =
        "CANCELLED";
        

        await addActivity(

  booking,

  "Customer cancelled booking",

  "USER_CANCELLED"
);

      await booking.save();

      res.status(200).json({

        success: true,

        message:
          "Booking cancelled successfully",

        booking,
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




  // GET OPEN BOOKINGS FOR DRIVERS
export const getOpenBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          bookingStatus:
            "BIDDING",

          driver: null,
        })

        .sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        bookings,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };
