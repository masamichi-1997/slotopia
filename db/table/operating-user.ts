import { relations, sql } from 'drizzle-orm'
import {
  foreignKey,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { operatingCompany } from './operating-company'
import { operatingUserStore } from './operating-user-store'

export const operatingUser = pgTable(
  'operating_user',
  {
    id: serial('id').primaryKey(),
    operatingCompanyId: serial('operating_company_id').notNull(),
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
  },
  (table) => ({
    operatingCompanyFK: foreignKey({
      columns: [table.operatingCompanyId],
      foreignColumns: [operatingCompany.id],
      name: 'operating_user_operating_company_id_fk',
    }),
  })
)

export const operatingUserRelations = relations(
  operatingUser,
  ({ one, many }) => ({
    operatingCompany: one(operatingCompany, {
      fields: [operatingUser.operatingCompanyId],
      references: [operatingCompany.id],
    }),
    operatingUserStores: many(operatingUserStore),
  })
)
