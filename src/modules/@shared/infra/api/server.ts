import { app } from "./express";
import sequelize from "../database/sequelize";

async function bootstrap() {
  await sequelize.up();

  const PORT = 3333;

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });
}
bootstrap();
