import OrderGateway from "../gateway/checkout.gateway";
import Id from "../../@shared/domain/value-object/id.value-object";
import OrderModel from "./order.model";
import OrderProduct from "../domain/order-product.entity";
import Order from "../domain/order.entity";

export default class OrderRepository implements OrderGateway {
  async addOrder(order: Order): Promise<void> {
    console.log({
      id: order.id.id,
      status: order.status,
      clientId: order.clientId.id,
      products: order.products.map((p) => ({
        orderId: order.id.id,
        productId: p.id.id,
        name: p.name,
        description: p.description,
        salesPrice: p.salesPrice,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });

    await OrderModel.create(
      {
        id: order.id.id,
        status: order.status,
        clientId: order.clientId.id,
        products: order.products.map((p) => ({
          orderId: order.id.id,
          productId: p.id.id,
          name: p.name,
          description: p.description,
          salesPrice: p.salesPrice,
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      { include: "products" }
    );
  }

  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findByPk(id, { include: "products" });

    return new Order({
      id: new Id(order.id),
      status: order.status,
      clientId: new Id(order.clientId),
      products: order.products.map(
        (p) =>
          new OrderProduct({
            id: new Id(p.productId),
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice,
          })
      ),
    });
  }
}
