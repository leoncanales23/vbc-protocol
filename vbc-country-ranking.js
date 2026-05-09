export function buildCountryRanking(athletes){
  const map={}

  for(const a of athletes){
    map[a.country]=(map[a.country]||0)+a.score
  }

  return Object.entries(map)
    .map(([country,score])=>({country,score}))
    .sort((a,b)=>b.score-a.score)
}
