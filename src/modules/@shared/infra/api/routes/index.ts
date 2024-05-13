import express from "express";
import { productsRoutes } from "./products";
import { clientsRoutes } from "./clients";
import { checkoutRoutes } from "./checkout";
import { invoicesRoutes } from "./invoices";

const routes = express.Router();

routes.use("/products", productsRoutes);
routes.use("/clients", clientsRoutes);
routes.use("/checkout", checkoutRoutes);
routes.use("/invoices", invoicesRoutes);

export default routes;
