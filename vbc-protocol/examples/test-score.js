/**
 * VBC Protocol · Example: Power Score Calculator
 * 
 * Run: node examples/test-score.js
 */

const { calculatePowerScore, validateLift, WORLD_RECORDS } = require('../sdk');

console.log('⚡ VBC Protocol · Power Score Test\n');
console.log('World Records:', WORLD_RECORDS);
console.log('');

// Test different lifts
const lifts = [
  { discipline: 'bench',    weight: 100, reps: 8,  label: 'Gym regular' },
  { discipline: 'bench',    weight: 140, reps: 5,  label: 'Intermediate' },
  { discipline: 'deadlift', weight: 200, reps: 3,  label: 'Advanced' },
  { discipline: 'squat',    weight: 250, reps: 2,  label: 'Elite' },
  { discipline: 'bench',    weight: 320, reps: 1,  label: 'Near world record (should fail)' },
];

lifts.forEach(function(lift) {
  console.log('─'.repeat(50));
  console.log(lift.label + ': ' + lift.weight + 'kg × ' + lift.reps + ' reps (' + lift.discipline + ')');
  
  const validation = validateLift(lift);
  if (!validation.valid) {
    console.log('  ❌ Validation failed:', validation.errors.join(', '));
    return;
  }

  const result = calculatePowerScore(lift);
  if (!result.ok) {
    console.log('  ⚠️  ' + result.error);
    return;
  }

  console.log('  Power Score: ' + result.powerScore + ' · Tier: ' + result.tier);
  console.log('  Est 1RM: ' + result.est1RM + 'kg · ' + (result.pctWorldRecord * 100).toFixed(1) + '% of WR');
  console.log('  VBC: ' + result.vbc + ' · CONDOR: ' + result.condor + ' (burned: ' + result.burned + ')');
});

console.log('\n─'.repeat(50));
console.log('✓ Done. See sdk/index.js for full API.');
