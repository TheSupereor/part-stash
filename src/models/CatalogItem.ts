import { DataTypes, Model } from "sequelize";

export class CatalogItem extends Model {
  public name!: string;
  public description!: string;
  public partNumber!: string;
  public specifications!: JSON;
}

export function initCatalogItem(sequelize: any) {
  CatalogItem.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      partNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      specifications: {
        type: DataTypes.JSONB,
      },
    },
    { sequelize, modelName: "CatalogItem" }
  );
}

export default CatalogItem;
