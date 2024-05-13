import express from "express";
import ProductAdmFacadeFactory from "../../../../../product-adm/factory/facade.factory";

export const productsRoutes = express.Router();

productsRoutes.post("/", async (req, res) => {
  await ProductAdmFacadeFactory.create().addProduct({
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.purchasePrice,
    stock: req.body.stock,
  });

  return res.sendStatus(201);
});
