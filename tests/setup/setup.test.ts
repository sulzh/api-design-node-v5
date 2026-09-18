import { createTestUser, createTestHabit, clearDatabase } from './dbHelpers.ts';

describe('Test Setup', () => {
  test('should connect to the test database', async () => {
    const { user, token } = await createTestUser();
    expect(user).toBeDefined();
    await clearDatabase();
  });
});