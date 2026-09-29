import React from 'react';
import { ShieldCheck, Database, FileText, Code2, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>PersonaTrace Platform</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-3">
              Academic cybersecurity threat-intelligence platform analyzing observable digital indicators, persona correlations, and infrastructure linkages.
            </p>
            <div className="text-[11px] text-slate-400">
              Environment: SOC Research Sandbox v2.4 (Synthetic Mode)
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-800 mb-3">Investigation Views</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/dashboard')} className="hover:text-blue-600 transition-colors">Intelligence Overview</button></li>
              <li><button onClick={() => onNavigate('/actors')} className="hover:text-blue-600 transition-colors">Threat Actor Catalog</button></li>
              <li><button onClick={() => onNavigate('/graph')} className="hover:text-blue-600 transition-colors">Interactive Relationship Graph</button></li>
              <li><button onClick={() => onNavigate('/timeline')} className="hover:text-blue-600 transition-colors">Timeline Analysis</button></li>
              <li><button onClick={() => onNavigate('/infrastructure')} className="hover:text-blue-600 transition-colors">Infrastructure Network</button></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-800 mb-3">Analytics & Methodology</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/ai-analysis')} className="hover:text-blue-600 transition-colors">AI Stylometric & Behavioral Engine</button></li>
              <li><button onClick={() => onNavigate('/how-it-works')} className="hover:text-blue-600 transition-colors">6-Stage Resolution Methodology</button></li>
              <li><button onClick={() => onNavigate('/sources')} className="hover:text-blue-600 transition-colors">Data Sources & Provenance</button></li>
              <li><button onClick={() => onNavigate('/reports')} className="hover:text-blue-600 transition-colors">Investigation Reports & Export</button></li>
              <li><button onClick={() => onNavigate('/import')} className="hover:text-blue-600 transition-colors">Data Import & Schema Validation</button></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-800 mb-3">Academic Safety Notice</div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-700 font-semibold text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Zero Illicit Crawling</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                This project relies entirely on synthetic datasets, mock forum observations, and public advisories. It does not perform active scraping of illegal markets.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={() => onNavigate('/api-docs')} className="text-blue-600 hover:text-blue-800 font-medium">API Documentation</button>
              <span className="text-slate-300">·</span>
              <button onClick={() => onNavigate('/demo')} className="text-blue-600 hover:text-blue-800 font-medium">Demo Walkthrough</button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 Academic Threat Intelligence Research Project. Demonstration System.</p>
          <div className="flex items-center gap-4">
            <span>Light Theme SOC Aesthetic</span>
            <span>·</span>
            <span>REST API Verified</span>
            <span>·</span>
            <span>Deterministic Seed Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
