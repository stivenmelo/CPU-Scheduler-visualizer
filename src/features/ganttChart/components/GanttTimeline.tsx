interface Props {
  maxTime: number;
  unitWidth: number;
}

export function GanttTimeline({ maxTime, unitWidth }: Props) {
  const ticks = Array.from({ length: maxTime + 1 }, (_, i) => i);

  return (
    <div className="flex" style={{ position: 'relative' }}>
      {ticks.map(t => (
        <div
          key={t}
          style={{
            width: `${unitWidth}px`,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ width: '1px', height: '6px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', transform: 'translateX(-50%)', userSelect: 'none' }}>
            {t}
          </span>
        </div>
      ))}
    </div>
  );
}
