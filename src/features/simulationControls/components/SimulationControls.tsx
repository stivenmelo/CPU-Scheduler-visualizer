import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '@/store/useSimulationStore';
import { SpeedSlider } from './SpeedSlider';
import { StepCounter } from './StepCounter';

export function SimulationControls() {
  const { t } = useTranslation();
  const { status, speed, result, currentStepIndex, play, pause, reset, setSpeed, selectedAlgorithm } = useSimulationStore();

  if (!selectedAlgorithm || !result) return null;

  const isPlaying = status === 'playing';
  const isCompleted = status === 'completed';
  const total = result.steps.length;
  const current = currentStepIndex + 1;

  const btnBase: React.CSSProperties = {
    width: '38px', height: '38px', borderRadius: '10px', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none',
    transition: 'transform 0.1s',
  };

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={isPlaying ? pause : play}
          disabled={isCompleted}
          style={{ ...btnBase, background: isCompleted ? 'var(--bg-secondary)' : 'var(--accent)', color: '#fff', opacity: isCompleted ? 0.5 : 1 }}
          aria-label={isPlaying ? t('controls.pause') : t('controls.play')}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={reset}
          style={{ ...btnBase, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          aria-label={t('controls.reset')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </motion.button>
      </div>

      <StepCounter current={current} total={total} />

      <SpeedSlider value={speed} onChange={setSpeed} />
    </div>
  );
}
