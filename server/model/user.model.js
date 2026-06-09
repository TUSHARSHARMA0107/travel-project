import mongoose from "mongoose";

const userSchema =
new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {

    type: String,

    required: true,

    unique: true
  },

  password: {

    type: String,

    required: true
  },

  role: {

    type: String,

    default: "user"
  },
  isBlocked: {
  type: Boolean,
  default: false,
},

  resetPasswordToken:
    String,

  resetPasswordExpire:
    Date

}, {
  timestamps: true
});

const User = mongoose.model(
  "User",
  userSchema
);

export default User;