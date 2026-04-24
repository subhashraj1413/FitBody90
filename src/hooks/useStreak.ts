import { useCallback, useEffect, useState } from 'react';

import { getStreak } from '@/src/db/queries';
import { Streak } from '@/src/types';

export function useStreak() {
  const [streak, setStreak] = useState<Streak | null>(null);

  const refresh = useCallback(async () => {
    setStreak(await getStreak());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { streak, refresh };
}
