import React from 'react';
import {
  Shield, Network, Cpu, FileSearch, ArrowRight, CheckCircle,
  Database, GitBranch, Layers, Sparkles, AlertCircle, Eye, Play
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { startDemo } = useDemo();

  const architectureSteps = [
    { num: '01', title: 'Data Sources', desc: 'Synthetic forums, marketplaces, Tor nodes, ledger sensors' },
    { num: '02', title: 'Data Collection', desc: 'Ingestion of public advisories and synthetic intelligence streams' },
    { num: '03', title: 'Data Normalization', desc: 'Standardization of cryptographic keys, addresses, and UTC timestamps' },
    { num: '04', title: 'Entity Resolution', desc: 'Cross-matching handles, PGP fingerprints, and wallet clusters' },
    { num: '05', title: 'AI Analysis', desc: 'Stylometric n-gram extraction, diurnal circadian alignment, and scoring' },
    { num: '06', title: 'Relationship Graph', desc: 'Graph clustering in Neo4j with multi-hop association traversal' },
    { num: '07', title: 'Investigator Dashboard', desc: 'Interactive SOC workbench, timeline filtering, and infrastructure maps' },
    { num: '08', title: 'Investigation Report', desc: 'Evidence-backed forensic export in PDF, JSON, and CSV formats' }
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 pb-4">
        {/* Academic Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium mb-6">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Cybersecurity Intelligence Research Platform · Synthetic Datasets Only</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
          Dark Web Threat Actor <span className="text-blue-600">De-anonymization</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 font-normal">
          AI-assisted threat intelligence for connecting anonymous digital personas, infrastructure, and behavioral indicators.
        </p>

        <p className="text-sm text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Analyze observable threat-intelligence indicators, discover relationships between online personas, visualize infrastructure connections, and generate evidence-based investigation reports.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              startDemo();
              onNavigate('/actors');
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Explore Demo</span>
          </button>

          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs transition-all"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate('/how-it-works')}
            className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
          >
            How It Works
          </button>
        </div>
      </section>

      {/* Visual Architecture Pipeline */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            System Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            End-to-End De-anonymization Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            How observable threat indicators flow from raw synthetic observations to evidence dossiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {architectureSteps.map((step, idx) => (
            <div
              key={step.num}
              className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl relative group hover:border-blue-300 hover:bg-white transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                  {step.num}
                </span>
                {idx < architectureSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden lg:block" />
                )}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 leading-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Investigative Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center mb-4">
            <Network className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Graph Entity Resolution
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-hop relational analysis linking handles, PGP key IDs, cryptocurrency transaction clusters, and infrastructure banners across underground forums.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">
            AI Stylometry & Behavior
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            N-gram lexical fingerprinting, syntactic sentence structure evaluation, and 24-hour UTC circadian activity histograms for persona correlation.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-4">
            <FileSearch className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Transparent Evidence Scoring
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deterministic multi-factor confidence breakdown explaining exactly why associations are flagged, avoiding ungrounded AI black-box scores.
          </p>
        </div>
      </section>
    </div>
  );
};
