import type { AlgorithmId } from '@/types';

export interface TheoryData {
  nameKey: string;
  descriptionKey: string;
  typeKey: string;
  complexityKey: string;
  prosKey: string;
  consKey: string;
}

export const THEORY_DATA: Record<AlgorithmId, TheoryData> = {
  FCFS: {
    nameKey: 'algorithms.FCFS.name',
    descriptionKey: 'algorithms.FCFS.description',
    typeKey: 'algorithms.FCFS.type',
    complexityKey: 'algorithms.FCFS.complexity',
    prosKey: 'algorithms.FCFS.pros',
    consKey: 'algorithms.FCFS.cons',
  },
  SJF: {
    nameKey: 'algorithms.SJF.name',
    descriptionKey: 'algorithms.SJF.description',
    typeKey: 'algorithms.SJF.type',
    complexityKey: 'algorithms.SJF.complexity',
    prosKey: 'algorithms.SJF.pros',
    consKey: 'algorithms.SJF.cons',
  },
  SRTF: {
    nameKey: 'algorithms.SRTF.name',
    descriptionKey: 'algorithms.SRTF.description',
    typeKey: 'algorithms.SRTF.type',
    complexityKey: 'algorithms.SRTF.complexity',
    prosKey: 'algorithms.SRTF.pros',
    consKey: 'algorithms.SRTF.cons',
  },
  RR: {
    nameKey: 'algorithms.RR.name',
    descriptionKey: 'algorithms.RR.description',
    typeKey: 'algorithms.RR.type',
    complexityKey: 'algorithms.RR.complexity',
    prosKey: 'algorithms.RR.pros',
    consKey: 'algorithms.RR.cons',
  },
  PRIORITY_NP: {
    nameKey: 'algorithms.PRIORITY_NP.name',
    descriptionKey: 'algorithms.PRIORITY_NP.description',
    typeKey: 'algorithms.PRIORITY_NP.type',
    complexityKey: 'algorithms.PRIORITY_NP.complexity',
    prosKey: 'algorithms.PRIORITY_NP.pros',
    consKey: 'algorithms.PRIORITY_NP.cons',
  },
  PRIORITY_P: {
    nameKey: 'algorithms.PRIORITY_P.name',
    descriptionKey: 'algorithms.PRIORITY_P.description',
    typeKey: 'algorithms.PRIORITY_P.type',
    complexityKey: 'algorithms.PRIORITY_P.complexity',
    prosKey: 'algorithms.PRIORITY_P.pros',
    consKey: 'algorithms.PRIORITY_P.cons',
  },
};
