import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '@/store/useSimulationStore';
import { QueueSlot } from './QueueSlot';

export function ReadyQueue() {
  const { t } = useTranslation();
  const { result, currentStepIndex, processes } = useSimulationStore();
  const currentStep = result?.steps[currentStepIndex];
  const queueIds = currentStep?.readyQueue ?? [];
  const queueProcesses = queueIds.map(id => processes.find(p => p.id === id)).filter(Boolean) as typeof processes;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {t('queue.title')}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
        >
          {queueProcesses.length}
        </span>
      </div>

      <div className="flex items-center gap-2 min-h-[52px] overflow-x-auto pb-1">
        <AnimatePresence mode="popLayout">
          {queueProcesses.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('queue.empty')}
            </motion.p>
          ) : (
            queueProcesses.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 flex-shrink-0">
                <QueueSlot process={p} />
                {i < queueProcesses.length - 1 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>→</span>
                )}
              </div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
