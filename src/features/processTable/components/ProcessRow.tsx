import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Process } from '@/types';

interface Props {
  process: Process;
  isActive: boolean;
  isCompleted: boolean;
  remaining?: number;
  showPriority: boolean;
}

export function ProcessRow({ process, isActive, isCompleted, remaining, showPriority }: Props) {
  const { t } = useTranslation();

  const statusLabel = isCompleted
    ? t('processTable.status_done')
    : isActive
    ? t('processTable.status_running')
    : t('processTable.status_waiting');

  const statusColor = isCompleted ? '#10B981' : isActive ? process.color : 'var(--text-muted)';

  return (
    <motion.tr
      layout
      style={{
        background: isActive ? `${process.color}15` : 'transparent',
        opacity: isCompleted ? 0.5 : 1,
        transition: 'background 0.3s, opacity 0.3s',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <td className="py-2 px-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: process.color }} />
          <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{process.id}</span>
        </div>
      </td>
      <td className="py-2 px-3 text-xs text-center" style={{ color: 'var(--text-secondary)' }}>{process.arrivalTime}</td>
      <td className="py-2 px-3 text-xs text-center" style={{ color: 'var(--text-secondary)' }}>{process.burstTime}</td>
      {showPriority && (
        <td className="py-2 px-3 text-xs text-center" style={{ color: 'var(--text-secondary)' }}>{process.priority}</td>
      )}
      <td className="py-2 px-3 text-xs text-center font-medium" style={{ color: isActive ? process.color : 'var(--text-muted)' }}>
        {remaining ?? process.burstTime}
      </td>
      <td className="py-2 px-3">
        <span className="text-xs font-medium" style={{ color: statusColor }}>{statusLabel}</span>
        {isActive && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="ml-1 text-xs"
            style={{ color: process.color }}
          >●</motion.span>
        )}
      </td>
    </motion.tr>
  );
}
