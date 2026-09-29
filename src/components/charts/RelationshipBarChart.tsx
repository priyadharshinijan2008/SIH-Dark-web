import React from 'react';

interface RelationshipBarChartProps {
  data: Array<{ type: string; count: number }>;
}

export const RelationshipBarChart: React.FC<RelationshipBarChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="space-y-2.5">
      {data.map((item) => {
        const pct = Math.round((item.count / maxCount) * 100);
        return (
          <div key={item.type} className="text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-slate-700 font-semibold">{item.type}</span>
              <span className="font-mono text-slate-500 text-[11px]">{item.count} edges</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out hover:bg-indigo-600"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
