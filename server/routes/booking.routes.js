import express from "express"

import { cancelBooking, createBooking, getBookingById, getBookings, getOpenBookings } from "../controller/booking.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

// CREATE BOOKING





// CREATE BOOKING
router.post(
  "/create",
  verifyToken,
  createBooking
);


// GET USER BOOKINGS
router.get(
  "/",
  verifyToken,
  getBookings
);


// GET SINGLE BOOKING
router.get(
  "/:id",
  verifyToken,
 getBookingById
);


// CANCEL BOOKING
router.put(
  "/cancel/:id",
  verifyToken,
  cancelBooking
);

router.get(
  "/open/all",
  verifyToken,
  getOpenBookings
);





export default router;