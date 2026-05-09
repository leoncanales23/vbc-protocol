// VBC National Ranking

export function buildNationalRanking(athletes, country){

  return athletes
    .filter(a => a.country === country)
    .sort((a,b)=>b.score-a.score)
    .map((a,i)=>({
      rank:i+1,
      athlete:a.id,
      score:a.score
    }))
}
