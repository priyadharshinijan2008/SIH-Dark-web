import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface ExplanationBoxProps {
  title: string;
  shortSummary: string;
  details?: string | React.ReactNode;
  icon?: 'info' | 'lightbulb';
  defaultExpanded?: boolean;
}

export const ExplanationBox: React.FC<ExplanationBoxProps> = ({
  title,
  shortSummary,
  details,
  icon = 'info',
  defaultExpanded = false
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-xs transition-all shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded-md bg-blue-100/70 text-blue-700 shrink-0 mt-0.5">
            {icon === 'lightbulb' ? <Lightbulb className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
          </div>
          <div>
            <div className="font-semibold text-slate-800">{title}</div>
            <div className="text-slate-600 mt-0.5 leading-relaxed">{shortSummary}</div>
          </div>
        </div>

        {details && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium shrink-0 pt-0.5 transition-colors"
          >
            <span>{expanded ? 'Less' : 'Learn More'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {expanded && details && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 text-slate-600 leading-relaxed animate-in fade-in duration-150">
          {typeof details === 'string' ? <p>{details}</p> : details}
        </div>
      )}
    </div>
  );
};
