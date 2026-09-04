import express from "express";
import { Home, Register } from "../controllers/auth-controller.js";

const router = express.Router();

// Home route
router.route("/").get(Home);

// register route
router.route("/register").post(Register);

export default router;
