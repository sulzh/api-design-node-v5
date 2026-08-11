import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'User list retrieved' }).status(200);
});

router.get('/:id', (req, res) => {
  res.json({ message: `User with ID ${req.params.id} retrieved` }).status(200);
});

router.put('/:id', (req, res) => {
  res.json({ message: `User with ID ${req.params.id} updated` }).status(200);
});

router.delete('/:id', (req, res) => {
  res.json({ message: `User with ID ${req.params.id} deleted` }).status(200);
});

export default router;