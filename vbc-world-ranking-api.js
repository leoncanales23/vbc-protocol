export function getWorldRanking(rankings){
  return rankings.sort((a,b)=>b.score-a.score)
}
