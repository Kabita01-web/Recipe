import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import recipeRoute from "./routes/recipeRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://recipe-frontend-kpzi.onrender.com",
    credentials: true,
  }),
);

// app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API");
});

app.get("/home", (req, res) => {
  res.status(200).json({ message: "This is the home page of the Recipe API" });
});
app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/recipes", recipeRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to Mongodb");
  })
  .catch((error) => {
    console.log("Error while connecting:", error);
  });
