import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderProductModel from "./order-product.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  status: string;

  @Column({ field: "client_id" })
  clientId: string;

  @HasMany(() => OrderProductModel)
  products: OrderProductModel[];

  @Column({ field: "created_at" })
  createdAt: Date;

  @Column({ field: "updated_at" })
  updatedAt: Date;
}
