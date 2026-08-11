import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Registration successful' }).status(201);
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login successful' }).status(201);
});

export default router;