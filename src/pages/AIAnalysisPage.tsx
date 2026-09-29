import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ThreatActor, StylometricComparisonResult, BehavioralComparisonResult, EntityLinkingResult } from '../types';
import {
  Cpu, ArrowRight, RefreshCw, AlertTriangle, CheckCircle2,
  FileText, Activity, GitCompare, Sparkles, HelpCircle
} from 'lucide-react';
import { EvidenceRadarChart } from '../components/charts/EvidenceRadarChart';
import { DiurnalHeatmap } from '../components/charts/DiurnalHeatmap';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface AIAnalysisPageProps {
  initialActorA?: string;
  initialActorB?: string;
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const AIAnalysisPage: React.FC<AIAnalysisPageProps> = ({
  initialActorA,
  initialActorB,
  onNavigate,
  onSelectActor
}) => {
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [activeTab, setActiveTab] = useState<'entity-link' | 'stylometry' | 'behavior'>('entity-link');

  // Selected Actors for Persona Comparison
  const [actorAId, setActorAId] = useState<string>(initialActorA || 'ACTOR-DEMO-001');
  const [actorBId, setActorBId] = useState<string>(initialActorB || 'ACTOR-DEMO-002');

  // Stylometry Custom Inputs
  const [sampleA, setSampleA] = useState<string>(
    'Payment must be completed before delivery. PGP signed warranty provided for all private escrow transactions. No split payments accepted.'
  );
  const [sampleB, setSampleB] = useState<string>(
    'Payment should be completed before delivery. PGP signed confirmation will be issued for private escrow deals. Single transaction settlement only.'
  );
  const [styloResult, setStyloResult] = useState<StylometricComparisonResult | null>(null);
  const [styloLoading, setStyloLoading] = useState(false);

  // Behavioral Results
  const [behaviorResult, setBehaviorResult] = useState<{
    actorA: any;
    actorB: any;
    comparison: BehavioralComparisonResult;
  } | null>(null);
  const [behaviorLoading, setBehaviorLoading] = useState(false);

  // Entity Linking Result
  const [entityLinkResult, setEntityLinkResult] = useState<EntityLinkingResult | null>(null);
  const [entityLinkLoading, setEntityLinkLoading] = useState(false);

  useEffect(() => {
    api.getActors().then(res => setActors(res.actors)).catch(console.error);
  }, []);

  // Run Entity Linking
  const runEntityLinking = async () => {
    try {
      setEntityLinkLoading(true);
      const res = await api.analyzeEntityLinking(actorAId, actorBId);
      setEntityLinkResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setEntityLinkLoading(false);
    }
  };

  // Run Stylometry
  const runStylometry = async () => {
    try {
      setStyloLoading(true);
      const res = await api.analyzeStylometry(sampleA, sampleB);
      setStyloResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setStyloLoading(false);
    }
  };

  // Run Behavioral
  const runBehavior = async () => {
    try {
      setBehaviorLoading(true);
      const res = await api.analyzeBehavior(actorAId, actorBId);
      setBehaviorResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setBehaviorLoading(false);
    }
  };

  useEffect(() => {
    runEntityLinking();
    runBehavior();
    runStylometry();
  }, [actorAId, actorBId]);

  const actorA = actors.find(a => a.id === actorAId);
  const actorB = actors.find(a => a.id === actorBId);

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto" id="ai-analysis-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-blue-600" />
            <span>AI-Assisted Threat Intelligence Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic persona correlation, writing style fingerprinting, and circadian behavioral modeling.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('entity-link')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'entity-link' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Entity Linking Model
          </button>
          <button
            onClick={() => setActiveTab('stylometry')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'stylometry' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stylometric Analysis
          </button>
          <button
            onClick={() => setActiveTab('behavior')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'behavior' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Behavioral Patterns
          </button>
        </div>
      </div>

      {/* Global Subject Selectors */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Subject Persona (Actor A):</label>
            <select
              value={actorAId}
              onChange={e => setActorAId(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-900 font-bold"
            >
              {actors.map(a => (
                <option key={a.id} value={a.id}>{a.alias} ({a.category})</option>
              ))}
            </select>
          </div>

          <div className="text-slate-400 font-bold self-end pb-2">vs</div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Target Persona (Actor B):</label>
            <select
              value={actorBId}
              onChange={e => setActorBId(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-900 font-bold"
            >
              {actors.map(a => (
                <option key={a.id} value={a.id}>{a.alias} ({a.category})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActorAId('ACTOR-DEMO-001');
              setActorBId('ACTOR-DEMO-002');
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            Demo Pair (ShadowX vs NightCipher)
          </button>
        </div>
      </div>

      {/* TAB 1: ENTITY LINKING */}
      {activeTab === 'entity-link' && entityLinkResult && (
        <div className="space-y-6" id="evidence-breakdown">
          {/* Top Score Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
                Multi-Factor Attribution Model
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {entityLinkResult.actorAName} ↔ {entityLinkResult.actorBName}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Evaluated Association:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  {entityLinkResult.associationStrength}
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                Deterministic mathematical model weighting hard digital identifiers (30%), stylometry (20%), behavior (20%), platforms (15%), and temporal concurrence (15%).
              </p>
            </div>

            <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl text-center shrink-0 min-w-[200px]">
              <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                Analytical Association
              </div>
              <div className="text-5xl font-black font-mono text-blue-900 my-1">
                {entityLinkResult.overallConfidence}%
              </div>
              <div className="text-[10px] text-blue-600 font-medium">
                Combined Confidence Score
              </div>
            </div>
          </div>

          {/* Radar Chart & Factor Contribution Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 5-Axis Spider Radar Chart */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center">
              <h3 className="font-bold text-slate-900 text-sm mb-4 self-start">
                Multi-Factor Dimension Geometry
              </h3>
              <EvidenceRadarChart factors={entityLinkResult.factors} />
            </div>

            {/* Evidence Breakdown Bars */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Factor Contribution Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                {/* Identifier Overlap (30%) */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">1. Digital Identifiers (Weight 30%)</span>
                    <span className="font-mono font-bold text-blue-700">
                      {entityLinkResult.factors.identifierOverlap.score}% → +{entityLinkResult.factors.identifierOverlap.contribution}%
                    </span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 text-[11px]">
                    {entityLinkResult.factors.identifierOverlap.evidence.map((ev, i) => (
                      <li key={i}>· {ev}</li>
                    ))}
                  </ul>
                </div>

                {/* Behavioral Similarity (20%) */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">2. Behavioral Rhythm (Weight 20%)</span>
                    <span className="font-mono font-bold text-blue-700">
                      {entityLinkResult.factors.behavioralSimilarity.score}% → +{entityLinkResult.factors.behavioralSimilarity.contribution}%
                    </span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 text-[11px]">
                    {entityLinkResult.factors.behavioralSimilarity.evidence.map((ev, i) => (
                      <li key={i}>· {ev}</li>
                    ))}
                  </ul>
                </div>

                {/* Stylometric Similarity (20%) */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">3. Stylometric Writing (Weight 20%)</span>
                    <span className="font-mono font-bold text-blue-700">
                      {entityLinkResult.factors.stylometricSimilarity.score}% → +{entityLinkResult.factors.stylometricSimilarity.contribution}%
                    </span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 text-[11px]">
                    {entityLinkResult.factors.stylometricSimilarity.evidence.map((ev, i) => (
                      <li key={i}>· {ev}</li>
                    ))}
                  </ul>
                </div>

                {/* Platform Overlap (15%) */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">4. Platform Footprint (Weight 15%)</span>
                    <span className="font-mono font-bold text-blue-700">
                      {entityLinkResult.factors.platformOverlap.score}% → +{entityLinkResult.factors.platformOverlap.contribution}%
                    </span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 text-[11px]">
                    {entityLinkResult.factors.platformOverlap.evidence.map((ev, i) => (
                      <li key={i}>· {ev}</li>
                    ))}
                  </ul>
                </div>

                {/* Temporal Overlap (15%) */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">5. Active Era Concurrence (Weight 15%)</span>
                    <span className="font-mono font-bold text-blue-700">
                      {entityLinkResult.factors.temporalOverlap.score}% → +{entityLinkResult.factors.temporalOverlap.contribution}%
                    </span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 text-[11px]">
                    {entityLinkResult.factors.temporalOverlap.evidence.map((ev, i) => (
                      <li key={i}>· {ev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Why was this relationship suggested? */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Why was this relationship suggested?
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {entityLinkResult.whySuggested.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="font-semibold text-slate-800 text-xs mb-2">Recommended Forensic Next Steps:</h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {entityLinkResult.investigativeNextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ExplanationBox
            title="What does the score mean?"
            shortSummary="This score represents similarity between observed indicators. It does not establish a person's real-world identity."
            details={entityLinkResult.disclaimer}
            defaultExpanded={true}
          />
        </div>
      )}

      {/* TAB 2: STYLOMETRY */}
      {activeTab === 'stylometry' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Comparative Stylometric Corpus Analyzer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluate n-gram lexical overlap, syntactic sentence length, and functional word usage across two text samples.
                </p>
              </div>
              <button
                onClick={runStylometry}
                disabled={styloLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${styloLoading ? 'animate-spin' : ''}`} />
                <span>Re-analyze Samples</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sample A (Observed ShadowX Text):</label>
                <textarea
                  rows={4}
                  value={sampleA}
                  onChange={e => setSampleA(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sample B (Suspected Shadow_X01 / Affiliate Text):</label>
                <textarea
                  rows={4}
                  value={sampleB}
                  onChange={e => setSampleB(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 font-mono text-xs"
                />
              </div>
            </div>

            {styloResult && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Stylometric Similarity</span>
                    <div className="text-3xl font-extrabold text-blue-900 font-mono mt-0.5">
                      {styloResult.similarityScore}%
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-mono text-slate-700">Cosine Token Match: <strong>{Math.round(styloResult.cosineSimilarity * 100)}%</strong></div>
                    <div className="font-mono text-slate-700">Trigram Overlap: <strong>{Math.round(styloResult.jaccardTrigramSimilarity * 100)}%</strong></div>
                    <div className="font-mono text-slate-700">Syntactic Structure: <strong>{Math.round(styloResult.syntacticMatchScore * 100)}%</strong></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Analytical Rationale: </strong>
                  {styloResult.analyticalRationale}
                </div>

                <ExplanationBox
                  title="Stylometric Signal Notice"
                  shortSummary={styloResult.disclaimer}
                  details="Stylometric similarity metrics measure linguistic consistency within synthetic forum communications. They represent an analytical signal rather than definitive biometric proof."
                  defaultExpanded={true}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BEHAVIOR */}
      {activeTab === 'behavior' && behaviorResult && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Diurnal Circadian & Temporal Rhythm Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluate timezone offsets, diurnal active hours, and inter-posting frequencies.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Behavioral Similarity:</span>
                <span className="font-mono font-bold text-blue-700 text-base ml-2">
                  {behaviorResult.comparison.similarityScore}%
                </span>
              </div>
            </div>

            {/* Heatmap visualization */}
            <DiurnalHeatmap
              distributionA={behaviorResult.actorA.profile.hourDistribution}
              distributionB={behaviorResult.actorB.profile.hourDistribution}
              nameA={behaviorResult.actorA.alias}
              nameB={behaviorResult.actorB.alias}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400 font-medium">Diurnal Circadian Overlap</div>
                <div className="font-mono font-bold text-slate-800 text-base mt-1">
                  {behaviorResult.comparison.diurnalOverlapScore}%
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400 font-medium">Posting Interval Concordance</div>
                <div className="font-mono font-bold text-slate-800 text-base mt-1">
                  {behaviorResult.comparison.intervalVarianceMatch}%
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-slate-400 font-medium">Platform Footprint Coincidence</div>
                <div className="font-mono font-bold text-slate-800 text-base mt-1">
                  {behaviorResult.comparison.platformOverlapScore}%
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold">Behavioral Summary: </strong>
              {behaviorResult.comparison.analyticalRationale}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
