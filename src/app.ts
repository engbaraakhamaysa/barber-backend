import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
