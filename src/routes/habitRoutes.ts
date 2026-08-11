import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Habit list retrieved' }).status(200);
});

router.get('/:id', (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} retrieved` }).status(200);
});

router.post('/', (req, res) => {
  res.json({ message: 'Habit created' }).status(201);
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} deleted` }).status(200);
});

router.post('/:id/complete', (req, res) => {
  res.json({ message: `Habit with ID ${req.params.id} marked as complete` }).status(201);
});

export default router;