import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
// hash the password before saving the user
userSchema.pre("save", async function (next) {
  console.log("From user model", this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    // Hash the password before saving
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

// Compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//jwt token generation
userSchema.methods.generateAuthToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30h" },
    );
  } catch (error) {
    console.error("Error generating auth token:", error);
    throw new Error("Token generation failed");
  }
};

// Creating collection
const User = mongoose.model("User", userSchema);

export default User;
