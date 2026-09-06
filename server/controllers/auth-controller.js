import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

//Home controller

export const Home = async (req, res) => {
  try {
    res.status(200).send("Hello, World!");
  } catch (error) {
    res.status(400).send({ msg: "Page Not Found" });
  }
};

// Register controller
// Registration logic
// 1. Receive user data from the request body
// 2. Validate the data (e.g., check if the email is already registered, validate password strength, etc.)
// 3. Hash the password using bcrypt
// 4. Create a new user with hashed password and save user to the database
// 5. Send a response back to the client indicating success or failure
export const Register = async (req, res) => {
  try {
    // handle user registration logic here
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user with hashed password
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(200).json({
      msg: "User registered successfully",
      token: await userCreated.generateAuthToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  try {
    // 1. Receive login credentials from the request body
    const { email, password } = req.body;

    // 2. Find the user by email
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (!userExists) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log("Entered password:", password);
    console.log("DB password:", userExists.password);

    // 3. Compare the provided password with the hashed password
    // const isPasswordValid = await bcrypt.compare(password, userExists.password);
    // moving this user model
    const isPasswordValid = await userExists.comparePassword(password);
    console.log("Password valid:", isPasswordValid);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExists.generateAuthToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error during login" });
  }
};
