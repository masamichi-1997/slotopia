import { relations, sql } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { operatingUser } from './operating-user'
import { store } from './store'

export const operatingCompany = pgTable('operating_company', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 21 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
})

export const operatingCompanyRelations = relations(
  operatingCompany,
  ({ one, many }) => ({
    operatingUsers: many(operatingUser),
    stores: many(store),
  })
)
