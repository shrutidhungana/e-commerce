import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const uri:string =
  "mongodb+srv://shrutidhungana123:Softwareengineer@12@cluster0.plrct.mongodb.net/"; // Update this line

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
