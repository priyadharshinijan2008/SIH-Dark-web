import React from 'react';
import {
  Database, RefreshCw, GitMerge, Network, Cpu, FileCheck,
  HelpCircle, ArrowRight, ShieldCheck, Check
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface HowItWorksPageProps {
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: 1,
      title: 'DATA COLLECTION',
      icon: Database,
      short: 'Collect synthetic and legally accessible threat-intelligence observations across dark-web sources.',
      whatHappens: 'Ingests structured indicator feeds, marketplace listings, forum thread dumps, and public security advisories (CISA, ENISA). All data in this demonstration is strictly synthetic.',
      inputs: ['Raw Forum Posts', 'Marketplace Listings', 'Blockchain Telemetry', 'Public Advisory Mirrors'],
      outputs: ['Unnormalized Observation Records', 'Raw PGP Signatures', 'Raw Wallet Strings']
    },
    {
      num: 2,
      title: 'DATA NORMALIZATION',
      icon: RefreshCw,
      short: 'Clean and standardize handles, identifiers, timestamps, and source information.',
      whatHappens: 'Converts diverse date representations into standard ISO 8601 UTC timestamps, normalizes Bitcoin/Monero addresses, parses PGP key headers into canonical 40-character fingerprints, and strips forum formatting noise.',
      inputs: ['Raw Observation Records'],
      outputs: ['Canonical Handle Entities', 'Validated PGP Fingerprints', 'Classified Wallet Clusters', 'Standardized Timestamps']
    },
    {
      num: 3,
      title: 'ENTITY RESOLUTION',
      icon: GitMerge,
      short: 'Identify possible relationships between handles, PGP keys, wallet identifiers, and infrastructure.',
      whatHappens: 'Runs deterministic correlation heuristics across digital identifiers. For example, if Handle A and Handle B share the same PGP key fingerprint or transact with identical multi-sig wallet clusters, they are flagged for relational binding.',
      inputs: ['Normalized Entities', 'Cross-Source Index'],
      outputs: ['Candidate Persona Linkages', 'Shared Key Bindings', 'Cluster Overlap Vectors']
    },
    {
      num: 4,
      title: 'RELATIONSHIP GRAPH',
      icon: Network,
      short: 'Connect related entities using graph relationships in Neo4j.',
      whatHappens: 'Stores entities as labeled nodes (Actor, Handle, PGPKey, Wallet, Infrastructure, Source) and relationships as directional edges (USES, SEEN_ON, ASSOCIATED_WITH, LINKED_TO). Enables multi-hop neighborhood traversal.',
      inputs: ['Resolved Entity Pairs', 'Observation Citations'],
      outputs: ['Interactive Knowledge Graph', 'Degree Centrality Metrics', 'Multi-hop Link Paths']
    },
    {
      num: 5,
      title: 'AI-ASSISTED ANALYSIS',
      icon: Cpu,
      short: 'Analyze observable writing style, sentence structure, and behavioral posting patterns.',
      whatHappens: 'Computes character trigram Jaccard similarity, word frequency cosine vectors, and 24-hour UTC circadian posting histograms. Combines all signals into a transparent, multi-factor Analytical Association Confidence score.',
      inputs: ['Raw Forum Text Snippets', 'Posting Timestamp Logs'],
      outputs: ['Stylometric Similarity (0-100%)', 'Diurnal Circadian Overlap (0-100%)', 'Multi-Factor Evidence Score']
    },
    {
      num: 6,
      title: 'INVESTIGATION REPORT',
      icon: FileCheck,
      short: 'Present evidence, relationships, confidence scores, and source provenance.',
      whatHappens: 'Synthesizes all gathered indicators into a defensible investigation dossier. Generates forensic summaries with citations, timeline sequence graphs, and downloadable PDF, JSON, and CSV exports.',
      inputs: ['Complete Graph Subtree', 'AI Scoring Breakdown', 'Source Citations'],
      outputs: ['Downloadable PDF Report', 'Forensic JSON Export', 'Indicator CSV Spreadsheet']
    }
  ];

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Analytical Methodology</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          How The De-anonymization System Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Our six-step pipeline correlates observable digital indicators without requiring access to illegal dark-web infrastructure, using transparent statistical models.
        </p>
      </div>

      <ExplanationBox
        title="Methodology Transparency Notice"
        shortSummary="All confidence metrics represent analytical similarity between observable signals. They do not constitute legal proof of real-world identity."
        details="Entity resolution matches digital indicators (PGP keys, addresses, hostnames). Stylometric and behavioral scoring provide supplementary heuristic evidence. Final investigative attribution always requires corroborating external legal process and lawful evidence collection."
        defaultExpanded={true}
      />

      {/* 6 Step Interactive Cards */}
      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      Step {step.num}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-medium text-slate-600">What happens here?</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium my-3 leading-relaxed">
                {step.short}
              </p>

              <div className="p-3 bg-slate-50/80 rounded-xl text-xs text-slate-600 leading-relaxed mb-4">
                <strong className="text-slate-800 font-semibold">Process Details: </strong>
                {step.whatHappens}
              </div>

              {/* Input / Output Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-blue-50/40 border border-blue-100/70 rounded-xl">
                  <div className="font-semibold text-blue-900 text-[11px] uppercase tracking-wider mb-1.5">
                    Inputs Ingested
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {step.inputs.map((inp, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-emerald-50/40 border border-emerald-100/70 rounded-xl">
                  <div className="font-semibold text-emerald-900 text-[11px] uppercase tracking-wider mb-1.5">
                    Outputs Produced
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {step.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-blue-600 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Ready to test the pipeline?</h3>
          <p className="text-xs text-blue-100 mt-0.5">Explore the live overview of 24 synthetic threat actors and 180+ relationships.</p>
        </div>
        <button
          onClick={() => onNavigate('/dashboard')}
          className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
