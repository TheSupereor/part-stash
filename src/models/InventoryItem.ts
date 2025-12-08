import { DataTypes, Model, Optional } from "sequelize";

interface InventoryItemAttributes {
  id: number;
  location: string;
  quantity: number;
  catalogItemId?: number;
}

type InventoryItemCreationAttributes = Optional<
  InventoryItemAttributes,
  "id"
>;

export class InventoryItem
  extends Model<InventoryItemAttributes, InventoryItemCreationAttributes>
  implements InventoryItemAttributes
{
  public id!: number;
  public location!: string;
  public quantity!: number;
  public catalogItemId?: number;
}

export function initInventoryItem(sequelize: any) {
  InventoryItem.init(
    {
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
    },
    { sequelize, modelName: "InventoryItem" }
  );

  return InventoryItem;
}

export default InventoryItem;
