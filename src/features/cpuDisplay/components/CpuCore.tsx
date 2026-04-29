import { motion } from 'framer-motion';

interface Props {
  processId: string | null;
  color: string;
}

export function CpuCore({ processId, color }: Props) {
  return (
    <motion.div
      key={processId ?? 'idle'}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: [1, 1.07, 1],
        opacity: 1,
        boxShadow: processId
          ? [`0 0 0px ${color}00`, `0 0 24px ${color}80`, `0 0 12px ${color}40`]
          : ['0 0 0px #6B728000', '0 0 0px #6B728000'],
      }}
      transition={{ duration: 0.6, ease: 'easeInOut', times: [0, 0.5, 1] }}
      style={{
        width: '64px', height: '64px', borderRadius: '16px',
        background: processId ? color : 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `2px solid ${processId ? color : 'var(--border-color)'}`,
      }}
    >
      <span style={{ color: processId ? '#fff' : 'var(--text-muted)', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>
        {processId ?? '—'}
      </span>
    </motion.div>
  );
}
