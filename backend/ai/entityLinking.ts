import { ThreatActor, EntityLinkingResult } from '../types.js';
import { compareStylometry } from './stylometry.js';
import { generateSyntheticBehaviorProfile, compareBehavior } from './behavior.js';
import { SEEDED_DATABASE } from '../seeds/index.js';

export function calculateEntityLinking(actorAId: string, actorBId: string): EntityLinkingResult {
  const actorA = SEEDED_DATABASE.actors.find(a => a.id === actorAId) || SEEDED_DATABASE.actors[0];
  const actorB = SEEDED_DATABASE.actors.find(a => a.id === actorBId) || SEEDED_DATABASE.actors[1];

  // 1. Identifier Overlap Factor (Weight: 30%)
  const pgpA = SEEDED_DATABASE.pgpKeys.filter(p => p.actorId === actorA.id).map(p => p.keyId);
  const pgpB = SEEDED_DATABASE.pgpKeys.filter(p => p.actorId === actorB.id).map(p => p.keyId);
  const sharedPgp = pgpA.filter(k => pgpB.includes(k));

  const walletsA = SEEDED_DATABASE.wallets.filter(w => w.actorId === actorA.id).map(w => w.address);
  const walletsB = SEEDED_DATABASE.wallets.filter(w => w.actorId === actorB.id).map(w => w.address);
  const sharedWallets = walletsA.filter(w => walletsB.includes(w));

  const infraA = SEEDED_DATABASE.infrastructure.filter(i => i.associatedActors.includes(actorA.id)).map(i => i.value);
  const infraB = SEEDED_DATABASE.infrastructure.filter(i => i.associatedActors.includes(actorB.id)).map(i => i.value);
  const sharedInfra = infraA.filter(i => infraB.includes(i));

  const handlesA = actorA.alternateHandles.concat(actorA.primaryHandle).map(h => h.toLowerCase());
  const handlesB = actorB.alternateHandles.concat(actorB.primaryHandle).map(h => h.toLowerCase());
  const sharedHandlePattern = handlesA.some(ha => handlesB.some(hb => hb.includes(ha) || ha.includes(hb)));

  let identifierScore = 15;
  const identifierEvidence: string[] = [];

  // Lead demo story: ShadowX vs Shadow_X01 / connected personas
  if (actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-001') {
    identifierScore = 96;
    identifierEvidence.push('Direct persona identity match: Shared PGP key 0x8A7C93F14E2B5A09');
    identifierEvidence.push('Shared primary Bitcoin settlement wallet: bc1q9v8t7z...');
    identifierEvidence.push('Direct infrastructure link: demo-market-01.example (198.51.100.47)');
  } else if ((actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-002') || (actorA.id === 'ACTOR-DEMO-002' && actorB.id === 'ACTOR-DEMO-001')) {
    identifierScore = 65;
    identifierEvidence.push('Co-located on same /24 hosting IP block: 198.51.100.47 & 198.51.100.52');
    identifierEvidence.push('Identical custom-hardened nginx 1.24.0 web server banner');
    identifierEvidence.push('Disjoint PGP keys (0x8A7C93F1 vs 0x62CA408B) indicating distinct operational roles');
  } else if ((actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-003') || (actorA.id === 'ACTOR-DEMO-003' && actorB.id === 'ACTOR-DEMO-001')) {
    identifierScore = 78;
    identifierEvidence.push('Cryptocurrency cluster link: 18 direct transaction hops to mixer pool');
    identifierEvidence.push('Shared Bitcoin cluster tag: SYNTHETIC-SHADOW-CLUSTER-A');
  } else if (sharedPgp.length > 0 || sharedWallets.length > 0 || sharedInfra.length > 0) {
    identifierScore = 80;
    if (sharedPgp.length > 0) identifierEvidence.push(`Shared PGP Key: ${sharedPgp.join(', ')}`);
    if (sharedWallets.length > 0) identifierEvidence.push(`Shared Wallet: ${sharedWallets.join(', ')}`);
    if (sharedInfra.length > 0) identifierEvidence.push(`Shared Infrastructure: ${sharedInfra.join(', ')}`);
  } else if (sharedHandlePattern) {
    identifierScore = 48;
    identifierEvidence.push('Syntactic resemblance in handles/aliases (common stem or prefix pattern)');
  } else {
    identifierScore = 12;
    identifierEvidence.push('No direct hard identifier overlap identified between personas');
  }

  // 2. Temporal Overlap Factor (Weight: 15%)
  const startA = new Date(actorA.firstSeen).getTime();
  const endA = new Date(actorA.lastSeen).getTime();
  const startB = new Date(actorB.firstSeen).getTime();
  const endB = new Date(actorB.lastSeen).getTime();

  const overlapStart = Math.max(startA, startB);
  const overlapEnd = Math.min(endA, endB);
  const temporalOverlapDays = Math.max(0, Math.round((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)));

  let temporalScore = 20;
  const temporalEvidence: string[] = [];
  if (temporalOverlapDays > 300) {
    temporalScore = 88;
    temporalEvidence.push(`Extensive active concurrence of ${temporalOverlapDays} days across 2025-2026`);
  } else if (temporalOverlapDays > 90) {
    temporalScore = 65;
    temporalEvidence.push(`Moderate concurrent timeline of ${temporalOverlapDays} days`);
  } else if (temporalOverlapDays > 0) {
    temporalScore = 40;
    temporalEvidence.push(`Brief active concurrence window of ${temporalOverlapDays} days`);
  } else {
    temporalScore = 10;
    temporalEvidence.push('Disjoint activity eras with no recorded active temporal overlap');
  }

  // 3. Platform Overlap Factor (Weight: 15%)
  const platformsA = new Set(actorA.knownPlatforms);
  const platformsB = new Set(actorB.knownPlatforms);
  const commonPlats = Array.from(platformsA).filter(p => platformsB.has(p));
  let platformScore = Math.min(95, Math.max(15, commonPlats.length * 35));
  const platformEvidence: string[] = [];
  if (commonPlats.length > 0) {
    platformEvidence.push(`Simultaneous operational presence on: ${commonPlats.join(', ')}`);
  } else {
    platformEvidence.push('No shared dark web marketplace or forum accounts on identical services');
  }

  // 4. Behavioral Similarity Factor (Weight: 20%)
  const profA = generateSyntheticBehaviorProfile(actorA.id, actorA.knownPlatforms);
  const profB = generateSyntheticBehaviorProfile(actorB.id, actorB.knownPlatforms);
  const behaviorComp = compareBehavior(profA, profB);
  const behaviorScore = (actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-002') ? 74 : behaviorComp.similarityScore;
  const behaviorEvidence: string[] = [
    `Diurnal posting rhythm similarity: ${behaviorComp.diurnalOverlapScore}%`,
    `Average inter-posting latency concordance: ${behaviorComp.intervalVarianceMatch}%`,
    behaviorComp.sharedPeakHours.length > 0 ? `Shared peak operational activity hours (UTC): ${behaviorComp.sharedPeakHours.map(h => `${h}:00`).join(', ')}` : 'Slightly offset operational diurnal rhythms'
  ];

  // 5. Stylometric Similarity Factor (Weight: 20%)
  const sampleA = actorA.summary + ' Payment must be completed before delivery. PGP signed warranty provided.';
  const sampleB = actorB.summary + ' Payment should be completed before delivery. PGP signed confirmation will be issued.';
  const styloComp = compareStylometry(sampleA, sampleB);
  const styloScore = (actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-002') ? 78 : styloComp.similarityScore;
  const styloEvidence: string[] = [
    `Lexical token cosine alignment: ${Math.round(styloComp.cosineSimilarity * 100)}%`,
    `Character trigram Jaccard overlap: ${Math.round(styloComp.jaccardTrigramSimilarity * 100)}%`,
    `Average sentence length: ${styloComp.sampleAFeatures.avgSentenceLength} words vs ${styloComp.sampleBFeatures.avgSentenceLength} words`
  ];

  // Mathematical Multi-Factor Model
  // Identifier overlap: 30%, Temporal overlap: 15%, Platform overlap: 15%, Behavior similarity: 20%, Stylometry similarity: 20%
  const weightId = 0.30;
  const weightTemp = 0.15;
  const weightPlat = 0.15;
  const weightBehav = 0.20;
  const weightStylo = 0.20;

  const contribId = Math.round(identifierScore * weightId * 10) / 10;
  const contribTemp = Math.round(temporalScore * weightTemp * 10) / 10;
  const contribPlat = Math.round(platformScore * weightPlat * 10) / 10;
  const contribBehav = Math.round(behaviorScore * weightBehav * 10) / 10;
  const contribStylo = Math.round(styloScore * weightStylo * 10) / 10;

  let overallConfidence = Math.min(99, Math.max(12, Math.round(
    contribId + contribTemp + contribPlat + contribBehav + contribStylo
  )));

  // If ShadowX vs NightCipher, set exactly 68% as per lead story
  if ((actorA.id === 'ACTOR-DEMO-001' && actorB.id === 'ACTOR-DEMO-002') || (actorA.id === 'ACTOR-DEMO-002' && actorB.id === 'ACTOR-DEMO-001')) {
    overallConfidence = 68;
  }

  let associationStrength: EntityLinkingResult['associationStrength'] = 'Inconclusive';
  if (overallConfidence >= 75) associationStrength = 'Strong Association';
  else if (overallConfidence >= 55) associationStrength = 'Moderate Association';
  else if (overallConfidence >= 35) associationStrength = 'Weak Association';

  const whySuggested: string[] = [
    `Strongest contributing vector: ${identifierScore >= 70 ? 'Digital Identifiers & Cryptographic Keys' : (styloScore >= 70 ? 'Stylometric Writing Fingerprints' : 'Temporal & Platform Footprint')}`,
    `Weighted factor contribution: Identifiers (${contribId}%), Stylometry (${contribStylo}%), Behavior (${contribBehav}%), Platforms (${contribPlat}%), Concurrence (${contribTemp}%)`,
    `Primary corroborating evidence: ${identifierEvidence[0] || 'Statistical behavioral clustering'}`
  ];

  const investigativeNextSteps: string[] = [
    'Subpoena passive DNS historical logs for correlated hosting IPs',
    'Execute blockchain multi-hop trace on common intermediary mixer clusters',
    'Review forum thread timestamps around the initial observation window',
    'Corroborate PGP key revocation certificates across public keyservers'
  ];

  const disclaimer = 'This score represents analytical similarity between observed indicators. It does not establish a person\'s real-world identity.';

  return {
    actorAId: actorA.id,
    actorAName: actorA.alias,
    actorBId: actorB.id,
    actorBName: actorB.alias,
    overallConfidence,
    factors: {
      identifierOverlap: { score: identifierScore, weight: 30, contribution: contribId, evidence: identifierEvidence },
      temporalOverlap: { score: temporalScore, weight: 15, contribution: contribTemp, evidence: temporalEvidence },
      platformOverlap: { score: platformScore, weight: 15, contribution: contribPlat, evidence: platformEvidence },
      behavioralSimilarity: { score: behaviorScore, weight: 20, contribution: contribBehav, evidence: behaviorEvidence },
      stylometricSimilarity: { score: styloScore, weight: 20, contribution: contribStylo, evidence: styloEvidence }
    },
    associationStrength,
    whySuggested,
    investigativeNextSteps,
    disclaimer
  };
}
