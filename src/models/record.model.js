import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Record = sequelize.define("Record", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "records",
  timestamps: true,
});