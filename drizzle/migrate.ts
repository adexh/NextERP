import dotenv from 'dotenv';
dotenv.config();
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from '../lib/db';
import path from 'path';
// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: path.join(__dirname, './out') }).then( () => {
  client.end();
})
