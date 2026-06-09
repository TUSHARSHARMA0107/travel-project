import express from "express";

import verifyToken from "../utils/verifyToken.js";
import { getRecommendedLoads, searchLoadBookings } from "../controller/recommendation.controller.js";


const router = express.Router();


router.get(
  "/recommendations",
  verifyToken,
  getRecommendedLoads
);

router.post(
  "/search-loads",
  verifyToken,
  searchLoadBookings
);


export default router;