import express from "express";
import { Home, Register, login } from "../controllers/auth-controller.js";

const router = express.Router();

// Home route
router.route("/").get(Home);

// register route
router.route("/register").post(Register);

// Login route
router.route("/login").post(login);

export default router;
