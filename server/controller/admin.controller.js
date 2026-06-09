import Booking from "../model/booking.model";
import Driver from "../model/driver.model";
import User from "../model/user.model";


export const getAllUsers =
async (req,res)=>{

  const users =
    await User.find()
    .select("-password");

  res.json(users);
}

export const blockUser =
async(req,res)=>{

  await User.findByIdAndUpdate(
    req.params.id,
    {
      isBlocked:true
    }
  );

  res.json({
    success:true
  });
}


export const getUserDetails =
async (req,res)=>{

  const user =
    await User.findById(
      req.params.id
    );

  const bookings =
    await Booking.find({

      user:
        req.params.id

    })

    .populate({
      path:"driver",

      select:
      `
      name
      phone
      vehicleNumber
      `
    })

    .sort({
      createdAt:-1
    });

  res.json({

    success:true,

    user,

    bookings
  });
};



//driver
export const getAllDrivers =
  async (req, res) => {

    try {

      const drivers =
        await Driver.find()

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          drivers.length,

        drivers,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };





  export const getDriverDetails =
  async (req, res) => {

    try {

      const driver =
        await Driver.findById(
          req.params.id
        );

      if (!driver) {

        return res.status(404).json({

          success: false,

          message:
            "Driver not found",
        });
      }

      const rides =
        await Booking.find({

          driver:
            req.params.id,

        })

          .populate({

            path: "user",

            select:
              "name phone email",
          })

          .sort({
            createdAt: -1,
          });

      const totalRides =
        rides.length;

      const completedRides =
        rides.filter(
          ride =>
            ride.bookingStatus ===
            "DELIVERED"
        ).length;

      const activeRides =
        rides.filter(
          ride =>
            [
              "DRIVER_SELECTED",
              "DRIVER_ARRIVING",
              "PICKED_UP",
              "IN_TRANSIT",
            ].includes(
              ride.bookingStatus
            )
        ).length;

      res.status(200).json({

        success: true,

        driver,

        stats: {

          totalRides,

          completedRides,

          activeRides,
        },

        rides,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  };

  export const blockDriver =
async(req,res)=>{

  await Driver.findByIdAndUpdate(
    req.params.id,
    {
      isBlocked:true
    }
  );

  res.json({
    success:true
  });
}

///bookings
export const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()

          .populate({
            path: "user",

            select:
              "name email phone createdAt",
          })

          .populate({
            path: "driver",

            select:
              `
              name
              phone
              vehicleName
              vehicleNumber
              currentLocation
              createdAt
              `,
          })

          .populate({
            path: "bids.driver",

            select:
              `
              name
              phone
              vehicleName
              vehicleNumber
              `,
          })

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          bookings.length,

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





  export const getBookingDetails =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        )

          .populate({
            path: "user",

            select:
              "name email phone",
          })

          .populate({
            path: "driver",

            select:
              `
              name
              phone
              vehicleName
              vehicleNumber
              currentLocation
              `,
          })

          .populate({
            path: "bids.driver",

            select:
              `
              name
              phone
              vehicleName
              vehicleNumber
              `,
          });

      if (!booking) {

        return res.status(404)
          .json({

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
      });
    }
  };