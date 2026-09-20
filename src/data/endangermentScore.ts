import { TraditionEntry } from './types';

/**
 * ============================================================================
 * ENDANGERMENT SCORING ENGINE (PRD SECTION 7 DRAFT SPECIFICATION)
 * ============================================================================
 * 
 * [DRAFT SPECIFICATION NOTE]:
 * The weight distribution below is a working draft implementation based on
 * initial field urgency signals. Per PRD Section 7, the archival working group
 * still needs to review and confirm the exact mathematical weights prior to final
 * catalog publication.
 * 
 * DRAFT WEIGHT DISTRIBUTION:
 * - 35% — Successor pipeline (Binary: 35 points if hasSuccessor is false, 0 if true)
 * - 30% — Practitioner age (Normalized between baseline age 50 and max 95; older = higher score)
 * - 20% — Time since last recording (Normalized up to a 2-year / 730-day horizon; older = higher score)
 * - 15% — Living practitioner count (Inverse-normalized from 40 down to 1; fewer bards = higher score)
 * 
 * Total output range: 0 to 100.
 */

export type EndangermentLevel = 'Critical' | 'At Risk' | 'Stable';

export interface EndangermentBreakdown {
  totalScore: number;
  level: EndangermentLevel;
  successorPoints: number; // Max 35
  agePoints: number; // Max 30
  recencyPoints: number; // Max 20
  countPoints: number; // Max 15
}

export interface EndangermentScoreInput {
  hasSuccessor?: boolean;
  practitionerAge?: number;
  lastRecordedDaysAgo?: number;
  livingPractitionerCount?: number;
  endangermentScore?: number;
}

export function calculateEndangermentScore(entry: EndangermentScoreInput): number {
  if (typeof entry.endangermentScore === 'number' && !isNaN(entry.endangermentScore)) {
    return entry.endangermentScore;
  }

  // 1. Successor Pipeline (35% weight: 35 pts if no successor, 0 if active successor)
  const successorPoints = entry.hasSuccessor ? 0 : 35;

  // 2. Practitioner Age Component (30% weight)
  // Normalized across age range [50, 95]. Values below 50 clamp to 0, above 95 clamp to 30.
  const rawAge = typeof entry.practitionerAge === 'number' && !isNaN(entry.practitionerAge) ? entry.practitionerAge : 65;
  const ageClamped = Math.max(50, Math.min(95, rawAge));
  const ageNormalized = (ageClamped - 50) / 45; // 0.0 to 1.0
  const agePoints = ageNormalized * 30;

  // 3. Last Recording Recency Component (20% weight)
  // Normalized up to 730 days (2 years). Fresh field intake defaults to 0 days ago (0 pts recency urgency).
  const rawRecency = typeof entry.lastRecordedDaysAgo === 'number' && !isNaN(entry.lastRecordedDaysAgo) ? entry.lastRecordedDaysAgo : 0;
  const recencyClamped = Math.max(0, Math.min(730, rawRecency));
  const recencyNormalized = recencyClamped / 730; // 0.0 to 1.0
  const recencyPoints = recencyNormalized * 20;

  // 4. Living Practitioner Count Component (15% weight)
  // Defaults to 1 for individual field recordings.
  const rawCount = typeof entry.livingPractitionerCount === 'number' && !isNaN(entry.livingPractitionerCount) ? entry.livingPractitionerCount : 1;
  const countClamped = Math.max(1, Math.min(40, rawCount));
  const countInverseNormalized = (40 - countClamped) / 39; // 1.0 (at count=1) down to 0.0 (at count=40)
  const countPoints = countInverseNormalized * 15;

  const totalRaw = successorPoints + agePoints + recencyPoints + countPoints;
  return Math.round(Math.max(0, Math.min(100, totalRaw)));
}

/**
 * Returns the categorical endangerment level according to the composite score threshold:
 * - "Critical": 70 - 100
 * - "At Risk": 40 - 69
 * - "Stable": 0 - 39
 * 
 * @param score Endangerment score (0 - 100)
 */
export function getEndangermentLevel(score: number): EndangermentLevel {
  if (score >= 70) {
    return 'Critical';
  }
  if (score >= 40) {
    return 'At Risk';
  }
  return 'Stable';
}

/**
 * Detailed breakdown helper for audits, dossiers, and inspection views.
 */
export function getEndangermentBreakdown(entry: EndangermentScoreInput): EndangermentBreakdown {
  const successorPoints = entry.hasSuccessor ? 0 : 35;
  const rawAge = typeof entry.practitionerAge === 'number' && !isNaN(entry.practitionerAge) ? entry.practitionerAge : 65;
  const ageNormalized = (Math.max(50, Math.min(95, rawAge)) - 50) / 45;
  const agePoints = Math.round(ageNormalized * 30 * 10) / 10;
  const rawRecency = typeof entry.lastRecordedDaysAgo === 'number' && !isNaN(entry.lastRecordedDaysAgo) ? entry.lastRecordedDaysAgo : 0;
  const recencyNormalized = Math.max(0, Math.min(730, rawRecency)) / 730;
  const recencyPoints = Math.round(recencyNormalized * 20 * 10) / 10;
  const rawCount = typeof entry.livingPractitionerCount === 'number' && !isNaN(entry.livingPractitionerCount) ? entry.livingPractitionerCount : 1;
  const countInverse = (40 - Math.max(1, Math.min(40, rawCount))) / 39;
  const countPoints = Math.round(countInverse * 15 * 10) / 10;

  const totalScore = Math.round(Math.max(0, Math.min(100, successorPoints + agePoints + recencyPoints + countPoints)));
  return {
    totalScore,
    level: getEndangermentLevel(totalScore),
    successorPoints,
    agePoints,
    recencyPoints,
    countPoints
  };
}
