import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import User from "./user.models.js"; // Import User model
import Consumer from "./consumer.model.js"; // Import Consumer model

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    items: {
      type: DataTypes.JSONB,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue("items");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("items", JSON.stringify(value));
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, // Reference the User model directly
        key: "id",
      },
    },
    consumerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Consumer, // Reference the Consumer model directly
        key: "id",
      },
    },
  },
  {
    sequelize, // Ensure this is the correct property name
    modelName: 'Order', // Model name in singular
    timestamps: true,
  }
);

export default Order;
