import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ThreatActor } from '../types';
import {
  FileSearch, Search, ArrowRight, ArrowLeft, CheckCircle2,
  Network, Cpu, FileText, Download, Shield, Sparkles
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface InvestigationWorkspacePageProps {
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const InvestigationWorkspacePage: React.FC<InvestigationWorkspacePageProps> = ({
  onNavigate,
  onSelectActor
}) => {
  const [stage, setStage] = useState<number>(1);
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [selectedActorId, setSelectedActorId] = useState<string>('ACTOR-DEMO-001');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    api.getActors().then(res => setActors(res.actors)).catch(console.error);
  }, []);

  const stages = [
    { num: 1, label: 'SEARCH' },
    { num: 2, label: 'PROFILE' },
    { num: 3, label: 'RELATIONSHIPS' },
    { num: 4, label: 'AI ANALYSIS' },
    { num: 5, label: 'EVIDENCE' },
    { num: 6, label: 'REPORT' }
  ];

  const selectedActor = actors.find(a => a.id === selectedActorId) || actors[0];

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileSearch className="w-6 h-6 text-blue-600" />
          <span>Investigation Workspace</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Guided 6-phase forensic workflow for de-anonymizing synthetic threat personas.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
          {stages.map((st) => {
            const isCompleted = st.num < stage;
            const isCurrent = st.num === stage;
            return (
              <button
                key={st.num}
                onClick={() => setStage(st.num)}
                className="flex flex-col items-center gap-1.5 relative z-10 group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-100'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-400 group-hover:border-slate-400'
                }`}>
                  {isCompleted ? '✓' : st.num}
                </div>
                <span className={`text-[10px] font-bold tracking-wider ${
                  isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase Content Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* STAGE 1: SEARCH */}
        {stage === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Phase 1: Search & Target Selection
            </h3>
            <p className="text-xs text-slate-500">
              Query the synthetic intelligence catalog to select the primary target persona for attribution.
            </p>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Filter personas by alias (e.g. ShadowX, NightCipher)..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pt-1">
              {actors
                .filter(a => !searchFilter || a.alias.toLowerCase().includes(searchFilter.toLowerCase()))
                .map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setSelectedActorId(a.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedActorId === a.id
                        ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{a.alias}</span>
                      <span className="font-mono text-blue-700 text-[11px]">{a.confidenceScore}%</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{a.category}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* STAGE 2: PROFILE */}
        {stage === 2 && selectedActor && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Phase 2: Target Persona Dossier ({selectedActor.alias})
            </h3>
            <p className="text-xs text-slate-500">
              Review basic intelligence parameters, alternate handles, and active eras.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-slate-400">Actor ID:</span>
                  <div className="font-mono font-bold text-slate-900">{selectedActor.id}</div>
                </div>
                <div>
                  <span className="text-slate-400">Category:</span>
                  <div className="font-semibold text-slate-900">{selectedActor.category}</div>
                </div>
                <div>
                  <span className="text-slate-400">First Seen:</span>
                  <div className="font-mono text-slate-900">{selectedActor.firstSeen}</div>
                </div>
                <div>
                  <span className="text-slate-400">Last Seen:</span>
                  <div className="font-mono text-slate-900">{selectedActor.lastSeen}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/70">
                <span className="text-slate-400">Summary:</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedActor.summary}</p>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectActor(selectedActor.id);
                onNavigate(`/actors/${selectedActor.id}`);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              Open Full Profile Page →
            </button>
          </div>
        )}

        {/* STAGE 3: RELATIONSHIPS */}
        {stage === 3 && selectedActor && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Phase 3: Relational Graph Traversal
            </h3>
            <p className="text-xs text-slate-500">
              Correlate PGP key fingerprints, Bitcoin/Monero addresses, and hosting servers.
            </p>

            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-blue-900">{selectedActor.relationshipsCount} Directed Edges Found</div>
                <div className="text-blue-700 mt-0.5">Anchored in Neo4j relational model with multi-hop hops.</div>
              </div>
              <button
                onClick={() => onNavigate(`/graph?focus=${selectedActor.id}`)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
              >
                Launch Graph Workbench
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: AI ANALYSIS */}
        {stage === 4 && selectedActor && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Phase 4: Run AI-Assisted Stylometry & Behavioral Engine
            </h3>
            <p className="text-xs text-slate-500">
              Compare target against secondary persona to evaluate writing syntax and circadian patterns.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-500 font-medium">Stylometric Alignment</span>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">78%</div>
                <span className="text-[10px] text-slate-400">Cosine & Jaccard Trigrams</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-500 font-medium">Diurnal Rhythm Concordance</span>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">74%</div>
                <span className="text-[10px] text-slate-400">24-hour UTC Histogram</span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: EVIDENCE */}
        {stage === 5 && selectedActor && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Phase 5: Evidence Review & Attribution Scoring
            </h3>
            <p className="text-xs text-slate-500">
              Validate transparent weighting across all 5 investigative dimensions.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Digital Identifiers (30% weight)</span>
                <span className="font-mono font-bold text-blue-700">92%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Behavioral Rhythm (20% weight)</span>
                <span className="font-mono font-bold text-blue-700">74%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Stylometric Writing (20% weight)</span>
                <span className="font-mono font-bold text-blue-700">78%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Platform Presence (15% weight)</span>
                <span className="font-mono font-bold text-blue-700">85%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-slate-700">Temporal Era Concurrence (15% weight)</span>
                <span className="font-mono font-bold text-blue-700">88%</span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: REPORT */}
        {stage === 6 && selectedActor && (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Investigation Complete
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Attribution analysis for <strong className="text-slate-800">{selectedActor.alias}</strong> is ready for export.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(`/reports/${selectedActor.id}`)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Investigation Dossier</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={() => setStage(s => Math.max(1, s - 1))}
            disabled={stage === 1}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Phase</span>
          </button>

          <button
            onClick={() => setStage(s => Math.min(6, s + 1))}
            disabled={stage === 6}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
