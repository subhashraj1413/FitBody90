import { ChecklistKey, DailyChecklist, NutritionLog, ProgressLog, Streak, UserProfile, WorkoutCompleted } from '@/src/types';

import { getDb, initializeDatabase } from './index';

const todayString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

async function runSafely<T>(fallback: T, task: () => Promise<T>) {
  try {
    await initializeDatabase();
    return await task();
  } catch (error) {
    console.error('SQLite query failed:', error);
    return fallback;
  }
}

export async function getProfile() {
  return runSafely<UserProfile | null>(null, async () => {
    const db = await getDb();
    return db.getFirstAsync<UserProfile>('SELECT * FROM user_profile WHERE id = 1');
  });
}

export async function getLatestWeight() {
  return runSafely(82, async () => {
    const db = await getDb();
    const row = await db.getFirstAsync<{ weight: number }>(
      'SELECT weight FROM progress_logs ORDER BY date DESC, id DESC LIMIT 1'
    );
    return row?.weight ?? 82;
  });
}

export async function getOrCreateChecklist(date = todayString()) {
  return runSafely<DailyChecklist | null>(null, async () => {
    const db = await getDb();
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT OR IGNORE INTO daily_checklist
          (date, workout_done, steps_done, protein_done, water_done, sleep_done)
          VALUES (?, 0, 0, 0, 0, 0)`,
        date
      );
    });
    return db.getFirstAsync<DailyChecklist>('SELECT * FROM daily_checklist WHERE date = ?', date);
  });
}

export async function updateChecklist(date: string, key: ChecklistKey, value: boolean) {
  return runSafely(false, async () => {
    const db = await getDb();
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT OR IGNORE INTO daily_checklist
          (date, workout_done, steps_done, protein_done, water_done, sleep_done)
          VALUES (?, 0, 0, 0, 0, 0)`,
        date
      );
      await tx.runAsync(`UPDATE daily_checklist SET ${key} = ? WHERE date = ?`, value ? 1 : 0, date);
    });
    await recalculateStreak(date);
    return true;
  });
}

export async function getStreak() {
  return runSafely<Streak | null>(null, async () => {
    const db = await getDb();
    return db.getFirstAsync<Streak>('SELECT * FROM streaks WHERE id = 1');
  });
}

export async function recalculateStreak(date = todayString()) {
  const db = await getDb();
  const rows = await db.getAllAsync<DailyChecklist>(
    'SELECT * FROM daily_checklist WHERE date <= ? ORDER BY date DESC LIMIT 90',
    date
  );
  const current = await db.getFirstAsync<Streak>('SELECT * FROM streaks WHERE id = 1');
  let nextCurrent = 0;

  for (const row of rows) {
    const complete =
      row.workout_done &&
      row.steps_done &&
      row.protein_done &&
      row.water_done &&
      row.sleep_done;
    if (!complete) break;
    nextCurrent += 1;
  }

  const nextBest = Math.max(current?.best_streak ?? 0, nextCurrent);

  await db.runAsync(
    'UPDATE streaks SET current_streak = ?, best_streak = ?, updated_at = ? WHERE id = 1',
    nextCurrent,
    nextBest,
    new Date().toISOString()
  );
}

export async function getProgressLogs() {
  return runSafely<ProgressLog[]>([], async () => {
    const db = await getDb();
    return db.getAllAsync<ProgressLog>('SELECT * FROM progress_logs ORDER BY date DESC, id DESC LIMIT 12');
  });
}

export async function saveProgressLog(input: { date?: string; weight: number; waist: number; notes: string }) {
  return runSafely(false, async () => {
    const db = await getDb();
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT INTO progress_logs (date, weight, waist, notes)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(date) DO UPDATE SET
            weight = excluded.weight,
            waist = excluded.waist,
            notes = excluded.notes`,
        input.date ?? todayString(),
        input.weight,
        input.waist,
        input.notes
      );
    });
    return true;
  });
}

export async function getNutritionLog(date = todayString()) {
  return runSafely<NutritionLog | null>(null, async () => {
    const db = await getDb();
    return db.getFirstAsync<NutritionLog>('SELECT * FROM nutrition_logs WHERE date = ?', date);
  });
}

export async function saveNutritionLog(input: { date?: string; calories: number; protein: number; water: number }) {
  return runSafely(false, async () => {
    const date = input.date ?? todayString();
    const db = await getDb();
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT INTO nutrition_logs (date, calories, protein, water)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(date) DO UPDATE SET
            calories = excluded.calories,
            protein = excluded.protein,
            water = excluded.water`,
        date,
        input.calories,
        input.protein,
        input.water
      );
      await tx.runAsync(
        `INSERT OR IGNORE INTO daily_checklist
          (date, workout_done, steps_done, protein_done, water_done, sleep_done)
          VALUES (?, 0, 0, 0, 0, 0)`,
        date
      );
      await tx.runAsync(
        'UPDATE daily_checklist SET protein_done = ?, water_done = ? WHERE date = ?',
        input.protein >= 150 ? 1 : 0,
        input.water >= 3 ? 1 : 0,
        date
      );
    });
    await recalculateStreak(date);
    return true;
  });
}

export async function getWorkoutCompletions(date: string, workoutDay: string) {
  return runSafely<WorkoutCompleted[]>([], async () => {
    const db = await getDb();
    return db.getAllAsync<WorkoutCompleted>(
      'SELECT * FROM workouts_completed WHERE date = ? AND workout_day = ?',
      date,
      workoutDay
    );
  });
}

export async function saveWorkoutCompletion(input: {
  date: string;
  workoutDay: string;
  exerciseName: string;
  completed: boolean;
}) {
  return runSafely(false, async () => {
    const db = await getDb();
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.runAsync(
        `INSERT INTO workouts_completed (date, workout_day, exercise_name, completed)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(date, workout_day, exercise_name) DO UPDATE SET
            completed = excluded.completed`,
        input.date,
        input.workoutDay,
        input.exerciseName,
        input.completed ? 1 : 0
      );
    });
    return true;
  });
}

export { todayString };
