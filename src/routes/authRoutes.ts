import { Router } from 'express';
import { z }  from 'zod';
import { loginUser, registerUser } from '../controllers/authController.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const router = Router();

router.post('/register', validateBody(insertUserSchema), registerUser);

router.post('/login', validateBody(loginSchema), loginUser);

export default router;