import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '@/store/useSimulationStore';
import { CpuCore } from './CpuCore';
import { ExecutionProgress } from './ExecutionProgress';

export function CpuDisplay() {
  const { t } = useTranslation();
  const { result, currentStepIndex, processes } = useSimulationStore();

  const currentStep = result?.steps[currentStepIndex];
  const runningId = currentStep?.runningProcess ?? null;
  const currentProcess = processes.find(p => p.id === runningId);
  const color = currentProcess?.color ?? '#6B7280';

  const progress = (() => {
    if (!result || !runningId) return 0;
    let sliceStart = currentStepIndex;
    for (let i = currentStepIndex - 1; i >= 0; i--) {
      if (result.steps[i].runningProcess !== runningId) break;
      sliceStart = i;
    }
    let sliceEnd = currentStepIndex;
    for (let i = currentStepIndex + 1; i < result.steps.length; i++) {
      if (result.steps[i].runningProcess !== runningId) break;
      sliceEnd = i;
    }
    const sliceLen = sliceEnd - sliceStart + 1;
    return sliceLen > 0 ? (currentStepIndex - sliceStart + 1) / sliceLen : 1;
  })();

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: runningId ? '#10B981' : '#6B7280' }} />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {t('cpu.title')}
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <CpuCore processId={runningId} color={color} />

        <div className="text-center">
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)', margin: 0 }}>
            {runningId ? t('cpu.executing') : t('cpu.idle')}
          </p>
          {runningId && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', margin: 0 }}>
              t = {currentStep?.time ?? 0}
            </p>
          )}
        </div>

        <div className="w-full">
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{t('cpu.progress')}</p>
          <ExecutionProgress progress={runningId ? progress : 0} color={color} />
        </div>
      </div>
    </div>
  );
}
