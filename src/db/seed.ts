import { SQLiteDatabase } from 'expo-sqlite';

export async function seedDefaults(db: SQLiteDatabase) {
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT OR IGNORE INTO user_profile
      (id, age, height_cm, start_weight, goal_weight, created_at)
      VALUES (1, 37, 173, 82, 73, ?)`,
    now
  );

  await db.runAsync(
    `INSERT OR IGNORE INTO streaks
      (id, current_streak, best_streak, updated_at)
      VALUES (1, 0, 0, ?)`,
    now
  );
}
