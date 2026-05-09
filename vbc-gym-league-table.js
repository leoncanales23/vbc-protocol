export function buildGymTable(gyms){
  return gyms.sort((a,b)=>b.points-a.points)
}
