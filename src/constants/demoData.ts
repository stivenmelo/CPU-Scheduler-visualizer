import type { Process, ScenarioId, AlgorithmId } from '@/types';
import { assignColors } from './colors';

interface Scenario {
  id: ScenarioId;
  labelKey: string;
  recommendedAlgo: AlgorithmId;
  processes: Process[];
}

const raw: Record<ScenarioId, { labelKey: string; recommendedAlgo: AlgorithmId; processes: Omit<Process, 'color'>[] }> = {
  classic: {
    labelKey: 'scenario.classic',
    recommendedAlgo: 'SJF',
    processes: [
      { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
      { id: 'P2', name: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 'P3', name: 'P3', arrivalTime: 2, burstTime: 9, priority: 4 },
      { id: 'P4', name: 'P4', arrivalTime: 3, burstTime: 5, priority: 2 },
    ],
  },
  convoy: {
    labelKey: 'scenario.convoy',
    recommendedAlgo: 'FCFS',
    processes: [
      { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 12, priority: 3 },
      { id: 'P2', name: 'P2', arrivalTime: 1, burstTime: 2,  priority: 2 },
      { id: 'P3', name: 'P3', arrivalTime: 1, burstTime: 1,  priority: 1 },
      { id: 'P4', name: 'P4', arrivalTime: 2, burstTime: 3,  priority: 2 },
    ],
  },
  rr_showcase: {
    labelKey: 'scenario.rr_showcase',
    recommendedAlgo: 'RR',
    processes: [
      { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
      { id: 'P2', name: 'P2', arrivalTime: 0, burstTime: 5, priority: 3 },
      { id: 'P3', name: 'P3', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 'P4', name: 'P4', arrivalTime: 2, burstTime: 3, priority: 4 },
      { id: 'P5', name: 'P5', arrivalTime: 3, burstTime: 2, priority: 2 },
    ],
  },
  priority_starvation: {
    labelKey: 'scenario.priority_starvation',
    recommendedAlgo: 'PRIORITY_P',
    processes: [
      { id: 'P1', name: 'P1', arrivalTime: 0, burstTime: 10, priority: 4 },
      { id: 'P2', name: 'P2', arrivalTime: 2, burstTime: 3,  priority: 1 },
      { id: 'P3', name: 'P3', arrivalTime: 3, burstTime: 4,  priority: 1 },
      { id: 'P4', name: 'P4', arrivalTime: 5, burstTime: 2,  priority: 2 },
    ],
  },
};

export const SCENARIOS: Record<ScenarioId, Scenario> = Object.fromEntries(
  Object.entries(raw).map(([id, s]) => [
    id,
    { id: id as ScenarioId, labelKey: s.labelKey, recommendedAlgo: s.recommendedAlgo, processes: assignColors(s.processes) },
  ])
) as Record<ScenarioId, Scenario>;

export const SCENARIO_IDS: ScenarioId[] = ['classic', 'convoy', 'rr_showcase', 'priority_starvation'];
