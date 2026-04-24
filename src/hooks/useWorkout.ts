import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getWorkoutCompletions, saveWorkoutCompletion, todayString, updateChecklist } from '@/src/db/queries';
import { workoutPlan } from '@/src/data/workoutPlan';

export function useWorkout() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const date = todayString();
  const workout = workoutPlan[selectedIndex];

  const refresh = useCallback(async () => {
    const rows = await getWorkoutCompletions(date, workout.title);
    setCompleted(Object.fromEntries(rows.map((row) => [row.exercise_name, Boolean(row.completed)])));
  }, [date, workout.title]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const completedCount = useMemo(
    () => workout.exercises.filter((exercise) => completed[exercise.name]).length,
    [completed, workout.exercises]
  );

  const toggleExercise = useCallback(
    async (exerciseName: string) => {
      const next = !completed[exerciseName];
      setCompleted((prev) => ({ ...prev, [exerciseName]: next }));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await saveWorkoutCompletion({
        date,
        workoutDay: workout.title,
        exerciseName,
        completed: next,
      });

      const nextCompleted = {
        ...completed,
        [exerciseName]: next,
      };
      const allDone = workout.exercises.every((exercise) => nextCompleted[exercise.name]);
      await updateChecklist(date, 'workout_done', allDone);
    },
    [completed, date, workout.exercises, workout.title]
  );

  return {
    workout,
    workoutPlan,
    selectedIndex,
    setSelectedIndex,
    completed,
    completedCount,
    toggleExercise,
  };
}
