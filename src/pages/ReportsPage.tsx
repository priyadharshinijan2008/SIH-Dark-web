import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { InvestigationReport, ThreatActor } from '../types';
import {
  FileText, Download, Printer, Shield, CheckCircle2,
  Calendar, Key, Wallet, Server, Network, ArrowLeft, RefreshCw
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface ReportsPageProps {
  initialActorId?: string;
  onNavigate: (route: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ initialActorId, onNavigate }) => {
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [selectedActorId, setSelectedActorId] = useState<string>(initialActorId || 'ACTOR-DEMO-001');
  const [report, setReport] = useState<InvestigationReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActors().then(res => setActors(res.actors)).catch(console.error);
  }, []);

  const loadReport = async (actorId: string) => {
    try {
      setLoading(true);
      const rep = await api.getReport(actorId);
      setReport(rep);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport(selectedActorId);
  }, [selectedActorId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Action Header (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Investigation Dossier & Report</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Forensic attribution summary with indicator records, evidence weights, and export formats.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Target Actor Selector */}
          <select
            value={selectedActorId}
            onChange={e => setSelectedActorId(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 font-semibold py-1.5 px-3 rounded-lg text-xs focus:outline-hidden"
          >
            {actors.map(a => (
              <option key={a.id} value={a.id}>{a.alias} ({a.category})</option>
            ))}
          </select>

          {/* Download CSV */}
          <a
            href={`/api/export/${selectedActorId}/csv`}
            download
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>

          {/* Download JSON */}
          <a
            href={`/api/export/${selectedActorId}/json`}
            download
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </a>

          {/* Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="no-print">
        <ExplanationBox
          title="Formal Forensic Dossier"
          shortSummary="Suitable for academic demonstration, peer review, and intelligence sharing."
          details="Click 'Download PDF / Print' to invoke your browser's print dialog and export a clean vector PDF formatted for research documentation."
        />
      </div>

      {/* Printable Report Document */}
      {loading || !report ? (
        <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 animate-pulse text-xs">
          Compiling forensic investigation report...
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8 text-xs text-slate-800">
          {/* Document Masthead */}
          <div className="border-b-2 border-slate-900 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                  {report.classification}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  Threat Actor De-anonymization Report
                </h2>
                <div className="text-slate-500 font-mono text-[11px] mt-1">
                  Investigation Reference: {report.id}
                </div>
              </div>

              <div className="text-right text-slate-500 font-mono text-[11px] space-y-0.5">
                <div>Date Generated: {report.generatedAt.slice(0, 10)}</div>
                <div>Author: {report.generatedBy}</div>
                <div>Environment: Academic SOC Research</div>
              </div>
            </div>
          </div>

          {/* Target Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium">Target Alias:</span>
              <div className="font-bold text-slate-900 text-base">{report.actor.alias}</div>
              <div className="font-mono text-slate-500 text-[11px]">{report.actor.id}</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Specialization:</span>
              <div className="font-semibold text-slate-900">{report.actor.category}</div>
              <div className="text-slate-500">Risk: {report.actor.riskRating}</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Temporal Era:</span>
              <div className="font-mono text-slate-900">{report.actor.firstSeen}</div>
              <div className="font-mono text-slate-500">to {report.actor.lastSeen}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-medium">Association Score:</span>
              <div className="font-mono font-black text-xl text-blue-800">
                {report.aiAnalysisSummary.overallConfidence}%
              </div>
              <div className="text-slate-500 text-[10px]">Deterministic multi-factor</div>
            </div>
          </div>

          {/* Abstract / Summary */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              1. Executive Intelligence Summary
            </h3>
            <p className="text-slate-700 leading-relaxed text-xs">
              {report.actor.summary} Primary observed persona operating across {report.actor.knownPlatforms.join(', ')}. Multiple correlated handles exhibit 91%+ stylometric concordance and share cryptographic PGP key fingerprints.
            </p>
          </div>

          {/* AI Analysis & Evidence Breakdown */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              2. AI-Assisted Multi-Factor Attribution
            </h3>
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center mb-3">
              <div>
                <span className="text-slate-400">Stylometric Score</span>
                <div className="font-mono font-bold text-base text-slate-900">{report.aiAnalysisSummary.stylometricScore}%</div>
              </div>
              <div>
                <span className="text-slate-400">Behavioral Score</span>
                <div className="font-mono font-bold text-base text-slate-900">{report.aiAnalysisSummary.behavioralScore}%</div>
              </div>
              <div>
                <span className="text-slate-400">Identifier Score</span>
                <div className="font-mono font-bold text-base text-slate-900">{report.aiAnalysisSummary.identifierScore}%</div>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed italic">
              Rationale: {report.aiAnalysisSummary.justification}
            </p>
          </div>

          {/* Observed Identifiers Tables */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              3. Cataloged Digital Identifiers
            </h3>

            {/* Handles */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 text-xs mb-1">A. Persona Handles</h4>
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Handle</th>
                    <th className="p-2">Platform</th>
                    <th className="p-2">Active Window</th>
                    <th className="p-2 text-right">Stylometric Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.handles.map(h => (
                    <tr key={h.id}>
                      <td className="p-2 font-bold font-mono text-slate-900">{h.handle}</td>
                      <td className="p-2 text-slate-600">{h.platform}</td>
                      <td className="p-2 font-mono text-slate-500">{h.firstSeen} → {h.lastSeen}</td>
                      <td className="p-2 font-mono text-right font-semibold text-blue-700">{h.stylometricScore || 85}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PGP Keys */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 text-xs mb-1">B. Cryptographic PGP Keys</h4>
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Key ID</th>
                    <th className="p-2">Algorithm</th>
                    <th className="p-2">Fingerprint</th>
                    <th className="p-2">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.pgpKeys.map(p => (
                    <tr key={p.id}>
                      <td className="p-2 font-bold font-mono text-violet-900">{p.keyId}</td>
                      <td className="p-2 font-mono text-slate-600">{p.algorithm} ({p.keyLength})</td>
                      <td className="p-2 font-mono text-[10px] text-slate-600 break-all">{p.fingerprint}</td>
                      <td className="p-2 font-mono text-slate-500">{p.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Wallets */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 text-xs mb-1">C. Blockchain Wallet Traces</h4>
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Currency</th>
                    <th className="p-2">Address</th>
                    <th className="p-2">Cluster Tag</th>
                    <th className="p-2 text-right">Volume (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.wallets.map(w => (
                    <tr key={w.id}>
                      <td className="p-2 font-bold font-mono text-emerald-900">{w.currency}</td>
                      <td className="p-2 font-mono text-[10px] text-slate-600 break-all">{w.address}</td>
                      <td className="p-2 font-mono text-slate-500">{w.clusterTag}</td>
                      <td className="p-2 font-mono text-right font-semibold text-slate-800">${w.estimatedVolumeUSD.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              4. Chronological Milestones
            </h3>
            <div className="space-y-1.5">
              {report.timeline.slice(0, 6).map(t => (
                <div key={t.id} className="flex items-start justify-between py-1 border-b border-slate-100 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{t.timestamp.slice(0, 10)}</span>
                    <span className="font-semibold text-slate-800">{t.eventType}:</span>
                    <span className="text-slate-600">{t.evidence}</span>
                  </div>
                  <span className="font-mono text-slate-400 shrink-0 ml-2">{t.confidence}% conf</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Notice Footer */}
          <div className="pt-6 border-t-2 border-slate-900 text-[10px] text-slate-400 space-y-1 leading-normal">
            <p><strong>LEGAL DISCLAIMER:</strong> This document was generated by the Academic Threat Intelligence Platform using synthetic research datasets. All indicators, names, and hashes represent fictional scenarios for cybersecurity instruction.</p>
            <p>Confidence metrics reflect statistical similarity and do not establish a person's real-world identity without independent lawful validation.</p>
          </div>
        </div>
      )}
    </div>
  );
};
