import { SQLiteDatabase } from 'expo-sqlite';

export async function runMigrations(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY,
      age INTEGER NOT NULL,
      height_cm INTEGER NOT NULL,
      start_weight REAL NOT NULL,
      goal_weight REAL NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS daily_checklist (
      id INTEGER PRIMARY KEY,
      date TEXT UNIQUE NOT NULL,
      workout_done INTEGER NOT NULL DEFAULT 0,
      steps_done INTEGER NOT NULL DEFAULT 0,
      protein_done INTEGER NOT NULL DEFAULT 0,
      water_done INTEGER NOT NULL DEFAULT 0,
      sleep_done INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS progress_logs (
      id INTEGER PRIMARY KEY,
      date TEXT UNIQUE NOT NULL,
      weight REAL NOT NULL,
      waist REAL NOT NULL,
      notes TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS nutrition_logs (
      id INTEGER PRIMARY KEY,
      date TEXT UNIQUE NOT NULL,
      calories INTEGER NOT NULL,
      protein INTEGER NOT NULL,
      water REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS workouts_completed (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      workout_day TEXT NOT NULL,
      exercise_name TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      UNIQUE(date, workout_day, exercise_name)
    );

    CREATE TABLE IF NOT EXISTS streaks (
      id INTEGER PRIMARY KEY,
      current_streak INTEGER NOT NULL,
      best_streak INTEGER NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}
