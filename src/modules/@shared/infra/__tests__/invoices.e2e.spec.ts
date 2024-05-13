import request from "supertest";
import { app } from "../api/express";
import sequelize from "../database/sequelize";
import InvoiceModel from "../../../invoice/repository/invoice.model";

describe("Invoices e2e tests", () => {
  beforeEach(async () => {
    await sequelize.up();
  });

  afterAll(async () => {
    await sequelize.down();
  });

  it("should find an invoice by id", async () => {
    await InvoiceModel.create(
      {
        id: "i1",
        name: "John",
        document: "document",
        street: "street",
        number: "number",
        complement: "complement",
        state: "state",
        city: "city",
        zipCode: "zipCode",
        items: [
          { id: "t1", name: "Product 1", price: 10 },
          { id: "t2", name: "Product 2", price: 10 },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: "items" }
    );

    const result = await request(app).get("/invoices/i1");

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      id: "i1",
      name: "John",
      document: "document",
      address: {
        street: "street",
        number: "number",
        complement: "complement",
        city: "city",
        state: "state",
        zipCode: "zipCode",
      },
      items: expect.arrayContaining([
        { id: "t1", name: "Product 1", price: 10 },
        { id: "t2", name: "Product 2", price: 10 },
      ]),
      total: 20,
      createdAt: expect.any(String),
    });
  });
});
