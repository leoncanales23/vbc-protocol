export function mergeRankings(a,b){
  const map={}
  for(const r of [...a,...b]){
    if(!map[r.athlete] || r.score>map[r.athlete].score){
      map[r.athlete]=r
    }
  }
  return Object.values(map)
}
