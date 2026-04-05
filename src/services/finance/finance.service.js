import { Record } from "../../models/finance.model.js";
import { serviceSuccess, serviceError } from "../../utils/serviceResponse.js";
import { Op } from "sequelize";

// CREATE
export const createRecord = async (userId, data) => {
  if (!userId) {
    serviceError("User not authenticated", 401);
  }

  const record = await Record.create({
    userId,
    ...data,
  });

  return serviceSuccess(record, "Record created successfully");
};

// GET WITH FILTERS
export const getRecords = async (userId, filters) => {
  if (!userId) {
    serviceError("User not authenticated", 401);
  }

  const { type, category, startDate, endDate } = filters;

  const where = { userId };

  if (type) where.type = type;
  if (category) where.category = category;

  if (startDate && endDate) {
    where.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  const records = await Record.findAll({ where });

  return serviceSuccess(records, "Records fetched successfully");
};

// UPDATE
export const updateRecord = async (userId, id, data) => {
  const record = await Record.findByPk(id);

  if (!record) {
    serviceError("Record not found", 404);
  }

  if (record.userId !== userId) {
    serviceError("Unauthorized", 403);
  }

  await record.update(data);

  return serviceSuccess(record, "Record updated successfully");
};

// DELETE
export const deleteRecord = async (userId, id) => {
  const record = await Record.findByPk(id);

  if (!record) {
    serviceError("Record not found", 404);
  }

  if (record.userId !== userId) {
    serviceError("Unauthorized", 403);
  }

  await record.destroy();

  return serviceSuccess(null, "Record deleted successfully");
};

export const getDashboardSummary = async (userId) => {
  const records = await Record.findAll({ where: { userId } });

  let income = 0;
  let expense = 0;

 records.forEach((r) => {
  const amount = Math.abs(parseFloat(r.amount)); // 🔥 FIX

  if (r.type === "income") {
    income += amount;
  } else {
    expense += amount;
  }
});

  return {
    success: true,
    data: {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
    },
  };
};