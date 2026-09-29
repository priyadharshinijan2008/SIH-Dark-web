import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  Settings, RotateCcw, Shield, CheckCircle2, AlertTriangle,
  History, Server, Terminal, User
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

export const SettingsPage: React.FC = () => {
  const { user, role, setRole } = useAuth();
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleReset = async () => {
    if (!window.confirm('Reset threat intelligence database back to default synthetic seed?')) return;
    try {
      setResetting(true);
      await api.resetSeed();
      setResetMessage('Database successfully re-seeded to 24 synthetic threat actors and 180+ relationships.');
      fetchLogs();
      setTimeout(() => setResetMessage(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Failed to reset seed');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>Platform Settings & System Status</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage security roles, reset synthetic datasets, and audit investigator access logs.
        </p>
      </div>

      <ExplanationBox
        title="Sandboxed Academic Environment"
        shortSummary="All state mutations are confined to this sandboxed dev runtime. You can reset to baseline seed anytime."
        details="Seeding reconstructs all 24 threat actors, 68 handles, 18 PGP keys, 31 wallets, and 180+ relationships."
      />

      {/* Role Management */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span>Investigator Role & Permissions</span>
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {(['Admin', 'Analyst', 'Viewer'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all border ${
                role === r
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {r} {role === r && '(Active)'}
            </button>
          ))}
        </div>
        <p className="text-slate-500 text-[11px]">
          Current Role: <strong className="text-slate-800">{role}</strong> · Full access to graph traversal, AI analysis, export dossiers, and data staging.
        </p>
      </div>

      {/* Dataset Reset */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>Reset Synthetic Threat Intelligence Database</span>
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Restore the application back to the standard evaluation seed containing ShadowX, NightCipher, GhostByte, and all 180+ interconnected graph edges.
        </p>

        <button
          onClick={handleReset}
          disabled={resetting}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
          <span>{resetting ? 'Re-seeding Store...' : 'Reset Threat Database to Default Seed'}</span>
        </button>

        {resetMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{resetMessage}</span>
          </div>
        )}
      </div>

      {/* Audit Logs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <History className="w-4 h-4 text-slate-600" />
          <span>SOC Investigator Audit Logs ({auditLogs.length})</span>
        </h3>

        <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 flex items-start justify-between gap-3 text-[11px] hover:bg-slate-50 transition-colors">
              <div>
                <div className="font-bold text-slate-900">{log.action} · <span className="font-mono text-slate-500">{log.targetEntity}</span></div>
                <div className="text-slate-600 mt-0.5">{log.details}</div>
              </div>
              <div className="font-mono text-slate-400 shrink-0 text-right">
                {log.timestamp.slice(11, 19)} UTC
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
