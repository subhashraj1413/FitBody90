import { useCallback, useEffect, useMemo, useState } from 'react';

import { DashboardData } from '@/src/types';
import { getLatestWeight, getOrCreateChecklist, getProfile, getStreak, todayString, updateChecklist } from '@/src/db/queries';

const START_DATE_KEY = '2026-04-24';

function dayOutOf90() {
  const start = new Date(`${START_DATE_KEY}T00:00:00`);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.min(90, Math.max(1, Math.floor(diff / 86_400_000) + 1));
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    dayNumber: 1,
    currentWeight: 82,
    profile: null,
    checklist: null,
    streak: null,
  });
  const [loading, setLoading] = useState(true);

  const date = useMemo(() => todayString(), []);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [profile, currentWeight, checklist, streak] = await Promise.all([
      getProfile(),
      getLatestWeight(),
      getOrCreateChecklist(date),
      getStreak(),
    ]);

    setData({
      dayNumber: dayOutOf90(),
      currentWeight,
      profile,
      checklist,
      streak,
    });
    setLoading(false);
  }, [date]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleChecklist = useCallback(
    async (key: keyof NonNullable<DashboardData['checklist']>) => {
      if (!data.checklist) return;
      if (!['workout_done', 'steps_done', 'protein_done', 'water_done', 'sleep_done'].includes(String(key))) return;

      await updateChecklist(date, key as any, !data.checklist[key]);
      await refresh();
    },
    [data.checklist, date, refresh]
  );

  return { ...data, date, loading, refresh, toggleChecklist };
}
