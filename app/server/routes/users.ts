import { Router } from "express";
import {
  register,
  getUser,
  updateUser,
  deleteUser,
  getTotalUploadSize,
  getFilenames,
} from "../controllers/auth.controller";
import { AuthController } from "../controllers/login";
import { UserRepository } from "../repository/user_repository";

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);
const router = Router();

router.get("/user/:username", getUser);

router.put("/user/:username", updateUser);

router.delete("/user/:username", deleteUser);

router.post("/auth/register", register);

router.get("/user/memory-left/:userId(\\d+)", getTotalUploadSize);

router.get("/user/files/:userId(\\d+)", getFilenames);

router.post("/auth/login", (req: Request, res: Response) => {
  return authController.login(req, res);
});

export default router;
