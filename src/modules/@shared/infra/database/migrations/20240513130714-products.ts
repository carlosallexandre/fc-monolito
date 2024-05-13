import { DataTypes, QueryInterface } from "sequelize";

export const up = async (query: QueryInterface) => {
  await query.createTable("products", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "purchase_price",
    },
    salesPrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "sales_price",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  });
};

export const down = async (query: QueryInterface) => {
  await query.dropTable("products");
};
