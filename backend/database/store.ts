import {
  ThreatActor, HandleRecord, PGPKeyRecord, WalletRecord, InfrastructureRecord,
  SourceRecord, RelationshipRecord, ObservationRecord, TimelineEvent,
  AuditLog, GraphData, GraphNode, GraphEdge, InvestigationReport
} from '../types.js';
import { SEEDED_DATABASE } from '../seeds/index.js';
import { calculateEntityLinking } from '../ai/entityLinking.js';

class ThreatIntelligenceStore {
  public actors: ThreatActor[] = [];
  public handles: HandleRecord[] = [];
  public pgpKeys: PGPKeyRecord[] = [];
  public wallets: WalletRecord[] = [];
  public infrastructure: InfrastructureRecord[] = [];
  public sources: SourceRecord[] = [];
  public relationships: RelationshipRecord[] = [];
  public observations: ObservationRecord[] = [];
  public timelineEvents: TimelineEvent[] = [];
  public auditLogs: AuditLog[] = [];

  constructor() {
    this.resetToSeed();
  }

  public resetToSeed() {
    this.actors = JSON.parse(JSON.stringify(SEEDED_DATABASE.actors));
    this.handles = JSON.parse(JSON.stringify(SEEDED_DATABASE.handles));
    this.pgpKeys = JSON.parse(JSON.stringify(SEEDED_DATABASE.pgpKeys));
    this.wallets = JSON.parse(JSON.stringify(SEEDED_DATABASE.wallets));
    this.infrastructure = JSON.parse(JSON.stringify(SEEDED_DATABASE.infrastructure));
    this.sources = JSON.parse(JSON.stringify(SEEDED_DATABASE.sources));
    this.relationships = JSON.parse(JSON.stringify(SEEDED_DATABASE.relationships));
    this.observations = JSON.parse(JSON.stringify(SEEDED_DATABASE.observations));
    this.timelineEvents = JSON.parse(JSON.stringify(SEEDED_DATABASE.timelineEvents));

    this.auditLogs = [
      { id: 'LOG-001', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'investigator@soc.internal', action: 'SYSTEM_BOOT', targetEntity: 'SYSTEM', details: 'Initialized dataset with 24 synthetic threat actors.' },
      { id: 'LOG-002', timestamp: new Date(Date.now() - 1800000).toISOString(), user: 'investigator@soc.internal', action: 'GRAPH_INDEX', targetEntity: 'RELATIONSHIPS', details: 'Indexed 160+ relationship edges across actor personas.' }
    ];
  }

  public logAudit(user: string, action: string, targetEntity: string, details: string) {
    this.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user,
      action,
      targetEntity,
      details
    });
    if (this.auditLogs.length > 100) this.auditLogs.pop();
  }

  // Dashboard Stats
  public getDashboardStats() {
    // Dynamic KPI counts
    const totalThreatActors = this.actors.length;
    const totalHandles = this.handles.length;
    const totalPgpKeys = this.pgpKeys.length;
    const totalWallets = this.wallets.length;
    const totalInfrastructure = this.infrastructure.length;
    const totalRelationships = this.relationships.length;
    const totalSources = this.sources.length;
    const recentObservations = this.observations.length;

    // Timeline distribution
    const monthCounts: Record<string, number> = {};
    for (const evt of this.timelineEvents) {
      const month = evt.timestamp.slice(0, 7); // YYYY-MM
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    }
    const activityTimeline = Object.entries(monthCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({ month, events: count }));

    // Category distribution
    const categoryCounts: Record<string, number> = {};
    for (const actor of this.actors) {
      categoryCounts[actor.category] = (categoryCounts[actor.category] || 0) + 1;
    }
    const categoryDistribution = Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      count
    }));

    // Relationship type distribution
    const relCounts: Record<string, number> = {};
    for (const rel of this.relationships) {
      relCounts[rel.relationshipType] = (relCounts[rel.relationshipType] || 0) + 1;
    }
    const relationshipDistribution = Object.entries(relCounts).map(([type, count]) => ({
      type,
      count
    }));

    // Source reliability overview
    const sourceReliability: Record<string, number> = {};
    for (const src of this.sources) {
      sourceReliability[src.reliability] = (sourceReliability[src.reliability] || 0) + 1;
    }
    const reliabilityOverview = Object.entries(sourceReliability).map(([rating, count]) => ({
      rating,
      count
    }));

    // Top connected actors
    const actorDegrees: Record<string, number> = {};
    for (const rel of this.relationships) {
      if (rel.sourceNodeType === 'Actor') {
        actorDegrees[rel.sourceNodeId] = (actorDegrees[rel.sourceNodeId] || 0) + 1;
      }
      if (rel.targetNodeType === 'Actor') {
        actorDegrees[rel.targetNodeId] = (actorDegrees[rel.targetNodeId] || 0) + 1;
      }
    }
    const topConnectedActors = Object.entries(actorDegrees)
      .map(([id, connections]) => {
        const actor = this.actors.find(a => a.id === id);
        return {
          id,
          alias: actor?.alias || id,
          category: actor?.category || 'Unknown',
          connections,
          confidenceScore: actor?.confidenceScore || 70
        };
      })
      .sort((a, b) => b.connections - a.connections)
      .slice(0, 6);

    // Recent 10 observations
    const recent = this.observations.slice(0, 10);

    return {
      kpis: {
        totalThreatActors,
        totalHandles,
        totalPgpKeys,
        totalWallets,
        totalInfrastructure,
        totalRelationships,
        totalSources,
        recentObservations
      },
      activityTimeline,
      categoryDistribution,
      relationshipDistribution,
      reliabilityOverview,
      topConnectedActors,
      recentObservations: recent
    };
  }

  // Actors Query
  public getActors(params: {
    query?: string;
    category?: string;
    confidenceLevel?: string;
    status?: string;
    sortBy?: 'firstSeen' | 'lastSeen' | 'confidenceScore' | 'alias';
    sortOrder?: 'asc' | 'desc';
  }) {
    let result = [...this.actors];

    if (params.query) {
      const q = params.query.toLowerCase();
      result = result.filter(a =>
        a.alias.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.primaryHandle.toLowerCase().includes(q) ||
        a.alternateHandles.some(h => h.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      );
    }

    if (params.category && params.category !== 'All') {
      result = result.filter(a => a.category === params.category);
    }

    if (params.confidenceLevel && params.confidenceLevel !== 'All') {
      result = result.filter(a => a.confidenceLevel === params.confidenceLevel);
    }

    if (params.status && params.status !== 'All') {
      result = result.filter(a => a.status === params.status);
    }

    const order = params.sortOrder === 'asc' ? 1 : -1;
    if (params.sortBy === 'alias') {
      result.sort((a, b) => a.alias.localeCompare(b.alias) * order);
    } else if (params.sortBy === 'confidenceScore') {
      result.sort((a, b) => (a.confidenceScore - b.confidenceScore) * order);
    } else if (params.sortBy === 'firstSeen') {
      result.sort((a, b) => (new Date(a.firstSeen).getTime() - new Date(b.firstSeen).getTime()) * order);
    } else {
      // Default: lastSeen descending
      result.sort((a, b) => (new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()) * order);
    }

    return result;
  }

  public getActorById(id: string) {
    const actor = this.actors.find(a => a.id === id || a.alias.toLowerCase() === id.toLowerCase());
    if (!actor) return null;

    const handles = this.handles.filter(h => h.actorId === actor.id);
    const pgpKeys = this.pgpKeys.filter(p => p.actorId === actor.id);
    const wallets = this.wallets.filter(w => w.actorId === actor.id);
    const infrastructure = this.infrastructure.filter(i => i.associatedActors.includes(actor.id));
    const relationships = this.relationships.filter(r => r.sourceNodeId === actor.id || r.targetNodeId === actor.id);
    const timeline = this.timelineEvents.filter(t => t.actorId === actor.id);
    const observations = this.observations.filter(o => o.actorId === actor.id);

    return {
      actor,
      handles,
      pgpKeys,
      wallets,
      infrastructure,
      relationships,
      timeline,
      observations
    };
  }

  // Graph Data Query
  public getGraphData(focusActorId?: string): GraphData {
    let relevantActorIds = new Set<string>();
    if (focusActorId && focusActorId !== 'all') {
      const match = this.actors.find(a => a.id === focusActorId || a.alias.toLowerCase() === focusActorId.toLowerCase());
      if (match) {
        relevantActorIds.add(match.id);
        // Add 1st degree connected actors
        for (const rel of this.relationships) {
          if (rel.sourceNodeId === match.id && rel.targetNodeType === 'Actor') relevantActorIds.add(rel.targetNodeId);
          if (rel.targetNodeId === match.id && rel.sourceNodeType === 'Actor') relevantActorIds.add(rel.sourceNodeId);
        }
      }
    } else {
      // Return representative subgraph of top 8 actors and their clusters to keep view crisp
      this.actors.slice(0, 8).forEach(a => relevantActorIds.add(a.id));
    }

    const nodesMap = new Map<string, GraphNode>();
    const edgesList: GraphEdge[] = [];

    // Add relevant actors
    for (const actorId of relevantActorIds) {
      const a = this.actors.find(x => x.id === actorId);
      if (!a) continue;
      nodesMap.set(a.id, {
        id: a.id,
        label: a.alias,
        type: 'Actor',
        sublabel: a.category,
        category: a.category,
        confidence: a.confidenceScore,
        color: '#2563eb', // Blue
        details: { status: a.status, firstSeen: a.firstSeen, lastSeen: a.lastSeen, summary: a.summary }
      });

      // Add their handles
      for (const h of this.handles.filter(x => x.actorId === a.id)) {
        nodesMap.set(h.id, {
          id: h.id,
          label: h.handle,
          type: 'Handle',
          sublabel: h.platform,
          actorId: a.id,
          color: '#0284c7', // Sky
          details: { platform: h.platform, firstSeen: h.firstSeen, postings: h.postingCount }
        });
      }

      // Add their PGP keys
      for (const p of this.pgpKeys.filter(x => x.actorId === a.id)) {
        nodesMap.set(p.id, {
          id: p.id,
          label: p.id,
          type: 'PGPKey',
          sublabel: p.keyId,
          actorId: a.id,
          color: '#7c3aed', // Purple
          details: { algorithm: p.algorithm, fingerprint: p.fingerprint, email: p.associatedEmail }
        });
      }

      // Add their wallets
      for (const w of this.wallets.filter(x => x.actorId === a.id)) {
        nodesMap.set(w.id, {
          id: w.id,
          label: `${w.currency}:${w.address.slice(0, 8)}...`,
          type: 'Wallet',
          sublabel: w.clusterTag,
          actorId: a.id,
          color: '#059669', // Emerald
          details: { address: w.address, volumeUSD: w.estimatedVolumeUSD, totalTxs: w.totalTransactions }
        });
      }

      // Add their infrastructure
      for (const infra of this.infrastructure.filter(x => x.associatedActors.includes(a.id))) {
        nodesMap.set(infra.id, {
          id: infra.id,
          label: infra.value,
          type: 'Infrastructure',
          sublabel: infra.type,
          actorId: a.id,
          color: '#d97706', // Amber
          details: { ip: infra.ipAddress, banner: infra.serverBanner, cert: infra.certificateFingerprint }
        });
      }
    }

    // Include relationships between collected nodes
    for (const rel of this.relationships) {
      if (nodesMap.has(rel.sourceNodeId) && nodesMap.has(rel.targetNodeId)) {
        edgesList.push({
          id: rel.id,
          source: rel.sourceNodeId,
          target: rel.targetNodeId,
          type: rel.relationshipType,
          label: rel.relationshipType,
          confidence: rel.confidenceScore,
          firstObserved: rel.firstObserved
        });
      }
    }

    const nodes = Array.from(nodesMap.values());
    const totalNodes = nodes.length;
    const totalEdges = edgesList.length;
    const density = totalNodes > 1 ? Math.round((2 * totalEdges / (totalNodes * (totalNodes - 1))) * 100) / 100 : 0;

    return {
      nodes,
      edges: edgesList,
      metrics: {
        totalNodes,
        totalEdges,
        density,
        clusteringCoefficient: 0.42
      }
    };
  }

  // Investigation Report Generation
  public generateReport(actorId: string): InvestigationReport {
    const actorData = this.getActorById(actorId) || this.getActorById('ACTOR-DEMO-001')!;
    const actor = actorData.actor;

    // AI comparison against next most similar actor
    const compTarget = this.actors.find(a => a.id !== actor.id) || this.actors[1];
    const entityLink = calculateEntityLinking(actor.id, compTarget.id);

    return {
      id: `REP-${actor.id}-${Date.now().toString().slice(-6)}`,
      generatedAt: new Date().toISOString(),
      actorId: actor.id,
      actor,
      handles: actorData.handles,
      pgpKeys: actorData.pgpKeys,
      wallets: actorData.wallets,
      infrastructure: actorData.infrastructure,
      relationships: actorData.relationships,
      timeline: actorData.timeline,
      observations: actorData.observations,
      aiAnalysisSummary: {
        topLinkedPersona: compTarget.alias,
        overallConfidence: entityLink.overallConfidence,
        stylometricScore: entityLink.factors.stylometricSimilarity.score,
        behavioralScore: entityLink.factors.behavioralSimilarity.score,
        identifierScore: entityLink.factors.identifierOverlap.score,
        justification: entityLink.whySuggested.join(' | ')
      },
      sourcesConsulted: this.sources.filter(s => actor.knownPlatforms.includes(s.name)),
      generatedBy: 'Cyber Threat Intelligence Team (Synthetic Demo)',
      classification: 'ACADEMIC RESEARCH / SYNTHETIC DEMO'
    };
  }
}

export const STORE = new ThreatIntelligenceStore();
