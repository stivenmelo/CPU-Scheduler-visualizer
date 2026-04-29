import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlgorithmSelector } from '@/features/algorithmSelector/components/AlgorithmSelector';
import { useSimulationStore } from '@/store/useSimulationStore';
import { SCENARIO_IDS } from '@/constants/demoData';
import { SCENARIOS } from '@/constants/demoData';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedAlgorithm, activeScenario, selectScenario } = useSimulationStore();

  const handleLaunch = () => navigate('/simulator');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '32px' }}
    >
      <motion.div {...fadeUp} style={{ textAlign: 'center' }}>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.25)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
          OS Simulator
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.1 }}>
          {t('home.hero_title')}
          <span style={{ display: 'block', background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Visualizer
          </span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          {t('home.hero_subtitle')}
        </p>

        {selectedAlgorithm && (
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLaunch}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 20px hsla(217,91%,60%,0.4)',
            }}
          >
            {t('home.cta')} →
          </motion.button>
        )}
      </motion.div>

      <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.4 }}>
        <AlgorithmSelector />
      </motion.div>

      <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.4 }}>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)', margin: 0 }}>
            {t('home.select_scenario')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {SCENARIO_IDS.map(id => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => selectScenario(id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: activeScenario === id ? 'var(--accent)' : 'var(--bg-card)',
                  color: activeScenario === id ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${activeScenario === id ? 'var(--accent)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                }}
              >
                {t(SCENARIOS[id].labelKey)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
