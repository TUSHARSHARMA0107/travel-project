import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema(
    {
      // BOOKING OWNER
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      // PICKUP DETAILS
      pickup: {
        lat: {
          type: Number,
          required: true,
        },

        lng: {
          type: Number,
          required: true,
        },

        address: {
          type: String,
          required: true,
        },
      },

      // DROP DETAILS
      drop: {
        lat: {
          type: Number,
          required: true,
        },

        lng: {
          type: Number,
          required: true,
        },

        address: {
          type: String,
          required: true,
        },
      },

      // ROUTE INFO
      route: {
        distance: {
          type: Number,
          required: true,
        },

        duration: {
          type: Number,
          required: true,
        },
      },

      // CUSTOMER DETAILS
      customer: {
        name: {
          type: String,
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },
      },

      // LOAD DETAILS
      load: {
        type: {
          type: String,
          required: true,
        },

        weight: {
          type: Number,
          required: true,
        },
      },

      // VEHICLE TYPE
      vehicleType: {
        type: String,
        required: true,
      },

      // EXPECTED BUDGET
      budget: {
        type: Number,
      },

      // NOTES
      notes: {
        type: String,
      },

      // DRIVER ASSIGNED LATER
      driver: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Driver",

        default: null,
      },

      // BOOKING STATUS
      bookingStatus: {
        type: String,

        
         enum: [

  "BIDDING",

  "DRIVER_SELECTED",

  "DRIVER_ARRIVING",

  "PICKED_UP",

  "IN_TRANSIT",

  "DELIVERED",

  "COMPLETED",

  "CANCELLED",
],

        default: "BIDDING",
      },

      // DRIVER BIDS
      bids: [
        {
          driver: {
            type:
              mongoose.Schema.Types
                .ObjectId,

            ref: "Driver",
          },

          amount: Number,

          message: String,

          createdAt: {
            type: Date,

            default: Date.now,
          },
        },
      ],
      // DRIVER PAYMENT
     driverEarning: {
  type: Number,
  default: 0,
},

platformFee: {
  type: Number,
  default: 0,
},

currentLocation: {

  lat: {
    type: Number,
  },

  lng: {
    type: Number,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
},

cancelledBy: {
  type: String,
  enum: [
    "USER",
    "DRIVER",
  ],
},

cancelReason: {
  type: String,
},
activities: [

  {

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    type: {

      type: String,

      enum: [
        "OPEN",

        "BID",

        "STATUS",

        "CANCEL",

        "SYSTEM",
      ],
    },

    createdBy: {
      type: String,
    },

    createdAt: {

      type: Date,

      default: Date.now,
    },
  },
],
activities: [
  {
    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
 status: {
  type: String,
  enum: [
    "pending",
    "assigned",
    "in_transit",
    "completed",
    "cancelled",
  ],
  default: "pending",
},
    },
   

    {
      timestamps: true,
    }
  );

const Booking =
  mongoose.model(
    "Booking",
    bookingSchema
  );

export default Booking;