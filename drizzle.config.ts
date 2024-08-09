import 'dotenv/config';
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: './drizzle/out',
  schemaFilter: ['hrm'],
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials :{
    url: process.env.POSTGRES_URL
  }
})