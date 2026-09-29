import { SYNTHETIC_ACTORS } from './actors.js';
import { SYNTHETIC_HANDLES, SYNTHETIC_PGP_KEYS, SYNTHETIC_WALLETS, SYNTHETIC_INFRASTRUCTURE } from './identifiers.js';
import { SYNTHETIC_SOURCES, SYNTHETIC_TIMELINE_EVENTS, SYNTHETIC_RELATIONSHIPS, SYNTHETIC_OBSERVATIONS } from './sourcesAndObs.js';
import { RelationshipRecord, ObservationRecord, TimelineEvent } from '../types.js';

// Dynamically augment relationships, observations, and timeline events so all targets (150+ rels, 200+ obs, 100+ events) are fully realized
function generateFullDataset() {
  const allRelationships: RelationshipRecord[] = [...SYNTHETIC_RELATIONSHIPS];
  const allObservations: ObservationRecord[] = [...SYNTHETIC_OBSERVATIONS];
  const allTimelineEvents: TimelineEvent[] = [...SYNTHETIC_TIMELINE_EVENTS];

  let relCounter = allRelationships.length + 1;
  let obsCounter = allObservations.length + 1;
  let evtCounter = allTimelineEvents.length + 1;

  // Ensure every actor has relationships to their handles, PGP keys, wallets, infra, and platforms
  for (const actor of SYNTHETIC_ACTORS) {
    const actorHandles = SYNTHETIC_HANDLES.filter(h => h.actorId === actor.id);
    const actorPGP = SYNTHETIC_PGP_KEYS.filter(p => p.actorId === actor.id);
    const actorWallets = SYNTHETIC_WALLETS.filter(w => w.actorId === actor.id);
    const actorInfra = SYNTHETIC_INFRASTRUCTURE.filter(i => i.associatedActors.includes(actor.id));

    // Connect actor to handles
    for (const h of actorHandles) {
      if (!allRelationships.some(r => r.sourceNodeId === actor.id && r.targetNodeId === h.id)) {
        allRelationships.push({
          id: `REL-${String(relCounter++).padStart(3, '0')}`,
          sourceNodeId: actor.id,
          sourceNodeType: 'Actor',
          targetNodeId: h.id,
          targetNodeType: 'Handle',
          relationshipType: 'USES',
          confidenceScore: h.isPrimary ? 100 : 85,
          firstObserved: h.firstSeen,
          lastObserved: h.lastSeen,
          evidenceSummary: `Handle ${h.handle} observed operating on ${h.platform}`,
          sourceId: 'SOURCE-DEMO-001'
        });
      }

      // Add observations for handles
      if (allObservations.length < 240) {
        allObservations.push({
          id: `OBS-${String(obsCounter++).padStart(3, '0')}`,
          actorId: actor.id,
          entityType: 'Handle',
          entityValue: h.handle,
          sourceId: 'SOURCE-DEMO-001',
          timestamp: `${h.firstSeen}T12:00:00Z`,
          eventDescription: `Handle ${h.handle} observed active on ${h.platform}.`,
          rawSampleSnippet: `Observation snippet for ${h.handle} with ${h.postingCount} recorded interactions.`,
          confidenceScore: h.stylometricScore || 80
        });
      }
    }

    // Connect actor to PGP keys
    for (const p of actorPGP) {
      if (!allRelationships.some(r => r.sourceNodeId === actor.id && r.targetNodeId === p.id)) {
        allRelationships.push({
          id: `REL-${String(relCounter++).padStart(3, '0')}`,
          sourceNodeId: actor.id,
          sourceNodeType: 'Actor',
          targetNodeId: p.id,
          targetNodeType: 'PGPKey',
          relationshipType: 'USES',
          confidenceScore: 95,
          firstObserved: p.createdDate,
          lastObserved: actor.lastSeen,
          evidenceSummary: `Public PGP Key ${p.keyId} (${p.algorithm}) associated with persona.`,
          sourceId: p.sourceId
        });
      }
    }

    // Connect actor to wallets
    for (const w of actorWallets) {
      if (!allRelationships.some(r => r.sourceNodeId === actor.id && r.targetNodeId === w.id)) {
        allRelationships.push({
          id: `REL-${String(relCounter++).padStart(3, '0')}`,
          sourceNodeId: actor.id,
          sourceNodeType: 'Actor',
          targetNodeId: w.id,
          targetNodeType: 'Wallet',
          relationshipType: 'USES',
          confidenceScore: 90,
          firstObserved: w.firstActivity,
          lastObserved: w.lastActivity,
          evidenceSummary: `Cryptocurrency address ${w.currency}:${w.address.slice(0, 12)}... associated with transactions.`,
          sourceId: w.sourceId
        });
      }

      if (allObservations.length < 240) {
        allObservations.push({
          id: `OBS-${String(obsCounter++).padStart(3, '0')}`,
          actorId: actor.id,
          entityType: 'Wallet',
          entityValue: w.id,
          sourceId: w.sourceId,
          timestamp: `${w.firstActivity}T14:30:00Z`,
          eventDescription: `Recorded ${w.totalTransactions} transactions totaling approx $${w.estimatedVolumeUSD.toLocaleString()}.`,
          rawSampleSnippet: `Cluster: ${w.clusterTag} | Address: ${w.address}`,
          confidenceScore: 90
        });
      }
    }

    // Connect actor to infrastructure
    for (const infra of actorInfra) {
      if (!allRelationships.some(r => r.sourceNodeId === actor.id && r.targetNodeId === infra.id)) {
        allRelationships.push({
          id: `REL-${String(relCounter++).padStart(3, '0')}`,
          sourceNodeId: actor.id,
          sourceNodeType: 'Actor',
          targetNodeId: infra.id,
          targetNodeType: 'Infrastructure',
          relationshipType: 'ASSOCIATED_WITH',
          confidenceScore: 82,
          firstObserved: infra.firstSeen,
          lastObserved: infra.lastSeen,
          evidenceSummary: `Infrastructure ${infra.type} (${infra.value}) resolved in connection with ${actor.alias}.`,
          sourceId: infra.sourceId
        });
      }
    }

    // Connect actor to platforms/sources
    for (const plat of actor.knownPlatforms) {
      const matchedSource = SYNTHETIC_SOURCES.find(s => s.name === plat) || SYNTHETIC_SOURCES[0];
      allRelationships.push({
        id: `REL-${String(relCounter++).padStart(3, '0')}`,
        sourceNodeId: actor.id,
        sourceNodeType: 'Actor',
        targetNodeId: matchedSource.id,
        targetNodeType: 'Source',
        relationshipType: 'SEEN_ON',
        confidenceScore: 88,
        firstObserved: actor.firstSeen,
        lastObserved: actor.lastSeen,
        evidenceSummary: `Presence confirmed on ${plat} with corroborated timeline artifacts.`,
        sourceId: matchedSource.id
      });
    }

    // Generate timeline event if fewer than 110
    if (allTimelineEvents.length < 115) {
      allTimelineEvents.push({
        id: `EVT-${String(evtCounter++).padStart(3, '0')}`,
        actorId: actor.id,
        timestamp: `${actor.firstSeen}T09:00:00Z`,
        eventType: 'Initial Observation',
        entity: actor.alias,
        source: actor.knownPlatforms[0] || 'Synthetic Forum Alpha',
        evidence: `Initial intelligence flag for ${actor.alias} in category ${actor.category}.`,
        confidence: actor.confidenceScore
      });

      allTimelineEvents.push({
        id: `EVT-${String(evtCounter++).padStart(3, '0')}`,
        actorId: actor.id,
        timestamp: `${actor.lastSeen}T17:00:00Z`,
        eventType: 'Forum Posting',
        entity: actor.alias,
        source: actor.knownPlatforms[0] || 'Synthetic Forum Alpha',
        evidence: `Recent verified activity corroboration for ${actor.alias}.`,
        confidence: actor.confidenceScore - 2
      });
    }
  }

  // Cross-actor connections between related threat rings
  const crossLinks = [
    { src: 'ACTOR-DEMO-001', tgt: 'ACTOR-DEMO-005', type: 'CONNECTED_TO' as const, conf: 75, summary: 'Bulk access credentials traded between ShadowX and RavenNode.' },
    { src: 'ACTOR-DEMO-002', tgt: 'ACTOR-DEMO-012', type: 'LINKED_TO' as const, conf: 70, summary: 'Shared data extortion leak mirrors.' },
    { src: 'ACTOR-DEMO-003', tgt: 'ACTOR-DEMO-010', type: 'CONNECTED_TO' as const, conf: 68, summary: 'Laundering carding proceeds through GhostByte mixer.' },
    { src: 'ACTOR-DEMO-004', tgt: 'ACTOR-DEMO-008', type: 'LINKED_TO' as const, conf: 72, summary: 'DarkOrbit malware uses SilentVector fast-flux DNS network.' },
    { src: 'ACTOR-DEMO-009', tgt: 'ACTOR-DEMO-020', type: 'CONNECTED_TO' as const, conf: 84, summary: 'TitanForge exploits bundled into CobaltWeaver beacon droppers.' },
    { src: 'ACTOR-DEMO-011', tgt: 'ACTOR-DEMO-024', type: 'CONNECTED_TO' as const, conf: 80, summary: 'Affiliate extortion revenue pool collaboration.' },
    { src: 'ACTOR-DEMO-015', tgt: 'ACTOR-DEMO-018', type: 'LINKED_TO' as const, conf: 76, summary: 'IronSpecter SSO credentials weaponized by CrimsonHelix ransomware affiliates.' },
    { src: 'ACTOR-DEMO-014', tgt: 'ACTOR-DEMO-022', type: 'CONNECTED_TO' as const, conf: 71, summary: 'Traffic direction system funneling payloads into FrostByte loaders.' }
  ];

  for (const cl of crossLinks) {
    allRelationships.push({
      id: `REL-${String(relCounter++).padStart(3, '0')}`,
      sourceNodeId: cl.src,
      sourceNodeType: 'Actor',
      targetNodeId: cl.tgt,
      targetNodeType: 'Actor',
      relationshipType: cl.type,
      confidenceScore: cl.conf,
      firstObserved: '2025-05-01',
      lastObserved: '2026-08-15',
      evidenceSummary: cl.summary,
      sourceId: 'SOURCE-DEMO-038'
    });
  }

  // Ensure observations count is 200+
  while (allObservations.length < 215) {
    const actor = SYNTHETIC_ACTORS[allObservations.length % SYNTHETIC_ACTORS.length];
    allObservations.push({
      id: `OBS-${String(obsCounter++).padStart(3, '0')}`,
      actorId: actor.id,
      entityType: 'Actor',
      entityValue: actor.alias,
      sourceId: 'SOURCE-DEMO-038',
      timestamp: `${actor.firstSeen}T10:${String(allObservations.length % 60).padStart(2, '0')}:00Z`,
      eventDescription: `Telemetry heartbeat recorded from synthetic sensor probe for ${actor.alias}.`,
      rawSampleSnippet: `Synthetic sensor signal confirmed actor presence in cluster ${actor.category}.`,
      confidenceScore: 85
    });
  }

  // Sort timeline events chronologically
  allTimelineEvents.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return {
    actors: SYNTHETIC_ACTORS,
    handles: SYNTHETIC_HANDLES,
    pgpKeys: SYNTHETIC_PGP_KEYS,
    wallets: SYNTHETIC_WALLETS,
    infrastructure: SYNTHETIC_INFRASTRUCTURE,
    sources: SYNTHETIC_SOURCES,
    relationships: allRelationships,
    observations: allObservations,
    timelineEvents: allTimelineEvents
  };
}

export const SEEDED_DATABASE = generateFullDataset();
