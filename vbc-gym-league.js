export function calculateGymLeague(gyms){
  return gyms.sort((a,b)=>b.score-a.score)
}
