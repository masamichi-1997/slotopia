import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  foreignKey,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { operatingCompany } from './operating-company'
import { operatingUserStore } from './operating-user-store'
import { reservation } from './reservation'

export const store = pgTable(
  'store',
  {
    id: serial('id').primaryKey(),
    operatingCompanyId: serial('operating_company_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    openHour: varchar('open_hour', { length: 255 }).notNull(),
    closeHour: varchar('close_hour', { length: 255 }).notNull(),
    canReserveToday: boolean('can_reserve_today').notNull().default(false),
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
      name: 'store_operating_company_id_fk',
    }),
  })
)

export const storeRelations = relations(store, ({ one, many }) => ({
  operatingCompany: one(operatingCompany, {
    fields: [store.operatingCompanyId],
    references: [operatingCompany.id],
  }),
  operatingUserStores: many(operatingUserStore),
  reservations: many(reservation),
}))
