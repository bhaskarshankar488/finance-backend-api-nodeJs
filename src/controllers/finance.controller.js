import * as financeService from "../services/finance/finance.service.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// CREATE
export const createRecord = async (req, res) => {
  try {
    const result = await financeService.createRecord(req.user?.id, req.body);
    return successResponse(res, result.message, result.data, 201);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

// GET
export const getRecords = async (req, res) => {
  try {
    const result = await financeService.getRecords(req.user?.id, req.query);
    return successResponse(res, result.message, result.data);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

// UPDATE
export const updateRecord = async (req, res) => {
  try {
    const result = await financeService.updateRecord(
      req.user?.id,
      req.params.id,
      req.body
    );
    return successResponse(res, result.message, result.data);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

// DELETE
export const deleteRecord = async (req, res) => {
  try {
    const result = await financeService.deleteRecord(
      req.user?.id,
      req.params.id
    );
    return successResponse(res, result.message);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const dashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await financeService.getDashboardSummary(userId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};