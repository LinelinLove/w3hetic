import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.config';
import { findUserById, User } from '../models/user.model';

interface JwtPayload {
    id: number;
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(403).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await findUserById(decoded.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Failed to authenticate token' });
    }
};