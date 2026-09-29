import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { InfrastructureRecord } from '../types';
import {
  Server, Globe, Shield, Search, Filter, ExternalLink,
  Layers, Lock, AlertTriangle, RefreshCw
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface InfrastructurePageProps {
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({
  onNavigate,
  onSelectActor
}) => {
  const [infraList, setInfraList] = useState<InfrastructureRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInfra = async () => {
    try {
      setLoading(true);
      const res = await api.getInfrastructure({
        type: filterType !== 'all' ? filterType : undefined,
        query: searchQuery || undefined
      });
      setInfraList(res.infrastructure);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfra();
  }, [filterType, searchQuery]);

  const infraTypes = [
    'all',
    'Domain',
    'Hosting IP',
    'TLS Certificate',
    'Server Banner',
    'Tor Onion Service',
    'Nameserver'
  ];

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-600" />
            <span>Infrastructure Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Correlate synthetic DNS domains, TLS certificate fingerprints, server banners, and hosting subnets.
          </p>
        </div>

        <button
          onClick={fetchInfra}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Refresh</span>
        </button>
      </div>

      <ExplanationBox
        title="What is infrastructure correlation?"
        shortSummary="Maps technical hosting fingerprints (nginx versions, TLS hash certificates, and ASN subnets) to identify shared operational nodes across threat personas."
        details="In underground operations, separate personas frequently deploy on identical bulletproof hostings, recycle TLS certificates, or share custom server banners. For instance, ShadowX and NightCipher both resolve to AS64501 with matching custom nginx banners."
        defaultExpanded={false}
      />

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search hostname, IP, certificate, or banner..."
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
            {infraTypes.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All Infrastructure Types' : t}</option>
            ))}
          </select>
        </div>

        <div className="font-mono text-slate-500">
          <strong className="text-slate-900">{infraList.length}</strong> indicators cataloged
        </div>
      </div>

      {/* Grid of Infrastructure Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : infraList.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
          No infrastructure indicators match your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infraList.map((infra) => (
            <div
              key={infra.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    {infra.type}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {infra.id}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm break-all mb-2">
                  {infra.value}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  {infra.ipAddress && (
                    <div className="flex justify-between font-mono text-[11px] py-0.5 border-b border-slate-100">
                      <span className="text-slate-400">Host IP:</span>
                      <span className="text-slate-800">{infra.ipAddress}</span>
                    </div>
                  )}
                  {infra.asn && (
                    <div className="flex justify-between font-mono text-[11px] py-0.5 border-b border-slate-100">
                      <span className="text-slate-400">ASN:</span>
                      <span className="text-slate-800">{infra.asn} ({infra.country})</span>
                    </div>
                  )}
                  {infra.certificateFingerprint && (
                    <div className="py-0.5">
                      <span className="text-slate-400 text-[10px] block">TLS Fingerprint:</span>
                      <span className="font-mono text-[10px] text-slate-700 break-all bg-slate-50 p-1 rounded-sm block mt-0.5">
                        {infra.certificateFingerprint}
                      </span>
                    </div>
                  )}
                  {infra.serverBanner && (
                    <div className="py-0.5">
                      <span className="text-slate-400 text-[10px] block">Server Banner:</span>
                      <span className="font-mono text-[10px] text-slate-700 bg-slate-50 p-1 rounded-sm block mt-0.5">
                        {infra.serverBanner}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Linked Actors Footer */}
              <div className="pt-3 border-t border-slate-100 text-xs">
                <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  Correlated Actors ({infra.associatedActors.length})
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {infra.associatedActors.map((actId) => (
                    <button
                      key={actId}
                      onClick={() => {
                        onSelectActor(actId);
                        onNavigate(`/actors/${actId}`);
                      }}
                      className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md font-mono text-[11px] font-semibold transition-colors"
                    >
                      {actId}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
