import express from "express";
import ClientAdmFacadeFactory from "../../../../../client-adm/factory/client-adm.facade.factory";

export const clientsRoutes = express.Router();

clientsRoutes.post("/", async (req, res) => {
  await ClientAdmFacadeFactory.create().add(req.body);
  return res.sendStatus(201);
});
