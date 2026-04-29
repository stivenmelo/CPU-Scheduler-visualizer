import type { Process } from '@/types';

interface Props { processes: Process[] }

export function GanttLegend({ processes }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {processes.map(p => (
        <div key={p.id} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: p.color }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.id}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Idle</span>
      </div>
    </div>
  );
}
