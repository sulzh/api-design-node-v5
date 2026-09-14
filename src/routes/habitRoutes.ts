import { Router } from 'express';
import { z } from 'zod';
import {
  validateBody,
  validateParams,
} from '../middleware/validation.ts';
import { authenticateToken } from '../middleware/auth.ts';
import { createHabit, getUserHabits, updateHabit } from '../controllers/habitController.ts';

const createHabitSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  targetCount: z.number().min(0),
  tagIds: z.array(z.string()).optional(),
});

const completeHabitSchema = z.object({
  completed: z.boolean(),
});

const completeParamsSchema = z.object({
  id: z.string(),
});

const router = Router();

router.use(authenticateToken);

router.get('/', getUserHabits);

router.patch('/:id', validateParams(completeParamsSchema), updateHabit);

router.get('/:id', (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} retrieved` }).status(200);
});

router.post('/', validateBody(createHabitSchema), createHabit);

router.delete('/:id', validateParams(completeParamsSchema), (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} deleted` }).status(200);
});

router.post('/:id/complete', validateParams(completeParamsSchema), validateBody(completeHabitSchema), (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} marked as complete` }).status(201);
});

export default router;