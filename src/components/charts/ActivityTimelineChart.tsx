import React, { useState } from 'react';

interface ActivityTimelineChartProps {
  data: Array<{ month: string; events: number }>;
}

export const ActivityTimelineChart: React.FC<ActivityTimelineChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-xs text-slate-400">No activity data available</div>;
  }

  const maxEvents = Math.max(...data.map(d => d.events), 1);
  const chartHeight = 160;
  const chartWidth = 540;
  const barWidth = Math.max(16, Math.floor((chartWidth - data.length * 8) / data.length));

  return (
    <div className="relative">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="font-medium text-slate-700">Monthly Observation Volume</span>
        <span className="font-mono text-[11px]">Peak: {maxEvents} events</span>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 35}`} className="w-full h-48 select-none">
          {/* Horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = chartHeight - (chartHeight * pct) + 10;
            return (
              <g key={idx}>
                <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="5" y={y - 4} fontSize="9" fill="#94a3b8" className="font-mono">
                  {Math.round(maxEvents * pct)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const barH = (item.events / maxEvents) * chartHeight;
            const x = idx * (chartWidth / data.length) + 12;
            const y = chartHeight - barH + 10;
            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={item.month}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all"
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="4"
                  className={isHovered ? 'fill-blue-600 transition-colors' : 'fill-blue-400 hover:fill-blue-500 transition-colors'}
                />

                {/* X Axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 24}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isHovered ? '#1e293b' : '#64748b'}
                  className={isHovered ? 'font-bold' : ''}
                >
                  {item.month.slice(5)}
                </text>

                {/* Value on bar if hovered */}
                {isHovered && (
                  <text
                    x={x + barWidth / 2}
                    y={Math.max(14, y - 6)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#1e40af"
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {item.events}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {hoveredIndex !== null && (
        <div className="absolute top-2 right-2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-md">
          {data[hoveredIndex].month}: <strong className="font-mono text-cyan-300">{data[hoveredIndex].events}</strong> recorded events
        </div>
      )}
    </div>
  );
};
