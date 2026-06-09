import bcrypt from "bcryptjs";

import crypto from "crypto";

import User from "../model/user.model.js";
import Driver from "../model/driver.model.js";
import Admin from "../model/admin.model.js";

import generateToken
from "../utils/generateToken.js";

import transporter
from "../config/mail.js";



// USER REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User Registered",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DRIVER REGISTER
export const registerDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      dlNumber,
      vehicleType,
      vehicleNumber,
      insuranceNumber,
      rcNumber,
      aadhaarNumber,
    } = req.body;

    const existingDriver = await Driver.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingDriver) {
      return res.status(400).json({
        message: "Driver already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      phone,
      password: hashedPassword,
      dlNumber,
      vehicleType,
      vehicleNumber,
      insuranceNumber,
      rcNumber,
      aadhaarNumber,
    });

    const token = generateToken(driver._id, driver.role);

    res.status(201).json({
      message: "Driver Registered",
      token,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// COMMON LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let account =
      await User.findOne({ email }) ||
      await Driver.findOne({ email });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      account.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      account._id,
      account.role
    );

    res.status(200).json({
      message: "Login Success",
      role: account.role,
      token,
      user: account,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   FORGOT PASSWORD
========================================= */

export const forgotPassword =
async (req, res) => {

  try {

    const { email } =
      req.body;

    let account = null;


    // FIND USER

    account =
      await User.findOne({
        email
      });


    // FIND DRIVER

    if (!account) {

      account =
        await Driver.findOne({
          email
        });
    }


    // ACCOUNT NOT FOUND

    if (!account) {

      return res.status(404).json({

        message:
          "Account not found"
      });
    }


    // GENERATE TOKEN

    const resetToken =

      crypto
        .randomBytes(32)
        .toString("hex");


    // HASH TOKEN

    const hashedToken =

      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");


    // SAVE TO DB

    account.resetPasswordToken =
      hashedToken;

    account.resetPasswordExpire =

      Date.now() +
      10 * 60 * 1000;


    await account.save();


    // RESET URL

    const resetUrl =

`http://localhost:5173/reset-password/${resetToken}`;


    // SEND EMAIL

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Reset Password",

      html: `

        <h2>
          Password Reset
        </h2>

        <p>
          Click below link
          to reset password
        </p>

        <a href="${resetUrl}">
          Reset Password
        </a>

      `
    });


    res.status(200).json({

      message:
        "Reset link sent to email"
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};



/* =========================================
   RESET PASSWORD
========================================= */

export const resetPassword =
async (req, res) => {

  try {

    const token =
      req.params.token;


    // HASH TOKEN

    const hashedToken =

      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");


    let account = null;


    // FIND USER

    account =
      await User.findOne({

        resetPasswordToken:
          hashedToken,

        resetPasswordExpire: {
          $gt: Date.now()
        }
      });


    // FIND DRIVER

    if (!account) {

      account =
        await Driver.findOne({

          resetPasswordToken:
            hashedToken,

          resetPasswordExpire: {
            $gt: Date.now()
          }
        });
    }


    // INVALID TOKEN

    if (!account) {

      return res.status(400).json({

        message:
          "Invalid or expired token"
      });
    }


    // HASH NEW PASSWORD

    const hashedPassword =
      await bcrypt.hash(

        req.body.password,

        10
      );


    // UPDATE PASSWORD

    account.password =
      hashedPassword;


    // CLEAR RESET FIELDS

    account.resetPasswordToken =
      undefined;

    account.resetPasswordExpire =
      undefined;


    await account.save();


    res.status(200).json({

      message:
        "Password updated successfully"
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};