import { TRADITION_ENTRIES } from '../src/data/traditions.ts';
import { calculateEndangermentScore, getEndangermentLevel, getEndangermentBreakdown } from '../src/data/endangermentScore.ts';

console.log('='.repeat(80));
console.log('KALANTAR — ORAL TRADITION ENDANGERMENT SCORING AUDIT');
console.log('='.repeat(80));

const counts = { Critical: 0, 'At Risk': 0, Stable: 0 };

TRADITION_ENTRIES.forEach((entry, i) => {
  const breakdown = getEndangermentBreakdown(entry);
  counts[breakdown.level]++;
  console.log(
    `[${(i + 1).toString().padStart(2, '0')}] ${entry.title.padEnd(45)} | Score: ${breakdown.totalScore.toString().padStart(3)} | Level: ${breakdown.level.padEnd(8)} | Region: ${entry.region}`
  );
  console.log(
    `     Points: Successor=${breakdown.successorPoints}/35, Age=${breakdown.agePoints}/30, Recency=${breakdown.recencyPoints}/20, Bards=${breakdown.countPoints}/15`
  );
});

console.log('='.repeat(80));
console.log(`Summary: Critical: ${counts.Critical}, At Risk: ${counts['At Risk']}, Stable: ${counts.Stable}`);
console.log('='.repeat(80));
