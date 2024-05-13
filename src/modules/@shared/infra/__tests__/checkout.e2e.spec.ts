import request from "supertest";
import { app } from "../api/express";
import sequelize from "../database/sequelize";
import { ProductModel } from "../../../product-adm/repository/product.model";
import { ClientModel } from "../../../client-adm/repository/client.model";

describe("Checkout e2e tests", () => {
  beforeEach(async () => {
    await sequelize.up();
  });

  afterEach(async () => {
    await sequelize.down();
  });

  it("should checkout", async () => {
    await Promise.all([
      ProductModel.create({
        id: "p1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 20,
        salesPrice: 25,
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      ProductModel.create({
        id: "p2",
        name: "Product 2",
        description: "Product 2 description",
        purchasePrice: 15,
        salesPrice: 30,
        stock: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      ProductModel.create({
        id: "p3",
        name: "Product 3",
        description: "Product 3 description",
        purchasePrice: 8,
        salesPrice: 18,
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]);

    await ClientModel.create({
      id: "c1",
      name: "John",
      email: "john@exmample.com",
      document: "document",
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zipcode: "zipCode",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      clientId: "c1",
      products: [{ productId: "p2" }, { productId: "p3" }],
    };

    const result = await request(app).post("/checkout").send(input);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      id: expect.any(String),
      total: 48,
      products: expect.arrayContaining(input.products),
    });
  });
});
