import * as SQLite from 'expo-sqlite';

import { runMigrations } from './migrations';
import { seedDefaults } from './seed';

const DATABASE_NAME = 'fitbody90.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return dbPromise;
}

export function initializeDatabase() {
  if (!initPromise) {
    initPromise = (async () => {
      const db = await getDb();
      await db.execAsync('PRAGMA journal_mode = WAL;');
      await db.withExclusiveTransactionAsync(async (tx) => {
        await runMigrations(tx);
        await seedDefaults(tx);
      });
      return db;
    })();
  }
  return initPromise;
}

