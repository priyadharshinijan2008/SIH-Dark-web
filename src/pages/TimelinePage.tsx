import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { TimelineEvent, ThreatActor } from '../types';
import {
  Calendar, Filter, Search, ArrowRight, ShieldCheck, Clock,
  FileText, ExternalLink, X, ChevronDown, CheckCircle2
} from 'lucide-react';
import { ExplanationBox } from '../components/common/ExplanationBox';

interface TimelinePageProps {
  initialActorId?: string;
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  initialActorId,
  onNavigate,
  onSelectActor
}) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedActorId, setSelectedActorId] = useState<string>(initialActorId || 'all');
  const [fromDate, setFromDate] = useState<string>('2025-01-01');
  const [toDate, setToDate] = useState<string>('2026-09-30');
  const [eventType, setEventType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const res = await api.getTimeline({
        actorId: selectedActorId !== 'all' ? selectedActorId : undefined,
        fromDate: fromDate ? `${fromDate}T00:00:00Z` : undefined,
        toDate: toDate ? `${toDate}T23:59:59Z` : undefined,
        eventType: eventType !== 'all' ? eventType : undefined
      });
      setEvents(res.events);
      if (res.events.length > 0 && !selectedEvent) {
        setSelectedEvent(res.events[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.getActors().then(res => setActors(res.actors)).catch(console.error);
  }, []);

  useEffect(() => {
    fetchTimeline();
  }, [selectedActorId, fromDate, toDate, eventType]);

  const eventTypes = [
    'all',
    'Initial Observation',
    'Handle Registered',
    'PGP Key Discovered',
    'Wallet Transaction',
    'Infrastructure Associated',
    'Forum Posting',
    'Marketplace Listing'
  ];

  return (
    <div className="space-y-6 py-4" id="timeline-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span>Timeline Investigation</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Chronological audit of threat intelligence events from January 2025 through September 2026.
          </p>
        </div>
      </div>

      <ExplanationBox
        title="What is the timeline?"
        shortSummary="It organizes observations chronologically to help investigators understand activity patterns."
        details="Tracking first-seen timestamps, consecutive handle creation, and transaction timings allows analysts to identify concurrent active personas and establish temporal causality across dark-web forums."
      />

      {/* Date Range & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Actor Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Filter by Persona:</label>
            <select
              value={selectedActorId}
              onChange={e => setSelectedActorId(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-800 font-medium"
            >
              <option value="all">All Synthetic Personas</option>
              {actors.map(a => (
                <option key={a.id} value={a.id}>{a.alias} ({a.category})</option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">From Date:</label>
            <input
              type="date"
              value={fromDate}
              min="2025-01-01"
              max="2026-09-30"
              onChange={e => setFromDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-2.5 rounded-lg text-slate-800 font-mono"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">To Date:</label>
            <input
              type="date"
              value={toDate}
              min="2025-01-01"
              max="2026-09-30"
              onChange={e => setToDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-2.5 rounded-lg text-slate-800 font-mono"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Event Type:</label>
            <select
              value={eventType}
              onChange={e => setEventType(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-800 font-medium"
            >
              {eventTypes.map(t => (
                <option key={t} value={t}>{t === 'all' ? 'All Event Types' : t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-right">
          <span className="font-mono font-bold text-slate-900">{events.length}</span>
          <span className="text-slate-500 ml-1">events located</span>
        </div>
      </div>

      {/* Main Two-Column Layout: Chronological List on Left, Detail Modal on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Feed */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200 animate-pulse">
              Querying chronological timeline events...
            </div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
              No observations found for the selected date range. Try broadening the From / To date filter.
            </div>
          ) : (
            events.map((evt) => {
              const isSelected = selectedEvent?.id === evt.id;
              const dateFormatted = evt.timestamp.slice(0, 10);
              const timeFormatted = evt.timestamp.slice(11, 16);

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`bg-white border rounded-xl p-4 shadow-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {dateFormatted}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{timeFormatted} UTC</span>
                    </div>

                    <span className="font-mono text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {evt.eventType}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    {evt.entity}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.evidence}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    <span>Source: <strong className="text-slate-600 font-medium">{evt.source}</strong></span>
                    <span className="font-mono font-semibold text-blue-700">{evt.confidence}% confidence</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Event Detail Inspector on Right */}
        <div className="lg:col-span-1">
          {selectedEvent ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs sticky top-24 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  Timeline Event Dossier
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">
                  {selectedEvent.eventType}
                </h3>
                <div className="font-mono text-xs text-slate-500 mt-1">
                  {selectedEvent.timestamp.replace('T', ' ')}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Subject Entity</div>
                  <div className="font-bold text-slate-900 text-sm">{selectedEvent.entity}</div>
                  <div className="text-slate-500 font-mono">Actor ID: {selectedEvent.actorId}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Corroborating Evidence</div>
                  <p className="text-slate-700 leading-relaxed">{selectedEvent.evidence}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Intelligence Provenance</div>
                  <div className="text-slate-800 font-medium">{selectedEvent.source}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 font-mono text-[11px]">
                    <span className="text-slate-500">Confidence Score:</span>
                    <span className="font-bold text-blue-700">{selectedEvent.confidence}%</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectActor(selectedEvent.actorId);
                    onNavigate(`/actors/${selectedEvent.actorId}`);
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Related Actor Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
              Select an event from the timeline to inspect forensic evidence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
