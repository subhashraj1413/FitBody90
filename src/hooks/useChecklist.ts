import { useCallback, useEffect, useState } from 'react';

import { getOrCreateChecklist, todayString, updateChecklist } from '@/src/db/queries';
import { ChecklistKey, DailyChecklist } from '@/src/types';

export function useChecklist() {
  const [checklist, setChecklist] = useState<DailyChecklist | null>(null);
  const date = todayString();

  const refresh = useCallback(async () => {
    setChecklist(await getOrCreateChecklist(date));
  }, [date]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (key: ChecklistKey) => {
      const nextValue = !checklist?.[key];
      await updateChecklist(date, key, nextValue);
      await refresh();
    },
    [checklist, date, refresh]
  );

  return { checklist, date, refresh, toggle };
}
