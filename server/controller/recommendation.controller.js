import Booking from "../model/booking.model.js";
import Driver from "../model/driver.model.js";

import {
  calculateDistance,
} from "../utils/distance.js";

export const getRecommendedLoads =
  async (req, res) => {

    try {

      const driver =
        await Driver.findById(
          req.user.id
        );

      if (
        !driver?.currentLocation
      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Driver location unavailable",
          });
      }

      const bookings =
        await Booking.find({

          bookingStatus:
            "BIDDING",
        });

      const results =
        bookings.map(
          (booking) => {

            const distance =
              calculateDistance(

                driver
                  .currentLocation
                  .lat,

                driver
                  .currentLocation
                  .lng,

                booking.pickup
                  .lat,

                booking.pickup
                  .lng
              );

            return {

              ...booking.toObject(),

              distanceFromDriver:
                distance,
            };
          }
        );

      results.sort(
        (a, b) =>
          a.distanceFromDriver -
          b.distanceFromDriver
      );

      res.status(200).json({

        success: true,

        bookings:
          results,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };


  export const searchLoadBookings =
  async (req, res) => {

    try {

      const {
        pickup,
        drop,
      } = req.body;

      const query = {

        bookingStatus:
          "BIDDING",
      };

      if (pickup) {

        query[
          "pickup.address"
        ] = {

          $regex: pickup,

          $options: "i",
        };
      }

      if (drop) {

        query[
          "drop.address"
        ] = {

          $regex: drop,

          $options: "i",
        };
      }

      const bookings =
        await Booking.find(
          query
        );

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