import express from "express";
import { getAll } from "../controllers/api_controller";
import { App } from "../types/app";
import { login } from "../controllers/login";

export function getRoute(app: App) {
  const apiUserRouter = express.Router();

  apiUserRouter.get("/", getAll(app));

  // apiUserRouter.post("/login");

  // apiUserRouter.get("/:id(\\d+)", getOne(app));

  return apiUserRouter;
}
