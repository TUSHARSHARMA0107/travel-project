import express
from "express";

import {

  updateTripStatus,

  updateDriverLocation,

  getTrackingData,

  driverCancelBooking,

} from "../controller/tracking.controller.js";
import verifyToken from "../utils/verifyToken.js";


const router =
  express.Router();


// UPDATE STATUS
router.put(
  "/trip-status/:bookingId",
  verifyToken,
  updateTripStatus
);


// DRIVER LOCATION
router.put(
  "/driver-location/:bookingId",
  verifyToken,
  updateDriverLocation
);


// TRACKING DATA
router.get(
  "/tracking/:bookingId",
  verifyToken,
  getTrackingData
);


// DRIVER CANCEL
router.put(
  "/driver-cancel/:bookingId",
  verifyToken,
  driverCancelBooking
);

export default router;




