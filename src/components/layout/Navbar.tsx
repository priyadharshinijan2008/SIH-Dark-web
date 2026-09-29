import React, { useState } from 'react';
import { Shield, ChevronDown, Play, Sparkles, User as UserIcon, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { user, role, setRole } = useAuth();
  const { isActive: isDemoActive, startDemo } = useDemo();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const mainNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Threat Actors', path: '/actors' },
    { label: 'Relationship Graph', path: '/graph' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Infrastructure', path: '/infrastructure' },
    { label: 'AI Analysis', path: '/ai-analysis' },
  ];

  const secondaryNavItems = [
    { label: 'Data Sources', path: '/sources' },
    { label: 'Investigation Workspace', path: '/investigation' },
    { label: 'Reports', path: '/reports' },
    { label: 'Data Import', path: '/import' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Demo Walkthrough', path: '/demo' },
    { label: 'API Documentation', path: '/api-docs' },
    { label: 'Settings', path: '/settings' }
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  PersonaTrace
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-normal text-slate-400">
                  Threat Actor De-anonymization
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavItems.map((item) => {
              const active = currentRoute.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* More navigation dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {moreMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-900/5 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        onNavigate(item.path);
                        setMoreMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        currentRoute.startsWith(item.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary actions & User/Role switcher */}
          <div className="flex items-center gap-2.5">
            {/* Start Demo Investigation CTA */}
            <button
              onClick={() => {
                startDemo();
                onNavigate('/actors');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap ${
                isDemoActive
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20 hover:shadow-md'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isDemoActive ? 'Demo Active' : 'Start Demo Investigation'}</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                title="Current Analyst Role"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">{role}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-900/5 py-1 z-50 animate-in fade-in duration-100"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch Security Role
                  </div>
                  {(['Admin', 'Analyst', 'Viewer'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleChange(r)}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        role === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{r}</span>
                      {role === r && <span className="text-blue-600 text-[10px]">Active</span>}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 pt-1 mt-1 px-3 py-1 text-[11px] text-slate-400">
                    {user?.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
