import { db } from './connection.ts';
import { users, habits, entries, tags, habitTags } from './schema.ts';

const seed = async () => {
  console.log('Seeding database...');
  try {
    console.log('Clearing existing data...');

    await db.delete(entries);
    await db.delete(habits);
    await db.delete(users);
    await db.delete(tags);
    await db.delete(habitTags);

    console.log('Createing demo users...');

    const [demoUser] = await db.insert(users).values({
      firstName: 'demo',
      lastName: 'person',
      username: 'demoperson',
      email: 'demo@example.com',
      password: 'password1',
    }).returning();

    console.log('Creating demo tags...');

    const [healthTag] = await db.insert(tags).values({
      name: 'Health',
      color: '#ee7c62',
    }).returning();

    const [exerciseHabit] = await db.insert(habits).values({
      userId: demoUser.id,
      name: 'Exercise',
      description: 'Daily exercise routine',
      frequency: 'daily',
      targetCount: 1,
    }).returning();

    await db.insert(habitTags).values({
      habitId: exerciseHabit.id,
      tagId: healthTag.id,
    });

    console.log('Adding completion entries...');

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      await db.insert(entries).values({
        habitId: exerciseHabit.id,
        completionDate: date,
      });
    }

    console.log('Database seeding completed successfully.');
    console.log('Demo user credentials:');
    console.log(`Email: ${demoUser.email}`);
    console.log(`Username: ${demoUser.username}`);
    console.log(`Password: ${demoUser.password}`);
  } catch (error) {
    console.error('Error occurred while seeding database:', error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log('Seeding finished.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error occurred while seeding database:', error);
      process.exit(1);
    });
}

export default seed;