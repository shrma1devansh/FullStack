import User from "../models/user-model.js";

//Home controller

export const Home = async (req, res) => {
  try {
    res.status(200).send("Hello, World!");
  } catch (error) {
    res.status(400).send({ msg: "Page Not Found" });
  }
};
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
    res
      .status(200)
      .json({ msg: "User registered successfully", user: userCreated });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
};
