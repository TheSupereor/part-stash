import { DataTypes, Model, Sequelize } from "sequelize";

export interface CatalogItemAttributes {
  id?: number;
  name: string;
  description?: string;
  partNumber?: string;
}

export class CatalogItem extends Model<CatalogItemAttributes> implements CatalogItemAttributes {
  public name!: string;
  public description!: string;
  public partNumber!: string;
  public specifications!: JSON;
}

export const initCatalogItem = (sequelize: Sequelize) => {
  CatalogItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // <--- Isso garante que é único
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    partNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'CatalogItems',
  });
};

export default CatalogItem;
