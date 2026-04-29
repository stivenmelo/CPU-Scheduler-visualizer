import { motion } from 'framer-motion';
import type { Process } from '@/types';
import { getColorMeta } from '@/constants/colors';

interface Props {
  process: Process;
}

export function QueueSlot({ process }: Props) {
  const meta = getColorMeta(process.color);

  return (
    <motion.div
      layout
      layoutId={`queue-${process.id}`}
      initial={{ x: -40, opacity: 0, scale: 0.85 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 60, opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      style={{
        background: process.color,
        borderRadius: '10px',
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        minWidth: '52px',
        boxShadow: `0 2px 12px ${meta.glow}`,
      }}
    >
      <span style={{ color: meta.text === '#fff' ? '#fff' : '#000', fontWeight: 800, fontSize: '14px' }}>
        {process.id}
      </span>
    </motion.div>
  );
}
