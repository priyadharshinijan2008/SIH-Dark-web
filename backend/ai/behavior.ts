import { BehavioralComparisonResult } from '../types.js';

export interface ActivityProfile {
  actorId: string;
  hourDistribution: number[]; // 24 buckets representing UTC 0-23
  dayOfWeekDistribution: number[]; // 7 buckets (Sun-Sat)
  avgPostingIntervalHours: number;
  platformFootprint: string[];
}

export function generateSyntheticBehaviorProfile(actorId: string, knownPlatforms: string[]): ActivityProfile {
  // Deterministic hash based on actorId
  let hash = 0;
  for (let i = 0; i < actorId.length; i++) {
    hash = (hash * 31 + actorId.charCodeAt(i)) & 0xffffffff;
  }
  const absHash = Math.abs(hash);
  const peakHour = (absHash % 12) + 10; // peak between 10:00 and 22:00 UTC

  const hourDistribution = Array(24).fill(0).map((_, h) => {
    const dist = Math.min(Math.abs(h - peakHour), 24 - Math.abs(h - peakHour));
    const base = Math.max(1, Math.round(25 * Math.exp(-0.5 * (dist / 2.5) * (dist / 2.5))));
    return base + (absHash % 5);
  });

  const dayOfWeekDistribution = [15, 22, 28, 30, 26, 20, 14];
  const avgPostingIntervalHours = 4.2 + (absHash % 10) * 0.4;

  return {
    actorId,
    hourDistribution,
    dayOfWeekDistribution,
    avgPostingIntervalHours: Math.round(avgPostingIntervalHours * 10) / 10,
    platformFootprint: knownPlatforms
  };
}

export function compareBehavior(profileA: ActivityProfile, profileB: ActivityProfile): BehavioralComparisonResult {
  // 1. Diurnal overlap (Cosine similarity over 24-hour vector)
  let dotProd = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < 24; i++) {
    dotProd += profileA.hourDistribution[i] * profileB.hourDistribution[i];
    normA += profileA.hourDistribution[i] * profileA.hourDistribution[i];
    normB += profileB.hourDistribution[i] * profileB.hourDistribution[i];
  }
  const diurnalOverlapScore = (normA > 0 && normB > 0)
    ? Math.round((dotProd / (Math.sqrt(normA) * Math.sqrt(normB))) * 100)
    : 50;

  // 2. Interval variance match
  const diffInterval = Math.abs(profileA.avgPostingIntervalHours - profileB.avgPostingIntervalHours);
  const intervalVarianceMatch = Math.max(20, Math.round(100 - (diffInterval * 12)));

  // 3. Platform footprint overlap (Jaccard on platforms)
  const setA = new Set(profileA.platformFootprint);
  const setB = new Set(profileB.platformFootprint);
  const commonPlatforms = Array.from(setA).filter(p => setB.has(p));
  const unionPlatforms = new Set([...profileA.platformFootprint, ...profileB.platformFootprint]);
  const platformOverlapScore = unionPlatforms.size > 0
    ? Math.round((commonPlatforms.length / unionPlatforms.size) * 100)
    : 40;

  // 4. Temporal overlap score
  const temporalOverlapScore = Math.round((diurnalOverlapScore * 0.6) + (intervalVarianceMatch * 0.4));

  // Shared peak hours
  const peakA = profileA.hourDistribution.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v).slice(0, 3).map(x => x.i);
  const peakB = profileB.hourDistribution.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v).slice(0, 3).map(x => x.i);
  const sharedPeakHours = peakA.filter(h => peakB.includes(h));

  // Overall similarity
  const similarityScore = Math.min(100, Math.max(10, Math.round(
    (diurnalOverlapScore * 0.4) + (intervalVarianceMatch * 0.3) + (platformOverlapScore * 0.3)
  )));

  const analyticalRationale = `Behavioral analysis shows ${similarityScore}% correlation with diurnal circadian convergence (${diurnalOverlapScore}%) and shared platform presence across ${commonPlatforms.length} dark web services.`;

  return {
    similarityScore,
    temporalOverlapScore,
    diurnalOverlapScore,
    intervalVarianceMatch,
    platformOverlapScore,
    sharedPeakHours,
    analyticalRationale
  };
}
