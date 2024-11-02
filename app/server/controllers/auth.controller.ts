import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserRepository from "../repository/user_repository";
import { UserI } from "../types/user.d";

// helper
const getUserByUsername = async (username: string): Promise<UserI | null> => {
  return await UserRepository.getOneByUsername(username);
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, username, password } = req.body;

  // checks if email already exists
  const existingEmail = await UserRepository.getOneByEmail(email);
  const existingUsername = await UserRepository.getOneByUsername(username);
  if (existingEmail) {
    return res.status(400).json({ message: "Email is already taken." });
  }
  if (existingUsername) {
    return res.status(400).json({ message: "Username is already taken." });
  }

  // hash the password before saving
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // create new user
  const newUser: UserI = {
    email,
    username,
    password_hash: passwordHash,
  };

  try {
    const createdUser = await UserRepository.insert(newUser);
    return res.status(201).json({
      message: "User registered successfully",
      userId: createdUser.id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration" });
  }
};

export const updateUser = async (
  req: Request<{ username: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.params;
    const existingUser = await getUserByUsername(username);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let password_hash = existingUser.password_hash;
    if (req.body.password) {
      password_hash = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = {
      id: existingUser.id,
      username: req.body.username || existingUser.username,
      password_hash,
    };

    await UserRepository.update(updatedUser);
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updateUser route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request<{ username: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.params;
    const existingUser = await getUserByUsername(username);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserRepository.delete(existingUser.id);

    // return res.status(204).send();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get user details
export const getUser = async (
  req: Request<{ username: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a sanitized user object, omitting sensitive information
    const { password_hash, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error in getUser route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalUploadSize = async (
  req: Request<{ userId: number }>,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const existingUser = await UserRepository.getOne(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalUploadSize = await UserRepository.getTotalUploadSizeByUserId(
      userId
    );

    if (totalUploadSize === null) {
      return res
        .status(200)
        .json({ message: "No uploads available for this user." });
    }

    if (totalUploadSize === null) {
      return res
        .status(404)
        .json({ message: "User not found or no uploads available" });
    }

    return res.json({ userId, totalUploadSize });
  } catch (error) {
    console.error("Error in getTotalUploadSize route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFilenames = async (
  req: Request<{ userId: number }>,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const existingUser = await UserRepository.getOne(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalUploadSize = await UserRepository.getFilenamesByUserId(userId);

    if (totalUploadSize === null) {
      return res
        .status(200)
        .json({
          message: "No uploads available for this user.",
          totalUploadSize: 0,
        });
    }

    if (totalUploadSize === null) {
      return res
        .status(404)
        .json({ message: "User not found or no uploads available" });
    }

    return res.json({ userId, totalUploadSize });
  } catch (error) {
    console.error("Error in getTotalUploadSize route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
