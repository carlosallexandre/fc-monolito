import express from "express";
import CheckoutFacadeFactory from "../../../../../checkout/factory/checkout.facade.factory";

export const checkoutRoutes = express.Router();

checkoutRoutes.post("/", async (req, res) => {
  const result = await CheckoutFacadeFactory.create().placeOrder(req.body);
  return res.send(result);
});
