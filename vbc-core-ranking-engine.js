// VBC Core Ranking Engine

export function calculateStrengthScore(lifts){
  let score = 0

  for(const lift of lifts){
    const base = lift.weight * (lift.reps || 1)

    const multiplier =
      lift.type === "deadlift" ? 1.2 :
      lift.type === "bench" ? 1.0 :
      1.1

    score += base * multiplier
  }

  return Math.round(score)
}

export function buildLeaderboard(athletes){
  return athletes
    .map(a => ({
      uid: a.uid,
      score: calculateStrengthScore(a.lifts || [])
    }))
    .sort((a,b) => b.score - a.score)
}
