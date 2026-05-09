export function runWorldChampionship(athletes){
  return athletes
    .sort((a,b)=>b.score-a.score)
    .slice(0,20)
}
