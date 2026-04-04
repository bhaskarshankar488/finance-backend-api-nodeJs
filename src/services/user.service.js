import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user in DB
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  // 4. Remove sensitive data before returning
  const userResponse = newUser.toJSON();
  delete userResponse.password;

  return userResponse;
};