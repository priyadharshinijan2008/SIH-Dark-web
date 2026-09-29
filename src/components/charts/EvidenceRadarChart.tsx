import React from 'react';

interface EvidenceRadarChartProps {
  factors: {
    identifierOverlap: { score: number; weight: number };
    temporalOverlap: { score: number; weight: number };
    platformOverlap: { score: number; weight: number };
    behavioralSimilarity: { score: number; weight: number };
    stylometricSimilarity: { score: number; weight: number };
  };
}

export const EvidenceRadarChart: React.FC<EvidenceRadarChartProps> = ({ factors }) => {
  const axes = [
    { label: 'Identifiers (30%)', value: factors.identifierOverlap.score },
    { label: 'Temporal (15%)', value: factors.temporalOverlap.score },
    { label: 'Platform (15%)', value: factors.platformOverlap.score },
    { label: 'Behavior (20%)', value: factors.behavioralSimilarity.score },
    { label: 'Stylometry (20%)', value: factors.stylometricSimilarity.score }
  ];

  const size = 260;
  const center = size / 2;
  const radius = 95;
  const numAxes = axes.length;

  // Calculate coordinates on the radar grid
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points for the data
  const dataPoints = axes.map((axis, i) => {
    const { x, y } = getCoordinates(axis.value, i);
    return `${x},${y}`;
  }).join(' ');

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background circular web */}
        {levels.map((lvl) => {
          const r = (lvl / 100) * radius;
          return (
            <circle
              key={lvl}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray={lvl === 100 ? undefined : '2 2'}
              strokeWidth="1"
            />
          );
        })}

        {/* Axes lines and labels */}
        {axes.map((axis, i) => {
          const { x: axX, y: axY } = getCoordinates(100, i);
          const { x: lblX, y: lblY } = getCoordinates(118, i);
          return (
            <g key={axis.label}>
              <line
                x1={center}
                y1={center}
                x2={axX}
                y2={axY}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              <text
                x={lblX}
                y={lblY + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#475569"
                fontWeight="500"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Polygon Area */}
        <polygon
          points={dataPoints}
          fill="rgba(59, 130, 246, 0.25)"
          stroke="#2563eb"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Individual vertex dots */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.value, i);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#1d4ed8"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#1e3a8a"
                fontWeight="bold"
                className="font-mono"
              >
                {axis.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
