import express from "express";
import { getAllBookings, getBookingDetails,getAllDrivers,getDriverDetails, getAllUsers, getUserDetails, blockUser, blockDriver } from "../controller/admin.controller";
import verifyToken from "../utils/verifyToken";




const router =express.Router();


router.get(
  "/drivers",
  verifyToken,
  getAllDrivers
);

router.get(
  "/drivers/:id",
  verifyToken,
  getDriverDetails
);
router.get(
      "/drivers/:id/block",
      verifyToken,
      blockDriver
)



router.get(
  "/users",
  verifyToken,
  getAllUsers
);

router.get(
  "/users/:id",
  verifyToken,
    getUserDetails
); 
router.put(
  "/users/:id/block",
  verifyToken,
  blockUser
);





router.get(
  "/bookings",
  verifyToken,
  getAllBookings
);

router.get(
  "/bookings/:id",
  verifyToken,
  getBookingDetails
);