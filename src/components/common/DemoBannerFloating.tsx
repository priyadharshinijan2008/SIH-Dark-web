import React from 'react';
import { useDemo, DEMO_STEPS } from '../../context/DemoContext';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface DemoBannerFloatingProps {
  onNavigate: (route: string) => void;
}

export const DemoBannerFloating: React.FC<DemoBannerFloatingProps> = ({ onNavigate }) => {
  const { isActive, currentStepIndex, currentStep, nextStep, prevStep, stopDemo, goToStep } = useDemo();

  if (!isActive) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-6 duration-200">
      <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-xl shadow-blue-900/15 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider">
              Step {currentStep.step} of {DEMO_STEPS.length}
            </span>
            <h4 className="font-bold text-slate-900 text-sm">
              {currentStep.title}
            </h4>
          </div>

          <button
            onClick={stopDemo}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {currentStep.description}
        </p>

        <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between gap-3 mb-4 text-xs">
          <div className="flex items-center gap-2 text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">{currentStep.actionHint}</span>
          </div>
          <button
            onClick={() => onNavigate(currentStep.targetRoute)}
            className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0"
          >
            <span>Jump to View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1 overflow-x-auto max-w-[280px] sm:max-w-xs py-1">
            {DEMO_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => goToStep(idx)}
                className={`w-6 h-6 rounded-md text-[11px] font-semibold flex items-center justify-center transition-all ${
                  idx === currentStepIndex
                    ? 'bg-blue-600 text-white shadow-xs'
                    : idx < currentStepIndex
                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={`Step ${s.step}: ${s.title}`}
              >
                {idx < currentStepIndex ? '✓' : s.step}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={nextStep}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all flex items-center gap-1"
            >
              <span>{currentStepIndex === DEMO_STEPS.length - 1 ? 'Finish Demo' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
