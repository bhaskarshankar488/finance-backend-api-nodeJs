// validators/finance.validator.js

import Joi from "joi";

export const createRecordSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().optional(),
  date: Joi.date().required(),
  notes: Joi.string().optional(),
});

export const updateRecordSchema = Joi.object({
  amount: Joi.number().optional(),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional(),
  date: Joi.date().optional(),
  notes: Joi.string().optional(),
});