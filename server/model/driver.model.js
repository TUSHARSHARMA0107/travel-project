
import mongoose from "mongoose";

const driverSchema =
new mongoose.Schema({

  // PERSONAL

  name: String,

  phone: String,

  email: {

    type: String,

    unique: true
  },

  password: String,


  // VEHICLE

  truckNumber: String,

  truckType: String,

  truckCapacity: String,

  rcNumber: String,


  // DL

  dlNumber: String,

  dlExpiry: Date,


  // IMAGES

  profilePhoto: String,

  truckImage: String,

  rcImage: String,

  dlFrontImage: String,

  dlBackImage: String,


  role: {

    type: String,

    default: "driver"
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


const Driver = mongoose.model(
  "Driver",
  driverSchema
);

export default Driver;