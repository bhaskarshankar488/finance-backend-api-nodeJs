import * as userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const createUser = async (req, res) => {
  try {
    // 1. Get validated data from request
    const userData = req.body;

    // 2. Call service layer
    const newUser = await userService.createUser(userData);

    // 3. Send success response
    return successResponse(res, "User created successfully", newUser, 201);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};