import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepositoryI } from "./user_repository"; // Adjust the import path as necessary
import { JWT_SECRET, JWT_EXPIRATION } from "../config/jwt.config"; // Import your JWT config

export class AuthController {
  constructor(private userRepository: UserRepositoryI) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      // fetch user by username
      const user = await this.userRepository.getOneByUsername(username);

      // check if user exists
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // verify password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // generate JWT token using the imported secret and expiration
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      // send response with token
      return res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
