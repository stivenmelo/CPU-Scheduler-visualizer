import type { Process } from '@/types';

export interface ProcessColor {
  bg: string;
  text: string;
  name: string;
  glow: string;
}

export const PROCESS_COLORS: ProcessColor[] = [
  { bg: '#3B82F6', text: '#fff', name: 'blue',    glow: 'rgba(59,130,246,0.5)'   },
  { bg: '#10B981', text: '#fff', name: 'emerald', glow: 'rgba(16,185,129,0.5)'   },
  { bg: '#F59E0B', text: '#000', name: 'amber',   glow: 'rgba(245,158,11,0.5)'   },
  { bg: '#EF4444', text: '#fff', name: 'red',     glow: 'rgba(239,68,68,0.5)'    },
  { bg: '#8B5CF6', text: '#fff', name: 'violet',  glow: 'rgba(139,92,246,0.5)'   },
  { bg: '#EC4899', text: '#fff', name: 'pink',    glow: 'rgba(236,72,153,0.5)'   },
  { bg: '#06B6D4', text: '#000', name: 'cyan',    glow: 'rgba(6,182,212,0.5)'    },
  { bg: '#84CC16', text: '#000', name: 'lime',    glow: 'rgba(132,204,22,0.5)'   },
  { bg: '#F97316', text: '#fff', name: 'orange',  glow: 'rgba(249,115,22,0.5)'   },
  { bg: '#6366F1', text: '#fff', name: 'indigo',  glow: 'rgba(99,102,241,0.5)'   },
  { bg: '#14B8A6', text: '#fff', name: 'teal',    glow: 'rgba(20,184,166,0.5)'   },
  { bg: '#A855F7', text: '#fff', name: 'purple',  glow: 'rgba(168,85,247,0.5)'   },
];

export function assignColors(processes: Omit<Process, 'color'>[]): Process[] {
  return processes.map((p, i) => ({
    ...p,
    color: PROCESS_COLORS[i % PROCESS_COLORS.length].bg,
  }));
}

export function getColorMeta(color: string): ProcessColor {
  return PROCESS_COLORS.find(c => c.bg === color) ?? PROCESS_COLORS[0];
}
