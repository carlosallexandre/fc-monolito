import { DataTypes, QueryInterface } from "sequelize";

export const up = async (query: QueryInterface) => {
  await query.createTable("order_products", {
    orderId: {
      type: DataTypes.STRING(255),
      field: "order_id",
      primaryKey: true,
      allowNull: false,
      references: {
        model: { tableName: "orders" },
        key: "id",
      },
    },
    productId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
      field: "product_id",
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
    salesPrice: {
      type: DataTypes.NUMBER,
      field: "sales_price",
      allowNull: false,
    },
  });
};

export const down = async (query: QueryInterface) => {
  await query.dropTable("order_products");
};
