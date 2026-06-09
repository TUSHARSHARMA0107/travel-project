import Booking from "../model/booking.model.js";

// PLACE BID
export const placeBid =
  async (req, res) => {

    try {

      const {
        amount,
        message,
        estimatedTime,
      } = req.body;

      const booking =
        await Booking.findById(
          req.params.bookingId
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking not found",
        });
      }

      // CHECK DUPLICATE BID
      const alreadyBid =
        booking.bids.find(
          (bid) =>
            bid.driver.toString() ===
            req.user.id
        );

      if (alreadyBid) {

        return res.status(400).json({

          success: false,

          message:
            "You already placed a bid",
        });
      }

      booking.bids.push({

        driver: req.user.id,

        amount,

        message,

        estimatedTime,
      });

      booking.bookingStatus =
        "BIDDING";

        await addActivity(

  booking,

  "Driver placed a bid",

  "BID_PLACED"
);

      await booking.save();
      

      res.status(200).json({

        success: true,

        message:
          "Bid placed successfully",

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to place bid",
      });
    }
  };


// ACCEPT BID
export const acceptBid =
  async (req, res) => {

    try {

      const {
        bookingId,
        driverId,
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

      // SECURITY CHECK
      if (
        booking.user.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",
        });
      }

      booking.driver =
        driverId;

      booking.bookingStatus =
        "DRIVER_SELECTED";
        await addActivity(

  booking,

  "Customer selected a driver",

  "DRIVER_SELECTED"
);

      await booking.save();

  

      res.status(200).json({

        success: true,

        message:
          "Driver selected successfully",

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to accept bid",
      });
    }
  };