export function rankAthletes(list){
  return list.sort((a,b)=>b.score-a.score)
}
