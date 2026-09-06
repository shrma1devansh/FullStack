import express from "express";
import { Home, Register, login } from "../controllers/auth-controller.js";
import { signupSchema } from "../validators/auth-validator.js";
import { validate } from "../middlewares/validate-middleware.js";

const router = express.Router();

// Home route
router.route("/").get(Home);

// register route
router.route("/register").post(validate(signupSchema), Register);

// Login route
router.route("/login").post(login);

export default router;
