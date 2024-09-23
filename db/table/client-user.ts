import { relations, sql } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { reservation } from './reservation'

export const clientUser = pgTable('client_user', {
  id: serial('id').primaryKey(),
  lastName: varchar('last_name', { length: 30 }).notNull(),
  firstName: varchar('first_name', { length: 30 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 21 }).notNull(),
  email: varchar('email', { length: 254 }).unique(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
})

export const clientUserRelations = relations(
  clientUser,
  ({ many }) => ({
    reservations: many(reservation)
  })
)
