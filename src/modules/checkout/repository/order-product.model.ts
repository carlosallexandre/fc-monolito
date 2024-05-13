import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({ tableName: "order_products", timestamps: false })
export default class OrderProductModel extends Model {
  @PrimaryKey
  @ForeignKey(() => OrderModel)
  @Column({ field: "order_id" })
  orderId: string;

  @PrimaryKey
  @Column({ field: "product_id" })
  productId: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column({ field: "sales_price" })
  salesPrice: number;
}
