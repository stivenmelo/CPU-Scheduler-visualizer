import { useTranslation } from 'react-i18next';

const SPEEDS = [0.25, 0.5, 1, 2, 4];

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function SpeedSlider({ value, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('controls.speed')}</span>
      <div className="flex gap-1">
        {SPEEDS.map(s => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="px-2 py-0.5 rounded text-xs font-semibold transition-colors"
            style={{
              background: value === s ? 'var(--accent)' : 'var(--bg-secondary)',
              color: value === s ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${value === s ? 'var(--accent)' : 'var(--border-color)'}`,
            }}
          >
            {s}×
          </button>
        ))}
      </div>
    </div>
  );
}
