import express from "express";

// import {login,registerUser,registerDriver} from "../controllers/authController.js";

import upload from "../config/multer.js";
import { login, registerDriver, registerUser } from "../controller/auth.controller.js";


const router =express.Router();


// LOGIN

router.post( "/login",login);


// USER REGISTER

router.post("/register-user",registerUser);


// DRIVER REGISTER

router.post(

  "/register-driver",

  upload.fields([

    {
      name: "profilePhoto",
      maxCount: 1
    },

    {
      name: "truckImage",
      maxCount: 1
    },

    {
      name: "rcImage",
      maxCount: 1
    },

    {
      name: "dlFrontImage",
      maxCount: 1
    },

    {
      name: "dlBackImage",
      maxCount: 1
    }

  ]),

  registerDriver
);

export default router;
