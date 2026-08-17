import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

// Generic key/value store for application-level metadata that doesn't
// belong to any particular domain table (e.g. one-off flags or settings
// seeded at startup).
export const appMetadata = sqliteTable('app_metadata', {
  key: text().primaryKey(),
  value: text().notNull(),
});

// A completed mutation's replayable outcome, keyed by a client-generated
// idempotency key. `scope` namespaces the key so two different endpoints
// can't collide if a client ever reused a key across them by mistake.
// Retained for `MUTATION_IDEMPOTENCY_RETENTION_MS` and pruned
// opportunistically rather than by a background scheduler. Add your own
// domain tables below as the project grows.
export const mutationIdempotency = sqliteTable('mutation_idempotency', {
  key: text().primaryKey(),
  scope: text().notNull(),
  responseStatus: integer().notNull(),
  responseBody: text().notNull(),
  locationHeader: text(),
  createdAt: text().notNull(),
});
