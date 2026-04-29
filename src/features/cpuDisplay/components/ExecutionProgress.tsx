import { motion } from 'framer-motion';

interface Props {
  progress: number;
  color: string;
}

export function ExecutionProgress({ progress, color }: Props) {
  return (
    <div
      className="h-2 rounded-full overflow-hidden w-full"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <motion.div
        className="h-full rounded-full"
        animate={{ width: `${Math.max(4, progress * 100)}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ background: color }}
      />
    </div>
  );
}
