import { Sequelize } from "sequelize-typescript";

import Id from "../../@shared/domain/value-object/id.value-object";

import OrderRepository from "./order.repository";

import OrderModel from "./order.model";
import OrderProductModel from "./order-product.model";

import Order from "../domain/order.entity";
import OrderProduct from "../domain/order-product.entity";

const clientId = new Id("c1");

const products = [
  new OrderProduct({
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
  }),
  new OrderProduct({
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 10,
  }),
  new OrderProduct({
    name: "Product 3",
    description: "Product 3 description",
    salesPrice: 10,
  }),
];

describe("OrderRepository tests", () => {
  let sequelize: Sequelize;
  const sut = new OrderRepository();

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([OrderModel, OrderProductModel]);
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add an order", async () => {
    const order = new Order({
      clientId,
      products,
    });

    await sut.addOrder(order);

    const orderDb = await OrderModel.findByPk(order.id.id, {
      include: "products",
    });

    expect(orderDb.toJSON()).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        clientId: order.clientId.id,
        products: expect.arrayContaining(
          order.products.map((p) =>
            expect.objectContaining({
              orderId: order.id.id,
              productId: p.id.id,
              salesPrice: p.salesPrice,
            })
          )
        ),
      })
    );
  });

  it("should find an order", async () => {
    const orderId = "o1";
    await OrderModel.create(
      {
        id: orderId,
        status: "pending",
        clientId: clientId.id,
        products: products.map((p) => ({
          orderId: orderId,
          productId: p.id.id,
          name: p.name,
          description: p.description,
          salesPrice: p.salesPrice,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: "products" }
    );

    const order = await sut.findOrder(orderId);

    expect(order.id.id).toEqual(orderId);
    expect(order.status).toEqual("pending");
    //
    expect(order.clientId.id).toEqual(clientId.id);
    //
    expect(order.products.length).toEqual(products.length);
    expect(order.products.map((p) => p.id.id)).toEqual(
      expect.arrayContaining(products.map((p) => p.id.id))
    );
    expect(order.total).toBe(30);
  });
});
