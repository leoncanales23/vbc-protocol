export function powerIndex(results){
  return results.reduce((s,r)=>s+r.score,0)
}
