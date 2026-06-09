import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { getDriverEarnings, getDriverRideById, getDriverRides } from "../controller/driver.controller.js";



const router =
  express.Router();


// ALL RIDES
router.get(
  "/rides",
   verifyToken,
  getDriverRides
);


// SINGLE RIDE
router.get(
  "/rides/:id",
  verifyToken,
  getDriverRideById
);


// EARNINGS
router.get(
  "/earnings",
  verifyToken,
  getDriverEarnings
);

export default router;