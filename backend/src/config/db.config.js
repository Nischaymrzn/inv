import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initializeModels } from "../models/index.js"; // Import the initializeModels function

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Disable logging for cleaner output
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const db = async () => {
  try {
    await sequelize.authenticate(); // Ensure database authentication
    // initializeModels(sequelize); // Initialize models with the sequelize instance
    await sequelize.sync({ alter: true }); // Sync models with DB
    console.log("✅ Database connected successfully");
  } catch (e) {
    console.error("❌ Failed to connect to the database", e);
  }
};
