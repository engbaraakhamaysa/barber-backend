import express from "express";
import cors from "cors";

import shopRoutes from "./modules/shop/shop.routes";
import barberRoutes from "./modules/barbers/barber.routes";
import customerRoutes from "./modules/customers/customer.routes";
import bookingSlotRoutes from "./modules/booking-slots/booking-slot.routes";

import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// ==========================================================
// Middlewares
// ==========================================================

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// ==========================================================
// Health Check
// ==========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Barber API is working",
  });
});

// ==========================================================
// Routes
// ==========================================================

app.use("/api/shops", shopRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/booking-slots", bookingSlotRoutes);

// ==========================================================
// Error Handling
// ==========================================================

// Route not found
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;
