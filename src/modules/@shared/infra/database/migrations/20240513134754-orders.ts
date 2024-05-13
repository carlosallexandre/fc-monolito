import { DataTypes, QueryInterface } from "sequelize";

export const up = async (query: QueryInterface) => {
  await query.createTable("orders", {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING(255),
      field: "client_id",
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  await query.dropTable("orders");
};
