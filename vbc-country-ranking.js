export function buildCountryRanking(athletes){
  const map = {}

  for(const a of athletes){
    if(!map[a.country]) map[a.country]=0
    map[a.country]+=a.score
  }

  return Object.entries(map)
  .sort((a,b)=>b[1]-a[1])
}
