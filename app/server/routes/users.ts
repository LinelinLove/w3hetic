import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { AuthController } from '../controllers/login'; // Adjust the path as needed
import { UserRepository } from '../repository/user_repository'; // Adjust the path as needed

const userRepository = new UserRepository(); // Initialize your UserRepository
const authController = new AuthController(userRepository);
const router = Router();

router.post('/register', register);

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
