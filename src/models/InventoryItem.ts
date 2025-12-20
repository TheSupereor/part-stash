import { Model, DataTypes, Sequelize } from 'sequelize';
import { CatalogItem } from './CatalogItem';

export class InventoryItem extends Model {
  public id!: number;
  public location!: string;
  public quantity!: number;
  public catalogItemId!: number;
}

export const initInventoryItem = (sequelize: Sequelize) => {
  InventoryItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    
    catalogItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CatalogItems',
        key: 'id',
      }
    }
  }, {
    sequelize,
    tableName: 'InventoryItems',
  });
};