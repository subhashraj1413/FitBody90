import * as SQLite from 'expo-sqlite';

import { runMigrations } from './migrations';
import { seedDefaults } from './seed';

const DATABASE_NAME = 'fitbody90.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initialized = false;

export function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return dbPromise;
}

export async function initializeDatabase() {
  const db = await getDb();

  if (!initialized) {
    await db.execAsync('PRAGMA journal_mode = WAL;');
    await db.withExclusiveTransactionAsync(async (tx) => {
      await runMigrations(tx);
      await seedDefaults(tx);
    });
    initialized = true;
  }

  return db;
}

export { DATABASE_NAME };
