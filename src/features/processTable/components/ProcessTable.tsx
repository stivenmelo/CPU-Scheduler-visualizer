import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '@/store/useSimulationStore';
import { ProcessRow } from './ProcessRow';
import { ALGORITHM_CONFIGS } from '@/constants/algorithms';

export function ProcessTable() {
  const { t } = useTranslation();
  const { processes, result, currentStepIndex, selectedAlgorithm } = useSimulationStore();
  const currentStep = result?.steps[currentStepIndex];

  const showPriority = selectedAlgorithm
    ? (ALGORITHM_CONFIGS.find(c => c.id === selectedAlgorithm)?.requiresPriority ?? false)
    : false;

  const remainingMap = new Map<string, number>();
  if (result) {
    for (const p of processes) {
      remainingMap.set(p.id, p.burstTime);
    }
    for (let i = 0; i <= currentStepIndex && i < result.steps.length; i++) {
      const pid = result.steps[i].runningProcess;
      if (pid) remainingMap.set(pid, (remainingMap.get(pid) ?? 0) - 1);
    }
  }

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)', margin: 0 }}>
          {t('processTable.title')}
        </h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th className="py-1.5 px-3 text-left text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.id')}</th>
              <th className="py-1.5 px-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.arrival')}</th>
              <th className="py-1.5 px-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.burst')}</th>
              {showPriority && <th className="py-1.5 px-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.priority')}</th>}
              <th className="py-1.5 px-3 text-center text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.remaining')}</th>
              <th className="py-1.5 px-3 text-left text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t('processTable.status')}</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(p => (
              <ProcessRow
                key={p.id}
                process={p}
                isActive={currentStep?.runningProcess === p.id}
                isCompleted={currentStep?.completedProcesses.includes(p.id) ?? false}
                remaining={remainingMap.get(p.id)}
                showPriority={showPriority}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
