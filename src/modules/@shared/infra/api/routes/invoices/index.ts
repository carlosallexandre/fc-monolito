import express from "express";
import InvoiceFacadeFactory from "../../../../../invoice/factory/invoice.facade.factory";

export const invoicesRoutes = express.Router();

invoicesRoutes.get("/:id", async (req, res) => {
  const result = await InvoiceFacadeFactory.create().find({
    id: req.params.id,
  });
  return res.send(result);
});
