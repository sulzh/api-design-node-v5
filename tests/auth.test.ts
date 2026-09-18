import request from 'supertest';
import app from '../src/server.ts';
import { createTestUser, clearDatabase } from './setup/dbHelpers.ts';

describe('Authentication Endpoints', () => {
  afterEach(async () => {
    await clearDatabase();
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).not.toHaveProperty('password');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user with valid credentials', async () => {
      const { user, rawPassword } = await createTestUser();
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, password: rawPassword })
        .expect(201);
      
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).not.toHaveProperty('password');
    });
  });
});