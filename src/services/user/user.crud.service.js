import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { serviceSuccess, serviceError } from "../../utils/serviceResponse.js";


// CREATE USER
export const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    serviceError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const userResponse = newUser.toJSON();
  delete userResponse.password;

  return serviceSuccess(userResponse, "User created successfully");
};



// UPDATE USER
export const updateUser = async (UserID, data) => {
  const user = await User.findByPk(UserID);

  if (!user) {
    serviceError("User not found", 404);
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);

  const updatedUser = user.toJSON();
  delete updatedUser.password;

  return serviceSuccess(updatedUser, "User updated successfully");
};



// UPDATE ROLE
export const updateUserRole = async (UserID, role) => {
  const user = await User.findByPk(UserID);

  if (!user) {
    serviceError("User not found", 404);
  }

  user.role = role;
  await user.save();

  const updatedUser = user.toJSON();
  delete updatedUser.password;

  return serviceSuccess(updatedUser, "User role updated successfully");
};



// DELETE USER
export const deleteUser = async (UserID) => {
  const user = await User.findByPk(UserID);

  if (!user) {
    serviceError("User not found", 404);
  }

  // Check if user is admin
  if (user.role === "admin") {
    const adminCount = await User.count({
      where: { role: "admin" },
    });

    // If only one admin exists → block deletion
    if (adminCount === 1) {
      serviceError(
        "You are the only admin. Cannot delete this account.",
        400
      );
    }
  }

  // Proceed with deletion
  const updatedUser = user.toJSON();
  delete updatedUser.password;

  await user.destroy();

  return serviceSuccess(updatedUser, "User deleted successfully");
};

// services

export const updateUserStatus = async (userId, status) => {
  const user = await User.findByPk(userId);

  if (!user) {
    serviceError("User not found", 404);
  }

  // Convert once
  const userData = user.toJSON();
  delete userData.password;

  // Idempotent case
  if (user.status === status) {
    return serviceSuccess(userData, `User already ${status}`);
  }

  user.status = status;
  await user.save();

  const updatedUser = user.toJSON();
  delete updatedUser.password;

  return serviceSuccess(updatedUser, "User status updated successfully");
};

// GET ALL USERS
export const getUsers = async () => {
  const users = await User.findAll();

  const formattedUsers = users.map((user) => {
    const u = user.toJSON();
    delete u.password;
    return u;
  });

  return serviceSuccess(formattedUsers, "Users fetched successfully");
};


// GET SINGLE USER
export const getUserById = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    serviceError("User not found", 404);
  }

  const userData = user.toJSON();
  delete userData.password;

  return serviceSuccess(userData, "User fetched successfully");
};