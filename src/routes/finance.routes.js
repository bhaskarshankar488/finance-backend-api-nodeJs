import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  dashboardSummary
} from "../controllers/finance.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createRecordSchema,
  updateRecordSchema,
} from "../validators/finance.validator.js";

const router = express.Router();

// Base: /api/finance

// ===== CREATE =====
router.post(
  "/",
  isAuthenticated,
  checkPermission("finance", "create"),
  validate(createRecordSchema),
  createRecord
);

// ===== READ =====
router.get(
  "/",
  isAuthenticated,
  checkPermission("finance", "read"),
  getRecords
);

router.get(
  "/dashboard",
  isAuthenticated,
  checkPermission("finance", "read"),
  dashboardSummary
);

// ===== UPDATE =====
router.put(
  "/:id",
  isAuthenticated,
  checkPermission("finance", "update"),
  validate(updateRecordSchema),
  updateRecord
);

// ===== DELETE =====
router.delete(
  "/:id",
  isAuthenticated,
  checkPermission("finance", "delete"),
  deleteRecord
);

export default router;