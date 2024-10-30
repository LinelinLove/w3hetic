import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { App } from "../types/app";

export function login() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Find user in "database" (replace with actual database lookup)
    const user = users.find((u) => u.username === username);

    // Validate user and password
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      // Generate JWT token
      const token = generateToken(user);
      return res.json({ message: "Login successful", token });
    }
    res.status(401).json({ message: "Invalid username or password" });
  };
}
