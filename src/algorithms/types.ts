import type { Process, SimulationResult } from '@/types';

export type AlgorithmFn = (processes: Process[], quantum?: number) => SimulationResult;
