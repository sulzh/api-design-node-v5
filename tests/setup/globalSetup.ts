import { db } from '../../src/db/connection.ts';
import { users, habits, entries, tags, habitTags } from '../../src/db/schema.ts';
import { sql } from 'drizzle-orm';
import { execSync } from 'child_process';

export default async function globalSetup() {
  console.log('Setting up the test database...');
  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE;`);
    await db.execute(sql`DROP TABLE IF EXISTS ${tags} CASCADE;`);

    console.log('Pushing schema to the test database...');
    execSync(
      `npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="postgresql"`,
      { stdio: 'inherit', cwd: process.cwd() },
    );
    console.log('Test database setup complete.');
  } catch (error) {
    console.error('Error occurred while setting up the test database:', error);
  }
}