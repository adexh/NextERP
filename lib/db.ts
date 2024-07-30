import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema";
import * as relationsSchema from "../drizzle/relations";
import dotenv from 'dotenv';
dotenv.config();

export const client = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export const db = drizzle(client, { logger: true, schema: {...schema, ...relationsSchema} });