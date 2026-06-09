import { useState, useEffect, useCallback } from 'react';
import { progressService, ProgressData } from '../services/progressService';

const DEFAULT: ProgressData = {
  rosaryCount: 0,
  lastRosaryDate: null,
  streak: 0,
  prayersLearned: [],
  mysteriesHeard: [],
  familySessions: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(DEFAULT);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    const data = await progressService.getProgress();
    setProgress(data);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const recordRosary = useCallback(async () => {
    await progressService.recordRosaryCompleted();
    await load();
  }, [load]);

  return { progress, isLoading, refresh: load, recordRosary };
}
