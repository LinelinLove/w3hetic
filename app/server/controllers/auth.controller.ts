import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../repository/user_repository';
import { UserI } from '../types/user.d';

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    // checks if username already exists
    const existingUser = await UserRepository.getOneByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken.' });
    }

    // hash the password before saving
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser: UserI = {
        username,
        password_hash: passwordHash,
    };

    try {
        const createdUser = await UserRepository.insert(newUser);
        return res.status(201).json({ message: 'User registered successfully', userId: createdUser.id });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'An error occurred during registration' });
    }
};