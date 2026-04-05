import express from "express";
import {
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
  updateUserStatus,
  getUsers,         
  getUserById 
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import { createUserSchema ,
  updateUserSchema,
  updateRoleSchema, 
  updateStatusSchema,
   getUserByIdSchema
} from "../validators/user.validator.js";


const router = express.Router();

// POST /api/users
router.post(
  "/createuser",
  isAuthenticated,
  authorizeRoles("admin"),
  validate(createUserSchema), // 👈 validator middleware
  createUser
);

// Update user details (Admin only)
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validate(updateUserSchema),
  updateUser
);

// Update role only
router.patch(
  "/:id/role",
  isAuthenticated,
  authorizeRoles("admin"),
  validate(updateRoleSchema),
  updateUserRole
);

// Delete user
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
router.patch(
  "/:id/status",
  isAuthenticated,
  authorizeRoles("admin"),
  validate(updateStatusSchema),
  updateUserStatus
);

router.get(
  "/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validate(getUserByIdSchema, "params"),
  getUserById
);

router.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsers
);



export default router;