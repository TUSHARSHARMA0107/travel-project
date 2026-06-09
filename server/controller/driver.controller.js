import Booking from "../model/booking.model.js";



// GET DRIVER RIDES
export const getDriverRides =
  async (req, res) => {

    try {

      const rides =
        await Booking.find({

          driver: req.user.id,

        }).sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        rides,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };



// GET SINGLE DRIVER RIDE
export const getDriverRideById =
  async (req, res) => {

    try {

      const ride =
        await Booking.findById(
          req.params.id
        )

        .populate({
          path: "user",
          select:
            "name phone email",
        })

        .populate({
          path: "driver",
          select:
            "name phone vehicleName vehicleNumber",
        });

      if (!ride) {

        return res.status(404).json({

          success: false,

          message:
            "Ride not found",
        });
      }

      // SECURITY CHECK
      if (
        ride.driver?._id?.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",
        });
      }

      res.status(200).json({

        success: true,

        ride,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch ride",
      });
    }
  };


// DRIVER EARNINGS
export const getDriverEarnings =
  async (req, res) => {

    try {

      const completedTrips =
        await Booking.find({

          driver: req.user.id,

          bookingStatus:
            "COMPLETED",
        });

      const totalEarnings =
        completedTrips.reduce(

          (acc, trip) =>
            acc +
            trip.driverEarning,

          0
        );

      res.status(200).json({

        success: true,

        totalTrips:
          completedTrips.length,

        totalEarnings,

        completedTrips,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };