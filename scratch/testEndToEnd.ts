import { traditionsRepo } from '../src/data/traditionsRepo.ts';

async function runAudit() {
  console.log('=== 1. TEST SEARCH BY TITLE ("Villu") ===');
  const r1 = await traditionsRepo.getTraditions({ searchQuery: 'Villu' });
  console.log(`Found ${r1.length} traditions:`, r1.map(t => t.title));

  console.log('\n=== 2. TEST SEARCH BY REGION ("Kerala") ===');
  const r2 = await traditionsRepo.getTraditions({ searchQuery: 'Kerala' });
  console.log(`Found ${r2.length} traditions:`, r2.map(t => `${t.title} (${t.region})`));

  console.log('\n=== 3. TEST SEARCH BY DIALECT ("Nellai") ===');
  const r3 = await traditionsRepo.getTraditions({ searchQuery: 'Nellai' });
  console.log(`Found ${r3.length} traditions:`, r3.map(t => `${t.title} (${t.dialect})`));

  console.log('\n=== 4. TEST SEARCH BY TAG ("Chenda") ===');
  const r4 = await traditionsRepo.getTraditions({ searchQuery: 'Chenda' });
  console.log(`Found ${r4.length} traditions:`, r4.map(t => `${t.title}`));

  console.log('\n=== 5. TEST FILTER BY ENDANGERMENT LEVEL ===');
  const crit = await traditionsRepo.getTraditions({ endangermentLevel: 'Critical' });
  const atRisk = await traditionsRepo.getTraditions({ endangermentLevel: 'At Risk' });
  const stable = await traditionsRepo.getTraditions({ endangermentLevel: 'Stable' });
  console.log(`Critical: ${crit.length}, At Risk: ${atRisk.length}, Stable: ${stable.length}`);

  console.log('\n=== 6. TEST SORT BY SCORE (DESCENDING) ===');
  const sorted = await traditionsRepo.getTraditions({ sortBy: 'score' });
  sorted.forEach(t => {
    console.log(`- ${t.title.padEnd(45)}: Score ${t.practitionerAge > 0 ? 'Calculated' : ''}`);
  });

  console.log('\n=== 7. TEST KNOWLEDGE GRAPH GENERATION ===');
  const graph = await traditionsRepo.getKnowledgeGraph();
  console.log(`Nodes generated: ${graph.nodes.length}, Edges generated: ${graph.edges.length}`);
}

runAudit();
