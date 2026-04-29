import type { GanttBlock, SimulationStep, ProcessMetrics, SimulationMetrics, Process } from '@/types';

export function mergeGanttBlocks(steps: SimulationStep[], processes: Process[]): GanttBlock[] {
  const colorMap = new Map(processes.map(p => [p.id, p.color]));
  const blocks: GanttBlock[] = [];

  for (const step of steps) {
    const last = blocks[blocks.length - 1];
    const pid = step.runningProcess;
    const label = pid ?? 'Idle';
    const color = pid ? (colorMap.get(pid) ?? '#6B7280') : '#6B7280';

    if (last && last.processId === pid) {
      last.endTime = step.time + 1;
    } else {
      blocks.push({ processId: pid, startTime: step.time, endTime: step.time + 1, label, color });
    }
  }

  return blocks;
}

export function computeMetrics(
  processes: Process[],
  firstResponseMap: Map<string, number>,
  completionMap: Map<string, number>
): SimulationMetrics {
  const perProcess: ProcessMetrics[] = processes.map(p => {
    const completionTime = completionMap.get(p.id) ?? 0;
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    const responseTime = (firstResponseMap.get(p.id) ?? p.arrivalTime) - p.arrivalTime;
    return { processId: p.id, completionTime, turnaroundTime, waitingTime, responseTime };
  });

  const n = processes.length;
  const avgWaitingTime = perProcess.reduce((s, m) => s + m.waitingTime, 0) / n;
  const avgTurnaroundTime = perProcess.reduce((s, m) => s + m.turnaroundTime, 0) / n;
  const avgResponseTime = perProcess.reduce((s, m) => s + m.responseTime, 0) / n;
  const totalTime = Math.max(...[...completionMap.values()]);
  const busyTicks = processes.reduce((s, p) => s + p.burstTime, 0);
  const cpuUtilization = totalTime > 0 ? (busyTicks / totalTime) * 100 : 0;
  const throughput = totalTime > 0 ? n / totalTime : 0;

  return { perProcess, avgWaitingTime, avgTurnaroundTime, avgResponseTime, cpuUtilization, throughput };
}
