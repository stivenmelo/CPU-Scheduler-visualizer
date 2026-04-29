import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { AlgorithmConfig } from '@/types';

interface Props {
  config: AlgorithmConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export function AlgorithmCard({ config, isSelected, onSelect }: Props) {
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      onClick={onSelect}
      style={{
        background: isSelected ? 'var(--accent)' : 'var(--bg-card)',
        border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border-color)'}`,
        boxShadow: isSelected ? '0 0 20px hsla(217,91%,60%,0.3)' : 'var(--shadow)',
        color: isSelected ? '#fff' : 'var(--text-primary)',
        borderRadius: '12px',
        padding: '14px 16px',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-bold text-sm leading-tight">{t(config.nameKey)}</span>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
          style={{
            background: isSelected ? 'rgba(255,255,255,0.2)' : (config.isPreemptive ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)'),
            color: isSelected ? '#fff' : (config.isPreemptive ? '#EF4444' : '#10B981'),
          }}
        >
          {config.isPreemptive ? 'Preemptive' : 'Non-Preemptive'}
        </span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed" style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
        {t(config.descriptionKey)}
      </p>
    </motion.button>
  );
}
