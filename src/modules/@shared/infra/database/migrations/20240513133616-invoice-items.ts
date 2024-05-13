import { DataTypes, QueryInterface } from "sequelize";

export const up = async (query: QueryInterface) => {
  await query.createTable("invoice_items", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    invoiceId: {
      type: DataTypes.STRING(255),
      field: "invoice_id",
      allowNull: false,
      references: {
        model: { tableName: "invoices" },
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

export const down = async (query: QueryInterface) => {
  await query.dropTable("invoice_items");
};
