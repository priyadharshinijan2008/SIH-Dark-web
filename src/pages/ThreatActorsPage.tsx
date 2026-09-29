import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ThreatActor } from '../types';
import {
  Search, Filter, ArrowUpDown, Shield, AlertTriangle, Key,
  Wallet, ExternalLink, Calendar, Hash, RefreshCw, LayoutGrid, List
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface ThreatActorsPageProps {
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const ThreatActorsPage: React.FC<ThreatActorsPageProps> = ({ onNavigate, onSelectActor }) => {
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedConfidence, setSelectedConfidence] = useState('All');
  const [sortBy, setSortBy] = useState('lastSeen');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = [
    'All',
    'Cybercrime',
    'Ransomware Broker',
    'Data Extortion',
    'Financial Fraud',
    'Malware Distribution',
    'Access Broker',
    'Stealth Operation'
  ];

  const confidenceLevels = ['All', 'High', 'Medium', 'Low', 'Investigative Lead'];

  const fetchActors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getActors({
        query: searchQuery,
        category: selectedCategory,
        confidenceLevel: selectedConfidence,
        sortBy,
        sortOrder
      });
      setActors(res.actors);
    } catch (err: any) {
      setError(err.message || 'Failed to load threat actors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors();
  }, [searchQuery, selectedCategory, selectedConfidence, sortBy, sortOrder]);

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Synthetic Threat Actor Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Search, filter, and inspect correlated personas, cryptographic fingerprints, and activity eras.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid / Table Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={fetchActors}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <ExplanationBox
        title="Persona De-anonymization Catalog"
        shortSummary="Every profile here is an academic synthetic demonstration model based on observable threat-intelligence indicators."
        details="Click on any persona (e.g. ShadowX) to examine the dossier, view associated PGP keys, inspect cryptocurrency wallet traces, and trigger AI stylometric cross-correlation."
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by alias, primary handle, category, or actor ID (e.g. ShadowX)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-xs focus:outline-hidden"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            {/* Confidence Dropdown */}
            <select
              value={selectedConfidence}
              onChange={e => setSelectedConfidence(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-xs focus:outline-hidden"
            >
              {confidenceLevels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Confidence' : `${lvl} Confidence`}</option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={e => {
                const [sb, so] = e.target.value.split('-');
                setSortBy(sb);
                setSortOrder(so);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-xs focus:outline-hidden"
            >
              <option value="lastSeen-desc">Last Observed (Recent First)</option>
              <option value="lastSeen-asc">Last Observed (Oldest First)</option>
              <option value="firstSeen-asc">First Observed (Earliest)</option>
              <option value="confidenceScore-desc">Confidence (Highest First)</option>
              <option value="alias-asc">Alias (A - Z)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing <strong className="text-slate-800 font-mono">{actors.length}</strong> synthetic threat actors</span>
          <span className="text-[11px] text-blue-600 font-medium">Click on any card to begin forensic investigation</span>
        </div>
      </div>

      {/* Actor Grid / Table */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : actors.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No Threat Actors Match Your Filters</h3>
          <p className="text-xs text-slate-500">Try loosening your search query or resetting filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedConfidence('All');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {actors.map((actor) => (
            <div
              key={actor.id}
              onClick={() => {
                onSelectActor(actor.id);
                onNavigate(`/actors/${actor.id}`);
              }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {actor.alias}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {actor.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {actor.category}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md ${
                      actor.confidenceScore >= 80
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : actor.confidenceScore >= 60
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {actor.confidenceScore}% Conf
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {actor.summary}
                </p>

                {/* Handles unboxed list */}
                <div className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Observed Handles: </span>
                  <span>{actor.alternateHandles.concat(actor.primaryHandle).slice(0, 3).join(' · ')}</span>
                  {actor.alternateHandles.length > 2 && <span className="text-slate-400"> +{actor.alternateHandles.length - 2} more</span>}
                </div>
              </div>

              <div>
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 rounded-xl text-center mb-3">
                  <div>
                    <div className="font-mono font-bold text-slate-800 text-xs">{actor.linkedIdentifiersCount}</div>
                    <div className="text-[10px] text-slate-400">Identifiers</div>
                  </div>
                  <div>
                    <div className="font-mono font-bold text-slate-800 text-xs">{actor.relationshipsCount}</div>
                    <div className="text-[10px] text-slate-400">Relations</div>
                  </div>
                  <div>
                    <div className="font-mono font-bold text-slate-800 text-xs">{actor.observationsCount}</div>
                    <div className="text-[10px] text-slate-400">Observations</div>
                  </div>
                </div>

                {/* Footer Dates & Action */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{actor.firstSeen.slice(0, 7)} → {actor.lastSeen.slice(0, 7)}</span>
                  </div>

                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Investigate</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-4">Actor ID</th>
                <th className="py-3 px-4">Alias / Persona</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">First Seen</th>
                <th className="py-3 px-4">Last Seen</th>
                <th className="py-3 px-4 text-center">Identifiers</th>
                <th className="py-3 px-4 text-center">Relationships</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {actors.map((actor) => (
                <tr
                  key={actor.id}
                  onClick={() => {
                    onSelectActor(actor.id);
                    onNavigate(`/actors/${actor.id}`);
                  }}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-mono font-medium text-slate-500">{actor.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{actor.alias}</td>
                  <td className="py-3 px-4 text-slate-600">{actor.category}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{actor.firstSeen}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{actor.lastSeen}</td>
                  <td className="py-3 px-4 font-mono text-center font-semibold text-slate-700">{actor.linkedIdentifiersCount}</td>
                  <td className="py-3 px-4 font-mono text-center font-semibold text-slate-700">{actor.relationshipsCount}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-blue-700">{actor.confidenceScore}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-blue-600 font-semibold hover:underline">Dossier →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
