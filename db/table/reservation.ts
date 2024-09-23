import { relations, sql } from 'drizzle-orm'
import {
  foreignKey,
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { clientUser } from './client-user'
import { store } from './store'

export const reservation = pgTable(
  'reservation',
  {
    id: serial('id').primaryKey(),
    storeId: serial('store_id').notNull(),
    clientUserId: serial('client_user_id').notNull(),
    startTime: varchar('start_time', { length: 255 }).notNull(),
    endTime: varchar('end_time', { length: 255 }).notNull(),
    status: smallint('status').notNull().default(1),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    storeFK: foreignKey({
      columns: [table.storeId],
      foreignColumns: [store.id],
      name: 'reservation_store_id_fk',
    }),
    clientUserFK: foreignKey({
      columns: [table.clientUserId],
      foreignColumns: [clientUser.id],
      name: 'reservation_client_user_id_fk',
    }),
  })
)

export const reservationRelations = relations(reservation, ({ one }) => ({
  store: one(store, {
    fields: [reservation.storeId],
    references: [store.id],
  }),
  clientUser: one(clientUser, {
    fields: [reservation.clientUserId],
    references: [clientUser.id],
  }),
}))
