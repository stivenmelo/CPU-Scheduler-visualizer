import { useTranslation } from 'react-i18next';

interface Props {
  prosKey: string;
  consKey: string;
}

export function ProsConsTable({ prosKey, consKey }: Props) {
  const { t } = useTranslation();
  const pros = t(prosKey, { returnObjects: true }) as string[];
  const cons = t(consKey, { returnObjects: true }) as string[];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: '#10B981' }}>{t('theory.pros')}</p>
        <ul className="flex flex-col gap-1.5">
          {pros.map((item, i) => (
            <li key={i} className="flex gap-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: '#10B981' }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: '#EF4444' }}>{t('theory.cons')}</p>
        <ul className="flex flex-col gap-1.5">
          {cons.map((item, i) => (
            <li key={i} className="flex gap-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }}>✗</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
