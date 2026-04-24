import { useCallback, useEffect, useState } from 'react';

import { getNutritionLog, saveNutritionLog, todayString } from '@/src/db/queries';
import { NutritionLog } from '@/src/types';

export function useNutrition() {
  const [log, setLog] = useState<NutritionLog | null>(null);
  const [saving, setSaving] = useState(false);
  const date = todayString();

  const refresh = useCallback(async () => {
    setLog(await getNutritionLog(date));
  }, [date]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (input: { calories: number; protein: number; water: number }) => {
      setSaving(true);
      const ok = await saveNutritionLog({ ...input, date });
      await refresh();
      setSaving(false);
      return ok;
    },
    [date, refresh]
  );

  return { log, date, saving, save, refresh };
}
