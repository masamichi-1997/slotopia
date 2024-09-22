import { relations, sql } from 'drizzle-orm'
import { foreignKey, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { operatingUser } from './operating-user'
import { store } from './store'

export const operatingUserStore = pgTable(
  'operating_user_store',
  {
    id: serial('id').primaryKey(),
    operatingUserId: serial('operating_user_id').notNull(),
    storeId: serial('operating_user_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    operatingUserFK: foreignKey({
      columns: [table.operatingUserId],
      foreignColumns: [operatingUser.id],
      name: 'operating_user_store_operating_user_id_fk',
    }),
    storeFK: foreignKey({
      columns: [table.storeId],
      foreignColumns: [store.id],
      name: 'operating_user_store_store_id_fk',
    }),
  })
)

export const operatingUserStoreRelations = relations(
  operatingUserStore,
  ({ one, many }) => ({
    operatingUser: one(operatingUser, {
      fields: [operatingUserStore.operatingUserId],
      references: [operatingUser.id],
    }),
    store: one(store, {
      fields: [operatingUserStore.storeId],
      references: [store.id],
    }),
  })
)
