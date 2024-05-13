import Order from "../domain/order.entity";

export default interface OrderGateway {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order | null>;
}
