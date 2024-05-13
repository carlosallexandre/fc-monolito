import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import OrderProduct from "./order-product.entity";

type OrderProps = {
  id?: Id;
  clientId: Id;
  products: OrderProduct[];
  status?: string;
};

export default class Order extends BaseEntity {
  private _clientId: Id;
  private _products: OrderProduct[];
  private _status: string;

  constructor(props: OrderProps) {
    super(props.id);
    this._clientId = props.clientId;
    this._products = props.products;
    this._status = props.status || "pending";
  }

  get clientId(): Id {
    return this._clientId;
  }

  get products(): OrderProduct[] {
    return this._products;
  }

  get status(): string {
    return this._status;
  }

  get total(): number {
    return this._products.reduce(
      (total, product) => total + product.salesPrice,
      0
    );
  }
}
