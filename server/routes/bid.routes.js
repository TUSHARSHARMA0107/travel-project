import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { acceptBid, placeBid } from "../controller/bid.controller.js";


const router =
  express.Router();


// PLACE BID
router.post(
  "/place/:bookingId",
  verifyToken,
  placeBid
);


// ACCEPT BID
router.post(
  "/accept",
  verifyToken,
  acceptBid
);

export default router;