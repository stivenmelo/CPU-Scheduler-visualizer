import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '@/store/useSimulationStore';
import { GanttBlock } from './GanttBlock';
import { GanttTimeline } from './GanttTimeline';
import { GanttLegend } from './GanttLegend';

const UNIT_WIDTH = 40;

export function GanttChart() {
  const { t } = useTranslation();
  const { result, currentStepIndex, processes } = useSimulationStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentTime = result ? (result.steps[currentStepIndex]?.time ?? 0) + 1 : 0;

  const visibleBlocks = result?.ganttBlocks.filter(b => b.startTime < currentTime).map(b => ({
    ...b,
    endTime: Math.min(b.endTime, currentTime),
  })) ?? [];

  const lastBlockKey = visibleBlocks.at(-1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  if (!result) return null;

  const maxTime = result.steps.length;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {t('gantt.title')}
        </span>
        <GanttLegend processes={processes} />
      </div>

      <div
        ref={scrollRef}
        style={{ overflowX: 'auto', paddingBottom: '4px' }}
      >
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', minWidth: 'max-content' }}>
          <div style={{ display: 'flex', gap: '2px', alignItems: 'stretch' }}>
            {visibleBlocks.map((block, i) => {
              const isLast = i === visibleBlocks.length - 1;
              const isNew = isLast && block.startTime === lastBlockKey?.startTime;
              return (
                <GanttBlock
                  key={`${block.startTime}-${block.processId ?? 'idle'}`}
                  block={block}
                  unitWidth={UNIT_WIDTH}
                  isNew={isNew}
                />
              );
            })}
          </div>
          <GanttTimeline maxTime={maxTime} unitWidth={UNIT_WIDTH} />
        </div>
      </div>
    </div>
  );
}
