import express from "express";
import authRouter from "./router/auth-router.js";
import { connectDB } from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Use the authentication router
// home route
app.get("/", (req, res) => {
  res.status(200).send("world best Mern series");
});

app.use("/api/auth", authRouter);
// Connect to MongoDB

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
