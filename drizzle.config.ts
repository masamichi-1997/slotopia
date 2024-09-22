import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: './db/table/*',
  out: './supabase/migrations',
  dialect: 'postgresql',
  strict: true,
  breakpoints: true,
  dbCredentials: {
    database: process.env.DATABASE!,
    port: 5432,
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
  },
})
