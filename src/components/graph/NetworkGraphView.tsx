import React, { useState, useEffect, useRef } from 'react';
import { GraphData, GraphNode, GraphEdge, EntityType, RelationshipType } from '../../types';
import {
  ZoomIn, ZoomOut, RotateCcw, Search, Filter, Shield, Key,
  Wallet, Server, Globe, ExternalLink, X, Info, Sparkles
} from 'lucide-react';

interface NetworkGraphViewProps {
  graphData: GraphData;
  onSelectActor?: (actorId: string) => void;
  initialSelectedNodeId?: string;
}

export const NetworkGraphView: React.FC<NetworkGraphViewProps> = ({
  graphData,
  onSelectActor,
  initialSelectedNodeId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  // Viewport transforms
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Selected & hovered nodes
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [relFilter, setRelFilter] = useState<string>('All');

  // Dragging individual node
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  // Initialize node layout with concentric cluster positioning
  useEffect(() => {
    if (!graphData || !graphData.nodes.length) return;

    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    const actors = graphData.nodes.filter(n => n.type === 'Actor');
    const others = graphData.nodes.filter(n => n.type !== 'Actor');

    const positionedNodes = graphData.nodes.map((node) => {
      let x = centerX;
      let y = centerY;

      if (node.type === 'Actor') {
        const idx = actors.findIndex(a => a.id === node.id);
        const angle = (idx / Math.max(actors.length, 1)) * 2 * Math.PI;
        const radius = actors.length > 1 ? 140 : 0;
        x = centerX + radius * Math.cos(angle);
        y = centerY + radius * Math.sin(angle);
      } else {
        // Place peripheral nodes in an outer concentric ring around their parent actor
        const relatedEdge = graphData.edges.find(e => e.source === node.id || e.target === node.id);
        const parentActorId = relatedEdge ? (relatedEdge.source === node.id ? relatedEdge.target : relatedEdge.source) : null;
        const parentActor = actors.find(a => a.id === parentActorId);

        let parentAngle = 0;
        if (parentActor) {
          const parentIdx = actors.findIndex(a => a.id === parentActor.id);
          parentAngle = (parentIdx / Math.max(actors.length, 1)) * 2 * Math.PI;
        }

        const idx = others.findIndex(o => o.id === node.id);
        const subAngle = parentAngle + ((idx % 6) - 2.5) * 0.45;
        const radius = 230 + (idx % 3) * 35;
        x = centerX + radius * Math.cos(subAngle);
        y = centerY + radius * Math.sin(subAngle);
      }

      return { ...node, x, y };
    });

    setNodes(positionedNodes);
    setEdges(graphData.edges);

    if (initialSelectedNodeId) {
      const match = positionedNodes.find(n => n.id === initialSelectedNodeId);
      if (match) setSelectedNode(match);
    }
  }, [graphData, initialSelectedNodeId]);

  // Filtering
  const filteredNodes = nodes.filter(n => {
    if (typeFilter !== 'All' && n.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return n.label.toLowerCase().includes(q) || (n.sublabel && n.sublabel.toLowerCase().includes(q));
    }
    return true;
  });

  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

  const filteredEdges = edges.filter(e => {
    if (relFilter !== 'All' && e.type !== relFilter) return false;
    return filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target);
  });

  // Calculate connected nodes for highlighted state
  const activeFocusNode = selectedNode || hoveredNode;
  const connectedNodeIds = new Set<string>();
  const connectedEdgeIds = new Set<string>();

  if (activeFocusNode) {
    connectedNodeIds.add(activeFocusNode.id);
    for (const e of edges) {
      if (e.source === activeFocusNode.id) {
        connectedNodeIds.add(e.target);
        connectedEdgeIds.add(e.id);
      } else if (e.target === activeFocusNode.id) {
        connectedNodeIds.add(e.source);
        connectedEdgeIds.add(e.id);
      }
    }
  }

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'svg') return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    } else if (draggingNodeId) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;
      setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: mouseX, y: mouseY } : n));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
    setSearchQuery('');
    setTypeFilter('All');
    setRelFilter('All');
  };

  // Node icons based on EntityType
  const getNodeColor = (type: EntityType) => {
    switch (type) {
      case 'Actor': return '#2563eb'; // Blue
      case 'Handle': return '#0284c7'; // Sky
      case 'PGPKey': return '#7c3aed'; // Violet
      case 'Wallet': return '#059669'; // Emerald
      case 'Infrastructure': return '#d97706'; // Amber
      case 'Source': return '#475569'; // Slate
      default: return '#64748b';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col lg:flex-row h-[680px]">
      {/* Main Graph Viewport */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Controls Toolbar */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search node or identifier..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-48 sm:w-60 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter by Entity Type */}
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 py-1.5 px-2.5 rounded-lg text-xs focus:outline-hidden"
            >
              <option value="All">All Entity Types</option>
              <option value="Actor">Threat Actors</option>
              <option value="Handle">Handles</option>
              <option value="PGPKey">PGP Keys</option>
              <option value="Wallet">Wallets</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>

            {/* Filter by Relationship Type */}
            <select
              value={relFilter}
              onChange={e => setRelFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 py-1.5 px-2.5 rounded-lg text-xs focus:outline-hidden"
            >
              <option value="All">All Relationships</option>
              <option value="USES">USES</option>
              <option value="ASSOCIATED_WITH">ASSOCIATED_WITH</option>
              <option value="LINKED_TO">LINKED_TO</option>
              <option value="CONNECTED_TO">CONNECTED_TO</option>
              <option value="SAME_IDENTIFIER">SAME_IDENTIFIER</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoom(z => Math.min(2.5, z + 0.2))}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(z => Math.max(0.4, z - 0.2))}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              title="Reset Graph Position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive SVG Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing bg-radial from-slate-50 to-white"
        >
          <svg
            width="100%"
            height="100%"
            className="w-full h-full select-none"
          >
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
              </marker>
              <marker
                id="arrowhead-active"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
              </marker>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Edges */}
              {filteredEdges.map((edge) => {
                const srcNode = nodes.find(n => n.id === edge.source);
                const tgtNode = nodes.find(n => n.id === edge.target);
                if (!srcNode || !tgtNode || srcNode.x === undefined || srcNode.y === undefined || tgtNode.x === undefined || tgtNode.y === undefined) return null;

                const isConnected = connectedEdgeIds.has(edge.id);
                const isDimmed = activeFocusNode && !isConnected;

                return (
                  <g key={edge.id}>
                    <line
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke={isConnected ? '#2563eb' : '#cbd5e1'}
                      strokeWidth={isConnected ? 2.5 : 1.2}
                      strokeDasharray={edge.type === 'CONNECTED_TO' ? '4 3' : undefined}
                      opacity={isDimmed ? 0.2 : 0.85}
                      markerEnd={isConnected ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                      className="transition-opacity duration-200"
                    />

                    {/* Edge Label on Midpoint */}
                    {(isConnected || zoom > 0.9) && (
                      <text
                        x={(srcNode.x + tgtNode.x) / 2}
                        y={(srcNode.y + tgtNode.y) / 2 - 3}
                        textAnchor="middle"
                        fontSize="9"
                        fill={isConnected ? '#1e40af' : '#94a3b8'}
                        className="font-mono bg-white font-medium"
                      >
                        {edge.type}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                if (node.x === undefined || node.y === undefined) return null;
                const isSelected = selectedNode?.id === node.id;
                const isConnected = connectedNodeIds.has(node.id);
                const isDimmed = activeFocusNode && !isConnected;
                const nodeColor = getNodeColor(node.type);
                const isActor = node.type === 'Actor';
                const nodeRadius = isActor ? 22 : 15;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setDraggingNodeId(node.id);
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                    opacity={isDimmed ? 0.25 : 1}
                  >
                    {/* Pulsing ring for selected/active actor */}
                    {isSelected && (
                      <circle
                        r={nodeRadius + 6}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-sm transition-all hover:scale-110"
                    />

                    {/* Node icon initials */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fontSize={isActor ? '11' : '9'}
                      fill="#ffffff"
                      fontWeight="bold"
                    >
                      {node.type === 'Actor' ? 'A' : node.type === 'PGPKey' ? 'P' : node.type === 'Wallet' ? 'W' : node.type === 'Infrastructure' ? 'I' : 'H'}
                    </text>

                    {/* Node Text Label below */}
                    <text
                      y={nodeRadius + 14}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#1e293b"
                      fontWeight={isActor ? 'bold' : 'normal'}
                      className="select-none"
                    >
                      {node.label.length > 18 ? `${node.label.slice(0, 16)}...` : node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-xl p-2.5 text-[11px] space-y-1.5 shadow-xs pointer-events-none">
            <div className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-1">
              Entity Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Threat Actor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Handle Persona</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
              <span>PGP Public Key</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Wallet Address</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Infrastructure Indicator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inspector Sidebar on Right */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between overflow-y-auto">
        {selectedNode ? (
          <div>
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600">
                  {selectedNode.type} Entity
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {selectedNode.label}
                </h3>
                {selectedNode.sublabel && (
                  <p className="text-xs text-slate-500 mt-0.5">{selectedNode.sublabel}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Entity Attributes */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Entity Properties</div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-500">Node ID:</span>
                  <span className="font-mono text-slate-800">{selectedNode.id}</span>
                </div>
                {selectedNode.confidence && (
                  <div className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500">Confidence:</span>
                    <span className="font-mono font-bold text-blue-700">{selectedNode.confidence}%</span>
                  </div>
                )}
                {selectedNode.details && Object.entries(selectedNode.details).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5 border-b border-slate-100">
                    <span className="text-slate-500 capitalize">{k}:</span>
                    <span className="font-mono text-slate-800 text-right truncate max-w-[140px]">{String(v)}</span>
                  </div>
                ))}
              </div>

              {/* Connected Relationships in Graph */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2">
                  Connected Links ({connectedEdgeIds.size})
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(rel => {
                    const otherId = rel.source === selectedNode.id ? rel.target : rel.source;
                    const otherNode = nodes.find(n => n.id === otherId);
                    return (
                      <div
                        key={rel.id}
                        onClick={() => otherNode && setSelectedNode(otherNode)}
                        className="p-1.5 bg-slate-50 hover:bg-blue-50 rounded-lg text-[11px] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-700 truncate">{otherNode?.label || otherId}</span>
                        <span className="font-mono text-[10px] text-blue-600 bg-blue-100/70 px-1 rounded-sm">{rel.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedNode.type === 'Actor' && onSelectActor && (
                <button
                  onClick={() => onSelectActor(selectedNode.id)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Actor Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <Info className="w-8 h-8 text-slate-300 mb-2 stroke-1" />
            <h4 className="font-semibold text-slate-700 text-xs mb-1">Graph Inspector</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Click any node in the relationship network to inspect connected PGP keys, wallet addresses, hosting infrastructure, and evidence confidence.
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Neo4j Graph Model</span>
          <span>{filteredNodes.length} nodes · {filteredEdges.length} edges</span>
        </div>
      </div>
    </div>
  );
};
