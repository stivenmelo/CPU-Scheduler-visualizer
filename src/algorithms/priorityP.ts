import type { Process, SimulationResult, SimulationStep } from '@/types';
import { mergeGanttBlocks, computeMetrics } from './utils';

export function priorityP(processes: Process[]): SimulationResult {
  const remaining = new Map(processes.map(p => [p.id, p.burstTime]));
  const firstResponse = new Map<string, number>();
  const completion = new Map<string, number>();
  const steps: SimulationStep[] = [];
  const completed: string[] = [];
  const totalBurst = processes.reduce((s, p) => s + p.burstTime, 0);
  let clock = Math.min(...processes.map(p => p.arrivalTime));

  for (let iter = 0; iter < totalBurst + processes.length + 10; iter++) {
    if (completed.length === processes.length) break;

    const available = processes.filter(p => p.arrivalTime <= clock && !completed.includes(p.id));

    if (available.length === 0) {
      const next = Math.min(...processes.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      steps.push({ time: clock, runningProcess: null, readyQueue: [], completedProcesses: [...completed], events: [{ type: 'IDLE' }] });
      clock = next;
      continue;
    }

    const current = available.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime)[0];
    const isFirst = !firstResponse.has(current.id);
    if (isFirst) firstResponse.set(current.id, clock);

    const queue = available.filter(p => p.id !== current.id).map(p => p.id);
    steps.push({
      time: clock,
      runningProcess: current.id,
      readyQueue: queue,
      completedProcesses: [...completed],
      events: isFirst ? [{ type: 'PROCESS_STARTED', processId: current.id }] : [],
    });

    remaining.set(current.id, (remaining.get(current.id) ?? 0) - 1);
    clock++;

    if (remaining.get(current.id) === 0) {
      completed.push(current.id);
      completion.set(current.id, clock);
    }
  }

  const ganttBlocks = mergeGanttBlocks(steps, processes);
  const metrics = computeMetrics(processes, firstResponse, completion);
  return { algorithm: 'PRIORITY_P', processes, steps, ganttBlocks, metrics };
}
