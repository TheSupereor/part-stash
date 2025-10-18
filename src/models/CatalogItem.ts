import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CatalogItem = sequelize.define('CatalogItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  partNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  specifications: {
    type: DataTypes.JSONB
  }
})

export default CatalogItem