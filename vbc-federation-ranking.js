export function federationRanking(list){
  return list.sort((a,b)=>b.points-a.points)
}
