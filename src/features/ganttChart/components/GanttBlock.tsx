import { motion } from 'framer-motion';
import type { GanttBlock as GanttBlockType } from '@/types';

interface Props {
  block: GanttBlockType;
  unitWidth: number;
  isNew: boolean;
}

export function GanttBlock({ block, unitWidth, isNew }: Props) {
  const width = (block.endTime - block.startTime) * unitWidth;
  const isIdle = block.processId === null;

  return (
    <motion.div
      initial={isNew ? { scaleX: 0, opacity: 0.6 } : false}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        height: '36px',
        background: isIdle ? 'var(--bg-secondary)' : block.color,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'left center',
        border: `1px solid ${isIdle ? 'var(--border-color)' : block.color}`,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!isIdle && (
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.15,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
          }}
        />
      )}
      <span style={{
        fontSize: '11px', fontWeight: 700, color: isIdle ? 'var(--text-muted)' : '#fff',
        position: 'relative', zIndex: 1, whiteSpace: 'nowrap',
        textOverflow: 'ellipsis', overflow: 'hidden', padding: '0 4px',
      }}>
        {block.label}
      </span>
    </motion.div>
  );
}
