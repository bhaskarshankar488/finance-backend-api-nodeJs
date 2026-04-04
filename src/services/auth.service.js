import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

// LOGIN SERVICE
export const loginUser = async ({ email, password }) => {
  // 1. Find user
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};


// LOGOUT SERVICE
export const logoutUser = async (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) return reject(new Error("Logout failed"));
      resolve(true);
    });
  });
};