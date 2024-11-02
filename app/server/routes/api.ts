import express from "express";
import { getAll } from "../controllers/api_controller";
import { App } from "../types/app";

export function getRoute(app: App) {
  const apiUserRouter = express.Router();

  apiUserRouter.get("/", getAll(app));

  return apiUserRouter;
}
