import express from "express";
import cors from "cors";

import shopRoutes from "./modules/shop/shop.routes";
import barberRoutes from "./modules/barbers/barber.routes";
import customerRoutes from "./modules/customers/customer.routes";
import bookingSlotRoutes from "./modules/booking-slots/booking-slot.routes";
import bookingRoutes from "./modules/bookings/booking.routes";
import userRoutes from "./modules/users/user.routes";
import queueRoutes from "./modules/queue/queue.routes";
import customerBarberBlockRoutes from "./modules/customer-barber-blocks/customer-barber-block.routes";
import authRoutes from "./modules/auth/auth.routes";

import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

///////////////////////////////////////////
// MIDDLEWARES
// Enable CORS for cross-origin requests
// Parse incoming requests with JSON payloads
///////////////////////////////////////////

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

///////////////////////////////////////////
// HEALTH CHECK
// Verify that the API is running
// Return a successful response from the root endpoint
///////////////////////////////////////////

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Barber API is working",
  });
});

///////////////////////////////////////////
// ROUTES
// Register application API routes
// Organize endpoints by application module
///////////////////////////////////////////

app.use("/api/users", userRoutes);

app.use("/api/shops", shopRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/booking-slots", bookingSlotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/customer-barber-blocks", customerBarberBlockRoutes);
app.use("/api/auth", authRoutes);

///////////////////////////////////////////
// ERROR HANDLING
// Handle requests for undefined routes
// Handle unexpected application errors globally
///////////////////////////////////////////

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
