import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiverRole: {
      type: String,
      enum: ["user", "driver"],
      required: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    title: String,

    message: String,

    type: {
      type: String,
      enum: [
        "booking_accepted",
        "booking_cancelled",
        "trip_started",
        "trip_completed",
        "payment_received",
      ],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const Message = mongoose.model(
  "Message",
  messageSchema
);

export default Message;