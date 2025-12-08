import { initCatalogItem, CatalogItem } from "./CatalogItem";
import { initInventoryItem, InventoryItem } from "./InventoryItem";

export function initModels(sequelize: any) {
  initCatalogItem(sequelize);
  initInventoryItem(sequelize);

  CatalogItem.hasMany(InventoryItem);
  InventoryItem.belongsTo(CatalogItem, { foreignKey: "catalogItemId" });

  return { CatalogItem, InventoryItem };
}
