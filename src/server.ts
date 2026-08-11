import express from 'express';

import habitRoutes from './routes/habitRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();

app.get('/health', (req, res) => {
  res.send('<html><body><h1>Server is healthy</h1></body></html>');
});

app.use('/habits', habitRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export { app };
export default app;