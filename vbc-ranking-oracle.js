export function computeRanking(scores){
  return scores.sort((a,b)=>b.score-a.score)
}
