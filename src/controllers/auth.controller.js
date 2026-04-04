import * as authService from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    // 1. Get validated data
    const loginData = req.body;

    // 2. Call service
    const user = await authService.loginUser(loginData);

    // 3. Store session
    req.session.user = {
      id: user.UserID,
      role: user.role,
      email: user.email,
    };

    // 4. Send response
    return successResponse(res, "Login successful", req.session.user, 200);

  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};


// LOGOUT USER
export const logoutUser = async (req, res) => {
  try {
    // 1. Call service
    await authService.logoutUser(req);

    // 2. Send response
    return successResponse(res, "Logout successful", null, 200);

  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};