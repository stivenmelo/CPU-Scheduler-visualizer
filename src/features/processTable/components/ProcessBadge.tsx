interface Props {
  color: string;
  label: string;
  size?: 'sm' | 'md';
}

export function ProcessBadge({ color, label, size = 'md' }: Props) {
  const pad = size === 'sm' ? '2px 8px' : '3px 10px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  return (
    <span
      style={{ background: color, padding: pad, borderRadius: '999px', color: '#fff', fontSize, fontWeight: 700, display: 'inline-block' }}
    >
      {label}
    </span>
  );
}
