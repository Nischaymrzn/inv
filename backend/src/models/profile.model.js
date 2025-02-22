import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import User from "./user.models.js"; // Import User model

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize, // Ensure this is the correct property name
    modelName: 'Profile', // Model name in singular
    timestamps: true,
  }
);

export default Profile;
