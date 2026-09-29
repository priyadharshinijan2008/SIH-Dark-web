import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { SourceRecord } from '../types';
import { Database, Search, Filter, ShieldCheck, Globe, RefreshCw, ExternalLink } from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

export const DataSourcesPage: React.FC = () => {
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSources = async () => {
    try {
      setLoading(true);
      const res = await api.getSources();
      setSources(res.sources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const filteredSources = sources.filter(s => {
    if (filterType !== 'all' && s.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.urlSample.toLowerCase().includes(q);
    }
    return true;
  });

  const sourceTypes = [
    'all',
    'Synthetic Forum',
    'Synthetic Marketplace',
    'Public Threat Report',
    'Synthetic Intelligence Feed',
    'Synthetic Blockchain Cluster'
  ];

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            <span>Threat Intelligence Sources & Provenance</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review synthetic collection points, public advisory mirrors, and Admiralty reliability ratings.
          </p>
        </div>

        <button
          onClick={fetchSources}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Refresh</span>
        </button>
      </div>

      <ExplanationBox
        title="Source Reliability & Synthetic Data Notice"
        shortSummary="All listed feeds are completely synthetic representations or mirrors of public advisories (CISA, ENISA). No live darknet marketplace is actively scraped."
        details="Reliability codes follow the NATO / Admiralty intelligence scale: A (Completely reliable / Verified archive), B (Usually reliable), C (Fairly reliable), and F (Unconfirmed lead)."
      />

      {/* Search and Type Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search source by name, sample URL, or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-800 font-medium"
          >
            {sourceTypes.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Source Types' : t}</option>
            ))}
          </select>
        </div>

        <div className="font-mono text-slate-500">
          Showing <strong className="text-slate-900">{filteredSources.length}</strong> of {sources.length} sources
        </div>
      </div>

      {/* Sources Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <th className="py-3 px-4">Source ID</th>
              <th className="py-3 px-4">Source Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Collection Era</th>
              <th className="py-3 px-4">Reliability</th>
              <th className="py-3 px-4 text-center">Observations</th>
              <th className="py-3 px-4">Classification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">Loading sources catalog...</td>
              </tr>
            ) : filteredSources.map((src) => (
              <tr key={src.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono font-medium text-slate-500">{src.id}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{src.name}</div>
                  <div className="font-mono text-[11px] text-slate-400 truncate max-w-xs">{src.urlSample}</div>
                </td>
                <td className="py-3 px-4 text-slate-600">{src.type}</td>
                <td className="py-3 px-4 font-mono text-slate-500">
                  {src.firstIngested} → {src.lastIngested}
                </td>
                <td className="py-3 px-4">
                  <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    src.reliability.startsWith('A')
                      ? 'bg-blue-50 text-blue-700'
                      : src.reliability.startsWith('B')
                      ? 'bg-sky-50 text-sky-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {src.reliability}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-center font-bold text-slate-800">
                  {src.observationsCount}
                </td>
                <td className="py-3 px-4">
                  {src.isSynthetic ? (
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                      Synthetic Demo Source
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                      Public Threat Report
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
