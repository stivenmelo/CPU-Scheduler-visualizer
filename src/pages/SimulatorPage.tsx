import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/store/useSimulationStore';
import { useSimulationEngine } from '@/hooks/useSimulationEngine';
import { TheoryPanel } from '@/features/theoryPanel/components/TheoryPanel';
import { CpuDisplay } from '@/features/cpuDisplay/components/CpuDisplay';
import { ReadyQueue } from '@/features/readyQueue/components/ReadyQueue';
import { GanttChart } from '@/features/ganttChart/components/GanttChart';
import { SimulationControls } from '@/features/simulationControls/components/SimulationControls';
import { ProcessTable } from '@/features/processTable/components/ProcessTable';
import { AlgorithmSelector } from '@/features/algorithmSelector/components/AlgorithmSelector';
import { SCENARIO_IDS } from '@/constants/demoData';
import { SCENARIOS } from '@/constants/demoData';

export function SimulatorPage() {
  useSimulationEngine();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedAlgorithm, status, result, activeScenario, selectScenario } = useSimulationStore();

  if (!selectedAlgorithm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 16px' }}
      >
        <button
          onClick={() => navigate('/')}
          style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', marginBottom: '24px' }}
        >
          ← {t('nav.home')}
        </button>
        <AlgorithmSelector />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <TheoryPanel />

      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => navigate('/')}
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
        >
          ← {t('nav.home')}
        </button>
        <div className="flex flex-wrap gap-1.5">
          {SCENARIO_IDS.map(id => (
            <button
              key={id}
              onClick={() => selectScenario(id)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: activeScenario === id ? 'var(--accent)' : 'var(--bg-card)',
                color: activeScenario === id ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${activeScenario === id ? 'var(--accent)' : 'var(--border-color)'}`,
                cursor: 'pointer',
              }}
            >
              {t(SCENARIOS[id].labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <CpuDisplay />
        <ReadyQueue />
      </div>

      {result && <GanttChart />}

      <SimulationControls />

      <ProcessTable />

      <AnimatePresence>
        {status === 'completed' && result && (
          <MetricsPanel />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MetricsPanel() {
  const { t } = useTranslation();
  const { result, processes } = useSimulationStore();
  if (!result) return null;
  const { metrics } = result;

  const cards = [
    { label: t('metrics.avgWaiting'), value: metrics.avgWaitingTime.toFixed(2), unit: t('metrics.units') },
    { label: t('metrics.avgTurnaround'), value: metrics.avgTurnaroundTime.toFixed(2), unit: t('metrics.units') },
    { label: t('metrics.avgResponse'), value: metrics.avgResponseTime.toFixed(2), unit: t('metrics.units') },
    { label: t('metrics.cpuUtilization'), value: metrics.cpuUtilization.toFixed(1), unit: '%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)', margin: 0 }}>
        {t('metrics.title')}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)', margin: '0 0 4px' }}>{c.label}</p>
            <p className="text-xl font-bold" style={{ color: 'var(--accent)', margin: 0 }}>{c.value}<span className="text-xs font-normal ml-0.5" style={{ color: 'var(--text-muted)' }}>{c.unit}</span></p>
          </div>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {[t('processTable.id'), t('metrics.waiting'), t('metrics.turnaround'), t('metrics.response'), t('metrics.completion')].map(h => (
                <th key={h} className="py-1.5 px-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.perProcess.map(m => {
              const p = processes.find(pp => pp.id === m.processId);
              return (
                <tr key={m.processId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-2 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: p?.color }} />
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{m.processId}</span>
                    </div>
                  </td>
                  {[m.waitingTime, m.turnaroundTime, m.responseTime, m.completionTime].map((v, i) => (
                    <td key={i} className="py-2 px-3 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>{v}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
