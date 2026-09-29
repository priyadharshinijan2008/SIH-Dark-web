import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DashboardStats } from '../types';
import {
  Users, Hash, Key, Wallet, Server, Network, Database, Eye,
  ArrowRight, ShieldAlert, Sparkles, TrendingUp, RefreshCw
} from 'lucide-react';
import { ActivityTimelineChart } from '../components/charts/ActivityTimelineChart';
import { CategoryDonutChart } from '../components/charts/CategoryDonutChart';
import { RelationshipBarChart } from '../components/charts/RelationshipBarChart';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectActor }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !stats) {
    return (
      <div className="space-y-6 py-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-72 bg-slate-200 rounded-xl" />
          <div className="h-72 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
        <ShieldAlert className="w-8 h-8 text-red-600 mx-auto" />
        <h3 className="font-bold text-red-900 text-sm">Failed to Load Dashboard</h3>
        <p className="text-xs text-red-700">{error || 'Unable to connect to intelligence API'}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Threat Actors', value: stats.kpis.totalThreatActors, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/actors' },
    { label: 'Total Handles', value: stats.kpis.totalHandles, icon: Hash, color: 'text-sky-600', bg: 'bg-sky-50', link: '/actors' },
    { label: 'PGP Keys', value: stats.kpis.totalPgpKeys, icon: Key, color: 'text-violet-600', bg: 'bg-violet-50', link: '/graph' },
    { label: 'Wallet Indicators', value: stats.kpis.totalWallets, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/actors' },
    { label: 'Infrastructure Indicators', value: stats.kpis.totalInfrastructure, icon: Server, color: 'text-amber-600', bg: 'bg-amber-50', link: '/infrastructure' },
    { label: 'Relationships', value: stats.kpis.totalRelationships, icon: Network, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/graph' },
    { label: 'Sources', value: stats.kpis.totalSources, icon: Database, color: 'text-slate-600', bg: 'bg-slate-50', link: '/sources' },
    { label: 'Recent Observations', value: stats.kpis.recentObservations, icon: Eye, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/timeline' },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Threat Intelligence Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor relationships, activity patterns and evidence across the available threat-intelligence dataset.
          </p>
        </div>

        <button
          onClick={loadData}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Refresh Data</span>
        </button>
      </div>

      <ExplanationBox
        title="What is this?"
        shortSummary="Provides a high-level operational overview of all correlated personas, cryptographic indicators, and network signals."
        details="Every metric on this dashboard is dynamically calculated from the backend store. Threat actors are clustered into operational rings (Cybercrime, Access Brokerage, Extortion) with cross-correlated handles, PGP fingerprints, and wallet traces."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              onClick={() => onNavigate(kpi.link)}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-500 truncate">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900 font-mono">
                  {kpi.value}
                </span>
                <span className="text-[11px] font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Activity Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Threat Activity Timeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Number of observable intelligence events recorded over time.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/timeline')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Full Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ActivityTimelineChart data={stats.activityTimeline} />
        </div>

        {/* Actor Category Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Actor Category Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of active synthetic personas by cybercrime specialization.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/actors')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>View Actors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <CategoryDonutChart data={stats.categoryDistribution} />
        </div>
      </div>

      {/* Secondary Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Relationship Type Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Relationship Types
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Directional graph edges resolved in Neo4j.
            </p>
          </div>
          <RelationshipBarChart data={stats.relationshipDistribution} />
        </div>

        {/* Top Connected Threat Actors */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Top Connected Actors
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Highest entity degree centrality.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/graph')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              Graph View
            </button>
          </div>
          <div className="space-y-2">
            {stats.topConnectedActors.map((actor) => (
              <div
                key={actor.id}
                onClick={() => {
                  onSelectActor(actor.id);
                  onNavigate(`/actors/${actor.id}`);
                }}
                className="p-2.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200/70 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-800">{actor.alias}</div>
                  <div className="text-[11px] text-slate-400">{actor.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold text-blue-700">{actor.connections} links</div>
                  <div className="text-[10px] text-slate-500">{actor.confidenceScore}% conf</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Reliability Overview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Source Reliability
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Admiralty grading scale across 38 sources.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/sources')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              All Sources
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {stats.reliabilityOverview.map((item) => (
              <div key={item.rating} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                <span className="font-medium text-slate-700">{item.rating}</span>
                <span className="font-mono text-slate-800 font-semibold">{item.count} sources</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Observations Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Recent Threat Intelligence Observations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest synthetic signals captured across underground nodes.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/timeline')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <span>View All Observations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">Actor Ref</th>
                <th className="py-2.5 px-3">Entity Type</th>
                <th className="py-2.5 px-3">Event Summary</th>
                <th className="py-2.5 px-3">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentObservations.map((obs) => (
                <tr key={obs.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                    {obs.timestamp.replace('T', ' ').slice(0, 16)}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => onNavigate(`/actors/${obs.actorId}`)}>
                    {obs.actorId}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[11px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                      {obs.entityType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 max-w-md truncate">
                    {obs.eventDescription}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">
                    {obs.confidenceScore}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
