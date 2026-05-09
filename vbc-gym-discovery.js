export function findNearbyGyms(gyms,country){
  return gyms.filter(g=>g.country===country)
}
