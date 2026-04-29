import { useEffect, useRef } from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';

const BASE_INTERVAL_MS = 800;

export function useSimulationEngine() {
  const { status, speed, advanceStep } = useSimulationStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'playing') {
      intervalRef.current = setInterval(() => {
        advanceStep();
      }, BASE_INTERVAL_MS / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, speed, advanceStep]);
}
