import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { GraphData, ThreatActor } from '../types';
import { NetworkGraphView } from '../components/graph/NetworkGraphView';
import { ExplanationBox } from '../components/common/ExplanationBox';
import { Network, RefreshCw, Filter, Layers, Share2 } from 'lucide-react';

interface RelationshipGraphPageProps {
  initialFocusActorId?: string;
  onNavigate: (route: string) => void;
  onSelectActor: (actorId: string) => void;
}

export const RelationshipGraphPage: React.FC<RelationshipGraphPageProps> = ({
  initialFocusActorId,
  onNavigate,
  onSelectActor
}) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [actors, setActors] = useState<ThreatActor[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string>(initialFocusActorId || 'ACTOR-DEMO-001');
  const [loading, setLoading] = useState(true);

  const fetchGraph = async (focus: string) => {
    try {
      setLoading(true);
      const data = await api.getGraph(focus);
      setGraphData(data);
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
    fetchGraph(selectedFocus);
  }, [selectedFocus]);

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Network className="w-6 h-6 text-blue-600" />
            <span>Interactive Relationship Graph</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing multi-hop entity connections, shared cryptographic keys, and infrastructure hubs.
          </p>
        </div>

        {/* Focus Selector */}
        <div className="flex items-center gap-2.5">
          <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">Focus Persona:</label>
          <select
            value={selectedFocus}
            onChange={e => setSelectedFocus(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 font-semibold py-1.5 px-3 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
          >
            <option value="all">Global Top Ring (Multi-Actor)</option>
            {actors.map(a => (
              <option key={a.id} value={a.id}>{a.alias} ({a.category})</option>
            ))}
          </select>

          <button
            onClick={() => fetchGraph(selectedFocus)}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            title="Reload Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ExplanationBox
        title="What does this graph show?"
        shortSummary="It visualizes connections between actors and observable digital indicators."
        details="Entities (Threat Actors, Handles, PGP Keys, Wallets, and Infrastructure) are represented as colored nodes. Edges represent verified relationships (USES, ASSOCIATED_WITH, LINKED_TO, CONNECTED_TO). Click any node to open the side inspector or drag nodes to rearrange."
        defaultExpanded={false}
      />

      {/* Main Interactive Graph Workbench */}
      <div id="graph-viewport">
        {loading || !graphData ? (
          <div className="h-[680px] bg-slate-100 rounded-2xl flex items-center justify-center animate-pulse text-slate-400 text-xs">
            Synthesizing Neo4j Graph Topology...
          </div>
        ) : (
          <NetworkGraphView
            graphData={graphData}
            onSelectActor={(id) => {
              onSelectActor(id);
              onNavigate(`/actors/${id}`);
            }}
            initialSelectedNodeId={selectedFocus !== 'all' ? selectedFocus : undefined}
          />
        )}
      </div>
    </div>
  );
};
