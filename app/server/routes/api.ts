import express from "express";
import { getOne, getAll } from "../controllers/api_controller";
import { App } from "../types/app";

export function getRoute(app: App) {
  const apiUserRouter = express.Router();

  // apiUserRouter.param('id', (req, res, next, id) => {
  //     console.log(id)
  //     req.user = id
  //     next()
  // })

  apiUserRouter.get("/", getAll(app));

  apiUserRouter.get("/:id(\\d+)", getOne(app));

  return apiUserRouter;
}
