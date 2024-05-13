import request from "supertest";
import { app } from "../api/express";
import sequelize from "../database/sequelize";

describe("Client e2e tests", () => {
  beforeEach(async () => {
    await sequelize.up();
  });

  afterEach(async () => {
    await sequelize.down();
  });

  it("should add a client", async () => {
    const input = {
      name: "John",
      email: "john@example.com",
      document: "document",
      address: {
        street: "street",
        number: "number",
        complement: "complement",
        city: "city",
        state: "state",
        zipCode: "zipCode",
      },
    };

    // prettier-ignore
    const result = await request(app)
      .post('/clients')
      .send(input);

    expect(result.statusCode).toBe(201);
  });
});
