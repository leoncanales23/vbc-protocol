export function buildLeaderboard(athletes){
  return athletes
    .sort((a,b)=>b.score-a.score)
    .map((a,i)=>({
      rank:i+1,
      athlete:a.id,
      score:a.score
    }))
}
