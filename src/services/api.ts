import {
  DashboardStats, ThreatActor, HandleRecord, PGPKeyRecord, WalletRecord,
  InfrastructureRecord, SourceRecord, TimelineEvent, GraphData,
  StylometricComparisonResult, BehavioralComparisonResult, EntityLinkingResult,
  InvestigationReport
} from '../types';

const API_BASE = '/api';

export const api = {
  // Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
  },

  // Actors
  async getActors(params?: {
    query?: string;
    category?: string;
    confidenceLevel?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<{ count: number; actors: ThreatActor[] }> {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.set('query', params.query);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.confidenceLevel) searchParams.set('confidenceLevel', params.confidenceLevel);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const res = await fetch(`${API_BASE}/actors?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch actors');
    return res.json();
  },

  async getActorById(id: string): Promise<{
    actor: ThreatActor;
    handles: HandleRecord[];
    pgpKeys: PGPKeyRecord[];
    wallets: WalletRecord[];
    infrastructure: InfrastructureRecord[];
    relationships: any[];
    timeline: TimelineEvent[];
    observations: any[];
  }> {
    const res = await fetch(`${API_BASE}/actors/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch actor ${id}`);
    return res.json();
  },

  async createActor(data: Partial<ThreatActor>): Promise<ThreatActor> {
    const res = await fetch(`${API_BASE}/actors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create actor');
    return res.json();
  },

  // Graph
  async getGraph(focus?: string): Promise<GraphData> {
    const url = focus ? `${API_BASE}/graph?focus=${encodeURIComponent(focus)}` : `${API_BASE}/graph`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch graph data');
    return res.json();
  },

  // Timeline
  async getTimeline(params?: {
    actorId?: string;
    fromDate?: string;
    toDate?: string;
    eventType?: string;
  }): Promise<{ count: number; events: TimelineEvent[] }> {
    const searchParams = new URLSearchParams();
    if (params?.actorId) searchParams.set('actorId', params.actorId);
    if (params?.fromDate) searchParams.set('fromDate', params.fromDate);
    if (params?.toDate) searchParams.set('toDate', params.toDate);
    if (params?.eventType) searchParams.set('eventType', params.eventType);

    const res = await fetch(`${API_BASE}/timeline?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch timeline');
    return res.json();
  },

  // Infrastructure
  async getInfrastructure(params?: { type?: string; query?: string }): Promise<{ count: number; infrastructure: InfrastructureRecord[] }> {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.query) searchParams.set('query', params.query);

    const res = await fetch(`${API_BASE}/infrastructure?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch infrastructure');
    return res.json();
  },

  // Sources
  async getSources(): Promise<{ count: number; sources: SourceRecord[] }> {
    const res = await fetch(`${API_BASE}/sources`);
    if (!res.ok) throw new Error('Failed to fetch sources');
    return res.json();
  },

  // AI Analysis
  async analyzeStylometry(sampleA: string, sampleB: string): Promise<StylometricComparisonResult> {
    const res = await fetch(`${API_BASE}/analysis/stylometry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleA, sampleB })
    });
    if (!res.ok) throw new Error('Failed to perform stylometric analysis');
    return res.json();
  },

  async analyzeBehavior(actorAId: string, actorBId: string): Promise<{
    actorA: any;
    actorB: any;
    comparison: BehavioralComparisonResult;
  }> {
    const res = await fetch(`${API_BASE}/analysis/behavior`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actorAId, actorBId })
    });
    if (!res.ok) throw new Error('Failed to perform behavioral analysis');
    return res.json();
  },

  async analyzeEntityLinking(actorAId: string, actorBId: string): Promise<EntityLinkingResult> {
    const res = await fetch(`${API_BASE}/analysis/entity-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actorAId, actorBId })
    });
    if (!res.ok) throw new Error('Failed to perform entity linking analysis');
    return res.json();
  },

  // Reports
  async getReport(actorId: string): Promise<InvestigationReport> {
    const res = await fetch(`${API_BASE}/reports/${actorId}`);
    if (!res.ok) throw new Error('Failed to generate report');
    return res.json();
  },

  // Imports
  async importCsv(csvText: string, targetType: string): Promise<any> {
    const res = await fetch(`${API_BASE}/import/csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csvText, targetType })
    });
    if (!res.ok) throw new Error('Failed to import CSV');
    return res.json();
  },

  async importJson(jsonData: any, targetType: string): Promise<any> {
    const res = await fetch(`${API_BASE}/import/json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonData, targetType })
    });
    if (!res.ok) throw new Error('Failed to import JSON');
    return res.json();
  },

  // System
  async resetSeed(): Promise<void> {
    await fetch(`${API_BASE}/system/reset-seed`, { method: 'POST' });
  }
};
