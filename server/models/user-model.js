import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const User = mongoose.model("User", userSchema);

export default User;
