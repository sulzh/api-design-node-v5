import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { db } from '../db/connection.ts';
import { habits, habitTags } from '../db/schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export const createHabit = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, frequency, targetCount, tagIds } = req.body;

    const result = await db.transaction(async (tx) => {
      const [newHabit] = await tx.insert(habits).values({
        name,
        description,
        frequency,
        targetCount,
        userId: req.user.id,
      }).returning();

      if (tagIds && tagIds.length > 0) {
        const habitTagInserts = tagIds.map((tagId: number) => ({
          habitId: newHabit.id,
          tagId,
        }));
        await tx.insert(habitTags).values(habitTagInserts);
      }

      return newHabit;
    });

    res.status(201).json({ message: 'Habit created', habit: result });
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

export const getUserHabits = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userHabitsWithTags = await db.query.habits.findMany({
      where: eq(habits.userId, req.user.id),
      with: {
        habitTags: {
          with: {
            tag: true,
          },
        },
      },
      orderBy: [desc(habits.createdAt)],
    });

    const habitsWithTags = userHabitsWithTags.map((habit) => ({
      ...habit,
      tags: habit.habitTags.map((habitTag) => habitTag.tag),
      habitTags: undefined,
    }));

    res.json({ habits: habitsWithTags });
  } catch (error) {
    console.error('Error retrieving user habits:', error);
    res.status(500).json({ error: 'Failed to retrieve user habits' });
  }
};

export const updateHabit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { tagIds, ...habitData } = req.body;

    const result = await db.transaction(async (tx) => {
      const [updatedHabit] = await tx.update(habits)
        .set({ ...habitData, updatedAt: new Date() })
        .where(and(eq(habits.id, id), eq(habits.userId, req.user.id)))
        .returning();

      if (!updatedHabit) {
        return res.status(404).json({ message: 'Habit not found or not authorized' });
      }

      if (tagIds !== undefined) {
        await tx.delete(habitTags).where(eq(habitTags.habitId, id));

        const habitTagInserts = tagIds.map((tagId: number) => ({
          habitId: updatedHabit.id,
          tagId,
        }));
        await tx.insert(habitTags).values(habitTagInserts);
      }

      return updatedHabit;
    });

    res.json({ message: 'Habit updated', habit: result });
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ error: 'Failed to update habit' });
  }
};