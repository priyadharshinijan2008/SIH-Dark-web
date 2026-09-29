export type ActorCategory =
  | 'Cybercrime'
  | 'Ransomware Broker'
  | 'Data Extortion'
  | 'Financial Fraud'
  | 'Malware Distribution'
  | 'Access Broker'
  | 'Stealth Operation'
  | 'Counterfeit Goods';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Investigative Lead';

export type EntityType =
  | 'Actor'
  | 'Handle'
  | 'PGPKey'
  | 'Wallet'
  | 'Infrastructure'
  | 'Source'
  | 'Platform'
  | 'Domain';

export type RelationshipType =
  | 'USES'
  | 'SEEN_ON'
  | 'ASSOCIATED_WITH'
  | 'LINKED_TO'
  | 'SAME_IDENTIFIER'
  | 'APPEARS_ON'
  | 'CONNECTED_TO';

export type UserRole = 'Admin' | 'Analyst' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency?: string;
  createdAt: string;
}

export interface ThreatActor {
  id: string;
  alias: string;
  primaryHandle: string;
  alternateHandles: string[];
  category: ActorCategory;
  firstSeen: string;
  lastSeen: string;
  status: 'Active' | 'Dormant' | 'Monitored' | 'Synthetic Demo Profile';
  confidenceLevel: ConfidenceLevel;
  confidenceScore: number;
  summary: string;
  linkedIdentifiersCount: number;
  relationshipsCount: number;
  observationsCount: number;
  primaryLanguages: string[];
  knownPlatforms: string[];
  riskRating: 'Critical' | 'High' | 'Moderate' | 'Low';
  notes?: string;
}

export interface HandleRecord {
  id: string;
  actorId: string;
  handle: string;
  platform: string;
  firstSeen: string;
  lastSeen: string;
  postingCount: number;
  stylometricScore?: number;
  isPrimary: boolean;
}

export interface PGPKeyRecord {
  id: string;
  actorId: string;
  keyId: string;
  fingerprint: string;
  algorithm: string;
  keyLength: number;
  createdDate: string;
  associatedEmail?: string;
  sourceId: string;
  verificationStatus: 'Verified Synthetic' | 'Unverified Lead';
}

export interface WalletRecord {
  id: string;
  actorId: string;
  currency: 'BTC' | 'XMR' | 'ETH' | 'USDT';
  address: string;
  firstActivity: string;
  lastActivity: string;
  totalTransactions: number;
  estimatedVolumeUSD: number;
  clusterTag: string;
  sourceId: string;
}

export interface InfrastructureRecord {
  id: string;
  actorId?: string;
  type: 'Domain' | 'TLS Certificate' | 'Server Banner' | 'Hosting IP' | 'Tor Onion Service' | 'Nameserver';
  value: string;
  ipAddress?: string;
  asn?: string;
  country?: string;
  certificateFingerprint?: string;
  serverBanner?: string;
  firstSeen: string;
  lastSeen: string;
  associatedActors: string[];
  sourceId: string;
}

export interface SourceRecord {
  id: string;
  name: string;
  type: 'Synthetic Forum' | 'Synthetic Marketplace' | 'Public Threat Report' | 'Synthetic Intelligence Feed' | 'Synthetic Blockchain Cluster';
  reliability: 'A (High)' | 'B (Moderate)' | 'C (Low)' | 'F (Unconfirmed)';
  observationsCount: number;
  firstIngested: string;
  lastIngested: string;
  urlSample: string;
  isSynthetic: boolean;
  collectorMethod: 'Public Archive' | 'Synthetic Generator' | 'Public Advisory Mirror';
}

export interface ObservationRecord {
  id: string;
  actorId: string;
  entityType: EntityType;
  entityValue: string;
  sourceId: string;
  timestamp: string;
  eventDescription: string;
  rawSampleSnippet?: string;
  confidenceScore: number;
}

export interface RelationshipRecord {
  id: string;
  sourceNodeId: string;
  sourceNodeType: EntityType;
  targetNodeId: string;
  targetNodeType: EntityType;
  relationshipType: RelationshipType;
  confidenceScore: number;
  firstObserved: string;
  lastObserved: string;
  evidenceSummary: string;
  sourceId: string;
}

export interface TimelineEvent {
  id: string;
  actorId: string;
  timestamp: string;
  eventType: 'Initial Observation' | 'Handle Registered' | 'PGP Key Discovered' | 'Wallet Transaction' | 'Infrastructure Associated' | 'Forum Posting' | 'Marketplace Listing';
  entity: string;
  source: string;
  evidence: string;
  confidence: number;
  severity?: 'Info' | 'Warning' | 'High';
}

export interface StylometricFeatures {
  charCount: number;
  wordCount: number;
  avgSentenceLength: number;
  vocabularyRichnessTTR: number;
  punctuationFrequency: {
    period: number;
    comma: number;
    semicolon: number;
    exclamation: number;
    question: number;
    emoticon: number;
  };
  functionWordUsage: {
    pronouns: number;
    prepositions: number;
    conjunctions: number;
    modalVerbs: number;
  };
  topTrigrams: string[];
}

export interface StylometricComparisonResult {
  similarityScore: number;
  sampleAFeatures: StylometricFeatures;
  sampleBFeatures: StylometricFeatures;
  cosineSimilarity: number;
  jaccardTrigramSimilarity: number;
  syntacticMatchScore: number;
  confidenceLevel: ConfidenceLevel;
  analyticalRationale: string;
  disclaimer: string;
}

export interface BehavioralComparisonResult {
  similarityScore: number;
  temporalOverlapScore: number;
  diurnalOverlapScore: number;
  intervalVarianceMatch: number;
  platformOverlapScore: number;
  sharedPeakHours: number[];
  analyticalRationale: string;
}

export interface EntityLinkingResult {
  actorAId: string;
  actorAName: string;
  actorBId: string;
  actorBName: string;
  overallConfidence: number;
  factors: {
    identifierOverlap: { score: number; weight: number; contribution: number; evidence: string[] };
    temporalOverlap: { score: number; weight: number; contribution: number; evidence: string[] };
    platformOverlap: { score: number; weight: number; contribution: number; evidence: string[] };
    behavioralSimilarity: { score: number; weight: number; contribution: number; evidence: string[] };
    stylometricSimilarity: { score: number; weight: number; contribution: number; evidence: string[] };
  };
  associationStrength: 'Strong Association' | 'Moderate Association' | 'Weak Association' | 'Inconclusive';
  whySuggested: string[];
  investigativeNextSteps: string[];
  disclaimer: string;
}

export interface InvestigationReport {
  id: string;
  generatedAt: string;
  actorId: string;
  actor: ThreatActor;
  handles: HandleRecord[];
  pgpKeys: PGPKeyRecord[];
  wallets: WalletRecord[];
  infrastructure: InfrastructureRecord[];
  relationships: RelationshipRecord[];
  timeline: TimelineEvent[];
  observations: ObservationRecord[];
  aiAnalysisSummary: {
    topLinkedPersona: string;
    overallConfidence: number;
    stylometricScore: number;
    behavioralScore: number;
    identifierScore: number;
    justification: string;
  };
  sourcesConsulted: SourceRecord[];
  generatedBy: string;
  classification: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  sublabel?: string;
  category?: string;
  actorId?: string;
  confidence?: number;
  color?: string;
  degree?: number;
  details?: Record<string, any>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  label: string;
  confidence: number;
  firstObserved: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metrics: {
    totalNodes: number;
    totalEdges: number;
    density: number;
    clusteringCoefficient: number;
  };
}

export interface DashboardStats {
  kpis: {
    totalThreatActors: number;
    totalHandles: number;
    totalPgpKeys: number;
    totalWallets: number;
    totalInfrastructure: number;
    totalRelationships: number;
    totalSources: number;
    recentObservations: number;
  };
  activityTimeline: Array<{ month: string; events: number }>;
  categoryDistribution: Array<{ name: string; count: number }>;
  relationshipDistribution: Array<{ type: string; count: number }>;
  reliabilityOverview: Array<{ rating: string; count: number }>;
  topConnectedActors: Array<{ id: string; alias: string; category: string; connections: number; confidenceScore: number }>;
  recentObservations: ObservationRecord[];
}
