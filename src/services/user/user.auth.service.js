import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { serviceSuccess, serviceError } from "../../utils/serviceResponse.js";

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.UserID,
    email: user.email,
    role: user.role,
  };
};

// LOGOUT SERVICE
export const logoutUser = async (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        const error = new Error("Logout failed");
        error.status = 500;
        return reject(error);
      }

      resolve(serviceSuccess("Logout successful"));
    });
  });
};