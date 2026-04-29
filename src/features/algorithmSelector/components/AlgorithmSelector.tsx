import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ALGORITHM_CONFIGS } from '@/constants/algorithms';
import { useSimulationStore } from '@/store/useSimulationStore';
import { AlgorithmCard } from './AlgorithmCard';
import { QuantumInput } from './QuantumInput';

export function AlgorithmSelector() {
  const { t } = useTranslation();
  const { selectedAlgorithm, quantum, selectAlgorithm, setQuantum } = useSimulationStore();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {t('home.select_algo')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ALGORITHM_CONFIGS.map(config => (
          <AlgorithmCard
            key={config.id}
            config={config}
            isSelected={selectedAlgorithm === config.id}
            onSelect={() => selectAlgorithm(config.id)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedAlgorithm === 'RR' && (
          <QuantumInput value={quantum} onChange={setQuantum} />
        )}
      </AnimatePresence>
    </div>
  );
}
