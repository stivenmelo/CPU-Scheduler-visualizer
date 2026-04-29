import { useTranslation } from 'react-i18next';

interface Props { current: number; total: number }

export function StepCounter({ current, total }: Props) {
  const { t } = useTranslation();
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-1 min-w-[90px]">
      <span className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        {t('controls.step', { current, total })}
      </span>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--accent)' }}
        />
      </div>
    </div>
  );
}
