import request from "supertest";
import { app } from "../api/express";
import sequelize from "../database/sequelize";

describe("Products e2e tests", () => {
  beforeEach(async () => {
    await sequelize.up();
  }, 10000);

  afterEach(async () => {
    await sequelize.down();
  }, 10000);

  it("should add a product", async () => {
    const input = {
      name: "Product 1",
      description: "Product description",
      purchasePrice: 10,
      stock: 3,
    };

    // prettier-ignore
    const result = await request(app)
      .post('/products')
      .send(input);

    expect(result.statusCode).toBe(201);
  });
});
