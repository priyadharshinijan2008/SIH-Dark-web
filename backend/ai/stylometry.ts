import { StylometricComparisonResult, StylometricFeatures, ConfidenceLevel } from '../types.js';

export function extractStylometricFeatures(text: string): StylometricFeatures {
  const trimmed = text.trim();
  const charCount = trimmed.length;
  const words = trimmed.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const wordCount = Math.max(words.length, 1);
  const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(sentences.length, 1);
  const avgSentenceLength = Math.round((wordCount / sentenceCount) * 10) / 10;

  // Vocabulary richness (Type-Token Ratio)
  const uniqueWords = new Set(words);
  const vocabularyRichnessTTR = Math.round((uniqueWords.size / wordCount) * 100) / 100;

  // Punctuation frequency
  const period = (trimmed.match(/\./g) || []).length;
  const comma = (trimmed.match(/,/g) || []).length;
  const semicolon = (trimmed.match(/;/g) || []).length;
  const exclamation = (trimmed.match(/!/g) || []).length;
  const question = (trimmed.match(/\?/g) || []).length;
  const emoticon = (trimmed.match(/[:;=xX8][-~]?[)D(PpoO\/\\\]]/g) || []).length;

  // Function word groups
  const pronouns = words.filter(w => ['i', 'we', 'you', 'he', 'she', 'they', 'it', 'me', 'us', 'him', 'her', 'them', 'my', 'our', 'your', 'their'].includes(w)).length;
  const prepositions = words.filter(w => ['in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down'].includes(w)).length;
  const conjunctions = words.filter(w => ['and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'because', 'although', 'since', 'unless', 'while'].includes(w)).length;
  const modalVerbs = words.filter(w => ['must', 'should', 'would', 'could', 'can', 'may', 'might', 'will', 'shall'].includes(w)).length;

  // Top character trigrams
  const trigramCounts = new Map<string, number>();
  const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
  for (let i = 0; i < normalized.length - 2; i++) {
    const tri = normalized.slice(i, i + 3);
    trigramCounts.set(tri, (trigramCounts.get(tri) || 0) + 1);
  }
  const topTrigrams = Array.from(trigramCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(e => e[0]);

  return {
    charCount,
    wordCount,
    avgSentenceLength,
    vocabularyRichnessTTR,
    punctuationFrequency: { period, comma, semicolon, exclamation, question, emoticon },
    functionWordUsage: { pronouns, prepositions, conjunctions, modalVerbs },
    topTrigrams
  };
}

export function compareStylometry(sampleA: string, sampleB: string): StylometricComparisonResult {
  const featA = extractStylometricFeatures(sampleA);
  const featB = extractStylometricFeatures(sampleB);

  // Word-level Cosine Similarity
  const wordsA = sampleA.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const wordsB = sampleB.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];

  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();
  for (const w of wordsA) freqA.set(w, (freqA.get(w) || 0) + 1);
  for (const w of wordsB) freqB.set(w, (freqB.get(w) || 0) + 1);

  const allVocabulary = Array.from(new Set([...freqA.keys(), ...freqB.keys()]));
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const word of allVocabulary) {
    const valA = freqA.get(word) || 0;
    const valB = freqB.get(word) || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  const cosineSimilarity = (normA > 0 && normB > 0)
    ? Math.round((dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))) * 100) / 100
    : 0;

  // Trigram Jaccard Similarity
  const triSetA = new Set(featA.topTrigrams);
  const triSetB = new Set(featB.topTrigrams);
  const intersectionSize = Array.from(triSetA).filter(t => triSetB.has(t)).length;
  const unionSize = new Set([...featA.topTrigrams, ...featB.topTrigrams]).size;
  const jaccardTrigramSimilarity = unionSize > 0 ? Math.round((intersectionSize / unionSize) * 100) / 100 : 0;

  // Syntactic & Structural Match
  const lenDiff = Math.abs(featA.avgSentenceLength - featB.avgSentenceLength);
  const lenScore = Math.max(0, 1 - (lenDiff / Math.max(featA.avgSentenceLength, featB.avgSentenceLength, 1)));

  const ttrDiff = Math.abs(featA.vocabularyRichnessTTR - featB.vocabularyRichnessTTR);
  const ttrScore = Math.max(0, 1 - ttrDiff);

  const syntacticMatchScore = Math.round(((lenScore * 0.5) + (ttrScore * 0.5)) * 100) / 100;

  // Weighted overall stylometric score
  // Cosine (40%), Jaccard trigram (35%), Syntactic (25%)
  const similarityScore = Math.min(100, Math.max(5, Math.round(
    (cosineSimilarity * 40) + (jaccardTrigramSimilarity * 35) + (syntacticMatchScore * 25)
  )));

  let confidenceLevel: ConfidenceLevel = 'Low';
  if (similarityScore >= 75) confidenceLevel = 'High';
  else if (similarityScore >= 55) confidenceLevel = 'Medium';
  else confidenceLevel = 'Investigative Lead';

  const analyticalRationale = `The model detected ${similarityScore}% statistical concordance across token frequency (cosine: ${Math.round(cosineSimilarity * 100)}%), recurring trigram patterns (Jaccard: ${Math.round(jaccardTrigramSimilarity * 100)}%), and syntactic structure (${Math.round(syntacticMatchScore * 100)}%).`;

  const disclaimer = 'The model detected similarities in vocabulary, sentence structure and writing patterns. This result is an analytical signal and should not be treated as definitive identity proof.';

  return {
    similarityScore,
    sampleAFeatures: featA,
    sampleBFeatures: featB,
    cosineSimilarity,
    jaccardTrigramSimilarity,
    syntacticMatchScore,
    confidenceLevel,
    analyticalRationale,
    disclaimer
  };
}
