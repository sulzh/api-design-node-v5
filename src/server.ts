import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { isTest } from '../env.ts';

import habitRoutes from './routes/habitRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', { skip: () => isTest() }));

app.get('/health', (req, res) => {
  res.send('<html><body><h1>Server is healthy</h1></body></html>');
});

app.use('/habits', habitRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export { app };
export default app;