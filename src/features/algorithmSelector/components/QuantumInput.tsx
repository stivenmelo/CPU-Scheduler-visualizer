import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function QuantumInput({ value, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div
        className="flex items-center gap-3 px-3 py-2 rounded-xl"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <label className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
          {t('quantum.label')}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(1, value - 1))}
            className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          >−</button>
          <span className="w-6 text-center text-sm font-bold" style={{ color: 'var(--accent)' }}>{value}</span>
          <button
            onClick={() => onChange(Math.min(10, value + 1))}
            className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          >+</button>
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('quantum.hint')}</span>
      </div>
    </motion.div>
  );
}
