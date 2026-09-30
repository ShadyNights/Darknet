export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'search'
  | 'timeline'
  | 'graph'
  | 'actors'
  | 'actor-detail'
  | 'attribution'
  | 'attribution-candidate'
  | 'infrastructure'
  | 'cases'
  | 'case-detail'
  | 'admin';

export type AdminTab = 'sources' | 'audit' | 'users' | 'parameters';

export interface ThreatActor {
  id: string; // e.g. A-0142
  handle: string; // ShadowVendor77
  aliases: string[];
  category: 'stolen-data' | 'ransomware' | 'financial-fraud' | 'exploit-broker' | 'narcotics' | 'terror-finance';
  confidence: number; // 0.0 - 1.0
  confidenceLabel: 'Confirmed' | 'High' | 'Medium' | 'Low';
  lastScan: string;
  sources: string[];
  evidenceRef: string;
  observedTenure: string;
  interceptedPosts: number;
  escrowDeals: number;
  primaryDialect: string;
  pgpMasterKey: string;
  pgpSubkey: string;
  wallets: {
    type: string;
    address: string;
    details: string;
  }[];
  infrastructure: {
    onion: string;
    clearnetIp: string;
    asn: string;
    status: string;
  };
  metrics: {
    attribution: number;
    admissibility: number;
    threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
    victims: string;
    breaches: string;
  };
}

export interface AttributionCandidate {
  id: string; // e.g. C-1042
  personaA: {
    handle: string;
    platform: string;
    status: 'ACTIVE' | 'DORMANT';
    entId: string;
    avatar: string;
    firstSeen: string;
    lastSeen: string;
    listingVolume: string;
    target: string;
    pgp: string;
    depositOrEscrow: string;
  };
  personaB: {
    handle: string;
    platform: string;
    status: 'ACTIVE' | 'DORMANT';
    entId: string;
    avatar: string;
    firstSeen: string;
    lastSeen: string;
    listingVolume: string;
    target: string;
    pgp: string;
    depositOrEscrow: string;
  };
  threatClass: string;
  score: number;
  confidenceBand: 'High' | 'Med' | 'Low' | 'Confirmed';
  totalLor: string;
  vectors: string[];
  age: string;
  status: 'Pending Review' | 'Under Adjudication' | 'Confirmed' | 'Rejected';
  evidencePillars: {
    title: string;
    weight: string;
    description: string;
    hashOrTx: string;
  }[];
}

export interface InfrastructureCandidate {
  id: string; // e.g. INF-9921
  onion: string;
  clearnetIp: string;
  clearnetHost: string;
  asn: string;
  geo: string;
  score: number;
  band: 'HIGH' | 'MED' | 'LOW';
  vectorsCount: number;
  vectorsSummary: string;
  status: string;
  descriptors: {
    rendezvous: string;
    descrHash: string;
    firstRecord: string;
    ptr: string;
  };
  indicators: {
    name: string;
    type: string;
    detail: string;
    subDetail: string;
    points: number;
  }[];
}

export interface CaseFile {
  id: string; // e.g. C-2026-001
  title: string;
  targetSynopsis: string;
  actorsCount: number;
  evidenceCount: number;
  updatedUtc: string;
  classification: string;
  status: 'ACTIVE' | 'MHA_REVIEW' | 'ARCHIVED';
  leadInvestigator: string;
  createdDate: string;
  primaryActorId: string;
  walletsCluster: string;
  exfiltratedVolume: string;
  evidences: {
    id: string;
    description: string;
    source: string;
    hashMatch: string;
  }[];
}

export interface AuditBlock {
  blockIndex: number;
  timeUtc: string;
  user: string;
  role: string;
  action: string;
  entityRef: string;
  chainStatus: 'VALID' | 'TAMPERED';
  prevHash: string;
  recordHash: string;
  payloadHash: string;
  notarizationKey: string;
}

export interface EnclaveUser {
  id: string; // e.g. analyst01
  fullName: string;
  agency: string;
  rank: string;
  email: string;
  role: 'Analyst' | 'Senior Investigator' | 'System Administrator' | 'External Liaison';
  clearance: string;
  node: string;
  ip: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  relativeTime: string;
  sessionsCount: number;
  cacId: string;
  cacExpiry: string;
}

export interface TimelineEvent {
  id: string;
  timeUtc: string;
  entityType: 'Actor' | 'Persona' | 'Wallet' | 'Infra';
  entityName: string;
  title: string;
  description: string;
  source: string;
  sourceReliability: string;
  confidence: number;
  confidenceBand: 'High' | 'Medium' | 'Low' | 'Confirmed';
  evidenceCount: number;
  exhibitRef: string;
}
