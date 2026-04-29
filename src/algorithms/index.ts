import type { AlgorithmId, Process, SimulationResult } from '@/types';
import { fcfs } from './fcfs';
import { sjf } from './sjf';
import { srtf } from './srtf';
import { roundRobin } from './roundRobin';
import { priorityNP } from './priorityNP';
import { priorityP } from './priorityP';

export function runAlgorithm(id: AlgorithmId, processes: Process[], quantum?: number): SimulationResult {
  switch (id) {
    case 'FCFS':        return fcfs(processes);
    case 'SJF':         return sjf(processes);
    case 'SRTF':        return srtf(processes);
    case 'RR':          return roundRobin(processes, quantum);
    case 'PRIORITY_NP': return priorityNP(processes);
    case 'PRIORITY_P':  return priorityP(processes);
  }
}

export { mergeGanttBlocks } from './utils';
