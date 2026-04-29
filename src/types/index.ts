export type AlgorithmId =
  | 'FCFS'
  | 'SJF'
  | 'SRTF'
  | 'RR'
  | 'PRIORITY_NP'
  | 'PRIORITY_P';

export type ScenarioId =
  | 'classic'
  | 'convoy'
  | 'rr_showcase'
  | 'priority_starvation';

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  color: string;
}

export interface ProcessRuntime extends Process {
  remainingTime: number;
  firstResponseTime: number | null;
  completionTime: number | null;
}

export type StepEventType =
  | 'PROCESS_ARRIVED'
  | 'PROCESS_STARTED'
  | 'PROCESS_PREEMPTED'
  | 'PROCESS_COMPLETED'
  | 'IDLE';

export interface StepEvent {
  type: StepEventType;
  processId?: string;
}

export interface GanttBlock {
  processId: string | null;
  startTime: number;
  endTime: number;
  label: string;
  color: string;
}

export interface SimulationStep {
  time: number;
  runningProcess: string | null;
  readyQueue: string[];
  completedProcesses: string[];
  events: StepEvent[];
}

export interface ProcessMetrics {
  processId: string;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
}

export interface SimulationMetrics {
  perProcess: ProcessMetrics[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  cpuUtilization: number;
  throughput: number;
}

export interface SimulationResult {
  algorithm: AlgorithmId;
  processes: Process[];
  steps: SimulationStep[];
  ganttBlocks: GanttBlock[];
  metrics: SimulationMetrics;
  quantum?: number;
}

export interface AlgorithmConfig {
  id: AlgorithmId;
  nameKey: string;
  shortKey: string;
  descriptionKey: string;
  isPreemptive: boolean;
  requiresQuantum: boolean;
  requiresPriority: boolean;
}
