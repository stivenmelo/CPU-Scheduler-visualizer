import { create } from 'zustand';
import type { AlgorithmId, ScenarioId, SimulationResult, Process } from '@/types';
import { SCENARIOS } from '@/constants/demoData';
import { runAlgorithm } from '@/algorithms';

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'completed';

interface SimulationState {
  selectedAlgorithm: AlgorithmId | null;
  quantum: number;
  activeScenario: ScenarioId;
  processes: Process[];
  result: SimulationResult | null;
  status: PlaybackStatus;
  currentStepIndex: number;
  speed: number;

  selectAlgorithm: (id: AlgorithmId) => void;
  setQuantum: (q: number) => void;
  selectScenario: (id: ScenarioId) => void;
  runSimulation: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  advanceStep: () => void;
  setSpeed: (s: number) => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  selectedAlgorithm: null,
  quantum: 2,
  activeScenario: 'classic',
  processes: SCENARIOS.classic.processes,
  result: null,
  status: 'idle',
  currentStepIndex: 0,
  speed: 1,

  selectAlgorithm: (id) => {
    set({ selectedAlgorithm: id, result: null, status: 'idle', currentStepIndex: 0 });
    get().runSimulation();
  },

  setQuantum: (q) => {
    set({ quantum: q });
    if (get().selectedAlgorithm === 'RR') get().runSimulation();
  },

  selectScenario: (id) => {
    set({ activeScenario: id, processes: SCENARIOS[id].processes, result: null, status: 'idle', currentStepIndex: 0 });
    if (get().selectedAlgorithm) get().runSimulation();
  },

  runSimulation: () => {
    const { selectedAlgorithm, processes, quantum } = get();
    if (!selectedAlgorithm) return;
    const result = runAlgorithm(selectedAlgorithm, processes, quantum);
    set({ result, status: 'paused', currentStepIndex: 0 });
  },

  play: () => set({ status: 'playing' }),
  pause: () => set({ status: 'paused' }),

  reset: () => set({ currentStepIndex: 0, status: 'paused' }),

  advanceStep: () => {
    const { result, currentStepIndex } = get();
    if (!result) return;
    const next = currentStepIndex + 1;
    if (next >= result.steps.length) {
      set({ currentStepIndex: result.steps.length - 1, status: 'completed' });
    } else {
      set({ currentStepIndex: next });
    }
  },

  setSpeed: (s) => set({ speed: s }),
}));
