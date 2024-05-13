import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../product-adm/repository/product.model";
import { ClientModel } from "../../../client-adm/repository/client.model";
import InvoiceModel from "../../../invoice/repository/invoice.model";
import InvoiceItemModel from "../../../invoice/repository/invoice-item.model";
import OrderModel from "../../../checkout/repository/order.model";
import OrderProductModel from "../../../checkout/repository/order-product.model";
import StoreProductModel from "../../../store-catalog/repository/product.model";
import umzug from "./umzug";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: true,
  models: [
    StoreProductModel,
    // product-adm
    ProductModel,
    // client-admn
    ClientModel,
    // invoice
    InvoiceModel,
    InvoiceItemModel,
    // checkout
    OrderModel,
    OrderProductModel,
  ],
});

const up = () => umzug(sequelize).up();

const down = async () => {
  // await umzug(sequelize).down({ to: 0 });
  await sequelize.close();
};

export default { up, down, instance: sequelize };
