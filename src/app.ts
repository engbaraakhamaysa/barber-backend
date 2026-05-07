import express from "express";
import cors from "cors";
import shopRoutes from "./routers/shop.routes";
const app = express();

app.use(cors());

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/shops", shopRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
