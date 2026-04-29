import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/store/useUIStore';
import { THEORY_DATA } from '../data/theoryData';
import { ProsConsTable } from './ProsConsTable';

export function TheoryPanel() {
  const { t } = useTranslation();
  const { isTheoryPanelOpen, theoryAlgorithmId, closeTheoryPanel } = useUIStore();
  const data = theoryAlgorithmId ? THEORY_DATA[theoryAlgorithmId] : null;

  return (
    <AnimatePresence>
      {isTheoryPanelOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTheoryPanel}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '340px', maxWidth: '90vw',
              background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
              zIndex: 51, overflowY: 'auto', display: 'flex', flexDirection: 'column',
            }}
          >
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)', margin: 0 }}>
                {data ? t(data.nameKey) : t('theory.noSelection')}
              </h2>
              <button
                onClick={closeTheoryPanel}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
                aria-label={t('theory.close')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {data && (
              <div className="p-4 flex flex-col gap-4">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(data.descriptionKey)}
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--accent)' }}
                  >
                    {t('theory.scheduling_type')}: {t(data.typeKey)}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                  >
                    {t('theory.complexity')}: {t(data.complexityKey)}
                  </span>
                </div>

                <ProsConsTable prosKey={data.prosKey} consKey={data.consKey} />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
