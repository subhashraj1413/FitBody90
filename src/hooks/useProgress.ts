import { useCallback, useEffect, useState } from 'react';

import { getProgressLogs, saveProgressLog, todayString } from '@/src/db/queries';
import { ProgressLog } from '@/src/types';

export function useProgress() {
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLogs(await getProgressLogs());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (input: { weight: number; waist: number; notes: string }) => {
      setSaving(true);
      const ok = await saveProgressLog({ ...input, date: todayString() });
      await refresh();
      setSaving(false);
      return ok;
    },
    [refresh]
  );

  return { logs, saving, refresh, save };
}
