export function calculateStats(lifts){
  let total=0
  for(const l of lifts) total+=l.weight
  return {total}
}
