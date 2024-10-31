if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the .env file');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';