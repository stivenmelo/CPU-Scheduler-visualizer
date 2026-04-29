import type { Process, SimulationResult, SimulationStep } from '@/types';
import { mergeGanttBlocks, computeMetrics } from './utils';

export function srtf(processes: Process[]): SimulationResult {
  const remaining = new Map(processes.map(p => [p.id, p.burstTime]));
  const firstResponse = new Map<string, number>();
  const completion = new Map<string, number>();
  const steps: SimulationStep[] = [];
  const completed: string[] = [];
  const totalTime = processes.reduce((s, p) => s + p.burstTime, 0) + Math.min(...processes.map(p => p.arrivalTime));
  let clock = Math.min(...processes.map(p => p.arrivalTime));

  let iterations = 0;
  while (completed.length < processes.length && iterations < totalTime + 10) {
    iterations++;
    const available = processes.filter(p => p.arrivalTime <= clock && !completed.includes(p.id));

    if (available.length === 0) {
      const next = Math.min(...processes.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      steps.push({ time: clock, runningProcess: null, readyQueue: [], completedProcesses: [...completed], events: [{ type: 'IDLE' }] });
      clock = next;
      continue;
    }

    const current = available.sort((a, b) => (remaining.get(a.id) ?? 0) - (remaining.get(b.id) ?? 0) || a.arrivalTime - b.arrivalTime)[0];
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
  return { algorithm: 'SRTF', processes, steps, ganttBlocks, metrics };
}
