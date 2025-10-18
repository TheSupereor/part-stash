import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import CatalogItem from "./CatalogItem.js";

const InventoryItem = sequelize.define('InvetoryItem', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

CatalogItem.hasMany(InventoryItem);
InventoryItem.belongsTo(CatalogItem, {
  foreignKey: 'catalogItemId'
});

export default InventoryItem;