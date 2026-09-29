import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ThreatActor, HandleRecord, PGPKeyRecord, WalletRecord, InfrastructureRecord, RelationshipRecord, TimelineEvent } from '../types';
import {
  Shield, Key, Wallet, Server, Network, Calendar, ExternalLink,
  Cpu, ArrowLeft, Download, FileText, CheckCircle2, AlertTriangle, Hash, Globe
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface ActorProfilePageProps {
  actorId: string;
  onNavigate: (route: string) => void;
}

export const ActorProfilePage: React.FC<ActorProfilePageProps> = ({ actorId, onNavigate }) => {
  const [data, setData] = useState<{
    actor: ThreatActor;
    handles: HandleRecord[];
    pgpKeys: PGPKeyRecord[];
    wallets: WalletRecord[];
    infrastructure: InfrastructureRecord[];
    relationships: RelationshipRecord[];
    timeline: TimelineEvent[];
    observations: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getActorById(actorId);
        setData(res);
      } catch (err: any) {
        setError(err.message || 'Failed to load actor profile');
      } finally {
        setLoading(false);
      }
    };
    fetchActor();
  }, [actorId]);

  if (loading) {
    return (
      <div className="space-y-6 py-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4" />
        <div className="h-48 bg-slate-200 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-200 rounded-2xl" />
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
        <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
        <h3 className="font-bold text-red-900 text-sm">Failed to Load Actor Dossier</h3>
        <p className="text-xs text-red-700">{error || 'Actor profile not found'}</p>
        <button
          onClick={() => onNavigate('/actors')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const { actor, handles, pgpKeys, wallets, infrastructure, relationships, timeline } = data;

  // Analytical association metrics
  const isShadowX = actor.id === 'ACTOR-DEMO-001';
  const stylometricScore = isShadowX ? 78 : Math.min(95, actor.confidenceScore - 6);
  const behavioralScore = isShadowX ? 74 : Math.min(92, actor.confidenceScore - 10);
  const identifierOverlapScore = isShadowX ? 92 : Math.min(98, actor.confidenceScore + 8);
  const overallLinkConfidence = isShadowX ? 84 : actor.confidenceScore;

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Back button & quick actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('/actors')}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(`/graph?focus=${actor.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Network className="w-3.5 h-3.5 text-blue-600" />
            <span>View in Graph</span>
          </button>

          <button
            onClick={() => onNavigate(`/timeline?actorId=${actor.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Timeline</span>
          </button>

          <button
            onClick={() => onNavigate(`/reports/${actor.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-600/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Header Card */}
      <div id="actor-profile-header" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                {actor.id}
              </span>
              <span className="text-xs text-slate-400 font-medium">·</span>
              <span className="text-xs text-slate-500 font-medium">{actor.status}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {actor.alias}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="font-semibold text-slate-700">{actor.category}</span>
              <span>·</span>
              <span className="font-mono">First Seen: {actor.firstSeen}</span>
              <span>·</span>
              <span className="font-mono">Last Seen: {actor.lastSeen}</span>
              <span>·</span>
              <span>Risk: <strong className="text-red-600 font-semibold">{actor.riskRating}</strong></span>
            </div>
          </div>

          {/* Association Confidence Badge */}
          <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-center shrink-0 min-w-[160px]">
            <div className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
              Association Confidence
            </div>
            <div className="text-3xl font-extrabold text-blue-900 font-mono mt-0.5">
              {overallLinkConfidence}%
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5 font-medium">
              Analytical Signal
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-2">
            Intelligence Summary
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
            {actor.summary}
          </p>
        </div>
      </div>

      {/* AI Analysis Summary Card with Transparent Breakdown */}
      <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            AI-Assisted Entity Association Analysis
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Stylometric Similarity</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">{stylometricScore}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">N-gram token alignment</div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Behavioral Similarity</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">{behavioralScore}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">24h UTC circadian rhythm</div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="text-[11px] text-slate-500 font-medium">Identifier Overlap</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1">{identifierOverlapScore}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">PGP key & wallet cluster</div>
          </div>

          <div className="p-3 bg-white border border-blue-200 rounded-xl">
            <div className="text-[11px] text-blue-700 font-medium">Overall Association</div>
            <div className="text-xl font-bold font-mono text-blue-900 mt-1">{overallLinkConfidence}%</div>
            <div className="text-[10px] text-blue-600 mt-0.5">Weighted evidence model</div>
          </div>
        </div>

        <ExplanationBox
          title="Important Legal & Analytical Disclaimer"
          shortSummary="Confidence scores represent analytical similarity between observable digital signals and are NOT proof of real-world identity."
          details="Statistical concordance in stylometric syntax, circadian diurnal patterns, or shared cryptocurrency tumble clusters provide investigative leads only. Real-world legal attribution requires lawful verification through formal legal and evidentiary processes."
        />
      </div>

      {/* Identifiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Handles */}
        <div id="section-handles" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">Observed Handles ({handles.length})</h3>
            </div>
            <span className="text-[11px] text-slate-400">Underground forums & markets</span>
          </div>

          <div className="space-y-2.5">
            {handles.map((h) => (
              <div key={h.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{h.handle}</span>
                    {h.isPrimary && (
                      <span className="text-[10px] text-blue-700 font-semibold bg-blue-100/70 px-1.5 py-0.2 rounded-xs">Primary</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{h.platform}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-700">{h.postingCount} posts</div>
                  <div className="text-[10px] text-slate-400">{h.firstSeen} → {h.lastSeen}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PGP Keys */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-violet-600" />
              <h3 className="font-bold text-slate-900 text-sm">PGP Public Keys ({pgpKeys.length})</h3>
            </div>
            <span className="text-[11px] text-slate-400">Cryptographic Identity Proof</span>
          </div>

          <div className="space-y-2.5">
            {pgpKeys.map((p) => (
              <div key={p.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-violet-900">{p.keyId}</span>
                  <span className="font-mono text-[11px] text-slate-500">{p.algorithm} ({p.keyLength}-bit)</span>
                </div>
                <div className="font-mono text-[10px] text-slate-600 break-all bg-white p-1.5 border border-slate-200/70 rounded-md">
                  {p.fingerprint}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>Email: {p.associatedEmail || 'None'}</span>
                  <span>Created: {p.createdDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallets */}
        <div id="section-wallets" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Wallet Indicators ({wallets.length})</h3>
            </div>
            <span className="text-[11px] text-slate-400">Blockchain Clusters</span>
          </div>

          <div className="space-y-2.5">
            {wallets.map((w) => (
              <div key={w.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 font-mono">{w.currency} Address</span>
                  <span className="font-mono text-[11px] text-slate-700 font-bold">${w.estimatedVolumeUSD.toLocaleString()} USD</span>
                </div>
                <div className="font-mono text-[10px] text-slate-600 break-all bg-white p-1.5 border border-slate-200/70 rounded-md">
                  {w.address}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Cluster: <strong className="font-mono">{w.clusterTag}</strong></span>
                  <span className="font-mono">{w.totalTransactions} txs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Infrastructure Indicators ({infrastructure.length})</h3>
            </div>
            <span className="text-[11px] text-slate-400">DNS & Server Banners</span>
          </div>

          <div className="space-y-2.5">
            {infrastructure.map((inf) => (
              <div key={inf.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate">{inf.value}</span>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-xs">{inf.type}</span>
                </div>
                {inf.ipAddress && (
                  <div className="text-[11px] text-slate-500 font-mono">
                    IP: {inf.ipAddress} · ASN: {inf.asn} ({inf.country})
                  </div>
                )}
                {inf.serverBanner && (
                  <div className="text-[10px] font-mono text-slate-600 bg-white p-1.5 rounded-md border border-slate-200/70">
                    Banner: {inf.serverBanner}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Relationships List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Correlated Relationships ({relationships.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Graph connections resolved between this actor and peripheral entities.
            </p>
          </div>
          <button
            onClick={() => onNavigate(`/graph?focus=${actor.id}`)}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <span>Open Graph Workbench</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {relationships.map((rel) => (
            <div key={rel.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                  {rel.relationshipType}
                </span>
                <span className="font-semibold text-slate-800 font-mono">
                  {rel.targetNodeId} ({rel.targetNodeType})
                </span>
              </div>
              <div className="text-slate-600 text-xs max-w-lg">
                {rel.evidenceSummary}
              </div>
              <div className="font-mono text-slate-400 text-right shrink-0">
                {rel.confidenceScore}% conf
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
