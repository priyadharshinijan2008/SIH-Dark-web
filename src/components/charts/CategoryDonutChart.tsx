import React, { useState } from 'react';

interface CategoryDonutChartProps {
  data: Array<{ name: string; count: number }>;
}

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const colors = [
    '#2563eb', // Blue
    '#0284c7', // Sky
    '#7c3aed', // Violet
    '#059669', // Emerald
    '#d97706', // Amber
    '#dc2626', // Red
    '#475569', // Slate
    '#ec4899', // Pink
  ];

  const total = data.reduce((sum, d) => sum + d.count, 0) || 1;

  // Calculate SVG arc paths
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0 select-none">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          {data.map((item, idx) => {
            const percent = item.count / total;
            const strokeDashoffset = circumference - (circumference * percent);
            const rotationOffset = accumulatedPercent * 360;
            accumulatedPercent += percent;

            const isHovered = hoveredIdx === idx;
            const strokeColor = colors[idx % colors.length];

            return (
              <circle
                key={item.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transformOrigin: '50% 50%',
                  transform: `rotate(${rotationOffset}deg)`,
                  transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                  opacity: hoveredIdx !== null && !isHovered ? 0.4 : 1
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-slate-800 font-mono">
            {hoveredIdx !== null ? data[hoveredIdx].count : total}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {hoveredIdx !== null ? data[hoveredIdx].name.slice(0, 10) : 'Total'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs w-full">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const pct = Math.round((item.count / total) * 100);
          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
                isHovered ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="truncate">{item.name}</span>
              </div>
              <span className="font-mono text-slate-400 text-[11px] ml-2">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
