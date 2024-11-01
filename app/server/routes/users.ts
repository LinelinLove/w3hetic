import { Router } from "express";
import {
  register,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller";
import { AuthController } from "../controllers/login";
import { UserRepository } from "../repository/user_repository";

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);
const router = Router();

router.post("/register", register);

router.get("/user/:username", getUser);

router.put("/user/:username", updateUser);

router.delete("/user/:username", deleteUser);

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
