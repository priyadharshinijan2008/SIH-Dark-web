import React from 'react';

interface DiurnalHeatmapProps {
  distributionA: number[];
  distributionB: number[];
  nameA: string;
  nameB: string;
}

export const DiurnalHeatmap: React.FC<DiurnalHeatmapProps> = ({
  distributionA,
  distributionB,
  nameA,
  nameB
}) => {
  const maxA = Math.max(...distributionA, 1);
  const maxB = Math.max(...distributionB, 1);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="space-y-4 text-xs">
      <div>
        <div className="flex items-center justify-between text-slate-700 font-semibold mb-1.5">
          <span>{nameA} (Diurnal Distribution)</span>
          <span className="text-[11px] text-slate-400 font-normal">UTC 00:00 - 23:00</span>
        </div>
        <div className="grid grid-cols-24 gap-1">
          {hours.map((h) => {
            const val = distributionA[h] || 0;
            const intensity = val / maxA;
            return (
              <div
                key={h}
                title={`${nameA} @ ${String(h).padStart(2, '0')}:00 UTC - ${val} observations`}
                className="h-8 rounded-xs flex items-center justify-center text-[9px] font-mono transition-transform hover:scale-110"
                style={{
                  backgroundColor: intensity > 0.7 ? '#1d4ed8' : intensity > 0.4 ? '#3b82f6' : intensity > 0.15 ? '#93c5fd' : '#e2e8f0',
                  color: intensity > 0.4 ? '#ffffff' : '#475569'
                }}
              >
                {h % 4 === 0 ? h : ''}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-slate-700 font-semibold mb-1.5">
          <span>{nameB} (Comparison Diurnal Distribution)</span>
          <span className="text-[11px] text-slate-400 font-normal">UTC 00:00 - 23:00</span>
        </div>
        <div className="grid grid-cols-24 gap-1">
          {hours.map((h) => {
            const val = distributionB[h] || 0;
            const intensity = val / maxB;
            return (
              <div
                key={h}
                title={`${nameB} @ ${String(h).padStart(2, '0')}:00 UTC - ${val} observations`}
                className="h-8 rounded-xs flex items-center justify-center text-[9px] font-mono transition-transform hover:scale-110"
                style={{
                  backgroundColor: intensity > 0.7 ? '#047857' : intensity > 0.4 ? '#10b981' : intensity > 0.15 ? '#6ee7b7' : '#e2e8f0',
                  color: intensity > 0.4 ? '#ffffff' : '#475569'
                }}
              >
                {h % 4 === 0 ? h : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
