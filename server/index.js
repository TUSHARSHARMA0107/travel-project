import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import bidRoutes from "./routes/bid.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import trackingRoutes from "./routes/tracking.route.js";
import recommendationRoutes from "./routes/recomendation.route.js";

const app = express();


// CREATE HTTP SERVER
const server =
  http.createServer(app);


// SOCKET.IO SETUP
const io = new Server(server, {

  cors: {
    origin: "*",
  },

});


// MIDDLEWARES
app.use(cors());

app.use(express.json());


// DATABASE
connectDB();


// ROUTES
app.use("/api/auth",authRoutes);

app.use("/api/booking",bookingRoutes);

app.use("/api/bid",bidRoutes);
  
app.use("/api/tracking",trackingRoutes);
app.use("/api/drivers",driverRoutes);
app.use("/api/recommendation",recommendationRoutes);

// SOCKET CONNECTION
io.on(
  "connection",
  (socket) => {

    console.log(
      "Socket connected:",
      socket.id
    );

    // DRIVER LOCATION UPDATE
    socket.on(
      "driverLocationUpdate",
      (data) => {

        io.emit(
          "receiveDriverLocation",
          data
        );
      }
    );

    // TRIP STATUS UPDATE
    socket.on(
      "tripStatusUpdate",
      (data) => {

        io.emit(
          "receiveTripStatus",
          data
        );
      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "Socket disconnected"
        );
      }
    );
  }
);


// PORT
const PORT =
  process.env.PORT || 5000;


// USE server.listen INSTEAD OF app.listen
server.listen(
  PORT,
  () => {

    console.log(
      `Server running on ${PORT}`
    );
  }
);