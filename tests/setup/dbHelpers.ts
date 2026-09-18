import { db } from '../../src/db/connection.ts';
import { users, habits, entries, tags, habitTags, type NewUser, type NewHabit } from '../../src/db/schema.ts';
import { generateToken } from '../../src/utils/jwt.ts';
import { hashPassword } from '../../src/utils/passwords.ts';

export async function createTestUser(userData: Partial<NewUser> = {}) {
  const defaultData = {
    email: `test${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`,
    username: `testuser${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    ...userData,
  };

  const hashedPassword = await hashPassword(defaultData.password);

  const [user] = await db.insert(users).values({
    ...defaultData,
    password: hashedPassword,
  }).returning();

  const token = await generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });

  return { user, token, rawPassword: defaultData.password };
};

export async function createTestHabit(userId: string, habitData: Partial<NewHabit> = {}) {
  const defaultData = {
    name: `Test Habit ${Date.now()}`,
    description: 'This is a test habit',
    frequency: 'daily',
    targetCount: 1,
    userId,
    ...habitData,
  };

  const [habit] = await db.insert(habits).values(defaultData).returning();
  return habit;
}

export const clearDatabase = async () => {
  await db.delete(habitTags).execute();
  await db.delete(entries).execute();
  await db.delete(habits).execute();
  await db.delete(tags).execute();
  await db.delete(users).execute();
};