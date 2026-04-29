import type { Process, SimulationResult, SimulationStep } from '@/types';
import { mergeGanttBlocks, computeMetrics } from './utils';

export function sjf(processes: Process[]): SimulationResult {
  const remaining = new Map(processes.map(p => [p.id, p.burstTime]));
  const firstResponse = new Map<string, number>();
  const completion = new Map<string, number>();
  const steps: SimulationStep[] = [];
  const completed: string[] = [];
  let clock = 0;

  while (completed.length < processes.length) {
    const available = processes.filter(p => p.arrivalTime <= clock && !completed.includes(p.id));

    if (available.length === 0) {
      const next = Math.min(...processes.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      steps.push({ time: clock, runningProcess: null, readyQueue: [], completedProcesses: [...completed], events: [{ type: 'IDLE' }] });
      clock = next;
      continue;
    }

    const current = available.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime)[0];

    while ((remaining.get(current.id) ?? 0) > 0) {
      const rem = remaining.get(current.id)!;
      const arrived = processes.filter(p => p.arrivalTime <= clock && !completed.includes(p.id) && p.id !== current.id);

      if (!firstResponse.has(current.id)) firstResponse.set(current.id, clock);

      steps.push({
        time: clock,
        runningProcess: current.id,
        readyQueue: arrived.map(p => p.id),
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
  return { algorithm: 'SJF', processes, steps, ganttBlocks, metrics };
}
