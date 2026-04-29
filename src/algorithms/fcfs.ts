import type { Process, SimulationResult, SimulationStep } from '@/types';
import { mergeGanttBlocks, computeMetrics } from './utils';

export function fcfs(processes: Process[]): SimulationResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime || processes.indexOf(a) - processes.indexOf(b));
  const remaining = new Map(sorted.map(p => [p.id, p.burstTime]));
  const firstResponse = new Map<string, number>();
  const completion = new Map<string, number>();
  const steps: SimulationStep[] = [];
  const completed: string[] = [];

  let clock = 0;
  let queueOrder = [...sorted];

  while (completed.length < processes.length) {
    const available = queueOrder.filter(p => p.arrivalTime <= clock && !completed.includes(p.id));

    if (available.length === 0) {
      const nextArrival = Math.min(...queueOrder.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      steps.push({ time: clock, runningProcess: null, readyQueue: [], completedProcesses: [...completed], events: [{ type: 'IDLE' }] });
      clock = nextArrival;
      continue;
    }

    const current = available[0];

    while ((remaining.get(current.id) ?? 0) > 0) {
      const rem = remaining.get(current.id)!;
      const readyQueue = available.filter(p => p.id !== current.id).map(p => p.id);
      const newArrivals = queueOrder.filter(p => p.arrivalTime === clock && p.id !== current.id && !completed.includes(p.id)).map(p => p.id);

      if (!firstResponse.has(current.id)) firstResponse.set(current.id, clock);

      steps.push({
        time: clock,
        runningProcess: current.id,
        readyQueue: [...new Set([...readyQueue, ...newArrivals])],
        completedProcesses: [...completed],
        events: rem === current.burstTime ? [{ type: 'PROCESS_STARTED', processId: current.id }] : [],
      });

      remaining.set(current.id, rem - 1);
      clock++;
    }

    completed.push(current.id);
    completion.set(current.id, clock);
  }

  const ganttBlocks = mergeGanttBlocks(steps, processes);
  const metrics = computeMetrics(processes, firstResponse, completion);
  return { algorithm: 'FCFS', processes, steps, ganttBlocks, metrics };
}
