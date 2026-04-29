import type { Process, SimulationResult, SimulationStep } from '@/types';
import { mergeGanttBlocks, computeMetrics } from './utils';

export function roundRobin(processes: Process[], quantum = 2): SimulationResult {
  const remaining = new Map(processes.map(p => [p.id, p.burstTime]));
  const firstResponse = new Map<string, number>();
  const completion = new Map<string, number>();
  const steps: SimulationStep[] = [];
  const completed: string[] = [];
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  let clock = sorted[0].arrivalTime;
  const queue: string[] = [sorted[0].id];
  const enqueued = new Set<string>([sorted[0].id]);

  const enqueueNew = (time: number) => {
    for (const p of sorted) {
      if (p.arrivalTime <= time && !enqueued.has(p.id) && !completed.includes(p.id)) {
        queue.push(p.id);
        enqueued.add(p.id);
      }
    }
  };

  let iterations = 0;
  const maxIter = processes.reduce((s, p) => s + p.burstTime, 0) * 2 + 10;

  while (completed.length < processes.length && iterations < maxIter) {
    iterations++;

    if (queue.length === 0) {
      const next = sorted.find(p => !completed.includes(p.id) && !enqueued.has(p.id));
      if (!next) break;
      steps.push({ time: clock, runningProcess: null, readyQueue: [], completedProcesses: [...completed], events: [{ type: 'IDLE' }] });
      clock = next.arrivalTime;
      enqueueNew(clock);
      continue;
    }

    const currentId = queue.shift()!;
    const currentProcess = processes.find(p => p.id === currentId)!;
    const rem = remaining.get(currentId) ?? 0;
    const slice = Math.min(quantum, rem);
    const isFirst = !firstResponse.has(currentId);
    if (isFirst) firstResponse.set(currentId, clock);

    for (let t = 0; t < slice; t++) {
      enqueueNew(clock);
      const queueSnapshot = [...queue];
      steps.push({
        time: clock,
        runningProcess: currentId,
        readyQueue: queueSnapshot,
        completedProcesses: [...completed],
        events: t === 0 && isFirst ? [{ type: 'PROCESS_STARTED', processId: currentId }] : [],
      });
      remaining.set(currentId, (remaining.get(currentId) ?? 0) - 1);
      clock++;
      enqueueNew(clock);
    }

    if ((remaining.get(currentId) ?? 0) === 0) {
      completed.push(currentId);
      completion.set(currentId, clock);
    } else {
      enqueueNew(clock);
      if (!queue.includes(currentId)) queue.push(currentId);
    }

    void currentProcess;
  }

  const ganttBlocks = mergeGanttBlocks(steps, processes);
  const metrics = computeMetrics(processes, firstResponse, completion);
  return { algorithm: 'RR', processes, steps, ganttBlocks, metrics, quantum };
}
