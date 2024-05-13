import Umzug from "umzug";
import path from "node:path";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  return new Umzug({
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: path.resolve(__dirname, "migrations"),
      pattern: /\.ts$/,
    },
    storage: "sequelize",
    storageOptions: {
      sequelize,
    },
  });
};
