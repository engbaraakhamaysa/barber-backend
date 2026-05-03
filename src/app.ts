import express from "express";
import cors from "cors";
import shopRoutes from "./routers/shop.routes";
import chairRoutes from "./routers/chair.routes";
import queueRoutes from "./routers/queue.routes";
import customerRoutes from "./routers/customer.routes";
import bookingRoutes from "./routers/booking.routes";

const app = express();

app.use(cors());

app.use(express.json());

// routes
app.use("/shops", shopRoutes);
app.use("/chairs", chairRoutes);
app.use("/queue", queueRoutes);
app.use("/bookings", bookingRoutes);
app.use("/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
